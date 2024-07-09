module A {
    export class C { }
}
module B {
    export class C { }
    export class D { }
}

var a: A;
var b: B;

a = b;
b = a; // error