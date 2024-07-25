//// [tests/cases/compiler/es6ImportWithoutFromClauseAmd.ts] ////

//// [es6ImportWithoutFromClauseAmd_0.ts]
export var a = 10;

//// [es6ImportWithoutFromClauseAmd_1.ts]
export var b = 10;

//// [es6ImportWithoutFromClauseAmd_2.ts]
import "es6ImportWithoutFromClauseAmd_0"; 
import "es6ImportWithoutFromClauseAmd_2";
var _a = 10;
var _b = 10;

//// [es6ImportWithoutFromClauseAmd_0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = 10;
});
//// [es6ImportWithoutFromClauseAmd_1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.b = void 0;
    exports.b = 10;
});
//// [es6ImportWithoutFromClauseAmd_2.js]
define(["require", "exports", "es6ImportWithoutFromClauseAmd_0", "es6ImportWithoutFromClauseAmd_2"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _a = 10;
    var _b = 10;
});


//// [es6ImportWithoutFromClauseAmd_0.d.ts]
export declare var a: number;
//// [es6ImportWithoutFromClauseAmd_1.d.ts]
export declare var b: number;
//// [es6ImportWithoutFromClauseAmd_2.d.ts]
import "es6ImportWithoutFromClauseAmd_0";
import "es6ImportWithoutFromClauseAmd_2";
