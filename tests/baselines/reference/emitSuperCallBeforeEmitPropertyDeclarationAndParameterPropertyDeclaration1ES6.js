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
    constructor() {
        this.blub = 6;
    }
}
class B extends A {
    constructor(x) {
        "use strict";
        'someStringForEgngInject';
        super();
        this.x = x;
        this.blah = 2;
    }
}
