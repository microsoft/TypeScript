currentDirectory:: /user/username/projects/transitiveReferences useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/transitiveReferences/refs/a.d.ts]
export class X {}
export class A {}


//// [/user/username/projects/transitiveReferences/a.ts]
export class A {}


//// [/user/username/projects/transitiveReferences/b.ts]
import {A} from '@ref/a';
export const b = new A();


//// [/user/username/projects/transitiveReferences/c.ts]
import {b} from './b';
import {X} from "@ref/a";
b;
X;


//// [/user/username/projects/transitiveReferences/tsconfig.a.json]
{
  "compilerOptions": {
    "composite": true
  },
  "files": [
    "a.ts"
  ]
}

//// [/user/username/projects/transitiveReferences/tsconfig.b.json]
{
  "compilerOptions": {
    "composite": true,
    "baseUrl": "./",
    "paths": {
      "@ref/*": [
        "./*"
      ]
    }
  },
  "files": [
    "b.ts"
  ],
  "references": [
    {
      "path": "tsconfig.a.json"
    }
  ]
}

//// [/user/username/projects/transitiveReferences/tsconfig.c.json]
{
  "files": [
    "c.ts"
  ],
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@ref/*": [
        "./refs/*"
      ]
    }
  },
  "references": [
    {
      "path": "tsconfig.b.json"
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


/home/src/tslibs/TS/Lib/tsc.js --b tsconfig.c.json --listFiles
Output::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/a.ts
[96mtsconfig.b.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'baseUrl' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.
  Visit https://aka.ms/ts6 for migration information.

[7m4[0m     "baseUrl": "./",
[7m [0m [91m    ~~~~~~~~~[0m

/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/b.ts
[96mtsconfig.c.json[0m:[93m6[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'baseUrl' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.
  Visit https://aka.ms/ts6 for migration information.

[7m6[0m     "baseUrl": "./",
[7m [0m [91m    ~~~~~~~~~[0m

/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/b.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c.ts

Found 2 errors.



//// [/user/username/projects/transitiveReferences/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;


//// [/user/username/projects/transitiveReferences/a.d.ts]
export declare class A {
}


//// [/user/username/projects/transitiveReferences/tsconfig.a.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./a.ts"],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-7808316224-export class A {}\n","signature":"-8728835846-export declare class A {\n}\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./a.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/transitiveReferences/tsconfig.a.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./a.ts"
  ],
  "fileInfos": {
    "../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "original": {
        "version": "-7808316224-export class A {}\n",
        "signature": "-8728835846-export declare class A {\n}\n"
      },
      "version": "-7808316224-export class A {}\n",
      "signature": "-8728835846-export declare class A {\n}\n"
    }
  },
  "root": [
    [
      2,
      "./a.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./a.d.ts",
  "version": "FakeTSVersion",
  "size": 725
}

//// [/user/username/projects/transitiveReferences/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
var a_1 = require("@ref/a");
exports.b = new a_1.A();


//// [/user/username/projects/transitiveReferences/b.d.ts]
import { A } from '@ref/a';
export declare const b: A;


//// [/user/username/projects/transitiveReferences/tsconfig.b.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./a.d.ts","./b.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-8728835846-export declare class A {\n}\n",{"version":"-3899816362-import {A} from '@ref/a';\nexport const b = new A();\n","signature":"-9732944696-import { A } from '@ref/a';\nexport declare const b: A;\n"}],"root":[3],"options":{"composite":true},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[1,2,3],"latestChangedDtsFile":"./b.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/transitiveReferences/tsconfig.b.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./a.d.ts",
    "./b.ts"
  ],
  "fileIdsList": [
    [
      "./a.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.d.ts": {
      "version": "-8728835846-export declare class A {\n}\n",
      "signature": "-8728835846-export declare class A {\n}\n"
    },
    "./b.ts": {
      "original": {
        "version": "-3899816362-import {A} from '@ref/a';\nexport const b = new A();\n",
        "signature": "-9732944696-import { A } from '@ref/a';\nexport declare const b: A;\n"
      },
      "version": "-3899816362-import {A} from '@ref/a';\nexport const b = new A();\n",
      "signature": "-9732944696-import { A } from '@ref/a';\nexport declare const b: A;\n"
    }
  },
  "root": [
    [
      3,
      "./b.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./b.ts": [
      "./a.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../../../home/src/tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./a.d.ts",
      "not cached or not changed"
    ],
    [
      "./b.ts",
      "not cached or not changed"
    ]
  ],
  "latestChangedDtsFile": "./b.d.ts",
  "version": "FakeTSVersion",
  "size": 924
}

//// [/user/username/projects/transitiveReferences/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b_1 = require("./b");
var a_1 = require("@ref/a");
b_1.b;
a_1.X;


//// [/user/username/projects/transitiveReferences/tsconfig.c.tsbuildinfo]
{"root":["./c.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/user/username/projects/transitiveReferences/tsconfig.c.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./c.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 59
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
