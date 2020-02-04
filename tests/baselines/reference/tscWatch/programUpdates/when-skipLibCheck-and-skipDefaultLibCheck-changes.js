/a/lib/tsc.js -w
//// [/user/username/projects/myproject/a.ts]
interface Document {
    fullscreen: boolean;
}

//// [/user/username/projects/myproject/b.d.ts]
interface Document {
    fullscreen: boolean;
}

//// [/user/username/projects/myproject/tsconfig.json]
{}

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
interface Document {
    readonly fullscreen: boolean;
}

//// [/user/username/projects/myproject/a.js]



Output::
>> Screen clear
12:00:23 AM - Starting compilation in watch mode...


../../../../a/lib/lib.d.ts(13,14): error TS2687: All declarations of 'fullscreen' must have identical modifiers.

a.ts(2,5): error TS2687: All declarations of 'fullscreen' must have identical modifiers.

b.d.ts(2,5): error TS2687: All declarations of 'fullscreen' must have identical modifiers.


12:00:26 AM - Found 3 errors. Watching for file changes.


Program root files: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.d.ts"]
Program options: {"watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.d.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.d.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/a.ts:
  {"fileName":"/user/username/projects/myproject/a.ts","pollingInterval":250}
/user/username/projects/myproject/b.d.ts:
  {"fileName":"/user/username/projects/myproject/b.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Changing config to {"compilerOptions":{"skipLibCheck":true}}

//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"skipLibCheck":true}}


Output::
>> Screen clear
12:00:30 AM - File change detected. Starting incremental compilation...


a.ts(2,5): error TS2687: All declarations of 'fullscreen' must have identical modifiers.


12:00:31 AM - Found 1 error. Watching for file changes.


Program root files: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.d.ts"]
Program options: {"skipLibCheck":true,"watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.d.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/b.d.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/a.ts:
  {"fileName":"/user/username/projects/myproject/a.ts","pollingInterval":250}
/user/username/projects/myproject/b.d.ts:
  {"fileName":"/user/username/projects/myproject/b.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Changing config to {"compilerOptions":{"skipDefaultLibCheck":true}}

//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"skipDefaultLibCheck":true}}


Output::
>> Screen clear
12:00:35 AM - File change detected. Starting incremental compilation...


a.ts(2,5): error TS2687: All declarations of 'fullscreen' must have identical modifiers.

b.d.ts(2,5): error TS2687: All declarations of 'fullscreen' must have identical modifiers.


12:00:36 AM - Found 2 errors. Watching for file changes.


Program root files: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.d.ts"]
Program options: {"skipDefaultLibCheck":true,"watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.d.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/b.d.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/a.ts:
  {"fileName":"/user/username/projects/myproject/a.ts","pollingInterval":250}
/user/username/projects/myproject/b.d.ts:
  {"fileName":"/user/username/projects/myproject/b.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Changing config to {"compilerOptions":{}}

//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{}}


Output::
>> Screen clear
12:00:40 AM - File change detected. Starting incremental compilation...


../../../../a/lib/lib.d.ts(13,14): error TS2687: All declarations of 'fullscreen' must have identical modifiers.

a.ts(2,5): error TS2687: All declarations of 'fullscreen' must have identical modifiers.

b.d.ts(2,5): error TS2687: All declarations of 'fullscreen' must have identical modifiers.


12:00:41 AM - Found 3 errors. Watching for file changes.


Program root files: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.d.ts"]
Program options: {"watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.d.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/a.ts:
  {"fileName":"/user/username/projects/myproject/a.ts","pollingInterval":250}
/user/username/projects/myproject/b.d.ts:
  {"fileName":"/user/username/projects/myproject/b.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Changing config to {"compilerOptions":{"skipDefaultLibCheck":true}}

//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"skipDefaultLibCheck":true}}


Output::
>> Screen clear
12:00:45 AM - File change detected. Starting incremental compilation...


a.ts(2,5): error TS2687: All declarations of 'fullscreen' must have identical modifiers.

b.d.ts(2,5): error TS2687: All declarations of 'fullscreen' must have identical modifiers.


12:00:46 AM - Found 2 errors. Watching for file changes.


Program root files: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.d.ts"]
Program options: {"skipDefaultLibCheck":true,"watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.d.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/a.ts:
  {"fileName":"/user/username/projects/myproject/a.ts","pollingInterval":250}
/user/username/projects/myproject/b.d.ts:
  {"fileName":"/user/username/projects/myproject/b.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Changing config to {"compilerOptions":{"skipLibCheck":true}}

//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"skipLibCheck":true}}


Output::
>> Screen clear
12:00:50 AM - File change detected. Starting incremental compilation...


a.ts(2,5): error TS2687: All declarations of 'fullscreen' must have identical modifiers.


12:00:51 AM - Found 1 error. Watching for file changes.


Program root files: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.d.ts"]
Program options: {"skipLibCheck":true,"watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.d.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/b.d.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/a.ts:
  {"fileName":"/user/username/projects/myproject/a.ts","pollingInterval":250}
/user/username/projects/myproject/b.d.ts:
  {"fileName":"/user/username/projects/myproject/b.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Changing config to {"compilerOptions":{}}

//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{}}


Output::
>> Screen clear
12:00:55 AM - File change detected. Starting incremental compilation...


../../../../a/lib/lib.d.ts(13,14): error TS2687: All declarations of 'fullscreen' must have identical modifiers.

a.ts(2,5): error TS2687: All declarations of 'fullscreen' must have identical modifiers.

b.d.ts(2,5): error TS2687: All declarations of 'fullscreen' must have identical modifiers.


12:00:56 AM - Found 3 errors. Watching for file changes.


Program root files: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.d.ts"]
Program options: {"watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.d.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/b.d.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/a.ts:
  {"fileName":"/user/username/projects/myproject/a.ts","pollingInterval":250}
/user/username/projects/myproject/b.d.ts:
  {"fileName":"/user/username/projects/myproject/b.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined
