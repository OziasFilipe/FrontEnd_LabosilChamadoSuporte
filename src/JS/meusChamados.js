//Variavel de elemento
var boxConteiner = document.getElementsByClassName("boxConteiner")
var numeroChamado = document.getElementById("numeroChamado");
var divFlexDirection = document.getElementById('divFlexDirection')
let tbody = document.getElementById("tbody")
let aberturaChamado = document.getElementById("aberturaChamado")
var Desc = document.getElementById("Descrição")
var select = document.getElementById('selectSituacao')
let teste = document.getElementById("tbody")
let DescricaoResolucao = document.getElementById('DescriçãoResolucao')
let fechamentoData = document.getElementById('fechamentoData')


// Variavel Filtro Data
var FiltroData = []
//
//Variavel LocalStorege
//
var valorUsuario = localStorage.getItem('nome')
//
//Variavel String URL:
//
var UrlGetAll = `http://192.168.254.4:8080/basicNomeUsuario?basicNomeUsuario=${valorUsuario}`;
var UrlGet = "http://192.168.254.4:8080/admChamadoAberto?admChamadoAberto=";
var UrlGetProtocolo = "http://192.168.254.4:8080/admProtocoloChamado/"


//Função de busca data da abertura e chamado descrição 
function buscar(data){
    aberturaChamado.value = data.data_chamado
    Desc.value = data.desc_chamado
    fechamentoData.value = data.fechamento_chamado
    if(data.desc_resolucao != null ){
        fechamentoData.value = data.fechamento_chamado
        DescricaoResolucao.value = data.desc_resolucao
    }
}
//Função de Buscar chamado atraves do HTTPS: POST
function BuscarChamado(){
    //fetch Busca todas as rotinas do banco de dados e valida somente as do usuarios
    fetch(UrlGet+select.value).then(response =>{
        return response.json();
          }).then(data =>{ 
              let dados = []
              var numero = 0;
              FiltroData = data
              //Loop para validar se o usuario possui aquela rotina
            for(let i = 0; i < data.length; i++){
                //Variavel 
                var protocolo = data[i].protocolo_chamado
                var th = `<tr class="tbodyTr"" onclick="InserirDados(${protocolo})">
                <th scope="row">${numero}</th>
                    <td onclick="buscar(${data[i]})">${data[i].protocolo_chamado}</td>
                    <td onclick="buscar(${data[i]})">${data[i].data_chamado}</td>
                    <td onclick="buscar(${data[i]})">${data[i].tipo_chamado}</td>
                    <td onclick="buscar(${data[i]})">${data[i].andamento_chamado}</td>
                </tr>`
                //Validação para incluir dentro do Array se o elemento existe
                if(data[i].nome_usuario == valorUsuario ){
                    numero = numero+1
                    dados.push(th)
                }
               
            }
            //tbody e o corpo da tabela, com essa variavel e possivel incluir elementos Th e Td dentro da tabela de acordo com o Loop acima
            tbody.innerHTML = dados.join('')
      })
}
//Inserir Dados dentro do banco 
function InserirDados(protocolo){
    fetch(UrlGetProtocolo+protocolo).then(response =>{
        return response.json();
          }).then(data =>{   
              buscar(data[0])
      })
}
//Iniciar em aberto
fetch(UrlGet+select.value).then(response =>{
    return response.json();
      }).then(data =>{ 
          let dados = []
          FiltroData = data
          let contagem = 0
        for(let i = 0; i < data.length; i++){
            var protocolo = data[i].protocolo_chamado
            var th = `<tr class="tbodyTr" onclick="InserirDados(${protocolo})">
            <th scope="row">${contagem}</th>
            <td onclick="buscar(${data[i]})">${data[i].protocolo_chamado}</td>
            <td onclick="buscar(${data[i]})">${data[i].data_chamado}</td>
            <td onclick="buscar(${data[i]})">${data[i].tipo_chamado}</td>
            <td onclick="buscar(${data[i]})">${data[i].andamento_chamado}</td>
            </tr>`
            if(data[i].nome_usuario == valorUsuario){
                dados.push(th)
                console.log(th)
                teste = false
                contagem = contagem+1
            }
            
        }
       
        tbody.innerHTML = dados.join('')
        
  })

  //Funcao de filtro por data de abertura
  function filtroDataAbertura(){
    let dataAbertura = document.getElementById('dataAbertura')
    ConverterData(dataAbertura.value,"abertura");

}

 //Funcao de filtro por data de fechamento
