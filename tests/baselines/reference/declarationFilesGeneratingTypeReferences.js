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


//// [DtsFileErrors]


out.d.ts(1,23): error TS2688: Cannot find type definition file for 'jquery'.


==== /a/node_modules/@types/jquery/index.d.ts (0 errors) ====
    interface JQuery {
    
    }
    
==== out.d.ts (1 errors) ====
    /// <reference types="jquery" preserve="true" />
                          ~~~~~~
!!! error TS2688: Cannot find type definition file for 'jquery'.
    declare namespace Test {
        var x: JQuery;
    }
    