currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/packages/pkg1/package.json]
{
  "name": "pkg1",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  }
}

//// [/home/src/workspaces/project/packages/pkg1/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "dist",
    "rootDir": "src",
    "module": "nodenext",
    "moduleResolution": "nodenext"
  },
  "include": [
    "src"
  ]
}

//// [/home/src/workspaces/project/packages/pkg1/src/index.ts]
export class C {}

//// [/home/src/workspaces/project/packages/pkg1/src/other.d.ts]
import { C } from "pkg1";
export declare const c: C;


//// [/home/src/workspaces/project/packages/pkg1/src/usage.ts]
import { c } from "./other";
export const usage = c;


//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


/home/src/tslibs/TS/Lib/tsc.js -b packages/pkg1 --verbose --traceResolution
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * packages/pkg1/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'packages/pkg1/tsconfig.json' is out of date because output file 'packages/pkg1/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/packages/pkg1/tsconfig.json'...

File '/home/src/workspaces/project/packages/pkg1/src/package.json' does not exist.
Found 'package.json' at '/home/src/workspaces/project/packages/pkg1/package.json'.
File '/home/src/workspaces/project/packages/pkg1/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/packages/pkg1/package.json' exists according to earlier cached lookups.
======== Resolving module 'pkg1' from '/home/src/workspaces/project/packages/pkg1/src/other.d.ts'. ========
Explicitly specified module resolution kind: 'NodeNext'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
File '/home/src/workspaces/project/packages/pkg1/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/packages/pkg1/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'types'.
Using 'exports' subpath '.' with target './dist/index.d.ts'.
File '/home/src/workspaces/project/packages/pkg1/src/index.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolved under condition 'types'.
Exiting conditional exports.
======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/packages/pkg1/src/index.ts' with Package ID 'pkg1/src/index.ts@1.0.0'. ========
File '/home/src/workspaces/project/packages/pkg1/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/packages/pkg1/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/packages/pkg1/package.json' exists according to earlier cached lookups.
======== Resolving module './other' from '/home/src/workspaces/project/packages/pkg1/src/usage.ts'. ========
Explicitly specified module resolution kind: 'NodeNext'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
Loading module as file / folder, candidate module location '/home/src/workspaces/project/packages/pkg1/src/other', target file types: TypeScript, JavaScript, Declaration, JSON.
File '/home/src/workspaces/project/packages/pkg1/src/other.ts' does not exist.
File '/home/src/workspaces/project/packages/pkg1/src/other.tsx' does not exist.
File '/home/src/workspaces/project/packages/pkg1/src/other.d.ts' exists - use it as a name resolution result.
======== Module name './other' was successfully resolved to '/home/src/workspaces/project/packages/pkg1/src/other.d.ts'. ========
File '/home/src/tslibs/TS/Lib/package.json' does not exist.
File '/home/src/tslibs/TS/package.json' does not exist.
File '/home/src/tslibs/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
[91merror[0m[90m TS5055: [0mCannot write file '/home/src/workspaces/project/packages/pkg1/dist/index.d.ts' because it would overwrite input file.


Found 1 error.



//// [/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts] *Lib*

//// [/home/src/workspaces/project/packages/pkg1/dist/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
class C {
}
exports.C = C;


//// [/home/src/workspaces/project/packages/pkg1/dist/usage.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usage = void 0;
const other_1 = require("./other");
exports.usage = other_1.c;


//// [/home/src/workspaces/project/packages/pkg1/dist/usage.d.ts]
export declare const usage: C;


//// [/home/src/workspaces/project/packages/pkg1/tsconfig.tsbuildinfo]
{"fileNames":["../../../../tslibs/ts/lib/lib.esnext.full.d.ts","./src/index.ts","./src/other.d.ts","./src/usage.ts"],"fileIdsList":[[3]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-7264672072-export class C {}","impliedFormat":1},{"version":"13493985673-import { C } from \"pkg1\";\nexport declare const c: C;\n","impliedFormat":1},{"version":"-4480060038-import { c } from \"./other\";\nexport const usage = c;\n","signature":"-7622683403-export declare const usage: C;\n","impliedFormat":1}],"root":[[2,4]],"options":{"composite":true,"module":199,"outDir":"./dist","rootDir":"./src"},"referencedMap":[[4,1]],"semanticDiagnosticsPerFile":[1,2,3,4],"emitSignatures":[2],"latestChangedDtsFile":"./dist/usage.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/packages/pkg1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../tslibs/ts/lib/lib.esnext.full.d.ts",
    "./src/index.ts",
    "./src/other.d.ts",
    "./src/usage.ts"
  ],
  "fileIdsList": [
    [
      "./src/other.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../tslibs/ts/lib/lib.esnext.full.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "./src/index.ts": {
      "original": {
        "version": "-7264672072-export class C {}",
        "impliedFormat": 1
      },
      "version": "-7264672072-export class C {}",
      "signature": "-7264672072-export class C {}",
      "impliedFormat": "commonjs"
    },
    "./src/other.d.ts": {
      "original": {
        "version": "13493985673-import { C } from \"pkg1\";\nexport declare const c: C;\n",
        "impliedFormat": 1
      },
      "version": "13493985673-import { C } from \"pkg1\";\nexport declare const c: C;\n",
      "signature": "13493985673-import { C } from \"pkg1\";\nexport declare const c: C;\n",
      "impliedFormat": "commonjs"
    },
    "./src/usage.ts": {
      "original": {
        "version": "-4480060038-import { c } from \"./other\";\nexport const usage = c;\n",
        "signature": "-7622683403-export declare const usage: C;\n",
        "impliedFormat": 1
      },
      "version": "-4480060038-import { c } from \"./other\";\nexport const usage = c;\n",
      "signature": "-7622683403-export declare const usage: C;\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./src/index.ts",
        "./src/other.d.ts",
        "./src/usage.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "module": 199,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "referencedMap": {
    "./src/usage.ts": [
      "./src/other.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../../../tslibs/ts/lib/lib.esnext.full.d.ts",
      "not cached or not changed"
    ],
    [
      "./src/index.ts",
      "not cached or not changed"
    ],
    [
      "./src/other.d.ts",
      "not cached or not changed"
    ],
    [
      "./src/usage.ts",
      "not cached or not changed"
    ]
  ],
  "emitSignatures": [
    "./src/index.ts"
  ],
  "latestChangedDtsFile": "./dist/usage.d.ts",
  "version": "FakeTSVersion",
  "size": 1179
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
