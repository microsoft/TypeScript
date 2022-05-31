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

//// [/src/packages/pkg1.tsconfig.json]
{"compilerOptions":{"composite":true,"typeRoots":["./typeroot1"]},"files":["./pkg1_index.ts"]}

//// [/src/packages/pkg1_index.ts]
export const theNum: TheNum = "type1";

//// [/src/packages/pkg2.tsconfig.json]
{"compilerOptions":{"composite":true,"typeRoots":["./typeroot2"]},"files":["./pkg2_index.ts"]}

//// [/src/packages/pkg2_index.ts]
export const theNum: TheNum2 = "type2";

//// [/src/packages/typeroot1/sometype/index.d.ts]
declare type TheNum = "type1";

//// [/src/packages/typeroot2/sometype/index.d.ts]
declare type TheNum2 = "type2";



Output::
/lib/tsc -b /src/packages/pkg1.tsconfig.json /src/packages/pkg2.tsconfig.json --verbose --traceResolution
[[90m12:00:17 AM[0m] Projects in this build: 
    * src/packages/pkg1.tsconfig.json
    * src/packages/pkg2.tsconfig.json

[[90m12:00:18 AM[0m] Project 'src/packages/pkg1.tsconfig.json' is out of date because output file 'src/packages/pkg1_index.js' does not exist

[[90m12:00:19 AM[0m] Building project '/src/packages/pkg1.tsconfig.json'...

======== Resolving type reference directive 'sometype', containing file '/src/packages/__inferred type names__.ts', root directory '/src/packages/typeroot1'. ========
Resolving with primary search path '/src/packages/typeroot1'.
File '/src/packages/typeroot1/sometype/package.json' does not exist.
File '/src/packages/typeroot1/sometype/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/packages/typeroot1/sometype/index.d.ts', result '/src/packages/typeroot1/sometype/index.d.ts'.
======== Type reference directive 'sometype' was successfully resolved to '/src/packages/typeroot1/sometype/index.d.ts', primary: true. ========
[[90m12:00:24 AM[0m] Project 'src/packages/pkg2.tsconfig.json' is out of date because output file 'src/packages/pkg2_index.js' does not exist

[[90m12:00:25 AM[0m] Building project '/src/packages/pkg2.tsconfig.json'...

======== Resolving type reference directive 'sometype', containing file '/src/packages/__inferred type names__.ts', root directory '/src/packages/typeroot2'. ========
Resolving with primary search path '/src/packages/typeroot2'.
File '/src/packages/typeroot2/sometype/package.json' does not exist.
File '/src/packages/typeroot2/sometype/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/packages/typeroot2/sometype/index.d.ts', result '/src/packages/typeroot2/sometype/index.d.ts'.
======== Type reference directive 'sometype' was successfully resolved to '/src/packages/typeroot2/sometype/index.d.ts', primary: true. ========
exitCode:: ExitStatus.Success


//// [/src/packages/pkg1.tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./pkg1_index.ts","./typeroot1/sometype/index.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-9601687719-export const theNum: TheNum = \"type1\";","signature":"-5685633868-/// <reference types=\"sometype\" />\r\nexport declare const theNum: TheNum;\r\n"},{"version":"-4557394441-declare type TheNum = \"type1\";","affectsGlobalScope":true}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3]},"version":"FakeTSVersion"}

//// [/src/packages/pkg1.tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./pkg1_index.ts",
      "./typeroot1/sometype/index.d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./pkg1_index.ts": {
        "version": "-9601687719-export const theNum: TheNum = \"type1\";",
        "signature": "-5685633868-/// <reference types=\"sometype\" />\r\nexport declare const theNum: TheNum;\r\n"
      },
      "./typeroot1/sometype/index.d.ts": {
        "version": "-4557394441-declare type TheNum = \"type1\";",
        "signature": "-4557394441-declare type TheNum = \"type1\";",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./pkg1_index.ts",
      "./typeroot1/sometype/index.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 987
}

//// [/src/packages/pkg1_index.d.ts]
/// <reference types="sometype" />
export declare const theNum: TheNum;


//// [/src/packages/pkg1_index.js]
"use strict";
exports.__esModule = true;
exports.theNum = void 0;
exports.theNum = "type1";


//// [/src/packages/pkg2.tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./pkg2_index.ts","./typeroot2/sometype/index.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-12823281204-export const theNum: TheNum2 = \"type2\";","signature":"-7237564442-/// <reference types=\"sometype\" />\r\nexport declare const theNum: TheNum2;\r\n"},{"version":"-980425686-declare type TheNum2 = \"type2\";","affectsGlobalScope":true}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3]},"version":"FakeTSVersion"}

//// [/src/packages/pkg2.tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./pkg2_index.ts",
      "./typeroot2/sometype/index.d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./pkg2_index.ts": {
        "version": "-12823281204-export const theNum: TheNum2 = \"type2\";",
        "signature": "-7237564442-/// <reference types=\"sometype\" />\r\nexport declare const theNum: TheNum2;\r\n"
      },
      "./typeroot2/sometype/index.d.ts": {
        "version": "-980425686-declare type TheNum2 = \"type2\";",
        "signature": "-980425686-declare type TheNum2 = \"type2\";",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./pkg2_index.ts",
      "./typeroot2/sometype/index.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 990
}

//// [/src/packages/pkg2_index.d.ts]
/// <reference types="sometype" />
export declare const theNum: TheNum2;


//// [/src/packages/pkg2_index.js]
"use strict";
exports.__esModule = true;
exports.theNum = void 0;
exports.theNum = "type2";


