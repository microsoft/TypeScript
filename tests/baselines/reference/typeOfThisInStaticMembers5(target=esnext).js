//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/typeOfThisInStaticMembers5.ts] ////

//// [typeOfThisInStaticMembers5.ts]
class C {
    static create = () => new this("yep")

    constructor (private foo: string) {

    }
}


//// [typeOfThisInStaticMembers5.js]
class C {
    foo;
    static create = () => new this("yep");
    constructor(foo) {
        this.foo = foo;
    }
}
