//// [tests/cases/compiler/javascriptThisAssignmentInStaticBlock.ts] ////

//// [a.js]
class Thing {
    static {
        this.doSomething = () => {};
    }
}

Thing.doSomething();

// GH#46468
class ElementsArray extends Array {
    static {
        const superisArray = super.isArray;
        const customIsArray = (arg)=> superisArray(arg);
        this.isArray = customIsArray;
    }
}

ElementsArray.isArray(new ElementsArray());

//// [a.js]
var _a, _b;
class Thing {
}
_a = Thing;
(() => {
    _a.doSomething = () => { };
})();
Thing.doSomething();
// GH#46468
class ElementsArray extends Array {
}
_b = ElementsArray;
(() => {
    const superisArray = super.isArray;
    const customIsArray = (arg) => superisArray(arg);
    _b.isArray = customIsArray;
})();
ElementsArray.isArray(new ElementsArray());


//// [a.d.ts]
declare class Thing {
}
declare class ElementsArray extends Array<any> {
    constructor(arrayLength?: number);
    constructor(arrayLength: number);
    constructor(...items: any[]);
}
