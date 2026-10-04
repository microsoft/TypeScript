//// [tests/cases/compiler/cjsExportClassExpressionNameConflict.ts] ////

//// [index.js]
module.exports.A = class B {f1 = 1; self = new B();}
module.exports.B = class B {f1 = "ok"; self = new B();}


//// [index.js]
"use strict";
module.exports.A = class B {
    constructor() {
        this.f1 = 1;
        this.self = new B();
    }
};
module.exports.B = class B {
    constructor() {
        this.f1 = "ok";
        this.self = new B();
    }
};


//// [index.d.ts]
declare namespace _ns {
    export class B {
        f1: number;
        self: B;
    }
}
import _A = _ns.B;
export { _A as A };
declare namespace _ns_1 {
    export class B {
        f1: string;
        self: B;
    }
}
import _B = _ns_1.B;
export { _B as B };
