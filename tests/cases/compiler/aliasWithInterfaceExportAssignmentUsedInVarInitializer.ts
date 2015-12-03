// @module: commonjs
// @Filename: aliasWithInterfaceExportAssignmentUsedInVarInitializer_0.ts
interface c {
    q3: number;
}
export = c;

// @Filename: aliasWithInterfaceExportAssignmentUsedInVarInitializer_1.ts
import moduleA = require("./aliasWithInterfaceExportAssignmentUsedInVarInitializer_0");
var d = b.q3;