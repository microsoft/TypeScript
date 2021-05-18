Input::
//// [/user/username/projects/myproject/src/main.ts]
import { something } from "./filePresent";
import { something as something1 } from "./filePresent";
import { something2 } from "./fileNotFound";
import { externalThing1 } from "externalThing";
import { externalThing2 } from "externalThingNotPresent";

//// [/user/username/projects/myproject/src/anotherFileReusingResolution.ts]
import { something } from "./filePresent";
import { something2 } from "./fileNotFound";
import { externalThing1 } from "externalThing";
import { externalThing2 } from "externalThingNotPresent";

//// [/user/username/projects/myproject/src/filePresent.ts]
export function something() { return 10; }

//// [/user/username/projects/myproject/src/fileWithRef.ts]
/// <reference path="./types.ts"/>

//// [/user/username/projects/myproject/src/types.ts]
interface SomeType {}

//// [/user/username/projects/myproject/src/globalMain.ts]
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }


//// [/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts]
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }


//// [/user/username/projects/myproject/src/globalFilePresent.ts]
function globalSomething() { return 10; }

//// [/user/username/projects/myproject/src/externalThing.d.ts]
export function externalThing1(): number;

//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"module":"amd","composite":true,"persistResolutions":true,"traceResolution":true},"include":["src/**/*.ts"]}

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

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalmain.ts","./src/main.ts","./src/globalfilenotfound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/anotherFileReusingResolution.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalMain.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"11598859296-export function something() { return 10; }","5686005290-export function externalThing1(): number;","-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",{"version":"-12575322908-interface SomeType {}","affectsGlobalScope":true},"-6085631553-/// <reference path=\"./types.ts\"/>",{"version":"-5627034801-function globalSomething() { return 10; }","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","affectsGlobalScope":true},{"version":"-12326309214-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\n","affectsGlobalScope":true},"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3],[5],[7,11]],"referencedMap":[[4,1],[6,2],[8,3],[9,3],[10,1]],"exportedModulesMap":[[4,1],[6,2],[8,3],[9,3],[10,1]],"semanticDiagnosticsPerFile":[1,[4,[{"file":"./src/anotherfilereusingresolution.ts","start":70,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],3,2,6,8,7,9,[10,[{"file":"./src/main.ts","start":127,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/main.ts","start":224,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],5],"affectedFilesPendingEmit":[[4,1],[3,1],[2,1],[6,1],[8,1],[7,1],[9,1],[10,1],[5,1]],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":12,"originalFileName":12,"path":2,"resolvedPath":2,"version":"11598859296-export function something() { return 10; }","flags":0,"includeReasons":[{"kind":3,"file":4,"index":0},{"kind":0,"index":2},{"kind":3,"file":10,"index":0},{"kind":3,"file":10,"index":1}]},{"fileName":13,"originalFileName":13,"path":3,"resolvedPath":3,"version":"5686005290-export function externalThing1(): number;","flags":0,"includeReasons":[{"kind":3,"file":4,"index":2},{"kind":0,"index":1},{"kind":3,"file":10,"index":3}]},{"fileName":14,"originalFileName":14,"path":4,"resolvedPath":4,"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":0}]},{"fileName":5,"originalFileName":5,"path":5,"resolvedPath":5,"version":"-12575322908-interface SomeType {}","flags":0,"includeReasons":[{"kind":4,"file":6,"index":0},{"kind":0,"index":8}]},{"fileName":15,"originalFileName":15,"path":6,"resolvedPath":6,"version":"-6085631553-/// <reference path=\"./types.ts\"/>","flags":0,"referencedFiles":["./types.ts"],"includeReasons":[{"kind":0,"index":3}]},{"fileName":16,"originalFileName":16,"path":7,"resolvedPath":7,"version":"-5627034801-function globalSomething() { return 10; }","flags":0,"includeReasons":[{"kind":4,"file":8,"index":0},{"kind":0,"index":5},{"kind":4,"file":9,"index":0}]},{"fileName":17,"originalFileName":17,"path":8,"resolvedPath":8,"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":4}]},{"fileName":18,"originalFileName":18,"path":9,"resolvedPath":9,"version":"-12326309214-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\n","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":6}]},{"fileName":10,"originalFileName":10,"path":10,"resolvedPath":10,"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":7}]}],"rootFileNames":[14,13,12,15,17,16,18,10,5],"filesByName":[[11,0]],"fileProcessingDiagnostics":[{"kind":1,"fileProcessingReason":{"kind":4,"file":8,"index":1},"diagnostic":"File_0_not_found","args":["/user/username/projects/myproject/src/globalFileNotFound.ts"]},{"kind":1,"fileProcessingReason":{"kind":4,"file":9,"index":1},"diagnostic":"File_0_not_found","args":["/user/username/projects/myproject/src/globalFileNotFound.ts"]}],"resolutions":[{"resolvedModule":{"resolvedFileName":12,"extension":".ts"}},{"failedLookupLocations":[19,20,21,22,23]},{"resolvedModule":{"resolvedFileName":13,"extension":".d.ts"},"failedLookupLocations":[24,25]},{"failedLookupLocations":[26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73]}]}},"version":"FakeTSVersion"}


