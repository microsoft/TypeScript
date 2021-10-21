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

declare const e: object;

if ('a' in e) {
    e;      // { a: unknown; }
    e['a']  // unknown
} else {
    e;      // object
}

if (a in e) {
    e;      // { a: unknown; }
    e[a]    // unknown
} else {
    e;      // object
}

// More complex control flows

e;              // object
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
e;              // object

e;              // object
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
e;              // object

e;          // object
if ( 'a' in e ) {
    e;      // { a: unknown; }
    e['a']; // unknown
} else if ( 'b' in e ) {
    e;      // { b: unknown; }
    e['b']; // unknown
} else {
    e;      // object
}
e;          // object

e;          // object
if ( a in e ) {
    e;      // { a: unknown; }
    e[a];   // unknown
} else if ( b in e ) {
    e;      // { b: unknown; }
    e[b];   // unknown
} else {
    e;      // object
}
e;          // object

declare const f: Array<object>

for (const g of f) {
    g;          // object
    if ('a' in g) {
        g;      // { a: unknown; }
        g['a']; // unknown
    }
    g;          // object
}

for (const g of f) {
    g;          // object
    if (a in g) {
        g;      // { a: unknown; }
        g[a];   // unknown
    }
    g;          // object
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
if ('a' in e) {
    e; // { a: unknown; }
    e['a']; // unknown
}
else {
    e; // object
}
if (a in e) {
    e; // { a: unknown; }
    e[a]; // unknown
}
else {
    e; // object
}
// More complex control flows
e; // object
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
e; // object
e; // object
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
e; // object
e; // object
if ('a' in e) {
    e; // { a: unknown; }
    e['a']; // unknown
}
else if ('b' in e) {
    e; // { b: unknown; }
    e['b']; // unknown
}
else {
    e; // object
}
e; // object
e; // object
if (a in e) {
    e; // { a: unknown; }
    e[a]; // unknown
}
else if (b in e) {
    e; // { b: unknown; }
    e[b]; // unknown
}
else {
    e; // object
}
e; // object
for (var _i = 0, f_1 = f; _i < f_1.length; _i++) {
    var g = f_1[_i];
    g; // object
    if ('a' in g) {
        g; // { a: unknown; }
        g['a']; // unknown
    }
    g; // object
}
for (var _a = 0, f_2 = f; _a < f_2.length; _a++) {
    var g = f_2[_a];
    g; // object
    if (a in g) {
        g; // { a: unknown; }
        g[a]; // unknown
    }
    g; // object
}
