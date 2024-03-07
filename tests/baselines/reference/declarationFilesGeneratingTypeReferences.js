//// [tests/cases/compiler/declarationFilesGeneratingTypeReferences.ts] ////

//// [index.d.ts]
interface JQuery {

}

//// [app.ts]
/// <reference types="jquery"/>
namespace Test {
    export var x: JQuery;
}


//// [out.js]
/// <reference types="jquery"/>
var Test;
(function (Test) {
})(Test || (Test = {}));


//// [out.d.ts]
declare namespace Test {
    var x: JQuery;
}
