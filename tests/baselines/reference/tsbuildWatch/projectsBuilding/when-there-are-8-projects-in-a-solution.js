currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames: false
Input::
//// [/a/lib/lib.d.ts]
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

//// [/user/username/projects/myproject/pkg0/index.ts]
export const pkg0 = 0;

//// [/user/username/projects/myproject/pkg0/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  }
}

//// [/user/username/projects/myproject/pkg1/index.ts]
export const pkg1 = 1;

//// [/user/username/projects/myproject/pkg1/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "../pkg0"
    }
  ]
}

//// [/user/username/projects/myproject/pkg2/index.ts]
export const pkg2 = 2;

//// [/user/username/projects/myproject/pkg2/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "../pkg0"
    }
  ]
}

//// [/user/username/projects/myproject/pkg3/index.ts]
export const pkg3 = 3;

//// [/user/username/projects/myproject/pkg3/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "../pkg0"
    }
  ]
}

//// [/user/username/projects/myproject/pkg4/index.ts]
export const pkg4 = 4;

//// [/user/username/projects/myproject/pkg4/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "../pkg0"
    }
  ]
}

//// [/user/username/projects/myproject/pkg5/index.ts]
export const pkg5 = 5;

//// [/user/username/projects/myproject/pkg5/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "../pkg0"
    }
  ]
}

//// [/user/username/projects/myproject/pkg6/index.ts]
export const pkg6 = 6;

//// [/user/username/projects/myproject/pkg6/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "../pkg0"
    }
  ]
}

//// [/user/username/projects/myproject/pkg7/index.ts]
export const pkg7 = 7;

//// [/user/username/projects/myproject/pkg7/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "../pkg0"
    }
  ]
}

//// [/user/username/projects/myproject/tsconfig.json]
{
  "references": [
    {
      "path": "./pkg0"
    },
    {
      "path": "./pkg1"
    },
    {
      "path": "./pkg2"
    },
    {
      "path": "./pkg3"
    },
    {
      "path": "./pkg4"
    },
    {
      "path": "./pkg5"
    },
    {
      "path": "./pkg6"
    },
    {
      "path": "./pkg7"
    }
  ],
  "files": []
}


/a/lib/tsc.js -b -w -v
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * pkg0/tsconfig.json
    * pkg1/tsconfig.json
    * pkg2/tsconfig.json
    * pkg3/tsconfig.json
    * pkg4/tsconfig.json
    * pkg5/tsconfig.json
    * pkg6/tsconfig.json
    * pkg7/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'pkg0/tsconfig.json' is out of date because output file 'pkg0/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg0/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg1/tsconfig.json' is out of date because output file 'pkg1/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg2/tsconfig.json' is out of date because output file 'pkg2/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg3/tsconfig.json' is out of date because output file 'pkg3/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg4/tsconfig.json' is out of date because output file 'pkg4/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg4/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg5/tsconfig.json' is out of date because output file 'pkg5/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg5/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg6/tsconfig.json' is out of date because output file 'pkg6/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg7/tsconfig.json' is out of date because output file 'pkg7/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/pkg0/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg0 = void 0;
exports.pkg0 = 0;


//// [/user/username/projects/myproject/pkg0/index.d.ts]
export declare const pkg0 = 0;


//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-10197922616-export const pkg0 = 0;","signature":"-4821832606-export declare const pkg0 = 0;\n","impliedFormat":1}],"root":[2],"options":{"composite":true},"referencedMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./index.ts": {
        "original": {
          "version": "-10197922616-export const pkg0 = 0;",
          "signature": "-4821832606-export declare const pkg0 = 0;\n",
          "impliedFormat": 1
        },
        "version": "-10197922616-export const pkg0 = 0;",
        "signature": "-4821832606-export declare const pkg0 = 0;\n",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        2,
        "./index.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 788
}

//// [/user/username/projects/myproject/pkg1/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg1 = void 0;
exports.pkg1 = 1;


//// [/user/username/projects/myproject/pkg1/index.d.ts]
export declare const pkg1 = 1;


