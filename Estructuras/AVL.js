//El árbol avl se usa para almacenar los usuarios tipo vendedor
// tiene que apuntar a la lista doble de clientes
//Vendor es el id pero con otro nombre

class nodo{
    constructor(vendor,nombre,edad,correo,password){
        this.vendor = vendor;
        this.nombre = nombre;
        this.edad = edad;
        this.correo = correo;
        this.password = password;
        this.izq = null;
        this.der = null;
        this.altura = 0;
        this.lista_clientes = new listaDoble()
    }
}

class avl{
    constructor(){
        this.raiz = null;
    }

    insertar(vendor,nombre,edad,correo,password){
        let nuevo = new nodo(vendor,nombre,edad,correo,password);

        if(this.raiz == null){
            this.raiz= nuevo;
        }else{
            this.raiz = this.insertar_nodo(this.raiz,nuevo);
        }
    }

    insertar_nodo(raiz_actual,nuevo){
        if(raiz_actual != null){
            //recorrer hijos
            if(raiz_actual.vendor > nuevo.vendor){
                raiz_actual.izq = this.insertar_nodo(raiz_actual.izq,nuevo);
                //validaciones
                
                if(this.altura(raiz_actual.der)-this.altura(raiz_actual.izq)==-2){
                    //console.log("entra a rotacion IZQUIERDA");
                    //if(this.altura(raiz_actual.izq.der)-this.altura(raiz_actual.izq.izq))
                    if(nuevo.vendor < raiz_actual.izq.vendor){ //-1 ROTACION IZQUIERDA
                        //console.log("entra a rotacion IZQUIERDA IZQUIERDA");
                        raiz_actual = this.r_izquierda(raiz_actual);
                    }else{ //1 ROTACION IZQ-DERECHA
                        //console.log("entra a rotacion IZQUIERDA DERECHA");
                        raiz_actual = this.r_izq_der(raiz_actual);
                    }
                }
            }else if(raiz_actual.vendor < nuevo.vendor){
                raiz_actual.der = this.insertar_nodo(raiz_actual.der,nuevo);
                //validaciones
                if(this.altura(raiz_actual.der)-this.altura(raiz_actual.izq)==2){
                    //console.log("entra a rotacion DERECHA");
                    if(nuevo.vendor > raiz_actual.der.vendor){ // 1 ROTACION DERECHA
                        //console.log("entra a rotacion DERECHA DERECHA");
                        raiz_actual=this.r_derecha(raiz_actual);
                    }else{//-1 ROTACION DERECHA IZQUIERDA
                        //console.log("entra a rotacion DERECHA IZQUIERDA");
                        raiz_actual = this.r_der_izq(raiz_actual);
                    }
                }

            }else{
                console.log("NO SE PUEDE INSERTAR EL vendor PORQUE YA EXISTE");
            }

            raiz_actual.altura = this.altura_maxima(this.altura(raiz_actual.der),this.altura(raiz_actual.izq))+1;
            return raiz_actual;
        }else{
            raiz_actual = nuevo;
            return raiz_actual;
        }
    }

    altura(nodo){
        if(nodo != null){
            return nodo.altura;
        }else{
            return -1;
        }
    }

    altura_maxima(h1,h2){
        if(h2>=h1){ //************************ MAYOR O IGUAL */
            return h2;
        }else{
            return h1;
        }

    }
    //ROTACIONES
    //simple izquerda
    r_izquierda(nodo){
        let aux = nodo.izq;
        nodo.izq= aux.der;
        aux.der = nodo;
        nodo.altura = this.altura_maxima(this.altura(nodo.der),this.altura(nodo.izq)) +1;
        aux.altura = this.altura_maxima(nodo.altura.altura,this.altura(nodo.izq))+1;
        return aux;
    }
    //simple derecha
    r_derecha(nodo){
        let aux = nodo.der;
        nodo.der= aux.izq;
        aux.izq = nodo;
        nodo.altura = this.altura_maxima(this.altura(nodo.izq),this.altura(nodo.der)) +1;
        aux.altura = this.altura_maxima(nodo.altura.altura,this.altura(nodo.der))+1;
        return aux;
    }

    //rotacion izq-der
    r_izq_der(nodo){
        nodo.izq = this.r_derecha(nodo.izq);
        let aux = this.r_izquierda(nodo);
        return aux;
    }

    //rotacion der-izq
    r_der_izq(nodo){
        nodo.der = this.r_izquierda(nodo.der);
        let aux = this.r_derecha(nodo);
        return aux;
    }

    //****************************************************** */

    preorden(raiz_actual){
        if(raiz_actual != null){
            console.log(raiz_actual.vendor);
            this.preorden(raiz_actual.izq);
            this.preorden(raiz_actual.der);
        }
    }

    inOrden(raiz_actual){
        if(raiz_actual != null){
            this.inOrden(raiz_actual.izq);
            console.log(raiz_actual.vendor,raiz_actual.nombre,raiz_actual.edad,raiz_actual.correo, raiz_actual.password);
            //console.log("altura= "+(this.altura(raiz_actual.der)-this.altura(raiz_actual.iz)))
            console.log(raiz_actual.lista_clientes.mostrar())
            this.inOrden(raiz_actual.der);
            
        }
    }

