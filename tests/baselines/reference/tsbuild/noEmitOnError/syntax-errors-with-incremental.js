Input::
//// [/lib/lib.d.ts]
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

//// [/src/shared/types/db.ts]
export interface A {
    name: string;
}

//// [/src/src/main.ts]
import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
;

//// [/src/src/other.ts]
console.log("hi");
export { }

//// [/src/tsconfig.json]
{
    "compilerOptions": {
        "outDir": "./dev-build",
        "noEmitOnError": true
    }
}




Output::
/lib/tsc --b /src/tsconfig.json --incremental
[96msrc/src/main.ts[0m:[93m4[0m:[93m1[0m - [91merror[0m[90m TS1005: [0m',' expected.

[7m4[0m ;
[7m [0m [91m~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: ["/src/shared/types/db.ts","/src/src/main.ts","/src/src/other.ts"]
Program options: {"outDir":"/src/dev-build","noEmitOnError":true,"incremental":true,"configFilePath":"/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/shared/types/db.ts
/src/src/main.ts
/src/src/other.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

getModifiedTime:: {
 "/src/shared/types/db.ts": 1,
 "/src/src/main.ts": 1,
 "/src/src/other.ts": 1,
 "/src/dev-build/tsconfig.tsbuildinfo": 1
}

setModifiedTime:: {}

fileExists:: {
 "/src/shared/types/db.ts": 1
}

directoryExists:: {
 "/src/shared/types": 2,
 "/src/node_modules/@types": 1,
 "/node_modules/@types": 1
}


//// [/src/dev-build/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../shared/types/db.ts","../src/main.ts","../src/other.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"-9621097780-export interface A {\r\n    name: string;\r\n}","signature":false},{"version":"2626879346-import { A } from \"../shared/types/db\";\r\nconst a = {\r\n    lastName: 'sdsd'\r\n;","signature":false},{"version":"11373096570-console.log(\"hi\");\r\nexport { }","signature":false}],"options":{"noEmitOnError":true,"outDir":"./"},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"changeFileSet":[1,2,3,4]},"version":"FakeTSVersion"}

//// [/src/dev-build/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../shared/types/db.ts",
      "../src/main.ts",
      "../src/other.ts"
    ],
    "fileNamesList": [
      [
        "../shared/types/db.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../shared/types/db.ts": {
        "version": "-9621097780-export interface A {\r\n    name: string;\r\n}"
      },
      "../src/main.ts": {
        "version": "2626879346-import { A } from \"../shared/types/db\";\r\nconst a = {\r\n    lastName: 'sdsd'\r\n;"
      },
      "../src/other.ts": {
        "version": "11373096570-console.log(\"hi\");\r\nexport { }"
      }
    },
    "options": {
      "noEmitOnError": true,
      "outDir": "./"
    },
    "referencedMap": {
      "../src/main.ts": [
        "../shared/types/db.ts"
      ]
    },
    "exportedModulesMap": {},
    "changeFileSet": [
      "../../lib/lib.d.ts",
      "../shared/types/db.ts",
      "../src/main.ts",
      "../src/other.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1084
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/tsconfig.json --incremental
[96msrc/src/main.ts[0m:[93m4[0m:[93m1[0m - [91merror[0m[90m TS1005: [0m',' expected.

[7m4[0m ;
[7m [0m [91m~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: ["/src/shared/types/db.ts","/src/src/main.ts","/src/src/other.ts"]
Program options: {"outDir":"/src/dev-build","noEmitOnError":true,"incremental":true,"configFilePath":"/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/shared/types/db.ts
/src/src/main.ts
/src/src/other.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

getModifiedTime:: {
 "/src/shared/types/db.ts": 1,
 "/src/src/main.ts": 1,
 "/src/src/other.ts": 1,
 "/src/dev-build/tsconfig.tsbuildinfo": 1
}

setModifiedTime:: {}

fileExists:: {
 "/src/shared/types/db.ts": 1
}

directoryExists:: {
 "/src/shared/types": 2,
 "/src/node_modules/@types": 1,
 "/node_modules/@types": 1
}




Change:: Fix error
Input::
//// [/src/src/main.ts]
import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
};



Output::
/lib/tsc --b /src/tsconfig.json --incremental
exitCode:: ExitStatus.Success
Program root files: ["/src/shared/types/db.ts","/src/src/main.ts","/src/src/other.ts"]
Program options: {"outDir":"/src/dev-build","noEmitOnError":true,"incremental":true,"configFilePath":"/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/shared/types/db.ts
/src/src/main.ts
/src/src/other.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/shared/types/db.ts
/src/src/main.ts
/src/src/other.ts

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/shared/types/db.ts (computed .d.ts)
/src/src/main.ts (computed .d.ts)
/src/src/other.ts (computed .d.ts)

getModifiedTime:: {
 "/src/shared/types/db.ts": 1,
 "/src/src/main.ts": 1,
 "/src/src/other.ts": 1,
 "/src/dev-build/tsconfig.tsbuildinfo": 1
}

setModifiedTime:: {}

fileExists:: {
 "/src/shared/types/db.ts": 1
}

directoryExists:: {
 "/src/shared/types": 2,
 "/src/node_modules/@types": 1,
 "/node_modules/@types": 1
}


//// [/src/dev-build/shared/types/db.js]
"use strict";
exports.__esModule = true;


//// [/src/dev-build/src/main.js]
"use strict";
exports.__esModule = true;
var a = {
    lastName: 'sdsd'
};


//// [/src/dev-build/src/other.js]
"use strict";
exports.__esModule = true;
console.log("hi");


//// [/src/dev-build/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../shared/types/db.ts","../src/main.ts","../src/other.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-9621097780-export interface A {\r\n    name: string;\r\n}","signature":"-6245214333-export interface A {\r\n    name: string;\r\n}\r\n"},{"version":"-2574605496-import { A } from \"../shared/types/db\";\nconst a = {\n    lastName: 'sdsd'\n};","signature":"-4882119183-export {};\r\n"},{"version":"11373096570-console.log(\"hi\");\r\nexport { }","signature":"-4882119183-export {};\r\n"}],"options":{"noEmitOnError":true,"outDir":"./"},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4]},"version":"FakeTSVersion"}

//// [/src/dev-build/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../shared/types/db.ts",
      "../src/main.ts",
      "../src/other.ts"
    ],
    "fileNamesList": [
      [
        "../shared/types/db.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../shared/types/db.ts": {
        "version": "-9621097780-export interface A {\r\n    name: string;\r\n}",
        "signature": "-6245214333-export interface A {\r\n    name: string;\r\n}\r\n"
      },
      "../src/main.ts": {
        "version": "-2574605496-import { A } from \"../shared/types/db\";\nconst a = {\n    lastName: 'sdsd'\n};",
        "signature": "-4882119183-export {};\r\n"
      },
      "../src/other.ts": {
        "version": "11373096570-console.log(\"hi\");\r\nexport { }",
        "signature": "-4882119183-export {};\r\n"
      }
    },
    "options": {
      "noEmitOnError": true,
      "outDir": "./"
    },
    "referencedMap": {
      "../src/main.ts": [
        "../shared/types/db.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../shared/types/db.ts",
      "../src/main.ts",
      "../src/other.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1180
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/tsconfig.json --incremental
exitCode:: ExitStatus.Success

getModifiedTime:: {
 "/src/shared/types/db.ts": 1,
 "/src/src/main.ts": 1,
 "/src/src/other.ts": 1,
 "/src/dev-build/tsconfig.tsbuildinfo": 1,
 "/src/tsconfig.json": 1
}

setModifiedTime:: {}

fileExists:: {}

directoryExists:: {}


