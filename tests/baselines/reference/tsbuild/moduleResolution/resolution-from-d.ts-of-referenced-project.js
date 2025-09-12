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
Using compiler options of project reference redirect '/home/src/workspaces/project/producer/tsconfig.json'.
Resolution for module '@common' was found in cache from location '/home/src/workspaces/project/producer'.
======== Module name '@common' was successfully resolved to '/home/src/workspaces/project/common.d.ts'. ========
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
{"fileNames":["../../../tslibs/ts/lib/lib.esnext.full.d.ts","../common.d.ts","./in-js.d.ts","./index.ts"],"fileIdsList":[[2],[2,3]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"3658943742-export type OnValue = (value: number) => void","impliedFormat":1},{"version":"13199476566-import { OnValue } from \"@common\"\nexport interface ValueProducerDeclaration {\n    onValue: OnValue;\n}\n","impliedFormat":1},{"version":"-18594017076-export { ValueProducerDeclaration } from \"./in-js\"\nimport { OnValue } from \"@common\"\nexport interface ValueProducerFromTs {\n    onValue: OnValue;\n}\n","signature":"304566626-export { ValueProducerDeclaration } from \"./in-js\";\nimport { OnValue } from \"@common\";\nexport interface ValueProducerFromTs {\n    onValue: OnValue;\n}\n","impliedFormat":1}],"root":[3,4],"options":{"composite":true,"module":199,"strict":true},"referencedMap":[[3,1],[4,2]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

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
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
  "size": 1395
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
{"root":["./index.ts"],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./index.ts"
  ],
  "version": "FakeTSVersion",
  "size": 49
}


exitCode:: ExitStatus.Success
