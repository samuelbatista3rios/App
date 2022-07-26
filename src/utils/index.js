import Numeral from 'numeral';
// import 'numeral/locales/pt-br';
Numeral.locale('pt-br');

export function hideCardNumber(number) {
  const a = number.split(' ')[3];
  return `XXXX - XXXX - XXXX - ${a}`;
}

export const formatToReal = value => {
  return Numeral(value).format(`$ 0.00`);
};

export function getInitials(text) {
  let last = text.split(' ')[1];
  last = last ? last.substring(0, 1) : text.substring(1, 2);
  return `${text.substring(0, 1)}${last}`;
}
