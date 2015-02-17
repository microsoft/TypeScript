//// [callWithSpreadES6.ts]

interface X {
    foo(x: number, y: number, ...z: string[]);
}

function foo(x: number, y: number, ...z: string[]) {
}

var a: string[];
var z: number[];
var obj: X;
var xa: X[];

foo(1, 2, "abc");
foo(1, 2, ...a);
foo(1, 2, ...a, "abc");

obj.foo(1, 2, "abc");
obj.foo(1, 2, ...a);
obj.foo(1, 2, ...a, "abc");

(obj.foo)(1, 2, "abc");
(obj.foo)(1, 2, ...a);
(obj.foo)(1, 2, ...a, "abc");

xa[1].foo(1, 2, "abc");
xa[1].foo(1, 2, ...a);
xa[1].foo(1, 2, ...a, "abc");

(<Function>xa[1].foo)(...[1, 2, "abc"]);

class C {
    constructor(x: number, y: number, ...z: string[]) {
        this.foo(x, y);
        this.foo(x, y, ...z);
    }
    foo(x: number, y: number, ...z: string[]) {
    }
}

class D extends C {
    constructor() {
        super(1, 2);
        super(1, 2, ...a);
    }
    foo() {
        super.foo(1, 2);
        super.foo(1, 2, ...a);
    }
}

// Only supported in when target is ES6
var c = new C(1, 2, ...a);


//// [callWithSpreadES6.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
function foo(x, y, ...z) {
}
var a;
var z;
var obj;
var xa;
foo(1, 2, "abc");
foo(1, 2, ...a);
foo(1, 2, ...a, "abc");
obj.foo(1, 2, "abc");
obj.foo(1, 2, ...a);
obj.foo(1, 2, ...a, "abc");
(obj.foo)(1, 2, "abc");
(obj.foo)(1, 2, ...a);
(obj.foo)(1, 2, ...a, "abc");
xa[1].foo(1, 2, "abc");
xa[1].foo(1, 2, ...a);
xa[1].foo(1, 2, ...a, "abc");
xa[1].foo(...[1, 2, "abc"]);
var C = (function () {
    function C(x, y, ...z) {
        this.foo(x, y);
        this.foo(x, y, ...z);
    }
    C.prototype.foo = function (x, y, ...z) {
    };
    return C;
})();
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.call(this, 1, 2);
        _super.call(this, 1, 2, ...a);
    }
    D.prototype.foo = function () {
        _super.prototype.foo.call(this, 1, 2);
        _super.prototype.foo.call(this, 1, 2, ...a);
    };
    return D;
})(C);
// Only supported in when target is ES6
var c = new C(1, 2, ...a);
