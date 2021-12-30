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
        this.lista_meses = new listaDoble_meses()
        
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
            console.log(raiz_actual.lista_meses.mostrar())
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
            nodos+= "n"+raiz_actual.vendor +"[label=\""+raiz_actual.vendor +" " + raiz_actual.nombre +" "+ raiz_actual.edad +" "+ raiz_actual.correo +" "+ raiz_actual.password+"\"]\n";
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

    inner_costumer(vendor,id, nombre, correo){ 
        //Este método lo hago para insertar un cliente en efecto xd
        let verificar = this.metodo_buscar(vendor)
        //console.log(verificar)
        if(verificar != null){
            verificar.lista_clientes.insertar(id,nombre,correo)
        

        }else{
            console.log("No encontrado", vendor)
        }

    }
    inner_mes(vendor,mes){
        let variable = this.metodo_buscar(vendor)
        if(variable != null){
            variable.lista_meses.insertar(mes)

        

        }else{
            console.log("No encontrado", vendor)
        }

    }

    inner_event(vendor,evento,dia,hora,mes){
        try{
        let variable = this.metodo_buscar(vendor)
        if(variable != null){
            let variable_2 = variable.lista_meses.busqueda(mes)
            if(variable_2 == true){
                variable.lista_meses.insertar_evento(evento,dia,hora,mes)
                return 

            }else{
                aux = aux.siguiente;

            }
        }
    }catch(e){
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

/*************************************************MATRIZ */

//Matriz dinámica para calendario, manejar el calendario
// se manejaran meses, 12 como máximo 
//evento, dia, hora 

class in_node{//Este es el nodo interno
    constructor(evento,dia,hora){
        this.evento = evento;
        this.dia = dia;
        this.hora = hora;
        //apuntadores
        this.sig = null;
        this.ant = null;

        this.arriba = null;
        this.abajo = null;
       
    }
}

class lista_interna{
    constructor(){
        this.primero = null;
    }

    insertar_x(evento, dia,hora){ //para las dia usamos sig y ant, y el evento para compara y ordenar es Y
        let nuevo = new in_node(evento,dia,hora);

        if(this.primero == null){
            this.primero = nuevo;
        }else{
            if(nuevo.hora < this.primero.hora){
                nuevo.sig = this.primero;
                this.primero.ant = nuevo;
                this.primero = nuevo;
            }else{
                let aux = this.primero;
                while(aux != null){
                    if(nuevo.hora < aux.hora){
                        nuevo.sig = aux;
                        nuevo.ant = aux.ant;
                        aux.ant.sig = nuevo;
                        aux.ant= nuevo;
                        break;
                    }else if(nuevo.dia == aux.dia && nuevo.hora == aux.hora){
                        console.log("La posicion ya esta ocupada-> "+nuevo.dia+","+nuevo.hora);
                        break;
                    }else{
                        if(aux.sig ==null){
                            aux.sig=nuevo;
                            nuevo.ant = aux;
                            break;
                        }else{
                            aux = aux.sig;
                        }
                    }
                }
            }
        }
    }

    insertar_y(evento, dia,hora){ //para las Y usamos arriba y abajo, y el evento para compara y ordenar es dia
        let nuevo = new in_node(evento,dia,hora);

        if(this.primero == null){
            this.primero = nuevo;
        }else{
            if(nuevo.dia < this.primero.dia){
                nuevo.abajo = this.primero;
                this.primero.arriba = nuevo;
                this.primero = nuevo;
            }else{
                let aux = this.primero;
                while(aux != null){
                    if(nuevo.dia < aux.dia){
                        nuevo.abajo = aux;
                        nuevo.arriba = aux.arriba;
                        aux.arriba.abajo = nuevo;
                        aux.arriba= nuevo;
                        break;
                    }else if(nuevo.dia == aux.dia && nuevo.hora == aux.hora){
                        console.log("La posicion ya esta ocupada-> "+nuevo.dia+","+nuevo.hora);
                        break;
                    }else{
                        if(aux.abajo ==null){
                            aux.abajo=nuevo;
                            nuevo.arriba = aux;
                            break;
                        }else{
                            aux = aux.abajo;
                        }
                    }
                }
            }
        }
    }

    recorrer_x(){
        let aux = this.primero;
        while(aux != null){
            console.log("evento =",aux.evento," - x = ",aux.dia , " hora = ",aux.hora);
            aux = aux.sig;
        }
    }
    recorrer_y(){
        let aux = this.primero;
        while(aux != null){
            console.log("evento =",aux.evento," - dia = ",aux.dia , " hora = ",aux.hora);
            aux = aux.abajo;
        }
    }
}

//**************************** CABECERAS ************************/
class nodo_cabecera{
    constructor(dato){
        this.dato = dato;
        this.sig= null;
        this.ant = null;
        this.lista_interna = new lista_interna();
    }
}

class lista_cabecera{
    constructor(){
        this.primero = null;
    }

    insertar_cabecera(nuevo){

        if(this.primero == null){
            this.primero = nuevo;
        }else{
            if(nuevo.dato<this.primero.dato){
                nuevo.sig = this.primero;
                this.primero.ant=nuevo;
                this.primero = nuevo;
            }else{
                let aux = this.primero;
                while(aux != null){
                    if(nuevo.dato < aux.dato){
                        nuevo.sig = aux;
                        nuevo.ant = aux.ant;
                        aux.ant.sig = nuevo;
                        aux.ant = nuevo;
                        break;
                    }else{
                        if(aux.sig == null){
                            aux.sig = nuevo;
                            nuevo.ant = aux;
                            break;
                        }else{
                            aux = aux.sig;
                        }
                    }
                }
            }
        }
    }

    buscar_cabecera(dato){
        let aux = this.primero;
        while(aux != null){
            if(aux.dato == dato){
                return aux;
            }else{
                aux = aux.sig;
            }
        }
        return null;
    }

    recorrer(){
        let aux = this.primero;
        while(aux != null){
            console.log("dato =",aux.dato);
            aux = aux.sig;
        }
    }
}

//**************************** Matriz ************************/
class matriz{
    constructor(){
        this.cabecetas_x = new lista_cabecera();
        this.cabecetas_y = new lista_cabecera();
    }

    insertar(evento,dia,hora){
        let nodo_cabecera_X = this.cabecetas_x.buscar_cabecera(dia);
        let nodo_cabecera_y = this.cabecetas_y.buscar_cabecera(hora);

        if(nodo_cabecera_X == null){
            nodo_cabecera_X =  new nodo_cabecera(dia);
            this.cabecetas_x.insertar_cabecera(nodo_cabecera_X);
        }

        if(nodo_cabecera_y == null){
            nodo_cabecera_y =  new nodo_cabecera(hora);
            this.cabecetas_y.insertar_cabecera(nodo_cabecera_y);
        }

        //insertar en cabecera X
        nodo_cabecera_X.lista_interna.insertar_x(evento,dia,hora);
        //insertar en cabecera Y
        nodo_cabecera_y.lista_interna.insertar_y(evento,dia,hora);
    }

    recorrer_matriz(){
        console.log("cabeceras en X");
        let aux = this.cabecetas_x.primero;
        while(aux != null){
            console.log("   pos->"+aux.dato);
            let aux2 = aux.lista_interna.primero;
            while(aux2!= null){
                console.log("       -"+aux2.evento);
                aux2 = aux2.sig;
            }
            aux = aux.sig;
        }

        console.log("cabeceras en Y");
        aux = this.cabecetas_y.primero;
        while(aux != null){
            console.log("   pos->"+aux.dato);
            let aux2 = aux.lista_interna.primero;
            while(aux2!= null){
                console.log("       -"+aux2.evento);
                aux2 = aux2.abajo;
            }
            aux = aux.sig;
        }
    }

    /*********************************************************** */

    graficar_matriz(){
        try{
        let cadena="";
        cadena+= "digraph Matriz{ \n";
        cadena+= "node[shape = box,width=0.7,height=0.7,fillcolor=\"azure2\" color=\"white\" style=\"filled\"];\n";
        cadena+= "edge[style = \"bold\"]; \n"
        //graficar el nodo matriz
        cadena+="node[label = Matriz fillcolor=\" darkolivegreen1\" pos = \"-1,1!\"]principal;"
        //graficar cabeceras X
        let aux_x = this.cabecetas_x.primero;
        while(aux_x!=null){
            cadena+="node[label = "+aux_x.dato+" fillcolor=\" azure1\" pos = \""+aux_x.dato+",1!\"]x"+aux_x.dato+";\n"
            aux_x = aux_x.sig;
        }
        aux_x = this.cabecetas_x.primero;
        while(aux_x.sig != null){
            cadena+="x"+aux_x.dato+"->"+"x"+aux_x.sig.dato+";\n"
            cadena+="x"+aux_x.sig.dato+"->"+"x"+aux_x.dato+";\n"
            aux_x = aux_x.sig;
        }

        if(this.cabecetas_x.primero!= null){
            cadena+="principal->x"+this.cabecetas_x.primero.dato+";\n";
        }
        //graficar cabeceras Y
        let aux_y = this.cabecetas_y.primero;
        while(aux_y!=null){
            cadena+="node[label = "+aux_y.dato+" fillcolor=\" azure1\" pos = \"-1,-"+aux_y.dato+"!\"]y"+aux_y.dato+";\n"
            aux_y = aux_y.sig;
        }
        aux_y = this.cabecetas_y.primero;
        while(aux_y.sig != null){
            cadena+="y"+aux_y.dato+"->"+"y"+aux_y.sig.dato+";\n"
            cadena+="y"+aux_y.sig.dato+"->"+"y"+aux_y.dato+";\n"
            aux_y = aux_y.sig;
        }

        if(this.cabecetas_x.primero!= null){
            cadena+="principal->y"+this.cabecetas_y.primero.dato+";\n";
        }
        //graficar nodos internos
        aux_x = this.cabecetas_x.primero;
        while(aux_x!=null){ //recorrer listas de x para graficar los nodos de sus lista interna
            let aux = aux_x.lista_interna.primero;
            while(aux!=null){
                cadena+="   node[label = "+aux.evento+" fillcolor=\" gold2\" pos = \""+aux.dia+",-"+aux.hora+"!\"]x"+aux.dia+"y"+aux.hora+";\n"
                aux = aux.sig;
            }

            //graficar flechitas
            aux = aux_x.lista_interna.primero;
            while(aux.sig!= null){
                cadena+="   x"+aux.dia+"y"+aux.hora+"->x"+aux.sig.dia+"y"+aux.sig.hora+";\n";
                cadena+="   x"+aux.sig.dia+"y"+aux.sig.hora+"->x"+aux.dia+"y"+aux.hora+";\n";
                aux= aux.sig;
            }
            if(aux_x.lista_interna.primero!= null){
                cadena+="x"+aux_x.dato+"->"+"x"+aux_x.lista_interna.primero.dia+"y"+aux_x.lista_interna.primero.hora+";\n";
            }

            aux_x = aux_x.sig;
        }

        aux_y = this.cabecetas_y.primero;
        while(aux_y!=null){ //recorrer la lista de y para graficar cada lista
            //graficar flechitas Y
            let aux = aux_y.lista_interna.primero;
            while(aux.abajo!= null){
                cadena+="   x"+aux.dia+"y"+aux.hora+"->x"+aux.abajo.dia +"y"+aux.abajo.hora+";\n";
                cadena+="   x"+aux.abajo.dia+"y"+aux.abajo.hora+"->x"+aux.dia+"y"+aux.hora+";\n";
                aux= aux.abajo;
            }
            if(aux_y.lista_interna.primero!= null){
                cadena+="y"+aux_y.dato+"->"+"x"+aux_y.lista_interna.primero.dia+"y"+aux_y.lista_interna.primero.hora+";\n";
            }
            aux_y = aux_y.sig;
        }

        cadena+= "\n}"
        console.log(cadena);
    }catch(e){
    }
    }




    /*********************************************************** */


}


// LISTA DE MESES
class nodo_meses{
    constructor(mes){
        this.mes = mes;
        this.siguiente = null;
        this.anterior = null;
        this.matriz = new matriz() //Matriz
    }
}

class listaDoble_meses{
    constructor(){
        this.primero = null;
        

        
    }

    insertar(mes){
        let nuevo = new nodo_meses(mes)
            if (this.primero == null) {
                this.primero = nuevo
            } else {
                if (nuevo.mes < this.primero.mes) {
                    nuevo.siguiente = this.primero
                    this.primero.anterior = nuevo
                    this.primero = nuevo
                } else {
                    let aux = this.primero
                    while (aux != null) {
                        if (nuevo.mes < aux.mes) {
                            nuevo.siguiente = aux
                            nuevo.anterior = aux.anterior
                            aux.anterior.siguiente = nuevo
                            aux.anterior = nuevo
                            break
                        } else if (nuevo.mes === aux.mes) {
                            console.log("El mes ya esta en uso", aux.mes)
                            break
                        } else {
                            if (aux.siguiente == null) {
                                aux.siguiente = nuevo
                                nuevo.anterior = aux
                                break
                            } else {
                                aux = aux.siguiente
                            }
                        }
                    }
                }
            }
    }

    mostrar(){
        let aux = this.primero;
        console.log(" Mostrar Lista ")
        while(aux != null){
            console.log(aux.mes)
            aux.matriz.graficar_matriz()
            aux = aux.siguiente;

        }
    }
    
    insertar_evento(evento,dia,hora,mes){
        let aux = this.primero;
        while(aux != null){
            //console.log(aux.mes,mes)
            if(aux.mes == mes){
        
                //aux.matriz.insertar(evento,dia,hora)
                //console.log("PUPO")
                aux.matriz.insertar(evento,dia,hora)
                return 

            }else{
                aux = aux.siguiente;
                
            }
            
        }
        
        return console.log("Nodo no encontrado")  

    }


    busqueda(mes){
        let aux = this.primero;
        
        while(aux != null){
            if(aux.mes == mes){
                return true
            }else{
            aux = aux.siguiente;
        }
    }   return false
    
    }
}


/************************************************************************ */



//let lista  = new listaDoble_meses();
let arbol = new avl();

let lista = new listaDoble();


lista.insertar(12,"fnio","dshfuirf@gmail.com")
lista.insertar(12,"fdffo","dshfuirf@gmail.com")
lista.insertar(22,"fnrfgr","dshfuirf@gmail.com")
lista.insertar(13,"fnirgrv","dshfuirf@gmail.com")
lista.mostrar()


arbol.insertar(3)
arbol.insertar(2)
arbol.insertar(4)
arbol.insertar(3)
arbol.insertar(1)
arbol.insertar(9)

arbol.insertar(50,"daniel", 23, "dani@gamail.com",890)
arbol.insertar(10, "denisse", 22, "denisse@gmail.com",9044)
arbol.insertar(60,"aaron",22,"papitajames@gmail.com",123)
arbol.insertar(20, 'wendy', 50,"wendyi@gmail.com",89032)
arbol.insertar(70,"clarisa",65,"clarisondia@gmail.com",2432)
arbol.insertar(30,"majo",65,"majo@gmail.com",3457)
arbol.insertar(80,"fer",10,"fer@gmail.com",3457)
arbol.insertar(40,"anto",65,"anto@gmail.com",3457)
arbol.insertar(90,"victor",2,"victor@gmail.com",3457)
arbol.insertar(85,"gato",22,"coceh@gmail.com", 123)


arbol.inner_costumer(30, 8, 'sergio',"ser@gmail.com")
arbol.inner_costumer(70, 1, 'denisse',"dennise@gmail.com")
arbol.inner_costumer(30, 5, 'sergio',"ser@gmail.com")
arbol.inner_costumer(60, 3, 'dani',"dani@gmail.com")
arbol.inner_costumer(90, 4, 'sergio',"ser@gmail.com")
arbol.inner_costumer(20, 3, 'wendy',"wendy@gmail.com")
arbol.inner_costumer(80, 4, 'sergio',"ser@gmail.com")
arbol.inner_costumer(80, 1, 'majo',"majo@gmail.com")
arbol.inner_costumer(20, 1, 'majo',"majo@gmail.com")


//arbol.generarDot();




/*prueba.insertar(6)
prueba.insertar(7)
prueba.insertar(8)
prueba.insertar(9)
prueba.insertar(10)
prueba.insertar_evento("evetn",2,6,6)
prueba.insertar_evento("evet1",3,1,7)
prueba.insertar_evento("evet2",4,2,8)
prueba.insertar_evento("evet3",5,3,9)
prueba.insertar_evento("evet4",6,5,10)
prueba.mostrar()


arbol.insertar(3)
arbol.insertar(2)
arbol.insertar(4)
arbol.insertar(3)
arbol.insertar(1)
arbol.insertar(9)


arbol.insertar_evento("hola",3,5,3)
arbol.insertar_evento("dias",4,1,4)
arbol.insertar_evento("buenas",3,1,3)
arbol.insertar_evento("sadjfln lkdfmg lflkmgsl pd",2,3,4)
arbol.insertar_evento( "que",10,1,5)
arbol.insertar_evento("bye",1,2,1)
arbol.insertar_evento("fkla",5,3,2)
arbol.insertar_evento("fkla",8,3,9)




d.insertar(3)
d.insertar(8)
d.insertar(5)
d.insertar_evento("pupoevento",3,5,3)
d.insertar_evento("pupo",4,1,8)

d.insertar_evento("vento",1,1,8)

d.insertar_evento("qwpqwh",2,3,8)

d.insertar_evento("cuascuas",10,1,8)

d.insertar_evento("miaumiau",1,2,5)

d.insertar_evento("pupoevento",3,3,8) 
d.mostrar()


/*************************************************** */

/*let lista = new listaDoble();
lista.insertar(10, "gato", "pupo@gmail.com");
lista.insertar(12, "Clicli", "chito@gmail.com");
lista.mostrar();
*/

/*********************************************************************************************************** */






/******************************************************************** */



//vendor,nombre,edad,correo,password
/*arbol.insertar(50,"daniel", 23, "dani@gamail.com",890)
arbol.insertar(10, "denisse", 22, "denisse@gmail.com",9044)
arbol.insertar(60,"aaron",22,"papitajames@gmail.com",123)
arbol.insertar(20, 'wendy', 50,"wendyi@gmail.com",89032)
arbol.insertar(70,"clarisa",65,"clarisondia@gmail.com",2432)
arbol.insertar(30,"majo",65,"majo@gmail.com",3457)
arbol.insertar(80,"fer",10,"fer@gmail.com",3457)
arbol.insertar(40,"anto",65,"anto@gmail.com",3457)
arbol.insertar(90,"victor",2,"victor@gmail.com",3457)

arbol.inner_costumer(30, 8, 'sergio',"ser@gmail.com")
arbol.inner_costumer(70, 1, 'denisse',"dennise@gmail.com")
arbol.inner_costumer(30, 5, 'sergio',"ser@gmail.com")
arbol.inner_costumer(60, 3, 'dani',"dani@gmail.com")
arbol.inner_costumer(90, 4, 'sergio',"ser@gmail.com")
arbol.inner_costumer(20, 3, 'wendy',"wendy@gmail.com")
arbol.inner_costumer(80, 4, 'sergio',"ser@gmail.com")
arbol.inner_costumer(80, 1, 'majo',"majo@gmail.com")
arbol.inner_costumer(20, 1, 'majo',"majo@gmail.com")

inner_costumer(vendor,id, nombre, correo)
insertar_evento(vendor,mes,evento,dia,hora)*/


//arbol.insertar_mes(20, 3)
 
/*arbol.inner_mes(20,2)
arbol.inner_mes(80,4)
arbol.inner_mes(90,3)
arbol.inner_mes(80,1)
arbol.inner_mes(90,9)


arbol.inner_event(20,3,"hola",3,5)
arbol.inner_event(80,4,"dias",4,1)
arbol.inner_event(90,3,"buenas",1,1)
arbol.inner_event(80,4,"sadjfln lkdfmg lflkmgsl pd",2,3)
arbol.inner_event(90,5, "que",10,1)
arbol.inner_event(80,1,"bye",1,2)
arbol.inner_event(20,2,"fkla",3,3)
arbol.inner_event(90,9,"fkla",3,3)

arbol.inOrden(arbol.raiz);

console.log(arbol.metodo_buscar(10));*/


/************************** CARGA MASIVA***************************** 
function lectura(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
      return;
    }
    let diccionario = ""
    var lee = new FileReader();
    lee.onload = function(e) {
      var contenido = e.target.result;
      const ms = JSON.stringify(contenido);
      diccionario = JSON.parse(contenido)
      let tamanio = diccionario.vendedores.length
      //let eve = diccionario.vendedores.eventos.length
      try{
          for(i=0; i<tamanio; i ++){
            console.log(diccionario['vendedores'][i]['id'])
            //let eve =diccionario['vendedores'][i]['id'].length
            /*for(x=0; x<eve; x++){
               console.log('mes',diccionario['vendedores'][i]['eventos'][x]['mes'])
               
            } 
              
          }
        
      
}catch(e){
    window.alert(e)
}
      //mostrarContenido(contenido);
    }
    lee.readAsText(archivo);
  }
  
  function muestra(contenido) {
    var elemento = document.getElementById('data-clientes');
    elemento.innerHTML = contenido;
  }
  
  document.getElementById('clientes-input')
    .addEventListener('change', lectura, false);

function mostrando(){
    d.mostrar();
}
*/