//// [tests/cases/conformance/jsx/nonTsxExtensionOpeningClosingTag.ts] ////

//// [nonTsxExtensionOpeningClosingTag.ts]
console.log("before");
export const _ = () => <span>yippee</span>;
console.log("after");


//// [nonTsxExtensionOpeningClosingTag.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._ = void 0;
console.log("before");
var _ = function () { return yippee < span; };
exports._ = _;
console.log("after");
