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
}
declare var m: {
    (): m.Outer;
};
export = m;


//// [DtsFileErrors]


exportAssignmentNestedVisibilityQueryOrder.d.ts(4,11): error TS2694: Namespace 'm' has no exported member 'Outer'.


==== exportAssignmentNestedVisibilityQueryOrder.d.ts (1 errors) ====
    declare namespace m {
    }
    declare var m: {
        (): m.Outer;
              ~~~~~
!!! error TS2694: Namespace 'm' has no exported member 'Outer'.
    };
    export = m;
    

!!!! File exportAssignmentNestedVisibilityQueryOrder.d.ts differs from original emit in noCheck emit
//// [exportAssignmentNestedVisibilityQueryOrder.d.ts]
--- Expected	The full check baseline
+++ Actual	with noCheck set
@@ -1,4 +1,10 @@
 declare namespace m {
+    interface Inner {
+        x: number;
+    }
+    interface Outer {
+        use: (inner: Inner) => Outer;
+    }
 }
 declare var m: {
     (): m.Outer;