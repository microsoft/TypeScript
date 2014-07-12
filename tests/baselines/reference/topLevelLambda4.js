//// [topLevelLambda4.ts]
export var x = () => this.window;

//// [topLevelLambda4.js]
define(["require", "exports"], function (require, exports) {
    var _this = this;
    exports.x = function () { return _this.window; };
});
