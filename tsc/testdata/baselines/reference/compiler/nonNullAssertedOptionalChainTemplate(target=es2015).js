//// [tests/cases/compiler/nonNullAssertedOptionalChainTemplate.ts] ////

//// [nonNullAssertedOptionalChainTemplate.ts]
var f: any;

f?.x!`text`;
f?.x!!`text`;
f?.[0]!`text${1}`;
f?.()!`text`;
f?.x!`text`();
f?.x!`text`.x;

(f?.x)!`text`;
(f?.x!)`text`;
f.x!`text`;


//// [nonNullAssertedOptionalChainTemplate.js]
"use strict";
var f;
(f === null || f === void 0 ? void 0 : f.x) `text`;
(f === null || f === void 0 ? void 0 : f.x) `text`;
(f === null || f === void 0 ? void 0 : f[0]) `text${1}`;
(f === null || f === void 0 ? void 0 : f()) `text`;
(f === null || f === void 0 ? void 0 : f.x) `text`();
(f === null || f === void 0 ? void 0 : f.x) `text`.x;
(f === null || f === void 0 ? void 0 : f.x) `text`;
(f === null || f === void 0 ? void 0 : f.x) `text`;
f.x `text`;
