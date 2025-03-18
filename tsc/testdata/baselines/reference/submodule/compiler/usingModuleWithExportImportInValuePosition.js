//// [tests/cases/compiler/usingModuleWithExportImportInValuePosition.ts] ////

//// [usingModuleWithExportImportInValuePosition.ts]
module A {
export var x = 'hello world'
export class Point {
        constructor(public x: number, public y: number) { }
    }
    export module B {
        export interface Id {
            name: string;
        }
    }
}
module C {
    export import a = A;
}

var a: string = C.a.x;
var b: { x: number; y: number; } = new C.a.Point(0, 0);
var c: { name: string };
var c: C.a.B.Id;

//// [usingModuleWithExportImportInValuePosition.js]
var A;
(function (A) {
    A.x = 'hello world';
    class Point {
        x;
        y;
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    A.Point = Point;
})(A || (A = {}));
var C;
(function (C) {
    C.a = A;
})(C || (C = {}));
var a = C.a.x;
var b = new C.a.Point(0, 0);
var c;
var c;