/a/lib/tsc.js --b . -w --extendedDiagnostics
Output::
[[90m12:00:41 AM[0m] Starting compilation in watch mode...

[96msrc/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/globalAnotherFileWithSameReferenes.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/user/username/projects/myproject/src/globalFileNotFound.ts' not found.

[7m2[0m /// <reference path="./globalFileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/globalMain.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/user/username/projects/myproject/src/globalFileNotFound.ts' not found.

[7m2[0m /// <reference path="./globalFileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[[90m12:00:42 AM[0m] Found 6 errors. Watching for file changes.

FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Config file /user/username/projects/myproject/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/anotherFileReusingResolution.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/externalThing.d.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/filePresent.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/fileWithRef.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/globalFilePresent.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/globalMain.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/types.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json


Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/filePresent.ts
/user/username/projects/myproject/src/externalThing.d.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/types.ts
/user/username/projects/myproject/src/fileWithRef.ts
/user/username/projects/myproject/src/globalFilePresent.ts
/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts
/user/username/projects/myproject/src/globalMain.ts
/user/username/projects/myproject/src/main.ts

Semantic diagnostics in builder refreshed for::

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/src/anotherfilereusingresolution.ts:
  {"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.d.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/filePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/filewithref.ts:
  {"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalanotherfilewithsamereferenes.ts:
  {"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalmain.ts:
  {"fileName":"/user/username/projects/myproject/src/globalMain.ts","pollingInterval":250}
/user/username/projects/myproject/src/main.ts:
  {"fileName":"/user/username/projects/myproject/src/main.ts","pollingInterval":250}
/user/username/projects/myproject/src/types.ts:
  {"fileName":"/user/username/projects/myproject/src/types.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: Modify globalMain file

Input::
//// [/user/username/projects/myproject/src/globalMain.ts]
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();


Output::
FileWatcher:: Triggered with /user/username/projects/myproject/src/globalMain.ts 1:: WatchInfo: /user/username/projects/myproject/src/globalMain.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/src/globalMain.ts 1:: WatchInfo: /user/username/projects/myproject/src/globalMain.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
[[90m12:00:45 AM[0m] File change detected. Starting incremental compilation...

[96msrc/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/globalAnotherFileWithSameReferenes.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/user/username/projects/myproject/src/globalFileNotFound.ts' not found.

[7m2[0m /// <reference path="./globalFileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/globalMain.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/user/username/projects/myproject/src/globalFileNotFound.ts' not found.

[7m2[0m /// <reference path="./globalFileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[[90m12:00:51 AM[0m] Found 6 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/filePresent.ts
/user/username/projects/myproject/src/externalThing.d.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/types.ts
/user/username/projects/myproject/src/fileWithRef.ts
/user/username/projects/myproject/src/globalFilePresent.ts
/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts
/user/username/projects/myproject/src/globalMain.ts
/user/username/projects/myproject/src/main.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/filePresent.ts
/user/username/projects/myproject/src/externalThing.d.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/types.ts
/user/username/projects/myproject/src/fileWithRef.ts
/user/username/projects/myproject/src/globalFilePresent.ts
/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts
/user/username/projects/myproject/src/globalMain.ts
/user/username/projects/myproject/src/main.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/src/anotherfilereusingresolution.ts:
  {"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.d.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/filePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/filewithref.ts:
  {"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalanotherfilewithsamereferenes.ts:
  {"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalmain.ts:
  {"fileName":"/user/username/projects/myproject/src/globalMain.ts","pollingInterval":250}
/user/username/projects/myproject/src/main.ts:
  {"fileName":"/user/username/projects/myproject/src/main.ts","pollingInterval":250}
/user/username/projects/myproject/src/types.ts:
  {"fileName":"/user/username/projects/myproject/src/types.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalmain.ts","./src/main.ts","./src/globalfilenotfound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/anotherFileReusingResolution.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalMain.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-13601649692-export declare function something(): number;\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10760962856-interface SomeType {\n}\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-1928648610-/// <reference path=\"types.d.ts\" />\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-7731522637-declare function globalSomething(): number;\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-13665089706-/// <reference path=\"globalFilePresent.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"-5695225267-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();","signature":"-18175711127-/// <reference path=\"globalFilePresent.d.ts\" />\ndeclare function globalMain(): void;\n","affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"}],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"persistResolutions":true,"traceResolution":true,"watch":true},"fileIdsList":[[2,3],[5],[7,11]],"referencedMap":[[4,1],[6,2],[8,3],[9,3],[10,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[4,[{"file":"./src/anotherfilereusingresolution.ts","start":70,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],3,2,6,8,7,9,[10,[{"file":"./src/main.ts","start":127,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/main.ts","start":224,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],5],"affectedFilesPendingEmit":[[4,1],[3,1],[2,1],[6,1],[8,1],[7,1],[9,1],[10,1],[5,1]],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":12,"originalFileName":12,"path":2,"resolvedPath":2,"version":"11598859296-export function something() { return 10; }","flags":0,"includeReasons":[{"kind":3,"file":4,"index":0},{"kind":0,"index":2},{"kind":3,"file":10,"index":0},{"kind":3,"file":10,"index":1}]},{"fileName":13,"originalFileName":13,"path":3,"resolvedPath":3,"version":"5686005290-export function externalThing1(): number;","flags":0,"includeReasons":[{"kind":3,"file":4,"index":2},{"kind":0,"index":1},{"kind":3,"file":10,"index":3}]},{"fileName":14,"originalFileName":14,"path":4,"resolvedPath":4,"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":0}]},{"fileName":5,"originalFileName":5,"path":5,"resolvedPath":5,"version":"-12575322908-interface SomeType {}","flags":0,"includeReasons":[{"kind":4,"file":6,"index":0},{"kind":0,"index":8}]},{"fileName":15,"originalFileName":15,"path":6,"resolvedPath":6,"version":"-6085631553-/// <reference path=\"./types.ts\"/>","flags":0,"referencedFiles":["./types.ts"],"includeReasons":[{"kind":0,"index":3}]},{"fileName":16,"originalFileName":16,"path":7,"resolvedPath":7,"version":"-5627034801-function globalSomething() { return 10; }","flags":0,"includeReasons":[{"kind":4,"file":8,"index":0},{"kind":0,"index":5},{"kind":4,"file":9,"index":0}]},{"fileName":17,"originalFileName":17,"path":8,"resolvedPath":8,"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":4}]},{"fileName":18,"originalFileName":18,"path":9,"resolvedPath":9,"version":"-5695225267-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":6}]},{"fileName":10,"originalFileName":10,"path":10,"resolvedPath":10,"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":7}]}],"rootFileNames":[14,13,12,15,17,16,18,10,5],"filesByName":[[11,0]],"fileProcessingDiagnostics":[{"kind":1,"fileProcessingReason":{"kind":4,"file":8,"index":1},"diagnostic":"File_0_not_found","args":["/user/username/projects/myproject/src/globalFileNotFound.ts"]},{"kind":1,"fileProcessingReason":{"kind":4,"file":9,"index":1},"diagnostic":"File_0_not_found","args":["/user/username/projects/myproject/src/globalFileNotFound.ts"]}],"resolutions":[{"resolvedModule":{"resolvedFileName":12,"extension":".ts"}},{"failedLookupLocations":[19,20,21,22,23]},{"resolvedModule":{"resolvedFileName":13,"extension":".d.ts"},"failedLookupLocations":[24,25]},{"failedLookupLocations":[26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73]}]}},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalmain.ts",
      "./src/main.ts",
      "./src/globalfilenotfound.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalMain.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.js",
      "./src/fileNotFound.jsx",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "../../../externalThingNotPresent.ts",
      "../../../externalThingNotPresent.tsx",
      "../../../externalThingNotPresent.d.ts",
      "../../../../externalThingNotPresent.ts",
      "../../../../externalThingNotPresent.tsx",
      "../../../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../../node_modules/@types/externalThingNotPresent/package.json",
      "../../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../../../node_modules/@types/externalThingNotPresent/package.json",
      "../../../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx",
      "../../../externalThingNotPresent.js",
      "../../../externalThingNotPresent.jsx",
      "../../../../externalThingNotPresent.js",
      "../../../../externalThingNotPresent.jsx"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }",
        "signature": "-13601649692-export declare function something(): number;\n"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;",
        "signature": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-3531856636-export {};\n"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "signature": "-10760962856-interface SomeType {\n}\n",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
        "signature": "-1928648610-/// <reference path=\"types.d.ts\" />\n"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "signature": "-7731522637-declare function globalSomething(): number;\n",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "signature": "-13665089706-/// <reference path=\"globalFilePresent.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5695225267-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();",
        "signature": "-18175711127-/// <reference path=\"globalFilePresent.d.ts\" />\ndeclare function globalMain(): void;\n",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-3531856636-export {};\n"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "persistResolutions": true,
      "traceResolution": true,
      "watch": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      [
        "./src/anotherfilereusingresolution.ts",
        [
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 70,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 167,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/externalthing.d.ts",
      "./src/filepresent.ts",
      "./src/filewithref.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalfilepresent.ts",
      "./src/globalmain.ts",
      [
        "./src/main.ts",
        [
          {
            "file": "./src/main.ts",
            "start": 127,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/main.ts",
            "start": 224,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/types.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./src/anotherfilereusingresolution.ts",
        "Full"
      ],
      [
        "./src/externalthing.d.ts",
        "Full"
      ],
      [
        "./src/filepresent.ts",
        "Full"
      ],
      [
        "./src/filewithref.ts",
        "Full"
      ],
      [
        "./src/globalanotherfilewithsamereferenes.ts",
        "Full"
      ],
      [
        "./src/globalfilepresent.ts",
        "Full"
      ],
      [
        "./src/globalmain.ts",
        "Full"
      ],
      [
        "./src/main.ts",
        "Full"
      ],
      [
        "./src/types.ts",
        "Full"
      ]
    ],
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../../../a/lib/lib.d.ts",
          "originalFileName": "../../../../a/lib/lib.d.ts",
          "path": "../../../../a/lib/lib.d.ts",
          "resolvedPath": "../../../../a/lib/lib.d.ts",
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": "LibFile"
            }
          ]
        },
        {
          "fileName": "./src/filePresent.ts",
          "originalFileName": "./src/filePresent.ts",
          "path": "./src/filepresent.ts",
          "resolvedPath": "./src/filepresent.ts",
          "version": "11598859296-export function something() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 2
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 0
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/externalThing.d.ts",
          "originalFileName": "./src/externalThing.d.ts",
          "path": "./src/externalthing.d.ts",
          "resolvedPath": "./src/externalthing.d.ts",
          "version": "5686005290-export function externalThing1(): number;",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 2
            },
            {
              "kind": "RootFile",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/anotherFileReusingResolution.ts",
          "originalFileName": "./src/anotherFileReusingResolution.ts",
          "path": "./src/anotherfilereusingresolution.ts",
          "resolvedPath": "./src/anotherfilereusingresolution.ts",
          "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "failedLookupLocations": [
                  "./src/fileNotFound.ts",
                  "./src/fileNotFound.tsx",
                  "./src/fileNotFound.d.ts",
                  "./src/fileNotFound.js",
                  "./src/fileNotFound.jsx"
                ]
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "../../../externalThingNotPresent.ts",
                  "../../../externalThingNotPresent.tsx",
                  "../../../externalThingNotPresent.d.ts",
                  "../../../../externalThingNotPresent.ts",
                  "../../../../externalThingNotPresent.tsx",
                  "../../../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx",
                  "../../../externalThingNotPresent.js",
                  "../../../externalThingNotPresent.jsx",
                  "../../../../externalThingNotPresent.js",
                  "../../../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 0
            }
          ]
        },
        {
          "fileName": "./src/types.ts",
          "originalFileName": "./src/types.ts",
          "path": "./src/types.ts",
          "resolvedPath": "./src/types.ts",
          "version": "-12575322908-interface SomeType {}",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/filewithref.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 8
            }
          ]
        },
        {
          "fileName": "./src/fileWithRef.ts",
          "originalFileName": "./src/fileWithRef.ts",
          "path": "./src/filewithref.ts",
          "resolvedPath": "./src/filewithref.ts",
          "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
          "flags": 0,
          "referencedFiles": [
            "./types.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/globalFilePresent.ts",
          "originalFileName": "./src/globalFilePresent.ts",
          "path": "./src/globalfilepresent.ts",
          "resolvedPath": "./src/globalfilepresent.ts",
          "version": "-5627034801-function globalSomething() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 5
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 0
            }
          ]
        },
        {
          "fileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "originalFileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "path": "./src/globalanotherfilewithsamereferenes.ts",
          "resolvedPath": "./src/globalanotherfilewithsamereferenes.ts",
          "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
          "flags": 0,
          "referencedFiles": [
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/globalMain.ts",
          "originalFileName": "./src/globalMain.ts",
          "path": "./src/globalmain.ts",
          "resolvedPath": "./src/globalmain.ts",
          "version": "-5695225267-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();",
          "flags": 0,
          "referencedFiles": [
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 6
            }
          ]
        },
        {
          "fileName": "./src/main.ts",
          "originalFileName": "./src/main.ts",
          "path": "./src/main.ts",
          "resolvedPath": "./src/main.ts",
          "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "failedLookupLocations": [
                  "./src/fileNotFound.ts",
                  "./src/fileNotFound.tsx",
                  "./src/fileNotFound.d.ts",
                  "./src/fileNotFound.js",
                  "./src/fileNotFound.jsx"
                ]
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "../../../externalThingNotPresent.ts",
                  "../../../externalThingNotPresent.tsx",
                  "../../../externalThingNotPresent.d.ts",
                  "../../../../externalThingNotPresent.ts",
                  "../../../../externalThingNotPresent.tsx",
                  "../../../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx",
                  "../../../externalThingNotPresent.js",
                  "../../../externalThingNotPresent.jsx",
                  "../../../../externalThingNotPresent.js",
                  "../../../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 7
            }
          ]
        }
      ],
      "rootFileNames": [
        "./src/anotherFileReusingResolution.ts",
        "./src/externalThing.d.ts",
        "./src/filePresent.ts",
        "./src/fileWithRef.ts",
        "./src/globalAnotherFileWithSameReferenes.ts",
        "./src/globalFilePresent.ts",
        "./src/globalMain.ts",
        "./src/main.ts",
        "./src/types.ts"
      ],
      "filesByName": {
        "./src/globalfilenotfound.ts": 0
      },
      "fileProcessingDiagnostics": [
        {
          "kind": "FilePreprocessingFileExplainingDiagnostic",
          "fileProcessingReason": {
            "kind": "ReferenceFile",
            "file": "./src/globalanotherfilewithsamereferenes.ts",
            "index": 1
          },
          "diagnostic": "File_0_not_found",
          "args": [
            "/user/username/projects/myproject/src/globalFileNotFound.ts"
          ]
        },
        {
          "kind": "FilePreprocessingFileExplainingDiagnostic",
          "fileProcessingReason": {
            "kind": "ReferenceFile",
            "file": "./src/globalmain.ts",
            "index": 1
          },
          "diagnostic": "File_0_not_found",
          "args": [
            "/user/username/projects/myproject/src/globalFileNotFound.ts"
          ]
        }
      ],
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "failedLookupLocations": [
            "./src/fileNotFound.ts",
            "./src/fileNotFound.tsx",
            "./src/fileNotFound.d.ts",
            "./src/fileNotFound.js",
            "./src/fileNotFound.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "../../../externalThingNotPresent.ts",
            "../../../externalThingNotPresent.tsx",
            "../../../externalThingNotPresent.d.ts",
            "../../../../externalThingNotPresent.ts",
            "../../../../externalThingNotPresent.tsx",
            "../../../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../../node_modules/@types/externalThingNotPresent/package.json",
            "../../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../../../node_modules/@types/externalThingNotPresent/package.json",
            "../../../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx",
            "../../../externalThingNotPresent.js",
            "../../../externalThingNotPresent.jsx",
            "../../../../externalThingNotPresent.js",
            "../../../../externalThingNotPresent.jsx"
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 11178
}


Change:: Add new globalFile and update globalMain file

Input::
//// [/user/username/projects/myproject/src/globalMain.ts]
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();globalFoo();

//// [/user/username/projects/myproject/src/globalNewFile.ts]
function globalFoo() { return 20; }


Output::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalNewFile.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalNewFile.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
FileWatcher:: Triggered with /user/username/projects/myproject/src/globalMain.ts 1:: WatchInfo: /user/username/projects/myproject/src/globalMain.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/src/globalMain.ts 1:: WatchInfo: /user/username/projects/myproject/src/globalMain.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
FileWatcher:: Triggered with /user/username/projects/myproject/src/globalMain.ts 1:: WatchInfo: /user/username/projects/myproject/src/globalMain.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/src/globalMain.ts 1:: WatchInfo: /user/username/projects/myproject/src/globalMain.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
[[90m12:00:58 AM[0m] File change detected. Starting incremental compilation...

FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/globalNewFile.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/user/username/projects/myproject/src/fileNotFound.ts' does not exist.
File '/user/username/projects/myproject/src/fileNotFound.tsx' does not exist.
File '/user/username/projects/myproject/src/fileNotFound.d.ts' does not exist.
File '/user/username/projects/myproject/src/fileNotFound.js' does not exist.
File '/user/username/projects/myproject/src/fileNotFound.jsx' does not exist.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/user/username/projects/myproject/src/externalThingNotPresent.ts' does not exist.
File '/user/username/projects/myproject/src/externalThingNotPresent.tsx' does not exist.
File '/user/username/projects/myproject/src/externalThingNotPresent.d.ts' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.ts' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.tsx' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.d.ts' does not exist.
File '/user/username/projects/externalThingNotPresent.ts' does not exist.
File '/user/username/projects/externalThingNotPresent.tsx' does not exist.
File '/user/username/projects/externalThingNotPresent.d.ts' does not exist.
File '/user/username/externalThingNotPresent.ts' does not exist.
File '/user/username/externalThingNotPresent.tsx' does not exist.
File '/user/username/externalThingNotPresent.d.ts' does not exist.
File '/user/externalThingNotPresent.ts' does not exist.
File '/user/externalThingNotPresent.tsx' does not exist.
File '/user/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/user/username/projects/myproject/src/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/node_modules' does not exist, skipping all lookups in it.
Directory '/user/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/user/username/projects/myproject/src/externalThingNotPresent.js' does not exist.
File '/user/username/projects/myproject/src/externalThingNotPresent.jsx' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.js' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.jsx' does not exist.
File '/user/username/projects/externalThingNotPresent.js' does not exist.
File '/user/username/projects/externalThingNotPresent.jsx' does not exist.
File '/user/username/externalThingNotPresent.js' does not exist.
File '/user/username/externalThingNotPresent.jsx' does not exist.
File '/user/externalThingNotPresent.js' does not exist.
File '/user/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/user/username/projects/myproject/src/main.ts'. ========
Resolution for module './fileNotFound' was found in cache from location '/user/username/projects/myproject/src'.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/user/username/projects/myproject/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/user/username/projects/myproject/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
[96msrc/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/globalAnotherFileWithSameReferenes.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/user/username/projects/myproject/src/globalFileNotFound.ts' not found.

[7m2[0m /// <reference path="./globalFileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/globalMain.ts[0m:[93m3[0m:[93m22[0m - [91merror[0m[90m TS6053: [0mFile '/user/username/projects/myproject/src/globalFileNotFound.ts' not found.

[7m3[0m /// <reference path="./globalFileNotFound.ts"/>
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[[90m12:01:05 AM[0m] Found 6 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/filePresent.ts
/user/username/projects/myproject/src/externalThing.d.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/types.ts
/user/username/projects/myproject/src/fileWithRef.ts
/user/username/projects/myproject/src/globalFilePresent.ts
/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts
/user/username/projects/myproject/src/globalNewFile.ts
/user/username/projects/myproject/src/globalMain.ts
/user/username/projects/myproject/src/main.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/filePresent.ts
/user/username/projects/myproject/src/externalThing.d.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/types.ts
/user/username/projects/myproject/src/fileWithRef.ts
/user/username/projects/myproject/src/globalFilePresent.ts
/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts
/user/username/projects/myproject/src/globalNewFile.ts
/user/username/projects/myproject/src/globalMain.ts
/user/username/projects/myproject/src/main.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/src/anotherfilereusingresolution.ts:
  {"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.d.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/filePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/filewithref.ts:
  {"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalanotherfilewithsamereferenes.ts:
  {"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalmain.ts:
  {"fileName":"/user/username/projects/myproject/src/globalMain.ts","pollingInterval":250}
/user/username/projects/myproject/src/main.ts:
  {"fileName":"/user/username/projects/myproject/src/main.ts","pollingInterval":250}
/user/username/projects/myproject/src/types.ts:
  {"fileName":"/user/username/projects/myproject/src/types.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalnewfile.ts:
  {"fileName":"/user/username/projects/myproject/src/globalNewFile.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./src/globalfilenotfound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/anotherFileReusingResolution.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-13601649692-export declare function something(): number;\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10760962856-interface SomeType {\n}\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-1928648610-/// <reference path=\"types.d.ts\" />\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-7731522637-declare function globalSomething(): number;\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-13665089706-/// <reference path=\"globalFilePresent.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4030514825-declare function globalFoo(): number;\n","affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":"6306495272-/// <reference path=\"globalNewFile.d.ts\" />\n/// <reference path=\"globalFilePresent.d.ts\" />\ndeclare function globalMain(): void;\n","affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"}],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"persistResolutions":true,"traceResolution":true,"watch":true},"fileIdsList":[[2,3],[5],[7,12],[7,9,12]],"referencedMap":[[4,1],[6,2],[8,3],[10,4],[11,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[4,[{"file":"./src/anotherfilereusingresolution.ts","start":70,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],3,2,6,8,7,10,9,[11,[{"file":"./src/main.ts","start":127,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/main.ts","start":224,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],5],"affectedFilesPendingEmit":[[4,1],[3,1],[2,1],[6,1],[8,1],[7,1],[10,1],[9,1],[11,1],[5,1]],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":13,"originalFileName":13,"path":2,"resolvedPath":2,"version":"11598859296-export function something() { return 10; }","flags":0,"includeReasons":[{"kind":3,"file":4,"index":0},{"kind":0,"index":2},{"kind":3,"file":11,"index":0},{"kind":3,"file":11,"index":1}]},{"fileName":14,"originalFileName":14,"path":3,"resolvedPath":3,"version":"5686005290-export function externalThing1(): number;","flags":0,"includeReasons":[{"kind":3,"file":4,"index":2},{"kind":0,"index":1},{"kind":3,"file":11,"index":3}]},{"fileName":15,"originalFileName":15,"path":4,"resolvedPath":4,"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":0}]},{"fileName":5,"originalFileName":5,"path":5,"resolvedPath":5,"version":"-12575322908-interface SomeType {}","flags":0,"includeReasons":[{"kind":4,"file":6,"index":0},{"kind":0,"index":9}]},{"fileName":16,"originalFileName":16,"path":6,"resolvedPath":6,"version":"-6085631553-/// <reference path=\"./types.ts\"/>","flags":0,"referencedFiles":["./types.ts"],"includeReasons":[{"kind":0,"index":3}]},{"fileName":17,"originalFileName":17,"path":7,"resolvedPath":7,"version":"-5627034801-function globalSomething() { return 10; }","flags":0,"includeReasons":[{"kind":4,"file":8,"index":0},{"kind":0,"index":5},{"kind":4,"file":10,"index":1}]},{"fileName":18,"originalFileName":18,"path":8,"resolvedPath":8,"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":4}]},{"fileName":19,"originalFileName":19,"path":9,"resolvedPath":9,"version":"4916490342-function globalFoo() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":10,"index":0},{"kind":0,"index":7}]},{"fileName":20,"originalFileName":20,"path":10,"resolvedPath":10,"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","flags":0,"referencedFiles":["./globalNewFile.ts","./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":6}]},{"fileName":11,"originalFileName":11,"path":11,"resolvedPath":11,"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":8}]}],"rootFileNames":[15,14,13,16,18,17,20,19,11,5],"filesByName":[[12,0]],"fileProcessingDiagnostics":[{"kind":1,"fileProcessingReason":{"kind":4,"file":8,"index":1},"diagnostic":"File_0_not_found","args":["/user/username/projects/myproject/src/globalFileNotFound.ts"]},{"kind":1,"fileProcessingReason":{"kind":4,"file":10,"index":2},"diagnostic":"File_0_not_found","args":["/user/username/projects/myproject/src/globalFileNotFound.ts"]}],"resolutions":[{"resolvedModule":{"resolvedFileName":13,"extension":".ts"}},{"failedLookupLocations":[21,22,23,24,25]},{"resolvedModule":{"resolvedFileName":14,"extension":".d.ts"},"failedLookupLocations":[26,27]},{"failedLookupLocations":[28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75]}]}},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/main.ts",
      "./src/globalfilenotfound.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.js",
      "./src/fileNotFound.jsx",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "../../../externalThingNotPresent.ts",
      "../../../externalThingNotPresent.tsx",
      "../../../externalThingNotPresent.d.ts",
      "../../../../externalThingNotPresent.ts",
      "../../../../externalThingNotPresent.tsx",
      "../../../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../../node_modules/@types/externalThingNotPresent/package.json",
      "../../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../../../node_modules/@types/externalThingNotPresent/package.json",
      "../../../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx",
      "../../../externalThingNotPresent.js",
      "../../../externalThingNotPresent.jsx",
      "../../../../externalThingNotPresent.js",
      "../../../../externalThingNotPresent.jsx"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalnewfile.ts",
        "./src/globalfilenotfound.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }",
        "signature": "-13601649692-export declare function something(): number;\n"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;",
        "signature": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-3531856636-export {};\n"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "signature": "-10760962856-interface SomeType {\n}\n",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
        "signature": "-1928648610-/// <reference path=\"types.d.ts\" />\n"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "signature": "-7731522637-declare function globalSomething(): number;\n",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "signature": "-13665089706-/// <reference path=\"globalFilePresent.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "signature": "4030514825-declare function globalFoo(): number;\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
        "signature": "6306495272-/// <reference path=\"globalNewFile.d.ts\" />\n/// <reference path=\"globalFilePresent.d.ts\" />\ndeclare function globalMain(): void;\n",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-3531856636-export {};\n"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "persistResolutions": true,
      "traceResolution": true,
      "watch": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalnewfile.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      [
        "./src/anotherfilereusingresolution.ts",
        [
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 70,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 167,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/externalthing.d.ts",
      "./src/filepresent.ts",
      "./src/filewithref.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalfilepresent.ts",
      "./src/globalmain.ts",
      "./src/globalnewfile.ts",
      [
        "./src/main.ts",
        [
          {
            "file": "./src/main.ts",
            "start": 127,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/main.ts",
            "start": 224,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/types.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./src/anotherfilereusingresolution.ts",
        "Full"
      ],
      [
        "./src/externalthing.d.ts",
        "Full"
      ],
      [
        "./src/filepresent.ts",
        "Full"
      ],
      [
        "./src/filewithref.ts",
        "Full"
      ],
      [
        "./src/globalanotherfilewithsamereferenes.ts",
        "Full"
      ],
      [
        "./src/globalfilepresent.ts",
        "Full"
      ],
      [
        "./src/globalmain.ts",
        "Full"
      ],
      [
        "./src/globalnewfile.ts",
        "Full"
      ],
      [
        "./src/main.ts",
        "Full"
      ],
      [
        "./src/types.ts",
        "Full"
      ]
    ],
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../../../a/lib/lib.d.ts",
          "originalFileName": "../../../../a/lib/lib.d.ts",
          "path": "../../../../a/lib/lib.d.ts",
          "resolvedPath": "../../../../a/lib/lib.d.ts",
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": "LibFile"
            }
          ]
        },
        {
          "fileName": "./src/filePresent.ts",
          "originalFileName": "./src/filePresent.ts",
          "path": "./src/filepresent.ts",
          "resolvedPath": "./src/filepresent.ts",
          "version": "11598859296-export function something() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 2
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 0
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/externalThing.d.ts",
          "originalFileName": "./src/externalThing.d.ts",
          "path": "./src/externalthing.d.ts",
          "resolvedPath": "./src/externalthing.d.ts",
          "version": "5686005290-export function externalThing1(): number;",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 2
            },
            {
              "kind": "RootFile",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/anotherFileReusingResolution.ts",
          "originalFileName": "./src/anotherFileReusingResolution.ts",
          "path": "./src/anotherfilereusingresolution.ts",
          "resolvedPath": "./src/anotherfilereusingresolution.ts",
          "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "failedLookupLocations": [
                  "./src/fileNotFound.ts",
                  "./src/fileNotFound.tsx",
                  "./src/fileNotFound.d.ts",
                  "./src/fileNotFound.js",
                  "./src/fileNotFound.jsx"
                ]
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "../../../externalThingNotPresent.ts",
                  "../../../externalThingNotPresent.tsx",
                  "../../../externalThingNotPresent.d.ts",
                  "../../../../externalThingNotPresent.ts",
                  "../../../../externalThingNotPresent.tsx",
                  "../../../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx",
                  "../../../externalThingNotPresent.js",
                  "../../../externalThingNotPresent.jsx",
                  "../../../../externalThingNotPresent.js",
                  "../../../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 0
            }
          ]
        },
        {
          "fileName": "./src/types.ts",
          "originalFileName": "./src/types.ts",
          "path": "./src/types.ts",
          "resolvedPath": "./src/types.ts",
          "version": "-12575322908-interface SomeType {}",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/filewithref.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 9
            }
          ]
        },
        {
          "fileName": "./src/fileWithRef.ts",
          "originalFileName": "./src/fileWithRef.ts",
          "path": "./src/filewithref.ts",
          "resolvedPath": "./src/filewithref.ts",
          "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
          "flags": 0,
          "referencedFiles": [
            "./types.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/globalFilePresent.ts",
          "originalFileName": "./src/globalFilePresent.ts",
          "path": "./src/globalfilepresent.ts",
          "resolvedPath": "./src/globalfilepresent.ts",
          "version": "-5627034801-function globalSomething() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 5
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "originalFileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "path": "./src/globalanotherfilewithsamereferenes.ts",
          "resolvedPath": "./src/globalanotherfilewithsamereferenes.ts",
          "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
          "flags": 0,
          "referencedFiles": [
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/globalNewFile.ts",
          "originalFileName": "./src/globalNewFile.ts",
          "path": "./src/globalnewfile.ts",
          "resolvedPath": "./src/globalnewfile.ts",
          "version": "4916490342-function globalFoo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 7
            }
          ]
        },
        {
          "fileName": "./src/globalMain.ts",
          "originalFileName": "./src/globalMain.ts",
          "path": "./src/globalmain.ts",
          "resolvedPath": "./src/globalmain.ts",
          "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
          "flags": 0,
          "referencedFiles": [
            "./globalNewFile.ts",
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 6
            }
          ]
        },
        {
          "fileName": "./src/main.ts",
          "originalFileName": "./src/main.ts",
          "path": "./src/main.ts",
          "resolvedPath": "./src/main.ts",
          "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "failedLookupLocations": [
                  "./src/fileNotFound.ts",
                  "./src/fileNotFound.tsx",
                  "./src/fileNotFound.d.ts",
                  "./src/fileNotFound.js",
                  "./src/fileNotFound.jsx"
                ]
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "../../../externalThingNotPresent.ts",
                  "../../../externalThingNotPresent.tsx",
                  "../../../externalThingNotPresent.d.ts",
                  "../../../../externalThingNotPresent.ts",
                  "../../../../externalThingNotPresent.tsx",
                  "../../../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx",
                  "../../../externalThingNotPresent.js",
                  "../../../externalThingNotPresent.jsx",
                  "../../../../externalThingNotPresent.js",
                  "../../../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 8
            }
          ]
        }
      ],
      "rootFileNames": [
        "./src/anotherFileReusingResolution.ts",
        "./src/externalThing.d.ts",
        "./src/filePresent.ts",
        "./src/fileWithRef.ts",
        "./src/globalAnotherFileWithSameReferenes.ts",
        "./src/globalFilePresent.ts",
        "./src/globalMain.ts",
        "./src/globalNewFile.ts",
        "./src/main.ts",
        "./src/types.ts"
      ],
      "filesByName": {
        "./src/globalfilenotfound.ts": 0
      },
      "fileProcessingDiagnostics": [
        {
          "kind": "FilePreprocessingFileExplainingDiagnostic",
          "fileProcessingReason": {
            "kind": "ReferenceFile",
            "file": "./src/globalanotherfilewithsamereferenes.ts",
            "index": 1
          },
          "diagnostic": "File_0_not_found",
          "args": [
            "/user/username/projects/myproject/src/globalFileNotFound.ts"
          ]
        },
        {
          "kind": "FilePreprocessingFileExplainingDiagnostic",
          "fileProcessingReason": {
            "kind": "ReferenceFile",
            "file": "./src/globalmain.ts",
            "index": 2
          },
          "diagnostic": "File_0_not_found",
          "args": [
            "/user/username/projects/myproject/src/globalFileNotFound.ts"
          ]
        }
      ],
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "failedLookupLocations": [
            "./src/fileNotFound.ts",
            "./src/fileNotFound.tsx",
            "./src/fileNotFound.d.ts",
            "./src/fileNotFound.js",
            "./src/fileNotFound.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "../../../externalThingNotPresent.ts",
            "../../../externalThingNotPresent.tsx",
            "../../../externalThingNotPresent.d.ts",
            "../../../../externalThingNotPresent.ts",
            "../../../../externalThingNotPresent.tsx",
            "../../../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../../node_modules/@types/externalThingNotPresent/package.json",
            "../../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../../../node_modules/@types/externalThingNotPresent/package.json",
            "../../../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx",
            "../../../externalThingNotPresent.js",
            "../../../externalThingNotPresent.jsx",
            "../../../../externalThingNotPresent.js",
            "../../../../externalThingNotPresent.jsx"
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 11793
}


Change:: Write file that could not be resolved by referenced path

Input::
//// [/user/username/projects/myproject/src/globalFileNotFound.ts]
function globalSomething2() { return 20; }


Output::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalFileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalFileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
[[90m12:01:08 AM[0m] File change detected. Starting incremental compilation...

FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/globalFileNotFound.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/user/username/projects/myproject/src/fileNotFound.ts' does not exist.
File '/user/username/projects/myproject/src/fileNotFound.tsx' does not exist.
File '/user/username/projects/myproject/src/fileNotFound.d.ts' does not exist.
File '/user/username/projects/myproject/src/fileNotFound.js' does not exist.
File '/user/username/projects/myproject/src/fileNotFound.jsx' does not exist.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/user/username/projects/myproject/src/externalThingNotPresent.ts' does not exist.
File '/user/username/projects/myproject/src/externalThingNotPresent.tsx' does not exist.
File '/user/username/projects/myproject/src/externalThingNotPresent.d.ts' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.ts' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.tsx' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.d.ts' does not exist.
File '/user/username/projects/externalThingNotPresent.ts' does not exist.
File '/user/username/projects/externalThingNotPresent.tsx' does not exist.
File '/user/username/projects/externalThingNotPresent.d.ts' does not exist.
File '/user/username/externalThingNotPresent.ts' does not exist.
File '/user/username/externalThingNotPresent.tsx' does not exist.
File '/user/username/externalThingNotPresent.d.ts' does not exist.
File '/user/externalThingNotPresent.ts' does not exist.
File '/user/externalThingNotPresent.tsx' does not exist.
File '/user/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/user/username/projects/myproject/src/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/node_modules' does not exist, skipping all lookups in it.
Directory '/user/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/user/username/projects/myproject/src/externalThingNotPresent.js' does not exist.
File '/user/username/projects/myproject/src/externalThingNotPresent.jsx' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.js' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.jsx' does not exist.
File '/user/username/projects/externalThingNotPresent.js' does not exist.
File '/user/username/projects/externalThingNotPresent.jsx' does not exist.
File '/user/username/externalThingNotPresent.js' does not exist.
File '/user/username/externalThingNotPresent.jsx' does not exist.
File '/user/externalThingNotPresent.js' does not exist.
File '/user/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/user/username/projects/myproject/src/main.ts'. ========
Resolution for module './fileNotFound' was found in cache from location '/user/username/projects/myproject/src'.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/user/username/projects/myproject/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/user/username/projects/myproject/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
[96msrc/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[[90m12:01:15 AM[0m] Found 4 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/filePresent.ts
/user/username/projects/myproject/src/externalThing.d.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/types.ts
/user/username/projects/myproject/src/fileWithRef.ts
/user/username/projects/myproject/src/globalFilePresent.ts
/user/username/projects/myproject/src/globalFileNotFound.ts
/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts
/user/username/projects/myproject/src/globalNewFile.ts
/user/username/projects/myproject/src/globalMain.ts
/user/username/projects/myproject/src/main.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/filePresent.ts
/user/username/projects/myproject/src/externalThing.d.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/types.ts
/user/username/projects/myproject/src/fileWithRef.ts
/user/username/projects/myproject/src/globalFilePresent.ts
/user/username/projects/myproject/src/globalFileNotFound.ts
/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts
/user/username/projects/myproject/src/globalNewFile.ts
/user/username/projects/myproject/src/globalMain.ts
/user/username/projects/myproject/src/main.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/src/anotherfilereusingresolution.ts:
  {"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.d.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/filePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/filewithref.ts:
  {"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalanotherfilewithsamereferenes.ts:
  {"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalmain.ts:
  {"fileName":"/user/username/projects/myproject/src/globalMain.ts","pollingInterval":250}
/user/username/projects/myproject/src/main.ts:
  {"fileName":"/user/username/projects/myproject/src/main.ts","pollingInterval":250}
/user/username/projects/myproject/src/types.ts:
  {"fileName":"/user/username/projects/myproject/src/types.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalnewfile.ts:
  {"fileName":"/user/username/projects/myproject/src/globalNewFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFileNotFound.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/anotherFileReusingResolution.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-13601649692-export declare function something(): number;\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10760962856-interface SomeType {\n}\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-1928648610-/// <reference path=\"types.d.ts\" />\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-7731522637-declare function globalSomething(): number;\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-5961586139-declare function globalSomething2(): number;\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-17196641480-/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4030514825-declare function globalFoo(): number;\n","affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":"-15417052438-/// <reference path=\"globalNewFile.d.ts\" />\n/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalMain(): void;\n","affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"}],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"persistResolutions":true,"traceResolution":true,"watch":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[12,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[4,[{"file":"./src/anotherfilereusingresolution.ts","start":70,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],3,2,6,9,8,7,11,10,[12,[{"file":"./src/main.ts","start":127,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/main.ts","start":224,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],5],"affectedFilesPendingEmit":[[4,1],[3,1],[2,1],[6,1],[9,1],[8,1],[7,1],[11,1],[10,1],[12,1],[5,1]],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":13,"originalFileName":13,"path":2,"resolvedPath":2,"version":"11598859296-export function something() { return 10; }","flags":0,"includeReasons":[{"kind":3,"file":4,"index":0},{"kind":0,"index":2},{"kind":3,"file":12,"index":0},{"kind":3,"file":12,"index":1}]},{"fileName":14,"originalFileName":14,"path":3,"resolvedPath":3,"version":"5686005290-export function externalThing1(): number;","flags":0,"includeReasons":[{"kind":3,"file":4,"index":2},{"kind":0,"index":1},{"kind":3,"file":12,"index":3}]},{"fileName":15,"originalFileName":15,"path":4,"resolvedPath":4,"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":0}]},{"fileName":5,"originalFileName":5,"path":5,"resolvedPath":5,"version":"-12575322908-interface SomeType {}","flags":0,"includeReasons":[{"kind":4,"file":6,"index":0},{"kind":0,"index":10}]},{"fileName":16,"originalFileName":16,"path":6,"resolvedPath":6,"version":"-6085631553-/// <reference path=\"./types.ts\"/>","flags":0,"referencedFiles":["./types.ts"],"includeReasons":[{"kind":0,"index":3}]},{"fileName":17,"originalFileName":17,"path":7,"resolvedPath":7,"version":"-5627034801-function globalSomething() { return 10; }","flags":0,"includeReasons":[{"kind":4,"file":9,"index":0},{"kind":0,"index":6},{"kind":4,"file":11,"index":1}]},{"fileName":18,"originalFileName":18,"path":8,"resolvedPath":8,"version":"-6310824062-function globalSomething2() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":9,"index":1},{"kind":0,"index":5},{"kind":4,"file":11,"index":2}]},{"fileName":19,"originalFileName":19,"path":9,"resolvedPath":9,"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":4}]},{"fileName":20,"originalFileName":20,"path":10,"resolvedPath":10,"version":"4916490342-function globalFoo() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":11,"index":0},{"kind":0,"index":8}]},{"fileName":21,"originalFileName":21,"path":11,"resolvedPath":11,"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","flags":0,"referencedFiles":["./globalNewFile.ts","./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":7}]},{"fileName":12,"originalFileName":12,"path":12,"resolvedPath":12,"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":9}]}],"rootFileNames":[15,14,13,16,19,18,17,21,20,12,5],"resolutions":[{"resolvedModule":{"resolvedFileName":13,"extension":".ts"}},{"failedLookupLocations":[22,23,24,25,26]},{"resolvedModule":{"resolvedFileName":14,"extension":".d.ts"},"failedLookupLocations":[27,28]},{"failedLookupLocations":[29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76]}]}},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/main.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.js",
      "./src/fileNotFound.jsx",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "../../../externalThingNotPresent.ts",
      "../../../externalThingNotPresent.tsx",
      "../../../externalThingNotPresent.d.ts",
      "../../../../externalThingNotPresent.ts",
      "../../../../externalThingNotPresent.tsx",
      "../../../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../../node_modules/@types/externalThingNotPresent/package.json",
      "../../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../../../node_modules/@types/externalThingNotPresent/package.json",
      "../../../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx",
      "../../../externalThingNotPresent.js",
      "../../../externalThingNotPresent.jsx",
      "../../../../externalThingNotPresent.js",
      "../../../../externalThingNotPresent.jsx"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }",
        "signature": "-13601649692-export declare function something(): number;\n"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;",
        "signature": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-3531856636-export {};\n"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "signature": "-10760962856-interface SomeType {\n}\n",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
        "signature": "-1928648610-/// <reference path=\"types.d.ts\" />\n"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "signature": "-7731522637-declare function globalSomething(): number;\n",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "signature": "-5961586139-declare function globalSomething2(): number;\n",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "signature": "-17196641480-/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "signature": "4030514825-declare function globalFoo(): number;\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
        "signature": "-15417052438-/// <reference path=\"globalNewFile.d.ts\" />\n/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalMain(): void;\n",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-3531856636-export {};\n"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "persistResolutions": true,
      "traceResolution": true,
      "watch": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      [
        "./src/anotherfilereusingresolution.ts",
        [
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 70,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 167,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/externalthing.d.ts",
      "./src/filepresent.ts",
      "./src/filewithref.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalfilepresent.ts",
      "./src/globalmain.ts",
      "./src/globalnewfile.ts",
      [
        "./src/main.ts",
        [
          {
            "file": "./src/main.ts",
            "start": 127,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/main.ts",
            "start": 224,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/types.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./src/anotherfilereusingresolution.ts",
        "Full"
      ],
      [
        "./src/externalthing.d.ts",
        "Full"
      ],
      [
        "./src/filepresent.ts",
        "Full"
      ],
      [
        "./src/filewithref.ts",
        "Full"
      ],
      [
        "./src/globalanotherfilewithsamereferenes.ts",
        "Full"
      ],
      [
        "./src/globalfilenotfound.ts",
        "Full"
      ],
      [
        "./src/globalfilepresent.ts",
        "Full"
      ],
      [
        "./src/globalmain.ts",
        "Full"
      ],
      [
        "./src/globalnewfile.ts",
        "Full"
      ],
      [
        "./src/main.ts",
        "Full"
      ],
      [
        "./src/types.ts",
        "Full"
      ]
    ],
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../../../a/lib/lib.d.ts",
          "originalFileName": "../../../../a/lib/lib.d.ts",
          "path": "../../../../a/lib/lib.d.ts",
          "resolvedPath": "../../../../a/lib/lib.d.ts",
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": "LibFile"
            }
          ]
        },
        {
          "fileName": "./src/filePresent.ts",
          "originalFileName": "./src/filePresent.ts",
          "path": "./src/filepresent.ts",
          "resolvedPath": "./src/filepresent.ts",
          "version": "11598859296-export function something() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 2
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 0
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/externalThing.d.ts",
          "originalFileName": "./src/externalThing.d.ts",
          "path": "./src/externalthing.d.ts",
          "resolvedPath": "./src/externalthing.d.ts",
          "version": "5686005290-export function externalThing1(): number;",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 2
            },
            {
              "kind": "RootFile",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/anotherFileReusingResolution.ts",
          "originalFileName": "./src/anotherFileReusingResolution.ts",
          "path": "./src/anotherfilereusingresolution.ts",
          "resolvedPath": "./src/anotherfilereusingresolution.ts",
          "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "failedLookupLocations": [
                  "./src/fileNotFound.ts",
                  "./src/fileNotFound.tsx",
                  "./src/fileNotFound.d.ts",
                  "./src/fileNotFound.js",
                  "./src/fileNotFound.jsx"
                ]
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "../../../externalThingNotPresent.ts",
                  "../../../externalThingNotPresent.tsx",
                  "../../../externalThingNotPresent.d.ts",
                  "../../../../externalThingNotPresent.ts",
                  "../../../../externalThingNotPresent.tsx",
                  "../../../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx",
                  "../../../externalThingNotPresent.js",
                  "../../../externalThingNotPresent.jsx",
                  "../../../../externalThingNotPresent.js",
                  "../../../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 0
            }
          ]
        },
        {
          "fileName": "./src/types.ts",
          "originalFileName": "./src/types.ts",
          "path": "./src/types.ts",
          "resolvedPath": "./src/types.ts",
          "version": "-12575322908-interface SomeType {}",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/filewithref.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 10
            }
          ]
        },
        {
          "fileName": "./src/fileWithRef.ts",
          "originalFileName": "./src/fileWithRef.ts",
          "path": "./src/filewithref.ts",
          "resolvedPath": "./src/filewithref.ts",
          "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
          "flags": 0,
          "referencedFiles": [
            "./types.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/globalFilePresent.ts",
          "originalFileName": "./src/globalFilePresent.ts",
          "path": "./src/globalfilepresent.ts",
          "resolvedPath": "./src/globalfilepresent.ts",
          "version": "-5627034801-function globalSomething() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 6
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/globalFileNotFound.ts",
          "originalFileName": "./src/globalFileNotFound.ts",
          "path": "./src/globalfilenotfound.ts",
          "resolvedPath": "./src/globalfilenotfound.ts",
          "version": "-6310824062-function globalSomething2() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 1
            },
            {
              "kind": "RootFile",
              "index": 5
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "originalFileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "path": "./src/globalanotherfilewithsamereferenes.ts",
          "resolvedPath": "./src/globalanotherfilewithsamereferenes.ts",
          "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
          "flags": 0,
          "referencedFiles": [
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/globalNewFile.ts",
          "originalFileName": "./src/globalNewFile.ts",
          "path": "./src/globalnewfile.ts",
          "resolvedPath": "./src/globalnewfile.ts",
          "version": "4916490342-function globalFoo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 8
            }
          ]
        },
        {
          "fileName": "./src/globalMain.ts",
          "originalFileName": "./src/globalMain.ts",
          "path": "./src/globalmain.ts",
          "resolvedPath": "./src/globalmain.ts",
          "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
          "flags": 0,
          "referencedFiles": [
            "./globalNewFile.ts",
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 7
            }
          ]
        },
        {
          "fileName": "./src/main.ts",
          "originalFileName": "./src/main.ts",
          "path": "./src/main.ts",
          "resolvedPath": "./src/main.ts",
          "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "failedLookupLocations": [
                  "./src/fileNotFound.ts",
                  "./src/fileNotFound.tsx",
                  "./src/fileNotFound.d.ts",
                  "./src/fileNotFound.js",
                  "./src/fileNotFound.jsx"
                ]
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "../../../externalThingNotPresent.ts",
                  "../../../externalThingNotPresent.tsx",
                  "../../../externalThingNotPresent.d.ts",
                  "../../../../externalThingNotPresent.ts",
                  "../../../../externalThingNotPresent.tsx",
                  "../../../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx",
                  "../../../externalThingNotPresent.js",
                  "../../../externalThingNotPresent.jsx",
                  "../../../../externalThingNotPresent.js",
                  "../../../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 9
            }
          ]
        }
      ],
      "rootFileNames": [
        "./src/anotherFileReusingResolution.ts",
        "./src/externalThing.d.ts",
        "./src/filePresent.ts",
        "./src/fileWithRef.ts",
        "./src/globalAnotherFileWithSameReferenes.ts",
        "./src/globalFileNotFound.ts",
        "./src/globalFilePresent.ts",
        "./src/globalMain.ts",
        "./src/globalNewFile.ts",
        "./src/main.ts",
        "./src/types.ts"
      ],
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "failedLookupLocations": [
            "./src/fileNotFound.ts",
            "./src/fileNotFound.tsx",
            "./src/fileNotFound.d.ts",
            "./src/fileNotFound.js",
            "./src/fileNotFound.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "../../../externalThingNotPresent.ts",
            "../../../externalThingNotPresent.tsx",
            "../../../externalThingNotPresent.d.ts",
            "../../../../externalThingNotPresent.ts",
            "../../../../externalThingNotPresent.tsx",
            "../../../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../../node_modules/@types/externalThingNotPresent/package.json",
            "../../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../../../node_modules/@types/externalThingNotPresent/package.json",
            "../../../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx",
            "../../../externalThingNotPresent.js",
            "../../../externalThingNotPresent.jsx",
            "../../../../externalThingNotPresent.js",
            "../../../../externalThingNotPresent.jsx"
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 11966
}


