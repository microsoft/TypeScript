Input::
//// [/user/username/projects/myproject/lib1/tools/tools.interface.ts]
export interface ITest {
    title: string;
}

//// [/user/username/projects/myproject/lib1/tools/public.ts]
export * from "./tools.interface";

//// [/user/username/projects/myproject/app.ts]
import { Data } from "lib2/public";
export class App {
    public constructor() {
        new Data().test();
    }
}

//// [/user/username/projects/myproject/lib2/public.ts]
export * from "./data";

//// [/user/username/projects/myproject/lib1/public.ts]
export * from "./tools/public";

//// [/user/username/projects/myproject/lib2/data.ts]
import { ITest } from "lib1/public";
export class Data {
    public test() {
        const result: ITest = {
            title: "title"
        }
        return result;
    }
}

//// [/user/username/projects/myproject/tsconfig.json]
{"files":["app.ts"],"compilerOptions":{"baseUrl":".","declaration":true}}

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


/a/lib/tsc.js --w
Output::
>> Screen clear
[[90m12:00:37 AM[0m] Starting compilation in watch mode...


[[90m12:01:02 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/app.ts"]
Program options: {"baseUrl":"/user/username/projects/myproject","declaration":true,"watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/lib1/tools/tools.interface.ts
/user/username/projects/myproject/lib1/tools/public.ts
/user/username/projects/myproject/lib1/public.ts
/user/username/projects/myproject/lib2/data.ts
/user/username/projects/myproject/lib2/public.ts
/user/username/projects/myproject/app.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/lib1/tools/tools.interface.ts
/user/username/projects/myproject/lib1/tools/public.ts
/user/username/projects/myproject/lib1/public.ts
/user/username/projects/myproject/lib2/data.ts
/user/username/projects/myproject/lib2/public.ts
/user/username/projects/myproject/app.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/app.ts:
  {"fileName":"/user/username/projects/myproject/app.ts","pollingInterval":250}
/user/username/projects/myproject/lib2/public.ts:
  {"fileName":"/user/username/projects/myproject/lib2/public.ts","pollingInterval":250}
/user/username/projects/myproject/lib2/data.ts:
  {"fileName":"/user/username/projects/myproject/lib2/data.ts","pollingInterval":250}
/user/username/projects/myproject/lib1/public.ts:
  {"fileName":"/user/username/projects/myproject/lib1/public.ts","pollingInterval":250}
/user/username/projects/myproject/lib1/tools/public.ts:
  {"fileName":"/user/username/projects/myproject/lib1/tools/public.ts","pollingInterval":250}
/user/username/projects/myproject/lib1/tools/tools.interface.ts:
  {"fileName":"/user/username/projects/myproject/lib1/tools/tools.interface.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/lib1/tools/tools.interface.js]
"use strict";
exports.__esModule = true;


//// [/user/username/projects/myproject/lib1/tools/tools.interface.d.ts]
export interface ITest {
    title: string;
}


//// [/user/username/projects/myproject/lib1/tools/public.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
__exportStar(require("./tools.interface"), exports);


//// [/user/username/projects/myproject/lib1/tools/public.d.ts]
export * from "./tools.interface";


//// [/user/username/projects/myproject/lib1/public.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
__exportStar(require("./tools/public"), exports);


//// [/user/username/projects/myproject/lib1/public.d.ts]
export * from "./tools/public";


//// [/user/username/projects/myproject/lib2/data.js]
"use strict";
exports.__esModule = true;
exports.Data = void 0;
var Data = /** @class */ (function () {
    function Data() {
    }
    Data.prototype.test = function () {
        var result = {
            title: "title"
        };
        return result;
    };
    return Data;
}());
exports.Data = Data;


//// [/user/username/projects/myproject/lib2/data.d.ts]
import { ITest } from "lib1/public";
export declare class Data {
    test(): ITest;
}


//// [/user/username/projects/myproject/lib2/public.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
__exportStar(require("./data"), exports);


//// [/user/username/projects/myproject/lib2/public.d.ts]
export * from "./data";


//// [/user/username/projects/myproject/app.js]
"use strict";
exports.__esModule = true;
exports.App = void 0;
var public_1 = require("lib2/public");
var App = /** @class */ (function () {
    function App() {
        new public_1.Data().test();
    }
    return App;
}());
exports.App = App;


//// [/user/username/projects/myproject/app.d.ts]
export declare class App {
    constructor();
}



Change:: Rename property title to title2 of interface ITest

Input::
//// [/user/username/projects/myproject/lib1/tools/tools.interface.ts]
export interface ITest {
    title2: string;
}


Output::
>> Screen clear
[[90m12:01:06 AM[0m] File change detected. Starting incremental compilation...


[96mlib2/data.ts[0m:[93m5[0m:[93m13[0m - [91merror[0m[90m TS2322: [0mType '{ title: string; }' is not assignable to type 'ITest'.
  Object literal may only specify known properties, but 'title' does not exist in type 'ITest'. Did you mean to write 'title2'?

[7m5[0m             title: "title"
[7m [0m [91m            ~~~~~~~~~~~~~~[0m


[[90m12:01:31 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/myproject/app.ts"]
Program options: {"baseUrl":"/user/username/projects/myproject","declaration":true,"watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/lib1/tools/tools.interface.ts
/user/username/projects/myproject/lib1/tools/public.ts
/user/username/projects/myproject/lib1/public.ts
/user/username/projects/myproject/lib2/data.ts
/user/username/projects/myproject/lib2/public.ts
/user/username/projects/myproject/app.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/lib1/tools/tools.interface.ts
/user/username/projects/myproject/lib1/tools/public.ts
/user/username/projects/myproject/lib1/public.ts
/user/username/projects/myproject/lib2/data.ts
/user/username/projects/myproject/lib2/public.ts
/user/username/projects/myproject/app.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/app.ts:
  {"fileName":"/user/username/projects/myproject/app.ts","pollingInterval":250}
/user/username/projects/myproject/lib2/public.ts:
  {"fileName":"/user/username/projects/myproject/lib2/public.ts","pollingInterval":250}
/user/username/projects/myproject/lib2/data.ts:
  {"fileName":"/user/username/projects/myproject/lib2/data.ts","pollingInterval":250}
/user/username/projects/myproject/lib1/public.ts:
  {"fileName":"/user/username/projects/myproject/lib1/public.ts","pollingInterval":250}
/user/username/projects/myproject/lib1/tools/public.ts:
  {"fileName":"/user/username/projects/myproject/lib1/tools/public.ts","pollingInterval":250}
/user/username/projects/myproject/lib1/tools/tools.interface.ts:
  {"fileName":"/user/username/projects/myproject/lib1/tools/tools.interface.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/lib1/tools/tools.interface.js] file written with same contents
//// [/user/username/projects/myproject/lib1/tools/tools.interface.d.ts]
export interface ITest {
    title2: string;
}


//// [/user/username/projects/myproject/lib1/tools/public.js] file written with same contents
//// [/user/username/projects/myproject/lib1/tools/public.d.ts] file written with same contents
//// [/user/username/projects/myproject/lib1/public.d.ts] file written with same contents
//// [/user/username/projects/myproject/lib2/data.d.ts] file written with same contents
//// [/user/username/projects/myproject/lib2/public.d.ts] file written with same contents
//// [/user/username/projects/myproject/app.d.ts] file written with same contents
