currentDirectory:: /home/src/workspaces/solution useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/solution/project1/src/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "emitDeclarationOnly": true
  }
}

//// [/home/src/workspaces/solution/project1/src/a.ts]
export const a = 10;const aLocal = 10;

//// [/home/src/workspaces/solution/project1/src/b.ts]
export const b = 10;const bLocal = 10;

//// [/home/src/workspaces/solution/project1/src/c.ts]
import { a } from "./a";export const c = a;

//// [/home/src/workspaces/solution/project1/src/d.ts]
import { b } from "./b";export const d = b;

//// [/home/src/workspaces/solution/project2/src/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "emitDeclarationOnly": true
  },
  "references": [
    {
      "path": "../../project1/src"
    }
  ]
}

//// [/home/src/workspaces/solution/project2/src/e.ts]
export const e = 10;

//// [/home/src/workspaces/solution/project2/src/f.ts]
import { a } from "../../project1/src/a"; export const f = a;

//// [/home/src/workspaces/solution/project2/src/g.ts]
import { b } from "../../project1/src/b"; export const g = b;

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


/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output file 'project1/src/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because output file 'project2/src/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...



//// [/home/src/workspaces/solution/project1/src/a.d.ts]
export declare const a = 10;


//// [/home/src/workspaces/solution/project1/src/b.d.ts]
export declare const b = 10;


//// [/home/src/workspaces/solution/project1/src/c.d.ts]
export declare const c = 10;


//// [/home/src/workspaces/solution/project1/src/d.d.ts]
export declare const d = 10;


//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo]
{"fileNames":["../../../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileIdsList":[[2],[3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-18487752940-export const a = 10;const aLocal = 10;","signature":"-3497920574-export declare const a = 10;\n"},{"version":"-6189287562-export const b = 10;const bLocal = 10;","signature":"-3829150557-export declare const b = 10;\n"},{"version":"3248317647-import { a } from \"./a\";export const c = a;","signature":"-4160380540-export declare const c = 10;\n"},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","signature":"-4491610523-export declare const d = 10;\n"}],"root":[[2,5]],"options":{"composite":true,"emitDeclarationOnly":true},"referencedMap":[[4,1],[5,2]],"latestChangedDtsFile":"./d.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
  ],
  "fileIdsList": [
    [
      "./a.ts"
    ],
    [
      "./b.ts"
    ]
  ],
  "fileInfos": {
    "../../../../tslibs/ts/lib/lib.d.ts": {
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
        "version": "-18487752940-export const a = 10;const aLocal = 10;",
        "signature": "-3497920574-export declare const a = 10;\n"
      },
      "version": "-18487752940-export const a = 10;const aLocal = 10;",
      "signature": "-3497920574-export declare const a = 10;\n"
    },
    "./b.ts": {
      "original": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;",
        "signature": "-3829150557-export declare const b = 10;\n"
      },
      "version": "-6189287562-export const b = 10;const bLocal = 10;",
      "signature": "-3829150557-export declare const b = 10;\n"
    },
    "./c.ts": {
      "original": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "signature": "-4160380540-export declare const c = 10;\n"
      },
      "version": "3248317647-import { a } from \"./a\";export const c = a;",
      "signature": "-4160380540-export declare const c = 10;\n"
    },
    "./d.ts": {
      "original": {
        "version": "-19615769517-import { b } from \"./b\";export const d = b;",
        "signature": "-4491610523-export declare const d = 10;\n"
      },
      "version": "-19615769517-import { b } from \"./b\";export const d = b;",
      "signature": "-4491610523-export declare const d = 10;\n"
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "latestChangedDtsFile": "./d.d.ts",
  "version": "FakeTSVersion",
  "size": 1269
}

//// [/home/src/workspaces/solution/project2/src/e.d.ts]
export declare const e = 10;


//// [/home/src/workspaces/solution/project2/src/f.d.ts]
export declare const f = 10;


//// [/home/src/workspaces/solution/project2/src/g.d.ts]
export declare const g = 10;


//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo]
{"fileNames":["../../../../tslibs/ts/lib/lib.d.ts","./e.ts","../../project1/src/a.d.ts","./f.ts","../../project1/src/b.d.ts","./g.ts"],"fileIdsList":[[3],[5]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-13789510868-export const e = 10;","signature":"-4822840506-export declare const e = 10;\n"},"-3497920574-export declare const a = 10;\n",{"version":"-2015135303-import { a } from \"../../project1/src/a\"; export const f = a;","signature":"-5154070489-export declare const f = 10;\n"},"-3829150557-export declare const b = 10;\n",{"version":"-2047954019-import { b } from \"../../project1/src/b\"; export const g = b;","signature":"-5485300472-export declare const g = 10;\n"}],"root":[2,4,6],"options":{"composite":true,"emitDeclarationOnly":true},"referencedMap":[[4,1],[6,2]],"latestChangedDtsFile":"./g.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../tslibs/ts/lib/lib.d.ts",
    "./e.ts",
    "../../project1/src/a.d.ts",
    "./f.ts",
    "../../project1/src/b.d.ts",
    "./g.ts"
  ],
  "fileIdsList": [
    [
      "../../project1/src/a.d.ts"
    ],
    [
      "../../project1/src/b.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./e.ts": {
      "original": {
        "version": "-13789510868-export const e = 10;",
        "signature": "-4822840506-export declare const e = 10;\n"
      },
      "version": "-13789510868-export const e = 10;",
      "signature": "-4822840506-export declare const e = 10;\n"
    },
    "../../project1/src/a.d.ts": {
      "version": "-3497920574-export declare const a = 10;\n",
      "signature": "-3497920574-export declare const a = 10;\n"
    },
    "./f.ts": {
      "original": {
        "version": "-2015135303-import { a } from \"../../project1/src/a\"; export const f = a;",
        "signature": "-5154070489-export declare const f = 10;\n"
      },
      "version": "-2015135303-import { a } from \"../../project1/src/a\"; export const f = a;",
      "signature": "-5154070489-export declare const f = 10;\n"
    },
    "../../project1/src/b.d.ts": {
      "version": "-3829150557-export declare const b = 10;\n",
      "signature": "-3829150557-export declare const b = 10;\n"
    },
    "./g.ts": {
      "original": {
        "version": "-2047954019-import { b } from \"../../project1/src/b\"; export const g = b;",
        "signature": "-5485300472-export declare const g = 10;\n"
      },
      "version": "-2047954019-import { b } from \"../../project1/src/b\"; export const g = b;",
      "signature": "-5485300472-export declare const g = 10;\n"
    }
  },
  "root": [
    [
      2,
      "./e.ts"
    ],
    [
      4,
      "./f.ts"
    ],
    [
      6,
      "./g.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true
  },
  "referencedMap": {
    "./f.ts": [
      "../../project1/src/a.d.ts"
    ],
    "./g.ts": [
      "../../project1/src/b.d.ts"
    ]
  },
  "latestChangedDtsFile": "./g.d.ts",
  "version": "FakeTSVersion",
  "size": 1302
}


Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "composite": true,
  "emitDeclarationOnly": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/src/a.ts
/home/src/workspaces/solution/project1/src/b.ts
/home/src/workspaces/solution/project1/src/c.ts
/home/src/workspaces/solution/project1/src/d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/src/a.ts
/home/src/workspaces/solution/project1/src/b.ts
/home/src/workspaces/solution/project1/src/c.ts
/home/src/workspaces/solution/project1/src/d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/solution/project1/src/a.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/b.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/c.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/d.ts (computed .d.ts during emit)

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "composite": true,
  "emitDeclarationOnly": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project2/src/e.ts
/home/src/workspaces/solution/project1/src/a.d.ts
/home/src/workspaces/solution/project2/src/f.ts
/home/src/workspaces/solution/project1/src/b.d.ts
/home/src/workspaces/solution/project2/src/g.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project2/src/e.ts
/home/src/workspaces/solution/project1/src/a.d.ts
/home/src/workspaces/solution/project2/src/f.ts
/home/src/workspaces/solution/project1/src/b.d.ts
/home/src/workspaces/solution/project2/src/g.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/solution/project2/src/e.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/a.d.ts (used version)
/home/src/workspaces/solution/project2/src/f.ts (computed .d.ts during emit)
/home/src/workspaces/solution/project1/src/b.d.ts (used version)
/home/src/workspaces/solution/project2/src/g.ts (computed .d.ts during emit)

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is up to date because newest input 'project1/src/d.ts' is older than output 'project1/src/tsconfig.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is up to date because newest input 'project2/src/g.ts' is older than output 'project2/src/tsconfig.tsbuildinfo'




exitCode:: ExitStatus.Success

Change:: change

Input::
//// [/home/src/workspaces/solution/project1/src/a.ts]
export const a = 10;const aLocal = 10;const aa = 10;


/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output 'project1/src/tsconfig.tsbuildinfo' is older than input 'project1/src/a.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/home/src/workspaces/solution/project2/src/tsconfig.json'...



//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo]
{"fileNames":["../../../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileIdsList":[[2],[3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-16597586570-export const a = 10;const aLocal = 10;const aa = 10;","signature":"-3497920574-export declare const a = 10;\n"},{"version":"-6189287562-export const b = 10;const bLocal = 10;","signature":"-3829150557-export declare const b = 10;\n"},{"version":"3248317647-import { a } from \"./a\";export const c = a;","signature":"-4160380540-export declare const c = 10;\n"},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","signature":"-4491610523-export declare const d = 10;\n"}],"root":[[2,5]],"options":{"composite":true,"emitDeclarationOnly":true},"referencedMap":[[4,1],[5,2]],"latestChangedDtsFile":"./d.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
  ],
  "fileIdsList": [
    [
      "./a.ts"
    ],
    [
      "./b.ts"
    ]
  ],
  "fileInfos": {
    "../../../../tslibs/ts/lib/lib.d.ts": {
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
        "version": "-16597586570-export const a = 10;const aLocal = 10;const aa = 10;",
        "signature": "-3497920574-export declare const a = 10;\n"
      },
      "version": "-16597586570-export const a = 10;const aLocal = 10;const aa = 10;",
      "signature": "-3497920574-export declare const a = 10;\n"
    },
    "./b.ts": {
      "original": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;",
        "signature": "-3829150557-export declare const b = 10;\n"
      },
      "version": "-6189287562-export const b = 10;const bLocal = 10;",
      "signature": "-3829150557-export declare const b = 10;\n"
    },
    "./c.ts": {
      "original": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "signature": "-4160380540-export declare const c = 10;\n"
      },
      "version": "3248317647-import { a } from \"./a\";export const c = a;",
      "signature": "-4160380540-export declare const c = 10;\n"
    },
    "./d.ts": {
      "original": {
        "version": "-19615769517-import { b } from \"./b\";export const d = b;",
        "signature": "-4491610523-export declare const d = 10;\n"
      },
      "version": "-19615769517-import { b } from \"./b\";export const d = b;",
      "signature": "-4491610523-export declare const d = 10;\n"
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "latestChangedDtsFile": "./d.d.ts",
  "version": "FakeTSVersion",
  "size": 1283
}

//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo] file changed its modified time

Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "composite": true,
  "emitDeclarationOnly": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/src/a.ts
/home/src/workspaces/solution/project1/src/b.ts
/home/src/workspaces/solution/project1/src/c.ts
/home/src/workspaces/solution/project1/src/d.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/solution/project1/src/a.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/solution/project1/src/a.ts (computed .d.ts)

exitCode:: ExitStatus.Success

Change:: emit js files

Input::

/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose --emitDeclarationOnly false
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because buildinfo file 'project1/src/tsconfig.tsbuildinfo' indicates there is change in compilerOptions

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/src/tsconfig.tsbuildinfo' indicates there is change in compilerOptions

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/src/tsconfig.json'...



//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo]
{"fileNames":["../../../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileIdsList":[[2],[3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-16597586570-export const a = 10;const aLocal = 10;const aa = 10;","signature":"-3497920574-export declare const a = 10;\n"},{"version":"-6189287562-export const b = 10;const bLocal = 10;","signature":"-3829150557-export declare const b = 10;\n"},{"version":"3248317647-import { a } from \"./a\";export const c = a;","signature":"-4160380540-export declare const c = 10;\n"},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","signature":"-4491610523-export declare const d = 10;\n"}],"root":[[2,5]],"options":{"composite":true,"emitDeclarationOnly":false},"referencedMap":[[4,1],[5,2]],"latestChangedDtsFile":"./d.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
  ],
  "fileIdsList": [
    [
      "./a.ts"
    ],
    [
      "./b.ts"
    ]
  ],
  "fileInfos": {
    "../../../../tslibs/ts/lib/lib.d.ts": {
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
        "version": "-16597586570-export const a = 10;const aLocal = 10;const aa = 10;",
        "signature": "-3497920574-export declare const a = 10;\n"
      },
      "version": "-16597586570-export const a = 10;const aLocal = 10;const aa = 10;",
      "signature": "-3497920574-export declare const a = 10;\n"
    },
    "./b.ts": {
      "original": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;",
        "signature": "-3829150557-export declare const b = 10;\n"
      },
      "version": "-6189287562-export const b = 10;const bLocal = 10;",
      "signature": "-3829150557-export declare const b = 10;\n"
    },
    "./c.ts": {
      "original": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "signature": "-4160380540-export declare const c = 10;\n"
      },
      "version": "3248317647-import { a } from \"./a\";export const c = a;",
      "signature": "-4160380540-export declare const c = 10;\n"
    },
    "./d.ts": {
      "original": {
        "version": "-19615769517-import { b } from \"./b\";export const d = b;",
        "signature": "-4491610523-export declare const d = 10;\n"
      },
      "version": "-19615769517-import { b } from \"./b\";export const d = b;",
      "signature": "-4491610523-export declare const d = 10;\n"
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": false
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "latestChangedDtsFile": "./d.d.ts",
  "version": "FakeTSVersion",
  "size": 1284
}

//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo]
{"fileNames":["../../../../tslibs/ts/lib/lib.d.ts","./e.ts","../../project1/src/a.d.ts","./f.ts","../../project1/src/b.d.ts","./g.ts"],"fileIdsList":[[3],[5]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-13789510868-export const e = 10;","signature":"-4822840506-export declare const e = 10;\n"},"-3497920574-export declare const a = 10;\n",{"version":"-2015135303-import { a } from \"../../project1/src/a\"; export const f = a;","signature":"-5154070489-export declare const f = 10;\n"},"-3829150557-export declare const b = 10;\n",{"version":"-2047954019-import { b } from \"../../project1/src/b\"; export const g = b;","signature":"-5485300472-export declare const g = 10;\n"}],"root":[2,4,6],"options":{"composite":true,"emitDeclarationOnly":false},"referencedMap":[[4,1],[6,2]],"latestChangedDtsFile":"./g.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../tslibs/ts/lib/lib.d.ts",
    "./e.ts",
    "../../project1/src/a.d.ts",
    "./f.ts",
    "../../project1/src/b.d.ts",
    "./g.ts"
  ],
  "fileIdsList": [
    [
      "../../project1/src/a.d.ts"
    ],
    [
      "../../project1/src/b.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./e.ts": {
      "original": {
        "version": "-13789510868-export const e = 10;",
        "signature": "-4822840506-export declare const e = 10;\n"
      },
      "version": "-13789510868-export const e = 10;",
      "signature": "-4822840506-export declare const e = 10;\n"
    },
    "../../project1/src/a.d.ts": {
      "version": "-3497920574-export declare const a = 10;\n",
      "signature": "-3497920574-export declare const a = 10;\n"
    },
    "./f.ts": {
      "original": {
        "version": "-2015135303-import { a } from \"../../project1/src/a\"; export const f = a;",
        "signature": "-5154070489-export declare const f = 10;\n"
      },
      "version": "-2015135303-import { a } from \"../../project1/src/a\"; export const f = a;",
      "signature": "-5154070489-export declare const f = 10;\n"
    },
    "../../project1/src/b.d.ts": {
      "version": "-3829150557-export declare const b = 10;\n",
      "signature": "-3829150557-export declare const b = 10;\n"
    },
    "./g.ts": {
      "original": {
        "version": "-2047954019-import { b } from \"../../project1/src/b\"; export const g = b;",
        "signature": "-5485300472-export declare const g = 10;\n"
      },
      "version": "-2047954019-import { b } from \"../../project1/src/b\"; export const g = b;",
      "signature": "-5485300472-export declare const g = 10;\n"
    }
  },
  "root": [
    [
      2,
      "./e.ts"
    ],
    [
      4,
      "./f.ts"
    ],
    [
      6,
      "./g.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": false
  },
  "referencedMap": {
    "./f.ts": [
      "../../project1/src/a.d.ts"
    ],
    "./g.ts": [
      "../../project1/src/b.d.ts"
    ]
  },
  "latestChangedDtsFile": "./g.d.ts",
  "version": "FakeTSVersion",
  "size": 1303
}

//// [/home/src/workspaces/solution/project1/src/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 10;
var aLocal = 10;
var aa = 10;


//// [/home/src/workspaces/solution/project1/src/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;
var bLocal = 10;


//// [/home/src/workspaces/solution/project1/src/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
var a_1 = require("./a");
exports.c = a_1.a;


//// [/home/src/workspaces/solution/project1/src/d.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.d = void 0;
var b_1 = require("./b");
exports.d = b_1.b;


//// [/home/src/workspaces/solution/project2/src/e.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.e = void 0;
exports.e = 10;


//// [/home/src/workspaces/solution/project2/src/f.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = void 0;
var a_1 = require("../../project1/src/a");
exports.f = a_1.a;


//// [/home/src/workspaces/solution/project2/src/g.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.g = void 0;
var b_1 = require("../../project1/src/b");
exports.g = b_1.b;



Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "composite": true,
  "emitDeclarationOnly": false,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/src/a.ts
/home/src/workspaces/solution/project1/src/b.ts
/home/src/workspaces/solution/project1/src/c.ts
/home/src/workspaces/solution/project1/src/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/home/src/workspaces/solution/project2/src/e.ts",
  "/home/src/workspaces/solution/project2/src/f.ts",
  "/home/src/workspaces/solution/project2/src/g.ts"
]
Program options: {
  "composite": true,
  "emitDeclarationOnly": false,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project2/src/e.ts
/home/src/workspaces/solution/project1/src/a.d.ts
/home/src/workspaces/solution/project2/src/f.ts
/home/src/workspaces/solution/project1/src/b.d.ts
/home/src/workspaces/solution/project2/src/g.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is up to date because newest input 'project1/src/a.ts' is older than output 'project1/src/tsconfig.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is up to date because newest input 'project2/src/g.ts' is older than output 'project2/src/tsconfig.tsbuildinfo'




exitCode:: ExitStatus.Success

Change:: no change run with js emit

Input::

/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose --emitDeclarationOnly false
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is up to date because newest input 'project1/src/a.ts' is older than output 'project1/src/tsconfig.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is up to date because newest input 'project2/src/g.ts' is older than output 'project2/src/tsconfig.tsbuildinfo'




exitCode:: ExitStatus.Success

Change:: js emit with change

Input::
//// [/home/src/workspaces/solution/project1/src/b.ts]
export const b = 10;const bLocal = 10;const blocal = 10;


/home/src/tslibs/TS/Lib/tsc.js --b project2/src --verbose --emitDeclarationOnly false
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output 'project1/src/tsconfig.tsbuildinfo' is older than input 'project1/src/b.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/home/src/workspaces/solution/project2/src/tsconfig.json'...



//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo]
{"fileNames":["../../../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileIdsList":[[2],[3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-16597586570-export const a = 10;const aLocal = 10;const aa = 10;","signature":"-3497920574-export declare const a = 10;\n"},{"version":"2355059555-export const b = 10;const bLocal = 10;const blocal = 10;","signature":"-3829150557-export declare const b = 10;\n"},{"version":"3248317647-import { a } from \"./a\";export const c = a;","signature":"-4160380540-export declare const c = 10;\n"},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","signature":"-4491610523-export declare const d = 10;\n"}],"root":[[2,5]],"options":{"composite":true,"emitDeclarationOnly":false},"referencedMap":[[4,1],[5,2]],"latestChangedDtsFile":"./d.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
  ],
  "fileIdsList": [
    [
      "./a.ts"
    ],
    [
      "./b.ts"
    ]
  ],
  "fileInfos": {
    "../../../../tslibs/ts/lib/lib.d.ts": {
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
        "version": "-16597586570-export const a = 10;const aLocal = 10;const aa = 10;",
        "signature": "-3497920574-export declare const a = 10;\n"
      },
      "version": "-16597586570-export const a = 10;const aLocal = 10;const aa = 10;",
      "signature": "-3497920574-export declare const a = 10;\n"
    },
    "./b.ts": {
      "original": {
        "version": "2355059555-export const b = 10;const bLocal = 10;const blocal = 10;",
        "signature": "-3829150557-export declare const b = 10;\n"
      },
      "version": "2355059555-export const b = 10;const bLocal = 10;const blocal = 10;",
      "signature": "-3829150557-export declare const b = 10;\n"
    },
    "./c.ts": {
      "original": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "signature": "-4160380540-export declare const c = 10;\n"
      },
      "version": "3248317647-import { a } from \"./a\";export const c = a;",
      "signature": "-4160380540-export declare const c = 10;\n"
    },
    "./d.ts": {
      "original": {
        "version": "-19615769517-import { b } from \"./b\";export const d = b;",
        "signature": "-4491610523-export declare const d = 10;\n"
      },
      "version": "-19615769517-import { b } from \"./b\";export const d = b;",
      "signature": "-4491610523-export declare const d = 10;\n"
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": false
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "latestChangedDtsFile": "./d.d.ts",
  "version": "FakeTSVersion",
  "size": 1301
}

//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo] file changed its modified time
//// [/home/src/workspaces/solution/project1/src/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;
var bLocal = 10;
var blocal = 10;



Program root files: [
  "/home/src/workspaces/solution/project1/src/a.ts",
  "/home/src/workspaces/solution/project1/src/b.ts",
  "/home/src/workspaces/solution/project1/src/c.ts",
  "/home/src/workspaces/solution/project1/src/d.ts"
]
Program options: {
  "composite": true,
  "emitDeclarationOnly": false,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/project1/src/a.ts
/home/src/workspaces/solution/project1/src/b.ts
/home/src/workspaces/solution/project1/src/c.ts
/home/src/workspaces/solution/project1/src/d.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/solution/project1/src/b.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/solution/project1/src/b.ts (computed .d.ts)

exitCode:: ExitStatus.Success
