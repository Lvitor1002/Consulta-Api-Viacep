export class ApiRepository{

    async buscarCep(cep){
        try{

            const url = `https://viacep.com.br/ws/${cep}/json/`

            const respostaApi = await fetch(url)

            if(!respostaApi.ok){
                throw new Error(`>Erro ao buscar cep..: ${respostaApi.status}`)
            }

            const dados = await respostaApi.json()
            
            if(dados.erro){
                throw new Error('CEP não encontrado')
            }

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Sucesso!",
                text: `Sucesso ao buscar dados..`,
                showConfirmButton: false,
                timer: 1000
            })
            
            return dados
            
        }catch(erro){

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `CEP não encontrado..`,
            });
            return

        }

    }
}