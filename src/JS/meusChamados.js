var boxConteiner = document.getElementsByClassName("boxConteiner")
var UrlGet = "http://localhost:8080/admChamadoAberto?admChamadoAberto=";
var UrlGetProtocolo = "http://localhost:8080/admProtocoloChamado/"
var UrlGetAll = "http://localhost:8080/basicNomeUsuario?basicNomeUsuario=filipe";
var numeroChamado = document.getElementById("numeroChamado");


//elementos html 
var divFlexDirection = document.getElementById('divFlexDirection')
console.log(divFlexDirection)
// controle inner html
let tbody = document.getElementById("tbody")
//console.log(documento.innerHTML = txt)


////////////////////////////////////

//Variaveis GetValor
let data_chamado = ""
let fechamentoDoChamado = ""
let Descricao = ""
let resolucao = ""
var select = document.getElementById('selectSituacao')
let teste = document.getElementById("tbody")
console.log(teste)

console.log(select.value)

//Select de busca 
function BuscarChamado(){
    fetch(UrlGet+select.value).then(response =>{
        return response.json();
          }).then(data =>{ 
              let dados = []
            for(let i = 0; i < data.length; i++){
                var protocolo = data[i].protocolo_chamado
                var th = `<tr class="tbody-white" onclick="InserirDados(${protocolo})">
                <th scope="row">1</th>
                <td>${data[i].protocolo_chamado}</td>
                <td>${data[i].data_chamado}</td>
                <td>${data[i].tipo_chamado}</td>
                <td>${data[i].andamento_chamado}</td>
                </tr>`
                dados.push(th)
            }
            tbody.innerHTML = dados
      })
}
//Selecionar bloco
function InserirDados(protocolo){
    console.log(protocolo)
    fetch(UrlGetProtocolo+protocolo).then(response =>{
        return response.json();
          }).then(data =>{   
              console.log(data)
      })
}
//Iniciar em aberto
fetch(UrlGet+select.value).then(response =>{
    return response.json();
      }).then(data =>{ 
          let dados = []
        for(let i = 0; i < data.length; i++){
            var protocolo = data[i].protocolo_chamado
            var th = `<tr class="tbody-white" onclick="InserirDados(${protocolo})">
            <th scope="row">1</th>
            <td>${data[i].protocolo_chamado}</td>
            <td>${data[i].data_chamado}</td>
            <td>${data[i].tipo_chamado}</td>
            <td>${data[i].andamento_chamado}</td>
            </tr>`
            dados.push(th)
        }
        tbody.innerHTML = dados
  })