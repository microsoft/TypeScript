currentDirectory:: /user/username/projects/noEmitOnError useCaseSensitiveFileNames: false
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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };

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


//// [/user/username/projects/noEmitOnError/tsconfig.json]
{
  "compilerOptions": {
    "outFile": "../dev-build.js",
    "module": "amd",
    "incremental": true,
    "noEmitOnError": true
  }
}



Output::
/a/lib/tsc 
exitCode:: ExitStatus.Success
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
/a/lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

No shapes updated in the builder::


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


//// [/user/username/projects/dev-build.tsbuildinfo]
{"fileNames":["../../../a/lib/lib.d.ts","./noemitonerror/shared/types/db.ts","./noemitonerror/src/main.ts","./noemitonerror/src/other.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-5014788164-export interface A {\n    name: string;\n}\n","5099365167-import { A } from \"../shared/types/db\";\nexport const a = class { private p = 10; };\n","9084524823-console.log(\"hi\");\nexport { }\n"],"root":[[2,4]],"options":{"module":2,"noEmitOnError":true,"outFile":"./dev-build.js"},"version":"FakeTSVersion"}

//// [/user/username/projects/dev-build.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../a/lib/lib.d.ts",
    "./noemitonerror/shared/types/db.ts",
    "./noemitonerror/src/main.ts",
    "./noemitonerror/src/other.ts"
  ],
  "fileInfos": {
    "../../../a/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
  "version": "FakeTSVersion",
  "size": 915
}



Change:: no-change-run
Input::


Output::
/a/lib/tsc 
exitCode:: ExitStatus.Success
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
/a/lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::




Change:: Fix error
Input::
//// [/user/username/projects/noEmitOnError/src/main.ts]
import { A } from "../shared/types/db";
export const a = class { p = 10; };




Output::
/a/lib/tsc 
exitCode:: ExitStatus.Success
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
/a/lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

No shapes updated in the builder::


//// [/user/username/projects/dev-build.js] file written with same contents
//// [/user/username/projects/dev-build.tsbuildinfo]
{"fileNames":["../../../a/lib/lib.d.ts","./noemitonerror/shared/types/db.ts","./noemitonerror/src/main.ts","./noemitonerror/src/other.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-5014788164-export interface A {\n    name: string;\n}\n","-614304812-import { A } from \"../shared/types/db\";\nexport const a = class { p = 10; };\n","9084524823-console.log(\"hi\");\nexport { }\n"],"root":[[2,4]],"options":{"module":2,"noEmitOnError":true,"outFile":"./dev-build.js"},"version":"FakeTSVersion"}

//// [/user/username/projects/dev-build.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../a/lib/lib.d.ts",
    "./noemitonerror/shared/types/db.ts",
    "./noemitonerror/src/main.ts",
    "./noemitonerror/src/other.ts"
  ],
  "fileInfos": {
    "../../../a/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
  "version": "FakeTSVersion",
  "size": 907
}



Change:: no-change-run
Input::


Output::
/a/lib/tsc 
exitCode:: ExitStatus.Success
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
/a/lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::


