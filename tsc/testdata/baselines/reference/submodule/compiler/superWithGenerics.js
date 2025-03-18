//// [tests/cases/compiler/superWithGenerics.ts] ////

//// [superWithGenerics.ts]
declare class B<T> {    
    m<U>(): B<U>;
    static g(): B<any>;
}

class D extends B<any> {
    constructor() {
        super(); 
    }
}


//// [superWithGenerics.js]
class D extends B {
    constructor() {
        super();
    }
}
