//// [tests/cases/conformance/dynamicImport/importCallExpressionInUMD5.ts] ////

//// [0.ts]
export function foo() { return "foo"; }

//// [1.ts]
// https://github.com/microsoft/TypeScript/issues/36780
async function func() {
    const packageName = '.';
    const packageJson = await import(packageName + '/package.json');
}


//// [0.js]
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.foo = foo;
    function foo() { return "foo"; }
});
//// [1.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    // https://github.com/microsoft/TypeScript/issues/36780
    function func() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const packageName = '.';
            const packageJson = yield (_a = packageName + '/package.json', __syncRequire ? Promise.resolve().then(() => require(_a)) : new Promise((resolve_1, reject_1) => { require([_a], resolve_1, reject_1); }));
        });
    }
});
