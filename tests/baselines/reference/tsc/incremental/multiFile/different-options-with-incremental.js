currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "incremental": true
  }
}

//// [/home/src/workspaces/project/a.ts]
export const a = 10;const aLocal = 10;

//// [/home/src/workspaces/project/b.ts]
export const b = 10;const bLocal = 10;

//// [/home/src/workspaces/project/c.ts]
import { a } from "./a";export const c = a;

//// [/home/src/workspaces/project/d.ts]
import { b } from "./b";export const d = b;

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


/home/src/tslibs/TS/Lib/tsc.js 
Output::


//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*

//// [/home/src/workspaces/project/a.js]
export const a = 10;
const aLocal = 10;


//// [/home/src/workspaces/project/b.js]
export const b = 10;
const bLocal = 10;


//// [/home/src/workspaces/project/c.js]
import { a } from "./a";
export const c = a;


//// [/home/src/workspaces/project/d.js]
import { b } from "./b";
export const d = b;


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.es2025.full.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileIdsList":[[2],[3]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-18487752940-export const a = 10;const aLocal = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"referencedMap":[[4,1],[5,2]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.es2025.full.d.ts",
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
    "../../tslibs/ts/lib/lib.es2025.full.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "version": "-18487752940-export const a = 10;const aLocal = 10;",
      "signature": "-18487752940-export const a = 10;const aLocal = 10;"
    },
    "./b.ts": {
      "version": "-6189287562-export const b = 10;const bLocal = 10;",
      "signature": "-6189287562-export const b = 10;const bLocal = 10;"
    },
    "./c.ts": {
      "version": "3248317647-import { a } from \"./a\";export const c = a;",
      "signature": "3248317647-import { a } from \"./a\";export const c = a;"
    },
    "./d.ts": {
      "version": "-19615769517-import { b } from \"./b\";export const d = b;",
      "signature": "-19615769517-import { b } from \"./b\";export const d = b;"
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
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 869
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "incremental": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2025.full.d.ts (used version)
/home/src/workspaces/project/a.ts (used version)
/home/src/workspaces/project/b.ts (used version)
/home/src/workspaces/project/c.ts (used version)
/home/src/workspaces/project/d.ts (used version)

exitCode:: ExitStatus.Success

Change:: with sourceMap

Input::

/home/src/tslibs/TS/Lib/tsc.js --sourceMap
Output::


//// [/home/src/workspaces/project/a.js]
export const a = 10;
const aLocal = 10;
//# sourceMappingURL=a.js.map

//// [/home/src/workspaces/project/b.js]
export const b = 10;
const bLocal = 10;
//# sourceMappingURL=b.js.map

//// [/home/src/workspaces/project/c.js]
import { a } from "./a";
export const c = a;
//# sourceMappingURL=c.js.map

//// [/home/src/workspaces/project/d.js]
import { b } from "./b";
export const d = b;
//# sourceMappingURL=d.js.map

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.es2025.full.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileIdsList":[[2],[3]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-18487752940-export const a = 10;const aLocal = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"options":{"sourceMap":true},"referencedMap":[[4,1],[5,2]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.es2025.full.d.ts",
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
    "../../tslibs/ts/lib/lib.es2025.full.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "version": "-18487752940-export const a = 10;const aLocal = 10;",
      "signature": "-18487752940-export const a = 10;const aLocal = 10;"
    },
    "./b.ts": {
      "version": "-6189287562-export const b = 10;const bLocal = 10;",
      "signature": "-6189287562-export const b = 10;const bLocal = 10;"
    },
    "./c.ts": {
      "version": "3248317647-import { a } from \"./a\";export const c = a;",
      "signature": "3248317647-import { a } from \"./a\";export const c = a;"
    },
    "./d.ts": {
      "version": "-19615769517-import { b } from \"./b\";export const d = b;",
      "signature": "-19615769517-import { b } from \"./b\";export const d = b;"
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
    "sourceMap": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 898
}

//// [/home/src/workspaces/project/a.js.map]
{"version":3,"file":"a.js","sourceRoot":"","sources":["a.ts"],"names":[],"mappings":"AAAA,MAAM,CAAC,MAAM,CAAC,GAAG,EAAE,CAAC;AAAA,MAAM,MAAM,GAAG,EAAE,CAAC"}

