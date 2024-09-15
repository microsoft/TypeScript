currentDirectory:: /user/username/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/project/a.ts]
class C { get prop() { return 1; } }
class D extends C { prop = 1; }

//// [/user/username/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "target": "es6"
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


/home/src/tslibs/TS/Lib/tsc.js -w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96ma.ts[0m:[93m2[0m:[93m21[0m - [91merror[0m[90m TS2610: [0m'prop' is defined as an accessor in class 'C', but is overridden here in 'D' as an instance property.

[7m2[0m class D extends C { prop = 1; }
[7m [0m [91m                    ~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/tslibs/TS/Lib/lib.es6.d.ts] *Lib*

//// [/user/username/projects/project/a.js]
class C {
    get prop() { return 1; }
}
class D extends C {
    constructor() {
        super(...arguments);
        this.prop = 1;
    }
}



PolledWatches::
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts: *new*
  {}
/user/username/projects/project/a.ts: *new*
  {}
/user/username/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/project: *new*
  {}

Program root files: [
  "/user/username/projects/project/a.ts"
]
Program options: {
  "target": 2,
  "watch": true,
  "configFilePath": "/user/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
/user/username/projects/project/a.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
/user/username/projects/project/a.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es6.d.ts (used version)
/user/username/projects/project/a.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Enable useDefineForClassFields

Input::
//// [/user/username/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "target": "es6",
    "useDefineForClassFields": true
  }
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

[96ma.ts[0m:[93m2[0m:[93m21[0m - [91merror[0m[90m TS2610: [0m'prop' is defined as an accessor in class 'C', but is overridden here in 'D' as an instance property.

[7m2[0m class D extends C { prop = 1; }
[7m [0m [91m                    ~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/project/a.js]
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




Program root files: [
  "/user/username/projects/project/a.ts"
]
Program options: {
  "target": 2,
  "useDefineForClassFields": true,
  "watch": true,
  "configFilePath": "/user/username/projects/project/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
/user/username/projects/project/a.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
/user/username/projects/project/a.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
