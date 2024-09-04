currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "module": "amd",
    "declaration": true,
    "skipLibCheck": true,
    "skipDefaultLibCheck": true,
    "outFile": "./outFile.js"
  },
  "include": [
    "src"
  ]
}

//// [/home/src/workspaces/project/src/index.ts]
import ky from 'ky';
export const api = ky.extend({});


//// [/home/src/workspaces/project/ky.d.ts]
type KyInstance = {
    extend(options: Record<string,unknown>): KyInstance;
}
declare const ky: KyInstance;
export default ky;


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


/home/src/tslibs/TS/Lib/tsc.js -b --explainFiles --listEmittedFiles --v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'outFile.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96msrc/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4023: [0mExported variable 'api' has or is using name 'KyInstance' from external module "/home/src/workspaces/project/ky" but cannot be named.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

TSFILE: /home/src/workspaces/project/outFile.js
TSFILE: /home/src/workspaces/project/outFile.tsbuildinfo
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
ky.d.ts
  Imported via 'ky' from file 'src/index.ts'
src/index.ts
  Matched by include pattern 'src' in 'tsconfig.json'
[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/home/src/workspaces/project/tsconfig.json'...


Found 1 error.



//// [/home/src/workspaces/project/outFile.js]
define("index", ["require", "exports", "ky"], function (require, exports, ky_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.api = void 0;
    exports.api = ky_1.default.extend({});
});


//// [/home/src/workspaces/project/outFile.tsbuildinfo]
{"root":["./src/index.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/outFile.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./src/index.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 67
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -b --explainFiles --listEmittedFiles --v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'outFile.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96msrc/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4023: [0mExported variable 'api' has or is using name 'KyInstance' from external module "/home/src/workspaces/project/ky" but cannot be named.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

TSFILE: /home/src/workspaces/project/outFile.js
TSFILE: /home/src/workspaces/project/outFile.tsbuildinfo
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
ky.d.ts
  Imported via 'ky' from file 'src/index.ts'
src/index.ts
  Matched by include pattern 'src' in 'tsconfig.json'
[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/home/src/workspaces/project/tsconfig.json'...


Found 1 error.



//// [/home/src/workspaces/project/outFile.js] file written with same contents
//// [/home/src/workspaces/project/outFile.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/project/outFile.tsbuildinfo.readable.baseline.txt] file written with same contents

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
