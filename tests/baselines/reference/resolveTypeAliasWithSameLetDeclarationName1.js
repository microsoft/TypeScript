//// [resolveTypeAliasWithSameLetDeclarationName1.ts]
class C { }
type baz = C;
let baz: baz;


//// [resolveTypeAliasWithSameLetDeclarationName1.js]
var C = (function () {
    function C() {
    }
    return C;
}());
var baz;
