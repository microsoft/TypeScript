//// [privateNameBadSuperUseDefineForClassFields.ts]
class B {};
class A extends B {
    #x;
    constructor() {
        void 0; // Error: 'super' call must  come first
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
        void 0; // Error: 'super' call must  come first
        super();
    }
}
