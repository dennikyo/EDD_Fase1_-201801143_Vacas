//Matriz dinámica para calendario, manejar el calendario
// se manejaran meses, 12 como máximo 
//evento, dia, hora 

class in_node{//Este es el nodo interno
    constructor(evento,dia,hora){
        this.evento = evento;
        this.dia = dia;
        this.hora = hora;
        //apuntadores
        this.sig = null;
        this.ant = null;

        this.arriba = null;
        this.abajo = null;
       
    }
}

class lista_interna{
    constructor(){
        this.primero = null;
    }

    insertar_x(evento, dia,hora){ //para las dia usamos sig y ant, y el evento para compara y ordenar es Y
        let nuevo = new in_node(evento,dia,hora);

        if(this.primero == null){
            this.primero = nuevo;
        }else{
            if(nuevo.hora < this.primero.hora){
                nuevo.sig = this.primero;
                this.primero.ant = nuevo;
                this.primero = nuevo;
            }else{
                let aux = this.primero;
                while(aux != null){
                    if(nuevo.hora < aux.hora){
                        nuevo.sig = aux;
                        nuevo.ant = aux.ant;
                        aux.ant.sig = nuevo;
                        aux.ant= nuevo;
                        break;
                    }else if(nuevo.dia == aux.dia && nuevo.hora == aux.hora){
                        console.log("La posicion ya esta ocupada-> "+nuevo.dia+","+nuevo.hora);
                        break;
                    }else{
                        if(aux.sig ==null){
                            aux.sig=nuevo;
                            nuevo.ant = aux;
                            break;
                        }else{
                            aux = aux.sig;
                        }
                    }
                }
            }
        }
    }

    insertar_y(evento, dia,hora){ //para las Y usamos arriba y abajo, y el evento para compara y ordenar es dia
        let nuevo = new in_node(evento,dia,hora);

        if(this.primero == null){
            this.primero = nuevo;
        }else{
            if(nuevo.dia < this.primero.dia){
                nuevo.abajo = this.primero;
                this.primero.arriba = nuevo;
                this.primero = nuevo;
            }else{
                let aux = this.primero;
                while(aux != null){
                    if(nuevo.dia < aux.dia){
                        nuevo.abajo = aux;
                        nuevo.arriba = aux.arriba;
                        aux.arriba.abajo = nuevo;
                        aux.arriba= nuevo;
                        break;
                    }else if(nuevo.dia == aux.dia && nuevo.hora == aux.hora){
                        console.log("La posicion ya esta ocupada-> "+nuevo.dia+","+nuevo.hora);
                        break;
                    }else{
                        if(aux.abajo ==null){
                            aux.abajo=nuevo;
                            nuevo.arriba = aux;
                            break;
                        }else{
                            aux = aux.abajo;
                        }
                    }
                }
            }
        }
    }

    recorrer_x(){
        let aux = this.primero;
        while(aux != null){
            console.log("evento =",aux.evento," - x = ",aux.dia , " hora = ",aux.hora);
            aux = aux.sig;
        }
    }
    recorrer_y(){
        let aux = this.primero;
        while(aux != null){
            console.log("evento =",aux.evento," - dia = ",aux.dia , " hora = ",aux.hora);
            aux = aux.abajo;
        }
    }
}

//**************************** CABECERAS ************************/
class nodo_cabecera{
    constructor(dato){
        this.dato = dato;
        this.sig= null;
        this.ant = null;
        this.lista_interna = new lista_interna();
    }
}

class lista_cabecera{
    constructor(){
        this.primero = null;
    }

    insertar_cabecera(nuevo){

        if(this.primero == null){
            this.primero = nuevo;
        }else{
            if(nuevo.dato<this.primero.dato){
                nuevo.sig = this.primero;
                this.primero.ant=nuevo;
                this.primero = nuevo;
            }else{
                let aux = this.primero;
                while(aux != null){
                    if(nuevo.dato < aux.dato){
                        nuevo.sig = aux;
                        nuevo.ant = aux.ant;
                        aux.ant.sig = nuevo;
                        aux.ant = nuevo;
                        break;
                    }else{
                        if(aux.sig == null){
                            aux.sig = nuevo;
                            nuevo.ant = aux;
                            break;
                        }else{
                            aux = aux.sig;
                        }
                    }
                }
            }
        }
    }

    buscar_cabecera(dato){
        let aux = this.primero;
        while(aux != null){
            if(aux.dato == dato){
                return aux;
            }else{
                aux = aux.sig;
            }
        }
        return null;
    }

    recorrer(){
        let aux = this.primero;
        while(aux != null){
            console.log("dato =",aux.dato);
            aux = aux.sig;
        }
    }
}

//**************************** Matriz ************************/
class matriz{
    constructor(){
        this.cabecetas_x = new lista_cabecera();
        this.cabecetas_y = new lista_cabecera();
    }

