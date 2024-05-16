currentDirectory:: /home/src/workspaces useCaseSensitiveFileNames: false
Input::
//// [/a/lib/lib.d.ts]
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

//// [/home/src/workspaces/projects/server/src/server.ts]
import { MyClass } from ':shared/myClass.js';
console.log('Hello, world!');


//// [/home/src/workspaces/projects/server/tsconfig.json]
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

//// [/home/src/workspaces/projects/shared/src/logging.ts]
export function log(str: string) {
    console.log(str);
}


//// [/home/src/workspaces/projects/shared/src/myClass.ts]
export class MyClass { }

//// [/home/src/workspaces/projects/shared/src/random.ts]
export function randomFn(str: string) {
    console.log(str);
}


//// [/home/src/workspaces/projects/shared/tsconfig.json]
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": [
    "src/**/*.ts"
  ]
}

//// [/home/src/workspaces/tsconfig.json]
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



Output::
/lib/tsc --b projects/server -v --traceResolution --explainFiles
[[90m12:00:23 AM[0m] Projects in this build: 
    * projects/shared/tsconfig.json
    * projects/server/tsconfig.json

[[90m12:00:24 AM[0m] Project 'projects/shared/tsconfig.json' is out of date because output file 'projects/shared/dist/tsconfig.tsbuildinfo' does not exist

[[90m12:00:25 AM[0m] Building project '/home/src/workspaces/projects/shared/tsconfig.json'...

File '/home/src/workspaces/projects/shared/src/package.json' does not exist.
File '/home/src/workspaces/projects/shared/package.json' does not exist.
File '/home/src/workspaces/projects/package.json' does not exist.
File '/home/src/workspaces/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
File '/home/src/workspaces/projects/shared/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/shared/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/shared/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/shared/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/lib/package.json' does not exist.
File '/package.json' does not exist according to earlier cached lookups.
../../../lib/lib.d.ts
  Default library for target 'es5'
projects/shared/src/logging.ts
  Matched by include pattern 'src/**/*.ts' in 'projects/shared/tsconfig.json'
projects/shared/src/myClass.ts
  Matched by include pattern 'src/**/*.ts' in 'projects/shared/tsconfig.json'
projects/shared/src/random.ts
  Matched by include pattern 'src/**/*.ts' in 'projects/shared/tsconfig.json'
[[90m12:00:37 AM[0m] Project 'projects/server/tsconfig.json' is out of date because output file 'projects/server/dist/server/tsconfig.tsbuildinfo' does not exist

[[90m12:00:38 AM[0m] Building project '/home/src/workspaces/projects/server/tsconfig.json'...

File '/home/src/workspaces/projects/shared/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/shared/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/shared/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/shared/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/shared/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/shared/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/server/src/package.json' does not exist.
File '/home/src/workspaces/projects/server/package.json' does not exist.
File '/home/src/workspaces/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module ':shared/myClass.js' from '/home/src/workspaces/projects/server/src/server.ts'. ========
Module resolution kind is not specified, using 'Node10'.
'baseUrl' option is set to '/home/src/workspaces/projects/server/src', using this value to resolve non-relative module name ':shared/myClass.js'.
'paths' option is specified, looking for a pattern to match module name ':shared/myClass.js'.
Module name ':shared/myClass.js', matched pattern ':shared/*'.
Trying substitution '../../shared/src/*', candidate module location: '../../shared/src/myClass.js'.
Loading module as file / folder, candidate module location '/home/src/workspaces/projects/shared/src/myClass.js', target file types: TypeScript, Declaration.
File name '/home/src/workspaces/projects/shared/src/myClass.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/projects/shared/src/myClass.ts' exists - use it as a name resolution result.
======== Module name ':shared/myClass.js' was successfully resolved to '/home/src/workspaces/projects/shared/src/myClass.ts'. ========
File '/lib/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
../../../lib/lib.d.ts
  Default library for target 'es5'
projects/shared/src/logging.ts
  Matched by include pattern '../shared/src/**/*.ts' in 'projects/server/tsconfig.json'
projects/shared/src/myClass.ts
  Matched by include pattern '../shared/src/**/*.ts' in 'projects/server/tsconfig.json'
  Imported via ':shared/myClass.js' from file 'projects/server/src/server.ts'
projects/shared/src/random.ts
  Matched by include pattern '../shared/src/**/*.ts' in 'projects/server/tsconfig.json'
projects/server/src/server.ts
  Matched by include pattern 'src/**/*.ts' in 'projects/server/tsconfig.json'
exitCode:: ExitStatus.Success


//// [/home/src/workspaces/projects/server/dist/server/src/server.d.ts]
export {};


//// [/home/src/workspaces/projects/server/dist/server/src/server.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log('Hello, world!');


//// [/home/src/workspaces/projects/server/dist/server/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../../lib/lib.d.ts","../../../shared/src/logging.ts","../../../shared/src/myclass.ts","../../../shared/src/random.ts","../../src/server.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-1222780632-export function log(str: string) {\n    console.log(str);\n}\n","signature":"2292560907-export declare function log(str: string): void;\n","impliedFormat":1},{"version":"-10369713935-export class MyClass { }","signature":"-7943199723-export declare class MyClass {\n}\n","impliedFormat":1},{"version":"4380863035-export function randomFn(str: string) {\n    console.log(str);\n}\n","signature":"-1751303682-export declare function randomFn(str: string): void;\n","impliedFormat":1},{"version":"-19159694382-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');\n","signature":"-3531856636-export {};\n","impliedFormat":1}],"root":[[2,5]],"options":{"composite":true,"outDir":"..","rootDir":"../../.."},"fileIdsList":[[3]],"referencedMap":[[5,1]],"semanticDiagnosticsPerFile":[5,2,3,4,1],"latestChangedDtsFile":"./src/server.d.ts"},"version":"FakeTSVersion"}

//// [/home/src/workspaces/projects/server/dist/server/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../../lib/lib.d.ts",
      "../../../shared/src/logging.ts",
      "../../../shared/src/myclass.ts",
      "../../../shared/src/random.ts",
      "../../src/server.ts"
    ],
    "fileNamesList": [
      [
        "../../../shared/src/myclass.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../../../shared/src/logging.ts": {
        "original": {
          "version": "-1222780632-export function log(str: string) {\n    console.log(str);\n}\n",
          "signature": "2292560907-export declare function log(str: string): void;\n",
          "impliedFormat": 1
        },
        "version": "-1222780632-export function log(str: string) {\n    console.log(str);\n}\n",
        "signature": "2292560907-export declare function log(str: string): void;\n",
        "impliedFormat": "commonjs"
      },
      "../../../shared/src/myclass.ts": {
        "original": {
          "version": "-10369713935-export class MyClass { }",
          "signature": "-7943199723-export declare class MyClass {\n}\n",
          "impliedFormat": 1
        },
        "version": "-10369713935-export class MyClass { }",
        "signature": "-7943199723-export declare class MyClass {\n}\n",
        "impliedFormat": "commonjs"
      },
      "../../../shared/src/random.ts": {
        "original": {
          "version": "4380863035-export function randomFn(str: string) {\n    console.log(str);\n}\n",
          "signature": "-1751303682-export declare function randomFn(str: string): void;\n",
          "impliedFormat": 1
        },
        "version": "4380863035-export function randomFn(str: string) {\n    console.log(str);\n}\n",
        "signature": "-1751303682-export declare function randomFn(str: string): void;\n",
        "impliedFormat": "commonjs"
      },
      "../../src/server.ts": {
        "original": {
          "version": "-19159694382-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');\n",
          "signature": "-3531856636-export {};\n",
          "impliedFormat": 1
        },
        "version": "-19159694382-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');\n",
        "signature": "-3531856636-export {};\n",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        [
          2,
          5
        ],
        [
          "../../../shared/src/logging.ts",
          "../../../shared/src/myclass.ts",
          "../../../shared/src/random.ts",
          "../../src/server.ts"
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
        "../../../shared/src/myclass.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../src/server.ts",
      "../../../shared/src/logging.ts",
      "../../../shared/src/myclass.ts",
      "../../../shared/src/random.ts",
      "../../../../../../../lib/lib.d.ts"
    ],
    "latestChangedDtsFile": "./src/server.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1596
}

//// [/home/src/workspaces/projects/server/dist/shared/src/logging.d.ts]
export declare function log(str: string): void;


//// [/home/src/workspaces/projects/server/dist/shared/src/logging.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = log;
function log(str) {
    console.log(str);
}


//// [/home/src/workspaces/projects/server/dist/shared/src/myClass.d.ts]
export declare class MyClass {
}


//// [/home/src/workspaces/projects/server/dist/shared/src/myClass.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClass = void 0;
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    return MyClass;
}());
exports.MyClass = MyClass;


//// [/home/src/workspaces/projects/server/dist/shared/src/random.d.ts]
export declare function randomFn(str: string): void;


//// [/home/src/workspaces/projects/server/dist/shared/src/random.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomFn = randomFn;
function randomFn(str) {
    console.log(str);
}


//// [/home/src/workspaces/projects/shared/dist/src/logging.d.ts]
export declare function log(str: string): void;


//// [/home/src/workspaces/projects/shared/dist/src/logging.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = log;
function log(str) {
    console.log(str);
}


//// [/home/src/workspaces/projects/shared/dist/src/myClass.d.ts]
export declare class MyClass {
}


//// [/home/src/workspaces/projects/shared/dist/src/myClass.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClass = void 0;
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    return MyClass;
}());
exports.MyClass = MyClass;


//// [/home/src/workspaces/projects/shared/dist/src/random.d.ts]
export declare function randomFn(str: string): void;


//// [/home/src/workspaces/projects/shared/dist/src/random.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomFn = randomFn;
function randomFn(str) {
    console.log(str);
}


//// [/home/src/workspaces/projects/shared/dist/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../lib/lib.d.ts","../src/logging.ts","../src/myclass.ts","../src/random.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-1222780632-export function log(str: string) {\n    console.log(str);\n}\n","signature":"2292560907-export declare function log(str: string): void;\n","impliedFormat":1},{"version":"-10369713935-export class MyClass { }","signature":"-7943199723-export declare class MyClass {\n}\n","impliedFormat":1},{"version":"4380863035-export function randomFn(str: string) {\n    console.log(str);\n}\n","signature":"-1751303682-export declare function randomFn(str: string): void;\n","impliedFormat":1}],"root":[[2,4]],"options":{"composite":true,"outDir":"./"},"referencedMap":[],"semanticDiagnosticsPerFile":[2,3,4,1],"latestChangedDtsFile":"./src/random.d.ts"},"version":"FakeTSVersion"}

//// [/home/src/workspaces/projects/shared/dist/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../lib/lib.d.ts",
      "../src/logging.ts",
      "../src/myclass.ts",
      "../src/random.ts"
    ],
    "fileInfos": {
      "../../../../../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../src/logging.ts": {
        "original": {
          "version": "-1222780632-export function log(str: string) {\n    console.log(str);\n}\n",
          "signature": "2292560907-export declare function log(str: string): void;\n",
          "impliedFormat": 1
        },
        "version": "-1222780632-export function log(str: string) {\n    console.log(str);\n}\n",
        "signature": "2292560907-export declare function log(str: string): void;\n",
        "impliedFormat": "commonjs"
      },
      "../src/myclass.ts": {
        "original": {
          "version": "-10369713935-export class MyClass { }",
          "signature": "-7943199723-export declare class MyClass {\n}\n",
          "impliedFormat": 1
        },
        "version": "-10369713935-export class MyClass { }",
        "signature": "-7943199723-export declare class MyClass {\n}\n",
        "impliedFormat": "commonjs"
      },
      "../src/random.ts": {
        "original": {
          "version": "4380863035-export function randomFn(str: string) {\n    console.log(str);\n}\n",
          "signature": "-1751303682-export declare function randomFn(str: string): void;\n",
          "impliedFormat": 1
        },
        "version": "4380863035-export function randomFn(str: string) {\n    console.log(str);\n}\n",
        "signature": "-1751303682-export declare function randomFn(str: string): void;\n",
        "impliedFormat": "commonjs"
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
    "referencedMap": {},
    "semanticDiagnosticsPerFile": [
      "../src/logging.ts",
      "../src/myclass.ts",
      "../src/random.ts",
      "../../../../../../lib/lib.d.ts"
    ],
    "latestChangedDtsFile": "./src/random.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1321
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b projects/server -v --traceResolution --explainFiles
[[90m12:00:55 AM[0m] Projects in this build: 
    * projects/shared/tsconfig.json
    * projects/server/tsconfig.json

[[90m12:00:56 AM[0m] Project 'projects/shared/tsconfig.json' is up to date because newest input 'projects/shared/src/random.ts' is older than output 'projects/shared/dist/tsconfig.tsbuildinfo'

[[90m12:00:57 AM[0m] Project 'projects/server/tsconfig.json' is up to date because newest input 'projects/server/src/server.ts' is older than output 'projects/server/dist/server/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: edit logging file
Input::
//// [/home/src/workspaces/projects/shared/src/logging.ts]
export function log(str: string) {
    console.log(str);
}
export const x = 10;



Output::
/lib/tsc --b projects/server -v --traceResolution --explainFiles
[[90m12:00:59 AM[0m] Projects in this build: 
    * projects/shared/tsconfig.json
    * projects/server/tsconfig.json

[[90m12:01:00 AM[0m] Project 'projects/shared/tsconfig.json' is out of date because output 'projects/shared/dist/tsconfig.tsbuildinfo' is older than input 'projects/shared/src/logging.ts'

[[90m12:01:01 AM[0m] Building project '/home/src/workspaces/projects/shared/tsconfig.json'...

File '/home/src/workspaces/projects/shared/src/package.json' does not exist.
File '/home/src/workspaces/projects/shared/package.json' does not exist.
File '/home/src/workspaces/projects/package.json' does not exist.
File '/home/src/workspaces/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
File '/home/src/workspaces/projects/shared/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/shared/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/shared/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/shared/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/lib/package.json' does not exist.
File '/package.json' does not exist according to earlier cached lookups.
../../../lib/lib.d.ts
  Default library for target 'es5'
projects/shared/src/logging.ts
  Matched by include pattern 'src/**/*.ts' in 'projects/shared/tsconfig.json'
projects/shared/src/myClass.ts
  Matched by include pattern 'src/**/*.ts' in 'projects/shared/tsconfig.json'
projects/shared/src/random.ts
  Matched by include pattern 'src/**/*.ts' in 'projects/shared/tsconfig.json'
[[90m12:01:07 AM[0m] Project 'projects/server/tsconfig.json' is out of date because output 'projects/server/dist/server/tsconfig.tsbuildinfo' is older than input 'projects/shared/src/logging.ts'

[[90m12:01:08 AM[0m] Building project '/home/src/workspaces/projects/server/tsconfig.json'...

File '/home/src/workspaces/projects/shared/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/shared/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/shared/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/shared/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/shared/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/shared/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/server/src/package.json' does not exist.
File '/home/src/workspaces/projects/server/package.json' does not exist.
File '/home/src/workspaces/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module ':shared/myClass.js' from '/home/src/workspaces/projects/server/src/server.ts'. ========
Module resolution kind is not specified, using 'Node10'.
'baseUrl' option is set to '/home/src/workspaces/projects/server/src', using this value to resolve non-relative module name ':shared/myClass.js'.
'paths' option is specified, looking for a pattern to match module name ':shared/myClass.js'.
Module name ':shared/myClass.js', matched pattern ':shared/*'.
Trying substitution '../../shared/src/*', candidate module location: '../../shared/src/myClass.js'.
Loading module as file / folder, candidate module location '/home/src/workspaces/projects/shared/src/myClass.js', target file types: TypeScript, Declaration.
File name '/home/src/workspaces/projects/shared/src/myClass.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/projects/shared/src/myClass.ts' exists - use it as a name resolution result.
======== Module name ':shared/myClass.js' was successfully resolved to '/home/src/workspaces/projects/shared/src/myClass.ts'. ========
File '/lib/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
../../../lib/lib.d.ts
  Default library for target 'es5'
projects/shared/src/logging.ts
  Matched by include pattern '../shared/src/**/*.ts' in 'projects/server/tsconfig.json'
projects/shared/src/myClass.ts
  Matched by include pattern '../shared/src/**/*.ts' in 'projects/server/tsconfig.json'
  Imported via ':shared/myClass.js' from file 'projects/server/src/server.ts'
projects/shared/src/random.ts
  Matched by include pattern '../shared/src/**/*.ts' in 'projects/server/tsconfig.json'
projects/server/src/server.ts
  Matched by include pattern 'src/**/*.ts' in 'projects/server/tsconfig.json'
exitCode:: ExitStatus.Success


//// [/home/src/workspaces/projects/server/dist/server/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../../lib/lib.d.ts","../../../shared/src/logging.ts","../../../shared/src/myclass.ts","../../../shared/src/random.ts","../../src/server.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"483739938-export function log(str: string) {\n    console.log(str);\n}\nexport const x = 10;","signature":"-4937597761-export declare function log(str: string): void;\nexport declare const x = 10;\n","impliedFormat":1},{"version":"-10369713935-export class MyClass { }","signature":"-7943199723-export declare class MyClass {\n}\n","impliedFormat":1},{"version":"4380863035-export function randomFn(str: string) {\n    console.log(str);\n}\n","signature":"-1751303682-export declare function randomFn(str: string): void;\n","impliedFormat":1},{"version":"-19159694382-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');\n","signature":"-3531856636-export {};\n","impliedFormat":1}],"root":[[2,5]],"options":{"composite":true,"outDir":"..","rootDir":"../../.."},"fileIdsList":[[3]],"referencedMap":[[5,1]],"semanticDiagnosticsPerFile":[5,2,3,4,1],"latestChangedDtsFile":"../shared/src/logging.d.ts"},"version":"FakeTSVersion"}

//// [/home/src/workspaces/projects/server/dist/server/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../../lib/lib.d.ts",
      "../../../shared/src/logging.ts",
      "../../../shared/src/myclass.ts",
      "../../../shared/src/random.ts",
      "../../src/server.ts"
    ],
    "fileNamesList": [
      [
        "../../../shared/src/myclass.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../../../shared/src/logging.ts": {
        "original": {
          "version": "483739938-export function log(str: string) {\n    console.log(str);\n}\nexport const x = 10;",
          "signature": "-4937597761-export declare function log(str: string): void;\nexport declare const x = 10;\n",
          "impliedFormat": 1
        },
        "version": "483739938-export function log(str: string) {\n    console.log(str);\n}\nexport const x = 10;",
        "signature": "-4937597761-export declare function log(str: string): void;\nexport declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../../../shared/src/myclass.ts": {
        "original": {
          "version": "-10369713935-export class MyClass { }",
          "signature": "-7943199723-export declare class MyClass {\n}\n",
          "impliedFormat": 1
        },
        "version": "-10369713935-export class MyClass { }",
        "signature": "-7943199723-export declare class MyClass {\n}\n",
        "impliedFormat": "commonjs"
      },
      "../../../shared/src/random.ts": {
        "original": {
          "version": "4380863035-export function randomFn(str: string) {\n    console.log(str);\n}\n",
          "signature": "-1751303682-export declare function randomFn(str: string): void;\n",
          "impliedFormat": 1
        },
        "version": "4380863035-export function randomFn(str: string) {\n    console.log(str);\n}\n",
        "signature": "-1751303682-export declare function randomFn(str: string): void;\n",
        "impliedFormat": "commonjs"
      },
      "../../src/server.ts": {
        "original": {
          "version": "-19159694382-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');\n",
          "signature": "-3531856636-export {};\n",
          "impliedFormat": 1
        },
        "version": "-19159694382-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');\n",
        "signature": "-3531856636-export {};\n",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        [
          2,
          5
        ],
        [
          "../../../shared/src/logging.ts",
          "../../../shared/src/myclass.ts",
          "../../../shared/src/random.ts",
          "../../src/server.ts"
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
        "../../../shared/src/myclass.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../src/server.ts",
      "../../../shared/src/logging.ts",
      "../../../shared/src/myclass.ts",
      "../../../shared/src/random.ts",
      "../../../../../../../lib/lib.d.ts"
    ],
    "latestChangedDtsFile": "../shared/src/logging.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1654
}

//// [/home/src/workspaces/projects/server/dist/shared/src/logging.d.ts]
export declare function log(str: string): void;
export declare const x = 10;


//// [/home/src/workspaces/projects/server/dist/shared/src/logging.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.log = log;
function log(str) {
    console.log(str);
}
exports.x = 10;


//// [/home/src/workspaces/projects/shared/dist/src/logging.d.ts]
export declare function log(str: string): void;
export declare const x = 10;


//// [/home/src/workspaces/projects/shared/dist/src/logging.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.log = log;
function log(str) {
    console.log(str);
}
exports.x = 10;


//// [/home/src/workspaces/projects/shared/dist/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../lib/lib.d.ts","../src/logging.ts","../src/myclass.ts","../src/random.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"483739938-export function log(str: string) {\n    console.log(str);\n}\nexport const x = 10;","signature":"-4937597761-export declare function log(str: string): void;\nexport declare const x = 10;\n","impliedFormat":1},{"version":"-10369713935-export class MyClass { }","signature":"-7943199723-export declare class MyClass {\n}\n","impliedFormat":1},{"version":"4380863035-export function randomFn(str: string) {\n    console.log(str);\n}\n","signature":"-1751303682-export declare function randomFn(str: string): void;\n","impliedFormat":1}],"root":[[2,4]],"options":{"composite":true,"outDir":"./"},"referencedMap":[],"semanticDiagnosticsPerFile":[2,3,4,1],"latestChangedDtsFile":"./src/logging.d.ts"},"version":"FakeTSVersion"}

//// [/home/src/workspaces/projects/shared/dist/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../lib/lib.d.ts",
      "../src/logging.ts",
      "../src/myclass.ts",
      "../src/random.ts"
    ],
    "fileInfos": {
      "../../../../../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../src/logging.ts": {
        "original": {
          "version": "483739938-export function log(str: string) {\n    console.log(str);\n}\nexport const x = 10;",
          "signature": "-4937597761-export declare function log(str: string): void;\nexport declare const x = 10;\n",
          "impliedFormat": 1
        },
        "version": "483739938-export function log(str: string) {\n    console.log(str);\n}\nexport const x = 10;",
        "signature": "-4937597761-export declare function log(str: string): void;\nexport declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/myclass.ts": {
        "original": {
          "version": "-10369713935-export class MyClass { }",
          "signature": "-7943199723-export declare class MyClass {\n}\n",
          "impliedFormat": 1
        },
        "version": "-10369713935-export class MyClass { }",
        "signature": "-7943199723-export declare class MyClass {\n}\n",
        "impliedFormat": "commonjs"
      },
      "../src/random.ts": {
        "original": {
          "version": "4380863035-export function randomFn(str: string) {\n    console.log(str);\n}\n",
          "signature": "-1751303682-export declare function randomFn(str: string): void;\n",
          "impliedFormat": 1
        },
        "version": "4380863035-export function randomFn(str: string) {\n    console.log(str);\n}\n",
        "signature": "-1751303682-export declare function randomFn(str: string): void;\n",
        "impliedFormat": "commonjs"
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
    "referencedMap": {},
    "semanticDiagnosticsPerFile": [
      "../src/logging.ts",
      "../src/myclass.ts",
      "../src/random.ts",
      "../../../../../../lib/lib.d.ts"
    ],
    "latestChangedDtsFile": "./src/logging.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1371
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b projects/server -v --traceResolution --explainFiles
[[90m12:01:14 AM[0m] Projects in this build: 
    * projects/shared/tsconfig.json
    * projects/server/tsconfig.json

[[90m12:01:15 AM[0m] Project 'projects/shared/tsconfig.json' is up to date because newest input 'projects/shared/src/logging.ts' is older than output 'projects/shared/dist/tsconfig.tsbuildinfo'

[[90m12:01:16 AM[0m] Project 'projects/server/tsconfig.json' is up to date because newest input 'projects/shared/src/logging.ts' is older than output 'projects/server/dist/server/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: delete random file
Input::
//// [/home/src/workspaces/projects/shared/src/random.ts] unlink


Output::
/lib/tsc --b projects/server -v --traceResolution --explainFiles
[[90m12:01:18 AM[0m] Projects in this build: 
    * projects/shared/tsconfig.json
    * projects/server/tsconfig.json

[[90m12:01:19 AM[0m] Project 'projects/shared/tsconfig.json' is out of date because buildinfo file 'projects/shared/dist/tsconfig.tsbuildinfo' indicates that file 'projects/shared/src/random.ts' was root file of compilation but not any more.

[[90m12:01:20 AM[0m] Building project '/home/src/workspaces/projects/shared/tsconfig.json'...

File '/home/src/workspaces/projects/shared/src/package.json' does not exist.
File '/home/src/workspaces/projects/shared/package.json' does not exist.
File '/home/src/workspaces/projects/package.json' does not exist.
File '/home/src/workspaces/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
File '/home/src/workspaces/projects/shared/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/shared/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/lib/package.json' does not exist.
File '/package.json' does not exist according to earlier cached lookups.
../../../lib/lib.d.ts
  Default library for target 'es5'
projects/shared/src/logging.ts
  Matched by include pattern 'src/**/*.ts' in 'projects/shared/tsconfig.json'
projects/shared/src/myClass.ts
  Matched by include pattern 'src/**/*.ts' in 'projects/shared/tsconfig.json'
[[90m12:01:24 AM[0m] Project 'projects/server/tsconfig.json' is out of date because buildinfo file 'projects/server/dist/server/tsconfig.tsbuildinfo' indicates that file 'projects/shared/src/random.ts' was root file of compilation but not any more.

[[90m12:01:25 AM[0m] Building project '/home/src/workspaces/projects/server/tsconfig.json'...

File '/home/src/workspaces/projects/shared/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/shared/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/shared/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/shared/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/projects/server/src/package.json' does not exist.
File '/home/src/workspaces/projects/server/package.json' does not exist.
File '/home/src/workspaces/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module ':shared/myClass.js' from '/home/src/workspaces/projects/server/src/server.ts'. ========
Module resolution kind is not specified, using 'Node10'.
'baseUrl' option is set to '/home/src/workspaces/projects/server/src', using this value to resolve non-relative module name ':shared/myClass.js'.
'paths' option is specified, looking for a pattern to match module name ':shared/myClass.js'.
Module name ':shared/myClass.js', matched pattern ':shared/*'.
Trying substitution '../../shared/src/*', candidate module location: '../../shared/src/myClass.js'.
Loading module as file / folder, candidate module location '/home/src/workspaces/projects/shared/src/myClass.js', target file types: TypeScript, Declaration.
File name '/home/src/workspaces/projects/shared/src/myClass.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/projects/shared/src/myClass.ts' exists - use it as a name resolution result.
======== Module name ':shared/myClass.js' was successfully resolved to '/home/src/workspaces/projects/shared/src/myClass.ts'. ========
File '/lib/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
../../../lib/lib.d.ts
  Default library for target 'es5'
projects/shared/src/logging.ts
  Matched by include pattern '../shared/src/**/*.ts' in 'projects/server/tsconfig.json'
projects/shared/src/myClass.ts
  Matched by include pattern '../shared/src/**/*.ts' in 'projects/server/tsconfig.json'
  Imported via ':shared/myClass.js' from file 'projects/server/src/server.ts'
projects/server/src/server.ts
  Matched by include pattern 'src/**/*.ts' in 'projects/server/tsconfig.json'
exitCode:: ExitStatus.Success


//// [/home/src/workspaces/projects/server/dist/server/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../../lib/lib.d.ts","../../../shared/src/logging.ts","../../../shared/src/myclass.ts","../../src/server.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"483739938-export function log(str: string) {\n    console.log(str);\n}\nexport const x = 10;","signature":"-4937597761-export declare function log(str: string): void;\nexport declare const x = 10;\n","impliedFormat":1},{"version":"-10369713935-export class MyClass { }","signature":"-7943199723-export declare class MyClass {\n}\n","impliedFormat":1},{"version":"-19159694382-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');\n","signature":"-3531856636-export {};\n","impliedFormat":1}],"root":[[2,4]],"options":{"composite":true,"outDir":"..","rootDir":"../../.."},"fileIdsList":[[3]],"referencedMap":[[4,1]],"semanticDiagnosticsPerFile":[4,2,3,1],"latestChangedDtsFile":"../shared/src/logging.d.ts"},"version":"FakeTSVersion"}

//// [/home/src/workspaces/projects/server/dist/server/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../../lib/lib.d.ts",
      "../../../shared/src/logging.ts",
      "../../../shared/src/myclass.ts",
      "../../src/server.ts"
    ],
    "fileNamesList": [
      [
        "../../../shared/src/myclass.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../../../shared/src/logging.ts": {
        "original": {
          "version": "483739938-export function log(str: string) {\n    console.log(str);\n}\nexport const x = 10;",
          "signature": "-4937597761-export declare function log(str: string): void;\nexport declare const x = 10;\n",
          "impliedFormat": 1
        },
        "version": "483739938-export function log(str: string) {\n    console.log(str);\n}\nexport const x = 10;",
        "signature": "-4937597761-export declare function log(str: string): void;\nexport declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../../../shared/src/myclass.ts": {
        "original": {
          "version": "-10369713935-export class MyClass { }",
          "signature": "-7943199723-export declare class MyClass {\n}\n",
          "impliedFormat": 1
        },
        "version": "-10369713935-export class MyClass { }",
        "signature": "-7943199723-export declare class MyClass {\n}\n",
        "impliedFormat": "commonjs"
      },
      "../../src/server.ts": {
        "original": {
          "version": "-19159694382-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');\n",
          "signature": "-3531856636-export {};\n",
          "impliedFormat": 1
        },
        "version": "-19159694382-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');\n",
        "signature": "-3531856636-export {};\n",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        [
          2,
          4
        ],
        [
          "../../../shared/src/logging.ts",
          "../../../shared/src/myclass.ts",
          "../../src/server.ts"
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
        "../../../shared/src/myclass.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../src/server.ts",
      "../../../shared/src/logging.ts",
      "../../../shared/src/myclass.ts",
      "../../../../../../../lib/lib.d.ts"
    ],
    "latestChangedDtsFile": "../shared/src/logging.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1428
}

//// [/home/src/workspaces/projects/shared/dist/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../lib/lib.d.ts","../src/logging.ts","../src/myclass.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"483739938-export function log(str: string) {\n    console.log(str);\n}\nexport const x = 10;","signature":"-4937597761-export declare function log(str: string): void;\nexport declare const x = 10;\n","impliedFormat":1},{"version":"-10369713935-export class MyClass { }","signature":"-7943199723-export declare class MyClass {\n}\n","impliedFormat":1}],"root":[2,3],"options":{"composite":true,"outDir":"./"},"referencedMap":[],"semanticDiagnosticsPerFile":[2,3,1],"latestChangedDtsFile":"./src/logging.d.ts"},"version":"FakeTSVersion"}

//// [/home/src/workspaces/projects/shared/dist/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../lib/lib.d.ts",
      "../src/logging.ts",
      "../src/myclass.ts"
    ],
    "fileInfos": {
      "../../../../../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../src/logging.ts": {
        "original": {
          "version": "483739938-export function log(str: string) {\n    console.log(str);\n}\nexport const x = 10;",
          "signature": "-4937597761-export declare function log(str: string): void;\nexport declare const x = 10;\n",
          "impliedFormat": 1
        },
        "version": "483739938-export function log(str: string) {\n    console.log(str);\n}\nexport const x = 10;",
        "signature": "-4937597761-export declare function log(str: string): void;\nexport declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/myclass.ts": {
        "original": {
          "version": "-10369713935-export class MyClass { }",
          "signature": "-7943199723-export declare class MyClass {\n}\n",
          "impliedFormat": 1
        },
        "version": "-10369713935-export class MyClass { }",
        "signature": "-7943199723-export declare class MyClass {\n}\n",
        "impliedFormat": "commonjs"
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
    "referencedMap": {},
    "semanticDiagnosticsPerFile": [
      "../src/logging.ts",
      "../src/myclass.ts",
      "../../../../../../lib/lib.d.ts"
    ],
    "latestChangedDtsFile": "./src/logging.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1156
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b projects/server -v --traceResolution --explainFiles
[[90m12:01:29 AM[0m] Projects in this build: 
    * projects/shared/tsconfig.json
    * projects/server/tsconfig.json

[[90m12:01:30 AM[0m] Project 'projects/shared/tsconfig.json' is up to date because newest input 'projects/shared/src/logging.ts' is older than output 'projects/shared/dist/tsconfig.tsbuildinfo'

[[90m12:01:31 AM[0m] Project 'projects/server/tsconfig.json' is up to date because newest input 'projects/shared/src/logging.ts' is older than output 'projects/server/dist/server/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success


