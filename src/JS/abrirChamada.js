var selectSetor = document.getElementById('selectSetor');
var selectTipo = document.getElementById('selectTipo');
var selectPrioridade = document.getElementById('selectPrioridade');
var textoDescricao = document.getElementById('divtextarea')
var divtextarea = document.getElementById('divtextarea')
let file = document.getElementById('file');
let data = new Date();
let dataAno = data.getFullYear()
let dataMes = data.getMonth() + 1
let dataDia = data.getDate()
data = (dataDia+"/"+dataMes+"/"+dataAno)

const UrlPost= "http://192.168.254.4:8080/basicAAbrirChamado"
const nomeUsuario = localStorage.getItem('nome');
var usuario = document.getElementById("usuario").innerHTML = "Usuario: "+nomeUsuario

 const nome_usuario = "";
 const setor = "";
 const desc_chamado = "";
 const andamento_chamado = "";
 const tipo_chamado = "";
 const prioridade_chamado = "";
 const protocolo_chamado = '0';
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
    
    /* var _data = {
        nome_usuario: nomeUsuario,
        setor: valueSelectSetor,
        desc_chamado: textoDescricao.value,
        andamento_chamado: "ABERTO",
        tipo_chamado: valueSelectTipo,
        prioridade_chamado: valueSelectPrioridade,
        protocolo_chamado: protocolo,
        data_chamado: data,
        desc_resolucao: null,
        fechamento_chamado: null,
        link_imagem: protocolo+" - "+file.files[0].name,
        nome_fechamento: null
    } */
    let protocolo = ""
    let aleatorio =  Math.floor(Math.random() * (9999 - 1 + 1)) + 1
    protocolo = protocolo + aleatorio
    console.log(file.files[0])
    let _data = {}
    let nomeImagem = '';
    
    if(file.files[0] == undefined){
        _data = {
        nome_usuario: nomeUsuario,
        setor: valueSelectSetor,
        desc_chamado: textoDescricao.value,
        andamento_chamado: "ABERTO",
        tipo_chamado: valueSelectTipo,
        prioridade_chamado: valueSelectPrioridade,
        protocolo_chamado: protocolo,
        data_chamado: data,
        desc_resolucao: null,
        fechamento_chamado: null,
        link_imagem: nomeImagem,
        nome_fechamento: null
    }
}else {
           _data = {
            nome_usuario: nomeUsuario,
            setor: valueSelectSetor,
            desc_chamado: textoDescricao.value,
            andamento_chamado: "ABERTO",
            tipo_chamado: valueSelectTipo,
            prioridade_chamado: valueSelectPrioridade,
            protocolo_chamado: protocolo,
            data_chamado: data,
            desc_resolucao: null,
            fechamento_chamado: null,
            link_imagem: protocolo+" - "+file.files[0].name,
            nome_fechamento: null
        }
         nomeImagem = protocolo+" - "+file.files[0].name;
    }
    
    //Protocolo Gerado aleatoriamente
    

//////////////////////////////////


//API_POST 255 

       
    fetch(UrlPost, {
        method: "POST",
        body: JSON.stringify(_data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
   
        setTimeout(()=>{
           if(localStorage.getItem('permissao') == 'ADMINISTRADOR'){
               window.location.href='./admIndex.html'
           }
           else if(localStorage.getItem('permissao') == 'BÁSICA'){
            window.location.href='./basicIndex.html'
           }
           else if (localStorage.getItem('permissao') == 'MEDIA'){
            window.location.href='./medioIndex.html'
           }
        },1000)

    var toastHTML = `<span>O seu código do chamado é  # ${protocolo} #</b></span>`;
    M.toast({html: toastHTML});   
    SalvarImagem(nomeImagem);
    textoDescricao.value = ""
        
}
 //////////////////////////////
     //POST request imagem 
    //////////////////////////////

    function SalvarImagem(nomeImagem){
     
        let formData = new FormData();
        
            console.log(file.files[0])
            formData.set('file',file.files[0],nomeImagem)
           
            fetch("http://192.168.254.4:8080/upload",{
                method: "post",
                body: formData
            }).catch(console.log('error'));
               

        //formData.append('file',)
    }
//////////////////////////////
 //////////////////////////////
//////////////////////////////

