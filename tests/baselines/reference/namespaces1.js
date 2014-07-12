//// [namespaces1.ts]
module X {
    export module Y {
        export interface Z { }
    }
    export interface Y { }
}

var x: X.Y.Z;
var x2: X.Y;

//// [namespaces1.js]
var x;
var x2;