    postOrden(raiz_actual){
        if(raiz_actual != null){
            this.postOrden(raiz_actual.izq);
            this.postOrden(raiz_actual.der);
            console.log(raiz_actual.vendor);
        }
    }

    generarDot(){
        let cadena="digraph arbol {\n";
        cadena+= this.generar_nodos(this.raiz);
        cadena+="\n";
        cadena+=this.enlazar(this.raiz);
        cadena+="\n}";

        console.log(cadena);
    }

    generar_nodos(raiz_actual){ //metodo preorden
        let nodos ="";
        if(raiz_actual != null){
            nodos+= "n"+raiz_actual.vendor+"[label=\""+raiz_actual.vendor+"\"]\n";
            nodos+=this.generar_nodos(raiz_actual.izq);
            nodos+=this.generar_nodos(raiz_actual.der);
        }
        return nodos;
    }

    enlazar(raiz_actual){
        let cadena="";
        if(raiz_actual != null){
            cadena += this.enlazar(raiz_actual.izq);
            cadena += this.enlazar(raiz_actual.der);
            //validaciones
            if(raiz_actual.izq != null){
                cadena+="n"+raiz_actual.vendor + "-> n"+raiz_actual.izq.vendor+"\n";
            }
            if(raiz_actual.der != null){
                cadena+="n"+raiz_actual.vendor + "-> n"+raiz_actual.der.vendor+"\n";
            }

            
        }
        return cadena;
    }

    metodo_buscar(vendor){
        if(this.raiz == null){
            return null
        }else{
            return this.buscar_recursivo(vendor, this.raiz)
        }

    }
    buscar_recursivo(vendor, nodo_auxiliar){
        if(vendor === nodo_auxiliar.vendor){
            return nodo_auxiliar
        }else if(vendor > nodo_auxiliar.vendor && nodo_auxiliar.der != null){
            return this.buscar_recursivo(vendor, nodo_auxiliar.der)
        }else if(vendor < nodo_auxiliar.vendor && nodo_auxiliar.izq != null){
            return this.buscar_recursivo(vendor, nodo_auxiliar.izq)
        }else{ 
            return null
        }
    }

    inner_costumer(vendor,id, nombre, correo){ //Este método lo hago para insertar un cliente en efecto xd
        let verificar = this.metodo_buscar(vendor)
        //console.log(verificar)
        if(verificar != null){
            verificar.lista_clientes.insertar(id,nombre,correo)
        

        }else{
            console.log("No encontrado", vendor)
        }

    }
}

/******************************************************************************************************* */

class nodo_lista{ //Lista enlazada para los clientes :3
    constructor(id, nombre, correo){
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.siguiente = null;
        this.anterior = null;
    }
}
class listaDoble{
    constructor(){
        this.primero = null;
    }

    insertar(id,nombre, correo){
        let nuevo = new nodo_lista(id, nombre, correo); 

        if(this.primero == null){ //la lista esta vacia
            this.primero = nuevo;
        }else{
            let aux = this.primero;
            while(aux.siguiente != null){
                aux = aux.siguiente;
            };
            aux.siguiente = nuevo;
            nuevo.anterior = aux;
        }
    }

    mostrar(){
        let aux = this.primero;
        console.log(" Mostar Lista ")
        while(aux != null){
            console.log("-> " + aux.id + " " +aux.nombre +" "+ aux.correo);
            aux = aux.siguiente;
        }
    }
}



/*let lista = new listaDoble();
lista.insertar(10, "gato", "pupo@gmail.com");
lista.insertar(12, "Clicli", "chito@gmail.com");
lista.mostrar();*/


/*********************************************************************************************************** */





arbol = new avl();

arbol.insertar(5,"daniel", 23, "dani@gamail.com",890)
arbol.insertar(70, "denisse", 22, "denisse@gmail.com",9044)
arbol.insertar(30,"aaron",22,"papitajames@gmail.com",123)
arbol.insertar(40, 'wendy', 50,"wendyi@gmail.com",89032)
arbol.insertar(20,"clarisa",65,"clarisondia@gmail.com",2432)
arbol.insertar(24,"majo",65,"majo@gmail.com",3457)
arbol.insertar(2,"fer",10,"fer@gmail.com",3457)
arbol.insertar(10,"anto",65,"anto@gmail.com",3457)
arbol.insertar(80,"victor",2,"victor@gmail.com",3457)

arbol.inner_costumer(70, 5, 'sergio',"ser@gmail.com")
arbol.inner_costumer(70, 1, 'denisse',"dennise@gmail.com")
arbol.inner_costumer(30, 5, 'sergio',"ser@gmail.com")
arbol.inner_costumer(30, 3, 'dani',"dani@gmail.com")
arbol.inner_costumer(5, 4, 'sergio',"ser@gmail.com")
arbol.inner_costumer(5, 3, 'wendy',"wendy@gmail.com")
arbol.inner_costumer(80, 4, 'sergio',"ser@gmail.com")
arbol.inner_costumer(80, 1, 'majo',"majo@gmail.com")

arbol.inOrden(arbol.raiz);
//console.log(arbol.metodo_buscar(10));

//arbol.generarDot();