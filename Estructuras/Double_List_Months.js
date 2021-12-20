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
        let nuevo = new nodo(mes)
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
lista.insertar(1);

lista.insertar(4);
lista.insertar(2);
lista.mostrar();