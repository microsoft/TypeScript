//// [topLevelLambda4.ts]
export var x = () => this.window;

//// [topLevelLambda4.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var _this = this;
    exports.__esModule = true;
    exports.x = function () { return _this.window; };
});
