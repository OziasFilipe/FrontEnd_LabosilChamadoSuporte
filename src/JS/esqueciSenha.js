let data = new Date();
let dataAno = data.getFullYear()
let dataMes = data.getMonth() + 1
let dataDia = data.getDate()
data = (dataDia+"/"+dataMes+"/"+dataAno)
let perfilVerificado = false
const ApiUserGet = "http://192.168.254.4:8080/usuarioLogin?usuarioLogin=";
const UrlPost= "http://192.168.254.4:8080/basicAAbrirChamado"
let nomeUsuario = document.getElementById('inputUser')
let email = document.getElementById('inputEmail')
let setorSelect = document.getElementById('inputSelect')
let optionValue = ""




function  Validacao(){
  
    fetch(ApiUserGet+nomeUsuario.value).then(response =>{
        return response.json()
    }).then(data=>{
        
        
        if(data.length == 0){
            
            var toastHTML = '<span>Seu usuario não existe!</span>';
            M.toast({html: toastHTML});
            perfilVerificado = false
           
        }
        if(nomeUsuario.value == data[0].nome_usuario && email.value !=""){
            var toastHTML = '<span>Chamado Enviado com sucesso</span>';
            M.toast({html: toastHTML});
            postAbrirChamado();
            perfilVerificado = true
        }
        else{
            var toastHTML = '<span>Usuario incorreto</span>';
            M.toast({html: toastHTML});
            perfilVerificado = false
        }
    })
}
     

  //////////////////////////////
     //POST request Abrir Chamado
    //////////////////////////////
    const postAbrirChamado = ()=>{

     
        //Protocolo Gerado aleatoriamente
        
        let protocolo = ""
        let aleatorio =  Math.floor(Math.random() * (9999 - 1 + 1)) + 1
        protocolo = protocolo + aleatorio
    
    //////////////////////////////////
    optionValue = setorSelect.options[setorSelect.selectedIndex].value;
    
        let _data = {
            nome_usuario: nomeUsuario.value,
            setor: optionValue,
            desc_chamado: "Esqueci a minha senha: "+email.value,
            andamento_chamado: "aberto",
            tipo_chamado: "suporte",
            prioridade_chamado: "alta",
            protocolo_chamado: protocolo,
            data_chamado: data
        }
            //API_POST 255 
    
        fetch(UrlPost, {
            method: "POST",
            body: JSON.stringify(_data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
        var toastHTML = `<span>O seu codigo do chamado é  #"+${protocolo}+"#</b></span>`;
            M.toast({html: toastHTML});
            alert(`O seu codigo do chamado é  # ${protocolo} #`)
         
    }
    //////////////////////////////
     //////////////////////////////
    //////////////////////////////
    
    




