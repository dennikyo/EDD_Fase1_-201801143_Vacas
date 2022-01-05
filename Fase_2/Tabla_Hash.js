
/** TABLA HASH :O LOL */
// La tabla hash almacena los parametros de: id_venta, nombre_vendedor, nombre del cliente y total de la venta
class nodo{
    constructor(id_venta,nombre_vendedor,nombre_cliente, total_venta){
        this.id_venta = id_venta;
        this.nombre_vendedor = nombre_vendedor;
        this.nombre_cliente = nombre_cliente;
        this.total_venta = total_venta;
    }
}

class hash{
    constructor(){
        this.claves = this.iniciar_arreglo(7);
        this.claves_usadas=0;
        this.size = 7;
    }

    iniciar_arreglo(tamaño){
        let claves=[];
        for(var i =0;i<tamaño,i++;){
            claves[i] = null;
        }
        return claves;
    }

    calcular_hash(id_venta){ //,nombre_vendedor,nombre_cliente, total_venta
        //metodo de division
        let resultado=0;
        resultado= id_venta % this.size; // agregar aqui o no agregar los parametros? o solo es sufieciente comparando el id
        return resultado;
    }

    solucion_coliciones(indice){ //metodo de exploracion cuadratica
        let nuevo_indice =0;
        let i=0;
        let disponible = false;

        while(disponible == false){
            nuevo_indice = indice + Math.pow(i,2);
            //validar que nuevo_indice sea menor al tañano de la tabla
            if(nuevo_indice>= this.size){
                nuevo_indice = nuevo_indice-this.size;
            }
            //validar que la posicion del nuevo indice este disponible
            if(this.claves[nuevo_indice]==null){
                disponible= true;
            }
            i++;
        }
        return nuevo_indice;
    }

    insertar(nuevo){
        
        let indice = this.calcular_hash(nuevo.id_venta, nuevo.nombre_vendedor, nuevo.nombre_cliente, nuevo.total_venta);
        //Aqui arriba no se si es correcto agregar todos los parámetros o si sólo es necesario con el priemro del id
        //validaciones 
        if(this.claves[indice]==null){ //posicion disponible
            this.claves[indice] = nuevo;
            this.claves_usadas++;
        }else{ // existe una colicion
            indice =  this.solucion_coliciones(indice);
            this.claves[indice] = nuevo;
            this.claves_usadas++
        }

        //validacion de tamaño
        let Porcentaje_uso = this.claves_usadas/this.size;
        if(Porcentaje_uso>=0.5){
            this.rehash();
        }
    }

    rehash(){
        //****** Encontrar el siguiente numero primo */
        let primo= false;
        let new_size = this.size;
        while(primo==false){
            new_size++;
            let cont =0;
            for(var i = new_size;i>0; i--){
                if(new_size%i ==0){
                    cont++;
                }
            }
            //validar cuantas veces se dividio exactamente
            if(cont == 2){
                primo= true
            }
        }
        //****** crear nuevo arreglo con el tamaño del siguente numero primo */
        let claves_aux = this.claves;

        this.size = new_size;
        this.claves = this.iniciar_arreglo(new_size);
        this.claves_usadas=0;

        for(var i =0; i<claves_aux.length;i++){
            if(claves_aux[i]!=null){
                this.insertar(claves_aux[i]);
            }
        }
    }

    recorrer(){
        for(var i =0;i<this.size;i++){
            if(this.claves[i]!=null){
                console.log("-->"+this.claves[i].id_venta+this.claves[i].nombre_vendedor+this.claves[i].nombre_cliente);
            }else{
                console.log("------------");
            }
        }
    }
}

let tabla = new hash();

tabla.insertar(new nodo(10,"pupo","licha"));
tabla.insertar(new nodo(8,"pupo","licha"));
tabla.insertar(new nodo(2,"pupo","licha"));
tabla.insertar(new nodo(9,"pupo","licha"));
tabla.insertar(new nodo(81,"pupo","licha"));
tabla.insertar(new nodo(12,"pupo","licha"));
tabla.insertar(new nodo(90,"pupo","licha"));
tabla.insertar(new nodo(181,"pupo","licha"));
tabla.insertar(new nodo(112,"pupo","licha"));
tabla.insertar(new nodo(190,"pupo","licha"));
tabla.recorrer();