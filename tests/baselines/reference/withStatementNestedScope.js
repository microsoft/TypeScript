//// [tests/cases/compiler/withStatementNestedScope.ts] ////

//// [withStatementNestedScope.ts]
var x = 1;
with (x) {
    function f(a: number) {
        return 1;
    }
    // should be any
    var r = f(1);
}

//// [withStatementNestedScope.js]
var x = 1;
with (x) {
    function f(a) {
        return 1;
    }
    // should be any
    var r = f(1);
}
