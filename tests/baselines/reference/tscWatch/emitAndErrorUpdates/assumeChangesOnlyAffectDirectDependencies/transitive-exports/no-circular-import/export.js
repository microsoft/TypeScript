currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/lib1/tools/toolsinterface.ts]
export interface ITest {
    title: string;
}

//// [/user/username/projects/myproject/lib1/tools/public.ts]
export * from "./toolsinterface";

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
{
  "files": [
    "app.ts"
  ],
  "compilerOptions": {
    "baseUrl": "."
  }
}

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


/home/src/tslibs/TS/Lib/tsc.js --w --assumeChangesOnlyAffectDirectDependencies
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/lib1/tools/toolsinterface.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/myproject/lib1/tools/public.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./toolsinterface"), exports);


//// [/user/username/projects/myproject/lib1/public.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./tools/public"), exports);


//// [/user/username/projects/myproject/lib2/data.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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


//// [/user/username/projects/myproject/lib2/public.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./data"), exports);


//// [/user/username/projects/myproject/app.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var public_1 = require("lib2/public");
var App = /** @class */ (function () {
    function App() {
        new public_1.Data().test();
    }
    return App;
}());
exports.App = App;



PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/app.ts: *new*
  {}
/user/username/projects/myproject/lib1/public.ts: *new*
  {}
/user/username/projects/myproject/lib1/tools/public.ts: *new*
  {}
/user/username/projects/myproject/lib1/tools/toolsinterface.ts: *new*
  {}
/user/username/projects/myproject/lib2/data.ts: *new*
  {}
/user/username/projects/myproject/lib2/public.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/app.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/myproject",
  "watch": true,
  "assumeChangesOnlyAffectDirectDependencies": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/lib1/tools/toolsinterface.ts
/user/username/projects/myproject/lib1/tools/public.ts
/user/username/projects/myproject/lib1/public.ts
/user/username/projects/myproject/lib2/data.ts
/user/username/projects/myproject/lib2/public.ts
/user/username/projects/myproject/app.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/lib1/tools/toolsinterface.ts
/user/username/projects/myproject/lib1/tools/public.ts
/user/username/projects/myproject/lib1/public.ts
/user/username/projects/myproject/lib2/data.ts
/user/username/projects/myproject/lib2/public.ts
/user/username/projects/myproject/app.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/lib1/tools/toolsinterface.ts (used version)
/user/username/projects/myproject/lib1/tools/public.ts (used version)
/user/username/projects/myproject/lib1/public.ts (used version)
/user/username/projects/myproject/lib2/data.ts (used version)
/user/username/projects/myproject/lib2/public.ts (used version)
/user/username/projects/myproject/app.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Rename property title to title2 of interface ITest to initialize signatures

Input::
//// [/user/username/projects/myproject/lib1/tools/toolsinterface.ts]
export interface ITest {
    title2: string;
}


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mlib2/data.ts[0m:[93m5[0m:[93m13[0m - [91merror[0m[90m TS2561: [0mObject literal may only specify known properties, but 'title' does not exist in type 'ITest'. Did you mean to write 'title2'?

[7m5[0m             title: "title"
[7m [0m [91m            ~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/lib1/tools/toolsinterface.js] file written with same contents
//// [/user/username/projects/myproject/lib1/tools/public.js] file written with same contents
//// [/user/username/projects/myproject/lib1/public.js] file written with same contents
//// [/user/username/projects/myproject/lib2/data.js] file written with same contents
//// [/user/username/projects/myproject/lib2/public.js] file written with same contents
//// [/user/username/projects/myproject/app.js] file written with same contents


Program root files: [
  "/user/username/projects/myproject/app.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/myproject",
  "watch": true,
  "assumeChangesOnlyAffectDirectDependencies": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/lib1/tools/toolsinterface.ts
/user/username/projects/myproject/lib1/tools/public.ts
/user/username/projects/myproject/lib1/public.ts
/user/username/projects/myproject/lib2/data.ts
/user/username/projects/myproject/lib2/public.ts
/user/username/projects/myproject/app.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/lib1/tools/toolsinterface.ts
/user/username/projects/myproject/lib1/tools/public.ts
/user/username/projects/myproject/lib1/public.ts
/user/username/projects/myproject/lib2/data.ts
/user/username/projects/myproject/lib2/public.ts
/user/username/projects/myproject/app.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/lib1/tools/toolsinterface.ts (computed .d.ts)
/user/username/projects/myproject/lib1/tools/public.ts (computed .d.ts)
/user/username/projects/myproject/lib1/public.ts (computed .d.ts)
/user/username/projects/myproject/lib2/data.ts (computed .d.ts)
/user/username/projects/myproject/lib2/public.ts (computed .d.ts)
/user/username/projects/myproject/app.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Rename property title2 to title of interface ITest to revert back to original text

Input::
//// [/user/username/projects/myproject/lib1/tools/toolsinterface.ts]
export interface ITest {
    title: string;
}


Timeout callback:: count: 1
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
2: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mlib2/data.ts[0m:[93m5[0m:[93m13[0m - [91merror[0m[90m TS2561: [0mObject literal may only specify known properties, but 'title' does not exist in type 'ITest'. Did you mean to write 'title2'?

[7m5[0m             title: "title"
[7m [0m [91m            ~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/lib1/tools/toolsinterface.js] file written with same contents
//// [/user/username/projects/myproject/lib1/tools/public.js] file written with same contents


Program root files: [
  "/user/username/projects/myproject/app.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/myproject",
  "watch": true,
  "assumeChangesOnlyAffectDirectDependencies": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/lib1/tools/toolsinterface.ts
/user/username/projects/myproject/lib1/tools/public.ts
/user/username/projects/myproject/lib1/public.ts
/user/username/projects/myproject/lib2/data.ts
/user/username/projects/myproject/lib2/public.ts
/user/username/projects/myproject/app.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/lib1/tools/toolsinterface.ts
/user/username/projects/myproject/lib1/tools/public.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/lib1/tools/toolsinterface.ts (computed .d.ts)
/user/username/projects/myproject/lib1/tools/public.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Rename property title to title2 of interface ITest

Input::
//// [/user/username/projects/myproject/lib1/tools/toolsinterface.ts]
export interface ITest {
    title2: string;
}


Timeout callback:: count: 1
3: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
3: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mlib2/data.ts[0m:[93m5[0m:[93m13[0m - [91merror[0m[90m TS2561: [0mObject literal may only specify known properties, but 'title' does not exist in type 'ITest'. Did you mean to write 'title2'?

[7m5[0m             title: "title"
[7m [0m [91m            ~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/lib1/tools/toolsinterface.js] file written with same contents
//// [/user/username/projects/myproject/lib1/tools/public.js] file written with same contents


Program root files: [
  "/user/username/projects/myproject/app.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/myproject",
  "watch": true,
  "assumeChangesOnlyAffectDirectDependencies": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/lib1/tools/toolsinterface.ts
/user/username/projects/myproject/lib1/tools/public.ts
/user/username/projects/myproject/lib1/public.ts
/user/username/projects/myproject/lib2/data.ts
/user/username/projects/myproject/lib2/public.ts
/user/username/projects/myproject/app.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/lib1/tools/toolsinterface.ts
/user/username/projects/myproject/lib1/tools/public.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/lib1/tools/toolsinterface.ts (computed .d.ts)
/user/username/projects/myproject/lib1/tools/public.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
