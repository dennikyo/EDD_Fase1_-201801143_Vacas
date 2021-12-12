class nodo{
    constructor(mes){
        this.mes = mes;
        this.siguiente = null;
        this.anterior = null;
    }
}

class listaDoble{
    constructor(){
        this.primero = null;
    }

    insertar(mes){
        let nuevo = new nodo(mes); 

        if(this.primero == null){ //la lista esta vaciaxd
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
            console.log("-> " + aux.mes);
            aux = aux.siguiente;
        }
    }
}

let lista = new listaDoble();

lista.insertar(1);
lista.insertar(2);
lista.insertar(3);
lista.insertar(4);
lista.mostrar();