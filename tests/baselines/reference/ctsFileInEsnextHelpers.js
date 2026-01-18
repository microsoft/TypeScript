//// [tests/cases/compiler/ctsFileInEsnextHelpers.ts] ////

//// [notmodule.cts]
export async function foo() {
  await 0;
}

//// [notmodule.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
var tslib_1 = require("tslib");
function foo() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, 0];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
