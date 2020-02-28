//// [/lib/initial-buildOutput.txt]
/lib/tsc --composite false --p src/project
src/project/tsconfig.json(6,9): error TS5069: Option 'tsBuildInfoFile' cannot be specified without specifying option 'incremental' or option 'composite'.
exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/project/src/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


