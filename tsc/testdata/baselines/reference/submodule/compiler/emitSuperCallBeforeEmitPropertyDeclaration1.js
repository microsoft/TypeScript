//// [tests/cases/compiler/emitSuperCallBeforeEmitPropertyDeclaration1.ts] ////

//// [emitSuperCallBeforeEmitPropertyDeclaration1.ts]
class A {
    blub = 6;
}


class B extends A {

    blub = 12;

    constructor() {
        "use strict";
        'someStringForEgngInject';
        super()
    }
}

//// [emitSuperCallBeforeEmitPropertyDeclaration1.js]
class A {
    blub = 6;
}
class B extends A {
    blub = 12;
    constructor() {
        "use strict";
        'someStringForEgngInject';
        "use strict";
        'someStringForEgngInject';
        super();
    }
}
