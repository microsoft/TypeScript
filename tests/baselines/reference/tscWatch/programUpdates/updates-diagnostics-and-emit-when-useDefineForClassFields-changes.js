/a/lib/tsc.js -w
//// [/a.ts]
class C { get prop() { return 1; } }
class D extends C { prop = 1; }

//// [/tsconfig.json]
{"compilerOptions":{"target":"es6"}}

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

//// [/a.js]
class C {
    get prop() { return 1; }
}
class D extends C {
    constructor() {
        super(...arguments);
        this.prop = 1;
    }
}



Output::
>> Screen clear
12:00:13 AM - Starting compilation in watch mode...



12:00:16 AM - Found 0 errors. Watching for file changes.


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

Change:: Enable useDefineForClassFields

//// [/tsconfig.json]
{"compilerOptions":{"target":"es6","useDefineForClassFields":true}}

//// [/a.js]
class C {
    get prop() { return 1; }
}
class D extends C {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "prop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
    }
}



Output::
>> Screen clear
12:00:20 AM - File change detected. Starting incremental compilation...


a.ts(2,21): error TS2610: 'prop' is defined as an accessor in class 'C', but is overridden here in 'D' as an instance property.


12:00:24 AM - Found 1 error. Watching for file changes.


Program root files: ["/a.ts","/a/lib/lib.d.ts"]
Program options: {"target":2,"useDefineForClassFields":true,"watch":true,"configFilePath":"/tsconfig.json"}
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