//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-10158787190-export const pkg1 = 1;","signature":"-3530363548-export declare const pkg1 = 1;\n","impliedFormat":1}],"root":[2],"options":{"composite":true},"referencedMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./index.ts": {
        "original": {
          "version": "-10158787190-export const pkg1 = 1;",
          "signature": "-3530363548-export declare const pkg1 = 1;\n",
          "impliedFormat": 1
        },
        "version": "-10158787190-export const pkg1 = 1;",
        "signature": "-3530363548-export declare const pkg1 = 1;\n",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        2,
        "./index.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 788
}

//// [/user/username/projects/myproject/pkg2/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg2 = void 0;
exports.pkg2 = 2;


//// [/user/username/projects/myproject/pkg2/index.d.ts]
export declare const pkg2 = 2;


//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-14414619060-export const pkg2 = 2;","signature":"-6533861786-export declare const pkg2 = 2;\n","impliedFormat":1}],"root":[2],"options":{"composite":true},"referencedMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./index.ts": {
        "original": {
          "version": "-14414619060-export const pkg2 = 2;",
          "signature": "-6533861786-export declare const pkg2 = 2;\n",
          "impliedFormat": 1
        },
        "version": "-14414619060-export const pkg2 = 2;",
        "signature": "-6533861786-export declare const pkg2 = 2;\n",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        2,
        "./index.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 788
}

//// [/user/username/projects/myproject/pkg3/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg3 = void 0;
exports.pkg3 = 3;


//// [/user/username/projects/myproject/pkg3/index.d.ts]
export declare const pkg3 = 3;


//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-14375483634-export const pkg3 = 3;","signature":"-5242392728-export declare const pkg3 = 3;\n","impliedFormat":1}],"root":[2],"options":{"composite":true},"referencedMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./index.ts": {
        "original": {
          "version": "-14375483634-export const pkg3 = 3;",
          "signature": "-5242392728-export declare const pkg3 = 3;\n",
          "impliedFormat": 1
        },
        "version": "-14375483634-export const pkg3 = 3;",
        "signature": "-5242392728-export declare const pkg3 = 3;\n",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        2,
        "./index.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 788
}

//// [/user/username/projects/myproject/pkg4/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg4 = void 0;
exports.pkg4 = 4;


//// [/user/username/projects/myproject/pkg4/index.d.ts]
export declare const pkg4 = 4;


//// [/user/username/projects/myproject/pkg4/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-14336348208-export const pkg4 = 4;","signature":"-3950923670-export declare const pkg4 = 4;\n","impliedFormat":1}],"root":[2],"options":{"composite":true},"referencedMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg4/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./index.ts": {
        "original": {
          "version": "-14336348208-export const pkg4 = 4;",
          "signature": "-3950923670-export declare const pkg4 = 4;\n",
          "impliedFormat": 1
        },
        "version": "-14336348208-export const pkg4 = 4;",
        "signature": "-3950923670-export declare const pkg4 = 4;\n",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        2,
        "./index.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 788
}

//// [/user/username/projects/myproject/pkg5/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg5 = void 0;
exports.pkg5 = 5;


//// [/user/username/projects/myproject/pkg5/index.d.ts]
export declare const pkg5 = 5;


//// [/user/username/projects/myproject/pkg5/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-14297212782-export const pkg5 = 5;","signature":"-2659454612-export declare const pkg5 = 5;\n","impliedFormat":1}],"root":[2],"options":{"composite":true},"referencedMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg5/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./index.ts": {
        "original": {
          "version": "-14297212782-export const pkg5 = 5;",
          "signature": "-2659454612-export declare const pkg5 = 5;\n",
          "impliedFormat": 1
        },
        "version": "-14297212782-export const pkg5 = 5;",
        "signature": "-2659454612-export declare const pkg5 = 5;\n",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        2,
        "./index.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 788
}

//// [/user/username/projects/myproject/pkg6/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg6 = void 0;
exports.pkg6 = 6;


//// [/user/username/projects/myproject/pkg6/index.d.ts]
export declare const pkg6 = 6;