//// [/home/src/workspaces/project/b.js.map]
{"version":3,"file":"b.js","sourceRoot":"","sources":["b.ts"],"names":[],"mappings":"AAAA,MAAM,CAAC,MAAM,CAAC,GAAG,EAAE,CAAC;AAAA,MAAM,MAAM,GAAG,EAAE,CAAC"}

//// [/home/src/workspaces/project/c.js.map]
{"version":3,"file":"c.js","sourceRoot":"","sources":["c.ts"],"names":[],"mappings":"AAAA,OAAO,EAAE,CAAC,EAAE,MAAM,KAAK,CAAC;AAAA,MAAM,CAAC,MAAM,CAAC,GAAG,CAAC,CAAC"}

//// [/home/src/workspaces/project/d.js.map]
{"version":3,"file":"d.js","sourceRoot":"","sources":["d.ts"],"names":[],"mappings":"AAAA,OAAO,EAAE,CAAC,EAAE,MAAM,KAAK,CAAC;AAAA,MAAM,CAAC,MAAM,CAAC,GAAG,CAAC,CAAC"}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "incremental": true,
  "sourceMap": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: should re-emit only js so they dont contain sourcemap

Input::

/home/src/tslibs/TS/Lib/tsc.js 
Output::


//// [/home/src/workspaces/project/a.js]
export const a = 10;
const aLocal = 10;


//// [/home/src/workspaces/project/b.js]
export const b = 10;
const bLocal = 10;


//// [/home/src/workspaces/project/c.js]
import { a } from "./a";
export const c = a;


//// [/home/src/workspaces/project/d.js]
import { b } from "./b";
export const d = b;


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.es2025.full.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileIdsList":[[2],[3]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-18487752940-export const a = 10;const aLocal = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"root":[[2,5]],"referencedMap":[[4,1],[5,2]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.es2025.full.d.ts",
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
    "../../tslibs/ts/lib/lib.es2025.full.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "version": "-18487752940-export const a = 10;const aLocal = 10;",
      "signature": "-18487752940-export const a = 10;const aLocal = 10;"
    },
    "./b.ts": {
      "version": "-6189287562-export const b = 10;const bLocal = 10;",
      "signature": "-6189287562-export const b = 10;const bLocal = 10;"
    },
    "./c.ts": {
      "version": "3248317647-import { a } from \"./a\";export const c = a;",
      "signature": "3248317647-import { a } from \"./a\";export const c = a;"
    },
    "./d.ts": {
      "version": "-19615769517-import { b } from \"./b\";export const d = b;",
      "signature": "-19615769517-import { b } from \"./b\";export const d = b;"
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
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 869
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "incremental": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: with declaration, emit Dts and should not emit js

Input::

/home/src/tslibs/TS/Lib/tsc.js --declaration
Output::


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.es2025.full.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileIdsList":[[2],[3]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-18487752940-export const a = 10;const aLocal = 10;","signature":"-3497920574-export declare const a = 10;\n"},{"version":"-6189287562-export const b = 10;const bLocal = 10;","signature":"-3829150557-export declare const b = 10;\n"},{"version":"3248317647-import { a } from \"./a\";export const c = a;","signature":"-4160380540-export declare const c = 10;\n"},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","signature":"-4491610523-export declare const d = 10;\n"}],"root":[[2,5]],"options":{"declaration":true},"referencedMap":[[4,1],[5,2]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.es2025.full.d.ts",
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
    "../../tslibs/ts/lib/lib.es2025.full.d.ts": {
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
    "declaration": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1176
}

//// [/home/src/workspaces/project/a.d.ts]
export declare const a = 10;


//// [/home/src/workspaces/project/b.d.ts]
export declare const b = 10;


//// [/home/src/workspaces/project/c.d.ts]
export declare const c = 10;


//// [/home/src/workspaces/project/d.d.ts]
export declare const d = 10;



Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "incremental": true,
  "declaration": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: with declaration and declarationMap

Input::