Change:: Modify main file

Input::
//// [/user/username/projects/myproject/src/main.ts]
import { something } from "./filePresent";
import { something as something1 } from "./filePresent";
import { something2 } from "./fileNotFound";
import { externalThing1 } from "externalThing";
import { externalThing2 } from "externalThingNotPresent";something();


Output::
FileWatcher:: Triggered with /user/username/projects/myproject/src/main.ts 1:: WatchInfo: /user/username/projects/myproject/src/main.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/src/main.ts 1:: WatchInfo: /user/username/projects/myproject/src/main.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
[[90m12:01:18 AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/user/username/projects/myproject/src/main.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/user/username/projects/myproject/src/fileNotFound.ts' does not exist.
File '/user/username/projects/myproject/src/fileNotFound.tsx' does not exist.
File '/user/username/projects/myproject/src/fileNotFound.d.ts' does not exist.
File '/user/username/projects/myproject/src/fileNotFound.js' does not exist.
File '/user/username/projects/myproject/src/fileNotFound.jsx' does not exist.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/user/username/projects/myproject/src/main.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/user/username/projects/myproject/src/externalThingNotPresent.ts' does not exist.
File '/user/username/projects/myproject/src/externalThingNotPresent.tsx' does not exist.
File '/user/username/projects/myproject/src/externalThingNotPresent.d.ts' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.ts' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.tsx' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.d.ts' does not exist.
File '/user/username/projects/externalThingNotPresent.ts' does not exist.
File '/user/username/projects/externalThingNotPresent.tsx' does not exist.
File '/user/username/projects/externalThingNotPresent.d.ts' does not exist.
File '/user/username/externalThingNotPresent.ts' does not exist.
File '/user/username/externalThingNotPresent.tsx' does not exist.
File '/user/username/externalThingNotPresent.d.ts' does not exist.
File '/user/externalThingNotPresent.ts' does not exist.
File '/user/externalThingNotPresent.tsx' does not exist.
File '/user/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/user/username/projects/myproject/src/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/node_modules' does not exist, skipping all lookups in it.
Directory '/user/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/user/username/projects/myproject/src/externalThingNotPresent.js' does not exist.
File '/user/username/projects/myproject/src/externalThingNotPresent.jsx' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.js' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.jsx' does not exist.
File '/user/username/projects/externalThingNotPresent.js' does not exist.
File '/user/username/projects/externalThingNotPresent.jsx' does not exist.
File '/user/username/externalThingNotPresent.js' does not exist.
File '/user/username/externalThingNotPresent.jsx' does not exist.
File '/user/externalThingNotPresent.js' does not exist.
File '/user/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
[96msrc/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";something();
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[[90m12:01:25 AM[0m] Found 4 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/filePresent.ts
/user/username/projects/myproject/src/externalThing.d.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/types.ts
/user/username/projects/myproject/src/fileWithRef.ts
/user/username/projects/myproject/src/globalFilePresent.ts
/user/username/projects/myproject/src/globalFileNotFound.ts
/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts
/user/username/projects/myproject/src/globalNewFile.ts
/user/username/projects/myproject/src/globalMain.ts
/user/username/projects/myproject/src/main.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/src/main.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/src/anotherfilereusingresolution.ts:
  {"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.d.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/filePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/filewithref.ts:
  {"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalanotherfilewithsamereferenes.ts:
  {"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalmain.ts:
  {"fileName":"/user/username/projects/myproject/src/globalMain.ts","pollingInterval":250}
/user/username/projects/myproject/src/main.ts:
  {"fileName":"/user/username/projects/myproject/src/main.ts","pollingInterval":250}
/user/username/projects/myproject/src/types.ts:
  {"fileName":"/user/username/projects/myproject/src/types.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalnewfile.ts:
  {"fileName":"/user/username/projects/myproject/src/globalNewFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFileNotFound.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/anotherFileReusingResolution.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-13601649692-export declare function something(): number;\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10760962856-interface SomeType {\n}\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-1928648610-/// <reference path=\"types.d.ts\" />\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-7731522637-declare function globalSomething(): number;\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-5961586139-declare function globalSomething2(): number;\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-17196641480-/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4030514825-declare function globalFoo(): number;\n","affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":"-15417052438-/// <reference path=\"globalNewFile.d.ts\" />\n/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalMain(): void;\n","affectsGlobalScope":true},{"version":"-22898386493-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":"-3531856636-export {};\n"}],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"persistResolutions":true,"traceResolution":true,"watch":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[12,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[4,[{"file":"./src/anotherfilereusingresolution.ts","start":70,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],3,2,6,9,8,7,11,10,[12,[{"file":"./src/main.ts","start":127,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/main.ts","start":224,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],5],"affectedFilesPendingEmit":[[4,1],[3,1],[2,1],[6,1],[9,1],[8,1],[7,1],[11,1],[10,1],[12,1],[5,1]],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":13,"originalFileName":13,"path":2,"resolvedPath":2,"version":"11598859296-export function something() { return 10; }","flags":0,"includeReasons":[{"kind":3,"file":4,"index":0},{"kind":0,"index":2},{"kind":3,"file":12,"index":0},{"kind":3,"file":12,"index":1}]},{"fileName":14,"originalFileName":14,"path":3,"resolvedPath":3,"version":"5686005290-export function externalThing1(): number;","flags":0,"includeReasons":[{"kind":3,"file":4,"index":2},{"kind":0,"index":1},{"kind":3,"file":12,"index":3}]},{"fileName":15,"originalFileName":15,"path":4,"resolvedPath":4,"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":0}]},{"fileName":5,"originalFileName":5,"path":5,"resolvedPath":5,"version":"-12575322908-interface SomeType {}","flags":0,"includeReasons":[{"kind":4,"file":6,"index":0},{"kind":0,"index":10}]},{"fileName":16,"originalFileName":16,"path":6,"resolvedPath":6,"version":"-6085631553-/// <reference path=\"./types.ts\"/>","flags":0,"referencedFiles":["./types.ts"],"includeReasons":[{"kind":0,"index":3}]},{"fileName":17,"originalFileName":17,"path":7,"resolvedPath":7,"version":"-5627034801-function globalSomething() { return 10; }","flags":0,"includeReasons":[{"kind":4,"file":9,"index":0},{"kind":0,"index":6},{"kind":4,"file":11,"index":1}]},{"fileName":18,"originalFileName":18,"path":8,"resolvedPath":8,"version":"-6310824062-function globalSomething2() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":9,"index":1},{"kind":0,"index":5},{"kind":4,"file":11,"index":2}]},{"fileName":19,"originalFileName":19,"path":9,"resolvedPath":9,"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":4}]},{"fileName":20,"originalFileName":20,"path":10,"resolvedPath":10,"version":"4916490342-function globalFoo() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":11,"index":0},{"kind":0,"index":8}]},{"fileName":21,"originalFileName":21,"path":11,"resolvedPath":11,"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","flags":0,"referencedFiles":["./globalNewFile.ts","./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":7}]},{"fileName":12,"originalFileName":12,"path":12,"resolvedPath":12,"version":"-22898386493-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":9}]}],"rootFileNames":[15,14,13,16,19,18,17,21,20,12,5],"resolutions":[{"resolvedModule":{"resolvedFileName":13,"extension":".ts"}},{"failedLookupLocations":[22,23,24,25,26]},{"resolvedModule":{"resolvedFileName":14,"extension":".d.ts"},"failedLookupLocations":[27,28]},{"failedLookupLocations":[29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76]}]}},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/main.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.js",
      "./src/fileNotFound.jsx",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "../../../externalThingNotPresent.ts",
      "../../../externalThingNotPresent.tsx",
      "../../../externalThingNotPresent.d.ts",
      "../../../../externalThingNotPresent.ts",
      "../../../../externalThingNotPresent.tsx",
      "../../../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../../node_modules/@types/externalThingNotPresent/package.json",
      "../../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../../../node_modules/@types/externalThingNotPresent/package.json",
      "../../../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx",
      "../../../externalThingNotPresent.js",
      "../../../externalThingNotPresent.jsx",
      "../../../../externalThingNotPresent.js",
      "../../../../externalThingNotPresent.jsx"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }",
        "signature": "-13601649692-export declare function something(): number;\n"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;",
        "signature": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-3531856636-export {};\n"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "signature": "-10760962856-interface SomeType {\n}\n",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
        "signature": "-1928648610-/// <reference path=\"types.d.ts\" />\n"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "signature": "-7731522637-declare function globalSomething(): number;\n",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "signature": "-5961586139-declare function globalSomething2(): number;\n",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "signature": "-17196641480-/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "signature": "4030514825-declare function globalFoo(): number;\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
        "signature": "-15417052438-/// <reference path=\"globalNewFile.d.ts\" />\n/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalMain(): void;\n",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-22898386493-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();",
        "signature": "-3531856636-export {};\n"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "persistResolutions": true,
      "traceResolution": true,
      "watch": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      [
        "./src/anotherfilereusingresolution.ts",
        [
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 70,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 167,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/externalthing.d.ts",
      "./src/filepresent.ts",
      "./src/filewithref.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalfilepresent.ts",
      "./src/globalmain.ts",
      "./src/globalnewfile.ts",
      [
        "./src/main.ts",
        [
          {
            "file": "./src/main.ts",
            "start": 127,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/main.ts",
            "start": 224,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/types.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./src/anotherfilereusingresolution.ts",
        "Full"
      ],
      [
        "./src/externalthing.d.ts",
        "Full"
      ],
      [
        "./src/filepresent.ts",
        "Full"
      ],
      [
        "./src/filewithref.ts",
        "Full"
      ],
      [
        "./src/globalanotherfilewithsamereferenes.ts",
        "Full"
      ],
      [
        "./src/globalfilenotfound.ts",
        "Full"
      ],
      [
        "./src/globalfilepresent.ts",
        "Full"
      ],
      [
        "./src/globalmain.ts",
        "Full"
      ],
      [
        "./src/globalnewfile.ts",
        "Full"
      ],
      [
        "./src/main.ts",
        "Full"
      ],
      [
        "./src/types.ts",
        "Full"
      ]
    ],
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../../../a/lib/lib.d.ts",
          "originalFileName": "../../../../a/lib/lib.d.ts",
          "path": "../../../../a/lib/lib.d.ts",
          "resolvedPath": "../../../../a/lib/lib.d.ts",
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": "LibFile"
            }
          ]
        },
        {
          "fileName": "./src/filePresent.ts",
          "originalFileName": "./src/filePresent.ts",
          "path": "./src/filepresent.ts",
          "resolvedPath": "./src/filepresent.ts",
          "version": "11598859296-export function something() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 2
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 0
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/externalThing.d.ts",
          "originalFileName": "./src/externalThing.d.ts",
          "path": "./src/externalthing.d.ts",
          "resolvedPath": "./src/externalthing.d.ts",
          "version": "5686005290-export function externalThing1(): number;",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 2
            },
            {
              "kind": "RootFile",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/anotherFileReusingResolution.ts",
          "originalFileName": "./src/anotherFileReusingResolution.ts",
          "path": "./src/anotherfilereusingresolution.ts",
          "resolvedPath": "./src/anotherfilereusingresolution.ts",
          "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "failedLookupLocations": [
                  "./src/fileNotFound.ts",
                  "./src/fileNotFound.tsx",
                  "./src/fileNotFound.d.ts",
                  "./src/fileNotFound.js",
                  "./src/fileNotFound.jsx"
                ]
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "../../../externalThingNotPresent.ts",
                  "../../../externalThingNotPresent.tsx",
                  "../../../externalThingNotPresent.d.ts",
                  "../../../../externalThingNotPresent.ts",
                  "../../../../externalThingNotPresent.tsx",
                  "../../../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx",
                  "../../../externalThingNotPresent.js",
                  "../../../externalThingNotPresent.jsx",
                  "../../../../externalThingNotPresent.js",
                  "../../../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 0
            }
          ]
        },
        {
          "fileName": "./src/types.ts",
          "originalFileName": "./src/types.ts",
          "path": "./src/types.ts",
          "resolvedPath": "./src/types.ts",
          "version": "-12575322908-interface SomeType {}",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/filewithref.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 10
            }
          ]
        },
        {
          "fileName": "./src/fileWithRef.ts",
          "originalFileName": "./src/fileWithRef.ts",
          "path": "./src/filewithref.ts",
          "resolvedPath": "./src/filewithref.ts",
          "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
          "flags": 0,
          "referencedFiles": [
            "./types.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/globalFilePresent.ts",
          "originalFileName": "./src/globalFilePresent.ts",
          "path": "./src/globalfilepresent.ts",
          "resolvedPath": "./src/globalfilepresent.ts",
          "version": "-5627034801-function globalSomething() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 6
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/globalFileNotFound.ts",
          "originalFileName": "./src/globalFileNotFound.ts",
          "path": "./src/globalfilenotfound.ts",
          "resolvedPath": "./src/globalfilenotfound.ts",
          "version": "-6310824062-function globalSomething2() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 1
            },
            {
              "kind": "RootFile",
              "index": 5
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "originalFileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "path": "./src/globalanotherfilewithsamereferenes.ts",
          "resolvedPath": "./src/globalanotherfilewithsamereferenes.ts",
          "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
          "flags": 0,
          "referencedFiles": [
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/globalNewFile.ts",
          "originalFileName": "./src/globalNewFile.ts",
          "path": "./src/globalnewfile.ts",
          "resolvedPath": "./src/globalnewfile.ts",
          "version": "4916490342-function globalFoo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 8
            }
          ]
        },
        {
          "fileName": "./src/globalMain.ts",
          "originalFileName": "./src/globalMain.ts",
          "path": "./src/globalmain.ts",
          "resolvedPath": "./src/globalmain.ts",
          "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
          "flags": 0,
          "referencedFiles": [
            "./globalNewFile.ts",
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 7
            }
          ]
        },
        {
          "fileName": "./src/main.ts",
          "originalFileName": "./src/main.ts",
          "path": "./src/main.ts",
          "resolvedPath": "./src/main.ts",
          "version": "-22898386493-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "failedLookupLocations": [
                  "./src/fileNotFound.ts",
                  "./src/fileNotFound.tsx",
                  "./src/fileNotFound.d.ts",
                  "./src/fileNotFound.js",
                  "./src/fileNotFound.jsx"
                ]
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "../../../externalThingNotPresent.ts",
                  "../../../externalThingNotPresent.tsx",
                  "../../../externalThingNotPresent.d.ts",
                  "../../../../externalThingNotPresent.ts",
                  "../../../../externalThingNotPresent.tsx",
                  "../../../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx",
                  "../../../externalThingNotPresent.js",
                  "../../../externalThingNotPresent.jsx",
                  "../../../../externalThingNotPresent.js",
                  "../../../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 9
            }
          ]
        }
      ],
      "rootFileNames": [
        "./src/anotherFileReusingResolution.ts",
        "./src/externalThing.d.ts",
        "./src/filePresent.ts",
        "./src/fileWithRef.ts",
        "./src/globalAnotherFileWithSameReferenes.ts",
        "./src/globalFileNotFound.ts",
        "./src/globalFilePresent.ts",
        "./src/globalMain.ts",
        "./src/globalNewFile.ts",
        "./src/main.ts",
        "./src/types.ts"
      ],
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "failedLookupLocations": [
            "./src/fileNotFound.ts",
            "./src/fileNotFound.tsx",
            "./src/fileNotFound.d.ts",
            "./src/fileNotFound.js",
            "./src/fileNotFound.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "../../../externalThingNotPresent.ts",
            "../../../externalThingNotPresent.tsx",
            "../../../externalThingNotPresent.d.ts",
            "../../../../externalThingNotPresent.ts",
            "../../../../externalThingNotPresent.tsx",
            "../../../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../../node_modules/@types/externalThingNotPresent/package.json",
            "../../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../../../node_modules/@types/externalThingNotPresent/package.json",
            "../../../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx",
            "../../../externalThingNotPresent.js",
            "../../../externalThingNotPresent.jsx",
            "../../../../externalThingNotPresent.js",
            "../../../../externalThingNotPresent.jsx"
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 11990
}


