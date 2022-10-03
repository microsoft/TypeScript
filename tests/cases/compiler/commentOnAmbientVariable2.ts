// @Filename: commentOnAmbientVariable2_1.ts
var y = 1;

// @Filename: commentOnAmbientVariable2_2.ts
/// <reference path='commentOnAmbientVariable2_1.ts'/>
declare var x: number;
x = 2;