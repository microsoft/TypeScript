//// [tests/cases/compiler/arityErrorRelatedSpanBindingPattern.ts] ////

//// [arityErrorRelatedSpanBindingPattern.ts]
function foo(a, b, {c}): void {}

function bar(a, b, [c]): void {}

foo("", 0);

bar("", 0);


//// [arityErrorRelatedSpanBindingPattern.js]
"use strict";
function foo(a, b, { c }) { }
function bar(a, b, [c]) { }
foo("", 0);
bar("", 0);
