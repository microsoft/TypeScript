currentDirectory:: /a/b/projects/myProject/ useCaseSensitiveFileNames:: false
Input::
//// [/a/b/projects/myProject/src/file1.ts]
import module1 = require("module1");
module1("hello");

//// [/a/b/projects/myProject/src/file2.ts]
import module11 = require("module1");
module11("hello");

//// [/a/b/projects/myProject/node_modules/module1/index.js]
module.exports = options => { return options.toString(); }

//// [/a/b/projects/myProject/src/tsconfig.json]
{
  "compilerOptions": {
    "allowJs": true,
    "rootDir": ".",
    "outDir": "../dist",
    "moduleResolution": "node",
    "maxNodeModuleJsDepth": 1
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


/home/src/tslibs/TS/Lib/tsc.js --w -p /a/b/projects/myProject/src
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96msrc/tsconfig.json[0m:[93m6[0m:[93m25[0m - [91merror[0m[90m TS5107: [0mOption 'moduleResolution=node10' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.
  Visit https://aka.ms/ts6 for migration information.

[7m6[0m     "moduleResolution": "node",
[7m [0m [91m                        ~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/a/b/projects/myProject/dist/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var module1 = require("module1");
module1("hello");


//// [/a/b/projects/myProject/dist/file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var module11 = require("module1");
module11("hello");



PolledWatches::
/a/b/projects/myProject/node_modules/@types: *new*
  {"pollingInterval":500}
/a/b/projects/myProject/node_modules/module1/package.json: *new*
  {"pollingInterval":2000}
/a/b/projects/myProject/node_modules/package.json: *new*
  {"pollingInterval":2000}
/a/b/projects/myProject/package.json: *new*
  {"pollingInterval":2000}
/a/b/projects/myProject/src/node_modules: *new*
  {"pollingInterval":500}
/a/b/projects/myProject/src/node_modules/@types: *new*
  {"pollingInterval":500}
/a/b/projects/node_modules: *new*
  {"pollingInterval":500}
/a/b/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/a/b/projects/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/a/b/projects/myProject/node_modules/module1/index.js: *new*
  {}
/a/b/projects/myProject/src/file1.ts: *new*
  {}
/a/b/projects/myProject/src/file2.ts: *new*
  {}
/a/b/projects/myProject/src/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a/b/projects/myProject/node_modules: *new*
  {}
/a/b/projects/myProject/src: *new*
  {}

Program root files: [
  "/a/b/projects/myProject/src/file1.ts",
  "/a/b/projects/myProject/src/file2.ts"
]
Program options: {
  "allowJs": true,
  "rootDir": "/a/b/projects/myProject/src",
  "outDir": "/a/b/projects/myProject/dist",
  "moduleResolution": 2,
  "maxNodeModuleJsDepth": 1,
  "watch": true,
  "project": "/a/b/projects/myProject/src",
  "configFilePath": "/a/b/projects/myProject/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/a/b/projects/myProject/node_modules/module1/index.js
/a/b/projects/myProject/src/file1.ts
/a/b/projects/myProject/src/file2.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/a/b/projects/myproject/node_modules/module1/index.js (used version)
/a/b/projects/myproject/src/file1.ts (used version)
/a/b/projects/myproject/src/file2.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Add new line to file1

Input::
//// [/a/b/projects/myProject/src/file1.ts]
import module1 = require("module1");
module1("hello");
;


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96msrc/tsconfig.json[0m:[93m6[0m:[93m25[0m - [91merror[0m[90m TS5107: [0mOption 'moduleResolution=node10' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.
  Visit https://aka.ms/ts6 for migration information.

[7m6[0m     "moduleResolution": "node",
[7m [0m [91m                        ~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/a/b/projects/myProject/dist/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var module1 = require("module1");
module1("hello");
;




Program root files: [
  "/a/b/projects/myProject/src/file1.ts",
  "/a/b/projects/myProject/src/file2.ts"
]
Program options: {
  "allowJs": true,
  "rootDir": "/a/b/projects/myProject/src",
  "outDir": "/a/b/projects/myProject/dist",
  "moduleResolution": 2,
  "maxNodeModuleJsDepth": 1,
  "watch": true,
  "project": "/a/b/projects/myProject/src",
  "configFilePath": "/a/b/projects/myProject/src/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/a/b/projects/myProject/node_modules/module1/index.js
/a/b/projects/myProject/src/file1.ts
/a/b/projects/myProject/src/file2.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/a/b/projects/myproject/src/file1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
