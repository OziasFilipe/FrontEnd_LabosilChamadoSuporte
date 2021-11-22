    
let ApiUserGet = "http://localhost:8080/basicNomeUsuario?basicNomeUsuario=";
let nomeUsuario = "ozias filipe"
alert(ApiUserGet)
let nomeUsuario = "a";
let senha = "a";


function Validar(){

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
     