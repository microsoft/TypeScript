currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
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

//// [/user/username/projects/myproject/pkg8/index.ts]
export const pkg8 = 8;

//// [/user/username/projects/myproject/pkg8/tsconfig.json]
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

//// [/user/username/projects/myproject/pkg9/index.ts]
export const pkg9 = 9;

//// [/user/username/projects/myproject/pkg9/tsconfig.json]
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

//// [/user/username/projects/myproject/pkg10/index.ts]
export const pkg10 = 10;

//// [/user/username/projects/myproject/pkg10/tsconfig.json]
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

//// [/user/username/projects/myproject/pkg11/index.ts]
export const pkg11 = 11;

//// [/user/username/projects/myproject/pkg11/tsconfig.json]
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

//// [/user/username/projects/myproject/pkg12/index.ts]
export const pkg12 = 12;

//// [/user/username/projects/myproject/pkg12/tsconfig.json]
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

//// [/user/username/projects/myproject/pkg13/index.ts]
export const pkg13 = 13;

//// [/user/username/projects/myproject/pkg13/tsconfig.json]
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

//// [/user/username/projects/myproject/pkg14/index.ts]
export const pkg14 = 14;

//// [/user/username/projects/myproject/pkg14/tsconfig.json]
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

//// [/user/username/projects/myproject/pkg15/index.ts]
export const pkg15 = 15;

//// [/user/username/projects/myproject/pkg15/tsconfig.json]
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

//// [/user/username/projects/myproject/pkg16/index.ts]
export const pkg16 = 16;

//// [/user/username/projects/myproject/pkg16/tsconfig.json]
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

//// [/user/username/projects/myproject/pkg17/index.ts]
export const pkg17 = 17;

//// [/user/username/projects/myproject/pkg17/tsconfig.json]
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

//// [/user/username/projects/myproject/pkg18/index.ts]
export const pkg18 = 18;

//// [/user/username/projects/myproject/pkg18/tsconfig.json]
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

//// [/user/username/projects/myproject/pkg19/index.ts]
export const pkg19 = 19;

//// [/user/username/projects/myproject/pkg19/tsconfig.json]
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

//// [/user/username/projects/myproject/pkg20/index.ts]
export const pkg20 = 20;

//// [/user/username/projects/myproject/pkg20/tsconfig.json]
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

//// [/user/username/projects/myproject/pkg21/index.ts]
export const pkg21 = 21;

//// [/user/username/projects/myproject/pkg21/tsconfig.json]
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

//// [/user/username/projects/myproject/pkg22/index.ts]
export const pkg22 = 22;

//// [/user/username/projects/myproject/pkg22/tsconfig.json]
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
    },
    {
      "path": "./pkg8"
    },
    {
      "path": "./pkg9"
    },
    {
      "path": "./pkg10"
    },
    {
      "path": "./pkg11"
    },
    {
      "path": "./pkg12"
    },
    {
      "path": "./pkg13"
    },
    {
      "path": "./pkg14"
    },
    {
      "path": "./pkg15"
    },
    {
      "path": "./pkg16"
    },
    {
      "path": "./pkg17"
    },
    {
      "path": "./pkg18"
    },
    {
      "path": "./pkg19"
    },
    {
      "path": "./pkg20"
    },
    {
      "path": "./pkg21"
    },
    {
      "path": "./pkg22"
    }
  ],
  "files": []
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


/home/src/tslibs/TS/Lib/tsc.js -b -w -v
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
    * pkg8/tsconfig.json
    * pkg9/tsconfig.json
    * pkg10/tsconfig.json
    * pkg11/tsconfig.json
    * pkg12/tsconfig.json
    * pkg13/tsconfig.json
    * pkg14/tsconfig.json
    * pkg15/tsconfig.json
    * pkg16/tsconfig.json
    * pkg17/tsconfig.json
    * pkg18/tsconfig.json
    * pkg19/tsconfig.json
    * pkg20/tsconfig.json
    * pkg21/tsconfig.json
    * pkg22/tsconfig.json
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

