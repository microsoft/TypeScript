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

//// [/src/project/src/class.ts]
export class classC {
    prop = 1;
}

//// [/src/project/src/directUse.ts]
import { indirectClass } from './indirectClass';
new indirectClass().classC.prop;

//// [/src/project/src/indirectClass.ts]
import { classC } from './class';
export class indirectClass {
    classC = new classC();
}

//// [/src/project/src/indirectUse.ts]
import { indirectClass } from './indirectClass';
new indirectClass().classC.prop;

//// [/src/project/src/noChangeFile.ts]
export function writeLog(s: string) {
}

//// [/src/project/src/noChangeFileWithEmitSpecificError.ts]
function someFunc(arguments: boolean, ...rest: any[]) {
}

//// [/src/project/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  }
}



Output::
/lib/tsc --p src/project
[96msrc/project/src/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 1 error in src/project/src/noChangeFileWithEmitSpecificError.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/project/src/class.d.ts]
export declare class classC {
    prop: number;
}


//// [/src/project/src/class.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classC = void 0;
var classC = /** @class */ (function () {
    function classC() {
        this.prop = 1;
    }
    return classC;
}());
exports.classC = classC;


//// [/src/project/src/directUse.d.ts]
export {};


//// [/src/project/src/directUse.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var indirectClass_1 = require("./indirectClass");
new indirectClass_1.indirectClass().classC.prop;


//// [/src/project/src/indirectClass.d.ts]
import { classC } from './class';
export declare class indirectClass {
    classC: classC;
}


//// [/src/project/src/indirectClass.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indirectClass = void 0;
var class_1 = require("./class");
var indirectClass = /** @class */ (function () {
    function indirectClass() {
        this.classC = new class_1.classC();
    }
    return indirectClass;
}());
exports.indirectClass = indirectClass;


//// [/src/project/src/indirectUse.d.ts]
export {};


//// [/src/project/src/indirectUse.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var indirectClass_1 = require("./indirectClass");
new indirectClass_1.indirectClass().classC.prop;


//// [/src/project/src/noChangeFile.d.ts]
export declare function writeLog(s: string): void;


//// [/src/project/src/noChangeFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeLog = void 0;
function writeLog(s) {
}
exports.writeLog = writeLog;


//// [/src/project/src/noChangeFileWithEmitSpecificError.d.ts]
declare function someFunc(arguments: boolean, ...rest: any[]): void;


