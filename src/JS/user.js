
//iMAGEM , ULTIMO USUARIO , VALIDAÇÃO DE USUARIO 
const ApiUserGet = "http://192.168.254.4:8080/usuarioLogin?usuarioLogin=";
let perfilVerificado = false 
var nomeUsuario = document.getElementById('inputUser')
var senha = document.getElementById('inputSenha')
var buttonUser = document.getElementById('buttonUser')
var formulario = document.getElementById('formulario')
var action = document.createElement("action").innerHTML = "./src/template/admin/admIndex.html"

Start();
function Start(){
if(localStorage.getItem('nome') != ""){
     let nome = localStorage.getItem('nome')
     fetch(ApiUserGet+nome).then(response=>{
        return response.json();
     }).then(data =>{
        if(data[0].permissao == "ADMINISTRADOR"){              
            window.location.href='./src/template/admin/admIndex.html'
            var toastHTML = `<span>Seja bem-vindo(a)!</b></span>`;
               M.toast({html: toastHTML});   
       }
       else if(data[0].permissao == "BÁSICA"){
           window.location.href='./src/template/basic/basicIndex.html'
           var toastHTML = `<span>Seja bem-vindo(a)!</b></span>`;
           M.toast({html: toastHTML});
       }
       else if(data[0].permissao == "MEDIA"){
            window.location.href='./src/template/medio/medioIndex.html'
           var toastHTML = `<span>Seja bem-vindo(a)!</b></span>`;
           M.toast({html: toastHTML});
       }
     })
} }
function validar(){
    if( nomeUsuario.value.toUpperCase() != "" && senha.value.toUpperCase() != ""  ){
        //API_GET usuario
        fetch(ApiUserGet+nomeUsuario.value).then(response =>{
            return response.json();
                }).then(data =>{ 
                    console.log(data)
                    if(data.length == 0){
                        var toastHTML = `<span>Seu Usuário não existe!</b></span>`;
                        M.toast({html: toastHTML});
                    }
                        if(data[0].nome_usuario == nomeUsuario.value.toUpperCase() && data[0].senha == senha.value.toUpperCase()){
                            if(data[0].permissao == "ADMINISTRADOR"){
                                
                                 formulario.setAttribute("action","./src/template/admin/admIndex.html")
                                 var toastHTML = `<span>Seja bem-vindo(a)!</b></span>`;
                                    M.toast({html: toastHTML});
                                    
                            }
                            else if(data[0].permissao == "BÁSICA"){
                                formulario.setAttribute("action","./src/template/basic/basicIndex.html")
                                var toastHTML = `<span>Seja bem-vindo(a)!</b></span>`;
                                M.toast({html: toastHTML});
                            }
                            else if(data[0].permissao == "MEDIA"){
                                formulario.setAttribute("action","./src/template/medio/medioIndex.html")
                                var toastHTML = `<span>Seja bem-vindo(a)!</b></span>`;
                                M.toast({html: toastHTML});
                            }
                            buttonUser.style="background-color:#15769c"
                            perfilVerificado = true;
                            localStorage.setItem('nome',data[0].nome_usuario)
                    }else{
                        var toastHTML = `<span>Usuário ou senha inválida</b></span>`;
                        M.toast({html: toastHTML});
                        perfilVerificado = false;
                    }
            })
        }
    else{
        var toastHTML = `<span>Usuário ou senha inválida</b></span>`;
        M.toast({html: toastHTML});
        perfilVerificado = false;
    }
}
     