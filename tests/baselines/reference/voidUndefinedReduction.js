//// [tests/cases/compiler/voidUndefinedReduction.ts] ////

//// [voidUndefinedReduction.ts]
// Repro from #42786

function isDefined<T>(value: T | undefined | null | void): value is T {
  return value !== undefined && value !== null;
}

declare const foo: string | undefined;

if (isDefined(foo)) {
  console.log(foo.toUpperCase()); 
}


//// [voidUndefinedReduction.js]
"use strict";
// Repro from #42786
function isDefined(value) {
    return value !== undefined && value !== null;
}
if (isDefined(foo)) {
    console.log(foo.toUpperCase());
}
