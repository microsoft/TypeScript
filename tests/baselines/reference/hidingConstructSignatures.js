//// [tests/cases/compiler/hidingConstructSignatures.ts] ////

//// [hidingConstructSignatures.ts]
interface C {
    (a: string): string;
}

interface D extends C {
    new (a: string): number; // Should be ok
}

interface E {
    new (a: string): {};
}

interface F extends E {
    new (a: string): string;
}

var d: D;
d(""); // string
new d(""); // should be number

var f: F;
new f(""); // string

var e: E;
new e(""); // {}

//// [hidingConstructSignatures.js]
var d;
d(""); // string
new d(""); // should be number
var f;
new f(""); // string
var e;
new e(""); // {}
