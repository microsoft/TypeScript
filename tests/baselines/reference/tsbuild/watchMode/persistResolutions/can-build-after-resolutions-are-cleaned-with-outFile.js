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

//// [/user/username/projects/myproject/node_modules/@types/someType/index.d.ts]
export function someType(): number;

//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"module":"amd","composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"outFile.js"},"include":["src/**/*.ts"]}

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

//// [/user/username/projects/myproject/outFile.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/globalfilenotfound.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"-12326309214-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\n","signature":false,"affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true},"fileIdsList":[[2,3],[5],[7,12]],"referencedMap":[[4,1],[6,2],[8,3],[9,3],[10,1]],"exportedModulesMap":[]},"version":"FakeTSVersion"}


/a/lib/tsc.js --b . -w --extendedDiagnostics
Output::
[[90m12:00:52 AM[0m] Starting compilation in watch mode...

======== Resolving module './filePresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/user/username/projects/myproject/src/filePresent.ts' exist - use it as a name resolution result.
======== Module name './filePresent' was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'. ========
======== Resolving module './fileNotFound' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/user/username/projects/myproject/src/fileNotFound.ts' does not exist.
File '/user/username/projects/myproject/src/fileNotFound.tsx' does not exist.
File '/user/username/projects/myproject/src/fileNotFound.d.ts' does not exist.
File '/user/username/projects/myproject/src/fileNotFound.js' does not exist.
File '/user/username/projects/myproject/src/fileNotFound.jsx' does not exist.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThing' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/user/username/projects/myproject/src/externalThing.ts' does not exist.
File '/user/username/projects/myproject/src/externalThing.tsx' does not exist.
File '/user/username/projects/myproject/src/externalThing.d.ts' exist - use it as a name resolution result.
======== Module name 'externalThing' was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'. ========
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
File '/user/username/projects/myproject/node_modules/@types/externalThingNotPresent.d.ts' does not exist.
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
======== Resolving module './filePresent' from '/user/username/projects/myproject/src/main.ts'. ========
Resolution for module './filePresent' was found in cache from location '/user/username/projects/myproject/src'.
======== Module name './filePresent' was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'. ========
======== Resolving module './fileNotFound' from '/user/username/projects/myproject/src/main.ts'. ========
Resolution for module './fileNotFound' was found in cache from location '/user/username/projects/myproject/src'.
======== Module name './fileNotFound' was not resolved. ========
======== Resolving module 'externalThing' from '/user/username/projects/myproject/src/main.ts'. ========
Resolution for module 'externalThing' was found in cache from location '/user/username/projects/myproject/src'.
======== Module name 'externalThing' was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'. ========
======== Resolving module 'externalThingNotPresent' from '/user/username/projects/myproject/src/main.ts'. ========
Resolution for module 'externalThingNotPresent' was found in cache from location '/user/username/projects/myproject/src'.
======== Module name 'externalThingNotPresent' was not resolved. ========
======== Resolving type reference directive 'someType', containing file '/user/username/projects/myproject/__inferred type names__.ts', root directory '/user/username/projects/myproject/node_modules/@types'. ========
Resolving with primary search path '/user/username/projects/myproject/node_modules/@types'.
File '/user/username/projects/myproject/node_modules/@types/someType/package.json' does not exist.
File '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts', result '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts', primary: true. ========
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

[[90m12:00:58 AM[0m] Found 6 errors. Watching for file changes.

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
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/user/username/projects/myproject/outFile.js","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Not
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
/user/username/projects/myproject/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::

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

//// [/user/username/projects/myproject/outFile.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/globalfilenotfound.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"-12326309214-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\n","signature":false,"affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true,"watch":true},"fileIdsList":[[2,3],[5],[7,12]],"referencedMap":[[4,1],[6,2],[8,3],[9,3],[10,1]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[13,14,15,16,17]},{"resolvedModule":{"resolvedFileName":18,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":19,"extension":".d.ts"},"failedLookupLocations":[20,21]},{"failedLookupLocations":[22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69]}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"resolutionMap":[[4,[1,2,3,4]],[10,[1,2,3,4]]]}},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/outFile.tsbuildinfo.readable.baseline.txt]
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
      "./node_modules/@types/sometype/index.d.ts",
      "./src/globalfilenotfound.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.js",
      "./src/fileNotFound.jsx",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
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
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-12326309214-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\n",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "outFile": "./outFile.js",
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
    "persistedResolutions": {
      "resolutions": [
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
            "resolvedFileName": "./src/filePresent.ts",
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
        }
      ],
      "names": [
        "./fileNotFound",
        "./filePresent",
        "externalThing",
        "externalThingNotPresent"
      ],
      "resolutionEntries": [
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
          "./filePresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
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
      "resolutionMap": {
        "./src/anotherfilereusingresolution.ts": {
          "./fileNotFound": {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
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
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
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
        }
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 5660
}


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
[[90m12:01:01 AM[0m] File change detected. Starting incremental compilation...

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
File '/user/username/projects/myproject/node_modules/@types/externalThingNotPresent.d.ts' does not exist.
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
======== Resolving type reference directive 'someType', containing file '/user/username/projects/myproject/__inferred type names__.ts', root directory '/user/username/projects/myproject/node_modules/@types'. ========
Resolving with primary search path '/user/username/projects/myproject/node_modules/@types'.
File '/user/username/projects/myproject/node_modules/@types/someType/package.json' does not exist.
File '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts', result '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts', primary: true. ========
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

[[90m12:01:08 AM[0m] Found 6 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/user/username/projects/myproject/outFile.js","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
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
/user/username/projects/myproject/src/globalMain.ts
/user/username/projects/myproject/src/main.ts
/user/username/projects/myproject/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::

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

//// [/user/username/projects/myproject/outFile.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/globalfilenotfound.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"-5695225267-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();","signature":false,"affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true,"watch":true},"fileIdsList":[[2,3],[5],[7,12]],"referencedMap":[[4,1],[6,2],[8,3],[9,3],[10,1]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[13,14,15,16,17]},{"resolvedModule":{"resolvedFileName":18,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":19,"extension":".d.ts"},"failedLookupLocations":[20,21]},{"failedLookupLocations":[22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69]}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"resolutionMap":[[4,[1,2,3,4]],[10,[1,2,3,4]]]}},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/outFile.tsbuildinfo.readable.baseline.txt]
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
      "./node_modules/@types/sometype/index.d.ts",
      "./src/globalfilenotfound.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.js",
      "./src/fileNotFound.jsx",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
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
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-5695225267-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "outFile": "./outFile.js",
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
    "persistedResolutions": {
      "resolutions": [
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
            "resolvedFileName": "./src/filePresent.ts",
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
        }
      ],
      "names": [
        "./fileNotFound",
        "./filePresent",
        "externalThing",
        "externalThingNotPresent"
      ],
      "resolutionEntries": [
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
          "./filePresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
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
      "resolutionMap": {
        "./src/anotherfilereusingresolution.ts": {
          "./fileNotFound": {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
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
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
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
        }
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 5677
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
[[90m12:01:15 AM[0m] File change detected. Starting incremental compilation...

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
File '/user/username/projects/myproject/node_modules/@types/externalThingNotPresent.d.ts' does not exist.
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
======== Resolving type reference directive 'someType', containing file '/user/username/projects/myproject/__inferred type names__.ts', root directory '/user/username/projects/myproject/node_modules/@types'. ========
Resolving with primary search path '/user/username/projects/myproject/node_modules/@types'.
File '/user/username/projects/myproject/node_modules/@types/someType/package.json' does not exist.
File '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts', result '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts', primary: true. ========
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

[[90m12:01:22 AM[0m] Found 6 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/user/username/projects/myproject/outFile.js","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
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
/user/username/projects/myproject/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::

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

//// [/user/username/projects/myproject/outFile.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/globalfilenotfound.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":false,"affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true,"watch":true},"fileIdsList":[[2,3],[5],[7,13],[7,9,13]],"referencedMap":[[4,1],[6,2],[8,3],[10,4],[11,1]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[14,15,16,17,18]},{"resolvedModule":{"resolvedFileName":19,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":20,"extension":".d.ts"},"failedLookupLocations":[21,22]},{"failedLookupLocations":[23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70]}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"resolutionMap":[[4,[1,2,3,4]],[11,[1,2,3,4]]]}},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/outFile.tsbuildinfo.readable.baseline.txt]
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
      "./node_modules/@types/sometype/index.d.ts",
      "./src/globalfilenotfound.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.js",
      "./src/fileNotFound.jsx",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
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
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "outFile": "./outFile.js",
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
    "persistedResolutions": {
      "resolutions": [
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
            "resolvedFileName": "./src/filePresent.ts",
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
        }
      ],
      "names": [
        "./fileNotFound",
        "./filePresent",
        "externalThing",
        "externalThingNotPresent"
      ],
      "resolutionEntries": [
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
          "./filePresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
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
      "resolutionMap": {
        "./src/anotherfilereusingresolution.ts": {
          "./fileNotFound": {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
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
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
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
        }
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 5875
}


Change:: Write file that could not be resolved by referenced path

Input::
//// [/user/username/projects/myproject/src/globalFileNotFound.ts]
function globalSomething2() { return 20; }


Output::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalFileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalFileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
[[90m12:01:25 AM[0m] File change detected. Starting incremental compilation...

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
File '/user/username/projects/myproject/node_modules/@types/externalThingNotPresent.d.ts' does not exist.
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
======== Resolving type reference directive 'someType', containing file '/user/username/projects/myproject/__inferred type names__.ts', root directory '/user/username/projects/myproject/node_modules/@types'. ========
Resolving with primary search path '/user/username/projects/myproject/node_modules/@types'.
File '/user/username/projects/myproject/node_modules/@types/someType/package.json' does not exist.
File '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts', result '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts', primary: true. ========
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

[[90m12:01:32 AM[0m] Found 4 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/user/username/projects/myproject/outFile.js","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
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
/user/username/projects/myproject/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::

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

//// [/user/username/projects/myproject/outFile.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":false,"affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true,"watch":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[12,1]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[14,15,16,17,18]},{"resolvedModule":{"resolvedFileName":19,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":20,"extension":".d.ts"},"failedLookupLocations":[21,22]},{"failedLookupLocations":[23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70]}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"resolutionMap":[[4,[1,2,3,4]],[12,[1,2,3,4]]]}},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/outFile.tsbuildinfo.readable.baseline.txt]
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
      "./node_modules/@types/sometype/index.d.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.js",
      "./src/fileNotFound.jsx",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
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
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "outFile": "./outFile.js",
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
    "persistedResolutions": {
      "resolutions": [
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
            "resolvedFileName": "./src/filePresent.ts",
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
        }
      ],
      "names": [
        "./fileNotFound",
        "./filePresent",
        "externalThing",
        "externalThingNotPresent"
      ],
      "resolutionEntries": [
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
          "./filePresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
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
      "resolutionMap": {
        "./src/anotherfilereusingresolution.ts": {
          "./fileNotFound": {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
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
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
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
        }
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 5987
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
[[90m12:01:35 AM[0m] File change detected. Starting incremental compilation...

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
File '/user/username/projects/myproject/node_modules/@types/externalThingNotPresent.d.ts' does not exist.
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
======== Resolving type reference directive 'someType', containing file '/user/username/projects/myproject/__inferred type names__.ts', root directory '/user/username/projects/myproject/node_modules/@types'. ========
Resolving with primary search path '/user/username/projects/myproject/node_modules/@types'.
File '/user/username/projects/myproject/node_modules/@types/someType/package.json' does not exist.
File '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts', result '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts', primary: true. ========
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

[[90m12:01:42 AM[0m] Found 4 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/user/username/projects/myproject/outFile.js","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
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
/user/username/projects/myproject/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::

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

//// [/user/username/projects/myproject/outFile.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":false,"affectsGlobalScope":true},{"version":"-22898386493-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true,"watch":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[12,1]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[14,15,16,17,18]},{"resolvedModule":{"resolvedFileName":19,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":20,"extension":".d.ts"},"failedLookupLocations":[21,22]},{"failedLookupLocations":[23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70]}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"resolutionMap":[[4,[1,2,3,4]],[12,[1,2,3,4]]]}},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/outFile.tsbuildinfo.readable.baseline.txt]
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
      "./node_modules/@types/sometype/index.d.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.js",
      "./src/fileNotFound.jsx",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
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
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-22898386493-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "outFile": "./outFile.js",
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
    "persistedResolutions": {
      "resolutions": [
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
            "resolvedFileName": "./src/filePresent.ts",
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
        }
      ],
      "names": [
        "./fileNotFound",
        "./filePresent",
        "externalThing",
        "externalThingNotPresent"
      ],
      "resolutionEntries": [
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
          "./filePresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
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
      "resolutionMap": {
        "./src/anotherfilereusingresolution.ts": {
          "./fileNotFound": {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
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
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
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
        }
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 5999
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
[[90m12:01:47 AM[0m] File change detected. Starting incremental compilation...

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
File '/user/username/projects/myproject/node_modules/@types/externalThingNotPresent.d.ts' does not exist.
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
======== Resolving type reference directive 'someType', containing file '/user/username/projects/myproject/__inferred type names__.ts', root directory '/user/username/projects/myproject/node_modules/@types'. ========
Resolving with primary search path '/user/username/projects/myproject/node_modules/@types'.
File '/user/username/projects/myproject/node_modules/@types/someType/package.json' does not exist.
File '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts', result '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts', primary: true. ========
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

[[90m12:01:54 AM[0m] Found 4 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/user/username/projects/myproject/outFile.js","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
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
/user/username/projects/myproject/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::

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

//// [/user/username/projects/myproject/outFile.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx","./src/newFile.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":false,"affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":false},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true,"watch":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10],[2,3,12]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[13,5]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[15,16,17,18,19]},{"resolvedModule":{"resolvedFileName":20,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":21,"extension":".d.ts"},"failedLookupLocations":[22,23]},{"failedLookupLocations":[24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71]},{"resolvedModule":{"resolvedFileName":72,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[4,[1,2,3,4]],[13,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/outFile.tsbuildinfo.readable.baseline.txt]
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
      "./node_modules/@types/sometype/index.d.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.js",
      "./src/fileNotFound.jsx",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
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
      "../../../../externalThingNotPresent.jsx",
      "./src/newFile.ts"
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
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }"
      },
      "./src/main.ts": {
        "version": "6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "outFile": "./outFile.js",
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
    "persistedResolutions": {
      "resolutions": [
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
            "resolvedFileName": "./src/filePresent.ts",
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
      ],
      "names": [
        "./fileNotFound",
        "./filePresent",
        "externalThing",
        "externalThingNotPresent",
        "./newFile"
      ],
      "resolutionEntries": [
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
          "./filePresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
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
        ],
        [
          "./newFile",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          }
        ]
      ],
      "resolutionMap": {
        "./src/anotherfilereusingresolution.ts": {
          "./fileNotFound": {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
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
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx",
              "./src/fileNotFound.d.ts",
              "./src/fileNotFound.js",
              "./src/fileNotFound.jsx"
            ]
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "./newFile": {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
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
        }
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 6239
}


Change:: Write file that could not be resolved

Input::
//// [/user/username/projects/myproject/src/fileNotFound.ts]
export function something2() { return 20; }


Output::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
[[90m12:01:57 AM[0m] File change detected. Starting incremental compilation...

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
File '/user/username/projects/myproject/node_modules/@types/externalThingNotPresent.d.ts' does not exist.
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
======== Resolving type reference directive 'someType', containing file '/user/username/projects/myproject/__inferred type names__.ts', root directory '/user/username/projects/myproject/node_modules/@types'. ========
Resolving with primary search path '/user/username/projects/myproject/node_modules/@types'.
File '/user/username/projects/myproject/node_modules/@types/someType/package.json' does not exist.
File '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts', result '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts', primary: true. ========
[96msrc/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";something();
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[[90m12:02:04 AM[0m] Found 2 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/fileNotFound.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/user/username/projects/myproject/outFile.js","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
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
/user/username/projects/myproject/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::

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

//// [/user/username/projects/myproject/outFile.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx","./src/newFile.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"-497034637-export function something2() { return 20; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":false,"affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":false},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true,"watch":true},"fileIdsList":[[2,3,4],[6],[8,9],[8,9,11],[2,3,4,13]],"referencedMap":[[5,1],[7,2],[10,3],[12,4],[14,5]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":16,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":17,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":18,"extension":".d.ts"},"failedLookupLocations":[19,20]},{"failedLookupLocations":[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68]},{"resolvedModule":{"resolvedFileName":69,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[5,[1,2,3,4]],[14,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/outFile.tsbuildinfo.readable.baseline.txt]
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
      "./node_modules/@types/sometype/index.d.ts",
      "./src/fileNotFound.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
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
      "../../../../externalThingNotPresent.jsx",
      "./src/newFile.ts"
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
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/filenotfound.ts": {
        "version": "-497034637-export function something2() { return 20; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }"
      },
      "./src/main.ts": {
        "version": "6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "outFile": "./outFile.js",
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
    "persistedResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
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
      ],
      "names": [
        "./fileNotFound",
        "./filePresent",
        "externalThing",
        "externalThingNotPresent",
        "./newFile"
      ],
      "resolutionEntries": [
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
          "./filePresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
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
        ],
        [
          "./newFile",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          }
        ]
      ],
      "resolutionMap": {
        "./src/anotherfilereusingresolution.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
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
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "./newFile": {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
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
        }
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 6273
}


Change:: Delete file that could not be resolved

Input::
//// [/user/username/projects/myproject/src/fileNotFound.ts] deleted

Output::
FileWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts 2:: WatchInfo: /user/username/projects/myproject/src/fileNotFound.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts 2:: WatchInfo: /user/username/projects/myproject/src/fileNotFound.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
[[90m12:02:06 AM[0m] File change detected. Starting incremental compilation...

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
File '/user/username/projects/myproject/node_modules/@types/externalThingNotPresent.d.ts' does not exist.
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
======== Resolving type reference directive 'someType', containing file '/user/username/projects/myproject/__inferred type names__.ts', root directory '/user/username/projects/myproject/node_modules/@types'. ========
Resolving with primary search path '/user/username/projects/myproject/node_modules/@types'.
File '/user/username/projects/myproject/node_modules/@types/someType/package.json' does not exist.
File '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts', result '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts', primary: true. ========
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

[[90m12:02:13 AM[0m] Found 4 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/user/username/projects/myproject/outFile.js","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
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
/user/username/projects/myproject/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::

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

//// [/user/username/projects/myproject/outFile.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx","./src/newFile.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":false,"affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":false},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true,"watch":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10],[2,3,12]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[13,5]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":15,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":16,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":17,"extension":".d.ts"},"failedLookupLocations":[18,19]},{"failedLookupLocations":[20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67]},{"resolvedModule":{"resolvedFileName":68,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[4,[1,2,3,4]],[13,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/outFile.tsbuildinfo.readable.baseline.txt]
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
      "./node_modules/@types/sometype/index.d.ts",
      "./src/fileNotFound.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
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
      "../../../../externalThingNotPresent.jsx",
      "./src/newFile.ts"
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
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }"
      },
      "./src/main.ts": {
        "version": "6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "outFile": "./outFile.js",
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
    "persistedResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
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
      ],
      "names": [
        "./fileNotFound",
        "./filePresent",
        "externalThing",
        "externalThingNotPresent",
        "./newFile"
      ],
      "resolutionEntries": [
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
          "./filePresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
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
        ],
        [
          "./newFile",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          }
        ]
      ],
      "resolutionMap": {
        "./src/anotherfilereusingresolution.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
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
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "./newFile": {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
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
        }
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 6157
}


Change:: Write file that could not be resolved

Input::
//// [/user/username/projects/myproject/src/fileNotFound.ts]
export function something2() { return 20; }


Output::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
[[90m12:02:16 AM[0m] File change detected. Starting incremental compilation...

FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/fileNotFound.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
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
File '/user/username/projects/myproject/node_modules/@types/externalThingNotPresent.d.ts' does not exist.
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
======== Resolving type reference directive 'someType', containing file '/user/username/projects/myproject/__inferred type names__.ts', root directory '/user/username/projects/myproject/node_modules/@types'. ========
Resolving with primary search path '/user/username/projects/myproject/node_modules/@types'.
File '/user/username/projects/myproject/node_modules/@types/someType/package.json' does not exist.
File '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts', result '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts', primary: true. ========
[96msrc/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";something();
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[[90m12:02:23 AM[0m] Found 2 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/fileNotFound.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/user/username/projects/myproject/outFile.js","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
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
/user/username/projects/myproject/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::

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

//// [/user/username/projects/myproject/outFile.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx","./src/newFile.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"-497034637-export function something2() { return 20; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":false,"affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":false},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true,"watch":true},"fileIdsList":[[2,3,4],[6],[8,9],[8,9,11],[2,3,4,13]],"referencedMap":[[5,1],[7,2],[10,3],[12,4],[14,5]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":16,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":17,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":18,"extension":".d.ts"},"failedLookupLocations":[19,20]},{"failedLookupLocations":[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68]},{"resolvedModule":{"resolvedFileName":69,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[5,[1,2,3,4]],[14,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/outFile.tsbuildinfo.readable.baseline.txt]
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
      "./node_modules/@types/sometype/index.d.ts",
      "./src/fileNotFound.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
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
      "../../../../externalThingNotPresent.jsx",
      "./src/newFile.ts"
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
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/filenotfound.ts": {
        "version": "-497034637-export function something2() { return 20; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }"
      },
      "./src/main.ts": {
        "version": "6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "outFile": "./outFile.js",
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
    "persistedResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
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
      ],
      "names": [
        "./fileNotFound",
        "./filePresent",
        "externalThing",
        "externalThingNotPresent",
        "./newFile"
      ],
      "resolutionEntries": [
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
          "./filePresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
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
        ],
        [
          "./newFile",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          }
        ]
      ],
      "resolutionMap": {
        "./src/anotherfilereusingresolution.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
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
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "./newFile": {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
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
        }
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 6273
}


Change:: Create external module file that could not be resolved

Input::
//// [/user/username/projects/myproject/src/externalThingNotPresent.ts]
export function externalThing2() { return 20; }


Output::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/externalThingNotPresent.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/externalThingNotPresent.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
[[90m12:02:26 AM[0m] File change detected. Starting incremental compilation...

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
======== Resolving type reference directive 'someType', containing file '/user/username/projects/myproject/__inferred type names__.ts', root directory '/user/username/projects/myproject/node_modules/@types'. ========
Resolving with primary search path '/user/username/projects/myproject/node_modules/@types'.
File '/user/username/projects/myproject/node_modules/@types/someType/package.json' does not exist.
File '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts', result '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts', primary: true. ========
[[90m12:02:39 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/externalThingNotPresent.ts","/user/username/projects/myproject/src/fileNotFound.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/user/username/projects/myproject/outFile.js","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/filePresent.ts
/user/username/projects/myproject/src/fileNotFound.ts
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
/user/username/projects/myproject/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::

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
/user/username/projects/myproject/src/externalthingnotpresent.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThingNotPresent.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./src/filePresent.ts","./src/fileNotFound.ts","./src/externalThingNotPresent.ts","./src/anotherFileReusingResolution.ts","./src/types.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/newFile.ts","./src/main.ts"],"js":{"sections":[{"pos":0,"end":1807,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":653,"kind":"text"}]}},"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/externalthing.d.ts","./src/externalthingnotpresent.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/newFile.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"-497034637-export function something2() { return 20; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"5318862050-export function externalThing2() { return 20; }","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":false,"affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":false},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true,"watch":true},"fileIdsList":[[2,3,4,5],[7],[9,10],[9,10,12],[2,3,4,5,14]],"referencedMap":[[6,1],[8,2],[11,3],[13,4],[15,5]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":17,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":18,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":19,"extension":".d.ts"},"failedLookupLocations":[20,21]},{"resolvedModule":{"resolvedFileName":22,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":23,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[6,[1,2,3,4]],[15,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./src/filePresent.ts",
      "./src/fileNotFound.ts",
      "./src/externalThingNotPresent.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/types.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/newFile.ts",
      "./src/main.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 1807,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 653,
          "kind": "text"
        }
      ]
    }
  },
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/filenotfound.ts",
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
      "./node_modules/@types/sometype/index.d.ts",
      "./src/fileNotFound.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/newFile.ts"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
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
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts",
        "./src/newfile.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/filenotfound.ts": {
        "version": "-497034637-export function something2() { return 20; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/externalthingnotpresent.ts": {
        "version": "5318862050-export function externalThing2() { return 20; }"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }"
      },
      "./src/main.ts": {
        "version": "6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "traceResolution": true,
      "watch": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
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
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "persistedResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
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
      ],
      "names": [
        "./fileNotFound",
        "./filePresent",
        "externalThing",
        "externalThingNotPresent",
        "./newFile"
      ],
      "resolutionEntries": [
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
          "./filePresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
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
        ],
        [
          "./newFile",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          }
        ]
      ],
      "resolutionMap": {
        "./src/anotherfilereusingresolution.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThingNotPresent.ts",
              "extension": ".ts"
            }
          }
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "./newFile": {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThingNotPresent.ts",
              "extension": ".ts"
            }
          }
        }
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 4644
}

//// [/user/username/projects/myproject/outFile.js]
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/fileNotFound", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something2 = void 0;
    function something2() { return 20; }
    exports.something2 = something2;
});
define("src/externalThingNotPresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.externalThing2 = void 0;
    function externalThing2() { return 20; }
    exports.externalThing2 = externalThing2;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
define("src/newFile", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    function foo() { return 20; }
    exports.foo = foo;
});
define("src/main", ["require", "exports", "src/filePresent"], function (require, exports, filePresent_1) {
    "use strict";
    exports.__esModule = true;
    filePresent_1.something();
});


//// [/user/username/projects/myproject/outFile.d.ts]
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/fileNotFound" {
    export function something2(): number;
}
declare module "src/externalThingNotPresent" {
    export function externalThing2(): number;
}
declare module "src/anotherFileReusingResolution" { }
interface SomeType {
}
declare function globalSomething(): number;
declare function globalSomething2(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/newFile" {
    export function foo(): number;
}
declare module "src/main" { }


//// [/user/username/projects/myproject/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /user/username/projects/myproject/outFile.js
----------------------------------------------------------------------
text: (0-1807)
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/fileNotFound", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something2 = void 0;
    function something2() { return 20; }
    exports.something2 = something2;
});
define("src/externalThingNotPresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.externalThing2 = void 0;
    function externalThing2() { return 20; }
    exports.externalThing2 = externalThing2;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
define("src/newFile", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    function foo() { return 20; }
    exports.foo = foo;
});
define("src/main", ["require", "exports", "src/filePresent"], function (require, exports, filePresent_1) {
    "use strict";
    exports.__esModule = true;
    filePresent_1.something();
});

======================================================================
======================================================================
File:: /user/username/projects/myproject/outFile.d.ts
----------------------------------------------------------------------
text: (0-653)
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/fileNotFound" {
    export function something2(): number;
}
declare module "src/externalThingNotPresent" {
    export function externalThing2(): number;
}
declare module "src/anotherFileReusingResolution" { }
interface SomeType {
}
declare function globalSomething(): number;
declare function globalSomething2(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/newFile" {
    export function foo(): number;
}
declare module "src/main" { }

======================================================================


Change:: Write .ts file that takes preference over resolved .d.ts file

Input::
//// [/user/username/projects/myproject/src/externalThing.ts]
export function externalThing1() { return 10; }


Output::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/externalThing.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/externalThing.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
[[90m12:02:42 AM[0m] File change detected. Starting incremental compilation...

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
======== Resolving type reference directive 'someType', containing file '/user/username/projects/myproject/__inferred type names__.ts', root directory '/user/username/projects/myproject/node_modules/@types'. ========
Resolving with primary search path '/user/username/projects/myproject/node_modules/@types'.
File '/user/username/projects/myproject/node_modules/@types/someType/package.json' does not exist.
File '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts', result '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts', primary: true. ========
[[90m12:02:58 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.ts","/user/username/projects/myproject/src/externalThingNotPresent.ts","/user/username/projects/myproject/src/fileNotFound.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"outFile":"/user/username/projects/myproject/outFile.js","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/filePresent.ts
/user/username/projects/myproject/src/fileNotFound.ts
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
/user/username/projects/myproject/node_modules/@types/someType/index.d.ts

No cached semantic diagnostics in the builder::

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
/user/username/projects/myproject/src/filenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/fileNotFound.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthingnotpresent.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThingNotPresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./src/filePresent.ts","./src/fileNotFound.ts","./src/externalThingNotPresent.ts","./src/anotherFileReusingResolution.ts","./src/externalThing.ts","./src/types.ts","./src/fileWithRef.ts","./src/globalFilePresent.ts","./src/globalFileNotFound.ts","./src/globalAnotherFileWithSameReferenes.ts","./src/globalNewFile.ts","./src/globalMain.ts","./src/newFile.ts","./src/main.ts"],"js":{"sections":[{"pos":0,"end":2069,"kind":"text"}]},"dts":{"sections":[{"pos":0,"end":738,"kind":"text"}]}},"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/externalthing.d.ts","./src/externalthingnotpresent.ts","./src/anotherfilereusingresolution.ts","./src/externalthing.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/newFile.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","signature":false,"affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":false},{"version":"-497034637-export function something2() { return 20; }","signature":false},{"version":"5686005290-export function externalThing1(): number;","signature":false},{"version":"5318862050-export function externalThing2() { return 20; }","signature":false},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":false},{"version":"5618215488-export function externalThing1() { return 10; }","signature":false},{"version":"-12575322908-interface SomeType {}","signature":false,"affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":false},{"version":"-5627034801-function globalSomething() { return 10; }","signature":false,"affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":false,"affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":false,"affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":false,"affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":false},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":false},{"version":"7070062898-export function someType(): number;","signature":false}],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"outFile":"./outFile.js","persistResolutions":true,"traceResolution":true,"watch":true},"fileIdsList":[[2,3,4,5],[8],[10,11],[10,11,13],[2,3,4,5,15]],"referencedMap":[[6,1],[9,2],[12,3],[14,4],[16,5]],"exportedModulesMap":[],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":18,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":19,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":20,"extension":".d.ts"},"failedLookupLocations":[21,22]},{"resolvedModule":{"resolvedFileName":23,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":24,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[6,[1,2,3,4]],[16,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./src/filePresent.ts",
      "./src/fileNotFound.ts",
      "./src/externalThingNotPresent.ts",
      "./src/anotherFileReusingResolution.ts",
      "./src/externalThing.ts",
      "./src/types.ts",
      "./src/fileWithRef.ts",
      "./src/globalFilePresent.ts",
      "./src/globalFileNotFound.ts",
      "./src/globalAnotherFileWithSameReferenes.ts",
      "./src/globalNewFile.ts",
      "./src/globalMain.ts",
      "./src/newFile.ts",
      "./src/main.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 2069,
          "kind": "text"
        }
      ]
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 738,
          "kind": "text"
        }
      ]
    }
  },
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/filenotfound.ts",
      "./src/externalthing.d.ts",
      "./src/externalthingnotpresent.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/externalthing.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/newfile.ts",
      "./src/main.ts",
      "./node_modules/@types/sometype/index.d.ts",
      "./src/fileNotFound.ts",
      "./src/filePresent.ts",
      "./src/externalThing.d.ts",
      "./src/externalThing.ts",
      "./src/externalThing.tsx",
      "./src/externalThingNotPresent.ts",
      "./src/newFile.ts"
    ],
    "fileNamesList": [
      [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
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
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts",
        "./src/newfile.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }"
      },
      "./src/filenotfound.ts": {
        "version": "-497034637-export function something2() { return 20; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;"
      },
      "./src/externalthingnotpresent.ts": {
        "version": "5318862050-export function externalThing2() { return 20; }"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/externalthing.ts": {
        "version": "5618215488-export function externalThing1() { return 10; }"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalfilenotfound.ts": {
        "version": "-6310824062-function globalSomething2() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalnewfile.ts": {
        "version": "4916490342-function globalFoo() { return 20; }",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();",
        "affectsGlobalScope": true
      },
      "./src/newfile.ts": {
        "version": "4428918903-export function foo() { return 20; }"
      },
      "./src/main.ts": {
        "version": "6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "outFile": "./outFile.js",
      "persistResolutions": true,
      "traceResolution": true,
      "watch": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.ts",
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
        "./src/filenotfound.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "persistedResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.ts",
            "extension": ".ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./src/filePresent.ts",
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
      ],
      "names": [
        "./fileNotFound",
        "./filePresent",
        "externalThing",
        "externalThingNotPresent",
        "./newFile"
      ],
      "resolutionEntries": [
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
          "./filePresent",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
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
        ],
        [
          "./newFile",
          {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          }
        ]
      ],
      "resolutionMap": {
        "./src/anotherfilereusingresolution.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThingNotPresent.ts",
              "extension": ".ts"
            }
          }
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.ts",
              "extension": ".ts"
            }
          },
          "./filePresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/filePresent.ts",
              "extension": ".ts"
            }
          },
          "./newFile": {
            "resolvedModule": {
              "resolvedFileName": "./src/newFile.ts",
              "extension": ".ts"
            }
          },
          "externalThing": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThing.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/externalThing.ts",
              "./src/externalThing.tsx"
            ]
          },
          "externalThingNotPresent": {
            "resolvedModule": {
              "resolvedFileName": "./src/externalThingNotPresent.ts",
              "extension": ".ts"
            }
          }
        }
      }
    }
  },
  "version": "FakeTSVersion",
  "size": 4787
}

//// [/user/username/projects/myproject/outFile.js]
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/fileNotFound", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something2 = void 0;
    function something2() { return 20; }
    exports.something2 = something2;
});
define("src/externalThingNotPresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.externalThing2 = void 0;
    function externalThing2() { return 20; }
    exports.externalThing2 = externalThing2;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("src/externalThing", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.externalThing1 = void 0;
    function externalThing1() { return 10; }
    exports.externalThing1 = externalThing1;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
define("src/newFile", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    function foo() { return 20; }
    exports.foo = foo;
});
define("src/main", ["require", "exports", "src/filePresent"], function (require, exports, filePresent_1) {
    "use strict";
    exports.__esModule = true;
    filePresent_1.something();
});


//// [/user/username/projects/myproject/outFile.d.ts]
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/fileNotFound" {
    export function something2(): number;
}
declare module "src/externalThingNotPresent" {
    export function externalThing2(): number;
}
declare module "src/anotherFileReusingResolution" { }
declare module "src/externalThing" {
    export function externalThing1(): number;
}
interface SomeType {
}
declare function globalSomething(): number;
declare function globalSomething2(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/newFile" {
    export function foo(): number;
}
declare module "src/main" { }


//// [/user/username/projects/myproject/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /user/username/projects/myproject/outFile.js
----------------------------------------------------------------------
text: (0-2069)
define("src/filePresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});
define("src/fileNotFound", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something2 = void 0;
    function something2() { return 20; }
    exports.something2 = something2;
});
define("src/externalThingNotPresent", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.externalThing2 = void 0;
    function externalThing2() { return 20; }
    exports.externalThing2 = externalThing2;
});
define("src/anotherFileReusingResolution", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("src/externalThing", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.externalThing1 = void 0;
    function externalThing1() { return 10; }
    exports.externalThing1 = externalThing1;
});
/// <reference path="./types.ts"/>
function globalSomething() { return 10; }
function globalSomething2() { return 20; }
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }
function globalFoo() { return 20; }
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();
define("src/newFile", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    function foo() { return 20; }
    exports.foo = foo;
});
define("src/main", ["require", "exports", "src/filePresent"], function (require, exports, filePresent_1) {
    "use strict";
    exports.__esModule = true;
    filePresent_1.something();
});

======================================================================
======================================================================
File:: /user/username/projects/myproject/outFile.d.ts
----------------------------------------------------------------------
text: (0-738)
declare module "src/filePresent" {
    export function something(): number;
}
declare module "src/fileNotFound" {
    export function something2(): number;
}
declare module "src/externalThingNotPresent" {
    export function externalThing2(): number;
}
declare module "src/anotherFileReusingResolution" { }
declare module "src/externalThing" {
    export function externalThing1(): number;
}
interface SomeType {
}
declare function globalSomething(): number;
declare function globalSomething2(): number;
declare function globalAnotherFileWithSameReferenes(): void;
declare function globalFoo(): number;
declare function globalMain(): void;
declare module "src/newFile" {
    export function foo(): number;
}
declare module "src/main" { }

======================================================================


Change:: Delete .ts file that takes preference over resolved .d.ts file

Input::
//// [/user/username/projects/myproject/src/externalThing.ts] deleted

Output::
FileWatcher:: Triggered with /user/username/projects/myproject/src/externalThing.ts 2:: WatchInfo: /user/username/projects/myproject/src/externalThing.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/src/externalThing.ts 2:: WatchInfo: /user/username/projects/myproject/src/externalThing.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/externalThing.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/externalThing.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory /user/username/projects/myproject/tsconfig.json
[[90m12:03:00 AM[0m] File change detected. Starting incremental compilation...

FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/externalThing.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/externalThing.d.ts 250 undefined Source file /user/username/projects/myproject/tsconfig.json
[[90m12:03:01 AM[0m] Found 0 errors. Watching for file changes.



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
/user/username/projects/myproject/src/filenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/fileNotFound.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthingnotpresent.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThingNotPresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.d.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: Install another type and program is not created because its not listed file in tsconfig

Input::
//// [/user/username/projects/myproject/node_modules/@types/someType2/index.d.ts]
export function someType2(): number;


Output::

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
/user/username/projects/myproject/src/filenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/fileNotFound.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthingnotpresent.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThingNotPresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.d.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: Delete existing type and program is not created because its not listed file in tsconfig

Input::
//// [/user/username/projects/myproject/node_modules/@types/someType/index.d.ts] deleted

Output::

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
/user/username/projects/myproject/src/filenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/fileNotFound.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthingnotpresent.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThingNotPresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.d.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

