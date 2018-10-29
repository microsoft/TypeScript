//// [genericWildcardBaseClass.ts]
abstract class BaseClass {
    constructor(s: string = '', ...args: any[]) { }
    base() { return 0; }
    static staticBase() { return ''; }
}

function extendNoConstructor<T extends typeof BaseClass>(Base: T) {
    return class ExN extends Base {
        ext() { return 0; }
        static staticExt() { return ''; }
    };
}

function extendCompatibleConstructor<T extends typeof BaseClass>(Base: T) {
    return class ExC extends Base {
        constructor(x?: string, ...args: any[]) {
            super(x, args);
        }
    };
}

function fails_IncompatibleConstructor<T extends typeof BaseClass>(Base: T) {
    return class Fail extends Base {
        constructor(x?: string, ...args: string[]) {
            super(x, args);
        }
    };
}

abstract class ExtClass extends BaseClass {
    thing() { return 0; }
    static staticThing() { return ''; }
}

abstract class BadClass extends BaseClass {
    constructor(n: number) {
        super();
    }
}

const Thing2 = extendCompatibleConstructor(extendNoConstructor(ExtClass));
extendCompatibleConstructor(extendNoConstructor(BadClass));

const thing2 = new Thing2();
const thing2arg = new Thing2('');
const fails_arg = new Thing2(2);

const str2 = Thing2.staticExt() + Thing2.staticThing() + Thing2.staticBase();
const num2 = thing2.ext() + thing2.thing() + thing2.base();

class Thing3 extends Thing2 {
    constructor() {
        super('', 1, 2);
        Math.round(this.base() + this.thing() + this.ext());
    }
}


//// [genericWildcardBaseClass.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BaseClass = /** @class */ (function () {
    function BaseClass(s) {
        if (s === void 0) { s = ''; }
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
    }
    BaseClass.prototype.base = function () { return 0; };
    BaseClass.staticBase = function () { return ''; };
    return BaseClass;
}());
function extendNoConstructor(Base) {
    return /** @class */ (function (_super) {
        __extends(ExN, _super);
        function ExN() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ExN.prototype.ext = function () { return 0; };
        ExN.staticExt = function () { return ''; };
        return ExN;
    }(Base));
}
function extendCompatibleConstructor(Base) {
    return /** @class */ (function (_super) {
        __extends(ExC, _super);
        function ExC(x) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return _super.call(this, x, args) || this;
        }
        return ExC;
    }(Base));
}
function fails_IncompatibleConstructor(Base) {
    return /** @class */ (function (_super) {
        __extends(Fail, _super);
        function Fail(x) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return _super.call(this, x, args) || this;
        }
        return Fail;
    }(Base));
}
var ExtClass = /** @class */ (function (_super) {
    __extends(ExtClass, _super);
    function ExtClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtClass.prototype.thing = function () { return 0; };
    ExtClass.staticThing = function () { return ''; };
    return ExtClass;
}(BaseClass));
var BadClass = /** @class */ (function (_super) {
    __extends(BadClass, _super);
    function BadClass(n) {
        return _super.call(this) || this;
    }
    return BadClass;
}(BaseClass));
var Thing2 = extendCompatibleConstructor(extendNoConstructor(ExtClass));
extendCompatibleConstructor(extendNoConstructor(BadClass));
var thing2 = new Thing2();
var thing2arg = new Thing2('');
var fails_arg = new Thing2(2);
var str2 = Thing2.staticExt() + Thing2.staticThing() + Thing2.staticBase();
var num2 = thing2.ext() + thing2.thing() + thing2.base();
var Thing3 = /** @class */ (function (_super) {
    __extends(Thing3, _super);
    function Thing3() {
        var _this = _super.call(this, '', 1, 2) || this;
        Math.round(_this.base() + _this.thing() + _this.ext());
        return _this;
    }
    return Thing3;
}(Thing2));
