
/**  ARBOL B  */
//************************ Arbol B de orden 5 **************************/
/*********************** Nodo Arbol B *************************/

// El arbol B se utiliza para almacenar los datos del inventario
// se almancenarán los parámetros 
// Id, Nombre, Precio B) , Cantidad 

//Sustituir el parametro id por todos los demás parámetros
class nodoB{
    constructor(id,nombre,precio,cantidad){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        //apuntadores de lista - tipo nodoB
        this.siguiente = null; 
        this.anterior = null;
        //apuntadores de arbol - tipo pagina
        this.izq = null;
        this.der = null;
    }
}
/************************************************************ */

/*****Lista Ordenada para almacenar los valores ****************/
class lista_nodoB{
    constructor(){
        this.primero = null;
        this.ultimo = null;
        this.size=0;
    }

    insertar(nuevo){
        if(this.primero == null){
            this.primero = nuevo;
            this.ultimo = nuevo;
            this.size++;
            return true;
        }else{
            if(this.primero == this.ultimo){ // solo hay un id en la lista
                if(nuevo.id < this.primero.id){
                    nuevo.siguiente = this.primero;
                    this.primero.anterior = nuevo;
                    //cambiar punteros de paginas
                    this.primero.izq = nuevo.der;

                    this.primero = nuevo;
                    this.size++;
                    return true;
                }else if(nuevo.id> this.ultimo.id){
                    this.ultimo.siguiente = nuevo;
                    nuevo.anterior = this.ultimo;
                    //cambiar punteros de paginas
                    this.ultimo.der = nuevo.izq;

                    this.ultimo = nuevo;
                    this.size++;
                    return true;
                }else{ // el id es igual al primero
                    console.log("Ya existe un id con ese valor en la lista");
                    return false;
                }
            }else{ //hay mas de un id
                if(nuevo.id < this.primero.id){
                    nuevo.siguiente = this.primero;
                    this.primero.anterior = nuevo;
                    //cambiar punteros de paginas
                    this.primero.izq = nuevo.der;

                    this.primero = nuevo;
                    this.size++;
                    return true;
                }else if(nuevo.id> this.ultimo.id){
                    this.ultimo.siguiente = nuevo;
                    nuevo.anterior = this.ultimo;
                    //cambiar punteros de paginas
                    this.ultimo.der = nuevo.izq;

                    this.ultimo = nuevo;
                    this.size++;
                    return true;
                }else{
                    let aux = this.primero;
                    while(aux != null){
                        if(nuevo.id < aux.id){
                            nuevo.siguiente = aux;
                            nuevo.anterior = aux.anterior;
                            // cambiar los punteros de las paginas
                            aux.izq= nuevo.der;
                            aux.anterior.der = nuevo.izq;
                            //******************************* 
                            aux.anterior.siguiente = nuevo;
                            aux.anterior = nuevo;
                            this.size++;
                            return true;
                        }else if(nuevo.id == aux.id){
                            console.log("Ya existe un id con ese valor en la lista");
                            return false;
                        }else{
                            aux = aux.siguiente;
                        }
                    }
                }
            }
        }
    }
}
/************************************************************ */

/****************** Pagina del arbol B ************************/
class pagina{
    constructor(){
        this.raiz = false;
        this.claves_max = 4;
        this.claves_min = 2;
        this.size =0;
        this.claves = new lista_nodoB();
    }

    insertar_EnPagina(nodo){
        if(this.claves.insertar(nodo)){
            this.size = this.claves.size;
            if(this.size < 5){
                return this;
            }else if(this.size == 5){ //dividir pagina
                return this.dividir_pagina(this);
            }
        }
        return null;
    }

