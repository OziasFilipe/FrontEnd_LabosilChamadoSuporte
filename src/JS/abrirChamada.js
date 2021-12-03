var selectSetor = document.getElementById('selectSetor');
var selectTipo = document.getElementById('selectTipo');
var selectPrioridade = document.getElementById('selectPrioridade');
var textoDescricao = document.getElementById('divtextarea')
var divtextarea = document.getElementById('divtextarea')

let data = new Date();
let dataAno = data.getFullYear()
let dataMes = data.getMonth() + 1
let dataDia = data.getDate()
data = (dataDia+"/"+dataMes+"/"+dataAno)

const UrlGet= "http://localhost:8080/admServicoAll";
const UrlPost= "http://localhost:8080/basicAAbrirChamado"
const nomeUsuario = localStorage.getItem('nome');
var usuario = document.getElementById("usuario").innerHTML = "Usuario: "+nomeUsuario

 const nome_usuario = "";
 const setor = "";
 const desc_chamado = "";
 const andamento_chamado = "";
 const tipo_chamado = "";
 const prioridade_chamado = "";
 const protocolo_chamado = 0;
 const data_chamado = "";

function  OpenChamada(){ 
    if(divtextarea.value != ""){
        postAbrirChamado();
        var toastHTML = `<span>O seu chamado foi criado com sucesso</b></span>`;
        M.toast({html: toastHTML});
    }
    else{
        var toastHTML = `<span>Desculpe o campo descrição está vazio</b></span>`;
        M.toast({html: toastHTML});
    }
}
    //////////////////////////////
     //GET request Chamado
    //////////////////////////////
function BuscarChamado(){
    //API_GET
fetch(UrlGet).then(response =>{
    return response.json();
      }).then(data =>{ 
          console.log(data)    
  })
}
    //////////////////////////////
     //POST request Abrir Chamado
    //////////////////////////////
const postAbrirChamado = ()=>{

    let valueSelectSetor = selectSetor.options[selectSetor.selectedIndex].value;
    let valueSelectTipo = selectTipo.options[selectTipo.selectedIndex].value;
    let valueSelectPrioridade = selectPrioridade.options[selectPrioridade.selectedIndex].value;
    //Protocolo Gerado aleatoriamente
    
    let protocolo = ""
    let aleatorio =  Math.floor(Math.random() * (9999 - 1 + 1)) + 1
    protocolo = protocolo + aleatorio

//////////////////////////////////

    let _data = {
        nome_usuario: nomeUsuario,
        setor: valueSelectSetor,
        desc_chamado: textoDescricao.value,
        andamento_chamado: "ABERTO",
        tipo_chamado: valueSelectTipo,
        prioridade_chamado: valueSelectPrioridade,
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

     textoDescricao.value = ""
     var toastHTML = `<span>O seu código do chamado é  # ${protocolo} #</b></span>`;
        M.toast({html: toastHTML});
     
    
}
//////////////////////////////
 //////////////////////////////
//////////////////////////////

