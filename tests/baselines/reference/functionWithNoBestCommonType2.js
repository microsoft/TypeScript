//// [tests/cases/compiler/functionWithNoBestCommonType2.ts] ////

//// [functionWithNoBestCommonType2.ts]
var v = function () {
   return true;
   return bar();
};

function bar(): void {
}

//// [functionWithNoBestCommonType2.js]
var v = function () {
    return true;
    return bar();
};
function bar() {
}
