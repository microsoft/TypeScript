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

//// [/user/username/projects/myproject/src/filePresent.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something = void 0;
    function something() { return 10; }
    exports.something = something;
});


//// [/user/username/projects/myproject/src/filePresent.d.ts]
export declare function something(): number;


//// [/user/username/projects/myproject/src/anotherFileReusingResolution.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});


//// [/user/username/projects/myproject/src/anotherFileReusingResolution.d.ts]
export {};


//// [/user/username/projects/myproject/src/types.js]


//// [/user/username/projects/myproject/src/types.d.ts]
interface SomeType {
}


//// [/user/username/projects/myproject/src/fileWithRef.js]
/// <reference path="./types.ts"/>


//// [/user/username/projects/myproject/src/fileWithRef.d.ts]
/// <reference path="types.d.ts" />


//// [/user/username/projects/myproject/src/globalFilePresent.js]
function globalSomething() { return 10; }


//// [/user/username/projects/myproject/src/globalFilePresent.d.ts]
declare function globalSomething(): number;


//// [/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.js]
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }


//// [/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.d.ts]
/// <reference path="globalFilePresent.d.ts" />
declare function globalAnotherFileWithSameReferenes(): void;


//// [/user/username/projects/myproject/src/globalMain.js]
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }


//// [/user/username/projects/myproject/src/globalMain.d.ts]
/// <reference path="globalFilePresent.d.ts" />
declare function globalMain(): void;


//// [/user/username/projects/myproject/src/main.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});


//// [/user/username/projects/myproject/src/main.d.ts]
export {};


//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/globalfilenotfound.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"11598859296-export function something() { return 10; }","5686005290-export function externalThing1(): number;","-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",{"version":"-12575322908-interface SomeType {}","affectsGlobalScope":true},"-6085631553-/// <reference path=\"./types.ts\"/>",{"version":"-5627034801-function globalSomething() { return 10; }","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","affectsGlobalScope":true},{"version":"-12326309214-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\n","affectsGlobalScope":true},"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","module":2,"persistResolutions":true,"project":"./","traceResolution":true},"fileIdsList":[[2,3],[5],[7,12]],"referencedMap":[[4,1],[6,2],[8,3],[9,3],[10,1]],"exportedModulesMap":[[4,1],[6,2],[8,3],[9,3],[10,1]],"semanticDiagnosticsPerFile":[1,11,[4,[{"file":"./src/anotherfilereusingresolution.ts","start":70,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],3,2,6,8,7,9,[10,[{"file":"./src/main.ts","start":127,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/main.ts","start":224,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],5],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[13,14,15,16,17]},{"resolvedModule":{"resolvedFileName":18,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":19,"extension":".d.ts"},"failedLookupLocations":[20,21]},{"failedLookupLocations":[22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69]}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"resolutionMap":[[4,[1,2,3,4]],[10,[1,2,3,4]]]}},"version":"FakeTSVersion"}


