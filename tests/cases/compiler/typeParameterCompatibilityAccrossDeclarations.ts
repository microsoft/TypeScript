//@module: amd
var a = {
   x: function <T>(y: T): T { return null; }
}
var a2 = {
   x: function (y: any): any { return null; }
}
export interface I {
   x<T>(y: T): T;
}
export interface I2 {
   x(y: any): any;
}
 
var i: I;
var i2: I2;
 
a = i; // error
i = a; // error
 
a2 = i2; // no error
i2 = a2; // no error
