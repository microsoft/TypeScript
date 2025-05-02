//// [tests/cases/compiler/libMembers.ts] ////

//// [libMembers.ts]
var s="hello";
s.substring(0);
s.substring(3,4);
s.subby(12);   // error unresolved
String.fromCharCode(12);
module M {
    export class C {
    }
    var a=new C[];
    a.length;
    a.push(new C());
    (new C()).prototype;
}



//// [libMembers.js]
var s = "hello";
s.substring(0);
s.substring(3, 4);
s.subby(12); // error unresolved
String.fromCharCode(12);
var M;
(function (M) {
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    M.C = C;
    var a = new C[];
    a.length;
    a.push(new C());
    (new C()).prototype;
})(M || (M = {}));
