//// [tests/cases/compiler/emitSuperCallBeforeEmitPropertyDeclarationAndParameterPropertyDeclaration1ES6.ts] ////

//// [emitSuperCallBeforeEmitPropertyDeclarationAndParameterPropertyDeclaration1ES6.ts]
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

//// [emitSuperCallBeforeEmitPropertyDeclarationAndParameterPropertyDeclaration1ES6.js]
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
