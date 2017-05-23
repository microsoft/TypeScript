//// [tests/cases/compiler/declFileWithErrorsInInputDeclarationFileWithOut.ts] ////

//// [declFile.d.ts]
declare module M {
    declare var x;
    declare function f();

    declare module N { }

    declare class C { }
}

//// [client.ts]
///<reference path="declFile.d.ts"/>
var x = new M.C(); // Declaration file wont get emitted because there are errors in declaration file


//// [out.js]
///<reference path="declFile.d.ts"/>
var x = new M.C(); // Declaration file wont get emitted because there are errors in declaration file


//// [out.d.ts]
/// <reference path="tests/cases/compiler/declFile.d.ts" />
declare var x: M.C;
