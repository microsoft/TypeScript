//// [tests/cases/compiler/aliasAssignments.ts] ////

//// [aliasAssignments_moduleA.ts]
export class someClass {
    public someData: string;
}

//// [aliasAssignments_1.ts]
import moduleA = require("./aliasAssignments_moduleA");
var x = moduleA;
x = 1; // Should be error
var y = 1;
y = moduleA; // should be error


//// [aliasAssignments_moduleA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someClass = void 0;
class someClass {
}
exports.someClass = someClass;
//// [aliasAssignments_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moduleA = require("./aliasAssignments_moduleA");
var x = moduleA;
x = 1; // Should be error
var y = 1;
y = moduleA; // should be error
