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
    constructor(...args_1) {
        super(...args_1);
        this.b = 2;
    }
} {
    constructor(...args_2) {
        super(...args_2);
        this.c = 3;
    }
};
let c = new C();
c.a;
c.b;
c.c;