/home/src/tslibs/TS/Lib/tsc.js --declaration --declarationMap
Output::


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.es2025.full.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileIdsList":[[2],[3]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-18487752940-export const a = 10;const aLocal = 10;","signature":"-3497920574-export declare const a = 10;\n"},{"version":"-6189287562-export const b = 10;const bLocal = 10;","signature":"-3829150557-export declare const b = 10;\n"},{"version":"3248317647-import { a } from \"./a\";export const c = a;","signature":"-4160380540-export declare const c = 10;\n"},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","signature":"-4491610523-export declare const d = 10;\n"}],"root":[[2,5]],"options":{"declaration":true,"declarationMap":true},"referencedMap":[[4,1],[5,2]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.es2025.full.d.ts",
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
    "../../tslibs/ts/lib/lib.es2025.full.d.ts": {
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
    "declaration": true,
    "declarationMap": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1198
}

//// [/home/src/workspaces/project/a.d.ts]
export declare const a = 10;
//# sourceMappingURL=a.d.ts.map

//// [/home/src/workspaces/project/b.d.ts]
export declare const b = 10;
//# sourceMappingURL=b.d.ts.map

//// [/home/src/workspaces/project/c.d.ts]
export declare const c = 10;
//# sourceMappingURL=c.d.ts.map

//// [/home/src/workspaces/project/d.d.ts]
export declare const d = 10;
//# sourceMappingURL=d.d.ts.map

//// [/home/src/workspaces/project/a.d.ts.map]
{"version":3,"file":"a.d.ts","sourceRoot":"","sources":["a.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,CAAC,KAAK,CAAC"}

//// [/home/src/workspaces/project/b.d.ts.map]
{"version":3,"file":"b.d.ts","sourceRoot":"","sources":["b.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,CAAC,KAAK,CAAC"}

//// [/home/src/workspaces/project/c.d.ts.map]
{"version":3,"file":"c.d.ts","sourceRoot":"","sources":["c.ts"],"names":[],"mappings":"AAAwB,eAAO,MAAM,CAAC,KAAI,CAAC"}

//// [/home/src/workspaces/project/d.d.ts.map]
{"version":3,"file":"d.d.ts","sourceRoot":"","sources":["d.ts"],"names":[],"mappings":"AAAwB,eAAO,MAAM,CAAC,KAAI,CAAC"}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "incremental": true,
  "declaration": true,
  "declarationMap": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js 
Output::



Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "incremental": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: local change

Input::
//// [/home/src/workspaces/project/a.ts]
export const a = 10;const aLocal = 100;


/home/src/tslibs/TS/Lib/tsc.js 
Output::


//// [/home/src/workspaces/project/a.js]
export const a = 10;
const aLocal = 100;


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.es2025.full.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileIdsList":[[2],[3]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-17390360476-export const a = 10;const aLocal = 100;","signature":"-3497920574-export declare const a = 10;\n"},{"version":"-6189287562-export const b = 10;const bLocal = 10;","signature":"-3829150557-export declare const b = 10;\n"},{"version":"3248317647-import { a } from \"./a\";export const c = a;","signature":"-4160380540-export declare const c = 10;\n"},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","signature":"-4491610523-export declare const d = 10;\n"}],"root":[[2,5]],"referencedMap":[[4,1],[5,2]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.es2025.full.d.ts",
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
    "../../tslibs/ts/lib/lib.es2025.full.d.ts": {
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
        "version": "-17390360476-export const a = 10;const aLocal = 100;",
        "signature": "-3497920574-export declare const a = 10;\n"
      },
      "version": "-17390360476-export const a = 10;const aLocal = 100;",
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
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1146
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "incremental": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/a.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/a.ts (computed .d.ts)

exitCode:: ExitStatus.Success

Change:: with declaration and declarationMap

Input::

/home/src/tslibs/TS/Lib/tsc.js --declaration --declarationMap
Output::


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.es2025.full.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileIdsList":[[2],[3]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-17390360476-export const a = 10;const aLocal = 100;","signature":"-3497920574-export declare const a = 10;\n"},{"version":"-6189287562-export const b = 10;const bLocal = 10;","signature":"-3829150557-export declare const b = 10;\n"},{"version":"3248317647-import { a } from \"./a\";export const c = a;","signature":"-4160380540-export declare const c = 10;\n"},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","signature":"-4491610523-export declare const d = 10;\n"}],"root":[[2,5]],"options":{"declaration":true,"declarationMap":true},"referencedMap":[[4,1],[5,2]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.es2025.full.d.ts",
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
    "../../tslibs/ts/lib/lib.es2025.full.d.ts": {
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
        "version": "-17390360476-export const a = 10;const aLocal = 100;",
        "signature": "-3497920574-export declare const a = 10;\n"
      },
      "version": "-17390360476-export const a = 10;const aLocal = 100;",
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
    "declaration": true,
    "declarationMap": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1199
}

