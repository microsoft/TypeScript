currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/test/module/ts-require/tsconfig.json]
{
  "compilerOptions": {
    "incremental": true,
    "traceResolution": true
  }
}

//// [/home/src/workspaces/project/test/module/ts-require/index.ts]
export const tsRequireIndex= 10;

//// [/home/src/workspaces/project/test/module/ts-require/main.ts]
export const tsRequireMain= 10;

//// [/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts]
/// <reference types="node" />
export const z = 10;


//// [/home/src/workspaces/project/test/module/ts/tsconfig.json]
{
  "compilerOptions": {
    "incremental": true,
    "traceResolution": true
  }
}

//// [/home/src/workspaces/project/test/module/ts/index.ts]
export const tsIndex= 10;

//// [/home/src/workspaces/project/test/module/ts/main.ts]
export const tsMain = 10;

//// [/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts]
declare const tsRequireGlobal = 10;

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


/home/src/tslibs/TS/Lib/tsc.js -b test/module/ts-require test/module/ts --verbose --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * test/module/ts-require/tsconfig.json
    * test/module/ts/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'test/module/ts-require/tsconfig.json' is out of date because output file 'test/module/ts-require/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/test/module/ts-require/tsconfig.json'...

======== Resolving type reference directive 'node', containing file '/home/src/workspaces/project/test/module/ts-require/__inferred type names__.ts', root directory '/home/src/workspaces/project/test/module/ts-require/node_modules/@types,/home/src/workspaces/project/test/module/node_modules/@types,/home/src/workspaces/project/test/node_modules/@types,/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/home/src/workspaces/project/test/module/ts-require/node_modules/@types, /home/src/workspaces/project/test/module/node_modules/@types, /home/src/workspaces/project/test/node_modules/@types, /home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Directory '/home/src/workspaces/project/test/module/ts-require/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/test/module/node_modules/@types' does not exist, skipping all lookups in it.
File '/home/src/workspaces/project/test/node_modules/@types/node/package.json' does not exist.
File '/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts', result '/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts'.
======== Type reference directive 'node' was successfully resolved to '/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts', primary: true. ========
======== Resolving type reference directive 'responselike', containing file '/home/src/workspaces/project/test/module/ts-require/__inferred type names__.ts', root directory '/home/src/workspaces/project/test/module/ts-require/node_modules/@types,/home/src/workspaces/project/test/module/node_modules/@types,/home/src/workspaces/project/test/node_modules/@types,/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/home/src/workspaces/project/test/module/ts-require/node_modules/@types, /home/src/workspaces/project/test/module/node_modules/@types, /home/src/workspaces/project/test/node_modules/@types, /home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Directory '/home/src/workspaces/project/test/module/ts-require/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/test/module/node_modules/@types' does not exist, skipping all lookups in it.
File '/home/src/workspaces/project/node_modules/@types/responselike/package.json' does not exist.
File '/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts', result '/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts'.
======== Type reference directive 'responselike' was successfully resolved to '/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts', primary: true. ========
File '/home/src/workspaces/project/test/node_modules/@types/node/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/test/node_modules/@types/package.json' does not exist.
File '/home/src/workspaces/project/test/node_modules/package.json' does not exist.
File '/home/src/workspaces/project/test/package.json' does not exist.
File '/home/src/workspaces/project/package.json' does not exist.
File '/home/src/workspaces/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
File '/home/src/workspaces/project/node_modules/@types/responselike/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist.
File '/home/src/workspaces/project/node_modules/package.json' does not exist.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving type reference directive 'node', containing file '/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts', root directory '/home/src/workspaces/project/test/module/ts-require/node_modules/@types,/home/src/workspaces/project/test/module/node_modules/@types,/home/src/workspaces/project/test/node_modules/@types,/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/home/src/workspaces/project/test/module/ts-require/node_modules/@types, /home/src/workspaces/project/test/module/node_modules/@types, /home/src/workspaces/project/test/node_modules/@types, /home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Resolution for type reference directive 'node' was found in cache from location '/home/src/workspaces/project/test/module/ts-require'.
======== Type reference directive 'node' was successfully resolved to '/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts', primary: true. ========
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
test/module/ts-require/index.ts
  Matched by default include pattern '**/*'
