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