//// [/home/src/workspaces/project/a.d.ts] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents
//// [/home/src/workspaces/project/c.d.ts] file written with same contents
//// [/home/src/workspaces/project/d.d.ts] file written with same contents
//// [/home/src/workspaces/project/a.d.ts.map] file written with same contents
//// [/home/src/workspaces/project/b.d.ts.map] file written with same contents
//// [/home/src/workspaces/project/c.d.ts.map] file written with same contents
//// [/home/src/workspaces/project/d.d.ts.map] file written with same contents

Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "incremental": true,
  "declaration": true,
  "declarationMap": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js 
Output::



Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "incremental": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: with inlineSourceMap

Input::

/home/src/tslibs/TS/Lib/tsc.js --inlineSourceMap
Output::


//// [/home/src/workspaces/project/a.js]
export const a = 10;
const aLocal = 100;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUFBLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyJ9

//// [/home/src/workspaces/project/b.js]
export const b = 10;
const bLocal = 10;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUFBLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyJ9

//// [/home/src/workspaces/project/c.js]
import { a } from "./a";
export const c = a;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMifQ==

//// [/home/src/workspaces/project/d.js]
import { b } from "./b";
export const d = b;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMifQ==

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.es2025.full.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileIdsList":[[2],[3]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-17390360476-export const a = 10;const aLocal = 100;","signature":"-3497920574-export declare const a = 10;\n"},{"version":"-6189287562-export const b = 10;const bLocal = 10;","signature":"-3829150557-export declare const b = 10;\n"},{"version":"3248317647-import { a } from \"./a\";export const c = a;","signature":"-4160380540-export declare const c = 10;\n"},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","signature":"-4491610523-export declare const d = 10;\n"}],"root":[[2,5]],"options":{"inlineSourceMap":true},"referencedMap":[[4,1],[5,2]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.es2025.full.d.ts",
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
    "../../tslibs/ts/lib/lib.es2025.full.d.ts": {
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
        "version": "-17390360476-export const a = 10;const aLocal = 100;",
        "signature": "-3497920574-export declare const a = 10;\n"
      },
      "version": "-17390360476-export const a = 10;const aLocal = 100;",
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
    "inlineSourceMap": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1181
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "incremental": true,
  "inlineSourceMap": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: with sourceMap

Input::

/home/src/tslibs/TS/Lib/tsc.js --sourceMap
Output::


//// [/home/src/workspaces/project/a.js]
export const a = 10;
const aLocal = 100;
//# sourceMappingURL=a.js.map

//// [/home/src/workspaces/project/b.js]
export const b = 10;
const bLocal = 10;
//# sourceMappingURL=b.js.map

//// [/home/src/workspaces/project/c.js]
import { a } from "./a";
export const c = a;
//# sourceMappingURL=c.js.map

//// [/home/src/workspaces/project/d.js]
import { b } from "./b";
export const d = b;
//# sourceMappingURL=d.js.map

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.es2025.full.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileIdsList":[[2],[3]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-17390360476-export const a = 10;const aLocal = 100;","signature":"-3497920574-export declare const a = 10;\n"},{"version":"-6189287562-export const b = 10;const bLocal = 10;","signature":"-3829150557-export declare const b = 10;\n"},{"version":"3248317647-import { a } from \"./a\";export const c = a;","signature":"-4160380540-export declare const c = 10;\n"},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","signature":"-4491610523-export declare const d = 10;\n"}],"root":[[2,5]],"options":{"sourceMap":true},"referencedMap":[[4,1],[5,2]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.es2025.full.d.ts",
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
    "../../tslibs/ts/lib/lib.es2025.full.d.ts": {
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
        "version": "-17390360476-export const a = 10;const aLocal = 100;",
        "signature": "-3497920574-export declare const a = 10;\n"
      },
      "version": "-17390360476-export const a = 10;const aLocal = 100;",
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
    "sourceMap": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1175
}

