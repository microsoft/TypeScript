//// [letShadowedByNameInNestedScope.ts]
var x;
function foo() {
    let x = 0;
    (function () {
        var _x = 1;
        console.log(x);
    })();
}

//// [letShadowedByNameInNestedScope.js]
var x;
function foo() {
    var x_1 = 0;
    (function () {
        var _x = 1;
        console.log(x_1);
    })();
}
