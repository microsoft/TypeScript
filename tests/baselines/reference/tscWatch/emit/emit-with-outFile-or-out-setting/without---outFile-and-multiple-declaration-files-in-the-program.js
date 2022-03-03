Input::
//// [/a/b/output/AnotherDependency/file1.d.ts]
declare namespace Common.SomeComponent.DynamicMenu { enum Z { Full = 0,  Min = 1, Average = 2, } }

//// [/a/b/dependencies/file2.d.ts]
declare namespace Dependencies.SomeComponent { export class SomeClass { version: string; } }

//// [/a/b/project/src/main.ts]
namespace Main { export function fooBar() {} }

//// [/a/b/project/src/main2.ts]
namespace main.file4 { import DynamicMenu = Common.SomeComponent.DynamicMenu; export function foo(a: DynamicMenu.z) {  } }

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

//// [/a/b/project/tsconfig.json]
{"compilerOptions":{"outDir":"../output","target":"es5"},"files":["/a/b/output/AnotherDependency/file1.d.ts","/a/b/dependencies/file2.d.ts","/a/b/project/src/main.ts","/a/b/project/src/main2.ts"]}


/a/lib/tsc.js --w -p /a/b/project/tsconfig.json
Output::
>> Screen clear
[[90m12:00:31 AM[0m] Starting compilation in watch mode...

[96ma/b/project/src/main2.ts[0m:[93m1[0m:[93m114[0m - [91merror[0m[90m TS2724: [0m'Common.SomeComponent.DynamicMenu' has no exported member named 'z'. Did you mean 'Z'?

[7m1[0m namespace main.file4 { import DynamicMenu = Common.SomeComponent.DynamicMenu; export function foo(a: DynamicMenu.z) {  } }
[7m [0m [91m                                                                                                                 ~[0m

[[90m12:00:36 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/a/b/output/AnotherDependency/file1.d.ts","/a/b/dependencies/file2.d.ts","/a/b/project/src/main.ts","/a/b/project/src/main2.ts"]
Program options: {"outDir":"/a/b/output","target":1,"watch":true,"project":"/a/b/project/tsconfig.json","configFilePath":"/a/b/project/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/output/AnotherDependency/file1.d.ts
/a/b/dependencies/file2.d.ts
/a/b/project/src/main.ts
/a/b/project/src/main2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/output/AnotherDependency/file1.d.ts
/a/b/dependencies/file2.d.ts
/a/b/project/src/main.ts
/a/b/project/src/main2.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/b/output/anotherdependency/file1.d.ts (used version)
/a/b/dependencies/file2.d.ts (used version)
/a/b/project/src/main.ts (used version)
/a/b/project/src/main2.ts (used version)

WatchedFiles::
/a/b/project/tsconfig.json:
  {"fileName":"/a/b/project/tsconfig.json","pollingInterval":250}
/a/b/output/anotherdependency/file1.d.ts:
  {"fileName":"/a/b/output/AnotherDependency/file1.d.ts","pollingInterval":250}
/a/b/dependencies/file2.d.ts:
  {"fileName":"/a/b/dependencies/file2.d.ts","pollingInterval":250}
/a/b/project/src/main.ts:
  {"fileName":"/a/b/project/src/main.ts","pollingInterval":250}
/a/b/project/src/main2.ts:
  {"fileName":"/a/b/project/src/main2.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/project/node_modules/@types:
  {"directoryName":"/a/b/project/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/a/b/output/main.js]
var Main;
(function (Main) {
    function fooBar() { }
    Main.fooBar = fooBar;
})(Main || (Main = {}));


//// [/a/b/output/main2.js]
var main;
(function (main) {
    var file4;
    (function (file4) {
        function foo(a) { }
        file4.foo = foo;
    })(file4 = main.file4 || (main.file4 = {}));
})(main || (main = {}));


