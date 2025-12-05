//// [tests/cases/compiler/namespaces1.ts] ////

//// [namespaces1.ts]
namespace X {
    export namespace Y {
        export interface Z { }
    }
    export interface Y { }
}

var x: X.Y.Z;
var x2: X.Y;

//// [namespaces1.js]
var x;
var x2;
