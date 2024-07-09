//// [tests/cases/compiler/objectMembersOnTypes.ts] ////

//// [objectMembersOnTypes.ts]
interface I {}
class AAA implements I { }
var x: number;
x.toString();
var i: I;
i.toString(); // used to be an error
var c: AAA;
c.toString(); // used to be an error


//// [objectMembersOnTypes.js]
var AAA = /** @class */ (function () {
    function AAA() {
    }
    return AAA;
}());
var x;
x.toString();
var i;
i.toString(); // used to be an error
var c;
c.toString(); // used to be an error
