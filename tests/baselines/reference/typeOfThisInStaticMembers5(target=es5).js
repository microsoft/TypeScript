//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/typeOfThisInStaticMembers5.ts] ////

//// [typeOfThisInStaticMembers5.ts]
class C {
    static create = () => new this("yep")

    constructor (private foo: string) {

    }
}


//// [typeOfThisInStaticMembers5.js]
var _a;
class C {
    constructor(foo) {
        this.foo = foo;
    }
}
_a = C;
C.create = () => new _a("yep");
