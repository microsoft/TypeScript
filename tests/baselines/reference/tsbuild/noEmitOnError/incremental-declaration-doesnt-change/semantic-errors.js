//// [/lib/incremental-declaration-doesnt-changeOutput.txt]
/lib/tsc --b /src/tsconfig.json
exitCode:: ExitStatus.Success
Program root files: ["/src/shared/types/db.ts","/src/src/main.ts","/src/src/other.ts"]
Program options: {"outDir":"/src/dev-build","noEmitOnError":true,"configFilePath":"/src/tsconfig.json"}
Program files::
/lib/lib.d.ts
/src/shared/types/db.ts
/src/src/main.ts
/src/src/other.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/shared/types/db.ts
/src/src/main.ts
/src/src/other.ts


//// [/src/dev-build/shared/types/db.js]
"use strict";
exports.__esModule = true;


//// [/src/dev-build/src/main.js]
"use strict";
exports.__esModule = true;
var a = "hello";


//// [/src/dev-build/src/other.js]
"use strict";
exports.__esModule = true;
console.log("hi");


//// [/src/src/main.ts]
import { A } from "../shared/types/db";
const a: string = "hello";

