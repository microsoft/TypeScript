Input::
//// [/lib/lib.d.ts]
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

//// [/src/animals/animal.ts]
export type Size = "small" | "medium" | "large";
export default interface Animal {
    size: Size;
}


//// [/src/animals/dog.ts]
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



//// [/src/animals/index.ts]
import Animal from './animal';

export default Animal;
import { createDog, Dog } from './dog';
export { createDog, Dog };


//// [/src/animals/tsconfig.json]
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


//// [/src/core/tsconfig.json]
{
  "extends": "../tsconfig-base.json",
  "compilerOptions": {
    "outDir": "../lib/core",
    "rootDir": "."
  }
}

//// [/src/core/utilities.ts]
import * as A from '../animals';

export function makeRandomName() {
    return "Bob!?! ";
}

export function lastElementOf<T>(arr: T[]): T | undefined {
    if (arr.length === 0) return undefined;
    return arr[arr.length - 1];
}



//// [/src/tsconfig-base.json]
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

//// [/src/tsconfig.json]
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

//// [/src/zoo/tsconfig.json]
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

//// [/src/zoo/zoo.ts]




Output::
/lib/tsc --b /src/tsconfig.json --verbose
[[90m12:00:00 AM[0m] Projects in this build: 
    * src/core/tsconfig.json
    * src/animals/tsconfig.json
    * src/zoo/tsconfig.json
    * src/tsconfig.json

[[90m12:00:00 AM[0m] Project 'src/core/tsconfig.json' is out of date because output file 'src/lib/core/utilities.js' does not exist

[[90m12:00:00 AM[0m] Building project '/src/core/tsconfig.json'...

[96msrc/animals/index.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS6059: [0mFile '/src/animals/animal.ts' is not under 'rootDir' '/src/core'. 'rootDir' is expected to contain all source files.

[7m1[0m import Animal from './animal';
[7m [0m [91m                   ~~~~~~~~~~[0m

[96msrc/animals/index.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS6307: [0mFile '/src/animals/animal.ts' is not listed within the file list of project '/src/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import Animal from './animal';
[7m [0m [91m                   ~~~~~~~~~~[0m

[96msrc/animals/index.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS6059: [0mFile '/src/animals/dog.ts' is not under 'rootDir' '/src/core'. 'rootDir' is expected to contain all source files.

[7m4[0m import { createDog, Dog } from './dog';
[7m [0m [91m                               ~~~~~~~[0m

[96msrc/animals/index.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS6307: [0mFile '/src/animals/dog.ts' is not listed within the file list of project '/src/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m4[0m import { createDog, Dog } from './dog';
[7m [0m [91m                               ~~~~~~~[0m

[96msrc/core/utilities.ts[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS6133: [0m'A' is declared but its value is never read.

[7m1[0m import * as A from '../animals';
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/core/utilities.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS6059: [0mFile '/src/animals/index.ts' is not under 'rootDir' '/src/core'. 'rootDir' is expected to contain all source files.
  The file is in the program because:
    Imported via '../animals' from file '/src/core/utilities.ts'
    Imported via '.' from file '/src/animals/dog.ts'

[7m1[0m import * as A from '../animals';
[7m [0m [91m                   ~~~~~~~~~~~~[0m

  [96msrc/animals/dog.ts[0m:[93m1[0m:[93m20[0m
    [7m1[0m import Animal from '.';
    [7m [0m [96m                   ~~~[0m
    File is included via import here.

[96msrc/core/utilities.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS6307: [0mFile '/src/animals/index.ts' is not listed within the file list of project '/src/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.
  The file is in the program because:
    Imported via '../animals' from file '/src/core/utilities.ts'
    Imported via '.' from file '/src/animals/dog.ts'

[7m1[0m import * as A from '../animals';
[7m [0m [91m                   ~~~~~~~~~~~~[0m

  [96msrc/animals/dog.ts[0m:[93m1[0m:[93m20[0m
    [7m1[0m import Animal from '.';
    [7m [0m [96m                   ~~~[0m
    File is included via import here.

[[90m12:00:00 AM[0m] Project 'src/animals/tsconfig.json' can't be built because its dependency 'src/core' has errors

[[90m12:00:00 AM[0m] Skipping build of project '/src/animals/tsconfig.json' because its dependency '/src/core' has errors

[[90m12:00:00 AM[0m] Project 'src/zoo/tsconfig.json' can't be built because its dependency 'src/animals' was not built

[[90m12:00:00 AM[0m] Skipping build of project '/src/zoo/tsconfig.json' because its dependency '/src/animals' was not built


Found 7 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/lib/core/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../lib/lib.d.ts","../../animals/animal.ts","../../animals/dog.ts","../../animals/index.ts","../../core/utilities.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-14984181202-export type Size = \"small\" | \"medium\" | \"large\";\r\nexport default interface Animal {\r\n    size: Size;\r\n}\r\n","-10991948013-import Animal from '.';\r\nimport { makeRandomName } from '../core/utilities';\r\n\r\nexport interface Dog extends Animal {\r\n    woof(): void;\r\n    name: string;\r\n}\r\n\r\nexport function createDog(): Dog {\r\n    return ({\r\n        size: \"medium\",\r\n        woof: function(this: Dog) {\r\n            console.log(`${this.name} says \"Woof\"!`);\r\n        },\r\n        name: makeRandomName()\r\n    });\r\n}\r\n\r\n","-5382672599-import Animal from './animal';\r\n\r\nexport default Animal;\r\nimport { createDog, Dog } from './dog';\r\nexport { createDog, Dog };\r\n","-15713992787-import * as A from '../animals';\n\r\nexport function makeRandomName() {\r\n    return \"Bob!?! \";\r\n}\r\n\r\nexport function lastElementOf<T>(arr: T[]): T | undefined {\r\n    if (arr.length === 0) return undefined;\r\n    return arr[arr.length - 1];\r\n}\r\n\r\n"],"options":{"composite":true,"declaration":true,"module":1,"noFallthroughCasesInSwitch":true,"noImplicitReturns":true,"noUnusedLocals":true,"noUnusedParameters":true,"outDir":"./","rootDir":"../../core","strict":true,"target":1},"fileIdsList":[[4,5],[2,3],[4]],"referencedMap":[[3,1],[4,2],[5,3]],"exportedModulesMap":[[3,1],[4,2],[5,3]],"semanticDiagnosticsPerFile":[1,2,3,4,[5,[{"file":"../../core/utilities.ts","start":0,"length":32,"messageText":"'A' is declared but its value is never read.","category":1,"code":6133,"reportsUnnecessary":true}]]],"affectedFilesPendingEmit":[[2,1],[3,1],[4,1],[5,1]]},"version":"FakeTSVersion"}

//// [/src/lib/core/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
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
      "../../../lib/lib.d.ts": {
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
      "../../../lib/lib.d.ts",
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
  "size": 2287
}

