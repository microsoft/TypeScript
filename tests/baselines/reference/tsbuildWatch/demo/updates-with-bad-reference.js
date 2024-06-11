currentDirectory:: /user/username/projects/demo useCaseSensitiveFileNames: false
Input::
//// [/user/username/projects/demo/animals/animal.ts]
export type Size = "small" | "medium" | "large";
export default interface Animal {
    size: Size;
}


//// [/user/username/projects/demo/animals/dog.ts]
import Animal from '.';
import { makeRandomName } from '../core/utilities';

export interface Dog extends Animal {
    woof(): void;
    name: string;
}

export function createDog(): Dog {
    return ({
        size: "medium",
        woof: function(this: Dog) {
            console.log(`${ this.name } says "Woof"!`);
        },
        name: makeRandomName()
    });
}


//// [/user/username/projects/demo/animals/index.ts]
import Animal from './animal';

export default Animal;
import { createDog, Dog } from './dog';
export { createDog, Dog };


//// [/user/username/projects/demo/animals/tsconfig.json]
{
  "extends": "../tsconfig-base.json",
  "compilerOptions": {
    "outDir": "../lib/animals",
    "rootDir": "."
  },
  "references": [
    {
      "path": "../core"
    }
  ]
}

//// [/user/username/projects/demo/core/utilities.ts]
import * as A from '../animals';
export function makeRandomName() {
    return "Bob!?! ";
}

export function lastElementOf<T>(arr: T[]): T | undefined {
    if (arr.length === 0) return undefined;
    return arr[arr.length - 1];
}


//// [/user/username/projects/demo/core/tsconfig.json]
{
  "extends": "../tsconfig-base.json",
  "compilerOptions": {
    "outDir": "../lib/core",
    "rootDir": "."
  }
}

//// [/user/username/projects/demo/zoo/zoo.ts]
import { Dog, createDog } from '../animals/index';

export function createZoo(): Array<Dog> {
    return [
        createDog()
    ];
}


//// [/user/username/projects/demo/zoo/tsconfig.json]
{
  "extends": "../tsconfig-base.json",
  "compilerOptions": {
    "outDir": "../lib/zoo",
    "rootDir": "."
  },
  "references": [
    {
      "path": "../animals"
    }
  ]
}

//// [/user/username/projects/demo/tsconfig-base.json]
{
  "compilerOptions": {
    "declaration": true,
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "composite": true
  }
}

//// [/user/username/projects/demo/tsconfig.json]
{
  "files": [],
  "references": [
    {
      "path": "./core"
    },
    {
      "path": "./animals"
    },
    {
      "path": "./zoo"
    }
  ]
}

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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


/a/lib/tsc.js -b -w -verbose
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * core/tsconfig.json
    * animals/tsconfig.json
    * zoo/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'core/tsconfig.json' is out of date because output file 'lib/core/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/demo/core/tsconfig.json'...

