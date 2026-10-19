//// [tests/cases/compiler/largeDiscriminantUnionArrayPredicate.ts] ////

//// [largeDiscriminantUnionArrayPredicate.ts]
type TreeNode =
    | { kind: 0 }
    | { kind: 1 }
    | { kind: 2 }
    | { kind: 3 }
    | { kind: 4 }
    | { kind: 5 }
    | { kind: 6 }
    | { kind: 7 }
    | { kind: 8 }
    | { kind: 9 };

declare const ancestor: TreeNode | TreeNode[];

if (!Array.isArray(ancestor)) {
    ancestor.kind;
}


//// [largeDiscriminantUnionArrayPredicate.js]
"use strict";
if (!Array.isArray(ancestor)) {
    ancestor.kind;
}
