Input::
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


/a/lib/tsc.js -w
Output::
>> Screen clear
[[90m12:00:13 AM[0m] Starting compilation in watch mode...


[96ma.ts[0m:[93m2[0m:[93m21[0m - [91merror[0m[90m TS2610: [0m'prop' is defined as an accessor in class 'C', but is overridden here in 'D' as an instance property.

[7m2[0m class D extends C { prop = 1; }
[7m [0m [91m                    ~~~~[0m


[[90m12:00:16 AM[0m] Found 1 error. Watching for file changes.



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
  {"fileName":"/tsconfig.json","pollingInterval":250}
/a.ts:
  {"fileName":"/a.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/:
  {"directoryName":"","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

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



Change:: Enable useDefineForClassFields

Input::
//// [/tsconfig.json]
{"compilerOptions":{"target":"es6","useDefineForClassFields":true}}


Output::
>> Screen clear
[[90m12:00:20 AM[0m] File change detected. Starting incremental compilation...


[96ma.ts[0m:[93m2[0m:[93m21[0m - [91merror[0m[90m TS2610: [0m'prop' is defined as an accessor in class 'C', but is overridden here in 'D' as an instance property.

[7m2[0m class D extends C { prop = 1; }
[7m [0m [91m                    ~~~~[0m


[[90m12:00:24 AM[0m] Found 1 error. Watching for file changes.



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
  {"fileName":"/tsconfig.json","pollingInterval":250}
/a.ts:
  {"fileName":"/a.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/:
  {"directoryName":"","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

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


