import axios from "axios";

const apiCep = {
    GetRefService:() => {
        return axios.create({
            baseURL: "http://customer.dev.bancogenesis.services/v1"
        });
    },

    getAddress:(cep)=> {
        return apiCep.GetRefService().get(`https://viacep.com.br/ws/${cep}/json`)
    }
}

export default apiCep;
