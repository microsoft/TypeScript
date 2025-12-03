//// [tests/cases/compiler/constructorWithEscapeSequence.ts] ////

//// [constructorWithEscapeSequence.ts]
export class C {
  \u{63}onstructor() {}
}


//// [constructorWithEscapeSequence.js]
export class C {
    constructor() { }
}


//// [constructorWithEscapeSequence.d.ts]
export declare class C {
    constructor();
}
