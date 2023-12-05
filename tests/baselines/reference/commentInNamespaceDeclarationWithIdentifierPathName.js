//// [tests/cases/compiler/commentInNamespaceDeclarationWithIdentifierPathName.ts] ////

//// [commentInNamespaceDeclarationWithIdentifierPathName.ts]
namespace hello.hi.world
{
    function foo() {}

    // TODO, blah
}

//// [commentInNamespaceDeclarationWithIdentifierPathName.js]
var hello;
(function (hello) {
    var hi;
    (function (hi) {
        var world;
        (function (world) {
            function foo() { }
            // TODO, blah
        })(world = hi.world || (hi.world = {}));
    })(hi = hello.hi || (hello.hi = {}));
})(hello || (hello = {}));
