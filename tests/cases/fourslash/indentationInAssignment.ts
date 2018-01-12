/// <reference path="fourslash.ts"/>

//// var v0 = /*4_0*/
////     1;
//// 
//// let v1 = 1 /*4_1*/
////     + 10;
//// 
//// let v2 = 1 + /*4_2*/
////     1;
//// 
//// let v3 = 1 + (function /*0_0*/(x: number, y: number) { return x || y; })(0, 1);
//// 
//// let v4 = 1 + (function (x: number, /*4_3*/y: number) { return x || y; })(0, 1);
//// 
//// let v5 = 1 + (function (x: number, y: number) { /*4_4*/return x || y; })(0, 1);
//// 
//// let v6 = 1 + (function (x: number, y: number) { return x || y;/*0_1*/})(0, 1);
//// 
//// let v7 = 1 + (function (x: number, y: number) {
////     return x || y;/*4_5*/
//// })(0, 1);
//// 
//// let v8 = 1 + (function (x: number, y: number) { return x || y; })(0, /*4_6*/1);


for (let i = 0; i < 2; ++i) {
    goTo.marker(`0_${i}`);
    edit.insertLine("");
    verify.indentationIs(0);
}

for (let i = 0; i < 7; ++i) {
    goTo.marker(`4_${i}`);
    edit.insertLine("");
    verify.indentationIs(4);
}