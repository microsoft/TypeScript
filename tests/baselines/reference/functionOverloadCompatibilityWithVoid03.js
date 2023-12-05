//// [tests/cases/conformance/functions/functionOverloadCompatibilityWithVoid03.ts] ////

//// [functionOverloadCompatibilityWithVoid03.ts]
function f(x: string): void;
function f(x: string): void {
    return;
} 

//// [functionOverloadCompatibilityWithVoid03.js]
function f(x) {
    return;
}
