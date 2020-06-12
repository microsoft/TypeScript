Input::
//// [/a/b/app.ts]
let x = 10

//// [/a/b/tsconfig.json]
{
                        "compilerOptions": {
                            "foo": "bar",
                            "allowJS": true
                        }
                    }

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


/a/lib/tsc.js -w -p /a/b/tsconfig.json
Output::
>> Screen clear
[[90m12:00:15 AM[0m] Starting compilation in watch mode...


[96ma/b/tsconfig.json[0m:[93m3[0m:[93m29[0m - [91merror[0m[90m TS5023: [0mUnknown compiler option 'foo'.

[7m3[0m                             "foo": "bar",
[7m [0m [91m                            ~~~~~[0m


[96ma/b/tsconfig.json[0m:[93m4[0m:[93m29[0m - [91merror[0m[90m TS5025: [0mUnknown compiler option 'allowJS'. Did you mean 'allowJs'?

[7m4[0m                             "allowJS": true
[7m [0m [91m                            ~~~~~~~~~[0m


[[90m12:00:18 AM[0m] Found 2 errors. Watching for file changes.



Program root files: ["/a/b/app.ts"]
Program options: {"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/a/b/app.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/app.ts

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

//// [/a/b/app.js]
var x = 10;


