currentDirectory:: / useCaseSensitiveFileNames: false
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

//// [/src/project1/src/a.ts]
export const a = 10;const aLocal = 10;

//// [/src/project1/src/b.ts]
export const b = 10;const bLocal = 10;

//// [/src/project1/src/c.ts]
import { a } from "./a";export const c = a;

//// [/src/project1/src/d.ts]
import { b } from "./b";export const d = b;

//// [/src/project1/src/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  }
}

//// [/src/project2/src/e.ts]
export const e = 10;

//// [/src/project2/src/f.ts]
import { a } from "../../project1/src/a"; export const f = a;

//// [/src/project2/src/g.ts]
import { b } from "../../project1/src/b"; export const g = b;

//// [/src/project2/src/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "../../project1/src"
    }
  ]
}



Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly
[[90m12:00:19 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:00:20 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because output file 'src/project1/src/tsconfig.tsbuildinfo' does not exist

[[90m12:00:21 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:00:29 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because output file 'src/project2/src/tsconfig.tsbuildinfo' does not exist

[[90m12:00:30 AM[0m] Building project '/src/project2/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project1/src/a.ts",
  "/src/project1/src/b.ts",
  "/src/project1/src/c.ts",
  "/src/project1/src/d.ts"
]
Program options: {
  "composite": true,
  "emitDeclarationOnly": true,
  "configFilePath": "/src/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/project1/src/a.ts (computed .d.ts during emit)
/src/project1/src/b.ts (computed .d.ts during emit)
/src/project1/src/c.ts (computed .d.ts during emit)
/src/project1/src/d.ts (computed .d.ts during emit)

Program root files: [
  "/src/project2/src/e.ts",
  "/src/project2/src/f.ts",
  "/src/project2/src/g.ts"
]
Program options: {
  "composite": true,
  "emitDeclarationOnly": true,
  "configFilePath": "/src/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project2/src/e.ts
/src/project1/src/a.d.ts
/src/project2/src/f.ts
/src/project1/src/b.d.ts
/src/project2/src/g.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/project2/src/e.ts
/src/project1/src/a.d.ts
/src/project2/src/f.ts
/src/project1/src/b.d.ts
/src/project2/src/g.ts

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/project2/src/e.ts (computed .d.ts during emit)
/src/project1/src/a.d.ts (used version)
/src/project2/src/f.ts (computed .d.ts during emit)
/src/project1/src/b.d.ts (used version)
/src/project2/src/g.ts (computed .d.ts during emit)


//// [/src/project1/src/a.d.ts]
export declare const a = 10;


//// [/src/project1/src/b.d.ts]
export declare const b = 10;


//// [/src/project1/src/c.d.ts]
export declare const c = 10;


//// [/src/project1/src/d.d.ts]
export declare const d = 10;


//// [/src/project1/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-18487752940-export const a = 10;const aLocal = 10;","signature":"-3497920574-export declare const a = 10;\n"},{"version":"-6189287562-export const b = 10;const bLocal = 10;","signature":"-3829150557-export declare const b = 10;\n"},{"version":"3248317647-import { a } from \"./a\";export const c = a;","signature":"-4160380540-export declare const c = 10;\n"},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","signature":"-4491610523-export declare const d = 10;\n"}],"root":[[2,5]],"options":{"composite":true,"emitDeclarationOnly":true},"fileIdsList":[[2],[3]],"referencedMap":[[4,1],[5,2]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4,5],"latestChangedDtsFile":"./d.d.ts"},"version":"FakeTSVersion"}

//// [/src/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "fileNamesList": [
      [
        "./a.ts"
      ],
      [
        "./b.ts"
      ]
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": {
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
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "./d.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1333
}

//// [/src/project2/src/e.d.ts]
export declare const e = 10;


//// [/src/project2/src/f.d.ts]
export declare const f = 10;


//// [/src/project2/src/g.d.ts]
export declare const g = 10;


//// [/src/project2/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../lib/lib.d.ts","./e.ts","../../project1/src/a.d.ts","./f.ts","../../project1/src/b.d.ts","./g.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-13789510868-export const e = 10;","signature":"-4822840506-export declare const e = 10;\n"},"-3497920574-export declare const a = 10;\n",{"version":"-2015135303-import { a } from \"../../project1/src/a\"; export const f = a;","signature":"-5154070489-export declare const f = 10;\n"},"-3829150557-export declare const b = 10;\n",{"version":"-2047954019-import { b } from \"../../project1/src/b\"; export const g = b;","signature":"-5485300472-export declare const g = 10;\n"}],"root":[2,4,6],"options":{"composite":true,"emitDeclarationOnly":true},"fileIdsList":[[3],[5]],"referencedMap":[[4,1],[6,2]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,3,5,2,4,6],"latestChangedDtsFile":"./g.d.ts"},"version":"FakeTSVersion"}

//// [/src/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "./e.ts",
      "../../project1/src/a.d.ts",
      "./f.ts",
      "../../project1/src/b.d.ts",
      "./g.ts"
    ],
    "fileNamesList": [
      [
        "../../project1/src/a.d.ts"
      ],
      [
        "../../project1/src/b.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": {
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
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../../project1/src/a.d.ts",
      "../../project1/src/b.d.ts",
      "./e.ts",
      "./f.ts",
      "./g.ts"
    ],
    "latestChangedDtsFile": "./g.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1368
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly
[[90m12:00:37 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:00:38 AM[0m] Project 'src/project1/src/tsconfig.json' is up to date because newest input 'src/project1/src/d.ts' is older than output 'src/project1/src/tsconfig.tsbuildinfo'

[[90m12:00:39 AM[0m] Project 'src/project2/src/tsconfig.json' is up to date because newest input 'src/project2/src/g.ts' is older than output 'src/project2/src/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: local change
Input::
//// [/src/project1/src/a.ts]
export const a = 10;const aLocal = 10;const aa = 10;



Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly
[[90m12:00:41 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:00:42 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because output 'src/project1/src/tsconfig.tsbuildinfo' is older than input 'src/project1/src/a.ts'

[[90m12:00:43 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:00:47 AM[0m] Project 'src/project2/src/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:00:48 AM[0m] Updating output timestamps of project '/src/project2/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project1/src/a.ts",
  "/src/project1/src/b.ts",
  "/src/project1/src/c.ts",
  "/src/project1/src/d.ts"
]
Program options: {
  "composite": true,
  "emitDeclarationOnly": true,
  "configFilePath": "/src/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

Semantic diagnostics in builder refreshed for::
/src/project1/src/a.ts

Shape signatures in builder refreshed for::
/src/project1/src/a.ts (computed .d.ts)


//// [/src/project1/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-16597586570-export const a = 10;const aLocal = 10;const aa = 10;","signature":"-3497920574-export declare const a = 10;\n"},{"version":"-6189287562-export const b = 10;const bLocal = 10;","signature":"-3829150557-export declare const b = 10;\n"},{"version":"3248317647-import { a } from \"./a\";export const c = a;","signature":"-4160380540-export declare const c = 10;\n"},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","signature":"-4491610523-export declare const d = 10;\n"}],"root":[[2,5]],"options":{"composite":true,"emitDeclarationOnly":true},"fileIdsList":[[2],[3]],"referencedMap":[[4,1],[5,2]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4,5],"latestChangedDtsFile":"./d.d.ts"},"version":"FakeTSVersion"}

//// [/src/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "fileNamesList": [
      [
        "./a.ts"
      ],
      [
        "./b.ts"
      ]
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": {
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
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "./d.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1347
}

//// [/src/project2/src/tsconfig.tsbuildinfo] file changed its modified time


Change:: non local change
Input::
//// [/src/project1/src/a.ts]
export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;



Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly
[[90m12:00:52 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:00:53 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because output 'src/project1/src/tsconfig.tsbuildinfo' is older than input 'src/project1/src/a.ts'

[[90m12:00:54 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:00:59 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because output 'src/project2/src/tsconfig.tsbuildinfo' is older than input 'src/project1/src'

[[90m12:01:00 AM[0m] Building project '/src/project2/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project1/src/a.ts",
  "/src/project1/src/b.ts",
  "/src/project1/src/c.ts",
  "/src/project1/src/d.ts"
]
Program options: {
  "composite": true,
  "emitDeclarationOnly": true,
  "configFilePath": "/src/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

Semantic diagnostics in builder refreshed for::
/src/project1/src/a.ts
/src/project1/src/c.ts

Shape signatures in builder refreshed for::
/src/project1/src/a.ts (computed .d.ts)
/src/project1/src/c.ts (computed .d.ts)

Program root files: [
  "/src/project2/src/e.ts",
  "/src/project2/src/f.ts",
  "/src/project2/src/g.ts"
]
Program options: {
  "composite": true,
  "emitDeclarationOnly": true,
  "configFilePath": "/src/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project2/src/e.ts
/src/project1/src/a.d.ts
/src/project2/src/f.ts
/src/project1/src/b.d.ts
/src/project2/src/g.ts

Semantic diagnostics in builder refreshed for::
/src/project1/src/a.d.ts
/src/project2/src/f.ts

Shape signatures in builder refreshed for::
/src/project1/src/a.d.ts (used version)
/src/project2/src/f.ts (computed .d.ts)


//// [/src/project1/src/a.d.ts]
export declare const a = 10;
export declare const aaa = 10;


//// [/src/project1/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","signature":"-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n"},{"version":"-6189287562-export const b = 10;const bLocal = 10;","signature":"-3829150557-export declare const b = 10;\n"},{"version":"3248317647-import { a } from \"./a\";export const c = a;","signature":"-4160380540-export declare const c = 10;\n"},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","signature":"-4491610523-export declare const d = 10;\n"}],"root":[[2,5]],"options":{"composite":true,"emitDeclarationOnly":true},"fileIdsList":[[2],[3]],"referencedMap":[[4,1],[5,2]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4,5],"latestChangedDtsFile":"./a.d.ts"},"version":"FakeTSVersion"}

//// [/src/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "fileNamesList": [
      [
        "./a.ts"
      ],
      [
        "./b.ts"
      ]
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": {
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
          "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
          "signature": "-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n"
        },
        "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
        "signature": "-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n"
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
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "./a.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1400
}

//// [/src/project2/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../lib/lib.d.ts","./e.ts","../../project1/src/a.d.ts","./f.ts","../../project1/src/b.d.ts","./g.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-13789510868-export const e = 10;","signature":"-4822840506-export declare const e = 10;\n"},"-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n",{"version":"-2015135303-import { a } from \"../../project1/src/a\"; export const f = a;","signature":"-5154070489-export declare const f = 10;\n"},"-3829150557-export declare const b = 10;\n",{"version":"-2047954019-import { b } from \"../../project1/src/b\"; export const g = b;","signature":"-5485300472-export declare const g = 10;\n"}],"root":[2,4,6],"options":{"composite":true,"emitDeclarationOnly":true},"fileIdsList":[[3],[5]],"referencedMap":[[4,1],[6,2]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,3,5,2,4,6],"latestChangedDtsFile":"./g.d.ts"},"version":"FakeTSVersion"}

//// [/src/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "./e.ts",
      "../../project1/src/a.d.ts",
      "./f.ts",
      "../../project1/src/b.d.ts",
      "./g.ts"
    ],
    "fileNamesList": [
      [
        "../../project1/src/a.d.ts"
      ],
      [
        "../../project1/src/b.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": {
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
        "version": "-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n",
        "signature": "-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n"
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
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../../project1/src/a.d.ts",
      "../../project1/src/b.d.ts",
      "./e.ts",
      "./f.ts",
      "./g.ts"
    ],
    "latestChangedDtsFile": "./g.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1400
}



Change:: emit js files
Input::


Output::
/lib/tsc --b /src/project2/src --verbose
[[90m12:01:04 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:01:05 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because buildinfo file 'src/project1/src/tsconfig.tsbuildinfo' indicates there is change in compilerOptions

[[90m12:01:06 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:01:14 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because buildinfo file 'src/project2/src/tsconfig.tsbuildinfo' indicates there is change in compilerOptions

[[90m12:01:15 AM[0m] Building project '/src/project2/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project1/src/a.ts",
  "/src/project1/src/b.ts",
  "/src/project1/src/c.ts",
  "/src/project1/src/d.ts"
]
Program options: {
  "composite": true,
  "configFilePath": "/src/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/src/project2/src/e.ts",
  "/src/project2/src/f.ts",
  "/src/project2/src/g.ts"
]
Program options: {
  "composite": true,
  "configFilePath": "/src/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project2/src/e.ts
/src/project1/src/a.d.ts
/src/project2/src/f.ts
/src/project1/src/b.d.ts
/src/project2/src/g.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::


//// [/src/project1/src/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aaa = exports.a = void 0;
exports.a = 10;
var aLocal = 10;
var aa = 10;
exports.aaa = 10;


//// [/src/project1/src/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;
var bLocal = 10;


//// [/src/project1/src/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
var a_1 = require("./a");
exports.c = a_1.a;


//// [/src/project1/src/d.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.d = void 0;
var b_1 = require("./b");
exports.d = b_1.b;


//// [/src/project1/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","signature":"-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n"},{"version":"-6189287562-export const b = 10;const bLocal = 10;","signature":"-3829150557-export declare const b = 10;\n"},{"version":"3248317647-import { a } from \"./a\";export const c = a;","signature":"-4160380540-export declare const c = 10;\n"},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","signature":"-4491610523-export declare const d = 10;\n"}],"root":[[2,5]],"options":{"composite":true},"fileIdsList":[[2],[3]],"referencedMap":[[4,1],[5,2]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4,5],"latestChangedDtsFile":"./a.d.ts"},"version":"FakeTSVersion"}

//// [/src/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "fileNamesList": [
      [
        "./a.ts"
      ],
      [
        "./b.ts"
      ]
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": {
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
          "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
          "signature": "-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n"
        },
        "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
        "signature": "-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n"
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
      "composite": true
    },
    "referencedMap": {
      "./c.ts": [
        "./a.ts"
      ],
      "./d.ts": [
        "./b.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "./a.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1373
}

//// [/src/project2/src/e.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.e = void 0;
exports.e = 10;


//// [/src/project2/src/f.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = void 0;
var a_1 = require("../../project1/src/a");
exports.f = a_1.a;


//// [/src/project2/src/g.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.g = void 0;
var b_1 = require("../../project1/src/b");
exports.g = b_1.b;


//// [/src/project2/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../lib/lib.d.ts","./e.ts","../../project1/src/a.d.ts","./f.ts","../../project1/src/b.d.ts","./g.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-13789510868-export const e = 10;","signature":"-4822840506-export declare const e = 10;\n"},"-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n",{"version":"-2015135303-import { a } from \"../../project1/src/a\"; export const f = a;","signature":"-5154070489-export declare const f = 10;\n"},"-3829150557-export declare const b = 10;\n",{"version":"-2047954019-import { b } from \"../../project1/src/b\"; export const g = b;","signature":"-5485300472-export declare const g = 10;\n"}],"root":[2,4,6],"options":{"composite":true},"fileIdsList":[[3],[5]],"referencedMap":[[4,1],[6,2]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,3,5,2,4,6],"latestChangedDtsFile":"./g.d.ts"},"version":"FakeTSVersion"}

//// [/src/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "./e.ts",
      "../../project1/src/a.d.ts",
      "./f.ts",
      "../../project1/src/b.d.ts",
      "./g.ts"
    ],
    "fileNamesList": [
      [
        "../../project1/src/a.d.ts"
      ],
      [
        "../../project1/src/b.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": {
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
        "version": "-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n",
        "signature": "-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n"
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
      "composite": true
    },
    "referencedMap": {
      "./f.ts": [
        "../../project1/src/a.d.ts"
      ],
      "./g.ts": [
        "../../project1/src/b.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../../project1/src/a.d.ts",
      "../../project1/src/b.d.ts",
      "./e.ts",
      "./f.ts",
      "./g.ts"
    ],
    "latestChangedDtsFile": "./g.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1373
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly
[[90m12:01:22 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:01:23 AM[0m] Project 'src/project1/src/tsconfig.json' is up to date because newest input 'src/project1/src/a.ts' is older than output 'src/project1/src/tsconfig.tsbuildinfo'

[[90m12:01:24 AM[0m] Project 'src/project2/src/tsconfig.json' is up to date because newest input 'src/project2/src/g.ts' is older than output 'src/project2/src/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: js emit with change without emitDeclarationOnly
Input::
//// [/src/project1/src/b.ts]
export const b = 10;const bLocal = 10;const alocal = 10;



Output::
/lib/tsc --b /src/project2/src --verbose
[[90m12:01:26 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:01:27 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because output 'src/project1/src/tsconfig.tsbuildinfo' is older than input 'src/project1/src/b.ts'

[[90m12:01:28 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:01:33 AM[0m] Project 'src/project2/src/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:01:34 AM[0m] Updating output timestamps of project '/src/project2/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project1/src/a.ts",
  "/src/project1/src/b.ts",
  "/src/project1/src/c.ts",
  "/src/project1/src/d.ts"
]
Program options: {
  "composite": true,
  "configFilePath": "/src/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

Semantic diagnostics in builder refreshed for::
/src/project1/src/b.ts

Shape signatures in builder refreshed for::
/src/project1/src/b.ts (computed .d.ts)


//// [/src/project1/src/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;
var bLocal = 10;
var alocal = 10;


//// [/src/project1/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","signature":"-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n"},{"version":"-2761163262-export const b = 10;const bLocal = 10;const alocal = 10;","signature":"-3829150557-export declare const b = 10;\n"},{"version":"3248317647-import { a } from \"./a\";export const c = a;","signature":"-4160380540-export declare const c = 10;\n"},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","signature":"-4491610523-export declare const d = 10;\n"}],"root":[[2,5]],"options":{"composite":true},"fileIdsList":[[2],[3]],"referencedMap":[[4,1],[5,2]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4,5],"latestChangedDtsFile":"./a.d.ts"},"version":"FakeTSVersion"}

//// [/src/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "fileNamesList": [
      [
        "./a.ts"
      ],
      [
        "./b.ts"
      ]
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": {
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
          "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
          "signature": "-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n"
        },
        "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
        "signature": "-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n"
      },
      "./b.ts": {
        "original": {
          "version": "-2761163262-export const b = 10;const bLocal = 10;const alocal = 10;",
          "signature": "-3829150557-export declare const b = 10;\n"
        },
        "version": "-2761163262-export const b = 10;const bLocal = 10;const alocal = 10;",
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
      "composite": true
    },
    "referencedMap": {
      "./c.ts": [
        "./a.ts"
      ],
      "./d.ts": [
        "./b.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "./a.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1391
}

//// [/src/project2/src/tsconfig.tsbuildinfo] file changed its modified time


Change:: local change
Input::
//// [/src/project1/src/b.ts]
export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;



Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly
[[90m12:01:38 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:01:39 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because output 'src/project1/src/tsconfig.tsbuildinfo' is older than input 'src/project1/src/b.ts'

[[90m12:01:40 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:01:44 AM[0m] Project 'src/project2/src/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:01:45 AM[0m] Updating output timestamps of project '/src/project2/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project1/src/a.ts",
  "/src/project1/src/b.ts",
  "/src/project1/src/c.ts",
  "/src/project1/src/d.ts"
]
Program options: {
  "composite": true,
  "emitDeclarationOnly": true,
  "configFilePath": "/src/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

Semantic diagnostics in builder refreshed for::
/src/project1/src/b.ts

Shape signatures in builder refreshed for::
/src/project1/src/b.ts (computed .d.ts)


//// [/src/project1/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","signature":"-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n"},{"version":"-3037017594-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;","signature":"-3829150557-export declare const b = 10;\n"},{"version":"3248317647-import { a } from \"./a\";export const c = a;","signature":"-4160380540-export declare const c = 10;\n"},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","signature":"-4491610523-export declare const d = 10;\n"}],"root":[[2,5]],"options":{"composite":true,"emitDeclarationOnly":true},"fileIdsList":[[2],[3]],"referencedMap":[[4,1],[5,2]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4,5],"latestChangedDtsFile":"./a.d.ts"},"version":"FakeTSVersion"}

//// [/src/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "fileNamesList": [
      [
        "./a.ts"
      ],
      [
        "./b.ts"
      ]
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": {
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
          "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
          "signature": "-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n"
        },
        "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
        "signature": "-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n"
      },
      "./b.ts": {
        "original": {
          "version": "-3037017594-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;",
          "signature": "-3829150557-export declare const b = 10;\n"
        },
        "version": "-3037017594-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;",
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
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "./a.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1434
}

//// [/src/project2/src/tsconfig.tsbuildinfo] file changed its modified time


Change:: non local change
Input::
//// [/src/project1/src/b.ts]
export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;



Output::
/lib/tsc --b /src/project2/src --verbose --emitDeclarationOnly
[[90m12:01:49 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:01:50 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because output 'src/project1/src/tsconfig.tsbuildinfo' is older than input 'src/project1/src/b.ts'

[[90m12:01:51 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:01:56 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because output 'src/project2/src/tsconfig.tsbuildinfo' is older than input 'src/project1/src'

[[90m12:01:57 AM[0m] Building project '/src/project2/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project1/src/a.ts",
  "/src/project1/src/b.ts",
  "/src/project1/src/c.ts",
  "/src/project1/src/d.ts"
]
Program options: {
  "composite": true,
  "emitDeclarationOnly": true,
  "configFilePath": "/src/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

Semantic diagnostics in builder refreshed for::
/src/project1/src/b.ts
/src/project1/src/d.ts

Shape signatures in builder refreshed for::
/src/project1/src/b.ts (computed .d.ts)
/src/project1/src/d.ts (computed .d.ts)

Program root files: [
  "/src/project2/src/e.ts",
  "/src/project2/src/f.ts",
  "/src/project2/src/g.ts"
]
Program options: {
  "composite": true,
  "emitDeclarationOnly": true,
  "configFilePath": "/src/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project2/src/e.ts
/src/project1/src/a.d.ts
/src/project2/src/f.ts
/src/project1/src/b.d.ts
/src/project2/src/g.ts

Semantic diagnostics in builder refreshed for::
/src/project1/src/b.d.ts
/src/project2/src/g.ts

Shape signatures in builder refreshed for::
/src/project1/src/b.d.ts (used version)
/src/project2/src/g.ts (computed .d.ts)


//// [/src/project1/src/b.d.ts]
export declare const b = 10;
export declare const aaaaa = 10;


//// [/src/project1/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","signature":"-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n"},{"version":"-7233149715-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;","signature":"2661550180-export declare const b = 10;\nexport declare const aaaaa = 10;\n"},{"version":"3248317647-import { a } from \"./a\";export const c = a;","signature":"-4160380540-export declare const c = 10;\n"},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","signature":"-4491610523-export declare const d = 10;\n"}],"root":[[2,5]],"options":{"composite":true,"emitDeclarationOnly":true},"fileIdsList":[[2],[3]],"referencedMap":[[4,1],[5,2]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4,5],"latestChangedDtsFile":"./b.d.ts"},"version":"FakeTSVersion"}

//// [/src/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "fileNamesList": [
      [
        "./a.ts"
      ],
      [
        "./b.ts"
      ]
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": {
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
          "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
          "signature": "-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n"
        },
        "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
        "signature": "-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n"
      },
      "./b.ts": {
        "original": {
          "version": "-7233149715-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;",
          "signature": "2661550180-export declare const b = 10;\nexport declare const aaaaa = 10;\n"
        },
        "version": "-7233149715-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;",
        "signature": "2661550180-export declare const b = 10;\nexport declare const aaaaa = 10;\n"
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
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "./b.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1491
}

//// [/src/project2/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../lib/lib.d.ts","./e.ts","../../project1/src/a.d.ts","./f.ts","../../project1/src/b.d.ts","./g.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-13789510868-export const e = 10;","signature":"-4822840506-export declare const e = 10;\n"},"-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n",{"version":"-2015135303-import { a } from \"../../project1/src/a\"; export const f = a;","signature":"-5154070489-export declare const f = 10;\n"},"2661550180-export declare const b = 10;\nexport declare const aaaaa = 10;\n",{"version":"-2047954019-import { b } from \"../../project1/src/b\"; export const g = b;","signature":"-5485300472-export declare const g = 10;\n"}],"root":[2,4,6],"options":{"composite":true,"emitDeclarationOnly":true},"fileIdsList":[[3],[5]],"referencedMap":[[4,1],[6,2]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,3,5,2,4,6],"latestChangedDtsFile":"./g.d.ts"},"version":"FakeTSVersion"}

//// [/src/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "./e.ts",
      "../../project1/src/a.d.ts",
      "./f.ts",
      "../../project1/src/b.d.ts",
      "./g.ts"
    ],
    "fileNamesList": [
      [
        "../../project1/src/a.d.ts"
      ],
      [
        "../../project1/src/b.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": {
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
        "version": "-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n",
        "signature": "-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n"
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
        "version": "2661550180-export declare const b = 10;\nexport declare const aaaaa = 10;\n",
        "signature": "2661550180-export declare const b = 10;\nexport declare const aaaaa = 10;\n"
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
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../../project1/src/a.d.ts",
      "../../project1/src/b.d.ts",
      "./e.ts",
      "./f.ts",
      "./g.ts"
    ],
    "latestChangedDtsFile": "./g.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1433
}



Change:: js emit with change without emitDeclarationOnly
Input::
//// [/src/project1/src/b.ts]
export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;export const a2 = 10;



Output::
/lib/tsc --b /src/project2/src --verbose
[[90m12:02:02 AM[0m] Projects in this build: 
    * src/project1/src/tsconfig.json
    * src/project2/src/tsconfig.json

[[90m12:02:03 AM[0m] Project 'src/project1/src/tsconfig.json' is out of date because buildinfo file 'src/project1/src/tsconfig.tsbuildinfo' indicates there is change in compilerOptions

[[90m12:02:04 AM[0m] Building project '/src/project1/src/tsconfig.json'...

[[90m12:02:13 AM[0m] Project 'src/project2/src/tsconfig.json' is out of date because buildinfo file 'src/project2/src/tsconfig.tsbuildinfo' indicates there is change in compilerOptions

[[90m12:02:14 AM[0m] Building project '/src/project2/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/project1/src/a.ts",
  "/src/project1/src/b.ts",
  "/src/project1/src/c.ts",
  "/src/project1/src/d.ts"
]
Program options: {
  "composite": true,
  "configFilePath": "/src/project1/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project1/src/a.ts
/src/project1/src/b.ts
/src/project1/src/c.ts
/src/project1/src/d.ts

Semantic diagnostics in builder refreshed for::
/src/project1/src/b.ts
/src/project1/src/d.ts

Shape signatures in builder refreshed for::
/src/project1/src/b.ts (computed .d.ts)
/src/project1/src/d.ts (computed .d.ts)

Program root files: [
  "/src/project2/src/e.ts",
  "/src/project2/src/f.ts",
  "/src/project2/src/g.ts"
]
Program options: {
  "composite": true,
  "configFilePath": "/src/project2/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project2/src/e.ts
/src/project1/src/a.d.ts
/src/project2/src/f.ts
/src/project1/src/b.d.ts
/src/project2/src/g.ts

Semantic diagnostics in builder refreshed for::
/src/project1/src/b.d.ts
/src/project2/src/g.ts

Shape signatures in builder refreshed for::
/src/project1/src/b.d.ts (used version)
/src/project2/src/g.ts (computed .d.ts)


//// [/src/project1/src/a.js] file written with same contents
//// [/src/project1/src/b.d.ts]
export declare const b = 10;
export declare const aaaaa = 10;
export declare const a2 = 10;


//// [/src/project1/src/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a2 = exports.aaaaa = exports.b = void 0;
exports.b = 10;
var bLocal = 10;
var alocal = 10;
var aaaa = 10;
exports.aaaaa = 10;
exports.a2 = 10;


//// [/src/project1/src/c.js] file written with same contents
//// [/src/project1/src/d.js] file written with same contents
//// [/src/project1/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","signature":"-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n"},{"version":"-18124257118-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;export const a2 = 10;","signature":"-2237944013-export declare const b = 10;\nexport declare const aaaaa = 10;\nexport declare const a2 = 10;\n"},{"version":"3248317647-import { a } from \"./a\";export const c = a;","signature":"-4160380540-export declare const c = 10;\n"},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","signature":"-4491610523-export declare const d = 10;\n"}],"root":[[2,5]],"options":{"composite":true},"fileIdsList":[[2],[3]],"referencedMap":[[4,1],[5,2]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4,5],"latestChangedDtsFile":"./b.d.ts"},"version":"FakeTSVersion"}

//// [/src/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "fileNamesList": [
      [
        "./a.ts"
      ],
      [
        "./b.ts"
      ]
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": {
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
          "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
          "signature": "-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n"
        },
        "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
        "signature": "-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n"
      },
      "./b.ts": {
        "original": {
          "version": "-18124257118-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;export const a2 = 10;",
          "signature": "-2237944013-export declare const b = 10;\nexport declare const aaaaa = 10;\nexport declare const a2 = 10;\n"
        },
        "version": "-18124257118-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;export const a2 = 10;",
        "signature": "-2237944013-export declare const b = 10;\nexport declare const aaaaa = 10;\nexport declare const a2 = 10;\n"
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
      "composite": true
    },
    "referencedMap": {
      "./c.ts": [
        "./a.ts"
      ],
      "./d.ts": [
        "./b.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "./b.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1518
}

//// [/src/project2/src/e.js] file written with same contents
//// [/src/project2/src/f.js] file written with same contents
//// [/src/project2/src/g.js] file written with same contents
//// [/src/project2/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../lib/lib.d.ts","./e.ts","../../project1/src/a.d.ts","./f.ts","../../project1/src/b.d.ts","./g.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-13789510868-export const e = 10;","signature":"-4822840506-export declare const e = 10;\n"},"-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n",{"version":"-2015135303-import { a } from \"../../project1/src/a\"; export const f = a;","signature":"-5154070489-export declare const f = 10;\n"},"-2237944013-export declare const b = 10;\nexport declare const aaaaa = 10;\nexport declare const a2 = 10;\n",{"version":"-2047954019-import { b } from \"../../project1/src/b\"; export const g = b;","signature":"-5485300472-export declare const g = 10;\n"}],"root":[2,4,6],"options":{"composite":true},"fileIdsList":[[3],[5]],"referencedMap":[[4,1],[6,2]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,3,5,2,4,6],"latestChangedDtsFile":"./g.d.ts"},"version":"FakeTSVersion"}

//// [/src/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "./e.ts",
      "../../project1/src/a.d.ts",
      "./f.ts",
      "../../project1/src/b.d.ts",
      "./g.ts"
    ],
    "fileNamesList": [
      [
        "../../project1/src/a.d.ts"
      ],
      [
        "../../project1/src/b.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": {
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
        "version": "-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n",
        "signature": "-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n"
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
        "version": "-2237944013-export declare const b = 10;\nexport declare const aaaaa = 10;\nexport declare const a2 = 10;\n",
        "signature": "-2237944013-export declare const b = 10;\nexport declare const aaaaa = 10;\nexport declare const a2 = 10;\n"
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
      "composite": true
    },
    "referencedMap": {
      "./f.ts": [
        "../../project1/src/a.d.ts"
      ],
      "./g.ts": [
        "../../project1/src/b.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../../project1/src/a.d.ts",
      "../../project1/src/b.d.ts",
      "./e.ts",
      "./f.ts",
      "./g.ts"
    ],
    "latestChangedDtsFile": "./g.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1438
}

