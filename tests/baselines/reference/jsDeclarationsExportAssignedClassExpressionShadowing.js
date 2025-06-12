//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportAssignedClassExpressionShadowing.ts] ////

//// [index.js]
class A {
    member = new Q();
}
class Q {
    x = 42;
}
module.exports = class Q {
    constructor() {
        this.x = new A();
    }
}
module.exports.Another = Q;


//// [index.js]
class A {
    constructor() {
        this.member = new Q();
    }
}
class Q {
    constructor() {
        this.x = 42;
    }
}
module.exports = class Q {
    constructor() {
        this.x = new A();
    }
};
module.exports.Another = Q;


//// [index.d.ts]
export = Q;
declare class Q {
    x: A;
}
declare namespace Q {
    export { Q_1 as Another };
}
declare class A {
    member: Q;
}
declare class Q_1 {
    x: number;
}
