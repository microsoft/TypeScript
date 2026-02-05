//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/typeOfThisInInstanceMember.ts] ////

//// [typeOfThisInInstanceMember.ts]
class C {
    x = this;
    foo() {
        return this;
    }
    constructor(x: number) {
        var t = this;
        t.x;
        t.y;
        t.z;
        var r = t.foo();
    }

    get y() {
        return this;
    }
}

declare var c: C;
// all ok
var r = c.x;
var ra = c.x.x.x;
var r2 = c.y;
var r3 = c.foo();
var rs = [r, r2, r3];

rs.forEach(x => {
    x.foo;
    x.x;
    x.y;
});

//// [typeOfThisInInstanceMember.js]
"use strict";
class C {
    x = this;
    foo() {
        return this;
    }
    constructor(x) {
        var t = this;
        t.x;
        t.y;
        t.z;
        var r = t.foo();
    }
    get y() {
        return this;
    }
}
// all ok
var r = c.x;
var ra = c.x.x.x;
var r2 = c.y;
var r3 = c.foo();
var rs = [r, r2, r3];
rs.forEach(x => {
    x.foo;
    x.x;
    x.y;
});
