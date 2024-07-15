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
    "incremental": true,
    "outFile": "../outFile.js",
    "module": "amd"
  }
}



Output::
/lib/tsc -b -v src/project
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project/tsconfig.json' is out of date because output file 'src/outFile.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/project/tsconfig.json'...

[96msrc/project/src/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/outFile.js]
define("class", ["require", "exports"], function (require, exports) {
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
define("indirectClass", ["require", "exports", "class"], function (require, exports, class_1) {
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
define("directUse", ["require", "exports", "indirectClass"], function (require, exports, indirectClass_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new indirectClass_1.indirectClass().classC.prop;
});
define("indirectUse", ["require", "exports", "indirectClass"], function (require, exports, indirectClass_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new indirectClass_2.indirectClass().classC.prop;
});
define("noChangeFile", ["require", "exports"], function (require, exports) {
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


//// [/src/outFile.tsbuildinfo]
{"fileNames":["../lib/lib.d.ts","./project/src/class.ts","./project/src/indirectclass.ts","./project/src/directuse.ts","./project/src/indirectuse.ts","./project/src/nochangefile.ts","./project/src/nochangefilewithemitspecificerror.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","545032748-export class classC {\n    prop = 1;\n}","6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","6714567633-export function writeLog(s: string) {\n}","-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}"],"root":[[2,7]],"options":{"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[[7,[{"start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"version":"FakeTSVersion"}

//// [/src/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../lib/lib.d.ts",
    "./project/src/class.ts",
    "./project/src/indirectclass.ts",
    "./project/src/directuse.ts",
    "./project/src/indirectuse.ts",
    "./project/src/nochangefile.ts",
    "./project/src/nochangefilewithemitspecificerror.ts"
  ],
  "fileInfos": {
    "../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
  "version": "FakeTSVersion",
  "size": 1477
}



Change:: No Change run with noEmit
Input::


Output::
/lib/tsc -b -v src/project --noEmit
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/project/tsconfig.json'...

exitCode:: ExitStatus.Success




Change:: No Change run with noEmit
Input::


Output::
/lib/tsc -b -v src/project --noEmit
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/project/tsconfig.json'...

exitCode:: ExitStatus.Success




Change:: Introduce error but still noEmit
Input::
//// [/src/project/src/class.ts]
export class classC {
    prop1 = 1;
}



Output::
/lib/tsc -b -v src/project --noEmit
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/project/tsconfig.json'...

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


Found 2 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/outFile.tsbuildinfo]
{"fileNames":["../lib/lib.d.ts","./project/src/class.ts","./project/src/indirectclass.ts","./project/src/directuse.ts","./project/src/indirectuse.ts","./project/src/nochangefile.ts","./project/src/nochangefilewithemitspecificerror.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","1786859709-export class classC {\n    prop1 = 1;\n}","6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","6714567633-export function writeLog(s: string) {\n}","-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}"],"root":[[2,7]],"options":{"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[[4,[{"start":76,"length":4,"code":2551,"category":1,"messageText":"Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?","relatedInformation":[{"file":"./project/src/class.ts","start":26,"length":5,"messageText":"'prop1' is declared here.","category":3,"code":2728}]}]],[5,[{"start":76,"length":4,"code":2551,"category":1,"messageText":"Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?","relatedInformation":[{"file":"./project/src/class.ts","start":26,"length":5,"messageText":"'prop1' is declared here.","category":3,"code":2728}]}]],[7,[{"start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"pendingEmit":false,"version":"FakeTSVersion"}

//// [/src/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../lib/lib.d.ts",
    "./project/src/class.ts",
    "./project/src/indirectclass.ts",
    "./project/src/directuse.ts",
    "./project/src/indirectuse.ts",
    "./project/src/nochangefile.ts",
    "./project/src/nochangefilewithemitspecificerror.ts"
  ],
  "fileInfos": {
    "../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
  "pendingEmit": [
    "Js",
    false
  ],
  "version": "FakeTSVersion",
  "size": 2075
}



Change:: Fix error and emit
Input::
//// [/src/project/src/class.ts]
export class classC {
    prop = 1;
}



Output::
/lib/tsc -b -v src/project
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/project/tsconfig.json'...

[96msrc/project/src/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/outFile.js] file written with same contents
//// [/src/outFile.tsbuildinfo]
{"fileNames":["../lib/lib.d.ts","./project/src/class.ts","./project/src/indirectclass.ts","./project/src/directuse.ts","./project/src/indirectuse.ts","./project/src/nochangefile.ts","./project/src/nochangefilewithemitspecificerror.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","545032748-export class classC {\n    prop = 1;\n}","6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","6714567633-export function writeLog(s: string) {\n}","-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}"],"root":[[2,7]],"options":{"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[[7,[{"start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"version":"FakeTSVersion"}

//// [/src/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../lib/lib.d.ts",
    "./project/src/class.ts",
    "./project/src/indirectclass.ts",
    "./project/src/directuse.ts",
    "./project/src/indirectuse.ts",
    "./project/src/nochangefile.ts",
    "./project/src/nochangefilewithemitspecificerror.ts"
  ],
  "fileInfos": {
    "../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
  "version": "FakeTSVersion",
  "size": 1477
}



Change:: No Change run with emit
Input::


Output::
/lib/tsc -b -v src/project
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/project/tsconfig.json'...

[96msrc/project/src/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped




Change:: No Change run with noEmit
Input::


Output::
/lib/tsc -b -v src/project --noEmit
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/project/tsconfig.json'...

exitCode:: ExitStatus.Success




Change:: No Change run with noEmit
Input::


Output::
/lib/tsc -b -v src/project --noEmit
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/project/tsconfig.json'...

exitCode:: ExitStatus.Success




Change:: No Change run with emit
Input::


Output::
/lib/tsc -b -v src/project
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/project/tsconfig.json'...

[96msrc/project/src/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped




Change:: Introduce error and emit
Input::
//// [/src/project/src/class.ts]
export class classC {
    prop1 = 1;
}



Output::
/lib/tsc -b -v src/project
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/project/tsconfig.json'...

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


Found 3 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/outFile.js]
define("class", ["require", "exports"], function (require, exports) {
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
define("indirectClass", ["require", "exports", "class"], function (require, exports, class_1) {
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
define("directUse", ["require", "exports", "indirectClass"], function (require, exports, indirectClass_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new indirectClass_1.indirectClass().classC.prop;
});
define("indirectUse", ["require", "exports", "indirectClass"], function (require, exports, indirectClass_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new indirectClass_2.indirectClass().classC.prop;
});
define("noChangeFile", ["require", "exports"], function (require, exports) {
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


//// [/src/outFile.tsbuildinfo]
{"fileNames":["../lib/lib.d.ts","./project/src/class.ts","./project/src/indirectclass.ts","./project/src/directuse.ts","./project/src/indirectuse.ts","./project/src/nochangefile.ts","./project/src/nochangefilewithemitspecificerror.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","1786859709-export class classC {\n    prop1 = 1;\n}","6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","6714567633-export function writeLog(s: string) {\n}","-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}"],"root":[[2,7]],"options":{"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[[4,[{"start":76,"length":4,"code":2551,"category":1,"messageText":"Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?","relatedInformation":[{"file":"./project/src/class.ts","start":26,"length":5,"messageText":"'prop1' is declared here.","category":3,"code":2728}]}]],[5,[{"start":76,"length":4,"code":2551,"category":1,"messageText":"Property 'prop' does not exist on type 'classC'. Did you mean 'prop1'?","relatedInformation":[{"file":"./project/src/class.ts","start":26,"length":5,"messageText":"'prop1' is declared here.","category":3,"code":2728}]}]],[7,[{"start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"version":"FakeTSVersion"}

//// [/src/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../lib/lib.d.ts",
    "./project/src/class.ts",
    "./project/src/indirectclass.ts",
    "./project/src/directuse.ts",
    "./project/src/indirectuse.ts",
    "./project/src/nochangefile.ts",
    "./project/src/nochangefilewithemitspecificerror.ts"
  ],
  "fileInfos": {
    "../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
  "version": "FakeTSVersion",
  "size": 2055
}



Change:: No Change run with emit
Input::


Output::
/lib/tsc -b -v src/project
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/project/tsconfig.json'...

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


Found 3 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped




Change:: No Change run with noEmit
Input::


Output::
/lib/tsc -b -v src/project --noEmit
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/project/tsconfig.json'...

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


Found 2 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped




Change:: No Change run with noEmit
Input::


Output::
/lib/tsc -b -v src/project --noEmit
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/project/tsconfig.json'...

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


Found 2 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped




Change:: No Change run with emit
Input::


Output::
/lib/tsc -b -v src/project
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/project/tsconfig.json'...

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


Found 3 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped




Change:: Fix error and no emit
Input::
//// [/src/project/src/class.ts]
export class classC {
    prop = 1;
}



Output::
/lib/tsc -b -v src/project --noEmit
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/project/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/outFile.tsbuildinfo]
{"fileNames":["../lib/lib.d.ts","./project/src/class.ts","./project/src/indirectclass.ts","./project/src/directuse.ts","./project/src/indirectuse.ts","./project/src/nochangefile.ts","./project/src/nochangefilewithemitspecificerror.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","545032748-export class classC {\n    prop = 1;\n}","6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","6714567633-export function writeLog(s: string) {\n}","-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}"],"root":[[2,7]],"options":{"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[[7,[{"start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"pendingEmit":false,"version":"FakeTSVersion"}

//// [/src/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../lib/lib.d.ts",
    "./project/src/class.ts",
    "./project/src/indirectclass.ts",
    "./project/src/directuse.ts",
    "./project/src/indirectuse.ts",
    "./project/src/nochangefile.ts",
    "./project/src/nochangefilewithemitspecificerror.ts"
  ],
  "fileInfos": {
    "../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
  "pendingEmit": [
    "Js",
    false
  ],
  "version": "FakeTSVersion",
  "size": 1497
}



Change:: No Change run with emit
Input::


Output::
/lib/tsc -b -v src/project
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/project/tsconfig.json'...

[96msrc/project/src/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/outFile.js]
define("class", ["require", "exports"], function (require, exports) {
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
define("indirectClass", ["require", "exports", "class"], function (require, exports, class_1) {
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
define("directUse", ["require", "exports", "indirectClass"], function (require, exports, indirectClass_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new indirectClass_1.indirectClass().classC.prop;
});
define("indirectUse", ["require", "exports", "indirectClass"], function (require, exports, indirectClass_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new indirectClass_2.indirectClass().classC.prop;
});
define("noChangeFile", ["require", "exports"], function (require, exports) {
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


//// [/src/outFile.tsbuildinfo]
{"fileNames":["../lib/lib.d.ts","./project/src/class.ts","./project/src/indirectclass.ts","./project/src/directuse.ts","./project/src/indirectuse.ts","./project/src/nochangefile.ts","./project/src/nochangefilewithemitspecificerror.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","545032748-export class classC {\n    prop = 1;\n}","6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","6714567633-export function writeLog(s: string) {\n}","-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}"],"root":[[2,7]],"options":{"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[[7,[{"start":18,"length":18,"messageText":"Duplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.","category":1,"code":2396,"skippedOn":"noEmit"}]]],"version":"FakeTSVersion"}

//// [/src/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../lib/lib.d.ts",
    "./project/src/class.ts",
    "./project/src/indirectclass.ts",
    "./project/src/directuse.ts",
    "./project/src/indirectuse.ts",
    "./project/src/nochangefile.ts",
    "./project/src/nochangefilewithemitspecificerror.ts"
  ],
  "fileInfos": {
    "../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
  "version": "FakeTSVersion",
  "size": 1477
}



Change:: No Change run with noEmit
Input::


Output::
/lib/tsc -b -v src/project --noEmit
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/project/tsconfig.json'...

exitCode:: ExitStatus.Success




Change:: No Change run with noEmit
Input::


Output::
/lib/tsc -b -v src/project --noEmit
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/project/tsconfig.json'...

exitCode:: ExitStatus.Success




Change:: No Change run with emit
Input::


Output::
/lib/tsc -b -v src/project
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project/tsconfig.json' is out of date because buildinfo file 'src/outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/src/project/tsconfig.json'...

[96msrc/project/src/noChangeFileWithEmitSpecificError.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2396: [0mDuplicate identifier 'arguments'. Compiler uses 'arguments' to initialize rest parameters.

[7m1[0m function someFunc(arguments: boolean, ...rest: any[]) {
[7m [0m [91m                  ~~~~~~~~~~~~~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


