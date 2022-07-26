# pestvita-app

## O que é o projeto?

Fintech

## Requisitos de ambiente

- Node (8.3+)
- Npm
- Yarn (não obrigatório, mas recomendado)
- Watchman
- JavaSDK
- React-Native-Cli

## Instalação

- git clone `link do projeto`
- cd pasta/clonada
- `yarn install` ou `npm install`
- cd ios e `pod install`

## Rodando

- Para IOS -> `react-native run-ios`
- Para Android -> `react-native run-android`
- Levantar um servidor apenas -> `npm start`
- Matar todos os processos rodando -> `killall node`

### Feito Com

Lista de dependencias do Projeto:

- [React Native](http://facebook.github.io/react-native/) - O React Native é um framework que permite o desenvolvimento de aplicações mobile usando JavaScript e React;
- [React Navigation](https://reactnavigation.org/docs/en/api-reference.html) - Componente de navegação que pode ser configuável e vem alguns com componentes já configurados de navegação;
- [React Native Gesture Handler](https://kmagiera.github.io/react-native-gesture-handler/) - API declarativa que permite a manipulação de toques e gestos no React Native;
- [Axios](https://github.com/axios/axios) - O Axios é um cliente HTTP baseado em Promises para Browser e NodeJS;
- [Prop Types](https://www.npmjs.com/package/prop-types) - Muito utilizado para checagem de tipos enviados aos componentes via props
- [Redux](https://redux.js.org/) -
  Ele soluciona o problema de compartilhamento de estados entre componentes, tornando-o unidirecional. Logo, cada componente pode consultar e alterar o estado do componente.
- [Redux Saga](https://github.com/redux-saga/redux-saga) -
  É um middleware do redux que tem como função principal, entre outras, executar funções assincrona e incorporar o resultado delas ao store do redux.

### Estrutura de Arquivos

A estrutura de arquivos deverá seguir o seguinte padrão:

```bash
genesis-app
├── src/
│   ├── pages/
│   │   └── Main/
│   │       └── index.js
│   ├── components/
│   ├── services/
│   │   └── api.js
│   ├── index.js
│   └── routes.js
├── .editorconfig
├── .gitignore
├── babel.config.js
├── index.js
├── app.json
├── package.json
└── README.md
```
