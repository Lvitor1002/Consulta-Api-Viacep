
const formulario = document.getElementById("idformulario")
const todosInput = document.querySelectorAll("[data-input]")
const iconeCarregamento = document.querySelector(".controleIcone")
const btnCadastrar = document.querySelector(".botaoCadastrar")

// Preenchíveis 
let cepEntrada = document.getElementById("idcep")
let complementoEntrada = document.getElementById("idcomplemento")
let numeroResidenciaEntrada = document.getElementById("idnresidencia")
let estadoEntrada = document.getElementById("idestado")

//Automáticos
let ruaEntrada = document.getElementById("idrua")
let cidadeEntrada = document.getElementById("idcidade")
let bairroEntrada = document.getElementById("idbairro")


iconeLoader(false)

//Evento acionado ao digitar. 
cepEntrada.addEventListener("keypress",function(evento){
        
    //Lendo assíncronalmente o input
    let entrada = String.fromCharCode(evento.keyCode)
    

    //numeros de 0 à 8 apenas! Outros [char] serão ignorados
    if(!/[0-9]/.test(entrada)){
        evento.preventDefault()
        
        return
    }
})


//Evento keyup é acionado cada vez que o usuário solta uma tecla e quando chegar a 8 dígitos ele chama a fnc[pegarEndereco()]
cepEntrada.addEventListener("keyup",async function(evento){

    //Obtendo a entrada digitada
    let entrada = evento.target.value 

    if(entrada.length === 8){
        pegarEndereco(entrada)
    }
    
    
    
})


async function pegarEndereco(cep){
    
    //Não permite edição no campo[cep] enquanto a busca está sendo feita
    cepEntrada.blur()


    const api = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

    const dados = await api.json()

    if(dados.erro){

        //Se o campo rua estiver preenchido:
        if(!ruaEntrada.hasAttribute("disabled")){
            
            habilitar_desabilitar_Inputs()
        }
        formulario.reset()

     
        iconeLoader(true)
        mensagemAtencao("Cep inválido ou inexistente. Tente novamente!")
        return
    }

    if(ruaEntrada.value === ""){
        habilitar_desabilitar_Inputs()
    }
    
    //Preenche os dados automaticamente
    ruaEntrada.value = dados.logradouro
    cidadeEntrada.value = dados.localidade
    bairroEntrada.value = dados.bairro
    estadoEntrada.value = dados.uf

   
}


function habilitar_desabilitar_Inputs(){

    if(estadoEntrada.hasAttribute("disabled")){
        
        todosInput.forEach((input)=>{
            input.removeAttribute("disabled")
        })
    }else{
        todosInput.forEach((input)=>{
            input.setAttribute("disabled","disabled")
        })
    }
    
}

function mensagemAtencao(msg){

    let caixa = document.getElementById("caixa")


    // Criar div da mensagem de atenção
    let divMensagemAtencao = document.createElement("div")
    divMensagemAtencao.classList.add("mensagemAtencao")
    divMensagemAtencao.setAttribute("role", "alert")
    divMensagemAtencao.setAttribute("id", "idmensagemAtencao")

    let h4 = document.createElement("h4")
    h4.innerText = `Mensagem >`;

    let p = document.createElement("p")
    p.innerText = ` ${msg}`

    divMensagemAtencao.appendChild(h4)
    divMensagemAtencao.appendChild(p)


    // Criar botão de fechar
    let btnFechar = document.createElement("button")
    btnFechar.classList.add("btnFecharJanela")
    btnFechar.setAttribute("id", "idBtnFechar");
    btnFechar.innerText = "Fechar";


    // Ao clicar no botão, esconder a mensagem de atenção
    btnFechar.addEventListener("click",function(evento){
        divMensagemAtencao.classList.add("ocultar")
        btnFechar.classList.add("ocultar")
        caixa.classList.add("ocultar");

        //Oculta o conteúdo
        formulario.classList.remove("ocultar");
        btnCadastrar.classList.remove("ocultar");
        iconeLoader(false)
    })

    
    caixa.innerHTML = ""
    // Adiciona os elementos à caixa
    caixa.appendChild(divMensagemAtencao)
    caixa.appendChild(btnFechar)
    
    // Exibe o modal
    divMensagemAtencao.classList.remove("ocultar")
    btnFechar.classList.remove("ocultar")
    caixa.classList.remove("ocultar")

    // Exibe o conteúdo
    formulario.classList.add("ocultar")
    btnCadastrar.classList.add("ocultar")

    
    iconeLoader(true)

}

formulario.addEventListener("submit",function(evento){

    evento.preventDefault()

    iconeLoader(false)

    setTimeout(()=>{

        //Chamando para exibir a msg
        mensagemAtencao("Formulário enviado com sucesso.")

        formulario.reset()

        habilitar_desabilitar_Inputs()
    }, 1000)
})

function iconeLoader(mostrar = true) {
    const simboloLoader = document.querySelector(".elementoCarregar")

    if (mostrar) {
       
        iconeCarregamento.classList.remove("ocultar")
        simboloLoader.classList.remove("ocultar")
       
    } else {
        iconeCarregamento.classList.add("ocultar")
        simboloLoader.classList.add("ocultar")
    }
}








