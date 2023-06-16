//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/typeOfThisInStaticMembers13.ts] ////

//// [typeOfThisInStaticMembers13.ts]
class C {
    static readonly c: "foo" = "foo"
    static bar =  class Inner {
        static [this.c] = 123;
        [this.c] = 123;
    }
}


//// [typeOfThisInStaticMembers13.js]
class C {
    static c = "foo";
    static bar = class Inner {
        static [this.c] = 123;
        [this.c] = 123;
    };
}
