//// [unionIndexerGeneralAssignability.ts]
interface A {
    [x: "a" | "b" | "c"]: string;
}

interface B {
    [x: "b" | "c" | "d"]: string;
}

interface AB {
    [x: "b" | "c"]: string;
}

function f1<
    K1 extends "a" | "b" | "c",
    K2 extends K1
>(a: A, b: B, ab: AB, k1: K1, k2: K2) {
    a = b; // error: B is missing `"a"`
    a = ab; // error: AB is missing `"a"`

    b = a; // error: A is missing `"d"`
    b = ab; // error: AB is missing `"d"`

    ab = a;
    ab = b;

    interface SubA {
        [x: K1]: string;
    }
    let s: SubA = {};
    s[k1]; // valid
    s = a;
    s = b; // error: doesn't provide `"a"`
    s = ab; // error: doesn't provide `"a"`

    a = s; // error: might not provide any of `"a"`, `"b"`, or `"c"`
    b = s; // error: might not provide any of `"b"`, `"c"`, or `"d"`
    ab = s; // error: might not provide any of `"b"`, or `"c"`

    interface SubB {
        [x: K2]: string;
    }
    let s2: SubB = {};
    s2[k2]; // valid
    s2[k1]; // invalid
    s2 = a;
    s2 = b; // error: doesn't provide `"b"`
    s2 = ab; // error: doesn't provide `"b"`
    s2 = s;

    a = s2; // error: might not provide any of `"a"`, `"b"`, or `"c"`
    b = s2; // error: might not provide any of `"b"`, `"c"`, or `"d"`
    ab = s2; // error: might not provide any of b"`, or `"c"`
    s = s2; // error: might not provide any of the keys of K1
}

interface C {
    [x: "a" | "b" | "c"]: string;
    [y: 1 | 2 | 3]: string;
}

interface D {
    [x: "a" | "b" | "c" | "d"]: string;
    [y: 1 | 2 | 3 | 4]: string;
}

interface E {
    [x: "a" | "b" | "c" | "d" | 1 | 2 | 3 | 4]: string;
}

function f2(c: C, d: D, e: E) {
    c = d;
    c = e;

    d = c; // error: C is missing an index for `"d"` and `4`
    d = e;

    e = c; // error: C is missing an index for `"d"` and `4`
    e = d;
}

enum S1 {
    A = "a",
    B = "b",
    C = "c"
}

enum S2 {
    A = "a",
    B = "b",
    C = "c"
}

interface F {
    [x: S1]: string;
}

interface G {
    [x: S2]: string;
}

interface FG {
    [x: S1 | S2]: string;
}

interface IFG extends F, G {}

function f3(f: F, g: G, fg: FG, fg2: F & G, fg3: IFG) {
    f = g; // error: incompatible string enums
    f = fg; // OK
    f = fg2; // OK
    f = fg3; // OK

    g = f; // error: incompatible string enums
    g = fg; // OK
    g = fg2; // OK
    g = fg3; // OK

    fg = f; // error: doesn't provide S2
    fg = g; // error: doesn't provide S1
    fg = fg2; // OK
    fg = fg3; // OK

    fg2 = f; // error: doesn't provide S2
    fg2 = g; // error: doesn't provide S1
    fg2 = fg; // OK
    fg2 = fg3; // OK

    fg3 = f; // error: doesn't provide S2
    fg3 = g; // error: doesn't provide S1
    fg3 = fg; // OK
    fg3 = fg2; // OK
}

enum S3 {
    A = "a",
    B = "b",
    C = "c"
}

interface H {
    [x: S3]: string;
    [S3.A]: "a";
}

interface I {
    [x: S3]: string;
    [x: S3.A]: "a";
}

interface J {
    [x: S3]: string;
    [x: S3.A]: never;
}

type K = {[K in S3]: string} & {[S3.A]: "a"};
type L = {[K in S3]: string} & {[x: S3.A]: "a"};

