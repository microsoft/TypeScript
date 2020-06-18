Input::
//// [/user/username/projects/demo/core/tsconfig.json]
{
  "extends": "../tsconfig-base.json",
  "compilerOptions": {
    "outDir": "../lib/core",
    "rootDir": "."
  },
  "references": [
    {
      "path": "../zoo"
    }
  ]
}

//// [/user/username/projects/demo/core/utilities.ts]

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
    * animals/tsconfig.json
    * zoo/tsconfig.json
    * core/tsconfig.json
    * tsconfig.json


[91merror[0m[90m TS6202: [0mProject references may not form a circular graph. Cycle detected: /user/username/projects/demo/tsconfig.json
/user/username/projects/demo/core/tsconfig.json
/user/username/projects/demo/zoo/tsconfig.json
/user/username/projects/demo/animals/tsconfig.json


[[90m12:00:48 AM[0m] Found 1 error. Watching for file changes.



WatchedFiles::
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
/user/username/projects/demo/core/tsconfig.json:
  {"fileName":"/user/username/projects/demo/core/tsconfig.json","pollingInterval":250}
/user/username/projects/demo/core/utilities.ts:
  {"fileName":"/user/username/projects/demo/core/utilities.ts","pollingInterval":250}
/user/username/projects/demo/tsconfig.json:
  {"fileName":"/user/username/projects/demo/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/demo/animals:
  {"directoryName":"/user/username/projects/demo/animals","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/demo/zoo:
  {"directoryName":"/user/username/projects/demo/zoo","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/demo/core:
  {"directoryName":"/user/username/projects/demo/core","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: Fix error

Input::
//// [/user/username/projects/demo/core/tsconfig.json]
{
  "extends": "../tsconfig-base.json",
  "compilerOptions": {
    "outDir": "../lib/core",
    "rootDir": "."
  }
}


Output::
>> Screen clear
[[90m12:00:52 AM[0m] File change detected. Starting incremental compilation...


[[90m12:00:53 AM[0m] Project 'core/tsconfig.json' is out of date because output file 'lib/core/utilities.js' does not exist


[[90m12:00:54 AM[0m] Building project '/user/username/projects/demo/core/tsconfig.json'...


[[90m12:01:06 AM[0m] Project 'animals/tsconfig.json' is out of date because output file 'lib/animals/animal.js' does not exist


[[90m12:01:07 AM[0m] Building project '/user/username/projects/demo/animals/tsconfig.json'...


[[90m12:01:25 AM[0m] Project 'zoo/tsconfig.json' is out of date because output file 'lib/zoo/zoo.js' does not exist


[[90m12:01:26 AM[0m] Building project '/user/username/projects/demo/zoo/tsconfig.json'...


[[90m12:01:36 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/demo/core/utilities.ts"]
Program options: {"declaration":true,"target":1,"module":1,"strict":true,"noUnusedLocals":true,"noUnusedParameters":true,"noImplicitReturns":true,"noFallthroughCasesInSwitch":true,"composite":true,"outDir":"/user/username/projects/demo/lib/core","rootDir":"/user/username/projects/demo/core","watch":true,"configFilePath":"/user/username/projects/demo/core/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/demo/core/utilities.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/demo/core/utilities.ts

Program root files: ["/user/username/projects/demo/animals/animal.ts","/user/username/projects/demo/animals/dog.ts","/user/username/projects/demo/animals/index.ts"]
Program options: {"declaration":true,"target":1,"module":1,"strict":true,"noUnusedLocals":true,"noUnusedParameters":true,"noImplicitReturns":true,"noFallthroughCasesInSwitch":true,"composite":true,"outDir":"/user/username/projects/demo/lib/animals","rootDir":"/user/username/projects/demo/animals","watch":true,"configFilePath":"/user/username/projects/demo/animals/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/demo/animals/animal.ts
/user/username/projects/demo/animals/index.ts
/user/username/projects/demo/lib/core/utilities.d.ts
/user/username/projects/demo/animals/dog.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/demo/animals/animal.ts
/user/username/projects/demo/animals/index.ts
/user/username/projects/demo/lib/core/utilities.d.ts
/user/username/projects/demo/animals/dog.ts

Program root files: ["/user/username/projects/demo/zoo/zoo.ts"]
Program options: {"declaration":true,"target":1,"module":1,"strict":true,"noUnusedLocals":true,"noUnusedParameters":true,"noImplicitReturns":true,"noFallthroughCasesInSwitch":true,"composite":true,"outDir":"/user/username/projects/demo/lib/zoo","rootDir":"/user/username/projects/demo/zoo","watch":true,"configFilePath":"/user/username/projects/demo/zoo/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/demo/lib/animals/animal.d.ts
/user/username/projects/demo/lib/animals/dog.d.ts
/user/username/projects/demo/lib/animals/index.d.ts
/user/username/projects/demo/zoo/zoo.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/demo/lib/animals/animal.d.ts
/user/username/projects/demo/lib/animals/dog.d.ts
/user/username/projects/demo/lib/animals/index.d.ts
/user/username/projects/demo/zoo/zoo.ts

WatchedFiles::
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
/user/username/projects/demo/core/tsconfig.json:
  {"fileName":"/user/username/projects/demo/core/tsconfig.json","pollingInterval":250}
/user/username/projects/demo/core/utilities.ts:
  {"fileName":"/user/username/projects/demo/core/utilities.ts","pollingInterval":250}
/user/username/projects/demo/tsconfig.json:
  {"fileName":"/user/username/projects/demo/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/demo/animals:
  {"directoryName":"/user/username/projects/demo/animals","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/demo/zoo:
  {"directoryName":"/user/username/projects/demo/zoo","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/demo/core:
  {"directoryName":"/user/username/projects/demo/core","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/demo/lib/core/utilities.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastElementOf = exports.makeRandomName = void 0;
function makeRandomName() {
    return "Bob!?! ";
}
exports.makeRandomName = makeRandomName;
function lastElementOf(arr) {
    if (arr.length === 0)
        return undefined;
    return arr[arr.length - 1];
}
exports.lastElementOf = lastElementOf;


//// [/user/username/projects/demo/lib/core/utilities.d.ts]
export declare function makeRandomName(): string;
export declare function lastElementOf<T>(arr: T[]): T | undefined;


//// [/user/username/projects/demo/lib/core/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../../core/utilities.ts": {
        "version": "25274411612-\r\nexport function makeRandomName() {\r\n    return \"Bob!?! \";\r\n}\r\n\r\nexport function lastElementOf<T>(arr: T[]): T | undefined {\r\n    if (arr.length === 0) return undefined;\r\n    return arr[arr.length - 1];\r\n}\r\n\r\n",
        "signature": "-11345568166-export declare function makeRandomName(): string;\nexport declare function lastElementOf<T>(arr: T[]): T | undefined;\n",
        "affectsGlobalScope": false
      }
    },
    "options": {
      "declaration": true,
      "target": 1,
      "module": 1,
      "strict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "noImplicitReturns": true,
      "noFallthroughCasesInSwitch": true,
      "composite": true,
      "outDir": "./",
      "rootDir": "../../core",
      "watch": true,
      "configFilePath": "../../core/tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../../a/lib/lib.d.ts",
      "../../core/utilities.ts"
    ]
  },
  "version": "FakeTSVersion"
}

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
var animal_1 = require("./animal");
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
            console.log(this.name + " says \"Woof\"!");
        },
        name: utilities_1.makeRandomName()
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
{
  "program": {
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../../animals/animal.ts": {
        "version": "-14984181202-export type Size = \"small\" | \"medium\" | \"large\";\r\nexport default interface Animal {\r\n    size: Size;\r\n}\r\n",
        "signature": "-10510161654-export declare type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n",
        "affectsGlobalScope": false
      },
      "../../animals/index.ts": {
        "version": "-5382672599-import Animal from './animal';\r\n\r\nexport default Animal;\r\nimport { createDog, Dog } from './dog';\r\nexport { createDog, Dog };\r\n",
        "signature": "1096904574-import Animal from './animal';\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n",
        "affectsGlobalScope": false
      },
      "../core/utilities.d.ts": {
        "version": "-11345568166-export declare function makeRandomName(): string;\nexport declare function lastElementOf<T>(arr: T[]): T | undefined;\n",
        "signature": "-11345568166-export declare function makeRandomName(): string;\nexport declare function lastElementOf<T>(arr: T[]): T | undefined;\n",
        "affectsGlobalScope": false
      },
      "../../animals/dog.ts": {
        "version": "-10991948013-import Animal from '.';\r\nimport { makeRandomName } from '../core/utilities';\r\n\r\nexport interface Dog extends Animal {\r\n    woof(): void;\r\n    name: string;\r\n}\r\n\r\nexport function createDog(): Dog {\r\n    return ({\r\n        size: \"medium\",\r\n        woof: function(this: Dog) {\r\n            console.log(`${this.name} says \"Woof\"!`);\r\n        },\r\n        name: makeRandomName()\r\n    });\r\n}\r\n\r\n",
        "signature": "6032048049-import Animal from '.';\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\nexport declare function createDog(): Dog;\n",
        "affectsGlobalScope": false
      }
    },
    "options": {
      "declaration": true,
      "target": 1,
      "module": 1,
      "strict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "noImplicitReturns": true,
      "noFallthroughCasesInSwitch": true,
      "composite": true,
      "outDir": "./",
      "rootDir": "../../animals",
      "watch": true,
      "configFilePath": "../../animals/tsconfig.json"
    },
    "referencedMap": {
      "../../animals/dog.ts": [
        "../../animals/index.ts",
        "../core/utilities.d.ts"
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
      "../core/utilities.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/user/username/projects/demo/lib/zoo/zoo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createZoo = void 0;
var index_1 = require("../animals/index");
function createZoo() {
    return [
        index_1.createDog()
    ];
}
exports.createZoo = createZoo;


//// [/user/username/projects/demo/lib/zoo/zoo.d.ts]
import { Dog } from '../animals/index';
export declare function createZoo(): Array<Dog>;


//// [/user/username/projects/demo/lib/zoo/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../animals/animal.d.ts": {
        "version": "-10510161654-export declare type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n",
        "signature": "-10510161654-export declare type Size = \"small\" | \"medium\" | \"large\";\nexport default interface Animal {\n    size: Size;\n}\n",
        "affectsGlobalScope": false
      },
      "../animals/dog.d.ts": {
        "version": "6032048049-import Animal from '.';\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\nexport declare function createDog(): Dog;\n",
        "signature": "6032048049-import Animal from '.';\nexport interface Dog extends Animal {\n    woof(): void;\n    name: string;\n}\nexport declare function createDog(): Dog;\n",
        "affectsGlobalScope": false
      },
      "../animals/index.d.ts": {
        "version": "1096904574-import Animal from './animal';\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n",
        "signature": "1096904574-import Animal from './animal';\nexport default Animal;\nimport { createDog, Dog } from './dog';\nexport { createDog, Dog };\n",
        "affectsGlobalScope": false
      },
      "../../zoo/zoo.ts": {
        "version": "8797123924-import { Dog, createDog } from '../animals/index';\r\n\r\nexport function createZoo(): Array<Dog> {\r\n    return [\r\n        createDog()\r\n    ];\r\n}\r\n\r\n",
        "signature": "10305066551-import { Dog } from '../animals/index';\nexport declare function createZoo(): Array<Dog>;\n",
        "affectsGlobalScope": false
      }
    },
    "options": {
      "declaration": true,
      "target": 1,
      "module": 1,
      "strict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "noImplicitReturns": true,
      "noFallthroughCasesInSwitch": true,
      "composite": true,
      "outDir": "./",
      "rootDir": "../../zoo",
      "watch": true,
      "configFilePath": "../../zoo/tsconfig.json"
    },
    "referencedMap": {
      "../animals/dog.d.ts": [
        "../animals/index.d.ts"
      ],
      "../animals/index.d.ts": [
        "../animals/animal.d.ts",
        "../animals/dog.d.ts"
      ],
      "../../zoo/zoo.ts": [
        "../animals/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../animals/dog.d.ts": [
        "../animals/index.d.ts"
      ],
      "../animals/index.d.ts": [
        "../animals/animal.d.ts",
        "../animals/dog.d.ts"
      ],
      "../../zoo/zoo.ts": [
        "../animals/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../../../a/lib/lib.d.ts",
      "../animals/animal.d.ts",
      "../animals/dog.d.ts",
      "../animals/index.d.ts",
      "../../zoo/zoo.ts"
    ]
  },
  "version": "FakeTSVersion"
}

