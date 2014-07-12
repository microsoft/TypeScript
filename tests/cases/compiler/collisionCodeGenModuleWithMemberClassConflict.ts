module m1 {
    export class m1 {
    }
}
var foo = new m1.m1();

module m2 {
    export class m2 {
    }

    export class _m2 {
    }
}
var foo = new m2.m2();
var foo = new m2._m2();