//// [tests/cases/compiler/emitSuperCallBeforeEmitPropertyDeclaration1ES6.ts] ////

//// [emitSuperCallBeforeEmitPropertyDeclaration1ES6.ts]
class A {
    blub = 6;
}


class B extends A {

    blub = 12;

    constructor() {
        'someStringForEgngInject';
        super()
    }
}

//// [emitSuperCallBeforeEmitPropertyDeclaration1ES6.js]
class A {
    blub = 6;
}
class B extends A {
    blub = 12;
    constructor() {
        'someStringForEgngInject';
        'someStringForEgngInject';
        super();
    }
}
