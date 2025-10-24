currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/lib/app.ts]
myapp.component("hello");

//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "module": "none",
    "types": [
      "@myapp/ts-types"
    ]
  }
}

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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


/home/src/tslibs/TS/Lib/tsc.js --w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[91merror[0m[90m TS2688: [0mCannot find type definition file for '@myapp/ts-types'.
  The file is in the program because:
    Entry point of type library '@myapp/ts-types' specified in compilerOptions

  [96mtsconfig.json[0m:[93m5[0m:[93m7[0m
    [7m5[0m       "@myapp/ts-types"
    [7m [0m [96m      ~~~~~~~~~~~~~~~~~[0m
    File is entry point of type library specified here.

[96mtsconfig.json[0m:[93m2[0m:[93m3[0m - [91merror[0m[90m TS5095: [0mOption 'bundler' can only be used when 'module' is set to 'preserve', 'commonjs', or 'es2015' or later.

[7m2[0m   "compilerOptions": {
[7m [0m [91m  ~~~~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5071: [0mOption '--resolveJsonModule' cannot be specified when 'module' is set to 'none', 'system', or 'umd'.

[7m3[0m     "module": "none",
[7m [0m [91m    ~~~~~~~~[0m

[96mtsconfig.json[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=None' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "module": "none",
[7m [0m [91m              ~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 4 errors. Watching for file changes.



//// [/user/username/projects/myproject/lib/app.js]
myapp.component("hello");



PolledWatches::
/user/username/projects/myproject/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/lib/app.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/lib/app.ts"
]
Program options: {
  "module": 0,
  "types": [
    "@myapp/ts-types"
  ],
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/lib/app.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/lib/app.ts (used version)

exitCode:: ExitStatus.undefined

Change:: npm install ts-types

Input::
//// [/user/username/projects/myproject/node_modules/@myapp/ts-types/package.json]
{
  "version": "1.65.1",
  "types": "types/somefile.define.d.ts"
}

//// [/user/username/projects/myproject/node_modules/@myapp/ts-types/types/somefile.define.d.ts]

declare namespace myapp {
    function component(str: string): number;
}


Output::
sysLog:: /user/username/projects/myproject/node_modules:: Changing watcher to PresentFileSystemEntryWatcher


PolledWatches::
/user/username/projects/node_modules:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/myproject/lib/app.ts:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/node_modules: *new*
  {}

Timeout callback:: count: 2
12: timerToInvalidateFailedLookupResolutions *new*
13: timerToUpdateProgram *new*

Before running Timeout callback:: count: 2
12: timerToInvalidateFailedLookupResolutions
13: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
13: timerToUpdateProgram *deleted*
14: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
14: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mtsconfig.json[0m:[93m2[0m:[93m3[0m - [91merror[0m[90m TS5095: [0mOption 'bundler' can only be used when 'module' is set to 'preserve', 'commonjs', or 'es2015' or later.

[7m2[0m   "compilerOptions": {
[7m [0m [91m  ~~~~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5071: [0mOption '--resolveJsonModule' cannot be specified when 'module' is set to 'none', 'system', or 'umd'.

[7m3[0m     "module": "none",
[7m [0m [91m    ~~~~~~~~[0m

[96mtsconfig.json[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=None' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "module": "none",
[7m [0m [91m              ~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 3 errors. Watching for file changes.



//// [/user/username/projects/myproject/lib/app.js] file written with same contents

PolledWatches::
/user/username/projects/myproject/node_modules/@myapp/ts-types/types/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/myproject/lib/app.ts:
  {}
/user/username/projects/myproject/node_modules/@myapp/ts-types/package.json: *new*
  {}
/user/username/projects/myproject/node_modules/@myapp/ts-types/types/somefile.define.d.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/node_modules:
  {}


Program root files: [
  "/user/username/projects/myproject/lib/app.ts"
]
Program options: {
  "module": 0,
  "types": [
    "@myapp/ts-types"
  ],
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/lib/app.ts
/user/username/projects/myproject/node_modules/@myapp/ts-types/types/somefile.define.d.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/user/username/projects/myproject/node_modules/@myapp/ts-types/types/somefile.define.d.ts (used version)
/user/username/projects/myproject/lib/app.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: No change, just check program

Input::


exitCode:: ExitStatus.undefined
