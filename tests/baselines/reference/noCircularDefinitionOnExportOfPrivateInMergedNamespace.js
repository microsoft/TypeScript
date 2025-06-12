//// [tests/cases/compiler/noCircularDefinitionOnExportOfPrivateInMergedNamespace.ts] ////

//// [noCircularDefinitionOnExportOfPrivateInMergedNamespace.ts]
const cat = 12;
class Foo {}
export = Foo;
declare namespace Foo {
    export { cat };
}

//// [noCircularDefinitionOnExportOfPrivateInMergedNamespace.js]
"use strict";
const cat = 12;
class Foo {
}
module.exports = Foo;
