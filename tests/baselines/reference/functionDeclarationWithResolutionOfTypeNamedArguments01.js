//// [tests/cases/compiler/functionDeclarationWithResolutionOfTypeNamedArguments01.ts] ////

//// [functionDeclarationWithResolutionOfTypeNamedArguments01.ts]
interface arguments {
}

function f() {
    <arguments>arguments;
}

//// [functionDeclarationWithResolutionOfTypeNamedArguments01.js]
function f() {
    arguments;
}
