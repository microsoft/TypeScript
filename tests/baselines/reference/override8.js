//// [tests/cases/conformance/override/override8.ts] ////

//// [override8.ts]
class B {
    a: string
}

class D extends B {
    constructor(public a: string, public b: string) {
        super();
    }
}

class BB {
    constructor(public a: string) {

    }
}

class DD extends BB {
    constructor(public a: string) {
        super(a)
    }
}

class DDD extends BB {
    public a: string;

    constructor(a: string) {
        super(a)
        this.a = a
    }
}

//// [override8.js]
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
    function B() {
    }
    return B;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D(a, b) {
        var _this = _super.call(this) || this;
        _this.a = a;
        _this.b = b;
        return _this;
    }
    return D;
}(B));
var BB = /** @class */ (function () {
    function BB(a) {
        this.a = a;
    }
    return BB;
}());
var DD = /** @class */ (function (_super) {
    __extends(DD, _super);
    function DD(a) {
        var _this = _super.call(this, a) || this;
        _this.a = a;
        return _this;
    }
    return DD;
}(BB));
var DDD = /** @class */ (function (_super) {
    __extends(DDD, _super);
    function DDD(a) {
        var _this = _super.call(this, a) || this;
        _this.a = a;
        return _this;
    }
    return DDD;
}(BB));


//// [override8.d.ts]
declare class B {
    a: string;
}
declare class D extends B {
    a: string;
    b: string;
    constructor(a: string, b: string);
}
declare class BB {
    a: string;
    constructor(a: string);
}
declare class DD extends BB {
    a: string;
    constructor(a: string);
}
declare class DDD extends BB {
    a: string;
    constructor(a: string);
}
