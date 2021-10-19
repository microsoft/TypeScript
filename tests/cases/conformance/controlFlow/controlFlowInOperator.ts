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

declare const e: unknown;
declare const f: any;

if ('a' in e) {
    e;      // { a: unknown; }
    e['a']  // unknown
} else {
    e;      // unknown
}

if ('b' in f) {
    f;      // { b: unknown; }
    f['b']  // unknown
} else {
    f;      // any
}

if (a in e) {
    e;      // { a: unknown; }
    e[a]  // unknown
} else {
    e;      // unknown
}

if (b in f) {
    f;      // { b: unknown; }
    f[b]  // unknown
} else {
    f;      // any
}
