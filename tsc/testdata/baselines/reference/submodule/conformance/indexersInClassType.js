//// [tests/cases/conformance/classes/members/classTypes/indexersInClassType.ts] ////

//// [indexersInClassType.ts]
class C {
    [x: number]: Date;
    [x: string]: Object;
    1: Date;
    'a': {}

    fn() {
        return this;
    }
}

var c = new C();
var r = c.fn();
var r2 = r[1];
var r3 = r.a



//// [indexersInClassType.js]
class C {
    1;
    'a';
    fn() {
        return this;
    }
}
var c = new C();
var r = c.fn();
var r2 = r[1];
var r3 = r.a;
