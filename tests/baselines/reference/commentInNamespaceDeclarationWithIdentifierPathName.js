//// [commentInNamespaceDeclarationWithIdentifierPathName.ts]
namespace hello.hi.world
{
    function foo() {}

    // TODO, blah
}

//// [commentInNamespaceDeclarationWithIdentifierPathName.js]
var hello = hello || (hello = {});
(function (hello) {
    var hi = hello.hi || (hello.hi = {});
    (function (hi) {
        var world = hi.world || (hi.world = {});
        (function (world) {
            function foo() { }
            // TODO, blah
        })(world);
    })(hi);
})(hello);
