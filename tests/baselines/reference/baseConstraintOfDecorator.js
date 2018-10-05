//// [baseConstraintOfDecorator.ts]
export function classExtender<TFunction>(superClass: TFunction, _instanceModifier: (instance: any, args: any[]) => void): TFunction {
    return class decoratorFunc extends superClass {
        constructor(...args: any[]) {
            super(...args);
            _instanceModifier(this, args);
        }
    };
}


//// [baseConstraintOfDecorator.js]
"use strict";
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
exports.__esModule = true;
function classExtender(superClass, _instanceModifier) {
    return /** @class */ (function (_super) {
        __extends(decoratorFunc, _super);
        function decoratorFunc() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _instanceModifier(_this, args);
            return _this;
        }
        return decoratorFunc;
    }(superClass));
}
exports.classExtender = classExtender;
