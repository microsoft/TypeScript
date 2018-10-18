//// [typeofClass.ts]
class K {
    foo: number;
    static bar: string;
}

var k1: K;
k1.foo;
k1.bar;
var k2: typeof K;
k2.foo;
k2.bar;

//// [typeofClass.js]
var K = /** @class */ (function () {
    function K() {
    }
    return K;
}());
var k1;
k1.foo;
k1.bar;
var k2;
k2.foo;
k2.bar;
