currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/packages/a/index.js]
export const a = 'a';

//// [/home/src/workspaces/project/packages/a/test/index.js]
import 'a';

//// [/home/src/workspaces/project/packages/a/tsconfig.json]
{
  "compilerOptions": {
    "checkJs": true,
    "composite": true,
    "declaration": true,
    "emitDeclarationOnly": true,
    "module": "nodenext",
    "outDir": "types"
  }
}

//// [/home/src/workspaces/project/packages/a/package.json]
{
  "name": "a",
  "version": "0.0.0",
  "type": "module",
  "exports": {
    ".": {
      "types": "./types/index.d.ts",
      "default": "./index.js"
    }
  }
}

//// [/home/src/workspaces/project/packages/b/index.js]
export { a } from 'a';

//// [/home/src/workspaces/project/packages/b/tsconfig.json]
{
  "references": [
    {
      "path": "../a"
    }
  ],
  "compilerOptions": {
    "checkJs": true,
    "module": "nodenext",
    "noEmit": true,
    "noImplicitAny": true
  }
}

//// [/home/src/workspaces/project/packages/b/package.json]
{
  "name": "b",
  "version": "0.0.0",
  "type": "module"
}

//// [/home/src/workspaces/project/node_modules/a] symlink(/home/src/workspaces/project/packages/a)

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


/home/src/tslibs/TS/Lib/tsc.js -b packages/a --verbose --traceResolution --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * packages/a/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'packages/a/tsconfig.json' is out of date because output file 'packages/a/types/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/packages/a/tsconfig.json'...

Found 'package.json' at '/home/src/workspaces/project/packages/a/package.json'.
File '/home/src/workspaces/project/packages/a/test/package.json' does not exist.
File '/home/src/workspaces/project/packages/a/package.json' exists according to earlier cached lookups.
======== Resolving module 'a' from '/home/src/workspaces/project/packages/a/test/index.js'. ========
Module resolution kind is not specified, using 'NodeNext'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/workspaces/project/packages/a/test/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/packages/a/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'types'.
Using 'exports' subpath '.' with target './types/index.d.ts'.
File name '/home/src/workspaces/project/packages/a/index.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/project/packages/a/index.ts' does not exist.
File '/home/src/workspaces/project/packages/a/index.tsx' does not exist.
File '/home/src/workspaces/project/packages/a/index.d.ts' does not exist.
File '/home/src/workspaces/project/packages/a/index.js' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolved under condition 'types'.
Exiting conditional exports.
======== Module name 'a' was successfully resolved to '/home/src/workspaces/project/packages/a/index.js' with Package ID 'a/index.js@0.0.0'. ========
File '/home/src/tslibs/TS/Lib/package.json' does not exist.
File '/home/src/tslibs/TS/package.json' does not exist.
File '/home/src/tslibs/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
../../tslibs/TS/Lib/lib.esnext.full.d.ts
  Default library for target 'esnext'
packages/a/index.js
  Matched by default include pattern '**/*'
  Imported via 'a' from file 'packages/a/test/index.js' with packageId 'a/index.js@0.0.0'
  File is ECMAScript module because 'packages/a/package.json' has field "type" with value "module"
packages/a/test/index.js
  Matched by default include pattern '**/*'
  File is ECMAScript module because 'packages/a/package.json' has field "type" with value "module"


//// [/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts] *Lib*

//// [/home/src/workspaces/project/packages/a/types/index.d.ts]
export const a: "a";


//// [/home/src/workspaces/project/packages/a/types/test/index.d.ts]
export {};


