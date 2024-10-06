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
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-7808316224-export class A {}\n","signature":"-8728835846-export declare class A {\n}\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./a.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/transitiveReferences/tsconfig.a.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./a.ts"
  ],
  "fileInfos": {
    "../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
  "size": 765
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
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./a.d.ts","./b.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-8728835846-export declare class A {\n}\n",{"version":"-3899816362-import {A} from '@ref/a';\nexport const b = new A();\n","signature":"-9732944696-import { A } from '@ref/a';\nexport declare const b: A;\n"}],"root":[3],"options":{"composite":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./b.d.ts","version":"FakeTSVersion"}

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
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
  "latestChangedDtsFile": "./b.d.ts",
  "version": "FakeTSVersion",
  "size": 927
}

//// [/user/username/projects/transitiveReferences/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b_1 = require("./b");
var a_1 = require("@ref/a");
b_1.b;
a_1.X;


//// [/user/username/projects/transitiveReferences/tsconfig.c.tsbuildinfo]
{"root":["./c.ts"],"version":"FakeTSVersion"}

//// [/user/username/projects/transitiveReferences/tsconfig.c.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./c.ts"
  ],
  "version": "FakeTSVersion",
  "size": 45
}


/home/src/tslibs/TS/Lib/tsc.js -w -p tsconfig.c.json --traceResolution --explainFiles
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

======== Resolving module './b' from '/user/username/projects/transitiveReferences/c.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/user/username/projects/transitiveReferences/b', target file types: TypeScript, Declaration.
File '/user/username/projects/transitiveReferences/b.ts' exists - use it as a name resolution result.
======== Module name './b' was successfully resolved to '/user/username/projects/transitiveReferences/b.ts'. ========
======== Resolving module '@ref/a' from '/user/username/projects/transitiveReferences/c.ts'. ========
Module resolution kind is not specified, using 'Node10'.
'baseUrl' option is set to '/user/username/projects/transitiveReferences', using this value to resolve non-relative module name '@ref/a'.
'paths' option is specified, looking for a pattern to match module name '@ref/a'.
Module name '@ref/a', matched pattern '@ref/*'.
Trying substitution './refs/*', candidate module location: './refs/a'.
Loading module as file / folder, candidate module location '/user/username/projects/transitiveReferences/refs/a', target file types: TypeScript, Declaration.
File '/user/username/projects/transitiveReferences/refs/a.ts' does not exist.
File '/user/username/projects/transitiveReferences/refs/a.tsx' does not exist.
File '/user/username/projects/transitiveReferences/refs/a.d.ts' exists - use it as a name resolution result.
======== Module name '@ref/a' was successfully resolved to '/user/username/projects/transitiveReferences/refs/a.d.ts'. ========
======== Resolving module '@ref/a' from '/user/username/projects/transitiveReferences/b.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/transitiveReferences/tsconfig.b.json'.
Module resolution kind is not specified, using 'Node10'.
======== Module name '@ref/a' was successfully resolved to '/user/username/projects/transitiveReferences/a.ts'. ========
../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
a.d.ts
  Imported via '@ref/a' from file 'b.d.ts'
  File is output of project reference source 'a.ts'
b.d.ts
  Imported via './b' from file 'c.ts'
  File is output of project reference source 'b.ts'
refs/a.d.ts
  Imported via "@ref/a" from file 'c.ts'
c.ts
  Part of 'files' list in tsconfig.json
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/transitiveReferences/c.js] file written with same contents

PolledWatches::
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/transitiveReferences/a.d.ts: *new*
  {}
/user/username/projects/transitiveReferences/b.d.ts: *new*
  {}
/user/username/projects/transitiveReferences/c.ts: *new*
  {}
/user/username/projects/transitiveReferences/refs/a.d.ts: *new*
  {}
/user/username/projects/transitiveReferences/tsconfig.a.json: *new*
  {}
/user/username/projects/transitiveReferences/tsconfig.b.json: *new*
  {}
/user/username/projects/transitiveReferences/tsconfig.c.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/transitiveReferences/refs: *new*
  {}

