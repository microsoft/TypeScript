//// [tests/cases/conformance/types/primitives/boolean/assignFromBooleanInterface2.ts] ////

//// [assignFromBooleanInterface2.ts]
interface Boolean {
    doStuff(): string;
}

interface NotBoolean {
    doStuff(): string;
}

var x = true;
declare var a: Boolean;
declare var b: NotBoolean;

a = x;
a = b;

b = a;
b = x;

x = a; // expected error
x = b; // expected error



//// [assignFromBooleanInterface2.js]
var x = true;
a = x;
a = b;
b = a;
b = x;
x = a; // expected error
x = b; // expected error
