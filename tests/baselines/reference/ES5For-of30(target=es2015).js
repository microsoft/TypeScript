//// [tests/cases/conformance/statements/for-ofStatements/ES5For-of30.ts] ////

//// [ES5For-of30.ts]
var a: string, b: number;
var tuple: [number, string] = [2, "3"];
for ([a = 1, b = ""] of tuple) {
    a;
    b;
}

//// [ES5For-of30.js]
var a, b;
var tuple = [2, "3"];
for ([a = 1, b = ""] of tuple) {
    a;
    b;
}
