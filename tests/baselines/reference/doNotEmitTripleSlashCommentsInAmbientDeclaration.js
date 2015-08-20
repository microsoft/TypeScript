//// [tests/cases/compiler/doNotEmitTripleSlashCommentsInAmbientDeclaration.ts] ////

//// [file0.ts]

/// <reference path="file1.ts" />
class C {
    /// <reference path="file1.ts" />
    public foo(x: string, y: any)
    public foo(x: string, y: number) { }
}

//// [file1.ts]
var x = 10;

/// <reference path="file0.ts" />
declare var OData: any;

//// [file1.js]
var x = 10;
