//// [tests/cases/conformance/dynamicImport/importCallExpressionNestedUMD.ts] ////

//// [foo.ts]
export default "./foo";

//// [index.ts]
async function foo() {
    return await import((await import("./foo")).default);
}

//// [foo.js]
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
    exports.default = "./foo";
});
//// [index.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
    function foo() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield __syncRequire ? Promise.resolve().then(function () { return require((yield __syncRequire ? Promise.resolve().then(function () { return require("./foo"); }) : new Promise(function (resolve_1, reject_1) { require(["./foo"], resolve_1, reject_1); })).default); }) : new Promise(function (resolve_2, reject_2) { require([(yield __syncRequire ? Promise.resolve().then(function () { return require("./foo"); }) : new Promise(function (resolve_3, reject_3) { require(["./foo"], resolve_3, reject_3); })).default], resolve_2, reject_2); });
        });
    }
});
