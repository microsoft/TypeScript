Input::
//// [/user/username/projects/myproject/lib/app.ts]
myapp.component("hello");

//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"module":"none","types":["@myapp/ts-types"]}}

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


/a/lib/tsc.js --w -p /user/username/projects/myproject/tsconfig.json
Output::
>> Screen clear
[[90m12:00:23 AM[0m] Starting compilation in watch mode...

[91merror[0m[90m TS2688: [0mCannot find type definition file for '@myapp/ts-types'.
  The file is in the program because:
    Entry point of type library '@myapp/ts-types' specified in compilerOptions

  [96muser/username/projects/myproject/tsconfig.json[0m:[93m1[0m:[93m46[0m
    [7m1[0m {"compilerOptions":{"module":"none","types":["@myapp/ts-types"]}}
    [7m [0m [96m                                             ~~~~~~~~~~~~~~~~~[0m
    File is entry point of type library specified here.

[[90m12:00:26 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/myproject/lib/app.ts"]
Program options: {"module":0,"types":["@myapp/ts-types"],"watch":true,"project":"/user/username/projects/myproject/tsconfig.json","configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/lib/app.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/lib/app.ts (used version)

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/lib/app.ts:
  {"fileName":"/user/username/projects/myproject/lib/app.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules:
  {"directoryName":"/user/username/projects/myproject/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/lib/app.js]
myapp.component("hello");



Change:: npm install ts-types

Input::
//// [/user/username/projects/myproject/node_modules/@myapp/ts-types/package.json]
{"version":"1.65.1","types":"types/somefile.define.d.ts"}

//// [/user/username/projects/myproject/node_modules/@myapp/ts-types/types/somefile.define.d.ts]

declare namespace myapp {
    function component(str: string): number;
}


Output::
>> Screen clear
[[90m12:00:39 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:43 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/lib/app.ts"]
Program options: {"module":0,"types":["@myapp/ts-types"],"watch":true,"project":"/user/username/projects/myproject/tsconfig.json","configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/lib/app.ts
/user/username/projects/myproject/node_modules/@myapp/ts-types/types/somefile.define.d.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/lib/app.ts
/user/username/projects/myproject/node_modules/@myapp/ts-types/types/somefile.define.d.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/node_modules/@myapp/ts-types/types/somefile.define.d.ts (used version)
/user/username/projects/myproject/lib/app.ts (computed .d.ts)

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/lib/app.ts:
  {"fileName":"/user/username/projects/myproject/lib/app.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/node_modules/@myapp/ts-types/types/somefile.define.d.ts:
  {"fileName":"/user/username/projects/myproject/node_modules/@myapp/ts-types/types/somefile.define.d.ts","pollingInterval":250}
/user/username/projects/myproject/node_modules/@myapp/ts-types/package.json:
  {"fileName":"/user/username/projects/myproject/node_modules/@myapp/ts-types/package.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules:
  {"directoryName":"/user/username/projects/myproject/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/lib/app.js] file written with same contents

Change:: No change, just check program

Input::

Output::

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/lib/app.ts:
  {"fileName":"/user/username/projects/myproject/lib/app.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/node_modules/@myapp/ts-types/types/somefile.define.d.ts:
  {"fileName":"/user/username/projects/myproject/node_modules/@myapp/ts-types/types/somefile.define.d.ts","pollingInterval":250}
/user/username/projects/myproject/node_modules/@myapp/ts-types/package.json:
  {"fileName":"/user/username/projects/myproject/node_modules/@myapp/ts-types/package.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules:
  {"directoryName":"/user/username/projects/myproject/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