Program root files: [
  "/user/username/projects/transitiveReferences/c.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/transitiveReferences",
  "paths": {
    "@ref/*": [
      "./refs/*"
    ]
  },
  "pathsBasePath": "/user/username/projects/transitiveReferences",
  "watch": true,
  "project": "/user/username/projects/transitiveReferences/tsconfig.c.json",
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/transitiveReferences/tsconfig.c.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/b.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/b.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/transitivereferences/a.d.ts (used version)
/user/username/projects/transitivereferences/b.d.ts (used version)
/user/username/projects/transitivereferences/refs/a.d.ts (used version)
/user/username/projects/transitivereferences/c.ts (used version)

Dependencies for::
/home/src/tslibs/TS/Lib/lib.d.ts:
  /home/src/tslibs/TS/Lib/lib.d.ts
  /user/username/projects/transitiveReferences/a.d.ts
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/c.ts
/user/username/projects/transitiveReferences/a.d.ts:
  /user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/b.d.ts:
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c.ts:
  /user/username/projects/transitiveReferences/c.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/a.d.ts

exitCode:: ExitStatus.undefined

Change:: non local edit b ts, and build b

Input::
//// [/user/username/projects/transitiveReferences/b.ts]
import {A} from '@ref/a';
export const b = new A();
export function gfoo() { }

//// [/user/username/projects/transitiveReferences/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.gfoo = gfoo;
var a_1 = require("@ref/a");
exports.b = new a_1.A();
function gfoo() { }


//// [/user/username/projects/transitiveReferences/b.d.ts]
import { A } from '@ref/a';
export declare const b: A;
export declare function gfoo(): void;


//// [/user/username/projects/transitiveReferences/tsconfig.b.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./a.d.ts","./b.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-8728835846-export declare class A {\n}\n",{"version":"-3352421102-import {A} from '@ref/a';\nexport const b = new A();\nexport function gfoo() { }","signature":"4376023469-import { A } from '@ref/a';\nexport declare const b: A;\nexport declare function gfoo(): void;\n"}],"root":[3],"options":{"composite":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./b.d.ts","version":"FakeTSVersion"}

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
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.d.ts": {
      "version": "-8728835846-export declare class A {\n}\n",
      "signature": "-8728835846-export declare class A {\n}\n"
    },
    "./b.ts": {
      "original": {
        "version": "-3352421102-import {A} from '@ref/a';\nexport const b = new A();\nexport function gfoo() { }",
        "signature": "4376023469-import { A } from '@ref/a';\nexport declare const b: A;\nexport declare function gfoo(): void;\n"
      },
      "version": "-3352421102-import {A} from '@ref/a';\nexport const b = new A();\nexport function gfoo() { }",
      "signature": "4376023469-import { A } from '@ref/a';\nexport declare const b: A;\nexport declare function gfoo(): void;\n"
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
  "latestChangedDtsFile": "./b.d.ts",
  "version": "FakeTSVersion",
  "size": 991
}


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module '@ref/a' from '/user/username/projects/transitiveReferences/b.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/a.ts'.
../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
a.d.ts
  Imported via '@ref/a' from file 'b.d.ts'
  File is output of project reference source 'a.ts'
b.d.ts
  Imported via './b' from file 'c.ts'
  File is output of project reference source 'b.ts'
refs/a.d.ts
  Imported via "@ref/a" from file 'c.ts'
c.ts
  Part of 'files' list in tsconfig.json
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/transitiveReferences/c.js] file written with same contents


