//// [tests/cases/conformance/decorators/invalid/decoratorOnFunctionDeclaration.ts] ////

//// [decoratorOnFunctionDeclaration.ts]
declare function dec<T>(target: T): T;

@dec
function F() {
}

//// [decoratorOnFunctionDeclaration.js]
function F() {
}
