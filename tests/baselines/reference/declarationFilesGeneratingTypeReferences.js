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
/// <reference types="jquery" />
declare namespace Test {
    var x: JQuery;
}


//// [DtsFileErrors]


out.d.ts(1,23): error TS2688: Cannot find type definition file for 'jquery'.


==== /a/node_modules/@types/jquery/index.d.ts (0 errors) ====
    interface JQuery {
    
    }
    
==== out.d.ts (1 errors) ====
    /// <reference types="jquery" />
                          ~~~~~~
!!! error TS2688: Cannot find type definition file for 'jquery'.
    declare namespace Test {
        var x: JQuery;
    }
    