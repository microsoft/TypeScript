currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/common.d.ts]
export type OnValue = (value: number) => void

//// [/home/src/workspaces/project/producer/index.ts]
export { ValueProducerDeclaration } from "./in-js"
import { OnValue } from "@common"
export interface ValueProducerFromTs {
    onValue: OnValue;
}


//// [/home/src/workspaces/project/producer/in-js.d.ts]
import { OnValue } from "@common"
export interface ValueProducerDeclaration {
    onValue: OnValue;
}


//// [/home/src/workspaces/project/producer/tsconfig.json]
{
  "compilerOptions": {
    "strict": true,
    "composite": true,
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "paths": {
      "@common": [
        "../common.d.ts"
      ]
    },
    "libReplacement": false
  }
}

//// [/home/src/workspaces/project/consumer/index.ts]
import { ValueProducerDeclaration, ValueProducerFromTs } from "@producer"
declare let v: ValueProducerDeclaration;
// n is implicitly any because onValue is actually any (despite what the tooltip says)
v.onValue = (n) => {

}

// n is implicitly number as expected
declare let v2: ValueProducerFromTs;
v2.onValue = (n) => {

}

//// [/home/src/workspaces/project/consumer/tsconfig.json]
{
  "compilerOptions": {
    "strict": true,
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "paths": {
      "@producer": [
        "../producer/index"
      ]
    },
    "libReplacement": false
  },
  "references": [
    {
      "path": "../producer"
    }
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


/home/src/tslibs/TS/Lib/tsc.js --b consumer --traceResolution -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json
    * consumer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is out of date because output file 'producer/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/producer/tsconfig.json'...

File '/home/src/workspaces/project/producer/package.json' does not exist.
File '/home/src/workspaces/project/package.json' does not exist.
File '/home/src/workspaces/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
======== Resolving module '@common' from '/home/src/workspaces/project/producer/in-js.d.ts'. ========
Explicitly specified module resolution kind: 'NodeNext'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
'paths' option is specified, looking for a pattern to match module name '@common'.
Module name '@common', matched pattern '@common'.
Trying substitution '../common.d.ts', candidate module location: '../common.d.ts'.
File '/home/src/workspaces/project/common.d.ts' exists - use it as a name resolution result.
======== Module name '@common' was successfully resolved to '/home/src/workspaces/project/common.d.ts'. ========
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/producer/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module './in-js' from '/home/src/workspaces/project/producer/index.ts'. ========
Explicitly specified module resolution kind: 'NodeNext'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
Loading module as file / folder, candidate module location '/home/src/workspaces/project/producer/in-js', target file types: TypeScript, JavaScript, Declaration, JSON.
File '/home/src/workspaces/project/producer/in-js.ts' does not exist.
File '/home/src/workspaces/project/producer/in-js.tsx' does not exist.
File '/home/src/workspaces/project/producer/in-js.d.ts' exists - use it as a name resolution result.
======== Module name './in-js' was successfully resolved to '/home/src/workspaces/project/producer/in-js.d.ts'. ========
======== Resolving module '@common' from '/home/src/workspaces/project/producer/index.ts'. ========
Resolution for module '@common' was found in cache from location '/home/src/workspaces/project/producer'.
======== Module name '@common' was successfully resolved to '/home/src/workspaces/project/common.d.ts'. ========
File '/home/src/tslibs/TS/Lib/package.json' does not exist.
File '/home/src/tslibs/TS/package.json' does not exist.
File '/home/src/tslibs/package.json' does not exist.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[[90mHH:MM:SS AM[0m] Project 'consumer/tsconfig.json' is out of date because output file 'consumer/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/consumer/tsconfig.json'...

File '/home/src/workspaces/project/consumer/package.json' does not exist.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module '@producer' from '/home/src/workspaces/project/consumer/index.ts'. ========
Explicitly specified module resolution kind: 'NodeNext'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
'paths' option is specified, looking for a pattern to match module name '@producer'.
Module name '@producer', matched pattern '@producer'.
Trying substitution '../producer/index', candidate module location: '../producer/index'.
Loading module as file / folder, candidate module location '/home/src/workspaces/project/producer/index', target file types: TypeScript, JavaScript, Declaration, JSON.
File '/home/src/workspaces/project/producer/index.ts' exists - use it as a name resolution result.
======== Module name '@producer' was successfully resolved to '/home/src/workspaces/project/producer/index.ts'. ========
File '/home/src/workspaces/project/producer/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module './in-js' from '/home/src/workspaces/project/producer/index.ts'. ========
Using compiler options of project reference redirect '/home/src/workspaces/project/producer/tsconfig.json'.
Resolution for module './in-js' was found in cache from location '/home/src/workspaces/project/producer'.
======== Module name './in-js' was successfully resolved to '/home/src/workspaces/project/producer/in-js.d.ts'. ========
======== Resolving module '@common' from '/home/src/workspaces/project/producer/index.ts'. ========
Using compiler options of project reference redirect '/home/src/workspaces/project/producer/tsconfig.json'.
Resolution for module '@common' was found in cache from location '/home/src/workspaces/project/producer'.
======== Module name '@common' was successfully resolved to '/home/src/workspaces/project/common.d.ts'. ========
File '/home/src/workspaces/project/producer/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module '@common' from '/home/src/workspaces/project/producer/in-js.d.ts'. ========
Explicitly specified module resolution kind: 'NodeNext'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
'paths' option is specified, looking for a pattern to match module name '@common'.
File '/home/src/workspaces/project/producer/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module '@common' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/producer/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Searching all ancestor node_modules directories for fallback extensions: JavaScript, JSON.
Directory '/home/src/workspaces/project/producer/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name '@common' was not resolved. ========
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[96mconsumer/index.ts[0m:[93m4[0m:[93m14[0m - [91merror[0m[90m TS7006: [0mParameter 'n' implicitly has an 'any' type.

[7m4[0m v.onValue = (n) => {
[7m [0m [91m             ~[0m

[96mproducer/in-js.d.ts[0m:[93m1[0m:[93m25[0m - [91merror[0m[90m TS2307: [0mCannot find module '@common' or its corresponding type declarations.

[7m1[0m import { OnValue } from "@common"
[7m [0m [91m                        ~~~~~~~~~[0m


Found 2 errors.



//// [/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts] *Lib*

//// [/home/src/workspaces/project/producer/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/producer/index.d.ts]
export { ValueProducerDeclaration } from "./in-js";
import { OnValue } from "@common";
export interface ValueProducerFromTs {
    onValue: OnValue;
}


//// [/home/src/workspaces/project/producer/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.esnext.full.d.ts","../common.d.ts","./in-js.d.ts","./index.ts"],"fileIdsList":[[2],[2,3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"3658943742-export type OnValue = (value: number) => void","impliedFormat":1},{"version":"13199476566-import { OnValue } from \"@common\"\nexport interface ValueProducerDeclaration {\n    onValue: OnValue;\n}\n","impliedFormat":1},{"version":"-18594017076-export { ValueProducerDeclaration } from \"./in-js\"\nimport { OnValue } from \"@common\"\nexport interface ValueProducerFromTs {\n    onValue: OnValue;\n}\n","signature":"304566626-export { ValueProducerDeclaration } from \"./in-js\";\nimport { OnValue } from \"@common\";\nexport interface ValueProducerFromTs {\n    onValue: OnValue;\n}\n","impliedFormat":1}],"root":[3,4],"options":{"composite":true,"module":199,"strict":true},"referencedMap":[[3,1],[4,2]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/producer/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.esnext.full.d.ts",
    "../common.d.ts",
    "./in-js.d.ts",
    "./index.ts"
  ],
  "fileIdsList": [
    [
      "../common.d.ts"
    ],
    [
      "../common.d.ts",
      "./in-js.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.esnext.full.d.ts": {
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
    "../common.d.ts": {
      "original": {
        "version": "3658943742-export type OnValue = (value: number) => void",
        "impliedFormat": 1
      },
      "version": "3658943742-export type OnValue = (value: number) => void",
      "signature": "3658943742-export type OnValue = (value: number) => void",
      "impliedFormat": "commonjs"
    },
    "./in-js.d.ts": {
      "original": {
        "version": "13199476566-import { OnValue } from \"@common\"\nexport interface ValueProducerDeclaration {\n    onValue: OnValue;\n}\n",
        "impliedFormat": 1
      },
      "version": "13199476566-import { OnValue } from \"@common\"\nexport interface ValueProducerDeclaration {\n    onValue: OnValue;\n}\n",
      "signature": "13199476566-import { OnValue } from \"@common\"\nexport interface ValueProducerDeclaration {\n    onValue: OnValue;\n}\n",
      "impliedFormat": "commonjs"
    },
    "./index.ts": {
      "original": {
        "version": "-18594017076-export { ValueProducerDeclaration } from \"./in-js\"\nimport { OnValue } from \"@common\"\nexport interface ValueProducerFromTs {\n    onValue: OnValue;\n}\n",
        "signature": "304566626-export { ValueProducerDeclaration } from \"./in-js\";\nimport { OnValue } from \"@common\";\nexport interface ValueProducerFromTs {\n    onValue: OnValue;\n}\n",
        "impliedFormat": 1
      },
      "version": "-18594017076-export { ValueProducerDeclaration } from \"./in-js\"\nimport { OnValue } from \"@common\"\nexport interface ValueProducerFromTs {\n    onValue: OnValue;\n}\n",
      "signature": "304566626-export { ValueProducerDeclaration } from \"./in-js\";\nimport { OnValue } from \"@common\";\nexport interface ValueProducerFromTs {\n    onValue: OnValue;\n}\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      3,
      "./in-js.d.ts"
    ],
    [
      4,
      "./index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 199,
    "strict": true
  },
  "referencedMap": {
    "./in-js.d.ts": [
      "../common.d.ts"
    ],
    "./index.ts": [
      "../common.d.ts",
      "./in-js.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1435
}

//// [/home/src/workspaces/project/consumer/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// n is implicitly any because onValue is actually any (despite what the tooltip says)
v.onValue = (n) => {
};
v2.onValue = (n) => {
};


//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo]
{"root":["./index.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./index.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 63
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
