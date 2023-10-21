//// [tests/cases/conformance/jsx/nonTsxExtensionSelfClosingTag.ts] ////

//// [nonTsxExtensionSelfClosingTag.ts]
console.log("before");
export const _ = () => <span />;
console.log("after");


//// [nonTsxExtensionSelfClosingTag.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._ = void 0;
console.log("before");
var _ = function () { return ; };
exports._ = _;
console.log("after");
