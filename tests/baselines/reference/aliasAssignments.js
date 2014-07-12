//// [aliasAssignments_moduleA.js]
var someClass = (function () {
    function someClass() {
    }
    return someClass;
})();
exports.someClass = someClass;
//// [aliasAssignments_1.js]
var moduleA = require("aliasAssignments_moduleA");
var x = moduleA;
x = 1; // Should be error
var y = 1;
y = moduleA; // should be error