//// [/home/src/workspaces/project/a.js.map]
{"version":3,"file":"a.js","sourceRoot":"","sources":["a.ts"],"names":[],"mappings":"AAAA,MAAM,CAAC,MAAM,CAAC,GAAG,EAAE,CAAC;AAAA,MAAM,MAAM,GAAG,GAAG,CAAC"}

//// [/home/src/workspaces/project/b.js.map] file written with same contents
//// [/home/src/workspaces/project/c.js.map] file written with same contents
//// [/home/src/workspaces/project/d.js.map] file written with same contents

Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "incremental": true,
  "sourceMap": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: emit js files

Input::

/home/src/tslibs/TS/Lib/tsc.js 
Output::


//// [/home/src/workspaces/project/a.js]
export const a = 10;
const aLocal = 100;


//// [/home/src/workspaces/project/b.js]
export const b = 10;
const bLocal = 10;


//// [/home/src/workspaces/project/c.js]
import { a } from "./a";
export const c = a;


//// [/home/src/workspaces/project/d.js]
import { b } from "./b";
export const d = b;


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.es2025.full.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileIdsList":[[2],[3]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-17390360476-export const a = 10;const aLocal = 100;","signature":"-3497920574-export declare const a = 10;\n"},{"version":"-6189287562-export const b = 10;const bLocal = 10;","signature":"-3829150557-export declare const b = 10;\n"},{"version":"3248317647-import { a } from \"./a\";export const c = a;","signature":"-4160380540-export declare const c = 10;\n"},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","signature":"-4491610523-export declare const d = 10;\n"}],"root":[[2,5]],"referencedMap":[[4,1],[5,2]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.es2025.full.d.ts",
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
    "../../tslibs/ts/lib/lib.es2025.full.d.ts": {
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
        "version": "-17390360476-export const a = 10;const aLocal = 100;",
        "signature": "-3497920574-export declare const a = 10;\n"
      },
      "version": "-17390360476-export const a = 10;const aLocal = 100;",
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
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1146
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "incremental": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: with declaration and declarationMap

Input::

/home/src/tslibs/TS/Lib/tsc.js --declaration --declarationMap
Output::


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.es2025.full.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileIdsList":[[2],[3]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-17390360476-export const a = 10;const aLocal = 100;","signature":"-3497920574-export declare const a = 10;\n"},{"version":"-6189287562-export const b = 10;const bLocal = 10;","signature":"-3829150557-export declare const b = 10;\n"},{"version":"3248317647-import { a } from \"./a\";export const c = a;","signature":"-4160380540-export declare const c = 10;\n"},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","signature":"-4491610523-export declare const d = 10;\n"}],"root":[[2,5]],"options":{"declaration":true,"declarationMap":true},"referencedMap":[[4,1],[5,2]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.es2025.full.d.ts",
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
    "../../tslibs/ts/lib/lib.es2025.full.d.ts": {
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
        "version": "-17390360476-export const a = 10;const aLocal = 100;",
        "signature": "-3497920574-export declare const a = 10;\n"
      },
      "version": "-17390360476-export const a = 10;const aLocal = 100;",
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
    "declaration": true,
    "declarationMap": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1199
}

//// [/home/src/workspaces/project/a.d.ts] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents
//// [/home/src/workspaces/project/c.d.ts] file written with same contents
//// [/home/src/workspaces/project/d.d.ts] file written with same contents
//// [/home/src/workspaces/project/a.d.ts.map] file written with same contents
//// [/home/src/workspaces/project/b.d.ts.map] file written with same contents
//// [/home/src/workspaces/project/c.d.ts.map] file written with same contents
//// [/home/src/workspaces/project/d.d.ts.map] file written with same contents

Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "incremental": true,
  "declaration": true,
  "declarationMap": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: with declaration and declarationMap, should not re-emit

Input::

/home/src/tslibs/TS/Lib/tsc.js --declaration --declarationMap
Output::



Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts",
  "/home/src/workspaces/project/d.ts"
]
Program options: {
  "incremental": true,
  "declaration": true,
  "declarationMap": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts
/home/src/workspaces/project/d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.Success
