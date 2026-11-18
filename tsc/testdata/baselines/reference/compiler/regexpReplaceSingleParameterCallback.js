//// [tests/cases/compiler/regexpReplaceSingleParameterCallback.ts] ////

//// [regexpReplaceSingleParameterCallback.ts]
declare const pattern: RegExp;
declare const replace: (value: string) => string;
"".replace(pattern, replace);


//// [regexpReplaceSingleParameterCallback.js]
"use strict";
"".replace(pattern, replace);
