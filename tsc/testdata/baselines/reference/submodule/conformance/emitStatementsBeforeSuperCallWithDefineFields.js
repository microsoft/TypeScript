//// [tests/cases/conformance/classes/constructorDeclarations/superCalls/emitStatementsBeforeSuperCallWithDefineFields.ts] ////

//// [emitStatementsBeforeSuperCallWithDefineFields.ts]
class Base {
}
class Sub extends Base {
    // @ts-ignore
    constructor(public p: number) {
        console.log('hi');
        super();
    }
    field = 0;
}

class Test extends Base {
    prop: number;
    // @ts-ignore
    constructor(public p: number) {
        1;
        super();
        this.prop = 1;
    }
}


//// [emitStatementsBeforeSuperCallWithDefineFields.js]
class Base {
}
class Sub extends Base {
    p;
    // @ts-ignore
    constructor(p) {
        console.log('hi');
        super();
        this.p = p;
    }
    field = 0;
}
class Test extends Base {
    p;
    prop;
    // @ts-ignore
    constructor(p) {
        1;
        super();
        this.p = p;
        this.prop = 1;
    }
}
