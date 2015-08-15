//// [classExpressionES63.ts]
let C = class extends class extends class { a = 1 } { b = 2 } { c = 3 };
let c = new C();
c.a;
c.b;
c.c;


//// [classExpressionES63.js]
let C = class class_1 extends class class_2 extends class class_3 {
    constructor() {
        this.a = 1;
    }
}
 {
    constructor(...args) {
        super(...args);
        this.b = 2;
    }
}
 {
    constructor(...args) {
        super(...args);
        this.c = 3;
    }
}
;
let c = new C();
c.a;
c.b;
c.c;
