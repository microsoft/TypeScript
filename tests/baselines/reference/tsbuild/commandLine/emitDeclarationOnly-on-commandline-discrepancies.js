4:: no-change-run
Clean build tsbuildinfo for both projects will have compilerOptions with composite and emitDeclarationOnly
Incremental build will detect that it doesnt need to rebuild so tsbuild info for projects is from before which has option composite only
TsBuild info text without affectedFilesPendingEmit:: /src/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./a.ts": {
        "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
        "impliedFormat": "commonjs"
      },
      "./b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;",
        "impliedFormat": "commonjs"
      },
      "./c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "impliedFormat": "commonjs"
      },
      "./d.ts": {
        "version": "-19615769517-import { b } from \"./b\";export const d = b;",
        "impliedFormat": "commonjs"
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
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./a.ts": {
        "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
        "impliedFormat": "commonjs"
      },
      "./b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;",
        "impliedFormat": "commonjs"
      },
      "./c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "impliedFormat": "commonjs"
      },
      "./d.ts": {
        "version": "-19615769517-import { b } from \"./b\";export const d = b;",
        "impliedFormat": "commonjs"
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
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
TsBuild info text without affectedFilesPendingEmit:: /src/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./e.ts": {
        "version": "-13789510868-export const e = 10;",
        "impliedFormat": "commonjs"
      },
      "../../project1/src/a.d.ts": {
        "version": "-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n",
        "impliedFormat": "commonjs"
      },
      "./f.ts": {
        "version": "-2015135303-import { a } from \"../../project1/src/a\"; export const f = a;",
        "impliedFormat": "commonjs"
      },
      "../../project1/src/b.d.ts": {
        "version": "-3829150557-export declare const b = 10;\n",
        "impliedFormat": "commonjs"
      },
      "./g.ts": {
        "version": "-2047954019-import { b } from \"../../project1/src/b\"; export const g = b;",
        "impliedFormat": "commonjs"
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
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../../project1/src/a.d.ts",
      "../../project1/src/b.d.ts",
      "./e.ts",
      "./f.ts",
      "./g.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./e.ts": {
        "version": "-13789510868-export const e = 10;",
        "impliedFormat": "commonjs"
      },
      "../../project1/src/a.d.ts": {
        "version": "-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n",
        "impliedFormat": "commonjs"
      },
      "./f.ts": {
        "version": "-2015135303-import { a } from \"../../project1/src/a\"; export const f = a;",
        "impliedFormat": "commonjs"
      },
      "../../project1/src/b.d.ts": {
        "version": "-3829150557-export declare const b = 10;\n",
        "impliedFormat": "commonjs"
      },
      "./g.ts": {
        "version": "-2047954019-import { b } from \"../../project1/src/b\"; export const g = b;",
        "impliedFormat": "commonjs"
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
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../../project1/src/a.d.ts",
      "../../project1/src/b.d.ts",
      "./e.ts",
      "./f.ts",
      "./g.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
6:: local change
Clean build tsbuildinfo for project2 will have compilerOptions with composite and emitDeclarationOnly
Incremental build will detect that it doesnt need to rebuild project2 so tsbuildinfo for it is from before which has option composite only
TsBuild info text without affectedFilesPendingEmit:: /src/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./e.ts": {
        "version": "-13789510868-export const e = 10;",
        "impliedFormat": "commonjs"
      },
      "../../project1/src/a.d.ts": {
        "version": "-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n",
        "impliedFormat": "commonjs"
      },
      "./f.ts": {
        "version": "-2015135303-import { a } from \"../../project1/src/a\"; export const f = a;",
        "impliedFormat": "commonjs"
      },
      "../../project1/src/b.d.ts": {
        "version": "-3829150557-export declare const b = 10;\n",
        "impliedFormat": "commonjs"
      },
      "./g.ts": {
        "version": "-2047954019-import { b } from \"../../project1/src/b\"; export const g = b;",
        "impliedFormat": "commonjs"
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
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../../project1/src/a.d.ts",
      "../../project1/src/b.d.ts",
      "./e.ts",
      "./f.ts",
      "./g.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./e.ts": {
        "version": "-13789510868-export const e = 10;",
        "impliedFormat": "commonjs"
      },
      "../../project1/src/a.d.ts": {
        "version": "-1973399231-export declare const a = 10;\nexport declare const aaa = 10;\n",
        "impliedFormat": "commonjs"
      },
      "./f.ts": {
        "version": "-2015135303-import { a } from \"../../project1/src/a\"; export const f = a;",
        "impliedFormat": "commonjs"
      },
      "../../project1/src/b.d.ts": {
        "version": "-3829150557-export declare const b = 10;\n",
        "impliedFormat": "commonjs"
      },
      "./g.ts": {
        "version": "-2047954019-import { b } from \"../../project1/src/b\"; export const g = b;",
        "impliedFormat": "commonjs"
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
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../../project1/src/a.d.ts",
      "../../project1/src/b.d.ts",
      "./e.ts",
      "./f.ts",
      "./g.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}