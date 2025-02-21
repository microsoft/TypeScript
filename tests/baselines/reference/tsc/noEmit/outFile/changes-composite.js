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
    "composite": true,
    "outFile": "../outFile.js",
    "module": "amd"
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



//// [/home/src/workspaces/outFile.js]
define("src/class", ["require", "exports"], function (require, exports) {
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
});
define("src/indirectClass", ["require", "exports", "src/class"], function (require, exports, class_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.indirectClass = void 0;
    var indirectClass = /** @class */ (function () {
        function indirectClass() {
            this.classC = new class_1.classC();
        }
        return indirectClass;
    }());
    exports.indirectClass = indirectClass;
});
define("src/directUse", ["require", "exports", "src/indirectClass"], function (require, exports, indirectClass_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new indirectClass_1.indirectClass().classC.prop;
});
define("src/indirectUse", ["require", "exports", "src/indirectClass"], function (require, exports, indirectClass_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new indirectClass_2.indirectClass().classC.prop;
});
define("src/noChangeFile", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.writeLog = writeLog;
    function writeLog(s) {
    }
});
function someFunc(arguments) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
}


//// [/home/src/workspaces/outFile.d.ts]
declare module "src/class" {
    export class classC {
        prop: number;
    }
}
declare module "src/indirectClass" {
    import { classC } from "src/class";
    export class indirectClass {
        classC: classC;
    }
}
declare module "src/directUse" { }
declare module "src/indirectUse" { }
declare module "src/noChangeFile" {
    export function writeLog(s: string): void;
}
declare function someFunc(arguments: boolean, ...rest: any[]): void;


