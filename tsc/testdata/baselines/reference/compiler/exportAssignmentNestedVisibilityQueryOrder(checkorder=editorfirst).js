//// [tests/cases/compiler/exportAssignmentNestedVisibilityQueryOrder.ts] ////

//// [exportAssignmentNestedVisibilityQueryOrder.ts]
namespace m {
    export interface Inner {
        x: number;
    }
    export interface Outer {
        use: (inner: Inner) => Outer;
    }
}
declare var m: {
    (): m.Outer;
};
export = m;


//// [exportAssignmentNestedVisibilityQueryOrder.js]
"use strict";
module.exports = m;


//// [exportAssignmentNestedVisibilityQueryOrder.d.ts]
declare namespace m {
    interface Inner {
        x: number;
    }
    interface Outer {
        use: (inner: Inner) => Outer;
    }
}
declare var m: {
    (): m.Outer;
};
export = m;
