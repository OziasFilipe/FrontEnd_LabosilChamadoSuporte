let getUrl = "http://192.168.254.4:8080/usuarioLogin?usuarioLogin="
let putUrl = "http://192.168.254.4:8080/admACreateUsuario"
    let usuario = localStorage.getItem('nome');
    let inputSenha = document.getElementById("inputUser");
    let inputNovaSenha = document.getElementById("inputSenha");
    var perfilVerificado = false;

    //Função Validar
    function Validacao(){
       if(inputSenha.value == inputNovaSenha.value && inputSenha.value != "" && inputNovaSenha.value != ""){
        fetch(getUrl+usuario).then(response=>{
            return response.json()
        }).then(data=>{
            PutDate(data[0]);
    })
}       else{
            var toastHTML = `<span>Senha não confere.</b></span>`;
            M.toast({html: toastHTML});
            }
        }
    function PutDate(data){
        if(data.nome_completo != ""){
        
        let putValor ={
            id: data.id,
            nome_usuario: data.nome_usuario,
            senha: inputNovaSenha.value,
            nome_completo: data.nome_completo,
            permissao: data.permissao
        }
        fetch(putUrl, {
            method: "POST",
            body: JSON.stringify(putValor),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
            .then(response => response.json()) 
            .then(json => console.log(json));
            var toastHTML = `<span>Senha alterada com sucesso</b></span>`;
            M.toast({html: toastHTML});
            inputSenha.value = ""
            inputNovaSenha.value = ""
    }
    }

