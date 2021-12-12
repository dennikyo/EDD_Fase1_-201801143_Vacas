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
        nuevo = nodo(valor);

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
}