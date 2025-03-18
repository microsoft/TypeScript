//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/typeOfThisInStaticMembers.ts] ////

//// [typeOfThisInStaticMembers.ts]
class C {
    constructor(x: number) { }
    static foo: number;
    static bar() {
        // type of this is the constructor function type
        var t = this;
        return this;
    }
}

var t = C.bar();
// all ok
var r2 = t.foo + 1;
var r3 = t.bar();
var r4 = new t(1);

class C2<T> {
    static test: number;
    constructor(x: string) { }
    static foo: string;
    static bar() {
        // type of this is the constructor function type
        var t = this;
        return this;
    }
}

var t2 = C2.bar();
// all ok
var r5 = t2.foo + 1;
var r6 = t2.bar();
var r7 = new t2('');



//// [typeOfThisInStaticMembers.js]
class C {
    constructor(x) { }
    static foo;
    static bar() {
        var t = this;
        return this;
    }
}
var t = C.bar();
var r2 = t.foo + 1;
var r3 = t.bar();
var r4 = new t(1);
class C2 {
    static test;
    constructor(x) { }
    static foo;
    static bar() {
        var t = this;
        return this;
    }
}
var t2 = C2.bar();
var r5 = t2.foo + 1;
var r6 = t2.bar();
var r7 = new t2('');
