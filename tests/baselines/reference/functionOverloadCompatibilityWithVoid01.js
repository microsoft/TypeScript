//// [tests/cases/conformance/functions/functionOverloadCompatibilityWithVoid01.ts] ////

//// [functionOverloadCompatibilityWithVoid01.ts]
function f(x: string): number;
function f(x: string): void {
    return;
} 

//// [functionOverloadCompatibilityWithVoid01.js]
function f(x) {
    return;
}
