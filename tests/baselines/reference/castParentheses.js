//// [tests/cases/compiler/castParentheses.ts] ////

//// [castParentheses.ts]
class a {
    static b: any;
}

var b = (<any>a);
var b = (<any>a).b;
var b = (<any>a.b).c;
var b = (<any>a.b()).c;
var b = (<any>new a);
var b = (<any>new a.b);
var b = (<any>new a).b 

//// [castParentheses.js]
var a = /** @class */ (function () {
    function a() {
    }
    return a;
}());
var b = a;
var b = a.b;
var b = a.b.c;
var b = a.b().c;
var b = new a;
var b = new a.b;
var b = (new a).b;
