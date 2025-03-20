//// [tests/cases/compiler/emitSuperCallBeforeEmitParameterPropertyDeclaration1ES6.ts] ////

//// [emitSuperCallBeforeEmitParameterPropertyDeclaration1ES6.ts]
class A {
    blub = 6;
}


class B extends A {
    constructor(public x: number) {
        "use strict";
        'someStringForEgngInject';
        super()
    }
}


//// [emitSuperCallBeforeEmitParameterPropertyDeclaration1ES6.js]
class A {
    blub = 6;
}
class B extends A {
    x;
    constructor(x) {
        "use strict";
        'someStringForEgngInject';
        "use strict";
        'someStringForEgngInject';
        super();
        this.x = x;
    }
}
