//// [/lib/initial-buildOutput.txt]
/lib/tsc -p src/pkg3 --listFiles
src/pkg3/src/keys.ts(2,14): error TS2742: The inferred type of 'ADMIN' cannot be named without a reference to '@raymondfeng/pkg2/node_modules/@raymondfeng/pkg1'. This is likely not portable. A type annotation is necessary.
/lib/lib.d.ts
/src/pkg3/node_modules/@raymondfeng/pkg2/node_modules/@raymondfeng/pkg1/dist/types.d.ts
/src/pkg3/node_modules/@raymondfeng/pkg2/node_modules/@raymondfeng/pkg1/dist/index.d.ts
/src/pkg3/node_modules/@raymondfeng/pkg2/dist/types.d.ts
/src/pkg3/node_modules/@raymondfeng/pkg2/dist/index.d.ts
/src/pkg3/src/keys.ts
/src/pkg3/src/index.ts
exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/pkg3/dist/index.d.ts]
export * from './keys';


//// [/src/pkg3/dist/index.js]
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./keys"));


//// [/src/pkg3/dist/keys.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pkg2_1 = require("@raymondfeng/pkg2");
exports.ADMIN = pkg2_1.MetadataAccessor.create('1');


