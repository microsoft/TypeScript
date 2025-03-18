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
    constructor(p) {
        this.p = p;
        console.log('hi');
        super();
    }
    field = 0;
}
class Test extends Base {
    p;
    prop;
    constructor(p) {
        this.p = p;
        1;
        super();
        this.prop = 1;
    }
}
