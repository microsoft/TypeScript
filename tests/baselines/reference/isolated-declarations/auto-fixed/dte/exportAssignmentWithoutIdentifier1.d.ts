//// [tests/cases/compiler/exportAssignmentWithoutIdentifier1.ts] ////

//// [exportAssignmentWithoutIdentifier1.ts]
function Greeter() {
    //...
}
Greeter.prototype.greet = function () {
    //...
}
export = new Greeter();


/// [Declarations] ////



//// [exportAssignmentWithoutIdentifier1.d.ts]
declare const _default: invalid;
export = _default;

/// [Errors] ////

exportAssignmentWithoutIdentifier1.ts(7,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== exportAssignmentWithoutIdentifier1.ts (1 errors) ====
    function Greeter() {
        //...
    }
    Greeter.prototype.greet = function () {
        //...
    }
    export = new Greeter();
             ~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    