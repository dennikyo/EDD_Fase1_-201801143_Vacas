class nodo{ //Lista enlazada para los clientes :3
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
        let nuevo = new nodo(id, nombre, correo); 

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
let lista = new listaDoble();


function insertar_data(){

    let nuevo_valor = document.getElementById('nuevo').value;
    console.log(nuevo_valor)
    lista.insertar(nuevo_valor);
    document.getElementById('nuevo').value;
    let valor_numero = document.getElementById('numb').value;
    console.log(valor_numero);
    lista.insertar(valor_numero);
    document.getElementById('numb').value;
    let valor_email = document.getElementById('emal').value;
    console.log(valor_email);
    lista.insertar(valor_email);
    document.getElementById('emal').value;
    lista.mostrar();



    //console.log("nuevo->" +nuevo_valor  )
    //console.log("correo->" + valor_email)
    //console.log("numero->"+  valor_numero)
}
function imprimir(){
    lista.mostrar()

}




/**
lista.insertar(10, "gato", "pupo@gmail.com");
lista.insertar(12, "Clicli", "chito@gmail.com");
lista.mostrar();**/