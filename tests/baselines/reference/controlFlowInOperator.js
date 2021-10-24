//// [controlFlowInOperator.ts]
const a = 'a';
const b = 'b';
const d = 'd';

// Type narrowing

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

// Type widening

declare const e: {};

if ('a' in e) {
    e;      // { a: unknown; }
    e['a']  // unknown
} else {
    e;      // {}
}

if (a in e) {
    e;      // { a: unknown; }
    e[a]    // unknown
} else {
    e;      // {}
}

// Widening different types

declare const e1: any;
if ('a' in e1) {
    e1;      // any
}

declare const e2: object;
if ('a' in e2) {
    e2;      // object & { a: unknown; }
    e2['a']; // unknown
}

declare const e3: { b: string; } & { c: number; };
if ('a' in e3) {
    e3;      // { a: unknown; b: string; } & { c: number }
    e3['a']; // unknown
}

interface C {
    cProp: string;
}
interface D {
    dProp: number;
}
declare const e4: C & D;
if ('a' in e4) {
    e4;      // C & D & { a: unknown; }
    e4['a'];  // unknown
}

declare const e5: never;
if ('a' in e5) {
    e5;      // never
}

declare const e6: { b: string; (arg: string): boolean; }
if ('a' in e6) {
    e6;         // { a: unknown; b: string; (arg: string): boolean; }
    e6['a'];    // unknown
    e6('');     // boolean;
}

declare const e7: { b: string; new (arg: string): boolean; }
if ('a' in e7) {
    e7;         // { a: unknown; b: string; new (arg: string): boolean; }
    e7['a'];    // unknown
    new e7(''); // boolean;
}

// More complex control flows

e;              // {}
if ( 'a' in e ) {
    e;          // { a: unknown; }
    if ( 'b' in e ) {
        e;      // { a: unknown; b: unknown; }
        e['a']; // unknown
        e['b']; // unknown
    } else {
        e;      // { a: unknown; }
    }
    e;          // { a: unknown; }
}
e;              // {}

e;              // {}
if ( a in e ) {
    e;          // { a: unknown; }
    if ( b in e ) {
        e;      // { a: unknown; b: unknown; }
        e[a];   // unknown
        e[b];   // unknown
    } else {
        e;      // { a: unknown; }
    }
    e;          // { a: unknown; }
}
e;              // {}

e;          // {}
if ( 'a' in e ) {
    e;      // { a: unknown; }
    e['a']; // unknown
} else if ( 'b' in e ) {
    e;      // { b: unknown; }
    e['b']; // unknown
} else {
    e;      // {}
}
e;          // {}

e;          // {}
if ( a in e ) {
    e;      // { a: unknown; }
    e[a];   // unknown
} else if ( b in e ) {
    e;      // { b: unknown; }
    e[b];   // unknown
} else {
    e;      // {}
}
e;          // {}

declare const f: Array<{}>

for (const g of f) {
    g;          // {}
    if ('a' in g) {
        g;      // { a: unknown; }
        g['a']; // unknown
    }
    g;          // {}
}

for (const g of f) {
    g;          // {}
    if (a in g) {
        g;      // { a: unknown; }
        g[a];   // unknown
    }
    g;          // {}
}

function h(i: {}) {
    if ( 'a' in i ) {
        i;  // { a: unknown; }
    } else if ( 'b' in i ) {
        i;  // { b: unknown; }
    } else {
        return;
    }
    i; // { a: unknown; } | { b: unknown; }
}
h(e);

declare const j: { a: 'first'; b: string; } | { a: 'second'; c: string; };

if (j.a === 'first') {
    j;          // { a: 'first'; b: string; }
    j['b'];     // string
    if ( 'c' in j ) {
        j;      // { a: 'first'; b: string; c: unknown; }
        j['b']; // string
        j['c']; // unknown
    }
}
j; // { a: 'first'; b: string; } | { a: 'second'; c: string; }


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
if ('a' in e) {
    e; // { a: unknown; }
    e['a']; // unknown
}
else {
    e; // {}
}
if (a in e) {
    e; // { a: unknown; }
    e[a]; // unknown
}
else {
    e; // {}
}
if ('a' in e1) {
    e1; // any
}
if ('a' in e2) {
    e2; // object & { a: unknown; }
    e2['a']; // unknown
}
if ('a' in e3) {
    e3; // { a: unknown; b: string; } & { c: number }
    e3['a']; // unknown
}
if ('a' in e4) {
    e4; // C & D & { a: unknown; }
    e4['a']; // unknown
}
if ('a' in e5) {
    e5; // never
}
if ('a' in e6) {
    e6; // { a: unknown; b: string; (arg: string): boolean; }
    e6['a']; // unknown
    e6(''); // boolean;
}
if ('a' in e7) {
    e7; // { a: unknown; b: string; new (arg: string): boolean; }
    e7['a']; // unknown
    new e7(''); // boolean;
}
// More complex control flows
e; // {}
if ('a' in e) {
    e; // { a: unknown; }
    if ('b' in e) {
        e; // { a: unknown; b: unknown; }
        e['a']; // unknown
        e['b']; // unknown
    }
    else {
        e; // { a: unknown; }
    }
    e; // { a: unknown; }
}
e; // {}
e; // {}
if (a in e) {
    e; // { a: unknown; }
    if (b in e) {
        e; // { a: unknown; b: unknown; }
        e[a]; // unknown
        e[b]; // unknown
    }
    else {
        e; // { a: unknown; }
    }
    e; // { a: unknown; }
}
e; // {}
e; // {}
if ('a' in e) {
    e; // { a: unknown; }
    e['a']; // unknown
}
else if ('b' in e) {
    e; // { b: unknown; }
    e['b']; // unknown
}
else {
    e; // {}
}
e; // {}
e; // {}
if (a in e) {
    e; // { a: unknown; }
    e[a]; // unknown
}
else if (b in e) {
    e; // { b: unknown; }
    e[b]; // unknown
}
else {
    e; // {}
}
e; // {}
for (var _i = 0, f_1 = f; _i < f_1.length; _i++) {
    var g = f_1[_i];
    g; // {}
    if ('a' in g) {
        g; // { a: unknown; }
        g['a']; // unknown
    }
    g; // {}
}
for (var _a = 0, f_2 = f; _a < f_2.length; _a++) {
    var g = f_2[_a];
    g; // {}
    if (a in g) {
        g; // { a: unknown; }
        g[a]; // unknown
    }
    g; // {}
}
function h(i) {
    if ('a' in i) {
        i; // { a: unknown; }
    }
    else if ('b' in i) {
        i; // { b: unknown; }
    }
    else {
        return;
    }
    i; // { a: unknown; } | { b: unknown; }
}
h(e);
if (j.a === 'first') {
    j; // { a: 'first'; b: string; }
    j['b']; // string
    if ('c' in j) {
        j; // { a: 'first'; b: string; c: unknown; }
        j['b']; // string
        j['c']; // unknown
    }
}
j; // { a: 'first'; b: string; } | { a: 'second'; c: string; }
