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
    "outFile": "../outFile.js",
    "module": "amd"
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


/home/src/tslibs/TS/Lib/tsc.js -b -v . --noEmit
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file '../outFile.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mtsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 2 errors.



//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/src/class.ts","./project/src/indirectclass.ts","./project/src/directuse.ts","./project/src/indirectuse.ts","./project/src/nochangefile.ts","./project/src/nochangefilewithemitspecificerror.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","545032748-export class classC {\n    prop = 1;\n}","6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","6714567633-export function writeLog(s: string) {\n}","-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}"],"root":[[2,7]],"options":{"module":2,"outFile":"./outFile.js"},"changeFileSet":[1,2,4,3,5,6,7],"version":"FakeTSVersion"}

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
    "../tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
  "changeFileSet": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/src/class.ts",
    "./project/src/directuse.ts",
    "./project/src/indirectclass.ts",
    "./project/src/indirectuse.ts",
    "./project/src/nochangefile.ts",
    "./project/src/nochangefilewithemitspecificerror.ts"
  ],
  "version": "FakeTSVersion",
  "size": 1264
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: No Change run with emit

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v .
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mtsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 2 errors.



//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/src/class.ts","./project/src/indirectclass.ts","./project/src/directuse.ts","./project/src/indirectuse.ts","./project/src/nochangefile.ts","./project/src/nochangefilewithemitspecificerror.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","545032748-export class classC {\n    prop = 1;\n}","6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","6714567633-export function writeLog(s: string) {\n}","-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}"],"root":[[2,7]],"options":{"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4,5,6,7],"version":"FakeTSVersion"}

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
    "../tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
      "../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./project/src/class.ts",
      "not cached or not changed"
    ],
    [
      "./project/src/indirectclass.ts",
      "not cached or not changed"
    ],
    [
      "./project/src/directuse.ts",
      "not cached or not changed"
    ],
    [
      "./project/src/indirectuse.ts",
      "not cached or not changed"
    ],
    [
      "./project/src/nochangefile.ts",
      "not cached or not changed"
    ],
    [
      "./project/src/nochangefilewithemitspecificerror.ts",
      "not cached or not changed"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1277
}

//// [/home/src/workspaces/outFile.js]
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



exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: Introduce error with emit

Input::
//// [/home/src/workspaces/project/src/class.ts]
export class classC {
    prop1 = 1;
}


/home/src/tslibs/TS/Lib/tsc.js -b -v .
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mtsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 2 errors.



//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/src/class.ts","./project/src/indirectclass.ts","./project/src/directuse.ts","./project/src/indirectuse.ts","./project/src/nochangefile.ts","./project/src/nochangefilewithemitspecificerror.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","1786859709-export class classC {\n    prop1 = 1;\n}","6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","6714567633-export function writeLog(s: string) {\n}","-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}"],"root":[[2,7]],"options":{"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4,5,6,7],"version":"FakeTSVersion"}

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
    "../tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
      "../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./project/src/class.ts",
      "not cached or not changed"
    ],
    [
      "./project/src/indirectclass.ts",
      "not cached or not changed"
    ],
    [
      "./project/src/directuse.ts",
      "not cached or not changed"
    ],
    [
      "./project/src/indirectuse.ts",
      "not cached or not changed"
    ],
    [
      "./project/src/nochangefile.ts",
      "not cached or not changed"
    ],
    [
      "./project/src/nochangefilewithemitspecificerror.ts",
      "not cached or not changed"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1279
}

//// [/home/src/workspaces/outFile.js]
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

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mtsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 2 errors.



//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/src/class.ts","./project/src/indirectclass.ts","./project/src/directuse.ts","./project/src/indirectuse.ts","./project/src/nochangefile.ts","./project/src/nochangefilewithemitspecificerror.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","545032748-export class classC {\n    prop = 1;\n}","6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","6714567633-export function writeLog(s: string) {\n}","-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}"],"root":[[2,7]],"options":{"module":2,"outFile":"./outFile.js"},"changeFileSet":[2],"version":"FakeTSVersion"}

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
    "../tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
  "changeFileSet": [
    "./project/src/class.ts"
  ],
  "version": "FakeTSVersion",
  "size": 1252
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: No Change run with emit

Input::

/home/src/tslibs/TS/Lib/tsc.js -b -v .
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mtsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m


Found 2 errors.



//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/src/class.ts","./project/src/indirectclass.ts","./project/src/directuse.ts","./project/src/indirectuse.ts","./project/src/nochangefile.ts","./project/src/nochangefilewithemitspecificerror.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","545032748-export class classC {\n    prop = 1;\n}","6324910780-import { classC } from './class';\nexport class indirectClass {\n    classC = new classC();\n}","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","-8953710208-import { indirectClass } from './indirectClass';\nnew indirectClass().classC.prop;","6714567633-export function writeLog(s: string) {\n}","-19339541508-function someFunc(arguments: boolean, ...rest: any[]) {\n}"],"root":[[2,7]],"options":{"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4,5,6,7],"version":"FakeTSVersion"}

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
    "../tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
      "../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./project/src/class.ts",
      "not cached or not changed"
    ],
    [
      "./project/src/indirectclass.ts",
      "not cached or not changed"
    ],
    [
      "./project/src/directuse.ts",
      "not cached or not changed"
    ],
    [
      "./project/src/indirectuse.ts",
      "not cached or not changed"
    ],
    [
      "./project/src/nochangefile.ts",
      "not cached or not changed"
    ],
    [
      "./project/src/nochangefilewithemitspecificerror.ts",
      "not cached or not changed"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1277
}

//// [/home/src/workspaces/outFile.js]
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



exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
