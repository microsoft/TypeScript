//// [tests/cases/compiler/bestCommonTypeWithOptionalProperties.ts] ////

//// [bestCommonTypeWithOptionalProperties.ts]
interface X { foo: string }
interface Y extends X { bar?: number }
interface Z extends X { bar: string }

var x: X;
var y: Y;
var z: Z;

// All these arrays should be X[]
var b1 = [x, y, z];
var b2 = [x, z, y];
var b3 = [y, x, z];
var b4 = [y, z, x];
var b5 = [z, x, y];
var b6 = [z, y, x];

//// [bestCommonTypeWithOptionalProperties.js]
var x;
var y;
var z;
// All these arrays should be X[]
var b1 = [x, y, z];
var b2 = [x, z, y];
var b3 = [y, x, z];
var b4 = [y, z, x];
var b5 = [z, x, y];
var b6 = [z, y, x];
