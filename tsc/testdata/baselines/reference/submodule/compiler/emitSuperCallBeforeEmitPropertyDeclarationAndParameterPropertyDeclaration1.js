//// [tests/cases/compiler/emitSuperCallBeforeEmitPropertyDeclarationAndParameterPropertyDeclaration1.ts] ////

//// [emitSuperCallBeforeEmitPropertyDeclarationAndParameterPropertyDeclaration1.ts]
class A {
    blub = 6;
}


class B extends A {
    blah = 2;
    constructor(public x: number) {
        "use strict";
        'someStringForEgngInject';
        super()
    }
}

//// [emitSuperCallBeforeEmitPropertyDeclarationAndParameterPropertyDeclaration1.js]
class A {
    blub = 6;
}
class B extends A {
    x;
    blah = 2;
    constructor(x) {
        "use strict";
        'someStringForEgngInject';
        "use strict";
        'someStringForEgngInject';
        this.x = x;
        super();
    }
}
