//// [tests/cases/compiler/constantEnumAssert.ts] ////

//// [constantEnumAssert.ts]
enum E1 {
    a,
    b
}

enum E2 {
    a = 'a',
    b = 'b'
}

enum E3 {
    a = 1,
    b = a << 1,
    c = a << 2,
}

const enum E4 {
    a,
    b
}

const E5 = {
    a: 'a',
    b: 'b'
}

const foo1 = { a: E1.a }

const foo2 = { a: E2.a }

const foo3 = { a: E1.a } as const

const foo4 = { a: E2.a } as const

const foo5 = { a: E3.a } as const

const foo6 = { a: E4.a } as const

const foo7 = { a: E5.a } as const

const foo8 = { a: E1.a as const }

const foo9 = { a: E2.a as const }

const foo10 = { a: E3.a as const }

const foo11 = { a: E4.a as const }

const foo12 = { a: E5.a as const }


//// [constantEnumAssert.js]
var E1;
(function (E1) {
    E1[E1["a"] = 0] = "a";
    E1[E1["b"] = 1] = "b";
})(E1 || (E1 = {}));
var E2;
(function (E2) {
    E2["a"] = "a";
    E2["b"] = "b";
})(E2 || (E2 = {}));
var E3;
(function (E3) {
    E3[E3["a"] = 1] = "a";
    E3[E3["b"] = 2] = "b";
    E3[E3["c"] = 4] = "c";
})(E3 || (E3 = {}));
var E5 = {
    a: 'a',
    b: 'b'
};
var foo1 = { a: E1.a };
var foo2 = { a: E2.a };
var foo3 = { a: E1.a };
var foo4 = { a: E2.a };
var foo5 = { a: E3.a };
var foo6 = { a: 0 /* E4.a */ };
var foo7 = { a: E5.a };
var foo8 = { a: E1.a };
var foo9 = { a: E2.a };
var foo10 = { a: E3.a };
var foo11 = { a: 0 /* E4.a */ };
var foo12 = { a: E5.a };
