//// [tests/cases/compiler/noCrashOnMixin.ts] ////

//// [noCrashOnMixin.ts]
class Abstract {
    protected constructor() {
    }
}

class Concrete extends Abstract {
}

type Constructor<T = {}> = new (...args: any[]) => T;

function Mixin<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
    };
}

class Empty {
}

class CrashTrigger extends Mixin(Empty) {
    public trigger() {
        new Concrete();
    }
}

//// [noCrashOnMixin.js]
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
var Abstract = /** @class */ (function () {
    function Abstract() {
    }
    return Abstract;
}());
var Concrete = /** @class */ (function (_super) {
    __extends(Concrete, _super);
    function Concrete() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Concrete;
}(Abstract));
function Mixin(Base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return class_1;
    }(Base));
}
var Empty = /** @class */ (function () {
    function Empty() {
    }
    return Empty;
}());
var CrashTrigger = /** @class */ (function (_super) {
    __extends(CrashTrigger, _super);
    function CrashTrigger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CrashTrigger.prototype.trigger = function () {
        new Concrete();
    };
    return CrashTrigger;
}(Mixin(Empty)));