[[90mHH:MM:SS AM[0m] Project 'pkg8/tsconfig.json' is out of date because output file 'pkg8/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg8/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg9/tsconfig.json' is out of date because output file 'pkg9/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg9/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg10/tsconfig.json' is out of date because output file 'pkg10/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg10/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg11/tsconfig.json' is out of date because output file 'pkg11/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg11/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg12/tsconfig.json' is out of date because output file 'pkg12/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg12/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg13/tsconfig.json' is out of date because output file 'pkg13/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg13/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg14/tsconfig.json' is out of date because output file 'pkg14/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg14/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg15/tsconfig.json' is out of date because output file 'pkg15/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg15/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg16/tsconfig.json' is out of date because output file 'pkg16/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg16/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg17/tsconfig.json' is out of date because output file 'pkg17/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg17/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg18/tsconfig.json' is out of date because output file 'pkg18/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg18/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg19/tsconfig.json' is out of date because output file 'pkg19/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg19/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg20/tsconfig.json' is out of date because output file 'pkg20/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg20/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg21/tsconfig.json' is out of date because output file 'pkg21/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg21/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg22/tsconfig.json' is out of date because output file 'pkg22/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg22/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/pkg0/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg0 = void 0;
exports.pkg0 = 0;


//// [/user/username/projects/myproject/pkg0/index.d.ts]
export declare const pkg0 = 0;


//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-10197922616-export const pkg0 = 0;","signature":"-4821832606-export declare const pkg0 = 0;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-10197922616-export const pkg0 = 0;",
        "signature": "-4821832606-export declare const pkg0 = 0;\n"
      },
      "version": "-10197922616-export const pkg0 = 0;",
      "signature": "-4821832606-export declare const pkg0 = 0;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 783
}

//// [/user/username/projects/myproject/pkg1/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg1 = void 0;
exports.pkg1 = 1;


//// [/user/username/projects/myproject/pkg1/index.d.ts]
export declare const pkg1 = 1;


//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-10158787190-export const pkg1 = 1;","signature":"-3530363548-export declare const pkg1 = 1;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-10158787190-export const pkg1 = 1;",
        "signature": "-3530363548-export declare const pkg1 = 1;\n"
      },
      "version": "-10158787190-export const pkg1 = 1;",
      "signature": "-3530363548-export declare const pkg1 = 1;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 783
}

//// [/user/username/projects/myproject/pkg2/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg2 = void 0;
exports.pkg2 = 2;


//// [/user/username/projects/myproject/pkg2/index.d.ts]
export declare const pkg2 = 2;


//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-14414619060-export const pkg2 = 2;","signature":"-6533861786-export declare const pkg2 = 2;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-14414619060-export const pkg2 = 2;",
        "signature": "-6533861786-export declare const pkg2 = 2;\n"
      },
      "version": "-14414619060-export const pkg2 = 2;",
      "signature": "-6533861786-export declare const pkg2 = 2;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 783
}

//// [/user/username/projects/myproject/pkg3/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg3 = void 0;
exports.pkg3 = 3;


//// [/user/username/projects/myproject/pkg3/index.d.ts]
export declare const pkg3 = 3;


//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-14375483634-export const pkg3 = 3;","signature":"-5242392728-export declare const pkg3 = 3;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-14375483634-export const pkg3 = 3;",
        "signature": "-5242392728-export declare const pkg3 = 3;\n"
      },
      "version": "-14375483634-export const pkg3 = 3;",
      "signature": "-5242392728-export declare const pkg3 = 3;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 783
}

//// [/user/username/projects/myproject/pkg4/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg4 = void 0;
exports.pkg4 = 4;


//// [/user/username/projects/myproject/pkg4/index.d.ts]
export declare const pkg4 = 4;


//// [/user/username/projects/myproject/pkg4/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-14336348208-export const pkg4 = 4;","signature":"-3950923670-export declare const pkg4 = 4;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg4/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-14336348208-export const pkg4 = 4;",
        "signature": "-3950923670-export declare const pkg4 = 4;\n"
      },
      "version": "-14336348208-export const pkg4 = 4;",
      "signature": "-3950923670-export declare const pkg4 = 4;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 783
}

//// [/user/username/projects/myproject/pkg5/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg5 = void 0;
exports.pkg5 = 5;


//// [/user/username/projects/myproject/pkg5/index.d.ts]
export declare const pkg5 = 5;


//// [/user/username/projects/myproject/pkg5/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-14297212782-export const pkg5 = 5;","signature":"-2659454612-export declare const pkg5 = 5;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg5/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-14297212782-export const pkg5 = 5;",
        "signature": "-2659454612-export declare const pkg5 = 5;\n"
      },
      "version": "-14297212782-export const pkg5 = 5;",
      "signature": "-2659454612-export declare const pkg5 = 5;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 783
}

//// [/user/username/projects/myproject/pkg6/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg6 = void 0;
exports.pkg6 = 6;


//// [/user/username/projects/myproject/pkg6/index.d.ts]
export declare const pkg6 = 6;


//// [/user/username/projects/myproject/pkg6/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-14258077356-export const pkg6 = 6;","signature":"-5662952850-export declare const pkg6 = 6;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg6/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-14258077356-export const pkg6 = 6;",
        "signature": "-5662952850-export declare const pkg6 = 6;\n"
      },
      "version": "-14258077356-export const pkg6 = 6;",
      "signature": "-5662952850-export declare const pkg6 = 6;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 783
}

//// [/user/username/projects/myproject/pkg7/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg7 = void 0;
exports.pkg7 = 7;


//// [/user/username/projects/myproject/pkg7/index.d.ts]
export declare const pkg7 = 7;


