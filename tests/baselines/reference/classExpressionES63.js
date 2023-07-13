//// [tests/cases/conformance/es6/classExpressions/classExpressionES63.ts] ////

//// [classExpressionES63.ts]
let C = class extends class extends class { a = 1 } { b = 2 } { c = 3 };
let c = new C();
c.a;
c.b;
c.c;


//// [classExpressionES63.js]
let C = class extends class extends class {
    constructor() {
        this.a = 1;
    }
} {
    constructor() {
        super(...arguments);
        this.b = 2;
    }
} {
    constructor() {
        super(...arguments);
        this.c = 3;
    }
};
let c = new C();
c.a;
c.b;
c.c;