//// [/home/src/workspaces/project/packages/a/types/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../tslibs/ts/lib/lib.esnext.full.d.ts","../index.js","../test/index.js"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-15642581130-export const a = 'a';","signature":"-13259723213-export const a: \"a\";\n","impliedFormat":99},{"version":"-3920874422-import 'a';","signature":"-3531856636-export {};\n","impliedFormat":99}],"root":[2,3],"options":{"checkJs":true,"composite":true,"declaration":true,"emitDeclarationOnly":true,"module":199,"outDir":"./"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./test/index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/packages/a/types/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../tslibs/ts/lib/lib.esnext.full.d.ts",
    "../index.js",
    "../test/index.js"
  ],
  "fileIdsList": [
    [
      "../index.js"
    ]
  ],
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.esnext.full.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../index.js": {
      "original": {
        "version": "-15642581130-export const a = 'a';",
        "signature": "-13259723213-export const a: \"a\";\n",
        "impliedFormat": 99
      },
      "version": "-15642581130-export const a = 'a';",
      "signature": "-13259723213-export const a: \"a\";\n",
      "impliedFormat": "esnext"
    },
    "../test/index.js": {
      "original": {
        "version": "-3920874422-import 'a';",
        "signature": "-3531856636-export {};\n",
        "impliedFormat": 99
      },
      "version": "-3920874422-import 'a';",
      "signature": "-3531856636-export {};\n",
      "impliedFormat": "esnext"
    }
  },
  "root": [
    [
      2,
      "../index.js"
    ],
    [
      3,
      "../test/index.js"
    ]
  ],
  "options": {
    "checkJs": true,
    "composite": true,
    "declaration": true,
    "emitDeclarationOnly": true,
    "module": 199,
    "outDir": "./"
  },
  "referencedMap": {
    "../test/index.js": [
      "../index.js"
    ]
  },
  "latestChangedDtsFile": "./test/index.d.ts",
  "version": "FakeTSVersion",
  "size": 1070
}


exitCode:: ExitStatus.Success

Change:: build b

Input::

/home/src/tslibs/TS/Lib/tsc.js -b packages/b --verbose --traceResolution --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * packages/a/tsconfig.json
    * packages/b/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'packages/a/tsconfig.json' is up to date because newest input 'packages/a/test/index.js' is older than output 'packages/a/types/tsconfig.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'packages/b/tsconfig.json' is out of date because output file 'packages/b/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/packages/b/tsconfig.json'...

Found 'package.json' at '/home/src/workspaces/project/packages/b/package.json'.
======== Resolving module 'a' from '/home/src/workspaces/project/packages/b/index.js'. ========
Module resolution kind is not specified, using 'NodeNext'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/workspaces/project/packages/b/package.json' exists according to earlier cached lookups.
Loading module 'a' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/packages/b/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/packages/node_modules' does not exist, skipping all lookups in it.
Found 'package.json' at '/home/src/workspaces/project/node_modules/a/package.json'.
Entering conditional exports.
Matched 'exports' condition 'types'.
Using 'exports' subpath '.' with target './types/index.d.ts'.
File '/home/src/workspaces/project/node_modules/a/types/index.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolved under condition 'types'.
Exiting conditional exports.
Resolving real path for '/home/src/workspaces/project/node_modules/a/types/index.d.ts', result '/home/src/workspaces/project/packages/a/types/index.d.ts'.
======== Module name 'a' was successfully resolved to '/home/src/workspaces/project/packages/a/types/index.d.ts' with Package ID 'a/types/index.d.ts@0.0.0'. ========
File '/home/src/workspaces/project/packages/a/types/package.json' does not exist.
Found 'package.json' at '/home/src/workspaces/project/packages/a/package.json'.
File '/home/src/tslibs/TS/Lib/package.json' does not exist.
File '/home/src/tslibs/TS/package.json' does not exist.
File '/home/src/tslibs/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
../../tslibs/TS/Lib/lib.esnext.full.d.ts
  Default library for target 'esnext'
packages/a/types/index.d.ts
  Imported via 'a' from file 'packages/b/index.js' with packageId 'a/types/index.d.ts@0.0.0'
  File is ECMAScript module because 'packages/a/package.json' has field "type" with value "module"
packages/b/index.js
  Matched by default include pattern '**/*'
  File is ECMAScript module because 'packages/b/package.json' has field "type" with value "module"


//// [/home/src/workspaces/project/packages/b/tsconfig.tsbuildinfo]
{"root":["./index.js"],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/packages/b/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./index.js"
  ],
  "version": "FakeTSVersion",
  "size": 49
}


exitCode:: ExitStatus.Success
