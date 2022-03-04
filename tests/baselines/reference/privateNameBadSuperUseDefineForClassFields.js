//// [privateNameBadSuperUseDefineForClassFields.ts]
class B {};
class A extends B {
    #x;
    constructor() {
        void 0;
        super();
    }
}


//// [privateNameBadSuperUseDefineForClassFields.js]
class B {
}
;
class A extends B {
    #x;
    constructor() {
        void 0;
        super();
    }
}
