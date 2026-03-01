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
"use strict";
var _a, _b, _c;
class Thing {
}
_a = Thing;
(() => {
    _a.doSomething = () => { };
})();
Thing.doSomething();
// GH#46468
class ElementsArray extends (_c = Array) {
}
_b = ElementsArray;
(() => {
    const superisArray = Reflect.get(_c, "isArray", _b);
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
