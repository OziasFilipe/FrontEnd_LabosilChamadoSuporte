var boxConteiner = document.getElementsByClassName("boxConteiner")
var UrlGet = "http://localhost:8080/admProtocoloChamado/";
var UrlGetAll = "http://localhost:8080/basicNomeUsuario?basicNomeUsuario=ozias filipe";
var numeroChamado = document.getElementById("numeroChamado");

var aberturaChamado = document.getElementById("aberturaChamado")
var teste = aberturaChamado.appendChild("<p></p>")
console.log(aberturaChamado)

//Variaveis GetValor
let data_chamado = ""
let fechamentoDoChamado = ""
let Descricao = ""
let resolucao = ""

function BuscarChamado(){
    
    if(numeroChamado.value != ""){

        fetch(UrlGet+numeroChamado.value).then(response=>{
            return response.json()
        }).then(data=>{
            console.log(data[0])
            if(data[0] == undefined){
                alert("Codigo não foi encontrado!")
            }else{
                data_chamado = data[0].data_chamado
                console.log(aberturaDoChamado)
            }
        })
    }
    else{
        fetch(UrlGetAll).then(response=>{
            return response.json()
        }).then(data=>{
            console.log(data)
            if(data[0] == undefined){
                alert("Codigo não foi encontrado!")
            }
        })
    }
}
