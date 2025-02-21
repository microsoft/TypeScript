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
    "incremental": true
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


/home/src/tslibs/TS/Lib/tsc.js -b -v .
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96msrc/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 1 error.



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


//// [/home/src/workspaces/project/src/directUse.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var indirectClass_1 = require("./indirectClass");
new indirectClass_1.indirectClass().classC.prop;


//// [/home/src/workspaces/project/src/indirectUse.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var indirectClass_1 = require("./indirectClass");
new indirectClass_1.indirectClass().classC.prop;


//// [/home/src/workspaces/project/src/noChangeFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeLog = writeLog;
function writeLog(s) {
}


//// [/home/src/workspaces/project/src/noChangeFileWithEmitSpecificError.js]
function someFunc(arguments) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
}


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/class.ts","./src/indirectclass.ts","./src/directuse.ts","./src/indirectuse.ts","./src/nochangefile.ts","./src/nochangefilewithemitspecificerror.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"545032748-export class classC {\n    prop = 1;\n}","6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","6714567633-export function writeLog(s: string) {\n}",{"version":"-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}","affectsGlobalScope":true}],"root":[[2,7]],"referencedMap":[[4,1],[3,2],[5,1]],"semanticDiagnosticsPerFile":[[7,[{"start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"version":"FakeTSVersion"}

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
  "size": 1530
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: No Change run with noEmit

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v . --noEmit
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...




exitCode:: ExitStatus.Success

Change:: No Change run with noEmit

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v . --noEmit
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...




exitCode:: ExitStatus.Success

Change:: Introduce error but still noEmit

Input::
//// [/home/src/workspaces/project/src/class.ts]
export class classC {
    prop1 = 1;
}


/home/src/tslibs/TS/Lib/tsc.js -b -v . --noEmit
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

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


Found 2 errors.



//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/class.ts","./src/indirectclass.ts","./src/directuse.ts","./src/indirectuse.ts","./src/nochangefile.ts","./src/nochangefilewithemitspecificerror.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"1786859709-export class classC {\n    prop1 = 1;\n}","signature":"-12157283604-export declare class classC {\n    prop1: number;\n}\n"},{"version":"6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","signature":"9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"},{"version":"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"-3531856636-export {};\n"},{"version":"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","signature":"-3531856636-export {};\n"},"6714567633-export function writeLog(s: string) {\n}",{"version":"-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}","affectsGlobalScope":true}],"root":[[2,7]],"referencedMap":[[4,1],[3,2],[5,1]],"semanticDiagnosticsPerFile":[[4,[{"start":76,"length":4,"code":2551,"category":1,"messageText":"Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?","relatedInformation":[{"file":"./src/class.ts","start":26,"length":5,"messageText":"'prop1' is declared here.","category":3,"code":2728}]}]],[5,[{"start":76,"length":4,"code":2551,"category":1,"messageText":"Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?","relatedInformation":[{"file":"./src/class.ts","start":26,"length":5,"messageText":"'prop1' is declared here.","category":3,"code":2728}]}]],[7,[{"start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"affectedFilesPendingEmit":[2,4,3,5],"version":"FakeTSVersion"}

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
      "Js"
    ],
    [
      "./src/directuse.ts",
      "Js"
    ],
    [
      "./src/indirectclass.ts",
      "Js"
    ],
    [
      "./src/indirectuse.ts",
      "Js"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 2460
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: Fix error and emit

Input::
//// [/home/src/workspaces/project/src/class.ts]
export class classC {
    prop = 1;
}


/home/src/tslibs/TS/Lib/tsc.js -b -v .
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96msrc/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/project/src/class.js] file written with same contents
//// [/home/src/workspaces/project/src/indirectClass.js] file written with same contents
//// [/home/src/workspaces/project/src/directUse.js] file written with same contents
//// [/home/src/workspaces/project/src/indirectUse.js] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/class.ts","./src/indirectclass.ts","./src/directuse.ts","./src/indirectuse.ts","./src/nochangefile.ts","./src/nochangefilewithemitspecificerror.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"545032748-export class classC {\n    prop = 1;\n}","signature":"-9508063301-export declare class classC {\n    prop: number;\n}\n"},{"version":"6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","signature":"9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"},"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","6714567633-export function writeLog(s: string) {\n}",{"version":"-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}","affectsGlobalScope":true}],"root":[[2,7]],"referencedMap":[[4,1],[3,2],[5,1]],"semanticDiagnosticsPerFile":[[7,[{"start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"version":"FakeTSVersion"}

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
  "size": 1757
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: No Change run with emit

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v .
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96msrc/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 1 error.




exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: No Change run with noEmit

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v . --noEmit
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...




exitCode:: ExitStatus.Success

Change:: No Change run with noEmit

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v . --noEmit
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...




exitCode:: ExitStatus.Success

Change:: No Change run with emit

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v .
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96msrc/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 1 error.




exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: Introduce error and emit

Input::
//// [/home/src/workspaces/project/src/class.ts]
export class classC {
    prop1 = 1;
}


/home/src/tslibs/TS/Lib/tsc.js -b -v .
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

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


Found 3 errors.



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


//// [/home/src/workspaces/project/src/indirectClass.js] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/class.ts","./src/indirectclass.ts","./src/directuse.ts","./src/indirectuse.ts","./src/nochangefile.ts","./src/nochangefilewithemitspecificerror.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"1786859709-export class classC {\n    prop1 = 1;\n}","signature":"-12157283604-export declare class classC {\n    prop1: number;\n}\n"},{"version":"6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","signature":"9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"},"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","6714567633-export function writeLog(s: string) {\n}",{"version":"-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}","affectsGlobalScope":true}],"root":[[2,7]],"referencedMap":[[4,1],[3,2],[5,1]],"semanticDiagnosticsPerFile":[[4,[{"start":76,"length":4,"code":2551,"category":1,"messageText":"Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?","relatedInformation":[{"file":"./src/class.ts","start":26,"length":5,"messageText":"'prop1' is declared here.","category":3,"code":2728}]}]],[5,[{"start":76,"length":4,"code":2551,"category":1,"messageText":"Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?","relatedInformation":[{"file":"./src/class.ts","start":26,"length":5,"messageText":"'prop1' is declared here.","category":3,"code":2728}]}]],[7,[{"start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"version":"FakeTSVersion"}

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
  "size": 2321
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: No Change run with emit

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v .
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

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


Found 3 errors.




exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: No Change run with noEmit

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v . --noEmit
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

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


Found 2 errors.




exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: No Change run with noEmit

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v . --noEmit
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

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


Found 2 errors.




exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: No Change run with emit

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v .
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

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


Found 3 errors.




exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: Fix error and no emit

Input::
//// [/home/src/workspaces/project/src/class.ts]
export class classC {
    prop = 1;
}


/home/src/tslibs/TS/Lib/tsc.js -b -v . --noEmit
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...



//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/class.ts","./src/indirectclass.ts","./src/directuse.ts","./src/indirectuse.ts","./src/nochangefile.ts","./src/nochangefilewithemitspecificerror.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"545032748-export class classC {\n    prop = 1;\n}","signature":"-9508063301-export declare class classC {\n    prop: number;\n}\n"},{"version":"6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","signature":"9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"},"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","6714567633-export function writeLog(s: string) {\n}",{"version":"-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}","affectsGlobalScope":true}],"root":[[2,7]],"referencedMap":[[4,1],[3,2],[5,1]],"semanticDiagnosticsPerFile":[[7,[{"start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"affectedFilesPendingEmit":[2,3],"version":"FakeTSVersion"}

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
      "./src/class.ts",
      "Js"
    ],
    [
      "./src/indirectclass.ts",
      "Js"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1790
}


exitCode:: ExitStatus.Success

Change:: No Change run with emit

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v .
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96msrc/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 1 error.



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


//// [/home/src/workspaces/project/src/indirectClass.js] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/class.ts","./src/indirectclass.ts","./src/directuse.ts","./src/indirectuse.ts","./src/nochangefile.ts","./src/nochangefilewithemitspecificerror.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"545032748-export class classC {\n    prop = 1;\n}","signature":"-9508063301-export declare class classC {\n    prop: number;\n}\n"},{"version":"6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","signature":"9337978648-import { classC } from './class';\nexport declare class indirectClass {\n    classC: classC;\n}\n"},"-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","6714567633-export function writeLog(s: string) {\n}",{"version":"-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}","affectsGlobalScope":true}],"root":[[2,7]],"referencedMap":[[4,1],[3,2],[5,1]],"semanticDiagnosticsPerFile":[[7,[{"start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"version":"FakeTSVersion"}

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
  "size": 1757
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: No Change run with noEmit

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v . --noEmit
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...




exitCode:: ExitStatus.Success

Change:: No Change run with noEmit

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v . --noEmit
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...




exitCode:: ExitStatus.Success

Change:: No Change run with emit

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v .
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96msrc/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 1 error.




exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
