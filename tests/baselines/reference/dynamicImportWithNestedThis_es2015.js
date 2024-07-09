//// [tests/cases/compiler/dynamicImportWithNestedThis_es2015.ts] ////

//// [dynamicImportWithNestedThis_es2015.ts]
// https://github.com/Microsoft/TypeScript/issues/17564
class C {
	private _path = './other';

	dynamic() {
		return import(this._path);
	}
}

const c = new C();
c.dynamic();

//// [dynamicImportWithNestedThis_es2015.js]
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
    class C {
        constructor() {
            this._path = './other';
        }
        dynamic() {
            var _a;
            return _a = this._path, __syncRequire ? Promise.resolve().then(() => require(_a)) : new Promise((resolve_1, reject_1) => { require([_a], resolve_1, reject_1); });
        }
    }
    const c = new C();
    c.dynamic();
});
