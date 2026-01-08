//// [tests/cases/compiler/declFileWithErrorsInInputDeclarationFile.ts] ////

//// [declFile.d.ts]
declare namespace M {
    declare var x;
    declare function f();

    declare namespace N { }

    declare class C { }
}

//// [client.ts]
///<reference path="declFile.d.ts" preserve="true"/>
var x = new M.C(); // Declaration file wont get emitted because there are errors in declaration file


//// [client.js]
///<reference path="declFile.d.ts" preserve="true"/>
var x = new M.C(); // Declaration file wont get emitted because there are errors in declaration file


//// [client.d.ts]
/// <reference path="declFile.d.ts" preserve="true" />
declare var x: M.C;
