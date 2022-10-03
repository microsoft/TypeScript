module A {
    export class C { }
}
module B {
    export class C { }
    class D { }
}

var a: A;
var b: B;

// no error
a = b;
b = a;

