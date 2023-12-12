currentDirectory:: / useCaseSensitiveFileNames: false
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

//// [/src/project/file1.ts]
export class  C { }

//// [/src/project/file2.ts]
export class D { }

//// [/src/project/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "outDir"
  }
}



Output::
/lib/tsc -p /src/project
exitCode:: ExitStatus.Success


//// [/src/project/outDir/file1.d.ts]
export declare class C {
}


//// [/src/project/outDir/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.C = C;


//// [/src/project/outDir/file2.d.ts]
export declare class D {
}


//// [/src/project/outDir/file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.D = void 0;
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
exports.D = D;


//// [/src/project/outDir/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../lib/lib.d.ts","../file1.ts","../file2.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-9819564552-export class  C { }","signature":"-8650565060-export declare class C {\n}\n"},{"version":"-7804761415-export class D { }","signature":"-8611429667-export declare class D {\n}\n"}],"root":[2,3],"options":{"composite":true,"outDir":"./"},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3],"latestChangedDtsFile":"./file2.d.ts"},"version":"FakeTSVersion"}

//// [/src/project/outDir/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "../file1.ts",
      "../file2.ts"
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../file1.ts": {
        "original": {
          "version": "-9819564552-export class  C { }",
          "signature": "-8650565060-export declare class C {\n}\n"
        },
        "version": "-9819564552-export class  C { }",
        "signature": "-8650565060-export declare class C {\n}\n"
      },
      "../file2.ts": {
        "original": {
          "version": "-7804761415-export class D { }",
          "signature": "-8611429667-export declare class D {\n}\n"
        },
        "version": "-7804761415-export class D { }",
        "signature": "-8611429667-export declare class D {\n}\n"
      }
    },
    "root": [
      [
        2,
        "../file1.ts"
      ],
      [
        3,
        "../file2.ts"
      ]
    ],
    "options": {
      "composite": true,
      "outDir": "./"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../file1.ts",
      "../file2.ts"
    ],
    "latestChangedDtsFile": "./file2.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 975
}



Change:: delete file with imports
Input::
//// [/src/project/file2.ts] unlink


Output::
/lib/tsc -p /src/project
exitCode:: ExitStatus.Success


//// [/src/project/outDir/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../lib/lib.d.ts","../file1.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-9819564552-export class  C { }","signature":"-8650565060-export declare class C {\n}\n"}],"root":[2],"options":{"composite":true,"outDir":"./"},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./file2.d.ts"},"version":"FakeTSVersion"}

//// [/src/project/outDir/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "../file1.ts"
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../file1.ts": {
        "original": {
          "version": "-9819564552-export class  C { }",
          "signature": "-8650565060-export declare class C {\n}\n"
        },
        "version": "-9819564552-export class  C { }",
        "signature": "-8650565060-export declare class C {\n}\n"
      }
    },
    "root": [
      [
        2,
        "../file1.ts"
      ]
    ],
    "options": {
      "composite": true,
      "outDir": "./"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../file1.ts"
    ],
    "latestChangedDtsFile": "./file2.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 856
}

