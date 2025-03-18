//// [tests/cases/conformance/classes/members/privateNames/privateNameLateSuper.ts] ////

//// [privateNameLateSuper.ts]
class B {}
class A extends B {
    #x;
    constructor() {
        void 0;
        super();
    }
}


//// [privateNameLateSuper.js]
class B {
}
class A extends B {
    #x;
    constructor() {
        void 0;
        super();
    }
}
