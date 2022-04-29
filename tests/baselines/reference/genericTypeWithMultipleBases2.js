//// [genericTypeWithMultipleBases2.ts]
export interface I1 {
    m1: () => void;
}
 
export interface I2 {
    m2: () => void;
}
 
export interface I3<T> extends I2, I1 {
    p1: T;
}
 
var x: I3<number>;
x.p1;
x.m1();
x.m2();



//// [genericTypeWithMultipleBases2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var x;
    x.p1;
    x.m1();
    x.m2();
});
