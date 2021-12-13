// ---------------------  Variavel de elemento ------------------------ \\
var boxConteiner = document.getElementsByClassName("boxConteiner");
var numeroChamado = document.getElementById("numeroChamado");
var divFlexDirection = document.getElementById('divFlexDirection');
let tbody = document.getElementById("tbody");
let aberturaChamado = document.getElementById("aberturaChamado");
var Desc = document.getElementById("Descrição");
var select = document.getElementById('selectSituacao');
let teste = document.getElementById("tbody");
let resolucao = document.getElementById("descricao");
let fechamentoChamado = document.getElementById('fechamentoChamado')

var FiltroData = []
// --------------------- Varivavel data ------------------------ \\
let data = new Date();
let dataAno = data.getFullYear()
let dataMes = data.getMonth() + 1
let dataDia = data.getDate()
let fechamentoData = (dataDia+"/"+dataMes+"/"+dataAno)
//
// --------------------- Variavel LocalStorege ------------------------ \\
//
var valorUsuario = localStorage.getItem('nome');
//
// --------------------- Variavel String URL ------------------------ \\
//
var UrlGetAll = `http://192.168.254.4:8080/basicNomeUsuario?basicNomeUsuario=${valorUsuario}`;
var UrlGet = "http://192.168.254.4:8080/admChamadoAberto?admChamadoAberto=";
var UrlGetProtocolo = "http://192.168.254.4:8080/admProtocoloChamado/";

// --------------------- Post get ------------------------ \\
let getUrl = "http://192.168.254.4:8080/usuarioLogin?usuarioLogin=";
let putUrl = "http://192.168.254.4:8080/admAlterarServico";

// --------------------- Iniciar em aberto ------------------------ \\
fetch(UrlGet+select.value).then(response =>{
    return response.json();
      }).then(data =>{ 
          let dados = [];
          var numero = 0;
          FiltroData = data
        for(let i = 0; i < data.length; i++){
            var protocolo = data[i].protocolo_chamado
            var th = `<tr class="tbodyTr" onclick="InserirDados(${protocolo})">
            <th scope="row">${i}</th>
            <td onclick="buscar()">${data[i].protocolo_chamado}</td>
            <td onclick="buscar(${data[i].nome_usuario})">${data[i].nome_usuario}</td>
            <td onclick="buscar(${data[i].data_chamado})">${data[i].data_chamado}</td>
            <td onclick="buscar()">${data[i].tipo_chamado}</td>
            <td onclick="buscar()">${data[i].andamento_chamado}</td>
            </tr>`
            dados.push(th);
        }
        tbody.innerHTML = dados.join('')
  })
