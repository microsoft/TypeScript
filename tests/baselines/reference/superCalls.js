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
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Base = (function () {
    function Base(n) {
        this.x = 43;
    }
    return Base;
}());
function v() { }
var Derived = (function (_super) {
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
var OtherBase = (function () {
    function OtherBase() {
    }
    return OtherBase;
}());
var OtherDerived = (function (_super) {
    __extends(OtherDerived, _super);
    function OtherDerived() {
        var _this = this;
        var p = '';
        _this = _super.call(this) || this;
        return _this;
    }
    return OtherDerived;
}(OtherBase));
