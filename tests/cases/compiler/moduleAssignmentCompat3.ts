module A {
    export var x = 1;
}
module B {
    export var x = "";
}

var a: A;
var b: B;

// both errors
a = b;
b = a;
