interface Boolean {
    doStuff(): string;
}

interface NotBoolean {
    doStuff(): string;
}

var x = true;
var a: Boolean;
var b: NotBoolean;

a = x;
a = b;

b = a;
b = x;

x = a; // expected error
x = b; // expected error