//// [/user/username/projects/myproject/pkg7/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-14218941930-export const pkg7 = 7;","signature":"-4371483792-export declare const pkg7 = 7;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg7/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-14218941930-export const pkg7 = 7;",
        "signature": "-4371483792-export declare const pkg7 = 7;\n"
      },
      "version": "-14218941930-export const pkg7 = 7;",
      "signature": "-4371483792-export declare const pkg7 = 7;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 783
}

//// [/user/username/projects/myproject/pkg8/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg8 = void 0;
exports.pkg8 = 8;


//// [/user/username/projects/myproject/pkg8/index.d.ts]
export declare const pkg8 = 8;


//// [/user/username/projects/myproject/pkg8/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-14179806504-export const pkg8 = 8;","signature":"-3080014734-export declare const pkg8 = 8;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg8/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-14179806504-export const pkg8 = 8;",
        "signature": "-3080014734-export declare const pkg8 = 8;\n"
      },
      "version": "-14179806504-export const pkg8 = 8;",
      "signature": "-3080014734-export declare const pkg8 = 8;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 783
}

//// [/user/username/projects/myproject/pkg9/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg9 = void 0;
exports.pkg9 = 9;


//// [/user/username/projects/myproject/pkg9/index.d.ts]
export declare const pkg9 = 9;


//// [/user/username/projects/myproject/pkg9/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-14140671078-export const pkg9 = 9;","signature":"-6083512972-export declare const pkg9 = 9;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg9/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-14140671078-export const pkg9 = 9;",
        "signature": "-6083512972-export declare const pkg9 = 9;\n"
      },
      "version": "-14140671078-export const pkg9 = 9;",
      "signature": "-6083512972-export declare const pkg9 = 9;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 783
}

//// [/user/username/projects/myproject/pkg10/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg10 = void 0;
exports.pkg10 = 10;


//// [/user/username/projects/myproject/pkg10/index.d.ts]
export declare const pkg10 = 10;


//// [/user/username/projects/myproject/pkg10/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-9585933846-export const pkg10 = 10;","signature":"-3553269308-export declare const pkg10 = 10;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg10/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-9585933846-export const pkg10 = 10;",
        "signature": "-3553269308-export declare const pkg10 = 10;\n"
      },
      "version": "-9585933846-export const pkg10 = 10;",
      "signature": "-3553269308-export declare const pkg10 = 10;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 786
}

//// [/user/username/projects/myproject/pkg11/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg11 = void 0;
exports.pkg11 = 11;


//// [/user/username/projects/myproject/pkg11/index.d.ts]
export declare const pkg11 = 11;


//// [/user/username/projects/myproject/pkg11/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-8294465844-export const pkg11 = 11;","signature":"410469094-export declare const pkg11 = 11;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg11/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-8294465844-export const pkg11 = 11;",
        "signature": "410469094-export declare const pkg11 = 11;\n"
      },
      "version": "-8294465844-export const pkg11 = 11;",
      "signature": "410469094-export declare const pkg11 = 11;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 784
}

//// [/user/username/projects/myproject/pkg12/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg12 = void 0;
exports.pkg12 = 12;


//// [/user/username/projects/myproject/pkg12/index.d.ts]
export declare const pkg12 = 12;


//// [/user/username/projects/myproject/pkg12/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-7002997842-export const pkg12 = 12;","signature":"-4215727096-export declare const pkg12 = 12;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg12/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-7002997842-export const pkg12 = 12;",
        "signature": "-4215727096-export declare const pkg12 = 12;\n"
      },
      "version": "-7002997842-export const pkg12 = 12;",
      "signature": "-4215727096-export declare const pkg12 = 12;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 786
}

//// [/user/username/projects/myproject/pkg13/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg13 = void 0;
exports.pkg13 = 13;


//// [/user/username/projects/myproject/pkg13/index.d.ts]
export declare const pkg13 = 13;


//// [/user/username/projects/myproject/pkg13/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-10006497136-export const pkg13 = 13;","signature":"-4546955990-export declare const pkg13 = 13;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg13/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-10006497136-export const pkg13 = 13;",
        "signature": "-4546955990-export declare const pkg13 = 13;\n"
      },
      "version": "-10006497136-export const pkg13 = 13;",
      "signature": "-4546955990-export declare const pkg13 = 13;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 787
}

//// [/user/username/projects/myproject/pkg14/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg14 = void 0;
exports.pkg14 = 14;


//// [/user/username/projects/myproject/pkg14/index.d.ts]
export declare const pkg14 = 14;


//// [/user/username/projects/myproject/pkg14/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-8715029134-export const pkg14 = 14;","signature":"-583217588-export declare const pkg14 = 14;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg14/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-8715029134-export const pkg14 = 14;",
        "signature": "-583217588-export declare const pkg14 = 14;\n"
      },
      "version": "-8715029134-export const pkg14 = 14;",
      "signature": "-583217588-export declare const pkg14 = 14;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 785
}

