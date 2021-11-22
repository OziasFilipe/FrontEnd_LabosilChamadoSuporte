
const ApiUserGet = "http://localhost:8080/basicNomeUsuario?basicNomeUsuario=";
var nomeUsuario = "ozias filipe"

var nomeUsuario = "";
var senha = "";

function validar(){
    if( nomeUsuario != "" && senha != "" ){
        //API_GET usuario
        fetch(ApiUserGet+nomeUsuario).then(response =>{
            return response.json();
              }).then(data =>{ 
                  console.log(data)
          })
         
    }
    else{
        alert("Seu usuario ou senha esta incorreto!")
    }
}
     