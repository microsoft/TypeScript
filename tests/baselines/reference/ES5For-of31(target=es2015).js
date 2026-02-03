//// [tests/cases/conformance/statements/for-ofStatements/ES5For-of31.ts] ////

//// [ES5For-of31.ts]
var a: string, b: number;

for ({ a: b = 1, b: a = ""} of []) {
    a;
    b;
}

//// [ES5For-of31.js]
var a, b;
for ({ a: b = 1, b: a = "" } of []) {
    a;
    b;
}