    dividir_pagina(pag){
        let temp = pag.claves.primero;
        for(var i=0; i<2;i++){ //ubicarnos en la posicion [2] de la lista (mitad)
            temp = temp.siguiente;
        }

        //pasar valores de la pagina a nodos independientes
        let primero = pag.claves.primero;
        let segundo = pag.claves.primero.siguiente;
        let tercero = temp.siguiente;
        let cuarto = pag.claves.ultimo;

        primero.siguiente = null;
        primero.anterior = null;

        segundo.siguiente = null;
        segundo.anterior = null;

        tercero.siguiente = null;
        tercero.anterior = null;

        cuarto.siguiente = null;
        cuarto.anterior = null;

        temp.siguiente = null;
        temp.anterior = null;

        //** crear nuevas paginas */
        let pag_izquierda = new pagina();
        pag_izquierda.insertar_EnPagina(primero);
        pag_izquierda.insertar_EnPagina(segundo);

        let pag_dercha = new pagina();
        pag_dercha.insertar_EnPagina(tercero);
        pag_dercha.insertar_EnPagina(cuarto);

        temp.izq = pag_izquierda;
        temp.der = pag_dercha;

        return temp;
    }

    es_hoja(pag){
        if(pag.claves.primero.izq==null){
            return true;
        }else{
            return false;
        }
    }
}
/************************************************************ */

/************************** Arbol B ***************************/
class Arbol_B{
    constructor(){
        this.raiz = null;
        this.orden =5;
        this.altura =0;
    }

    insertar_nodo(id,nombre,precio,cantidad){
        let nuevo = new nodoB(id,nombre,precio,cantidad);
        
        if(this.raiz == null){
            this.raiz = new pagina();
            this.raiz.raiz = true;
            this.raiz = this.raiz.insertar_EnPagina(nuevo);
            //console.log("se inserto el valor "+this.raiz.claves.primero.id);
        }else{
            if(this.altura==0){
                let respuesta = this.raiz.insertar_EnPagina(nuevo);
                if(respuesta instanceof pagina){// la raiz no se dividio
                    this.raiz = respuesta;
                }else{
                    this.altura++;
                    this.raiz = new pagina();
                    this.raiz = this.raiz.insertar_EnPagina(respuesta);
                }
            }else{ // ya existe mas de una pagina, hay que recorrer el arbol para insertar el nuevo
                if(this.raiz == null){
                    console.log("la raiz es null ")
                    return;
                }   
                let respuesta = this.insertar_recorrer(nuevo,this.raiz);
                if(respuesta instanceof nodoB){ // la raiz se dividio
                    this.altura++;
                    this.raiz = new pagina();
                    this.raiz = this.raiz.insertar_EnPagina(respuesta);
                }else if(respuesta instanceof pagina){
                    this.raiz = respuesta;
                }
            }
        }
    }

    insertar_recorrer(nuevo, pagina_actual){
        if(pagina_actual.es_hoja(pagina_actual)){
            let respuesta = pagina_actual.insertar_EnPagina(nuevo);
            return respuesta;
        }else{
            if(nuevo.id < pagina_actual.claves.primero.id){ // va a la izquierda
                let respuesta = this.insertar_recorrer(nuevo,pagina_actual.claves.primero.izq);
                if(respuesta instanceof nodoB){ // la pagina se dividio y el nodo se tiene que insertar en la pagina actual
                    return pagina_actual.insertar_EnPagina(respuesta);
                }else if(respuesta instanceof pagina){
                    pagina_actual.claves.primero.izq = respuesta;
                    return pagina_actual;
                }
            }else if(nuevo.id > pagina_actual.claves.ultimo.id){ // va a la derecha porque es mayor al ultimo
                let respuesta = this.insertar_recorrer(nuevo,pagina_actual.claves.ultimo.der);
                if(respuesta instanceof nodoB){ // la pagina se dividio y el nodo se tiene que insertar en la pagina actual
                    return pagina_actual.insertar_EnPagina(respuesta);
                }else if(respuesta instanceof pagina){
                    pagina_actual.claves.ultimo.der = respuesta;
                    return pagina_actual;
                }
            }else{ // va en los apuntadores de los nodos de en medio
                let aux = pagina_actual.claves.primero;

                while(aux != null){
                    if(nuevo.id < aux.id){
                        let respuesta = this.insertar_recorrer(nuevo, aux.izq);
                        if(respuesta instanceof nodoB){ // la pagina se dividio y el nodo se tiene que insertar en la pagina actual
                            return pagina_actual.insertar_EnPagina(respuesta);
                        }else if(respuesta instanceof pagina){
                            aux.izq = respuesta;
                            aux.anterior.der = respuesta;
                            return pagina_actual;
                        }
                    }else if(nuevo.id == aux.id){
                        return pagina_actual;
                    }else{
                        aux = aux.siguiente;
                    }
                }
            }
        }
        return this;
    }

