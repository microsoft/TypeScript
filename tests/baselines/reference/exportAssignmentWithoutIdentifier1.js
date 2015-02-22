//// [exportAssignmentWithoutIdentifier1.ts]
function Greeter() {
    //...
}
Greeter.prototype.greet = function () {
    //...
}
export = new Greeter();


//// [exportAssignmentWithoutIdentifier1.js]
function Greeter() {
    //...
}
Greeter.prototype.greet = function () {
    //...
};
new Greeter();