//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/src/class.ts","./project/src/indirectclass.ts","./project/src/directuse.ts","./project/src/indirectuse.ts","./project/src/nochangefile.ts","./project/src/nochangefilewithemitspecificerror.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","545032748-export class classC {\n    prop = 1;\n}","6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","6714567633-export function writeLog(s: string) {\n}","-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}"],"root":[[2,7]],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[[7,[{"start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"outSignature":"8998999540-declare module \"src/class\" {\n    export class classC {\n        prop: number;\n    }\n}\ndeclare module \"src/indirectClass\" {\n    import { classC } from \"src/class\";\n    export class indirectClass {\n        classC: classC;\n    }\n}\ndeclare module \"src/directUse\" { }\ndeclare module \"src/indirectUse\" { }\ndeclare module \"src/noChangeFile\" {\n    export function writeLog(s: string): void;\n}\ndeclare function someFunc(arguments: boolean, ...rest: any[]): void;\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/src/class.ts",
    "./project/src/indirectclass.ts",
    "./project/src/directuse.ts",
    "./project/src/indirectuse.ts",
    "./project/src/nochangefile.ts",
    "./project/src/nochangefilewithemitspecificerror.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/src/class.ts": "545032748-export class classC {\n    prop = 1;\n}",
    "./project/src/indirectclass.ts": "6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
    "./project/src/directuse.ts": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
    "./project/src/indirectuse.ts": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
    "./project/src/nochangefile.ts": "6714567633-export function writeLog(s: string) {\n}",
    "./project/src/nochangefilewithemitspecificerror.ts": "-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}"
  },
  "root": [
    [
      [
        2,
        7
      ],
      [
        "./project/src/class.ts",
        "./project/src/indirectclass.ts",
        "./project/src/directuse.ts",
        "./project/src/indirectuse.ts",
        "./project/src/nochangefile.ts",
        "./project/src/nochangefilewithemitspecificerror.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "./project/src/nochangefilewithemitspecificerror.ts",
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
  "outSignature": "8998999540-declare module \"src/class\" {\n    export class classC {\n        prop: number;\n    }\n}\ndeclare module \"src/indirectClass\" {\n    import { classC } from \"src/class\";\n    export class indirectClass {\n        classC: classC;\n    }\n}\ndeclare module \"src/directUse\" { }\ndeclare module \"src/indirectUse\" { }\ndeclare module \"src/noChangeFile\" {\n    export function writeLog(s: string): void;\n}\ndeclare function someFunc(arguments: boolean, ...rest: any[]): void;\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 2055
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


//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/src/class.ts","./project/src/indirectclass.ts","./project/src/directuse.ts","./project/src/indirectuse.ts","./project/src/nochangefile.ts","./project/src/nochangefilewithemitspecificerror.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","1786859709-export class classC {\n    prop1 = 1;\n}","6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","6714567633-export function writeLog(s: string) {\n}","-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}"],"root":[[2,7]],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[[4,[{"start":76,"length":4,"code":2551,"category":1,"messageText":"Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?","relatedInformation":[{"file":"./project/src/class.ts","start":26,"length":5,"messageText":"'prop1' is declared here.","category":3,"code":2728}]}]],[5,[{"start":76,"length":4,"code":2551,"category":1,"messageText":"Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?","relatedInformation":[{"file":"./project/src/class.ts","start":26,"length":5,"messageText":"'prop1' is declared here.","category":3,"code":2728}]}]],[7,[{"start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"outSignature":"8998999540-declare module \"src/class\" {\n    export class classC {\n        prop: number;\n    }\n}\ndeclare module \"src/indirectClass\" {\n    import { classC } from \"src/class\";\n    export class indirectClass {\n        classC: classC;\n    }\n}\ndeclare module \"src/directUse\" { }\ndeclare module \"src/indirectUse\" { }\ndeclare module \"src/noChangeFile\" {\n    export function writeLog(s: string): void;\n}\ndeclare function someFunc(arguments: boolean, ...rest: any[]): void;\n","latestChangedDtsFile":"./outFile.d.ts","pendingEmit":false,"version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/src/class.ts",
    "./project/src/indirectclass.ts",
    "./project/src/directuse.ts",
    "./project/src/indirectuse.ts",
    "./project/src/nochangefile.ts",
    "./project/src/nochangefilewithemitspecificerror.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/src/class.ts": "1786859709-export class classC {\n    prop1 = 1;\n}",
    "./project/src/indirectclass.ts": "6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
    "./project/src/directuse.ts": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
    "./project/src/indirectuse.ts": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
    "./project/src/nochangefile.ts": "6714567633-export function writeLog(s: string) {\n}",
    "./project/src/nochangefilewithemitspecificerror.ts": "-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}"
  },
  "root": [
    [
      [
        2,
        7
      ],
      [
        "./project/src/class.ts",
        "./project/src/indirectclass.ts",
        "./project/src/directuse.ts",
        "./project/src/indirectuse.ts",
        "./project/src/nochangefile.ts",
        "./project/src/nochangefilewithemitspecificerror.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "./project/src/directuse.ts",
      [
        {
          "start": 76,
          "length": 4,
          "code": 2551,
          "category": 1,
          "messageText": "Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?",
          "relatedInformation": [
            {
              "file": "./project/src/class.ts",
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
      "./project/src/indirectuse.ts",
      [
        {
          "start": 76,
          "length": 4,
          "code": 2551,
          "category": 1,
          "messageText": "Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?",
          "relatedInformation": [
            {
              "file": "./project/src/class.ts",
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
      "./project/src/nochangefilewithemitspecificerror.ts",
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
  "outSignature": "8998999540-declare module \"src/class\" {\n    export class classC {\n        prop: number;\n    }\n}\ndeclare module \"src/indirectClass\" {\n    import { classC } from \"src/class\";\n    export class indirectClass {\n        classC: classC;\n    }\n}\ndeclare module \"src/directUse\" { }\ndeclare module \"src/indirectUse\" { }\ndeclare module \"src/noChangeFile\" {\n    export function writeLog(s: string): void;\n}\ndeclare function someFunc(arguments: boolean, ...rest: any[]): void;\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "pendingEmit": [
    "Js | Dts",
    false
  ],
  "version": "FakeTSVersion",
  "size": 2653
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



//// [/home/src/workspaces/outFile.js] file written with same contents
//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/src/class.ts","./project/src/indirectclass.ts","./project/src/directuse.ts","./project/src/indirectuse.ts","./project/src/nochangefile.ts","./project/src/nochangefilewithemitspecificerror.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","545032748-export class classC {\n    prop = 1;\n}","6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","6714567633-export function writeLog(s: string) {\n}","-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}"],"root":[[2,7]],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[[7,[{"start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"outSignature":"8998999540-declare module \"src/class\" {\n    export class classC {\n        prop: number;\n    }\n}\ndeclare module \"src/indirectClass\" {\n    import { classC } from \"src/class\";\n    export class indirectClass {\n        classC: classC;\n    }\n}\ndeclare module \"src/directUse\" { }\ndeclare module \"src/indirectUse\" { }\ndeclare module \"src/noChangeFile\" {\n    export function writeLog(s: string): void;\n}\ndeclare function someFunc(arguments: boolean, ...rest: any[]): void;\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/src/class.ts",
    "./project/src/indirectclass.ts",
    "./project/src/directuse.ts",
    "./project/src/indirectuse.ts",
    "./project/src/nochangefile.ts",
    "./project/src/nochangefilewithemitspecificerror.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/src/class.ts": "545032748-export class classC {\n    prop = 1;\n}",
    "./project/src/indirectclass.ts": "6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
    "./project/src/directuse.ts": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
    "./project/src/indirectuse.ts": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
    "./project/src/nochangefile.ts": "6714567633-export function writeLog(s: string) {\n}",
    "./project/src/nochangefilewithemitspecificerror.ts": "-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}"
  },
  "root": [
    [
      [
        2,
        7
      ],
      [
        "./project/src/class.ts",
        "./project/src/indirectclass.ts",
        "./project/src/directuse.ts",
        "./project/src/indirectuse.ts",
        "./project/src/nochangefile.ts",
        "./project/src/nochangefilewithemitspecificerror.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "./project/src/nochangefilewithemitspecificerror.ts",
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
  "outSignature": "8998999540-declare module \"src/class\" {\n    export class classC {\n        prop: number;\n    }\n}\ndeclare module \"src/indirectClass\" {\n    import { classC } from \"src/class\";\n    export class indirectClass {\n        classC: classC;\n    }\n}\ndeclare module \"src/directUse\" { }\ndeclare module \"src/indirectUse\" { }\ndeclare module \"src/noChangeFile\" {\n    export function writeLog(s: string): void;\n}\ndeclare function someFunc(arguments: boolean, ...rest: any[]): void;\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 2055
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


//// [/home/src/workspaces/outFile.js]
define("src/class", ["require", "exports"], function (require, exports) {
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
});
define("src/indirectClass", ["require", "exports", "src/class"], function (require, exports, class_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.indirectClass = void 0;
    var indirectClass = /** @class */ (function () {
        function indirectClass() {
            this.classC = new class_1.classC();
        }
        return indirectClass;
    }());
    exports.indirectClass = indirectClass;
});
define("src/directUse", ["require", "exports", "src/indirectClass"], function (require, exports, indirectClass_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new indirectClass_1.indirectClass().classC.prop;
});
define("src/indirectUse", ["require", "exports", "src/indirectClass"], function (require, exports, indirectClass_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new indirectClass_2.indirectClass().classC.prop;
});
define("src/noChangeFile", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.writeLog = writeLog;
    function writeLog(s) {
    }
});
function someFunc(arguments) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
}


//// [/home/src/workspaces/outFile.d.ts]
declare module "src/class" {
    export class classC {
        prop1: number;
    }
}
declare module "src/indirectClass" {
    import { classC } from "src/class";
    export class indirectClass {
        classC: classC;
    }
}
declare module "src/directUse" { }
declare module "src/indirectUse" { }
declare module "src/noChangeFile" {
    export function writeLog(s: string): void;
}
declare function someFunc(arguments: boolean, ...rest: any[]): void;


//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/src/class.ts","./project/src/indirectclass.ts","./project/src/directuse.ts","./project/src/indirectuse.ts","./project/src/nochangefile.ts","./project/src/nochangefilewithemitspecificerror.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","1786859709-export class classC {\n    prop1 = 1;\n}","6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","6714567633-export function writeLog(s: string) {\n}","-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}"],"root":[[2,7]],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[[4,[{"start":76,"length":4,"code":2551,"category":1,"messageText":"Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?","relatedInformation":[{"file":"./project/src/class.ts","start":26,"length":5,"messageText":"'prop1' is declared here.","category":3,"code":2728}]}]],[5,[{"start":76,"length":4,"code":2551,"category":1,"messageText":"Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?","relatedInformation":[{"file":"./project/src/class.ts","start":26,"length":5,"messageText":"'prop1' is declared here.","category":3,"code":2728}]}]],[7,[{"start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"outSignature":"-1966987419-declare module \"src/class\" {\n    export class classC {\n        prop1: number;\n    }\n}\ndeclare module \"src/indirectClass\" {\n    import { classC } from \"src/class\";\n    export class indirectClass {\n        classC: classC;\n    }\n}\ndeclare module \"src/directUse\" { }\ndeclare module \"src/indirectUse\" { }\ndeclare module \"src/noChangeFile\" {\n    export function writeLog(s: string): void;\n}\ndeclare function someFunc(arguments: boolean, ...rest: any[]): void;\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/src/class.ts",
    "./project/src/indirectclass.ts",
    "./project/src/directuse.ts",
    "./project/src/indirectuse.ts",
    "./project/src/nochangefile.ts",
    "./project/src/nochangefilewithemitspecificerror.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/src/class.ts": "1786859709-export class classC {\n    prop1 = 1;\n}",
    "./project/src/indirectclass.ts": "6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
    "./project/src/directuse.ts": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
    "./project/src/indirectuse.ts": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
    "./project/src/nochangefile.ts": "6714567633-export function writeLog(s: string) {\n}",
    "./project/src/nochangefilewithemitspecificerror.ts": "-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}"
  },
  "root": [
    [
      [
        2,
        7
      ],
      [
        "./project/src/class.ts",
        "./project/src/indirectclass.ts",
        "./project/src/directuse.ts",
        "./project/src/indirectuse.ts",
        "./project/src/nochangefile.ts",
        "./project/src/nochangefilewithemitspecificerror.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "./project/src/directuse.ts",
      [
        {
          "start": 76,
          "length": 4,
          "code": 2551,
          "category": 1,
          "messageText": "Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?",
          "relatedInformation": [
            {
              "file": "./project/src/class.ts",
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
      "./project/src/indirectuse.ts",
      [
        {
          "start": 76,
          "length": 4,
          "code": 2551,
          "category": 1,
          "messageText": "Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?",
          "relatedInformation": [
            {
              "file": "./project/src/class.ts",
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
      "./project/src/nochangefilewithemitspecificerror.ts",
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
  "outSignature": "-1966987419-declare module \"src/class\" {\n    export class classC {\n        prop1: number;\n    }\n}\ndeclare module \"src/indirectClass\" {\n    import { classC } from \"src/class\";\n    export class indirectClass {\n        classC: classC;\n    }\n}\ndeclare module \"src/directUse\" { }\ndeclare module \"src/indirectUse\" { }\ndeclare module \"src/noChangeFile\" {\n    export function writeLog(s: string): void;\n}\ndeclare function someFunc(arguments: boolean, ...rest: any[]): void;\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 2635
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


//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/src/class.ts","./project/src/indirectclass.ts","./project/src/directuse.ts","./project/src/indirectuse.ts","./project/src/nochangefile.ts","./project/src/nochangefilewithemitspecificerror.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","545032748-export class classC {\n    prop = 1;\n}","6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","6714567633-export function writeLog(s: string) {\n}","-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}"],"root":[[2,7]],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[[7,[{"start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"outSignature":"-1966987419-declare module \"src/class\" {\n    export class classC {\n        prop1: number;\n    }\n}\ndeclare module \"src/indirectClass\" {\n    import { classC } from \"src/class\";\n    export class indirectClass {\n        classC: classC;\n    }\n}\ndeclare module \"src/directUse\" { }\ndeclare module \"src/indirectUse\" { }\ndeclare module \"src/noChangeFile\" {\n    export function writeLog(s: string): void;\n}\ndeclare function someFunc(arguments: boolean, ...rest: any[]): void;\n","latestChangedDtsFile":"./outFile.d.ts","pendingEmit":17,"version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/src/class.ts",
    "./project/src/indirectclass.ts",
    "./project/src/directuse.ts",
    "./project/src/indirectuse.ts",
    "./project/src/nochangefile.ts",
    "./project/src/nochangefilewithemitspecificerror.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/src/class.ts": "545032748-export class classC {\n    prop = 1;\n}",
    "./project/src/indirectclass.ts": "6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
    "./project/src/directuse.ts": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
    "./project/src/indirectuse.ts": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
    "./project/src/nochangefile.ts": "6714567633-export function writeLog(s: string) {\n}",
    "./project/src/nochangefilewithemitspecificerror.ts": "-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}"
  },
  "root": [
    [
      [
        2,
        7
      ],
      [
        "./project/src/class.ts",
        "./project/src/indirectclass.ts",
        "./project/src/directuse.ts",
        "./project/src/indirectuse.ts",
        "./project/src/nochangefile.ts",
        "./project/src/nochangefilewithemitspecificerror.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "./project/src/nochangefilewithemitspecificerror.ts",
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
  "outSignature": "-1966987419-declare module \"src/class\" {\n    export class classC {\n        prop1: number;\n    }\n}\ndeclare module \"src/indirectClass\" {\n    import { classC } from \"src/class\";\n    export class indirectClass {\n        classC: classC;\n    }\n}\ndeclare module \"src/directUse\" { }\ndeclare module \"src/indirectUse\" { }\ndeclare module \"src/noChangeFile\" {\n    export function writeLog(s: string): void;\n}\ndeclare function someFunc(arguments: boolean, ...rest: any[]): void;\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "pendingEmit": [
    "Js | DtsEmit",
    17
  ],
  "version": "FakeTSVersion",
  "size": 2074
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



//// [/home/src/workspaces/outFile.js]
define("src/class", ["require", "exports"], function (require, exports) {
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
});
define("src/indirectClass", ["require", "exports", "src/class"], function (require, exports, class_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.indirectClass = void 0;
    var indirectClass = /** @class */ (function () {
        function indirectClass() {
            this.classC = new class_1.classC();
        }
        return indirectClass;
    }());
    exports.indirectClass = indirectClass;
});
define("src/directUse", ["require", "exports", "src/indirectClass"], function (require, exports, indirectClass_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new indirectClass_1.indirectClass().classC.prop;
});
define("src/indirectUse", ["require", "exports", "src/indirectClass"], function (require, exports, indirectClass_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new indirectClass_2.indirectClass().classC.prop;
});
define("src/noChangeFile", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.writeLog = writeLog;
    function writeLog(s) {
    }
});
function someFunc(arguments) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
}


//// [/home/src/workspaces/outFile.d.ts]
declare module "src/class" {
    export class classC {
        prop: number;
    }
}
declare module "src/indirectClass" {
    import { classC } from "src/class";
    export class indirectClass {
        classC: classC;
    }
}
declare module "src/directUse" { }
declare module "src/indirectUse" { }
declare module "src/noChangeFile" {
    export function writeLog(s: string): void;
}
declare function someFunc(arguments: boolean, ...rest: any[]): void;


//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/src/class.ts","./project/src/indirectclass.ts","./project/src/directuse.ts","./project/src/indirectuse.ts","./project/src/nochangefile.ts","./project/src/nochangefilewithemitspecificerror.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","545032748-export class classC {\n    prop = 1;\n}","6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","6714567633-export function writeLog(s: string) {\n}","-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}"],"root":[[2,7]],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[[7,[{"start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"outSignature":"8998999540-declare module \"src/class\" {\n    export class classC {\n        prop: number;\n    }\n}\ndeclare module \"src/indirectClass\" {\n    import { classC } from \"src/class\";\n    export class indirectClass {\n        classC: classC;\n    }\n}\ndeclare module \"src/directUse\" { }\ndeclare module \"src/indirectUse\" { }\ndeclare module \"src/noChangeFile\" {\n    export function writeLog(s: string): void;\n}\ndeclare function someFunc(arguments: boolean, ...rest: any[]): void;\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/src/class.ts",
    "./project/src/indirectclass.ts",
    "./project/src/directuse.ts",
    "./project/src/indirectuse.ts",
    "./project/src/nochangefile.ts",
    "./project/src/nochangefilewithemitspecificerror.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/src/class.ts": "545032748-export class classC {\n    prop = 1;\n}",
    "./project/src/indirectclass.ts": "6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}",
    "./project/src/directuse.ts": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
    "./project/src/indirectuse.ts": "-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;",
    "./project/src/nochangefile.ts": "6714567633-export function writeLog(s: string) {\n}",
    "./project/src/nochangefilewithemitspecificerror.ts": "-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}"
  },
  "root": [
    [
      [
        2,
        7
      ],
      [
        "./project/src/class.ts",
        "./project/src/indirectclass.ts",
        "./project/src/directuse.ts",
        "./project/src/indirectuse.ts",
        "./project/src/nochangefile.ts",
        "./project/src/nochangefilewithemitspecificerror.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "./project/src/nochangefilewithemitspecificerror.ts",
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
  "outSignature": "8998999540-declare module \"src/class\" {\n    export class classC {\n        prop: number;\n    }\n}\ndeclare module \"src/indirectClass\" {\n    import { classC } from \"src/class\";\n    export class indirectClass {\n        classC: classC;\n    }\n}\ndeclare module \"src/directUse\" { }\ndeclare module \"src/indirectUse\" { }\ndeclare module \"src/noChangeFile\" {\n    export function writeLog(s: string): void;\n}\ndeclare function someFunc(arguments: boolean, ...rest: any[]): void;\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 2055
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
