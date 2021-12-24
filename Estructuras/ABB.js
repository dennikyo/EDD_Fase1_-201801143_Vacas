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

    insertar(id, nombre, direccion, telefono, correo){
        let nuevo = new nodo(id, nombre, direccion, telefono, correo);

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
            console.log(raiz_actual.id,raiz_actual.nombre, raiz_actual.direccion, raiz_actual.telefono, raiz_actual.correo)
        this.preorden(raiz_actual.izq);
        this.preorden(raiz_actual.der);


    }
}

    inorden(raiz_actual){
        if(raiz_actual != null){
            this.inorden(raiz_actual.izq);
            console.log(raiz_actual.id,raiz_actual.nombre, raiz_actual.direccion, raiz_actual.telefono, raiz_actual.correo)
            this.inorden(raiz_actual.der);

        }
    }

    postorden(raiz_actual){
        if(raiz_actual != null){
            this.postorden(raiz_actual.izq);
            this.postorden(raiz_actual.der);
            console.log(raiz_actual.id,raiz_actual.nombre, raiz_actual.direccion, raiz_actual.telefono, raiz_actual.correo)
            

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
            nodos+= "n" + raiz_actual.id + "[label=\""+raiz_actual.id+" "+raiz_actual.nombre+" "+raiz_actual.direccion+" "+raiz_actual.telefono+" "+raiz_actual.correo+"\"]\n";
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
/**  // MÉTODO DE ELIMINAR FALLIDO 
 * n delete(root,id_tree){
        if( this.root == null){
            return this.root
        }
        if(this.root.id > id_tree){
            this.root.left = this.delete(this.root.left, id_tree)
        }else if(this.root.id < id_tree){
            this.root.right = this.delete(this.root.right, id_tree)
        }else{
            if(this.root.right != null){
                return this.root.left
            }
            if( this.root.left != null){
                return this.root.right
            }
            let temp = this.root.right

            let val = temp.id
            while (temp.left){
                temp = temp?.left
                val = temp.id
            }
            root.right = this.delete(root.right,root.id)

        }
        return root
    }
 * 
 */


arbol = new abb();
/*arbol.insertar(10,"nombre","lamaya18", 123456,"pupo@gmail.com");
arbol.insertar(5, "denisse", "duruelo52", 35249001, "denisse@gmail.com");
arbol.insertar(15, "daniel", "colonialareformita", 192837,"zdani@gmail.com");
arbol.insertar(7, "timytorner", "casttlewase", 12345678, "misca@gmail.com");
arbol.insertar(25, "yunikua", "lacasademickymaus",9876543, "mini@gmail.com");
arbol.insertar(3, "sopero", "pupomansion", 5643872, "puperto@gmail.com");
arbol.insertar(8, "gato","michiciudad", 11111111, "chito@gmail.com");
arbol.insertar(17, "clicli", "clicliciudad", 8282373, "cuicui@gmail.com");
arbol.insertar(14,"clarisa", "clarisondia",8273940, "clarisondia@gmail.com");
console.log("***PUPO PREORDEN***");
arbol.preorden(arbol.raiz);
console.log("\n***PUPO INORDEN***");
arbol.inorden(arbol.raiz);
console.log("\n***PUPO POSTORDEN***");
arbol.postorden(arbol.raiz);

arbol.GenerarDot();*/

function insertar_manual(){
    var id = document.getElementById('id').value
    var nombre =  document.getElementById('nombre').value
    let direccion = document.getElementById('direccion').value
    let telefono = document.getElementById('telefono').value
    let correo = document.getElementById('correo').value

    if(id!= "" && nombre!= "" && direccion!= "" && telefono!= "" && correo!=""){
        console.log(id,nombre,direccion,telefono,correo)

    }else{
        window.alert("datos mal ingresados")
    }

}





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
      let tamanio = diccionario.proveedores.length
      try{
          for(i=0; i<tamanio; i ++){
              /*console.log(i)
              console.log(diccionario['proveedores'][i]['id'])
              console.log(diccionario['proveedores'][i]['nombre'])
              console.log(diccionario['proveedores'][i]['direccion'])
              console.log(diccionario['proveedores'][i]['telefono'])
              console.log(diccionario['proveedores'][i]['correo'])*/
              arbol.insertar(diccionario['proveedores'][i]['id'],diccionario['proveedores'][i]['nombre'],diccionario['proveedores'][i]['direccion'],diccionario['proveedores'][i]['telefono'],diccionario['proveedores'][i]['correo'])
          }
        
      
}catch(e){
    window.alert(e)
}



      //mostrarContenido(contenido);
    }
    lee.readAsText(archivo);
  }
  
  function muestra(contenido) {
    var elemento = document.getElementById('contenido-archivo');
    elemento.innerHTML = contenido;
  }
  
  document.getElementById('file-input')
    .addEventListener('change', lectura, false);

function mostrando(){
    arbol.GenerarDot();
}



