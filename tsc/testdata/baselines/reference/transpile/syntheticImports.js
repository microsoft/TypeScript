//// [syntheticImports.tsx] ////
export async function f() {
    await 1;
}

export const element = <div />;
//// [syntheticImports.js] ////
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.element = void 0;
exports.f = f;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
function f() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield 1;
    });
}
exports.element = (0, jsx_runtime_1.jsx)("div", {});
