//// [tests/cases/conformance/functions/functionOverloadCompatibilityWithVoid02.ts] ////

//// [functionOverloadCompatibilityWithVoid02.ts]
function f(x: string): void;
function f(x: string): number {
    return 0;
} 

//// [functionOverloadCompatibilityWithVoid02.js]
function f(x) {
    return 0;
}