//// [/src/project/src/noChangeFileWithEmitSpecificError.js]
function someFunc(arguments) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
}


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/class.ts","./src/indirectclass.ts","./src/directuse.ts","./src/indirectuse.ts","./src/nochangefile.ts","./src/nochangefilewithemitspecificerror.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"545032748-export class classC {\n    prop = 1;\n}","signature":"-9508063301-export declare class classC {\n    prop: number;\n}\n"},{"version":"6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","signature":"9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"},{"version":"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"-3531856636-export {};\n"},{"version":"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"-3531856636-export {};\n"},{"version":"6714567633-export function writeLog(s: string) {\n}","signature":"8055010000-export declare function writeLog(s: string): void;\n"},{"version":"-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}","signature":"-5615417221-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n","affectsGlobalScope":true}],"root":[[2,7]],"options":{"composite":true},"fileIdsList":[[3],[2]],"referencedMap":[[4,1],[3,2],[5,1]],"exportedModulesMap":[[3,2]],"semanticDiagnosticsPerFile":[1,2,4,3,5,6,[7,[{"file":"./src/nochangefilewithemitspecificerror.ts","start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"latestChangedDtsFile":"./src/noChangeFileWithEmitSpecificError.d.ts"},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/class.ts",
      "./src/indirectclass.ts",
      "./src/directuse.ts",
      "./src/indirectuse.ts",
      "./src/nochangefile.ts",
      "./src/nochangefilewithemitspecificerror.ts"
    ],
    "fileNamesList": [
      [
        "./src/indirectclass.ts"
      ],
      [
        "./src/class.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "exportedModulesMap": {
      "./src/indirectclass.ts": [
        "./src/class.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./src/class.ts",
      "./src/directuse.ts",
      "./src/indirectclass.ts",
      "./src/indirectuse.ts",
      "./src/nochangefile.ts",
      [
        "./src/nochangefilewithemitspecificerror.ts",
        [
          {
            "file": "./src/nochangefilewithemitspecificerror.ts",
            "start": 18,
            "length": 18,
            "messageText": "Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.",
            "category": 1,
            "code": 2396,
            "skippedOn": "noEmit"
          }
        ]
      ]
    ],
    "latestChangedDtsFile": "./src/noChangeFileWithEmitSpecificError.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2240
}



Change:: No Change run with noEmit
Input::


Output::
/lib/tsc --p src/project --noEmit
exitCode:: ExitStatus.Success




Change:: No Change run with noEmit
Input::


Output::
/lib/tsc --p src/project --noEmit
exitCode:: ExitStatus.Success




Change:: Introduce error but still noEmit
Input::
//// [/src/project/src/class.ts]
export class classC {
    prop1 = 1;
}



Output::
/lib/tsc --p src/project --noEmit
[96msrc/project/src/directUse.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2551: [0mProperty 'prop' does not exist on type 'classC'. Did you mean 'prop1'?

[7m2[0m new indirectClass().classC.prop;
[7m [0m [91m                           ~~~~[0m

  [96msrc/project/src/class.ts[0m:[93m2[0m:[93m5[0m
    [7m2[0m     prop1 = 1;
    [7m [0m [96m    ~~~~~[0m
    'prop1' is declared here.

[96msrc/project/src/indirectUse.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2551: [0mProperty 'prop' does not exist on type 'classC'. Did you mean 'prop1'?

[7m2[0m new indirectClass().classC.prop;
[7m [0m [91m                           ~~~~[0m

  [96msrc/project/src/class.ts[0m:[93m2[0m:[93m5[0m
    [7m2[0m     prop1 = 1;
    [7m [0m [96m    ~~~~~[0m
    'prop1' is declared here.


Found 2 errors in 2 files.

Errors  Files
     1  src/project/src/directUse.ts[90m:2[0m
     1  src/project/src/indirectUse.ts[90m:2[0m
exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/class.ts","./src/indirectclass.ts","./src/directuse.ts","./src/indirectuse.ts","./src/nochangefile.ts","./src/nochangefilewithemitspecificerror.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"1786859709-export class classC {\n    prop1 = 1;\n}","signature":"-12157283604-export declare class classC {\n    prop1: number;\n}\n"},{"version":"6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","signature":"9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"},"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",{"version":"6714567633-export function writeLog(s: string) {\n}","signature":"8055010000-export declare function writeLog(s: string): void;\n"},{"version":"-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}","signature":"-5615417221-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n","affectsGlobalScope":true}],"root":[[2,7]],"options":{"composite":true},"fileIdsList":[[3],[2]],"referencedMap":[[4,1],[3,2],[5,1]],"exportedModulesMap":[[4,1],[3,2],[5,1]],"semanticDiagnosticsPerFile":[1,2,[4,[{"file":"./src/directuse.ts","start":76,"length":4,"code":2551,"category":1,"messageText":"Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?","relatedInformation":[{"file":"./src/class.ts","start":26,"length":5,"messageText":"'prop1' is declared here.","category":3,"code":2728}]}]],3,[5,[{"file":"./src/indirectuse.ts","start":76,"length":4,"code":2551,"category":1,"messageText":"Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?","relatedInformation":[{"file":"./src/class.ts","start":26,"length":5,"messageText":"'prop1' is declared here.","category":3,"code":2728}]}]],6,[7,[{"file":"./src/nochangefilewithemitspecificerror.ts","start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"affectedFilesPendingEmit":[2,[4],3,[5]],"emitSignatures":[[2,"-9508063301-export declare class classC {\n    prop: number;\n}\n"],[4,"-3531856636-export {};\n"],[5,"-3531856636-export {};\n"]],"latestChangedDtsFile":"./src/noChangeFileWithEmitSpecificError.d.ts"},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/class.ts",
      "./src/indirectclass.ts",
      "./src/directuse.ts",
      "./src/indirectuse.ts",
      "./src/nochangefile.ts",
      "./src/nochangefilewithemitspecificerror.ts"
    ],
    "fileNamesList": [
      [
        "./src/indirectclass.ts"
      ],
      [
        "./src/class.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "exportedModulesMap": {
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
      "../../lib/lib.d.ts",
      "./src/class.ts",
      [
        "./src/directuse.ts",
        [
          {
            "file": "./src/directuse.ts",
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
      "./src/indirectclass.ts",
      [
        "./src/indirectuse.ts",
        [
          {
            "file": "./src/indirectuse.ts",
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
      "./src/nochangefile.ts",
      [
        "./src/nochangefilewithemitspecificerror.ts",
        [
          {
            "file": "./src/nochangefilewithemitspecificerror.ts",
            "start": 18,
            "length": 18,
            "messageText": "Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.",
            "category": 1,
            "code": 2396,
            "skippedOn": "noEmit"
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
        "-9508063301-export declare class classC {\n    prop: number;\n}\n"
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
    "latestChangedDtsFile": "./src/noChangeFileWithEmitSpecificError.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2962
}



Change:: Fix error and emit
Input::
//// [/src/project/src/class.ts]
export class classC {
    prop = 1;
}



Output::
/lib/tsc --p src/project
[96msrc/project/src/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 1 error in src/project/src/noChangeFileWithEmitSpecificError.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/project/src/class.js] file written with same contents
//// [/src/project/src/indirectClass.js] file written with same contents
//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/class.ts","./src/indirectclass.ts","./src/directuse.ts","./src/indirectuse.ts","./src/nochangefile.ts","./src/nochangefilewithemitspecificerror.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"545032748-export class classC {\n    prop = 1;\n}","signature":"-9508063301-export declare class classC {\n    prop: number;\n}\n"},{"version":"6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","signature":"9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"},{"version":"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"-3531856636-export {};\n"},{"version":"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"-3531856636-export {};\n"},{"version":"6714567633-export function writeLog(s: string) {\n}","signature":"8055010000-export declare function writeLog(s: string): void;\n"},{"version":"-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}","signature":"-5615417221-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n","affectsGlobalScope":true}],"root":[[2,7]],"options":{"composite":true},"fileIdsList":[[3],[2]],"referencedMap":[[4,1],[3,2],[5,1]],"exportedModulesMap":[[3,2]],"semanticDiagnosticsPerFile":[1,2,4,3,5,6,[7,[{"file":"./src/nochangefilewithemitspecificerror.ts","start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"latestChangedDtsFile":"./src/noChangeFileWithEmitSpecificError.d.ts"},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/class.ts",
      "./src/indirectclass.ts",
      "./src/directuse.ts",
      "./src/indirectuse.ts",
      "./src/nochangefile.ts",
      "./src/nochangefilewithemitspecificerror.ts"
    ],
    "fileNamesList": [
      [
        "./src/indirectclass.ts"
      ],
      [
        "./src/class.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "exportedModulesMap": {
      "./src/indirectclass.ts": [
        "./src/class.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./src/class.ts",
      "./src/directuse.ts",
      "./src/indirectclass.ts",
      "./src/indirectuse.ts",
      "./src/nochangefile.ts",
      [
        "./src/nochangefilewithemitspecificerror.ts",
        [
          {
            "file": "./src/nochangefilewithemitspecificerror.ts",
            "start": 18,
            "length": 18,
            "messageText": "Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.",
            "category": 1,
            "code": 2396,
            "skippedOn": "noEmit"
          }
        ]
      ]
    ],
    "latestChangedDtsFile": "./src/noChangeFileWithEmitSpecificError.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2240
}



Change:: No Change run with emit
Input::


Output::
/lib/tsc --p src/project
[96msrc/project/src/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 1 error in src/project/src/noChangeFileWithEmitSpecificError.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated




Change:: No Change run with noEmit
Input::


Output::
/lib/tsc --p src/project --noEmit
exitCode:: ExitStatus.Success




Change:: No Change run with noEmit
Input::


Output::
/lib/tsc --p src/project --noEmit
exitCode:: ExitStatus.Success




Change:: No Change run with emit
Input::


Output::
/lib/tsc --p src/project
[96msrc/project/src/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 1 error in src/project/src/noChangeFileWithEmitSpecificError.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated




Change:: Introduce error and emit
Input::
//// [/src/project/src/class.ts]
export class classC {
    prop1 = 1;
}



Output::
/lib/tsc --p src/project
[96msrc/project/src/directUse.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2551: [0mProperty 'prop' does not exist on type 'classC'. Did you mean 'prop1'?

[7m2[0m new indirectClass().classC.prop;
[7m [0m [91m                           ~~~~[0m

  [96msrc/project/src/class.ts[0m:[93m2[0m:[93m5[0m
    [7m2[0m     prop1 = 1;
    [7m [0m [96m    ~~~~~[0m
    'prop1' is declared here.

[96msrc/project/src/indirectUse.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2551: [0mProperty 'prop' does not exist on type 'classC'. Did you mean 'prop1'?

[7m2[0m new indirectClass().classC.prop;
[7m [0m [91m                           ~~~~[0m

  [96msrc/project/src/class.ts[0m:[93m2[0m:[93m5[0m
    [7m2[0m     prop1 = 1;
    [7m [0m [96m    ~~~~~[0m
    'prop1' is declared here.

[96msrc/project/src/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 3 errors in 3 files.

Errors  Files
     1  src/project/src/directUse.ts[90m:2[0m
     1  src/project/src/indirectUse.ts[90m:2[0m
     1  src/project/src/noChangeFileWithEmitSpecificError.ts[90m:1[0m
exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/project/src/class.d.ts]
export declare class classC {
    prop1: number;
}


//// [/src/project/src/class.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classC = void 0;
var classC = /** @class */ (function () {
    function classC() {
        this.prop1 = 1;
    }
    return classC;
}());
exports.classC = classC;


//// [/src/project/src/indirectClass.js] file written with same contents
//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/class.ts","./src/indirectclass.ts","./src/directuse.ts","./src/indirectuse.ts","./src/nochangefile.ts","./src/nochangefilewithemitspecificerror.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"1786859709-export class classC {\n    prop1 = 1;\n}","signature":"-12157283604-export declare class classC {\n    prop1: number;\n}\n"},{"version":"6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","signature":"9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"},{"version":"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"-3531856636-export {};\n"},{"version":"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"-3531856636-export {};\n"},{"version":"6714567633-export function writeLog(s: string) {\n}","signature":"8055010000-export declare function writeLog(s: string): void;\n"},{"version":"-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}","signature":"-5615417221-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n","affectsGlobalScope":true}],"root":[[2,7]],"options":{"composite":true},"fileIdsList":[[3],[2]],"referencedMap":[[4,1],[3,2],[5,1]],"exportedModulesMap":[[3,2]],"semanticDiagnosticsPerFile":[1,2,[4,[{"file":"./src/directuse.ts","start":76,"length":4,"code":2551,"category":1,"messageText":"Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?","relatedInformation":[{"file":"./src/class.ts","start":26,"length":5,"messageText":"'prop1' is declared here.","category":3,"code":2728}]}]],3,[5,[{"file":"./src/indirectuse.ts","start":76,"length":4,"code":2551,"category":1,"messageText":"Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?","relatedInformation":[{"file":"./src/class.ts","start":26,"length":5,"messageText":"'prop1' is declared here.","category":3,"code":2728}]}]],6,[7,[{"file":"./src/nochangefilewithemitspecificerror.ts","start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"latestChangedDtsFile":"./src/class.d.ts"},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/class.ts",
      "./src/indirectclass.ts",
      "./src/directuse.ts",
      "./src/indirectuse.ts",
      "./src/nochangefile.ts",
      "./src/nochangefilewithemitspecificerror.ts"
    ],
    "fileNamesList": [
      [
        "./src/indirectclass.ts"
      ],
      [
        "./src/class.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "exportedModulesMap": {
      "./src/indirectclass.ts": [
        "./src/class.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./src/class.ts",
      [
        "./src/directuse.ts",
        [
          {
            "file": "./src/directuse.ts",
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
      "./src/indirectclass.ts",
      [
        "./src/indirectuse.ts",
        [
          {
            "file": "./src/indirectuse.ts",
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
      "./src/nochangefile.ts",
      [
        "./src/nochangefilewithemitspecificerror.ts",
        [
          {
            "file": "./src/nochangefilewithemitspecificerror.ts",
            "start": 18,
            "length": 18,
            "messageText": "Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.",
            "category": 1,
            "code": 2396,
            "skippedOn": "noEmit"
          }
        ]
      ]
    ],
    "latestChangedDtsFile": "./src/class.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2830
}



Change:: No Change run with emit
Input::


Output::
/lib/tsc --p src/project
[96msrc/project/src/directUse.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2551: [0mProperty 'prop' does not exist on type 'classC'. Did you mean 'prop1'?

[7m2[0m new indirectClass().classC.prop;
[7m [0m [91m                           ~~~~[0m

  [96msrc/project/src/class.ts[0m:[93m2[0m:[93m5[0m
    [7m2[0m     prop1 = 1;
    [7m [0m [96m    ~~~~~[0m
    'prop1' is declared here.

[96msrc/project/src/indirectUse.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2551: [0mProperty 'prop' does not exist on type 'classC'. Did you mean 'prop1'?

[7m2[0m new indirectClass().classC.prop;
[7m [0m [91m                           ~~~~[0m

  [96msrc/project/src/class.ts[0m:[93m2[0m:[93m5[0m
    [7m2[0m     prop1 = 1;
    [7m [0m [96m    ~~~~~[0m
    'prop1' is declared here.

[96msrc/project/src/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 3 errors in 3 files.

Errors  Files
     1  src/project/src/directUse.ts[90m:2[0m
     1  src/project/src/indirectUse.ts[90m:2[0m
     1  src/project/src/noChangeFileWithEmitSpecificError.ts[90m:1[0m
exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated




Change:: No Change run with noEmit
Input::


Output::
/lib/tsc --p src/project --noEmit
[96msrc/project/src/directUse.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2551: [0mProperty 'prop' does not exist on type 'classC'. Did you mean 'prop1'?

[7m2[0m new indirectClass().classC.prop;
[7m [0m [91m                           ~~~~[0m

  [96msrc/project/src/class.ts[0m:[93m2[0m:[93m5[0m
    [7m2[0m     prop1 = 1;
    [7m [0m [96m    ~~~~~[0m
    'prop1' is declared here.

[96msrc/project/src/indirectUse.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2551: [0mProperty 'prop' does not exist on type 'classC'. Did you mean 'prop1'?

[7m2[0m new indirectClass().classC.prop;
[7m [0m [91m                           ~~~~[0m

  [96msrc/project/src/class.ts[0m:[93m2[0m:[93m5[0m
    [7m2[0m     prop1 = 1;
    [7m [0m [96m    ~~~~~[0m
    'prop1' is declared here.


Found 2 errors in 2 files.

Errors  Files
     1  src/project/src/directUse.ts[90m:2[0m
     1  src/project/src/indirectUse.ts[90m:2[0m
exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped




Change:: No Change run with noEmit
Input::


Output::
/lib/tsc --p src/project --noEmit
[96msrc/project/src/directUse.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2551: [0mProperty 'prop' does not exist on type 'classC'. Did you mean 'prop1'?

[7m2[0m new indirectClass().classC.prop;
[7m [0m [91m                           ~~~~[0m

  [96msrc/project/src/class.ts[0m:[93m2[0m:[93m5[0m
    [7m2[0m     prop1 = 1;
    [7m [0m [96m    ~~~~~[0m
    'prop1' is declared here.

[96msrc/project/src/indirectUse.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2551: [0mProperty 'prop' does not exist on type 'classC'. Did you mean 'prop1'?

[7m2[0m new indirectClass().classC.prop;
[7m [0m [91m                           ~~~~[0m

  [96msrc/project/src/class.ts[0m:[93m2[0m:[93m5[0m
    [7m2[0m     prop1 = 1;
    [7m [0m [96m    ~~~~~[0m
    'prop1' is declared here.


Found 2 errors in 2 files.

Errors  Files
     1  src/project/src/directUse.ts[90m:2[0m
     1  src/project/src/indirectUse.ts[90m:2[0m
exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped




Change:: No Change run with emit
Input::


Output::
/lib/tsc --p src/project
[96msrc/project/src/directUse.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2551: [0mProperty 'prop' does not exist on type 'classC'. Did you mean 'prop1'?

[7m2[0m new indirectClass().classC.prop;
[7m [0m [91m                           ~~~~[0m

  [96msrc/project/src/class.ts[0m:[93m2[0m:[93m5[0m
    [7m2[0m     prop1 = 1;
    [7m [0m [96m    ~~~~~[0m
    'prop1' is declared here.

[96msrc/project/src/indirectUse.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2551: [0mProperty 'prop' does not exist on type 'classC'. Did you mean 'prop1'?

[7m2[0m new indirectClass().classC.prop;
[7m [0m [91m                           ~~~~[0m

  [96msrc/project/src/class.ts[0m:[93m2[0m:[93m5[0m
    [7m2[0m     prop1 = 1;
    [7m [0m [96m    ~~~~~[0m
    'prop1' is declared here.

[96msrc/project/src/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 3 errors in 3 files.

Errors  Files
     1  src/project/src/directUse.ts[90m:2[0m
     1  src/project/src/indirectUse.ts[90m:2[0m
     1  src/project/src/noChangeFileWithEmitSpecificError.ts[90m:1[0m
exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated




Change:: Fix error and no emit
Input::
//// [/src/project/src/class.ts]
export class classC {
    prop = 1;
}



Output::
/lib/tsc --p src/project --noEmit
exitCode:: ExitStatus.Success


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/class.ts","./src/indirectclass.ts","./src/directuse.ts","./src/indirectuse.ts","./src/nochangefile.ts","./src/nochangefilewithemitspecificerror.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"545032748-export class classC {\n    prop = 1;\n}","signature":"-9508063301-export declare class classC {\n    prop: number;\n}\n"},{"version":"6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","signature":"9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"},"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",{"version":"6714567633-export function writeLog(s: string) {\n}","signature":"8055010000-export declare function writeLog(s: string): void;\n"},{"version":"-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}","signature":"-5615417221-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n","affectsGlobalScope":true}],"root":[[2,7]],"options":{"composite":true},"fileIdsList":[[3],[2]],"referencedMap":[[4,1],[3,2],[5,1]],"exportedModulesMap":[[4,1],[3,2],[5,1]],"semanticDiagnosticsPerFile":[1,2,4,3,5,6,[7,[{"file":"./src/nochangefilewithemitspecificerror.ts","start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"affectedFilesPendingEmit":[2,[4],3,[5]],"emitSignatures":[[2,"-12157283604-export declare class classC {\n    prop1: number;\n}\n"],[4,"-3531856636-export {};\n"],[5,"-3531856636-export {};\n"]],"latestChangedDtsFile":"./src/class.d.ts"},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/class.ts",
      "./src/indirectclass.ts",
      "./src/directuse.ts",
      "./src/indirectuse.ts",
      "./src/nochangefile.ts",
      "./src/nochangefilewithemitspecificerror.ts"
    ],
    "fileNamesList": [
      [
        "./src/indirectclass.ts"
      ],
      [
        "./src/class.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "exportedModulesMap": {
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
      "../../lib/lib.d.ts",
      "./src/class.ts",
      "./src/directuse.ts",
      "./src/indirectclass.ts",
      "./src/indirectuse.ts",
      "./src/nochangefile.ts",
      [
        "./src/nochangefilewithemitspecificerror.ts",
        [
          {
            "file": "./src/nochangefilewithemitspecificerror.ts",
            "start": 18,
            "length": 18,
            "messageText": "Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.",
            "category": 1,
            "code": 2396,
            "skippedOn": "noEmit"
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
    "latestChangedDtsFile": "./src/class.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2318
}



Change:: No Change run with emit
Input::


Output::
/lib/tsc --p src/project
[96msrc/project/src/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 1 error in src/project/src/noChangeFileWithEmitSpecificError.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/project/src/class.d.ts]
export declare class classC {
    prop: number;
}


//// [/src/project/src/class.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classC = void 0;
var classC = /** @class */ (function () {
    function classC() {
        this.prop = 1;
    }
    return classC;
}());
exports.classC = classC;


//// [/src/project/src/indirectClass.js] file written with same contents
//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/class.ts","./src/indirectclass.ts","./src/directuse.ts","./src/indirectuse.ts","./src/nochangefile.ts","./src/nochangefilewithemitspecificerror.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"545032748-export class classC {\n    prop = 1;\n}","signature":"-9508063301-export declare class classC {\n    prop: number;\n}\n"},{"version":"6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","signature":"9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"},{"version":"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"-3531856636-export {};\n"},{"version":"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"-3531856636-export {};\n"},{"version":"6714567633-export function writeLog(s: string) {\n}","signature":"8055010000-export declare function writeLog(s: string): void;\n"},{"version":"-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}","signature":"-5615417221-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n","affectsGlobalScope":true}],"root":[[2,7]],"options":{"composite":true},"fileIdsList":[[3],[2]],"referencedMap":[[4,1],[3,2],[5,1]],"exportedModulesMap":[[3,2]],"semanticDiagnosticsPerFile":[1,2,4,3,5,6,[7,[{"file":"./src/nochangefilewithemitspecificerror.ts","start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"latestChangedDtsFile":"./src/class.d.ts"},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/class.ts",
      "./src/indirectclass.ts",
      "./src/directuse.ts",
      "./src/indirectuse.ts",
      "./src/nochangefile.ts",
      "./src/nochangefilewithemitspecificerror.ts"
    ],
    "fileNamesList": [
      [
        "./src/indirectclass.ts"
      ],
      [
        "./src/class.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "exportedModulesMap": {
      "./src/indirectclass.ts": [
        "./src/class.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./src/class.ts",
      "./src/directuse.ts",
      "./src/indirectclass.ts",
      "./src/indirectuse.ts",
      "./src/nochangefile.ts",
      [
        "./src/nochangefilewithemitspecificerror.ts",
        [
          {
            "file": "./src/nochangefilewithemitspecificerror.ts",
            "start": 18,
            "length": 18,
            "messageText": "Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.",
            "category": 1,
            "code": 2396,
            "skippedOn": "noEmit"
          }
        ]
      ]
    ],
    "latestChangedDtsFile": "./src/class.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2212
}



Change:: No Change run with noEmit
Input::


Output::
/lib/tsc --p src/project --noEmit
exitCode:: ExitStatus.Success




Change:: No Change run with noEmit
Input::


Output::
/lib/tsc --p src/project --noEmit
exitCode:: ExitStatus.Success




Change:: No Change run with emit
Input::


Output::
/lib/tsc --p src/project
[96msrc/project/src/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 1 error in src/project/src/noChangeFileWithEmitSpecificError.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


