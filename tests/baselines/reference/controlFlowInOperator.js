//// [controlFlowInOperator.ts]
const a = 'a';
const b = 'b';
const d = 'd';

type A = { [a]: number; };
type B = { [b]: string; };

declare const c: A | B;

if ('a' in c) {
    c;      // A
    c['a']; // number
} else {
    c;      // B
    c['b']  // string
}

if ('d' in c) {
    c; // (A | B) & { d: unknown; }
} else {
    c; // (A | B)
}

if (a in c) {
    c;    // A
    c[a]; // number;
} else {
    c;      // B
    c[b]  // string
}

if (d in c) {
    c; // (A | B) & { d: unknown; }
} else {
    c; // (A | B)
}


//// [controlFlowInOperator.js]
var a = 'a';
var b = 'b';
var d = 'd';
if ('a' in c) {
    c; // A
    c['a']; // number
}
else {
    c; // B
    c['b']; // string
}
if ('d' in c) {
    c; // (A | B) & { d: unknown; }
}
else {
    c; // (A | B)
}
if (a in c) {
    c; // A
    c[a]; // number;
}
else {
    c; // B
    c[b]; // string
}
if (d in c) {
    c; // (A | B) & { d: unknown; }
}
else {
    c; // (A | B)
}
