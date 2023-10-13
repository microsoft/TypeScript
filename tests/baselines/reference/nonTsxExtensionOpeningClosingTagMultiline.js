//// [tests/cases/conformance/jsx/nonTsxExtensionOpeningClosingTagMultiline.ts] ////

//// [nonTsxExtensionOpeningClosingTagMultiline.ts]
console.log("before");
export const _ = () => <span>
    yippee
</span>;
console.log("after");


//// [nonTsxExtensionOpeningClosingTagMultiline.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._ = void 0;
console.log("before");
var _ = function () { return yippee
    < span; };
exports._ = _;
console.log("after");
