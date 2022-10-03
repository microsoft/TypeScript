module m1 {
    export class m1 {
    }
}
var foo = new m1.m1();
module m1 {
    export class c1 {
    }
    var b = new c1();
    var c = new m1();
}
var foo2 = new m1.c1();

module m2 {
    export class c1 {
    }
    export var b10 = 10;
    var x = new c1();
}
var foo3 = new m2.c1();
module m2 {
    export class m2 {
    }
    var b = new m2();
    var d = b10;
    var c = new c1();
}
var foo3 = new m2.c1();
var foo2 = new m2.m2();