Input::
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

//// [/user/username/projects/demo/core/utilities.ts]

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



/a/lib/tsc.js --w --p /user/username/projects/demo/animals/tsconfig.json
Output::
>> Screen clear
[[90m12:00:35 AM[0m] Starting compilation in watch mode...

[[90m12:00:55 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/demo/animals/animal.ts","/user/username/projects/demo/animals/dog.ts","/user/username/projects/demo/animals/index.ts"]
Program options: {"declaration":true,"target":1,"module":1,"strict":true,"noUnusedLocals":true,"noUnusedParameters":true,"noImplicitReturns":true,"noFallthroughCasesInSwitch":true,"composite":true,"outDir":"/user/username/projects/demo/lib/animals","rootDir":"/user/username/projects/demo/animals","configFilePath":"/user/username/projects/demo/animals/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/demo/animals/animal.ts
/user/username/projects/demo/animals/index.ts
/user/username/projects/demo/core/utilities.ts
/user/username/projects/demo/animals/dog.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/demo/animals/animal.ts
/user/username/projects/demo/animals/index.ts
/user/username/projects/demo/core/utilities.ts
/user/username/projects/demo/animals/dog.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/demo/animals/animal.ts (computed .d.ts during emit)
/user/username/projects/demo/animals/index.ts (computed .d.ts during emit)
/user/username/projects/demo/core/utilities.ts (used version)
/user/username/projects/demo/animals/dog.ts (computed .d.ts during emit)

WatchedFiles::
/user/username/projects/demo/animals/tsconfig.json:
  {"fileName":"/user/username/projects/demo/animals/tsconfig.json","pollingInterval":250}
/user/username/projects/demo/core/tsconfig.json:
  {"fileName":"/user/username/projects/demo/core/tsconfig.json","pollingInterval":250}
/user/username/projects/demo/tsconfig-base.json:
  {"fileName":"/user/username/projects/demo/tsconfig-base.json","pollingInterval":250}
/user/username/projects/demo/animals/animal.ts:
  {"fileName":"/user/username/projects/demo/animals/animal.ts","pollingInterval":250}
/user/username/projects/demo/animals/dog.ts:
  {"fileName":"/user/username/projects/demo/animals/dog.ts","pollingInterval":250}
/user/username/projects/demo/animals/index.ts:
  {"fileName":"/user/username/projects/demo/animals/index.ts","pollingInterval":250}
/user/username/projects/demo/core/utilities.ts:
  {"fileName":"/user/username/projects/demo/core/utilities.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/demo/animals/package.json:
  {"fileName":"/user/username/projects/demo/animals/package.json","pollingInterval":250}

FsWatches::
/user/username/projects/demo/animals:
  {"directoryName":"/user/username/projects/demo/animals","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

FsWatchesRecursive::
/user/username/projects/demo/core:
  {"directoryName":"/user/username/projects/demo/core","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/demo/animals/node_modules/@types:
  {"directoryName":"/user/username/projects/demo/animals/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/demo/node_modules/@types:
  {"directoryName":"/user/username/projects/demo/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/demo/animals:
  {"directoryName":"/user/username/projects/demo/animals","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/demo/lib/animals/animal.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/demo/lib/animals/animal.d.ts]
export declare type Size = "small" | "medium" | "large";
export default interface Animal {
    size: Size;
}


//// [/user/username/projects/demo/lib/animals/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDog = void 0;
var dog_1 = require("./dog");
Object.defineProperty(exports, "createDog", { enumerable: true, get: function () { return dog_1.createDog; } });


//// [/user/username/projects/demo/lib/animals/index.d.ts]
import Animal from './animal';
export default Animal;
import { createDog, Dog } from './dog';
export { createDog, Dog };


//// [/user/username/projects/demo/lib/animals/dog.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDog = void 0;
var utilities_1 = require("../core/utilities");
function createDog() {
    return ({
        size: "medium",
        woof: function () {
            console.log("".concat(this.name, " says \"Woof\"!"));
        },
        name: (0, utilities_1.makeRandomName)()
    });
}
exports.createDog = createDog;


//// [/user/username/projects/demo/lib/animals/dog.d.ts]
import Animal from '.';
export interface Dog extends Animal {
    woof(): void;
    name: string;
}
export declare function createDog(): Dog;


//// [/user/username/projects/demo/lib/animals/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../a/lib/lib.d.ts","../../animals/animal.ts","../../animals/index.ts","../../core/utilities.ts","../../animals/dog.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-14984181202-export type Size = \"small\" | \"medium\" | \"large\";\r\nexport default interface Animal {\r\n    size: Size;\r\n}\r\n","signature":"-10510161654-export declare type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n"},{"version":"-5382672599-import Animal from './animal';\r\n\r\nexport default Animal;\r\nimport { createDog, Dog } from './dog';\r\nexport { createDog, Dog };\r\n","signature":"1096904574-import Animal from './animal';\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n"},"25274411612-\r\nexport function makeRandomName() {\r\n    return \"Bob!?! \";\r\n}\r\n\r\nexport function lastElementOf<T>(arr: T[]): T | undefined {\r\n    if (arr.length === 0) return undefined;\r\n    return arr[arr.length - 1];\r\n}\r\n\r\n",{"version":"-10991948013-import Animal from '.';\r\nimport { makeRandomName } from '../core/utilities';\r\n\r\nexport interface Dog extends Animal {\r\n    woof(): void;\r\n    name: string;\r\n}\r\n\r\nexport function createDog(): Dog {\r\n    return ({\r\n        size: \"medium\",\r\n        woof: function(this: Dog) {\r\n            console.log(`${this.name} says \"Woof\"!`);\r\n        },\r\n        name: makeRandomName()\r\n    });\r\n}\r\n\r\n","signature":"6032048049-import Animal from '.';\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\nexport declare function createDog(): Dog;\n"}],"options":{"composite":true,"declaration":true,"module":1,"noFallthroughCasesInSwitch":true,"noImplicitReturns":true,"noUnusedLocals":true,"noUnusedParameters":true,"outDir":"./","rootDir":"../../animals","strict":true,"target":1},"fileIdsList":[[3,4],[2,5],[3]],"referencedMap":[[5,1],[3,2]],"exportedModulesMap":[[5,3],[3,2]],"semanticDiagnosticsPerFile":[1,2,5,3,4]},"version":"FakeTSVersion"}

//// [/user/username/projects/demo/lib/animals/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../a/lib/lib.d.ts",
      "../../animals/animal.ts",
      "../../animals/index.ts",
      "../../core/utilities.ts",
      "../../animals/dog.ts"
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
        "signature": "-10510161654-export declare type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n"
      },
      "../../animals/index.ts": {
        "version": "-5382672599-import Animal from './animal';\r\n\r\nexport default Animal;\r\nimport { createDog, Dog } from './dog';\r\nexport { createDog, Dog };\r\n",
        "signature": "1096904574-import Animal from './animal';\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n"
      },
      "../../core/utilities.ts": {
        "version": "25274411612-\r\nexport function makeRandomName() {\r\n    return \"Bob!?! \";\r\n}\r\n\r\nexport function lastElementOf<T>(arr: T[]): T | undefined {\r\n    if (arr.length === 0) return undefined;\r\n    return arr[arr.length - 1];\r\n}\r\n\r\n",
        "signature": "25274411612-\r\nexport function makeRandomName() {\r\n    return \"Bob!?! \";\r\n}\r\n\r\nexport function lastElementOf<T>(arr: T[]): T | undefined {\r\n    if (arr.length === 0) return undefined;\r\n    return arr[arr.length - 1];\r\n}\r\n\r\n"
      },
      "../../animals/dog.ts": {
        "version": "-10991948013-import Animal from '.';\r\nimport { makeRandomName } from '../core/utilities';\r\n\r\nexport interface Dog extends Animal {\r\n    woof(): void;\r\n    name: string;\r\n}\r\n\r\nexport function createDog(): Dog {\r\n    return ({\r\n        size: \"medium\",\r\n        woof: function(this: Dog) {\r\n            console.log(`${this.name} says \"Woof\"!`);\r\n        },\r\n        name: makeRandomName()\r\n    });\r\n}\r\n\r\n",
        "signature": "6032048049-import Animal from '.';\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\nexport declare function createDog(): Dog;\n"
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
      "rootDir": "../../animals",
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
      "../../core/utilities.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 2536
}

