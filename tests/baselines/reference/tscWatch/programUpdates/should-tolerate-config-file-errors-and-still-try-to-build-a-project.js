currentDirectory:: /user/username/workspace/solution/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/user/username/workspace/solution/projects/project/commonFile1.ts]
let x = 1

//// [/user/username/workspace/solution/projects/project/commonFile2.ts]
let y = 1

//// [/user/username/workspace/solution/projects/project/tsconfig.json]
{
                        "compilerOptions": {
                            "module": "none",
                            "allowAnything": true
                        },
                        "someOtherProperty": {}
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


/home/src/tslibs/TS/Lib/tsc.js -w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mtsconfig.json[0m:[93m2[0m:[93m25[0m - [91merror[0m[90m TS5095: [0mOption 'bundler' can only be used when 'module' is set to 'preserve', 'commonjs', or 'es2015' or later.

[7m2[0m                         "compilerOptions": {
[7m [0m [91m                        ~~~~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m3[0m:[93m29[0m - [91merror[0m[90m TS5071: [0mOption '--resolveJsonModule' cannot be specified when 'module' is set to 'none', 'system', or 'umd'.

[7m3[0m                             "module": "none",
[7m [0m [91m                            ~~~~~~~~[0m

[96mtsconfig.json[0m:[93m3[0m:[93m39[0m - [91merror[0m[90m TS5107: [0mOption 'module=None' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m                             "module": "none",
[7m [0m [91m                                      ~~~~~~[0m

[96mtsconfig.json[0m:[93m4[0m:[93m29[0m - [91merror[0m[90m TS5023: [0mUnknown compiler option 'allowAnything'.

[7m4[0m                             "allowAnything": true
[7m [0m [91m                            ~~~~~~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 4 errors. Watching for file changes.



//// [/user/username/workspace/solution/projects/project/commonFile1.js]
var x = 1;


//// [/user/username/workspace/solution/projects/project/commonFile2.js]
var y = 1;



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
/user/username/workspace/solution/projects/project/commonFile1.ts: *new*
  {}
/user/username/workspace/solution/projects/project/commonFile2.ts: *new*
  {}
/user/username/workspace/solution/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/workspace/solution/projects/project: *new*
  {}

Program root files: [
  "/user/username/workspace/solution/projects/project/commonFile1.ts",
  "/user/username/workspace/solution/projects/project/commonFile2.ts"
]
Program options: {
  "module": 0,
  "watch": true,
  "configFilePath": "/user/username/workspace/solution/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/commonFile1.ts
/user/username/workspace/solution/projects/project/commonFile2.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/workspace/solution/projects/project/commonfile1.ts (used version)
/user/username/workspace/solution/projects/project/commonfile2.ts (used version)

exitCode:: ExitStatus.undefined
