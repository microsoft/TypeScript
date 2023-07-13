//// [tests/cases/compiler/capturedLetConstInLoop10.ts] ////

//// [capturedLetConstInLoop10.ts]
class A {
    foo() {
        for (let x of [0]) {
            let f = function() { return x; };
            this.bar(f());
        }
    }
    bar(a: number) {
    }

    baz() {
        for (let x of [1]) {
            let a = function() {  return x; };
            for (let y of [1]) {
                let b = function() { return y; };
                this.bar(b());
            }
            this.bar(a());
        }
    }
    baz2() {
        for (let x of [1]) {
            let a = function() {  return x; };
            this.bar(a());
            for (let y of [1]) {
                let b = function() { return y; };
                this.bar(b());
            }
        }
    }
}

class B {
    foo() {
        let a =
            () => {
                for (let x of [0]) {
                    let f = () => x;
                    this.bar(f());
                }
            }
    }
    bar(a: number) {
    }
}

//// [capturedLetConstInLoop10.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.foo = function () {
        var _loop_1 = function (x) {
            var f = function () { return x; };
            this_1.bar(f());
        };
        var this_1 = this;
        for (var _i = 0, _a = [0]; _i < _a.length; _i++) {
            var x = _a[_i];
            _loop_1(x);
        }
    };
    A.prototype.bar = function (a) {
    };
    A.prototype.baz = function () {
        var _loop_2 = function (x) {
            var a = function () { return x; };
            var _loop_3 = function (y) {
                var b = function () { return y; };
                this_2.bar(b());
            };
            for (var _b = 0, _c = [1]; _b < _c.length; _b++) {
                var y = _c[_b];
                _loop_3(y);
            }
            this_2.bar(a());
        };
        var this_2 = this;
        for (var _i = 0, _a = [1]; _i < _a.length; _i++) {
            var x = _a[_i];
            _loop_2(x);
        }
    };
    A.prototype.baz2 = function () {
        var _loop_4 = function (x) {
            var a = function () { return x; };
            this_3.bar(a());
            var _loop_5 = function (y) {
                var b = function () { return y; };
                this_3.bar(b());
            };
            for (var _b = 0, _c = [1]; _b < _c.length; _b++) {
                var y = _c[_b];
                _loop_5(y);
            }
        };
        var this_3 = this;
        for (var _i = 0, _a = [1]; _i < _a.length; _i++) {
            var x = _a[_i];
            _loop_4(x);
        }
    };
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    B.prototype.foo = function () {
        var _this = this;
        var a = function () {
            var _loop_6 = function (x) {
                var f = function () { return x; };
                _this.bar(f());
            };
            for (var _i = 0, _a = [0]; _i < _a.length; _i++) {
                var x = _a[_i];
                _loop_6(x);
            }
        };
    };
    B.prototype.bar = function (a) {
    };
    return B;
}());
