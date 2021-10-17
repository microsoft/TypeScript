//// [controlFlowInOperator.ts]
const a = 'a';
const b = 'b';
const d = 'd';

type A = { [a]: number; };
type B = { [b]: string; };

declare const c: A | B;

if ('a' in c) {
    c;      // A
    c['a']; // number;
}

if ('d' in c) {
    c; // (A | B) & { d: unknown; }
}

if (a in c) {
    c;    // A
    c[a]; // number;
}

if (d in c) {
    c; // (A | B) & { d: unknown; }
}


//// [controlFlowInOperator.js]
var a = 'a';
var b = 'b';
var d = 'd';
if ('a' in c) {
    c; // A
    c['a']; // number;
}
if ('d' in c) {
    c; // (A | B) & { d: unknown; }
}
if (a in c) {
    c; // A
    c[a]; // number;
}
if (d in c) {
    c; // (A | B) & { d: unknown; }
}
