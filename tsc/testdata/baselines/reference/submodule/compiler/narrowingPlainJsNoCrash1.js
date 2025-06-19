//// [tests/cases/compiler/narrowingPlainJsNoCrash1.ts] ////

//// [index.js]
// https://github.com/microsoft/TypeScript/issues/59594

var a$b = {};
var c, d;
d = a$b;
while (d !== a$b);
while ((c = a$b != a$b)) c.e;


//// [index.js]
// https://github.com/microsoft/TypeScript/issues/59594
var a$b = {};
var c, d;
d = a$b;
while (d !== a$b)
    ;
while ((c = a$b != a$b))
    c.e;
