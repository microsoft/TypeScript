//// [superCalls.ts]
class Base {
    x = 43;
    constructor(n: string) {

    }
}

function v(): void { }

class Derived extends Base {
    //super call in class constructor of derived type
    constructor(public q: number) {
        super('');
        //type of super call expression is void
        var p = super('');
        var p = v();
    }
}

class OtherBase {

}

class OtherDerived extends OtherBase {
    constructor() {
        var p = '';
        super();
    }
}


//// [superCalls.js]
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
var Base = /** @class */ (function () {
    function Base(n) {
        this.x = 43;
    }
    return Base;
}());
function v() { }
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    //super call in class constructor of derived type
    function Derived(q) {
        var _this = _super.call(this, '') || this;
        _this.q = q;
        //type of super call expression is void
        var p = _this = _super.call(this, '') || this;
        var p = v();
        return _this;
    }
    return Derived;
}(Base));
var OtherBase = /** @class */ (function () {
    function OtherBase() {
    }
    return OtherBase;
}());
var OtherDerived = /** @class */ (function (_super) {
    __extends(OtherDerived, _super);
    function OtherDerived() {
        var _this = this;
        var p = '';
        _this = _super.call(this) || this;
        return _this;
    }
    return OtherDerived;
}(OtherBase));