Change:: Add new module and update main file

Input::
//// [/user/username/projects/myproject/src/main.ts]
import { foo } from "./newFile";import { something } from "./filePresent";
import { something as something1 } from "./filePresent";
import { something2 } from "./fileNotFound";
import { externalThing1 } from "externalThing";
import { externalThing2 } from "externalThingNotPresent";something();

//// [/user/username/projects/myproject/src/newFile.ts]
export function foo() { return 20; }


Output::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/newFile.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/newFile.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
FileWatcher:: Triggered with /user/username/projects/myproject/src/main.ts 1:: WatchInfo: /user/username/projects/myproject/src/main.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/src/main.ts 1:: WatchInfo: /user/username/projects/myproject/src/main.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
[[90m12:01:30 AM[0m] File change detected. Starting incremental compilation...

FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/newFile.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/user/username/projects/myproject/src/fileNotFound.ts' does not exist.
File '/user/username/projects/myproject/src/fileNotFound.tsx' does not exist.
File '/user/username/projects/myproject/src/fileNotFound.d.ts' does not exist.
File '/user/username/projects/myproject/src/fileNotFound.js' does not exist.
File '/user/username/projects/myproject/src/fileNotFound.jsx' does not exist.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/user/username/projects/myproject/src/externalThingNotPresent.ts' does not exist.
File '/user/username/projects/myproject/src/externalThingNotPresent.tsx' does not exist.
File '/user/username/projects/myproject/src/externalThingNotPresent.d.ts' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.ts' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.tsx' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.d.ts' does not exist.
File '/user/username/projects/externalThingNotPresent.ts' does not exist.
File '/user/username/projects/externalThingNotPresent.tsx' does not exist.
File '/user/username/projects/externalThingNotPresent.d.ts' does not exist.
File '/user/username/externalThingNotPresent.ts' does not exist.
File '/user/username/externalThingNotPresent.tsx' does not exist.
File '/user/username/externalThingNotPresent.d.ts' does not exist.
File '/user/externalThingNotPresent.ts' does not exist.
File '/user/externalThingNotPresent.tsx' does not exist.
File '/user/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/user/username/projects/myproject/src/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/node_modules' does not exist, skipping all lookups in it.
Directory '/user/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/user/username/projects/myproject/src/externalThingNotPresent.js' does not exist.
File '/user/username/projects/myproject/src/externalThingNotPresent.jsx' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.js' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.jsx' does not exist.
File '/user/username/projects/externalThingNotPresent.js' does not exist.
File '/user/username/projects/externalThingNotPresent.jsx' does not exist.
File '/user/username/externalThingNotPresent.js' does not exist.
File '/user/username/externalThingNotPresent.jsx' does not exist.
File '/user/externalThingNotPresent.js' does not exist.
File '/user/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
======== Resolving module './newFile' from '/user/username/projects/myproject/src/main.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/user/username/projects/myproject/src/newFile.ts' exist - use it as a name resolution result.
======== Module name './newFile' was successfully resolved to '/user/username/projects/myproject/src/newFile.ts'. ========
======== Resolving module './fileNotFound' from '/user/username/projects/myproject/src/main.ts'. ========
Resolution for module './fileNotFound' was found in cache from location '/user/username/projects/myproject/src'.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThingNotPresent' from '/user/username/projects/myproject/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/user/username/projects/myproject/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
[96msrc/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";something();
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[[90m12:01:37 AM[0m] Found 4 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/filePresent.ts
/user/username/projects/myproject/src/externalThing.d.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/types.ts
/user/username/projects/myproject/src/fileWithRef.ts
/user/username/projects/myproject/src/globalFilePresent.ts
/user/username/projects/myproject/src/globalFileNotFound.ts
/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts
/user/username/projects/myproject/src/globalNewFile.ts
/user/username/projects/myproject/src/globalMain.ts
/user/username/projects/myproject/src/newFile.ts
/user/username/projects/myproject/src/main.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/src/newFile.ts
/user/username/projects/myproject/src/main.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/src/anotherfilereusingresolution.ts:
  {"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.d.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/filePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/filewithref.ts:
  {"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalanotherfilewithsamereferenes.ts:
  {"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalmain.ts:
  {"fileName":"/user/username/projects/myproject/src/globalMain.ts","pollingInterval":250}
/user/username/projects/myproject/src/main.ts:
  {"fileName":"/user/username/projects/myproject/src/main.ts","pollingInterval":250}
/user/username/projects/myproject/src/types.ts:
  {"fileName":"/user/username/projects/myproject/src/types.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalnewfile.ts:
  {"fileName":"/user/username/projects/myproject/src/globalNewFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFileNotFound.ts","pollingInterval":250}
/user/username/projects/myproject/src/newfile.ts:
  {"fileName":"/user/username/projects/myproject/src/newFile.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/anotherFileReusingResolution.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/newFile.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-13601649692-export declare function something(): number;\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10760962856-interface SomeType {\n}\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-1928648610-/// <reference path=\"types.d.ts\" />\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-7731522637-declare function globalSomething(): number;\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-5961586139-declare function globalSomething2(): number;\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-17196641480-/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4030514825-declare function globalFoo(): number;\n","affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":"-15417052438-/// <reference path=\"globalNewFile.d.ts\" />\n/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalMain(): void;\n","affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":"-4788605446-export declare function foo(): number;\n"},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":"-3531856636-export {};\n"}],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"persistResolutions":true,"traceResolution":true,"watch":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10],[2,3,12]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[13,5]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[4,[{"file":"./src/anotherfilereusingresolution.ts","start":70,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],3,2,6,9,8,7,11,10,[13,[{"file":"./src/main.ts","start":159,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/main.ts","start":256,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],12,5],"affectedFilesPendingEmit":[[4,1],[3,1],[2,1],[6,1],[9,1],[8,1],[7,1],[11,1],[10,1],[13,1],[12,1],[5,1]],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":14,"originalFileName":14,"path":2,"resolvedPath":2,"version":"11598859296-export function something() { return 10; }","flags":0,"includeReasons":[{"kind":3,"file":4,"index":0},{"kind":0,"index":2},{"kind":3,"file":13,"index":1},{"kind":3,"file":13,"index":2}]},{"fileName":15,"originalFileName":15,"path":3,"resolvedPath":3,"version":"5686005290-export function externalThing1(): number;","flags":0,"includeReasons":[{"kind":3,"file":4,"index":2},{"kind":0,"index":1},{"kind":3,"file":13,"index":4}]},{"fileName":16,"originalFileName":16,"path":4,"resolvedPath":4,"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":0}]},{"fileName":5,"originalFileName":5,"path":5,"resolvedPath":5,"version":"-12575322908-interface SomeType {}","flags":0,"includeReasons":[{"kind":4,"file":6,"index":0},{"kind":0,"index":11}]},{"fileName":17,"originalFileName":17,"path":6,"resolvedPath":6,"version":"-6085631553-/// <reference path=\"./types.ts\"/>","flags":0,"referencedFiles":["./types.ts"],"includeReasons":[{"kind":0,"index":3}]},{"fileName":18,"originalFileName":18,"path":7,"resolvedPath":7,"version":"-5627034801-function globalSomething() { return 10; }","flags":0,"includeReasons":[{"kind":4,"file":9,"index":0},{"kind":0,"index":6},{"kind":4,"file":11,"index":1}]},{"fileName":19,"originalFileName":19,"path":8,"resolvedPath":8,"version":"-6310824062-function globalSomething2() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":9,"index":1},{"kind":0,"index":5},{"kind":4,"file":11,"index":2}]},{"fileName":20,"originalFileName":20,"path":9,"resolvedPath":9,"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":4}]},{"fileName":21,"originalFileName":21,"path":10,"resolvedPath":10,"version":"4916490342-function globalFoo() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":11,"index":0},{"kind":0,"index":8}]},{"fileName":22,"originalFileName":22,"path":11,"resolvedPath":11,"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","flags":0,"referencedFiles":["./globalNewFile.ts","./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":7}]},{"fileName":23,"originalFileName":23,"path":12,"resolvedPath":12,"version":"4428918903-export function foo() { return 20; }","flags":0,"includeReasons":[{"kind":3,"file":13,"index":0},{"kind":0,"index":10}]},{"fileName":13,"originalFileName":13,"path":13,"resolvedPath":13,"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","flags":0,"imports":[{"kind":10,"text":"./newFile"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./newFile",5],["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":9}]}],"rootFileNames":[16,15,14,17,20,19,18,22,21,13,23,5],"resolutions":[{"resolvedModule":{"resolvedFileName":14,"extension":".ts"}},{"failedLookupLocations":[24,25,26,27,28]},{"resolvedModule":{"resolvedFileName":15,"extension":".d.ts"},"failedLookupLocations":[29,30]},{"failedLookupLocations":[31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78]},{"resolvedModule":{"resolvedFileName":23,"extension":".ts"}}]}},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/newfile.ts",
      "./src/main.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/newFile.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.js",
      "./src/fileNotFound.jsx",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "../../../externalThingNotPresent.ts",
      "../../../externalThingNotPresent.tsx",
      "../../../externalThingNotPresent.d.ts",
      "../../../../externalThingNotPresent.ts",
      "../../../../externalThingNotPresent.tsx",
      "../../../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../../node_modules/@types/externalThingNotPresent/package.json",
      "../../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../../../node_modules/@types/externalThingNotPresent/package.json",
      "../../../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx",
      "../../../externalThingNotPresent.js",
      "../../../externalThingNotPresent.jsx",
      "../../../../externalThingNotPresent.js",
      "../../../../externalThingNotPresent.jsx"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts",
        "./src/newfile.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }",
        "signature": "-13601649692-export declare function something(): number;\n"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;",
        "signature": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-3531856636-export {};\n"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "signature": "-10760962856-interface SomeType {\n}\n",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
        "signature": "-1928648610-/// <reference path=\"types.d.ts\" />\n"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "signature": "-7731522637-declare function globalSomething(): number;\n",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "signature": "-5961586139-declare function globalSomething2(): number;\n",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "signature": "-17196641480-/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "signature": "4030514825-declare function globalFoo(): number;\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
        "signature": "-15417052438-/// <reference path=\"globalNewFile.d.ts\" />\n/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalMain(): void;\n",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }",
        "signature": "-4788605446-export declare function foo(): number;\n"
      },
      "./src/main.ts": {
        "version": "6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();",
        "signature": "-3531856636-export {};\n"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "persistResolutions": true,
      "traceResolution": true,
      "watch": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      [
        "./src/anotherfilereusingresolution.ts",
        [
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 70,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 167,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/externalthing.d.ts",
      "./src/filepresent.ts",
      "./src/filewithref.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalfilepresent.ts",
      "./src/globalmain.ts",
      "./src/globalnewfile.ts",
      [
        "./src/main.ts",
        [
          {
            "file": "./src/main.ts",
            "start": 159,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/main.ts",
            "start": 256,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/newfile.ts",
      "./src/types.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./src/anotherfilereusingresolution.ts",
        "Full"
      ],
      [
        "./src/externalthing.d.ts",
        "Full"
      ],
      [
        "./src/filepresent.ts",
        "Full"
      ],
      [
        "./src/filewithref.ts",
        "Full"
      ],
      [
        "./src/globalanotherfilewithsamereferenes.ts",
        "Full"
      ],
      [
        "./src/globalfilenotfound.ts",
        "Full"
      ],
      [
        "./src/globalfilepresent.ts",
        "Full"
      ],
      [
        "./src/globalmain.ts",
        "Full"
      ],
      [
        "./src/globalnewfile.ts",
        "Full"
      ],
      [
        "./src/main.ts",
        "Full"
      ],
      [
        "./src/newfile.ts",
        "Full"
      ],
      [
        "./src/types.ts",
        "Full"
      ]
    ],
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../../../a/lib/lib.d.ts",
          "originalFileName": "../../../../a/lib/lib.d.ts",
          "path": "../../../../a/lib/lib.d.ts",
          "resolvedPath": "../../../../a/lib/lib.d.ts",
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": "LibFile"
            }
          ]
        },
        {
          "fileName": "./src/filePresent.ts",
          "originalFileName": "./src/filePresent.ts",
          "path": "./src/filepresent.ts",
          "resolvedPath": "./src/filepresent.ts",
          "version": "11598859296-export function something() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 2
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "./src/externalThing.d.ts",
          "originalFileName": "./src/externalThing.d.ts",
          "path": "./src/externalthing.d.ts",
          "resolvedPath": "./src/externalthing.d.ts",
          "version": "5686005290-export function externalThing1(): number;",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 2
            },
            {
              "kind": "RootFile",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/anotherFileReusingResolution.ts",
          "originalFileName": "./src/anotherFileReusingResolution.ts",
          "path": "./src/anotherfilereusingresolution.ts",
          "resolvedPath": "./src/anotherfilereusingresolution.ts",
          "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "failedLookupLocations": [
                  "./src/fileNotFound.ts",
                  "./src/fileNotFound.tsx",
                  "./src/fileNotFound.d.ts",
                  "./src/fileNotFound.js",
                  "./src/fileNotFound.jsx"
                ]
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "../../../externalThingNotPresent.ts",
                  "../../../externalThingNotPresent.tsx",
                  "../../../externalThingNotPresent.d.ts",
                  "../../../../externalThingNotPresent.ts",
                  "../../../../externalThingNotPresent.tsx",
                  "../../../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx",
                  "../../../externalThingNotPresent.js",
                  "../../../externalThingNotPresent.jsx",
                  "../../../../externalThingNotPresent.js",
                  "../../../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 0
            }
          ]
        },
        {
          "fileName": "./src/types.ts",
          "originalFileName": "./src/types.ts",
          "path": "./src/types.ts",
          "resolvedPath": "./src/types.ts",
          "version": "-12575322908-interface SomeType {}",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/filewithref.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 11
            }
          ]
        },
        {
          "fileName": "./src/fileWithRef.ts",
          "originalFileName": "./src/fileWithRef.ts",
          "path": "./src/filewithref.ts",
          "resolvedPath": "./src/filewithref.ts",
          "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
          "flags": 0,
          "referencedFiles": [
            "./types.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/globalFilePresent.ts",
          "originalFileName": "./src/globalFilePresent.ts",
          "path": "./src/globalfilepresent.ts",
          "resolvedPath": "./src/globalfilepresent.ts",
          "version": "-5627034801-function globalSomething() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 6
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/globalFileNotFound.ts",
          "originalFileName": "./src/globalFileNotFound.ts",
          "path": "./src/globalfilenotfound.ts",
          "resolvedPath": "./src/globalfilenotfound.ts",
          "version": "-6310824062-function globalSomething2() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 1
            },
            {
              "kind": "RootFile",
              "index": 5
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "originalFileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "path": "./src/globalanotherfilewithsamereferenes.ts",
          "resolvedPath": "./src/globalanotherfilewithsamereferenes.ts",
          "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
          "flags": 0,
          "referencedFiles": [
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/globalNewFile.ts",
          "originalFileName": "./src/globalNewFile.ts",
          "path": "./src/globalnewfile.ts",
          "resolvedPath": "./src/globalnewfile.ts",
          "version": "4916490342-function globalFoo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 8
            }
          ]
        },
        {
          "fileName": "./src/globalMain.ts",
          "originalFileName": "./src/globalMain.ts",
          "path": "./src/globalmain.ts",
          "resolvedPath": "./src/globalmain.ts",
          "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
          "flags": 0,
          "referencedFiles": [
            "./globalNewFile.ts",
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 7
            }
          ]
        },
        {
          "fileName": "./src/newFile.ts",
          "originalFileName": "./src/newFile.ts",
          "path": "./src/newfile.ts",
          "resolvedPath": "./src/newfile.ts",
          "version": "4428918903-export function foo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 10
            }
          ]
        },
        {
          "fileName": "./src/main.ts",
          "originalFileName": "./src/main.ts",
          "path": "./src/main.ts",
          "resolvedPath": "./src/main.ts",
          "version": "6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./newFile"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./newFile",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/newFile.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "failedLookupLocations": [
                  "./src/fileNotFound.ts",
                  "./src/fileNotFound.tsx",
                  "./src/fileNotFound.d.ts",
                  "./src/fileNotFound.js",
                  "./src/fileNotFound.jsx"
                ]
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "../../../externalThingNotPresent.ts",
                  "../../../externalThingNotPresent.tsx",
                  "../../../externalThingNotPresent.d.ts",
                  "../../../../externalThingNotPresent.ts",
                  "../../../../externalThingNotPresent.tsx",
                  "../../../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx",
                  "../../../externalThingNotPresent.js",
                  "../../../externalThingNotPresent.jsx",
                  "../../../../externalThingNotPresent.js",
                  "../../../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 9
            }
          ]
        }
      ],
      "rootFileNames": [
        "./src/anotherFileReusingResolution.ts",
        "./src/externalThing.d.ts",
        "./src/filePresent.ts",
        "./src/fileWithRef.ts",
        "./src/globalAnotherFileWithSameReferenes.ts",
        "./src/globalFileNotFound.ts",
        "./src/globalFilePresent.ts",
        "./src/globalMain.ts",
        "./src/globalNewFile.ts",
        "./src/main.ts",
        "./src/newFile.ts",
        "./src/types.ts"
      ],
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "failedLookupLocations": [
            "./src/fileNotFound.ts",
            "./src/fileNotFound.tsx",
            "./src/fileNotFound.d.ts",
            "./src/fileNotFound.js",
            "./src/fileNotFound.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "../../../externalThingNotPresent.ts",
            "../../../externalThingNotPresent.tsx",
            "../../../externalThingNotPresent.d.ts",
            "../../../../externalThingNotPresent.ts",
            "../../../../externalThingNotPresent.tsx",
            "../../../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../../node_modules/@types/externalThingNotPresent/package.json",
            "../../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../../../node_modules/@types/externalThingNotPresent/package.json",
            "../../../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx",
            "../../../externalThingNotPresent.js",
            "../../../externalThingNotPresent.jsx",
            "../../../../externalThingNotPresent.js",
            "../../../../externalThingNotPresent.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/newFile.ts",
            "extension": ".ts"
          }
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 12559
}


