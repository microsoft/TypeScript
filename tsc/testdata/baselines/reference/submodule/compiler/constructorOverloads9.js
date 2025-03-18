//// [tests/cases/compiler/constructorOverloads9.ts] ////

//// [constructorOverloads9.ts]
export class C {
    a;
    constructor();
    constructor(x = '') {
        this.a = x;
    }
}


//// [constructorOverloads9.js]
export class C {
    a;
    constructor(x = '') {
        this.a = x;
    }
}
