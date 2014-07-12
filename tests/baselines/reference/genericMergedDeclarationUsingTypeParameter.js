//// [genericMergedDeclarationUsingTypeParameter.js]
function foo(y, z) {
    return y;
}
var foo;
(function (foo) {
    foo.x;
    var y = 1;
})(foo || (foo = {}));
