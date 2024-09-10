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
    "incremental": true,
    "declaration": true
  }
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


/home/src/tslibs/TS/Lib/tsc.js --p .
Output::
[96msrc/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 1 error in src/noChangeFileWithEmitSpecificError.ts[90m:1[0m



//// [/home/src/workspaces/project/src/class.js]
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


//// [/home/src/workspaces/project/src/class.d.ts]
export declare class classC {
    prop: number;
}


//// [/home/src/workspaces/project/src/indirectClass.js]
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


//// [/home/src/workspaces/project/src/indirectClass.d.ts]
import { classC } from './class';
export declare class indirectClass {
    classC: classC;
}


//// [/home/src/workspaces/project/src/directUse.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var indirectClass_1 = require("./indirectClass");
new indirectClass_1.indirectClass().classC.prop;


//// [/home/src/workspaces/project/src/directUse.d.ts]
export {};


//// [/home/src/workspaces/project/src/indirectUse.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var indirectClass_1 = require("./indirectClass");
new indirectClass_1.indirectClass().classC.prop;


//// [/home/src/workspaces/project/src/indirectUse.d.ts]
export {};


//// [/home/src/workspaces/project/src/noChangeFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeLog = writeLog;
function writeLog(s) {
}


//// [/home/src/workspaces/project/src/noChangeFile.d.ts]
export declare function writeLog(s: string): void;


//// [/home/src/workspaces/project/src/noChangeFileWithEmitSpecificError.js]
function someFunc(arguments) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
}


//// [/home/src/workspaces/project/src/noChangeFileWithEmitSpecificError.d.ts]
declare function someFunc(arguments: boolean, ...rest: any[]): void;


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/class.ts","./src/indirectclass.ts","./src/directuse.ts","./src/indirectuse.ts","./src/nochangefile.ts","./src/nochangefilewithemitspecificerror.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"545032748-export class classC {\n    prop = 1;\n}","signature":"-9508063301-export declare class classC {\n    prop: number;\n}\n"},{"version":"6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","signature":"9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"},{"version":"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"-3531856636-export {};\n"},{"version":"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"-3531856636-export {};\n"},{"version":"6714567633-export function writeLog(s: string) {\n}","signature":"8055010000-export declare function writeLog(s: string): void;\n"},{"version":"-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}","signature":"-5615417221-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n","affectsGlobalScope":true}],"root":[[2,7]],"options":{"declaration":true},"referencedMap":[[4,1],[3,2],[5,1]],"semanticDiagnosticsPerFile":[[7,[{"start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
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
    "../../tslibs/ts/lib/lib.d.ts": {
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
    "declaration": true
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
          "length": 18,
          "messageText": "Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.",
          "category": 1,
          "code": 2396,
          "skippedOn": "noEmit"
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 2077
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: No Change run with noEmit

Input::

/home/src/tslibs/TS/Lib/tsc.js --p . --noEmit
Output::



exitCode:: ExitStatus.Success

Change:: No Change run with noEmit

Input::

/home/src/tslibs/TS/Lib/tsc.js --p . --noEmit
Output::



exitCode:: ExitStatus.Success

Change:: Introduce error but still noEmit

Input::
//// [/home/src/workspaces/project/src/class.ts]
export class classC {
    prop1 = 1;
}


/home/src/tslibs/TS/Lib/tsc.js --p . --noEmit
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


Found 2 errors in 2 files.

Errors  Files
     1  src/directUse.ts[90m:2[0m
     1  src/indirectUse.ts[90m:2[0m


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/class.ts","./src/indirectclass.ts","./src/directuse.ts","./src/indirectuse.ts","./src/nochangefile.ts","./src/nochangefilewithemitspecificerror.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"1786859709-export class classC {\n    prop1 = 1;\n}","signature":"-12157283604-export declare class classC {\n    prop1: number;\n}\n"},{"version":"6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","signature":"9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"},"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",{"version":"6714567633-export function writeLog(s: string) {\n}","signature":"8055010000-export declare function writeLog(s: string): void;\n"},{"version":"-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}","signature":"-5615417221-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n","affectsGlobalScope":true}],"root":[[2,7]],"options":{"declaration":true},"referencedMap":[[4,1],[3,2],[5,1]],"semanticDiagnosticsPerFile":[[4,[{"start":76,"length":4,"code":2551,"category":1,"messageText":"Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?","relatedInformation":[{"file":"./src/class.ts","start":26,"length":5,"messageText":"'prop1' is declared here.","category":3,"code":2728}]}]],[5,[{"start":76,"length":4,"code":2551,"category":1,"messageText":"Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?","relatedInformation":[{"file":"./src/class.ts","start":26,"length":5,"messageText":"'prop1' is declared here.","category":3,"code":2728}]}]],[7,[{"start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"affectedFilesPendingEmit":[2,[4],3,[5]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
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
    "../../tslibs/ts/lib/lib.d.ts": {
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
    "declaration": true
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
  "version": "FakeTSVersion",
  "size": 2580
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Fix error and emit

Input::
//// [/home/src/workspaces/project/src/class.ts]
export class classC {
    prop = 1;
}


/home/src/tslibs/TS/Lib/tsc.js --p .
Output::
[96msrc/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 1 error in src/noChangeFileWithEmitSpecificError.ts[90m:1[0m



//// [/home/src/workspaces/project/src/class.js] file written with same contents
//// [/home/src/workspaces/project/src/class.d.ts] file written with same contents
//// [/home/src/workspaces/project/src/indirectClass.js] file written with same contents
//// [/home/src/workspaces/project/src/indirectClass.d.ts] file written with same contents
//// [/home/src/workspaces/project/src/directUse.d.ts] file written with same contents
//// [/home/src/workspaces/project/src/indirectUse.d.ts] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/class.ts","./src/indirectclass.ts","./src/directuse.ts","./src/indirectuse.ts","./src/nochangefile.ts","./src/nochangefilewithemitspecificerror.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"545032748-export class classC {\n    prop = 1;\n}","signature":"-9508063301-export declare class classC {\n    prop: number;\n}\n"},{"version":"6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","signature":"9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"},{"version":"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"-3531856636-export {};\n"},{"version":"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"-3531856636-export {};\n"},{"version":"6714567633-export function writeLog(s: string) {\n}","signature":"8055010000-export declare function writeLog(s: string): void;\n"},{"version":"-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}","signature":"-5615417221-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n","affectsGlobalScope":true}],"root":[[2,7]],"options":{"declaration":true},"referencedMap":[[4,1],[3,2],[5,1]],"semanticDiagnosticsPerFile":[[7,[{"start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
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
    "../../tslibs/ts/lib/lib.d.ts": {
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
    "declaration": true
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
          "length": 18,
          "messageText": "Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.",
          "category": 1,
          "code": 2396,
          "skippedOn": "noEmit"
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 2077
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: No Change run with emit

Input::

/home/src/tslibs/TS/Lib/tsc.js --p .
Output::
[96msrc/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 1 error in src/noChangeFileWithEmitSpecificError.ts[90m:1[0m




exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: No Change run with noEmit

Input::

/home/src/tslibs/TS/Lib/tsc.js --p . --noEmit
Output::



exitCode:: ExitStatus.Success

Change:: No Change run with noEmit

Input::

/home/src/tslibs/TS/Lib/tsc.js --p . --noEmit
Output::



exitCode:: ExitStatus.Success

Change:: No Change run with emit

Input::

/home/src/tslibs/TS/Lib/tsc.js --p .
Output::
[96msrc/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 1 error in src/noChangeFileWithEmitSpecificError.ts[90m:1[0m




exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Introduce error and emit

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

[96msrc/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 3 errors in 3 files.

Errors  Files
     1  src/directUse.ts[90m:2[0m
     1  src/indirectUse.ts[90m:2[0m
     1  src/noChangeFileWithEmitSpecificError.ts[90m:1[0m


//// [/home/src/workspaces/project/src/class.js]
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


//// [/home/src/workspaces/project/src/class.d.ts]
export declare class classC {
    prop1: number;
}


//// [/home/src/workspaces/project/src/indirectClass.js] file written with same contents
//// [/home/src/workspaces/project/src/indirectClass.d.ts] file written with same contents
//// [/home/src/workspaces/project/src/directUse.d.ts] file written with same contents
//// [/home/src/workspaces/project/src/indirectUse.d.ts] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/class.ts","./src/indirectclass.ts","./src/directuse.ts","./src/indirectuse.ts","./src/nochangefile.ts","./src/nochangefilewithemitspecificerror.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"1786859709-export class classC {\n    prop1 = 1;\n}","signature":"-12157283604-export declare class classC {\n    prop1: number;\n}\n"},{"version":"6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","signature":"9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"},{"version":"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"-3531856636-export {};\n"},{"version":"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"-3531856636-export {};\n"},{"version":"6714567633-export function writeLog(s: string) {\n}","signature":"8055010000-export declare function writeLog(s: string): void;\n"},{"version":"-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}","signature":"-5615417221-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n","affectsGlobalScope":true}],"root":[[2,7]],"options":{"declaration":true},"referencedMap":[[4,1],[3,2],[5,1]],"semanticDiagnosticsPerFile":[[4,[{"start":76,"length":4,"code":2551,"category":1,"messageText":"Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?","relatedInformation":[{"file":"./src/class.ts","start":26,"length":5,"messageText":"'prop1' is declared here.","category":3,"code":2728}]}]],[5,[{"start":76,"length":4,"code":2551,"category":1,"messageText":"Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?","relatedInformation":[{"file":"./src/class.ts","start":26,"length":5,"messageText":"'prop1' is declared here.","category":3,"code":2728}]}]],[7,[{"start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
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
    "../../tslibs/ts/lib/lib.d.ts": {
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
    "declaration": true
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
          "length": 18,
          "messageText": "Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.",
          "category": 1,
          "code": 2396,
          "skippedOn": "noEmit"
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 2641
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: No Change run with emit

Input::

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

[96msrc/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 3 errors in 3 files.

Errors  Files
     1  src/directUse.ts[90m:2[0m
     1  src/indirectUse.ts[90m:2[0m
     1  src/noChangeFileWithEmitSpecificError.ts[90m:1[0m



exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: No Change run with noEmit

Input::

/home/src/tslibs/TS/Lib/tsc.js --p . --noEmit
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


Found 2 errors in 2 files.

Errors  Files
     1  src/directUse.ts[90m:2[0m
     1  src/indirectUse.ts[90m:2[0m



exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: No Change run with noEmit

Input::

/home/src/tslibs/TS/Lib/tsc.js --p . --noEmit
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


Found 2 errors in 2 files.

Errors  Files
     1  src/directUse.ts[90m:2[0m
     1  src/indirectUse.ts[90m:2[0m



exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: No Change run with emit

Input::

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

[96msrc/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 3 errors in 3 files.

Errors  Files
     1  src/directUse.ts[90m:2[0m
     1  src/indirectUse.ts[90m:2[0m
     1  src/noChangeFileWithEmitSpecificError.ts[90m:1[0m



exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Fix error and no emit

Input::
//// [/home/src/workspaces/project/src/class.ts]
export class classC {
    prop = 1;
}


/home/src/tslibs/TS/Lib/tsc.js --p . --noEmit
Output::


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/class.ts","./src/indirectclass.ts","./src/directuse.ts","./src/indirectuse.ts","./src/nochangefile.ts","./src/nochangefilewithemitspecificerror.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"545032748-export class classC {\n    prop = 1;\n}","signature":"-9508063301-export declare class classC {\n    prop: number;\n}\n"},{"version":"6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","signature":"9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"},"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",{"version":"6714567633-export function writeLog(s: string) {\n}","signature":"8055010000-export declare function writeLog(s: string): void;\n"},{"version":"-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}","signature":"-5615417221-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n","affectsGlobalScope":true}],"root":[[2,7]],"options":{"declaration":true},"referencedMap":[[4,1],[3,2],[5,1]],"semanticDiagnosticsPerFile":[[7,[{"start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"affectedFilesPendingEmit":[[2,17],[4,16],[3,17],[5,16]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
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
    "../../tslibs/ts/lib/lib.d.ts": {
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
    "declaration": true
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
      [
        "./src/class.ts",
        17
      ],
      "Js | DtsEmit"
    ],
    [
      [
        "./src/directuse.ts",
        16
      ],
      "DtsEmit"
    ],
    [
      [
        "./src/indirectclass.ts",
        17
      ],
      "Js | DtsEmit"
    ],
    [
      [
        "./src/indirectuse.ts",
        16
      ],
      "DtsEmit"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 2032
}


exitCode:: ExitStatus.Success

Change:: No Change run with emit

Input::

/home/src/tslibs/TS/Lib/tsc.js --p .
Output::
[96msrc/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 1 error in src/noChangeFileWithEmitSpecificError.ts[90m:1[0m



//// [/home/src/workspaces/project/src/class.js]
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


//// [/home/src/workspaces/project/src/class.d.ts]
export declare class classC {
    prop: number;
}


//// [/home/src/workspaces/project/src/indirectClass.js] file written with same contents
//// [/home/src/workspaces/project/src/indirectClass.d.ts] file written with same contents
//// [/home/src/workspaces/project/src/directUse.d.ts] file written with same contents
//// [/home/src/workspaces/project/src/indirectUse.d.ts] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/class.ts","./src/indirectclass.ts","./src/directuse.ts","./src/indirectuse.ts","./src/nochangefile.ts","./src/nochangefilewithemitspecificerror.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"545032748-export class classC {\n    prop = 1;\n}","signature":"-9508063301-export declare class classC {\n    prop: number;\n}\n"},{"version":"6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","signature":"9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"},{"version":"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"-3531856636-export {};\n"},{"version":"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"-3531856636-export {};\n"},{"version":"6714567633-export function writeLog(s: string) {\n}","signature":"8055010000-export declare function writeLog(s: string): void;\n"},{"version":"-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}","signature":"-5615417221-declare function someFunc(arguments: boolean, ...rest: any[]): void;\n","affectsGlobalScope":true}],"root":[[2,7]],"options":{"declaration":true},"referencedMap":[[4,1],[3,2],[5,1]],"semanticDiagnosticsPerFile":[[7,[{"start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
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
    "../../tslibs/ts/lib/lib.d.ts": {
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
    "declaration": true
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
          "length": 18,
          "messageText": "Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.",
          "category": 1,
          "code": 2396,
          "skippedOn": "noEmit"
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 2077
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: No Change run with noEmit

Input::

/home/src/tslibs/TS/Lib/tsc.js --p . --noEmit
Output::



exitCode:: ExitStatus.Success

Change:: No Change run with noEmit

Input::

/home/src/tslibs/TS/Lib/tsc.js --p . --noEmit
Output::



exitCode:: ExitStatus.Success

Change:: No Change run with emit

Input::

/home/src/tslibs/TS/Lib/tsc.js --p .
Output::
[96msrc/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 1 error in src/noChangeFileWithEmitSpecificError.ts[90m:1[0m




exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
