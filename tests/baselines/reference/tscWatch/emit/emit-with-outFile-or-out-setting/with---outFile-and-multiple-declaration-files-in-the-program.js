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
    "outFile": "../output/common.js",
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


/home/src/tslibs/TS/Lib/tsc.js --w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96msrc/main2.ts[0m:[93m1[0m:[93m114[0m - [91merror[0m[90m TS2724: [0m'Common.SomeComponent.DynamicMenu' has no exported member named 'z'. Did you mean 'Z'?

[7m1[0m namespace main.file4 { import DynamicMenu = Common.SomeComponent.DynamicMenu; export function foo(a: DynamicMenu.z) {  } }
[7m [0m [91m                                                                                                                 ~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/projects/a/b/output/common.js]
var Main;
(function (Main) {
    function fooBar() { }
    Main.fooBar = fooBar;
})(Main || (Main = {}));
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
  "outFile": "/home/src/projects/a/b/output/common.js",
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

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/b/output/AnotherDependency/file1.d.ts
/home/src/projects/a/b/dependencies/file2.d.ts
/home/src/projects/a/b/project/src/main.ts
/home/src/projects/a/b/project/src/main2.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
