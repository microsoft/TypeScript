currentDirectory:: /home/src/workspaces/solution useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/solution/child/child.ts]
import { child2 } from "../child/child2";
export function child() {
    child2();
}


//// [/home/src/workspaces/solution/child/child2.ts]
export function child2() {
}


//// [/home/src/workspaces/solution/child/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outFile": "../childResult.js",
    "module": "amd"
  }
}

//// [/home/src/workspaces/solution/main/main.ts]
import { child } from "child";
export function main() {
    child();
}


//// [/home/src/workspaces/solution/main/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outFile": "../mainResult.js",
    "module": "amd"
  },
  "references": [
    {
      "path": "../child"
    }
  ]
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


/home/src/tslibs/TS/Lib/tsc.js --b main/tsconfig.json -v --traceResolution --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * child/tsconfig.json
    * main/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'child/tsconfig.json' is out of date because output file 'childResult.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/child/tsconfig.json'...

======== Resolving module '../child/child2' from '/home/src/workspaces/solution/child/child.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/home/src/workspaces/solution/child/child2.ts' exists - use it as a name resolution result.
======== Module name '../child/child2' was successfully resolved to '/home/src/workspaces/solution/child/child2.ts'. ========
[96mchild/tsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../childResult.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mchild/tsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
child/child2.ts
  Imported via "../child/child2" from file 'child/child.ts'
  Matched by default include pattern '**/*'
child/child.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Project 'main/tsconfig.json' is out of date because output file 'mainResult.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/main/tsconfig.json'...

======== Resolving module 'child' from '/home/src/workspaces/solution/main/main.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/home/src/workspaces/solution/main/child.ts' does not exist.
File '/home/src/workspaces/solution/main/child.tsx' does not exist.
File '/home/src/workspaces/solution/main/child.d.ts' does not exist.
File '/home/src/workspaces/solution/child.ts' does not exist.
File '/home/src/workspaces/solution/child.tsx' does not exist.
File '/home/src/workspaces/solution/child.d.ts' does not exist.
File '/home/src/workspaces/child.ts' does not exist.
File '/home/src/workspaces/child.tsx' does not exist.
File '/home/src/workspaces/child.d.ts' does not exist.
File '/home/src/child.ts' does not exist.
File '/home/src/child.tsx' does not exist.
File '/home/src/child.d.ts' does not exist.
File '/home/child.ts' does not exist.
File '/home/child.tsx' does not exist.
File '/home/child.d.ts' does not exist.
File '/child.ts' does not exist.
File '/child.tsx' does not exist.
File '/child.d.ts' does not exist.
Searching all ancestor node_modules directories for preferred extensions: Declaration.
Directory '/home/src/workspaces/solution/main/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/solution/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/home/src/workspaces/solution/main/child.js' does not exist.
File '/home/src/workspaces/solution/main/child.jsx' does not exist.
File '/home/src/workspaces/solution/child.js' does not exist.
File '/home/src/workspaces/solution/child.jsx' does not exist.
File '/home/src/workspaces/child.js' does not exist.
File '/home/src/workspaces/child.jsx' does not exist.
File '/home/src/child.js' does not exist.
File '/home/src/child.jsx' does not exist.
File '/home/child.js' does not exist.
File '/home/child.jsx' does not exist.
File '/child.js' does not exist.
File '/child.jsx' does not exist.
======== Module name 'child' was not resolved. ========
[96mmain/tsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../mainResult.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mmain/tsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
childResult.d.ts
  Output from referenced project 'child/tsconfig.json' included because '--outFile' specified
main/main.ts
  Matched by default include pattern '**/*'

Found 4 errors.



//// [/home/src/workspaces/solution/childResult.js]
define("child2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.child2 = child2;
    function child2() {
    }
});
define("child", ["require", "exports", "child2"], function (require, exports, child2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.child = child;
    function child() {
        (0, child2_1.child2)();
    }
});


//// [/home/src/workspaces/solution/childResult.d.ts]
declare module "child2" {
    export function child2(): void;
}
declare module "child" {
    export function child(): void;
}


//// [/home/src/workspaces/solution/childResult.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./child/child2.ts","./child/child.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","6507293504-export function child2() {\n}\n","-11458139532-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}\n"],"root":[2,3],"options":{"composite":true,"module":2,"outFile":"./childResult.js"},"semanticDiagnosticsPerFile":[1,2,3],"outSignature":"2074776633-declare module \"child2\" {\n    export function child2(): void;\n}\ndeclare module \"child\" {\n    export function child(): void;\n}\n","latestChangedDtsFile":"./childResult.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/childResult.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./child/child2.ts",
    "./child/child.ts"
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./child/child2.ts": "6507293504-export function child2() {\n}\n",
    "./child/child.ts": "-11458139532-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}\n"
  },
  "root": [
    [
      2,
      "./child/child2.ts"
    ],
    [
      3,
      "./child/child.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "outFile": "./childResult.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./child/child2.ts",
      "not cached or not changed"
    ],
    [
      "./child/child.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "2074776633-declare module \"child2\" {\n    export function child2(): void;\n}\ndeclare module \"child\" {\n    export function child(): void;\n}\n",
  "latestChangedDtsFile": "./childResult.d.ts",
  "version": "FakeTSVersion",
  "size": 1005
}

//// [/home/src/workspaces/solution/mainResult.js]
define("main", ["require", "exports", "child"], function (require, exports, child_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.main = main;
    function main() {
        (0, child_1.child)();
    }
});


//// [/home/src/workspaces/solution/mainResult.d.ts]
declare module "main" {
    export function main(): void;
}


//// [/home/src/workspaces/solution/mainResult.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./childresult.d.ts","./main/main.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","2074776633-declare module \"child2\" {\n    export function child2(): void;\n}\ndeclare module \"child\" {\n    export function child(): void;\n}\n","-8784613407-import { child } from \"child\";\nexport function main() {\n    child();\n}\n"],"root":[3],"options":{"composite":true,"module":2,"outFile":"./mainResult.js"},"semanticDiagnosticsPerFile":[1,2,3],"outSignature":"7955277823-declare module \"main\" {\n    export function main(): void;\n}\n","latestChangedDtsFile":"./mainResult.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/mainResult.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./childresult.d.ts",
    "./main/main.ts"
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./childresult.d.ts": "2074776633-declare module \"child2\" {\n    export function child2(): void;\n}\ndeclare module \"child\" {\n    export function child(): void;\n}\n",
    "./main/main.ts": "-8784613407-import { child } from \"child\";\nexport function main() {\n    child();\n}\n"
  },
  "root": [
    [
      3,
      "./main/main.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "outFile": "./mainResult.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./childresult.d.ts",
      "not cached or not changed"
    ],
    [
      "./main/main.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "7955277823-declare module \"main\" {\n    export function main(): void;\n}\n",
  "latestChangedDtsFile": "./mainResult.d.ts",
  "version": "FakeTSVersion",
  "size": 1020
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: delete child2 file

Input::
//// [/home/src/workspaces/solution/child/child2.ts] deleted

/home/src/tslibs/TS/Lib/tsc.js --b main/tsconfig.json -v --traceResolution --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * child/tsconfig.json
    * main/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'child/tsconfig.json' is out of date because buildinfo file 'childResult.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/child/tsconfig.json'...

======== Resolving module '../child/child2' from '/home/src/workspaces/solution/child/child.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/home/src/workspaces/solution/child/child2.ts' does not exist.
File '/home/src/workspaces/solution/child/child2.tsx' does not exist.
File '/home/src/workspaces/solution/child/child2.d.ts' does not exist.
File '/home/src/workspaces/solution/child/child2.js' does not exist.
File '/home/src/workspaces/solution/child/child2.jsx' does not exist.
======== Module name '../child/child2' was not resolved. ========
[96mchild/tsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../childResult.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mchild/tsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
child/child.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Project 'main/tsconfig.json' is out of date because buildinfo file 'mainResult.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/main/tsconfig.json'...

======== Resolving module 'child' from '/home/src/workspaces/solution/main/main.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/home/src/workspaces/solution/main/child.ts' does not exist.
File '/home/src/workspaces/solution/main/child.tsx' does not exist.
File '/home/src/workspaces/solution/main/child.d.ts' does not exist.
File '/home/src/workspaces/solution/child.ts' does not exist.
File '/home/src/workspaces/solution/child.tsx' does not exist.
File '/home/src/workspaces/solution/child.d.ts' does not exist.
File '/home/src/workspaces/child.ts' does not exist.
File '/home/src/workspaces/child.tsx' does not exist.
File '/home/src/workspaces/child.d.ts' does not exist.
File '/home/src/child.ts' does not exist.
File '/home/src/child.tsx' does not exist.
File '/home/src/child.d.ts' does not exist.
File '/home/child.ts' does not exist.
File '/home/child.tsx' does not exist.
File '/home/child.d.ts' does not exist.
File '/child.ts' does not exist.
File '/child.tsx' does not exist.
File '/child.d.ts' does not exist.
Searching all ancestor node_modules directories for preferred extensions: Declaration.
Directory '/home/src/workspaces/solution/main/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/solution/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/home/src/workspaces/solution/main/child.js' does not exist.
File '/home/src/workspaces/solution/main/child.jsx' does not exist.
File '/home/src/workspaces/solution/child.js' does not exist.
File '/home/src/workspaces/solution/child.jsx' does not exist.
File '/home/src/workspaces/child.js' does not exist.
File '/home/src/workspaces/child.jsx' does not exist.
File '/home/src/child.js' does not exist.
File '/home/src/child.jsx' does not exist.
File '/home/child.js' does not exist.
File '/home/child.jsx' does not exist.
File '/child.js' does not exist.
File '/child.jsx' does not exist.
======== Module name 'child' was not resolved. ========
[96mmain/tsconfig.json[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "outFile": "../mainResult.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mmain/tsconfig.json[0m:[93m5[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
childResult.d.ts
  Output from referenced project 'child/tsconfig.json' included because '--outFile' specified
main/main.ts
  Matched by default include pattern '**/*'

Found 4 errors.



//// [/home/src/workspaces/solution/childResult.js]
define("child", ["require", "exports", "../child/child2"], function (require, exports, child2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.child = child;
    function child() {
        (0, child2_1.child2)();
    }
});


//// [/home/src/workspaces/solution/childResult.d.ts]
declare module "child" {
    export function child(): void;
}


//// [/home/src/workspaces/solution/childResult.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./child/child.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-11458139532-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}\n"],"root":[2],"options":{"composite":true,"module":2,"outFile":"./childResult.js"},"semanticDiagnosticsPerFile":[1,2],"outSignature":"8966811613-declare module \"child\" {\n    export function child(): void;\n}\n","latestChangedDtsFile":"./childResult.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/childResult.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./child/child.ts"
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./child/child.ts": "-11458139532-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}\n"
  },
  "root": [
    [
      2,
      "./child/child.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "outFile": "./childResult.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./child/child.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "8966811613-declare module \"child\" {\n    export function child(): void;\n}\n",
  "latestChangedDtsFile": "./childResult.d.ts",
  "version": "FakeTSVersion",
  "size": 867
}

//// [/home/src/workspaces/solution/mainResult.js] file written with same contents
//// [/home/src/workspaces/solution/mainResult.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./childresult.d.ts","./main/main.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","8966811613-declare module \"child\" {\n    export function child(): void;\n}\n","-8784613407-import { child } from \"child\";\nexport function main() {\n    child();\n}\n"],"root":[3],"options":{"composite":true,"module":2,"outFile":"./mainResult.js"},"semanticDiagnosticsPerFile":[1,2,3],"outSignature":"7955277823-declare module \"main\" {\n    export function main(): void;\n}\n","latestChangedDtsFile":"./mainResult.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/mainResult.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./childresult.d.ts",
    "./main/main.ts"
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./childresult.d.ts": "8966811613-declare module \"child\" {\n    export function child(): void;\n}\n",
    "./main/main.ts": "-8784613407-import { child } from \"child\";\nexport function main() {\n    child();\n}\n"
  },
  "root": [
    [
      3,
      "./main/main.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "outFile": "./mainResult.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./childresult.d.ts",
      "not cached or not changed"
    ],
    [
      "./main/main.ts",
      "not cached or not changed"
    ]
  ],
  "outSignature": "7955277823-declare module \"main\" {\n    export function main(): void;\n}\n",
  "latestChangedDtsFile": "./mainResult.d.ts",
  "version": "FakeTSVersion",
  "size": 951
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