//// [/user/username/projects/myproject/pkg6/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-14258077356-export const pkg6 = 6;","signature":"-5662952850-export declare const pkg6 = 6;\n","impliedFormat":1}],"root":[2],"options":{"composite":true},"referencedMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg6/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./index.ts": {
        "original": {
          "version": "-14258077356-export const pkg6 = 6;",
          "signature": "-5662952850-export declare const pkg6 = 6;\n",
          "impliedFormat": 1
        },
        "version": "-14258077356-export const pkg6 = 6;",
        "signature": "-5662952850-export declare const pkg6 = 6;\n",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        2,
        "./index.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 788
}

//// [/user/username/projects/myproject/pkg7/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg7 = void 0;
exports.pkg7 = 7;


//// [/user/username/projects/myproject/pkg7/index.d.ts]
export declare const pkg7 = 7;


//// [/user/username/projects/myproject/pkg7/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-14218941930-export const pkg7 = 7;","signature":"-4371483792-export declare const pkg7 = 7;\n","impliedFormat":1}],"root":[2],"options":{"composite":true},"referencedMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg7/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./index.ts": {
        "original": {
          "version": "-14218941930-export const pkg7 = 7;",
          "signature": "-4371483792-export declare const pkg7 = 7;\n",
          "impliedFormat": 1
        },
        "version": "-14218941930-export const pkg7 = 7;",
        "signature": "-4371483792-export declare const pkg7 = 7;\n",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        2,
        "./index.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 788
}


PolledWatches::
/a/lib/package.json: *new*
  {"pollingInterval":2000}
/a/package.json: *new*
  {"pollingInterval":2000}
/package.json: *new*
  {"pollingInterval":2000}
/user/package.json: *new*
  {"pollingInterval":2000}
/user/username/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/pkg0/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/pkg1/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/pkg2/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/pkg3/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/pkg4/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/pkg5/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/pkg6/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/pkg7/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/pkg0/index.ts: *new*
  {}
/user/username/projects/myproject/pkg0/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg1/index.ts: *new*
  {}
/user/username/projects/myproject/pkg1/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg2/index.ts: *new*
  {}
/user/username/projects/myproject/pkg2/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg3/index.ts: *new*
  {}
/user/username/projects/myproject/pkg3/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg4/index.ts: *new*
  {}
/user/username/projects/myproject/pkg4/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg5/index.ts: *new*
  {}
/user/username/projects/myproject/pkg5/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg6/index.ts: *new*
  {}
/user/username/projects/myproject/pkg6/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg7/index.ts: *new*
  {}
/user/username/projects/myproject/pkg7/tsconfig.json: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/pkg0: *new*
  {}
/user/username/projects/myproject/pkg1: *new*
  {}
/user/username/projects/myproject/pkg2: *new*
  {}
/user/username/projects/myproject/pkg3: *new*
  {}
/user/username/projects/myproject/pkg4: *new*
  {}
/user/username/projects/myproject/pkg5: *new*
  {}
/user/username/projects/myproject/pkg6: *new*
  {}
/user/username/projects/myproject/pkg7: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/pkg0/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg0/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg0/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg1/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg1/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg1/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg2/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg2/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg2/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg3/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg3/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg3/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg3/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg3/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg4/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg4/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg4/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg4/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg4/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg5/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg5/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg5/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg5/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg5/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg6/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg6/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg6/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg6/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg6/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg7/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg7/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg7/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg7/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg7/index.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined

Change:: dts doesn't change

Input::
//// [/user/username/projects/myproject/pkg0/index.ts]
export const pkg0 = 0;const someConst2 = 10;


Timeout callback:: count: 1
1: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
1: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'pkg0/tsconfig.json' is out of date because output 'pkg0/tsconfig.tsbuildinfo' is older than input 'pkg0/index.ts'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg0/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg1/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg2/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg3/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg4/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg4/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg5/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg5/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg6/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg7/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/pkg0/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg0 = void 0;
exports.pkg0 = 0;
var someConst2 = 10;


