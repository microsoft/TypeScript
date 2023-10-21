//// [tests/cases/conformance/jsx/nonTsxExtensionSelfClosingTagMultiline.ts] ////

//// [nonTsxExtensionSelfClosingTagMultiline.ts]
console.log("before");
export const _ = () => <span
/>;
console.log("after");


//// [nonTsxExtensionSelfClosingTagMultiline.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._ = void 0;
console.log("before");
var _ = function () { return ; };
exports._ = _;
console.log("after");
