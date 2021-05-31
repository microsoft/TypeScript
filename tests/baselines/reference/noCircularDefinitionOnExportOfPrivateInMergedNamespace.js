//// [noCircularDefinitionOnExportOfPrivateInMergedNamespace.ts]
const cat = 12;
class Foo {}
export = Foo;
declare namespace Foo {
    export { cat };
}

//// [noCircularDefinitionOnExportOfPrivateInMergedNamespace.js]
"use strict";
var cat = 12;
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
module.exports = Foo;
