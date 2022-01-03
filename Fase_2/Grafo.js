
//El grafo se utiliza para almacenar los parametros del id, id interno que se utilizará para las bodegas.
// el nombre de la bodega, y la distancia recorrida puesta en in string
// Se almacenarán en nodos para que se puedan 

class nodo{
    constructor(id, id_interno,nombre, distancia){
        this.id = id;
        this.id_interno = id_interno;
        this.nombre = nombre;
        this.distancia = distancia;
        this.siguiente = null;
        this.anterior = null;
        this.ponderacion=0;
        this.adyasentes = new lista_adyasentes();
    }
}

class lista_adyasentes{
    constructor(){
        this.primero = null;
        this.ultimo = null;
    }

    insertar(id,p,id_interno,nombre, distancia){
        let nuevo = new nodo(id,id_interno,nombre, distancia);
        nuevo.ponderacion = p;
        if(this.primero == null){
            this.primero = nuevo;
            this.ultimo = nuevo;
        }else{
            if(this.primero == this.ultimo){
                this.primero.siguiente = nuevo;
                nuevo.anterior = this.primero;
                this.ultimo = nuevo;
            }else{
                nuevo.anterior = this.ultimo;
                this.ultimo.siguiente = nuevo;
                this.ultimo= nuevo;
            }
        }
    }
}

class grafo{
    constructor(){
        this.primero= null;
        this.ultimo = null;
    }

    insertar(id,id_interno,nombre, distancia){
        let nuevo = new nodo(id,id_interno,nombre, distancia);

        if(this.primero == null){
            this.primero = nuevo;
            this.ultimo = nuevo;
        }else{
            if(this.primero == this.ultimo){
                this.primero.siguiente = nuevo;
                nuevo.anterior = this.primero;
                this.ultimo = nuevo;
            }else{
                nuevo.anterior = this.ultimo;
                this.ultimo.siguiente = nuevo;
                this.ultimo= nuevo;
            }
        }
    }

    buscar(id){
        let aux = this.primero;
        while(aux != null){
            if(aux.id == id){
                return aux;
            }else{
                aux = aux.siguiente;
            }
        }
        return null;
    }

    agregar_adyacente(id, id_adyacente,ponderacion){
        let principal = this.buscar(id);

        if(principal != null){
            principal.adyasentes.insertar(id_adyacente,ponderacion);
        }else{
            console.log("no existe el nodo origen")
        }
    }

    mostrar(){
        let aux = this.primero;
        while(aux != null){
            console.log("-> "+aux.id + " " + aux.id_interno+ " "+aux.nombre+ " "+ aux.distancia);//añandiendo los parametros
            let aux2 = aux.adyasentes.primero;
            while(aux2 != null){
                console.log("   -"+aux2.id + "    -"+aux2.id_interno+"   -"+aux2.nombre+"   -"+aux2.distancia );// too long
                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }
    }

    graficar(){
        let cadena= "digraph grafo {\n rankdir=\"LR\" \n"
        let aux = this.primero;
        while(aux != null){
            cadena+="n"+aux.id+"[label= \""+aux.id+ " " + aux.id_interno+ " "+aux.nombre+ " "+ aux.distancia+"\"];\n"
            aux = aux.siguiente;
        }
        // graficar relaciones
        aux = this.primero;
        while(aux != null){
            let aux2 = aux.adyasentes.primero;
            while(aux2 != null){
                cadena+= "n"+aux.id+" -> n"+aux2.id+" [label=\""+aux2.ponderacion+"km\"]; \n";
                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }
        cadena += "}"
        console.log(cadena);
    }
}

let grafo_prueba = new grafo();
grafo_prueba.insertar(4,5,"pupo_movil", 15);
grafo_prueba.insertar(6,7, "carlos_movil", 16);
grafo_prueba.insertar(9,10,"rodilla_movil",11);
grafo_prueba.insertar(11,14,"clicli_movil",12);
grafo_prueba.insertar(7,3,"matriz",2);
grafo_prueba.insertar(10,5,"cabra",25);

//***** agregar adyacentes */
grafo_prueba.agregar_adyacente(4,6,5);
grafo_prueba.agregar_adyacente(6,4,5);

grafo_prueba.agregar_adyacente(6,9,2);
grafo_prueba.agregar_adyacente(9,6,2);

grafo_prueba.agregar_adyacente(7,9,4);
grafo_prueba.agregar_adyacente(9,7,4);

grafo_prueba.agregar_adyacente(4,10,4);
grafo_prueba.agregar_adyacente(10,4,4);

grafo_prueba.agregar_adyacente(9,11,9);
grafo_prueba.agregar_adyacente(11,9,9);

grafo_prueba.agregar_adyacente(10,11,1);
grafo_prueba.agregar_adyacente(11,10,1);

grafo_prueba.agregar_adyacente(7,10,8);
grafo_prueba.agregar_adyacente(10,7,8);

grafo_prueba.agregar_adyacente(6,11,6);
grafo_prueba.agregar_adyacente(11,6,6);

grafo_prueba.graficar();