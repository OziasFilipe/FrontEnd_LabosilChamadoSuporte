var selectSetor = document.getElementById('selectSetor');
var selectTipo = document.getElementById('selectTipo');
var selectPrioridade = document.getElementById('selectPrioridade');
var textoDescricao = document.getElementById('divtextarea')
let data = new Date();
let dataAno = data.getFullYear()

const UrlGet= "http://localhost:8080/admServicoAll";
const UrlPost= "http://localhost:8080/basicAAbrirChamado"


 const nome_usuario = "";
 const setor = "";
 const desc_chamado = "";
 const andamento_chamado = "";
 const tipo_chamado = "";
 const prioridade_chamado = "";
 const protocolo_chamado = 0;
 const data_chamado = "";



function  OpenChamada(){ 
    postAbrirChamado();
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
    console.log("setor: "+valueSelectSetor)
    console.log("Tipo: "+valueSelectTipo)
    console.log("Prioridade: "+valueSelectPrioridade)
    //Protocolo Gerado aleatoriamente
 
    let protocolo = ""
    let aleatorio =  Math.floor(Math.random() * (9999 - 1 + 1)) + 1
    protocolo = protocolo + aleatorio

//////////////////////////////////

    let _data = {
        nome_usuario: "null",
        setor: valueSelectSetor,
        desc_chamado: textoDescricao.value,
        andamento_chamado: "aberto",
        tipo_chamado: valueSelectTipo,
        prioridade_chamado: valueSelectPrioridade,
        protocolo_chamado: protocolo,
        data_chamado: "null"
    }
        //API_POST 255 
    fetch(UrlPost, {
        method: "POST",
        body: JSON.stringify(_data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(json => console.log(json));
     alert("O seu codigo do chamado é  #"+protocolo+"#</b>")
}
//////////////////////////////
 //////////////////////////////
//////////////////////////////


