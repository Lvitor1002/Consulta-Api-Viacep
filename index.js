import {ApiRepository} from "./ApiRepository.js"

const todosInputs = document.querySelectorAll("[data-input]")
const cepInput = document.getElementById("idcep")
const formulario = document.getElementById("idformulario")
const campoRua = document.getElementById("idrua")
const campoCidade = document.getElementById("idcidade")
const campoBairro = document.getElementById("idbairro")
const selectUF = document.getElementById("idestado")

const campoComplemento = document.getElementById("idcomplemento")
const numeroResidencia = document.getElementById("idnresidencia")



cepInput.addEventListener("input",async function(evento){

    evento.target.value = evento.target.value.replace(/\D/g,'').slice(0,8)
})

cepInput.addEventListener("blur",async function(evento){

    const cep = cepInput.value.trim()

    if(cep.length !== 8){
        incorreto("Entrada inválida! Verifique o campo 'CEP'..")
        return
    }

    try{

        let dados = await new ApiRepository().buscarCep(cep)
        campoRua.value = dados.logradouro
        campoCidade.value = dados.localidade
        campoBairro.value = dados.bairro
        selectUF.value = dados.uf

        todosInputs.forEach((input)=>{
            input.removeAttribute("disabled")
        })

    }
    catch{
        formulario.reset()
    }
})


formulario.addEventListener("submit", function(evento){

    evento.preventDefault()
    
    const complemento = campoComplemento.value.trim()
    if(complemento.length > 20 || !complemento){
        
        campoComplemento.style.border = '1px solid red'

        incorreto("Campo 'complemento' inválido. Tente novamente.")
        return
    }

    const numero = numeroResidencia.value.trim()

    if(numero.length > 5 || isNaN(numero) || !numero){
        
        numeroResidencia.style.border = '1px solid red'

        incorreto("Campo 'Nº Residência' incorreto. Tente novamente com no máximo 5 dígito")
        return
    }

    todosInputs.forEach((input)=>{
        numeroResidencia.style.border = 'none'
        campoComplemento.style.border = 'none'
        input.setAttribute("disabled","disabled")
    })

    sucesso("Dados Enviados!","Sucesso ao enviar dados..")

    formulario.reset()
   
})


function sucesso(titulo,msg){

    Swal.fire({
        position: "center",
        icon: "success",
        title: `${titulo}`,
        text: `${msg}`,
        showConfirmButton: false,
        timer: 1000
    })
}


function incorreto(msg){

    Swal.fire({
        icon: "error",
        itle: "Oops...",
        text: `${msg}`
    })
}


