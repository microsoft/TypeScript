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
export const a = class { private p = 10; };


//// [/user/username/projects/noEmitOnError/src/other.ts]
console.log("hi");
export { }


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


/home/src/tslibs/TS/Lib/tsc.js 
Output::
<<<<<<< HEAD


//// [/user/username/projects/dev-build.js]
define("shared/types/db", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("src/main", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    const a = class {
        constructor() {
            this.p = 10;
        }
    };
    exports.a = a;
});
define("src/other", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    console.log("hi");
});
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))


//// [/user/username/projects/dev-build.js]
define("shared/types/db", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("src/main", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = /** @class */ (function () {
        function class_1() {
            this.p = 10;
        }
        return class_1;
    }());
});
define("src/other", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    console.log("hi");
});
=======
[96mtsconfig.json[0m:[93m4[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "module": "amd",
[7m [0m [91m              ~~~~~[0m


Found 1 error in tsconfig.json[90m:4[0m

>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))


//// [/user/username/projects/dev-build.tsbuildinfo]
<<<<<<< HEAD
{"fileNames":["../../../home/src/tslibs/ts/lib/lib.d.ts","./noemitonerror/shared/types/db.ts","./noemitonerror/src/main.ts","./noemitonerror/src/other.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-5014788164-export interface A {\n    name: string;\n}\n","5099365167-import { A } from \"../shared/types/db\";\nexport const a = class { private p = 10; };\n","9084524823-console.log(\"hi\");\nexport { }\n"],"root":[[2,4]],"options":{"module":2,"noEmitOnError":true,"outFile":"./dev-build.js"},"version":"FakeTSVersion"}
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
{"fileNames":["../../../home/src/tslibs/ts/lib/lib.d.ts","./noemitonerror/shared/types/db.ts","./noemitonerror/src/main.ts","./noemitonerror/src/other.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-5014788164-export interface A {\n    name: string;\n}\n","5099365167-import { A } from \"../shared/types/db\";\nexport const a = class { private p = 10; };\n","9084524823-console.log(\"hi\");\nexport { }\n"],"root":[[2,4]],"options":{"module":2,"noEmitOnError":true,"outFile":"./dev-build.js"},"version":"FakeTSVersion"}
=======
{"fileNames":["../../../home/src/tslibs/ts/lib/lib.d.ts","./noemitonerror/shared/types/db.ts","./noemitonerror/src/main.ts","./noemitonerror/src/other.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-5014788164-export interface A {\n    name: string;\n}\n","5099365167-import { A } from \"../shared/types/db\";\nexport const a = class { private p = 10; };\n","9084524823-console.log(\"hi\");\nexport { }\n"],"root":[[2,4]],"options":{"module":2,"noEmitOnError":true,"outFile":"./dev-build.js"},"pendingEmit":false,"errors":true,"version":"FakeTSVersion"}
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))

//// [/user/username/projects/dev-build.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./noemitonerror/shared/types/db.ts",
    "./noemitonerror/src/main.ts",
    "./noemitonerror/src/other.ts"
  ],
  "fileInfos": {
    "../../../home/src/tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./noemitonerror/shared/types/db.ts": "-5014788164-export interface A {\n    name: string;\n}\n",
    "./noemitonerror/src/main.ts": "5099365167-import { A } from \"../shared/types/db\";\nexport const a = class { private p = 10; };\n",
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
<<<<<<< HEAD
  "size": 932
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
  "size": 892
=======
  "size": 926
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
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
[96mtsconfig.json[0m:[93m4[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "module": "amd",
[7m [0m [91m              ~~~~~[0m


Found 1 error in tsconfig.json[90m:4[0m




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
export const a = class { p = 10; };



/home/src/tslibs/TS/Lib/tsc.js 
Output::
[96mtsconfig.json[0m:[93m4[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "module": "amd",
[7m [0m [91m              ~~~~~[0m


Found 1 error in tsconfig.json[90m:4[0m



//// [/user/username/projects/dev-build.tsbuildinfo]
<<<<<<< HEAD
{"fileNames":["../../../home/src/tslibs/ts/lib/lib.d.ts","./noemitonerror/shared/types/db.ts","./noemitonerror/src/main.ts","./noemitonerror/src/other.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-5014788164-export interface A {\n    name: string;\n}\n","-614304812-import { A } from \"../shared/types/db\";\nexport const a = class { p = 10; };\n","9084524823-console.log(\"hi\");\nexport { }\n"],"root":[[2,4]],"options":{"module":2,"noEmitOnError":true,"outFile":"./dev-build.js"},"version":"FakeTSVersion"}
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
{"fileNames":["../../../home/src/tslibs/ts/lib/lib.d.ts","./noemitonerror/shared/types/db.ts","./noemitonerror/src/main.ts","./noemitonerror/src/other.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-5014788164-export interface A {\n    name: string;\n}\n","-614304812-import { A } from \"../shared/types/db\";\nexport const a = class { p = 10; };\n","9084524823-console.log(\"hi\");\nexport { }\n"],"root":[[2,4]],"options":{"module":2,"noEmitOnError":true,"outFile":"./dev-build.js"},"version":"FakeTSVersion"}
=======
{"fileNames":["../../../home/src/tslibs/ts/lib/lib.d.ts","./noemitonerror/shared/types/db.ts","./noemitonerror/src/main.ts","./noemitonerror/src/other.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-5014788164-export interface A {\n    name: string;\n}\n","-614304812-import { A } from \"../shared/types/db\";\nexport const a = class { p = 10; };\n","9084524823-console.log(\"hi\");\nexport { }\n"],"root":[[2,4]],"options":{"module":2,"noEmitOnError":true,"outFile":"./dev-build.js"},"pendingEmit":false,"errors":true,"version":"FakeTSVersion"}
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))

//// [/user/username/projects/dev-build.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./noemitonerror/shared/types/db.ts",
    "./noemitonerror/src/main.ts",
    "./noemitonerror/src/other.ts"
  ],
  "fileInfos": {
    "../../../home/src/tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./noemitonerror/shared/types/db.ts": "-5014788164-export interface A {\n    name: string;\n}\n",
    "./noemitonerror/src/main.ts": "-614304812-import { A } from \"../shared/types/db\";\nexport const a = class { p = 10; };\n",
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
<<<<<<< HEAD
  "size": 924
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
  "size": 884
=======
  "size": 918
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
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
[96mtsconfig.json[0m:[93m4[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "module": "amd",
[7m [0m [91m              ~~~~~[0m


Found 1 error in tsconfig.json[90m:4[0m




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
