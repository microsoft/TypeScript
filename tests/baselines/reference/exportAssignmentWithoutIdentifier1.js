//// [exportAssignmentWithoutIdentifier1.ts]
function Greeter() {
    //...
}
Greeter.prototype.greet = function () {
    //...
}
export = new Greeter();


//// [exportAssignmentWithoutIdentifier1.js]
"use strict";
function Greeter() {
    //...
}
Greeter.prototype.greet = function () {
    //...
};
module.exports = new Greeter();
