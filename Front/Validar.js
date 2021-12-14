function ir(){

    var c=1234;
    var u = "Admin";

    if(document.forms.password.value==c && document.forms.login.value == u){
            alert("Bienvenido");
            window.location = "Registro_Cliente.html";
        }
    else{
    alert("Porfavor ingresa el nombre u usuario correctos.");
        }
    
}