//// [typeQueryOnClass.ts]
class C<T> {
    constructor(x: number);
    constructor(x: string);
    constructor(public x) { }

    static foo(x: number);
    static foo(x: {});
    static foo(x) { }

    static bar(x) { }

    static sa = 1;
    static sb = () => 1;

    static get sc() {
        return 1;
    }
    static set sc(x) {
    }

    static get sd() {
        return 1;
    }

    baz(x): string { return ''; }

    ia = 1;
    ib = () => this.ia;

    get ic() {
        return 1;
    }
    set ic(x) {
    }

    get id() {
        return 1;
    }

}

var c: C<string>;

// BUG 820454
var r1: typeof C;
var r2: typeof c;

class D<T> {
    constructor(public y?) { }
    x: T;
    foo() { }
}

var d: D<string>;
var r3: typeof D;
var r4: typeof d;

//// [typeQueryOnClass.js]
var C = /** @class */ (function () {
    function C(x) {
        var _this = this;
        this.x = x;
        this.ia = 1;
        this.ib = function () { return _this.ia; };
    }
    C.foo = function (x) { };
    C.bar = function (x) { };
    Object.defineProperty(C, "sc", {
        get: function () {
            return 1;
        },
        set: function (x) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, "sd", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    C.prototype.baz = function (x) { return ''; };
    Object.defineProperty(C.prototype, "ic", {
        get: function () {
            return 1;
        },
        set: function (x) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C.prototype, "id", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    C.sa = 1;
    C.sb = function () { return 1; };
    return C;
}());
var c;
// BUG 820454
var r1;
var r2;
var D = /** @class */ (function () {
    function D(y) {
        this.y = y;
    }
    D.prototype.foo = function () { };
    return D;
}());
var d;
var r3;
var r4;
