//// [tests/cases/compiler/baseExpressionTypeParameters.ts] ////

//// [baseExpressionTypeParameters.ts]
// Repro from #17829

function base<T>() {
    class Base {
        static prop: T;
    }
    return Base;
}

class Gen<T> extends base<T>() {}  // Error, T not in scope
class Spec extends Gen<string> {}

<string>Spec.prop;

//// [baseExpressionTypeParameters.js]
// Repro from #17829
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
function base() {
    var Base = /** @class */ (function () {
        function Base() {
        }
        return Base;
    }());
    return Base;
}
var Gen = /** @class */ (function (_super) {
    __extends(Gen, _super);
    function Gen() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Gen;
}(base())); // Error, T not in scope
var Spec = /** @class */ (function (_super) {
    __extends(Spec, _super);
    function Spec() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Spec;
}(Gen));
Spec.prop;
