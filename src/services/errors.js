const ErrorPTBR = {
  '10007': 'token inválido',
  '10008': 'usuário ou senha inválidos',
  '10009': 'Usuário não ativado',
  '10010': 'Cadastro em análise',
  '10013': 'token inválido',
  '10019': 'Esse email ja é cadastrado',
  '10042': 'Seu usuário ja foi finalizado',
  '10044': 'Você precisa finalizar o cadastro',
  '10045': 'Token inválido',
  '20005': 'Token inválido',
  '20011': 'Código inválido',
  '20041': 'Problema no pagamento de depósito',
  '20051': 'Você não tem sado suficiente',
  '20058': 'Linha Digitavel e CodBarras nulo ou vazio'
};
const errors = {
  PT_BR: ErrorPTBR
};

const getError = (language, code) => {
  if (errors[language][code] === undefined) {
    return 'Algum problema aconteceu';
  } else {
    return errors[language][code];
  }
};

export default getError;
