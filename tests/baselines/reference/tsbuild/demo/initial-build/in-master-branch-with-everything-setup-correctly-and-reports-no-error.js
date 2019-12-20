//// [/lib/initial-buildOutput.txt]
/lib/tsc --b /src/tsconfig.json --verbose
12:00:00 AM - Projects in this build: 
    * src/core/tsconfig.json
    * src/animals/tsconfig.json
    * src/zoo/tsconfig.json
    * src/tsconfig.json

12:00:00 AM - Project 'src/core/tsconfig.json' is out of date because output file 'src/lib/core/utilities.js' does not exist

12:00:00 AM - Building project '/src/core/tsconfig.json'...

12:00:00 AM - Project 'src/animals/tsconfig.json' is out of date because output file 'src/lib/animals/animal.js' does not exist

12:00:00 AM - Building project '/src/animals/tsconfig.json'...

12:00:00 AM - Project 'src/zoo/tsconfig.json' is out of date because output file 'src/lib/zoo/zoo.js' does not exist

12:00:00 AM - Building project '/src/zoo/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/lib/animals/animal.d.ts]
export declare type Size = "small" | "medium" | "large";
export default interface Animal {
    size: Size;
}


//// [/src/lib/animals/animal.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/lib/animals/dog.d.ts]
import Animal from '.';
export interface Dog extends Animal {
    woof(): void;
    name: string;
}
export declare function createDog(): Dog;


//// [/src/lib/animals/dog.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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


//// [/src/lib/animals/index.d.ts]
import Animal from './animal';
export default Animal;
import { createDog, Dog } from './dog';
export { createDog, Dog };


//// [/src/lib/animals/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animal_1 = require("./animal");
var dog_1 = require("./dog");
exports.createDog = dog_1.createDog;


//// [/src/lib/animals/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
      },
      "../../animals/animal.ts": {
        "version": "-14984181202-export type Size = \"small\" | \"medium\" | \"large\";\r\nexport default interface Animal {\r\n    size: Size;\r\n}\r\n",
        "signature": "13427676350-export declare type Size = \"small\" | \"medium\" | \"large\";\r\nexport default interface Animal {\r\n    size: Size;\r\n}\r\n"
      },
      "../../animals/index.ts": {
        "version": "-5382672599-import Animal from './animal';\r\n\r\nexport default Animal;\r\nimport { createDog, Dog } from './dog';\r\nexport { createDog, Dog };\r\n",
        "signature": "4477582546-import Animal from './animal';\r\nexport default Animal;\r\nimport { createDog, Dog } from './dog';\r\nexport { createDog, Dog };\r\n"
      },
      "../core/utilities.d.ts": {
        "version": "-8177343116-export declare function makeRandomName(): string;\r\nexport declare function lastElementOf<T>(arr: T[]): T | undefined;\r\n",
        "signature": "-8177343116-export declare function makeRandomName(): string;\r\nexport declare function lastElementOf<T>(arr: T[]): T | undefined;\r\n"
      },
      "../../animals/dog.ts": {
        "version": "-10991948013-import Animal from '.';\r\nimport { makeRandomName } from '../core/utilities';\r\n\r\nexport interface Dog extends Animal {\r\n    woof(): void;\r\n    name: string;\r\n}\r\n\r\nexport function createDog(): Dog {\r\n    return ({\r\n        size: \"medium\",\r\n        woof: function(this: Dog) {\r\n            console.log(`${this.name} says \"Woof\"!`);\r\n        },\r\n        name: makeRandomName()\r\n    });\r\n}\r\n\r\n",
        "signature": "10854678623-import Animal from '.';\r\nexport interface Dog extends Animal {\r\n    woof(): void;\r\n    name: string;\r\n}\r\nexport declare function createDog(): Dog;\r\n"
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
      "../../../lib/lib.d.ts",
      "../../animals/animal.ts",
      "../../animals/dog.ts",
      "../../animals/index.ts",
      "../core/utilities.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/src/lib/core/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
      },
      "../../core/utilities.ts": {
        "version": "25274411612-\r\nexport function makeRandomName() {\r\n    return \"Bob!?! \";\r\n}\r\n\r\nexport function lastElementOf<T>(arr: T[]): T | undefined {\r\n    if (arr.length === 0) return undefined;\r\n    return arr[arr.length - 1];\r\n}\r\n\r\n",
        "signature": "-8177343116-export declare function makeRandomName(): string;\r\nexport declare function lastElementOf<T>(arr: T[]): T | undefined;\r\n"
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
      "configFilePath": "../../core/tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../../core/utilities.ts"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/src/lib/core/utilities.d.ts]
export declare function makeRandomName(): string;
export declare function lastElementOf<T>(arr: T[]): T | undefined;


//// [/src/lib/core/utilities.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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


//// [/src/lib/zoo/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
      },
      "../animals/animal.d.ts": {
        "version": "13427676350-export declare type Size = \"small\" | \"medium\" | \"large\";\r\nexport default interface Animal {\r\n    size: Size;\r\n}\r\n",
        "signature": "13427676350-export declare type Size = \"small\" | \"medium\" | \"large\";\r\nexport default interface Animal {\r\n    size: Size;\r\n}\r\n"
      },
      "../animals/dog.d.ts": {
        "version": "10854678623-import Animal from '.';\r\nexport interface Dog extends Animal {\r\n    woof(): void;\r\n    name: string;\r\n}\r\nexport declare function createDog(): Dog;\r\n",
        "signature": "10854678623-import Animal from '.';\r\nexport interface Dog extends Animal {\r\n    woof(): void;\r\n    name: string;\r\n}\r\nexport declare function createDog(): Dog;\r\n"
      },
      "../animals/index.d.ts": {
        "version": "4477582546-import Animal from './animal';\r\nexport default Animal;\r\nimport { createDog, Dog } from './dog';\r\nexport { createDog, Dog };\r\n",
        "signature": "4477582546-import Animal from './animal';\r\nexport default Animal;\r\nimport { createDog, Dog } from './dog';\r\nexport { createDog, Dog };\r\n"
      },
      "../../zoo/zoo.ts": {
        "version": "8797123924-import { Dog, createDog } from '../animals/index';\r\n\r\nexport function createZoo(): Array<Dog> {\r\n    return [\r\n        createDog()\r\n    ];\r\n}\r\n\r\n",
        "signature": "-17433436879-import { Dog } from '../animals/index';\r\nexport declare function createZoo(): Array<Dog>;\r\n"
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
      "configFilePath": "../../zoo/tsconfig.json"
    },
    "referencedMap": {
      "../../zoo/zoo.ts": [
        "../animals/index.d.ts"
      ],
      "../animals/dog.d.ts": [
        "../animals/index.d.ts"
      ],
      "../animals/index.d.ts": [
        "../animals/animal.d.ts",
        "../animals/dog.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../../zoo/zoo.ts": [
        "../animals/index.d.ts"
      ],
      "../animals/dog.d.ts": [
        "../animals/index.d.ts"
      ],
      "../animals/index.d.ts": [
        "../animals/animal.d.ts",
        "../animals/dog.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../../zoo/zoo.ts",
      "../animals/animal.d.ts",
      "../animals/dog.d.ts",
      "../animals/index.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/src/lib/zoo/zoo.d.ts]
import { Dog } from '../animals/index';
export declare function createZoo(): Array<Dog>;


//// [/src/lib/zoo/zoo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../animals/index");
function createZoo() {
    return [
        index_1.createDog()
    ];
}
exports.createZoo = createZoo;


