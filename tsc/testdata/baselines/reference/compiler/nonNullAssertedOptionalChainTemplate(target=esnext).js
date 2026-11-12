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
(f?.x) `text`;
(f?.x) `text`;
(f?.[0]) `text${1}`;
(f?.()) `text`;
(f?.x) `text`();
(f?.x) `text`.x;
(f?.x) `text`;
(f?.x) `text`;
f.x `text`;
