currentDirectory:: /home/src/workspaces/solution useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/solution/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "projects/server"
    },
    {
      "path": "projects/shared"
    }
  ]
}

//// [/home/src/workspaces/solution/projects/shared/src/myClass.ts]
export class MyClass { }

//// [/home/src/workspaces/solution/projects/shared/src/logging.ts]
export function log(str: string) {
    console.log(str);
}


//// [/home/src/workspaces/solution/projects/shared/src/random.ts]
export function randomFn(str: string) {
    console.log(str);
}


//// [/home/src/workspaces/solution/projects/shared/tsconfig.json]
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": [
    "src/**/*.ts"
  ]
}

//// [/home/src/workspaces/solution/projects/server/src/server.ts]
import { MyClass } from ':shared/myClass.js';
console.log('Hello, world!');


//// [/home/src/workspaces/solution/projects/server/tsconfig.json]
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "baseUrl": "./src",
    "rootDir": "..",
    "outDir": "./dist",
    "paths": {
      ":shared/*": [
        "../../shared/src/*"
      ]
    }
  },
  "include": [
    "../shared/src/**/*.ts",
    "src/**/*.ts"
  ],
  "references": [
    {
      "path": "../shared"
    }
  ]
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


/home/src/tslibs/TS/Lib/tsc.js --b projects/server -v --traceResolution --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * projects/shared/tsconfig.json
    * projects/server/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'projects/shared/tsconfig.json' is out of date because output file 'projects/shared/dist/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/projects/shared/tsconfig.json'...

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
projects/shared/src/logging.ts
  Matched by include pattern 'src/**/*.ts' in 'projects/shared/tsconfig.json'
projects/shared/src/myClass.ts
  Matched by include pattern 'src/**/*.ts' in 'projects/shared/tsconfig.json'
projects/shared/src/random.ts
  Matched by include pattern 'src/**/*.ts' in 'projects/shared/tsconfig.json'
[[90mHH:MM:SS AM[0m] Project 'projects/server/tsconfig.json' is out of date because output file 'projects/server/dist/server/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/projects/server/tsconfig.json'...

======== Resolving module ':shared/myClass.js' from '/home/src/workspaces/solution/projects/server/src/server.ts'. ========
Module resolution kind is not specified, using 'Node10'.
'baseUrl' option is set to '/home/src/workspaces/solution/projects/server/src', using this value to resolve non-relative module name ':shared/myClass.js'.
'paths' option is specified, looking for a pattern to match module name ':shared/myClass.js'.
Module name ':shared/myClass.js', matched pattern ':shared/*'.
Trying substitution '../../shared/src/*', candidate module location: '../../shared/src/myClass.js'.
Loading module as file / folder, candidate module location '/home/src/workspaces/solution/projects/shared/src/myClass.js', target file types: TypeScript, Declaration.
File name '/home/src/workspaces/solution/projects/shared/src/myClass.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/solution/projects/shared/src/myClass.ts' exists - use it as a name resolution result.
======== Module name ':shared/myClass.js' was successfully resolved to '/home/src/workspaces/solution/projects/shared/src/myClass.ts'. ========
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
projects/shared/dist/src/logging.d.ts
  Matched by include pattern '../shared/src/**/*.ts' in 'projects/server/tsconfig.json'
  File is output of project reference source 'projects/shared/src/logging.ts'
projects/shared/dist/src/myClass.d.ts
  Matched by include pattern '../shared/src/**/*.ts' in 'projects/server/tsconfig.json'
  Imported via ':shared/myClass.js' from file 'projects/server/src/server.ts'
  File is output of project reference source 'projects/shared/src/myClass.ts'
projects/shared/dist/src/random.d.ts
  Matched by include pattern '../shared/src/**/*.ts' in 'projects/server/tsconfig.json'
  File is output of project reference source 'projects/shared/src/random.ts'
projects/server/src/server.ts
  Matched by include pattern 'src/**/*.ts' in 'projects/server/tsconfig.json'


//// [/home/src/workspaces/solution/projects/shared/dist/src/logging.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = log;
function log(str) {
    console.log(str);
}


//// [/home/src/workspaces/solution/projects/shared/dist/src/logging.d.ts]
export declare function log(str: string): void;


//// [/home/src/workspaces/solution/projects/shared/dist/src/myClass.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClass = void 0;
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    return MyClass;
}());
exports.MyClass = MyClass;


