//// [tests/cases/compiler/superCallFromClassThatDerivesFromGenericType1.ts] ////

//// [superCallFromClassThatDerivesFromGenericType1.ts]
declare class B<T> {
    m<U>(): B<U>;
    static g(): B<any>;
}

class D extends B<any> {
    constructor() {
        super();
    }
}


//// [superCallFromClassThatDerivesFromGenericType1.js]
class D extends B {
    constructor() {
        super();
    }
}
