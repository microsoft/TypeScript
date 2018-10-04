//// [classAppearsToHaveMembersOfObject.ts]
class C { foo: string; }

var c: C;
var r = c.toString();
var r2 = c.hasOwnProperty('');
var o: Object = c;
var o2: {} = c;


//// [classAppearsToHaveMembersOfObject.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var c;
var r = c.toString();
var r2 = c.hasOwnProperty('');
var o = c;
var o2 = c;
