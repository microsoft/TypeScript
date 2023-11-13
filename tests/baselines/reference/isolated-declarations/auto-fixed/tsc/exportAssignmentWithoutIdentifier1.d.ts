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
declare const _default: any;
export = _default;