Change:: Write file that could not be resolved

Input::
//// [/user/username/projects/myproject/src/fileNotFound.ts]
export function something2() { return 20; }


Output::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
[[90m12:01:40 AM[0m] File change detected. Starting incremental compilation...

FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/fileNotFound.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/user/username/projects/myproject/src/fileNotFound.ts' exist - use it as a name resolution result.
======== Module name './fileNotFound' was successfully resolved to '/user/username/projects/myproject/src/fileNotFound.ts'. ========
======== Resolving module 'externalThingNotPresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/user/username/projects/myproject/src/externalThingNotPresent.ts' does not exist.
File '/user/username/projects/myproject/src/externalThingNotPresent.tsx' does not exist.
File '/user/username/projects/myproject/src/externalThingNotPresent.d.ts' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.ts' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.tsx' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.d.ts' does not exist.
File '/user/username/projects/externalThingNotPresent.ts' does not exist.
File '/user/username/projects/externalThingNotPresent.tsx' does not exist.
File '/user/username/projects/externalThingNotPresent.d.ts' does not exist.
File '/user/username/externalThingNotPresent.ts' does not exist.
File '/user/username/externalThingNotPresent.tsx' does not exist.
File '/user/username/externalThingNotPresent.d.ts' does not exist.
File '/user/externalThingNotPresent.ts' does not exist.
File '/user/externalThingNotPresent.tsx' does not exist.
File '/user/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/user/username/projects/myproject/src/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/node_modules' does not exist, skipping all lookups in it.
Directory '/user/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/user/username/projects/myproject/src/externalThingNotPresent.js' does not exist.
File '/user/username/projects/myproject/src/externalThingNotPresent.jsx' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.js' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.jsx' does not exist.
File '/user/username/projects/externalThingNotPresent.js' does not exist.
File '/user/username/projects/externalThingNotPresent.jsx' does not exist.
File '/user/username/externalThingNotPresent.js' does not exist.
File '/user/username/externalThingNotPresent.jsx' does not exist.
File '/user/externalThingNotPresent.js' does not exist.
File '/user/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
Reusing resolution of module './newFile' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/newFile.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
======== Resolving module './fileNotFound' from '/user/username/projects/myproject/src/main.ts'. ========
Resolution for module './fileNotFound' was found in cache from location '/user/username/projects/myproject/src'.
======== Module name './fileNotFound' was successfully resolved to '/user/username/projects/myproject/src/fileNotFound.ts'. ========
======== Resolving module 'externalThingNotPresent' from '/user/username/projects/myproject/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/user/username/projects/myproject/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
[96msrc/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";something();
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[[90m12:01:47 AM[0m] Found 2 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/fileNotFound.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/filePresent.ts
/user/username/projects/myproject/src/fileNotFound.ts
/user/username/projects/myproject/src/externalThing.d.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/types.ts
/user/username/projects/myproject/src/fileWithRef.ts
/user/username/projects/myproject/src/globalFilePresent.ts
/user/username/projects/myproject/src/globalFileNotFound.ts
/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts
/user/username/projects/myproject/src/globalNewFile.ts
/user/username/projects/myproject/src/globalMain.ts
/user/username/projects/myproject/src/newFile.ts
/user/username/projects/myproject/src/main.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/src/fileNotFound.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/main.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/src/anotherfilereusingresolution.ts:
  {"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.d.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/filePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/filewithref.ts:
  {"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalanotherfilewithsamereferenes.ts:
  {"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalmain.ts:
  {"fileName":"/user/username/projects/myproject/src/globalMain.ts","pollingInterval":250}
/user/username/projects/myproject/src/main.ts:
  {"fileName":"/user/username/projects/myproject/src/main.ts","pollingInterval":250}
/user/username/projects/myproject/src/types.ts:
  {"fileName":"/user/username/projects/myproject/src/types.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalnewfile.ts:
  {"fileName":"/user/username/projects/myproject/src/globalNewFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFileNotFound.ts","pollingInterval":250}
/user/username/projects/myproject/src/newfile.ts:
  {"fileName":"/user/username/projects/myproject/src/newFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/filenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/fileNotFound.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./src/filePresent.ts","./src/fileNotFound.ts","./src/externalThing.d.ts","./src/anotherFileReusingResolution.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/newFile.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-13601649692-export declare function something(): number;\n"},{"version":"-497034637-export function something2() { return 20; }","signature":"-14992185226-export declare function something2(): number;\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10760962856-interface SomeType {\n}\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-1928648610-/// <reference path=\"types.d.ts\" />\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-7731522637-declare function globalSomething(): number;\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-5961586139-declare function globalSomething2(): number;\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-17196641480-/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4030514825-declare function globalFoo(): number;\n","affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":"-15417052438-/// <reference path=\"globalNewFile.d.ts\" />\n/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalMain(): void;\n","affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":"-4788605446-export declare function foo(): number;\n"},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":"-3531856636-export {};\n"}],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"persistResolutions":true,"traceResolution":true,"watch":true},"fileIdsList":[[2,3,4],[6],[8,9],[8,9,11],[2,3,4,13]],"referencedMap":[[5,1],[7,2],[10,3],[12,4],[14,5]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],4,3,2,7,10,9,8,12,11,[14,[{"file":"./src/main.ts","start":256,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],13,6],"affectedFilesPendingEmit":[[5,1],[4,1],[3,1],[2,1],[7,1],[10,1],[9,1],[8,1],[12,1],[11,1],[14,1],[13,1],[6,1]],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":15,"originalFileName":15,"path":2,"resolvedPath":2,"version":"11598859296-export function something() { return 10; }","flags":0,"includeReasons":[{"kind":3,"file":5,"index":0},{"kind":0,"index":3},{"kind":3,"file":14,"index":1},{"kind":3,"file":14,"index":2}]},{"fileName":16,"originalFileName":16,"path":3,"resolvedPath":3,"version":"-497034637-export function something2() { return 20; }","flags":0,"includeReasons":[{"kind":3,"file":5,"index":1},{"kind":0,"index":2},{"kind":3,"file":14,"index":3}]},{"fileName":17,"originalFileName":17,"path":4,"resolvedPath":4,"version":"5686005290-export function externalThing1(): number;","flags":0,"includeReasons":[{"kind":3,"file":5,"index":2},{"kind":0,"index":1},{"kind":3,"file":14,"index":4}]},{"fileName":18,"originalFileName":18,"path":5,"resolvedPath":5,"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":0}]},{"fileName":6,"originalFileName":6,"path":6,"resolvedPath":6,"version":"-12575322908-interface SomeType {}","flags":0,"includeReasons":[{"kind":4,"file":7,"index":0},{"kind":0,"index":12}]},{"fileName":19,"originalFileName":19,"path":7,"resolvedPath":7,"version":"-6085631553-/// <reference path=\"./types.ts\"/>","flags":0,"referencedFiles":["./types.ts"],"includeReasons":[{"kind":0,"index":4}]},{"fileName":20,"originalFileName":20,"path":8,"resolvedPath":8,"version":"-5627034801-function globalSomething() { return 10; }","flags":0,"includeReasons":[{"kind":4,"file":10,"index":0},{"kind":0,"index":7},{"kind":4,"file":12,"index":1}]},{"fileName":21,"originalFileName":21,"path":9,"resolvedPath":9,"version":"-6310824062-function globalSomething2() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":10,"index":1},{"kind":0,"index":6},{"kind":4,"file":12,"index":2}]},{"fileName":22,"originalFileName":22,"path":10,"resolvedPath":10,"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":5}]},{"fileName":23,"originalFileName":23,"path":11,"resolvedPath":11,"version":"4916490342-function globalFoo() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":12,"index":0},{"kind":0,"index":9}]},{"fileName":24,"originalFileName":24,"path":12,"resolvedPath":12,"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","flags":0,"referencedFiles":["./globalNewFile.ts","./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":8}]},{"fileName":25,"originalFileName":25,"path":13,"resolvedPath":13,"version":"4428918903-export function foo() { return 20; }","flags":0,"includeReasons":[{"kind":3,"file":14,"index":0},{"kind":0,"index":11}]},{"fileName":14,"originalFileName":14,"path":14,"resolvedPath":14,"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","flags":0,"imports":[{"kind":10,"text":"./newFile"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./newFile",5],["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":10}]}],"rootFileNames":[18,17,16,15,19,22,21,20,24,23,14,25,6],"resolutions":[{"resolvedModule":{"resolvedFileName":15,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":16,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":17,"extension":".d.ts"},"failedLookupLocations":[26,27]},{"failedLookupLocations":[28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75]},{"resolvedModule":{"resolvedFileName":25,"extension":".ts"}}]}},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/filenotfound.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/newfile.ts",
      "./src/main.ts",
      "./src/filePresent.ts",
      "./src/fileNotFound.ts",
      "./src/externalThing.d.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/newFile.ts",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "../../../externalThingNotPresent.ts",
      "../../../externalThingNotPresent.tsx",
      "../../../externalThingNotPresent.d.ts",
      "../../../../externalThingNotPresent.ts",
      "../../../../externalThingNotPresent.tsx",
      "../../../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../../node_modules/@types/externalThingNotPresent/package.json",
      "../../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../../../node_modules/@types/externalThingNotPresent/package.json",
      "../../../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx",
      "../../../externalThingNotPresent.js",
      "../../../externalThingNotPresent.jsx",
      "../../../../externalThingNotPresent.js",
      "../../../../externalThingNotPresent.jsx"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts",
        "./src/newfile.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }",
        "signature": "-13601649692-export declare function something(): number;\n"
      },
      "./src/filenotfound.ts": {
        "version": "-497034637-export function something2() { return 20; }",
        "signature": "-14992185226-export declare function something2(): number;\n"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;",
        "signature": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-3531856636-export {};\n"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "signature": "-10760962856-interface SomeType {\n}\n",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
        "signature": "-1928648610-/// <reference path=\"types.d.ts\" />\n"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "signature": "-7731522637-declare function globalSomething(): number;\n",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "signature": "-5961586139-declare function globalSomething2(): number;\n",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "signature": "-17196641480-/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "signature": "4030514825-declare function globalFoo(): number;\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
        "signature": "-15417052438-/// <reference path=\"globalNewFile.d.ts\" />\n/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalMain(): void;\n",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }",
        "signature": "-4788605446-export declare function foo(): number;\n"
      },
      "./src/main.ts": {
        "version": "6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();",
        "signature": "-3531856636-export {};\n"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "persistResolutions": true,
      "traceResolution": true,
      "watch": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      [
        "./src/anotherfilereusingresolution.ts",
        [
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 167,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/externalthing.d.ts",
      "./src/filenotfound.ts",
      "./src/filepresent.ts",
      "./src/filewithref.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalfilepresent.ts",
      "./src/globalmain.ts",
      "./src/globalnewfile.ts",
      [
        "./src/main.ts",
        [
          {
            "file": "./src/main.ts",
            "start": 256,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/newfile.ts",
      "./src/types.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./src/anotherfilereusingresolution.ts",
        "Full"
      ],
      [
        "./src/externalthing.d.ts",
        "Full"
      ],
      [
        "./src/filenotfound.ts",
        "Full"
      ],
      [
        "./src/filepresent.ts",
        "Full"
      ],
      [
        "./src/filewithref.ts",
        "Full"
      ],
      [
        "./src/globalanotherfilewithsamereferenes.ts",
        "Full"
      ],
      [
        "./src/globalfilenotfound.ts",
        "Full"
      ],
      [
        "./src/globalfilepresent.ts",
        "Full"
      ],
      [
        "./src/globalmain.ts",
        "Full"
      ],
      [
        "./src/globalnewfile.ts",
        "Full"
      ],
      [
        "./src/main.ts",
        "Full"
      ],
      [
        "./src/newfile.ts",
        "Full"
      ],
      [
        "./src/types.ts",
        "Full"
      ]
    ],
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../../../a/lib/lib.d.ts",
          "originalFileName": "../../../../a/lib/lib.d.ts",
          "path": "../../../../a/lib/lib.d.ts",
          "resolvedPath": "../../../../a/lib/lib.d.ts",
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": "LibFile"
            }
          ]
        },
        {
          "fileName": "./src/filePresent.ts",
          "originalFileName": "./src/filePresent.ts",
          "path": "./src/filepresent.ts",
          "resolvedPath": "./src/filepresent.ts",
          "version": "11598859296-export function something() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 3
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "./src/fileNotFound.ts",
          "originalFileName": "./src/fileNotFound.ts",
          "path": "./src/filenotfound.ts",
          "resolvedPath": "./src/filenotfound.ts",
          "version": "-497034637-export function something2() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 1
            },
            {
              "kind": "RootFile",
              "index": 2
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/externalThing.d.ts",
          "originalFileName": "./src/externalThing.d.ts",
          "path": "./src/externalthing.d.ts",
          "resolvedPath": "./src/externalthing.d.ts",
          "version": "5686005290-export function externalThing1(): number;",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 2
            },
            {
              "kind": "RootFile",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/anotherFileReusingResolution.ts",
          "originalFileName": "./src/anotherFileReusingResolution.ts",
          "path": "./src/anotherfilereusingresolution.ts",
          "resolvedPath": "./src/anotherfilereusingresolution.ts",
          "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/fileNotFound.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "../../../externalThingNotPresent.ts",
                  "../../../externalThingNotPresent.tsx",
                  "../../../externalThingNotPresent.d.ts",
                  "../../../../externalThingNotPresent.ts",
                  "../../../../externalThingNotPresent.tsx",
                  "../../../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx",
                  "../../../externalThingNotPresent.js",
                  "../../../externalThingNotPresent.jsx",
                  "../../../../externalThingNotPresent.js",
                  "../../../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 0
            }
          ]
        },
        {
          "fileName": "./src/types.ts",
          "originalFileName": "./src/types.ts",
          "path": "./src/types.ts",
          "resolvedPath": "./src/types.ts",
          "version": "-12575322908-interface SomeType {}",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/filewithref.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 12
            }
          ]
        },
        {
          "fileName": "./src/fileWithRef.ts",
          "originalFileName": "./src/fileWithRef.ts",
          "path": "./src/filewithref.ts",
          "resolvedPath": "./src/filewithref.ts",
          "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
          "flags": 0,
          "referencedFiles": [
            "./types.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/globalFilePresent.ts",
          "originalFileName": "./src/globalFilePresent.ts",
          "path": "./src/globalfilepresent.ts",
          "resolvedPath": "./src/globalfilepresent.ts",
          "version": "-5627034801-function globalSomething() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 7
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/globalFileNotFound.ts",
          "originalFileName": "./src/globalFileNotFound.ts",
          "path": "./src/globalfilenotfound.ts",
          "resolvedPath": "./src/globalfilenotfound.ts",
          "version": "-6310824062-function globalSomething2() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 1
            },
            {
              "kind": "RootFile",
              "index": 6
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "originalFileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "path": "./src/globalanotherfilewithsamereferenes.ts",
          "resolvedPath": "./src/globalanotherfilewithsamereferenes.ts",
          "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
          "flags": 0,
          "referencedFiles": [
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 5
            }
          ]
        },
        {
          "fileName": "./src/globalNewFile.ts",
          "originalFileName": "./src/globalNewFile.ts",
          "path": "./src/globalnewfile.ts",
          "resolvedPath": "./src/globalnewfile.ts",
          "version": "4916490342-function globalFoo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 9
            }
          ]
        },
        {
          "fileName": "./src/globalMain.ts",
          "originalFileName": "./src/globalMain.ts",
          "path": "./src/globalmain.ts",
          "resolvedPath": "./src/globalmain.ts",
          "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
          "flags": 0,
          "referencedFiles": [
            "./globalNewFile.ts",
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 8
            }
          ]
        },
        {
          "fileName": "./src/newFile.ts",
          "originalFileName": "./src/newFile.ts",
          "path": "./src/newfile.ts",
          "resolvedPath": "./src/newfile.ts",
          "version": "4428918903-export function foo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 11
            }
          ]
        },
        {
          "fileName": "./src/main.ts",
          "originalFileName": "./src/main.ts",
          "path": "./src/main.ts",
          "resolvedPath": "./src/main.ts",
          "version": "6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./newFile"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./newFile",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/newFile.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/fileNotFound.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "../../../externalThingNotPresent.ts",
                  "../../../externalThingNotPresent.tsx",
                  "../../../externalThingNotPresent.d.ts",
                  "../../../../externalThingNotPresent.ts",
                  "../../../../externalThingNotPresent.tsx",
                  "../../../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx",
                  "../../../externalThingNotPresent.js",
                  "../../../externalThingNotPresent.jsx",
                  "../../../../externalThingNotPresent.js",
                  "../../../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 10
            }
          ]
        }
      ],
      "rootFileNames": [
        "./src/anotherFileReusingResolution.ts",
        "./src/externalThing.d.ts",
        "./src/fileNotFound.ts",
        "./src/filePresent.ts",
        "./src/fileWithRef.ts",
        "./src/globalAnotherFileWithSameReferenes.ts",
        "./src/globalFileNotFound.ts",
        "./src/globalFilePresent.ts",
        "./src/globalMain.ts",
        "./src/globalNewFile.ts",
        "./src/main.ts",
        "./src/newFile.ts",
        "./src/types.ts"
      ],
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "../../../externalThingNotPresent.ts",
            "../../../externalThingNotPresent.tsx",
            "../../../externalThingNotPresent.d.ts",
            "../../../../externalThingNotPresent.ts",
            "../../../../externalThingNotPresent.tsx",
            "../../../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../../node_modules/@types/externalThingNotPresent/package.json",
            "../../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../../../node_modules/@types/externalThingNotPresent/package.json",
            "../../../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx",
            "../../../externalThingNotPresent.js",
            "../../../externalThingNotPresent.jsx",
            "../../../../externalThingNotPresent.js",
            "../../../../externalThingNotPresent.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/newFile.ts",
            "extension": ".ts"
          }
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 12429
}


