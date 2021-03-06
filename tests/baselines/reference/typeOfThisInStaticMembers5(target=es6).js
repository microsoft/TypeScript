//// [typeOfThisInStaticMembers5.ts]
class C {
    static create = () => new this("yep")

    constructor (private foo: string) {

    }
}


//// [typeOfThisInStaticMembers5.js]
class C {
    constructor(foo) {
        this.foo = foo;
    }
}
C.create = () => new C("yep");
