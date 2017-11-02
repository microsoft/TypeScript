//// [dynamicImportWithNestedThis_es5.ts]
// https://github.com/Microsoft/TypeScript/issues/17564
class C {
	private _path = './other';

	dynamic() {
		return import(this._path);
	}
}

const c = new C();
c.dynamic();

//// [dynamicImportWithNestedThis_es5.js]
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var __syncRequire = typeof module === "object" && typeof module.exports === "object";
    // https://github.com/Microsoft/TypeScript/issues/17564
    var C = /** @class */ (function () {
        function C() {
            this._path = './other';
        }
        C.prototype.dynamic = function () {
            var _this = this;
            return _a = this._path, __syncRequire ? Promise.resolve().then(function () { return __importStar(require(_a)); }) : new Promise(function (resolve_1, reject_1) { require([_a], resolve_1, reject_1); }).then(__importStar);
            var _a;
        };
        return C;
    }());
    var c = new C();
    c.dynamic();
});
