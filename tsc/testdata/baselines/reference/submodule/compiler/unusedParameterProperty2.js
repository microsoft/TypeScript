//// [tests/cases/compiler/unusedParameterProperty2.ts] ////

//// [unusedParameterProperty2.ts]
class A {
    constructor(private used) {
        let foge = used;
    }
}


//// [unusedParameterProperty2.js]
class A {
    used;
    constructor(used) {
        this.used = used;
        let foge = used;
    }
}