//// [/home/src/workspaces/solution/projects/shared/dist/src/myClass.d.ts]
export declare class MyClass {
}


//// [/home/src/workspaces/solution/projects/shared/dist/src/random.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomFn = randomFn;
function randomFn(str) {
    console.log(str);
}


//// [/home/src/workspaces/solution/projects/shared/dist/src/random.d.ts]
export declare function randomFn(str: string): void;


//// [/home/src/workspaces/solution/projects/shared/dist/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../tslibs/ts/lib/lib.d.ts","../src/logging.ts","../src/myclass.ts","../src/random.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-1222780632-export function log(str: string) {\n    console.log(str);\n}\n","signature":"2292560907-export declare function log(str: string): void;\n"},{"version":"-10369713935-export class MyClass { }","signature":"-7943199723-export declare class MyClass {\n}\n"},{"version":"4380863035-export function randomFn(str: string) {\n    console.log(str);\n}\n","signature":"-1751303682-export declare function randomFn(str: string): void;\n"}],"root":[[2,4]],"options":{"composite":true,"outDir":"./"},"latestChangedDtsFile":"./src/random.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/projects/shared/dist/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../tslibs/ts/lib/lib.d.ts",
    "../src/logging.ts",
    "../src/myclass.ts",
    "../src/random.ts"
  ],
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../src/logging.ts": {
      "original": {
        "version": "-1222780632-export function log(str: string) {\n    console.log(str);\n}\n",
        "signature": "2292560907-export declare function log(str: string): void;\n"
      },
      "version": "-1222780632-export function log(str: string) {\n    console.log(str);\n}\n",
      "signature": "2292560907-export declare function log(str: string): void;\n"
    },
    "../src/myclass.ts": {
      "original": {
        "version": "-10369713935-export class MyClass { }",
        "signature": "-7943199723-export declare class MyClass {\n}\n"
      },
      "version": "-10369713935-export class MyClass { }",
      "signature": "-7943199723-export declare class MyClass {\n}\n"
    },
    "../src/random.ts": {
      "original": {
        "version": "4380863035-export function randomFn(str: string) {\n    console.log(str);\n}\n",
        "signature": "-1751303682-export declare function randomFn(str: string): void;\n"
      },
      "version": "4380863035-export function randomFn(str: string) {\n    console.log(str);\n}\n",
      "signature": "-1751303682-export declare function randomFn(str: string): void;\n"
    }
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "../src/logging.ts",
        "../src/myclass.ts",
        "../src/random.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./"
  },
  "latestChangedDtsFile": "./src/random.d.ts",
  "version": "FakeTSVersion",
  "size": 1186
}

//// [/home/src/workspaces/solution/projects/server/dist/server/src/server.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log('Hello, world!');


//// [/home/src/workspaces/solution/projects/server/dist/server/src/server.d.ts]
export {};


