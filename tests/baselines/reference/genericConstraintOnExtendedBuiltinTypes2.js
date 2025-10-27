//// [tests/cases/compiler/genericConstraintOnExtendedBuiltinTypes2.ts] ////

//// [genericConstraintOnExtendedBuiltinTypes2.ts]
namespace EndGate {
    export interface ICloneable {
        Clone(): any;
    }
}

interface Number extends EndGate.ICloneable { }

namespace EndGate.Tweening {
    export class Tween<T extends ICloneable>{
        private _from: T;

        constructor(from: T) {
            this._from = from.Clone();
        }
    }
}

namespace EndGate.Tweening {
    export class NumberTween extends Tween<Number>{
        constructor(from: number) {
            super(from);
        }
    }
}

//// [genericConstraintOnExtendedBuiltinTypes2.js]
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
var EndGate;
(function (EndGate) {
    var Tweening;
    (function (Tweening) {
        var Tween = /** @class */ (function () {
            function Tween(from) {
                this._from = from.Clone();
            }
            return Tween;
        }());
        Tweening.Tween = Tween;
    })(Tweening = EndGate.Tweening || (EndGate.Tweening = {}));
})(EndGate || (EndGate = {}));
(function (EndGate) {
    var Tweening;
    (function (Tweening) {
        var NumberTween = /** @class */ (function (_super) {
            __extends(NumberTween, _super);
            function NumberTween(from) {
                return _super.call(this, from) || this;
            }
            return NumberTween;
        }(Tweening.Tween));
        Tweening.NumberTween = NumberTween;
    })(Tweening = EndGate.Tweening || (EndGate.Tweening = {}));
})(EndGate || (EndGate = {}));
