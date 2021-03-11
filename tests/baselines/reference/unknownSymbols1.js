//// [unknownSymbols1.ts]
var x = asdf;
var y: asdf;

function foo(x: asdf, y: number): asdf { }
function foo2() {
    return asdf;
}

var z = <asdf>x; // should be an error

class C<T> {
    foo: asdf;
    bar: C<asdf>;
}

class C2 implements asdf { }
interface I extends adsf { }

class C3 { constructor(x: any) { } }
class C4 extends C3 {
    constructor() {
        super(asdf);
    }
}

var x2 = this.asdf; // no error, this is any

class C5 {
    constructor() {
        this.asdf = asdf;
    }
}

//// [unknownSymbols1.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var x = asdf;
var y;
function foo(x, y) { }
function foo2() {
    return asdf;
}
var z = x; // should be an error
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
var C3 = /** @class */ (function () {
    function C3(x) {
    }
    return C3;
}());
var C4 = /** @class */ (function (_super) {
    __extends(C4, _super);
    function C4() {
        return _super.call(this, asdf) || this;
    }
    return C4;
}(C3));
var x2 = this.asdf; // no error, this is any
var C5 = /** @class */ (function () {
    function C5() {
        this.asdf = asdf;
    }
    return C5;
}());
