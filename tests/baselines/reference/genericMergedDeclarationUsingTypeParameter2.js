//// [genericMergedDeclarationUsingTypeParameter2.js]
var foo = (function () {
    function foo(x) {
    }
    return foo;
})();
var foo;
(function (foo) {
    foo.x;
    var y = 1;
})(foo || (foo = {}));