    insertar(evento,dia,hora){
        let nodo_cabecera_X = this.cabecetas_x.buscar_cabecera(dia);
        let nodo_cabecera_y = this.cabecetas_y.buscar_cabecera(hora);

        if(nodo_cabecera_X == null){
            nodo_cabecera_X =  new nodo_cabecera(dia);
            this.cabecetas_x.insertar_cabecera(nodo_cabecera_X);
        }

        if(nodo_cabecera_y == null){
            nodo_cabecera_y =  new nodo_cabecera(hora);
            this.cabecetas_y.insertar_cabecera(nodo_cabecera_y);
        }

        //insertar en cabecera X
        nodo_cabecera_X.lista_interna.insertar_x(evento,dia,hora);
        //insertar en cabecera Y
        nodo_cabecera_y.lista_interna.insertar_y(evento,dia,hora);
    }

    recorrer_matriz(){
        console.log("cabeceras en X");
        let aux = this.cabecetas_x.primero;
        while(aux != null){
            console.log("   pos->"+aux.dato);
            let aux2 = aux.lista_interna.primero;
            while(aux2!= null){
                console.log("       -"+aux2.evento);
                aux2 = aux2.sig;
            }
            aux = aux.sig;
        }

        console.log("cabeceras en Y");
        aux = this.cabecetas_y.primero;
        while(aux != null){
            console.log("   pos->"+aux.dato);
            let aux2 = aux.lista_interna.primero;
            while(aux2!= null){
                console.log("       -"+aux2.evento);
                aux2 = aux2.abajo;
            }
            aux = aux.sig;
        }
    }

    /*********************************************************** */

    graficar_matriz(){
        let cadena="";
        cadena+= "digraph Matriz{ \n";
        cadena+= "node[shape = box,width=0.7,height=0.7,fillcolor=\"azure2\" color=\"white\" style=\"filled\"];\n";
        cadena+= "edge[style = \"bold\"]; \n"
        //graficar el nodo matriz
        cadena+="node[label = Matriz fillcolor=\" darkolivegreen1\" pos = \"-1,1!\"]principal;"
        //graficar cabeceras X
        let aux_x = this.cabecetas_x.primero;
        while(aux_x!=null){
            cadena+="node[label = "+aux_x.dato+" fillcolor=\" azure1\" pos = \""+aux_x.dato+",1!\"]x"+aux_x.dato+";\n"
            aux_x = aux_x.sig;
        }
        aux_x = this.cabecetas_x.primero;
        while(aux_x.sig != null){
            cadena+="x"+aux_x.dato+"->"+"x"+aux_x.sig.dato+";\n"
            cadena+="x"+aux_x.sig.dato+"->"+"x"+aux_x.dato+";\n"
            aux_x = aux_x.sig;
        }

        if(this.cabecetas_x.primero!= null){
            cadena+="principal->x"+this.cabecetas_x.primero.dato+";\n";
        }
        //graficar cabeceras Y
        let aux_y = this.cabecetas_y.primero;
        while(aux_y!=null){
            cadena+="node[label = "+aux_y.dato+" fillcolor=\" azure1\" pos = \"-1,-"+aux_y.dato+"!\"]y"+aux_y.dato+";\n"
            aux_y = aux_y.sig;
        }
        aux_y = this.cabecetas_y.primero;
        while(aux_y.sig != null){
            cadena+="y"+aux_y.dato+"->"+"y"+aux_y.sig.dato+";\n"
            cadena+="y"+aux_y.sig.dato+"->"+"y"+aux_y.dato+";\n"
            aux_y = aux_y.sig;
        }

        if(this.cabecetas_x.primero!= null){
            cadena+="principal->y"+this.cabecetas_y.primero.dato+";\n";
        }
        //graficar nodos internos
        aux_x = this.cabecetas_x.primero;
        while(aux_x!=null){ //recorrer listas de x para graficar los nodos de sus lista interna
            let aux = aux_x.lista_interna.primero;
            while(aux!=null){
                cadena+="   node[label = "+aux.evento+" fillcolor=\" gold2\" pos = \""+aux.dia+",-"+aux.hora+"!\"]x"+aux.dia+"y"+aux.hora+";\n"
                aux = aux.sig;
            }

            //graficar flechitas
            aux = aux_x.lista_interna.primero;
            while(aux.sig!= null){
                cadena+="   x"+aux.dia+"y"+aux.hora+"->x"+aux.sig.dia+"y"+aux.sig.hora+";\n";
                cadena+="   x"+aux.sig.dia+"y"+aux.sig.hora+"->x"+aux.dia+"y"+aux.hora+";\n";
                aux= aux.sig;
            }
            if(aux_x.lista_interna.primero!= null){
                cadena+="x"+aux_x.dato+"->"+"x"+aux_x.lista_interna.primero.dia+"y"+aux_x.lista_interna.primero.hora+";\n";
            }

            aux_x = aux_x.sig;
        }

        aux_y = this.cabecetas_y.primero;
        while(aux_y!=null){ //recorrer la lista de y para graficar cada lista
            //graficar flechitas Y
            let aux = aux_y.lista_interna.primero;
            while(aux.abajo!= null){
                cadena+="   x"+aux.dia+"y"+aux.hora+"->x"+aux.abajo.dia +"y"+aux.abajo.hora+";\n";
                cadena+="   x"+aux.abajo.dia+"y"+aux.abajo.hora+"->x"+aux.dia+"y"+aux.hora+";\n";
                aux= aux.abajo;
            }
            if(aux_y.lista_interna.primero!= null){
                cadena+="y"+aux_y.dato+"->"+"x"+aux_y.lista_interna.primero.dia+"y"+aux_y.lista_interna.primero.hora+";\n";
            }
            aux_y = aux_y.sig;
        }

        cadena+= "\n}"
        console.log(cadena);
    }




