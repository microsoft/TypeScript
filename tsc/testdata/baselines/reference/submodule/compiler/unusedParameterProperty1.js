//// [tests/cases/compiler/unusedParameterProperty1.ts] ////

//// [unusedParameterProperty1.ts]
class A {
    constructor(private used: string) {
        let foge = used;
    }
}


//// [unusedParameterProperty1.js]
class A {
    used;
    constructor(used) {
        this.used = used;
        let foge = used;
    }
}
