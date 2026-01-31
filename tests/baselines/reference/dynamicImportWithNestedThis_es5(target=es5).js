//// [tests/cases/compiler/dynamicImportWithNestedThis_es5.ts] ////

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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
            var _a;
            return _a = this._path, __syncRequire ? Promise.resolve().then(function () { return __importStar(require(_a)); }) : new Promise(function (resolve_1, reject_1) { require([_a], resolve_1, reject_1); }).then(__importStar);
        };
        return C;
    }());
    var c = new C();
    c.dynamic();
});
