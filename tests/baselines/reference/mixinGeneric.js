//// [mixinGeneric.ts]
type Constructor<T> = new(...args: any[]) => T;

class A {
    a!: number;
}
class B {
    b!: number;
}
function mixinC<TBase extends Constructor<{}>>(Base: TBase) {
    return class C<T> extends Base {
        c!: T;
    };
}

const ACB = mixinC(A)<B>;
const acb = new ACB();
const acbC: B = acb.c;

class D {
    d!: number;
}

const ACBCD = mixinC(ACB)<D>;
const acbcd = new ACBCD();
const acbcdC: ACB = acbcd.c;


//// [mixinGeneric.js]
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
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
function mixinC(Base) {
    return /** @class */ (function (_super) {
        __extends(C, _super);
        function C() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return C;
    }(Base));
}
var ACB = (mixinC(A));
var acb = new ACB();
var acbC = acb.c;
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
var ACBCD = (mixinC(ACB));
var acbcd = new ACBCD();
var acbcdC = acbcd.c;