function filtroDataFechamento(){
    let dataFechamento = document.getElementById('dataFechamento')
    ConverterData(dataFechamento.value,"fechamento");
}

 //Funcao converte a data para o formato do banco de dados
function ConverterData(dataFormato,tipoFiltro){
    function adicionaZero(numero){
        if (numero <= 9) 
            return "0" + numero;
        else
            return numero; 
    }
    
    console.log(dataFormato)
    let dataAtual = new Date(dataFormato); //29/01/2020
    let dataAtualFormatada = (adicionaZero(dataAtual.getDate()+1) + "/" + (adicionaZero(dataAtual.getMonth()+1).toString()) + "/" + dataAtual.getFullYear());
    console.log(tipoFiltro+": "+dataAtualFormatada);
    // saída: 29/01/2020

    if(tipoFiltro == "abertura"){
        fetch(UrlGet+select.value).then(response =>{
            return response.json();
              }).then(data =>{ 
                  let dados = []
                  var numero = 0;
                  FiltroData = data
                  //Loop para validar se o usuario possui aquela rotina
                for(let i = 0; i < data.length; i++){
                    //Variavel 
                    var protocolo = data[i].protocolo_chamado
                    var th = `<tr class="tbodyTr" onclick="InserirDados(${protocolo})">
                    <th scope="row">${numero}</th>
                    <td onclick="buscar(${data[i]})">${data[i].protocolo_chamado}</td>
                    <td onclick="buscar(${data[i]})">${data[i].data_chamado}</td>
                    <td onclick="buscar(${data[i]})">${data[i].tipo_chamado}</td>
                    <td onclick="buscar(${data[i]})">${data[i].andamento_chamado}</td>
                    </tr>`
                    //Validação para incluir dentro do Array se o elemento existe
                    if(data[i].data_chamado == dataAtualFormatada && data[i].nome_usuario == valorUsuario){
                        numero = numero+1
                        dados.push(th)
                    }
                }
                //tbody e o corpo da tabela, com essa variavel e possivel incluir elementos Th e Td dentro da tabela de acordo com o Loop acima
                tbody.innerHTML = dados.join('')
          })
    }
    //Else if
    else if(tipoFiltro == "fechamento"){
        fetch(UrlGet+select.value).then(response =>{
            return response.json();
              }).then(data =>{ 
                  let dados = []
                  var numero = 0;
                  FiltroData = data
                  //Loop para validar se o usuario possui aquela rotina
                for(let i = 0; i < data.length; i++){
                    //Variavel 
                    var protocolo = data[i].protocolo_chamado
                    var th = `<tr class="tbodyTr" onclick="InserirDados(${protocolo})">
                    <th scope="row">${i}</th>
                    <td onclick="buscar(${data[i]})">${data[i].protocolo_chamado}</td>
                    <td onclick="buscar(${data[i]})">${data[i].data_chamado}</td>
                    <td onclick="buscar(${data[i]})">${data[i].tipo_chamado}</td>
                    <td onclick="buscar(${data[i]})">${data[i].andamento_chamado}</td>
                    </tr>`
                    //Validação para incluir dentro do Array se o elemento existe
                    if(data[i].fechamento_chamado == dataAtualFormatada && data[i].andamento_chamado == "Fechado" && data[i].nome_usuario == valorUsuario){
                        numero = numero+1
                        dados.push(th)
                    }
                }
                //tbody e o corpo da tabela, com essa variavel e possivel incluir elementos Th e Td dentro da tabela de acordo com o Loop acima
                tbody.innerHTML = dados.join('')
          })
    }
    
}

function Atualizar(){
   
}