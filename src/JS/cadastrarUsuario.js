let putUrl = "http://localhost:8080/admACreateUsuario"

let nomeUsuario = document.getElementById('inputNomeUsuario')
let repetirSenha = document.getElementById('inputUser')
let senha = document.getElementById('inputSenha')
let permissao = document.getElementById('inputSelect')
let optionValue = "basic"

///
//Função de Criação De conta HTTPS: POST 
///

//fetch: Função de busca de dados via HTTPS::: GET
//Função Select permissão de conta e chamada da função PostData
function CriarConta(){
    optionValue = permissao.options[permissao.selectedIndex].value;
    PostData()
}
//Função PostData valida os campos se estao vazias ou semelhantes uma com a outra
//Fetch: Função de busca de dados via HTTPS::: POST
//
function PostData(){
    //Validação de conta
    if(senha.value == repetirSenha.value && nomeUsuario.value != "" && senha.value != ""){
     let putValor ={
        nome_usuario: nomeUsuario.value,
        senha: senha.value,
        nome_completo: nomeUsuario.value,
        permissao: optionValue
    }
  
    //Insert post no banco de dados
    fetch(putUrl, {
        method: "POST",
        body: JSON.stringify(putValor),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => response.json()) 
        .then(json =>{

            var toastHTML = `<span>Usuário cadastrado com sucesso</b></span>`;
            M.toast({html: toastHTML});
             nomeUsuario.value = ""
             repetirSenha.value = ""
             senha.value = ""

        });
       
}
else{
    var toastHTML = `<span> Senha ou usuario não conferem</b></span>`;
        M.toast({html: toastHTML});
}
}