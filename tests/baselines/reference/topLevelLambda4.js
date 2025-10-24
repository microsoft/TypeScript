//// [tests/cases/compiler/topLevelLambda4.ts] ////

//// [topLevelLambda4.ts]
export var x = () => this.window;

//// [topLevelLambda4.js]
<<<<<<< HEAD
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    var x = () => this.window;
    exports.x = x;
});
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
define(["require", "exports"], function (require, exports) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    var x = function () { return _this.window; };
    exports.x = x;
});
=======
var _this = this;
export var x = function () { return _this.window; };
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
