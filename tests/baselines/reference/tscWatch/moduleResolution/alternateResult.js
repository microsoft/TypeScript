currentDirectory:: /home/src/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/projects/project/node_modules/@types/bar/package.json]
{
  "name": "@types/bar",
  "version": "1.0.0",
  "types": "index.d.ts",
  "exports": {
    ".": {
      "require": "./index.d.ts"
    }
  }
}

//// [/home/src/projects/project/node_modules/@types/bar/index.d.ts]
export declare const bar: number;

//// [/home/src/projects/project/node_modules/bar/package.json]
{
  "name": "bar",
  "version": "1.0.0",
  "main": "index.js",
  "exports": {
    ".": {
      "import": "./index.mjs",
      "require": "./index.js"
    }
  }
}

//// [/home/src/projects/project/node_modules/bar/index.js]
module.exports = { bar: 1 };

//// [/home/src/projects/project/node_modules/bar/index.mjs]
export const bar = 1;

//// [/home/src/projects/project/node_modules/foo/package.json]
{
  "name": "foo",
  "version": "1.0.0",
  "main": "index.js",
  "types": "index.d.ts",
  "exports": {
    ".": {
      "import": "./index.mjs",
      "require": "./index.js"
    }
  }
}

//// [/home/src/projects/project/node_modules/foo/index.js]
module.exports = { foo: 1 };

//// [/home/src/projects/project/node_modules/foo/index.mjs]
export const foo = 1;

//// [/home/src/projects/project/node_modules/foo/index.d.ts]
export declare const foo: number;

//// [/home/src/projects/project/node_modules/@types/bar2/package.json]
{
  "name": "@types/bar2",
  "version": "1.0.0",
  "types": "index.d.ts",
  "exports": {
    ".": {
      "types": "./index.d.ts",
      "require": "./index.d.ts"
    }
  }
}

//// [/home/src/projects/project/node_modules/@types/bar2/index.d.ts]
export declare const bar2: number;

//// [/home/src/projects/project/node_modules/bar2/package.json]
{
  "name": "bar2",
  "version": "1.0.0",
  "main": "index.js",
  "exports": {
    ".": {
      "import": "./index.mjs",
      "require": "./index.js"
    }
  }
}

//// [/home/src/projects/project/node_modules/bar2/index.js]
module.exports = { bar2: 1 };

//// [/home/src/projects/project/node_modules/bar2/index.mjs]
export const bar2 = 1;

//// [/home/src/projects/project/node_modules/foo2/package.json]
{
  "name": "foo2",
  "version": "1.0.0",
  "main": "index.js",
  "types": "index.d.ts",
  "exports": {
    ".": {
      "types": "./index.d.ts",
      "import": "./index.mjs",
      "require": "./index.js"
    }
  }
}

//// [/home/src/projects/project/node_modules/foo2/index.js]
module.exports = { foo2: 1 };

//// [/home/src/projects/project/node_modules/foo2/index.mjs]
export const foo2 = 1;

//// [/home/src/projects/project/node_modules/foo2/index.d.ts]
export declare const foo2: number;

//// [/home/src/projects/project/index.mts]
import { foo } from "foo";
import { bar } from "bar";
import { foo2 } from "foo2";
import { bar2 } from "bar2";


//// [/home/src/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "moduleResolution": "node16",
    "traceResolution": true,
    "incremental": true,
    "strict": true,
    "types": []
  },
  "files": [
    "index.mts"
  ]
}

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


/home/src/tslibs/TS/Lib/tsc.js -w --extendedDiagnostics
Output::
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

Current directory: /home/src/projects/project CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/tsconfig.json 2000 undefined Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/home/src/projects/project/index.mts"]
  options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/index.mts 250 undefined Source file
