//// [superCallParameterContextualTyping3.ts]
interface ContextualType<T> {
    method(parameter: T): void;
}

class CBase<T>  {
    constructor(param: ContextualType<T>) {
    }

    foo(param: ContextualType<T>) {
    }
}

class C extends CBase<string> {
    constructor() {
        // Should be okay.
        // 'p' should have type 'string'.
        super({
            method(p) {
                p.length;
            }
        });

        // Should be okay.
        // 'p' should have type 'string'.
        super.foo({
            method(p) {
                p.length;
            }
        });
    }
}

//// [superCallParameterContextualTyping3.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CBase = (function () {
    function CBase(param) {
    }
    CBase.prototype.foo = function (param) {
    };
    return CBase;
}());
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        // Should be okay.
        // 'p' should have type 'string'.
        _super.call(this, {
            method: function (p) {
                p.length;
            }
        });
        // Should be okay.
        // 'p' should have type 'string'.
        _super.prototype.foo.call(this, {
            method: function (p) {
                p.length;
            }
        });
    }
    return C;
}(CBase));