//// [/home/src/workspaces/solution/projects/server/dist/server/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../../tslibs/ts/lib/lib.d.ts","../../../shared/dist/src/logging.d.ts","../../../shared/dist/src/myclass.d.ts","../../../shared/dist/src/random.d.ts","../../src/server.ts","../../../shared/src/logging.ts","../../../shared/src/myclass.ts","../../../shared/src/random.ts"],"fileIdsList":[[3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"2292560907-export declare function log(str: string): void;\n","-7943199723-export declare class MyClass {\n}\n","-1751303682-export declare function randomFn(str: string): void;\n",{"version":"-19159694382-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');\n","signature":"-3531856636-export {};\n"}],"root":[[2,5]],"resolvedRoot":[[2,6],[3,7],[4,8]],"options":{"composite":true,"outDir":"..","rootDir":"../../.."},"referencedMap":[[5,1]],"latestChangedDtsFile":"./src/server.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/projects/server/dist/server/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../../tslibs/ts/lib/lib.d.ts",
    "../../../shared/dist/src/logging.d.ts",
    "../../../shared/dist/src/myclass.d.ts",
    "../../../shared/dist/src/random.d.ts",
    "../../src/server.ts",
    "../../../shared/src/logging.ts",
    "../../../shared/src/myclass.ts",
    "../../../shared/src/random.ts"
  ],
  "fileIdsList": [
    [
      "../../../shared/dist/src/myclass.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../../../shared/dist/src/logging.d.ts": {
      "version": "2292560907-export declare function log(str: string): void;\n",
      "signature": "2292560907-export declare function log(str: string): void;\n"
    },
    "../../../shared/dist/src/myclass.d.ts": {
      "version": "-7943199723-export declare class MyClass {\n}\n",
      "signature": "-7943199723-export declare class MyClass {\n}\n"
    },
    "../../../shared/dist/src/random.d.ts": {
      "version": "-1751303682-export declare function randomFn(str: string): void;\n",
      "signature": "-1751303682-export declare function randomFn(str: string): void;\n"
    },
    "../../src/server.ts": {
      "original": {
        "version": "-19159694382-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');\n",
        "signature": "-3531856636-export {};\n"
      },
      "version": "-19159694382-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');\n",
      "signature": "-3531856636-export {};\n"
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "../../../shared/dist/src/logging.d.ts",
        "../../../shared/dist/src/myclass.d.ts",
        "../../../shared/dist/src/random.d.ts",
        "../../src/server.ts"
      ]
    ]
  ],
  "resolvedRoot": [
    [
      [
        2,
        6
      ],
      [
        "../../../shared/dist/src/logging.d.ts",
        "../../../shared/src/logging.ts"
      ]
    ],
    [
      [
        3,
        7
      ],
      [
        "../../../shared/dist/src/myclass.d.ts",
        "../../../shared/src/myclass.ts"
      ]
    ],
    [
      [
        4,
        8
      ],
      [
        "../../../shared/dist/src/random.d.ts",
        "../../../shared/src/random.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "..",
    "rootDir": "../../.."
  },
  "referencedMap": {
    "../../src/server.ts": [
      "../../../shared/dist/src/myclass.d.ts"
    ]
  },
  "latestChangedDtsFile": "./src/server.d.ts",
  "version": "FakeTSVersion",
  "size": 1344
}


exitCode:: ExitStatus.Success

Change:: No change

Input::

/home/src/tslibs/TS/Lib/tsc.js --b projects/server -v --traceResolution --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * projects/shared/tsconfig.json
    * projects/server/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'projects/shared/tsconfig.json' is up to date because newest input 'projects/shared/src/random.ts' is older than output 'projects/shared/dist/tsconfig.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'projects/server/tsconfig.json' is up to date because newest input 'projects/server/src/server.ts' is older than output 'projects/server/dist/server/tsconfig.tsbuildinfo'




exitCode:: ExitStatus.Success

Change:: edit logging file

Input::
//// [/home/src/workspaces/solution/projects/shared/src/logging.ts]
export function log(str: string) {
    console.log(str);
}
export const x = 10;


/home/src/tslibs/TS/Lib/tsc.js --b projects/server -v --traceResolution --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * projects/shared/tsconfig.json
    * projects/server/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'projects/shared/tsconfig.json' is out of date because output 'projects/shared/dist/tsconfig.tsbuildinfo' is older than input 'projects/shared/src/logging.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/projects/shared/tsconfig.json'...

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
projects/shared/src/logging.ts
  Matched by include pattern 'src/**/*.ts' in 'projects/shared/tsconfig.json'
projects/shared/src/myClass.ts
  Matched by include pattern 'src/**/*.ts' in 'projects/shared/tsconfig.json'
projects/shared/src/random.ts
  Matched by include pattern 'src/**/*.ts' in 'projects/shared/tsconfig.json'
[[90mHH:MM:SS AM[0m] Project 'projects/server/tsconfig.json' is out of date because output 'projects/server/dist/server/tsconfig.tsbuildinfo' is older than input 'projects/shared/src/logging.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/projects/server/tsconfig.json'...

======== Resolving module ':shared/myClass.js' from '/home/src/workspaces/solution/projects/server/src/server.ts'. ========
Module resolution kind is not specified, using 'Node10'.
'baseUrl' option is set to '/home/src/workspaces/solution/projects/server/src', using this value to resolve non-relative module name ':shared/myClass.js'.
'paths' option is specified, looking for a pattern to match module name ':shared/myClass.js'.
Module name ':shared/myClass.js', matched pattern ':shared/*'.
Trying substitution '../../shared/src/*', candidate module location: '../../shared/src/myClass.js'.
Loading module as file / folder, candidate module location '/home/src/workspaces/solution/projects/shared/src/myClass.js', target file types: TypeScript, Declaration.
File name '/home/src/workspaces/solution/projects/shared/src/myClass.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/solution/projects/shared/src/myClass.ts' exists - use it as a name resolution result.
======== Module name ':shared/myClass.js' was successfully resolved to '/home/src/workspaces/solution/projects/shared/src/myClass.ts'. ========
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
projects/shared/dist/src/logging.d.ts
  Matched by include pattern '../shared/src/**/*.ts' in 'projects/server/tsconfig.json'
  File is output of project reference source 'projects/shared/src/logging.ts'
projects/shared/dist/src/myClass.d.ts
  Matched by include pattern '../shared/src/**/*.ts' in 'projects/server/tsconfig.json'
  Imported via ':shared/myClass.js' from file 'projects/server/src/server.ts'
  File is output of project reference source 'projects/shared/src/myClass.ts'
projects/shared/dist/src/random.d.ts
  Matched by include pattern '../shared/src/**/*.ts' in 'projects/server/tsconfig.json'
  File is output of project reference source 'projects/shared/src/random.ts'
projects/server/src/server.ts
  Matched by include pattern 'src/**/*.ts' in 'projects/server/tsconfig.json'


//// [/home/src/workspaces/solution/projects/shared/dist/src/logging.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.log = log;
function log(str) {
    console.log(str);
}
exports.x = 10;


//// [/home/src/workspaces/solution/projects/shared/dist/src/logging.d.ts]
export declare function log(str: string): void;
export declare const x = 10;


//// [/home/src/workspaces/solution/projects/shared/dist/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../tslibs/ts/lib/lib.d.ts","../src/logging.ts","../src/myclass.ts","../src/random.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"483739938-export function log(str: string) {\n    console.log(str);\n}\nexport const x = 10;","signature":"-4937597761-export declare function log(str: string): void;\nexport declare const x = 10;\n"},{"version":"-10369713935-export class MyClass { }","signature":"-7943199723-export declare class MyClass {\n}\n"},{"version":"4380863035-export function randomFn(str: string) {\n    console.log(str);\n}\n","signature":"-1751303682-export declare function randomFn(str: string): void;\n"}],"root":[[2,4]],"options":{"composite":true,"outDir":"./"},"latestChangedDtsFile":"./src/logging.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/projects/shared/dist/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../tslibs/ts/lib/lib.d.ts",
    "../src/logging.ts",
    "../src/myclass.ts",
    "../src/random.ts"
  ],
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../src/logging.ts": {
      "original": {
        "version": "483739938-export function log(str: string) {\n    console.log(str);\n}\nexport const x = 10;",
        "signature": "-4937597761-export declare function log(str: string): void;\nexport declare const x = 10;\n"
      },
      "version": "483739938-export function log(str: string) {\n    console.log(str);\n}\nexport const x = 10;",
      "signature": "-4937597761-export declare function log(str: string): void;\nexport declare const x = 10;\n"
    },
    "../src/myclass.ts": {
      "original": {
        "version": "-10369713935-export class MyClass { }",
        "signature": "-7943199723-export declare class MyClass {\n}\n"
      },
      "version": "-10369713935-export class MyClass { }",
      "signature": "-7943199723-export declare class MyClass {\n}\n"
    },
    "../src/random.ts": {
      "original": {
        "version": "4380863035-export function randomFn(str: string) {\n    console.log(str);\n}\n",
        "signature": "-1751303682-export declare function randomFn(str: string): void;\n"
      },
      "version": "4380863035-export function randomFn(str: string) {\n    console.log(str);\n}\n",
      "signature": "-1751303682-export declare function randomFn(str: string): void;\n"
    }
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "../src/logging.ts",
        "../src/myclass.ts",
        "../src/random.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./"
  },
  "latestChangedDtsFile": "./src/logging.d.ts",
  "version": "FakeTSVersion",
  "size": 1236
}