//// [/user/username/projects/myproject/pkg15/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg15 = void 0;
exports.pkg15 = 15;


//// [/user/username/projects/myproject/pkg15/index.d.ts]
export declare const pkg15 = 15;


//// [/user/username/projects/myproject/pkg15/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-7423561132-export const pkg15 = 15;","signature":"-5209413778-export declare const pkg15 = 15;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg15/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-7423561132-export const pkg15 = 15;",
        "signature": "-5209413778-export declare const pkg15 = 15;\n"
      },
      "version": "-7423561132-export const pkg15 = 15;",
      "signature": "-5209413778-export declare const pkg15 = 15;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 786
}

//// [/user/username/projects/myproject/pkg16/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg16 = void 0;
exports.pkg16 = 16;


//// [/user/username/projects/myproject/pkg16/index.d.ts]
export declare const pkg16 = 16;


//// [/user/username/projects/myproject/pkg16/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-6132093130-export const pkg16 = 16;","signature":"-1245675376-export declare const pkg16 = 16;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg16/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-6132093130-export const pkg16 = 16;",
        "signature": "-1245675376-export declare const pkg16 = 16;\n"
      },
      "version": "-6132093130-export const pkg16 = 16;",
      "signature": "-1245675376-export declare const pkg16 = 16;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 786
}

//// [/user/username/projects/myproject/pkg17/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg17 = void 0;
exports.pkg17 = 17;


//// [/user/username/projects/myproject/pkg17/index.d.ts]
export declare const pkg17 = 17;


//// [/user/username/projects/myproject/pkg17/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-17725527016-export const pkg17 = 17;","signature":"-1576904270-export declare const pkg17 = 17;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg17/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-17725527016-export const pkg17 = 17;",
        "signature": "-1576904270-export declare const pkg17 = 17;\n"
      },
      "version": "-17725527016-export const pkg17 = 17;",
      "signature": "-1576904270-export declare const pkg17 = 17;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 787
}

//// [/user/username/projects/myproject/pkg18/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg18 = void 0;
exports.pkg18 = 18;


//// [/user/username/projects/myproject/pkg18/index.d.ts]
export declare const pkg18 = 18;


//// [/user/username/projects/myproject/pkg18/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-16434059014-export const pkg18 = 18;","signature":"-1908133164-export declare const pkg18 = 18;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg18/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-16434059014-export const pkg18 = 18;",
        "signature": "-1908133164-export declare const pkg18 = 18;\n"
      },
      "version": "-16434059014-export const pkg18 = 18;",
      "signature": "-1908133164-export declare const pkg18 = 18;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 787
}

//// [/user/username/projects/myproject/pkg19/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg19 = void 0;
exports.pkg19 = 19;


//// [/user/username/projects/myproject/pkg19/index.d.ts]
export declare const pkg19 = 19;


//// [/user/username/projects/myproject/pkg19/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-15142591012-export const pkg19 = 19;","signature":"-2239362058-export declare const pkg19 = 19;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg19/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-15142591012-export const pkg19 = 19;",
        "signature": "-2239362058-export declare const pkg19 = 19;\n"
      },
      "version": "-15142591012-export const pkg19 = 19;",
      "signature": "-2239362058-export declare const pkg19 = 19;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 787
}

//// [/user/username/projects/myproject/pkg20/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg20 = void 0;
exports.pkg20 = 20;


//// [/user/username/projects/myproject/pkg20/index.d.ts]
export declare const pkg20 = 20;


//// [/user/username/projects/myproject/pkg20/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-14212130036-export const pkg20 = 20;","signature":"-5893888218-export declare const pkg20 = 20;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg20/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-14212130036-export const pkg20 = 20;",
        "signature": "-5893888218-export declare const pkg20 = 20;\n"
      },
      "version": "-14212130036-export const pkg20 = 20;",
      "signature": "-5893888218-export declare const pkg20 = 20;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 787
}

//// [/user/username/projects/myproject/pkg21/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg21 = void 0;
exports.pkg21 = 21;


//// [/user/username/projects/myproject/pkg21/index.d.ts]
export declare const pkg21 = 21;


//// [/user/username/projects/myproject/pkg21/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-17215629330-export const pkg21 = 21;","signature":"-6225117112-export declare const pkg21 = 21;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg21/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-17215629330-export const pkg21 = 21;",
        "signature": "-6225117112-export declare const pkg21 = 21;\n"
      },
      "version": "-17215629330-export const pkg21 = 21;",
      "signature": "-6225117112-export declare const pkg21 = 21;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 787
}

//// [/user/username/projects/myproject/pkg22/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg22 = void 0;
exports.pkg22 = 22;


//// [/user/username/projects/myproject/pkg22/index.d.ts]
export declare const pkg22 = 22;


//// [/user/username/projects/myproject/pkg22/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-15924161328-export const pkg22 = 22;","signature":"-6556346006-export declare const pkg22 = 22;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg22/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-15924161328-export const pkg22 = 22;",
        "signature": "-6556346006-export declare const pkg22 = 22;\n"
      },
      "version": "-15924161328-export const pkg22 = 22;",
      "signature": "-6556346006-export declare const pkg22 = 22;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 787
}


FsWatches::
/user/username/projects/myproject/pkg0/index.ts: *new*
  {}
/user/username/projects/myproject/pkg0/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg1/index.ts: *new*
  {}
/user/username/projects/myproject/pkg1/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg10/index.ts: *new*
  {}
/user/username/projects/myproject/pkg10/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg11/index.ts: *new*
  {}
/user/username/projects/myproject/pkg11/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg12/index.ts: *new*
  {}
/user/username/projects/myproject/pkg12/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg13/index.ts: *new*
  {}
/user/username/projects/myproject/pkg13/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg14/index.ts: *new*
  {}
/user/username/projects/myproject/pkg14/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg15/index.ts: *new*
  {}
/user/username/projects/myproject/pkg15/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg16/index.ts: *new*
  {}
/user/username/projects/myproject/pkg16/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg17/index.ts: *new*
  {}
/user/username/projects/myproject/pkg17/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg18/index.ts: *new*
  {}
/user/username/projects/myproject/pkg18/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg19/index.ts: *new*
  {}
/user/username/projects/myproject/pkg19/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg2/index.ts: *new*
  {}
/user/username/projects/myproject/pkg2/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg20/index.ts: *new*
  {}
/user/username/projects/myproject/pkg20/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg21/index.ts: *new*
  {}
/user/username/projects/myproject/pkg21/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg22/index.ts: *new*
  {}
/user/username/projects/myproject/pkg22/tsconfig.json: *new*
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
/user/username/projects/myproject/pkg8/index.ts: *new*
  {}
/user/username/projects/myproject/pkg8/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg9/index.ts: *new*
  {}
/user/username/projects/myproject/pkg9/tsconfig.json: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/pkg0: *new*
  {}
/user/username/projects/myproject/pkg1: *new*
  {}
/user/username/projects/myproject/pkg10: *new*
  {}
/user/username/projects/myproject/pkg11: *new*
  {}
/user/username/projects/myproject/pkg12: *new*
  {}
/user/username/projects/myproject/pkg13: *new*
  {}
/user/username/projects/myproject/pkg14: *new*
  {}
/user/username/projects/myproject/pkg15: *new*
  {}
/user/username/projects/myproject/pkg16: *new*
  {}
/user/username/projects/myproject/pkg17: *new*
  {}
/user/username/projects/myproject/pkg18: *new*
  {}
/user/username/projects/myproject/pkg19: *new*
  {}
/user/username/projects/myproject/pkg2: *new*
  {}
/user/username/projects/myproject/pkg20: *new*
  {}
/user/username/projects/myproject/pkg21: *new*
  {}
/user/username/projects/myproject/pkg22: *new*
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
/user/username/projects/myproject/pkg8: *new*
  {}
/user/username/projects/myproject/pkg9: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/pkg0/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg0/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg0/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg1/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg1/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg2/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg2/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg2/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg3/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg3/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg3/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg3/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg3/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg4/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg4/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg4/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg4/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg4/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg5/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg5/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg5/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg5/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg5/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg6/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg6/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg6/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg6/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg6/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg7/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg7/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg7/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg7/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg7/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg8/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg8/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg8/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg8/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg8/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg9/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg9/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg9/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg9/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg9/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg10/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg10/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg10/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg10/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg10/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg11/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg11/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg11/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg11/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg11/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg12/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg12/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg12/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg12/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg12/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg13/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg13/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg13/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg13/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg13/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg14/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg14/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg14/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg14/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg14/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg15/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg15/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg15/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg15/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg15/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg16/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg16/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg16/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg16/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg16/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg17/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg17/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg17/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg17/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg17/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg18/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg18/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg18/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg18/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg18/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg19/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg19/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg19/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg19/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg19/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg20/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg20/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg20/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg20/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg20/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg21/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg21/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg21/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg21/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg21/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg22/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg22/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg22/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg22/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg22/index.ts (computed .d.ts during emit)

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

[[90mHH:MM:SS AM[0m] Project 'pkg8/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg8/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg9/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg9/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg10/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg10/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg11/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg11/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg12/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg12/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg13/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg13/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg14/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg14/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg15/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg15/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg16/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg16/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg17/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg17/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg18/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg18/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg19/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg19/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg20/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg20/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg21/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg21/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg22/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg22/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/pkg0/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg0 = void 0;
exports.pkg0 = 0;
var someConst2 = 10;


//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-7839887915-export const pkg0 = 0;const someConst2 = 10;","signature":"-4821832606-export declare const pkg0 = 0;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-7839887915-export const pkg0 = 0;const someConst2 = 10;",
        "signature": "-4821832606-export declare const pkg0 = 0;\n"
      },
      "version": "-7839887915-export const pkg0 = 0;const someConst2 = 10;",
      "signature": "-4821832606-export declare const pkg0 = 0;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 804
}

//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg4/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg5/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg6/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg7/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg8/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg9/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg10/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg11/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg12/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg13/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg14/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg15/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg16/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg17/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg18/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg19/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg20/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg21/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg22/tsconfig.tsbuildinfo] file changed its modified time


Program root files: [
  "/user/username/projects/myproject/pkg0/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg0/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
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
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"1748855762-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;","signature":"-6216230055-export declare const pkg0 = 0;\nexport declare const someConst = 10;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "1748855762-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;",
        "signature": "-6216230055-export declare const pkg0 = 0;\nexport declare const someConst = 10;\n"
      },
      "version": "1748855762-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;",
      "signature": "-6216230055-export declare const pkg0 = 0;\nexport declare const someConst = 10;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 869
}


Timeout callback:: count: 1
3: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/projects/myproject/pkg0/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg0/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
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
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg2/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg2/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg3/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg3/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg3/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg4/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg4/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg4/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg5/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg5/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg5/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: build pkg6,pkg7,pkg8,pkg9,pkg10

Input::

Before running Timeout callback:: count: 1
4: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 1
Output::
[[90mHH:MM:SS AM[0m] Project 'pkg6/tsconfig.json' is out of date because output 'pkg6/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg7/tsconfig.json' is out of date because output 'pkg7/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg8/tsconfig.json' is out of date because output 'pkg8/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg8/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg8/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg9/tsconfig.json' is out of date because output 'pkg9/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg9/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg9/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg10/tsconfig.json' is out of date because output 'pkg10/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg10/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg10/tsconfig.json'...



//// [/user/username/projects/myproject/pkg6/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg7/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg8/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg9/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg10/tsconfig.tsbuildinfo] file changed its modified time

Timeout callback:: count: 1
5: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/projects/myproject/pkg6/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg6/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg6/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg7/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg7/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg7/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg8/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg8/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg8/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg9/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg9/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg9/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg10/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg10/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg10/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: build pkg11,pkg12,pkg13,pkg14,pkg15

Input::

Before running Timeout callback:: count: 1
5: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 1
Output::
[[90mHH:MM:SS AM[0m] Project 'pkg11/tsconfig.json' is out of date because output 'pkg11/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg11/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg11/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg12/tsconfig.json' is out of date because output 'pkg12/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg12/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg12/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg13/tsconfig.json' is out of date because output 'pkg13/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg13/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg13/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg14/tsconfig.json' is out of date because output 'pkg14/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg14/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg14/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg15/tsconfig.json' is out of date because output 'pkg15/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg15/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg15/tsconfig.json'...



//// [/user/username/projects/myproject/pkg11/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg12/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg13/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg14/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg15/tsconfig.tsbuildinfo] file changed its modified time

Timeout callback:: count: 1
6: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/projects/myproject/pkg11/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg11/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg11/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg12/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg12/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg12/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg13/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg13/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg13/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg14/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg14/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg14/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg15/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg15/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg15/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: build pkg16,pkg17,pkg18,pkg19,pkg20

Input::

Before running Timeout callback:: count: 1
6: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 1
Output::
[[90mHH:MM:SS AM[0m] Project 'pkg16/tsconfig.json' is out of date because output 'pkg16/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg16/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg16/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg17/tsconfig.json' is out of date because output 'pkg17/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg17/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg17/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg18/tsconfig.json' is out of date because output 'pkg18/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg18/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg18/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg19/tsconfig.json' is out of date because output 'pkg19/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg19/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg19/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg20/tsconfig.json' is out of date because output 'pkg20/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg20/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg20/tsconfig.json'...



//// [/user/username/projects/myproject/pkg16/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg17/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg18/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg19/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg20/tsconfig.tsbuildinfo] file changed its modified time

Timeout callback:: count: 1
7: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/projects/myproject/pkg16/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg16/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg16/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg17/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg17/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg17/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg18/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg18/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg18/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg19/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg19/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg19/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg20/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg20/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg20/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: build pkg21,pkg22,pkg23

Input::

Before running Timeout callback:: count: 1
7: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
[[90mHH:MM:SS AM[0m] Project 'pkg21/tsconfig.json' is out of date because output 'pkg21/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg21/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg21/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg22/tsconfig.json' is out of date because output 'pkg22/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg22/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg22/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/pkg21/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg22/tsconfig.tsbuildinfo] file changed its modified time


Program root files: [
  "/user/username/projects/myproject/pkg21/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg21/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg21/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg22/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg22/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg22/index.ts

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
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"10857255042-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;","signature":"-13679921373-export declare const pkg0 = 0;\nexport declare const someConst = 10;\nexport declare const someConst3 = 10;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "10857255042-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;",
        "signature": "-13679921373-export declare const pkg0 = 0;\nexport declare const someConst = 10;\nexport declare const someConst3 = 10;\n"
      },
      "version": "10857255042-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;",
      "signature": "-13679921373-export declare const pkg0 = 0;\nexport declare const someConst = 10;\nexport declare const someConst3 = 10;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 939
}


Timeout callback:: count: 1
9: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/projects/myproject/pkg0/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg0/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: build pkg1,pkg2,pkg3,pkg4,pkg5

Input::

Before running Timeout callback:: count: 1
9: timerToBuildInvalidatedProject

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
10: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/projects/myproject/pkg1/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg2/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg2/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg3/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg3/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg3/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg4/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg4/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg4/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg5/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg5/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg5/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: build pkg6,pkg7,pkg8,pkg9,pkg10

Input::

Before running Timeout callback:: count: 1
10: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 1
Output::
[[90mHH:MM:SS AM[0m] Project 'pkg6/tsconfig.json' is out of date because output 'pkg6/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg7/tsconfig.json' is out of date because output 'pkg7/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg8/tsconfig.json' is out of date because output 'pkg8/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg8/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg8/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg9/tsconfig.json' is out of date because output 'pkg9/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg9/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg9/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg10/tsconfig.json' is out of date because output 'pkg10/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg10/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg10/tsconfig.json'...



//// [/user/username/projects/myproject/pkg6/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg7/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg8/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg9/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg10/tsconfig.tsbuildinfo] file changed its modified time

Timeout callback:: count: 1
11: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/projects/myproject/pkg6/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg6/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg6/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg7/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg7/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg7/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg8/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg8/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg8/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg9/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg9/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg9/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg10/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg10/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg10/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: change while building

Input::
//// [/user/username/projects/myproject/pkg0/index.ts]
export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;const someConst4 = 10;


Timeout callback:: count: 1
11: timerToBuildInvalidatedProject *deleted*
12: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
12: timerToBuildInvalidatedProject

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

[[90mHH:MM:SS AM[0m] Project 'pkg6/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg7/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg8/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg8/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg9/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg9/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg10/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg10/tsconfig.json'...



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
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"27277091473-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;const someConst4 = 10;","signature":"-13679921373-export declare const pkg0 = 0;\nexport declare const someConst = 10;\nexport declare const someConst3 = 10;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "27277091473-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;const someConst4 = 10;",
        "signature": "-13679921373-export declare const pkg0 = 0;\nexport declare const someConst = 10;\nexport declare const someConst3 = 10;\n"
      },
      "version": "27277091473-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;const someConst4 = 10;",
      "signature": "-13679921373-export declare const pkg0 = 0;\nexport declare const someConst = 10;\nexport declare const someConst3 = 10;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 961
}

//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg4/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg5/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg6/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg7/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg8/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg9/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg10/tsconfig.tsbuildinfo] file changed its modified time

Timeout callback:: count: 1
13: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/projects/myproject/pkg0/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg0/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: build pkg11,pkg12,pkg13,pkg14,pkg15

Input::

Before running Timeout callback:: count: 1
13: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 1
Output::
[[90mHH:MM:SS AM[0m] Project 'pkg11/tsconfig.json' is out of date because output 'pkg11/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg11/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg11/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg12/tsconfig.json' is out of date because output 'pkg12/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg12/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg12/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg13/tsconfig.json' is out of date because output 'pkg13/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg13/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg13/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg14/tsconfig.json' is out of date because output 'pkg14/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg14/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg14/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg15/tsconfig.json' is out of date because output 'pkg15/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg15/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg15/tsconfig.json'...



//// [/user/username/projects/myproject/pkg11/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg12/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg13/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg14/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg15/tsconfig.tsbuildinfo] file changed its modified time

Timeout callback:: count: 1
14: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/projects/myproject/pkg11/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg11/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg11/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg12/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg12/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg12/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg13/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg13/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg13/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg14/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg14/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg14/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg15/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg15/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg15/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: change while building: dts changes

Input::
//// [/user/username/projects/myproject/pkg0/index.ts]
export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;const someConst4 = 10;export const someConst5 = 10;


Timeout callback:: count: 1
14: timerToBuildInvalidatedProject *deleted*
15: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
15: timerToBuildInvalidatedProject

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
exports.someConst5 = exports.someConst3 = exports.someConst = exports.pkg0 = void 0;
exports.pkg0 = 0;
var someConst2 = 10;
exports.someConst = 10;
exports.someConst3 = 10;
var someConst4 = 10;
exports.someConst5 = 10;


//// [/user/username/projects/myproject/pkg0/index.d.ts]
export declare const pkg0 = 0;
export declare const someConst = 10;
export declare const someConst3 = 10;
export declare const someConst5 = 10;


//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"14710086947-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;const someConst4 = 10;export const someConst5 = 10;","signature":"4956132399-export declare const pkg0 = 0;\nexport declare const someConst = 10;\nexport declare const someConst3 = 10;\nexport declare const someConst5 = 10;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "14710086947-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;const someConst4 = 10;export const someConst5 = 10;",
        "signature": "4956132399-export declare const pkg0 = 0;\nexport declare const someConst = 10;\nexport declare const someConst3 = 10;\nexport declare const someConst5 = 10;\n"
      },
      "version": "14710086947-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;const someConst4 = 10;export const someConst5 = 10;",
      "signature": "4956132399-export declare const pkg0 = 0;\nexport declare const someConst = 10;\nexport declare const someConst3 = 10;\nexport declare const someConst5 = 10;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1027
}


Timeout callback:: count: 1
16: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/projects/myproject/pkg0/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg0/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: build pkg1,pkg2,pkg3,pkg4,pkg5

Input::

Before running Timeout callback:: count: 1
16: timerToBuildInvalidatedProject

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
17: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/projects/myproject/pkg1/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg2/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg2/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg3/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg3/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg3/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg4/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg4/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg4/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg5/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg5/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg5/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: build pkg6,pkg7,pkg8,pkg9,pkg10

Input::

Before running Timeout callback:: count: 1
17: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 1
Output::
[[90mHH:MM:SS AM[0m] Project 'pkg6/tsconfig.json' is out of date because output 'pkg6/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg7/tsconfig.json' is out of date because output 'pkg7/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg8/tsconfig.json' is out of date because output 'pkg8/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg8/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg8/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg9/tsconfig.json' is out of date because output 'pkg9/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg9/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg9/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg10/tsconfig.json' is out of date because output 'pkg10/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg10/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg10/tsconfig.json'...



//// [/user/username/projects/myproject/pkg6/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg7/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg8/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg9/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg10/tsconfig.tsbuildinfo] file changed its modified time

Timeout callback:: count: 1
18: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/projects/myproject/pkg6/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg6/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg6/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg7/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg7/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg7/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg8/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg8/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg8/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg9/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg9/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg9/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg10/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg10/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg10/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: build pkg11,pkg12,pkg13,pkg14,pkg15

Input::

Before running Timeout callback:: count: 1
18: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 1
Output::
[[90mHH:MM:SS AM[0m] Project 'pkg11/tsconfig.json' is out of date because output 'pkg11/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg11/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg11/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg12/tsconfig.json' is out of date because output 'pkg12/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg12/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg12/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg13/tsconfig.json' is out of date because output 'pkg13/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg13/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg13/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg14/tsconfig.json' is out of date because output 'pkg14/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg14/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg14/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg15/tsconfig.json' is out of date because output 'pkg15/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg15/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg15/tsconfig.json'...



//// [/user/username/projects/myproject/pkg11/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg12/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg13/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg14/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg15/tsconfig.tsbuildinfo] file changed its modified time

Timeout callback:: count: 1
19: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/projects/myproject/pkg11/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg11/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg11/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg12/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg12/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg12/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg13/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg13/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg13/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg14/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg14/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg14/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg15/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg15/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg15/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: build pkg16,pkg17,pkg18,pkg19,pkg20

Input::

Before running Timeout callback:: count: 1
19: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 1
Output::
[[90mHH:MM:SS AM[0m] Project 'pkg16/tsconfig.json' is out of date because output 'pkg16/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg16/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg16/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg17/tsconfig.json' is out of date because output 'pkg17/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg17/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg17/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg18/tsconfig.json' is out of date because output 'pkg18/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg18/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg18/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg19/tsconfig.json' is out of date because output 'pkg19/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg19/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg19/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg20/tsconfig.json' is out of date because output 'pkg20/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg20/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg20/tsconfig.json'...



//// [/user/username/projects/myproject/pkg16/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg17/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg18/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg19/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg20/tsconfig.tsbuildinfo] file changed its modified time

Timeout callback:: count: 1
20: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/projects/myproject/pkg16/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg16/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg16/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg17/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg17/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg17/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg18/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg18/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg18/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg19/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg19/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg19/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg20/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg20/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg20/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: build pkg21,pkg22,pkg23

Input::

Before running Timeout callback:: count: 1
20: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
[[90mHH:MM:SS AM[0m] Project 'pkg21/tsconfig.json' is out of date because output 'pkg21/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg21/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg21/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg22/tsconfig.json' is out of date because output 'pkg22/index.js' is older than input 'pkg0/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/pkg22/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg22/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/pkg21/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg22/tsconfig.tsbuildinfo] file changed its modified time


Program root files: [
  "/user/username/projects/myproject/pkg21/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg21/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg21/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg22/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/pkg22/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/pkg22/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: No change

Input::


exitCode:: ExitStatus.undefined