Program root files: [
  "/user/username/projects/transitiveReferences/c.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/transitiveReferences",
  "paths": {
    "@ref/*": [
      "./refs/*"
    ]
  },
  "pathsBasePath": "/user/username/projects/transitiveReferences",
  "watch": true,
  "project": "/user/username/projects/transitiveReferences/tsconfig.c.json",
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/transitiveReferences/tsconfig.c.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/b.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/b.d.ts
/user/username/projects/transitiveReferences/c.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/b.d.ts (used version)
/user/username/projects/transitivereferences/c.ts (computed .d.ts)

Dependencies for::
/home/src/tslibs/TS/Lib/lib.d.ts:
  /home/src/tslibs/TS/Lib/lib.d.ts
  /user/username/projects/transitiveReferences/a.d.ts
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/c.ts
/user/username/projects/transitiveReferences/a.d.ts:
  /user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/b.d.ts:
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c.ts:
  /user/username/projects/transitiveReferences/c.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/a.d.ts

exitCode:: ExitStatus.undefined

Change:: edit on config file

Input::
//// [/user/username/projects/transitiveReferences/tsconfig.c.json]
{
  "files": [
    "c.ts"
  ],
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@ref/*": [
        "./nrefs/*"
      ]
    }
  },
  "references": [
    {
      "path": "tsconfig.b.json"
    }
  ]
}

//// [/user/username/projects/transitiveReferences/nrefs/a.d.ts]
export class X {}
export class A {}



Timeout callback:: count: 1
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
2: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

======== Resolving module './b' from '/user/username/projects/transitiveReferences/c.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/user/username/projects/transitiveReferences/b', target file types: TypeScript, Declaration.
File '/user/username/projects/transitiveReferences/b.ts' exists - use it as a name resolution result.
======== Module name './b' was successfully resolved to '/user/username/projects/transitiveReferences/b.ts'. ========
======== Resolving module '@ref/a' from '/user/username/projects/transitiveReferences/c.ts'. ========
Module resolution kind is not specified, using 'Node10'.
'baseUrl' option is set to '/user/username/projects/transitiveReferences', using this value to resolve non-relative module name '@ref/a'.
'paths' option is specified, looking for a pattern to match module name '@ref/a'.
Module name '@ref/a', matched pattern '@ref/*'.
Trying substitution './nrefs/*', candidate module location: './nrefs/a'.
Loading module as file / folder, candidate module location '/user/username/projects/transitiveReferences/nrefs/a', target file types: TypeScript, Declaration.
File '/user/username/projects/transitiveReferences/nrefs/a.ts' does not exist.
File '/user/username/projects/transitiveReferences/nrefs/a.tsx' does not exist.
File '/user/username/projects/transitiveReferences/nrefs/a.d.ts' exists - use it as a name resolution result.
======== Module name '@ref/a' was successfully resolved to '/user/username/projects/transitiveReferences/nrefs/a.d.ts'. ========
======== Resolving module '@ref/a' from '/user/username/projects/transitiveReferences/b.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/transitiveReferences/tsconfig.b.json'.
Module resolution kind is not specified, using 'Node10'.
======== Module name '@ref/a' was successfully resolved to '/user/username/projects/transitiveReferences/a.ts'. ========
../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
a.d.ts
  Imported via '@ref/a' from file 'b.d.ts'
  File is output of project reference source 'a.ts'
b.d.ts
  Imported via './b' from file 'c.ts'
  File is output of project reference source 'b.ts'
nrefs/a.d.ts
  Imported via "@ref/a" from file 'c.ts'
c.ts
  Part of 'files' list in tsconfig.json
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/transitiveReferences/c.js] file written with same contents

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/transitiveReferences/a.d.ts:
  {}
/user/username/projects/transitiveReferences/b.d.ts:
  {}
/user/username/projects/transitiveReferences/c.ts:
  {}
/user/username/projects/transitiveReferences/nrefs/a.d.ts: *new*
  {}
/user/username/projects/transitiveReferences/tsconfig.a.json:
  {}
/user/username/projects/transitiveReferences/tsconfig.b.json:
  {}
/user/username/projects/transitiveReferences/tsconfig.c.json:
  {}

FsWatches *deleted*::
/user/username/projects/transitiveReferences/refs/a.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/transitiveReferences/nrefs: *new*
  {}

FsWatchesRecursive *deleted*::
/user/username/projects/transitiveReferences/refs:
  {}


Program root files: [
  "/user/username/projects/transitiveReferences/c.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/transitiveReferences",
  "paths": {
    "@ref/*": [
      "./nrefs/*"
    ]
  },
  "pathsBasePath": "/user/username/projects/transitiveReferences",
  "watch": true,
  "project": "/user/username/projects/transitiveReferences/tsconfig.c.json",
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/transitiveReferences/tsconfig.c.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/b.d.ts
/user/username/projects/transitiveReferences/nrefs/a.d.ts
/user/username/projects/transitiveReferences/c.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/nrefs/a.d.ts
/user/username/projects/transitiveReferences/c.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/nrefs/a.d.ts (used version)
/user/username/projects/transitivereferences/c.ts (computed .d.ts)

Dependencies for::
/home/src/tslibs/TS/Lib/lib.d.ts:
  /home/src/tslibs/TS/Lib/lib.d.ts
  /user/username/projects/transitiveReferences/a.d.ts
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/nrefs/a.d.ts
  /user/username/projects/transitiveReferences/c.ts
/user/username/projects/transitiveReferences/a.d.ts:
  /user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/b.d.ts:
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/nrefs/a.d.ts:
  /user/username/projects/transitiveReferences/nrefs/a.d.ts
/user/username/projects/transitiveReferences/c.ts:
  /user/username/projects/transitiveReferences/c.ts
  /user/username/projects/transitiveReferences/nrefs/a.d.ts
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/a.d.ts

exitCode:: ExitStatus.undefined

Change:: Revert config file edit

Input::
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


Timeout callback:: count: 1
3: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
3: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

======== Resolving module './b' from '/user/username/projects/transitiveReferences/c.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/user/username/projects/transitiveReferences/b', target file types: TypeScript, Declaration.
File '/user/username/projects/transitiveReferences/b.ts' exists - use it as a name resolution result.
======== Module name './b' was successfully resolved to '/user/username/projects/transitiveReferences/b.ts'. ========
======== Resolving module '@ref/a' from '/user/username/projects/transitiveReferences/c.ts'. ========
Module resolution kind is not specified, using 'Node10'.
'baseUrl' option is set to '/user/username/projects/transitiveReferences', using this value to resolve non-relative module name '@ref/a'.
'paths' option is specified, looking for a pattern to match module name '@ref/a'.
Module name '@ref/a', matched pattern '@ref/*'.
Trying substitution './refs/*', candidate module location: './refs/a'.
Loading module as file / folder, candidate module location '/user/username/projects/transitiveReferences/refs/a', target file types: TypeScript, Declaration.
File '/user/username/projects/transitiveReferences/refs/a.ts' does not exist.
File '/user/username/projects/transitiveReferences/refs/a.tsx' does not exist.
File '/user/username/projects/transitiveReferences/refs/a.d.ts' exists - use it as a name resolution result.
======== Module name '@ref/a' was successfully resolved to '/user/username/projects/transitiveReferences/refs/a.d.ts'. ========
======== Resolving module '@ref/a' from '/user/username/projects/transitiveReferences/b.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/transitiveReferences/tsconfig.b.json'.
Module resolution kind is not specified, using 'Node10'.
======== Module name '@ref/a' was successfully resolved to '/user/username/projects/transitiveReferences/a.ts'. ========
../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
a.d.ts
  Imported via '@ref/a' from file 'b.d.ts'
  File is output of project reference source 'a.ts'
b.d.ts
  Imported via './b' from file 'c.ts'
  File is output of project reference source 'b.ts'
refs/a.d.ts
  Imported via "@ref/a" from file 'c.ts'
c.ts
  Part of 'files' list in tsconfig.json
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/transitiveReferences/c.js] file written with same contents

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/transitiveReferences/a.d.ts:
  {}
/user/username/projects/transitiveReferences/b.d.ts:
  {}
/user/username/projects/transitiveReferences/c.ts:
  {}
/user/username/projects/transitiveReferences/refs/a.d.ts: *new*
  {}
/user/username/projects/transitiveReferences/tsconfig.a.json:
  {}
/user/username/projects/transitiveReferences/tsconfig.b.json:
  {}
/user/username/projects/transitiveReferences/tsconfig.c.json:
  {}

FsWatches *deleted*::
/user/username/projects/transitiveReferences/nrefs/a.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/transitiveReferences/refs: *new*
  {}

FsWatchesRecursive *deleted*::
/user/username/projects/transitiveReferences/nrefs:
  {}


Program root files: [
  "/user/username/projects/transitiveReferences/c.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/transitiveReferences",
  "paths": {
    "@ref/*": [
      "./refs/*"
    ]
  },
  "pathsBasePath": "/user/username/projects/transitiveReferences",
  "watch": true,
  "project": "/user/username/projects/transitiveReferences/tsconfig.c.json",
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/transitiveReferences/tsconfig.c.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/b.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/refs/a.d.ts (used version)
/user/username/projects/transitivereferences/c.ts (computed .d.ts)

Dependencies for::
/home/src/tslibs/TS/Lib/lib.d.ts:
  /home/src/tslibs/TS/Lib/lib.d.ts
  /user/username/projects/transitiveReferences/a.d.ts
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/c.ts
/user/username/projects/transitiveReferences/a.d.ts:
  /user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/b.d.ts:
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c.ts:
  /user/username/projects/transitiveReferences/c.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/a.d.ts

exitCode:: ExitStatus.undefined

Change:: edit in referenced config file

Input::
//// [/user/username/projects/transitiveReferences/tsconfig.b.json]
{
  "compilerOptions": {
    "composite": true,
    "baseUrl": "./",
    "paths": {
      "@ref/*": [
        "./nrefs/*"
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


Timeout callback:: count: 1
4: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
4: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module './b' from '/user/username/projects/transitiveReferences/c.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/b.ts'.
Reusing resolution of module '@ref/a' from '/user/username/projects/transitiveReferences/c.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/refs/a.d.ts'.
======== Resolving module '@ref/a' from '/user/username/projects/transitiveReferences/b.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/transitiveReferences/tsconfig.b.json'.
Module resolution kind is not specified, using 'Node10'.
======== Module name '@ref/a' was successfully resolved to '/user/username/projects/transitiveReferences/nrefs/a.d.ts'. ========
../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
nrefs/a.d.ts
  Imported via '@ref/a' from file 'b.d.ts'
b.d.ts
  Imported via './b' from file 'c.ts'
  File is output of project reference source 'b.ts'
refs/a.d.ts
  Imported via "@ref/a" from file 'c.ts'
c.ts
  Part of 'files' list in tsconfig.json
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.




PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/transitiveReferences/b.d.ts:
  {}
/user/username/projects/transitiveReferences/c.ts:
  {}
/user/username/projects/transitiveReferences/nrefs/a.d.ts: *new*
  {}
/user/username/projects/transitiveReferences/refs/a.d.ts:
  {}
/user/username/projects/transitiveReferences/tsconfig.a.json:
  {}
/user/username/projects/transitiveReferences/tsconfig.b.json:
  {}
/user/username/projects/transitiveReferences/tsconfig.c.json:
  {}

FsWatches *deleted*::
/user/username/projects/transitiveReferences/a.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/transitiveReferences/nrefs: *new*
  {}
/user/username/projects/transitiveReferences/refs:
  {}


Program root files: [
  "/user/username/projects/transitiveReferences/c.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/transitiveReferences",
  "paths": {
    "@ref/*": [
      "./refs/*"
    ]
  },
  "pathsBasePath": "/user/username/projects/transitiveReferences",
  "watch": true,
  "project": "/user/username/projects/transitiveReferences/tsconfig.c.json",
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/transitiveReferences/tsconfig.c.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/nrefs/a.d.ts
/user/username/projects/transitiveReferences/b.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/nrefs/a.d.ts
/user/username/projects/transitiveReferences/b.d.ts
/user/username/projects/transitiveReferences/c.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/nrefs/a.d.ts (used version)
/user/username/projects/transitivereferences/b.d.ts (used version)
/user/username/projects/transitivereferences/c.ts (used version)

Dependencies for::
/home/src/tslibs/TS/Lib/lib.d.ts:
  /home/src/tslibs/TS/Lib/lib.d.ts
  /user/username/projects/transitiveReferences/nrefs/a.d.ts
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/c.ts
/user/username/projects/transitiveReferences/nrefs/a.d.ts:
  /user/username/projects/transitiveReferences/nrefs/a.d.ts
/user/username/projects/transitiveReferences/b.d.ts:
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/nrefs/a.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c.ts:
  /user/username/projects/transitiveReferences/c.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/nrefs/a.d.ts

exitCode:: ExitStatus.undefined

Change:: Revert referenced config file edit

Input::
//// [/user/username/projects/transitiveReferences/tsconfig.b.json]
{
  "compilerOptions": {
    "composite": true,
    "baseUrl": "./",
    "paths": {
      "@ref/*": [
        "./refs/*"
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


Timeout callback:: count: 1
5: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
5: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module './b' from '/user/username/projects/transitiveReferences/c.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/b.ts'.
Reusing resolution of module '@ref/a' from '/user/username/projects/transitiveReferences/c.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/refs/a.d.ts'.
======== Resolving module '@ref/a' from '/user/username/projects/transitiveReferences/b.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/transitiveReferences/tsconfig.b.json'.
Module resolution kind is not specified, using 'Node10'.
======== Module name '@ref/a' was successfully resolved to '/user/username/projects/transitiveReferences/refs/a.d.ts'. ========
../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
refs/a.d.ts
  Imported via '@ref/a' from file 'b.d.ts'
  Imported via "@ref/a" from file 'c.ts'
b.d.ts
  Imported via './b' from file 'c.ts'
  File is output of project reference source 'b.ts'
c.ts
  Part of 'files' list in tsconfig.json
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.




PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/transitiveReferences/b.d.ts:
  {}
/user/username/projects/transitiveReferences/c.ts:
  {}
/user/username/projects/transitiveReferences/refs/a.d.ts:
  {}
/user/username/projects/transitiveReferences/tsconfig.a.json:
  {}
/user/username/projects/transitiveReferences/tsconfig.b.json:
  {}
/user/username/projects/transitiveReferences/tsconfig.c.json:
  {}

FsWatches *deleted*::
/user/username/projects/transitiveReferences/nrefs/a.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/transitiveReferences/refs:
  {}

FsWatchesRecursive *deleted*::
/user/username/projects/transitiveReferences/nrefs:
  {}


Program root files: [
  "/user/username/projects/transitiveReferences/c.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/transitiveReferences",
  "paths": {
    "@ref/*": [
      "./refs/*"
    ]
  },
  "pathsBasePath": "/user/username/projects/transitiveReferences",
  "watch": true,
  "project": "/user/username/projects/transitiveReferences/tsconfig.c.json",
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/transitiveReferences/tsconfig.c.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/b.d.ts
/user/username/projects/transitiveReferences/c.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/b.d.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/b.d.ts (used version)

Dependencies for::
/home/src/tslibs/TS/Lib/lib.d.ts:
  /home/src/tslibs/TS/Lib/lib.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/c.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/b.d.ts:
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c.ts:
  /user/username/projects/transitiveReferences/c.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b.d.ts

exitCode:: ExitStatus.undefined

Change:: deleting referenced config file

Input::
//// [/user/username/projects/transitiveReferences/tsconfig.b.json] deleted

Timeout callback:: count: 1
6: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
6: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module './b' from '/user/username/projects/transitiveReferences/c.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/b.ts'.
Reusing resolution of module '@ref/a' from '/user/username/projects/transitiveReferences/c.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/refs/a.d.ts'.
======== Resolving module '@ref/a' from '/user/username/projects/transitiveReferences/b.ts'. ========
Module resolution kind is not specified, using 'Node10'.
'baseUrl' option is set to '/user/username/projects/transitiveReferences', using this value to resolve non-relative module name '@ref/a'.
'paths' option is specified, looking for a pattern to match module name '@ref/a'.
Module name '@ref/a', matched pattern '@ref/*'.
Trying substitution './refs/*', candidate module location: './refs/a'.
Loading module as file / folder, candidate module location '/user/username/projects/transitiveReferences/refs/a', target file types: TypeScript, Declaration.
File '/user/username/projects/transitiveReferences/refs/a.ts' does not exist.
File '/user/username/projects/transitiveReferences/refs/a.tsx' does not exist.
File '/user/username/projects/transitiveReferences/refs/a.d.ts' exists - use it as a name resolution result.
======== Module name '@ref/a' was successfully resolved to '/user/username/projects/transitiveReferences/refs/a.d.ts'. ========
[96mtsconfig.c.json[0m:[93m14[0m:[93m5[0m - [91merror[0m[90m TS6053: [0mFile '/user/username/projects/transitiveReferences/tsconfig.b.json' not found.

[7m14[0m     {
[7m  [0m [91m    ~[0m
[7m15[0m       "path": "tsconfig.b.json"
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m16[0m     }
[7m  [0m [91m~~~~~[0m

../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
refs/a.d.ts
  Imported via '@ref/a' from file 'b.ts'
  Imported via "@ref/a" from file 'c.ts'
b.ts
  Imported via './b' from file 'c.ts'
c.ts
  Part of 'files' list in tsconfig.json
[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/transitiveReferences/b.js] file written with same contents
//// [/user/username/projects/transitiveReferences/c.js] file written with same contents

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/transitiveReferences/b.ts: *new*
  {}
/user/username/projects/transitiveReferences/c.ts:
  {}
/user/username/projects/transitiveReferences/refs/a.d.ts:
  {}
/user/username/projects/transitiveReferences/tsconfig.b.json:
  {}
/user/username/projects/transitiveReferences/tsconfig.c.json:
  {}

FsWatches *deleted*::
/user/username/projects/transitiveReferences/b.d.ts:
  {}
/user/username/projects/transitiveReferences/tsconfig.a.json:
  {}

FsWatchesRecursive::
/user/username/projects/transitiveReferences/refs:
  {}


Program root files: [
  "/user/username/projects/transitiveReferences/c.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/transitiveReferences",
  "paths": {
    "@ref/*": [
      "./refs/*"
    ]
  },
  "pathsBasePath": "/user/username/projects/transitiveReferences",
  "watch": true,
  "project": "/user/username/projects/transitiveReferences/tsconfig.c.json",
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/transitiveReferences/tsconfig.c.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/b.ts
/user/username/projects/transitiveReferences/c.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/b.ts
/user/username/projects/transitiveReferences/c.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/b.ts (computed .d.ts)
/user/username/projects/transitivereferences/c.ts (computed .d.ts)

Dependencies for::
/home/src/tslibs/TS/Lib/lib.d.ts:
  /home/src/tslibs/TS/Lib/lib.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b.ts
  /user/username/projects/transitiveReferences/c.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/b.ts:
  /user/username/projects/transitiveReferences/b.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c.ts:
  /user/username/projects/transitiveReferences/c.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b.ts

exitCode:: ExitStatus.undefined

Change:: Revert deleting referenced config file

Input::
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


Timeout callback:: count: 1
7: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
7: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module './b' from '/user/username/projects/transitiveReferences/c.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/b.ts'.
Reusing resolution of module '@ref/a' from '/user/username/projects/transitiveReferences/c.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/refs/a.d.ts'.
======== Resolving module '@ref/a' from '/user/username/projects/transitiveReferences/b.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/transitiveReferences/tsconfig.b.json'.
Module resolution kind is not specified, using 'Node10'.
======== Module name '@ref/a' was successfully resolved to '/user/username/projects/transitiveReferences/a.ts'. ========
../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
a.d.ts
  Imported via '@ref/a' from file 'b.d.ts'
  File is output of project reference source 'a.ts'
b.d.ts
  Imported via './b' from file 'c.ts'
  File is output of project reference source 'b.ts'
refs/a.d.ts
  Imported via "@ref/a" from file 'c.ts'
c.ts
  Part of 'files' list in tsconfig.json
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/transitiveReferences/c.js] file written with same contents

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/transitiveReferences/a.d.ts: *new*
  {}
/user/username/projects/transitiveReferences/b.d.ts: *new*
  {}
/user/username/projects/transitiveReferences/c.ts:
  {}
/user/username/projects/transitiveReferences/refs/a.d.ts:
  {}
/user/username/projects/transitiveReferences/tsconfig.a.json: *new*
  {}
/user/username/projects/transitiveReferences/tsconfig.b.json:
  {}
/user/username/projects/transitiveReferences/tsconfig.c.json:
  {}

FsWatches *deleted*::
/user/username/projects/transitiveReferences/b.ts:
  {}

FsWatchesRecursive::
/user/username/projects/transitiveReferences/refs:
  {}


Program root files: [
  "/user/username/projects/transitiveReferences/c.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/transitiveReferences",
  "paths": {
    "@ref/*": [
      "./refs/*"
    ]
  },
  "pathsBasePath": "/user/username/projects/transitiveReferences",
  "watch": true,
  "project": "/user/username/projects/transitiveReferences/tsconfig.c.json",
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/transitiveReferences/tsconfig.c.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/b.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/b.d.ts
/user/username/projects/transitiveReferences/c.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/a.d.ts (used version)
/user/username/projects/transitivereferences/b.d.ts (used version)
/user/username/projects/transitivereferences/c.ts (computed .d.ts)

Dependencies for::
/home/src/tslibs/TS/Lib/lib.d.ts:
  /home/src/tslibs/TS/Lib/lib.d.ts
  /user/username/projects/transitiveReferences/a.d.ts
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/c.ts
/user/username/projects/transitiveReferences/a.d.ts:
  /user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/b.d.ts:
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c.ts:
  /user/username/projects/transitiveReferences/c.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/a.d.ts

exitCode:: ExitStatus.undefined

Change:: deleting transitively referenced config file

Input::
//// [/user/username/projects/transitiveReferences/tsconfig.a.json] deleted

Timeout callback:: count: 1
8: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
8: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module './b' from '/user/username/projects/transitiveReferences/c.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/b.ts'.
Reusing resolution of module '@ref/a' from '/user/username/projects/transitiveReferences/c.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/refs/a.d.ts'.
Reusing resolution of module '@ref/a' from '/user/username/projects/transitiveReferences/b.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/a.ts'.
[96mtsconfig.b.json[0m:[93m15[0m:[93m5[0m - [91merror[0m[90m TS6053: [0mFile '/user/username/projects/transitiveReferences/tsconfig.a.json' not found.

[7m15[0m     {
[7m  [0m [91m    ~[0m
[7m16[0m       "path": "tsconfig.a.json"
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m17[0m     }
[7m  [0m [91m~~~~~[0m

../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
a.ts
  Imported via '@ref/a' from file 'b.d.ts'
b.d.ts
  Imported via './b' from file 'c.ts'
  File is output of project reference source 'b.ts'
refs/a.d.ts
  Imported via "@ref/a" from file 'c.ts'
c.ts
  Part of 'files' list in tsconfig.json
[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/transitiveReferences/a.js] file written with same contents

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/transitiveReferences/a.ts: *new*
  {}
/user/username/projects/transitiveReferences/b.d.ts:
  {}
/user/username/projects/transitiveReferences/c.ts:
  {}
/user/username/projects/transitiveReferences/refs/a.d.ts:
  {}
/user/username/projects/transitiveReferences/tsconfig.a.json:
  {}
/user/username/projects/transitiveReferences/tsconfig.b.json:
  {}
/user/username/projects/transitiveReferences/tsconfig.c.json:
  {}

FsWatches *deleted*::
/user/username/projects/transitiveReferences/a.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/transitiveReferences/refs:
  {}


Program root files: [
  "/user/username/projects/transitiveReferences/c.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/transitiveReferences",
  "paths": {
    "@ref/*": [
      "./refs/*"
    ]
  },
  "pathsBasePath": "/user/username/projects/transitiveReferences",
  "watch": true,
  "project": "/user/username/projects/transitiveReferences/tsconfig.c.json",
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/transitiveReferences/tsconfig.c.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/a.ts
/user/username/projects/transitiveReferences/b.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/a.ts
/user/username/projects/transitiveReferences/b.d.ts
/user/username/projects/transitiveReferences/c.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/a.ts (computed .d.ts)
/user/username/projects/transitivereferences/b.d.ts (used version)
/user/username/projects/transitivereferences/c.ts (used version)

Dependencies for::
/home/src/tslibs/TS/Lib/lib.d.ts:
  /home/src/tslibs/TS/Lib/lib.d.ts
  /user/username/projects/transitiveReferences/a.ts
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/c.ts
/user/username/projects/transitiveReferences/a.ts:
  /user/username/projects/transitiveReferences/a.ts
/user/username/projects/transitiveReferences/b.d.ts:
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/a.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c.ts:
  /user/username/projects/transitiveReferences/c.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/a.ts

exitCode:: ExitStatus.undefined

Change:: Revert deleting transitively referenced config file

Input::
//// [/user/username/projects/transitiveReferences/tsconfig.a.json]
{
  "compilerOptions": {
    "composite": true
  },
  "files": [
    "a.ts"
  ]
}


Timeout callback:: count: 1
9: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
9: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module './b' from '/user/username/projects/transitiveReferences/c.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/b.ts'.
Reusing resolution of module '@ref/a' from '/user/username/projects/transitiveReferences/c.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/refs/a.d.ts'.
Reusing resolution of module '@ref/a' from '/user/username/projects/transitiveReferences/b.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/a.ts'.
../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
a.d.ts
  Imported via '@ref/a' from file 'b.d.ts'
  File is output of project reference source 'a.ts'
b.d.ts
  Imported via './b' from file 'c.ts'
  File is output of project reference source 'b.ts'
refs/a.d.ts
  Imported via "@ref/a" from file 'c.ts'
c.ts
  Part of 'files' list in tsconfig.json
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.




PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/transitiveReferences/a.d.ts: *new*
  {}
/user/username/projects/transitiveReferences/b.d.ts:
  {}
/user/username/projects/transitiveReferences/c.ts:
  {}
/user/username/projects/transitiveReferences/refs/a.d.ts:
  {}
/user/username/projects/transitiveReferences/tsconfig.a.json:
  {}
/user/username/projects/transitiveReferences/tsconfig.b.json:
  {}
/user/username/projects/transitiveReferences/tsconfig.c.json:
  {}

FsWatches *deleted*::
/user/username/projects/transitiveReferences/a.ts:
  {}

FsWatchesRecursive::
/user/username/projects/transitiveReferences/refs:
  {}


Program root files: [
  "/user/username/projects/transitiveReferences/c.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/transitiveReferences",
  "paths": {
    "@ref/*": [
      "./refs/*"
    ]
  },
  "pathsBasePath": "/user/username/projects/transitiveReferences",
  "watch": true,
  "project": "/user/username/projects/transitiveReferences/tsconfig.c.json",
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/transitiveReferences/tsconfig.c.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/b.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/b.d.ts
/user/username/projects/transitiveReferences/c.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/a.d.ts (used version)
/user/username/projects/transitivereferences/b.d.ts (used version)
/user/username/projects/transitivereferences/c.ts (used version)

Dependencies for::
/home/src/tslibs/TS/Lib/lib.d.ts:
  /home/src/tslibs/TS/Lib/lib.d.ts
  /user/username/projects/transitiveReferences/a.d.ts
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/c.ts
/user/username/projects/transitiveReferences/a.d.ts:
  /user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/b.d.ts:
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c.ts:
  /user/username/projects/transitiveReferences/c.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/a.d.ts

exitCode:: ExitStatus.undefined
