//// [tests/cases/compiler/defaultValueInConstructorOverload1.ts] ////

//// [defaultValueInConstructorOverload1.ts]
class C {
    constructor(x = '');
    constructor(x = '') {
    }
}

//// [defaultValueInConstructorOverload1.js]
class C {
    constructor(x = '') {
    }
}
