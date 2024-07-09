//// [tests/cases/compiler/moduleKeywordRepeatError.ts] ////

//// [moduleKeywordRepeatError.ts]
// "module.module { }" should raise a syntax error

module.module { }

//// [moduleKeywordRepeatError.js]
// "module.module { }" should raise a syntax error
module.module;
{ }