test/module/ts-require/main.ts
  Matched by default include pattern '**/*'
test/node_modules/@types/node/index.d.ts
  Entry point for implicit type library 'node'
  Type library referenced via 'node' from file 'node_modules/@types/responselike/index.d.ts'
node_modules/@types/responselike/index.d.ts
  Entry point for implicit type library 'responselike'
[[90mHH:MM:SS AM[0m] Project 'test/module/ts/tsconfig.json' is out of date because output file 'test/module/ts/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/test/module/ts/tsconfig.json'...

======== Resolving type reference directive 'node', containing file '/home/src/workspaces/project/test/module/ts/__inferred type names__.ts', root directory '/home/src/workspaces/project/test/module/ts/node_modules/@types,/home/src/workspaces/project/test/module/node_modules/@types,/home/src/workspaces/project/test/node_modules/@types,/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/home/src/workspaces/project/test/module/ts/node_modules/@types, /home/src/workspaces/project/test/module/node_modules/@types, /home/src/workspaces/project/test/node_modules/@types, /home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Directory '/home/src/workspaces/project/test/module/ts/node_modules/@types' does not exist, skipping all lookups in it.
Resolution for type reference directive 'node' was found in cache from location '/home/src/workspaces/project/test/module'.
======== Type reference directive 'node' was successfully resolved to '/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts', primary: true. ========
======== Resolving type reference directive 'responselike', containing file '/home/src/workspaces/project/test/module/ts/__inferred type names__.ts', root directory '/home/src/workspaces/project/test/module/ts/node_modules/@types,/home/src/workspaces/project/test/module/node_modules/@types,/home/src/workspaces/project/test/node_modules/@types,/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/home/src/workspaces/project/test/module/ts/node_modules/@types, /home/src/workspaces/project/test/module/node_modules/@types, /home/src/workspaces/project/test/node_modules/@types, /home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Directory '/home/src/workspaces/project/test/module/ts/node_modules/@types' does not exist, skipping all lookups in it.
Resolution for type reference directive 'responselike' was found in cache from location '/home/src/workspaces/project/test/module'.
======== Type reference directive 'responselike' was successfully resolved to '/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts', primary: true. ========
File '/home/src/workspaces/project/test/node_modules/@types/node/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/test/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/test/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/test/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/responselike/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving type reference directive 'node', containing file '/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts', root directory '/home/src/workspaces/project/test/module/ts/node_modules/@types,/home/src/workspaces/project/test/module/node_modules/@types,/home/src/workspaces/project/test/node_modules/@types,/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/home/src/workspaces/project/test/module/ts/node_modules/@types, /home/src/workspaces/project/test/module/node_modules/@types, /home/src/workspaces/project/test/node_modules/@types, /home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Resolution for type reference directive 'node' was found in cache from location '/home/src/workspaces/project/test/module/ts'.
======== Type reference directive 'node' was successfully resolved to '/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts', primary: true. ========
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
test/module/ts/index.ts
  Matched by default include pattern '**/*'
test/module/ts/main.ts
  Matched by default include pattern '**/*'
test/node_modules/@types/node/index.d.ts
  Entry point for implicit type library 'node'
  Type library referenced via 'node' from file 'node_modules/@types/responselike/index.d.ts'
node_modules/@types/responselike/index.d.ts
  Entry point for implicit type library 'responselike'


//// [/home/src/workspaces/project/test/module/ts-require/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsRequireIndex = void 0;
exports.tsRequireIndex = 10;


//// [/home/src/workspaces/project/test/module/ts-require/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsRequireMain = void 0;
exports.tsRequireMain = 10;


//// [/home/src/workspaces/project/test/module/ts-require/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../tslibs/ts/lib/lib.d.ts","./index.ts","./main.ts","../../node_modules/@types/node/index.d.ts","../../../node_modules/@types/responselike/index.d.ts"],"fileIdsList":[[4]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-13333770461-export const tsRequireIndex= 10;","-15771836560-export const tsRequireMain= 10;",{"version":"-4340658070-declare const tsRequireGlobal = 10;","affectsGlobalScope":true,"impliedFormat":1},{"version":"4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n","impliedFormat":1}],"root":[2,3],"referencedMap":[[5,1]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/test/module/ts-require/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../tslibs/ts/lib/lib.d.ts",
    "./index.ts",
    "./main.ts",
    "../../node_modules/@types/node/index.d.ts",
    "../../../node_modules/@types/responselike/index.d.ts"
  ],
  "fileIdsList": [
    [
      "../../node_modules/@types/node/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "version": "-13333770461-export const tsRequireIndex= 10;",
      "signature": "-13333770461-export const tsRequireIndex= 10;"
    },
    "./main.ts": {
      "version": "-15771836560-export const tsRequireMain= 10;",
      "signature": "-15771836560-export const tsRequireMain= 10;"
    },
    "../../node_modules/@types/node/index.d.ts": {
      "original": {
        "version": "-4340658070-declare const tsRequireGlobal = 10;",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-4340658070-declare const tsRequireGlobal = 10;",
      "signature": "-4340658070-declare const tsRequireGlobal = 10;",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../../../node_modules/@types/responselike/index.d.ts": {
      "original": {
        "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
        "impliedFormat": 1
      },
      "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "signature": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./index.ts"
    ],
    [
      3,
      "./main.ts"
    ]
  ],
  "referencedMap": {
    "../../../node_modules/@types/responselike/index.d.ts": [
      "../../node_modules/@types/node/index.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1056
}

//// [/home/src/workspaces/project/test/module/ts/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsIndex = void 0;
exports.tsIndex = 10;


//// [/home/src/workspaces/project/test/module/ts/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsMain = void 0;
exports.tsMain = 10;


//// [/home/src/workspaces/project/test/module/ts/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../tslibs/ts/lib/lib.d.ts","./index.ts","./main.ts","../../node_modules/@types/node/index.d.ts","../../../node_modules/@types/responselike/index.d.ts"],"fileIdsList":[[4]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-13547799514-export const tsIndex= 10;","-10684672141-export const tsMain = 10;",{"version":"-4340658070-declare const tsRequireGlobal = 10;","affectsGlobalScope":true,"impliedFormat":1},{"version":"4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n","impliedFormat":1}],"root":[2,3],"referencedMap":[[5,1]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/test/module/ts/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../tslibs/ts/lib/lib.d.ts",
    "./index.ts",
    "./main.ts",
    "../../node_modules/@types/node/index.d.ts",
    "../../../node_modules/@types/responselike/index.d.ts"
  ],
  "fileIdsList": [
    [
      "../../node_modules/@types/node/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "version": "-13547799514-export const tsIndex= 10;",
      "signature": "-13547799514-export const tsIndex= 10;"
    },
    "./main.ts": {
      "version": "-10684672141-export const tsMain = 10;",
      "signature": "-10684672141-export const tsMain = 10;"
    },
    "../../node_modules/@types/node/index.d.ts": {
      "original": {
        "version": "-4340658070-declare const tsRequireGlobal = 10;",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-4340658070-declare const tsRequireGlobal = 10;",
      "signature": "-4340658070-declare const tsRequireGlobal = 10;",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../../../node_modules/@types/responselike/index.d.ts": {
      "original": {
        "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
        "impliedFormat": 1
      },
      "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "signature": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./index.ts"
    ],
    [
      3,
      "./main.ts"
    ]
  ],
  "referencedMap": {
    "../../../node_modules/@types/responselike/index.d.ts": [
      "../../node_modules/@types/node/index.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1043
}


exitCode:: ExitStatus.Success

Change:: build ts project with edit

Input::
//// [/home/src/workspaces/project/test/module/ts/main.ts]
export const tsMain = 10;export const z = 10;


/home/src/tslibs/TS/Lib/tsc.js -b test/module/ts-require test/module/ts --verbose --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * test/module/ts-require/tsconfig.json
    * test/module/ts/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'test/module/ts-require/tsconfig.json' is up to date because newest input 'test/module/ts-require/main.ts' is older than output 'test/module/ts-require/tsconfig.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'test/module/ts/tsconfig.json' is out of date because output 'test/module/ts/tsconfig.tsbuildinfo' is older than input 'test/module/ts/main.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/test/module/ts/tsconfig.json'...

======== Resolving type reference directive 'node', containing file '/home/src/workspaces/project/test/module/ts/__inferred type names__.ts', root directory '/home/src/workspaces/project/test/module/ts/node_modules/@types,/home/src/workspaces/project/test/module/node_modules/@types,/home/src/workspaces/project/test/node_modules/@types,/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/home/src/workspaces/project/test/module/ts/node_modules/@types, /home/src/workspaces/project/test/module/node_modules/@types, /home/src/workspaces/project/test/node_modules/@types, /home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Directory '/home/src/workspaces/project/test/module/ts/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/test/module/node_modules/@types' does not exist, skipping all lookups in it.
File '/home/src/workspaces/project/test/node_modules/@types/node/package.json' does not exist.
File '/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts', result '/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts'.
======== Type reference directive 'node' was successfully resolved to '/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts', primary: true. ========
======== Resolving type reference directive 'responselike', containing file '/home/src/workspaces/project/test/module/ts/__inferred type names__.ts', root directory '/home/src/workspaces/project/test/module/ts/node_modules/@types,/home/src/workspaces/project/test/module/node_modules/@types,/home/src/workspaces/project/test/node_modules/@types,/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/home/src/workspaces/project/test/module/ts/node_modules/@types, /home/src/workspaces/project/test/module/node_modules/@types, /home/src/workspaces/project/test/node_modules/@types, /home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Directory '/home/src/workspaces/project/test/module/ts/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/test/module/node_modules/@types' does not exist, skipping all lookups in it.
File '/home/src/workspaces/project/node_modules/@types/responselike/package.json' does not exist.
File '/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts', result '/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts'.
======== Type reference directive 'responselike' was successfully resolved to '/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts', primary: true. ========
File '/home/src/workspaces/project/test/node_modules/@types/node/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/test/node_modules/@types/package.json' does not exist.
File '/home/src/workspaces/project/test/node_modules/package.json' does not exist.
File '/home/src/workspaces/project/test/package.json' does not exist.
File '/home/src/workspaces/project/package.json' does not exist.
File '/home/src/workspaces/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
File '/home/src/workspaces/project/node_modules/@types/responselike/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist.
File '/home/src/workspaces/project/node_modules/package.json' does not exist.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving type reference directive 'node', containing file '/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts', root directory '/home/src/workspaces/project/test/module/ts/node_modules/@types,/home/src/workspaces/project/test/module/node_modules/@types,/home/src/workspaces/project/test/node_modules/@types,/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/home/src/workspaces/project/test/module/ts/node_modules/@types, /home/src/workspaces/project/test/module/node_modules/@types, /home/src/workspaces/project/test/node_modules/@types, /home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Resolution for type reference directive 'node' was found in cache from location '/home/src/workspaces/project/test/module/ts'.
======== Type reference directive 'node' was successfully resolved to '/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts', primary: true. ========
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
test/module/ts/index.ts
  Matched by default include pattern '**/*'
test/module/ts/main.ts
  Matched by default include pattern '**/*'
test/node_modules/@types/node/index.d.ts
  Entry point for implicit type library 'node'
  Type library referenced via 'node' from file 'node_modules/@types/responselike/index.d.ts'
node_modules/@types/responselike/index.d.ts
  Entry point for implicit type library 'responselike'


//// [/home/src/workspaces/project/test/module/ts/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z = exports.tsMain = void 0;
exports.tsMain = 10;
exports.z = 10;


//// [/home/src/workspaces/project/test/module/ts/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../tslibs/ts/lib/lib.d.ts","./index.ts","./main.ts","../../node_modules/@types/node/index.d.ts","../../../node_modules/@types/responselike/index.d.ts"],"fileIdsList":[[4]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-13547799514-export const tsIndex= 10;",{"version":"-8570461073-export const tsMain = 10;export const z = 10;","signature":"-7988574173-export declare const tsMain = 10;\nexport declare const z = 10;\n"},{"version":"-4340658070-declare const tsRequireGlobal = 10;","affectsGlobalScope":true,"impliedFormat":1},{"version":"4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n","impliedFormat":1}],"root":[2,3],"referencedMap":[[5,1]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/test/module/ts/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../tslibs/ts/lib/lib.d.ts",
    "./index.ts",
    "./main.ts",
    "../../node_modules/@types/node/index.d.ts",
    "../../../node_modules/@types/responselike/index.d.ts"
  ],
  "fileIdsList": [
    [
      "../../node_modules/@types/node/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "version": "-13547799514-export const tsIndex= 10;",
      "signature": "-13547799514-export const tsIndex= 10;"
    },
    "./main.ts": {
      "original": {
        "version": "-8570461073-export const tsMain = 10;export const z = 10;",
        "signature": "-7988574173-export declare const tsMain = 10;\nexport declare const z = 10;\n"
      },
      "version": "-8570461073-export const tsMain = 10;export const z = 10;",
      "signature": "-7988574173-export declare const tsMain = 10;\nexport declare const z = 10;\n"
    },
    "../../node_modules/@types/node/index.d.ts": {
      "original": {
        "version": "-4340658070-declare const tsRequireGlobal = 10;",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-4340658070-declare const tsRequireGlobal = 10;",
      "signature": "-4340658070-declare const tsRequireGlobal = 10;",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../../../node_modules/@types/responselike/index.d.ts": {
      "original": {
        "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
        "impliedFormat": 1
      },
      "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "signature": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./index.ts"
    ],
    [
      3,
      "./main.ts"
    ]
  ],
  "referencedMap": {
    "../../../node_modules/@types/responselike/index.d.ts": [
      "../../node_modules/@types/node/index.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1166
}


exitCode:: ExitStatus.Success

Change:: build ts-require project with edit

Input::
//// [/home/src/workspaces/project/test/module/ts-require/main.ts]
export const tsRequireMain= 10;export const z = 10;


/home/src/tslibs/TS/Lib/tsc.js -b test/module/ts-require test/module/ts --verbose --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * test/module/ts-require/tsconfig.json
    * test/module/ts/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'test/module/ts-require/tsconfig.json' is out of date because output 'test/module/ts-require/tsconfig.tsbuildinfo' is older than input 'test/module/ts-require/main.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/test/module/ts-require/tsconfig.json'...

======== Resolving type reference directive 'node', containing file '/home/src/workspaces/project/test/module/ts-require/__inferred type names__.ts', root directory '/home/src/workspaces/project/test/module/ts-require/node_modules/@types,/home/src/workspaces/project/test/module/node_modules/@types,/home/src/workspaces/project/test/node_modules/@types,/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/home/src/workspaces/project/test/module/ts-require/node_modules/@types, /home/src/workspaces/project/test/module/node_modules/@types, /home/src/workspaces/project/test/node_modules/@types, /home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Directory '/home/src/workspaces/project/test/module/ts-require/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/test/module/node_modules/@types' does not exist, skipping all lookups in it.
File '/home/src/workspaces/project/test/node_modules/@types/node/package.json' does not exist.
File '/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts', result '/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts'.
======== Type reference directive 'node' was successfully resolved to '/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts', primary: true. ========
======== Resolving type reference directive 'responselike', containing file '/home/src/workspaces/project/test/module/ts-require/__inferred type names__.ts', root directory '/home/src/workspaces/project/test/module/ts-require/node_modules/@types,/home/src/workspaces/project/test/module/node_modules/@types,/home/src/workspaces/project/test/node_modules/@types,/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/home/src/workspaces/project/test/module/ts-require/node_modules/@types, /home/src/workspaces/project/test/module/node_modules/@types, /home/src/workspaces/project/test/node_modules/@types, /home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Directory '/home/src/workspaces/project/test/module/ts-require/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/test/module/node_modules/@types' does not exist, skipping all lookups in it.
File '/home/src/workspaces/project/node_modules/@types/responselike/package.json' does not exist.
File '/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts', result '/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts'.
======== Type reference directive 'responselike' was successfully resolved to '/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts', primary: true. ========
File '/home/src/workspaces/project/test/node_modules/@types/node/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/test/node_modules/@types/package.json' does not exist.
File '/home/src/workspaces/project/test/node_modules/package.json' does not exist.
File '/home/src/workspaces/project/test/package.json' does not exist.
File '/home/src/workspaces/project/package.json' does not exist.
File '/home/src/workspaces/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
File '/home/src/workspaces/project/node_modules/@types/responselike/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist.
File '/home/src/workspaces/project/node_modules/package.json' does not exist.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving type reference directive 'node', containing file '/home/src/workspaces/project/node_modules/@types/responselike/index.d.ts', root directory '/home/src/workspaces/project/test/module/ts-require/node_modules/@types,/home/src/workspaces/project/test/module/node_modules/@types,/home/src/workspaces/project/test/node_modules/@types,/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/home/src/workspaces/project/test/module/ts-require/node_modules/@types, /home/src/workspaces/project/test/module/node_modules/@types, /home/src/workspaces/project/test/node_modules/@types, /home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Resolution for type reference directive 'node' was found in cache from location '/home/src/workspaces/project/test/module/ts-require'.
======== Type reference directive 'node' was successfully resolved to '/home/src/workspaces/project/test/node_modules/@types/node/index.d.ts', primary: true. ========
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
test/module/ts-require/index.ts
  Matched by default include pattern '**/*'
test/module/ts-require/main.ts
  Matched by default include pattern '**/*'
test/node_modules/@types/node/index.d.ts
  Entry point for implicit type library 'node'
  Type library referenced via 'node' from file 'node_modules/@types/responselike/index.d.ts'
node_modules/@types/responselike/index.d.ts
  Entry point for implicit type library 'responselike'
[[90mHH:MM:SS AM[0m] Project 'test/module/ts/tsconfig.json' is up to date because newest input 'test/module/ts/main.ts' is older than output 'test/module/ts/tsconfig.tsbuildinfo'



//// [/home/src/workspaces/project/test/module/ts-require/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z = exports.tsRequireMain = void 0;
exports.tsRequireMain = 10;
exports.z = 10;


//// [/home/src/workspaces/project/test/module/ts-require/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../tslibs/ts/lib/lib.d.ts","./index.ts","./main.ts","../../node_modules/@types/node/index.d.ts","../../../node_modules/@types/responselike/index.d.ts"],"fileIdsList":[[4]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-13333770461-export const tsRequireIndex= 10;",{"version":"-8680227604-export const tsRequireMain= 10;export const z = 10;","signature":"-17668265504-export declare const tsRequireMain = 10;\nexport declare const z = 10;\n"},{"version":"-4340658070-declare const tsRequireGlobal = 10;","affectsGlobalScope":true,"impliedFormat":1},{"version":"4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n","impliedFormat":1}],"root":[2,3],"referencedMap":[[5,1]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/test/module/ts-require/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../tslibs/ts/lib/lib.d.ts",
    "./index.ts",
    "./main.ts",
    "../../node_modules/@types/node/index.d.ts",
    "../../../node_modules/@types/responselike/index.d.ts"
  ],
  "fileIdsList": [
    [
      "../../node_modules/@types/node/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "version": "-13333770461-export const tsRequireIndex= 10;",
      "signature": "-13333770461-export const tsRequireIndex= 10;"
    },
    "./main.ts": {
      "original": {
        "version": "-8680227604-export const tsRequireMain= 10;export const z = 10;",
        "signature": "-17668265504-export declare const tsRequireMain = 10;\nexport declare const z = 10;\n"
      },
      "version": "-8680227604-export const tsRequireMain= 10;export const z = 10;",
      "signature": "-17668265504-export declare const tsRequireMain = 10;\nexport declare const z = 10;\n"
    },
    "../../node_modules/@types/node/index.d.ts": {
      "original": {
        "version": "-4340658070-declare const tsRequireGlobal = 10;",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-4340658070-declare const tsRequireGlobal = 10;",
      "signature": "-4340658070-declare const tsRequireGlobal = 10;",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../../../node_modules/@types/responselike/index.d.ts": {
      "original": {
        "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
        "impliedFormat": 1
      },
      "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "signature": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./index.ts"
    ],
    [
      3,
      "./main.ts"
    ]
  ],
  "referencedMap": {
    "../../../node_modules/@types/responselike/index.d.ts": [
      "../../node_modules/@types/node/index.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1187
}


exitCode:: ExitStatus.Success
