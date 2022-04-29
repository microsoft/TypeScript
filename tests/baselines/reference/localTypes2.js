//// [localTypes2.ts]
function f1() {
    function f() {
        class C {
            constructor(public x: number, public y: number) { }
        }
        return C;
    }
    let C = f();
    let v = new C(10, 20);
    let x = v.x;
    let y = v.y;
}

function f2() {
    function f(x: number) {
        class C {
            public x = x;
            constructor(public y: number) { }
        }
        return C;
    }
    let C = f(10);
    let v = new C(20);
    let x = v.x;
    let y = v.y;
}

function f3() {
    function f(x: number, y: number) {
        class C {
            public x = x;
            public y = y;
        }
        return C;
    }
    let C = f(10, 20);
    let v = new C();
    let x = v.x;
    let y = v.y;
}


//// [localTypes2.js]
function f1() {
    function f() {
        var C = /** @class */ (function () {
            function C(x, y) {
                this.x = x;
                this.y = y;
            }
            return C;
        }());
        return C;
    }
    var C = f();
    var v = new C(10, 20);
    var x = v.x;
    var y = v.y;
}
function f2() {
    function f(x) {
        var C = /** @class */ (function () {
            function C(y) {
                this.y = y;
                this.x = x;
            }
            return C;
        }());
        return C;
    }
    var C = f(10);
    var v = new C(20);
    var x = v.x;
    var y = v.y;
}
function f3() {
    function f(x, y) {
        var C = /** @class */ (function () {
            function C() {
                this.x = x;
                this.y = y;
            }
            return C;
        }());
        return C;
    }
    var C = f(10, 20);
    var v = new C();
    var x = v.x;
    var y = v.y;
}
