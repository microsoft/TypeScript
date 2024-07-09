//// [tests/cases/compiler/topLevelLambda4.ts] ////

//// [topLevelLambda4.ts]
export var x = () => this.window;

//// [topLevelLambda4.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    var x = function () { return _this.window; };
    exports.x = x;
});
