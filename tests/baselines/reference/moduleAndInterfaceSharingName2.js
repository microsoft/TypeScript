//// [moduleAndInterfaceSharingName2.ts]
module X {
    export module Y {
        export interface Z { }
    }
    export interface Y { }
}
var z: X.Y.Z = null;
var z2: X.Y<string>;

//// [moduleAndInterfaceSharingName2.js]
var z = null;
var z2;
