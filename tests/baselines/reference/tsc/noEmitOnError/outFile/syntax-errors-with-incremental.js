currentDirectory:: /user/username/projects/noEmitOnError useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/noEmitOnError/tsconfig.json]
{
  "compilerOptions": {
    "outFile": "../dev-build.js",
    "module": "amd",
    "incremental": true,
    "noEmitOnError": true
  }
}

//// [/user/username/projects/noEmitOnError/shared/types/db.ts]
export interface A {
    name: string;
}


//// [/user/username/projects/noEmitOnError/src/main.ts]
import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
;


//// [/user/username/projects/noEmitOnError/src/other.ts]
console.log("hi");
export { }


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
[96msrc/main.ts[0m:[93m4[0m:[93m1[0m - [91merror[0m[90m TS1005: [0m',' expected.

[7m4[0m ;
[7m [0m [91m~[0m

[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "outFile": "../dev-build.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m4[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "module": "amd",
[7m [0m [91m              ~~~~~[0m


Found 3 errors in 2 files.

Errors  Files
     1  src/main.ts[90m:4[0m
     2  tsconfig.json[90m:3[0m


//// [/user/username/projects/dev-build.tsbuildinfo]
{"fileNames":["../../../home/src/tslibs/ts/lib/lib.d.ts","./noemitonerror/shared/types/db.ts","./noemitonerror/src/main.ts","./noemitonerror/src/other.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-5014788164-export interface A {\n    name: string;\n}\n","-2574607723-import { A } from \"../shared/types/db\";\nconst a = {\n    lastName: 'sdsd'\n;\n","9084524823-console.log(\"hi\");\nexport { }\n"],"root":[[2,4]],"options":{"module":2,"noEmitOnError":true,"outFile":"./dev-build.js"},"pendingEmit":false,"errors":true,"version":"FakeTSVersion"}

//// [/user/username/projects/dev-build.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./noemitonerror/shared/types/db.ts",
    "./noemitonerror/src/main.ts",
    "./noemitonerror/src/other.ts"
  ],
  "fileInfos": {
    "../../../home/src/tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./noemitonerror/shared/types/db.ts": "-5014788164-export interface A {\n    name: string;\n}\n",
    "./noemitonerror/src/main.ts": "-2574607723-import { A } from \"../shared/types/db\";\nconst a = {\n    lastName: 'sdsd'\n;\n",
    "./noemitonerror/src/other.ts": "9084524823-console.log(\"hi\");\nexport { }\n"
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./noemitonerror/shared/types/db.ts",
        "./noemitonerror/src/main.ts",
        "./noemitonerror/src/other.ts"
      ]
    ]
  ],
  "options": {
    "module": 2,
    "noEmitOnError": true,
    "outFile": "./dev-build.js"
  },
  "pendingEmit": [
    "Js",
    false
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 920
}


Program root files: [
  "/user/username/projects/noEmitOnError/shared/types/db.ts",
  "/user/username/projects/noEmitOnError/src/main.ts",
  "/user/username/projects/noEmitOnError/src/other.ts"
]
Program options: {
  "outFile": "/user/username/projects/dev-build.js",
  "module": 2,
  "incremental": true,
  "noEmitOnError": true,
  "configFilePath": "/user/username/projects/noEmitOnError/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js 
Output::
[96msrc/main.ts[0m:[93m4[0m:[93m1[0m - [91merror[0m[90m TS1005: [0m',' expected.

[7m4[0m ;
[7m [0m [91m~[0m

[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "outFile": "../dev-build.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m4[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "module": "amd",
[7m [0m [91m              ~~~~~[0m


Found 3 errors in 2 files.

Errors  Files
     1  src/main.ts[90m:4[0m
     2  tsconfig.json[90m:3[0m



Program root files: [
  "/user/username/projects/noEmitOnError/shared/types/db.ts",
  "/user/username/projects/noEmitOnError/src/main.ts",
  "/user/username/projects/noEmitOnError/src/other.ts"
]
Program options: {
  "outFile": "/user/username/projects/dev-build.js",
  "module": 2,
  "incremental": true,
  "noEmitOnError": true,
  "configFilePath": "/user/username/projects/noEmitOnError/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: Fix error

Input::
//// [/user/username/projects/noEmitOnError/src/main.ts]
import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
};


/home/src/tslibs/TS/Lib/tsc.js 
Output::
[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "outFile": "../dev-build.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m4[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "module": "amd",
[7m [0m [91m              ~~~~~[0m


Found 2 errors in the same file, starting at: tsconfig.json[90m:3[0m



//// [/user/username/projects/dev-build.tsbuildinfo]
{"fileNames":["../../../home/src/tslibs/ts/lib/lib.d.ts","./noemitonerror/shared/types/db.ts","./noemitonerror/src/main.ts","./noemitonerror/src/other.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-5014788164-export interface A {\n    name: string;\n}\n","-2574605496-import { A } from \"../shared/types/db\";\nconst a = {\n    lastName: 'sdsd'\n};","9084524823-console.log(\"hi\");\nexport { }\n"],"root":[[2,4]],"options":{"module":2,"noEmitOnError":true,"outFile":"./dev-build.js"},"pendingEmit":false,"errors":true,"version":"FakeTSVersion"}

//// [/user/username/projects/dev-build.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./noemitonerror/shared/types/db.ts",
    "./noemitonerror/src/main.ts",
    "./noemitonerror/src/other.ts"
  ],
  "fileInfos": {
    "../../../home/src/tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./noemitonerror/shared/types/db.ts": "-5014788164-export interface A {\n    name: string;\n}\n",
    "./noemitonerror/src/main.ts": "-2574605496-import { A } from \"../shared/types/db\";\nconst a = {\n    lastName: 'sdsd'\n};",
    "./noemitonerror/src/other.ts": "9084524823-console.log(\"hi\");\nexport { }\n"
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./noemitonerror/shared/types/db.ts",
        "./noemitonerror/src/main.ts",
        "./noemitonerror/src/other.ts"
      ]
    ]
  ],
  "options": {
    "module": 2,
    "noEmitOnError": true,
    "outFile": "./dev-build.js"
  },
  "pendingEmit": [
    "Js",
    false
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 919
}


Program root files: [
  "/user/username/projects/noEmitOnError/shared/types/db.ts",
  "/user/username/projects/noEmitOnError/src/main.ts",
  "/user/username/projects/noEmitOnError/src/other.ts"
]
Program options: {
  "outFile": "/user/username/projects/dev-build.js",
  "module": 2,
  "incremental": true,
  "noEmitOnError": true,
  "configFilePath": "/user/username/projects/noEmitOnError/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js 
Output::
[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "outFile": "../dev-build.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m4[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "module": "amd",
[7m [0m [91m              ~~~~~[0m


Found 2 errors in the same file, starting at: tsconfig.json[90m:3[0m




Program root files: [
  "/user/username/projects/noEmitOnError/shared/types/db.ts",
  "/user/username/projects/noEmitOnError/src/main.ts",
  "/user/username/projects/noEmitOnError/src/other.ts"
]
Program options: {
  "outFile": "/user/username/projects/dev-build.js",
  "module": 2,
  "incremental": true,
  "noEmitOnError": true,
  "configFilePath": "/user/username/projects/noEmitOnError/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
