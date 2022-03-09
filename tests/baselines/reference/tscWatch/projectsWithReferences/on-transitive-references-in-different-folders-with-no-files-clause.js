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

//// [/user/username/projects/transitiveReferences/a/tsconfig.json]
{"compilerOptions":{"composite":true}}

//// [/user/username/projects/transitiveReferences/b/tsconfig.json]
{"compilerOptions":{"composite":true,"baseUrl":"./","paths":{"@ref/*":["../*"]}},"references":[{"path":"../a"}]}

//// [/user/username/projects/transitiveReferences/c/tsconfig.json]
{"compilerOptions":{"baseUrl":"./","paths":{"@ref/*":["../refs/*"]}},"references":[{"path":"../b"}]}

//// [/user/username/projects/transitiveReferences/a/index.ts]
export class A {}

//// [/user/username/projects/transitiveReferences/b/index.ts]
import {A} from '@ref/a';
export const b = new A();

//// [/user/username/projects/transitiveReferences/c/index.ts]
import {b} from '../b';
import {X} from "@ref/a";
b;
X;

//// [/user/username/projects/transitiveReferences/refs/a.d.ts]
export class X {}
export class A {}


//// [/user/username/projects/transitiveReferences/a/index.js]
"use strict";
exports.__esModule = true;
exports.A = void 0;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;


//// [/user/username/projects/transitiveReferences/a/index.d.ts]
export declare class A {
}


//// [/user/username/projects/transitiveReferences/a/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-7264743946-export class A {}"],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/transitiveReferences/b/index.js]
"use strict";
exports.__esModule = true;
exports.b = void 0;
var a_1 = require("@ref/a");
exports.b = new a_1.A();


//// [/user/username/projects/transitiveReferences/b/index.d.ts]
import { A } from '@ref/a';
export declare const b: A;


//// [/user/username/projects/transitiveReferences/b/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","../a/index.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-8728835846-export declare class A {\n}\n","-2591036212-import {A} from '@ref/a';\nexport const b = new A();"],"options":{"composite":true},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[[3,1]],"semanticDiagnosticsPerFile":[1,2,3]},"version":"FakeTSVersion"}

//// [/user/username/projects/transitiveReferences/c/index.js]
"use strict";
exports.__esModule = true;
var b_1 = require("../b");
var a_1 = require("@ref/a");
b_1.b;
a_1.X;



