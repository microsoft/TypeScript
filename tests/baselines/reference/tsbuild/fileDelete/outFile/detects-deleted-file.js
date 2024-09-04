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
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
childResult.d.ts
  Output from referenced project 'child/tsconfig.json' included because '--outFile' specified
main/main.ts
  Matched by default include pattern '**/*'


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
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./child/child2.ts","./child/child.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","6507293504-export function child2() {\n}\n","-11458139532-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}\n"],"root":[2,3],"options":{"composite":true,"module":2,"outFile":"./childResult.js"},"outSignature":"2074776633-declare module \"child2\" {\n    export function child2(): void;\n}\ndeclare module \"child\" {\n    export function child(): void;\n}\n","latestChangedDtsFile":"./childResult.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/childResult.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./child/child2.ts",
    "./child/child.ts"
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
  "outSignature": "2074776633-declare module \"child2\" {\n    export function child2(): void;\n}\ndeclare module \"child\" {\n    export function child(): void;\n}\n",
  "latestChangedDtsFile": "./childResult.d.ts",
  "version": "FakeTSVersion",
  "size": 1008
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
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./childresult.d.ts","./main/main.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","2074776633-declare module \"child2\" {\n    export function child2(): void;\n}\ndeclare module \"child\" {\n    export function child(): void;\n}\n","-8784613407-import { child } from \"child\";\nexport function main() {\n    child();\n}\n"],"root":[3],"options":{"composite":true,"module":2,"outFile":"./mainResult.js"},"outSignature":"7955277823-declare module \"main\" {\n    export function main(): void;\n}\n","latestChangedDtsFile":"./mainResult.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/mainResult.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./childresult.d.ts",
    "./main/main.ts"
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
  "outSignature": "7955277823-declare module \"main\" {\n    export function main(): void;\n}\n",
  "latestChangedDtsFile": "./mainResult.d.ts",
  "version": "FakeTSVersion",
  "size": 1023
}


exitCode:: ExitStatus.Success

Change:: delete child2 file

Input::
//// [/home/src/workspaces/solution/child/child2.ts] deleted

/home/src/tslibs/TS/Lib/tsc.js --b main/tsconfig.json -v --traceResolution --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * child/tsconfig.json
    * main/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'child/tsconfig.json' is out of date because buildinfo file 'childResult.tsbuildinfo' indicates that file 'child/child2.ts' was root file of compilation but not any more.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/child/tsconfig.json'...

======== Resolving module '../child/child2' from '/home/src/workspaces/solution/child/child.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/home/src/workspaces/solution/child/child2.ts' does not exist.
File '/home/src/workspaces/solution/child/child2.tsx' does not exist.
File '/home/src/workspaces/solution/child/child2.d.ts' does not exist.
File '/home/src/workspaces/solution/child/child2.js' does not exist.
File '/home/src/workspaces/solution/child/child2.jsx' does not exist.
======== Module name '../child/child2' was not resolved. ========
[96mchild/child.ts[0m:[93m1[0m:[93m24[0m - [91merror[0m[90m TS2792: [0mCannot find module '../child/child2'. Did you mean to set the 'moduleResolution' option to 'nodenext', or to add aliases to the 'paths' option?

[7m1[0m import { child2 } from "../child/child2";
[7m [0m [91m                       ~~~~~~~~~~~~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
child/child.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Project 'main/tsconfig.json' is out of date because output 'mainResult.tsbuildinfo' is older than input 'child'

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
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
childResult.d.ts
  Output from referenced project 'child/tsconfig.json' included because '--outFile' specified
main/main.ts
  Matched by default include pattern '**/*'

Found 1 error.



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
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./child/child.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-11458139532-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}\n"],"root":[2],"options":{"composite":true,"module":2,"outFile":"./childResult.js"},"semanticDiagnosticsPerFile":[[2,[{"start":23,"length":17,"messageText":"Cannot find module '../child/child2'. Did you mean to set the 'moduleResolution' option to 'nodenext', or to add aliases to the 'paths' option?","category":1,"code":2792}]]],"outSignature":"8966811613-declare module \"child\" {\n    export function child(): void;\n}\n","latestChangedDtsFile":"./childResult.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/childResult.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./child/child.ts"
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
      "./child/child.ts",
      [
        {
          "start": 23,
          "length": 17,
          "messageText": "Cannot find module '../child/child2'. Did you mean to set the 'moduleResolution' option to 'nodenext', or to add aliases to the 'paths' option?",
          "category": 1,
          "code": 2792
        }
      ]
    ]
  ],
  "outSignature": "8966811613-declare module \"child\" {\n    export function child(): void;\n}\n",
  "latestChangedDtsFile": "./childResult.d.ts",
  "version": "FakeTSVersion",
  "size": 1119
}

//// [/home/src/workspaces/solution/mainResult.js] file written with same contents
//// [/home/src/workspaces/solution/mainResult.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./childresult.d.ts","./main/main.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","8966811613-declare module \"child\" {\n    export function child(): void;\n}\n","-8784613407-import { child } from \"child\";\nexport function main() {\n    child();\n}\n"],"root":[3],"options":{"composite":true,"module":2,"outFile":"./mainResult.js"},"outSignature":"7955277823-declare module \"main\" {\n    export function main(): void;\n}\n","latestChangedDtsFile":"./mainResult.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/mainResult.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./childresult.d.ts",
    "./main/main.ts"
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
  "outSignature": "7955277823-declare module \"main\" {\n    export function main(): void;\n}\n",
  "latestChangedDtsFile": "./mainResult.d.ts",
  "version": "FakeTSVersion",
  "size": 954
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
