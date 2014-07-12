//// [switchCasesExpressionTypeMismatch.js]
var Foo = (function () {
    function Foo() {
    }
    return Foo;
})();

switch (0) {
    case Foo:
        break;
    case "sss":
        break;
    case 123:
        break;
    case true:
        break;
}

var s = 0;

switch (s) {
    case Foo:
        break;
    case "sss":
        break;
    case 123:
        break;
    case true:
        break;
}