// --------------------- Função de Buscar chamado atraves do HTTPS: POST ------------------------ \\
function BuscarChamado(){
    // --------------------- fetch Busca todas as rotinas do banco de dados e valida somente as do usuarios ------------------------ \\
    fetch(UrlGet+select.value).then(response =>{
        return response.json();
          }).then(data =>{ 
              let dados = []
              var numero = 0;
              FiltroData = data
              // --------------------- Loop para validar se o usuario possui aquela rotina ------------------------ \\
            for(let i = 0; i < data.length; i++){
                // --------------------- Variavel  ------------------------ \\
                var protocolo = data[i].protocolo_chamado
                var th = `<tr class="tbodyTr" onclick="InserirDados(${protocolo})">
                <th scope="row">${i}</th>
                <td onclick="buscar(${data[i]})">${data[i].protocolo_chamado}</td>
                <td onclick="buscar(${data[i].nome_usuario})">${data[i].nome_usuario}</td>
                <td onclick="buscar(${data[i]})">${data[i].data_chamado}</td>
                <td onclick="buscar(${data[i]})">${data[i].tipo_chamado}</td>
                <td onclick="buscar(${data[i]})">${data[i].andamento_chamado}</td>
                </tr>`
                // --------------------- Validação para incluir dentro do Array se o elemento existe ------------------------ \\
                    dados.push(th)
            }
            // --------------------- tbody e o corpo da tabela, com essa variavel e possivel incluir elementos Th e Td dentro da tabela de acordo com o Loop acima ------------------------ \\
            tbody.innerHTML = dados.join('')
      })
}
let dados = []
// --------------------- Inserir Dados dentro do banco ------------------------ \\
function InserirDados(protocolo){
    fetch(UrlGetProtocolo+protocolo).then(response =>{
        return response.json();
          }).then(data =>{   
              buscar(data[0])
              dados = data[0]
      })
}
// --------------------- Função de busca data da abertura e chamado descrição ------------------------ \\
function buscar(data){
    aberturaChamado.value = data.data_chamado
    Desc.value = data.desc_chamado
    fechamentoData.value = data.fechamento_chamado
    linkImagem.innerText = "link imagem"
    
    if(data.link_imagem == "" || data.link_imagem == null){
        linkImagem.innerText = 'SEM ANEXOS'
        paginaLink = ''
    }else{
        linkImagem.innerText = data.link_imagem
        paginaLink = data.link_imagem
    }
    if(data.desc_resolucao != null ){
        fechamentoData.value = data.fechamento_chamado+" - "+data.nome_fechamento
        DescricaoResolucao.value = data.desc_resolucao
        if(data.link_imagem == "" || data.link_imagem == null){
            linkImagem.innerText = 'SEM ANEXOS'
            paginaLink = ''
        }else{
            linkImagem.innerText = data.link_imagem 
            paginaLink = data.link_imagem
        }
    }
}
  function FecharChamado(){
    if(resolucao.value != ""){
        let putValor ={
            id: dados.id,
            nome_usuario: dados.nome_usuario,
            setor: dados.setor,
            desc_chamado: dados.desc_chamado,
            andamento_chamado: "FECHADO",
            tipo_chamado: dados.tipo_chamado,
            prioridade_chamado: dados.prioridade_chamado,
            protocolo_chamado: dados.protocolo_chamado,
            data_chamado: dados.data_chamado,
            desc_resolucao: resolucao.value,
            fechamento_chamado: fechamentoData,
            link_imagem: dados.link_imagem,
            nome_fechamento: localStorage.getItem('nome')
        }
        console.log(putValor)
       fetch(putUrl, {
           method: "PUT",
           body: JSON.stringify(putValor),
           headers: {"Content-type": "application/json; charset=UTF-8"}
        })
            .then(response => response.json()) 
            .then(json => console.log(json));
            resolucao.value=""
            var toastHTML = `<span>Gravado e fechado com sucesso</b></span>`;
                M.toast({html: toastHTML});
    }
    else{
        var toastHTML = `<span>Descrição não pode ficar vazia</b></span>`;
                M.toast({html: toastHTML});
    }
    }
    // --------------------- Funcao de filtro por data de abertura ------------------------ \\
    function filtroDataAbertura(){
        console.log(FiltroData = data)
        let dataAbertura = document.getElementById('dataAbertura')
        ConverterData(dataAbertura.value,"abertura");
    }
    // --------------------- Funcao de filtro por data de fechamento ------------------------ \\
    function filtroDataFechamento(){
        let dataFechamento = document.getElementById('dataFechamento')
        ConverterData(dataFechamento.value,"fechamento");
    }
    // --------------------- Funcao converte a data para o formato do banco de dados ------------------------ \\
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
        // --------------------- saída: 29/01/2020 ------------------------ \\
        if(tipoFiltro == "abertura"){
            fetch(UrlGet+select.value).then(response =>{
                return response.json();
                  }).then(data =>{ 
                      let dados = []
                      var numero = 0;
                      FiltroData = data
                      //Loop para validar se o usuario possui aquela rotina ------------------------ \\
                    for(let i = 0; i < data.length; i++){
                        //Variavel 
                        var protocolo = data[i].protocolo_chamado
                        var th = `<tr class="tbodyTr" onclick="InserirDados(${protocolo})">
                        <th scope="row">${i}</th>
                        <td onclick="buscar(${data[i]})">${data[i].protocolo_chamado}</td>
                        <td onclick="buscar(${data[i].nome_usuario})">${data[i].nome_usuario}</td>
                        <td onclick="buscar(${data[i]})">${data[i].data_chamado}</td>
                        <td onclick="buscar(${data[i]})">${data[i].tipo_chamado}</td>
                        <td onclick="buscar(${data[i]})">${data[i].andamento_chamado}</td>
                        </tr>`
                        //Validação para incluir dentro do Array se o elemento existe ------------------------ \\
                        if(data[i].data_chamado == dataAtualFormatada ){
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
                        var th = `<tr class="tbodyTr"" onclick="InserirDados(${protocolo})">
                        <th scope="row">${i}</th>
                        <td onclick="buscar(${data[i]})">${data[i].protocolo_chamado}</td>
                        <td onclick="buscar(${data[i].nome_usuario})">${data[i].nome_usuario}</td>
                        <td onclick="buscar(${data[i]})">${data[i].data_chamado}</td>
                        <td onclick="buscar(${data[i]})">${data[i].tipo_chamado}</td>
                        <td onclick="buscar(${data[i]})">${data[i].andamento_chamado}</td>
                        </tr>`
                        //Validação para incluir dentro do Array se o elemento existe
                        if(data[i].fechamento_chamado == dataAtualFormatada && data[i].andamento_chamado == "Fechado" ){
                            numero = numero+1
                            dados.push(th)
                        }
                    }
                    //tbody e o corpo da tabela, com essa variavel e possivel incluir elementos Th e Td dentro da tabela de acordo com o Loop acima
                    tbody.innerHTML = dados.join('')
              })
        }
    }
    function abrirJanela(pagina, largura, altura) {

        if(paginaLink != ''){
            pagina = `file://lab-apl-03/Users/ti/Desktop/Arquivos%20EquipeAtendimentoLabosil/BancoImagem/${paginaLink}`
            // Definindo centro da tela
            var esquerda = (screen.width - largura)/2;
            var topo = (screen.height - altura)/2;
            // Abre a nova janela
            minhaJanela = window.open(pagina,'','height=' + altura + ', width=' + largura + ', top=' + topo + ', left=' + esquerda);
        
        }
    }