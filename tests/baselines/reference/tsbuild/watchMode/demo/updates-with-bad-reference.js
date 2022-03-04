Input::
//// [/user/username/projects/demo/core/tsconfig.json]
{
  "extends": "../tsconfig-base.json",
  "compilerOptions": {
    "outDir": "../lib/core",
    "rootDir": "."
  }
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



//// [/user/username/projects/demo/animals/tsconfig.json]
{
  "extends": "../tsconfig-base.json",
  "compilerOptions": {
    "outDir": "../lib/animals",
    "rootDir": ".",
  },
  "references": [
    { "path": "../core" }
  ]
}


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
            console.log(`${this.name} says "Woof"!`);
        },
        name: makeRandomName()
    });
}



//// [/user/username/projects/demo/animals/index.ts]
import Animal from './animal';

export default Animal;
import { createDog, Dog } from './dog';
export { createDog, Dog };


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

//// [/user/username/projects/demo/zoo/zoo.ts]
import { Dog, createDog } from '../animals/index';

export function createZoo(): Array<Dog> {
    return [
        createDog()
    ];
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
[[90m12:00:46 AM[0m] Starting compilation in watch mode...

[[90m12:00:47 AM[0m] Projects in this build: 
    * core/tsconfig.json
    * animals/tsconfig.json
    * zoo/tsconfig.json
    * tsconfig.json

[[90m12:00:48 AM[0m] Project 'core/tsconfig.json' is out of date because output file 'lib/core/utilities.js' does not exist

[[90m12:00:49 AM[0m] Building project '/user/username/projects/demo/core/tsconfig.json'...

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

[[90m12:00:59 AM[0m] Project 'animals/tsconfig.json' can't be built because its dependency 'core' has errors

[[90m12:01:00 AM[0m] Skipping build of project '/user/username/projects/demo/animals/tsconfig.json' because its dependency '/user/username/projects/demo/core' has errors

[[90m12:01:01 AM[0m] Project 'zoo/tsconfig.json' can't be built because its dependency 'animals' was not built

[[90m12:01:02 AM[0m] Skipping build of project '/user/username/projects/demo/zoo/tsconfig.json' because its dependency '/user/username/projects/demo/animals' was not built

[[90m12:01:03 AM[0m] Found 7 errors. Watching for file changes.



Program root files: ["/user/username/projects/demo/core/utilities.ts"]
Program options: {"declaration":true,"target":1,"module":1,"strict":true,"noUnusedLocals":true,"noUnusedParameters":true,"noImplicitReturns":true,"noFallthroughCasesInSwitch":true,"composite":true,"outDir":"/user/username/projects/demo/lib/core","rootDir":"/user/username/projects/demo/core","watch":true,"configFilePath":"/user/username/projects/demo/core/tsconfig.json"}
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

WatchedFiles::
/user/username/projects/demo/core/tsconfig.json:
  {"fileName":"/user/username/projects/demo/core/tsconfig.json","pollingInterval":250}
/user/username/projects/demo/tsconfig-base.json:
  {"fileName":"/user/username/projects/demo/tsconfig-base.json","pollingInterval":250}
/user/username/projects/demo/core/utilities.ts:
  {"fileName":"/user/username/projects/demo/core/utilities.ts","pollingInterval":250}
/user/username/projects/demo/animals/package.json:
  {"fileName":"/user/username/projects/demo/animals/package.json","pollingInterval":250}
/user/username/projects/demo/animals/tsconfig.json:
  {"fileName":"/user/username/projects/demo/animals/tsconfig.json","pollingInterval":250}
/user/username/projects/demo/animals/animal.ts:
  {"fileName":"/user/username/projects/demo/animals/animal.ts","pollingInterval":250}
/user/username/projects/demo/animals/dog.ts:
  {"fileName":"/user/username/projects/demo/animals/dog.ts","pollingInterval":250}
/user/username/projects/demo/animals/index.ts:
  {"fileName":"/user/username/projects/demo/animals/index.ts","pollingInterval":250}
/user/username/projects/demo/zoo/tsconfig.json:
  {"fileName":"/user/username/projects/demo/zoo/tsconfig.json","pollingInterval":250}
/user/username/projects/demo/zoo/zoo.ts:
  {"fileName":"/user/username/projects/demo/zoo/zoo.ts","pollingInterval":250}
/user/username/projects/demo/tsconfig.json:
  {"fileName":"/user/username/projects/demo/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/demo/core:
  {"directoryName":"/user/username/projects/demo/core","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/demo/animals:
  {"directoryName":"/user/username/projects/demo/animals","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/demo/zoo:
  {"directoryName":"/user/username/projects/demo/zoo","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/demo/lib/core/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../a/lib/lib.d.ts","../../animals/animal.ts","../../animals/dog.ts","../../animals/index.ts","../../core/utilities.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-14984181202-export type Size = \"small\" | \"medium\" | \"large\";\r\nexport default interface Animal {\r\n    size: Size;\r\n}\r\n","-10991948013-import Animal from '.';\r\nimport { makeRandomName } from '../core/utilities';\r\n\r\nexport interface Dog extends Animal {\r\n    woof(): void;\r\n    name: string;\r\n}\r\n\r\nexport function createDog(): Dog {\r\n    return ({\r\n        size: \"medium\",\r\n        woof: function(this: Dog) {\r\n            console.log(`${this.name} says \"Woof\"!`);\r\n        },\r\n        name: makeRandomName()\r\n    });\r\n}\r\n\r\n","-5382672599-import Animal from './animal';\r\n\r\nexport default Animal;\r\nimport { createDog, Dog } from './dog';\r\nexport { createDog, Dog };\r\n","-15713992787-import * as A from '../animals';\n\r\nexport function makeRandomName() {\r\n    return \"Bob!?! \";\r\n}\r\n\r\nexport function lastElementOf<T>(arr: T[]): T | undefined {\r\n    if (arr.length === 0) return undefined;\r\n    return arr[arr.length - 1];\r\n}\r\n\r\n"],"options":{"composite":true,"declaration":true,"module":1,"noFallthroughCasesInSwitch":true,"noImplicitReturns":true,"noUnusedLocals":true,"noUnusedParameters":true,"outDir":"./","rootDir":"../../core","strict":true,"target":1},"fileIdsList":[[4,5],[2,3],[4]],"referencedMap":[[3,1],[4,2],[5,3]],"exportedModulesMap":[[3,1],[4,2],[5,3]],"semanticDiagnosticsPerFile":[1,2,3,4,[5,[{"file":"../../core/utilities.ts","start":0,"length":32,"messageText":"'A' is declared but its value is never read.","category":1,"code":6133,"reportsUnnecessary":true}]]],"affectedFilesPendingEmit":[[2,1],[3,1],[4,1],[5,1]]},"version":"FakeTSVersion"}

//// [/user/username/projects/demo/lib/core/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../a/lib/lib.d.ts",
      "../../animals/animal.ts",
      "../../animals/dog.ts",
      "../../animals/index.ts",
      "../../core/utilities.ts"
    ],
    "fileNamesList": [
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
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../../animals/animal.ts": {
        "version": "-14984181202-export type Size = \"small\" | \"medium\" | \"large\";\r\nexport default interface Animal {\r\n    size: Size;\r\n}\r\n",
        "signature": "-14984181202-export type Size = \"small\" | \"medium\" | \"large\";\r\nexport default interface Animal {\r\n    size: Size;\r\n}\r\n"
      },
      "../../animals/dog.ts": {
        "version": "-10991948013-import Animal from '.';\r\nimport { makeRandomName } from '../core/utilities';\r\n\r\nexport interface Dog extends Animal {\r\n    woof(): void;\r\n    name: string;\r\n}\r\n\r\nexport function createDog(): Dog {\r\n    return ({\r\n        size: \"medium\",\r\n        woof: function(this: Dog) {\r\n            console.log(`${this.name} says \"Woof\"!`);\r\n        },\r\n        name: makeRandomName()\r\n    });\r\n}\r\n\r\n",
        "signature": "-10991948013-import Animal from '.';\r\nimport { makeRandomName } from '../core/utilities';\r\n\r\nexport interface Dog extends Animal {\r\n    woof(): void;\r\n    name: string;\r\n}\r\n\r\nexport function createDog(): Dog {\r\n    return ({\r\n        size: \"medium\",\r\n        woof: function(this: Dog) {\r\n            console.log(`${this.name} says \"Woof\"!`);\r\n        },\r\n        name: makeRandomName()\r\n    });\r\n}\r\n\r\n"
      },
      "../../animals/index.ts": {
        "version": "-5382672599-import Animal from './animal';\r\n\r\nexport default Animal;\r\nimport { createDog, Dog } from './dog';\r\nexport { createDog, Dog };\r\n",
        "signature": "-5382672599-import Animal from './animal';\r\n\r\nexport default Animal;\r\nimport { createDog, Dog } from './dog';\r\nexport { createDog, Dog };\r\n"
      },
      "../../core/utilities.ts": {
        "version": "-15713992787-import * as A from '../animals';\n\r\nexport function makeRandomName() {\r\n    return \"Bob!?! \";\r\n}\r\n\r\nexport function lastElementOf<T>(arr: T[]): T | undefined {\r\n    if (arr.length === 0) return undefined;\r\n    return arr[arr.length - 1];\r\n}\r\n\r\n",
        "signature": "-15713992787-import * as A from '../animals';\n\r\nexport function makeRandomName() {\r\n    return \"Bob!?! \";\r\n}\r\n\r\nexport function lastElementOf<T>(arr: T[]): T | undefined {\r\n    if (arr.length === 0) return undefined;\r\n    return arr[arr.length - 1];\r\n}\r\n\r\n"
      }
    },
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
    "exportedModulesMap": {
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
      "../../../../../../a/lib/lib.d.ts",
      "../../animals/animal.ts",
      "../../animals/dog.ts",
      "../../animals/index.ts",
      [
        "../../core/utilities.ts",
        [
          {
            "file": "../../core/utilities.ts",
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
        "Full"
      ],
      [
        "../../animals/dog.ts",
        "Full"
      ],
      [
        "../../animals/index.ts",
        "Full"
      ],
      [
        "../../core/utilities.ts",
        "Full"
      ]
    ]
  },
  "version": "FakeTSVersion",
  "size": 2298
}


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




Output::
>> Screen clear
[[90m12:01:07 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:08 AM[0m] Project 'core/tsconfig.json' is out of date because output file 'lib/core/utilities.js' does not exist

[[90m12:01:09 AM[0m] Building project '/user/username/projects/demo/core/tsconfig.json'...

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

[[90m12:01:16 AM[0m] Found 7 errors. Watching for file changes.



Program root files: ["/user/username/projects/demo/core/utilities.ts"]
Program options: {"declaration":true,"target":1,"module":1,"strict":true,"noUnusedLocals":true,"noUnusedParameters":true,"noImplicitReturns":true,"noFallthroughCasesInSwitch":true,"composite":true,"outDir":"/user/username/projects/demo/lib/core","rootDir":"/user/username/projects/demo/core","watch":true,"configFilePath":"/user/username/projects/demo/core/tsconfig.json"}
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

WatchedFiles::
/user/username/projects/demo/core/tsconfig.json:
  {"fileName":"/user/username/projects/demo/core/tsconfig.json","pollingInterval":250}
/user/username/projects/demo/tsconfig-base.json:
  {"fileName":"/user/username/projects/demo/tsconfig-base.json","pollingInterval":250}
/user/username/projects/demo/core/utilities.ts:
  {"fileName":"/user/username/projects/demo/core/utilities.ts","pollingInterval":250}
/user/username/projects/demo/animals/package.json:
  {"fileName":"/user/username/projects/demo/animals/package.json","pollingInterval":250}
/user/username/projects/demo/animals/tsconfig.json:
  {"fileName":"/user/username/projects/demo/animals/tsconfig.json","pollingInterval":250}
/user/username/projects/demo/animals/animal.ts:
  {"fileName":"/user/username/projects/demo/animals/animal.ts","pollingInterval":250}
/user/username/projects/demo/animals/dog.ts:
  {"fileName":"/user/username/projects/demo/animals/dog.ts","pollingInterval":250}
/user/username/projects/demo/animals/index.ts:
  {"fileName":"/user/username/projects/demo/animals/index.ts","pollingInterval":250}
/user/username/projects/demo/zoo/tsconfig.json:
  {"fileName":"/user/username/projects/demo/zoo/tsconfig.json","pollingInterval":250}
/user/username/projects/demo/zoo/zoo.ts:
  {"fileName":"/user/username/projects/demo/zoo/zoo.ts","pollingInterval":250}
/user/username/projects/demo/tsconfig.json:
  {"fileName":"/user/username/projects/demo/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/demo/core:
  {"directoryName":"/user/username/projects/demo/core","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/demo/animals:
  {"directoryName":"/user/username/projects/demo/animals","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/demo/zoo:
  {"directoryName":"/user/username/projects/demo/zoo","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/demo/lib/core/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../a/lib/lib.d.ts","../../animals/animal.ts","../../animals/dog.ts","../../animals/index.ts","../../core/utilities.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-14984181202-export type Size = \"small\" | \"medium\" | \"large\";\r\nexport default interface Animal {\r\n    size: Size;\r\n}\r\n",{"version":"-10991948013-import Animal from '.';\r\nimport { makeRandomName } from '../core/utilities';\r\n\r\nexport interface Dog extends Animal {\r\n    woof(): void;\r\n    name: string;\r\n}\r\n\r\nexport function createDog(): Dog {\r\n    return ({\r\n        size: \"medium\",\r\n        woof: function(this: Dog) {\r\n            console.log(`${this.name} says \"Woof\"!`);\r\n        },\r\n        name: makeRandomName()\r\n    });\r\n}\r\n\r\n","signature":"6032048049-import Animal from '.';\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\nexport declare function createDog(): Dog;\n"},{"version":"-5382672599-import Animal from './animal';\r\n\r\nexport default Animal;\r\nimport { createDog, Dog } from './dog';\r\nexport { createDog, Dog };\r\n","signature":"1096904574-import Animal from './animal';\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n"},{"version":"-10926881769-\nimport * as A from '../animals';\n\r\nexport function makeRandomName() {\r\n    return \"Bob!?! \";\r\n}\r\n\r\nexport function lastElementOf<T>(arr: T[]): T | undefined {\r\n    if (arr.length === 0) return undefined;\r\n    return arr[arr.length - 1];\r\n}\r\n\r\n","signature":"-11345568166-export declare function makeRandomName(): string;\nexport declare function lastElementOf<T>(arr: T[]): T | undefined;\n"}],"options":{"composite":true,"declaration":true,"module":1,"noFallthroughCasesInSwitch":true,"noImplicitReturns":true,"noUnusedLocals":true,"noUnusedParameters":true,"outDir":"./","rootDir":"../../core","strict":true,"target":1},"fileIdsList":[[4,5],[2,3],[4]],"referencedMap":[[3,1],[4,2],[5,3]],"exportedModulesMap":[[3,3],[4,2]],"semanticDiagnosticsPerFile":[1,2,3,4,[5,[{"file":"../../core/utilities.ts","start":1,"length":32,"messageText":"'A' is declared but its value is never read.","category":1,"code":6133,"reportsUnnecessary":true}]]],"affectedFilesPendingEmit":[[2,1],[3,1],[4,1],[5,1]]},"version":"FakeTSVersion"}

//// [/user/username/projects/demo/lib/core/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../a/lib/lib.d.ts",
      "../../animals/animal.ts",
      "../../animals/dog.ts",
      "../../animals/index.ts",
      "../../core/utilities.ts"
    ],
    "fileNamesList": [
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
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../../animals/animal.ts": {
        "version": "-14984181202-export type Size = \"small\" | \"medium\" | \"large\";\r\nexport default interface Animal {\r\n    size: Size;\r\n}\r\n",
        "signature": "-14984181202-export type Size = \"small\" | \"medium\" | \"large\";\r\nexport default interface Animal {\r\n    size: Size;\r\n}\r\n"
      },
      "../../animals/dog.ts": {
        "version": "-10991948013-import Animal from '.';\r\nimport { makeRandomName } from '../core/utilities';\r\n\r\nexport interface Dog extends Animal {\r\n    woof(): void;\r\n    name: string;\r\n}\r\n\r\nexport function createDog(): Dog {\r\n    return ({\r\n        size: \"medium\",\r\n        woof: function(this: Dog) {\r\n            console.log(`${this.name} says \"Woof\"!`);\r\n        },\r\n        name: makeRandomName()\r\n    });\r\n}\r\n\r\n",
        "signature": "6032048049-import Animal from '.';\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\nexport declare function createDog(): Dog;\n"
      },
      "../../animals/index.ts": {
        "version": "-5382672599-import Animal from './animal';\r\n\r\nexport default Animal;\r\nimport { createDog, Dog } from './dog';\r\nexport { createDog, Dog };\r\n",
        "signature": "1096904574-import Animal from './animal';\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n"
      },
      "../../core/utilities.ts": {
        "version": "-10926881769-\nimport * as A from '../animals';\n\r\nexport function makeRandomName() {\r\n    return \"Bob!?! \";\r\n}\r\n\r\nexport function lastElementOf<T>(arr: T[]): T | undefined {\r\n    if (arr.length === 0) return undefined;\r\n    return arr[arr.length - 1];\r\n}\r\n\r\n",
        "signature": "-11345568166-export declare function makeRandomName(): string;\nexport declare function lastElementOf<T>(arr: T[]): T | undefined;\n"
      }
    },
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
    "exportedModulesMap": {
      "../../animals/dog.ts": [
        "../../animals/index.ts"
      ],
      "../../animals/index.ts": [
        "../../animals/animal.ts",
        "../../animals/dog.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../../../a/lib/lib.d.ts",
      "../../animals/animal.ts",
      "../../animals/dog.ts",
      "../../animals/index.ts",
      [
        "../../core/utilities.ts",
        [
          {
            "file": "../../core/utilities.ts",
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
        "Full"
      ],
      [
        "../../animals/dog.ts",
        "Full"
      ],
      [
        "../../animals/index.ts",
        "Full"
      ],
      [
        "../../core/utilities.ts",
        "Full"
      ]
    ]
  },
  "version": "FakeTSVersion",
  "size": 2802
}

