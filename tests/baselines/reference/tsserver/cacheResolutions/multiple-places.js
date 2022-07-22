Info 0    [00:02:29.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:02:30.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/project/randomFileForImport.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/src/project/tsconfig.json]
{"compilerOptions":{"composite":true,"cacheResolutions":true,"traceResolution":true},"files":["fileWithImports.ts","randomFileForImport.ts","a/fileWithImports.ts","b/ba/fileWithImports.ts","b/randomFileForImport.ts","c/ca/fileWithImports.ts","c/ca/caa/randomFileForImport.ts","c/ca/caa/caaa/fileWithImports.ts","c/cb/fileWithImports.ts","d/da/daa/daaa/fileWithImports.ts","d/da/daa/fileWithImports.ts","d/da/fileWithImports.ts","e/ea/fileWithImports.ts","e/ea/eaa/fileWithImports.ts","e/ea/eaa/eaaa/fileWithImports.ts"]}

//// [/src/project/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/randomFileForImport.ts]
export const x = 10;

//// [/src/project/a/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/b/ba/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/b/randomFileForImport.ts]
export const x = 10;

//// [/src/project/c/ca/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/c/ca/caa/randomFileForImport.ts]
export const x = 10;

//// [/src/project/c/ca/caa/caaa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/c/cb/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/d/da/daa/daaa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/d/da/daa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/d/da/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/e/ea/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/e/ea/eaa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/e/ea/eaa/eaaa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/node_modules/pkg0/index.d.ts]
export interface ImportInterface0 {}

//// [/a/lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }

//// [/src/project/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/fileWithImports.d.ts]
export {};


//// [/src/project/randomFileForImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/src/project/randomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/a/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/a/fileWithImports.d.ts]
export {};


//// [/src/project/b/ba/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/b/ba/fileWithImports.d.ts]
export {};


//// [/src/project/b/randomFileForImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/src/project/b/randomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/c/ca/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/c/ca/fileWithImports.d.ts]
export {};


//// [/src/project/c/ca/caa/randomFileForImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/src/project/c/ca/caa/randomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/c/ca/caa/caaa/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/c/ca/caa/caaa/fileWithImports.d.ts]
export {};


//// [/src/project/c/cb/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/c/cb/fileWithImports.d.ts]
export {};


//// [/src/project/d/da/daa/daaa/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/d/da/daa/daaa/fileWithImports.d.ts]
export {};


//// [/src/project/d/da/daa/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/d/da/daa/fileWithImports.d.ts]
export {};


//// [/src/project/d/da/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/d/da/fileWithImports.d.ts]
export {};


//// [/src/project/e/ea/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/e/ea/fileWithImports.d.ts]
export {};


//// [/src/project/e/ea/eaa/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/e/ea/eaa/fileWithImports.d.ts]
export {};


