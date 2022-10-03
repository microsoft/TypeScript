//// [tests/cases/compiler/commentOnAmbientVariable2.ts] ////

//// [commentOnAmbientVariable2_1.ts]
var y = 1;

//// [commentOnAmbientVariable2_2.ts]
/// <reference path='commentOnAmbientVariable2_1.ts'/>
declare var x: number;
x = 2;

//// [commentOnAmbientVariable2_1.js]
var y = 1;
//// [commentOnAmbientVariable2_2.js]
/// <reference path='commentOnAmbientVariable2_1.ts'/>
x = 2;