/a/lib/tsc.js -w -p c
Output::
>> Screen clear
[[90m12:00:53 AM[0m] Starting compilation in watch mode...

[[90m12:00:57 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/transitiveReferences/c/index.ts"]
Program options: {"baseUrl":"/user/username/projects/transitiveReferences/c","paths":{"@ref/*":["../refs/*"]},"pathsBasePath":"/user/username/projects/transitiveReferences/c","watch":true,"project":"/user/username/projects/transitiveReferences/c","configFilePath":"/user/username/projects/transitiveReferences/c/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/transitivereferences/a/index.d.ts (used version)
/user/username/projects/transitivereferences/b/index.d.ts (used version)
/user/username/projects/transitivereferences/refs/a.d.ts (used version)
/user/username/projects/transitivereferences/c/index.ts (used version)

Dependencies for::
/a/lib/lib.d.ts:
  /a/lib/lib.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/c/index.ts
/user/username/projects/transitiveReferences/a/index.d.ts:
  /user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts:
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts:
  /user/username/projects/transitiveReferences/c/index.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts

WatchedFiles::
/user/username/projects/transitivereferences/c/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/c/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/b/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/b/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/a/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/a/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/c/index.ts:
  {"fileName":"/user/username/projects/transitiveReferences/c/index.ts","pollingInterval":250}
/user/username/projects/transitivereferences/b/index.d.ts:
  {"fileName":"/user/username/projects/transitiveReferences/b/index.d.ts","pollingInterval":250}
/user/username/projects/transitivereferences/a/index.d.ts:
  {"fileName":"/user/username/projects/transitiveReferences/a/index.d.ts","pollingInterval":250}
/user/username/projects/transitivereferences/refs/a.d.ts:
  {"fileName":"/user/username/projects/transitiveReferences/refs/a.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/transitivereferences/b/package.json:
  {"fileName":"/user/username/projects/transitivereferences/b/package.json","pollingInterval":250}
/user/username/projects/transitivereferences/a/package.json:
  {"fileName":"/user/username/projects/transitivereferences/a/package.json","pollingInterval":250}

FsWatches::
/user/username/projects/transitivereferences:
  {"directoryName":"/user/username/projects/transitiveReferences","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

FsWatchesRecursive::
/user/username/projects/transitivereferences/b:
  {"directoryName":"/user/username/projects/transitivereferences/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
  {"directoryName":"/user/username/projects/transitiveReferences/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/a:
  {"directoryName":"/user/username/projects/transitivereferences/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
  {"directoryName":"/user/username/projects/transitiveReferences/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/refs:
  {"directoryName":"/user/username/projects/transitiveReferences/refs","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/c/node_modules/@types:
  {"directoryName":"/user/username/projects/transitiveReferences/c/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/node_modules/@types:
  {"directoryName":"/user/username/projects/transitiveReferences/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/c:
  {"directoryName":"/user/username/projects/transitivereferences/c","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/transitiveReferences/c/index.js] file written with same contents

Change:: non local edit b ts, and build b

Input::
//// [/user/username/projects/transitiveReferences/b/index.ts]
import {A} from '@ref/a';
export const b = new A();export function gfoo() { }

//// [/user/username/projects/transitiveReferences/b/index.js]
"use strict";
exports.__esModule = true;
exports.gfoo = exports.b = void 0;
var a_1 = require("@ref/a");
exports.b = new a_1.A();
function gfoo() { }
exports.gfoo = gfoo;


//// [/user/username/projects/transitiveReferences/b/index.d.ts]
import { A } from '@ref/a';
export declare const b: A;
export declare function gfoo(): void;


//// [/user/username/projects/transitiveReferences/b/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","../a/index.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-8728835846-export declare class A {\n}\n",{"version":"1841609480-import {A} from '@ref/a';\nexport const b = new A();export function gfoo() { }","signature":"4376023469-import { A } from '@ref/a';\nexport declare const b: A;\nexport declare function gfoo(): void;\n"}],"options":{"composite":true},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[[3,1]],"semanticDiagnosticsPerFile":[1,2,3]},"version":"FakeTSVersion"}


Output::
>> Screen clear
[[90m12:01:09 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:13 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/transitiveReferences/c/index.ts"]
Program options: {"baseUrl":"/user/username/projects/transitiveReferences/c","paths":{"@ref/*":["../refs/*"]},"pathsBasePath":"/user/username/projects/transitiveReferences/c","watch":true,"project":"/user/username/projects/transitiveReferences/c","configFilePath":"/user/username/projects/transitiveReferences/c/tsconfig.json"}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/b/index.d.ts (used version)
/user/username/projects/transitivereferences/c/index.ts (computed .d.ts)

Dependencies for::
/a/lib/lib.d.ts:
  /a/lib/lib.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/c/index.ts
/user/username/projects/transitiveReferences/a/index.d.ts:
  /user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts:
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts:
  /user/username/projects/transitiveReferences/c/index.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts

WatchedFiles::
/user/username/projects/transitivereferences/c/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/c/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/b/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/b/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/a/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/a/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/c/index.ts:
  {"fileName":"/user/username/projects/transitiveReferences/c/index.ts","pollingInterval":250}
/user/username/projects/transitivereferences/b/index.d.ts:
  {"fileName":"/user/username/projects/transitiveReferences/b/index.d.ts","pollingInterval":250}
/user/username/projects/transitivereferences/a/index.d.ts:
  {"fileName":"/user/username/projects/transitiveReferences/a/index.d.ts","pollingInterval":250}
/user/username/projects/transitivereferences/refs/a.d.ts:
  {"fileName":"/user/username/projects/transitiveReferences/refs/a.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::
/user/username/projects/transitivereferences:
  {"directoryName":"/user/username/projects/transitiveReferences","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

FsWatchesRecursive::
/user/username/projects/transitivereferences/b:
  {"directoryName":"/user/username/projects/transitivereferences/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
  {"directoryName":"/user/username/projects/transitiveReferences/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/a:
  {"directoryName":"/user/username/projects/transitivereferences/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
  {"directoryName":"/user/username/projects/transitiveReferences/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/refs:
  {"directoryName":"/user/username/projects/transitiveReferences/refs","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/c/node_modules/@types:
  {"directoryName":"/user/username/projects/transitiveReferences/c/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/node_modules/@types:
  {"directoryName":"/user/username/projects/transitiveReferences/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/c:
  {"directoryName":"/user/username/projects/transitivereferences/c","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/transitiveReferences/c/index.js] file written with same contents

Change:: edit on config file

Input::
//// [/user/username/projects/transitiveReferences/c/tsconfig.json]
{"compilerOptions":{"baseUrl":"./","paths":{"@ref/*":["../nrefs/*"]}},"references":[{"path":"../b"}]}

//// [/user/username/projects/transitiveReferences/nrefs/a.d.ts]
export class X {}
export class A {}



Output::
>> Screen clear
[[90m12:01:21 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:25 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/transitiveReferences/c/index.ts"]
Program options: {"baseUrl":"/user/username/projects/transitiveReferences/c","paths":{"@ref/*":["../nrefs/*"]},"pathsBasePath":"/user/username/projects/transitiveReferences/c","watch":true,"project":"/user/username/projects/transitiveReferences/c","configFilePath":"/user/username/projects/transitiveReferences/c/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/nrefs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/nrefs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/nrefs/a.d.ts (used version)
/user/username/projects/transitivereferences/c/index.ts (computed .d.ts)

Dependencies for::
/a/lib/lib.d.ts:
  /a/lib/lib.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/nrefs/a.d.ts
  /user/username/projects/transitiveReferences/c/index.ts
/user/username/projects/transitiveReferences/a/index.d.ts:
  /user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts:
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/nrefs/a.d.ts:
  /user/username/projects/transitiveReferences/nrefs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts:
  /user/username/projects/transitiveReferences/c/index.ts
  /user/username/projects/transitiveReferences/nrefs/a.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts

WatchedFiles::
/user/username/projects/transitivereferences/c/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/c/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/b/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/b/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/a/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/a/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/c/index.ts:
  {"fileName":"/user/username/projects/transitiveReferences/c/index.ts","pollingInterval":250}
/user/username/projects/transitivereferences/b/index.d.ts:
  {"fileName":"/user/username/projects/transitiveReferences/b/index.d.ts","pollingInterval":250}
/user/username/projects/transitivereferences/a/index.d.ts:
  {"fileName":"/user/username/projects/transitiveReferences/a/index.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/transitivereferences/nrefs/a.d.ts:
  {"fileName":"/user/username/projects/transitiveReferences/nrefs/a.d.ts","pollingInterval":250}
/user/username/projects/transitivereferences/b/package.json:
  {"fileName":"/user/username/projects/transitivereferences/b/package.json","pollingInterval":250}
/user/username/projects/transitivereferences/a/package.json:
  {"fileName":"/user/username/projects/transitivereferences/a/package.json","pollingInterval":250}

FsWatches::
/user/username/projects/transitivereferences:
  {"directoryName":"/user/username/projects/transitiveReferences","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

FsWatchesRecursive::
/user/username/projects/transitivereferences/b:
  {"directoryName":"/user/username/projects/transitivereferences/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
  {"directoryName":"/user/username/projects/transitiveReferences/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/a:
  {"directoryName":"/user/username/projects/transitivereferences/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
  {"directoryName":"/user/username/projects/transitiveReferences/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/c:
  {"directoryName":"/user/username/projects/transitivereferences/c","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/nrefs:
  {"directoryName":"/user/username/projects/transitiveReferences/nrefs","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/c/node_modules/@types:
  {"directoryName":"/user/username/projects/transitiveReferences/c/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/node_modules/@types:
  {"directoryName":"/user/username/projects/transitiveReferences/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/transitiveReferences/c/index.js] file written with same contents

Change:: Revert config file edit

Input::
//// [/user/username/projects/transitiveReferences/c/tsconfig.json]
{"compilerOptions":{"baseUrl":"./","paths":{"@ref/*":["../refs/*"]}},"references":[{"path":"../b"}]}


Output::
>> Screen clear
[[90m12:01:29 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:33 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/transitiveReferences/c/index.ts"]
Program options: {"baseUrl":"/user/username/projects/transitiveReferences/c","paths":{"@ref/*":["../refs/*"]},"pathsBasePath":"/user/username/projects/transitiveReferences/c","watch":true,"project":"/user/username/projects/transitiveReferences/c","configFilePath":"/user/username/projects/transitiveReferences/c/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/refs/a.d.ts (used version)
/user/username/projects/transitivereferences/c/index.ts (computed .d.ts)

Dependencies for::
/a/lib/lib.d.ts:
  /a/lib/lib.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/c/index.ts
/user/username/projects/transitiveReferences/a/index.d.ts:
  /user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts:
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts:
  /user/username/projects/transitiveReferences/c/index.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts

WatchedFiles::
/user/username/projects/transitivereferences/c/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/c/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/b/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/b/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/a/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/a/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/c/index.ts:
  {"fileName":"/user/username/projects/transitiveReferences/c/index.ts","pollingInterval":250}
/user/username/projects/transitivereferences/b/index.d.ts:
  {"fileName":"/user/username/projects/transitiveReferences/b/index.d.ts","pollingInterval":250}
/user/username/projects/transitivereferences/a/index.d.ts:
  {"fileName":"/user/username/projects/transitiveReferences/a/index.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/transitivereferences/b/package.json:
  {"fileName":"/user/username/projects/transitivereferences/b/package.json","pollingInterval":250}
/user/username/projects/transitivereferences/a/package.json:
  {"fileName":"/user/username/projects/transitivereferences/a/package.json","pollingInterval":250}
/user/username/projects/transitivereferences/refs/a.d.ts:
  {"fileName":"/user/username/projects/transitiveReferences/refs/a.d.ts","pollingInterval":250}

FsWatches::
/user/username/projects/transitivereferences:
  {"directoryName":"/user/username/projects/transitiveReferences","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

FsWatchesRecursive::
/user/username/projects/transitivereferences/b:
  {"directoryName":"/user/username/projects/transitivereferences/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
  {"directoryName":"/user/username/projects/transitiveReferences/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/a:
  {"directoryName":"/user/username/projects/transitivereferences/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
  {"directoryName":"/user/username/projects/transitiveReferences/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/c:
  {"directoryName":"/user/username/projects/transitivereferences/c","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/refs:
  {"directoryName":"/user/username/projects/transitiveReferences/refs","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/c/node_modules/@types:
  {"directoryName":"/user/username/projects/transitiveReferences/c/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/node_modules/@types:
  {"directoryName":"/user/username/projects/transitiveReferences/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/transitiveReferences/c/index.js] file written with same contents

Change:: edit in referenced config file

Input::
//// [/user/username/projects/transitiveReferences/b/tsconfig.json]
{"compilerOptions":{"composite":true,"baseUrl":"./","paths":{"@ref/*":["../nrefs/*"]}},"references":[{"path":"../a"}]}


Output::
>> Screen clear
[[90m12:01:37 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:38 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/transitiveReferences/c/index.ts"]
Program options: {"baseUrl":"/user/username/projects/transitiveReferences/c","paths":{"@ref/*":["../refs/*"]},"pathsBasePath":"/user/username/projects/transitiveReferences/c","watch":true,"project":"/user/username/projects/transitiveReferences/c","configFilePath":"/user/username/projects/transitiveReferences/c/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/transitiveReferences/nrefs/a.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/nrefs/a.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/nrefs/a.d.ts (used version)
/user/username/projects/transitivereferences/b/index.d.ts (used version)

Dependencies for::
/a/lib/lib.d.ts:
  /a/lib/lib.d.ts
  /user/username/projects/transitiveReferences/nrefs/a.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/c/index.ts
/user/username/projects/transitiveReferences/nrefs/a.d.ts:
  /user/username/projects/transitiveReferences/nrefs/a.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts:
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/nrefs/a.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts:
  /user/username/projects/transitiveReferences/c/index.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/nrefs/a.d.ts

WatchedFiles::
/user/username/projects/transitivereferences/c/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/c/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/b/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/b/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/a/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/a/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/c/index.ts:
  {"fileName":"/user/username/projects/transitiveReferences/c/index.ts","pollingInterval":250}
/user/username/projects/transitivereferences/b/index.d.ts:
  {"fileName":"/user/username/projects/transitiveReferences/b/index.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/transitivereferences/refs/a.d.ts:
  {"fileName":"/user/username/projects/transitiveReferences/refs/a.d.ts","pollingInterval":250}
/user/username/projects/transitivereferences/nrefs/a.d.ts:
  {"fileName":"/user/username/projects/transitiveReferences/nrefs/a.d.ts","pollingInterval":250}

FsWatches::
/user/username/projects/transitivereferences:
  {"directoryName":"/user/username/projects/transitiveReferences","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

FsWatchesRecursive::
/user/username/projects/transitivereferences/b:
  {"directoryName":"/user/username/projects/transitivereferences/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
  {"directoryName":"/user/username/projects/transitiveReferences/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/a:
  {"directoryName":"/user/username/projects/transitivereferences/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/c:
  {"directoryName":"/user/username/projects/transitivereferences/c","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/refs:
  {"directoryName":"/user/username/projects/transitiveReferences/refs","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/c/node_modules/@types:
  {"directoryName":"/user/username/projects/transitiveReferences/c/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/node_modules/@types:
  {"directoryName":"/user/username/projects/transitiveReferences/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/nrefs:
  {"directoryName":"/user/username/projects/transitiveReferences/nrefs","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: Revert referenced config file edit

Input::
//// [/user/username/projects/transitiveReferences/b/tsconfig.json]
{"compilerOptions":{"composite":true,"baseUrl":"./","paths":{"@ref/*":["../refs/*"]}},"references":[{"path":"../a"}]}


Output::
>> Screen clear
[[90m12:01:42 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:43 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/transitiveReferences/c/index.ts"]
Program options: {"baseUrl":"/user/username/projects/transitiveReferences/c","paths":{"@ref/*":["../refs/*"]},"pathsBasePath":"/user/username/projects/transitiveReferences/c","watch":true,"project":"/user/username/projects/transitiveReferences/c","configFilePath":"/user/username/projects/transitiveReferences/c/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/b/index.d.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/b/index.d.ts (used version)

Dependencies for::
/a/lib/lib.d.ts:
  /a/lib/lib.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/c/index.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts:
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts:
  /user/username/projects/transitiveReferences/c/index.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts

WatchedFiles::
/user/username/projects/transitivereferences/c/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/c/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/b/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/b/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/a/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/a/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/c/index.ts:
  {"fileName":"/user/username/projects/transitiveReferences/c/index.ts","pollingInterval":250}
/user/username/projects/transitivereferences/b/index.d.ts:
  {"fileName":"/user/username/projects/transitiveReferences/b/index.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/transitivereferences/refs/a.d.ts:
  {"fileName":"/user/username/projects/transitiveReferences/refs/a.d.ts","pollingInterval":250}

FsWatches::
/user/username/projects/transitivereferences:
  {"directoryName":"/user/username/projects/transitiveReferences","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

FsWatchesRecursive::
/user/username/projects/transitivereferences/b:
  {"directoryName":"/user/username/projects/transitivereferences/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
  {"directoryName":"/user/username/projects/transitiveReferences/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/a:
  {"directoryName":"/user/username/projects/transitivereferences/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/c:
  {"directoryName":"/user/username/projects/transitivereferences/c","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/refs:
  {"directoryName":"/user/username/projects/transitiveReferences/refs","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/c/node_modules/@types:
  {"directoryName":"/user/username/projects/transitiveReferences/c/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/node_modules/@types:
  {"directoryName":"/user/username/projects/transitiveReferences/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: deleting referenced config file

Input::
//// [/user/username/projects/transitiveReferences/b/tsconfig.json] deleted

Output::
>> Screen clear
[[90m12:01:45 AM[0m] File change detected. Starting incremental compilation...

[96mc/tsconfig.json[0m:[93m1[0m:[93m84[0m - [91merror[0m[90m TS6053: [0mFile '/user/username/projects/transitiveReferences/b' not found.

[7m1[0m {"compilerOptions":{"baseUrl":"./","paths":{"@ref/*":["../refs/*"]}},"references":[{"path":"../b"}]}
[7m [0m [91m                                                                                   ~~~~~~~~~~~~~~~[0m

[[90m12:01:52 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/transitiveReferences/c/index.ts"]
Program options: {"baseUrl":"/user/username/projects/transitiveReferences/c","paths":{"@ref/*":["../refs/*"]},"pathsBasePath":"/user/username/projects/transitiveReferences/c","watch":true,"project":"/user/username/projects/transitiveReferences/c","configFilePath":"/user/username/projects/transitiveReferences/c/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/b/index.ts
/user/username/projects/transitiveReferences/c/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/b/index.ts
/user/username/projects/transitiveReferences/c/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/b/index.ts (computed .d.ts)
/user/username/projects/transitivereferences/c/index.ts (computed .d.ts)

Dependencies for::
/a/lib/lib.d.ts:
  /a/lib/lib.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b/index.ts
  /user/username/projects/transitiveReferences/c/index.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/b/index.ts:
  /user/username/projects/transitiveReferences/b/index.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts:
  /user/username/projects/transitiveReferences/c/index.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b/index.ts

WatchedFiles::
/user/username/projects/transitivereferences/c/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/c/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/b/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/b/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/c/index.ts:
  {"fileName":"/user/username/projects/transitiveReferences/c/index.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/transitivereferences/refs/a.d.ts:
  {"fileName":"/user/username/projects/transitiveReferences/refs/a.d.ts","pollingInterval":250}
/user/username/projects/transitivereferences/b/index.ts:
  {"fileName":"/user/username/projects/transitiveReferences/b/index.ts","pollingInterval":250}

FsWatches::
/user/username/projects/transitivereferences:
  {"directoryName":"/user/username/projects/transitiveReferences","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

FsWatchesRecursive::
/user/username/projects/transitivereferences/b:
  {"directoryName":"/user/username/projects/transitiveReferences/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/c:
  {"directoryName":"/user/username/projects/transitivereferences/c","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/refs:
  {"directoryName":"/user/username/projects/transitiveReferences/refs","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/c/node_modules/@types:
  {"directoryName":"/user/username/projects/transitiveReferences/c/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/node_modules/@types:
  {"directoryName":"/user/username/projects/transitiveReferences/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/transitiveReferences/b/index.js] file written with same contents
//// [/user/username/projects/transitiveReferences/c/index.js] file written with same contents

Change:: Revert deleting referenced config file

Input::
//// [/user/username/projects/transitiveReferences/b/tsconfig.json]
{"compilerOptions":{"composite":true,"baseUrl":"./","paths":{"@ref/*":["../*"]}},"references":[{"path":"../a"}]}


Output::
>> Screen clear
[[90m12:01:55 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:59 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/transitiveReferences/c/index.ts"]
Program options: {"baseUrl":"/user/username/projects/transitiveReferences/c","paths":{"@ref/*":["../refs/*"]},"pathsBasePath":"/user/username/projects/transitiveReferences/c","watch":true,"project":"/user/username/projects/transitiveReferences/c","configFilePath":"/user/username/projects/transitiveReferences/c/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/a/index.d.ts (used version)
/user/username/projects/transitivereferences/b/index.d.ts (used version)
/user/username/projects/transitivereferences/c/index.ts (computed .d.ts)

Dependencies for::
/a/lib/lib.d.ts:
  /a/lib/lib.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/c/index.ts
/user/username/projects/transitiveReferences/a/index.d.ts:
  /user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts:
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts:
  /user/username/projects/transitiveReferences/c/index.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts

WatchedFiles::
/user/username/projects/transitivereferences/c/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/c/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/b/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/b/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/c/index.ts:
  {"fileName":"/user/username/projects/transitiveReferences/c/index.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/transitivereferences/refs/a.d.ts:
  {"fileName":"/user/username/projects/transitiveReferences/refs/a.d.ts","pollingInterval":250}
/user/username/projects/transitivereferences/a/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/a/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/b/index.d.ts:
  {"fileName":"/user/username/projects/transitiveReferences/b/index.d.ts","pollingInterval":250}
/user/username/projects/transitivereferences/a/index.d.ts:
  {"fileName":"/user/username/projects/transitiveReferences/a/index.d.ts","pollingInterval":250}
/user/username/projects/transitivereferences/a/package.json:
  {"fileName":"/user/username/projects/transitivereferences/a/package.json","pollingInterval":250}

FsWatches::
/user/username/projects/transitivereferences:
  {"directoryName":"/user/username/projects/transitiveReferences","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

FsWatchesRecursive::
/user/username/projects/transitivereferences/b:
  {"directoryName":"/user/username/projects/transitiveReferences/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
  {"directoryName":"/user/username/projects/transitivereferences/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/c:
  {"directoryName":"/user/username/projects/transitivereferences/c","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/refs:
  {"directoryName":"/user/username/projects/transitiveReferences/refs","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/c/node_modules/@types:
  {"directoryName":"/user/username/projects/transitiveReferences/c/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/node_modules/@types:
  {"directoryName":"/user/username/projects/transitiveReferences/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/a:
  {"directoryName":"/user/username/projects/transitivereferences/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
  {"directoryName":"/user/username/projects/transitiveReferences/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/transitiveReferences/c/index.js] file written with same contents

Change:: deleting transitively referenced config file

Input::
//// [/user/username/projects/transitiveReferences/a/tsconfig.json] deleted

Output::
>> Screen clear
[[90m12:02:01 AM[0m] File change detected. Starting incremental compilation...

[96mb/tsconfig.json[0m:[93m1[0m:[93m96[0m - [91merror[0m[90m TS6053: [0mFile '/user/username/projects/transitiveReferences/a' not found.

[7m1[0m {"compilerOptions":{"composite":true,"baseUrl":"./","paths":{"@ref/*":["../*"]}},"references":[{"path":"../a"}]}
[7m [0m [91m                                                                                               ~~~~~~~~~~~~~~~[0m

[[90m12:02:05 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/transitiveReferences/c/index.ts"]
Program options: {"baseUrl":"/user/username/projects/transitiveReferences/c","paths":{"@ref/*":["../refs/*"]},"pathsBasePath":"/user/username/projects/transitiveReferences/c","watch":true,"project":"/user/username/projects/transitiveReferences/c","configFilePath":"/user/username/projects/transitiveReferences/c/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/transitiveReferences/a/index.ts
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/a/index.ts
/user/username/projects/transitiveReferences/b/index.d.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/a/index.ts (computed .d.ts)
/user/username/projects/transitivereferences/b/index.d.ts (used version)

Dependencies for::
/a/lib/lib.d.ts:
  /a/lib/lib.d.ts
  /user/username/projects/transitiveReferences/a/index.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/c/index.ts
/user/username/projects/transitiveReferences/a/index.ts:
  /user/username/projects/transitiveReferences/a/index.ts
/user/username/projects/transitiveReferences/b/index.d.ts:
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts:
  /user/username/projects/transitiveReferences/c/index.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.ts

WatchedFiles::
/user/username/projects/transitivereferences/c/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/c/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/b/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/b/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/c/index.ts:
  {"fileName":"/user/username/projects/transitiveReferences/c/index.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/transitivereferences/refs/a.d.ts:
  {"fileName":"/user/username/projects/transitiveReferences/refs/a.d.ts","pollingInterval":250}
/user/username/projects/transitivereferences/a/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/a/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/b/index.d.ts:
  {"fileName":"/user/username/projects/transitiveReferences/b/index.d.ts","pollingInterval":250}
/user/username/projects/transitivereferences/a/index.ts:
  {"fileName":"/user/username/projects/transitiveReferences/a/index.ts","pollingInterval":250}

FsWatches::
/user/username/projects/transitivereferences:
  {"directoryName":"/user/username/projects/transitiveReferences","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

FsWatchesRecursive::
/user/username/projects/transitivereferences/b:
  {"directoryName":"/user/username/projects/transitiveReferences/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
  {"directoryName":"/user/username/projects/transitivereferences/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/c:
  {"directoryName":"/user/username/projects/transitivereferences/c","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/refs:
  {"directoryName":"/user/username/projects/transitiveReferences/refs","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/c/node_modules/@types:
  {"directoryName":"/user/username/projects/transitiveReferences/c/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/node_modules/@types:
  {"directoryName":"/user/username/projects/transitiveReferences/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/a:
  {"directoryName":"/user/username/projects/transitiveReferences/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/transitiveReferences/a/index.js] file written with same contents

Change:: Revert deleting transitively referenced config file

Input::
//// [/user/username/projects/transitiveReferences/a/tsconfig.json]
{"compilerOptions":{"composite":true}}


Output::
>> Screen clear
[[90m12:02:08 AM[0m] File change detected. Starting incremental compilation...

[[90m12:02:09 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/transitiveReferences/c/index.ts"]
Program options: {"baseUrl":"/user/username/projects/transitiveReferences/c","paths":{"@ref/*":["../refs/*"]},"pathsBasePath":"/user/username/projects/transitiveReferences/c","watch":true,"project":"/user/username/projects/transitiveReferences/c","configFilePath":"/user/username/projects/transitiveReferences/c/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/a/index.d.ts (used version)
/user/username/projects/transitivereferences/b/index.d.ts (used version)
/user/username/projects/transitivereferences/c/index.ts (used version)

Dependencies for::
/a/lib/lib.d.ts:
  /a/lib/lib.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/c/index.ts
/user/username/projects/transitiveReferences/a/index.d.ts:
  /user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts:
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts:
  /user/username/projects/transitiveReferences/c/index.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts

WatchedFiles::
/user/username/projects/transitivereferences/c/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/c/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/b/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/b/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/c/index.ts:
  {"fileName":"/user/username/projects/transitiveReferences/c/index.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/transitivereferences/refs/a.d.ts:
  {"fileName":"/user/username/projects/transitiveReferences/refs/a.d.ts","pollingInterval":250}
/user/username/projects/transitivereferences/a/tsconfig.json:
  {"fileName":"/user/username/projects/transitiveReferences/a/tsconfig.json","pollingInterval":250}
/user/username/projects/transitivereferences/b/index.d.ts:
  {"fileName":"/user/username/projects/transitiveReferences/b/index.d.ts","pollingInterval":250}
/user/username/projects/transitivereferences/a/index.d.ts:
  {"fileName":"/user/username/projects/transitiveReferences/a/index.d.ts","pollingInterval":250}

FsWatches::
/user/username/projects/transitivereferences:
  {"directoryName":"/user/username/projects/transitiveReferences","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

FsWatchesRecursive::
/user/username/projects/transitivereferences/b:
  {"directoryName":"/user/username/projects/transitiveReferences/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
  {"directoryName":"/user/username/projects/transitivereferences/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/c:
  {"directoryName":"/user/username/projects/transitivereferences/c","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/refs:
  {"directoryName":"/user/username/projects/transitiveReferences/refs","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/c/node_modules/@types:
  {"directoryName":"/user/username/projects/transitiveReferences/c/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/node_modules/@types:
  {"directoryName":"/user/username/projects/transitiveReferences/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/transitivereferences/a:
  {"directoryName":"/user/username/projects/transitiveReferences/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
  {"directoryName":"/user/username/projects/transitivereferences/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

