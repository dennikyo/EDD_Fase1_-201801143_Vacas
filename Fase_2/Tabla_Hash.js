
//Se van a almacenar vendedor, cliente, productos, id, cantidad

class nodo{
    constructor(id){
        this.id = id;
        this.lista_nueva = new listaDoble();
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

    calcular_hash(id){
        //metodo de division
        let resultado=0;
        resultado= id % this.size;
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
        
        let indice = this.calcular_hash(nuevo.id);

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
                console.log("-->"+this.claves[i].id);
            }else{
                console.log("------------");
            }
        }
    }

    insertar_lista(id_venta,nombre,precio,cantidad){

        for(var i =0;i<this.size;i++){
            if(this.claves[i]!=null){
                if(this.claves[i].id_venta= id_venta){
                    this.claves[i].lista_nueva.insertar_l(id_venta,nombre,precio,cantidad)
                    return 
                    //console.log("-->"+this.claves[i].id);
            }}
        }
    }
    graficar(){
        let contador = 0;
        let cadena= "digraph grafo {\n rankdir=\"LR\" \n";
        for(var i =0;i<this.size;i++){
            if(this.claves[i]!=null){
                
                if(this.claves[i].lista_nueva!=null){
                    cadena+= this.graficar_hash();
                    cadena+= this.enlacess();
                    cadena+= this.claves[i].lista_nueva.graficar_lista(contador);
                    cadena+= this.claves[i].lista_nueva.enlace(contador);

                    /*console.log("-->"+this.claves[i].id);
                    console.log(contador)
                    console.log(this.graficar_hash())

                    console.log(this.enlacess())

                    console.log(this.claves[i].lista_nueva.graficar_lista(contador));
                    console.log(this.claves[i].lista_nueva.enlace(contador));*/
                }
                contador+=1;
                
            
            }
        } cadena+= "}";
        console.log(cadena)
    }
    graficar_hash(){
        let contador = 0;
        let cadena = " "; 
        for(var i =0;i<this.size;i++){
            if(this.claves[i]!=null){
                //console.log("-->"+this.claves[i].id);
                cadena+="n"+ contador+"[label= \""+this.claves[i].id+"\"];\n"
                

            }
        }return cadena
    }
    enlacess(){
        let contador = 0;
        let cadena = " "; 
        for(var i =0;i<this.claves_usadas-1;i++){
            if(this.claves[i]!=null){
                //console.log("-->"+this.claves[i].id);
                cadena+= "n"+i+" -> n"+parseInt(i+1)+"\n";


            }
        }
        return cadena
    }

}

/*******************LISTA DOBLE */
class nodo_lista{ //Lista enlazada para los clientes :3
    constructor(id_venta, nombre,precio, cantidad){
        this.id_venta = id_venta;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.siguiente = null;
        this.anterior = null;
    }
}
class listaDoble{
    constructor(){
        this.primero = null;
    }

    insertar_l(id_venta,nombre,precio,cantidad ){
        let nuevo = new nodo_lista(id_venta, nombre,precio, cantidad); 

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
            console.log("-> " + aux.id_venta + " " +aux.nombre +" "+ aux.precio+ " "+ aux.cantidad);
            aux = aux.siguiente;
        }
    }

    graficar_lista(contador){
        
        let aux = this.primero;
        if(aux != null){
            
            let cadena= " ";
            while(aux != null){
                cadena+="producto"+ contador+aux.id_venta+"[label= \""+ aux.id_venta + " "+ aux.nombre + " "+ aux.precio + " "+ aux.cantidad+"\"];\n"
                if(aux.siguiente!=null){
                    cadena+= "producto"+contador+aux.id_venta+" -> producto"+contador+aux.siguiente.id_venta+"\n";
                }
                //console.log("->" + aux.id_venta + " "+ aux.nombre + " "+ aux.precio + " "+ aux.cantidad)
            
                aux = aux.siguiente;
        }   //console.log(cadena)
            let aux2 = this.primero;
            while(aux2!=null){
                cadena+= "n"+contador+"producto"+ contador+aux2.id_venta
                //console.log("probando")
                return cadena
            }

        
        //console.log(cadena)
    }
            //
    }
    enlace(contador){
        let aux = this.primero;
        if(aux != null){
            
            let cadena= " ";
            while(aux != null){
                cadena+= "n"+contador+"-> producto"+ contador+aux.id_venta;
                return cadena;
                }
    }
}
    }



let tabla = new hash();

tabla.insertar(new nodo(10));
tabla.insertar(new nodo(8));
tabla.insertar(new nodo(2));
tabla.insertar(new nodo(9));
tabla.insertar(new nodo(81));
tabla.insertar(new nodo(12));
tabla.insertar(new nodo(90));
tabla.insertar(new nodo(181));
tabla.insertar(new nodo(112));
tabla.insertar(new nodo(190));


tabla.insertar_lista(10,"a",12,123)
tabla.insertar_lista(8,"b",13,345)
tabla.insertar_lista(2,"c",14,567)

//tabla.recorrer();
tabla.graficar();