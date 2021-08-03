
# TypeScript

[![GitHub Actions CI](https://github.com/microsoft/TypeScript/workflows/CI/badge.svg)](https://github.com/microsoft/TypeScript/actions?query=workflow%3ACI)
[![Devops Build Status](https://dev.azure.com/typescript/TypeScript/_apis/build/status/Typescript/node10)](https://dev.azure.com/typescript/TypeScript/_build?definitionId=7)
[![npm version](https://badge.fury.io/js/typescript.svg)](https://www.npmjs.com/package/typescript)
[![Downloads](https://img.shields.io/npm/dm/typescript.svg)](https://www.npmjs.com/package/typescript)

[TypeScript](https://www.typescriptlang.org/) é uma linguagem Javascript de aplicação em escala. Typescript adiciona tipos opcionais ao JavaScript, os quais dão suporte à ferramentas de aplicações Javascript em larga escala em qualquer navegador, host ou sistema operacional. Typescript compila em código Javascript que é leiturável e baseado em padrões.  Experimente-o no [parque-de-diversões](https://www.typescriptlang.org/play/), e fique atualizado através do [nosso blog](https://blogs.msdn.microsoft.com/typescript) e [conta do Twitter](https://twitter.com/typescript).

Encontre outras pessoas que estão usando Typescript na [nossa Página de Comunidade](https://www.typescriptlang.org/community/).

## Instalação

Para a versão mais recente estável:

```bash
npm install -g typescript
```

Para as nossas builds mais obscuras:

```bash
npm install -g typescript@next
```

## Contribua

Há muitas formas de [contribuir](https://github.com/microsoft/TypeScript/blob/main/CONTRIBUTING.md) to TypeScript.
* [Submeta bugs](https://github.com/microsoft/TypeScript/issues) and help us verify fixes as they are checked in.
* Revise as [mudanças no código fonte](https://github.com/microsoft/TypeScript/pulls).
* Entre em contato com outros usuários e desenvolvedores de TypeScript no [StackOverflow](https://stackoverflow.com/questions/tagged/typescript).
* Ajudem um ao outro na [Comunidade TypeScript no Discord](https://discord.gg/typescript).
* Se junte ao [#typescript](https://twitter.com/search?q=%23TypeScript) discussion on Twitter.
* [Contribua com resolução de bugs](https://github.com/microsoft/TypeScript/blob/main/CONTRIBUTING.md).
* Leia as especificações arquivadas da linguagem ([docx](https://github.com/microsoft/TypeScript/blob/main/doc/TypeScript%20Language%20Specification%20-%20ARCHIVED.docx?raw=true),
 [pdf](https://github.com/microsoft/TypeScript/blob/main/doc/TypeScript%20Language%20Specification%20-%20ARCHIVED.pdf?raw=true), [md](https://github.com/microsoft/TypeScript/blob/main/doc/spec-ARCHIVED.md)).

Este projeto adotou o [Código de Conduta Open Source da Microsoft](https://opensource.microsoft.com/codeofconduct/). Para mais informações, veja o 
[FaQ do Código de Conduta](https://opensource.microsoft.com/codeofconduct/faq/) ou mande um e-mail à [opencode@microsoft.com](mailto:opencode@microsoft.com)
com quaisquer outras perguntas ou comentários.

## Documentação

*  [TypeScript em 5 minutos](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
*  [Guia de Programação](https://www.typescriptlang.org/docs/handbook/intro.html)
*  [Página Inicial](https://www.typescriptlang.org/)

## Construição

Para construir o compilador do Typescript, tenha certeza de que possui o [Git](https://git-scm.com/downloads) e o [Node.js](https://nodejs.org/) instalados.

Depois disso, faça um clone do repositório:

```bash
git clone https://github.com/microsoft/TypeScript.git
```

Mude para o diretório do typescript:

```bash
cd TypeScript
```

Instale as ferramentas e dependências de desenvolvimento [Gulp](https://gulpjs.com/):

```bash
npm install -g gulp
npm ci
```

Utilize um dos scripts abaixo para construir e testar:

```
gulp local             # Build the compiler into built/local.
gulp clean             # Delete the built compiler.
gulp LKG               # Replace the last known good with the built one.
                       # Bootstrapping step to be executed when the built compiler reaches a stable state.
gulp tests             # Build the test infrastructure using the built compiler.
gulp runtests          # Run tests using the built compiler and test infrastructure.
                       # You can override the specific suite runner used or specify a test for this command.
                       # Use --tests=<testPath> for a specific test and/or --runner=<runnerName> for a specific suite.
                       # Valid runners include conformance, compiler, fourslash, project, user, and docker
                       # The user and docker runners are extended test suite runners - the user runner
                       # works on disk in the tests/cases/user directory, while the docker runner works in containers.
                       # You'll need to have the docker executable in your system path for the docker runner to work.
gulp runtests-parallel # Like runtests, but split across multiple threads. Uses a number of threads equal to the system
                       # core count by default. Use --workers=<number> to adjust this.
gulp baseline-accept   # This replaces the baseline test results with the results obtained from gulp runtests.
gulp lint              # Runs eslint on the TypeScript source.
gulp help              # List the above commands.
```


## Utilização

```bash
node built/local/tsc.js hello.ts
```


## Roadmap

Para mais detalhes acerca de características e direções futuras que planejamos, por favor refira-se ao nosso [roadmap](https://github.com/microsoft/TypeScript/wiki/Roadmap).