//// [/home/src/workspaces/solution/projects/server/dist/server/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../../tslibs/ts/lib/lib.d.ts","../../../shared/dist/src/logging.d.ts","../../../shared/dist/src/myclass.d.ts","../../../shared/dist/src/random.d.ts","../../src/server.ts","../../../shared/src/logging.ts","../../../shared/src/myclass.ts","../../../shared/src/random.ts"],"fileIdsList":[[3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-4937597761-export declare function log(str: string): void;\nexport declare const x = 10;\n","-7943199723-export declare class MyClass {\n}\n","-1751303682-export declare function randomFn(str: string): void;\n",{"version":"-19159694382-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');\n","signature":"-3531856636-export {};\n"}],"root":[[2,5]],"resolvedRoot":[[2,6],[3,7],[4,8]],"options":{"composite":true,"outDir":"..","rootDir":"../../.."},"referencedMap":[[5,1]],"latestChangedDtsFile":"./src/server.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/projects/server/dist/server/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../../tslibs/ts/lib/lib.d.ts",
    "../../../shared/dist/src/logging.d.ts",
    "../../../shared/dist/src/myclass.d.ts",
    "../../../shared/dist/src/random.d.ts",
    "../../src/server.ts",
    "../../../shared/src/logging.ts",
    "../../../shared/src/myclass.ts",
    "../../../shared/src/random.ts"
  ],
  "fileIdsList": [
    [
      "../../../shared/dist/src/myclass.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../../../shared/dist/src/logging.d.ts": {
      "version": "-4937597761-export declare function log(str: string): void;\nexport declare const x = 10;\n",
      "signature": "-4937597761-export declare function log(str: string): void;\nexport declare const x = 10;\n"
    },
    "../../../shared/dist/src/myclass.d.ts": {
      "version": "-7943199723-export declare class MyClass {\n}\n",
      "signature": "-7943199723-export declare class MyClass {\n}\n"
    },
    "../../../shared/dist/src/random.d.ts": {
      "version": "-1751303682-export declare function randomFn(str: string): void;\n",
      "signature": "-1751303682-export declare function randomFn(str: string): void;\n"
    },
    "../../src/server.ts": {
      "original": {
        "version": "-19159694382-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');\n",
        "signature": "-3531856636-export {};\n"
      },
      "version": "-19159694382-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');\n",
      "signature": "-3531856636-export {};\n"
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "../../../shared/dist/src/logging.d.ts",
        "../../../shared/dist/src/myclass.d.ts",
        "../../../shared/dist/src/random.d.ts",
        "../../src/server.ts"
      ]
    ]
  ],
  "resolvedRoot": [
    [
      [
        2,
        6
      ],
      [
        "../../../shared/dist/src/logging.d.ts",
        "../../../shared/src/logging.ts"
      ]
    ],
    [
      [
        3,
        7
      ],
      [
        "../../../shared/dist/src/myclass.d.ts",
        "../../../shared/src/myclass.ts"
      ]
    ],
    [
      [
        4,
        8
      ],
      [
        "../../../shared/dist/src/random.d.ts",
        "../../../shared/src/random.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "..",
    "rootDir": "../../.."
  },
  "referencedMap": {
    "../../src/server.ts": [
      "../../../shared/dist/src/myclass.d.ts"
    ]
  },
  "latestChangedDtsFile": "./src/server.d.ts",
  "version": "FakeTSVersion",
  "size": 1375
}


exitCode:: ExitStatus.Success

Change:: No change

Input::

/home/src/tslibs/TS/Lib/tsc.js --b projects/server -v --traceResolution --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * projects/shared/tsconfig.json
    * projects/server/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'projects/shared/tsconfig.json' is up to date because newest input 'projects/shared/src/logging.ts' is older than output 'projects/shared/dist/tsconfig.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'projects/server/tsconfig.json' is up to date because newest input 'projects/shared/src/logging.ts' is older than output 'projects/server/dist/server/tsconfig.tsbuildinfo'




exitCode:: ExitStatus.Success

Change:: delete random file

Input::
//// [/home/src/workspaces/solution/projects/shared/src/random.ts] deleted

/home/src/tslibs/TS/Lib/tsc.js --b projects/server -v --traceResolution --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * projects/shared/tsconfig.json
    * projects/server/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'projects/shared/tsconfig.json' is out of date because buildinfo file 'projects/shared/dist/tsconfig.tsbuildinfo' indicates that file 'projects/shared/src/random.ts' was root file of compilation but not any more.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/projects/shared/tsconfig.json'...

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
projects/shared/src/logging.ts
  Matched by include pattern 'src/**/*.ts' in 'projects/shared/tsconfig.json'
projects/shared/src/myClass.ts
  Matched by include pattern 'src/**/*.ts' in 'projects/shared/tsconfig.json'
[[90mHH:MM:SS AM[0m] Project 'projects/server/tsconfig.json' is out of date because buildinfo file 'projects/server/dist/server/tsconfig.tsbuildinfo' indicates that file 'projects/shared/src/random.ts' was root file of compilation but not any more.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/projects/server/tsconfig.json'...

======== Resolving module ':shared/myClass.js' from '/home/src/workspaces/solution/projects/server/src/server.ts'. ========
Module resolution kind is not specified, using 'Node10'.
'baseUrl' option is set to '/home/src/workspaces/solution/projects/server/src', using this value to resolve non-relative module name ':shared/myClass.js'.
'paths' option is specified, looking for a pattern to match module name ':shared/myClass.js'.
Module name ':shared/myClass.js', matched pattern ':shared/*'.
Trying substitution '../../shared/src/*', candidate module location: '../../shared/src/myClass.js'.
Loading module as file / folder, candidate module location '/home/src/workspaces/solution/projects/shared/src/myClass.js', target file types: TypeScript, Declaration.
File name '/home/src/workspaces/solution/projects/shared/src/myClass.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/solution/projects/shared/src/myClass.ts' exists - use it as a name resolution result.
======== Module name ':shared/myClass.js' was successfully resolved to '/home/src/workspaces/solution/projects/shared/src/myClass.ts'. ========
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
projects/shared/dist/src/logging.d.ts
  Matched by include pattern '../shared/src/**/*.ts' in 'projects/server/tsconfig.json'
  File is output of project reference source 'projects/shared/src/logging.ts'
projects/shared/dist/src/myClass.d.ts
  Matched by include pattern '../shared/src/**/*.ts' in 'projects/server/tsconfig.json'
  Imported via ':shared/myClass.js' from file 'projects/server/src/server.ts'
  File is output of project reference source 'projects/shared/src/myClass.ts'
projects/server/src/server.ts
  Matched by include pattern 'src/**/*.ts' in 'projects/server/tsconfig.json'


//// [/home/src/workspaces/solution/projects/shared/dist/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../tslibs/ts/lib/lib.d.ts","../src/logging.ts","../src/myclass.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"483739938-export function log(str: string) {\n    console.log(str);\n}\nexport const x = 10;","signature":"-4937597761-export declare function log(str: string): void;\nexport declare const x = 10;\n"},{"version":"-10369713935-export class MyClass { }","signature":"-7943199723-export declare class MyClass {\n}\n"}],"root":[2,3],"options":{"composite":true,"outDir":"./"},"latestChangedDtsFile":"./src/logging.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/projects/shared/dist/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../tslibs/ts/lib/lib.d.ts",
    "../src/logging.ts",
    "../src/myclass.ts"
  ],
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../src/logging.ts": {
      "original": {
        "version": "483739938-export function log(str: string) {\n    console.log(str);\n}\nexport const x = 10;",
        "signature": "-4937597761-export declare function log(str: string): void;\nexport declare const x = 10;\n"
      },
      "version": "483739938-export function log(str: string) {\n    console.log(str);\n}\nexport const x = 10;",
      "signature": "-4937597761-export declare function log(str: string): void;\nexport declare const x = 10;\n"
    },
    "../src/myclass.ts": {
      "original": {
        "version": "-10369713935-export class MyClass { }",
        "signature": "-7943199723-export declare class MyClass {\n}\n"
      },
      "version": "-10369713935-export class MyClass { }",
      "signature": "-7943199723-export declare class MyClass {\n}\n"
    }
  },
  "root": [
    [
      2,
      "../src/logging.ts"
    ],
    [
      3,
      "../src/myclass.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./"
  },
  "latestChangedDtsFile": "./src/logging.d.ts",
  "version": "FakeTSVersion",
  "size": 1041
}