Change:: Delete file that could not be resolved

Input::
//// [/user/username/projects/myproject/src/fileNotFound.ts] deleted

Output::
FileWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts 2:: WatchInfo: /user/username/projects/myproject/src/fileNotFound.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts 2:: WatchInfo: /user/username/projects/myproject/src/fileNotFound.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
[[90m12:01:49 AM[0m] File change detected. Starting incremental compilation...

FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/fileNotFound.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/fileNotFound.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
======== Resolving module 'externalThingNotPresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/user/username/projects/myproject/src/externalThingNotPresent.ts' does not exist.
File '/user/username/projects/myproject/src/externalThingNotPresent.tsx' does not exist.
File '/user/username/projects/myproject/src/externalThingNotPresent.d.ts' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.ts' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.tsx' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.d.ts' does not exist.
File '/user/username/projects/externalThingNotPresent.ts' does not exist.
File '/user/username/projects/externalThingNotPresent.tsx' does not exist.
File '/user/username/projects/externalThingNotPresent.d.ts' does not exist.
File '/user/username/externalThingNotPresent.ts' does not exist.
File '/user/username/externalThingNotPresent.tsx' does not exist.
File '/user/username/externalThingNotPresent.d.ts' does not exist.
File '/user/externalThingNotPresent.ts' does not exist.
File '/user/externalThingNotPresent.tsx' does not exist.
File '/user/externalThingNotPresent.d.ts' does not exist.
File '/externalThingNotPresent.ts' does not exist.
File '/externalThingNotPresent.tsx' does not exist.
File '/externalThingNotPresent.d.ts' does not exist.
Directory '/user/username/projects/myproject/src/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/node_modules' does not exist, skipping all lookups in it.
Directory '/user/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/user/username/projects/myproject/src/externalThingNotPresent.js' does not exist.
File '/user/username/projects/myproject/src/externalThingNotPresent.jsx' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.js' does not exist.
File '/user/username/projects/myproject/externalThingNotPresent.jsx' does not exist.
File '/user/username/projects/externalThingNotPresent.js' does not exist.
File '/user/username/projects/externalThingNotPresent.jsx' does not exist.
File '/user/username/externalThingNotPresent.js' does not exist.
File '/user/username/externalThingNotPresent.jsx' does not exist.
File '/user/externalThingNotPresent.js' does not exist.
File '/user/externalThingNotPresent.jsx' does not exist.
File '/externalThingNotPresent.js' does not exist.
File '/externalThingNotPresent.jsx' does not exist.
======== Module name 'externalThingNotPresent' was not resolved. ========
Reusing resolution of module './newFile' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/newFile.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/fileNotFound.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
======== Resolving module 'externalThingNotPresent' from '/user/username/projects/myproject/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/user/username/projects/myproject/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
[96msrc/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";something();
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[[90m12:01:56 AM[0m] Found 4 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/filePresent.ts
/user/username/projects/myproject/src/externalThing.d.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/types.ts
/user/username/projects/myproject/src/fileWithRef.ts
/user/username/projects/myproject/src/globalFilePresent.ts
/user/username/projects/myproject/src/globalFileNotFound.ts
/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts
/user/username/projects/myproject/src/globalNewFile.ts
/user/username/projects/myproject/src/globalMain.ts
/user/username/projects/myproject/src/newFile.ts
/user/username/projects/myproject/src/main.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/main.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/src/anotherfilereusingresolution.ts:
  {"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.d.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/filePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/filewithref.ts:
  {"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalanotherfilewithsamereferenes.ts:
  {"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalmain.ts:
  {"fileName":"/user/username/projects/myproject/src/globalMain.ts","pollingInterval":250}
/user/username/projects/myproject/src/main.ts:
  {"fileName":"/user/username/projects/myproject/src/main.ts","pollingInterval":250}
/user/username/projects/myproject/src/types.ts:
  {"fileName":"/user/username/projects/myproject/src/types.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalnewfile.ts:
  {"fileName":"/user/username/projects/myproject/src/globalNewFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFileNotFound.ts","pollingInterval":250}
/user/username/projects/myproject/src/newfile.ts:
  {"fileName":"/user/username/projects/myproject/src/newFile.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./src/filenotfound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/anotherFileReusingResolution.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/newFile.ts","./src/fileNotFound.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-13601649692-export declare function something(): number;\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10760962856-interface SomeType {\n}\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-1928648610-/// <reference path=\"types.d.ts\" />\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-7731522637-declare function globalSomething(): number;\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-5961586139-declare function globalSomething2(): number;\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-17196641480-/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4030514825-declare function globalFoo(): number;\n","affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":"-15417052438-/// <reference path=\"globalNewFile.d.ts\" />\n/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalMain(): void;\n","affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":"-4788605446-export declare function foo(): number;\n"},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":"-3531856636-export {};\n"}],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"persistResolutions":true,"traceResolution":true,"watch":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10],[2,3,12]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[13,5]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[4,[{"file":"./src/anotherfilereusingresolution.ts","start":70,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],3,2,6,9,8,7,11,10,[13,[{"file":"./src/main.ts","start":159,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/main.ts","start":256,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],12,5],"affectedFilesPendingEmit":[[4,1],[3,1],[14,1],[2,1],[6,1],[9,1],[8,1],[7,1],[11,1],[10,1],[13,1],[12,1],[5,1]],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":15,"originalFileName":15,"path":2,"resolvedPath":2,"version":"11598859296-export function something() { return 10; }","flags":0,"includeReasons":[{"kind":3,"file":4,"index":0},{"kind":0,"index":2},{"kind":3,"file":13,"index":1},{"kind":3,"file":13,"index":2}]},{"fileName":16,"originalFileName":16,"path":3,"resolvedPath":3,"version":"5686005290-export function externalThing1(): number;","flags":0,"includeReasons":[{"kind":3,"file":4,"index":2},{"kind":0,"index":1},{"kind":3,"file":13,"index":4}]},{"fileName":17,"originalFileName":17,"path":4,"resolvedPath":4,"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":0}]},{"fileName":5,"originalFileName":5,"path":5,"resolvedPath":5,"version":"-12575322908-interface SomeType {}","flags":0,"includeReasons":[{"kind":4,"file":6,"index":0},{"kind":0,"index":11}]},{"fileName":18,"originalFileName":18,"path":6,"resolvedPath":6,"version":"-6085631553-/// <reference path=\"./types.ts\"/>","flags":0,"referencedFiles":["./types.ts"],"includeReasons":[{"kind":0,"index":3}]},{"fileName":19,"originalFileName":19,"path":7,"resolvedPath":7,"version":"-5627034801-function globalSomething() { return 10; }","flags":0,"includeReasons":[{"kind":4,"file":9,"index":0},{"kind":0,"index":6},{"kind":4,"file":11,"index":1}]},{"fileName":20,"originalFileName":20,"path":8,"resolvedPath":8,"version":"-6310824062-function globalSomething2() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":9,"index":1},{"kind":0,"index":5},{"kind":4,"file":11,"index":2}]},{"fileName":21,"originalFileName":21,"path":9,"resolvedPath":9,"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":4}]},{"fileName":22,"originalFileName":22,"path":10,"resolvedPath":10,"version":"4916490342-function globalFoo() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":11,"index":0},{"kind":0,"index":8}]},{"fileName":23,"originalFileName":23,"path":11,"resolvedPath":11,"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","flags":0,"referencedFiles":["./globalNewFile.ts","./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":7}]},{"fileName":24,"originalFileName":24,"path":12,"resolvedPath":12,"version":"4428918903-export function foo() { return 20; }","flags":0,"includeReasons":[{"kind":3,"file":13,"index":0},{"kind":0,"index":10}]},{"fileName":13,"originalFileName":13,"path":13,"resolvedPath":13,"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","flags":0,"imports":[{"kind":10,"text":"./newFile"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./newFile",5],["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":9}]}],"rootFileNames":[17,16,15,18,21,20,19,23,22,13,24,5],"filesByName":[[14,0]],"resolutions":[{"resolvedModule":{"resolvedFileName":15,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":25,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":16,"extension":".d.ts"},"failedLookupLocations":[26,27]},{"failedLookupLocations":[28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75]},{"resolvedModule":{"resolvedFileName":24,"extension":".ts"}}]}},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/newfile.ts",
      "./src/main.ts",
      "./src/filenotfound.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/newFile.ts",
      "./src/fileNotFound.ts",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/externalThingNotPresent.tsx",
      "./src/externalThingNotPresent.d.ts",
      "./externalThingNotPresent.ts",
      "./externalThingNotPresent.tsx",
      "./externalThingNotPresent.d.ts",
      "../externalThingNotPresent.ts",
      "../externalThingNotPresent.tsx",
      "../externalThingNotPresent.d.ts",
      "../../externalThingNotPresent.ts",
      "../../externalThingNotPresent.tsx",
      "../../externalThingNotPresent.d.ts",
      "../../../externalThingNotPresent.ts",
      "../../../externalThingNotPresent.tsx",
      "../../../externalThingNotPresent.d.ts",
      "../../../../externalThingNotPresent.ts",
      "../../../../externalThingNotPresent.tsx",
      "../../../../externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/package.json",
      "./src/node_modules/@types/externalThingNotPresent.d.ts",
      "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
      "./node_modules/@types/externalThingNotPresent/package.json",
      "./node_modules/@types/externalThingNotPresent.d.ts",
      "./node_modules/@types/externalThingNotPresent/index.d.ts",
      "../node_modules/@types/externalThingNotPresent/package.json",
      "../node_modules/@types/externalThingNotPresent.d.ts",
      "../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../node_modules/@types/externalThingNotPresent/package.json",
      "../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../../node_modules/@types/externalThingNotPresent/package.json",
      "../../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "../../../../node_modules/@types/externalThingNotPresent/package.json",
      "../../../../node_modules/@types/externalThingNotPresent.d.ts",
      "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
      "./src/externalThingNotPresent.js",
      "./src/externalThingNotPresent.jsx",
      "./externalThingNotPresent.js",
      "./externalThingNotPresent.jsx",
      "../externalThingNotPresent.js",
      "../externalThingNotPresent.jsx",
      "../../externalThingNotPresent.js",
      "../../externalThingNotPresent.jsx",
      "../../../externalThingNotPresent.js",
      "../../../externalThingNotPresent.jsx",
      "../../../../externalThingNotPresent.js",
      "../../../../externalThingNotPresent.jsx"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts",
        "./src/newfile.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }",
        "signature": "-13601649692-export declare function something(): number;\n"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;",
        "signature": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-3531856636-export {};\n"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "signature": "-10760962856-interface SomeType {\n}\n",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
        "signature": "-1928648610-/// <reference path=\"types.d.ts\" />\n"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "signature": "-7731522637-declare function globalSomething(): number;\n",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "signature": "-5961586139-declare function globalSomething2(): number;\n",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "signature": "-17196641480-/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "signature": "4030514825-declare function globalFoo(): number;\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
        "signature": "-15417052438-/// <reference path=\"globalNewFile.d.ts\" />\n/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalMain(): void;\n",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }",
        "signature": "-4788605446-export declare function foo(): number;\n"
      },
      "./src/main.ts": {
        "version": "6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();",
        "signature": "-3531856636-export {};\n"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "persistResolutions": true,
      "traceResolution": true,
      "watch": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      [
        "./src/anotherfilereusingresolution.ts",
        [
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 70,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 167,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/externalthing.d.ts",
      "./src/filepresent.ts",
      "./src/filewithref.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalfilepresent.ts",
      "./src/globalmain.ts",
      "./src/globalnewfile.ts",
      [
        "./src/main.ts",
        [
          {
            "file": "./src/main.ts",
            "start": 159,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          },
          {
            "file": "./src/main.ts",
            "start": 256,
            "length": 25,
            "messageText": "Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/newfile.ts",
      "./src/types.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./src/anotherfilereusingresolution.ts",
        "Full"
      ],
      [
        "./src/externalthing.d.ts",
        "Full"
      ],
      [
        "./src/filenotfound.ts",
        "Full"
      ],
      [
        "./src/filepresent.ts",
        "Full"
      ],
      [
        "./src/filewithref.ts",
        "Full"
      ],
      [
        "./src/globalanotherfilewithsamereferenes.ts",
        "Full"
      ],
      [
        "./src/globalfilenotfound.ts",
        "Full"
      ],
      [
        "./src/globalfilepresent.ts",
        "Full"
      ],
      [
        "./src/globalmain.ts",
        "Full"
      ],
      [
        "./src/globalnewfile.ts",
        "Full"
      ],
      [
        "./src/main.ts",
        "Full"
      ],
      [
        "./src/newfile.ts",
        "Full"
      ],
      [
        "./src/types.ts",
        "Full"
      ]
    ],
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../../../a/lib/lib.d.ts",
          "originalFileName": "../../../../a/lib/lib.d.ts",
          "path": "../../../../a/lib/lib.d.ts",
          "resolvedPath": "../../../../a/lib/lib.d.ts",
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": "LibFile"
            }
          ]
        },
        {
          "fileName": "./src/filePresent.ts",
          "originalFileName": "./src/filePresent.ts",
          "path": "./src/filepresent.ts",
          "resolvedPath": "./src/filepresent.ts",
          "version": "11598859296-export function something() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 2
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "./src/externalThing.d.ts",
          "originalFileName": "./src/externalThing.d.ts",
          "path": "./src/externalthing.d.ts",
          "resolvedPath": "./src/externalthing.d.ts",
          "version": "5686005290-export function externalThing1(): number;",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 2
            },
            {
              "kind": "RootFile",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/anotherFileReusingResolution.ts",
          "originalFileName": "./src/anotherFileReusingResolution.ts",
          "path": "./src/anotherfilereusingresolution.ts",
          "resolvedPath": "./src/anotherfilereusingresolution.ts",
          "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/fileNotFound.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "../../../externalThingNotPresent.ts",
                  "../../../externalThingNotPresent.tsx",
                  "../../../externalThingNotPresent.d.ts",
                  "../../../../externalThingNotPresent.ts",
                  "../../../../externalThingNotPresent.tsx",
                  "../../../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx",
                  "../../../externalThingNotPresent.js",
                  "../../../externalThingNotPresent.jsx",
                  "../../../../externalThingNotPresent.js",
                  "../../../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 0
            }
          ]
        },
        {
          "fileName": "./src/types.ts",
          "originalFileName": "./src/types.ts",
          "path": "./src/types.ts",
          "resolvedPath": "./src/types.ts",
          "version": "-12575322908-interface SomeType {}",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/filewithref.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 11
            }
          ]
        },
        {
          "fileName": "./src/fileWithRef.ts",
          "originalFileName": "./src/fileWithRef.ts",
          "path": "./src/filewithref.ts",
          "resolvedPath": "./src/filewithref.ts",
          "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
          "flags": 0,
          "referencedFiles": [
            "./types.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 3
            }
          ]
        },
        {
          "fileName": "./src/globalFilePresent.ts",
          "originalFileName": "./src/globalFilePresent.ts",
          "path": "./src/globalfilepresent.ts",
          "resolvedPath": "./src/globalfilepresent.ts",
          "version": "-5627034801-function globalSomething() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 6
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/globalFileNotFound.ts",
          "originalFileName": "./src/globalFileNotFound.ts",
          "path": "./src/globalfilenotfound.ts",
          "resolvedPath": "./src/globalfilenotfound.ts",
          "version": "-6310824062-function globalSomething2() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 1
            },
            {
              "kind": "RootFile",
              "index": 5
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "originalFileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "path": "./src/globalanotherfilewithsamereferenes.ts",
          "resolvedPath": "./src/globalanotherfilewithsamereferenes.ts",
          "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
          "flags": 0,
          "referencedFiles": [
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/globalNewFile.ts",
          "originalFileName": "./src/globalNewFile.ts",
          "path": "./src/globalnewfile.ts",
          "resolvedPath": "./src/globalnewfile.ts",
          "version": "4916490342-function globalFoo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 8
            }
          ]
        },
        {
          "fileName": "./src/globalMain.ts",
          "originalFileName": "./src/globalMain.ts",
          "path": "./src/globalmain.ts",
          "resolvedPath": "./src/globalmain.ts",
          "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
          "flags": 0,
          "referencedFiles": [
            "./globalNewFile.ts",
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 7
            }
          ]
        },
        {
          "fileName": "./src/newFile.ts",
          "originalFileName": "./src/newFile.ts",
          "path": "./src/newfile.ts",
          "resolvedPath": "./src/newfile.ts",
          "version": "4428918903-export function foo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 10
            }
          ]
        },
        {
          "fileName": "./src/main.ts",
          "originalFileName": "./src/main.ts",
          "path": "./src/main.ts",
          "resolvedPath": "./src/main.ts",
          "version": "6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./newFile"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./newFile",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/newFile.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/fileNotFound.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "failedLookupLocations": [
                  "./src/externalThingNotPresent.ts",
                  "./src/externalThingNotPresent.tsx",
                  "./src/externalThingNotPresent.d.ts",
                  "./externalThingNotPresent.ts",
                  "./externalThingNotPresent.tsx",
                  "./externalThingNotPresent.d.ts",
                  "../externalThingNotPresent.ts",
                  "../externalThingNotPresent.tsx",
                  "../externalThingNotPresent.d.ts",
                  "../../externalThingNotPresent.ts",
                  "../../externalThingNotPresent.tsx",
                  "../../externalThingNotPresent.d.ts",
                  "../../../externalThingNotPresent.ts",
                  "../../../externalThingNotPresent.tsx",
                  "../../../externalThingNotPresent.d.ts",
                  "../../../../externalThingNotPresent.ts",
                  "../../../../externalThingNotPresent.tsx",
                  "../../../../externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/package.json",
                  "./src/node_modules/@types/externalThingNotPresent.d.ts",
                  "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./node_modules/@types/externalThingNotPresent/package.json",
                  "./node_modules/@types/externalThingNotPresent.d.ts",
                  "./node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../node_modules/@types/externalThingNotPresent/package.json",
                  "../node_modules/@types/externalThingNotPresent.d.ts",
                  "../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/package.json",
                  "../../../../node_modules/@types/externalThingNotPresent.d.ts",
                  "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
                  "./src/externalThingNotPresent.js",
                  "./src/externalThingNotPresent.jsx",
                  "./externalThingNotPresent.js",
                  "./externalThingNotPresent.jsx",
                  "../externalThingNotPresent.js",
                  "../externalThingNotPresent.jsx",
                  "../../externalThingNotPresent.js",
                  "../../externalThingNotPresent.jsx",
                  "../../../externalThingNotPresent.js",
                  "../../../externalThingNotPresent.jsx",
                  "../../../../externalThingNotPresent.js",
                  "../../../../externalThingNotPresent.jsx"
                ]
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 9
            }
          ]
        }
      ],
      "rootFileNames": [
        "./src/anotherFileReusingResolution.ts",
        "./src/externalThing.d.ts",
        "./src/filePresent.ts",
        "./src/fileWithRef.ts",
        "./src/globalAnotherFileWithSameReferenes.ts",
        "./src/globalFileNotFound.ts",
        "./src/globalFilePresent.ts",
        "./src/globalMain.ts",
        "./src/globalNewFile.ts",
        "./src/main.ts",
        "./src/newFile.ts",
        "./src/types.ts"
      ],
      "filesByName": {
        "./src/filenotfound.ts": 0
      },
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "failedLookupLocations": [
            "./src/externalThingNotPresent.ts",
            "./src/externalThingNotPresent.tsx",
            "./src/externalThingNotPresent.d.ts",
            "./externalThingNotPresent.ts",
            "./externalThingNotPresent.tsx",
            "./externalThingNotPresent.d.ts",
            "../externalThingNotPresent.ts",
            "../externalThingNotPresent.tsx",
            "../externalThingNotPresent.d.ts",
            "../../externalThingNotPresent.ts",
            "../../externalThingNotPresent.tsx",
            "../../externalThingNotPresent.d.ts",
            "../../../externalThingNotPresent.ts",
            "../../../externalThingNotPresent.tsx",
            "../../../externalThingNotPresent.d.ts",
            "../../../../externalThingNotPresent.ts",
            "../../../../externalThingNotPresent.tsx",
            "../../../../externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/package.json",
            "./src/node_modules/@types/externalThingNotPresent.d.ts",
            "./src/node_modules/@types/externalThingNotPresent/index.d.ts",
            "./node_modules/@types/externalThingNotPresent/package.json",
            "./node_modules/@types/externalThingNotPresent.d.ts",
            "./node_modules/@types/externalThingNotPresent/index.d.ts",
            "../node_modules/@types/externalThingNotPresent/package.json",
            "../node_modules/@types/externalThingNotPresent.d.ts",
            "../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../node_modules/@types/externalThingNotPresent/package.json",
            "../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../../node_modules/@types/externalThingNotPresent/package.json",
            "../../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "../../../../node_modules/@types/externalThingNotPresent/package.json",
            "../../../../node_modules/@types/externalThingNotPresent.d.ts",
            "../../../../node_modules/@types/externalThingNotPresent/index.d.ts",
            "./src/externalThingNotPresent.js",
            "./src/externalThingNotPresent.jsx",
            "./externalThingNotPresent.js",
            "./externalThingNotPresent.jsx",
            "../externalThingNotPresent.js",
            "../externalThingNotPresent.jsx",
            "../../externalThingNotPresent.js",
            "../../externalThingNotPresent.jsx",
            "../../../externalThingNotPresent.js",
            "../../../externalThingNotPresent.jsx",
            "../../../../externalThingNotPresent.js",
            "../../../../externalThingNotPresent.jsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/newFile.ts",
            "extension": ".ts"
          }
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 12531
}


