
//El grafo se utiliza para almacenar los parametros del id, id interno que se utilizará para las bodegas.
// el nombre de la bodega, y la distancia recorrida puesta en in string
// Se almacenarán en nodos para que se puedan 

//const { isVariableDeclaration } = require("typescript");

class nodo{
    constructor(id,nombre, distancia){
        this.id = id;
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

    insertar(id,p,nombre){
        let nuevo = new nodo(id,nombre);
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

    insertar(id,nombre){
        let nuevo = new nodo(id,nombre);

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
            console.log("-> "+aux.id + " "+aux.nombre);//añandiendo los parametros
            let aux2 = aux.adyasentes.primero;
            while(aux2 != null){
                console.log("   -"+aux2.id + " -"+aux2.nombre+"   -"+aux2.distancia );// too long
                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }
    }

    graficar(){
        let cadena= "digraph grafo {\n rankdir=\"LR\" \n"
        let aux = this.primero;
        while(aux != null){
            cadena+="n"+aux.id+"[label= \""+aux.id+ " "+aux.nombre+"\"];\n"
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
/*grafo_prueba.insertar(4,"pupo_movil");
grafo_prueba.insertar(6,"carlos_movil");
grafo_prueba.insertar(9,"rodilla_movil");
grafo_prueba.insertar(11,"clicli_movil");
grafo_prueba.insertar(7,"matriz");
grafo_prueba.insertar(10,"cabra");
grafo_prueba.insertar(8,"meme");
grafo_prueba.insertar(12,"goat");
grafo_prueba.insertar(20,"matru");
grafo_prueba.insertar(15,"cabro");
//***** agregar adyacentes */
/*grafo_prueba.agregar_adyacente(4,6,5);
grafo_prueba.agregar_adyacente(6,8,7);

grafo_prueba.agregar_adyacente(6,9,2);
grafo_prueba.agregar_adyacente(9,12,2);

grafo_prueba.agregar_adyacente(7,9,4);
grafo_prueba.agregar_adyacente(9,20,4);

grafo_prueba.agregar_adyacente(4,10,4);
grafo_prueba.agregar_adyacente(10,15,4);

grafo_prueba.agregar_adyacente(9,11,9);
grafo_prueba.agregar_adyacente(11,9,9);

grafo_prueba.agregar_adyacente(10,11,1);
grafo_prueba.agregar_adyacente(11,10,1);

grafo_prueba.agregar_adyacente(7,10,8);
grafo_prueba.agregar_adyacente(10,7,8);

grafo_prueba.agregar_adyacente(6,11,6);
grafo_prueba.agregar_adyacente(11,6,6);

grafo_prueba.agregar_adyacente(8,11,6);
grafo_prueba.agregar_adyacente(11,6,6);
*/




//Carga masiva del archivo del grafo 
function lectura_grafo(e) {
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
      let tamanio = diccionario.rutas.length
      
      try{
          for(i=0; i<tamanio; i ++){
           
              //console.log(i)
              console.log(diccionario['rutas'][i]['id'])
              console.log(diccionario['rutas'][i]['nombre'])
              console.log(diccionario['rutas'][i]['adyacentes'])
              grafo_prueba.insertar(diccionario['rutas'][i]['id'],diccionario['rutas'][i]['nombre'])
              
              variable= diccionario['rutas'][i]['adyacentes'].length
              for(x=0;x<variable;x++){
                  console.log('id',diccionario['rutas'][i]['adyacentes'][x]['id'])
                  console.log('nombre',diccionario['rutas'][i]['adyacentes'][x]['nombre'])
                  console.log('distancia',diccionario['rutas'][i]['adyacentes'][x]['distancia'])
                  grafo_prueba.agregar_adyacente(('id',diccionario['rutas'][i]['adyacentes'][x]['id'],'nombre'),(diccionario['rutas'][i]['adyacentes'][x]['nombre']),('distancia',diccionario['rutas'][i]['adyacentes'][x]['distancia']))
                  
                }

            
             
          }
          grafo_prueba.graficar();
        
      
}catch(e){
    window.alert(e)
}



      //mostrarContenido(contenido);
    }
    lee.readAsText(archivo);
  }
  document.getElementById('file-inputo')
  .addEventListener('change', lectura_grafo, false);

  function mostrando(){
    grafo_prueba.graficar()
}