//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-7839887915-export const pkg0 = 0;const someConst2 = 10;","signature":"-4821832606-export declare const pkg0 = 0;\n","impliedFormat":1}],"root":[2],"options":{"composite":true},"referencedMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./index.ts": {
        "original": {
          "version": "-7839887915-export const pkg0 = 0;const someConst2 = 10;",
          "signature": "-4821832606-export declare const pkg0 = 0;\n",
          "impliedFormat": 1
        },
        "version": "-7839887915-export const pkg0 = 0;const someConst2 = 10;",
        "signature": "-4821832606-export declare const pkg0 = 0;\n",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        2,
        "./index.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 809
}

//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg4/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg5/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg6/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg7/tsconfig.tsbuildinfo] file changed its modified time


Program root files: [
  "/user/username/projects/myproject/pkg0/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg0/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: No change

Input::


exitCode:: ExitStatus.undefined

Change:: dts change

Input::
//// [/user/username/projects/myproject/pkg0/index.ts]
export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;


Timeout callback:: count: 1
2: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
2: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'pkg0/tsconfig.json' is out of date because output 'pkg0/tsconfig.tsbuildinfo' is older than input 'pkg0/index.ts'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg0/tsconfig.json'...



//// [/user/username/projects/myproject/pkg0/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someConst = exports.pkg0 = void 0;
exports.pkg0 = 0;
var someConst2 = 10;
exports.someConst = 10;


//// [/user/username/projects/myproject/pkg0/index.d.ts]
export declare const pkg0 = 0;
export declare const someConst = 10;


//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"1748855762-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;","signature":"-6216230055-export declare const pkg0 = 0;\nexport declare const someConst = 10;\n","impliedFormat":1}],"root":[2],"options":{"composite":true},"referencedMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./index.ts": {
        "original": {
          "version": "1748855762-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;",
          "signature": "-6216230055-export declare const pkg0 = 0;\nexport declare const someConst = 10;\n",
          "impliedFormat": 1
        },
        "version": "1748855762-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;",
        "signature": "-6216230055-export declare const pkg0 = 0;\nexport declare const someConst = 10;\n",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        2,
        "./index.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 874
}


Timeout callback:: count: 1
3: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/projects/myproject/pkg0/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg0/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: build pkg1,pkg2,pkg3,pkg4,pkg5

Input::

