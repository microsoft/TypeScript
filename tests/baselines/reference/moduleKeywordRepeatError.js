//// [tests/cases/compiler/moduleKeywordRepeatError.ts] ////

//// [moduleKeywordRepeatError.ts]
// "module.module { }" should raise a syntax error

module.module { }

//// [moduleKeywordRepeatError.js]
"use strict";
// "module.module { }" should raise a syntax error
module.module;
{ }