    /*********************************************************** */


}


// LISTA DE MESES
class nodo_meses{
    constructor(mes){
        this.mes = mes;
        this.siguiente = null;
        this.anterior = null;
        this.matriz = new matriz() //Matriz
    }
}

class listaDoble_meses{
    constructor(){
        this.primero = null;
        

        
    }

    insertar(mes){
        let nuevo = new nodo_meses(mes)
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
        console.log(" Mostrar Lista ")
        while(aux != null){
            console.log(aux.mes)
            aux.matriz.graficar_matriz()
            aux = aux.siguiente;

        }
    }
    
    insertar_evento(evento,dia,hora,mes){
        let aux = this.primero;
        while(aux != null){
            //console.log(aux.mes,mes)
            if(aux.mes == mes){
        
                //aux.matriz.insertar(evento,dia,hora)
                //console.log("PUPO")
                aux.matriz.insertar(evento,dia,hora)
                return 

            }else{
                aux = aux.siguiente;
                
            }
            
        }
        
        return console.log("Nodo no encontrado")  

    }


    busqueda(mes){
        let aux = this.primero;
        
        while(aux != null){
            if(aux.mes == mes){
                return true
            }else{
            aux = aux.siguiente;
        }
    }   return false
    
    }
}




/************************************************************************ */



let d  = new listaDoble_meses();

/*prueba.insertar(6)
prueba.insertar(7)
prueba.insertar(8)
prueba.insertar(9)
prueba.insertar(10)
prueba.insertar_evento("evetn",2,6,6)
prueba.insertar_evento("evet1",3,1,7)
prueba.insertar_evento("evet2",4,2,8)
prueba.insertar_evento("evet3",5,3,9)
prueba.insertar_evento("evet4",6,5,10)
prueba.mostrar()*/


/*arbol.insertar(3)
arbol.insertar(2)
arbol.insertar(4)
arbol.insertar(3)
arbol.insertar(1)
arbol.insertar(9)


arbol.insertar_evento("hola",3,5,3)
arbol.insertar_evento("dias",4,1,4)
arbol.insertar_evento("buenas",3,1,3)
arbol.insertar_evento("sadjfln lkdfmg lflkmgsl pd",2,3,4)
arbol.insertar_evento( "que",10,1,5)
arbol.insertar_evento("bye",1,2,1)
arbol.insertar_evento("fkla",5,3,2)
arbol.insertar_evento("fkla",8,3,9)
*/



/*d.insertar(3)
d.insertar(8)
d.insertar(5)
d.insertar_evento("pupoevento",3,5,3)
d.insertar_evento("pupo",4,1,8)

d.insertar_evento("vento",1,1,8)

d.insertar_evento("qwpqwh",2,3,8)

d.insertar_evento("cuascuas",10,1,8)

d.insertar_evento("miaumiau",1,2,5)

d.insertar_evento("pupoevento",3,3,8) 
d.mostrar()*/


/************************** CARGA MASIVA***************************** */
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
      let tamanio = diccionario.vendedores.length
      //let eve = diccionario.vendedores.eventos.length
      try{
          for(i=0; i<tamanio; i ++){
            //console.log(diccionario['vendedores'][i]['id'])
            let eve =diccionario['vendedores'][i]['eventos'].length
            for(x=0; x<eve; x++){
               console.log('mes',diccionario['vendedores'][i]['eventos'][x]['mes'])
               console.log('dia',diccionario['vendedores'][i]['eventos'][x]['dia'])
               console.log('hora',diccionario['vendedores'][i]['eventos'][x]['hora'])
               console.log('desc',diccionario['vendedores'][i]['eventos'][x]['desc'])
                d.insertar('mes',diccionario['vendedores'][i]['eventos'][x]['mes'],'dia',diccionario['vendedores'][i]['eventos'][x]['dia'],'hora',diccionario['vendedores'][i]['eventos'][x]['hora'],'desc',diccionario['vendedores'][i]['eventos'][x]['desc'])
            } 
              
          }
        
      
}catch(e){
    window.alert(e)
}
      //mostrarContenido(contenido);
    }
    lee.readAsText(archivo);
  }
  
  function muestra(contenido) {
    var elemento = document.getElementById('data');
    elemento.innerHTML = contenido;
  }
  
  document.getElementById('calendar-input')
    .addEventListener('change', lectura, false);

function mostrando(){
    d.mostrar();
}