3:: no-change-run
Clean build tsbuildinfo for both projects will have compilerOptions with composite and emitDeclarationOnly
Incremental build will detect that it doesnt need to rebuild so tsbuild info for projects is from before which has option composite as true but emitDeclrationOnly as false
TsBuild info text without affectedFilesPendingEmit:: /src/project1/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "../../lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "impliedFormat": "commonjs"
    },
    "./src/a.ts": {
      "version": "-16597586570-export const a = 10;const aLocal = 10;const aa = 10;",
      "impliedFormat": "commonjs"
    },
    "./src/b.ts": {
      "version": "-6189287562-export const b = 10;const bLocal = 10;",
      "impliedFormat": "commonjs"
    },
    "./src/c.ts": {
      "version": "3248317647-import { a } from \"./a\";export const c = a;",
      "impliedFormat": "commonjs"
    },
    "./src/d.ts": {
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
        "./src/a.ts",
        "./src/b.ts",
        "./src/c.ts",
        "./src/d.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "outSignature": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
  "latestChangedDtsFile": "FakeFileName",
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "fileInfos": {
    "../../lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "impliedFormat": "commonjs"
    },
    "./src/a.ts": {
      "version": "-16597586570-export const a = 10;const aLocal = 10;const aa = 10;",
      "impliedFormat": "commonjs"
    },
    "./src/b.ts": {
      "version": "-6189287562-export const b = 10;const bLocal = 10;",
      "impliedFormat": "commonjs"
    },
    "./src/c.ts": {
      "version": "3248317647-import { a } from \"./a\";export const c = a;",
      "impliedFormat": "commonjs"
    },
    "./src/d.ts": {
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
        "./src/a.ts",
        "./src/b.ts",
        "./src/c.ts",
        "./src/d.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": false,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "outSignature": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
  "latestChangedDtsFile": "FakeFileName",
  "version": "FakeTSVersion"
}
TsBuild info text without affectedFilesPendingEmit:: /src/project2/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "../../lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "impliedFormat": "commonjs"
    },
    "../project1/outfile.d.ts": {
      "version": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
      "impliedFormat": "commonjs"
    },
    "./src/e.ts": {
      "version": "-13789510868-export const e = 10;",
      "impliedFormat": "commonjs"
    },
    "./src/f.ts": {
      "version": "-4849089835-import { a } from \"a\"; export const f = a;",
      "impliedFormat": "commonjs"
    },
    "./src/g.ts": {
      "version": "-18341999015-import { b } from \"b\"; export const g = b;",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      [
        3,
        5
      ],
      [
        "./src/e.ts",
        "./src/f.ts",
        "./src/g.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "outSignature": "-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n",
  "latestChangedDtsFile": "FakeFileName",
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "fileInfos": {
    "../../lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "impliedFormat": "commonjs"
    },
    "../project1/outfile.d.ts": {
      "version": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
      "impliedFormat": "commonjs"
    },
    "./src/e.ts": {
      "version": "-13789510868-export const e = 10;",
      "impliedFormat": "commonjs"
    },
    "./src/f.ts": {
      "version": "-4849089835-import { a } from \"a\"; export const f = a;",
      "impliedFormat": "commonjs"
    },
    "./src/g.ts": {
      "version": "-18341999015-import { b } from \"b\"; export const g = b;",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      [
        3,
        5
      ],
      [
        "./src/e.ts",
        "./src/f.ts",
        "./src/g.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": false,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "outSignature": "-12964815745-declare module \"e\" {\n    export const e = 10;\n}\ndeclare module \"f\" {\n    export const f = 10;\n}\ndeclare module \"g\" {\n    export const g = 10;\n}\n",
  "latestChangedDtsFile": "FakeFileName",
  "version": "FakeTSVersion"
}