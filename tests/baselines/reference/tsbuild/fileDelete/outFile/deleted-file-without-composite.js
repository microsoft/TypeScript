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
    "outFile": "../childResult.js",
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


/home/src/tslibs/TS/Lib/tsc.js --b child/tsconfig.json -v --traceResolution --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * child/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'child/tsconfig.json' is out of date because output file 'childResult.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/child/tsconfig.json'...

======== Resolving module '../child/child2' from '/home/src/workspaces/solution/child/child.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/home/src/workspaces/solution/child/child2.ts' exists - use it as a name resolution result.
======== Module name '../child/child2' was successfully resolved to '/home/src/workspaces/solution/child/child2.ts'. ========
[96mchild/tsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "outFile": "../childResult.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mchild/tsconfig.json[0m:[93m4[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
child/child2.ts
  Imported via "../child/child2" from file 'child/child.ts'
  Matched by default include pattern '**/*'
child/child.ts
  Matched by default include pattern '**/*'

Found 2 errors.



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


//// [/home/src/workspaces/solution/childResult.tsbuildinfo]
{"root":["./child/child.ts","./child/child2.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/childResult.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./child/child.ts",
    "./child/child2.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 89
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: delete child2 file

Input::
//// [/home/src/workspaces/solution/child/child2.ts] deleted

/home/src/tslibs/TS/Lib/tsc.js --b child/tsconfig.json -v --traceResolution --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * child/tsconfig.json

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
[96mchild/tsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "outFile": "../childResult.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mchild/tsconfig.json[0m:[93m4[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
child/child.ts
  Matched by default include pattern '**/*'

Found 2 errors.



//// [/home/src/workspaces/solution/childResult.js]
define("child", ["require", "exports", "../child/child2"], function (require, exports, child2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.child = child;
    function child() {
        (0, child2_1.child2)();
    }
});


//// [/home/src/workspaces/solution/childResult.tsbuildinfo]
{"root":["./child/child.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/childResult.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./child/child.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 69
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
