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
    // @ts-ignore
    constructor(p) {
        console.log('hi');
        super();
        Object.defineProperty(this, "p", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: p
        });
        Object.defineProperty(this, "field", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
    }
}
class Test extends Base {
    // @ts-ignore
    constructor(p) {
        1;
        super();
        Object.defineProperty(this, "p", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: p
        });
        Object.defineProperty(this, "prop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.prop = 1;
    }
}