======== Resolving module 'foo' from '/home/src/projects/project/index.mts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/projects/project/package.json' does not exist.
File '/home/src/projects/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
Loading module 'foo' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Found 'package.json' at '/home/src/projects/project/node_modules/foo/package.json'.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/foo/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/foo/index.mts' does not exist.
File '/home/src/projects/project/node_modules/foo/index.d.mts' does not exist.
Failed to resolve under condition 'import'.
Saw non-matching condition 'require'.
Exiting conditional exports.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
File '/home/src/projects/project/node_modules/foo/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/foo/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/foo/index.mjs' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolved under condition 'import'.
Exiting conditional exports.
Resolution of non-relative name failed; trying with modern Node resolution features disabled to see if npm library needs configuration update.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'foo' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/project/node_modules/foo/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field 'index.d.ts' that references '/home/src/projects/project/node_modules/foo/index.d.ts'.
File '/home/src/projects/project/node_modules/foo/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/project/node_modules/foo/index.mjs', result '/home/src/projects/project/node_modules/foo/index.mjs'.
======== Module name 'foo' was successfully resolved to '/home/src/projects/project/node_modules/foo/index.mjs' with Package ID 'foo/index.mjs@1.0.0'. ========
======== Resolving module 'bar' from '/home/src/projects/project/index.mts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'bar' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Found 'package.json' at '/home/src/projects/project/node_modules/bar/package.json'.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/bar/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/bar/index.mts' does not exist.
File '/home/src/projects/project/node_modules/bar/index.d.mts' does not exist.
Failed to resolve under condition 'import'.
Saw non-matching condition 'require'.
Exiting conditional exports.
Found 'package.json' at '/home/src/projects/project/node_modules/@types/bar/package.json'.
Entering conditional exports.
Saw non-matching condition 'require'.
Exiting conditional exports.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
File '/home/src/projects/project/node_modules/bar/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/bar/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/bar/index.mjs' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolved under condition 'import'.
Exiting conditional exports.
Resolution of non-relative name failed; trying with modern Node resolution features disabled to see if npm library needs configuration update.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'bar' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/project/node_modules/bar/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'index.js' that references '/home/src/projects/project/node_modules/bar/index.js'.
File name '/home/src/projects/project/node_modules/bar/index.js' has a '.js' extension - stripping it.
File '/home/src/projects/project/node_modules/bar/index.ts' does not exist.
File '/home/src/projects/project/node_modules/bar/index.tsx' does not exist.
File '/home/src/projects/project/node_modules/bar/index.d.ts' does not exist.
Loading module as file / folder, candidate module location '/home/src/projects/project/node_modules/bar/index.js', target file types: TypeScript, Declaration.
File name '/home/src/projects/project/node_modules/bar/index.js' has a '.js' extension - stripping it.
File '/home/src/projects/project/node_modules/bar/index.ts' does not exist.
File '/home/src/projects/project/node_modules/bar/index.tsx' does not exist.
File '/home/src/projects/project/node_modules/bar/index.d.ts' does not exist.
File '/home/src/projects/project/node_modules/bar/index.js.ts' does not exist.
File '/home/src/projects/project/node_modules/bar/index.js.tsx' does not exist.
File '/home/src/projects/project/node_modules/bar/index.js.d.ts' does not exist.
Directory '/home/src/projects/project/node_modules/bar/index.js' does not exist, skipping all lookups in it.
File '/home/src/projects/project/node_modules/@types/bar/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field 'index.d.ts' that references '/home/src/projects/project/node_modules/@types/bar/index.d.ts'.
File '/home/src/projects/project/node_modules/@types/bar/index.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/home/src/projects/project/node_modules/bar/index.mjs', result '/home/src/projects/project/node_modules/bar/index.mjs'.
======== Module name 'bar' was successfully resolved to '/home/src/projects/project/node_modules/bar/index.mjs' with Package ID 'bar/index.mjs@1.0.0'. ========
======== Resolving module 'foo2' from '/home/src/projects/project/index.mts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'foo2' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Found 'package.json' at '/home/src/projects/project/node_modules/foo2/package.json'.
Entering conditional exports.
Matched 'exports' condition 'types'.
Using 'exports' subpath '.' with target './index.d.ts'.
File '/home/src/projects/project/node_modules/foo2/index.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolved under condition 'types'.
Exiting conditional exports.
Resolving real path for '/home/src/projects/project/node_modules/foo2/index.d.ts', result '/home/src/projects/project/node_modules/foo2/index.d.ts'.
======== Module name 'foo2' was successfully resolved to '/home/src/projects/project/node_modules/foo2/index.d.ts' with Package ID 'foo2/index.d.ts@1.0.0'. ========
======== Resolving module 'bar2' from '/home/src/projects/project/index.mts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'bar2' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Found 'package.json' at '/home/src/projects/project/node_modules/bar2/package.json'.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/bar2/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/bar2/index.mts' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.d.mts' does not exist.
Failed to resolve under condition 'import'.
Saw non-matching condition 'require'.
Exiting conditional exports.
Found 'package.json' at '/home/src/projects/project/node_modules/@types/bar2/package.json'.
Entering conditional exports.
Matched 'exports' condition 'types'.
Using 'exports' subpath '.' with target './index.d.ts'.
File '/home/src/projects/project/node_modules/@types/bar2/index.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolved under condition 'types'.
Exiting conditional exports.
Resolving real path for '/home/src/projects/project/node_modules/@types/bar2/index.d.ts', result '/home/src/projects/project/node_modules/@types/bar2/index.d.ts'.
======== Module name 'bar2' was successfully resolved to '/home/src/projects/project/node_modules/@types/bar2/index.d.ts' with Package ID '@types/bar2/index.d.ts@1.0.0'. ========
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/foo2/index.d.ts 250 undefined Source file
File '/home/src/projects/project/node_modules/@types/bar2/package.json' exists according to earlier cached lookups.
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types/bar2/index.d.ts 250 undefined Source file
File '/home/src/tslibs/TS/Lib/package.json' does not exist.
File '/home/src/tslibs/TS/package.json' does not exist.
File '/home/src/tslibs/package.json' does not exist.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/foo2/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types/bar2/package.json 2000 undefined File location affecting resolution
[96mtsconfig.json[0m:[93m2[0m:[93m3[0m - [91merror[0m[90m TS5110: [0mOption 'module' must be set to 'Node16' when option 'moduleResolution' is set to 'Node16'.

[7m2[0m   "compilerOptions": {
[7m [0m [91m  ~~~~~~~~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/projects/project/index.mjs]
"use strict";
export {};


//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./node_modules/foo2/index.d.ts","./node_modules/@types/bar2/index.d.ts","./index.mts"],"fileIdsList":[[2,3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-1622383150-export declare const foo2: number;","impliedFormat":1},{"version":"-7439170493-export declare const bar2: number;","impliedFormat":1},{"version":"-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n","impliedFormat":99}],"root":[4],"options":{"strict":true},"referencedMap":[[4,1]],"semanticDiagnosticsPerFile":[1,2,3,4],"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./node_modules/foo2/index.d.ts",
    "./node_modules/@types/bar2/index.d.ts",
    "./index.mts"
  ],
  "fileIdsList": [
    [
      "./node_modules/foo2/index.d.ts",
      "./node_modules/@types/bar2/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
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
    "./node_modules/foo2/index.d.ts": {
      "original": {
        "version": "-1622383150-export declare const foo2: number;",
        "impliedFormat": 1
      },
      "version": "-1622383150-export declare const foo2: number;",
      "signature": "-1622383150-export declare const foo2: number;",
      "impliedFormat": "commonjs"
    },
    "./node_modules/@types/bar2/index.d.ts": {
      "original": {
        "version": "-7439170493-export declare const bar2: number;",
        "impliedFormat": 1
      },
      "version": "-7439170493-export declare const bar2: number;",
      "signature": "-7439170493-export declare const bar2: number;",
      "impliedFormat": "commonjs"
    },
    "./index.mts": {
      "original": {
        "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
        "impliedFormat": 99
      },
      "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
      "signature": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
      "impliedFormat": "esnext"
    }
  },
  "root": [
    [
      4,
      "./index.mts"
    ]
  ],
  "options": {
    "strict": true
  },
  "referencedMap": {
    "./index.mts": [
      "./node_modules/foo2/index.d.ts",
      "./node_modules/@types/bar2/index.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./node_modules/foo2/index.d.ts",
      "not cached or not changed"
    ],
    [
      "./node_modules/@types/bar2/index.d.ts",
      "not cached or not changed"
    ],
    [
      "./index.mts",
      "not cached or not changed"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1120
}


PolledWatches::
/home/src/tslibs/TS/Lib/package.json: *new*
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json: *new*
  {"pollingInterval":2000}
/home/src/tslibs/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/projects/project/index.mts: *new*
  {}
/home/src/projects/project/node_modules/@types/bar2/index.d.ts: *new*
  {}
/home/src/projects/project/node_modules/@types/bar2/package.json: *new*
  {}
/home/src/projects/project/node_modules/foo2/index.d.ts: *new*
  {}
/home/src/projects/project/node_modules/foo2/package.json: *new*
  {}
/home/src/projects/project/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

Program root files: [
  "/home/src/projects/project/index.mts"
]
Program options: {
  "moduleResolution": 3,
  "traceResolution": true,
  "incremental": true,
  "strict": true,
  "types": [],
  "watch": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/node_modules/foo2/index.d.ts
/home/src/projects/project/node_modules/@types/bar2/index.d.ts
/home/src/projects/project/index.mts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/projects/project/node_modules/foo2/index.d.ts (used version)
/home/src/projects/project/node_modules/@types/bar2/index.d.ts (used version)
/home/src/projects/project/index.mts (used version)

exitCode:: ExitStatus.undefined

Change:: delete the alternateResult in @types

Input::
//// [/home/src/projects/project/node_modules/@types/bar/index.d.ts] deleted

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


exitCode:: ExitStatus.undefined

Change:: delete the ndoe10Result in package/types

Input::
//// [/home/src/projects/project/node_modules/foo/index.d.ts] deleted

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


exitCode:: ExitStatus.undefined

Change:: add the alternateResult in @types

Input::
//// [/home/src/projects/project/node_modules/@types/bar/index.d.ts]
export declare const bar: number;


Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


exitCode:: ExitStatus.undefined

Change:: add the alternateResult in package/types

Input::
//// [/home/src/projects/project/node_modules/foo/index.d.ts]
export declare const foo: number;


Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


exitCode:: ExitStatus.undefined

Change:: update package.json from @types so error is fixed

Input::
//// [/home/src/projects/project/node_modules/@types/bar/package.json]
{
  "name": "@types/bar",
  "version": "1.0.0",
  "types": "index.d.ts",
  "exports": {
    ".": {
      "types": "./index.d.ts",
      "require": "./index.d.ts"
    }
  }
}


Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


exitCode:: ExitStatus.undefined

Change:: update package.json so error is fixed

Input::
//// [/home/src/projects/project/node_modules/foo/package.json]
{
  "name": "foo",
  "version": "1.0.0",
  "main": "index.js",
  "types": "index.d.ts",
  "exports": {
    ".": {
      "types": "./index.d.ts",
      "import": "./index.mjs",
      "require": "./index.js"
    }
  }
}


Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


exitCode:: ExitStatus.undefined

Change:: update package.json from @types so error is introduced

Input::
//// [/home/src/projects/project/node_modules/@types/bar2/package.json]
{
  "name": "@types/bar2",
  "version": "1.0.0",
  "types": "index.d.ts",
  "exports": {
    ".": {
      "require": "./index.d.ts"
    }
  }
}


Output::
FileWatcher:: Triggered with /home/src/projects/project/node_modules/@types/bar2/package.json 1:: WatchInfo: /home/src/projects/project/node_modules/@types/bar2/package.json 2000 undefined File location affecting resolution
Scheduling invalidateFailedLookup
Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/project/node_modules/@types/bar2/package.json 1:: WatchInfo: /home/src/projects/project/node_modules/@types/bar2/package.json 2000 undefined File location affecting resolution


Timeout callback:: count: 1
1: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 1
1: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 1
Output::
Scheduling update



Timeout callback:: count: 1
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
2: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project/index.mts"]
  options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
Found 'package.json' at '/home/src/projects/project/node_modules/@types/bar2/package.json'.
Reusing resolution of module 'foo' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/foo/index.mjs' with Package ID 'foo/index.mjs@1.0.0'.
Reusing resolution of module 'bar' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/bar/index.mjs' with Package ID 'bar/index.mjs@1.0.0'.
Reusing resolution of module 'foo2' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/foo2/index.d.ts' with Package ID 'foo2/index.d.ts@1.0.0'.
Reusing resolution of module 'bar2' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/@types/bar2/index.d.ts' with Package ID '@types/bar2/index.d.ts@1.0.0'.
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/@types/bar2/package.json' exists according to earlier cached lookups.
File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[96mtsconfig.json[0m:[93m2[0m:[93m3[0m - [91merror[0m[90m TS5110: [0mOption 'module' must be set to 'Node16' when option 'moduleResolution' is set to 'Node16'.

[7m2[0m   "compilerOptions": {
[7m [0m [91m  ~~~~~~~~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.





Program root files: [
  "/home/src/projects/project/index.mts"
]
Program options: {
  "moduleResolution": 3,
  "traceResolution": true,
  "incremental": true,
  "strict": true,
  "types": [],
  "watch": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/node_modules/foo2/index.d.ts
/home/src/projects/project/node_modules/@types/bar2/index.d.ts
/home/src/projects/project/index.mts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: update package.json so error is introduced

Input::
//// [/home/src/projects/project/node_modules/foo2/package.json]
{
  "name": "foo2",
  "version": "1.0.0",
  "main": "index.js",
  "types": "index.d.ts",
  "exports": {
    ".": {
      "import": "./index.mjs",
      "require": "./index.js"
    }
  }
}


Output::
FileWatcher:: Triggered with /home/src/projects/project/node_modules/foo2/package.json 1:: WatchInfo: /home/src/projects/project/node_modules/foo2/package.json 2000 undefined File location affecting resolution
Scheduling invalidateFailedLookup
Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/project/node_modules/foo2/package.json 1:: WatchInfo: /home/src/projects/project/node_modules/foo2/package.json 2000 undefined File location affecting resolution


Timeout callback:: count: 1
3: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 1
3: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 1
Output::
Scheduling update



Timeout callback:: count: 1
4: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
4: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project/index.mts"]
  options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Found 'package.json' at '/home/src/projects/project/node_modules/foo2/package.json'.
File '/home/src/projects/project/node_modules/@types/bar2/package.json' exists according to earlier cached lookups.
Reusing resolution of module 'foo' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/foo/index.mjs' with Package ID 'foo/index.mjs@1.0.0'.
Reusing resolution of module 'bar' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/bar/index.mjs' with Package ID 'bar/index.mjs@1.0.0'.
Reusing resolution of module 'foo2' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/foo2/index.d.ts' with Package ID 'foo2/index.d.ts@1.0.0'.
Reusing resolution of module 'bar2' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/@types/bar2/index.d.ts' with Package ID '@types/bar2/index.d.ts@1.0.0'.
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/@types/bar2/package.json' exists according to earlier cached lookups.
File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[96mtsconfig.json[0m:[93m2[0m:[93m3[0m - [91merror[0m[90m TS5110: [0mOption 'module' must be set to 'Node16' when option 'moduleResolution' is set to 'Node16'.

[7m2[0m   "compilerOptions": {
[7m [0m [91m  ~~~~~~~~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.





Program root files: [
  "/home/src/projects/project/index.mts"
]
Program options: {
  "moduleResolution": 3,
  "traceResolution": true,
  "incremental": true,
  "strict": true,
  "types": [],
  "watch": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/node_modules/foo2/index.d.ts
/home/src/projects/project/node_modules/@types/bar2/index.d.ts
/home/src/projects/project/index.mts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: delete the alternateResult in @types

Input::
//// [/home/src/projects/project/node_modules/@types/bar2/index.d.ts] deleted

Output::
FileWatcher:: Triggered with /home/src/projects/project/node_modules/@types/bar2/index.d.ts 2:: WatchInfo: /home/src/projects/project/node_modules/@types/bar2/index.d.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/project/node_modules/@types/bar2/index.d.ts 2:: WatchInfo: /home/src/projects/project/node_modules/@types/bar2/index.d.ts 250 undefined Source file


Timeout callback:: count: 1
5: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
5: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project/index.mts"]
  options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
File '/home/src/projects/project/node_modules/@types/bar2/package.json' exists according to earlier cached lookups.
FileWatcher:: Close:: WatchInfo: /home/src/projects/project/node_modules/@types/bar2/index.d.ts 250 undefined Source file
Reusing resolution of module 'foo' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/foo/index.mjs' with Package ID 'foo/index.mjs@1.0.0'.
Reusing resolution of module 'bar' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/bar/index.mjs' with Package ID 'bar/index.mjs@1.0.0'.
Reusing resolution of module 'foo2' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/foo2/index.d.ts' with Package ID 'foo2/index.d.ts@1.0.0'.
======== Resolving module 'bar2' from '/home/src/projects/project/index.mts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'bar2' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/project/node_modules/bar2/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/bar2/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/bar2/index.mts' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.d.mts' does not exist.
Failed to resolve under condition 'import'.
Saw non-matching condition 'require'.
Exiting conditional exports.
File '/home/src/projects/project/node_modules/@types/bar2/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Saw non-matching condition 'require'.
Exiting conditional exports.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
File '/home/src/projects/project/node_modules/bar2/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/bar2/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/bar2/index.mjs' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolved under condition 'import'.
Exiting conditional exports.
Resolution of non-relative name failed; trying with modern Node resolution features disabled to see if npm library needs configuration update.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'bar2' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/project/node_modules/bar2/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'index.js' that references '/home/src/projects/project/node_modules/bar2/index.js'.
File name '/home/src/projects/project/node_modules/bar2/index.js' has a '.js' extension - stripping it.
File '/home/src/projects/project/node_modules/bar2/index.ts' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.tsx' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.d.ts' does not exist.
Loading module as file / folder, candidate module location '/home/src/projects/project/node_modules/bar2/index.js', target file types: TypeScript, Declaration.
File name '/home/src/projects/project/node_modules/bar2/index.js' has a '.js' extension - stripping it.
File '/home/src/projects/project/node_modules/bar2/index.ts' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.tsx' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.d.ts' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.js.ts' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.js.tsx' does not exist.
File '/home/src/projects/project/node_modules/bar2/index.js.d.ts' does not exist.
Directory '/home/src/projects/project/node_modules/bar2/index.js' does not exist, skipping all lookups in it.
File '/home/src/projects/project/node_modules/@types/bar2/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field 'index.d.ts' that references '/home/src/projects/project/node_modules/@types/bar2/index.d.ts'.
File '/home/src/projects/project/node_modules/@types/bar2/index.d.ts' does not exist.
Loading module as file / folder, candidate module location '/home/src/projects/project/node_modules/@types/bar2/index.d.ts', target file types: TypeScript, Declaration.
File name '/home/src/projects/project/node_modules/@types/bar2/index.d.ts' has a '.d.ts' extension - stripping it.
File '/home/src/projects/project/node_modules/@types/bar2/index.ts' does not exist.
File '/home/src/projects/project/node_modules/@types/bar2/index.tsx' does not exist.
File '/home/src/projects/project/node_modules/@types/bar2/index.d.ts' does not exist.
File '/home/src/projects/project/node_modules/@types/bar2/index.d.ts.ts' does not exist.
File '/home/src/projects/project/node_modules/@types/bar2/index.d.ts.tsx' does not exist.
File '/home/src/projects/project/node_modules/@types/bar2/index.d.ts.d.ts' does not exist.
Directory '/home/src/projects/project/node_modules/@types/bar2/index.d.ts' does not exist, skipping all lookups in it.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Resolving real path for '/home/src/projects/project/node_modules/bar2/index.mjs', result '/home/src/projects/project/node_modules/bar2/index.mjs'.
======== Module name 'bar2' was successfully resolved to '/home/src/projects/project/node_modules/bar2/index.mjs' with Package ID 'bar2/index.mjs@1.0.0'. ========
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
FileWatcher:: Close:: WatchInfo: /home/src/projects/project/node_modules/@types/bar2/package.json 2000 undefined File location affecting resolution
[96mtsconfig.json[0m:[93m2[0m:[93m3[0m - [91merror[0m[90m TS5110: [0mOption 'module' must be set to 'Node16' when option 'moduleResolution' is set to 'Node16'.

[7m2[0m   "compilerOptions": {
[7m [0m [91m  ~~~~~~~~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/projects/project/index.mjs] file written with same contents
//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./node_modules/foo2/index.d.ts","./index.mts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-1622383150-export declare const foo2: number;","impliedFormat":1},{"version":"-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n","signature":"-3531856636-export {};\n","impliedFormat":99}],"root":[3],"options":{"strict":true},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[1,2,3],"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./node_modules/foo2/index.d.ts",
    "./index.mts"
  ],
  "fileIdsList": [
    [
      "./node_modules/foo2/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
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
    "./node_modules/foo2/index.d.ts": {
      "original": {
        "version": "-1622383150-export declare const foo2: number;",
        "impliedFormat": 1
      },
      "version": "-1622383150-export declare const foo2: number;",
      "signature": "-1622383150-export declare const foo2: number;",
      "impliedFormat": "commonjs"
    },
    "./index.mts": {
      "original": {
        "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
        "signature": "-3531856636-export {};\n",
        "impliedFormat": 99
      },
      "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
      "signature": "-3531856636-export {};\n",
      "impliedFormat": "esnext"
    }
  },
  "root": [
    [
      3,
      "./index.mts"
    ]
  ],
  "options": {
    "strict": true
  },
  "referencedMap": {
    "./index.mts": [
      "./node_modules/foo2/index.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./node_modules/foo2/index.d.ts",
      "not cached or not changed"
    ],
    [
      "./index.mts",
      "not cached or not changed"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1036
}


PolledWatches::
/home/src/tslibs/TS/Lib/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/projects/project/index.mts:
  {}
/home/src/projects/project/node_modules/foo2/index.d.ts:
  {}
/home/src/projects/project/node_modules/foo2/package.json:
  {}
/home/src/projects/project/tsconfig.json:
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatches *deleted*::
/home/src/projects/project/node_modules/@types/bar2/index.d.ts:
  {}
/home/src/projects/project/node_modules/@types/bar2/package.json:
  {}

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


Program root files: [
  "/home/src/projects/project/index.mts"
]
Program options: {
  "moduleResolution": 3,
  "traceResolution": true,
  "incremental": true,
  "strict": true,
  "types": [],
  "watch": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/node_modules/foo2/index.d.ts
/home/src/projects/project/index.mts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/projects/project/index.mts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: delete the ndoe10Result in package/types

Input::
//// [/home/src/projects/project/node_modules/foo2/index.d.ts] deleted

Output::
FileWatcher:: Triggered with /home/src/projects/project/node_modules/foo2/index.d.ts 2:: WatchInfo: /home/src/projects/project/node_modules/foo2/index.d.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/project/node_modules/foo2/index.d.ts 2:: WatchInfo: /home/src/projects/project/node_modules/foo2/index.d.ts 250 undefined Source file


Timeout callback:: count: 1
6: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
6: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project/index.mts"]
  options: {"moduleResolution":3,"traceResolution":true,"incremental":true,"strict":true,"types":[],"watch":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project/tsconfig.json"}
File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
FileWatcher:: Close:: WatchInfo: /home/src/projects/project/node_modules/foo2/index.d.ts 250 undefined Source file
Reusing resolution of module 'foo' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/foo/index.mjs' with Package ID 'foo/index.mjs@1.0.0'.
Reusing resolution of module 'bar' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/bar/index.mjs' with Package ID 'bar/index.mjs@1.0.0'.
======== Resolving module 'foo2' from '/home/src/projects/project/index.mts'. ========
Explicitly specified module resolution kind: 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'foo2' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/foo2/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/foo2/index.mts' does not exist.
File '/home/src/projects/project/node_modules/foo2/index.d.mts' does not exist.
Failed to resolve under condition 'import'.
Saw non-matching condition 'require'.
Exiting conditional exports.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './index.mjs'.
File name '/home/src/projects/project/node_modules/foo2/index.mjs' has a '.mjs' extension - stripping it.
File '/home/src/projects/project/node_modules/foo2/index.mjs' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolved under condition 'import'.
Exiting conditional exports.
Resolution of non-relative name failed; trying with modern Node resolution features disabled to see if npm library needs configuration update.
File '/home/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'foo2' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/project/node_modules/foo2/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field 'index.d.ts' that references '/home/src/projects/project/node_modules/foo2/index.d.ts'.
File '/home/src/projects/project/node_modules/foo2/index.d.ts' does not exist.
Loading module as file / folder, candidate module location '/home/src/projects/project/node_modules/foo2/index.d.ts', target file types: TypeScript, Declaration.
File name '/home/src/projects/project/node_modules/foo2/index.d.ts' has a '.d.ts' extension - stripping it.
File '/home/src/projects/project/node_modules/foo2/index.ts' does not exist.
File '/home/src/projects/project/node_modules/foo2/index.tsx' does not exist.
File '/home/src/projects/project/node_modules/foo2/index.d.ts' does not exist.
File '/home/src/projects/project/node_modules/foo2/index.d.ts.ts' does not exist.
File '/home/src/projects/project/node_modules/foo2/index.d.ts.tsx' does not exist.
File '/home/src/projects/project/node_modules/foo2/index.d.ts.d.ts' does not exist.
Directory '/home/src/projects/project/node_modules/foo2/index.d.ts' does not exist, skipping all lookups in it.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Resolving real path for '/home/src/projects/project/node_modules/foo2/index.mjs', result '/home/src/projects/project/node_modules/foo2/index.mjs'.
======== Module name 'foo2' was successfully resolved to '/home/src/projects/project/node_modules/foo2/index.mjs' with Package ID 'foo2/index.mjs@1.0.0'. ========
Reusing resolution of module 'bar2' from '/home/src/projects/project/index.mts' of old program, it was successfully resolved to '/home/src/projects/project/node_modules/bar2/index.mjs' with Package ID 'bar2/index.mjs@1.0.0'.
File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
FileWatcher:: Close:: WatchInfo: /home/src/projects/project/node_modules/foo2/package.json 2000 undefined File location affecting resolution
[96mtsconfig.json[0m:[93m2[0m:[93m3[0m - [91merror[0m[90m TS5110: [0mOption 'module' must be set to 'Node16' when option 'moduleResolution' is set to 'Node16'.

[7m2[0m   "compilerOptions": {
[7m [0m [91m  ~~~~~~~~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/projects/project/index.mjs] file written with same contents
//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./index.mts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n","signature":"-3531856636-export {};\n","impliedFormat":99}],"root":[2],"options":{"strict":true},"semanticDiagnosticsPerFile":[1,2],"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./index.mts"
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
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
    "./index.mts": {
      "original": {
        "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
        "signature": "-3531856636-export {};\n",
        "impliedFormat": 99
      },
      "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
      "signature": "-3531856636-export {};\n",
      "impliedFormat": "esnext"
    }
  },
  "root": [
    [
      2,
      "./index.mts"
    ]
  ],
  "options": {
    "strict": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./index.mts",
      "not cached or not changed"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 878
}


PolledWatches::
/home/src/tslibs/TS/Lib/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/projects/project/index.mts:
  {}
/home/src/projects/project/tsconfig.json:
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatches *deleted*::
/home/src/projects/project/node_modules/foo2/index.d.ts:
  {}
/home/src/projects/project/node_modules/foo2/package.json:
  {}

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


Program root files: [
  "/home/src/projects/project/index.mts"
]
Program options: {
  "moduleResolution": 3,
  "traceResolution": true,
  "incremental": true,
  "strict": true,
  "types": [],
  "watch": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/index.mts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/projects/project/index.mts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: add the alternateResult in @types

Input::
//// [/home/src/projects/project/node_modules/@types/bar2/index.d.ts]
export declare const bar2: number;


Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


exitCode:: ExitStatus.undefined

Change:: add the ndoe10Result in package/types

Input::
//// [/home/src/projects/project/node_modules/foo2/index.d.ts]
export declare const foo2: number;


Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


exitCode:: ExitStatus.undefined
