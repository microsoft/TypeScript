//// [tests/cases/compiler/moduleAndInterfaceSharingName3.ts] ////

//// [moduleAndInterfaceSharingName3.ts]
module X {
    export module Y {
        export interface Z { }
    }
    export interface Y<T> { }
}
var z: X.Y.Z = null;
var z2: X.Y<string>;

//// [moduleAndInterfaceSharingName3.js]
var z = null;
var z2;
