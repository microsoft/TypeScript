currentDirectory:: /user/username/workspace/solution/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/user/username/workspace/solution/projects/project/app.ts]
let x = 10

//// [/user/username/workspace/solution/projects/project/tsconfig.json]
{
                        "compilerOptions": {
                            "foo": "bar",
                            "allowJS": true
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

[96mtsconfig.json[0m:[93m3[0m:[93m29[0m - [91merror[0m[90m TS5023: [0mUnknown compiler option 'foo'.

[7m3[0m                             "foo": "bar",
[7m [0m [91m                            ~~~~~[0m

[96mtsconfig.json[0m:[93m4[0m:[93m29[0m - [91merror[0m[90m TS5025: [0mUnknown compiler option 'allowJS'. Did you mean 'allowJs'?

[7m4[0m                             "allowJS": true
[7m [0m [91m                            ~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 2 errors. Watching for file changes.



//// [/user/username/workspace/solution/projects/project/app.js]
var x = 10;



PolledWatches::
/user/username/workspace/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/workspace/solution/projects/project/app.ts: *new*
  {}
/user/username/workspace/solution/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/workspace/solution/projects/project: *new*
  {}

Program root files: [
  "/user/username/workspace/solution/projects/project/app.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/user/username/workspace/solution/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/app.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/app.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/workspace/solution/projects/project/app.ts (used version)

exitCode:: ExitStatus.undefined
