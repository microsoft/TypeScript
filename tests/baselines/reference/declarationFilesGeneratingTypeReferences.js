//// [tests/cases/compiler/declarationFilesGeneratingTypeReferences.ts] ////

//// [index.d.ts]
interface JQuery {

}

//// [app.ts]
/// <reference types="jquery" preserve="true" />
namespace Test {
    export var x: JQuery;
}


//// [out.js]
/// <reference types="jquery" preserve="true" />
var Test;
(function (Test) {
})(Test || (Test = {}));


//// [out.d.ts]
/// <reference types="jquery" preserve="true" />
declare namespace Test {
    var x: JQuery;
}
