//// [typeMatch1.ts]
interface I { z; }
interface I2 { z; }

var x1: { z: number; f(n: number): string; f(s: string): number; }
var x2: { z:number;f:{(n:number):string;(s:string):number;}; } = x1;
var i:I;
var i2:I2;
var x3:{ z; }= i;
var x4:{ z; }= i2;
var x5:I=i2;

class C { private x; }
class D { private x; }

var x6=new C();
var x7=new D();

x6 = x7;
x6=C;
C==D;
C==C;



//// [typeMatch1.js]
var x1;
var x2 = x1;
var i;
var i2;
var x3 = i;
var x4 = i2;
var x5 = i2;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
var x6 = new C();
var x7 = new D();
x6 = x7;
x6 = C;
C == D;
C == C;