    graficar(){
        let cadena="digraph arbolB{\n";
        cadena+="rankr=TB;\n";
        cadena+="node[shape = box,fillcolor=\"azure2\" color=\"black\" style=\"filled\"];\n";
        //metodos para graficar el arbol
        cadena+= this.graficar_nodos(this.raiz);
        cadena+=  this.graficar_enlaces(this.raiz);
        cadena+="}\n"

        return cadena;
    }
    //Adaptar y agregar los parámetros a la función de graficar nombre,precio,cantidad porque id ya está

    graficar_nodos(raiz_actual){
        let cadena="";

        if(raiz_actual.es_hoja(raiz_actual)){ //si es un hhoja solo grafica el nodo
            cadena+="node[shape=record label= \"<p0>"
            let contador=0;
            let aux = raiz_actual.claves.primero;
            while(aux!=null){
                contador++;
                cadena+="|{"+aux.id+ aux.nombre +aux.precio + aux.cantidad+"}|<p"+contador+"> ";
                aux= aux.siguiente;
            }
            cadena+="\"]"+raiz_actual.claves.primero.id+";\n";
            return cadena;
        }else{
            cadena+="node[shape=record label= \"<p0>"
            let contador=0;
            let aux = raiz_actual.claves.primero;
            while(aux!=null){
                contador++;
                cadena+="|{"+aux.id+aux.nombre +aux.precio + aux.cantidad+"}|<p"+contador+"> ";
                aux= aux.siguiente;
            }
            cadena+="\"]"+raiz_actual.claves.primero.id+";\n";

            //recorrer los hicos de cada clave
            aux = raiz_actual.claves.primero;
            while(aux != null){
                cadena+= this.graficar_nodos(aux.izq);
                aux = aux.siguiente;
            }
            cadena+= this.graficar_nodos(raiz_actual.claves.ultimo.der);
            return cadena;
        }   
    }

    graficar_enlaces(raiz_actual){
        let cadena="";
        if(raiz_actual.es_hoja(raiz_actual)){
            return ""+raiz_actual.claves.primero.id+";\n";
        }else{
            //cadena += ""+raiz_actual.claves.primero.id+";\n";

            let aux = raiz_actual.claves.primero;
            let contador =0;
            let raiz_actual_txt = raiz_actual.claves.primero.id;
            while(aux != null){
                cadena+= "\n"+raiz_actual_txt+":p"+contador+"->"+this.graficar_enlaces(aux.izq);
                contador++;
                aux = aux.siguiente;
            }
            cadena+="\n"+raiz_actual_txt+":p"+contador+"->"+this.graficar_enlaces(raiz_actual.claves.ultimo.der);
            return cadena;
        }
    }
}
/************************************************************ */

let arbol = new Arbol_B();
arbol.insertar_nodo(5,"gato", 11,1);
arbol.insertar_nodo(1,"pez",33,23);
arbol.insertar_nodo(7,"chucho",45,12);
arbol.insertar_nodo(3,"perica",12,99);
arbol.insertar_nodo(13,"conejo",45,3);
arbol.insertar_nodo(8,"pupo",11,23);
arbol.insertar_nodo(35,"licha",3,22);
arbol.insertar_nodo(14,"carlos",33,2);
arbol.insertar_nodo(10,"sopero",2,44);
arbol.insertar_nodo(9,"tortuga",22,1);
arbol.insertar_nodo(12,"zanate",22,3);
arbol.insertar_nodo(17,"hormiga",31,24);
arbol.insertar_nodo(22,"michi",42,23);
arbol.insertar_nodo(25,"misca",12,21);

arbol.insertar_nodo(100,"conejo",45,3);
arbol.insertar_nodo(150,"conejo",45,3);
arbol.insertar_nodo(220,"conejo",45,3);
arbol.insertar_nodo(325,"conejo",45,3);

console.log(arbol.graficar());