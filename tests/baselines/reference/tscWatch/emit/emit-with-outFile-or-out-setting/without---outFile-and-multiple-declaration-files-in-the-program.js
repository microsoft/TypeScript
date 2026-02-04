currentDirectory:: /home/src/projects/a/b/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/projects/a/b/output/AnotherDependency/file1.d.ts]
declare namespace Common.SomeComponent.DynamicMenu { enum Z { Full = 0,  Min = 1, Average = 2, } }

//// [/home/src/projects/a/b/dependencies/file2.d.ts]
declare namespace Dependencies.SomeComponent { export class SomeClass { version: string; } }

//// [/home/src/projects/a/b/project/src/main.ts]
namespace Main { export function fooBar() {} }

//// [/home/src/projects/a/b/project/src/main2.ts]
namespace main.file4 { import DynamicMenu = Common.SomeComponent.DynamicMenu; export function foo(a: DynamicMenu.z) {  } }

//// [/home/src/projects/a/b/project/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "../output",
    "target": "es5"
  },
  "files": [
    "/home/src/projects/a/b/output/AnotherDependency/file1.d.ts",
    "/home/src/projects/a/b/dependencies/file2.d.ts",
    "/home/src/projects/a/b/project/src/main.ts",
    "/home/src/projects/a/b/project/src/main2.ts"
  ]
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

[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5011: [0mThe common source directory of 'tsconfig.json' is './src'. The 'rootDir' setting must be explicitly set to this or another path to adjust your output's file layout.
  Visit https://aka.ms/ts6 for migration information.

[7m3[0m     "outDir": "../output",
[7m [0m [91m    ~~~~~~~~[0m

[96mtsconfig.json[0m:[93m4[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'target=ES5' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "target": "es5"
[7m [0m [91m              ~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 2 errors. Watching for file changes.



//// [/home/src/projects/a/b/output/src/main.js]
"use strict";
var Main;
(function (Main) {
    function fooBar() { }
    Main.fooBar = fooBar;
})(Main || (Main = {}));


//// [/home/src/projects/a/b/output/src/main2.js]
"use strict";
var main;
(function (main) {
    var file4;
    (function (file4) {
        function foo(a) { }
        file4.foo = foo;
    })(file4 = main.file4 || (main.file4 = {}));
})(main || (main = {}));



PolledWatches::
/home/src/projects/a/b/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/a/b/project/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/a/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/a/b/dependencies/file2.d.ts: *new*
  {}
/home/src/projects/a/b/output/AnotherDependency/file1.d.ts: *new*
  {}
/home/src/projects/a/b/project/src/main.ts: *new*
  {}
/home/src/projects/a/b/project/src/main2.ts: *new*
  {}
/home/src/projects/a/b/project/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

Program root files: [
  "/home/src/projects/a/b/output/AnotherDependency/file1.d.ts",
  "/home/src/projects/a/b/dependencies/file2.d.ts",
  "/home/src/projects/a/b/project/src/main.ts",
  "/home/src/projects/a/b/project/src/main2.ts"
]
Program options: {
  "outDir": "/home/src/projects/a/b/output",
  "target": 1,
  "watch": true,
  "configFilePath": "/home/src/projects/a/b/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/b/output/AnotherDependency/file1.d.ts
/home/src/projects/a/b/dependencies/file2.d.ts
/home/src/projects/a/b/project/src/main.ts
/home/src/projects/a/b/project/src/main2.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/projects/a/b/output/anotherdependency/file1.d.ts (used version)
/home/src/projects/a/b/dependencies/file2.d.ts (used version)
/home/src/projects/a/b/project/src/main.ts (used version)
/home/src/projects/a/b/project/src/main2.ts (used version)

exitCode:: ExitStatus.undefined
