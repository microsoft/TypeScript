//// [tests/cases/compiler/moduleAndInterfaceSharingName2.ts] ////

//// [moduleAndInterfaceSharingName2.ts]
namespace X {
    export namespace Y {
        export interface Z { }
    }
    export interface Y { }
}
var z: X.Y.Z = null;
var z2: X.Y<string>;

//// [moduleAndInterfaceSharingName2.js]
var z = null;
var z2;
