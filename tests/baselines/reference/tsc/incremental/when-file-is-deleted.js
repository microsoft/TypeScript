currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "outDir"
  }
}

//// [/home/src/workspaces/project/file1.ts]
export class  C { }

//// [/home/src/workspaces/project/file2.ts]
export class D { }

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

//// [/home/src/workspaces/project/outDir/file1.js]
export class C {
}


//// [/home/src/workspaces/project/outDir/file1.d.ts]
export declare class C {
}


//// [/home/src/workspaces/project/outDir/file2.js]
export class D {
}


//// [/home/src/workspaces/project/outDir/file2.d.ts]
export declare class D {
}


//// [/home/src/workspaces/project/outDir/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.es2025.full.d.ts","../file1.ts","../file2.ts"],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-9819564552-export class  C { }","signature":"-8650565060-export declare class C {\n}\n"},{"version":"-7804761415-export class D { }","signature":"-8611429667-export declare class D {\n}\n"}],"root":[2,3],"options":{"composite":true,"outDir":"./"},"latestChangedDtsFile":"./file2.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/outDir/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es2025.full.d.ts",
    "../file1.ts",
    "../file2.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.es2025.full.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
  "latestChangedDtsFile": "./file2.d.ts",
  "version": "FakeTSVersion",
  "size": 865
}


exitCode:: ExitStatus.Success

Change:: delete file with imports

Input::
//// [/home/src/workspaces/project/file2.ts] deleted

/home/src/tslibs/TS/Lib/tsc.js 
Output::


//// [/home/src/workspaces/project/outDir/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.es2025.full.d.ts","../file1.ts"],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-9819564552-export class  C { }","signature":"-8650565060-export declare class C {\n}\n"}],"root":[2],"options":{"composite":true,"outDir":"./"},"latestChangedDtsFile":"./file2.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/outDir/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es2025.full.d.ts",
    "../file1.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.es2025.full.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
  "latestChangedDtsFile": "./file2.d.ts",
  "version": "FakeTSVersion",
  "size": 748
}


exitCode:: ExitStatus.Success
