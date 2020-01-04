/a/lib/tsc.js --w
//// [/user/username/projects/myproject/a.ts]
export interface Point {
    name: string;
    c: Coords;
}
export interface Coords {
    x2: number;
    y: number;
}

//// [/user/username/projects/myproject/b.ts]
import { Point } from "./a";
export interface PointWrapper extends Point {
}

//// [/user/username/projects/myproject/c.ts]
import { PointWrapper } from "./b";
export function getPoint(): PointWrapper {
    return {
        name: "test",
        c: {
            x: 1,
            y: 2
        }
    }
};

//// [/user/username/projects/myproject/d.ts]
import { getPoint } from "./c";
getPoint().c.x;

//// [/user/username/projects/myproject/e.ts]
import "./d";

//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"assumeChangesOnlyAffectDirectDependencies":true}}

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

//// [/user/username/projects/myproject/a.js]
"use strict";
exports.__esModule = true;


//// [/user/username/projects/myproject/b.js]
"use strict";
exports.__esModule = true;


//// [/user/username/projects/myproject/c.js]
"use strict";
exports.__esModule = true;
function getPoint() {
    return {
        name: "test",
        c: {
            x: 1,
            y: 2
        }
    };
}
exports.getPoint = getPoint;
;


//// [/user/username/projects/myproject/d.js]
"use strict";
exports.__esModule = true;
var c_1 = require("./c");
c_1.getPoint().c.x;


//// [/user/username/projects/myproject/e.js]
"use strict";
exports.__esModule = true;
require("./d");



Output::
>> Screen clear
12:00:29 AM - Starting compilation in watch mode...


c.ts(6,13): error TS2322: Type '{ x: number; y: number; }' is not assignable to type 'Coords'.
  Object literal may only specify known properties, and 'x' does not exist in type 'Coords'.

d.ts(2,14): error TS2339: Property 'x' does not exist on type 'Coords'.


12:00:40 AM - Found 2 errors. Watching for file changes.


Program root files: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.ts","/user/username/projects/myproject/c.ts","/user/username/projects/myproject/d.ts","/user/username/projects/myproject/e.ts"]
Program options: {"assumeChangesOnlyAffectDirectDependencies":true,"watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/d.ts
/user/username/projects/myproject/e.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/d.ts
/user/username/projects/myproject/e.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":250}
/user/username/projects/myproject/a.ts:
  {"pollingInterval":250}
/user/username/projects/myproject/b.ts:
  {"pollingInterval":250}
/user/username/projects/myproject/c.ts:
  {"pollingInterval":250}
/user/username/projects/myproject/d.ts:
  {"pollingInterval":250}
/user/username/projects/myproject/e.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Rename property x2 to x of interface Coords

//// [/user/username/projects/myproject/a.ts]
export interface Point {
    name: string;
    c: Coords;
}
export interface Coords {
    x: number;
    y: number;
}

//// [/user/username/projects/myproject/a.js] file written with same contents
//// [/user/username/projects/myproject/b.js] file written with same contents

Output::
>> Screen clear
12:00:44 AM - File change detected. Starting incremental compilation...


c.ts(6,13): error TS2322: Type '{ x: number; y: number; }' is not assignable to type 'Coords'.
  Object literal may only specify known properties, and 'x' does not exist in type 'Coords'.

d.ts(2,14): error TS2339: Property 'x' does not exist on type 'Coords'.


12:00:51 AM - Found 2 errors. Watching for file changes.


Program root files: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.ts","/user/username/projects/myproject/c.ts","/user/username/projects/myproject/d.ts","/user/username/projects/myproject/e.ts"]
Program options: {"assumeChangesOnlyAffectDirectDependencies":true,"watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/d.ts
/user/username/projects/myproject/e.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":250}
/user/username/projects/myproject/a.ts:
  {"pollingInterval":250}
/user/username/projects/myproject/b.ts:
  {"pollingInterval":250}
/user/username/projects/myproject/c.ts:
  {"pollingInterval":250}
/user/username/projects/myproject/d.ts:
  {"pollingInterval":250}
/user/username/projects/myproject/e.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined
