currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/src/class.ts] *new* 
export class classC {
    prop = 1;
}
//// [/home/src/workspaces/project/src/directUse.ts] *new* 
import { indirectClass } from './indirectClass';
new indirectClass().classC.prop;
//// [/home/src/workspaces/project/src/indirectClass.ts] *new* 
import { classC } from './class';
export class indirectClass {
    classC = new classC();
}
//// [/home/src/workspaces/project/src/indirectUse.ts] *new* 
import { indirectClass } from './indirectClass';
new indirectClass().classC.prop;
//// [/home/src/workspaces/project/src/noChangeFile.ts] *new* 
export function writeLog(s: string) {
}
//// [/home/src/workspaces/project/src/noChangeFileWithEmitSpecificError.ts] *new* 
function someFunc(arguments: boolean, ...rest: any[]) {
}
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions":  { "incremental": true, "declaration": true }
}

tsgo --noEmit
ExitStatus:: Success
Output::
//// [/home/src/tslibs/TS/Lib/lib.d.ts] *Lib*
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
interface SymbolConstructor {
    (desc?: string | number): symbol;
    for(name: string): symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
declare const console: { log(msg: any): void; };
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,7]],"fileNames":["lib.d.ts","./src/class.ts","./src/indirectClass.ts","./src/directUse.ts","./src/indirectUse.ts","./src/noChangeFile.ts","./src/noChangeFileWithEmitSpecificError.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"5106d5119e9d454b0e9d7956b0f66ab8-export class classC {\n    prop = 1;\n}","2d32895543847620d7c9848ddd3a7306-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","12f2d04905c254bde932222194cd2d1b-export function writeLog(s: string) {\n}",{"version":"f54e687ca7ac9fc3c2161967d09e9950-function someFunc(arguments: boolean, ...rest: any[]) {\n}","affectsGlobalScope":true,"impliedNodeFormat":1}],"fileIdsList":[[3],[2]],"options":{"declaration":true},"referencedMap":[[4,1],[3,2],[5,1]],"affectedFilesPendingEmit":[[2,17],[4,17],[3,17],[5,17],[6,17],[7,17]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/class.ts",
        "./src/indirectClass.ts",
        "./src/directUse.ts",
        "./src/indirectUse.ts",
        "./src/noChangeFile.ts",
        "./src/noChangeFileWithEmitSpecificError.ts"
      ],
      "original": [
        2,
        7
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./src/class.ts",
    "./src/indirectClass.ts",
    "./src/directUse.ts",
    "./src/indirectUse.ts",
    "./src/noChangeFile.ts",
    "./src/noChangeFileWithEmitSpecificError.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/class.ts",
      "version": "5106d5119e9d454b0e9d7956b0f66ab8-export class classC {\n    prop = 1;\n}",
      "signature": "5106d5119e9d454b0e9d7956b0f66ab8-export class classC {\n    prop = 1;\n}",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./src/indirectClass.ts",
      "version": "2d32895543847620d7c9848ddd3a7306-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
      "signature": "2d32895543847620d7c9848ddd3a7306-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./src/directUse.ts",
      "version": "1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
      "signature": "1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./src/indirectUse.ts",
      "version": "1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
      "signature": "1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./src/noChangeFile.ts",
      "version": "12f2d04905c254bde932222194cd2d1b-export function writeLog(s: string) {\n}",
      "signature": "12f2d04905c254bde932222194cd2d1b-export function writeLog(s: string) {\n}",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./src/noChangeFileWithEmitSpecificError.ts",
      "version": "f54e687ca7ac9fc3c2161967d09e9950-function someFunc(arguments: boolean, ...rest: any[]) {\n}",
      "signature": "f54e687ca7ac9fc3c2161967d09e9950-function someFunc(arguments: boolean, ...rest: any[]) {\n}",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "f54e687ca7ac9fc3c2161967d09e9950-function someFunc(arguments: boolean, ...rest: any[]) {\n}",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./src/indirectClass.ts"
    ],
    [
      "./src/class.ts"
    ]
  ],
  "options": {
    "declaration": true
  },
  "referencedMap": {
    "./src/directUse.ts": [
      "./src/indirectClass.ts"
    ],
    "./src/indirectClass.ts": [
      "./src/class.ts"
    ],
    "./src/indirectUse.ts": [
      "./src/indirectClass.ts"
    ]
  },
  "affectedFilesPendingEmit": [
    [
      "./src/class.ts",
      "Js|DtsEmit",
      [
        2,
        17
      ]
    ],
    [
      "./src/directUse.ts",
      "Js|DtsEmit",
      [
        4,
        17
      ]
    ],
    [
      "./src/indirectClass.ts",
      "Js|DtsEmit",
      [
        3,
        17
      ]
    ],
    [
      "./src/indirectUse.ts",
      "Js|DtsEmit",
      [
        5,
        17
      ]
    ],
    [
      "./src/noChangeFile.ts",
      "Js|DtsEmit",
      [
        6,
        17
      ]
    ],
    [
      "./src/noChangeFileWithEmitSpecificError.ts",
      "Js|DtsEmit",
      [
        7,
        17
      ]
    ]
  ],
  "size": 1839
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/src/class.ts
*refresh*    /home/src/workspaces/project/src/indirectClass.ts
*refresh*    /home/src/workspaces/project/src/directUse.ts
*refresh*    /home/src/workspaces/project/src/indirectUse.ts
*refresh*    /home/src/workspaces/project/src/noChangeFile.ts
*refresh*    /home/src/workspaces/project/src/noChangeFileWithEmitSpecificError.ts
Signatures::


Edit [0]:: No Change run with emit

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/src/class.d.ts] *new* 
export declare class classC {
    prop: number;
}

//// [/home/src/workspaces/project/src/class.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classC = void 0;
class classC {
    prop = 1;
}
exports.classC = classC;

//// [/home/src/workspaces/project/src/directUse.d.ts] *new* 
export {};

//// [/home/src/workspaces/project/src/directUse.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indirectClass_1 = require("./indirectClass");
new indirectClass_1.indirectClass().classC.prop;

//// [/home/src/workspaces/project/src/indirectClass.d.ts] *new* 
import { classC } from './class';
export declare class indirectClass {
    classC: classC;
}

//// [/home/src/workspaces/project/src/indirectClass.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indirectClass = void 0;
const class_1 = require("./class");
class indirectClass {
    classC = new class_1.classC();
}
exports.indirectClass = indirectClass;

//// [/home/src/workspaces/project/src/indirectUse.d.ts] *new* 
export {};

//// [/home/src/workspaces/project/src/indirectUse.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indirectClass_1 = require("./indirectClass");
new indirectClass_1.indirectClass().classC.prop;

//// [/home/src/workspaces/project/src/noChangeFile.d.ts] *new* 
export declare function writeLog(s: string): void;

//// [/home/src/workspaces/project/src/noChangeFile.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeLog = writeLog;
function writeLog(s) {
}

//// [/home/src/workspaces/project/src/noChangeFileWithEmitSpecificError.d.ts] *new* 
declare function someFunc(arguments: boolean, ...rest: any[]): void;

//// [/home/src/workspaces/project/src/noChangeFileWithEmitSpecificError.js] *new* 
function someFunc(arguments, ...rest) {
}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,7]],"fileNames":["lib.d.ts","./src/class.ts","./src/indirectClass.ts","./src/directUse.ts","./src/indirectUse.ts","./src/noChangeFile.ts","./src/noChangeFileWithEmitSpecificError.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"5106d5119e9d454b0e9d7956b0f66ab8-export class classC {\n    prop = 1;\n}","signature":"8743eb01f3ddad300611aa9bbf6b6c0a-export declare class classC {\n    prop: number;\n}\n","impliedNodeFormat":1},{"version":"2d32895543847620d7c9848ddd3a7306-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","signature":"4c7e50f9604f4038b2f1bafae04987bb-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n","impliedNodeFormat":1},{"version":"1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1},{"version":"1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1},{"version":"12f2d04905c254bde932222194cd2d1b-export function writeLog(s: string) {\n}","signature":"b46de008dd76697ce12a1dca20c0bf9e-export declare function writeLog(s: string): void;\n","impliedNodeFormat":1},{"version":"f54e687ca7ac9fc3c2161967d09e9950-function someFunc(arguments: boolean, ...rest: any[]) {\n}","signature":"86b693f65e0d5bed7e4ac554c2edb8ba-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"fileIdsList":[[3],[2]],"options":{"declaration":true},"referencedMap":[[4,1],[3,2],[5,1]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/class.ts",
        "./src/indirectClass.ts",
        "./src/directUse.ts",
        "./src/indirectUse.ts",
        "./src/noChangeFile.ts",
        "./src/noChangeFileWithEmitSpecificError.ts"
      ],
      "original": [
        2,
        7
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./src/class.ts",
    "./src/indirectClass.ts",
    "./src/directUse.ts",
    "./src/indirectUse.ts",
    "./src/noChangeFile.ts",
    "./src/noChangeFileWithEmitSpecificError.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/class.ts",
      "version": "5106d5119e9d454b0e9d7956b0f66ab8-export class classC {\n    prop = 1;\n}",
      "signature": "8743eb01f3ddad300611aa9bbf6b6c0a-export declare class classC {\n    prop: number;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "5106d5119e9d454b0e9d7956b0f66ab8-export class classC {\n    prop = 1;\n}",
        "signature": "8743eb01f3ddad300611aa9bbf6b6c0a-export declare class classC {\n    prop: number;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/indirectClass.ts",
      "version": "2d32895543847620d7c9848ddd3a7306-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
      "signature": "4c7e50f9604f4038b2f1bafae04987bb-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "2d32895543847620d7c9848ddd3a7306-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
        "signature": "4c7e50f9604f4038b2f1bafae04987bb-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/directUse.ts",
      "version": "1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
        "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/indirectUse.ts",
      "version": "1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
        "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/noChangeFile.ts",
      "version": "12f2d04905c254bde932222194cd2d1b-export function writeLog(s: string) {\n}",
      "signature": "b46de008dd76697ce12a1dca20c0bf9e-export declare function writeLog(s: string): void;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "12f2d04905c254bde932222194cd2d1b-export function writeLog(s: string) {\n}",
        "signature": "b46de008dd76697ce12a1dca20c0bf9e-export declare function writeLog(s: string): void;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/noChangeFileWithEmitSpecificError.ts",
      "version": "f54e687ca7ac9fc3c2161967d09e9950-function someFunc(arguments: boolean, ...rest: any[]) {\n}",
      "signature": "86b693f65e0d5bed7e4ac554c2edb8ba-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "f54e687ca7ac9fc3c2161967d09e9950-function someFunc(arguments: boolean, ...rest: any[]) {\n}",
        "signature": "86b693f65e0d5bed7e4ac554c2edb8ba-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./src/indirectClass.ts"
    ],
    [
      "./src/class.ts"
    ]
  ],
  "options": {
    "declaration": true
  },
  "referencedMap": {
    "./src/directUse.ts": [
      "./src/indirectClass.ts"
    ],
    "./src/indirectClass.ts": [
      "./src/class.ts"
    ],
    "./src/indirectUse.ts": [
      "./src/indirectClass.ts"
    ]
  },
  "size": 2522
}

tsconfig.json::
SemanticDiagnostics::
Signatures::
(stored at emit) /home/src/workspaces/project/src/class.ts
(stored at emit) /home/src/workspaces/project/src/indirectClass.ts
(stored at emit) /home/src/workspaces/project/src/directUse.ts
(stored at emit) /home/src/workspaces/project/src/indirectUse.ts
(stored at emit) /home/src/workspaces/project/src/noChangeFile.ts
(stored at emit) /home/src/workspaces/project/src/noChangeFileWithEmitSpecificError.ts


Edit [1]:: Introduce error with emit
//// [/home/src/workspaces/project/src/class.ts] *modified* 
export class classC {
    prop1 = 1;
}

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96msrc/directUse.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2551: [0mProperty 'prop' does not exist on type 'classC'. Did you mean 'prop1'?

[7m2[0m new indirectClass().classC.prop;
[7m [0m [91m                           ~~~~[0m

  [96msrc/class.ts[0m:[93m2[0m:[93m5[0m - 'prop1' is declared here.
    [7m2[0m     prop1 = 1;
    [7m [0m [96m    ~~~~~[0m

[96msrc/indirectUse.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2551: [0mProperty 'prop' does not exist on type 'classC'. Did you mean 'prop1'?

[7m2[0m new indirectClass().classC.prop;
[7m [0m [91m                           ~~~~[0m

  [96msrc/class.ts[0m:[93m2[0m:[93m5[0m - 'prop1' is declared here.
    [7m2[0m     prop1 = 1;
    [7m [0m [96m    ~~~~~[0m


Found 2 errors in 2 files.

Errors  Files
     1  src/directUse.ts[90m:2[0m
     1  src/indirectUse.ts[90m:2[0m

//// [/home/src/workspaces/project/src/class.d.ts] *modified* 
export declare class classC {
    prop1: number;
}

//// [/home/src/workspaces/project/src/class.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classC = void 0;
class classC {
    prop1 = 1;
}
exports.classC = classC;

//// [/home/src/workspaces/project/src/directUse.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/src/indirectClass.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/src/indirectClass.js] *rewrite with same content*
//// [/home/src/workspaces/project/src/indirectUse.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,7]],"fileNames":["lib.d.ts","./src/class.ts","./src/indirectClass.ts","./src/directUse.ts","./src/indirectUse.ts","./src/noChangeFile.ts","./src/noChangeFileWithEmitSpecificError.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"f5da9f4ab128bbaf87adf83ca7ae8e2d-export class classC {\n    prop1 = 1;\n}","signature":"e36cbd492db9c71062d723d518b6277f-export declare class classC {\n    prop1: number;\n}\n","impliedNodeFormat":1},{"version":"2d32895543847620d7c9848ddd3a7306-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","signature":"4c7e50f9604f4038b2f1bafae04987bb-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n","impliedNodeFormat":1},{"version":"1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1},{"version":"1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1},{"version":"12f2d04905c254bde932222194cd2d1b-export function writeLog(s: string) {\n}","signature":"b46de008dd76697ce12a1dca20c0bf9e-export declare function writeLog(s: string): void;\n","impliedNodeFormat":1},{"version":"f54e687ca7ac9fc3c2161967d09e9950-function someFunc(arguments: boolean, ...rest: any[]) {\n}","signature":"86b693f65e0d5bed7e4ac554c2edb8ba-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"fileIdsList":[[3],[2]],"options":{"declaration":true},"referencedMap":[[4,1],[3,2],[5,1]],"semanticDiagnosticsPerFile":[[4,[{"pos":76,"end":80,"code":2551,"category":1,"message":"Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?","relatedInformation":[{"file":2,"pos":26,"end":31,"code":2728,"category":3,"message":"'prop1' is declared here."}]}]],[5,[{"pos":76,"end":80,"code":2551,"category":1,"message":"Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?","relatedInformation":[{"file":2,"pos":26,"end":31,"code":2728,"category":3,"message":"'prop1' is declared here."}]}]]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/class.ts",
        "./src/indirectClass.ts",
        "./src/directUse.ts",
        "./src/indirectUse.ts",
        "./src/noChangeFile.ts",
        "./src/noChangeFileWithEmitSpecificError.ts"
      ],
      "original": [
        2,
        7
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./src/class.ts",
    "./src/indirectClass.ts",
    "./src/directUse.ts",
    "./src/indirectUse.ts",
    "./src/noChangeFile.ts",
    "./src/noChangeFileWithEmitSpecificError.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/class.ts",
      "version": "f5da9f4ab128bbaf87adf83ca7ae8e2d-export class classC {\n    prop1 = 1;\n}",
      "signature": "e36cbd492db9c71062d723d518b6277f-export declare class classC {\n    prop1: number;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "f5da9f4ab128bbaf87adf83ca7ae8e2d-export class classC {\n    prop1 = 1;\n}",
        "signature": "e36cbd492db9c71062d723d518b6277f-export declare class classC {\n    prop1: number;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/indirectClass.ts",
      "version": "2d32895543847620d7c9848ddd3a7306-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
      "signature": "4c7e50f9604f4038b2f1bafae04987bb-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "2d32895543847620d7c9848ddd3a7306-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
        "signature": "4c7e50f9604f4038b2f1bafae04987bb-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/directUse.ts",
      "version": "1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
        "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/indirectUse.ts",
      "version": "1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
        "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/noChangeFile.ts",
      "version": "12f2d04905c254bde932222194cd2d1b-export function writeLog(s: string) {\n}",
      "signature": "b46de008dd76697ce12a1dca20c0bf9e-export declare function writeLog(s: string): void;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "12f2d04905c254bde932222194cd2d1b-export function writeLog(s: string) {\n}",
        "signature": "b46de008dd76697ce12a1dca20c0bf9e-export declare function writeLog(s: string): void;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/noChangeFileWithEmitSpecificError.ts",
      "version": "f54e687ca7ac9fc3c2161967d09e9950-function someFunc(arguments: boolean, ...rest: any[]) {\n}",
      "signature": "86b693f65e0d5bed7e4ac554c2edb8ba-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "f54e687ca7ac9fc3c2161967d09e9950-function someFunc(arguments: boolean, ...rest: any[]) {\n}",
        "signature": "86b693f65e0d5bed7e4ac554c2edb8ba-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./src/indirectClass.ts"
    ],
    [
      "./src/class.ts"
    ]
  ],
  "options": {
    "declaration": true
  },
  "referencedMap": {
    "./src/directUse.ts": [
      "./src/indirectClass.ts"
    ],
    "./src/indirectClass.ts": [
      "./src/class.ts"
    ],
    "./src/indirectUse.ts": [
      "./src/indirectClass.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./src/directUse.ts",
      [
        {
          "pos": 76,
          "end": 80,
          "code": 2551,
          "category": 1,
          "message": "Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?",
          "relatedInformation": [
            {
              "file": "./src/class.ts",
              "pos": 26,
              "end": 31,
              "code": 2728,
              "category": 3,
              "message": "'prop1' is declared here."
            }
          ]
        }
      ]
    ],
    [
      "./src/indirectUse.ts",
      [
        {
          "pos": 76,
          "end": 80,
          "code": 2551,
          "category": 1,
          "message": "Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?",
          "relatedInformation": [
            {
              "file": "./src/class.ts",
              "pos": 26,
              "end": 31,
              "code": 2728,
              "category": 3,
              "message": "'prop1' is declared here."
            }
          ]
        }
      ]
    ]
  ],
  "size": 3053
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/src/class.ts
*refresh*    /home/src/workspaces/project/src/indirectClass.ts
*refresh*    /home/src/workspaces/project/src/directUse.ts
*refresh*    /home/src/workspaces/project/src/indirectUse.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/src/class.ts
(computed .d.ts) /home/src/workspaces/project/src/indirectClass.ts
(stored at emit) /home/src/workspaces/project/src/directUse.ts
(stored at emit) /home/src/workspaces/project/src/indirectUse.ts


Edit [2]:: Fix error and no emit
//// [/home/src/workspaces/project/src/class.ts] *modified* 
export class classC {
    prop = 1;
}

tsgo --noEmit
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,7]],"fileNames":["lib.d.ts","./src/class.ts","./src/indirectClass.ts","./src/directUse.ts","./src/indirectUse.ts","./src/noChangeFile.ts","./src/noChangeFileWithEmitSpecificError.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"5106d5119e9d454b0e9d7956b0f66ab8-export class classC {\n    prop = 1;\n}","signature":"8743eb01f3ddad300611aa9bbf6b6c0a-export declare class classC {\n    prop: number;\n}\n","impliedNodeFormat":1},{"version":"2d32895543847620d7c9848ddd3a7306-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","signature":"4c7e50f9604f4038b2f1bafae04987bb-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n","impliedNodeFormat":1},"1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",{"version":"12f2d04905c254bde932222194cd2d1b-export function writeLog(s: string) {\n}","signature":"b46de008dd76697ce12a1dca20c0bf9e-export declare function writeLog(s: string): void;\n","impliedNodeFormat":1},{"version":"f54e687ca7ac9fc3c2161967d09e9950-function someFunc(arguments: boolean, ...rest: any[]) {\n}","signature":"86b693f65e0d5bed7e4ac554c2edb8ba-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"fileIdsList":[[3],[2]],"options":{"declaration":true},"referencedMap":[[4,1],[3,2],[5,1]],"affectedFilesPendingEmit":[[2,17],[4,16],[3,17],[5,16]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/class.ts",
        "./src/indirectClass.ts",
        "./src/directUse.ts",
        "./src/indirectUse.ts",
        "./src/noChangeFile.ts",
        "./src/noChangeFileWithEmitSpecificError.ts"
      ],
      "original": [
        2,
        7
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./src/class.ts",
    "./src/indirectClass.ts",
    "./src/directUse.ts",
    "./src/indirectUse.ts",
    "./src/noChangeFile.ts",
    "./src/noChangeFileWithEmitSpecificError.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/class.ts",
      "version": "5106d5119e9d454b0e9d7956b0f66ab8-export class classC {\n    prop = 1;\n}",
      "signature": "8743eb01f3ddad300611aa9bbf6b6c0a-export declare class classC {\n    prop: number;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "5106d5119e9d454b0e9d7956b0f66ab8-export class classC {\n    prop = 1;\n}",
        "signature": "8743eb01f3ddad300611aa9bbf6b6c0a-export declare class classC {\n    prop: number;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/indirectClass.ts",
      "version": "2d32895543847620d7c9848ddd3a7306-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
      "signature": "4c7e50f9604f4038b2f1bafae04987bb-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "2d32895543847620d7c9848ddd3a7306-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
        "signature": "4c7e50f9604f4038b2f1bafae04987bb-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/directUse.ts",
      "version": "1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
      "signature": "1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./src/indirectUse.ts",
      "version": "1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
      "signature": "1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./src/noChangeFile.ts",
      "version": "12f2d04905c254bde932222194cd2d1b-export function writeLog(s: string) {\n}",
      "signature": "b46de008dd76697ce12a1dca20c0bf9e-export declare function writeLog(s: string): void;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "12f2d04905c254bde932222194cd2d1b-export function writeLog(s: string) {\n}",
        "signature": "b46de008dd76697ce12a1dca20c0bf9e-export declare function writeLog(s: string): void;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/noChangeFileWithEmitSpecificError.ts",
      "version": "f54e687ca7ac9fc3c2161967d09e9950-function someFunc(arguments: boolean, ...rest: any[]) {\n}",
      "signature": "86b693f65e0d5bed7e4ac554c2edb8ba-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "f54e687ca7ac9fc3c2161967d09e9950-function someFunc(arguments: boolean, ...rest: any[]) {\n}",
        "signature": "86b693f65e0d5bed7e4ac554c2edb8ba-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./src/indirectClass.ts"
    ],
    [
      "./src/class.ts"
    ]
  ],
  "options": {
    "declaration": true
  },
  "referencedMap": {
    "./src/directUse.ts": [
      "./src/indirectClass.ts"
    ],
    "./src/indirectClass.ts": [
      "./src/class.ts"
    ],
    "./src/indirectUse.ts": [
      "./src/indirectClass.ts"
    ]
  },
  "affectedFilesPendingEmit": [
    [
      "./src/class.ts",
      "Js|DtsEmit",
      [
        2,
        17
      ]
    ],
    [
      "./src/directUse.ts",
      "DtsEmit",
      [
        4,
        16
      ]
    ],
    [
      "./src/indirectClass.ts",
      "Js|DtsEmit",
      [
        3,
        17
      ]
    ],
    [
      "./src/indirectUse.ts",
      "DtsEmit",
      [
        5,
        16
      ]
    ]
  ],
  "size": 2391
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/src/class.ts
*refresh*    /home/src/workspaces/project/src/indirectClass.ts
*refresh*    /home/src/workspaces/project/src/directUse.ts
*refresh*    /home/src/workspaces/project/src/indirectUse.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/src/class.ts
(computed .d.ts) /home/src/workspaces/project/src/indirectClass.ts
(used version)   /home/src/workspaces/project/src/directUse.ts
(used version)   /home/src/workspaces/project/src/indirectUse.ts


Edit [3]:: No Change run with emit

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/src/class.d.ts] *modified* 
export declare class classC {
    prop: number;
}

//// [/home/src/workspaces/project/src/class.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classC = void 0;
class classC {
    prop = 1;
}
exports.classC = classC;

//// [/home/src/workspaces/project/src/directUse.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/src/indirectClass.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/src/indirectClass.js] *rewrite with same content*
//// [/home/src/workspaces/project/src/indirectUse.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,7]],"fileNames":["lib.d.ts","./src/class.ts","./src/indirectClass.ts","./src/directUse.ts","./src/indirectUse.ts","./src/noChangeFile.ts","./src/noChangeFileWithEmitSpecificError.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"5106d5119e9d454b0e9d7956b0f66ab8-export class classC {\n    prop = 1;\n}","signature":"8743eb01f3ddad300611aa9bbf6b6c0a-export declare class classC {\n    prop: number;\n}\n","impliedNodeFormat":1},{"version":"2d32895543847620d7c9848ddd3a7306-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","signature":"4c7e50f9604f4038b2f1bafae04987bb-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n","impliedNodeFormat":1},{"version":"1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1},{"version":"1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1},{"version":"12f2d04905c254bde932222194cd2d1b-export function writeLog(s: string) {\n}","signature":"b46de008dd76697ce12a1dca20c0bf9e-export declare function writeLog(s: string): void;\n","impliedNodeFormat":1},{"version":"f54e687ca7ac9fc3c2161967d09e9950-function someFunc(arguments: boolean, ...rest: any[]) {\n}","signature":"86b693f65e0d5bed7e4ac554c2edb8ba-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"fileIdsList":[[3],[2]],"options":{"declaration":true},"referencedMap":[[4,1],[3,2],[5,1]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/class.ts",
        "./src/indirectClass.ts",
        "./src/directUse.ts",
        "./src/indirectUse.ts",
        "./src/noChangeFile.ts",
        "./src/noChangeFileWithEmitSpecificError.ts"
      ],
      "original": [
        2,
        7
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./src/class.ts",
    "./src/indirectClass.ts",
    "./src/directUse.ts",
    "./src/indirectUse.ts",
    "./src/noChangeFile.ts",
    "./src/noChangeFileWithEmitSpecificError.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/class.ts",
      "version": "5106d5119e9d454b0e9d7956b0f66ab8-export class classC {\n    prop = 1;\n}",
      "signature": "8743eb01f3ddad300611aa9bbf6b6c0a-export declare class classC {\n    prop: number;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "5106d5119e9d454b0e9d7956b0f66ab8-export class classC {\n    prop = 1;\n}",
        "signature": "8743eb01f3ddad300611aa9bbf6b6c0a-export declare class classC {\n    prop: number;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/indirectClass.ts",
      "version": "2d32895543847620d7c9848ddd3a7306-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
      "signature": "4c7e50f9604f4038b2f1bafae04987bb-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "2d32895543847620d7c9848ddd3a7306-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
        "signature": "4c7e50f9604f4038b2f1bafae04987bb-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/directUse.ts",
      "version": "1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
        "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/indirectUse.ts",
      "version": "1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "1e7a664a983b65ba5fbd926c9dad4a26-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
        "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/noChangeFile.ts",
      "version": "12f2d04905c254bde932222194cd2d1b-export function writeLog(s: string) {\n}",
      "signature": "b46de008dd76697ce12a1dca20c0bf9e-export declare function writeLog(s: string): void;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "12f2d04905c254bde932222194cd2d1b-export function writeLog(s: string) {\n}",
        "signature": "b46de008dd76697ce12a1dca20c0bf9e-export declare function writeLog(s: string): void;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/noChangeFileWithEmitSpecificError.ts",
      "version": "f54e687ca7ac9fc3c2161967d09e9950-function someFunc(arguments: boolean, ...rest: any[]) {\n}",
      "signature": "86b693f65e0d5bed7e4ac554c2edb8ba-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "f54e687ca7ac9fc3c2161967d09e9950-function someFunc(arguments: boolean, ...rest: any[]) {\n}",
        "signature": "86b693f65e0d5bed7e4ac554c2edb8ba-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./src/indirectClass.ts"
    ],
    [
      "./src/class.ts"
    ]
  ],
  "options": {
    "declaration": true
  },
  "referencedMap": {
    "./src/directUse.ts": [
      "./src/indirectClass.ts"
    ],
    "./src/indirectClass.ts": [
      "./src/class.ts"
    ],
    "./src/indirectUse.ts": [
      "./src/indirectClass.ts"
    ]
  },
  "size": 2522
}

tsconfig.json::
SemanticDiagnostics::
Signatures::
(stored at emit) /home/src/workspaces/project/src/directUse.ts
(stored at emit) /home/src/workspaces/project/src/indirectUse.ts
