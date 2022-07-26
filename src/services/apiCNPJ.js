import axios from 'axios';

const apiCNPJ = {
  GetRefService: () => {
    return axios.create({
      baseURL: 'https://www.receitaws.com.br/v1'
    });
  },

  checkCNPJ: cnpj => {
    return apiCNPJ.GetRefService().get(`/cnpj/${cnpj}`);
  }
};

export default apiCNPJ;
