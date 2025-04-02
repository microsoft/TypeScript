//// [tests/cases/conformance/classes/members/privateNames/privateNameLateSuperUseDefineForClassFields.ts] ////

//// [privateNameLateSuperUseDefineForClassFields.ts]
class B {}
class A extends B {
    #x;
    constructor() {
        void 0;
        super();
    }
}


//// [privateNameLateSuperUseDefineForClassFields.js]
class B {
}
class A extends B {
    #x;
    constructor() {
        void 0;
        super();
    }
}