Before running Timeout callback:: count: 1
3: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 1
Output::
[[90mHH:MM:SS AM[0m] Project 'pkg1/tsconfig.json' is out of date because output 'pkg1/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg2/tsconfig.json' is out of date because output 'pkg2/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg3/tsconfig.json' is out of date because output 'pkg3/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg4/tsconfig.json' is out of date because output 'pkg4/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg4/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg4/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg5/tsconfig.json' is out of date because output 'pkg5/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg5/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg5/tsconfig.json'...



//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg4/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg5/tsconfig.tsbuildinfo] file changed its modified time

Timeout callback:: count: 1
4: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/projects/myproject/pkg1/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg1/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg2/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg2/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg3/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg3/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg3/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg4/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg4/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg4/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg5/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg5/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg5/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: build pkg6,pkg7

Input::

Before running Timeout callback:: count: 1
4: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
[[90mHH:MM:SS AM[0m] Project 'pkg6/tsconfig.json' is out of date because output 'pkg6/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg7/tsconfig.json' is out of date because output 'pkg7/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/pkg6/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg7/tsconfig.tsbuildinfo] file changed its modified time


Program root files: [
  "/user/username/projects/myproject/pkg6/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg6/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg6/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg7/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg7/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg7/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: No change

Input::


exitCode:: ExitStatus.undefined

Change:: dts change2

Input::
//// [/user/username/projects/myproject/pkg0/index.ts]
export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;


Timeout callback:: count: 1
5: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
5: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'pkg0/tsconfig.json' is out of date because output 'pkg0/tsconfig.tsbuildinfo' is older than input 'pkg0/index.ts'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg0/tsconfig.json'...



//// [/user/username/projects/myproject/pkg0/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someConst3 = exports.someConst = exports.pkg0 = void 0;
exports.pkg0 = 0;
var someConst2 = 10;
exports.someConst = 10;
exports.someConst3 = 10;


//// [/user/username/projects/myproject/pkg0/index.d.ts]
export declare const pkg0 = 0;
export declare const someConst = 10;
export declare const someConst3 = 10;


//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"10857255042-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;","signature":"-13679921373-export declare const pkg0 = 0;\nexport declare const someConst = 10;\nexport declare const someConst3 = 10;\n","impliedFormat":1}],"root":[2],"options":{"composite":true},"referencedMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./index.ts": {
        "original": {
          "version": "10857255042-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;",
          "signature": "-13679921373-export declare const pkg0 = 0;\nexport declare const someConst = 10;\nexport declare const someConst3 = 10;\n",
          "impliedFormat": 1
        },
        "version": "10857255042-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;",
        "signature": "-13679921373-export declare const pkg0 = 0;\nexport declare const someConst = 10;\nexport declare const someConst3 = 10;\n",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        2,
        "./index.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 944
}


Timeout callback:: count: 1
6: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/projects/myproject/pkg0/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg0/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: build pkg1,pkg2,pkg3,pkg4,pkg5

Input::

Before running Timeout callback:: count: 1
6: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 1
Output::
[[90mHH:MM:SS AM[0m] Project 'pkg1/tsconfig.json' is out of date because output 'pkg1/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg2/tsconfig.json' is out of date because output 'pkg2/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg3/tsconfig.json' is out of date because output 'pkg3/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg4/tsconfig.json' is out of date because output 'pkg4/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg4/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg4/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg5/tsconfig.json' is out of date because output 'pkg5/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg5/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg5/tsconfig.json'...



//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg4/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg5/tsconfig.tsbuildinfo] file changed its modified time

Timeout callback:: count: 1
7: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/projects/myproject/pkg1/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg1/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg2/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg2/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg3/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg3/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg3/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg4/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg4/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg4/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg5/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg5/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg5/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: change while building

Input::
//// [/user/username/projects/myproject/pkg0/index.ts]
export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;const someConst4 = 10;


Timeout callback:: count: 1
7: timerToBuildInvalidatedProject *deleted*
8: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
8: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'pkg0/tsconfig.json' is out of date because output 'pkg0/tsconfig.tsbuildinfo' is older than input 'pkg0/index.ts'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg0/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg1/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg2/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg3/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg4/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg4/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg5/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg5/tsconfig.json'...



//// [/user/username/projects/myproject/pkg0/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someConst3 = exports.someConst = exports.pkg0 = void 0;
exports.pkg0 = 0;
var someConst2 = 10;
exports.someConst = 10;
exports.someConst3 = 10;
var someConst4 = 10;


//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"27277091473-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;const someConst4 = 10;","signature":"-13679921373-export declare const pkg0 = 0;\nexport declare const someConst = 10;\nexport declare const someConst3 = 10;\n","impliedFormat":1}],"root":[2],"options":{"composite":true},"referencedMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./index.ts": {
        "original": {
          "version": "27277091473-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;const someConst4 = 10;",
          "signature": "-13679921373-export declare const pkg0 = 0;\nexport declare const someConst = 10;\nexport declare const someConst3 = 10;\n",
          "impliedFormat": 1
        },
        "version": "27277091473-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;const someConst4 = 10;",
        "signature": "-13679921373-export declare const pkg0 = 0;\nexport declare const someConst = 10;\nexport declare const someConst3 = 10;\n",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        2,
        "./index.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 966
}

//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg4/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg5/tsconfig.tsbuildinfo] file changed its modified time

Timeout callback:: count: 1
9: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/projects/myproject/pkg0/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg0/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: build pkg6,pkg7

Input::

Before running Timeout callback:: count: 1
9: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
[[90mHH:MM:SS AM[0m] Project 'pkg6/tsconfig.json' is out of date because output 'pkg6/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg7/tsconfig.json' is out of date because output 'pkg7/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/pkg6/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg7/tsconfig.tsbuildinfo] file changed its modified time


Program root files: [
  "/user/username/projects/myproject/pkg6/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg6/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg6/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg7/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg7/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg7/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: No change

Input::


exitCode:: ExitStatus.undefined
