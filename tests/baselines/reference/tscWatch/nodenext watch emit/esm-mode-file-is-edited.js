Input::
//// [/project/tsconfig.json]
{"compilerOptions":{"strict":true,"target":"es2020","module":"nodenext","moduleResolution":"nodenext","outDir":"../dist"}}

//// [/project/src/index.ts]
import * as Thing from "thing";

Thing.fn();

//// [/project/src/deps.d.ts]
declare module "thing";

//// [/project/package.json]
{"name":"some-proj","version":"1.0.0","description":"","type":"module","main":"index.js"}

//// [/a/lib/lib.es2020.full.d.ts]
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


/a/lib/tsc.js --w --p /project/tsconfig.json
Output::
>> Screen clear
[[90m12:00:21 AM[0m] Starting compilation in watch mode...

[[90m12:00:27 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/project/src/deps.d.ts","/project/src/index.ts"]
Program options: {"strict":true,"target":7,"module":199,"moduleResolution":99,"outDir":"/dist","watch":true,"project":"/project/tsconfig.json","configFilePath":"/project/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.es2020.full.d.ts
/project/src/deps.d.ts
/project/src/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.es2020.full.d.ts
/project/src/deps.d.ts
/project/src/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.es2020.full.d.ts (used version)
/project/src/deps.d.ts (used version)
/project/src/index.ts (used version)

WatchedFiles::
/project/tsconfig.json:
  {"fileName":"/project/tsconfig.json","pollingInterval":250}
/project/src/deps.d.ts:
  {"fileName":"/project/src/deps.d.ts","pollingInterval":250}
/project/src/index.ts:
  {"fileName":"/project/src/index.ts","pollingInterval":250}
/a/lib/lib.es2020.full.d.ts:
  {"fileName":"/a/lib/lib.es2020.full.d.ts","pollingInterval":250}
/project/node_modules/@types:
  {"fileName":"/project/node_modules/@types","pollingInterval":500}

FsWatches::

FsWatchesRecursive::
/project:
  {"directoryName":"/project"}

exitCode:: ExitStatus.undefined

//// [/dist/index.js]
import * as Thing from "thing";
Thing.fn();



Change:: Modify typescript file

Input::
//// [/project/src/index.ts]
import * as Thing from "thing";
Thing.fn();


Output::
>> Screen clear
[[90m12:00:30 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:34 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/project/src/deps.d.ts","/project/src/index.ts"]
Program options: {"strict":true,"target":7,"module":199,"moduleResolution":99,"outDir":"/dist","watch":true,"project":"/project/tsconfig.json","configFilePath":"/project/tsconfig.json"}
Program structureReused: Completely
Program files::
/a/lib/lib.es2020.full.d.ts
/project/src/deps.d.ts
/project/src/index.ts

Semantic diagnostics in builder refreshed for::
/project/src/index.ts

Shape signatures in builder refreshed for::
/project/src/index.ts (computed .d.ts)

WatchedFiles::
/project/tsconfig.json:
  {"fileName":"/project/tsconfig.json","pollingInterval":250}
/project/src/deps.d.ts:
  {"fileName":"/project/src/deps.d.ts","pollingInterval":250}
/project/src/index.ts:
  {"fileName":"/project/src/index.ts","pollingInterval":250}
/a/lib/lib.es2020.full.d.ts:
  {"fileName":"/a/lib/lib.es2020.full.d.ts","pollingInterval":250}
/project/node_modules/@types:
  {"fileName":"/project/node_modules/@types","pollingInterval":500}

FsWatches::

FsWatchesRecursive::
/project:
  {"directoryName":"/project"}

exitCode:: ExitStatus.undefined

//// [/dist/index.js] file written with same contents
