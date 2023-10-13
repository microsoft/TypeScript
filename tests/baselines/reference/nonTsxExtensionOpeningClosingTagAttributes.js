//// [tests/cases/conformance/jsx/nonTsxExtensionOpeningClosingTagAttributes.ts] ////

//// [nonTsxExtensionOpeningClosingTagAttributes.ts]
console.log("before");
export const _ = () => <span aria-disabled onClick={() => {}}>yippee</span>;
console.log("after");


//// [nonTsxExtensionOpeningClosingTagAttributes.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onClick = exports._ = void 0;
console.log("before");
var _ = function () { return aria - disabled; };
exports._ = _, exports.onClick = {}();
{ }
 > yippee < /span>;;
console.log("after");