[96manimals/index.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS6059: [0mFile '/user/username/projects/demo/animals/animal.ts' is not under 'rootDir' '/user/username/projects/demo/core'. 'rootDir' is expected to contain all source files.

[7m1[0m import Animal from './animal';
[7m [0m [91m                   ~~~~~~~~~~[0m

[96manimals/index.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS6307: [0mFile '/user/username/projects/demo/animals/animal.ts' is not listed within the file list of project '/user/username/projects/demo/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import Animal from './animal';
[7m [0m [91m                   ~~~~~~~~~~[0m

[96manimals/index.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS6059: [0mFile '/user/username/projects/demo/animals/dog.ts' is not under 'rootDir' '/user/username/projects/demo/core'. 'rootDir' is expected to contain all source files.

[7m4[0m import { createDog, Dog } from './dog';
[7m [0m [91m                               ~~~~~~~[0m

[96manimals/index.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS6307: [0mFile '/user/username/projects/demo/animals/dog.ts' is not listed within the file list of project '/user/username/projects/demo/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m4[0m import { createDog, Dog } from './dog';
[7m [0m [91m                               ~~~~~~~[0m

[96mcore/utilities.ts[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS6133: [0m'A' is declared but its value is never read.

[7m1[0m import * as A from '../animals';
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mcore/utilities.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS6059: [0mFile '/user/username/projects/demo/animals/index.ts' is not under 'rootDir' '/user/username/projects/demo/core'. 'rootDir' is expected to contain all source files.
  The file is in the program because:
    Imported via '../animals' from file '/user/username/projects/demo/core/utilities.ts'
    Imported via '.' from file '/user/username/projects/demo/animals/dog.ts'

[7m1[0m import * as A from '../animals';
[7m [0m [91m                   ~~~~~~~~~~~~[0m

  [96manimals/dog.ts[0m:[93m1[0m:[93m20[0m
    [7m1[0m import Animal from '.';
    [7m [0m [96m                   ~~~[0m
    File is included via import here.

[96mcore/utilities.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS6307: [0mFile '/user/username/projects/demo/animals/index.ts' is not listed within the file list of project '/user/username/projects/demo/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.
  The file is in the program because:
    Imported via '../animals' from file '/user/username/projects/demo/core/utilities.ts'
    Imported via '.' from file '/user/username/projects/demo/animals/dog.ts'

[7m1[0m import * as A from '../animals';
[7m [0m [91m                   ~~~~~~~~~~~~[0m

  [96manimals/dog.ts[0m:[93m1[0m:[93m20[0m
    [7m1[0m import Animal from '.';
    [7m [0m [96m                   ~~~[0m
    File is included via import here.

[[90mHH:MM:SS AM[0m] Project 'animals/tsconfig.json' can't be built because its dependency 'core' has errors

[[90mHH:MM:SS AM[0m] Skipping build of project '/user/username/projects/demo/animals/tsconfig.json' because its dependency '/user/username/projects/demo/core' has errors

[[90mHH:MM:SS AM[0m] Project 'zoo/tsconfig.json' can't be built because its dependency 'animals' was not built

[[90mHH:MM:SS AM[0m] Skipping build of project '/user/username/projects/demo/zoo/tsconfig.json' because its dependency '/user/username/projects/demo/animals' was not built

[[90mHH:MM:SS AM[0m] Found 7 errors. Watching for file changes.



//// [/user/username/projects/demo/lib/core/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../../a/lib/lib.d.ts","../../animals/animal.ts","../../animals/dog.ts","../../animals/index.ts","../../core/utilities.ts"],"fileIdsList":[[4,5],[2,3],[4]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-9289341318-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n","impliedFormat":1},{"version":"-18870194049-import Animal from '.';\nimport { makeRandomName } from '../core/utilities';\n\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\n\nexport function createDog(): Dog {\n    return ({\n        size: \"medium\",\n        woof: function(this: Dog) {\n            console.log(`${ this.name } says \"Woof\"!`);\n        },\n        name: makeRandomName()\n    });\n}\n","impliedFormat":1},{"version":"-7220553464-import Animal from './animal';\n\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n","impliedFormat":1},{"version":"-22163106409-import * as A from '../animals';\nexport function makeRandomName() {\n    return \"Bob!?! \";\n}\n\nexport function lastElementOf<T>(arr: T[]): T | undefined {\n    if (arr.length === 0) return undefined;\n    return arr[arr.length - 1];\n}\n","impliedFormat":1}],"root":[5],"options":{"composite":true,"declaration":true,"module":1,"noFallthroughCasesInSwitch":true,"noImplicitReturns":true,"noUnusedLocals":true,"noUnusedParameters":true,"outDir":"./","rootDir":"../../core","strict":true,"target":1},"referencedMap":[[3,1],[4,2],[5,3]],"semanticDiagnosticsPerFile":[[5,[{"start":0,"length":32,"messageText":"'A' is declared but its value is never read.","category":1,"code":6133,"reportsUnnecessary":true}]]],"affectedFilesPendingEmit":[2,3,4,5],"emitSignatures":[2,3,4,5],"version":"FakeTSVersion"}

//// [/user/username/projects/demo/lib/core/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../../a/lib/lib.d.ts",
    "../../animals/animal.ts",
    "../../animals/dog.ts",
    "../../animals/index.ts",
    "../../core/utilities.ts"
  ],
  "fileIdsList": [
    [
      "../../animals/index.ts",
      "../../core/utilities.ts"
    ],
    [
      "../../animals/animal.ts",
      "../../animals/dog.ts"
    ],
    [
      "../../animals/index.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../../a/lib/lib.d.ts": {
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
    "../../animals/animal.ts": {
      "original": {
        "version": "-9289341318-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n",
        "impliedFormat": 1
      },
      "version": "-9289341318-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n",
      "signature": "-9289341318-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n",
      "impliedFormat": "commonjs"
    },
    "../../animals/dog.ts": {
      "original": {
        "version": "-18870194049-import Animal from '.';\nimport { makeRandomName } from '../core/utilities';\n\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\n\nexport function createDog(): Dog {\n    return ({\n        size: \"medium\",\n        woof: function(this: Dog) {\n            console.log(`${ this.name } says \"Woof\"!`);\n        },\n        name: makeRandomName()\n    });\n}\n",
        "impliedFormat": 1
      },
      "version": "-18870194049-import Animal from '.';\nimport { makeRandomName } from '../core/utilities';\n\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\n\nexport function createDog(): Dog {\n    return ({\n        size: \"medium\",\n        woof: function(this: Dog) {\n            console.log(`${ this.name } says \"Woof\"!`);\n        },\n        name: makeRandomName()\n    });\n}\n",
      "signature": "-18870194049-import Animal from '.';\nimport { makeRandomName } from '../core/utilities';\n\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\n\nexport function createDog(): Dog {\n    return ({\n        size: \"medium\",\n        woof: function(this: Dog) {\n            console.log(`${ this.name } says \"Woof\"!`);\n        },\n        name: makeRandomName()\n    });\n}\n",
      "impliedFormat": "commonjs"
    },
    "../../animals/index.ts": {
      "original": {
        "version": "-7220553464-import Animal from './animal';\n\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n",
        "impliedFormat": 1
      },
      "version": "-7220553464-import Animal from './animal';\n\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n",
      "signature": "-7220553464-import Animal from './animal';\n\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n",
      "impliedFormat": "commonjs"
    },
    "../../core/utilities.ts": {
      "original": {
        "version": "-22163106409-import * as A from '../animals';\nexport function makeRandomName() {\n    return \"Bob!?! \";\n}\n\nexport function lastElementOf<T>(arr: T[]): T | undefined {\n    if (arr.length === 0) return undefined;\n    return arr[arr.length - 1];\n}\n",
        "impliedFormat": 1
      },
      "version": "-22163106409-import * as A from '../animals';\nexport function makeRandomName() {\n    return \"Bob!?! \";\n}\n\nexport function lastElementOf<T>(arr: T[]): T | undefined {\n    if (arr.length === 0) return undefined;\n    return arr[arr.length - 1];\n}\n",
      "signature": "-22163106409-import * as A from '../animals';\nexport function makeRandomName() {\n    return \"Bob!?! \";\n}\n\nexport function lastElementOf<T>(arr: T[]): T | undefined {\n    if (arr.length === 0) return undefined;\n    return arr[arr.length - 1];\n}\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      5,
      "../../core/utilities.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "module": 1,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "outDir": "./",
    "rootDir": "../../core",
    "strict": true,
    "target": 1
  },
  "referencedMap": {
    "../../animals/dog.ts": [
      "../../animals/index.ts",
      "../../core/utilities.ts"
    ],
    "../../animals/index.ts": [
      "../../animals/animal.ts",
      "../../animals/dog.ts"
    ],
    "../../core/utilities.ts": [
      "../../animals/index.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../core/utilities.ts",
      [
        {
          "start": 0,
          "length": 32,
          "messageText": "'A' is declared but its value is never read.",
          "category": 1,
          "code": 6133,
          "reportsUnnecessary": true
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "../../animals/animal.ts",
      "Js | Dts"
    ],
    [
      "../../animals/dog.ts",
      "Js | Dts"
    ],
    [
      "../../animals/index.ts",
      "Js | Dts"
    ],
    [
      "../../core/utilities.ts",
      "Js | Dts"
    ]
  ],
  "emitSignatures": [
    "../../animals/animal.ts",
    "../../animals/dog.ts",
    "../../animals/index.ts",
    "../../core/utilities.ts"
  ],
  "version": "FakeTSVersion",
  "size": 2285
}


PolledWatches::
/a/lib/package.json: *new*
  {"pollingInterval":2000}
/a/package.json: *new*
  {"pollingInterval":2000}
/package.json: *new*
  {"pollingInterval":2000}
/user/package.json: *new*
  {"pollingInterval":2000}
/user/username/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/demo/animals/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/demo/core/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/demo/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/demo/animals/animal.ts: *new*
  {}
/user/username/projects/demo/animals/dog.ts: *new*
  {}
/user/username/projects/demo/animals/index.ts: *new*
  {}
/user/username/projects/demo/animals/tsconfig.json: *new*
  {}
/user/username/projects/demo/core/tsconfig.json: *new*
  {}
/user/username/projects/demo/core/utilities.ts: *new*
  {}
/user/username/projects/demo/tsconfig-base.json: *new*
  {}
/user/username/projects/demo/tsconfig.json: *new*
  {}
/user/username/projects/demo/zoo/tsconfig.json: *new*
  {}
/user/username/projects/demo/zoo/zoo.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/demo/animals: *new*
  {}
/user/username/projects/demo/core: *new*
  {}
/user/username/projects/demo/zoo: *new*
  {}

Program root files: [
  "/user/username/projects/demo/core/utilities.ts"
]
Program options: {
  "declaration": true,
  "target": 1,
  "module": 1,
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noImplicitReturns": true,
  "noFallthroughCasesInSwitch": true,
  "composite": true,
  "outDir": "/user/username/projects/demo/lib/core",
  "rootDir": "/user/username/projects/demo/core",
  "watch": true,
  "configFilePath": "/user/username/projects/demo/core/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/demo/animals/animal.ts
/user/username/projects/demo/animals/dog.ts
/user/username/projects/demo/animals/index.ts
/user/username/projects/demo/core/utilities.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/demo/animals/animal.ts
/user/username/projects/demo/animals/dog.ts
/user/username/projects/demo/animals/index.ts
/user/username/projects/demo/core/utilities.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/demo/animals/animal.ts (used version)
/user/username/projects/demo/animals/dog.ts (used version)
/user/username/projects/demo/animals/index.ts (used version)
/user/username/projects/demo/core/utilities.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Prepend a line

Input::
//// [/user/username/projects/demo/core/utilities.ts]

import * as A from '../animals';
export function makeRandomName() {
    return "Bob!?! ";
}

export function lastElementOf<T>(arr: T[]): T | undefined {
    if (arr.length === 0) return undefined;
    return arr[arr.length - 1];
}



Timeout callback:: count: 1
1: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
1: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'core/tsconfig.json' is out of date because buildinfo file 'lib/core/tsconfig.tsbuildinfo' indicates that some of the changes were not emitted

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/demo/core/tsconfig.json'...

[96manimals/index.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS6059: [0mFile '/user/username/projects/demo/animals/animal.ts' is not under 'rootDir' '/user/username/projects/demo/core'. 'rootDir' is expected to contain all source files.

[7m1[0m import Animal from './animal';
[7m [0m [91m                   ~~~~~~~~~~[0m

[96manimals/index.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS6307: [0mFile '/user/username/projects/demo/animals/animal.ts' is not listed within the file list of project '/user/username/projects/demo/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import Animal from './animal';
[7m [0m [91m                   ~~~~~~~~~~[0m

[96manimals/index.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS6059: [0mFile '/user/username/projects/demo/animals/dog.ts' is not under 'rootDir' '/user/username/projects/demo/core'. 'rootDir' is expected to contain all source files.

[7m4[0m import { createDog, Dog } from './dog';
[7m [0m [91m                               ~~~~~~~[0m

[96manimals/index.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS6307: [0mFile '/user/username/projects/demo/animals/dog.ts' is not listed within the file list of project '/user/username/projects/demo/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m4[0m import { createDog, Dog } from './dog';
[7m [0m [91m                               ~~~~~~~[0m

[96mcore/utilities.ts[0m:[93m2[0m:[93m1[0m - [91merror[0m[90m TS6133: [0m'A' is declared but its value is never read.

[7m2[0m import * as A from '../animals';
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mcore/utilities.ts[0m:[93m2[0m:[93m20[0m - [91merror[0m[90m TS6059: [0mFile '/user/username/projects/demo/animals/index.ts' is not under 'rootDir' '/user/username/projects/demo/core'. 'rootDir' is expected to contain all source files.
  The file is in the program because:
    Imported via '../animals' from file '/user/username/projects/demo/core/utilities.ts'
    Imported via '.' from file '/user/username/projects/demo/animals/dog.ts'

[7m2[0m import * as A from '../animals';
[7m [0m [91m                   ~~~~~~~~~~~~[0m

  [96manimals/dog.ts[0m:[93m1[0m:[93m20[0m
    [7m1[0m import Animal from '.';
    [7m [0m [96m                   ~~~[0m
    File is included via import here.

[96mcore/utilities.ts[0m:[93m2[0m:[93m20[0m - [91merror[0m[90m TS6307: [0mFile '/user/username/projects/demo/animals/index.ts' is not listed within the file list of project '/user/username/projects/demo/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.
  The file is in the program because:
    Imported via '../animals' from file '/user/username/projects/demo/core/utilities.ts'
    Imported via '.' from file '/user/username/projects/demo/animals/dog.ts'

[7m2[0m import * as A from '../animals';
[7m [0m [91m                   ~~~~~~~~~~~~[0m

  [96manimals/dog.ts[0m:[93m1[0m:[93m20[0m
    [7m1[0m import Animal from '.';
    [7m [0m [96m                   ~~~[0m
    File is included via import here.

[[90mHH:MM:SS AM[0m] Found 7 errors. Watching for file changes.



//// [/user/username/projects/demo/lib/core/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../../a/lib/lib.d.ts","../../animals/animal.ts","../../animals/dog.ts","../../animals/index.ts","../../core/utilities.ts"],"fileIdsList":[[4,5],[2,3],[4]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-9289341318-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n","impliedFormat":1},{"version":"-18870194049-import Animal from '.';\nimport { makeRandomName } from '../core/utilities';\n\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\n\nexport function createDog(): Dog {\n    return ({\n        size: \"medium\",\n        woof: function(this: Dog) {\n            console.log(`${ this.name } says \"Woof\"!`);\n        },\n        name: makeRandomName()\n    });\n}\n","signature":"6032048049-import Animal from '.';\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\nexport declare function createDog(): Dog;\n","impliedFormat":1},{"version":"-7220553464-import Animal from './animal';\n\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n","signature":"1096904574-import Animal from './animal';\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n","impliedFormat":1},{"version":"-11321611519-\nimport * as A from '../animals';\nexport function makeRandomName() {\n    return \"Bob!?! \";\n}\n\nexport function lastElementOf<T>(arr: T[]): T | undefined {\n    if (arr.length === 0) return undefined;\n    return arr[arr.length - 1];\n}\n","signature":"-11345568166-export declare function makeRandomName(): string;\nexport declare function lastElementOf<T>(arr: T[]): T | undefined;\n","impliedFormat":1}],"root":[5],"options":{"composite":true,"declaration":true,"module":1,"noFallthroughCasesInSwitch":true,"noImplicitReturns":true,"noUnusedLocals":true,"noUnusedParameters":true,"outDir":"./","rootDir":"../../core","strict":true,"target":1},"referencedMap":[[3,1],[4,2],[5,3]],"semanticDiagnosticsPerFile":[[5,[{"start":1,"length":32,"messageText":"'A' is declared but its value is never read.","category":1,"code":6133,"reportsUnnecessary":true}]]],"affectedFilesPendingEmit":[2,3,4,5],"emitSignatures":[2,3,4,5],"version":"FakeTSVersion"}

//// [/user/username/projects/demo/lib/core/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../../a/lib/lib.d.ts",
    "../../animals/animal.ts",
    "../../animals/dog.ts",
    "../../animals/index.ts",
    "../../core/utilities.ts"
  ],
  "fileIdsList": [
    [
      "../../animals/index.ts",
      "../../core/utilities.ts"
    ],
    [
      "../../animals/animal.ts",
      "../../animals/dog.ts"
    ],
    [
      "../../animals/index.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../../a/lib/lib.d.ts": {
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
    "../../animals/animal.ts": {
      "original": {
        "version": "-9289341318-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n",
        "impliedFormat": 1
      },
      "version": "-9289341318-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n",
      "signature": "-9289341318-export type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n",
      "impliedFormat": "commonjs"
    },
    "../../animals/dog.ts": {
      "original": {
        "version": "-18870194049-import Animal from '.';\nimport { makeRandomName } from '../core/utilities';\n\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\n\nexport function createDog(): Dog {\n    return ({\n        size: \"medium\",\n        woof: function(this: Dog) {\n            console.log(`${ this.name } says \"Woof\"!`);\n        },\n        name: makeRandomName()\n    });\n}\n",
        "signature": "6032048049-import Animal from '.';\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\nexport declare function createDog(): Dog;\n",
        "impliedFormat": 1
      },
      "version": "-18870194049-import Animal from '.';\nimport { makeRandomName } from '../core/utilities';\n\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\n\nexport function createDog(): Dog {\n    return ({\n        size: \"medium\",\n        woof: function(this: Dog) {\n            console.log(`${ this.name } says \"Woof\"!`);\n        },\n        name: makeRandomName()\n    });\n}\n",
      "signature": "6032048049-import Animal from '.';\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\nexport declare function createDog(): Dog;\n",
      "impliedFormat": "commonjs"
    },
    "../../animals/index.ts": {
      "original": {
        "version": "-7220553464-import Animal from './animal';\n\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n",
        "signature": "1096904574-import Animal from './animal';\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n",
        "impliedFormat": 1
      },
      "version": "-7220553464-import Animal from './animal';\n\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n",
      "signature": "1096904574-import Animal from './animal';\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n",
      "impliedFormat": "commonjs"
    },
    "../../core/utilities.ts": {
      "original": {
        "version": "-11321611519-\nimport * as A from '../animals';\nexport function makeRandomName() {\n    return \"Bob!?! \";\n}\n\nexport function lastElementOf<T>(arr: T[]): T | undefined {\n    if (arr.length === 0) return undefined;\n    return arr[arr.length - 1];\n}\n",
        "signature": "-11345568166-export declare function makeRandomName(): string;\nexport declare function lastElementOf<T>(arr: T[]): T | undefined;\n",
        "impliedFormat": 1
      },
      "version": "-11321611519-\nimport * as A from '../animals';\nexport function makeRandomName() {\n    return \"Bob!?! \";\n}\n\nexport function lastElementOf<T>(arr: T[]): T | undefined {\n    if (arr.length === 0) return undefined;\n    return arr[arr.length - 1];\n}\n",
      "signature": "-11345568166-export declare function makeRandomName(): string;\nexport declare function lastElementOf<T>(arr: T[]): T | undefined;\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      5,
      "../../core/utilities.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "module": 1,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "outDir": "./",
    "rootDir": "../../core",
    "strict": true,
    "target": 1
  },
  "referencedMap": {
    "../../animals/dog.ts": [
      "../../animals/index.ts",
      "../../core/utilities.ts"
    ],
    "../../animals/index.ts": [
      "../../animals/animal.ts",
      "../../animals/dog.ts"
    ],
    "../../core/utilities.ts": [
      "../../animals/index.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../core/utilities.ts",
      [
        {
          "start": 1,
          "length": 32,
          "messageText": "'A' is declared but its value is never read.",
          "category": 1,
          "code": 6133,
          "reportsUnnecessary": true
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "../../animals/animal.ts",
      "Js | Dts"
    ],
    [
      "../../animals/dog.ts",
      "Js | Dts"
    ],
    [
      "../../animals/index.ts",
      "Js | Dts"
    ],
    [
      "../../core/utilities.ts",
      "Js | Dts"
    ]
  ],
  "emitSignatures": [
    "../../animals/animal.ts",
    "../../animals/dog.ts",
    "../../animals/index.ts",
    "../../core/utilities.ts"
  ],
  "version": "FakeTSVersion",
  "size": 2759
}



Program root files: [
  "/user/username/projects/demo/core/utilities.ts"
]
Program options: {
  "declaration": true,
  "target": 1,
  "module": 1,
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noImplicitReturns": true,
  "noFallthroughCasesInSwitch": true,
  "composite": true,
  "outDir": "/user/username/projects/demo/lib/core",
  "rootDir": "/user/username/projects/demo/core",
  "watch": true,
  "configFilePath": "/user/username/projects/demo/core/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/demo/animals/animal.ts
/user/username/projects/demo/animals/dog.ts
/user/username/projects/demo/animals/index.ts
/user/username/projects/demo/core/utilities.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/demo/animals/dog.ts
/user/username/projects/demo/animals/index.ts
/user/username/projects/demo/core/utilities.ts

Shape signatures in builder refreshed for::
/user/username/projects/demo/core/utilities.ts (computed .d.ts)
/user/username/projects/demo/animals/dog.ts (computed .d.ts)
/user/username/projects/demo/animals/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
