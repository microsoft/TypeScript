/a/lib/tsc.js -w -p /a/b/tsconfig.json
//// [/a/b/app.ts]
let x = 10

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

//// [/a/b/tsconfig.json]

{
    // comment
    // More comment
    "compilerOptions": {
        "inlineSourceMap": true,
        "mapRoot": "./"
    }
}

//// [/a/b/app.js]
var x = 10;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQSJ9


Output::
>> Screen clear
12:00:15 AM - Starting compilation in watch mode...


a/b/tsconfig.json(6,9): error TS5053: Option 'mapRoot' cannot be specified with option 'inlineSourceMap'.

a/b/tsconfig.json(7,9): error TS5053: Option 'mapRoot' cannot be specified with option 'inlineSourceMap'.

a/b/tsconfig.json(7,9): error TS5069: Option 'mapRoot' cannot be specified without specifying option 'sourceMap' or option 'declarationMap'.


12:00:18 AM - Found 3 errors. Watching for file changes.


Program root files: ["/a/b/app.ts"]
Program options: {"inlineSourceMap":true,"mapRoot":"./","watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/a/b/app.ts

No cached semantic diagnostics in the builder::

WatchedFiles::
/a/b/tsconfig.json:
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}
/a/b/app.ts:
  {"fileName":"/a/b/app.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b:
  {"directoryName":"/a/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Remove the comment from config file

//// [/a/b/tsconfig.json]

{
    "compilerOptions": {
        "inlineSourceMap": true,
        "mapRoot": "./"
    }
}


Output::
>> Screen clear
12:00:22 AM - File change detected. Starting incremental compilation...


a/b/tsconfig.json(4,9): error TS5053: Option 'mapRoot' cannot be specified with option 'inlineSourceMap'.

a/b/tsconfig.json(5,9): error TS5053: Option 'mapRoot' cannot be specified with option 'inlineSourceMap'.

a/b/tsconfig.json(5,9): error TS5069: Option 'mapRoot' cannot be specified without specifying option 'sourceMap' or option 'declarationMap'.


12:00:23 AM - Found 3 errors. Watching for file changes.


Program root files: ["/a/b/app.ts"]
Program options: {"inlineSourceMap":true,"mapRoot":"./","watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/a/b/app.ts

No cached semantic diagnostics in the builder::

WatchedFiles::
/a/b/tsconfig.json:
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}
/a/b/app.ts:
  {"fileName":"/a/b/app.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b:
  {"directoryName":"/a/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined
