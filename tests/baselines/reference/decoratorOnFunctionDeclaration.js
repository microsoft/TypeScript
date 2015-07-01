//// [decoratorOnFunctionDeclaration.ts]
declare function dec<T>(target: T): T;

@dec
function F() {
}

//// [decoratorOnFunctionDeclaration.js]
function F() {
}
