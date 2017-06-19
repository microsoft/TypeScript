//// [objectTypeHidingMembersOfObject.ts]
// all of these valueOf calls should return the type shown in the overriding signatures here

class C {
    valueOf() { }
}

var c: C;
var r1: void = c.valueOf();

interface I {
    valueOf(): void;
}

var i: I;
var r2: void = i.valueOf();

var a = {
    valueOf: () => { }
}

var r3: void = a.valueOf();

var b: {
    valueOf(): void;
}

var r4: void = b.valueOf();

//// [objectTypeHidingMembersOfObject.js]
// all of these valueOf calls should return the type shown in the overriding signatures here
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.valueOf = function () { };
    return C;
}());
var c;
var r1 = c.valueOf();
var i;
var r2 = i.valueOf();
var a = {
    valueOf: function () { }
};
var r3 = a.valueOf();
var b;
var r4 = b.valueOf();
