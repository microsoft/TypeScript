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
