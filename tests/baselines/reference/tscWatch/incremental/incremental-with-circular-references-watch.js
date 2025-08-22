currentDirectory:: /users/username/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/users/username/projects/project/a.ts]
import { B } from "./b";
export interface A {
    b: B;
}


//// [/users/username/projects/project/b.ts]
import { C } from "./c";
export interface B {
    b: C;
}


//// [/users/username/projects/project/c.ts]
import { A } from "./a";
export interface C {
    a: A;
}


//// [/users/username/projects/project/index.ts]
export { A } from "./a";
export { B } from "./b";
export { C } from "./c";


//// [/users/username/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "incremental": true,
    "target": "es5",
    "module": "commonjs",
    "declaration": true,
    "emitDeclarationOnly": true
  }
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


/home/src/tslibs/TS/Lib/tsc.js -w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/users/username/projects/project/c.d.ts]
import { A } from "./a";
export interface C {
    a: A;
}


//// [/users/username/projects/project/b.d.ts]
import { C } from "./c";
export interface B {
    b: C;
}


//// [/users/username/projects/project/a.d.ts]
import { B } from "./b";
export interface A {
    b: B;
}


//// [/users/username/projects/project/index.d.ts]
export { A } from "./a";
export { B } from "./b";
export { C } from "./c";


//// [/users/username/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./c.ts","./b.ts","./a.ts","./index.ts"],"fileIdsList":[[3],[2],[4],[2,3,4]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-3358372745-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n","2102342013-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n","-9690779495-import { B } from \"./b\";\nexport interface A {\n    b: B;\n}\n","1286756397-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";\n"],"root":[[2,5]],"options":{"declaration":true,"emitDeclarationOnly":true,"module":1,"target":1},"referencedMap":[[4,1],[3,2],[2,3],[5,4]],"version":"FakeTSVersion"}

//// [/users/username/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./c.ts",
    "./b.ts",
    "./a.ts",
    "./index.ts"
  ],
  "fileIdsList": [
    [
      "./b.ts"
    ],
    [
      "./c.ts"
    ],
    [
      "./a.ts"
    ],
    [
      "./c.ts",
      "./b.ts",
      "./a.ts"
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
    "./c.ts": {
      "version": "-3358372745-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n",
      "signature": "-3358372745-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n"
    },
    "./b.ts": {
      "version": "2102342013-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n",
      "signature": "2102342013-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n"
    },
    "./a.ts": {
      "version": "-9690779495-import { B } from \"./b\";\nexport interface A {\n    b: B;\n}\n",
      "signature": "-9690779495-import { B } from \"./b\";\nexport interface A {\n    b: B;\n}\n"
    },
    "./index.ts": {
      "version": "1286756397-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";\n",
      "signature": "1286756397-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";\n"
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./c.ts",
        "./b.ts",
        "./a.ts",
        "./index.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "emitDeclarationOnly": true,
    "module": 1,
    "target": 1
  },
  "referencedMap": {
    "./a.ts": [
      "./b.ts"
    ],
    "./b.ts": [
      "./c.ts"
    ],
    "./c.ts": [
      "./a.ts"
    ],
    "./index.ts": [
      "./c.ts",
      "./b.ts",
      "./a.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1127
}


PolledWatches::
/users/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/users/username/projects/project/a.ts: *new*
  {}
/users/username/projects/project/b.ts: *new*
  {}
/users/username/projects/project/c.ts: *new*
  {}
/users/username/projects/project/index.ts: *new*
  {}
/users/username/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/project: *new*
  {}

Program root files: [
  "/users/username/projects/project/a.ts",
  "/users/username/projects/project/b.ts",
  "/users/username/projects/project/c.ts",
  "/users/username/projects/project/index.ts"
]
Program options: {
  "incremental": true,
  "target": 1,
  "module": 1,
  "declaration": true,
  "emitDeclarationOnly": true,
  "watch": true,
  "configFilePath": "/users/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/c.ts
/users/username/projects/project/b.ts
/users/username/projects/project/a.ts
/users/username/projects/project/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/c.ts
/users/username/projects/project/b.ts
/users/username/projects/project/a.ts
/users/username/projects/project/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/users/username/projects/project/c.ts (used version)
/users/username/projects/project/b.ts (used version)
/users/username/projects/project/a.ts (used version)
/users/username/projects/project/index.ts (used version)

exitCode:: ExitStatus.undefined

Change::

Input::
//// [/users/username/projects/project/a.ts]
import { B } from "./b";
export interface A {
    b: B;
    foo: any;
}



PolledWatches *deleted*::
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches *deleted*::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/users/username/projects/project/a.ts:
  {}
/users/username/projects/project/b.ts:
  {}
/users/username/projects/project/c.ts:
  {}
/users/username/projects/project/index.ts:
  {}
/users/username/projects/project/tsconfig.json:
  {}

FsWatchesRecursive *deleted*::
/users/username/projects/project:
  {}

Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/users/username/projects/project/c.d.ts] file written with same contents
//// [/users/username/projects/project/b.d.ts] file written with same contents
//// [/users/username/projects/project/a.d.ts]
import { B } from "./b";
export interface A {
    b: B;
    foo: any;
}


//// [/users/username/projects/project/index.d.ts] file written with same contents
//// [/users/username/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./c.ts","./b.ts","./a.ts","./index.ts"],"fileIdsList":[[3],[2],[4],[2,3,4]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-3358372745-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n","2102342013-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n","-7623824316-import { B } from \"./b\";\nexport interface A {\n    b: B;\n    foo: any;\n}\n","1286756397-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";\n"],"root":[[2,5]],"options":{"declaration":true,"emitDeclarationOnly":true,"module":1,"target":1},"referencedMap":[[4,1],[3,2],[2,3],[5,4]],"version":"FakeTSVersion"}

//// [/users/username/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./c.ts",
    "./b.ts",
    "./a.ts",
    "./index.ts"
  ],
  "fileIdsList": [
    [
      "./b.ts"
    ],
    [
      "./c.ts"
    ],
    [
      "./a.ts"
    ],
    [
      "./c.ts",
      "./b.ts",
      "./a.ts"
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
    "./c.ts": {
      "version": "-3358372745-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n",
      "signature": "-3358372745-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n"
    },
    "./b.ts": {
      "version": "2102342013-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n",
      "signature": "2102342013-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n"
    },
    "./a.ts": {
      "version": "-7623824316-import { B } from \"./b\";\nexport interface A {\n    b: B;\n    foo: any;\n}\n",
      "signature": "-7623824316-import { B } from \"./b\";\nexport interface A {\n    b: B;\n    foo: any;\n}\n"
    },
    "./index.ts": {
      "version": "1286756397-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";\n",
      "signature": "1286756397-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";\n"
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./c.ts",
        "./b.ts",
        "./a.ts",
        "./index.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "emitDeclarationOnly": true,
    "module": 1,
    "target": 1
  },
  "referencedMap": {
    "./a.ts": [
      "./b.ts"
    ],
    "./b.ts": [
      "./c.ts"
    ],
    "./c.ts": [
      "./a.ts"
    ],
    "./index.ts": [
      "./c.ts",
      "./b.ts",
      "./a.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1142
}


PolledWatches::
/users/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/users/username/projects/project/a.ts: *new*
  {}
/users/username/projects/project/b.ts: *new*
  {}
/users/username/projects/project/c.ts: *new*
  {}
/users/username/projects/project/index.ts: *new*
  {}
/users/username/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/project: *new*
  {}

Program root files: [
  "/users/username/projects/project/a.ts",
  "/users/username/projects/project/b.ts",
  "/users/username/projects/project/c.ts",
  "/users/username/projects/project/index.ts"
]
Program options: {
  "incremental": true,
  "target": 1,
  "module": 1,
  "declaration": true,
  "emitDeclarationOnly": true,
  "watch": true,
  "configFilePath": "/users/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/c.ts
/users/username/projects/project/b.ts
/users/username/projects/project/a.ts
/users/username/projects/project/index.ts

Semantic diagnostics in builder refreshed for::
/users/username/projects/project/c.ts
/users/username/projects/project/b.ts
/users/username/projects/project/a.ts
/users/username/projects/project/index.ts

Shape signatures in builder refreshed for::
/users/username/projects/project/a.ts (computed .d.ts)
/users/username/projects/project/index.ts (computed .d.ts)
/users/username/projects/project/c.ts (computed .d.ts)
/users/username/projects/project/b.ts (used version)

exitCode:: ExitStatus.undefined
