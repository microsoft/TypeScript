//// [createArray.ts]
var na=new number[];

class C {
}

new C[];
var ba=new boolean[];
var sa=new string[];
function f(s:string):number { return 0;
}
if (ba[14]) {
    na[2]=f(sa[3]);
}

new C[1]; // not an error

//// [createArray.js]
var na = new number[];
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
new C[];
var ba = new boolean[];
var sa = new string[];
function f(s) {
    return 0;
}
if (ba[14]) {
    na[2] = f(sa[3]);
}
new C[1]; // not an error
