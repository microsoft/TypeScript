//// [tests/cases/compiler/superCallFromClassThatDerivesFromGenericType2.ts] ////

//// [superCallFromClassThatDerivesFromGenericType2.ts]
declare class B<T> {
    m<U>(): B<U>;
}

class D extends B<any> {
    constructor() {
        super();
    }
}


//// [superCallFromClassThatDerivesFromGenericType2.js]
class D extends B {
    constructor() {
        super();
    }
}