//// [/src/project/e/ea/eaa/eaaa/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/e/ea/eaa/eaaa/fileWithImports.d.ts]
export {};


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./","./node_modules/pkg0/package.json","./node_modules/pkg0.ts","./node_modules/pkg0.tsx","./node_modules/pkg0.d.ts","./node_modules/pkg0/index.ts","./node_modules/pkg0/index.tsx","./a/node_modules/pkg0/package.json","./a/node_modules/pkg0.ts","./a/node_modules/pkg0.tsx","./a/node_modules/pkg0.d.ts","./a/node_modules/pkg0/index.ts","./a/node_modules/pkg0/index.tsx","./a/node_modules/pkg0/index.d.ts","./a/node_modules/@types/pkg0/package.json","./a/node_modules/@types/pkg0.d.ts","./a/node_modules/@types/pkg0/index.d.ts","./b/ba/node_modules/pkg0/package.json","./b/ba/node_modules/pkg0.ts","./b/ba/node_modules/pkg0.tsx","./b/ba/node_modules/pkg0.d.ts","./b/ba/node_modules/pkg0/index.ts","./b/ba/node_modules/pkg0/index.tsx","./b/ba/node_modules/pkg0/index.d.ts","./b/ba/node_modules/@types/pkg0/package.json","./b/ba/node_modules/@types/pkg0.d.ts","./b/ba/node_modules/@types/pkg0/index.d.ts","./b/node_modules/pkg0/package.json","./b/node_modules/pkg0.ts","./b/node_modules/pkg0.tsx","./b/node_modules/pkg0.d.ts","./b/node_modules/pkg0/index.ts","./b/node_modules/pkg0/index.tsx","./b/node_modules/pkg0/index.d.ts","./b/node_modules/@types/pkg0/package.json","./b/node_modules/@types/pkg0.d.ts","./b/node_modules/@types/pkg0/index.d.ts","./c/ca/node_modules/pkg0/package.json","./c/ca/node_modules/pkg0.ts","./c/ca/node_modules/pkg0.tsx","./c/ca/node_modules/pkg0.d.ts","./c/ca/node_modules/pkg0/index.ts","./c/ca/node_modules/pkg0/index.tsx","./c/ca/node_modules/pkg0/index.d.ts","./c/ca/node_modules/@types/pkg0/package.json","./c/ca/node_modules/@types/pkg0.d.ts","./c/ca/node_modules/@types/pkg0/index.d.ts","./c/node_modules/pkg0/package.json","./c/node_modules/pkg0.ts","./c/node_modules/pkg0.tsx","./c/node_modules/pkg0.d.ts","./c/node_modules/pkg0/index.ts","./c/node_modules/pkg0/index.tsx","./c/node_modules/pkg0/index.d.ts","./c/node_modules/@types/pkg0/package.json","./c/node_modules/@types/pkg0.d.ts","./c/node_modules/@types/pkg0/index.d.ts","./c/ca/caa/caaa/node_modules/pkg0/package.json","./c/ca/caa/caaa/node_modules/pkg0.ts","./c/ca/caa/caaa/node_modules/pkg0.tsx","./c/ca/caa/caaa/node_modules/pkg0.d.ts","./c/ca/caa/caaa/node_modules/pkg0/index.ts","./c/ca/caa/caaa/node_modules/pkg0/index.tsx","./c/ca/caa/caaa/node_modules/pkg0/index.d.ts","./c/ca/caa/caaa/node_modules/@types/pkg0/package.json","./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts","./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts","./c/ca/caa/node_modules/pkg0/package.json","./c/ca/caa/node_modules/pkg0.ts","./c/ca/caa/node_modules/pkg0.tsx","./c/ca/caa/node_modules/pkg0.d.ts","./c/ca/caa/node_modules/pkg0/index.ts","./c/ca/caa/node_modules/pkg0/index.tsx","./c/ca/caa/node_modules/pkg0/index.d.ts","./c/ca/caa/node_modules/@types/pkg0/package.json","./c/ca/caa/node_modules/@types/pkg0.d.ts","./c/ca/caa/node_modules/@types/pkg0/index.d.ts","./c/cb/node_modules/pkg0/package.json","./c/cb/node_modules/pkg0.ts","./c/cb/node_modules/pkg0.tsx","./c/cb/node_modules/pkg0.d.ts","./c/cb/node_modules/pkg0/index.ts","./c/cb/node_modules/pkg0/index.tsx","./c/cb/node_modules/pkg0/index.d.ts","./c/cb/node_modules/@types/pkg0/package.json","./c/cb/node_modules/@types/pkg0.d.ts","./c/cb/node_modules/@types/pkg0/index.d.ts","./d/da/daa/daaa/node_modules/pkg0/package.json","./d/da/daa/daaa/node_modules/pkg0.ts","./d/da/daa/daaa/node_modules/pkg0.tsx","./d/da/daa/daaa/node_modules/pkg0.d.ts","./d/da/daa/daaa/node_modules/pkg0/index.ts","./d/da/daa/daaa/node_modules/pkg0/index.tsx","./d/da/daa/daaa/node_modules/pkg0/index.d.ts","./d/da/daa/daaa/node_modules/@types/pkg0/package.json","./d/da/daa/daaa/node_modules/@types/pkg0.d.ts","./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts","./d/da/daa/node_modules/pkg0/package.json","./d/da/daa/node_modules/pkg0.ts","./d/da/daa/node_modules/pkg0.tsx","./d/da/daa/node_modules/pkg0.d.ts","./d/da/daa/node_modules/pkg0/index.ts","./d/da/daa/node_modules/pkg0/index.tsx","./d/da/daa/node_modules/pkg0/index.d.ts","./d/da/daa/node_modules/@types/pkg0/package.json","./d/da/daa/node_modules/@types/pkg0.d.ts","./d/da/daa/node_modules/@types/pkg0/index.d.ts","./d/da/node_modules/pkg0/package.json","./d/da/node_modules/pkg0.ts","./d/da/node_modules/pkg0.tsx","./d/da/node_modules/pkg0.d.ts","./d/da/node_modules/pkg0/index.ts","./d/da/node_modules/pkg0/index.tsx","./d/da/node_modules/pkg0/index.d.ts","./d/da/node_modules/@types/pkg0/package.json","./d/da/node_modules/@types/pkg0.d.ts","./d/da/node_modules/@types/pkg0/index.d.ts","./d/node_modules/pkg0/package.json","./d/node_modules/pkg0.ts","./d/node_modules/pkg0.tsx","./d/node_modules/pkg0.d.ts","./d/node_modules/pkg0/index.ts","./d/node_modules/pkg0/index.tsx","./d/node_modules/pkg0/index.d.ts","./d/node_modules/@types/pkg0/package.json","./d/node_modules/@types/pkg0.d.ts","./d/node_modules/@types/pkg0/index.d.ts","./e/ea/node_modules/pkg0/package.json","./e/ea/node_modules/pkg0.ts","./e/ea/node_modules/pkg0.tsx","./e/ea/node_modules/pkg0.d.ts","./e/ea/node_modules/pkg0/index.ts","./e/ea/node_modules/pkg0/index.tsx","./e/ea/node_modules/pkg0/index.d.ts","./e/ea/node_modules/@types/pkg0/package.json","./e/ea/node_modules/@types/pkg0.d.ts","./e/ea/node_modules/@types/pkg0/index.d.ts","./e/node_modules/pkg0/package.json","./e/node_modules/pkg0.ts","./e/node_modules/pkg0.tsx","./e/node_modules/pkg0.d.ts","./e/node_modules/pkg0/index.ts","./e/node_modules/pkg0/index.tsx","./e/node_modules/pkg0/index.d.ts","./e/node_modules/@types/pkg0/package.json","./e/node_modules/@types/pkg0.d.ts","./e/node_modules/@types/pkg0/index.d.ts","./e/ea/eaa/node_modules/pkg0/package.json","./e/ea/eaa/node_modules/pkg0.ts","./e/ea/eaa/node_modules/pkg0.tsx","./e/ea/eaa/node_modules/pkg0.d.ts","./e/ea/eaa/node_modules/pkg0/index.ts","./e/ea/eaa/node_modules/pkg0/index.tsx","./e/ea/eaa/node_modules/pkg0/index.d.ts","./e/ea/eaa/node_modules/@types/pkg0/package.json","./e/ea/eaa/node_modules/@types/pkg0.d.ts","./e/ea/eaa/node_modules/@types/pkg0/index.d.ts","./e/ea/eaa/eaaa/node_modules/pkg0/package.json","./e/ea/eaa/eaaa/node_modules/pkg0.ts","./e/ea/eaa/eaaa/node_modules/pkg0.tsx","./e/ea/eaa/eaaa/node_modules/pkg0.d.ts","./e/ea/eaa/eaaa/node_modules/pkg0/index.ts","./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx","./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts","./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json","./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts","./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts","./a","./b/ba","./c/ca","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa","./d/da/daa","./d/da","./e/ea","./e/ea/eaa","./e/ea/eaa/eaaa"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[10,1],[8,1],[11,1],[12,1],[13,1],[14,1],[17,1],[16,1],[15,1],[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,5,6,7,10,9,8,11,12,13,14,17,16,15,3,2,4],"latestChangedDtsFile":"./e/ea/eaa/eaaa/fileWithImports.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true},"failedLookupLocations":[19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184]}],"names":["pkg0"],"resolutionEntries":[[1,1]],"modules":[[18,[1]],[185,[1]],[186,[1]],[187,[1]],[188,[1]],[189,[1]],[190,[1]],[191,[1]],[192,[1]],[193,[1]],[194,[1]],[195,[1]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
      "./node_modules/pkg0/index.d.ts",
      "./filewithimports.ts",
      "./randomfileforimport.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./",
      "./node_modules/pkg0/package.json",
      "./node_modules/pkg0.ts",
      "./node_modules/pkg0.tsx",
      "./node_modules/pkg0.d.ts",
      "./node_modules/pkg0/index.ts",
      "./node_modules/pkg0/index.tsx",
      "./a/node_modules/pkg0/package.json",
      "./a/node_modules/pkg0.ts",
      "./a/node_modules/pkg0.tsx",
      "./a/node_modules/pkg0.d.ts",
      "./a/node_modules/pkg0/index.ts",
      "./a/node_modules/pkg0/index.tsx",
      "./a/node_modules/pkg0/index.d.ts",
      "./a/node_modules/@types/pkg0/package.json",
      "./a/node_modules/@types/pkg0.d.ts",
      "./a/node_modules/@types/pkg0/index.d.ts",
      "./b/ba/node_modules/pkg0/package.json",
      "./b/ba/node_modules/pkg0.ts",
      "./b/ba/node_modules/pkg0.tsx",
      "./b/ba/node_modules/pkg0.d.ts",
      "./b/ba/node_modules/pkg0/index.ts",
      "./b/ba/node_modules/pkg0/index.tsx",
      "./b/ba/node_modules/pkg0/index.d.ts",
      "./b/ba/node_modules/@types/pkg0/package.json",
      "./b/ba/node_modules/@types/pkg0.d.ts",
      "./b/ba/node_modules/@types/pkg0/index.d.ts",
      "./b/node_modules/pkg0/package.json",
      "./b/node_modules/pkg0.ts",
      "./b/node_modules/pkg0.tsx",
      "./b/node_modules/pkg0.d.ts",
      "./b/node_modules/pkg0/index.ts",
      "./b/node_modules/pkg0/index.tsx",
      "./b/node_modules/pkg0/index.d.ts",
      "./b/node_modules/@types/pkg0/package.json",
      "./b/node_modules/@types/pkg0.d.ts",
      "./b/node_modules/@types/pkg0/index.d.ts",
      "./c/ca/node_modules/pkg0/package.json",
      "./c/ca/node_modules/pkg0.ts",
      "./c/ca/node_modules/pkg0.tsx",
      "./c/ca/node_modules/pkg0.d.ts",
      "./c/ca/node_modules/pkg0/index.ts",
      "./c/ca/node_modules/pkg0/index.tsx",
      "./c/ca/node_modules/pkg0/index.d.ts",
      "./c/ca/node_modules/@types/pkg0/package.json",
      "./c/ca/node_modules/@types/pkg0.d.ts",
      "./c/ca/node_modules/@types/pkg0/index.d.ts",
      "./c/node_modules/pkg0/package.json",
      "./c/node_modules/pkg0.ts",
      "./c/node_modules/pkg0.tsx",
      "./c/node_modules/pkg0.d.ts",
      "./c/node_modules/pkg0/index.ts",
      "./c/node_modules/pkg0/index.tsx",
      "./c/node_modules/pkg0/index.d.ts",
      "./c/node_modules/@types/pkg0/package.json",
      "./c/node_modules/@types/pkg0.d.ts",
      "./c/node_modules/@types/pkg0/index.d.ts",
      "./c/ca/caa/caaa/node_modules/pkg0/package.json",
      "./c/ca/caa/caaa/node_modules/pkg0.ts",
      "./c/ca/caa/caaa/node_modules/pkg0.tsx",
      "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
      "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
      "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
      "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
      "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
      "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
      "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
      "./c/ca/caa/node_modules/pkg0/package.json",
      "./c/ca/caa/node_modules/pkg0.ts",
      "./c/ca/caa/node_modules/pkg0.tsx",
      "./c/ca/caa/node_modules/pkg0.d.ts",
      "./c/ca/caa/node_modules/pkg0/index.ts",
      "./c/ca/caa/node_modules/pkg0/index.tsx",
      "./c/ca/caa/node_modules/pkg0/index.d.ts",
      "./c/ca/caa/node_modules/@types/pkg0/package.json",
      "./c/ca/caa/node_modules/@types/pkg0.d.ts",
      "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
      "./c/cb/node_modules/pkg0/package.json",
      "./c/cb/node_modules/pkg0.ts",
      "./c/cb/node_modules/pkg0.tsx",
      "./c/cb/node_modules/pkg0.d.ts",
      "./c/cb/node_modules/pkg0/index.ts",
      "./c/cb/node_modules/pkg0/index.tsx",
      "./c/cb/node_modules/pkg0/index.d.ts",
      "./c/cb/node_modules/@types/pkg0/package.json",
      "./c/cb/node_modules/@types/pkg0.d.ts",
      "./c/cb/node_modules/@types/pkg0/index.d.ts",
      "./d/da/daa/daaa/node_modules/pkg0/package.json",
      "./d/da/daa/daaa/node_modules/pkg0.ts",
      "./d/da/daa/daaa/node_modules/pkg0.tsx",
      "./d/da/daa/daaa/node_modules/pkg0.d.ts",
      "./d/da/daa/daaa/node_modules/pkg0/index.ts",
      "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
      "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
      "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
      "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
      "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
      "./d/da/daa/node_modules/pkg0/package.json",
      "./d/da/daa/node_modules/pkg0.ts",
      "./d/da/daa/node_modules/pkg0.tsx",
      "./d/da/daa/node_modules/pkg0.d.ts",
      "./d/da/daa/node_modules/pkg0/index.ts",
      "./d/da/daa/node_modules/pkg0/index.tsx",
      "./d/da/daa/node_modules/pkg0/index.d.ts",
      "./d/da/daa/node_modules/@types/pkg0/package.json",
      "./d/da/daa/node_modules/@types/pkg0.d.ts",
      "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
      "./d/da/node_modules/pkg0/package.json",
      "./d/da/node_modules/pkg0.ts",
      "./d/da/node_modules/pkg0.tsx",
      "./d/da/node_modules/pkg0.d.ts",
      "./d/da/node_modules/pkg0/index.ts",
      "./d/da/node_modules/pkg0/index.tsx",
      "./d/da/node_modules/pkg0/index.d.ts",
      "./d/da/node_modules/@types/pkg0/package.json",
      "./d/da/node_modules/@types/pkg0.d.ts",
      "./d/da/node_modules/@types/pkg0/index.d.ts",
      "./d/node_modules/pkg0/package.json",
      "./d/node_modules/pkg0.ts",
      "./d/node_modules/pkg0.tsx",
      "./d/node_modules/pkg0.d.ts",
      "./d/node_modules/pkg0/index.ts",
      "./d/node_modules/pkg0/index.tsx",
      "./d/node_modules/pkg0/index.d.ts",
      "./d/node_modules/@types/pkg0/package.json",
      "./d/node_modules/@types/pkg0.d.ts",
      "./d/node_modules/@types/pkg0/index.d.ts",
      "./e/ea/node_modules/pkg0/package.json",
      "./e/ea/node_modules/pkg0.ts",
      "./e/ea/node_modules/pkg0.tsx",
      "./e/ea/node_modules/pkg0.d.ts",
      "./e/ea/node_modules/pkg0/index.ts",
      "./e/ea/node_modules/pkg0/index.tsx",
      "./e/ea/node_modules/pkg0/index.d.ts",
      "./e/ea/node_modules/@types/pkg0/package.json",
      "./e/ea/node_modules/@types/pkg0.d.ts",
      "./e/ea/node_modules/@types/pkg0/index.d.ts",
      "./e/node_modules/pkg0/package.json",
      "./e/node_modules/pkg0.ts",
      "./e/node_modules/pkg0.tsx",
      "./e/node_modules/pkg0.d.ts",
      "./e/node_modules/pkg0/index.ts",
      "./e/node_modules/pkg0/index.tsx",
      "./e/node_modules/pkg0/index.d.ts",
      "./e/node_modules/@types/pkg0/package.json",
      "./e/node_modules/@types/pkg0.d.ts",
      "./e/node_modules/@types/pkg0/index.d.ts",
      "./e/ea/eaa/node_modules/pkg0/package.json",
      "./e/ea/eaa/node_modules/pkg0.ts",
      "./e/ea/eaa/node_modules/pkg0.tsx",
      "./e/ea/eaa/node_modules/pkg0.d.ts",
      "./e/ea/eaa/node_modules/pkg0/index.ts",
      "./e/ea/eaa/node_modules/pkg0/index.tsx",
      "./e/ea/eaa/node_modules/pkg0/index.d.ts",
      "./e/ea/eaa/node_modules/@types/pkg0/package.json",
      "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
      "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
      "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
      "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
      "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
      "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
      "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
      "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
      "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
      "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
      "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
      "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts",
      "./a",
      "./b/ba",
      "./c/ca",
      "./c/ca/caa/caaa",
      "./c/cb",
      "./d/da/daa/daaa",
      "./d/da/daa",
      "./d/da",
      "./e/ea",
      "./e/ea/eaa",
      "./e/ea/eaa/eaaa"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./filewithimports.ts": {
        "original": {
          "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./randomfileforimport.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6821242887-export declare const x = 10;\n"
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./a/filewithimports.ts": {
        "original": {
          "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/ba/filewithimports.ts": {
        "original": {
          "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/randomfileforimport.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6821242887-export declare const x = 10;\n"
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/filewithimports.ts": {
        "original": {
          "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "signature": "-6821242887-export declare const x = 10;\n"
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "original": {
          "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/cb/filewithimports.ts": {
        "original": {
          "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "original": {
          "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "original": {
          "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/filewithimports.ts": {
        "original": {
          "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/filewithimports.ts": {
        "original": {
          "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "original": {
          "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "original": {
          "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true
    },
    "referencedMap": {
      "./a/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./b/ba/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/caaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/cb/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/daaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/eaa/eaaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/eaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../a/lib/lib.d.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./filewithimports.ts",
      "./node_modules/pkg0/index.d.ts",
      "./randomfileforimport.ts"
    ],
    "latestChangedDtsFile": "./e/ea/eaa/eaaa/fileWithImports.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": {
              "resolvedFileName": 2,
              "isExternalLibraryImport": true
            },
            "failedLookupLocations": [
              19,
              20,
              21,
              22,
              23,
              24,
              25,
              26,
              27,
              28,
              29,
              30,
              31,
              32,
              33,
              34,
              35,
              36,
              37,
              38,
              39,
              40,
              41,
              42,
              43,
              44,
              45,
              46,
              47,
              48,
              49,
              50,
              51,
              52,
              53,
              54,
              55,
              56,
              57,
              58,
              59,
              60,
              61,
              62,
              63,
              64,
              65,
              66,
              67,
              68,
              69,
              70,
              71,
              72,
              73,
              74,
              75,
              76,
              77,
              78,
              79,
              80,
              81,
              82,
              83,
              84,
              85,
              86,
              87,
              88,
              89,
              90,
              91,
              92,
              93,
              94,
              95,
              96,
              97,
              98,
              99,
              100,
              101,
              102,
              103,
              104,
              105,
              106,
              107,
              108,
              109,
              110,
              111,
              112,
              113,
              114,
              115,
              116,
              117,
              118,
              119,
              120,
              121,
              122,
              123,
              124,
              125,
              126,
              127,
              128,
              129,
              130,
              131,
              132,
              133,
              134,
              135,
              136,
              137,
              138,
              139,
              140,
              141,
              142,
              143,
              144,
              145,
              146,
              147,
              148,
              149,
              150,
              151,
              152,
              153,
              154,
              155,
              156,
              157,
              158,
              159,
              160,
              161,
              162,
              163,
              164,
              165,
              166,
              167,
              168,
              169,
              170,
              171,
              172,
              173,
              174,
              175,
              176,
              177,
              178,
              179,
              180,
              181,
              182,
              183,
              184
            ]
          },
          "resolutionId": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          },
          "failedLookupLocations": [
            "./node_modules/pkg0/package.json",
            "./node_modules/pkg0.ts",
            "./node_modules/pkg0.tsx",
            "./node_modules/pkg0.d.ts",
            "./node_modules/pkg0/index.ts",
            "./node_modules/pkg0/index.tsx",
            "./a/node_modules/pkg0/package.json",
            "./a/node_modules/pkg0.ts",
            "./a/node_modules/pkg0.tsx",
            "./a/node_modules/pkg0.d.ts",
            "./a/node_modules/pkg0/index.ts",
            "./a/node_modules/pkg0/index.tsx",
            "./a/node_modules/pkg0/index.d.ts",
            "./a/node_modules/@types/pkg0/package.json",
            "./a/node_modules/@types/pkg0.d.ts",
            "./a/node_modules/@types/pkg0/index.d.ts",
            "./b/ba/node_modules/pkg0/package.json",
            "./b/ba/node_modules/pkg0.ts",
            "./b/ba/node_modules/pkg0.tsx",
            "./b/ba/node_modules/pkg0.d.ts",
            "./b/ba/node_modules/pkg0/index.ts",
            "./b/ba/node_modules/pkg0/index.tsx",
            "./b/ba/node_modules/pkg0/index.d.ts",
            "./b/ba/node_modules/@types/pkg0/package.json",
            "./b/ba/node_modules/@types/pkg0.d.ts",
            "./b/ba/node_modules/@types/pkg0/index.d.ts",
            "./b/node_modules/pkg0/package.json",
            "./b/node_modules/pkg0.ts",
            "./b/node_modules/pkg0.tsx",
            "./b/node_modules/pkg0.d.ts",
            "./b/node_modules/pkg0/index.ts",
            "./b/node_modules/pkg0/index.tsx",
            "./b/node_modules/pkg0/index.d.ts",
            "./b/node_modules/@types/pkg0/package.json",
            "./b/node_modules/@types/pkg0.d.ts",
            "./b/node_modules/@types/pkg0/index.d.ts",
            "./c/ca/node_modules/pkg0/package.json",
            "./c/ca/node_modules/pkg0.ts",
            "./c/ca/node_modules/pkg0.tsx",
            "./c/ca/node_modules/pkg0.d.ts",
            "./c/ca/node_modules/pkg0/index.ts",
            "./c/ca/node_modules/pkg0/index.tsx",
            "./c/ca/node_modules/pkg0/index.d.ts",
            "./c/ca/node_modules/@types/pkg0/package.json",
            "./c/ca/node_modules/@types/pkg0.d.ts",
            "./c/ca/node_modules/@types/pkg0/index.d.ts",
            "./c/node_modules/pkg0/package.json",
            "./c/node_modules/pkg0.ts",
            "./c/node_modules/pkg0.tsx",
            "./c/node_modules/pkg0.d.ts",
            "./c/node_modules/pkg0/index.ts",
            "./c/node_modules/pkg0/index.tsx",
            "./c/node_modules/pkg0/index.d.ts",
            "./c/node_modules/@types/pkg0/package.json",
            "./c/node_modules/@types/pkg0.d.ts",
            "./c/node_modules/@types/pkg0/index.d.ts",
            "./c/ca/caa/caaa/node_modules/pkg0/package.json",
            "./c/ca/caa/caaa/node_modules/pkg0.ts",
            "./c/ca/caa/caaa/node_modules/pkg0.tsx",
            "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
            "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
            "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
            "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
            "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
            "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
            "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
            "./c/ca/caa/node_modules/pkg0/package.json",
            "./c/ca/caa/node_modules/pkg0.ts",
            "./c/ca/caa/node_modules/pkg0.tsx",
            "./c/ca/caa/node_modules/pkg0.d.ts",
            "./c/ca/caa/node_modules/pkg0/index.ts",
            "./c/ca/caa/node_modules/pkg0/index.tsx",
            "./c/ca/caa/node_modules/pkg0/index.d.ts",
            "./c/ca/caa/node_modules/@types/pkg0/package.json",
            "./c/ca/caa/node_modules/@types/pkg0.d.ts",
            "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
            "./c/cb/node_modules/pkg0/package.json",
            "./c/cb/node_modules/pkg0.ts",
            "./c/cb/node_modules/pkg0.tsx",
            "./c/cb/node_modules/pkg0.d.ts",
            "./c/cb/node_modules/pkg0/index.ts",
            "./c/cb/node_modules/pkg0/index.tsx",
            "./c/cb/node_modules/pkg0/index.d.ts",
            "./c/cb/node_modules/@types/pkg0/package.json",
            "./c/cb/node_modules/@types/pkg0.d.ts",
            "./c/cb/node_modules/@types/pkg0/index.d.ts",
            "./d/da/daa/daaa/node_modules/pkg0/package.json",
            "./d/da/daa/daaa/node_modules/pkg0.ts",
            "./d/da/daa/daaa/node_modules/pkg0.tsx",
            "./d/da/daa/daaa/node_modules/pkg0.d.ts",
            "./d/da/daa/daaa/node_modules/pkg0/index.ts",
            "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
            "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
            "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
            "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
            "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
            "./d/da/daa/node_modules/pkg0/package.json",
            "./d/da/daa/node_modules/pkg0.ts",
            "./d/da/daa/node_modules/pkg0.tsx",
            "./d/da/daa/node_modules/pkg0.d.ts",
            "./d/da/daa/node_modules/pkg0/index.ts",
            "./d/da/daa/node_modules/pkg0/index.tsx",
            "./d/da/daa/node_modules/pkg0/index.d.ts",
            "./d/da/daa/node_modules/@types/pkg0/package.json",
            "./d/da/daa/node_modules/@types/pkg0.d.ts",
            "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
            "./d/da/node_modules/pkg0/package.json",
            "./d/da/node_modules/pkg0.ts",
            "./d/da/node_modules/pkg0.tsx",
            "./d/da/node_modules/pkg0.d.ts",
            "./d/da/node_modules/pkg0/index.ts",
            "./d/da/node_modules/pkg0/index.tsx",
            "./d/da/node_modules/pkg0/index.d.ts",
            "./d/da/node_modules/@types/pkg0/package.json",
            "./d/da/node_modules/@types/pkg0.d.ts",
            "./d/da/node_modules/@types/pkg0/index.d.ts",
            "./d/node_modules/pkg0/package.json",
            "./d/node_modules/pkg0.ts",
            "./d/node_modules/pkg0.tsx",
            "./d/node_modules/pkg0.d.ts",
            "./d/node_modules/pkg0/index.ts",
            "./d/node_modules/pkg0/index.tsx",
            "./d/node_modules/pkg0/index.d.ts",
            "./d/node_modules/@types/pkg0/package.json",
            "./d/node_modules/@types/pkg0.d.ts",
            "./d/node_modules/@types/pkg0/index.d.ts",
            "./e/ea/node_modules/pkg0/package.json",
            "./e/ea/node_modules/pkg0.ts",
            "./e/ea/node_modules/pkg0.tsx",
            "./e/ea/node_modules/pkg0.d.ts",
            "./e/ea/node_modules/pkg0/index.ts",
            "./e/ea/node_modules/pkg0/index.tsx",
            "./e/ea/node_modules/pkg0/index.d.ts",
            "./e/ea/node_modules/@types/pkg0/package.json",
            "./e/ea/node_modules/@types/pkg0.d.ts",
            "./e/ea/node_modules/@types/pkg0/index.d.ts",
            "./e/node_modules/pkg0/package.json",
            "./e/node_modules/pkg0.ts",
            "./e/node_modules/pkg0.tsx",
            "./e/node_modules/pkg0.d.ts",
            "./e/node_modules/pkg0/index.ts",
            "./e/node_modules/pkg0/index.tsx",
            "./e/node_modules/pkg0/index.d.ts",
            "./e/node_modules/@types/pkg0/package.json",
            "./e/node_modules/@types/pkg0.d.ts",
            "./e/node_modules/@types/pkg0/index.d.ts",
            "./e/ea/eaa/node_modules/pkg0/package.json",
            "./e/ea/eaa/node_modules/pkg0.ts",
            "./e/ea/eaa/node_modules/pkg0.tsx",
            "./e/ea/eaa/node_modules/pkg0.d.ts",
            "./e/ea/eaa/node_modules/pkg0/index.ts",
            "./e/ea/eaa/node_modules/pkg0/index.tsx",
            "./e/ea/eaa/node_modules/pkg0/index.d.ts",
            "./e/ea/eaa/node_modules/@types/pkg0/package.json",
            "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
            "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
            "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
            "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
            "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
            "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
            "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
            "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
            "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
            "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
            "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
            "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
          ]
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            },
            "failedLookupLocations": [
              "./node_modules/pkg0/package.json",
              "./node_modules/pkg0.ts",
              "./node_modules/pkg0.tsx",
              "./node_modules/pkg0.d.ts",
              "./node_modules/pkg0/index.ts",
              "./node_modules/pkg0/index.tsx",
              "./a/node_modules/pkg0/package.json",
              "./a/node_modules/pkg0.ts",
              "./a/node_modules/pkg0.tsx",
              "./a/node_modules/pkg0.d.ts",
              "./a/node_modules/pkg0/index.ts",
              "./a/node_modules/pkg0/index.tsx",
              "./a/node_modules/pkg0/index.d.ts",
              "./a/node_modules/@types/pkg0/package.json",
              "./a/node_modules/@types/pkg0.d.ts",
              "./a/node_modules/@types/pkg0/index.d.ts",
              "./b/ba/node_modules/pkg0/package.json",
              "./b/ba/node_modules/pkg0.ts",
              "./b/ba/node_modules/pkg0.tsx",
              "./b/ba/node_modules/pkg0.d.ts",
              "./b/ba/node_modules/pkg0/index.ts",
              "./b/ba/node_modules/pkg0/index.tsx",
              "./b/ba/node_modules/pkg0/index.d.ts",
              "./b/ba/node_modules/@types/pkg0/package.json",
              "./b/ba/node_modules/@types/pkg0.d.ts",
              "./b/ba/node_modules/@types/pkg0/index.d.ts",
              "./b/node_modules/pkg0/package.json",
              "./b/node_modules/pkg0.ts",
              "./b/node_modules/pkg0.tsx",
              "./b/node_modules/pkg0.d.ts",
              "./b/node_modules/pkg0/index.ts",
              "./b/node_modules/pkg0/index.tsx",
              "./b/node_modules/pkg0/index.d.ts",
              "./b/node_modules/@types/pkg0/package.json",
              "./b/node_modules/@types/pkg0.d.ts",
              "./b/node_modules/@types/pkg0/index.d.ts",
              "./c/ca/node_modules/pkg0/package.json",
              "./c/ca/node_modules/pkg0.ts",
              "./c/ca/node_modules/pkg0.tsx",
              "./c/ca/node_modules/pkg0.d.ts",
              "./c/ca/node_modules/pkg0/index.ts",
              "./c/ca/node_modules/pkg0/index.tsx",
              "./c/ca/node_modules/pkg0/index.d.ts",
              "./c/ca/node_modules/@types/pkg0/package.json",
              "./c/ca/node_modules/@types/pkg0.d.ts",
              "./c/ca/node_modules/@types/pkg0/index.d.ts",
              "./c/node_modules/pkg0/package.json",
              "./c/node_modules/pkg0.ts",
              "./c/node_modules/pkg0.tsx",
              "./c/node_modules/pkg0.d.ts",
              "./c/node_modules/pkg0/index.ts",
              "./c/node_modules/pkg0/index.tsx",
              "./c/node_modules/pkg0/index.d.ts",
              "./c/node_modules/@types/pkg0/package.json",
              "./c/node_modules/@types/pkg0.d.ts",
              "./c/node_modules/@types/pkg0/index.d.ts",
              "./c/ca/caa/caaa/node_modules/pkg0/package.json",
              "./c/ca/caa/caaa/node_modules/pkg0.ts",
              "./c/ca/caa/caaa/node_modules/pkg0.tsx",
              "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
              "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
              "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
              "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
              "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
              "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
              "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
              "./c/ca/caa/node_modules/pkg0/package.json",
              "./c/ca/caa/node_modules/pkg0.ts",
              "./c/ca/caa/node_modules/pkg0.tsx",
              "./c/ca/caa/node_modules/pkg0.d.ts",
              "./c/ca/caa/node_modules/pkg0/index.ts",
              "./c/ca/caa/node_modules/pkg0/index.tsx",
              "./c/ca/caa/node_modules/pkg0/index.d.ts",
              "./c/ca/caa/node_modules/@types/pkg0/package.json",
              "./c/ca/caa/node_modules/@types/pkg0.d.ts",
              "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
              "./c/cb/node_modules/pkg0/package.json",
              "./c/cb/node_modules/pkg0.ts",
              "./c/cb/node_modules/pkg0.tsx",
              "./c/cb/node_modules/pkg0.d.ts",
              "./c/cb/node_modules/pkg0/index.ts",
              "./c/cb/node_modules/pkg0/index.tsx",
              "./c/cb/node_modules/pkg0/index.d.ts",
              "./c/cb/node_modules/@types/pkg0/package.json",
              "./c/cb/node_modules/@types/pkg0.d.ts",
              "./c/cb/node_modules/@types/pkg0/index.d.ts",
              "./d/da/daa/daaa/node_modules/pkg0/package.json",
              "./d/da/daa/daaa/node_modules/pkg0.ts",
              "./d/da/daa/daaa/node_modules/pkg0.tsx",
              "./d/da/daa/daaa/node_modules/pkg0.d.ts",
              "./d/da/daa/daaa/node_modules/pkg0/index.ts",
              "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
              "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
              "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
              "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
              "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
              "./d/da/daa/node_modules/pkg0/package.json",
              "./d/da/daa/node_modules/pkg0.ts",
              "./d/da/daa/node_modules/pkg0.tsx",
              "./d/da/daa/node_modules/pkg0.d.ts",
              "./d/da/daa/node_modules/pkg0/index.ts",
              "./d/da/daa/node_modules/pkg0/index.tsx",
              "./d/da/daa/node_modules/pkg0/index.d.ts",
              "./d/da/daa/node_modules/@types/pkg0/package.json",
              "./d/da/daa/node_modules/@types/pkg0.d.ts",
              "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
              "./d/da/node_modules/pkg0/package.json",
              "./d/da/node_modules/pkg0.ts",
              "./d/da/node_modules/pkg0.tsx",
              "./d/da/node_modules/pkg0.d.ts",
              "./d/da/node_modules/pkg0/index.ts",
              "./d/da/node_modules/pkg0/index.tsx",
              "./d/da/node_modules/pkg0/index.d.ts",
              "./d/da/node_modules/@types/pkg0/package.json",
              "./d/da/node_modules/@types/pkg0.d.ts",
              "./d/da/node_modules/@types/pkg0/index.d.ts",
              "./d/node_modules/pkg0/package.json",
              "./d/node_modules/pkg0.ts",
              "./d/node_modules/pkg0.tsx",
              "./d/node_modules/pkg0.d.ts",
              "./d/node_modules/pkg0/index.ts",
              "./d/node_modules/pkg0/index.tsx",
              "./d/node_modules/pkg0/index.d.ts",
              "./d/node_modules/@types/pkg0/package.json",
              "./d/node_modules/@types/pkg0.d.ts",
              "./d/node_modules/@types/pkg0/index.d.ts",
              "./e/ea/node_modules/pkg0/package.json",
              "./e/ea/node_modules/pkg0.ts",
              "./e/ea/node_modules/pkg0.tsx",
              "./e/ea/node_modules/pkg0.d.ts",
              "./e/ea/node_modules/pkg0/index.ts",
              "./e/ea/node_modules/pkg0/index.tsx",
              "./e/ea/node_modules/pkg0/index.d.ts",
              "./e/ea/node_modules/@types/pkg0/package.json",
              "./e/ea/node_modules/@types/pkg0.d.ts",
              "./e/ea/node_modules/@types/pkg0/index.d.ts",
              "./e/node_modules/pkg0/package.json",
              "./e/node_modules/pkg0.ts",
              "./e/node_modules/pkg0.tsx",
              "./e/node_modules/pkg0.d.ts",
              "./e/node_modules/pkg0/index.ts",
              "./e/node_modules/pkg0/index.tsx",
              "./e/node_modules/pkg0/index.d.ts",
              "./e/node_modules/@types/pkg0/package.json",
              "./e/node_modules/@types/pkg0.d.ts",
              "./e/node_modules/@types/pkg0/index.d.ts",
              "./e/ea/eaa/node_modules/pkg0/package.json",
              "./e/ea/eaa/node_modules/pkg0.ts",
              "./e/ea/eaa/node_modules/pkg0.tsx",
              "./e/ea/eaa/node_modules/pkg0.d.ts",
              "./e/ea/eaa/node_modules/pkg0/index.ts",
              "./e/ea/eaa/node_modules/pkg0/index.tsx",
              "./e/ea/eaa/node_modules/pkg0/index.d.ts",
              "./e/ea/eaa/node_modules/@types/pkg0/package.json",
              "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
              "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
              "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
              "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
              "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
              "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
              "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
              "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
              "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
              "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
              "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
              "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
            ]
          }
        }
      ],
      "modules": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            }
          ]
        },
        {
          "dir": "./a",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            }
          ]
        },
        {
          "dir": "./b/ba",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            }
          ]
        },
        {
          "dir": "./c/ca",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            }
          ]
        },
        {
          "dir": "./c/ca/caa/caaa",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            }
          ]
        },
        {
          "dir": "./c/cb",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            }
          ]
        },
        {
          "dir": "./d/da/daa/daaa",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            }
          ]
        },
        {
          "dir": "./d/da/daa",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            }
          ]
        },
        {
          "dir": "./d/da",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            }
          ]
        },
        {
          "dir": "./e/ea",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            }
          ]
        },
        {
          "dir": "./e/ea/eaa",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            }
          ]
        },
        {
          "dir": "./e/ea/eaa/eaaa",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 10486
}


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:02:31.000] Search path: /src/project
Info 3    [00:02:32.000] For info: /src/project/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Info 4    [00:02:33.000] Creating configuration project /src/project/tsconfig.json
Info 5    [00:02:34.000] FileWatcher:: Added:: WatchInfo: /src/project/tsconfig.json 2000 undefined Project: /src/project/tsconfig.json WatchType: Config file
Info 6    [00:02:35.000] Config: /src/project/tsconfig.json : {
 "rootNames": [
  "/src/project/fileWithImports.ts",
  "/src/project/randomFileForImport.ts",
  "/src/project/a/fileWithImports.ts",
  "/src/project/b/ba/fileWithImports.ts",
  "/src/project/b/randomFileForImport.ts",
  "/src/project/c/ca/fileWithImports.ts",
  "/src/project/c/ca/caa/randomFileForImport.ts",
  "/src/project/c/ca/caa/caaa/fileWithImports.ts",
  "/src/project/c/cb/fileWithImports.ts",
  "/src/project/d/da/daa/daaa/fileWithImports.ts",
  "/src/project/d/da/daa/fileWithImports.ts",
  "/src/project/d/da/fileWithImports.ts",
  "/src/project/e/ea/fileWithImports.ts",
  "/src/project/e/ea/eaa/fileWithImports.ts",
  "/src/project/e/ea/eaa/eaaa/fileWithImports.ts"
 ],
 "options": {
  "composite": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "configFilePath": "/src/project/tsconfig.json"
 }
}
Info 7    [00:02:36.000] FileWatcher:: Added:: WatchInfo: /src/project/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 8    [00:02:37.000] FileWatcher:: Added:: WatchInfo: /src/project/a/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 9    [00:02:38.000] FileWatcher:: Added:: WatchInfo: /src/project/b/ba/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 10   [00:02:39.000] FileWatcher:: Added:: WatchInfo: /src/project/b/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 11   [00:02:40.000] FileWatcher:: Added:: WatchInfo: /src/project/c/ca/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 12   [00:02:41.000] FileWatcher:: Added:: WatchInfo: /src/project/c/ca/caa/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 13   [00:02:42.000] FileWatcher:: Added:: WatchInfo: /src/project/c/ca/caa/caaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 14   [00:02:43.000] FileWatcher:: Added:: WatchInfo: /src/project/c/cb/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 15   [00:02:44.000] FileWatcher:: Added:: WatchInfo: /src/project/d/da/daa/daaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 16   [00:02:45.000] FileWatcher:: Added:: WatchInfo: /src/project/d/da/daa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 17   [00:02:46.000] FileWatcher:: Added:: WatchInfo: /src/project/d/da/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 18   [00:02:47.000] FileWatcher:: Added:: WatchInfo: /src/project/e/ea/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 19   [00:02:48.000] FileWatcher:: Added:: WatchInfo: /src/project/e/ea/eaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 20   [00:02:49.000] FileWatcher:: Added:: WatchInfo: /src/project/e/ea/eaa/eaaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 21   [00:02:50.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 22   [00:02:51.000] ======== Resolving module 'pkg0' from '/src/project/fileWithImports.ts'. ========
Info 23   [00:02:52.000] Module resolution kind is not specified, using 'NodeJs'.
Info 24   [00:02:53.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 25   [00:02:54.000] File '/src/project/node_modules/pkg0/package.json' does not exist.
Info 26   [00:02:55.000] File '/src/project/node_modules/pkg0.ts' does not exist.
Info 27   [00:02:56.000] File '/src/project/node_modules/pkg0.tsx' does not exist.
Info 28   [00:02:57.000] File '/src/project/node_modules/pkg0.d.ts' does not exist.
Info 29   [00:02:58.000] File '/src/project/node_modules/pkg0/index.ts' does not exist.
Info 30   [00:02:59.000] File '/src/project/node_modules/pkg0/index.tsx' does not exist.
Info 31   [00:03:00.000] File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Info 32   [00:03:01.000] Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
Info 33   [00:03:02.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 34   [00:03:03.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 35   [00:03:04.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 36   [00:03:05.000] ======== Resolving module 'pkg0' from '/src/project/a/fileWithImports.ts'. ========
Info 37   [00:03:06.000] Module resolution kind is not specified, using 'NodeJs'.
Info 38   [00:03:07.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 39   [00:03:08.000] Directory '/src/project/a/node_modules' does not exist, skipping all lookups in it.
Info 40   [00:03:09.000] Resolution for module 'pkg0' was found in cache from location '/src/project'.
Info 41   [00:03:10.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 42   [00:03:11.000] ======== Resolving module 'pkg0' from '/src/project/b/ba/fileWithImports.ts'. ========
Info 43   [00:03:12.000] Module resolution kind is not specified, using 'NodeJs'.
Info 44   [00:03:13.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 45   [00:03:14.000] Directory '/src/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Info 46   [00:03:15.000] Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Info 47   [00:03:16.000] Resolution for module 'pkg0' was found in cache from location '/src/project'.
Info 48   [00:03:17.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 49   [00:03:18.000] ======== Resolving module 'pkg0' from '/src/project/c/ca/fileWithImports.ts'. ========
Info 50   [00:03:19.000] Module resolution kind is not specified, using 'NodeJs'.
Info 51   [00:03:20.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 52   [00:03:21.000] Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Info 53   [00:03:22.000] Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Info 54   [00:03:23.000] Resolution for module 'pkg0' was found in cache from location '/src/project'.
Info 55   [00:03:24.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 56   [00:03:25.000] ======== Resolving module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Info 57   [00:03:26.000] Module resolution kind is not specified, using 'NodeJs'.
Info 58   [00:03:27.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 59   [00:03:28.000] Directory '/src/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Info 60   [00:03:29.000] Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Info 61   [00:03:30.000] Resolution for module 'pkg0' was found in cache from location '/src/project/c/ca'.
Info 62   [00:03:31.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 63   [00:03:32.000] ======== Resolving module 'pkg0' from '/src/project/c/cb/fileWithImports.ts'. ========
Info 64   [00:03:33.000] Module resolution kind is not specified, using 'NodeJs'.
Info 65   [00:03:34.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 66   [00:03:35.000] Directory '/src/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Info 67   [00:03:36.000] Resolution for module 'pkg0' was found in cache from location '/src/project/c'.
Info 68   [00:03:37.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 69   [00:03:38.000] ======== Resolving module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts'. ========
Info 70   [00:03:39.000] Module resolution kind is not specified, using 'NodeJs'.
Info 71   [00:03:40.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 72   [00:03:41.000] Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Info 73   [00:03:42.000] Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Info 74   [00:03:43.000] Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Info 75   [00:03:44.000] Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Info 76   [00:03:45.000] Resolution for module 'pkg0' was found in cache from location '/src/project'.
Info 77   [00:03:46.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 78   [00:03:47.000] ======== Resolving module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts'. ========
Info 79   [00:03:48.000] Module resolution kind is not specified, using 'NodeJs'.
Info 80   [00:03:49.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 81   [00:03:50.000] Resolution for module 'pkg0' was found in cache from location '/src/project/d/da/daa'.
Info 82   [00:03:51.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 83   [00:03:52.000] ======== Resolving module 'pkg0' from '/src/project/d/da/fileWithImports.ts'. ========
Info 84   [00:03:53.000] Module resolution kind is not specified, using 'NodeJs'.
Info 85   [00:03:54.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 86   [00:03:55.000] Resolution for module 'pkg0' was found in cache from location '/src/project/d/da'.
Info 87   [00:03:56.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 88   [00:03:57.000] ======== Resolving module 'pkg0' from '/src/project/e/ea/fileWithImports.ts'. ========
Info 89   [00:03:58.000] Module resolution kind is not specified, using 'NodeJs'.
Info 90   [00:03:59.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 91   [00:04:00.000] Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Info 92   [00:04:01.000] Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Info 93   [00:04:02.000] Resolution for module 'pkg0' was found in cache from location '/src/project'.
Info 94   [00:04:03.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 95   [00:04:04.000] ======== Resolving module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts'. ========
Info 96   [00:04:05.000] Module resolution kind is not specified, using 'NodeJs'.
Info 97   [00:04:06.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 98   [00:04:07.000] Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Info 99   [00:04:08.000] Resolution for module 'pkg0' was found in cache from location '/src/project/e/ea'.
Info 100  [00:04:09.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 101  [00:04:10.000] ======== Resolving module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Info 102  [00:04:11.000] Module resolution kind is not specified, using 'NodeJs'.
Info 103  [00:04:12.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 104  [00:04:13.000] Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Info 105  [00:04:14.000] Resolution for module 'pkg0' was found in cache from location '/src/project/e/ea/eaa'.
Info 106  [00:04:15.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 107  [00:04:16.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 108  [00:04:17.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 109  [00:04:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 110  [00:04:19.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/a 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 111  [00:04:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/a 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 112  [00:04:21.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/b 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 113  [00:04:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/b 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 114  [00:04:23.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/c 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 115  [00:04:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/c 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 116  [00:04:25.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/d 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 117  [00:04:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/d 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 118  [00:04:27.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/e 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 119  [00:04:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/e 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 120  [00:04:29.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Project: /src/project/tsconfig.json WatchType: Type roots
Info 121  [00:04:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Project: /src/project/tsconfig.json WatchType: Type roots
Info 122  [00:04:31.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 123  [00:04:32.000] Project '/src/project/tsconfig.json' (Configured)
Info 124  [00:04:33.000] 	Files (17)
	/a/lib/lib.d.ts
	/src/project/node_modules/pkg0/index.d.ts
	/src/project/fileWithImports.ts
	/src/project/randomFileForImport.ts
	/src/project/a/fileWithImports.ts
	/src/project/b/ba/fileWithImports.ts
	/src/project/b/randomFileForImport.ts
	/src/project/c/ca/fileWithImports.ts
	/src/project/c/ca/caa/randomFileForImport.ts
	/src/project/c/ca/caa/caaa/fileWithImports.ts
	/src/project/c/cb/fileWithImports.ts
	/src/project/d/da/daa/daaa/fileWithImports.ts
	/src/project/d/da/daa/fileWithImports.ts
	/src/project/d/da/fileWithImports.ts
	/src/project/e/ea/fileWithImports.ts
	/src/project/e/ea/eaa/fileWithImports.ts
	/src/project/e/ea/eaa/eaaa/fileWithImports.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/pkg0/index.d.ts
	  Imported via "pkg0" from file 'fileWithImports.ts'
	  Imported via "pkg0" from file 'a/fileWithImports.ts'
	  Imported via "pkg0" from file 'b/ba/fileWithImports.ts'
	  Imported via "pkg0" from file 'c/ca/fileWithImports.ts'
	  Imported via "pkg0" from file 'c/ca/caa/caaa/fileWithImports.ts'
	  Imported via "pkg0" from file 'c/cb/fileWithImports.ts'
	  Imported via "pkg0" from file 'd/da/daa/daaa/fileWithImports.ts'
	  Imported via "pkg0" from file 'd/da/daa/fileWithImports.ts'
	  Imported via "pkg0" from file 'd/da/fileWithImports.ts'
	  Imported via "pkg0" from file 'e/ea/fileWithImports.ts'
	  Imported via "pkg0" from file 'e/ea/eaa/fileWithImports.ts'
	  Imported via "pkg0" from file 'e/ea/eaa/eaaa/fileWithImports.ts'
	fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	a/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	b/ba/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	b/randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	c/ca/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	c/ca/caa/randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	c/ca/caa/caaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	c/cb/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	d/da/daa/daaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	d/da/daa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	d/da/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	e/ea/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	e/ea/eaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	e/ea/eaa/eaaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json

Info 125  [00:04:34.000] -----------------------------------------------
Info 126  [00:04:35.000] Search path: /src/project
Info 127  [00:04:36.000] For info: /src/project/tsconfig.json :: No config files found.
Info 128  [00:04:37.000] Project '/src/project/tsconfig.json' (Configured)
Info 128  [00:04:38.000] 	Files (17)

Info 128  [00:04:39.000] -----------------------------------------------
Info 128  [00:04:40.000] Open files: 
Info 128  [00:04:41.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 128  [00:04:42.000] 		Projects: /src/project/tsconfig.json
After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/b/randomfileforimport.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/randomfileforimport.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}

Info 128  [00:04:43.000] response:
    {
      "responseRequired": false
    }
Info 129  [00:04:44.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/project/b/randomFileForImport.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/b/randomfileforimport.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/randomfileforimport.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}

Info 130  [00:04:45.000] FileWatcher:: Close:: WatchInfo: /src/project/b/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 131  [00:04:46.000] Search path: /src/project/b
Info 132  [00:04:47.000] For info: /src/project/b/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Info 133  [00:04:48.000] Search path: /src/project
Info 134  [00:04:49.000] For info: /src/project/tsconfig.json :: No config files found.
Info 135  [00:04:50.000] Project '/src/project/tsconfig.json' (Configured)
Info 135  [00:04:51.000] 	Files (17)

Info 135  [00:04:52.000] -----------------------------------------------
Info 135  [00:04:53.000] Open files: 
Info 135  [00:04:54.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 135  [00:04:55.000] 		Projects: /src/project/tsconfig.json
Info 135  [00:04:56.000] 	FileName: /src/project/b/randomFileForImport.ts ProjectRootPath: undefined
Info 135  [00:04:57.000] 		Projects: /src/project/tsconfig.json
After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/randomfileforimport.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}

Info 135  [00:04:58.000] response:
    {
      "responseRequired": false
    }
Info 136  [00:04:59.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/project/c/ca/caa/randomFileForImport.ts"
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/randomfileforimport.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}

Info 137  [00:05:00.000] FileWatcher:: Close:: WatchInfo: /src/project/c/ca/caa/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 138  [00:05:01.000] Search path: /src/project/c/ca/caa
Info 139  [00:05:02.000] For info: /src/project/c/ca/caa/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Info 140  [00:05:03.000] Search path: /src/project
Info 141  [00:05:04.000] For info: /src/project/tsconfig.json :: No config files found.
Info 142  [00:05:05.000] Project '/src/project/tsconfig.json' (Configured)
Info 142  [00:05:06.000] 	Files (17)

Info 142  [00:05:07.000] -----------------------------------------------
Info 142  [00:05:08.000] Open files: 
Info 142  [00:05:09.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 142  [00:05:10.000] 		Projects: /src/project/tsconfig.json
Info 142  [00:05:11.000] 	FileName: /src/project/b/randomFileForImport.ts ProjectRootPath: undefined
Info 142  [00:05:12.000] 		Projects: /src/project/tsconfig.json
Info 142  [00:05:13.000] 	FileName: /src/project/c/ca/caa/randomFileForImport.ts ProjectRootPath: undefined
Info 142  [00:05:14.000] 		Projects: /src/project/tsconfig.json
After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}

Info 142  [00:05:15.000] response:
    {
      "responseRequired": false
    }
Info 143  [00:05:16.000] modify randomFileForImport by adding import
Info 144  [00:05:17.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "seq": 4,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}

After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}

Info 145  [00:05:18.000] response:
    {
      "responseRequired": false
    }
Info 146  [00:05:19.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 147  [00:05:20.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 148  [00:05:21.000] ======== Resolving module 'pkg0' from '/src/project/randomFileForImport.ts'. ========
Info 149  [00:05:22.000] Module resolution kind is not specified, using 'NodeJs'.
Info 150  [00:05:23.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 151  [00:05:24.000] File '/src/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info 152  [00:05:25.000] File '/src/project/node_modules/pkg0.ts' does not exist.
Info 153  [00:05:26.000] File '/src/project/node_modules/pkg0.tsx' does not exist.
Info 154  [00:05:27.000] File '/src/project/node_modules/pkg0.d.ts' does not exist.
Info 155  [00:05:28.000] File '/src/project/node_modules/pkg0/index.ts' does not exist.
Info 156  [00:05:29.000] File '/src/project/node_modules/pkg0/index.tsx' does not exist.
Info 157  [00:05:30.000] File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Info 158  [00:05:31.000] Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
Info 159  [00:05:32.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 160  [00:05:33.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 161  [00:05:34.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 162  [00:05:35.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 163  [00:05:36.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 164  [00:05:37.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 165  [00:05:38.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 166  [00:05:39.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 167  [00:05:40.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 168  [00:05:41.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 169  [00:05:42.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 170  [00:05:43.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 171  [00:05:44.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 172  [00:05:45.000] Different program with same set of files
Info 173  [00:05:46.000] modify b/randomFileForImport by adding import
Info 174  [00:05:47.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/b/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "seq": 5,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}

After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}

Info 175  [00:05:48.000] response:
    {
      "responseRequired": false
    }
Info 176  [00:05:49.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 177  [00:05:50.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 178  [00:05:51.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 179  [00:05:52.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 180  [00:05:53.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 181  [00:05:54.000] ======== Resolving module 'pkg0' from '/src/project/b/randomFileForImport.ts'. ========
Info 182  [00:05:55.000] Module resolution kind is not specified, using 'NodeJs'.
Info 183  [00:05:56.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 184  [00:05:57.000] Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Info 185  [00:05:58.000] File '/src/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info 186  [00:05:59.000] File '/src/project/node_modules/pkg0.ts' does not exist.
Info 187  [00:06:00.000] File '/src/project/node_modules/pkg0.tsx' does not exist.
Info 188  [00:06:01.000] File '/src/project/node_modules/pkg0.d.ts' does not exist.
Info 189  [00:06:02.000] File '/src/project/node_modules/pkg0/index.ts' does not exist.
Info 190  [00:06:03.000] File '/src/project/node_modules/pkg0/index.tsx' does not exist.
Info 191  [00:06:04.000] File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Info 192  [00:06:05.000] Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
Info 193  [00:06:06.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 194  [00:06:07.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 195  [00:06:08.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 196  [00:06:09.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 197  [00:06:10.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 198  [00:06:11.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 199  [00:06:12.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 200  [00:06:13.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 201  [00:06:14.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 202  [00:06:15.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 203  [00:06:16.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 204  [00:06:17.000] Different program with same set of files
Info 205  [00:06:18.000] modify c/ca/caa/randomFileForImport by adding import
Info 206  [00:06:19.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/c/ca/caa/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "seq": 6,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}

After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/a:
  {}
/src/project/b:
  {}
/src/project/c:
  {}
/src/project/d:
  {}
/src/project/e:
  {}

Info 207  [00:06:20.000] response:
    {
      "responseRequired": false
    }
Info 208  [00:06:21.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 209  [00:06:22.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 210  [00:06:23.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 211  [00:06:24.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 212  [00:06:25.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 213  [00:06:26.000] Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 214  [00:06:27.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 215  [00:06:28.000] ======== Resolving module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts'. ========
Info 216  [00:06:29.000] Module resolution kind is not specified, using 'NodeJs'.
Info 217  [00:06:30.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 218  [00:06:31.000] Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Info 219  [00:06:32.000] Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Info 220  [00:06:33.000] Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Info 221  [00:06:34.000] File '/src/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info 222  [00:06:35.000] File '/src/project/node_modules/pkg0.ts' does not exist.
Info 223  [00:06:36.000] File '/src/project/node_modules/pkg0.tsx' does not exist.
Info 224  [00:06:37.000] File '/src/project/node_modules/pkg0.d.ts' does not exist.
Info 225  [00:06:38.000] File '/src/project/node_modules/pkg0/index.ts' does not exist.
Info 226  [00:06:39.000] File '/src/project/node_modules/pkg0/index.tsx' does not exist.
Info 227  [00:06:40.000] File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Info 228  [00:06:41.000] Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
Info 229  [00:06:42.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 230  [00:06:43.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 231  [00:06:44.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 232  [00:06:45.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 233  [00:06:46.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 234  [00:06:47.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 235  [00:06:48.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 236  [00:06:49.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 237  [00:06:50.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 238  [00:06:51.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 4 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 239  [00:06:52.000] Different program with same set of files