//// [tests/cases/conformance/classes/constructorDeclarations/superCalls/emitStatementsBeforeSuperCall.ts] ////

//// [emitStatementsBeforeSuperCall.ts]
class Base {
}
class Sub extends Base {
    // @ts-ignore
    constructor(public p: number) {
        console.log('hi'); // should emit before super
        super();
    }
    field = 0;
}

class Test extends Base {
    prop: number;
    // @ts-ignore
    constructor(public p: number) {
        1; // should emit before super
        super();
        this.prop = 1;
    }
}


//// [emitStatementsBeforeSuperCall.js]
class Base {
}
class Sub extends Base {
    // @ts-ignore
    constructor(p) {
        console.log('hi'); // should emit before super
        super();
        this.p = p;
        this.field = 0;
    }
}
class Test extends Base {
    // @ts-ignore
    constructor(p) {
        1; // should emit before super
        super();
        this.p = p;
        this.prop = 1;
    }
}
