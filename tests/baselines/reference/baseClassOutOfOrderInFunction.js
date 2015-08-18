//// [baseClassOutOfOrderInFunction.ts]
function foo() {
    class B extends A { // no error
        constructor(msg: string) {
            super(msg);
        }
    }

    class B2 extends class B3 extends class C { // no error
    }{
    }{ }

    class B3 extends class { // no error
    }{
    }

    class B4<T> extends A1<T> { // no error
        constructor(msg: T) {
            super(msg);
        }
    }
    
    class B5 extends A1<number> { // no error
        constructor(msg: number) {
            super(msg);
        }
    }

    class B6 extends B4<A1<number>> { // No error
        constructor(msg: A1<number>) {
            super(msg);
        }
    }

    class B7 extends M.c { // no error
    }
}

class A {
    constructor(public msg: string) {

    }
}

class A1<T> {
    constructor(msg: T) {
    }
}

module M {
    export class c {
    }
}

//// [baseClassOutOfOrderInFunction.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function foo() {
    var B = (function (_super) {
        __extends(B, _super);
        function B(msg) {
            _super.call(this, msg);
        }
        return B;
    })(A);
    var B2 = (function (_super) {
        __extends(B2, _super);
        function B2() {
            _super.apply(this, arguments);
        }
        return B2;
    })((function (_super) {
        __extends(B3, _super);
        function B3() {
            _super.apply(this, arguments);
        }
        return B3;
    })((function () {
        function C() {
        }
        return C;
    })()));
    var B3 = (function (_super) {
        __extends(B3, _super);
        function B3() {
            _super.apply(this, arguments);
        }
        return B3;
    })((function () {
        function class_1() {
        }
        return class_1;
    })());
    var B4 = (function (_super) {
        __extends(B4, _super);
        function B4(msg) {
            _super.call(this, msg);
        }
        return B4;
    })(A1);
    var B5 = (function (_super) {
        __extends(B5, _super);
        function B5(msg) {
            _super.call(this, msg);
        }
        return B5;
    })(A1);
    var B6 = (function (_super) {
        __extends(B6, _super);
        function B6(msg) {
            _super.call(this, msg);
        }
        return B6;
    })(B4);
    var B7 = (function (_super) {
        __extends(B7, _super);
        function B7() {
            _super.apply(this, arguments);
        }
        return B7;
    })(M.c);
}
var A = (function () {
    function A(msg) {
        this.msg = msg;
    }
    return A;
})();
var A1 = (function () {
    function A1(msg) {
    }
    return A1;
})();
var M;
(function (M) {
    var c = (function () {
        function c() {
        }
        return c;
    })();
    M.c = c;
})(M || (M = {}));
