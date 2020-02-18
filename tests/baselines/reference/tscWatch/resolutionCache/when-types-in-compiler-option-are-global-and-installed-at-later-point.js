/a/lib/tsc.js --w -p /user/username/projects/myproject/tsconfig.json
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

//// [/user/username/projects/myproject/lib/app.js]
myapp.component("hello");



Output::
>> Screen clear
12:00:23 AM - Starting compilation in watch mode...


error TS2688: Cannot find type definition file for '@myapp/ts-types'.


12:00:26 AM - Found 1 error. Watching for file changes.


Program root files: ["/user/username/projects/myproject/lib/app.ts"]
Program options: {"module":0,"types":["@myapp/ts-types"],"watch":true,"project":"/user/username/projects/myproject/tsconfig.json","configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/lib/app.ts

No cached semantic diagnostics in the builder::

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

Change:: npm install ts-types

//// [/user/username/projects/myproject/lib/app.js] file written with same contents
//// [/user/username/projects/myproject/node_modules/@myapp/ts-types/package.json]
{"version":"1.65.1","types":"types/somefile.define.d.ts"}

//// [/user/username/projects/myproject/node_modules/@myapp/ts-types/types/somefile.define.d.ts]

declare namespace myapp {
    function component(str: string): number;
}


Output::
>> Screen clear
12:00:39 AM - File change detected. Starting incremental compilation...



12:00:43 AM - Found 0 errors. Watching for file changes.


Program root files: ["/user/username/projects/myproject/lib/app.ts"]
Program options: {"module":0,"types":["@myapp/ts-types"],"watch":true,"project":"/user/username/projects/myproject/tsconfig.json","configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/lib/app.ts
/user/username/projects/myproject/node_modules/@myapp/ts-types/types/somefile.define.d.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/lib/app.ts
/user/username/projects/myproject/node_modules/@myapp/ts-types/types/somefile.define.d.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/lib/app.ts:
  {"fileName":"/user/username/projects/myproject/lib/app.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/node_modules/@myapp/ts-types/types/somefile.define.d.ts:
  {"fileName":"/user/username/projects/myproject/node_modules/@myapp/ts-types/types/somefile.define.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules:
  {"directoryName":"/user/username/projects/myproject/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined
