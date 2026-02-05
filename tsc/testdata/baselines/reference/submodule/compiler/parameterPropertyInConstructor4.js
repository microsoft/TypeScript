//// [tests/cases/compiler/parameterPropertyInConstructor4.ts] ////

//// [parameterPropertyInConstructor4.ts]
export class C {
    constructor(public a: number[] = [], b: number) {
    }
}


//// [parameterPropertyInConstructor4.js]
export class C {
    a;
    constructor(a = [], b) {
        this.a = a;
    }
}


//// [parameterPropertyInConstructor4.d.ts]
export declare class C {
    a: number[];
    constructor(a: number[] | undefined, b: number);
}
