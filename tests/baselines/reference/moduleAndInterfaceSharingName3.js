//// [tests/cases/compiler/moduleAndInterfaceSharingName3.ts] ////

//// [moduleAndInterfaceSharingName3.ts]
namespace X {
    export namespace Y {
        export interface Z { }
    }
    export interface Y<T> { }
}
var z: X.Y.Z = null;
var z2: X.Y<string>;

//// [moduleAndInterfaceSharingName3.js]
var z = null;
var z2;
