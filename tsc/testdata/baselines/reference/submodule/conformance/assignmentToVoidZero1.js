//// [tests/cases/conformance/salsa/assignmentToVoidZero1.ts] ////

//// [assignmentToVoidZero1.js]
// #38552
exports.y = exports.x = void 0;
exports.x = 1;
exports.y = 2;


//// [assignmentToVoidZero1.js]
// #38552
exports.y = exports.x = void 0;
exports.x = 1;
exports.y = 2;


//// [assignmentToVoidZero1.d.ts]
export declare var y: 2;
export declare var x: 1;
export declare var x: 1;
export declare var y: 2;


//// [DtsFileErrors]


auss/assignmentToVoidZero1.d.ts(1,20): error TS2323: Cannot redeclare exported variable 'y'.
auss/assignmentToVoidZero1.d.ts(2,20): error TS2323: Cannot redeclare exported variable 'x'.
auss/assignmentToVoidZero1.d.ts(3,20): error TS2323: Cannot redeclare exported variable 'x'.
auss/assignmentToVoidZero1.d.ts(4,20): error TS2323: Cannot redeclare exported variable 'y'.


==== auss/assignmentToVoidZero1.d.ts (4 errors) ====
    export declare var y: 2;
                       ~
!!! error TS2323: Cannot redeclare exported variable 'y'.
    export declare var x: 1;
                       ~
!!! error TS2323: Cannot redeclare exported variable 'x'.
    export declare var x: 1;
                       ~
!!! error TS2323: Cannot redeclare exported variable 'x'.
    export declare var y: 2;
                       ~
!!! error TS2323: Cannot redeclare exported variable 'y'.
    