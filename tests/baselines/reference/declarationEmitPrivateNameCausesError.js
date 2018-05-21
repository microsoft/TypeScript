//// [file.ts]
const IGNORE_EXTRA_VARIABLES = Symbol(); //Notice how this is unexported

//This is exported
export function ignoreExtraVariables<CtorT extends {new(...args:any[]):{}}> (ctor : CtorT) {
    return class extends ctor {
        [IGNORE_EXTRA_VARIABLES] = true; //An unexported constant is used
    };
}

//// [file.js]
"use strict";
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
exports.__esModule = true;
var IGNORE_EXTRA_VARIABLES = Symbol(); //Notice how this is unexported
//This is exported
function ignoreExtraVariables(ctor) {
    var _a, _b;
    return _b = /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this[_a] = true; //An unexported constant is used
                return _this;
            }
            return class_1;
        }(ctor)),
        _a = IGNORE_EXTRA_VARIABLES,
        _b;
}
exports.ignoreExtraVariables = ignoreExtraVariables;


//// [file.d.ts]
declare const IGNORE_EXTRA_VARIABLES: unique symbol;
export declare function ignoreExtraVariables<CtorT extends {
    new (...args: any[]): {};
}>(ctor: CtorT): {
    new (...args: any[]): {
        [IGNORE_EXTRA_VARIABLES]: boolean;
    };
} & CtorT;
export {};
