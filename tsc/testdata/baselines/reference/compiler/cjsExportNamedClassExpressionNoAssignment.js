//// [tests/cases/compiler/cjsExportNamedClassExpressionNoAssignment.ts] ////

//// [index.js]
// Named class expression exports without module.exports assignment.
// The class expression name B should be preserved via namespace isolation
// even without a module.exports = ... in the file.
module.exports.A = class B {f1 = 1; self = new B();}


//// [index.js]
"use strict";
// Named class expression exports without module.exports assignment.
// The class expression name B should be preserved via namespace isolation
// even without a module.exports = ... in the file.
module.exports.A = class B {
    constructor() {
        this.f1 = 1;
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
