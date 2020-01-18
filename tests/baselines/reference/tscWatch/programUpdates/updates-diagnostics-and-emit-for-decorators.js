/a/lib/tsc.js -w
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

//// [/a.ts]
@((_) => {})
export class C {
    constructor(p: number) {}
}

//// [/tsconfig.json]
{"compilerOptions":{"target":"es6"}}

//// [/a.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let C = class C {
    constructor(p) { }
};
C = __decorate([
    ((_) => { })
], C);
export { C };



Output::
>> Screen clear
12:00:13 AM - Starting compilation in watch mode...


a.ts(2,14): error TS1219: Experimental support for decorators is a feature that is subject to change in a future release. Set the 'experimentalDecorators' option in your 'tsconfig' or 'jsconfig' to remove this warning.


12:00:16 AM - Found 1 error. Watching for file changes.


Program root files: ["/a.ts","/a/lib/lib.d.ts"]
Program options: {"target":2,"watch":true,"configFilePath":"/tsconfig.json"}
Program files::
/a.ts
/a/lib/lib.d.ts

Semantic diagnostics in builder refreshed for::
/a.ts
/a/lib/lib.d.ts

WatchedFiles::
/tsconfig.json:
  {"pollingInterval":250}
/a.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Enable experimentalDecorators

//// [/tsconfig.json]
{"compilerOptions":{"target":"es6","experimentalDecorators":true}}


Output::
>> Screen clear
12:00:19 AM - File change detected. Starting incremental compilation...



12:00:20 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a.ts","/a/lib/lib.d.ts"]
Program options: {"target":2,"experimentalDecorators":true,"watch":true,"configFilePath":"/tsconfig.json"}
Program files::
/a.ts
/a/lib/lib.d.ts

Semantic diagnostics in builder refreshed for::
/a.ts
/a/lib/lib.d.ts

WatchedFiles::
/tsconfig.json:
  {"pollingInterval":250}
/a.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Enable emitDecoratorMetadata

//// [/tsconfig.json]
{"compilerOptions":{"target":"es6","experimentalDecorators":true,"emitDecoratorMetadata":true}}

//// [/a.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let C = class C {
    constructor(p) { }
};
C = __decorate([
    ((_) => { }),
    __metadata("design:paramtypes", [Number])
], C);
export { C };



Output::
>> Screen clear
12:00:23 AM - File change detected. Starting incremental compilation...



12:00:27 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a.ts","/a/lib/lib.d.ts"]
Program options: {"target":2,"experimentalDecorators":true,"emitDecoratorMetadata":true,"watch":true,"configFilePath":"/tsconfig.json"}
Program files::
/a.ts
/a/lib/lib.d.ts

Semantic diagnostics in builder refreshed for::
/a.ts
/a/lib/lib.d.ts

WatchedFiles::
/tsconfig.json:
  {"pollingInterval":250}
/a.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined
