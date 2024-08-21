3:: no-change-run
Clean build tsbuildinfo for both projects will have compilerOptions with composite and emitDeclarationOnly
Incremental build will detect that it doesnt need to rebuild so tsbuild info for projects is from before which has option composite as true but emitDeclrationOnly as false
TsBuild info text without affectedFilesPendingEmit:: /home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "../../../../tslibs/ts/lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "version": "-16597586570-export const a = 10;const aLocal = 10;const aa = 10;"
    },
    "./b.ts": {
      "version": "-6189287562-export const b = 10;const bLocal = 10;"
    },
    "./c.ts": {
      "version": "3248317647-import { a } from \"./a\";export const c = a;"
    },
    "./d.ts": {
      "version": "-19615769517-import { b } from \"./b\";export const d = b;"
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
  "latestChangedDtsFile": "FakeFileName",
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "fileInfos": {
    "../../../../tslibs/ts/lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "version": "-16597586570-export const a = 10;const aLocal = 10;const aa = 10;"
    },
    "./b.ts": {
      "version": "-6189287562-export const b = 10;const bLocal = 10;"
    },
    "./c.ts": {
      "version": "3248317647-import { a } from \"./a\";export const c = a;"
    },
    "./d.ts": {
      "version": "-19615769517-import { b } from \"./b\";export const d = b;"
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
  "latestChangedDtsFile": "FakeFileName",
  "version": "FakeTSVersion"
}
TsBuild info text without affectedFilesPendingEmit:: /home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "../../../../tslibs/ts/lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./e.ts": {
      "version": "-13789510868-export const e = 10;"
    },
    "../../project1/src/a.d.ts": {
      "version": "-3497920574-export declare const a = 10;\n"
    },
    "./f.ts": {
      "version": "-2015135303-import { a } from \"../../project1/src/a\"; export const f = a;"
    },
    "../../project1/src/b.d.ts": {
      "version": "-3829150557-export declare const b = 10;\n"
    },
    "./g.ts": {
      "version": "-2047954019-import { b } from \"../../project1/src/b\"; export const g = b;"
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
  "latestChangedDtsFile": "FakeFileName",
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "fileInfos": {
    "../../../../tslibs/ts/lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./e.ts": {
      "version": "-13789510868-export const e = 10;"
    },
    "../../project1/src/a.d.ts": {
      "version": "-3497920574-export declare const a = 10;\n"
    },
    "./f.ts": {
      "version": "-2015135303-import { a } from \"../../project1/src/a\"; export const f = a;"
    },
    "../../project1/src/b.d.ts": {
      "version": "-3829150557-export declare const b = 10;\n"
    },
    "./g.ts": {
      "version": "-2047954019-import { b } from \"../../project1/src/b\"; export const g = b;"
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
  "latestChangedDtsFile": "FakeFileName",
  "version": "FakeTSVersion"
}