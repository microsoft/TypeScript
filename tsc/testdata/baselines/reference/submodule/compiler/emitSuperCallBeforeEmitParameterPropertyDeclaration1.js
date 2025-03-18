//// [tests/cases/compiler/emitSuperCallBeforeEmitParameterPropertyDeclaration1.ts] ////

//// [emitSuperCallBeforeEmitParameterPropertyDeclaration1.ts]
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


//// [emitSuperCallBeforeEmitParameterPropertyDeclaration1.js]
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
        this.x = x;
        super();
    }
}
