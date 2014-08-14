//// [constructorParameterProperties.ts]
class C {
    y: string;
    constructor(private x: string) { }
}

var c: C;
var r = c.y;
var r2 = c.x; // error

class D<T> {
    y: T;
    constructor(a: T, private x: T) { }
}

var d: D<string>;
var r = d.y;
var r2 = d.x; // error
var r3 = d.a; // error

//// [constructorParameterProperties.js]
var C = (function () {
    function C(x) {
        this.x = x;
    }
    return C;
})();
var c;
var r = c.y;
var r2 = c.x;// error 
var D = (function () {
    function D(a, x) {
        this.x = x;
    }
    return D;
})();
var d;
var r = d.y;
var r2 = d.x;// error 
var r3 = d.a;// error 