/a/lib/tsc.js --p . -w --extendedDiagnostics
Output::
[[90m12:01:21 AM[0m] Starting compilation in watch mode...

Current directory: /user/username/projects/myproject CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/types.ts"]
  options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/anotherFileReusingResolution.ts 250 undefined Source file
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
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
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
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/filePresent.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/externalThing.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/fileWithRef.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/types.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/globalFilePresent.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/globalMain.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 250 undefined Source file
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/main.ts' found in cache from location '/user/username/projects/myproject/src', it was not resolved.
Reusing resolution of module 'externalThingNotPresent' from '/user/username/projects/myproject/src/main.ts' found in cache from location '/user/username/projects/myproject/src', it was not resolved.
======== Resolving type reference directive 'someType', containing file '/user/username/projects/myproject/__inferred type names__.ts', root directory '/user/username/projects/myproject/node_modules/@types'. ========
Resolving with primary search path '/user/username/projects/myproject/node_modules/@types'.
File '/user/username/projects/myproject/node_modules/@types/someType/package.json' does not exist.
File '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts', result '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts'.
======== Type reference directive 'someType' was successfully resolved to '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts', primary: true. ========
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types/someType/index.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 250 undefined Source file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 undefined Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/globalfilenotfound.ts 500 undefined Missing file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
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

[[90m12:01:25 AM[0m] Found 6 errors. Watching for file changes.

DirectoryWatcher:: Triggered with /user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt :: WatchInfo: /user/username/projects/myproject 0 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt :: WatchInfo: /user/username/projects/myproject 0 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory


Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
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

Semantic diagnostics in builder refreshed for::

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/src/anotherfilereusingresolution.ts:
  {"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","pollingInterval":250}
/user/username/projects/myproject/src/filepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/filePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.d.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filewithref.ts:
  {"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","pollingInterval":250}
/user/username/projects/myproject/src/types.ts:
  {"fileName":"/user/username/projects/myproject/src/types.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalanotherfilewithsamereferenes.ts:
  {"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalmain.ts:
  {"fileName":"/user/username/projects/myproject/src/globalMain.ts","pollingInterval":250}
/user/username/projects/myproject/src/main.ts:
  {"fileName":"/user/username/projects/myproject/src/main.ts","pollingInterval":250}
/user/username/projects/myproject/node_modules/@types/sometype/index.d.ts:
  {"fileName":"/user/username/projects/myproject/node_modules/@types/someType/index.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/globalfilenotfound.ts","pollingInterval":250}

FsWatches::
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules:
  {"directoryName":"/user/username/projects/myproject/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/globalfilenotfound.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"11598859296-export function something() { return 10; }","5686005290-export function externalThing1(): number;","-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",{"version":"-12575322908-interface SomeType {}","affectsGlobalScope":true},"-6085631553-/// <reference path=\"./types.ts\"/>",{"version":"-5627034801-function globalSomething() { return 10; }","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","affectsGlobalScope":true},{"version":"-12326309214-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\n","affectsGlobalScope":true},"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"persistResolutions":true,"project":"./","traceResolution":true,"watch":true},"fileIdsList":[[2,3],[5],[7,12]],"referencedMap":[[4,1],[6,2],[8,3],[9,3],[10,1]],"exportedModulesMap":[[4,1],[6,2],[8,3],[9,3],[10,1]],"semanticDiagnosticsPerFile":[1,11,[4,[{"file":"./src/anotherfilereusingresolution.ts","start":70,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],3,2,6,8,7,9,[10,[{"file":"./src/main.ts","start":127,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/main.ts","start":224,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],5],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[13,14,15,16,17]},{"resolvedModule":{"resolvedFileName":18,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":19,"extension":".d.ts"},"failedLookupLocations":[20,21]},{"failedLookupLocations":[22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69]}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"resolutionMap":[[4,[1,2,3,4]],[10,[1,2,3,4]]]}},"version":"FakeTSVersion"}

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
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./src/filepresent.ts": {
        "version": "11598859296-export function something() { return 10; }",
        "signature": "11598859296-export function something() { return 10; }"
      },
      "./src/externalthing.d.ts": {
        "version": "5686005290-export function externalThing1(): number;",
        "signature": "5686005290-export function externalThing1(): number;"
      },
      "./src/anotherfilereusingresolution.ts": {
        "version": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./src/types.ts": {
        "version": "-12575322908-interface SomeType {}",
        "signature": "-12575322908-interface SomeType {}",
        "affectsGlobalScope": true
      },
      "./src/filewithref.ts": {
        "version": "-6085631553-/// <reference path=\"./types.ts\"/>",
        "signature": "-6085631553-/// <reference path=\"./types.ts\"/>"
      },
      "./src/globalfilepresent.ts": {
        "version": "-5627034801-function globalSomething() { return 10; }",
        "signature": "-5627034801-function globalSomething() { return 10; }",
        "affectsGlobalScope": true
      },
      "./src/globalanotherfilewithsamereferenes.ts": {
        "version": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "signature": "-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n",
        "affectsGlobalScope": true
      },
      "./src/globalmain.ts": {
        "version": "-12326309214-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\n",
        "signature": "-12326309214-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\n",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";",
        "signature": "-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";"
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;",
        "signature": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "persistResolutions": true,
      "project": "./",
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
    "exportedModulesMap": {
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
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./node_modules/@types/sometype/index.d.ts",
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
  "size": 6454
}


Change:: Modify globalMain file

Input::
//// [/user/username/projects/myproject/src/globalMain.ts]
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();


Output::
FileWatcher:: Triggered with /user/username/projects/myproject/src/globalMain.ts 1:: WatchInfo: /user/username/projects/myproject/src/globalMain.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/src/globalMain.ts 1:: WatchInfo: /user/username/projects/myproject/src/globalMain.ts 250 undefined Source file
[[90m12:01:30 AM[0m] File change detected. Starting incremental compilation...

Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/types.ts"]
  options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
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

[[90m12:02:22 AM[0m] Found 6 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
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
/user/username/projects/myproject/node_modules/@types/someType/index.d.ts

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
/user/username/projects/myproject/node_modules/@types/someType/index.d.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/src/anotherfilereusingresolution.ts:
  {"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","pollingInterval":250}
/user/username/projects/myproject/src/filepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/filePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.d.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filewithref.ts:
  {"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","pollingInterval":250}
/user/username/projects/myproject/src/types.ts:
  {"fileName":"/user/username/projects/myproject/src/types.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalanotherfilewithsamereferenes.ts:
  {"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalmain.ts:
  {"fileName":"/user/username/projects/myproject/src/globalMain.ts","pollingInterval":250}
/user/username/projects/myproject/src/main.ts:
  {"fileName":"/user/username/projects/myproject/src/main.ts","pollingInterval":250}
/user/username/projects/myproject/node_modules/@types/sometype/index.d.ts:
  {"fileName":"/user/username/projects/myproject/node_modules/@types/someType/index.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/globalfilenotfound.ts","pollingInterval":250}

FsWatches::
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules:
  {"directoryName":"/user/username/projects/myproject/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/src/filePresent.js] file written with same contents
//// [/user/username/projects/myproject/src/filePresent.d.ts] file written with same contents
//// [/user/username/projects/myproject/src/anotherFileReusingResolution.js] file written with same contents
//// [/user/username/projects/myproject/src/anotherFileReusingResolution.d.ts] file written with same contents
//// [/user/username/projects/myproject/src/types.js] file written with same contents
//// [/user/username/projects/myproject/src/types.d.ts] file written with same contents
//// [/user/username/projects/myproject/src/fileWithRef.js] file written with same contents
//// [/user/username/projects/myproject/src/fileWithRef.d.ts] file written with same contents
//// [/user/username/projects/myproject/src/globalFilePresent.js] file written with same contents
//// [/user/username/projects/myproject/src/globalFilePresent.d.ts] file written with same contents
//// [/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.js] file written with same contents
//// [/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.d.ts] file written with same contents
//// [/user/username/projects/myproject/src/globalMain.js]
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();


//// [/user/username/projects/myproject/src/globalMain.d.ts] file written with same contents
//// [/user/username/projects/myproject/src/main.js] file written with same contents
//// [/user/username/projects/myproject/src/main.d.ts] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/globalfilenotfound.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-13601649692-export declare function something(): number;\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10760962856-interface SomeType {\n}\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-1928648610-/// <reference path=\"types.d.ts\" />\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-7731522637-declare function globalSomething(): number;\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-13665089706-/// <reference path=\"globalFilePresent.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"-5695225267-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();","signature":"-18175711127-/// <reference path=\"globalFilePresent.d.ts\" />\ndeclare function globalMain(): void;\n","affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"},"7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"persistResolutions":true,"project":"./","traceResolution":true,"watch":true},"fileIdsList":[[2,3],[5],[7,12]],"referencedMap":[[4,1],[6,2],[8,3],[9,3],[10,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,11,[4,[{"file":"./src/anotherfilereusingresolution.ts","start":70,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],3,2,6,8,7,9,[10,[{"file":"./src/main.ts","start":127,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/main.ts","start":224,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],5],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[13,14,15,16,17]},{"resolvedModule":{"resolvedFileName":18,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":19,"extension":".d.ts"},"failedLookupLocations":[20,21]},{"failedLookupLocations":[22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69]}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"resolutionMap":[[4,[1,2,3,4]],[10,[1,2,3,4]]]}},"version":"FakeTSVersion"}

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
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;",
        "signature": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "persistResolutions": true,
      "project": "./",
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
      "./node_modules/@types/sometype/index.d.ts",
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
  "size": 7090
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
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalNewFile.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalNewFile.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalNewFile.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalNewFile.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
FileWatcher:: Triggered with /user/username/projects/myproject/src/globalMain.ts 1:: WatchInfo: /user/username/projects/myproject/src/globalMain.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/src/globalMain.ts 1:: WatchInfo: /user/username/projects/myproject/src/globalMain.ts 250 undefined Source file
FileWatcher:: Triggered with /user/username/projects/myproject/src/globalMain.ts 1:: WatchInfo: /user/username/projects/myproject/src/globalMain.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/src/globalMain.ts 1:: WatchInfo: /user/username/projects/myproject/src/globalMain.ts 250 undefined Source file
[[90m12:02:32 AM[0m] File change detected. Starting incremental compilation...

Reloading new file names and options
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/types.ts"]
  options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was not resolved.
Reusing resolution of module 'externalThingNotPresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was not resolved.
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/globalNewFile.ts 250 undefined Source file
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/main.ts' of old program, it was not resolved.
Reusing resolution of module 'externalThingNotPresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was not resolved.
Reusing resolution of type reference directive 'someType' from '/user/username/projects/myproject/__inferred type names__.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts'.
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalNewFile.js :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalNewFile.js :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalNewFile.js :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
Project: /user/username/projects/myproject/tsconfig.json Detected file add/remove of non supported extension: /user/username/projects/myproject/src/globalNewFile.js
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalNewFile.js :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalNewFile.d.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalNewFile.d.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalNewFile.d.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
Project: /user/username/projects/myproject/tsconfig.json Detected output file: /user/username/projects/myproject/src/globalNewFile.d.ts
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalNewFile.d.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
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

[[90m12:03:28 AM[0m] Found 6 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
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
/user/username/projects/myproject/node_modules/@types/someType/index.d.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/src/anotherfilereusingresolution.ts:
  {"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","pollingInterval":250}
/user/username/projects/myproject/src/filepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/filePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.d.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filewithref.ts:
  {"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","pollingInterval":250}
/user/username/projects/myproject/src/types.ts:
  {"fileName":"/user/username/projects/myproject/src/types.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalanotherfilewithsamereferenes.ts:
  {"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalmain.ts:
  {"fileName":"/user/username/projects/myproject/src/globalMain.ts","pollingInterval":250}
/user/username/projects/myproject/src/main.ts:
  {"fileName":"/user/username/projects/myproject/src/main.ts","pollingInterval":250}
/user/username/projects/myproject/node_modules/@types/sometype/index.d.ts:
  {"fileName":"/user/username/projects/myproject/node_modules/@types/someType/index.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/globalfilenotfound.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalnewfile.ts:
  {"fileName":"/user/username/projects/myproject/src/globalNewFile.ts","pollingInterval":250}

FsWatches::
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules:
  {"directoryName":"/user/username/projects/myproject/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/src/filePresent.js] file written with same contents
//// [/user/username/projects/myproject/src/filePresent.d.ts] file written with same contents
//// [/user/username/projects/myproject/src/anotherFileReusingResolution.js] file written with same contents
//// [/user/username/projects/myproject/src/anotherFileReusingResolution.d.ts] file written with same contents
//// [/user/username/projects/myproject/src/types.js] file written with same contents
//// [/user/username/projects/myproject/src/types.d.ts] file written with same contents
//// [/user/username/projects/myproject/src/fileWithRef.js] file written with same contents
//// [/user/username/projects/myproject/src/fileWithRef.d.ts] file written with same contents
//// [/user/username/projects/myproject/src/globalFilePresent.js] file written with same contents
//// [/user/username/projects/myproject/src/globalFilePresent.d.ts] file written with same contents
//// [/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.js] file written with same contents
//// [/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.d.ts] file written with same contents
//// [/user/username/projects/myproject/src/globalMain.js]
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();


//// [/user/username/projects/myproject/src/globalMain.d.ts]
/// <reference path="globalNewFile.d.ts" />
/// <reference path="globalFilePresent.d.ts" />
declare function globalMain(): void;


//// [/user/username/projects/myproject/src/main.js] file written with same contents
//// [/user/username/projects/myproject/src/main.d.ts] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/globalfilenotfound.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-13601649692-export declare function something(): number;\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10760962856-interface SomeType {\n}\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-1928648610-/// <reference path=\"types.d.ts\" />\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-7731522637-declare function globalSomething(): number;\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-13665089706-/// <reference path=\"globalFilePresent.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4030514825-declare function globalFoo(): number;\n","affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":"6306495272-/// <reference path=\"globalNewFile.d.ts\" />\n/// <reference path=\"globalFilePresent.d.ts\" />\ndeclare function globalMain(): void;\n","affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"},"7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"persistResolutions":true,"project":"./","traceResolution":true,"watch":true},"fileIdsList":[[2,3],[5],[7,13],[7,9,13]],"referencedMap":[[4,1],[6,2],[8,3],[10,4],[11,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,12,[4,[{"file":"./src/anotherfilereusingresolution.ts","start":70,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],3,2,6,8,7,10,9,[11,[{"file":"./src/main.ts","start":127,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/main.ts","start":224,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],5],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[14,15,16,17,18]},{"resolvedModule":{"resolvedFileName":19,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":20,"extension":".d.ts"},"failedLookupLocations":[21,22]},{"failedLookupLocations":[23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70]}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"resolutionMap":[[4,[1,2,3,4]],[11,[1,2,3,4]]]}},"version":"FakeTSVersion"}

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
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;",
        "signature": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "persistResolutions": true,
      "project": "./",
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
      "./node_modules/@types/sometype/index.d.ts",
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
  "size": 7383
}

//// [/user/username/projects/myproject/src/globalNewFile.js]
function globalFoo() { return 20; }


//// [/user/username/projects/myproject/src/globalNewFile.d.ts]
declare function globalFoo(): number;



Change:: Write file that could not be resolved by referenced path

Input::
//// [/user/username/projects/myproject/src/globalFileNotFound.ts]
function globalSomething2() { return 20; }


Output::
FileWatcher:: Triggered with /user/username/projects/myproject/src/globalFileNotFound.ts 0:: WatchInfo: /user/username/projects/myproject/src/globalfilenotfound.ts 500 undefined Missing file
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/globalfilenotfound.ts 500 undefined Missing file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/src/globalFileNotFound.ts 0:: WatchInfo: /user/username/projects/myproject/src/globalfilenotfound.ts 500 undefined Missing file
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalFileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalFileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalFileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalFileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
[[90m12:03:34 AM[0m] File change detected. Starting incremental compilation...

Reloading new file names and options
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/types.ts"]
  options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was not resolved.
Reusing resolution of module 'externalThingNotPresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was not resolved.
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/globalFileNotFound.ts 250 undefined Source file
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/main.ts' of old program, it was not resolved.
Reusing resolution of module 'externalThingNotPresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was not resolved.
Reusing resolution of type reference directive 'someType' from '/user/username/projects/myproject/__inferred type names__.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts'.
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalFileNotFound.js :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalFileNotFound.js :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalFileNotFound.js :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
Project: /user/username/projects/myproject/tsconfig.json Detected file add/remove of non supported extension: /user/username/projects/myproject/src/globalFileNotFound.js
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalFileNotFound.js :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalFileNotFound.d.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalFileNotFound.d.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalFileNotFound.d.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
Project: /user/username/projects/myproject/tsconfig.json Detected output file: /user/username/projects/myproject/src/globalFileNotFound.d.ts
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalFileNotFound.d.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
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

[[90m12:04:36 AM[0m] Found 4 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
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
/user/username/projects/myproject/node_modules/@types/someType/index.d.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/src/anotherfilereusingresolution.ts:
  {"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","pollingInterval":250}
/user/username/projects/myproject/src/filepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/filePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.d.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filewithref.ts:
  {"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","pollingInterval":250}
/user/username/projects/myproject/src/types.ts:
  {"fileName":"/user/username/projects/myproject/src/types.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalanotherfilewithsamereferenes.ts:
  {"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalmain.ts:
  {"fileName":"/user/username/projects/myproject/src/globalMain.ts","pollingInterval":250}
/user/username/projects/myproject/src/main.ts:
  {"fileName":"/user/username/projects/myproject/src/main.ts","pollingInterval":250}
/user/username/projects/myproject/node_modules/@types/sometype/index.d.ts:
  {"fileName":"/user/username/projects/myproject/node_modules/@types/someType/index.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalnewfile.ts:
  {"fileName":"/user/username/projects/myproject/src/globalNewFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFileNotFound.ts","pollingInterval":250}

FsWatches::
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules:
  {"directoryName":"/user/username/projects/myproject/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/src/filePresent.js] file written with same contents
//// [/user/username/projects/myproject/src/filePresent.d.ts] file written with same contents
//// [/user/username/projects/myproject/src/anotherFileReusingResolution.js] file written with same contents
//// [/user/username/projects/myproject/src/anotherFileReusingResolution.d.ts] file written with same contents
//// [/user/username/projects/myproject/src/types.js] file written with same contents
//// [/user/username/projects/myproject/src/types.d.ts] file written with same contents
//// [/user/username/projects/myproject/src/fileWithRef.js] file written with same contents
//// [/user/username/projects/myproject/src/fileWithRef.d.ts] file written with same contents
//// [/user/username/projects/myproject/src/globalFilePresent.js] file written with same contents
//// [/user/username/projects/myproject/src/globalFilePresent.d.ts] file written with same contents
//// [/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.js] file written with same contents
//// [/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.d.ts]
/// <reference path="globalFilePresent.d.ts" />
/// <reference path="globalFileNotFound.d.ts" />
declare function globalAnotherFileWithSameReferenes(): void;


//// [/user/username/projects/myproject/src/globalMain.js] file written with same contents
//// [/user/username/projects/myproject/src/globalMain.d.ts]
/// <reference path="globalNewFile.d.ts" />
/// <reference path="globalFilePresent.d.ts" />
/// <reference path="globalFileNotFound.d.ts" />
declare function globalMain(): void;


//// [/user/username/projects/myproject/src/main.js] file written with same contents
//// [/user/username/projects/myproject/src/main.d.ts] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-13601649692-export declare function something(): number;\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10760962856-interface SomeType {\n}\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-1928648610-/// <reference path=\"types.d.ts\" />\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-7731522637-declare function globalSomething(): number;\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-5961586139-declare function globalSomething2(): number;\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-17196641480-/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4030514825-declare function globalFoo(): number;\n","affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":"-15417052438-/// <reference path=\"globalNewFile.d.ts\" />\n/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalMain(): void;\n","affectsGlobalScope":true},{"version":"-25594406519-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"},"7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"persistResolutions":true,"project":"./","traceResolution":true,"watch":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[12,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,13,[4,[{"file":"./src/anotherfilereusingresolution.ts","start":70,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],3,2,6,9,8,7,11,10,[12,[{"file":"./src/main.ts","start":127,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/main.ts","start":224,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],5],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[14,15,16,17,18]},{"resolvedModule":{"resolvedFileName":19,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":20,"extension":".d.ts"},"failedLookupLocations":[21,22]},{"failedLookupLocations":[23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70]}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"resolutionMap":[[4,[1,2,3,4]],[12,[1,2,3,4]]]}},"version":"FakeTSVersion"}

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
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;",
        "signature": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "persistResolutions": true,
      "project": "./",
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
      "./node_modules/@types/sometype/index.d.ts",
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
  "size": 7659
}

//// [/user/username/projects/myproject/src/globalNewFile.js] file written with same contents
//// [/user/username/projects/myproject/src/globalNewFile.d.ts] file written with same contents
//// [/user/username/projects/myproject/src/globalFileNotFound.js]
function globalSomething2() { return 20; }


//// [/user/username/projects/myproject/src/globalFileNotFound.d.ts]
declare function globalSomething2(): number;



Change:: Modify main file

Input::
//// [/user/username/projects/myproject/src/main.ts]
import { something } from "./filePresent";
import { something as something1 } from "./filePresent";
import { something2 } from "./fileNotFound";
import { externalThing1 } from "externalThing";
import { externalThing2 } from "externalThingNotPresent";something();


Output::
FileWatcher:: Triggered with /user/username/projects/myproject/src/main.ts 1:: WatchInfo: /user/username/projects/myproject/src/main.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/src/main.ts 1:: WatchInfo: /user/username/projects/myproject/src/main.ts 250 undefined Source file
[[90m12:04:42 AM[0m] File change detected. Starting incremental compilation...

Reloading new file names and options
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/types.ts"]
  options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/main.ts' of old program, it was not resolved.
Reusing resolution of module 'externalThingNotPresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was not resolved.
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

[[90m12:04:52 AM[0m] Found 4 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
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
/user/username/projects/myproject/node_modules/@types/someType/index.d.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/src/main.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/src/anotherfilereusingresolution.ts:
  {"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","pollingInterval":250}
/user/username/projects/myproject/src/filepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/filePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.d.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filewithref.ts:
  {"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","pollingInterval":250}
/user/username/projects/myproject/src/types.ts:
  {"fileName":"/user/username/projects/myproject/src/types.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalanotherfilewithsamereferenes.ts:
  {"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalmain.ts:
  {"fileName":"/user/username/projects/myproject/src/globalMain.ts","pollingInterval":250}
/user/username/projects/myproject/src/main.ts:
  {"fileName":"/user/username/projects/myproject/src/main.ts","pollingInterval":250}
/user/username/projects/myproject/node_modules/@types/sometype/index.d.ts:
  {"fileName":"/user/username/projects/myproject/node_modules/@types/someType/index.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalnewfile.ts:
  {"fileName":"/user/username/projects/myproject/src/globalNewFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFileNotFound.ts","pollingInterval":250}

FsWatches::
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules:
  {"directoryName":"/user/username/projects/myproject/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/src/main.js]
define(["require", "exports", "./filePresent"], function (require, exports, filePresent_1) {
    "use strict";
    exports.__esModule = true;
    filePresent_1.something();
});


//// [/user/username/projects/myproject/src/main.d.ts] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-13601649692-export declare function something(): number;\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10760962856-interface SomeType {\n}\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-1928648610-/// <reference path=\"types.d.ts\" />\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-7731522637-declare function globalSomething(): number;\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-5961586139-declare function globalSomething2(): number;\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-17196641480-/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4030514825-declare function globalFoo(): number;\n","affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":"-15417052438-/// <reference path=\"globalNewFile.d.ts\" />\n/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalMain(): void;\n","affectsGlobalScope":true},{"version":"-22898386493-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":"-3531856636-export {};\n"},"7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"persistResolutions":true,"project":"./","traceResolution":true,"watch":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[12,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,13,[4,[{"file":"./src/anotherfilereusingresolution.ts","start":70,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],3,2,6,9,8,7,11,10,[12,[{"file":"./src/main.ts","start":127,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/main.ts","start":224,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],5],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[14,15,16,17,18]},{"resolvedModule":{"resolvedFileName":19,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":20,"extension":".d.ts"},"failedLookupLocations":[21,22]},{"failedLookupLocations":[23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70]}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4]],"resolutionMap":[[4,[1,2,3,4]],[12,[1,2,3,4]]]}},"version":"FakeTSVersion"}

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
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;",
        "signature": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "persistResolutions": true,
      "project": "./",
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
      "./node_modules/@types/sometype/index.d.ts",
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
  "size": 7671
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
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/newFile.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/newFile.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/newFile.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/newFile.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
FileWatcher:: Triggered with /user/username/projects/myproject/src/main.ts 1:: WatchInfo: /user/username/projects/myproject/src/main.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/src/main.ts 1:: WatchInfo: /user/username/projects/myproject/src/main.ts 250 undefined Source file
[[90m12:05:00 AM[0m] File change detected. Starting incremental compilation...

Reloading new file names and options
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
  options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was not resolved.
Reusing resolution of module 'externalThingNotPresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was not resolved.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
======== Resolving module './newFile' from '/user/username/projects/myproject/src/main.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/user/username/projects/myproject/src/newFile.ts' exist - use it as a name resolution result.
======== Module name './newFile' was successfully resolved to '/user/username/projects/myproject/src/newFile.ts'. ========
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/main.ts' of old program, it was not resolved.
Reusing resolution of module 'externalThingNotPresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was not resolved.
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/newFile.ts 250 undefined Source file
Reusing resolution of type reference directive 'someType' from '/user/username/projects/myproject/__inferred type names__.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts'.
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/newFile.js :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/newFile.js :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/newFile.js :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
Project: /user/username/projects/myproject/tsconfig.json Detected file add/remove of non supported extension: /user/username/projects/myproject/src/newFile.js
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/newFile.js :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/newFile.d.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/newFile.d.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/newFile.d.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
Project: /user/username/projects/myproject/tsconfig.json Detected output file: /user/username/projects/myproject/src/newFile.d.ts
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/newFile.d.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
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

[[90m12:05:14 AM[0m] Found 4 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
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

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/src/newFile.ts
/user/username/projects/myproject/src/main.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/src/anotherfilereusingresolution.ts:
  {"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","pollingInterval":250}
/user/username/projects/myproject/src/filepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/filePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.d.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filewithref.ts:
  {"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","pollingInterval":250}
/user/username/projects/myproject/src/types.ts:
  {"fileName":"/user/username/projects/myproject/src/types.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalanotherfilewithsamereferenes.ts:
  {"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalmain.ts:
  {"fileName":"/user/username/projects/myproject/src/globalMain.ts","pollingInterval":250}
/user/username/projects/myproject/src/main.ts:
  {"fileName":"/user/username/projects/myproject/src/main.ts","pollingInterval":250}
/user/username/projects/myproject/node_modules/@types/sometype/index.d.ts:
  {"fileName":"/user/username/projects/myproject/node_modules/@types/someType/index.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalnewfile.ts:
  {"fileName":"/user/username/projects/myproject/src/globalNewFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFileNotFound.ts","pollingInterval":250}
/user/username/projects/myproject/src/newfile.ts:
  {"fileName":"/user/username/projects/myproject/src/newFile.ts","pollingInterval":250}

FsWatches::
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules:
  {"directoryName":"/user/username/projects/myproject/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/src/main.js] file written with same contents
//// [/user/username/projects/myproject/src/main.d.ts] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/fileNotFound.d.ts","./src/fileNotFound.js","./src/fileNotFound.jsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx","./src/newFile.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-13601649692-export declare function something(): number;\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10760962856-interface SomeType {\n}\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-1928648610-/// <reference path=\"types.d.ts\" />\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-7731522637-declare function globalSomething(): number;\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-5961586139-declare function globalSomething2(): number;\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-17196641480-/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4030514825-declare function globalFoo(): number;\n","affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":"-15417052438-/// <reference path=\"globalNewFile.d.ts\" />\n/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalMain(): void;\n","affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":"-4788605446-export declare function foo(): number;\n"},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":"-3531856636-export {};\n"},"7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"persistResolutions":true,"project":"./","traceResolution":true,"watch":true},"fileIdsList":[[2,3],[5],[7,8],[7,8,10],[2,3,12]],"referencedMap":[[4,1],[6,2],[9,3],[11,4],[13,5]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,14,[4,[{"file":"./src/anotherfilereusingresolution.ts","start":70,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],3,2,6,9,8,7,11,10,[13,[{"file":"./src/main.ts","start":159,"length":16,"messageText":"Cannot find module './fileNotFound'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792},{"file":"./src/main.ts","start":256,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],12,5],"persistedResolutions":{"resolutions":[{"failedLookupLocations":[15,16,17,18,19]},{"resolvedModule":{"resolvedFileName":20,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":21,"extension":".d.ts"},"failedLookupLocations":[22,23]},{"failedLookupLocations":[24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71]},{"resolvedModule":{"resolvedFileName":72,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[4,[1,2,3,4]],[13,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

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
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;",
        "signature": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "persistResolutions": true,
      "project": "./",
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
      "./node_modules/@types/sometype/index.d.ts",
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
  "size": 7963
}

//// [/user/username/projects/myproject/src/newFile.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo = void 0;
    function foo() { return 20; }
    exports.foo = foo;
});


//// [/user/username/projects/myproject/src/newFile.d.ts]
export declare function foo(): number;



Change:: Write file that could not be resolved

Input::
//// [/user/username/projects/myproject/src/fileNotFound.ts]
export function something2() { return 20; }


Output::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
Scheduling update
[[90m12:05:20 AM[0m] File change detected. Starting incremental compilation...

Reloading new file names and options
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/fileNotFound.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
  options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
======== Resolving module './filePresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/user/username/projects/myproject/src/filePresent.ts' exist - use it as a name resolution result.
======== Module name './filePresent' was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'. ========
======== Resolving module './fileNotFound' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/user/username/projects/myproject/src/fileNotFound.ts' exist - use it as a name resolution result.
======== Module name './fileNotFound' was successfully resolved to '/user/username/projects/myproject/src/fileNotFound.ts'. ========
======== Resolving module 'externalThing' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/user/username/projects/myproject/src/externalThing.ts' does not exist.
File '/user/username/projects/myproject/src/externalThing.tsx' does not exist.
File '/user/username/projects/myproject/src/externalThing.d.ts' exist - use it as a name resolution result.
======== Module name 'externalThing' was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'. ========
Reusing resolution of module 'externalThingNotPresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was not resolved.
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/fileNotFound.ts 250 undefined Source file
Reusing resolution of module './newFile' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/newFile.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' found in cache from location '/user/username/projects/myproject/src', it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/main.ts' found in cache from location '/user/username/projects/myproject/src', it was successfully resolved to '/user/username/projects/myproject/src/fileNotFound.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/main.ts' found in cache from location '/user/username/projects/myproject/src', it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
Reusing resolution of module 'externalThingNotPresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was not resolved.
Reusing resolution of type reference directive 'someType' from '/user/username/projects/myproject/__inferred type names__.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts'.
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.js :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.js :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.js :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
Project: /user/username/projects/myproject/tsconfig.json Detected file add/remove of non supported extension: /user/username/projects/myproject/src/fileNotFound.js
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.js :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.d.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.d.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.d.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
Project: /user/username/projects/myproject/tsconfig.json Detected output file: /user/username/projects/myproject/src/fileNotFound.d.ts
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.d.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
[96msrc/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";something();
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[[90m12:05:40 AM[0m] Found 2 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/fileNotFound.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
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

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/src/fileNotFound.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/main.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/src/anotherfilereusingresolution.ts:
  {"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","pollingInterval":250}
/user/username/projects/myproject/src/filepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/filePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.d.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filewithref.ts:
  {"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","pollingInterval":250}
/user/username/projects/myproject/src/types.ts:
  {"fileName":"/user/username/projects/myproject/src/types.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalanotherfilewithsamereferenes.ts:
  {"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalmain.ts:
  {"fileName":"/user/username/projects/myproject/src/globalMain.ts","pollingInterval":250}
/user/username/projects/myproject/src/main.ts:
  {"fileName":"/user/username/projects/myproject/src/main.ts","pollingInterval":250}
/user/username/projects/myproject/node_modules/@types/sometype/index.d.ts:
  {"fileName":"/user/username/projects/myproject/node_modules/@types/someType/index.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalnewfile.ts:
  {"fileName":"/user/username/projects/myproject/src/globalNewFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFileNotFound.ts","pollingInterval":250}
/user/username/projects/myproject/src/newfile.ts:
  {"fileName":"/user/username/projects/myproject/src/newFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/filenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/fileNotFound.ts","pollingInterval":250}

FsWatches::
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules:
  {"directoryName":"/user/username/projects/myproject/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/src/anotherFileReusingResolution.js] file written with same contents
//// [/user/username/projects/myproject/src/anotherFileReusingResolution.d.ts] file written with same contents
//// [/user/username/projects/myproject/src/main.js] file written with same contents
//// [/user/username/projects/myproject/src/main.d.ts] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.ts","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx","./src/newFile.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-13601649692-export declare function something(): number;\n"},{"version":"-497034637-export function something2() { return 20; }","signature":"-14992185226-export declare function something2(): number;\n"},"5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10760962856-interface SomeType {\n}\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-1928648610-/// <reference path=\"types.d.ts\" />\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-7731522637-declare function globalSomething(): number;\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-5961586139-declare function globalSomething2(): number;\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-17196641480-/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4030514825-declare function globalFoo(): number;\n","affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":"-15417052438-/// <reference path=\"globalNewFile.d.ts\" />\n/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalMain(): void;\n","affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":"-4788605446-export declare function foo(): number;\n"},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":"-3531856636-export {};\n"},"7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"persistResolutions":true,"project":"./","traceResolution":true,"watch":true},"fileIdsList":[[2,3,4],[6],[8,9],[8,9,11],[2,3,4,13]],"referencedMap":[[5,1],[7,2],[10,3],[12,4],[14,5]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,15,[5,[{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],4,3,2,7,10,9,8,12,11,[14,[{"file":"./src/main.ts","start":256,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],13,6],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":16,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":17,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":18,"extension":".d.ts"},"failedLookupLocations":[19,20]},{"failedLookupLocations":[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68]},{"resolvedModule":{"resolvedFileName":69,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[5,[1,2,3,4]],[14,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

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
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;",
        "signature": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "persistResolutions": true,
      "project": "./",
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
      "./node_modules/@types/sometype/index.d.ts",
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
  "size": 7576
}

//// [/user/username/projects/myproject/src/fileNotFound.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.something2 = void 0;
    function something2() { return 20; }
    exports.something2 = something2;
});


//// [/user/username/projects/myproject/src/fileNotFound.d.ts]
export declare function something2(): number;



Change:: Delete file that could not be resolved

Input::
//// [/user/username/projects/myproject/src/fileNotFound.ts] deleted

Output::
FileWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts 2:: WatchInfo: /user/username/projects/myproject/src/fileNotFound.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts 2:: WatchInfo: /user/username/projects/myproject/src/fileNotFound.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
[[90m12:05:45 AM[0m] File change detected. Starting incremental compilation...

Reloading new file names and options
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/fileNotFound.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
  options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
======== Resolving module './fileNotFound' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/user/username/projects/myproject/src/fileNotFound.ts' does not exist.
File '/user/username/projects/myproject/src/fileNotFound.tsx' does not exist.
File '/user/username/projects/myproject/src/fileNotFound.d.ts' exist - use it as a name resolution result.
======== Module name './fileNotFound' was successfully resolved to '/user/username/projects/myproject/src/fileNotFound.d.ts'. ========
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
Reusing resolution of module 'externalThingNotPresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was not resolved.
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/fileNotFound.d.ts 250 undefined Source file
Reusing resolution of module './newFile' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/newFile.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/main.ts' found in cache from location '/user/username/projects/myproject/src', it was successfully resolved to '/user/username/projects/myproject/src/fileNotFound.d.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
Reusing resolution of module 'externalThingNotPresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was not resolved.
Reusing resolution of type reference directive 'someType' from '/user/username/projects/myproject/__inferred type names__.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts'.
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/fileNotFound.ts 250 undefined Source file
[96msrc/anotherFileReusingResolution.ts[0m:[93m4[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m4[0m import { externalThing2 } from "externalThingNotPresent";
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msrc/main.ts[0m:[93m5[0m:[93m32[0m - [91merror[0m[90m TS2792: [0mCannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m5[0m import { externalThing2 } from "externalThingNotPresent";something();
[7m [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[[90m12:06:01 AM[0m] Found 2 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/fileNotFound.d.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/filePresent.ts
/user/username/projects/myproject/src/fileNotFound.d.ts
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

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/src/fileNotFound.d.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/main.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/src/anotherfilereusingresolution.ts:
  {"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","pollingInterval":250}
/user/username/projects/myproject/src/filepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/filePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.d.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filewithref.ts:
  {"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","pollingInterval":250}
/user/username/projects/myproject/src/types.ts:
  {"fileName":"/user/username/projects/myproject/src/types.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalanotherfilewithsamereferenes.ts:
  {"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalmain.ts:
  {"fileName":"/user/username/projects/myproject/src/globalMain.ts","pollingInterval":250}
/user/username/projects/myproject/src/main.ts:
  {"fileName":"/user/username/projects/myproject/src/main.ts","pollingInterval":250}
/user/username/projects/myproject/node_modules/@types/sometype/index.d.ts:
  {"fileName":"/user/username/projects/myproject/node_modules/@types/someType/index.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalnewfile.ts:
  {"fileName":"/user/username/projects/myproject/src/globalNewFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFileNotFound.ts","pollingInterval":250}
/user/username/projects/myproject/src/newfile.ts:
  {"fileName":"/user/username/projects/myproject/src/newFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/filenotfound.d.ts:
  {"fileName":"/user/username/projects/myproject/src/fileNotFound.d.ts","pollingInterval":250}

FsWatches::
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules:
  {"directoryName":"/user/username/projects/myproject/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/src/anotherFileReusingResolution.js] file written with same contents
//// [/user/username/projects/myproject/src/anotherFileReusingResolution.d.ts] file written with same contents
//// [/user/username/projects/myproject/src/main.js] file written with same contents
//// [/user/username/projects/myproject/src/main.d.ts] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.d.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.d.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx","./src/newFile.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-13601649692-export declare function something(): number;\n"},"-14992185226-export declare function something2(): number;\n","5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10760962856-interface SomeType {\n}\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-1928648610-/// <reference path=\"types.d.ts\" />\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-7731522637-declare function globalSomething(): number;\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-5961586139-declare function globalSomething2(): number;\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-17196641480-/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4030514825-declare function globalFoo(): number;\n","affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":"-15417052438-/// <reference path=\"globalNewFile.d.ts\" />\n/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalMain(): void;\n","affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":"-4788605446-export declare function foo(): number;\n"},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":"-3531856636-export {};\n"},"7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"persistResolutions":true,"project":"./","traceResolution":true,"watch":true},"fileIdsList":[[2,3,4],[6],[8,9],[8,9,11],[2,3,4,13]],"referencedMap":[[5,1],[7,2],[10,3],[12,4],[14,5]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,15,[5,[{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],4,3,2,7,10,9,8,12,11,[14,[{"file":"./src/main.ts","start":256,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],13,6],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":16,"extension":".d.ts"},"failedLookupLocations":[17,18]},{"resolvedModule":{"resolvedFileName":19,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":20,"extension":".d.ts"},"failedLookupLocations":[21,22]},{"failedLookupLocations":[23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70]},{"resolvedModule":{"resolvedFileName":71,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[5,[1,2,3,4]],[14,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/filenotfound.d.ts",
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
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
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
        "./src/filenotfound.d.ts",
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
        "./src/filenotfound.d.ts",
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
      "./src/filenotfound.d.ts": {
        "version": "-14992185226-export declare function something2(): number;\n",
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
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;",
        "signature": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "persistResolutions": true,
      "project": "./",
      "traceResolution": true,
      "watch": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.d.ts",
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
        "./src/filenotfound.d.ts",
        "./src/externalthing.d.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./node_modules/@types/sometype/index.d.ts",
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
      "./src/filenotfound.d.ts",
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
    "persistedResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/fileNotFound.ts",
            "./src/fileNotFound.tsx"
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
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx"
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
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx"
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
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx"
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
  "size": 7582
}


Change:: Write file that could not be resolved

Input::
//// [/user/username/projects/myproject/src/fileNotFound.ts]
export function something2() { return 20; }


Output::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
[[90m12:06:07 AM[0m] File change detected. Starting incremental compilation...

Reloading new file names and options
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/fileNotFound.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
  options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/fileNotFound.d.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
Reusing resolution of module 'externalThingNotPresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was not resolved.
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/fileNotFound.ts 250 undefined Source file
Reusing resolution of module './newFile' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/newFile.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/fileNotFound.d.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
Reusing resolution of module 'externalThingNotPresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was not resolved.
Reusing resolution of type reference directive 'someType' from '/user/username/projects/myproject/__inferred type names__.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts'.
[91merror[0m[90m TS5055: [0mCannot write file '/user/username/projects/myproject/src/fileNotFound.d.ts' because it would overwrite input file.

[[90m12:06:14 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/fileNotFound.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/filePresent.ts
/user/username/projects/myproject/src/fileNotFound.d.ts
/user/username/projects/myproject/src/externalThing.d.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/fileNotFound.ts
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

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/src/fileNotFound.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/src/anotherfilereusingresolution.ts:
  {"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","pollingInterval":250}
/user/username/projects/myproject/src/filepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/filePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.d.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filewithref.ts:
  {"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","pollingInterval":250}
/user/username/projects/myproject/src/types.ts:
  {"fileName":"/user/username/projects/myproject/src/types.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalanotherfilewithsamereferenes.ts:
  {"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalmain.ts:
  {"fileName":"/user/username/projects/myproject/src/globalMain.ts","pollingInterval":250}
/user/username/projects/myproject/src/main.ts:
  {"fileName":"/user/username/projects/myproject/src/main.ts","pollingInterval":250}
/user/username/projects/myproject/node_modules/@types/sometype/index.d.ts:
  {"fileName":"/user/username/projects/myproject/node_modules/@types/someType/index.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalnewfile.ts:
  {"fileName":"/user/username/projects/myproject/src/globalNewFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFileNotFound.ts","pollingInterval":250}
/user/username/projects/myproject/src/newfile.ts:
  {"fileName":"/user/username/projects/myproject/src/newFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/filenotfound.d.ts:
  {"fileName":"/user/username/projects/myproject/src/fileNotFound.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/fileNotFound.ts","pollingInterval":250}

FsWatches::
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules:
  {"directoryName":"/user/username/projects/myproject/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.d.ts","./src/externalthing.d.ts","./src/anotherfilereusingresolution.ts","./src/filenotfound.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.d.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/externalThingNotPresent.tsx","./src/externalThingNotPresent.d.ts","./externalThingNotPresent.ts","./externalThingNotPresent.tsx","./externalThingNotPresent.d.ts","../externalThingNotPresent.ts","../externalThingNotPresent.tsx","../externalThingNotPresent.d.ts","../../externalThingNotPresent.ts","../../externalThingNotPresent.tsx","../../externalThingNotPresent.d.ts","../../../externalThingNotPresent.ts","../../../externalThingNotPresent.tsx","../../../externalThingNotPresent.d.ts","../../../../externalThingNotPresent.ts","../../../../externalThingNotPresent.tsx","../../../../externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/package.json","./src/node_modules/@types/externalThingNotPresent.d.ts","./src/node_modules/@types/externalThingNotPresent/index.d.ts","./node_modules/@types/externalThingNotPresent/package.json","./node_modules/@types/externalThingNotPresent.d.ts","./node_modules/@types/externalThingNotPresent/index.d.ts","../node_modules/@types/externalThingNotPresent/package.json","../node_modules/@types/externalThingNotPresent.d.ts","../node_modules/@types/externalThingNotPresent/index.d.ts","../../node_modules/@types/externalThingNotPresent/package.json","../../node_modules/@types/externalThingNotPresent.d.ts","../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../node_modules/@types/externalThingNotPresent/package.json","../../../node_modules/@types/externalThingNotPresent.d.ts","../../../node_modules/@types/externalThingNotPresent/index.d.ts","../../../../node_modules/@types/externalThingNotPresent/package.json","../../../../node_modules/@types/externalThingNotPresent.d.ts","../../../../node_modules/@types/externalThingNotPresent/index.d.ts","./src/externalThingNotPresent.js","./src/externalThingNotPresent.jsx","./externalThingNotPresent.js","./externalThingNotPresent.jsx","../externalThingNotPresent.js","../externalThingNotPresent.jsx","../../externalThingNotPresent.js","../../externalThingNotPresent.jsx","../../../externalThingNotPresent.js","../../../externalThingNotPresent.jsx","../../../../externalThingNotPresent.js","../../../../externalThingNotPresent.jsx","./src/newFile.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-13601649692-export declare function something(): number;\n"},"-14992185226-export declare function something2(): number;\n","5686005290-export function externalThing1(): number;",{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"},{"version":"-497034637-export function something2() { return 20; }","signature":"-14992185226-export declare function something2(): number;\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10760962856-interface SomeType {\n}\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-1928648610-/// <reference path=\"types.d.ts\" />\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-7731522637-declare function globalSomething(): number;\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-5961586139-declare function globalSomething2(): number;\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-17196641480-/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4030514825-declare function globalFoo(): number;\n","affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":"-15417052438-/// <reference path=\"globalNewFile.d.ts\" />\n/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalMain(): void;\n","affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":"-4788605446-export declare function foo(): number;\n"},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":"-3531856636-export {};\n"},"7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"persistResolutions":true,"project":"./","traceResolution":true,"watch":true},"fileIdsList":[[2,3,4],[7],[9,10],[9,10,12],[2,3,4,14]],"referencedMap":[[5,1],[8,2],[11,3],[13,4],[15,5]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,16,[5,[{"file":"./src/anotherfilereusingresolution.ts","start":167,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],4,3,2,8,11,10,9,13,12,[15,[{"file":"./src/main.ts","start":256,"length":25,"messageText":"Cannot find module 'externalThingNotPresent'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?","category":1,"code":2792}]],14,7],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":17,"extension":".d.ts"},"failedLookupLocations":[18,19]},{"resolvedModule":{"resolvedFileName":20,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":21,"extension":".d.ts"},"failedLookupLocations":[22,23]},{"failedLookupLocations":[24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71]},{"resolvedModule":{"resolvedFileName":72,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[5,[1,2,3,4]],[15,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/filenotfound.d.ts",
      "./src/externalthing.d.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/filenotfound.ts",
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
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
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
        "./src/filenotfound.d.ts",
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
        "./src/filenotfound.d.ts",
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
      "./src/filenotfound.d.ts": {
        "version": "-14992185226-export declare function something2(): number;\n",
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
      "./src/filenotfound.ts": {
        "version": "-497034637-export function something2() { return 20; }",
        "signature": "-14992185226-export declare function something2(): number;\n"
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
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;",
        "signature": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "persistResolutions": true,
      "project": "./",
      "traceResolution": true,
      "watch": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.d.ts",
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
        "./src/filenotfound.d.ts",
        "./src/externalthing.d.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./node_modules/@types/sometype/index.d.ts",
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
      "./src/filenotfound.d.ts",
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
    "persistedResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/fileNotFound.ts",
            "./src/fileNotFound.tsx"
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
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx"
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
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx"
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
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx"
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
  "size": 7753
}

//// [/user/username/projects/myproject/src/fileNotFound.js] file written with same contents

Change:: Create external module file that could not be resolved

Input::
//// [/user/username/projects/myproject/src/externalThingNotPresent.ts]
export function externalThing2() { return 20; }


Output::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/externalThingNotPresent.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/externalThingNotPresent.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/externalThingNotPresent.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/externalThingNotPresent.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
Scheduling update
[[90m12:06:20 AM[0m] File change detected. Starting incremental compilation...

Reloading new file names and options
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/externalThingNotPresent.ts","/user/username/projects/myproject/src/fileNotFound.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
  options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/fileNotFound.d.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
======== Resolving module 'externalThingNotPresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/user/username/projects/myproject/src/externalThingNotPresent.ts' exist - use it as a name resolution result.
======== Module name 'externalThingNotPresent' was successfully resolved to '/user/username/projects/myproject/src/externalThingNotPresent.ts'. ========
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/externalThingNotPresent.ts 250 undefined Source file
Reusing resolution of module './newFile' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/newFile.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/fileNotFound.d.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
Reusing resolution of module 'externalThingNotPresent' from '/user/username/projects/myproject/src/main.ts' found in cache from location '/user/username/projects/myproject/src', it was successfully resolved to '/user/username/projects/myproject/src/externalThingNotPresent.ts'.
Reusing resolution of type reference directive 'someType' from '/user/username/projects/myproject/__inferred type names__.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts'.
DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject 0 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject 0 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/externalThingNotPresent.js :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
Project: /user/username/projects/myproject/tsconfig.json Detected file add/remove of non supported extension: /user/username/projects/myproject/src/externalThingNotPresent.js
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/externalThingNotPresent.js :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/externalThingNotPresent.d.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
Project: /user/username/projects/myproject/tsconfig.json Detected output file: /user/username/projects/myproject/src/externalThingNotPresent.d.ts
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/externalThingNotPresent.d.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
[91merror[0m[90m TS5055: [0mCannot write file '/user/username/projects/myproject/src/fileNotFound.d.ts' because it would overwrite input file.

[[90m12:06:40 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/externalThingNotPresent.ts","/user/username/projects/myproject/src/fileNotFound.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/filePresent.ts
/user/username/projects/myproject/src/fileNotFound.d.ts
/user/username/projects/myproject/src/externalThing.d.ts
/user/username/projects/myproject/src/externalThingNotPresent.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/fileNotFound.ts
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

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/src/externalThingNotPresent.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/fileNotFound.ts
/user/username/projects/myproject/src/main.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/src/anotherfilereusingresolution.ts:
  {"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","pollingInterval":250}
/user/username/projects/myproject/src/filepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/filePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.d.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filewithref.ts:
  {"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","pollingInterval":250}
/user/username/projects/myproject/src/types.ts:
  {"fileName":"/user/username/projects/myproject/src/types.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalanotherfilewithsamereferenes.ts:
  {"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalmain.ts:
  {"fileName":"/user/username/projects/myproject/src/globalMain.ts","pollingInterval":250}
/user/username/projects/myproject/src/main.ts:
  {"fileName":"/user/username/projects/myproject/src/main.ts","pollingInterval":250}
/user/username/projects/myproject/node_modules/@types/sometype/index.d.ts:
  {"fileName":"/user/username/projects/myproject/node_modules/@types/someType/index.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalnewfile.ts:
  {"fileName":"/user/username/projects/myproject/src/globalNewFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFileNotFound.ts","pollingInterval":250}
/user/username/projects/myproject/src/newfile.ts:
  {"fileName":"/user/username/projects/myproject/src/newFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/filenotfound.d.ts:
  {"fileName":"/user/username/projects/myproject/src/fileNotFound.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/fileNotFound.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthingnotpresent.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThingNotPresent.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/src/anotherFileReusingResolution.js] file written with same contents
//// [/user/username/projects/myproject/src/anotherFileReusingResolution.d.ts] file written with same contents
//// [/user/username/projects/myproject/src/main.js] file written with same contents
//// [/user/username/projects/myproject/src/main.d.ts] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.d.ts","./src/externalthing.d.ts","./src/externalthingnotpresent.ts","./src/anotherfilereusingresolution.ts","./src/filenotfound.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.d.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/newFile.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-13601649692-export declare function something(): number;\n"},"-14992185226-export declare function something2(): number;\n","5686005290-export function externalThing1(): number;",{"version":"5318862050-export function externalThing2() { return 20; }","signature":"-16245999227-export declare function externalThing2(): number;\n"},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"},{"version":"-497034637-export function something2() { return 20; }","signature":"-14992185226-export declare function something2(): number;\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10760962856-interface SomeType {\n}\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-1928648610-/// <reference path=\"types.d.ts\" />\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-7731522637-declare function globalSomething(): number;\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-5961586139-declare function globalSomething2(): number;\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-17196641480-/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4030514825-declare function globalFoo(): number;\n","affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":"-15417052438-/// <reference path=\"globalNewFile.d.ts\" />\n/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalMain(): void;\n","affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":"-4788605446-export declare function foo(): number;\n"},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":"-3531856636-export {};\n"},"7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"persistResolutions":true,"project":"./","traceResolution":true,"watch":true},"fileIdsList":[[2,3,4,5],[8],[10,11],[10,11,13],[2,3,4,5,15]],"referencedMap":[[6,1],[9,2],[12,3],[14,4],[16,5]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,17,4,3,2,9,12,11,10,14,13,15,8],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":18,"extension":".d.ts"},"failedLookupLocations":[19,20]},{"resolvedModule":{"resolvedFileName":21,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":22,"extension":".d.ts"},"failedLookupLocations":[23,24]},{"resolvedModule":{"resolvedFileName":25,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":26,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[6,[1,2,3,4]],[16,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/filenotfound.d.ts",
      "./src/externalthing.d.ts",
      "./src/externalthingnotpresent.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/filenotfound.ts",
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
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
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
        "./src/filenotfound.d.ts",
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
        "./src/filenotfound.d.ts",
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
      "./src/filenotfound.d.ts": {
        "version": "-14992185226-export declare function something2(): number;\n",
        "signature": "-14992185226-export declare function something2(): number;\n"
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
      "./src/filenotfound.ts": {
        "version": "-497034637-export function something2() { return 20; }",
        "signature": "-14992185226-export declare function something2(): number;\n"
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
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;",
        "signature": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "persistResolutions": true,
      "project": "./",
      "traceResolution": true,
      "watch": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.d.ts",
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
        "./src/filenotfound.d.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./node_modules/@types/sometype/index.d.ts",
      "./src/externalthing.d.ts",
      "./src/filenotfound.d.ts",
      "./src/filepresent.ts",
      "./src/filewithref.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalfilepresent.ts",
      "./src/globalmain.ts",
      "./src/globalnewfile.ts",
      "./src/newfile.ts",
      "./src/types.ts"
    ],
    "persistedResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/fileNotFound.ts",
            "./src/fileNotFound.tsx"
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
              "resolvedFileName": "./src/fileNotFound.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx"
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
              "resolvedFileName": "./src/fileNotFound.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx"
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
            "resolvedModule": {
              "resolvedFileName": "./src/externalThingNotPresent.ts",
              "extension": ".ts"
            }
          }
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx"
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
  "size": 5158
}

//// [/user/username/projects/myproject/src/externalThingNotPresent.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.externalThing2 = void 0;
    function externalThing2() { return 20; }
    exports.externalThing2 = externalThing2;
});


//// [/user/username/projects/myproject/src/externalThingNotPresent.d.ts]
export declare function externalThing2(): number;



Change:: Write .ts file that takes preference over resolved .d.ts file

Input::
//// [/user/username/projects/myproject/src/externalThing.ts]
export function externalThing1() { return 10; }


Output::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/externalThing.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/externalThing.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
[[90m12:06:46 AM[0m] File change detected. Starting incremental compilation...

Reloading new file names and options
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.ts","/user/username/projects/myproject/src/externalThingNotPresent.ts","/user/username/projects/myproject/src/fileNotFound.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
  options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/fileNotFound.d.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
Reusing resolution of module 'externalThingNotPresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThingNotPresent.ts'.
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/externalThing.ts 250 undefined Source file
Reusing resolution of module './newFile' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/newFile.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/fileNotFound.d.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
Reusing resolution of module 'externalThingNotPresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThingNotPresent.ts'.
Reusing resolution of type reference directive 'someType' from '/user/username/projects/myproject/__inferred type names__.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts'.
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/externalThing.js :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
Project: /user/username/projects/myproject/tsconfig.json Detected file add/remove of non supported extension: /user/username/projects/myproject/src/externalThing.js
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/externalThing.js :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
[91merror[0m[90m TS5055: [0mCannot write file '/user/username/projects/myproject/src/externalThing.d.ts' because it would overwrite input file.

[91merror[0m[90m TS5055: [0mCannot write file '/user/username/projects/myproject/src/fileNotFound.d.ts' because it would overwrite input file.

[[90m12:06:52 AM[0m] Found 2 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.ts","/user/username/projects/myproject/src/externalThingNotPresent.ts","/user/username/projects/myproject/src/fileNotFound.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/filePresent.ts
/user/username/projects/myproject/src/fileNotFound.d.ts
/user/username/projects/myproject/src/externalThing.d.ts
/user/username/projects/myproject/src/externalThingNotPresent.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/externalThing.ts
/user/username/projects/myproject/src/fileNotFound.ts
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

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/src/externalThingNotPresent.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/externalThing.ts
/user/username/projects/myproject/src/fileNotFound.ts
/user/username/projects/myproject/src/main.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/src/anotherfilereusingresolution.ts:
  {"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","pollingInterval":250}
/user/username/projects/myproject/src/filepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/filePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.d.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filewithref.ts:
  {"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","pollingInterval":250}
/user/username/projects/myproject/src/types.ts:
  {"fileName":"/user/username/projects/myproject/src/types.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalanotherfilewithsamereferenes.ts:
  {"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalmain.ts:
  {"fileName":"/user/username/projects/myproject/src/globalMain.ts","pollingInterval":250}
/user/username/projects/myproject/src/main.ts:
  {"fileName":"/user/username/projects/myproject/src/main.ts","pollingInterval":250}
/user/username/projects/myproject/node_modules/@types/sometype/index.d.ts:
  {"fileName":"/user/username/projects/myproject/node_modules/@types/someType/index.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalnewfile.ts:
  {"fileName":"/user/username/projects/myproject/src/globalNewFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFileNotFound.ts","pollingInterval":250}
/user/username/projects/myproject/src/newfile.ts:
  {"fileName":"/user/username/projects/myproject/src/newFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/filenotfound.d.ts:
  {"fileName":"/user/username/projects/myproject/src/fileNotFound.d.ts","pollingInterval":250}
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
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.d.ts","./src/externalthing.d.ts","./src/externalthingnotpresent.ts","./src/anotherfilereusingresolution.ts","./src/externalthing.ts","./src/filenotfound.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.d.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/newFile.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-13601649692-export declare function something(): number;\n"},"-14992185226-export declare function something2(): number;\n","5686005290-export function externalThing1(): number;",{"version":"5318862050-export function externalThing2() { return 20; }","signature":"-16245999227-export declare function externalThing2(): number;\n"},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"},{"version":"5618215488-export function externalThing1() { return 10; }","signature":"-13282660348-export declare function externalThing1(): number;\n"},{"version":"-497034637-export function something2() { return 20; }","signature":"-14992185226-export declare function something2(): number;\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10760962856-interface SomeType {\n}\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-1928648610-/// <reference path=\"types.d.ts\" />\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-7731522637-declare function globalSomething(): number;\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-5961586139-declare function globalSomething2(): number;\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-17196641480-/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4030514825-declare function globalFoo(): number;\n","affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":"-15417052438-/// <reference path=\"globalNewFile.d.ts\" />\n/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalMain(): void;\n","affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":"-4788605446-export declare function foo(): number;\n"},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":"-3531856636-export {};\n"},"7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"persistResolutions":true,"project":"./","traceResolution":true,"watch":true},"fileIdsList":[[2,3,4,5],[9],[11,12],[11,12,14],[2,3,4,5,16]],"referencedMap":[[6,1],[10,2],[13,3],[15,4],[17,5]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,18,4,3,2,10,13,12,11,15,14,16,9],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":19,"extension":".d.ts"},"failedLookupLocations":[20,21]},{"resolvedModule":{"resolvedFileName":22,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":23,"extension":".d.ts"},"failedLookupLocations":[24,25]},{"resolvedModule":{"resolvedFileName":26,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":27,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[6,[1,2,3,4]],[17,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/filenotfound.d.ts",
      "./src/externalthing.d.ts",
      "./src/externalthingnotpresent.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/externalthing.ts",
      "./src/filenotfound.ts",
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
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
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
        "./src/filenotfound.d.ts",
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
        "./src/filenotfound.d.ts",
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
      "./src/filenotfound.d.ts": {
        "version": "-14992185226-export declare function something2(): number;\n",
        "signature": "-14992185226-export declare function something2(): number;\n"
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
      "./src/externalthing.ts": {
        "version": "5618215488-export function externalThing1() { return 10; }",
        "signature": "-13282660348-export declare function externalThing1(): number;\n"
      },
      "./src/filenotfound.ts": {
        "version": "-497034637-export function something2() { return 20; }",
        "signature": "-14992185226-export declare function something2(): number;\n"
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
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;",
        "signature": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "persistResolutions": true,
      "project": "./",
      "traceResolution": true,
      "watch": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.d.ts",
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
        "./src/filenotfound.d.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./node_modules/@types/sometype/index.d.ts",
      "./src/externalthing.d.ts",
      "./src/filenotfound.d.ts",
      "./src/filepresent.ts",
      "./src/filewithref.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalfilepresent.ts",
      "./src/globalmain.ts",
      "./src/globalnewfile.ts",
      "./src/newfile.ts",
      "./src/types.ts"
    ],
    "persistedResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/fileNotFound.ts",
            "./src/fileNotFound.tsx"
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
              "resolvedFileName": "./src/fileNotFound.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx"
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
              "resolvedFileName": "./src/fileNotFound.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx"
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
            "resolvedModule": {
              "resolvedFileName": "./src/externalThingNotPresent.ts",
              "extension": ".ts"
            }
          }
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx"
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
  "size": 5337
}

//// [/user/username/projects/myproject/src/externalThing.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.externalThing1 = void 0;
    function externalThing1() { return 10; }
    exports.externalThing1 = externalThing1;
});



Change:: Delete .ts file that takes preference over resolved .d.ts file

Input::
//// [/user/username/projects/myproject/src/externalThing.ts] deleted

Output::
FileWatcher:: Triggered with /user/username/projects/myproject/src/externalThing.ts 2:: WatchInfo: /user/username/projects/myproject/src/externalThing.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/src/externalThing.ts 2:: WatchInfo: /user/username/projects/myproject/src/externalThing.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/externalThing.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/externalThing.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Wild card directory
[[90m12:06:57 AM[0m] File change detected. Starting incremental compilation...

Reloading new file names and options
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/externalThingNotPresent.ts","/user/username/projects/myproject/src/fileNotFound.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
  options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/fileNotFound.d.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
Reusing resolution of module 'externalThingNotPresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThingNotPresent.ts'.
Reusing resolution of module './newFile' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/newFile.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/fileNotFound.d.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
Reusing resolution of module 'externalThingNotPresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThingNotPresent.ts'.
Reusing resolution of type reference directive 'someType' from '/user/username/projects/myproject/__inferred type names__.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts'.
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/externalThing.ts 250 undefined Source file
[91merror[0m[90m TS5055: [0mCannot write file '/user/username/projects/myproject/src/fileNotFound.d.ts' because it would overwrite input file.

[[90m12:07:01 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/externalThingNotPresent.ts","/user/username/projects/myproject/src/fileNotFound.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/filePresent.ts
/user/username/projects/myproject/src/fileNotFound.d.ts
/user/username/projects/myproject/src/externalThing.d.ts
/user/username/projects/myproject/src/externalThingNotPresent.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/fileNotFound.ts
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

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/src/externalThingNotPresent.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/fileNotFound.ts
/user/username/projects/myproject/src/main.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/src/anotherfilereusingresolution.ts:
  {"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","pollingInterval":250}
/user/username/projects/myproject/src/filepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/filePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.d.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filewithref.ts:
  {"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","pollingInterval":250}
/user/username/projects/myproject/src/types.ts:
  {"fileName":"/user/username/projects/myproject/src/types.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalanotherfilewithsamereferenes.ts:
  {"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalmain.ts:
  {"fileName":"/user/username/projects/myproject/src/globalMain.ts","pollingInterval":250}
/user/username/projects/myproject/src/main.ts:
  {"fileName":"/user/username/projects/myproject/src/main.ts","pollingInterval":250}
/user/username/projects/myproject/node_modules/@types/sometype/index.d.ts:
  {"fileName":"/user/username/projects/myproject/node_modules/@types/someType/index.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalnewfile.ts:
  {"fileName":"/user/username/projects/myproject/src/globalNewFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFileNotFound.ts","pollingInterval":250}
/user/username/projects/myproject/src/newfile.ts:
  {"fileName":"/user/username/projects/myproject/src/newFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/filenotfound.d.ts:
  {"fileName":"/user/username/projects/myproject/src/fileNotFound.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/fileNotFound.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthingnotpresent.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThingNotPresent.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.d.ts","./src/externalthing.d.ts","./src/externalthingnotpresent.ts","./src/anotherfilereusingresolution.ts","./src/filenotfound.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./src/fileNotFound.d.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/newFile.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-13601649692-export declare function something(): number;\n"},"-14992185226-export declare function something2(): number;\n","5686005290-export function externalThing1(): number;",{"version":"5318862050-export function externalThing2() { return 20; }","signature":"-16245999227-export declare function externalThing2(): number;\n"},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"},{"version":"-497034637-export function something2() { return 20; }","signature":"-14992185226-export declare function something2(): number;\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10760962856-interface SomeType {\n}\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-1928648610-/// <reference path=\"types.d.ts\" />\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-7731522637-declare function globalSomething(): number;\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-5961586139-declare function globalSomething2(): number;\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-17196641480-/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4030514825-declare function globalFoo(): number;\n","affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":"-15417052438-/// <reference path=\"globalNewFile.d.ts\" />\n/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalMain(): void;\n","affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":"-4788605446-export declare function foo(): number;\n"},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":"-3531856636-export {};\n"},"7070062898-export function someType(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"persistResolutions":true,"project":"./","traceResolution":true,"watch":true},"fileIdsList":[[2,3,4,5],[8],[10,11],[10,11,13],[2,3,4,5,15]],"referencedMap":[[6,1],[9,2],[12,3],[14,4],[16,5]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,17,4,3,2,9,12,11,10,14,13,15,8],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":18,"extension":".d.ts"},"failedLookupLocations":[19,20]},{"resolvedModule":{"resolvedFileName":21,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":22,"extension":".d.ts"},"failedLookupLocations":[23,24]},{"resolvedModule":{"resolvedFileName":25,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":26,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[6,[1,2,3,4]],[16,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/filenotfound.d.ts",
      "./src/externalthing.d.ts",
      "./src/externalthingnotpresent.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/filenotfound.ts",
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
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
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
        "./src/filenotfound.d.ts",
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
        "./src/filenotfound.d.ts",
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
      "./src/filenotfound.d.ts": {
        "version": "-14992185226-export declare function something2(): number;\n",
        "signature": "-14992185226-export declare function something2(): number;\n"
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
      "./src/filenotfound.ts": {
        "version": "-497034637-export function something2() { return 20; }",
        "signature": "-14992185226-export declare function something2(): number;\n"
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
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;",
        "signature": "7070062898-export function someType(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "persistResolutions": true,
      "project": "./",
      "traceResolution": true,
      "watch": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.d.ts",
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
        "./src/filenotfound.d.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./node_modules/@types/sometype/index.d.ts",
      "./src/externalthing.d.ts",
      "./src/filenotfound.d.ts",
      "./src/filepresent.ts",
      "./src/filewithref.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalfilepresent.ts",
      "./src/globalmain.ts",
      "./src/globalnewfile.ts",
      "./src/newfile.ts",
      "./src/types.ts"
    ],
    "persistedResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/fileNotFound.ts",
            "./src/fileNotFound.tsx"
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
              "resolvedFileName": "./src/fileNotFound.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx"
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
              "resolvedFileName": "./src/fileNotFound.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx"
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
            "resolvedModule": {
              "resolvedFileName": "./src/externalThingNotPresent.ts",
              "extension": ".ts"
            }
          }
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx"
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
  "size": 5158
}


Change:: Install another type picked up by program

Input::
//// [/user/username/projects/myproject/node_modules/@types/someType2/index.d.ts]
export function someType2(): number;


Output::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@types/someType2 :: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
Scheduling update
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@types/someType2 :: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@types/someType2/index.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
Scheduling update
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@types/someType2/index.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
[[90m12:07:09 AM[0m] File change detected. Starting incremental compilation...

Reloading new file names and options
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/externalThingNotPresent.ts","/user/username/projects/myproject/src/fileNotFound.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
  options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/fileNotFound.d.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
Reusing resolution of module 'externalThingNotPresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThingNotPresent.ts'.
Reusing resolution of module './newFile' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/newFile.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/fileNotFound.d.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
Reusing resolution of module 'externalThingNotPresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThingNotPresent.ts'.
Reusing resolution of type reference directive 'someType' from '/user/username/projects/myproject/__inferred type names__.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/@types/someType/index.d.ts'.
======== Resolving type reference directive 'someType2', containing file '/user/username/projects/myproject/__inferred type names__.ts', root directory '/user/username/projects/myproject/node_modules/@types'. ========
Resolving with primary search path '/user/username/projects/myproject/node_modules/@types'.
File '/user/username/projects/myproject/node_modules/@types/someType2/package.json' does not exist.
File '/user/username/projects/myproject/node_modules/@types/someType2/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/node_modules/@types/someType2/index.d.ts', result '/user/username/projects/myproject/node_modules/@types/someType2/index.d.ts'.
======== Type reference directive 'someType2' was successfully resolved to '/user/username/projects/myproject/node_modules/@types/someType2/index.d.ts', primary: true. ========
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types/someType2/index.d.ts 250 undefined Source file
[91merror[0m[90m TS5055: [0mCannot write file '/user/username/projects/myproject/src/fileNotFound.d.ts' because it would overwrite input file.

[[90m12:07:13 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/externalThingNotPresent.ts","/user/username/projects/myproject/src/fileNotFound.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/filePresent.ts
/user/username/projects/myproject/src/fileNotFound.d.ts
/user/username/projects/myproject/src/externalThing.d.ts
/user/username/projects/myproject/src/externalThingNotPresent.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/fileNotFound.ts
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
/user/username/projects/myproject/node_modules/@types/someType2/index.d.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/src/externalThingNotPresent.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/fileNotFound.ts
/user/username/projects/myproject/src/main.ts
/user/username/projects/myproject/node_modules/@types/someType2/index.d.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/src/anotherfilereusingresolution.ts:
  {"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","pollingInterval":250}
/user/username/projects/myproject/src/filepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/filePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.d.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filewithref.ts:
  {"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","pollingInterval":250}
/user/username/projects/myproject/src/types.ts:
  {"fileName":"/user/username/projects/myproject/src/types.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalanotherfilewithsamereferenes.ts:
  {"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalmain.ts:
  {"fileName":"/user/username/projects/myproject/src/globalMain.ts","pollingInterval":250}
/user/username/projects/myproject/src/main.ts:
  {"fileName":"/user/username/projects/myproject/src/main.ts","pollingInterval":250}
/user/username/projects/myproject/node_modules/@types/sometype/index.d.ts:
  {"fileName":"/user/username/projects/myproject/node_modules/@types/someType/index.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalnewfile.ts:
  {"fileName":"/user/username/projects/myproject/src/globalNewFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFileNotFound.ts","pollingInterval":250}
/user/username/projects/myproject/src/newfile.ts:
  {"fileName":"/user/username/projects/myproject/src/newFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/filenotfound.d.ts:
  {"fileName":"/user/username/projects/myproject/src/fileNotFound.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/fileNotFound.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthingnotpresent.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThingNotPresent.ts","pollingInterval":250}
/user/username/projects/myproject/node_modules/@types/sometype2/index.d.ts:
  {"fileName":"/user/username/projects/myproject/node_modules/@types/someType2/index.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.d.ts","./src/externalthing.d.ts","./src/externalthingnotpresent.ts","./src/anotherfilereusingresolution.ts","./src/filenotfound.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype/index.d.ts","./node_modules/@types/sometype2/index.d.ts","./src/fileNotFound.d.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/newFile.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-13601649692-export declare function something(): number;\n"},"-14992185226-export declare function something2(): number;\n","5686005290-export function externalThing1(): number;",{"version":"5318862050-export function externalThing2() { return 20; }","signature":"-16245999227-export declare function externalThing2(): number;\n"},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"},{"version":"-497034637-export function something2() { return 20; }","signature":"-14992185226-export declare function something2(): number;\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10760962856-interface SomeType {\n}\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-1928648610-/// <reference path=\"types.d.ts\" />\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-7731522637-declare function globalSomething(): number;\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-5961586139-declare function globalSomething2(): number;\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-17196641480-/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4030514825-declare function globalFoo(): number;\n","affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":"-15417052438-/// <reference path=\"globalNewFile.d.ts\" />\n/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalMain(): void;\n","affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":"-4788605446-export declare function foo(): number;\n"},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":"-3531856636-export {};\n"},"7070062898-export function someType(): number;","5420646020-export function someType2(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"persistResolutions":true,"project":"./","traceResolution":true,"watch":true},"fileIdsList":[[2,3,4,5],[8],[10,11],[10,11,13],[2,3,4,5,15]],"referencedMap":[[6,1],[9,2],[12,3],[14,4],[16,5]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,17,4,3,2,9,12,11,10,14,13,15,8],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":19,"extension":".d.ts"},"failedLookupLocations":[20,21]},{"resolvedModule":{"resolvedFileName":22,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":23,"extension":".d.ts"},"failedLookupLocations":[24,25]},{"resolvedModule":{"resolvedFileName":26,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":27,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[6,[1,2,3,4]],[16,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/filenotfound.d.ts",
      "./src/externalthing.d.ts",
      "./src/externalthingnotpresent.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/filenotfound.ts",
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
      "./node_modules/@types/sometype2/index.d.ts",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
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
        "./src/filenotfound.d.ts",
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
        "./src/filenotfound.d.ts",
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
      "./src/filenotfound.d.ts": {
        "version": "-14992185226-export declare function something2(): number;\n",
        "signature": "-14992185226-export declare function something2(): number;\n"
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
      "./src/filenotfound.ts": {
        "version": "-497034637-export function something2() { return 20; }",
        "signature": "-14992185226-export declare function something2(): number;\n"
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
      },
      "./node_modules/@types/sometype/index.d.ts": {
        "version": "7070062898-export function someType(): number;",
        "signature": "7070062898-export function someType(): number;"
      },
      "./node_modules/@types/sometype2/index.d.ts": {
        "version": "5420646020-export function someType2(): number;",
        "signature": "5420646020-export function someType2(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "persistResolutions": true,
      "project": "./",
      "traceResolution": true,
      "watch": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.d.ts",
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
        "./src/filenotfound.d.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./node_modules/@types/sometype/index.d.ts",
      "./src/externalthing.d.ts",
      "./src/filenotfound.d.ts",
      "./src/filepresent.ts",
      "./src/filewithref.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalfilepresent.ts",
      "./src/globalmain.ts",
      "./src/globalnewfile.ts",
      "./src/newfile.ts",
      "./src/types.ts"
    ],
    "persistedResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/fileNotFound.ts",
            "./src/fileNotFound.tsx"
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
              "resolvedFileName": "./src/fileNotFound.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx"
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
              "resolvedFileName": "./src/fileNotFound.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx"
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
            "resolvedModule": {
              "resolvedFileName": "./src/externalThingNotPresent.ts",
              "extension": ".ts"
            }
          }
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx"
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
  "size": 5253
}


Change:: Delete existing type picked up by program

Input::
//// [/user/username/projects/myproject/node_modules/@types/someType/index.d.ts] deleted

Output::
FileWatcher:: Triggered with /user/username/projects/myproject/node_modules/@types/someType/index.d.ts 2:: WatchInfo: /user/username/projects/myproject/node_modules/@types/someType/index.d.ts 250 undefined Source file
Scheduling update
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/node_modules/@types/someType/index.d.ts 2:: WatchInfo: /user/username/projects/myproject/node_modules/@types/someType/index.d.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@types/someType/index.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
Scheduling update
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@types/someType/index.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@types/someType :: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
Scheduling update
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/@types/someType :: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
[[90m12:07:19 AM[0m] File change detected. Starting incremental compilation...

Reloading new file names and options
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/externalThingNotPresent.ts","/user/username/projects/myproject/src/fileNotFound.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
  options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types/someType/index.d.ts 250 undefined Source file
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/fileNotFound.d.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
Reusing resolution of module 'externalThingNotPresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThingNotPresent.ts'.
Reusing resolution of module './newFile' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/newFile.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/fileNotFound.d.ts'.
Reusing resolution of module 'externalThing' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThing.d.ts'.
Reusing resolution of module 'externalThingNotPresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/externalThingNotPresent.ts'.
Reusing resolution of type reference directive 'someType2' from '/user/username/projects/myproject/__inferred type names__.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/@types/someType2/index.d.ts'.
[91merror[0m[90m TS5055: [0mCannot write file '/user/username/projects/myproject/src/fileNotFound.d.ts' because it would overwrite input file.

[[90m12:07:23 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/anotherFileReusingResolution.ts","/user/username/projects/myproject/src/externalThing.d.ts","/user/username/projects/myproject/src/externalThingNotPresent.ts","/user/username/projects/myproject/src/fileNotFound.ts","/user/username/projects/myproject/src/filePresent.ts","/user/username/projects/myproject/src/fileWithRef.ts","/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","/user/username/projects/myproject/src/globalFileNotFound.ts","/user/username/projects/myproject/src/globalFilePresent.ts","/user/username/projects/myproject/src/globalMain.ts","/user/username/projects/myproject/src/globalNewFile.ts","/user/username/projects/myproject/src/main.ts","/user/username/projects/myproject/src/newFile.ts","/user/username/projects/myproject/src/types.ts"]
Program options: {"module":2,"composite":true,"persistResolutions":true,"traceResolution":true,"project":"/user/username/projects/myproject","watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/filePresent.ts
/user/username/projects/myproject/src/fileNotFound.d.ts
/user/username/projects/myproject/src/externalThing.d.ts
/user/username/projects/myproject/src/externalThingNotPresent.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/fileNotFound.ts
/user/username/projects/myproject/src/types.ts
/user/username/projects/myproject/src/fileWithRef.ts
/user/username/projects/myproject/src/globalFilePresent.ts
/user/username/projects/myproject/src/globalFileNotFound.ts
/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts
/user/username/projects/myproject/src/globalNewFile.ts
/user/username/projects/myproject/src/globalMain.ts
/user/username/projects/myproject/src/newFile.ts
/user/username/projects/myproject/src/main.ts
/user/username/projects/myproject/node_modules/@types/someType2/index.d.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/src/externalThingNotPresent.ts
/user/username/projects/myproject/src/anotherFileReusingResolution.ts
/user/username/projects/myproject/src/fileNotFound.ts
/user/username/projects/myproject/src/main.ts
/user/username/projects/myproject/node_modules/@types/someType2/index.d.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/src/anotherfilereusingresolution.ts:
  {"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","pollingInterval":250}
/user/username/projects/myproject/src/filepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/filePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthing.d.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThing.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filewithref.ts:
  {"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","pollingInterval":250}
/user/username/projects/myproject/src/types.ts:
  {"fileName":"/user/username/projects/myproject/src/types.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalanotherfilewithsamereferenes.ts:
  {"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilepresent.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalmain.ts:
  {"fileName":"/user/username/projects/myproject/src/globalMain.ts","pollingInterval":250}
/user/username/projects/myproject/src/main.ts:
  {"fileName":"/user/username/projects/myproject/src/main.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalnewfile.ts:
  {"fileName":"/user/username/projects/myproject/src/globalNewFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/globalfilenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/globalFileNotFound.ts","pollingInterval":250}
/user/username/projects/myproject/src/newfile.ts:
  {"fileName":"/user/username/projects/myproject/src/newFile.ts","pollingInterval":250}
/user/username/projects/myproject/src/filenotfound.d.ts:
  {"fileName":"/user/username/projects/myproject/src/fileNotFound.d.ts","pollingInterval":250}
/user/username/projects/myproject/src/filenotfound.ts:
  {"fileName":"/user/username/projects/myproject/src/fileNotFound.ts","pollingInterval":250}
/user/username/projects/myproject/src/externalthingnotpresent.ts:
  {"fileName":"/user/username/projects/myproject/src/externalThingNotPresent.ts","pollingInterval":250}
/user/username/projects/myproject/node_modules/@types/sometype2/index.d.ts:
  {"fileName":"/user/username/projects/myproject/node_modules/@types/someType2/index.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./src/filepresent.ts","./src/filenotfound.d.ts","./src/externalthing.d.ts","./src/externalthingnotpresent.ts","./src/anotherfilereusingresolution.ts","./src/filenotfound.ts","./src/types.ts","./src/filewithref.ts","./src/globalfilepresent.ts","./src/globalfilenotfound.ts","./src/globalanotherfilewithsamereferenes.ts","./src/globalnewfile.ts","./src/globalmain.ts","./src/newfile.ts","./src/main.ts","./node_modules/@types/sometype2/index.d.ts","./src/fileNotFound.d.ts","./src/fileNotFound.ts","./src/fileNotFound.tsx","./src/filePresent.ts","./src/externalThing.d.ts","./src/externalThing.ts","./src/externalThing.tsx","./src/externalThingNotPresent.ts","./src/newFile.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"11598859296-export function something() { return 10; }","signature":"-13601649692-export declare function something(): number;\n"},"-14992185226-export declare function something2(): number;\n","5686005290-export function externalThing1(): number;",{"version":"5318862050-export function externalThing2() { return 20; }","signature":"-16245999227-export declare function externalThing2(): number;\n"},{"version":"-26029945158-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";","signature":"-3531856636-export {};\n"},{"version":"-497034637-export function something2() { return 20; }","signature":"-14992185226-export declare function something2(): number;\n"},{"version":"-12575322908-interface SomeType {}","signature":"-10760962856-interface SomeType {\n}\n","affectsGlobalScope":true},{"version":"-6085631553-/// <reference path=\"./types.ts\"/>","signature":"-1928648610-/// <reference path=\"types.d.ts\" />\n"},{"version":"-5627034801-function globalSomething() { return 10; }","signature":"-7731522637-declare function globalSomething(): number;\n","affectsGlobalScope":true},{"version":"-6310824062-function globalSomething2() { return 20; }","signature":"-5961586139-declare function globalSomething2(): number;\n","affectsGlobalScope":true},{"version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n","signature":"-17196641480-/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalAnotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true},{"version":"4916490342-function globalFoo() { return 20; }","signature":"4030514825-declare function globalFoo(): number;\n","affectsGlobalScope":true},{"version":"-7686833800-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();globalFoo();","signature":"-15417052438-/// <reference path=\"globalNewFile.d.ts\" />\n/// <reference path=\"globalFilePresent.d.ts\" />\n/// <reference path=\"globalFileNotFound.d.ts\" />\ndeclare function globalMain(): void;\n","affectsGlobalScope":true},{"version":"4428918903-export function foo() { return 20; }","signature":"-4788605446-export declare function foo(): number;\n"},{"version":"6810735860-import { foo } from \"./newFile\";import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nimport { externalThing1 } from \"externalThing\";\nimport { externalThing2 } from \"externalThingNotPresent\";something();","signature":"-3531856636-export {};\n"},"5420646020-export function someType2(): number;"],"options":{"composite":true,"configFilePath":"./tsconfig.json","extendedDiagnostics":true,"module":2,"persistResolutions":true,"project":"./","traceResolution":true,"watch":true},"fileIdsList":[[2,3,4,5],[8],[10,11],[10,11,13],[2,3,4,5,15]],"referencedMap":[[6,1],[9,2],[12,3],[14,4],[16,5]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,4,3,2,9,12,11,10,14,13,15,8],"persistedResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":18,"extension":".d.ts"},"failedLookupLocations":[19,20]},{"resolvedModule":{"resolvedFileName":21,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":22,"extension":".d.ts"},"failedLookupLocations":[23,24]},{"resolvedModule":{"resolvedFileName":25,"extension":".ts"}},{"resolvedModule":{"resolvedFileName":26,"extension":".ts"}}],"names":["./fileNotFound","./filePresent","externalThing","externalThingNotPresent","./newFile"],"resolutionEntries":[[1,1],[2,2],[3,3],[4,4],[5,5]],"resolutionMap":[[6,[1,2,3,4]],[16,[1,2,5,3,4]]]}},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./src/filepresent.ts",
      "./src/filenotfound.d.ts",
      "./src/externalthing.d.ts",
      "./src/externalthingnotpresent.ts",
      "./src/anotherfilereusingresolution.ts",
      "./src/filenotfound.ts",
      "./src/types.ts",
      "./src/filewithref.ts",
      "./src/globalfilepresent.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalnewfile.ts",
      "./src/globalmain.ts",
      "./src/newfile.ts",
      "./src/main.ts",
      "./node_modules/@types/sometype2/index.d.ts",
      "./src/fileNotFound.d.ts",
      "./src/fileNotFound.ts",
      "./src/fileNotFound.tsx",
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
        "./src/filenotfound.d.ts",
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
        "./src/filenotfound.d.ts",
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
      "./src/filenotfound.d.ts": {
        "version": "-14992185226-export declare function something2(): number;\n",
        "signature": "-14992185226-export declare function something2(): number;\n"
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
      "./src/filenotfound.ts": {
        "version": "-497034637-export function something2() { return 20; }",
        "signature": "-14992185226-export declare function something2(): number;\n"
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
      },
      "./node_modules/@types/sometype2/index.d.ts": {
        "version": "5420646020-export function someType2(): number;",
        "signature": "5420646020-export function someType2(): number;"
      }
    },
    "options": {
      "composite": true,
      "configFilePath": "./tsconfig.json",
      "extendedDiagnostics": true,
      "module": 2,
      "persistResolutions": true,
      "project": "./",
      "traceResolution": true,
      "watch": true
    },
    "referencedMap": {
      "./src/anotherfilereusingresolution.ts": [
        "./src/filepresent.ts",
        "./src/filenotfound.d.ts",
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
        "./src/filenotfound.d.ts",
        "./src/externalthing.d.ts",
        "./src/externalthingnotpresent.ts",
        "./src/newfile.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./src/externalthing.d.ts",
      "./src/filenotfound.d.ts",
      "./src/filepresent.ts",
      "./src/filewithref.ts",
      "./src/globalanotherfilewithsamereferenes.ts",
      "./src/globalfilenotfound.ts",
      "./src/globalfilepresent.ts",
      "./src/globalmain.ts",
      "./src/globalnewfile.ts",
      "./src/newfile.ts",
      "./src/types.ts"
    ],
    "persistedResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./src/fileNotFound.d.ts",
            "extension": ".d.ts"
          },
          "failedLookupLocations": [
            "./src/fileNotFound.ts",
            "./src/fileNotFound.tsx"
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
              "resolvedFileName": "./src/fileNotFound.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx"
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
              "resolvedFileName": "./src/fileNotFound.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx"
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
            "resolvedModule": {
              "resolvedFileName": "./src/externalThingNotPresent.ts",
              "extension": ".ts"
            }
          }
        },
        "./src/main.ts": {
          "./fileNotFound": {
            "resolvedModule": {
              "resolvedFileName": "./src/fileNotFound.d.ts",
              "extension": ".d.ts"
            },
            "failedLookupLocations": [
              "./src/fileNotFound.ts",
              "./src/fileNotFound.tsx"
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
  "size": 5157
}

