2:: with declaration should not emit anything
Clean build tsbuildinfo will have compilerOptions with composite and declaration
Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option composite only
TsBuild info text without affectedFilesPendingEmit:: /src/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "./project/a.ts": {
        "version": "-18487752940-export const a = 10;const aLocal = 10;",
        "impliedFormat": "commonjs"
      },
      "./project/b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;",
        "impliedFormat": "commonjs"
      },
      "./project/c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "impliedFormat": "commonjs"
      },
      "./project/d.ts": {
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
          "./project/a.ts",
          "./project/b.ts",
          "./project/c.ts",
          "./project/d.ts"
        ]
      ]
    ],
    "options": {
      "composite": true,
      "declaration": true,
      "module": 2,
      "outFile": "./outFile.js"
    },
    "outSignature": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "./project/a.ts": {
        "version": "-18487752940-export const a = 10;const aLocal = 10;",
        "impliedFormat": "commonjs"
      },
      "./project/b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;",
        "impliedFormat": "commonjs"
      },
      "./project/c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "impliedFormat": "commonjs"
      },
      "./project/d.ts": {
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
          "./project/a.ts",
          "./project/b.ts",
          "./project/c.ts",
          "./project/d.ts"
        ]
      ]
    ],
    "options": {
      "composite": true,
      "module": 2,
      "outFile": "./outFile.js"
    },
    "outSignature": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
6:: with emitDeclarationOnly should not emit anything
Clean build tsbuildinfo will have compilerOptions with composite and emitDeclarationOnly
Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option composite only
Clean build info does not have js section because its fresh build
Incremental build info has js section from old build
TsBuild info text without affectedFilesPendingEmit:: /src/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "./project/a.ts": {
        "version": "-18487752940-export const a = 10;const aLocal = 10;",
        "impliedFormat": "commonjs"
      },
      "./project/b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;",
        "impliedFormat": "commonjs"
      },
      "./project/c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "impliedFormat": "commonjs"
      },
      "./project/d.ts": {
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
          "./project/a.ts",
          "./project/b.ts",
          "./project/c.ts",
          "./project/d.ts"
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
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "./project/a.ts": {
        "version": "-18487752940-export const a = 10;const aLocal = 10;",
        "impliedFormat": "commonjs"
      },
      "./project/b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;",
        "impliedFormat": "commonjs"
      },
      "./project/c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "impliedFormat": "commonjs"
      },
      "./project/d.ts": {
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
          "./project/a.ts",
          "./project/b.ts",
          "./project/c.ts",
          "./project/d.ts"
        ]
      ]
    ],
    "options": {
      "composite": true,
      "module": 2,
      "outFile": "./outFile.js"
    },
    "outSignature": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
9:: with declaration should not emit anything
Clean build tsbuildinfo will have compilerOptions with composite and declaration
Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option composite only
TsBuild info text without affectedFilesPendingEmit:: /src/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "./project/a.ts": {
        "version": "-17390360476-export const a = 10;const aLocal = 100;",
        "impliedFormat": "commonjs"
      },
      "./project/b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;",
        "impliedFormat": "commonjs"
      },
      "./project/c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "impliedFormat": "commonjs"
      },
      "./project/d.ts": {
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
          "./project/a.ts",
          "./project/b.ts",
          "./project/c.ts",
          "./project/d.ts"
        ]
      ]
    ],
    "options": {
      "composite": true,
      "declaration": true,
      "module": 2,
      "outFile": "./outFile.js"
    },
    "outSignature": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "./project/a.ts": {
        "version": "-17390360476-export const a = 10;const aLocal = 100;",
        "impliedFormat": "commonjs"
      },
      "./project/b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;",
        "impliedFormat": "commonjs"
      },
      "./project/c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "impliedFormat": "commonjs"
      },
      "./project/d.ts": {
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
          "./project/a.ts",
          "./project/b.ts",
          "./project/c.ts",
          "./project/d.ts"
        ]
      ]
    ],
    "options": {
      "composite": true,
      "module": 2,
      "outFile": "./outFile.js"
    },
    "outSignature": "-25657667359-declare module \"a\" {\n    export const a = 10;\n}\ndeclare module \"b\" {\n    export const b = 10;\n}\ndeclare module \"c\" {\n    export const c = 10;\n}\ndeclare module \"d\" {\n    export const d = 10;\n}\n",
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}