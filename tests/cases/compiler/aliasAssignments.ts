//@module: commonjs
// @Filename: aliasAssignments_moduleA.ts
export class someClass {
    public someData: string;
}

// @Filename: aliasAssignments_1.ts
import moduleA = require("./aliasAssignments_moduleA");
var x = moduleA;
x = 1; // Should be error
var y = 1;
y = moduleA; // should be error
