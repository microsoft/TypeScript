//// [tests/cases/compiler/moduleAndInterfaceSharingName.ts] ////

//// [moduleAndInterfaceSharingName.ts]
namespace X {
    export namespace Y {
        export interface Z { }
    }
    export interface Y { }
}
var z: X.Y.Z = null;
var z2: X.Y;

//// [moduleAndInterfaceSharingName.js]
"use strict";
var z = null;
var z2;