function f4(h: H, i: I, j: J, k: K, l: L) {
    h = i; // ok
    h = j; // ok (never is a subtype of "a")
    h = k; // ok
    h = l; // ok

    i = h; // ok
    i = j; // ok (never is a subtype of "a")
    i = k; // ok
    i = l; // ok

    j = h; // not ok
    j = i; // not ok 
    j = k; // not ok
    j = l; // not ok

    k = h; // ok
    k = i; // ok
    k = j; // ok (never is a subtype of "a")
    k = l; // ok

    l = h; // ok
    l = i; // ok
    l = j; // ok (never is a subtype of "a")
    l = k; // ok
}


//// [unionIndexerGeneralAssignability.js]
function f1(a, b, ab, k1, k2) {
    a = b; // error: B is missing `"a"`
    a = ab; // error: AB is missing `"a"`
    b = a; // error: A is missing `"d"`
    b = ab; // error: AB is missing `"d"`
    ab = a;
    ab = b;
    var s = {};
    s[k1]; // valid
    s = a;
    s = b; // error: doesn't provide `"a"`
    s = ab; // error: doesn't provide `"a"`
    a = s; // error: might not provide any of `"a"`, `"b"`, or `"c"`
    b = s; // error: might not provide any of `"b"`, `"c"`, or `"d"`
    ab = s; // error: might not provide any of `"b"`, or `"c"`
    var s2 = {};
    s2[k2]; // valid
    s2[k1]; // invalid
    s2 = a;
    s2 = b; // error: doesn't provide `"b"`
    s2 = ab; // error: doesn't provide `"b"`
    s2 = s;
    a = s2; // error: might not provide any of `"a"`, `"b"`, or `"c"`
    b = s2; // error: might not provide any of `"b"`, `"c"`, or `"d"`
    ab = s2; // error: might not provide any of b"`, or `"c"`
    s = s2; // error: might not provide any of the keys of K1
}
function f2(c, d, e) {
    c = d;
    c = e;
    d = c; // error: C is missing an index for `"d"` and `4`
    d = e;
    e = c; // error: C is missing an index for `"d"` and `4`
    e = d;
}
var S1;
(function (S1) {
    S1["A"] = "a";
    S1["B"] = "b";
    S1["C"] = "c";
})(S1 || (S1 = {}));
var S2;
(function (S2) {
    S2["A"] = "a";
    S2["B"] = "b";
    S2["C"] = "c";
})(S2 || (S2 = {}));
function f3(f, g, fg, fg2, fg3) {
    f = g; // error: incompatible string enums
    f = fg; // OK
    f = fg2; // OK
    f = fg3; // OK
    g = f; // error: incompatible string enums
    g = fg; // OK
    g = fg2; // OK
    g = fg3; // OK
    fg = f; // error: doesn't provide S2
    fg = g; // error: doesn't provide S1
    fg = fg2; // OK
    fg = fg3; // OK
    fg2 = f; // error: doesn't provide S2
    fg2 = g; // error: doesn't provide S1
    fg2 = fg; // OK
    fg2 = fg3; // OK
    fg3 = f; // error: doesn't provide S2
    fg3 = g; // error: doesn't provide S1
    fg3 = fg; // OK
    fg3 = fg2; // OK
}
var S3;
(function (S3) {
    S3["A"] = "a";
    S3["B"] = "b";
    S3["C"] = "c";
})(S3 || (S3 = {}));
function f4(h, i, j, k, l) {
    h = i; // ok
    h = j; // ok (never is a subtype of "a")
    h = k; // ok
    h = l; // ok
    i = h; // ok
    i = j; // ok (never is a subtype of "a")
    i = k; // ok
    i = l; // ok
    j = h; // not ok
    j = i; // not ok 
    j = k; // not ok
    j = l; // not ok
    k = h; // ok
    k = i; // ok
    k = j; // ok (never is a subtype of "a")
    k = l; // ok
    l = h; // ok
    l = i; // ok
    l = j; // ok (never is a subtype of "a")
    l = k; // ok
}
