class nodo{ //Este arbol binario de búsqueda será para los proveedores 
    //Entonces declaro los datos de los proveedores 
    constructor(id, nombre, direccion, telefono, correo){
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correo = correo;
        this.izq = null;
        this.der = null;
    } 
}
// De aquí para abajo ya se empieza a cambiar el parámetro de "dato", por todos los que agregué
class abb{
    constructor(){
        this.raiz = null;
    }

    insertar(valor){
        let nuevo = new nodo(valor);

        if(this.raiz == null){
            this.raiz= nuevo;
        }else{
            this.raiz = this.insertar_nodo(this.raiz,nuevo);
        }
    }

    insertar_nodo(raiz_actual,nuevo){
        if(raiz_actual != null){
            //recorriendo mijos
            //No está terminado el árbol 
            if(raiz_actual.id > nuevo.id){
                raiz_actual.izq = this.insertar_nodo(raiz_actual.izq,nuevo);

            }else if(raiz_actual.id < nuevo.id){
                raiz_actual.der = this.insertar_nodo(raiz_actual.der,nuevo);
            }else{
                console.log("NO SE PUEDE INSERTAR EL DATO PORQUE YA EXISTE");
            }

            return raiz_actual;
        }else{
            raiz_actual = nuevo;
            return raiz_actual;
        }
    }

    preorden(raiz_actual){
        if(raiz_actual !=null){
        console.log(raiz_actual.id);
        this.preorden(raiz_actual.izq);
        this.preorden(raiz_actual.der);


    }
}

    inorden(raiz_actual){
        if(raiz_actual != null){
            this.inorden(raiz_actual.izq);
            console.log(raiz_actual.id);
            this.inorden(raiz_actual.der);

        }
    }

    postorden(raiz_actual){
        if(raiz_actual != null){
            this.postorden(raiz_actual.izq);
            this.postorden(raiz_actual.der);
            console.log(raiz_actual.id);
            

        }
    }

    GenerarDot(){
        let cadena = "digraph arbol {\n";
        cadena+= this.Generar_Nodos(this.raiz);
        cadena+= "\n";
        cadena+= this.Enlazar_Nodos(this.raiz);
        cadena+="\n}";

        console.log(cadena);

    }

    Generar_Nodos(raiz_actual){ //copia del metodo preorden jeje xd
        let nodos = "";
        if(raiz_actual != null){
            nodos+= "n" + raiz_actual.id + "[label=\""+raiz_actual.id+"\"]\n";
            nodos+=this.Generar_Nodos(raiz_actual.izq);
            nodos+=this.Generar_Nodos(raiz_actual.der);
        }
        return nodos;
    }

    Enlazar_Nodos(raiz_actual){

        let cadena = "";
        if(raiz_actual != null){
            cadena += this.Enlazar_Nodos(raiz_actual.izq);
            //Valindando para la izquierda
            if(raiz_actual.izq != null){
                cadena+= "n" +raiz_actual.id + "->" + "n" + raiz_actual.izq.id + "\n";
            }
            //Valindando para la izquierda
            if(raiz_actual.der != null){
                cadena+= "n" +raiz_actual.id + "->" + "n" + raiz_actual.der.id +"\n";
            }

            cadena +=this.Enlazar_Nodos(raiz_actual.der);

        }
        return cadena;
    }



}
arbol = new abb();
arbol.insertar(10);
arbol.insertar(5);
arbol.insertar(15);
arbol.insertar(7);
console.log("***PUPO PREORDEN***");
arbol.preorden(arbol.raiz);
console.log("\n***PUPO INORDEN***");
arbol.inorden(arbol.raiz);
console.log("\n***PUPO POSTORDEN***");
arbol.postorden(arbol.raiz);

arbol.GenerarDot();


