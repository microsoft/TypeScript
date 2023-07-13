//// [tests/cases/compiler/arityErrorRelatedSpanBindingPattern.ts] ////

//// [arityErrorRelatedSpanBindingPattern.ts]
function foo(a, b, {c}): void {}

function bar(a, b, [c]): void {}

foo("", 0);

bar("", 0);


//// [arityErrorRelatedSpanBindingPattern.js]
function foo(a, b, _a) {
    var c = _a.c;
}
function bar(a, b, _a) {
    var c = _a[0];
}
foo("", 0);
bar("", 0);