//// [/home/src/workspaces/solution/projects/server/dist/server/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../../tslibs/ts/lib/lib.d.ts","../../../shared/dist/src/logging.d.ts","../../../shared/dist/src/myclass.d.ts","../../src/server.ts","../../../shared/src/logging.ts","../../../shared/src/myclass.ts"],"fileIdsList":[[3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-4937597761-export declare function log(str: string): void;\nexport declare const x = 10;\n","-7943199723-export declare class MyClass {\n}\n",{"version":"-19159694382-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');\n","signature":"-3531856636-export {};\n"}],"root":[[2,4]],"resolvedRoot":[[2,5],[3,6]],"options":{"composite":true,"outDir":"..","rootDir":"../../.."},"referencedMap":[[4,1]],"latestChangedDtsFile":"./src/server.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/projects/server/dist/server/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../../tslibs/ts/lib/lib.d.ts",
    "../../../shared/dist/src/logging.d.ts",
    "../../../shared/dist/src/myclass.d.ts",
    "../../src/server.ts",
    "../../../shared/src/logging.ts",
    "../../../shared/src/myclass.ts"
  ],
  "fileIdsList": [
    [
      "../../../shared/dist/src/myclass.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../../../shared/dist/src/logging.d.ts": {
      "version": "-4937597761-export declare function log(str: string): void;\nexport declare const x = 10;\n",
      "signature": "-4937597761-export declare function log(str: string): void;\nexport declare const x = 10;\n"
    },
    "../../../shared/dist/src/myclass.d.ts": {
      "version": "-7943199723-export declare class MyClass {\n}\n",
      "signature": "-7943199723-export declare class MyClass {\n}\n"
    },
    "../../src/server.ts": {
      "original": {
        "version": "-19159694382-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');\n",
        "signature": "-3531856636-export {};\n"
      },
      "version": "-19159694382-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');\n",
      "signature": "-3531856636-export {};\n"
    }
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "../../../shared/dist/src/logging.d.ts",
        "../../../shared/dist/src/myclass.d.ts",
        "../../src/server.ts"
      ]
    ]
  ],
  "resolvedRoot": [
    [
      [
        2,
        5
      ],
      [
        "../../../shared/dist/src/logging.d.ts",
        "../../../shared/src/logging.ts"
      ]
    ],
    [
      [
        3,
        6
      ],
      [
        "../../../shared/dist/src/myclass.d.ts",
        "../../../shared/src/myclass.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "..",
    "rootDir": "../../.."
  },
  "referencedMap": {
    "../../src/server.ts": [
      "../../../shared/dist/src/myclass.d.ts"
    ]
  },
  "latestChangedDtsFile": "./src/server.d.ts",
  "version": "FakeTSVersion",
  "size": 1229
}


exitCode:: ExitStatus.Success

Change:: No change

Input::

/home/src/tslibs/TS/Lib/tsc.js --b projects/server -v --traceResolution --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * projects/shared/tsconfig.json
    * projects/server/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'projects/shared/tsconfig.json' is up to date because newest input 'projects/shared/src/logging.ts' is older than output 'projects/shared/dist/tsconfig.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'projects/server/tsconfig.json' is up to date because newest input 'projects/shared/src/logging.ts' is older than output 'projects/server/dist/server/tsconfig.tsbuildinfo'




exitCode:: ExitStatus.Success
