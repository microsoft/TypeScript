//// [controlFlowForInStatement2.ts]
const keywordA = 'a';
const keywordB = 'b';

type A = { [keywordA]: number };
type B = { [keywordB]: string };

declare const c: A | B;

if ('a' in c) {
    c; // narrowed to `A`
}

if (keywordA in c) {
    c; // also narrowed to `A`
}

let stringB: string = 'b';

if ((stringB as 'b') in c) {
    c; // narrowed to `B`
}

if ((stringB as ('a' | 'b')) in c) {
    c; // not narrowed
}

//// [controlFlowForInStatement2.js]
var keywordA = 'a';
var keywordB = 'b';
if ('a' in c) {
    c; // narrowed to `A`
}
if (keywordA in c) {
    c; // also narrowed to `A`
}
var stringB = 'b';
if (stringB in c) {
    c; // narrowed to `B`
}
if (stringB in c) {
    c; // not narrowed
}
