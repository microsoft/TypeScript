//// [typeGuardAccordingToPropertyDeep.ts]
//// deep property access ---- a.b.c.d.e.f, a["b"]["c"]["d"]
//// mix deep property access ---- a.b["c"]["d"].e

interface Foo1 {
    firstKey: number,
    inner: {
        secondKey: number,
        f1: number
    }
}

interface Foo2 {
    firstKey: boolean,
    inner: {
        secondKey: boolean,
        f2: number
    }
}

interface Foo3 {
    firstKey: string;
}

type Union = Foo1 | Foo2 | Foo3;

function f(u: Union) {
    if (typeof u.firstKey === "number" || typeof u.firstKey === "boolean") {
        u;  // Foo1 | Foo2
        if (typeof u.inner.secondKey === "boolean") {
            u;  // Foo2
        }
    }
}

type Union2 = Foo1 | Foo2;

function f2(u: Union2) {
    if (typeof u.inner["secondKey"] === "boolean") {
        u;  // Foo2
    }
}

function f3(u: Union2) {
    if (typeof u["inner"]["secondKey"] === "boolean") {
        u;  // Foo2
    }
}

function f4(u: Union2) {
    if (typeof u["inner"].secondKey === "boolean") {
        u;  // Foo2
    }
}


//// [typeGuardAccordingToPropertyDeep.js]
"use strict";
//// deep property access ---- a.b.c.d.e.f, a["b"]["c"]["d"]
//// mix deep property access ---- a.b["c"]["d"].e
function f(u) {
    if (typeof u.firstKey === "number" || typeof u.firstKey === "boolean") {
        u; // Foo1 | Foo2
        if (typeof u.inner.secondKey === "boolean") {
            u; // Foo2
        }
    }
}
function f2(u) {
    if (typeof u.inner["secondKey"] === "boolean") {
        u; // Foo2
    }
}
function f3(u) {
    if (typeof u["inner"]["secondKey"] === "boolean") {
        u; // Foo2
    }
}
function f4(u) {
    if (typeof u["inner"].secondKey === "boolean") {
        u; // Foo2
    }
}
