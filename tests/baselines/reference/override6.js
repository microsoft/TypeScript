//// [tests/cases/conformance/override/override6.ts] ////

//// [override6.ts]
class B {
    public baz: number = 1;
    constructor(public foo: string, public bar: number) {

    }
}

class D extends B {
    public bar: number = 1
    constructor(public foo: string, public baz: number) {
        super(foo, 42)
    }
}


//// [override6.js]
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
var B = /** @class */ (function () {
    function B(foo, bar) {
        this.foo = foo;
        this.bar = bar;
        this.baz = 1;
    }
    return B;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D(foo, baz) {
        var _this = _super.call(this, foo, 42) || this;
        _this.foo = foo;
        _this.baz = baz;
        _this.bar = 1;
        return _this;
    }
    return D;
}(B));


//// [override6.d.ts]
declare class B {
    foo: string;
    bar: number;
    baz: number;
    constructor(foo: string, bar: number);
}
declare class D extends B {
    foo: string;
    baz: number;
    bar: number;
    constructor(foo: string, baz: number);
}
