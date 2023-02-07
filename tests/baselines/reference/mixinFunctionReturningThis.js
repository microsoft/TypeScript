//// [mixinFunctionReturningThis.ts]
class A {
  constructor(name: string) {}
}

type Constructor = new (...args: any[]) => {};
 
function MixB<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    getThis(): this {
      return this;
    }
  };
}

export default MixB(A);

//// [mixinFunctionReturningThis.js]
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var A = /** @class */ (function () {
    function A(name) {
    }
    return A;
}());
function MixB(Base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.getThis = function () {
            return this;
        };
        return class_1;
    }(Base));
}
exports.default = MixB(A);


//// [mixinFunctionReturningThis.d.ts]
declare class A {
    constructor(name: string);
}
declare const _default: {
    new (...args: any[]): {
        getThis(): this;
    };
} & typeof A;
export default _default;


//// [DtsFileErrors]


tests/cases/compiler/mixinFunctionReturningThis.d.ts(6,20): error TS2526: A 'this' type is available only in a non-static member of a class or interface.


==== tests/cases/compiler/mixinFunctionReturningThis.d.ts (1 errors) ====
    declare class A {
        constructor(name: string);
    }
    declare const _default: {
        new (...args: any[]): {
            getThis(): this;
                       ~~~~
!!! error TS2526: A 'this' type is available only in a non-static member of a class or interface.
        };
    } & typeof A;
    export default _default;
    