Change:: Create external module file that could not be resolved

Input::
//// [/user/username/projects/myproject/src/externalThingNotPresent.ts]
export function externalThing2() { return 20; }


Output::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/externalThingNotPresent.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/externalThingNotPresent.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
[[90m12:01:59 AM[0m] File change detected. Starting incremental compilation...

FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/externalThingNotPresent.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/fileNotFound.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
======== Resolving module 'externalThingNotPresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/user/username/projects/myproject/src/externalThingNotPresent.ts' exist - use it as a name resolution result.
======== Module name 'externalThingNotPresent' was successfully resolved to '/user/username/projects/myproject/src/externalThingNotPresent.ts'. ========
Reusing resolution of module './newFile' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/newFile.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/fileNotFound.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
======== Resolving module 'externalThingNotPresent' from '/user/username/projects/myproject/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/user/username/projects/myproject/src'.
======== Module name 'externalThingNotPresent' was successfully resolved to '/user/username/projects/myproject/src/externalThingNotPresent.ts'. ========
[96msrc/anotherFileReusingResolution.ts[0m:[93m2[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m2[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[96msrc/main.ts[0m:[93m3[0m:[93m28[0m - [91merror[0m[90m TS2792: [0mCannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m3[0m import { something2 } from "./fileNotFound";
[7m [0m [91m                           ~~~~~~~~~~~~~~~~[0m

[[90m12:02:06 AM[0m] Found 2 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/externalThingNotPresent.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/filePresent.ts
/user/username/projects/myproject/src/externalThing.d.ts
/user/username/projects/myproject/src/externalThingNotPresent.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/types.ts
/user/username/projects/myproject/src/fileWithRef.ts
/user/username/projects/myproject/src/globalFilePresent.ts
/user/username/projects/myproject/src/globalFileNotFound.ts
/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts
/user/username/projects/myproject/src/globalNewFile.ts
/user/username/projects/myproject/src/globalMain.ts
/user/username/projects/myproject/src/newFile.ts
/user/username/projects/myproject/src/main.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/src/externalThingNotPresent.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/main.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/src/anotherfilereusingresolution.ts:
  {"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.d.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/filePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/filewithref.ts:
  {"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalanotherfilewithsamereferenes.ts:
  {"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalmain.ts:
  {"fileName":"/user/username/projects/myproject/src/globalMain.ts","pollingInterval":250}
/user/username/projects/myproject/src/main.ts:
  {"fileName":"/user/username/projects/myproject/src/main.ts","pollingInterval":250}
/user/username/projects/myproject/src/types.ts:
  {"fileName":"/user/username/projects/myproject/src/types.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalnewfile.ts:
  {"fileName":"/user/username/projects/myproject/src/globalNewFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFileNotFound.ts","pollingInterval":250}
/user/username/projects/myproject/src/newfile.ts:
  {"fileName":"/user/username/projects/myproject/src/newFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthingnotpresent.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThingNotPresent.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/externalthingnotpresent.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./src/filenotfound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThingNotPresent.ts","./src/anotherFileReusingResolution.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/newFile.ts","./src/fileNotFound.ts","./src/externalThing.ts","./src/externalThing.tsx"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-13601649692-export declare function something(): number;\n"},"5686005290-export function externalThing1(): number;",{"version":"5318862050-export function externalThing2() { return 20; }","signature":"-16245999227-export declare function externalThing2(): number;\n"},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10760962856-interface SomeType {\n}\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-1928648610-/// <reference path=\"types.d.ts\" />\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-7731522637-declare function globalSomething(): number;\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-5961586139-declare function globalSomething2(): number;\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-17196641480-/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4030514825-declare function globalFoo(): number;\n","affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":"-15417052438-/// <reference path=\"globalNewFile.d.ts\" />\n/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalMain(): void;\n","affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":"-4788605446-export declare function foo(): number;\n"},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":"-3531856636-export {};\n"}],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"persistResolutions":true,"traceResolution":true,"watch":true},"fileIdsList":[[2,3,4],[6],[8,9],[8,9,11],[2,3,4,13]],"referencedMap":[[5,1],[7,2],[10,3],[12,4],[14,5]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./src/anotherfilereusingresolution.ts","start":70,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],3,4,2,7,10,9,8,12,11,[14,[{"file":"./src/main.ts","start":159,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],13,6],"affectedFilesPendingEmit":[[5,1],[3,1],[4,1],[15,1],[2,1],[7,1],[10,1],[9,1],[8,1],[12,1],[11,1],[14,1],[13,1],[6,1]],"peristedProgram":{"files":[{"fileName":1,"originalFileName":1,"path":1,"resolvedPath":1,"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","flags":0,"hasNoDefaultLib":true,"includeReasons":[{"kind":6}]},{"fileName":16,"originalFileName":16,"path":2,"resolvedPath":2,"version":"11598859296-export function something() { return 10; }","flags":0,"includeReasons":[{"kind":3,"file":5,"index":0},{"kind":0,"index":3},{"kind":3,"file":14,"index":1},{"kind":3,"file":14,"index":2}]},{"fileName":17,"originalFileName":17,"path":3,"resolvedPath":3,"version":"5686005290-export function externalThing1(): number;","flags":0,"includeReasons":[{"kind":3,"file":5,"index":2},{"kind":0,"index":1},{"kind":3,"file":14,"index":4}]},{"fileName":18,"originalFileName":18,"path":4,"resolvedPath":4,"version":"5318862050-export function externalThing2() { return 20; }","flags":0,"includeReasons":[{"kind":3,"file":5,"index":3},{"kind":0,"index":2},{"kind":3,"file":14,"index":5}]},{"fileName":19,"originalFileName":19,"path":5,"resolvedPath":5,"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","flags":0,"imports":[{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":0}]},{"fileName":6,"originalFileName":6,"path":6,"resolvedPath":6,"version":"-12575322908-interface SomeType {}","flags":0,"includeReasons":[{"kind":4,"file":7,"index":0},{"kind":0,"index":12}]},{"fileName":20,"originalFileName":20,"path":7,"resolvedPath":7,"version":"-6085631553-/// <reference path=\"./types.ts\"/>","flags":0,"referencedFiles":["./types.ts"],"includeReasons":[{"kind":0,"index":4}]},{"fileName":21,"originalFileName":21,"path":8,"resolvedPath":8,"version":"-5627034801-function globalSomething() { return 10; }","flags":0,"includeReasons":[{"kind":4,"file":10,"index":0},{"kind":0,"index":7},{"kind":4,"file":12,"index":1}]},{"fileName":22,"originalFileName":22,"path":9,"resolvedPath":9,"version":"-6310824062-function globalSomething2() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":10,"index":1},{"kind":0,"index":6},{"kind":4,"file":12,"index":2}]},{"fileName":23,"originalFileName":23,"path":10,"resolvedPath":10,"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","flags":0,"referencedFiles":["./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":5}]},{"fileName":24,"originalFileName":24,"path":11,"resolvedPath":11,"version":"4916490342-function globalFoo() { return 20; }","flags":0,"includeReasons":[{"kind":4,"file":12,"index":0},{"kind":0,"index":9}]},{"fileName":25,"originalFileName":25,"path":12,"resolvedPath":12,"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","flags":0,"referencedFiles":["./globalNewFile.ts","./globalFilePresent.ts","./globalFileNotFound.ts"],"includeReasons":[{"kind":0,"index":8}]},{"fileName":26,"originalFileName":26,"path":13,"resolvedPath":13,"version":"4428918903-export function foo() { return 20; }","flags":0,"includeReasons":[{"kind":3,"file":14,"index":0},{"kind":0,"index":11}]},{"fileName":14,"originalFileName":14,"path":14,"resolvedPath":14,"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","flags":0,"imports":[{"kind":10,"text":"./newFile"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./filePresent"},{"kind":10,"text":"./fileNotFound"},{"kind":10,"text":"externalThing"},{"kind":10,"text":"externalThingNotPresent"}],"resolvedModules":[["./newFile",5],["./filePresent",1],["./fileNotFound",2],["externalThing",3],["externalThingNotPresent",4]],"includeReasons":[{"kind":0,"index":10}]}],"rootFileNames":[19,17,18,16,20,23,22,21,25,24,14,26,6],"filesByName":[[15,0]],"resolutions":[{"resolvedModule":{"resolvedFileName":16,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":27,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":17,"extension":".d.ts"},"failedLookupLocations":[28,29]},{"resolvedModule":{"resolvedFileName":18,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":26,"extension":".ts"}}]}},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/externalthing.d.ts",
      "./src/externalthingnotpresent.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/newfile.ts",
      "./src/main.ts",
      "./src/filenotfound.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/externalThingNotPresent.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/newFile.ts",
      "./src/fileNotFound.ts",
      "./src/externalThing.ts",
      "./src/externalThing.tsx"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts"
      ],
      [
        "./src/types.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts",
        "./src/newfile.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }",
        "signature": "-13601649692-export declare function something(): number;\n"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;",
        "signature": "5686005290-export function externalThing1(): number;"
      },
      "./src/externalthingnotpresent.ts": {
        "version": "5318862050-export function externalThing2() { return 20; }",
        "signature": "-16245999227-export declare function externalThing2(): number;\n"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-3531856636-export {};\n"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "signature": "-10760962856-interface SomeType {\n}\n",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
        "signature": "-1928648610-/// <reference path=\"types.d.ts\" />\n"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "signature": "-7731522637-declare function globalSomething(): number;\n",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "signature": "-5961586139-declare function globalSomething2(): number;\n",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "signature": "-17196641480-/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "signature": "4030514825-declare function globalFoo(): number;\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
        "signature": "-15417052438-/// <reference path=\"globalNewFile.d.ts\" />\n/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalMain(): void;\n",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }",
        "signature": "-4788605446-export declare function foo(): number;\n"
      },
      "./src/main.ts": {
        "version": "6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();",
        "signature": "-3531856636-export {};\n"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "persistResolutions": true,
      "traceResolution": true,
      "watch": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts"
      ],
      "./src/filewithref.ts": [
        "./src/types.ts"
      ],
      "./src/globalanotherfilewithsamereferenes.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts"
      ],
      "./src/globalmain.ts": [
        "./src/globalfilepresent.ts",
        "./src/globalfilenotfound.ts",
        "./src/globalnewfile.ts"
      ],
      "./src/main.ts": [
        "./src/filepresent.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      [
        "./src/anotherfilereusingresolution.ts",
        [
          {
            "file": "./src/anotherfilereusingresolution.ts",
            "start": 70,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/externalthing.d.ts",
      "./src/externalthingnotpresent.ts",
      "./src/filepresent.ts",
      "./src/filewithref.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalfilepresent.ts",
      "./src/globalmain.ts",
      "./src/globalnewfile.ts",
      [
        "./src/main.ts",
        [
          {
            "file": "./src/main.ts",
            "start": 159,
            "length": 16,
            "messageText": "Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?",
            "category": 1,
            "code": 2792
          }
        ]
      ],
      "./src/newfile.ts",
      "./src/types.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./src/anotherfilereusingresolution.ts",
        "Full"
      ],
      [
        "./src/externalthing.d.ts",
        "Full"
      ],
      [
        "./src/externalthingnotpresent.ts",
        "Full"
      ],
      [
        "./src/filenotfound.ts",
        "Full"
      ],
      [
        "./src/filepresent.ts",
        "Full"
      ],
      [
        "./src/filewithref.ts",
        "Full"
      ],
      [
        "./src/globalanotherfilewithsamereferenes.ts",
        "Full"
      ],
      [
        "./src/globalfilenotfound.ts",
        "Full"
      ],
      [
        "./src/globalfilepresent.ts",
        "Full"
      ],
      [
        "./src/globalmain.ts",
        "Full"
      ],
      [
        "./src/globalnewfile.ts",
        "Full"
      ],
      [
        "./src/main.ts",
        "Full"
      ],
      [
        "./src/newfile.ts",
        "Full"
      ],
      [
        "./src/types.ts",
        "Full"
      ]
    ],
    "peristedProgram": {
      "files": [
        {
          "fileName": "../../../../a/lib/lib.d.ts",
          "originalFileName": "../../../../a/lib/lib.d.ts",
          "path": "../../../../a/lib/lib.d.ts",
          "resolvedPath": "../../../../a/lib/lib.d.ts",
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "flags": 0,
          "hasNoDefaultLib": true,
          "includeReasons": [
            {
              "kind": "LibFile"
            }
          ]
        },
        {
          "fileName": "./src/filePresent.ts",
          "originalFileName": "./src/filePresent.ts",
          "path": "./src/filepresent.ts",
          "resolvedPath": "./src/filepresent.ts",
          "version": "11598859296-export function something() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 3
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "./src/externalThing.d.ts",
          "originalFileName": "./src/externalThing.d.ts",
          "path": "./src/externalthing.d.ts",
          "resolvedPath": "./src/externalthing.d.ts",
          "version": "5686005290-export function externalThing1(): number;",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 2
            },
            {
              "kind": "RootFile",
              "index": 1
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/externalThingNotPresent.ts",
          "originalFileName": "./src/externalThingNotPresent.ts",
          "path": "./src/externalthingnotpresent.ts",
          "resolvedPath": "./src/externalthingnotpresent.ts",
          "version": "5318862050-export function externalThing2() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/anotherfilereusingresolution.ts",
              "index": 3
            },
            {
              "kind": "RootFile",
              "index": 2
            },
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 5
            }
          ]
        },
        {
          "fileName": "./src/anotherFileReusingResolution.ts",
          "originalFileName": "./src/anotherFileReusingResolution.ts",
          "path": "./src/anotherfilereusingresolution.ts",
          "resolvedPath": "./src/anotherfilereusingresolution.ts",
          "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/fileNotFound.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThingNotPresent.ts",
                  "extension": ".ts"
                }
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 0
            }
          ]
        },
        {
          "fileName": "./src/types.ts",
          "originalFileName": "./src/types.ts",
          "path": "./src/types.ts",
          "resolvedPath": "./src/types.ts",
          "version": "-12575322908-interface SomeType {}",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/filewithref.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 12
            }
          ]
        },
        {
          "fileName": "./src/fileWithRef.ts",
          "originalFileName": "./src/fileWithRef.ts",
          "path": "./src/filewithref.ts",
          "resolvedPath": "./src/filewithref.ts",
          "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
          "flags": 0,
          "referencedFiles": [
            "./types.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 4
            }
          ]
        },
        {
          "fileName": "./src/globalFilePresent.ts",
          "originalFileName": "./src/globalFilePresent.ts",
          "path": "./src/globalfilepresent.ts",
          "resolvedPath": "./src/globalfilepresent.ts",
          "version": "-5627034801-function globalSomething() { return 10; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 7
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 1
            }
          ]
        },
        {
          "fileName": "./src/globalFileNotFound.ts",
          "originalFileName": "./src/globalFileNotFound.ts",
          "path": "./src/globalfilenotfound.ts",
          "resolvedPath": "./src/globalfilenotfound.ts",
          "version": "-6310824062-function globalSomething2() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalanotherfilewithsamereferenes.ts",
              "index": 1
            },
            {
              "kind": "RootFile",
              "index": 6
            },
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 2
            }
          ]
        },
        {
          "fileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "originalFileName": "./src/globalAnotherFileWithSameReferenes.ts",
          "path": "./src/globalanotherfilewithsamereferenes.ts",
          "resolvedPath": "./src/globalanotherfilewithsamereferenes.ts",
          "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
          "flags": 0,
          "referencedFiles": [
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 5
            }
          ]
        },
        {
          "fileName": "./src/globalNewFile.ts",
          "originalFileName": "./src/globalNewFile.ts",
          "path": "./src/globalnewfile.ts",
          "resolvedPath": "./src/globalnewfile.ts",
          "version": "4916490342-function globalFoo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "ReferenceFile",
              "file": "./src/globalmain.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 9
            }
          ]
        },
        {
          "fileName": "./src/globalMain.ts",
          "originalFileName": "./src/globalMain.ts",
          "path": "./src/globalmain.ts",
          "resolvedPath": "./src/globalmain.ts",
          "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
          "flags": 0,
          "referencedFiles": [
            "./globalNewFile.ts",
            "./globalFilePresent.ts",
            "./globalFileNotFound.ts"
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 8
            }
          ]
        },
        {
          "fileName": "./src/newFile.ts",
          "originalFileName": "./src/newFile.ts",
          "path": "./src/newfile.ts",
          "resolvedPath": "./src/newfile.ts",
          "version": "4428918903-export function foo() { return 20; }",
          "flags": 0,
          "includeReasons": [
            {
              "kind": "Import",
              "file": "./src/main.ts",
              "index": 0
            },
            {
              "kind": "RootFile",
              "index": 11
            }
          ]
        },
        {
          "fileName": "./src/main.ts",
          "originalFileName": "./src/main.ts",
          "path": "./src/main.ts",
          "resolvedPath": "./src/main.ts",
          "version": "6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();",
          "flags": 0,
          "imports": [
            {
              "kind": 10,
              "text": "./newFile"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./filePresent"
            },
            {
              "kind": 10,
              "text": "./fileNotFound"
            },
            {
              "kind": 10,
              "text": "externalThing"
            },
            {
              "kind": 10,
              "text": "externalThingNotPresent"
            }
          ],
          "resolvedModules": [
            [
              "./newFile",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/newFile.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./filePresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/filePresent.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "./fileNotFound",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/fileNotFound.ts",
                  "extension": ".ts"
                }
              }
            ],
            [
              "externalThing",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThing.d.ts",
                  "extension": ".d.ts"
                },
                "failedLookupLocations": [
                  "./src/externalThing.ts",
                  "./src/externalThing.tsx"
                ]
              }
            ],
            [
              "externalThingNotPresent",
              {
                "resolvedModule": {
                  "resolvedFileName": "./src/externalThingNotPresent.ts",
                  "extension": ".ts"
                }
              }
            ]
          ],
          "includeReasons": [
            {
              "kind": "RootFile",
              "index": 10
            }
          ]
        }
      ],
      "rootFileNames": [
        "./src/anotherFileReusingResolution.ts",
        "./src/externalThing.d.ts",
        "./src/externalThingNotPresent.ts",
        "./src/filePresent.ts",
        "./src/fileWithRef.ts",
        "./src/globalAnotherFileWithSameReferenes.ts",
        "./src/globalFileNotFound.ts",
        "./src/globalFilePresent.ts",
        "./src/globalMain.ts",
        "./src/globalNewFile.ts",
        "./src/main.ts",
        "./src/newFile.ts",
        "./src/types.ts"
      ],
      "filesByName": {
        "./src/filenotfound.ts": 0
      },
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThing.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/externalThing.ts",
            "./src/externalThing.tsx"
          ]
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/externalThingNotPresent.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/newFile.ts",
            "extension": ".ts"
          }
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 10211
}


Change:: Write .ts file that takes preference over resolved .d.ts file

Input::
//// [/user/username/projects/myproject/src/externalThing.ts]
export function externalThing1() { return 10; }


Output::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/externalThing.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/externalThing.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
[[90m12:02:09 AM[0m] File change detected. Starting incremental compilation...

FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/externalThing.d.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/externalThing.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/fileNotFound.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
Reusing resolution of module 'externalThingNotPresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThingNotPresent.ts'.
Reusing resolution of module './newFile' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/newFile.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/fileNotFound.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
Reusing resolution of module 'externalThingNotPresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThingNotPresent.ts'.
[91merror[0m[90m TS5055: [0mCannot write file '/user/username/projects/myproject/src/externalThing.d.ts' because it would overwrite input file.

[[90m12:02:10 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.ts","/user/username/projects/myproject/src/externalThingNotPresent.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/filePresent.ts
/user/username/projects/myproject/src/externalThing.d.ts
/user/username/projects/myproject/src/externalThingNotPresent.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/externalThing.ts
/user/username/projects/myproject/src/types.ts
/user/username/projects/myproject/src/fileWithRef.ts
/user/username/projects/myproject/src/globalFilePresent.ts
/user/username/projects/myproject/src/globalFileNotFound.ts
/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts
/user/username/projects/myproject/src/globalNewFile.ts
/user/username/projects/myproject/src/globalMain.ts
/user/username/projects/myproject/src/newFile.ts
/user/username/projects/myproject/src/main.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/src/externalThing.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/src/anotherfilereusingresolution.ts:
  {"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","pollingInterval":250}
/user/username/projects/myproject/src/filepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/filePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/filewithref.ts:
  {"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalanotherfilewithsamereferenes.ts:
  {"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalmain.ts:
  {"fileName":"/user/username/projects/myproject/src/globalMain.ts","pollingInterval":250}
/user/username/projects/myproject/src/main.ts:
  {"fileName":"/user/username/projects/myproject/src/main.ts","pollingInterval":250}
/user/username/projects/myproject/src/types.ts:
  {"fileName":"/user/username/projects/myproject/src/types.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalnewfile.ts:
  {"fileName":"/user/username/projects/myproject/src/globalNewFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFileNotFound.ts","pollingInterval":250}
/user/username/projects/myproject/src/newfile.ts:
  {"fileName":"/user/username/projects/myproject/src/newFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthingnotpresent.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThingNotPresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

