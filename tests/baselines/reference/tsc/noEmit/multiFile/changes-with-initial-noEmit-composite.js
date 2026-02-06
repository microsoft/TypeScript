currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/src/class.ts]
export class classC {
    prop = 1;
}

//// [/home/src/workspaces/project/src/indirectClass.ts]
import { classC } from './class';
export class indirectClass {
    classC = new classC();
}

//// [/home/src/workspaces/project/src/directUse.ts]
import { indirectClass } from './indirectClass';
new indirectClass().classC.prop;

//// [/home/src/workspaces/project/src/indirectUse.ts]
import { indirectClass } from './indirectClass';
new indirectClass().classC.prop;

//// [/home/src/workspaces/project/src/noChangeFile.ts]
export function writeLog(s: string) {
}

//// [/home/src/workspaces/project/src/noChangeFileWithEmitSpecificError.ts]
function someFunc(arguments: boolean, ...rest: any[]) {
}

//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  }
}

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


/home/src/tslibs/TS/Lib/tsc.js --p . --noEmit
Output::
[96msrc/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS1100: [0mInvalid use of 'arguments' in strict mode.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~[0m


Found 1 error in src/noChangeFileWithEmitSpecificError.ts[90m:1[0m



//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.es2025.full.d.ts","./src/class.ts","./src/indirectclass.ts","./src/directuse.ts","./src/indirectuse.ts","./src/nochangefile.ts","./src/nochangefilewithemitspecificerror.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"545032748-export class classC {\n    prop = 1;\n}","6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","6714567633-export function writeLog(s: string) {\n}",{"version":"-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}","affectsGlobalScope":true}],"root":[[2,7]],"options":{"composite":true},"referencedMap":[[4,1],[3,2],[5,1]],"semanticDiagnosticsPerFile":[[7,[{"start":18,"length":9,"messageText":"Invalid use of 'arguments' in strict mode.","category":1,"code":1100}]]],"affectedFilesPendingEmit":[2,4,3,5,6,7],"emitSignatures":[2,3,4,5,6,7],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.es2025.full.d.ts",
    "./src/class.ts",
    "./src/indirectclass.ts",
    "./src/directuse.ts",
    "./src/indirectuse.ts",
    "./src/nochangefile.ts",
    "./src/nochangefilewithemitspecificerror.ts"
  ],
  "fileIdsList": [
    [
      "./src/indirectclass.ts"
    ],
    [
      "./src/class.ts"
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
    "./src/class.ts": {
      "version": "545032748-export class classC {\n    prop = 1;\n}",
      "signature": "545032748-export class classC {\n    prop = 1;\n}"
    },
    "./src/indirectclass.ts": {
      "version": "6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
      "signature": "6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}"
    },
    "./src/directuse.ts": {
      "version": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
      "signature": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;"
    },
    "./src/indirectuse.ts": {
      "version": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
      "signature": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;"
    },
    "./src/nochangefile.ts": {
      "version": "6714567633-export function writeLog(s: string) {\n}",
      "signature": "6714567633-export function writeLog(s: string) {\n}"
    },
    "./src/nochangefilewithemitspecificerror.ts": {
      "original": {
        "version": "-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}",
        "affectsGlobalScope": true
      },
      "version": "-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}",
      "signature": "-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      [
        2,
        7
      ],
      [
        "./src/class.ts",
        "./src/indirectclass.ts",
        "./src/directuse.ts",
        "./src/indirectuse.ts",
        "./src/nochangefile.ts",
        "./src/nochangefilewithemitspecificerror.ts"
      ]
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./src/directuse.ts": [
      "./src/indirectclass.ts"
    ],
    "./src/indirectclass.ts": [
      "./src/class.ts"
    ],
    "./src/indirectuse.ts": [
      "./src/indirectclass.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./src/nochangefilewithemitspecificerror.ts",
      [
        {
          "start": 18,
          "length": 9,
          "messageText": "Invalid use of 'arguments' in strict mode.",
          "category": 1,
          "code": 1100
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "./src/class.ts",
      "Js | Dts"
    ],
    [
      "./src/directuse.ts",
      "Js | Dts"
    ],
    [
      "./src/indirectclass.ts",
      "Js | Dts"
    ],
    [
      "./src/indirectuse.ts",
      "Js | Dts"
    ],
    [
      "./src/nochangefile.ts",
      "Js | Dts"
    ],
    [
      "./src/nochangefilewithemitspecificerror.ts",
      "Js | Dts"
    ]
  ],
  "emitSignatures": [
    "./src/class.ts",
    "./src/indirectclass.ts",
    "./src/directuse.ts",
    "./src/indirectuse.ts",
    "./src/nochangefile.ts",
    "./src/nochangefilewithemitspecificerror.ts"
  ],
  "version": "FakeTSVersion",
  "size": 1533
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: No Change run with emit

Input::

/home/src/tslibs/TS/Lib/tsc.js --p .
Output::
[96msrc/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS1100: [0mInvalid use of 'arguments' in strict mode.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~[0m


Found 1 error in src/noChangeFileWithEmitSpecificError.ts[90m:1[0m



//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.es2025.full.d.ts","./src/class.ts","./src/indirectclass.ts","./src/directuse.ts","./src/indirectuse.ts","./src/nochangefile.ts","./src/nochangefilewithemitspecificerror.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"545032748-export class classC {\n    prop = 1;\n}","signature":"-9508063301-export declare class classC {\n    prop: number;\n}\n"},{"version":"6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","signature":"9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"},{"version":"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"-3531856636-export {};\n"},{"version":"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"-3531856636-export {};\n"},{"version":"6714567633-export function writeLog(s: string) {\n}","signature":"8055010000-export declare function writeLog(s: string): void;\n"},{"version":"-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}","signature":"-5615417221-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n","affectsGlobalScope":true}],"root":[[2,7]],"options":{"composite":true},"referencedMap":[[4,1],[3,2],[5,1]],"semanticDiagnosticsPerFile":[[7,[{"start":18,"length":9,"messageText":"Invalid use of 'arguments' in strict mode.","category":1,"code":1100}]]],"latestChangedDtsFile":"./src/noChangeFileWithEmitSpecificError.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.es2025.full.d.ts",
    "./src/class.ts",
    "./src/indirectclass.ts",
    "./src/directuse.ts",
    "./src/indirectuse.ts",
    "./src/nochangefile.ts",
    "./src/nochangefilewithemitspecificerror.ts"
  ],
  "fileIdsList": [
    [
      "./src/indirectclass.ts"
    ],
    [
      "./src/class.ts"
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
    "./src/class.ts": {
      "original": {
        "version": "545032748-export class classC {\n    prop = 1;\n}",
        "signature": "-9508063301-export declare class classC {\n    prop: number;\n}\n"
      },
      "version": "545032748-export class classC {\n    prop = 1;\n}",
      "signature": "-9508063301-export declare class classC {\n    prop: number;\n}\n"
    },
    "./src/indirectclass.ts": {
      "original": {
        "version": "6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
        "signature": "9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"
      },
      "version": "6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
      "signature": "9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"
    },
    "./src/directuse.ts": {
      "original": {
        "version": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
        "signature": "-3531856636-export {};\n"
      },
      "version": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
      "signature": "-3531856636-export {};\n"
    },
    "./src/indirectuse.ts": {
      "original": {
        "version": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
        "signature": "-3531856636-export {};\n"
      },
      "version": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
      "signature": "-3531856636-export {};\n"
    },
    "./src/nochangefile.ts": {
      "original": {
        "version": "6714567633-export function writeLog(s: string) {\n}",
        "signature": "8055010000-export declare function writeLog(s: string): void;\n"
      },
      "version": "6714567633-export function writeLog(s: string) {\n}",
      "signature": "8055010000-export declare function writeLog(s: string): void;\n"
    },
    "./src/nochangefilewithemitspecificerror.ts": {
      "original": {
        "version": "-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}",
        "signature": "-5615417221-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n",
        "affectsGlobalScope": true
      },
      "version": "-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}",
      "signature": "-5615417221-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      [
        2,
        7
      ],
      [
        "./src/class.ts",
        "./src/indirectclass.ts",
        "./src/directuse.ts",
        "./src/indirectuse.ts",
        "./src/nochangefile.ts",
        "./src/nochangefilewithemitspecificerror.ts"
      ]
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./src/directuse.ts": [
      "./src/indirectclass.ts"
    ],
    "./src/indirectclass.ts": [
      "./src/class.ts"
    ],
    "./src/indirectuse.ts": [
      "./src/indirectclass.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./src/nochangefilewithemitspecificerror.ts",
      [
        {
          "start": 18,
          "length": 9,
          "messageText": "Invalid use of 'arguments' in strict mode.",
          "category": 1,
          "code": 1100
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./src/noChangeFileWithEmitSpecificError.d.ts",
  "version": "FakeTSVersion",
  "size": 2047
}

//// [/home/src/workspaces/project/src/class.js]
export class classC {
    prop = 1;
}


//// [/home/src/workspaces/project/src/class.d.ts]
export declare class classC {
    prop: number;
}


//// [/home/src/workspaces/project/src/directUse.js]
import { indirectClass } from './indirectClass';
new indirectClass().classC.prop;


//// [/home/src/workspaces/project/src/directUse.d.ts]
export {};


//// [/home/src/workspaces/project/src/indirectClass.js]
import { classC } from './class';
export class indirectClass {
    classC = new classC();
}


//// [/home/src/workspaces/project/src/indirectClass.d.ts]
import { classC } from './class';
export declare class indirectClass {
    classC: classC;
}


//// [/home/src/workspaces/project/src/indirectUse.js]
import { indirectClass } from './indirectClass';
new indirectClass().classC.prop;


//// [/home/src/workspaces/project/src/indirectUse.d.ts]
export {};


//// [/home/src/workspaces/project/src/noChangeFile.js]
export function writeLog(s) {
}


//// [/home/src/workspaces/project/src/noChangeFile.d.ts]
export declare function writeLog(s: string): void;


//// [/home/src/workspaces/project/src/noChangeFileWithEmitSpecificError.js]
"use strict";
function someFunc(arguments, ...rest) {
}


//// [/home/src/workspaces/project/src/noChangeFileWithEmitSpecificError.d.ts]
declare function someFunc(arguments: boolean, ...rest: any[]): void;



exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Introduce error with emit

Input::
//// [/home/src/workspaces/project/src/class.ts]
export class classC {
    prop1 = 1;
}


/home/src/tslibs/TS/Lib/tsc.js --p .
Output::
[96msrc/directUse.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2551: [0mProperty 'prop' does not exist on type 'classC'. Did you mean 'prop1'?

[7m2[0m new indirectClass().classC.prop;
[7m [0m [91m                           ~~~~[0m

  [96msrc/class.ts[0m:[93m2[0m:[93m5[0m
    [7m2[0m     prop1 = 1;
    [7m [0m [96m    ~~~~~[0m
    'prop1' is declared here.

[96msrc/indirectUse.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2551: [0mProperty 'prop' does not exist on type 'classC'. Did you mean 'prop1'?

[7m2[0m new indirectClass().classC.prop;
[7m [0m [91m                           ~~~~[0m

  [96msrc/class.ts[0m:[93m2[0m:[93m5[0m
    [7m2[0m     prop1 = 1;
    [7m [0m [96m    ~~~~~[0m
    'prop1' is declared here.

[96msrc/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS1100: [0mInvalid use of 'arguments' in strict mode.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~[0m


Found 3 errors in 3 files.

Errors  Files
     1  src/directUse.ts[90m:2[0m
     1  src/indirectUse.ts[90m:2[0m
     1  src/noChangeFileWithEmitSpecificError.ts[90m:1[0m


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.es2025.full.d.ts","./src/class.ts","./src/indirectclass.ts","./src/directuse.ts","./src/indirectuse.ts","./src/nochangefile.ts","./src/nochangefilewithemitspecificerror.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"1786859709-export class classC {\n    prop1 = 1;\n}","signature":"-12157283604-export declare class classC {\n    prop1: number;\n}\n"},{"version":"6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","signature":"9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"},{"version":"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"-3531856636-export {};\n"},{"version":"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"-3531856636-export {};\n"},{"version":"6714567633-export function writeLog(s: string) {\n}","signature":"8055010000-export declare function writeLog(s: string): void;\n"},{"version":"-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}","signature":"-5615417221-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n","affectsGlobalScope":true}],"root":[[2,7]],"options":{"composite":true},"referencedMap":[[4,1],[3,2],[5,1]],"semanticDiagnosticsPerFile":[[4,[{"start":76,"length":4,"code":2551,"category":1,"messageText":"Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?","relatedInformation":[{"file":"./src/class.ts","start":26,"length":5,"messageText":"'prop1' is declared here.","category":3,"code":2728}]}]],[5,[{"start":76,"length":4,"code":2551,"category":1,"messageText":"Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?","relatedInformation":[{"file":"./src/class.ts","start":26,"length":5,"messageText":"'prop1' is declared here.","category":3,"code":2728}]}]],[7,[{"start":18,"length":9,"messageText":"Invalid use of 'arguments' in strict mode.","category":1,"code":1100}]]],"latestChangedDtsFile":"./src/class.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.es2025.full.d.ts",
    "./src/class.ts",
    "./src/indirectclass.ts",
    "./src/directuse.ts",
    "./src/indirectuse.ts",
    "./src/nochangefile.ts",
    "./src/nochangefilewithemitspecificerror.ts"
  ],
  "fileIdsList": [
    [
      "./src/indirectclass.ts"
    ],
    [
      "./src/class.ts"
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
    "./src/class.ts": {
      "original": {
        "version": "1786859709-export class classC {\n    prop1 = 1;\n}",
        "signature": "-12157283604-export declare class classC {\n    prop1: number;\n}\n"
      },
      "version": "1786859709-export class classC {\n    prop1 = 1;\n}",
      "signature": "-12157283604-export declare class classC {\n    prop1: number;\n}\n"
    },
    "./src/indirectclass.ts": {
      "original": {
        "version": "6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
        "signature": "9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"
      },
      "version": "6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
      "signature": "9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"
    },
    "./src/directuse.ts": {
      "original": {
        "version": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
        "signature": "-3531856636-export {};\n"
      },
      "version": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
      "signature": "-3531856636-export {};\n"
    },
    "./src/indirectuse.ts": {
      "original": {
        "version": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
        "signature": "-3531856636-export {};\n"
      },
      "version": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
      "signature": "-3531856636-export {};\n"
    },
    "./src/nochangefile.ts": {
      "original": {
        "version": "6714567633-export function writeLog(s: string) {\n}",
        "signature": "8055010000-export declare function writeLog(s: string): void;\n"
      },
      "version": "6714567633-export function writeLog(s: string) {\n}",
      "signature": "8055010000-export declare function writeLog(s: string): void;\n"
    },
    "./src/nochangefilewithemitspecificerror.ts": {
      "original": {
        "version": "-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}",
        "signature": "-5615417221-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n",
        "affectsGlobalScope": true
      },
      "version": "-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}",
      "signature": "-5615417221-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      [
        2,
        7
      ],
      [
        "./src/class.ts",
        "./src/indirectclass.ts",
        "./src/directuse.ts",
        "./src/indirectuse.ts",
        "./src/nochangefile.ts",
        "./src/nochangefilewithemitspecificerror.ts"
      ]
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./src/directuse.ts": [
      "./src/indirectclass.ts"
    ],
    "./src/indirectclass.ts": [
      "./src/class.ts"
    ],
    "./src/indirectuse.ts": [
      "./src/indirectclass.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./src/directuse.ts",
      [
        {
          "start": 76,
          "length": 4,
          "code": 2551,
          "category": 1,
          "messageText": "Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?",
          "relatedInformation": [
            {
              "file": "./src/class.ts",
              "start": 26,
              "length": 5,
              "messageText": "'prop1' is declared here.",
              "category": 3,
              "code": 2728
            }
          ]
        }
      ]
    ],
    [
      "./src/indirectuse.ts",
      [
        {
          "start": 76,
          "length": 4,
          "code": 2551,
          "category": 1,
          "messageText": "Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?",
          "relatedInformation": [
            {
              "file": "./src/class.ts",
              "start": 26,
              "length": 5,
              "messageText": "'prop1' is declared here.",
              "category": 3,
              "code": 2728
            }
          ]
        }
      ]
    ],
    [
      "./src/nochangefilewithemitspecificerror.ts",
      [
        {
          "start": 18,
          "length": 9,
          "messageText": "Invalid use of 'arguments' in strict mode.",
          "category": 1,
          "code": 1100
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./src/class.d.ts",
  "version": "FakeTSVersion",
  "size": 2583
}

//// [/home/src/workspaces/project/src/class.js]
export class classC {
    prop1 = 1;
}


//// [/home/src/workspaces/project/src/class.d.ts]
export declare class classC {
    prop1: number;
}


//// [/home/src/workspaces/project/src/indirectClass.js] file written with same contents

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Fix error and no emit

Input::
//// [/home/src/workspaces/project/src/class.ts]
export class classC {
    prop = 1;
}


/home/src/tslibs/TS/Lib/tsc.js --p . --noEmit
Output::
[96msrc/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS1100: [0mInvalid use of 'arguments' in strict mode.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~[0m


Found 1 error in src/noChangeFileWithEmitSpecificError.ts[90m:1[0m



//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.es2025.full.d.ts","./src/class.ts","./src/indirectclass.ts","./src/directuse.ts","./src/indirectuse.ts","./src/nochangefile.ts","./src/nochangefilewithemitspecificerror.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"545032748-export class classC {\n    prop = 1;\n}","signature":"-9508063301-export declare class classC {\n    prop: number;\n}\n"},{"version":"6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","signature":"9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"},"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",{"version":"6714567633-export function writeLog(s: string) {\n}","signature":"8055010000-export declare function writeLog(s: string): void;\n"},{"version":"-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}","signature":"-5615417221-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n","affectsGlobalScope":true}],"root":[[2,7]],"options":{"composite":true},"referencedMap":[[4,1],[3,2],[5,1]],"semanticDiagnosticsPerFile":[[7,[{"start":18,"length":9,"messageText":"Invalid use of 'arguments' in strict mode.","category":1,"code":1100}]]],"affectedFilesPendingEmit":[2,[4],3,[5]],"emitSignatures":[[2,"-12157283604-export declare class classC {\n    prop1: number;\n}\n"],[4,"-3531856636-export {};\n"],[5,"-3531856636-export {};\n"]],"latestChangedDtsFile":"./src/class.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.es2025.full.d.ts",
    "./src/class.ts",
    "./src/indirectclass.ts",
    "./src/directuse.ts",
    "./src/indirectuse.ts",
    "./src/nochangefile.ts",
    "./src/nochangefilewithemitspecificerror.ts"
  ],
  "fileIdsList": [
    [
      "./src/indirectclass.ts"
    ],
    [
      "./src/class.ts"
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
    "./src/class.ts": {
      "original": {
        "version": "545032748-export class classC {\n    prop = 1;\n}",
        "signature": "-9508063301-export declare class classC {\n    prop: number;\n}\n"
      },
      "version": "545032748-export class classC {\n    prop = 1;\n}",
      "signature": "-9508063301-export declare class classC {\n    prop: number;\n}\n"
    },
    "./src/indirectclass.ts": {
      "original": {
        "version": "6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
        "signature": "9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"
      },
      "version": "6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
      "signature": "9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"
    },
    "./src/directuse.ts": {
      "version": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
      "signature": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;"
    },
    "./src/indirectuse.ts": {
      "version": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
      "signature": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;"
    },
    "./src/nochangefile.ts": {
      "original": {
        "version": "6714567633-export function writeLog(s: string) {\n}",
        "signature": "8055010000-export declare function writeLog(s: string): void;\n"
      },
      "version": "6714567633-export function writeLog(s: string) {\n}",
      "signature": "8055010000-export declare function writeLog(s: string): void;\n"
    },
    "./src/nochangefilewithemitspecificerror.ts": {
      "original": {
        "version": "-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}",
        "signature": "-5615417221-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n",
        "affectsGlobalScope": true
      },
      "version": "-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}",
      "signature": "-5615417221-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      [
        2,
        7
      ],
      [
        "./src/class.ts",
        "./src/indirectclass.ts",
        "./src/directuse.ts",
        "./src/indirectuse.ts",
        "./src/nochangefile.ts",
        "./src/nochangefilewithemitspecificerror.ts"
      ]
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./src/directuse.ts": [
      "./src/indirectclass.ts"
    ],
    "./src/indirectclass.ts": [
      "./src/class.ts"
    ],
    "./src/indirectuse.ts": [
      "./src/indirectclass.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./src/nochangefilewithemitspecificerror.ts",
      [
        {
          "start": 18,
          "length": 9,
          "messageText": "Invalid use of 'arguments' in strict mode.",
          "category": 1,
          "code": 1100
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "./src/class.ts",
      "Js | Dts"
    ],
    [
      [
        "./src/directuse.ts"
      ],
      "Dts"
    ],
    [
      "./src/indirectclass.ts",
      "Js | Dts"
    ],
    [
      [
        "./src/indirectuse.ts"
      ],
      "Dts"
    ]
  ],
  "emitSignatures": [
    [
      "./src/class.ts",
      "-12157283604-export declare class classC {\n    prop1: number;\n}\n"
    ],
    [
      "./src/directuse.ts",
      "-3531856636-export {};\n"
    ],
    [
      "./src/indirectuse.ts",
      "-3531856636-export {};\n"
    ]
  ],
  "latestChangedDtsFile": "./src/class.d.ts",
  "version": "FakeTSVersion",
  "size": 2113
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: No Change run with emit

Input::

/home/src/tslibs/TS/Lib/tsc.js --p .
Output::
[96msrc/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS1100: [0mInvalid use of 'arguments' in strict mode.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~[0m


Found 1 error in src/noChangeFileWithEmitSpecificError.ts[90m:1[0m



//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.es2025.full.d.ts","./src/class.ts","./src/indirectclass.ts","./src/directuse.ts","./src/indirectuse.ts","./src/nochangefile.ts","./src/nochangefilewithemitspecificerror.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"545032748-export class classC {\n    prop = 1;\n}","signature":"-9508063301-export declare class classC {\n    prop: number;\n}\n"},{"version":"6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","signature":"9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"},{"version":"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"-3531856636-export {};\n"},{"version":"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"-3531856636-export {};\n"},{"version":"6714567633-export function writeLog(s: string) {\n}","signature":"8055010000-export declare function writeLog(s: string): void;\n"},{"version":"-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}","signature":"-5615417221-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n","affectsGlobalScope":true}],"root":[[2,7]],"options":{"composite":true},"referencedMap":[[4,1],[3,2],[5,1]],"semanticDiagnosticsPerFile":[[7,[{"start":18,"length":9,"messageText":"Invalid use of 'arguments' in strict mode.","category":1,"code":1100}]]],"latestChangedDtsFile":"./src/class.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.es2025.full.d.ts",
    "./src/class.ts",
    "./src/indirectclass.ts",
    "./src/directuse.ts",
    "./src/indirectuse.ts",
    "./src/nochangefile.ts",
    "./src/nochangefilewithemitspecificerror.ts"
  ],
  "fileIdsList": [
    [
      "./src/indirectclass.ts"
    ],
    [
      "./src/class.ts"
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
    "./src/class.ts": {
      "original": {
        "version": "545032748-export class classC {\n    prop = 1;\n}",
        "signature": "-9508063301-export declare class classC {\n    prop: number;\n}\n"
      },
      "version": "545032748-export class classC {\n    prop = 1;\n}",
      "signature": "-9508063301-export declare class classC {\n    prop: number;\n}\n"
    },
    "./src/indirectclass.ts": {
      "original": {
        "version": "6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
        "signature": "9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"
      },
      "version": "6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
      "signature": "9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"
    },
    "./src/directuse.ts": {
      "original": {
        "version": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
        "signature": "-3531856636-export {};\n"
      },
      "version": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
      "signature": "-3531856636-export {};\n"
    },
    "./src/indirectuse.ts": {
      "original": {
        "version": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
        "signature": "-3531856636-export {};\n"
      },
      "version": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
      "signature": "-3531856636-export {};\n"
    },
    "./src/nochangefile.ts": {
      "original": {
        "version": "6714567633-export function writeLog(s: string) {\n}",
        "signature": "8055010000-export declare function writeLog(s: string): void;\n"
      },
      "version": "6714567633-export function writeLog(s: string) {\n}",
      "signature": "8055010000-export declare function writeLog(s: string): void;\n"
    },
    "./src/nochangefilewithemitspecificerror.ts": {
      "original": {
        "version": "-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}",
        "signature": "-5615417221-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n",
        "affectsGlobalScope": true
      },
      "version": "-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}",
      "signature": "-5615417221-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      [
        2,
        7
      ],
      [
        "./src/class.ts",
        "./src/indirectclass.ts",
        "./src/directuse.ts",
        "./src/indirectuse.ts",
        "./src/nochangefile.ts",
        "./src/nochangefilewithemitspecificerror.ts"
      ]
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./src/directuse.ts": [
      "./src/indirectclass.ts"
    ],
    "./src/indirectclass.ts": [
      "./src/class.ts"
    ],
    "./src/indirectuse.ts": [
      "./src/indirectclass.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./src/nochangefilewithemitspecificerror.ts",
      [
        {
          "start": 18,
          "length": 9,
          "messageText": "Invalid use of 'arguments' in strict mode.",
          "category": 1,
          "code": 1100
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./src/class.d.ts",
  "version": "FakeTSVersion",
  "size": 2019
}

//// [/home/src/workspaces/project/src/class.js]
export class classC {
    prop = 1;
}


//// [/home/src/workspaces/project/src/class.d.ts]
export declare class classC {
    prop: number;
}


//// [/home/src/workspaces/project/src/indirectClass.js] file written with same contents

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
