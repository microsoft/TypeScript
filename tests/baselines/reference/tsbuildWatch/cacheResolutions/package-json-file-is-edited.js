Input::
//// [/src/projects/project/src/tsconfig.json]
{"compilerOptions":{"target":"es2016","composite":true,"module":"node16","outDir":"../out","cacheResolutions":true,"traceResolution":true},"files":["fileA.ts","fileB.mts","randomFile.ts","a/randomFile.ts","b/ba/randomFile.ts","b/randomFile.ts","c/ca/randomFile.ts","c/ca/caa/randomFile.ts","c/ca/caa/caaa/randomFile.ts","c/cb/randomFile.ts","d/da/daa/daaa/x/y/z/randomFile.ts","d/da/daa/daaa/randomFile.ts","d/da/daa/randomFile.ts","d/da/randomFile.ts","e/ea/randomFile.ts","e/ea/eaa/randomFile.ts","e/ea/eaa/eaaa/randomFile.ts","e/ea/eaa/eaaa/x/y/z/randomFile.ts","f/fa/faa/x/y/z/randomFile.ts","f/fa/faa/faaa/randomFile.ts"]}

//// [/src/projects/project/src/fileA.ts]
import { foo } from "./fileB.mjs";
foo();


//// [/src/projects/project/src/fileB.mts]
export function foo() {}

//// [/src/projects/project/src/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/a/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/b/ba/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/b/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/c/ca/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/c/ca/caa/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/c/ca/caa/caaa/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/c/cb/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/d/da/daa/daaa/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/d/da/daa/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/d/da/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/e/ea/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/e/ea/eaa/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/f/fa/faa/faaa/randomFile.ts]
export const x = 10;

//// [/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts]
export const x = 10;

//// [/src/projects/project/package.json]
{"name":"app","version":"1.0.0"}

//// [/a/lib/lib.es2016.full.d.ts]
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


/a/lib/tsc.js --b src -w --explainFiles --extendedDiagnostics
Output::
[[90m12:01:59 AM[0m] Starting compilation in watch mode...

File '/src/projects/project/src/package.json' does not exist.
Found 'package.json' at '/src/projects/project/package.json'.
'package.json' does not have a 'typesVersions' field.
======== Resolving module './fileB.mjs' from '/src/projects/project/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Loading module as file / folder, candidate module location '/src/projects/project/src/fileB.mjs', target file type 'TypeScript'.
File '/src/projects/project/src/fileB.mjs.ts' does not exist.
File '/src/projects/project/src/fileB.mjs.tsx' does not exist.
File '/src/projects/project/src/fileB.mjs.d.ts' does not exist.
File name '/src/projects/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/src/projects/project/src/fileB.mts' exist - use it as a name resolution result.
======== Module name './fileB.mjs' was successfully resolved to '/src/projects/project/src/fileB.mts'. ========
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/a/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/b/ba/package.json' does not exist.
File '/src/projects/project/src/b/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/c/ca/package.json' does not exist.
File '/src/projects/project/src/c/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/c/ca/caa/package.json' does not exist.
File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/c/ca/caa/caaa/package.json' does not exist.
File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/c/cb/package.json' does not exist.
File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/x/y/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/x/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/package.json' does not exist.
File '/src/projects/project/src/d/da/package.json' does not exist.
File '/src/projects/project/src/d/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/e/ea/package.json' does not exist.
File '/src/projects/project/src/e/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/package.json' does not exist.
File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/f/fa/faa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/x/y/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/x/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/package.json' does not exist.
File '/src/projects/project/src/f/fa/package.json' does not exist.
File '/src/projects/project/src/f/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/f/fa/faa/faaa/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1471: [0mModule './fileB.mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../../../a/lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/fileA.ts'
  Part of 'files' list in tsconfig.json
src/fileA.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/a/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/b/ba/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/b/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/c/ca/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/c/ca/caa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/c/ca/caa/caaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/c/cb/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/d/da/daa/daaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/d/da/daa/daaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/d/da/daa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/d/da/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/e/ea/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/e/ea/eaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/e/ea/eaa/eaaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/f/fa/faa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/f/fa/faa/faaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
[[90m12:02:08 AM[0m] Found 1 error. Watching for file changes.

FileWatcher:: Added:: WatchInfo: /src/projects/project/src/tsconfig.json 2000 undefined Config file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/fileA.ts 250 undefined Source file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/fileB.mts 250 undefined Source file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/randomFile.ts 250 undefined Source file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/a/randomFile.ts 250 undefined Source file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/b/ba/randomFile.ts 250 undefined Source file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/b/randomFile.ts 250 undefined Source file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/ca/randomFile.ts 250 undefined Source file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/ca/caa/randomFile.ts 250 undefined Source file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/ca/caa/caaa/randomFile.ts 250 undefined Source file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/cb/randomFile.ts 250 undefined Source file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts 250 undefined Source file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/daa/daaa/randomFile.ts 250 undefined Source file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/daa/randomFile.ts 250 undefined Source file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/randomFile.ts 250 undefined Source file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/randomFile.ts 250 undefined Source file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/eaa/randomFile.ts 250 undefined Source file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts 250 undefined Source file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts 250 undefined Source file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts 250 undefined Source file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/faa/faaa/randomFile.ts 250 undefined Source file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/a/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/b/ba/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/b/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/ca/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/ca/caa/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/ca/caa/caaa/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/c/cb/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/daa/daaa/x/y/z/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/daa/daaa/x/y/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/daa/daaa/x/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/daa/daaa/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/daa/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/da/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/d/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/eaa/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/eaa/eaaa/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/e/ea/eaa/eaaa/x/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/faa/x/y/z/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/faa/x/y/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/faa/x/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/faa/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/projects/project/src/f/fa/faa/faaa/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/lib/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json


Program root files: ["/src/projects/project/src/fileA.ts","/src/projects/project/src/fileB.mts","/src/projects/project/src/randomFile.ts","/src/projects/project/src/a/randomFile.ts","/src/projects/project/src/b/ba/randomFile.ts","/src/projects/project/src/b/randomFile.ts","/src/projects/project/src/c/ca/randomFile.ts","/src/projects/project/src/c/ca/caa/randomFile.ts","/src/projects/project/src/c/ca/caa/caaa/randomFile.ts","/src/projects/project/src/c/cb/randomFile.ts","/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts","/src/projects/project/src/d/da/daa/daaa/randomFile.ts","/src/projects/project/src/d/da/daa/randomFile.ts","/src/projects/project/src/d/da/randomFile.ts","/src/projects/project/src/e/ea/randomFile.ts","/src/projects/project/src/e/ea/eaa/randomFile.ts","/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts","/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts","/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts","/src/projects/project/src/f/fa/faa/faaa/randomFile.ts"]
Program options: {"target":3,"composite":true,"module":100,"outDir":"/src/projects/project/out","cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/projects/project/src/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.es2016.full.d.ts
/src/projects/project/src/fileB.mts
/src/projects/project/src/fileA.ts
/src/projects/project/src/randomFile.ts
/src/projects/project/src/a/randomFile.ts
/src/projects/project/src/b/ba/randomFile.ts
/src/projects/project/src/b/randomFile.ts
/src/projects/project/src/c/ca/randomFile.ts
/src/projects/project/src/c/ca/caa/randomFile.ts
/src/projects/project/src/c/ca/caa/caaa/randomFile.ts
/src/projects/project/src/c/cb/randomFile.ts
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
/src/projects/project/src/d/da/daa/daaa/randomFile.ts
/src/projects/project/src/d/da/daa/randomFile.ts
/src/projects/project/src/d/da/randomFile.ts
/src/projects/project/src/e/ea/randomFile.ts
/src/projects/project/src/e/ea/eaa/randomFile.ts
/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
/src/projects/project/src/f/fa/faa/faaa/randomFile.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.es2016.full.d.ts
/src/projects/project/src/fileB.mts
/src/projects/project/src/fileA.ts
/src/projects/project/src/randomFile.ts
/src/projects/project/src/a/randomFile.ts
/src/projects/project/src/b/ba/randomFile.ts
/src/projects/project/src/b/randomFile.ts
/src/projects/project/src/c/ca/randomFile.ts
/src/projects/project/src/c/ca/caa/randomFile.ts
/src/projects/project/src/c/ca/caa/caaa/randomFile.ts
/src/projects/project/src/c/cb/randomFile.ts
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
/src/projects/project/src/d/da/daa/daaa/randomFile.ts
/src/projects/project/src/d/da/daa/randomFile.ts
/src/projects/project/src/d/da/randomFile.ts
/src/projects/project/src/e/ea/randomFile.ts
/src/projects/project/src/e/ea/eaa/randomFile.ts
/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
/src/projects/project/src/f/fa/faa/faaa/randomFile.ts

Shape signatures in builder refreshed for::
/a/lib/lib.es2016.full.d.ts (used version)
/src/projects/project/src/fileb.mts (used version)
/src/projects/project/src/filea.ts (used version)
/src/projects/project/src/randomfile.ts (used version)
/src/projects/project/src/a/randomfile.ts (used version)
/src/projects/project/src/b/ba/randomfile.ts (used version)
/src/projects/project/src/b/randomfile.ts (used version)
/src/projects/project/src/c/ca/randomfile.ts (used version)
/src/projects/project/src/c/ca/caa/randomfile.ts (used version)
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts (used version)
/src/projects/project/src/c/cb/randomfile.ts (used version)
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts (used version)
/src/projects/project/src/d/da/daa/daaa/randomfile.ts (used version)
/src/projects/project/src/d/da/daa/randomfile.ts (used version)
/src/projects/project/src/d/da/randomfile.ts (used version)
/src/projects/project/src/e/ea/randomfile.ts (used version)
/src/projects/project/src/e/ea/eaa/randomfile.ts (used version)
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts (used version)
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts (used version)
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts (used version)
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts (used version)

WatchedFiles::
/src/projects/project/src/tsconfig.json:
  {"fileName":"/src/projects/project/src/tsconfig.json","pollingInterval":250}
/src/projects/project/src/filea.ts:
  {"fileName":"/src/projects/project/src/fileA.ts","pollingInterval":250}
/src/projects/project/src/fileb.mts:
  {"fileName":"/src/projects/project/src/fileB.mts","pollingInterval":250}
/src/projects/project/src/randomfile.ts:
  {"fileName":"/src/projects/project/src/randomFile.ts","pollingInterval":250}
/src/projects/project/src/a/randomfile.ts:
  {"fileName":"/src/projects/project/src/a/randomFile.ts","pollingInterval":250}
/src/projects/project/src/b/ba/randomfile.ts:
  {"fileName":"/src/projects/project/src/b/ba/randomFile.ts","pollingInterval":250}
/src/projects/project/src/b/randomfile.ts:
  {"fileName":"/src/projects/project/src/b/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/ca/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/ca/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/ca/caa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/ca/caa/caaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/cb/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/cb/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/daa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/eaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts","pollingInterval":250}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/f/fa/faa/faaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/package.json:
  {"fileName":"/src/projects/project/src/package.json","pollingInterval":250}
/src/projects/project/package.json:
  {"fileName":"/src/projects/project/package.json","pollingInterval":250}
/src/projects/project/src/a/package.json:
  {"fileName":"/src/projects/project/src/a/package.json","pollingInterval":250}
/src/projects/project/src/b/ba/package.json:
  {"fileName":"/src/projects/project/src/b/ba/package.json","pollingInterval":250}
/src/projects/project/src/b/package.json:
  {"fileName":"/src/projects/project/src/b/package.json","pollingInterval":250}
/src/projects/project/src/c/ca/package.json:
  {"fileName":"/src/projects/project/src/c/ca/package.json","pollingInterval":250}
/src/projects/project/src/c/package.json:
  {"fileName":"/src/projects/project/src/c/package.json","pollingInterval":250}
/src/projects/project/src/c/ca/caa/package.json:
  {"fileName":"/src/projects/project/src/c/ca/caa/package.json","pollingInterval":250}
/src/projects/project/src/c/ca/caa/caaa/package.json:
  {"fileName":"/src/projects/project/src/c/ca/caa/caaa/package.json","pollingInterval":250}
/src/projects/project/src/c/cb/package.json:
  {"fileName":"/src/projects/project/src/c/cb/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/y/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/y/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/package.json","pollingInterval":250}
/src/projects/project/src/d/da/package.json:
  {"fileName":"/src/projects/project/src/d/da/package.json","pollingInterval":250}
/src/projects/project/src/d/package.json:
  {"fileName":"/src/projects/project/src/d/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/package.json:
  {"fileName":"/src/projects/project/src/e/ea/package.json","pollingInterval":250}
/src/projects/project/src/e/package.json:
  {"fileName":"/src/projects/project/src/e/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/y/z/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/y/z/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/y/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/y/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/package.json:
  {"fileName":"/src/projects/project/src/f/fa/package.json","pollingInterval":250}
/src/projects/project/src/f/package.json:
  {"fileName":"/src/projects/project/src/f/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/faaa/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/faaa/package.json","pollingInterval":250}
/a/lib/package.json:
  {"fileName":"/a/lib/package.json","pollingInterval":250}
/a/package.json:
  {"fileName":"/a/package.json","pollingInterval":250}
/package.json:
  {"fileName":"/package.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/src/projects/project/out/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.es2016.full.d.ts","../src/fileb.mts","../src/filea.ts","../src/randomfile.ts","../src/a/randomfile.ts","../src/b/ba/randomfile.ts","../src/b/randomfile.ts","../src/c/ca/randomfile.ts","../src/c/ca/caa/randomfile.ts","../src/c/ca/caa/caaa/randomfile.ts","../src/c/cb/randomfile.ts","../src/d/da/daa/daaa/x/y/z/randomfile.ts","../src/d/da/daa/daaa/randomfile.ts","../src/d/da/daa/randomfile.ts","../src/d/da/randomfile.ts","../src/e/ea/randomfile.ts","../src/e/ea/eaa/randomfile.ts","../src/e/ea/eaa/eaaa/randomfile.ts","../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts","../src/f/fa/faa/x/y/z/randomfile.ts","../src/f/fa/faa/faaa/randomfile.ts","../src","../src/fileB.mts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"3524703962-export function foo() {}","impliedFormat":99},{"version":"-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1}],"options":{"cacheResolutions":true,"composite":true,"module":100,"outDir":"./","target":3},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[[3,1]],"semanticDiagnosticsPerFile":[1,5,6,7,10,9,8,11,13,12,14,15,18,19,17,16,21,20,[3,[{"file":"../src/filea.ts","start":20,"length":13,"messageText":"Module './fileB.mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.","category":1,"code":1471}]],2,4],"affectedFilesPendingEmit":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[21,1],[20,1],[3,1],[2,1],[4,1]],"emitSignatures":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],"cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":23}}],"names":["./fileB.mjs"],"resolutionEntries":[[1,1,1]],"modules":[[22,[1]]]}},"version":"FakeTSVersion"}

//// [/src/projects/project/out/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.es2016.full.d.ts",
      "../src/fileb.mts",
      "../src/filea.ts",
      "../src/randomfile.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src",
      "../src/fileB.mts"
    ],
    "fileNamesList": [
      [
        "../src/fileb.mts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.es2016.full.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../src/fileb.mts": {
        "version": "3524703962-export function foo() {}",
        "signature": "3524703962-export function foo() {}",
        "impliedFormat": "esnext"
      },
      "../src/filea.ts": {
        "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "signature": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "impliedFormat": "commonjs"
      },
      "../src/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/a/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/b/ba/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/b/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/caaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/cb/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/faaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 100,
      "outDir": "./",
      "target": 3
    },
    "referencedMap": {
      "../src/filea.ts": [
        "../src/fileb.mts"
      ]
    },
    "exportedModulesMap": {
      "../src/filea.ts": [
        "../src/fileb.mts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.es2016.full.d.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      [
        "../src/filea.ts",
        [
          {
            "file": "../src/filea.ts",
            "start": 20,
            "length": 13,
            "messageText": "Module './fileB.mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.",
            "category": 1,
            "code": 1471
          }
        ]
      ],
      "../src/fileb.mts",
      "../src/randomfile.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "../src/a/randomfile.ts",
        "Full"
      ],
      [
        "../src/b/ba/randomfile.ts",
        "Full"
      ],
      [
        "../src/b/randomfile.ts",
        "Full"
      ],
      [
        "../src/c/ca/caa/caaa/randomfile.ts",
        "Full"
      ],
      [
        "../src/c/ca/caa/randomfile.ts",
        "Full"
      ],
      [
        "../src/c/ca/randomfile.ts",
        "Full"
      ],
      [
        "../src/c/cb/randomfile.ts",
        "Full"
      ],
      [
        "../src/d/da/daa/daaa/randomfile.ts",
        "Full"
      ],
      [
        "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
        "Full"
      ],
      [
        "../src/d/da/daa/randomfile.ts",
        "Full"
      ],
      [
        "../src/d/da/randomfile.ts",
        "Full"
      ],
      [
        "../src/e/ea/eaa/eaaa/randomfile.ts",
        "Full"
      ],
      [
        "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
        "Full"
      ],
      [
        "../src/e/ea/eaa/randomfile.ts",
        "Full"
      ],
      [
        "../src/e/ea/randomfile.ts",
        "Full"
      ],
      [
        "../src/f/fa/faa/faaa/randomfile.ts",
        "Full"
      ],
      [
        "../src/f/fa/faa/x/y/z/randomfile.ts",
        "Full"
      ],
      [
        "../src/filea.ts",
        "Full"
      ],
      [
        "../src/fileb.mts",
        "Full"
      ],
      [
        "../src/randomfile.ts",
        "Full"
      ]
    ],
    "emitSignatures": [
      "../src/fileb.mts",
      "../src/filea.ts",
      "../src/randomfile.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts"
    ],
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "../src/fileB.mts"
          }
        }
      ],
      "names": [
        "./fileB.mjs"
      ],
      "resolutionEntries": [
        [
          "./fileB.mjs",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "../src/fileB.mts"
            }
          },
          "commonjs"
        ]
      ],
      "modules": [
        [
          "../src",
          [
            [
              "./fileB.mjs",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "../src/fileB.mts"
                }
              },
              "commonjs"
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 3425
}


Change:: random edit

Input::
//// [/src/projects/project/src/randomFile.ts]
export const x = 10;export const y = 10;


Output::
FileWatcher:: Triggered with /src/projects/project/src/randomFile.ts 1:: WatchInfo: /src/projects/project/src/randomFile.ts 250 undefined Source file /src/projects/project/src/tsconfig.json
Elapsed:: *ms FileWatcher:: Triggered with /src/projects/project/src/randomFile.ts 1:: WatchInfo: /src/projects/project/src/randomFile.ts 250 undefined Source file /src/projects/project/src/tsconfig.json
[[90m12:02:11 AM[0m] File change detected. Starting incremental compilation...

File '/src/projects/project/src/package.json' does not exist.
Found 'package.json' at '/src/projects/project/package.json'.
'package.json' does not have a 'typesVersions' field.
Reusing resolution of module './fileB.mjs' from '/src/projects/project/src/fileA.ts' found in cache from location '/src/projects/project/src', it was successfully resolved to '/src/projects/project/src/fileB.mts'.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/a/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/b/ba/package.json' does not exist.
File '/src/projects/project/src/b/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/c/ca/package.json' does not exist.
File '/src/projects/project/src/c/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/c/ca/caa/package.json' does not exist.
File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/c/ca/caa/caaa/package.json' does not exist.
File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/c/cb/package.json' does not exist.
File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/x/y/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/x/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/package.json' does not exist.
File '/src/projects/project/src/d/da/package.json' does not exist.
File '/src/projects/project/src/d/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/e/ea/package.json' does not exist.
File '/src/projects/project/src/e/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/package.json' does not exist.
File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/f/fa/faa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/x/y/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/x/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/package.json' does not exist.
File '/src/projects/project/src/f/fa/package.json' does not exist.
File '/src/projects/project/src/f/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/f/fa/faa/faaa/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1471: [0mModule './fileB.mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../../../a/lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/fileA.ts'
  Part of 'files' list in tsconfig.json
src/fileA.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/a/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/b/ba/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/b/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/c/ca/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/c/ca/caa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/c/ca/caa/caaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/c/cb/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/d/da/daa/daaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/d/da/daa/daaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/d/da/daa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/d/da/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/e/ea/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/e/ea/eaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/e/ea/eaa/eaaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/f/fa/faa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/f/fa/faa/faaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
[[90m12:02:19 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/src/projects/project/src/fileA.ts","/src/projects/project/src/fileB.mts","/src/projects/project/src/randomFile.ts","/src/projects/project/src/a/randomFile.ts","/src/projects/project/src/b/ba/randomFile.ts","/src/projects/project/src/b/randomFile.ts","/src/projects/project/src/c/ca/randomFile.ts","/src/projects/project/src/c/ca/caa/randomFile.ts","/src/projects/project/src/c/ca/caa/caaa/randomFile.ts","/src/projects/project/src/c/cb/randomFile.ts","/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts","/src/projects/project/src/d/da/daa/daaa/randomFile.ts","/src/projects/project/src/d/da/daa/randomFile.ts","/src/projects/project/src/d/da/randomFile.ts","/src/projects/project/src/e/ea/randomFile.ts","/src/projects/project/src/e/ea/eaa/randomFile.ts","/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts","/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts","/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts","/src/projects/project/src/f/fa/faa/faaa/randomFile.ts"]
Program options: {"target":3,"composite":true,"module":100,"outDir":"/src/projects/project/out","cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/projects/project/src/tsconfig.json"}
Program structureReused: SafeModuleCache
Program files::
/a/lib/lib.es2016.full.d.ts
/src/projects/project/src/fileB.mts
/src/projects/project/src/fileA.ts
/src/projects/project/src/randomFile.ts
/src/projects/project/src/a/randomFile.ts
/src/projects/project/src/b/ba/randomFile.ts
/src/projects/project/src/b/randomFile.ts
/src/projects/project/src/c/ca/randomFile.ts
/src/projects/project/src/c/ca/caa/randomFile.ts
/src/projects/project/src/c/ca/caa/caaa/randomFile.ts
/src/projects/project/src/c/cb/randomFile.ts
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
/src/projects/project/src/d/da/daa/daaa/randomFile.ts
/src/projects/project/src/d/da/daa/randomFile.ts
/src/projects/project/src/d/da/randomFile.ts
/src/projects/project/src/e/ea/randomFile.ts
/src/projects/project/src/e/ea/eaa/randomFile.ts
/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
/src/projects/project/src/f/fa/faa/faaa/randomFile.ts

Semantic diagnostics in builder refreshed for::
/src/projects/project/src/randomFile.ts

Shape signatures in builder refreshed for::
/src/projects/project/src/randomfile.ts (computed .d.ts)

WatchedFiles::
/src/projects/project/src/tsconfig.json:
  {"fileName":"/src/projects/project/src/tsconfig.json","pollingInterval":250}
/src/projects/project/src/filea.ts:
  {"fileName":"/src/projects/project/src/fileA.ts","pollingInterval":250}
/src/projects/project/src/fileb.mts:
  {"fileName":"/src/projects/project/src/fileB.mts","pollingInterval":250}
/src/projects/project/src/randomfile.ts:
  {"fileName":"/src/projects/project/src/randomFile.ts","pollingInterval":250}
/src/projects/project/src/a/randomfile.ts:
  {"fileName":"/src/projects/project/src/a/randomFile.ts","pollingInterval":250}
/src/projects/project/src/b/ba/randomfile.ts:
  {"fileName":"/src/projects/project/src/b/ba/randomFile.ts","pollingInterval":250}
/src/projects/project/src/b/randomfile.ts:
  {"fileName":"/src/projects/project/src/b/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/ca/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/ca/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/ca/caa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/ca/caa/caaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/cb/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/cb/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/daa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/eaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts","pollingInterval":250}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/f/fa/faa/faaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/package.json:
  {"fileName":"/src/projects/project/src/package.json","pollingInterval":250}
/src/projects/project/package.json:
  {"fileName":"/src/projects/project/package.json","pollingInterval":250}
/src/projects/project/src/a/package.json:
  {"fileName":"/src/projects/project/src/a/package.json","pollingInterval":250}
/src/projects/project/src/b/ba/package.json:
  {"fileName":"/src/projects/project/src/b/ba/package.json","pollingInterval":250}
/src/projects/project/src/b/package.json:
  {"fileName":"/src/projects/project/src/b/package.json","pollingInterval":250}
/src/projects/project/src/c/ca/package.json:
  {"fileName":"/src/projects/project/src/c/ca/package.json","pollingInterval":250}
/src/projects/project/src/c/package.json:
  {"fileName":"/src/projects/project/src/c/package.json","pollingInterval":250}
/src/projects/project/src/c/ca/caa/package.json:
  {"fileName":"/src/projects/project/src/c/ca/caa/package.json","pollingInterval":250}
/src/projects/project/src/c/ca/caa/caaa/package.json:
  {"fileName":"/src/projects/project/src/c/ca/caa/caaa/package.json","pollingInterval":250}
/src/projects/project/src/c/cb/package.json:
  {"fileName":"/src/projects/project/src/c/cb/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/y/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/y/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/package.json","pollingInterval":250}
/src/projects/project/src/d/da/package.json:
  {"fileName":"/src/projects/project/src/d/da/package.json","pollingInterval":250}
/src/projects/project/src/d/package.json:
  {"fileName":"/src/projects/project/src/d/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/package.json:
  {"fileName":"/src/projects/project/src/e/ea/package.json","pollingInterval":250}
/src/projects/project/src/e/package.json:
  {"fileName":"/src/projects/project/src/e/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/y/z/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/y/z/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/y/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/y/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/package.json:
  {"fileName":"/src/projects/project/src/f/fa/package.json","pollingInterval":250}
/src/projects/project/src/f/package.json:
  {"fileName":"/src/projects/project/src/f/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/faaa/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/faaa/package.json","pollingInterval":250}
/a/lib/package.json:
  {"fileName":"/a/lib/package.json","pollingInterval":250}
/a/package.json:
  {"fileName":"/a/package.json","pollingInterval":250}
/package.json:
  {"fileName":"/package.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/src/projects/project/out/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.es2016.full.d.ts","../src/fileb.mts","../src/filea.ts","../src/randomfile.ts","../src/a/randomfile.ts","../src/b/ba/randomfile.ts","../src/b/randomfile.ts","../src/c/ca/randomfile.ts","../src/c/ca/caa/randomfile.ts","../src/c/ca/caa/caaa/randomfile.ts","../src/c/cb/randomfile.ts","../src/d/da/daa/daaa/x/y/z/randomfile.ts","../src/d/da/daa/daaa/randomfile.ts","../src/d/da/daa/randomfile.ts","../src/d/da/randomfile.ts","../src/e/ea/randomfile.ts","../src/e/ea/eaa/randomfile.ts","../src/e/ea/eaa/eaaa/randomfile.ts","../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts","../src/f/fa/faa/x/y/z/randomfile.ts","../src/f/fa/faa/faaa/randomfile.ts","../src","../src/fileB.mts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"3524703962-export function foo() {}","impliedFormat":99},{"version":"-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n","impliedFormat":1},{"version":"-9547279430-export const x = 10;export const y = 10;","signature":"-18799098802-export declare const x = 10;\nexport declare const y = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1}],"options":{"cacheResolutions":true,"composite":true,"module":100,"outDir":"./","target":3},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[[3,1]],"semanticDiagnosticsPerFile":[1,5,6,7,10,9,8,11,13,12,14,15,18,19,17,16,21,20,[3,[{"file":"../src/filea.ts","start":20,"length":13,"messageText":"Module './fileB.mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.","category":1,"code":1471}]],2,4],"affectedFilesPendingEmit":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[21,1],[20,1],[3,1],[2,1],[4,1]],"emitSignatures":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],"cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":23}}],"names":["./fileB.mjs"],"resolutionEntries":[[1,1,1]],"modules":[[22,[1]]]}},"version":"FakeTSVersion"}

//// [/src/projects/project/out/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.es2016.full.d.ts",
      "../src/fileb.mts",
      "../src/filea.ts",
      "../src/randomfile.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src",
      "../src/fileB.mts"
    ],
    "fileNamesList": [
      [
        "../src/fileb.mts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.es2016.full.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../src/fileb.mts": {
        "version": "3524703962-export function foo() {}",
        "signature": "3524703962-export function foo() {}",
        "impliedFormat": "esnext"
      },
      "../src/filea.ts": {
        "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "signature": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "impliedFormat": "commonjs"
      },
      "../src/randomfile.ts": {
        "version": "-9547279430-export const x = 10;export const y = 10;",
        "signature": "-18799098802-export declare const x = 10;\nexport declare const y = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/a/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/b/ba/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/b/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/caaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/c/cb/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/faaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 100,
      "outDir": "./",
      "target": 3
    },
    "referencedMap": {
      "../src/filea.ts": [
        "../src/fileb.mts"
      ]
    },
    "exportedModulesMap": {
      "../src/filea.ts": [
        "../src/fileb.mts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.es2016.full.d.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      [
        "../src/filea.ts",
        [
          {
            "file": "../src/filea.ts",
            "start": 20,
            "length": 13,
            "messageText": "Module './fileB.mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.",
            "category": 1,
            "code": 1471
          }
        ]
      ],
      "../src/fileb.mts",
      "../src/randomfile.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "../src/a/randomfile.ts",
        "Full"
      ],
      [
        "../src/b/ba/randomfile.ts",
        "Full"
      ],
      [
        "../src/b/randomfile.ts",
        "Full"
      ],
      [
        "../src/c/ca/caa/caaa/randomfile.ts",
        "Full"
      ],
      [
        "../src/c/ca/caa/randomfile.ts",
        "Full"
      ],
      [
        "../src/c/ca/randomfile.ts",
        "Full"
      ],
      [
        "../src/c/cb/randomfile.ts",
        "Full"
      ],
      [
        "../src/d/da/daa/daaa/randomfile.ts",
        "Full"
      ],
      [
        "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
        "Full"
      ],
      [
        "../src/d/da/daa/randomfile.ts",
        "Full"
      ],
      [
        "../src/d/da/randomfile.ts",
        "Full"
      ],
      [
        "../src/e/ea/eaa/eaaa/randomfile.ts",
        "Full"
      ],
      [
        "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
        "Full"
      ],
      [
        "../src/e/ea/eaa/randomfile.ts",
        "Full"
      ],
      [
        "../src/e/ea/randomfile.ts",
        "Full"
      ],
      [
        "../src/f/fa/faa/faaa/randomfile.ts",
        "Full"
      ],
      [
        "../src/f/fa/faa/x/y/z/randomfile.ts",
        "Full"
      ],
      [
        "../src/filea.ts",
        "Full"
      ],
      [
        "../src/fileb.mts",
        "Full"
      ],
      [
        "../src/randomfile.ts",
        "Full"
      ]
    ],
    "emitSignatures": [
      "../src/fileb.mts",
      "../src/filea.ts",
      "../src/randomfile.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts"
    ],
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "../src/fileB.mts"
          }
        }
      ],
      "names": [
        "./fileB.mjs"
      ],
      "resolutionEntries": [
        [
          "./fileB.mjs",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "../src/fileB.mts"
            }
          },
          "commonjs"
        ]
      ],
      "modules": [
        [
          "../src",
          [
            [
              "./fileB.mjs",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "../src/fileB.mts"
                }
              },
              "commonjs"
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 3532
}


Change:: Modify package json file to add type module

Input::
//// [/src/projects/project/package.json]
{"name":"app","version":"1.0.0","type":"module"}


Output::
FileWatcher:: Triggered with /src/projects/project/package.json 1:: WatchInfo: /src/projects/project/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
Elapsed:: *ms FileWatcher:: Triggered with /src/projects/project/package.json 1:: WatchInfo: /src/projects/project/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
[[90m12:02:23 AM[0m] File change detected. Starting incremental compilation...

File '/src/projects/project/src/package.json' does not exist.
Found 'package.json' at '/src/projects/project/package.json'.
'package.json' does not have a 'typesVersions' field.
======== Resolving module './fileB.mjs' from '/src/projects/project/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Loading module as file / folder, candidate module location '/src/projects/project/src/fileB.mjs', target file type 'TypeScript'.
File name '/src/projects/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/src/projects/project/src/fileB.mts' exist - use it as a name resolution result.
======== Module name './fileB.mjs' was successfully resolved to '/src/projects/project/src/fileB.mts'. ========
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/a/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/b/ba/package.json' does not exist.
File '/src/projects/project/src/b/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/c/ca/package.json' does not exist.
File '/src/projects/project/src/c/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/c/ca/caa/package.json' does not exist.
File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/c/ca/caa/caaa/package.json' does not exist.
File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/c/cb/package.json' does not exist.
File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/x/y/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/x/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/package.json' does not exist.
File '/src/projects/project/src/d/da/package.json' does not exist.
File '/src/projects/project/src/d/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/e/ea/package.json' does not exist.
File '/src/projects/project/src/e/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/package.json' does not exist.
File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/f/fa/faa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/x/y/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/x/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/package.json' does not exist.
File '/src/projects/project/src/f/fa/package.json' does not exist.
File '/src/projects/project/src/f/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/f/fa/faa/faaa/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
../../../a/lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/fileA.ts'
  Part of 'files' list in tsconfig.json
src/fileA.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/a/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/b/ba/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/b/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/c/ca/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/c/ca/caa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/c/ca/caa/caaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/c/cb/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/d/da/daa/daaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/d/da/daa/daaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/d/da/daa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/d/da/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/e/ea/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/e/ea/eaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/e/ea/eaa/eaaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/f/fa/faa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/f/fa/faa/faaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
[[90m12:05:02 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/src/projects/project/src/fileA.ts","/src/projects/project/src/fileB.mts","/src/projects/project/src/randomFile.ts","/src/projects/project/src/a/randomFile.ts","/src/projects/project/src/b/ba/randomFile.ts","/src/projects/project/src/b/randomFile.ts","/src/projects/project/src/c/ca/randomFile.ts","/src/projects/project/src/c/ca/caa/randomFile.ts","/src/projects/project/src/c/ca/caa/caaa/randomFile.ts","/src/projects/project/src/c/cb/randomFile.ts","/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts","/src/projects/project/src/d/da/daa/daaa/randomFile.ts","/src/projects/project/src/d/da/daa/randomFile.ts","/src/projects/project/src/d/da/randomFile.ts","/src/projects/project/src/e/ea/randomFile.ts","/src/projects/project/src/e/ea/eaa/randomFile.ts","/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts","/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts","/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts","/src/projects/project/src/f/fa/faa/faaa/randomFile.ts"]
Program options: {"target":3,"composite":true,"module":100,"outDir":"/src/projects/project/out","cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/projects/project/src/tsconfig.json"}
Program structureReused: SafeModuleCache
Program files::
/a/lib/lib.es2016.full.d.ts
/src/projects/project/src/fileB.mts
/src/projects/project/src/fileA.ts
/src/projects/project/src/randomFile.ts
/src/projects/project/src/a/randomFile.ts
/src/projects/project/src/b/ba/randomFile.ts
/src/projects/project/src/b/randomFile.ts
/src/projects/project/src/c/ca/randomFile.ts
/src/projects/project/src/c/ca/caa/randomFile.ts
/src/projects/project/src/c/ca/caa/caaa/randomFile.ts
/src/projects/project/src/c/cb/randomFile.ts
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
/src/projects/project/src/d/da/daa/daaa/randomFile.ts
/src/projects/project/src/d/da/daa/randomFile.ts
/src/projects/project/src/d/da/randomFile.ts
/src/projects/project/src/e/ea/randomFile.ts
/src/projects/project/src/e/ea/eaa/randomFile.ts
/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
/src/projects/project/src/f/fa/faa/faaa/randomFile.ts

Semantic diagnostics in builder refreshed for::
/src/projects/project/src/fileA.ts
/src/projects/project/src/randomFile.ts
/src/projects/project/src/a/randomFile.ts
/src/projects/project/src/b/ba/randomFile.ts
/src/projects/project/src/b/randomFile.ts
/src/projects/project/src/c/ca/randomFile.ts
/src/projects/project/src/c/ca/caa/randomFile.ts
/src/projects/project/src/c/ca/caa/caaa/randomFile.ts
/src/projects/project/src/c/cb/randomFile.ts
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
/src/projects/project/src/d/da/daa/daaa/randomFile.ts
/src/projects/project/src/d/da/daa/randomFile.ts
/src/projects/project/src/d/da/randomFile.ts
/src/projects/project/src/e/ea/randomFile.ts
/src/projects/project/src/e/ea/eaa/randomFile.ts
/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
/src/projects/project/src/f/fa/faa/faaa/randomFile.ts

Shape signatures in builder refreshed for::
/src/projects/project/src/filea.ts (computed .d.ts)
/src/projects/project/src/randomfile.ts (computed .d.ts)
/src/projects/project/src/a/randomfile.ts (computed .d.ts)
/src/projects/project/src/b/ba/randomfile.ts (computed .d.ts)
/src/projects/project/src/b/randomfile.ts (computed .d.ts)
/src/projects/project/src/c/ca/randomfile.ts (computed .d.ts)
/src/projects/project/src/c/ca/caa/randomfile.ts (computed .d.ts)
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts (computed .d.ts)
/src/projects/project/src/c/cb/randomfile.ts (computed .d.ts)
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts (computed .d.ts)
/src/projects/project/src/d/da/daa/daaa/randomfile.ts (computed .d.ts)
/src/projects/project/src/d/da/daa/randomfile.ts (computed .d.ts)
/src/projects/project/src/d/da/randomfile.ts (computed .d.ts)
/src/projects/project/src/e/ea/randomfile.ts (computed .d.ts)
/src/projects/project/src/e/ea/eaa/randomfile.ts (computed .d.ts)
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts (computed .d.ts)
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts (computed .d.ts)
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts (computed .d.ts)
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts (computed .d.ts)

WatchedFiles::
/src/projects/project/src/tsconfig.json:
  {"fileName":"/src/projects/project/src/tsconfig.json","pollingInterval":250}
/src/projects/project/src/filea.ts:
  {"fileName":"/src/projects/project/src/fileA.ts","pollingInterval":250}
/src/projects/project/src/fileb.mts:
  {"fileName":"/src/projects/project/src/fileB.mts","pollingInterval":250}
/src/projects/project/src/randomfile.ts:
  {"fileName":"/src/projects/project/src/randomFile.ts","pollingInterval":250}
/src/projects/project/src/a/randomfile.ts:
  {"fileName":"/src/projects/project/src/a/randomFile.ts","pollingInterval":250}
/src/projects/project/src/b/ba/randomfile.ts:
  {"fileName":"/src/projects/project/src/b/ba/randomFile.ts","pollingInterval":250}
/src/projects/project/src/b/randomfile.ts:
  {"fileName":"/src/projects/project/src/b/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/ca/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/ca/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/ca/caa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/ca/caa/caaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/cb/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/cb/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/daa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/eaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts","pollingInterval":250}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/f/fa/faa/faaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/package.json:
  {"fileName":"/src/projects/project/src/package.json","pollingInterval":250}
/src/projects/project/package.json:
  {"fileName":"/src/projects/project/package.json","pollingInterval":250}
/src/projects/project/src/a/package.json:
  {"fileName":"/src/projects/project/src/a/package.json","pollingInterval":250}
/src/projects/project/src/b/ba/package.json:
  {"fileName":"/src/projects/project/src/b/ba/package.json","pollingInterval":250}
/src/projects/project/src/b/package.json:
  {"fileName":"/src/projects/project/src/b/package.json","pollingInterval":250}
/src/projects/project/src/c/ca/package.json:
  {"fileName":"/src/projects/project/src/c/ca/package.json","pollingInterval":250}
/src/projects/project/src/c/package.json:
  {"fileName":"/src/projects/project/src/c/package.json","pollingInterval":250}
/src/projects/project/src/c/ca/caa/package.json:
  {"fileName":"/src/projects/project/src/c/ca/caa/package.json","pollingInterval":250}
/src/projects/project/src/c/ca/caa/caaa/package.json:
  {"fileName":"/src/projects/project/src/c/ca/caa/caaa/package.json","pollingInterval":250}
/src/projects/project/src/c/cb/package.json:
  {"fileName":"/src/projects/project/src/c/cb/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/y/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/y/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/package.json","pollingInterval":250}
/src/projects/project/src/d/da/package.json:
  {"fileName":"/src/projects/project/src/d/da/package.json","pollingInterval":250}
/src/projects/project/src/d/package.json:
  {"fileName":"/src/projects/project/src/d/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/package.json:
  {"fileName":"/src/projects/project/src/e/ea/package.json","pollingInterval":250}
/src/projects/project/src/e/package.json:
  {"fileName":"/src/projects/project/src/e/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/y/z/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/y/z/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/y/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/y/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/package.json:
  {"fileName":"/src/projects/project/src/f/fa/package.json","pollingInterval":250}
/src/projects/project/src/f/package.json:
  {"fileName":"/src/projects/project/src/f/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/faaa/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/faaa/package.json","pollingInterval":250}
/a/lib/package.json:
  {"fileName":"/a/lib/package.json","pollingInterval":250}
/a/package.json:
  {"fileName":"/a/package.json","pollingInterval":250}
/package.json:
  {"fileName":"/package.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/src/projects/project/out/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.es2016.full.d.ts","../src/fileb.mts","../src/filea.ts","../src/randomfile.ts","../src/a/randomfile.ts","../src/b/ba/randomfile.ts","../src/b/randomfile.ts","../src/c/ca/randomfile.ts","../src/c/ca/caa/randomfile.ts","../src/c/ca/caa/caaa/randomfile.ts","../src/c/cb/randomfile.ts","../src/d/da/daa/daaa/x/y/z/randomfile.ts","../src/d/da/daa/daaa/randomfile.ts","../src/d/da/daa/randomfile.ts","../src/d/da/randomfile.ts","../src/e/ea/randomfile.ts","../src/e/ea/eaa/randomfile.ts","../src/e/ea/eaa/eaaa/randomfile.ts","../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts","../src/f/fa/faa/x/y/z/randomfile.ts","../src/f/fa/faa/faaa/randomfile.ts","../src","../src/fileB.mts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"3524703962-export function foo() {}","signature":"-5677608893-export declare function foo(): void;\n","impliedFormat":99},{"version":"-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n","signature":"-3531856636-export {};\n","impliedFormat":99},{"version":"-9547279430-export const x = 10;export const y = 10;","signature":"-18799098802-export declare const x = 10;\nexport declare const y = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99}],"options":{"cacheResolutions":true,"composite":true,"module":100,"outDir":"./","target":3},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,5,6,7,10,9,8,11,13,12,14,15,18,19,17,16,21,20,3,2,4],"latestChangedDtsFile":"./f/fa/faa/faaa/randomFile.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":23}}],"names":["./fileB.mjs"],"resolutionEntries":[[1,1,99]],"modules":[[22,[1]]]}},"version":"FakeTSVersion"}

//// [/src/projects/project/out/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.es2016.full.d.ts",
      "../src/fileb.mts",
      "../src/filea.ts",
      "../src/randomfile.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src",
      "../src/fileB.mts"
    ],
    "fileNamesList": [
      [
        "../src/fileb.mts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.es2016.full.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../src/fileb.mts": {
        "version": "3524703962-export function foo() {}",
        "signature": "-5677608893-export declare function foo(): void;\n",
        "impliedFormat": "esnext"
      },
      "../src/filea.ts": {
        "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "signature": "-3531856636-export {};\n",
        "impliedFormat": "esnext"
      },
      "../src/randomfile.ts": {
        "version": "-9547279430-export const x = 10;export const y = 10;",
        "signature": "-18799098802-export declare const x = 10;\nexport declare const y = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/a/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/b/ba/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/b/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/c/ca/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/c/ca/caa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/c/ca/caa/caaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/c/cb/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/d/da/daa/daaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/d/da/daa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/d/da/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/e/ea/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/e/ea/eaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/e/ea/eaa/eaaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/f/fa/faa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/f/fa/faa/faaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 100,
      "outDir": "./",
      "target": 3
    },
    "referencedMap": {
      "../src/filea.ts": [
        "../src/fileb.mts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.es2016.full.d.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      "../src/filea.ts",
      "../src/fileb.mts",
      "../src/randomfile.ts"
    ],
    "latestChangedDtsFile": "./f/fa/faa/faaa/randomFile.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "../src/fileB.mts"
          }
        }
      ],
      "names": [
        "./fileB.mjs"
      ],
      "resolutionEntries": [
        [
          "./fileB.mjs",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "../src/fileB.mts"
            }
          },
          "esnext"
        ]
      ],
      "modules": [
        [
          "../src",
          [
            [
              "./fileB.mjs",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "../src/fileB.mts"
                }
              },
              "esnext"
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 4175
}

//// [/src/projects/project/out/fileB.mjs]
export function foo() { }


//// [/src/projects/project/out/fileB.d.mts]
export declare function foo(): void;


//// [/src/projects/project/out/fileA.js]
import { foo } from "./fileB.mjs";
foo();


//// [/src/projects/project/out/fileA.d.ts]
export {};


//// [/src/projects/project/out/randomFile.js]
export const x = 10;
export const y = 10;


//// [/src/projects/project/out/randomFile.d.ts]
export declare const x = 10;
export declare const y = 10;


//// [/src/projects/project/out/a/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/a/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/b/ba/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/b/ba/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/b/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/b/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/c/ca/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/c/ca/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/c/ca/caa/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/c/ca/caa/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/c/ca/caa/caaa/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/c/ca/caa/caaa/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/c/cb/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/c/cb/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/d/da/daa/daaa/x/y/z/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/d/da/daa/daaa/x/y/z/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/d/da/daa/daaa/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/d/da/daa/daaa/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/d/da/daa/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/d/da/daa/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/d/da/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/d/da/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/e/ea/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/e/ea/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/e/ea/eaa/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/e/ea/eaa/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/e/ea/eaa/eaaa/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/e/ea/eaa/eaaa/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/e/ea/eaa/eaaa/x/y/z/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/e/ea/eaa/eaaa/x/y/z/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/f/fa/faa/x/y/z/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/f/fa/faa/x/y/z/randomFile.d.ts]
export declare const x = 10;


//// [/src/projects/project/out/f/fa/faa/faaa/randomFile.js]
export const x = 10;


//// [/src/projects/project/out/f/fa/faa/faaa/randomFile.d.ts]
export declare const x = 10;



Change:: Modify package.json file to remove type module and random edit

Input::
//// [/src/projects/project/src/randomFile.ts]
export const x = 10;export const y = 10;export const z = 10;

//// [/src/projects/project/package.json]
{"name":"app","version":"1.0.0"}


Output::
FileWatcher:: Triggered with /src/projects/project/package.json 1:: WatchInfo: /src/projects/project/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
Elapsed:: *ms FileWatcher:: Triggered with /src/projects/project/package.json 1:: WatchInfo: /src/projects/project/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Triggered with /src/projects/project/src/randomFile.ts 1:: WatchInfo: /src/projects/project/src/randomFile.ts 250 undefined Source file /src/projects/project/src/tsconfig.json
Elapsed:: *ms FileWatcher:: Triggered with /src/projects/project/src/randomFile.ts 1:: WatchInfo: /src/projects/project/src/randomFile.ts 250 undefined Source file /src/projects/project/src/tsconfig.json
[[90m12:05:08 AM[0m] File change detected. Starting incremental compilation...

File '/src/projects/project/src/package.json' does not exist.
Found 'package.json' at '/src/projects/project/package.json'.
'package.json' does not have a 'typesVersions' field.
======== Resolving module './fileB.mjs' from '/src/projects/project/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Loading module as file / folder, candidate module location '/src/projects/project/src/fileB.mjs', target file type 'TypeScript'.
File '/src/projects/project/src/fileB.mjs.ts' does not exist.
File '/src/projects/project/src/fileB.mjs.tsx' does not exist.
File '/src/projects/project/src/fileB.mjs.d.ts' does not exist.
File name '/src/projects/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/src/projects/project/src/fileB.mts' exist - use it as a name resolution result.
======== Module name './fileB.mjs' was successfully resolved to '/src/projects/project/src/fileB.mts'. ========
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/a/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/b/ba/package.json' does not exist.
File '/src/projects/project/src/b/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/c/ca/package.json' does not exist.
File '/src/projects/project/src/c/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/c/ca/caa/package.json' does not exist.
File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/c/ca/caa/caaa/package.json' does not exist.
File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/c/cb/package.json' does not exist.
File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/x/y/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/x/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/package.json' does not exist.
File '/src/projects/project/src/d/da/package.json' does not exist.
File '/src/projects/project/src/d/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/e/ea/package.json' does not exist.
File '/src/projects/project/src/e/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/package.json' does not exist.
File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/f/fa/faa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/x/y/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/x/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/package.json' does not exist.
File '/src/projects/project/src/f/fa/package.json' does not exist.
File '/src/projects/project/src/f/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/f/fa/faa/faaa/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1471: [0mModule './fileB.mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../../../a/lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/fileA.ts'
  Part of 'files' list in tsconfig.json
src/fileA.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/a/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/b/ba/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/b/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/c/ca/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/c/ca/caa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/c/ca/caa/caaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/c/cb/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/d/da/daa/daaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/d/da/daa/daaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/d/da/daa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/d/da/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/e/ea/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/e/ea/eaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/e/ea/eaa/eaaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/f/fa/faa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/f/fa/faa/faaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
[[90m12:05:16 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/src/projects/project/src/fileA.ts","/src/projects/project/src/fileB.mts","/src/projects/project/src/randomFile.ts","/src/projects/project/src/a/randomFile.ts","/src/projects/project/src/b/ba/randomFile.ts","/src/projects/project/src/b/randomFile.ts","/src/projects/project/src/c/ca/randomFile.ts","/src/projects/project/src/c/ca/caa/randomFile.ts","/src/projects/project/src/c/ca/caa/caaa/randomFile.ts","/src/projects/project/src/c/cb/randomFile.ts","/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts","/src/projects/project/src/d/da/daa/daaa/randomFile.ts","/src/projects/project/src/d/da/daa/randomFile.ts","/src/projects/project/src/d/da/randomFile.ts","/src/projects/project/src/e/ea/randomFile.ts","/src/projects/project/src/e/ea/eaa/randomFile.ts","/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts","/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts","/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts","/src/projects/project/src/f/fa/faa/faaa/randomFile.ts"]
Program options: {"target":3,"composite":true,"module":100,"outDir":"/src/projects/project/out","cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/projects/project/src/tsconfig.json"}
Program structureReused: SafeModuleCache
Program files::
/a/lib/lib.es2016.full.d.ts
/src/projects/project/src/fileB.mts
/src/projects/project/src/fileA.ts
/src/projects/project/src/randomFile.ts
/src/projects/project/src/a/randomFile.ts
/src/projects/project/src/b/ba/randomFile.ts
/src/projects/project/src/b/randomFile.ts
/src/projects/project/src/c/ca/randomFile.ts
/src/projects/project/src/c/ca/caa/randomFile.ts
/src/projects/project/src/c/ca/caa/caaa/randomFile.ts
/src/projects/project/src/c/cb/randomFile.ts
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
/src/projects/project/src/d/da/daa/daaa/randomFile.ts
/src/projects/project/src/d/da/daa/randomFile.ts
/src/projects/project/src/d/da/randomFile.ts
/src/projects/project/src/e/ea/randomFile.ts
/src/projects/project/src/e/ea/eaa/randomFile.ts
/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
/src/projects/project/src/f/fa/faa/faaa/randomFile.ts

Semantic diagnostics in builder refreshed for::
/src/projects/project/src/fileA.ts
/src/projects/project/src/randomFile.ts
/src/projects/project/src/a/randomFile.ts
/src/projects/project/src/b/ba/randomFile.ts
/src/projects/project/src/b/randomFile.ts
/src/projects/project/src/c/ca/randomFile.ts
/src/projects/project/src/c/ca/caa/randomFile.ts
/src/projects/project/src/c/ca/caa/caaa/randomFile.ts
/src/projects/project/src/c/cb/randomFile.ts
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
/src/projects/project/src/d/da/daa/daaa/randomFile.ts
/src/projects/project/src/d/da/daa/randomFile.ts
/src/projects/project/src/d/da/randomFile.ts
/src/projects/project/src/e/ea/randomFile.ts
/src/projects/project/src/e/ea/eaa/randomFile.ts
/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
/src/projects/project/src/f/fa/faa/faaa/randomFile.ts

Shape signatures in builder refreshed for::
/src/projects/project/src/filea.ts (computed .d.ts)
/src/projects/project/src/randomfile.ts (computed .d.ts)
/src/projects/project/src/a/randomfile.ts (computed .d.ts)
/src/projects/project/src/b/ba/randomfile.ts (computed .d.ts)
/src/projects/project/src/b/randomfile.ts (computed .d.ts)
/src/projects/project/src/c/ca/randomfile.ts (computed .d.ts)
/src/projects/project/src/c/ca/caa/randomfile.ts (computed .d.ts)
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts (computed .d.ts)
/src/projects/project/src/c/cb/randomfile.ts (computed .d.ts)
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts (computed .d.ts)
/src/projects/project/src/d/da/daa/daaa/randomfile.ts (computed .d.ts)
/src/projects/project/src/d/da/daa/randomfile.ts (computed .d.ts)
/src/projects/project/src/d/da/randomfile.ts (computed .d.ts)
/src/projects/project/src/e/ea/randomfile.ts (computed .d.ts)
/src/projects/project/src/e/ea/eaa/randomfile.ts (computed .d.ts)
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts (computed .d.ts)
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts (computed .d.ts)
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts (computed .d.ts)
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts (computed .d.ts)

WatchedFiles::
/src/projects/project/src/tsconfig.json:
  {"fileName":"/src/projects/project/src/tsconfig.json","pollingInterval":250}
/src/projects/project/src/filea.ts:
  {"fileName":"/src/projects/project/src/fileA.ts","pollingInterval":250}
/src/projects/project/src/fileb.mts:
  {"fileName":"/src/projects/project/src/fileB.mts","pollingInterval":250}
/src/projects/project/src/randomfile.ts:
  {"fileName":"/src/projects/project/src/randomFile.ts","pollingInterval":250}
/src/projects/project/src/a/randomfile.ts:
  {"fileName":"/src/projects/project/src/a/randomFile.ts","pollingInterval":250}
/src/projects/project/src/b/ba/randomfile.ts:
  {"fileName":"/src/projects/project/src/b/ba/randomFile.ts","pollingInterval":250}
/src/projects/project/src/b/randomfile.ts:
  {"fileName":"/src/projects/project/src/b/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/ca/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/ca/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/ca/caa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/ca/caa/caaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/cb/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/cb/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/daa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/eaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts","pollingInterval":250}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/f/fa/faa/faaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/package.json:
  {"fileName":"/src/projects/project/src/package.json","pollingInterval":250}
/src/projects/project/package.json:
  {"fileName":"/src/projects/project/package.json","pollingInterval":250}
/src/projects/project/src/a/package.json:
  {"fileName":"/src/projects/project/src/a/package.json","pollingInterval":250}
/src/projects/project/src/b/ba/package.json:
  {"fileName":"/src/projects/project/src/b/ba/package.json","pollingInterval":250}
/src/projects/project/src/b/package.json:
  {"fileName":"/src/projects/project/src/b/package.json","pollingInterval":250}
/src/projects/project/src/c/ca/package.json:
  {"fileName":"/src/projects/project/src/c/ca/package.json","pollingInterval":250}
/src/projects/project/src/c/package.json:
  {"fileName":"/src/projects/project/src/c/package.json","pollingInterval":250}
/src/projects/project/src/c/ca/caa/package.json:
  {"fileName":"/src/projects/project/src/c/ca/caa/package.json","pollingInterval":250}
/src/projects/project/src/c/ca/caa/caaa/package.json:
  {"fileName":"/src/projects/project/src/c/ca/caa/caaa/package.json","pollingInterval":250}
/src/projects/project/src/c/cb/package.json:
  {"fileName":"/src/projects/project/src/c/cb/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/y/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/y/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/package.json","pollingInterval":250}
/src/projects/project/src/d/da/package.json:
  {"fileName":"/src/projects/project/src/d/da/package.json","pollingInterval":250}
/src/projects/project/src/d/package.json:
  {"fileName":"/src/projects/project/src/d/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/package.json:
  {"fileName":"/src/projects/project/src/e/ea/package.json","pollingInterval":250}
/src/projects/project/src/e/package.json:
  {"fileName":"/src/projects/project/src/e/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/y/z/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/y/z/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/y/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/y/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/package.json:
  {"fileName":"/src/projects/project/src/f/fa/package.json","pollingInterval":250}
/src/projects/project/src/f/package.json:
  {"fileName":"/src/projects/project/src/f/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/faaa/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/faaa/package.json","pollingInterval":250}
/a/lib/package.json:
  {"fileName":"/a/lib/package.json","pollingInterval":250}
/a/package.json:
  {"fileName":"/a/package.json","pollingInterval":250}
/package.json:
  {"fileName":"/package.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/src/projects/project/out/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.es2016.full.d.ts","../src/fileb.mts","../src/filea.ts","../src/randomfile.ts","../src/a/randomfile.ts","../src/b/ba/randomfile.ts","../src/b/randomfile.ts","../src/c/ca/randomfile.ts","../src/c/ca/caa/randomfile.ts","../src/c/ca/caa/caaa/randomfile.ts","../src/c/cb/randomfile.ts","../src/d/da/daa/daaa/x/y/z/randomfile.ts","../src/d/da/daa/daaa/randomfile.ts","../src/d/da/daa/randomfile.ts","../src/d/da/randomfile.ts","../src/e/ea/randomfile.ts","../src/e/ea/eaa/randomfile.ts","../src/e/ea/eaa/eaaa/randomfile.ts","../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts","../src/f/fa/faa/x/y/z/randomfile.ts","../src/f/fa/faa/faaa/randomfile.ts","../src","../src/fileB.mts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"3524703962-export function foo() {}","signature":"-5677608893-export declare function foo(): void;\n","impliedFormat":99},{"version":"-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n","signature":"-3531856636-export {};\n","impliedFormat":1},{"version":"-8895866314-export const x = 10;export const y = 10;export const z = 10;","signature":"-26065391196-export declare const x = 10;\nexport declare const y = 10;\nexport declare const z = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1}],"options":{"cacheResolutions":true,"composite":true,"module":100,"outDir":"./","target":3},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,5,6,7,10,9,8,11,13,12,14,15,18,19,17,16,21,20,[3,[{"file":"../src/filea.ts","start":20,"length":13,"messageText":"Module './fileB.mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.","category":1,"code":1471}]],2,4],"affectedFilesPendingEmit":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[21,1],[20,1],[3,1],[4,1]],"emitSignatures":[[4,"-18799098802-export declare const x = 10;\nexport declare const y = 10;\n"]],"latestChangedDtsFile":"./f/fa/faa/faaa/randomFile.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":23}}],"names":["./fileB.mjs"],"resolutionEntries":[[1,1,1]],"modules":[[22,[1]]]}},"version":"FakeTSVersion"}

//// [/src/projects/project/out/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.es2016.full.d.ts",
      "../src/fileb.mts",
      "../src/filea.ts",
      "../src/randomfile.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src",
      "../src/fileB.mts"
    ],
    "fileNamesList": [
      [
        "../src/fileb.mts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.es2016.full.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../src/fileb.mts": {
        "version": "3524703962-export function foo() {}",
        "signature": "-5677608893-export declare function foo(): void;\n",
        "impliedFormat": "esnext"
      },
      "../src/filea.ts": {
        "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "signature": "-3531856636-export {};\n",
        "impliedFormat": "commonjs"
      },
      "../src/randomfile.ts": {
        "version": "-8895866314-export const x = 10;export const y = 10;export const z = 10;",
        "signature": "-26065391196-export declare const x = 10;\nexport declare const y = 10;\nexport declare const z = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/a/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/b/ba/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/b/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/caaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/c/cb/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/faaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 100,
      "outDir": "./",
      "target": 3
    },
    "referencedMap": {
      "../src/filea.ts": [
        "../src/fileb.mts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.es2016.full.d.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      [
        "../src/filea.ts",
        [
          {
            "file": "../src/filea.ts",
            "start": 20,
            "length": 13,
            "messageText": "Module './fileB.mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.",
            "category": 1,
            "code": 1471
          }
        ]
      ],
      "../src/fileb.mts",
      "../src/randomfile.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "../src/a/randomfile.ts",
        "Full"
      ],
      [
        "../src/b/ba/randomfile.ts",
        "Full"
      ],
      [
        "../src/b/randomfile.ts",
        "Full"
      ],
      [
        "../src/c/ca/caa/caaa/randomfile.ts",
        "Full"
      ],
      [
        "../src/c/ca/caa/randomfile.ts",
        "Full"
      ],
      [
        "../src/c/ca/randomfile.ts",
        "Full"
      ],
      [
        "../src/c/cb/randomfile.ts",
        "Full"
      ],
      [
        "../src/d/da/daa/daaa/randomfile.ts",
        "Full"
      ],
      [
        "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
        "Full"
      ],
      [
        "../src/d/da/daa/randomfile.ts",
        "Full"
      ],
      [
        "../src/d/da/randomfile.ts",
        "Full"
      ],
      [
        "../src/e/ea/eaa/eaaa/randomfile.ts",
        "Full"
      ],
      [
        "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
        "Full"
      ],
      [
        "../src/e/ea/eaa/randomfile.ts",
        "Full"
      ],
      [
        "../src/e/ea/randomfile.ts",
        "Full"
      ],
      [
        "../src/f/fa/faa/faaa/randomfile.ts",
        "Full"
      ],
      [
        "../src/f/fa/faa/x/y/z/randomfile.ts",
        "Full"
      ],
      [
        "../src/filea.ts",
        "Full"
      ],
      [
        "../src/randomfile.ts",
        "Full"
      ]
    ],
    "emitSignatures": [
      [
        "../src/randomfile.ts",
        "-18799098802-export declare const x = 10;\nexport declare const y = 10;\n"
      ]
    ],
    "latestChangedDtsFile": "./f/fa/faa/faaa/randomFile.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "../src/fileB.mts"
          }
        }
      ],
      "names": [
        "./fileB.mjs"
      ],
      "resolutionEntries": [
        [
          "./fileB.mjs",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "../src/fileB.mts"
            }
          },
          "commonjs"
        ]
      ],
      "modules": [
        [
          "../src",
          [
            [
              "./fileB.mjs",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "../src/fileB.mts"
                }
              },
              "commonjs"
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 4729
}


Change:: Delete package.json

Input::
//// [/src/projects/project/package.json] deleted

Output::
FileWatcher:: Triggered with /src/projects/project/package.json 2:: WatchInfo: /src/projects/project/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
Elapsed:: *ms FileWatcher:: Triggered with /src/projects/project/package.json 2:: WatchInfo: /src/projects/project/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
[[90m12:05:19 AM[0m] File change detected. Starting incremental compilation...

File '/src/projects/project/src/package.json' does not exist.
File '/src/projects/project/package.json' does not exist.
File '/src/projects/package.json' does not exist.
File '/src/package.json' does not exist.
File '/package.json' does not exist.
Reusing resolution of module './fileB.mjs' from '/src/projects/project/src/fileA.ts' found in cache from location '/src/projects/project/src', it was successfully resolved to '/src/projects/project/src/fileB.mts'.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/a/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/b/ba/package.json' does not exist.
File '/src/projects/project/src/b/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/ca/package.json' does not exist.
File '/src/projects/project/src/c/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/ca/caa/package.json' does not exist.
File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/ca/caa/caaa/package.json' does not exist.
File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/cb/package.json' does not exist.
File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/x/y/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/x/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/package.json' does not exist.
File '/src/projects/project/src/d/da/package.json' does not exist.
File '/src/projects/project/src/d/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/package.json' does not exist.
File '/src/projects/project/src/e/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/package.json' does not exist.
File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/f/fa/faa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/x/y/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/x/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/package.json' does not exist.
File '/src/projects/project/src/f/fa/package.json' does not exist.
File '/src/projects/project/src/f/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/f/fa/faa/faaa/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist according to earlier cached lookups.
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1471: [0mModule './fileB.mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../../../a/lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/fileA.ts'
  Part of 'files' list in tsconfig.json
src/fileA.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/a/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/b/ba/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/b/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/c/ca/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/c/ca/caa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/c/ca/caa/caaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/c/cb/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/d/da/daa/daaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/d/da/daa/daaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/d/da/daa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/d/da/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/e/ea/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/e/ea/eaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/e/ea/eaa/eaaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/f/fa/faa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/f/fa/faa/faaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
[[90m12:05:20 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/src/projects/project/src/fileA.ts","/src/projects/project/src/fileB.mts","/src/projects/project/src/randomFile.ts","/src/projects/project/src/a/randomFile.ts","/src/projects/project/src/b/ba/randomFile.ts","/src/projects/project/src/b/randomFile.ts","/src/projects/project/src/c/ca/randomFile.ts","/src/projects/project/src/c/ca/caa/randomFile.ts","/src/projects/project/src/c/ca/caa/caaa/randomFile.ts","/src/projects/project/src/c/cb/randomFile.ts","/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts","/src/projects/project/src/d/da/daa/daaa/randomFile.ts","/src/projects/project/src/d/da/daa/randomFile.ts","/src/projects/project/src/d/da/randomFile.ts","/src/projects/project/src/e/ea/randomFile.ts","/src/projects/project/src/e/ea/eaa/randomFile.ts","/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts","/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts","/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts","/src/projects/project/src/f/fa/faa/faaa/randomFile.ts"]
Program options: {"target":3,"composite":true,"module":100,"outDir":"/src/projects/project/out","cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/projects/project/src/tsconfig.json"}
Program structureReused: SafeModuleCache
Program files::
/a/lib/lib.es2016.full.d.ts
/src/projects/project/src/fileB.mts
/src/projects/project/src/fileA.ts
/src/projects/project/src/randomFile.ts
/src/projects/project/src/a/randomFile.ts
/src/projects/project/src/b/ba/randomFile.ts
/src/projects/project/src/b/randomFile.ts
/src/projects/project/src/c/ca/randomFile.ts
/src/projects/project/src/c/ca/caa/randomFile.ts
/src/projects/project/src/c/ca/caa/caaa/randomFile.ts
/src/projects/project/src/c/cb/randomFile.ts
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
/src/projects/project/src/d/da/daa/daaa/randomFile.ts
/src/projects/project/src/d/da/daa/randomFile.ts
/src/projects/project/src/d/da/randomFile.ts
/src/projects/project/src/e/ea/randomFile.ts
/src/projects/project/src/e/ea/eaa/randomFile.ts
/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
/src/projects/project/src/f/fa/faa/faaa/randomFile.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/src/projects/project/src/tsconfig.json:
  {"fileName":"/src/projects/project/src/tsconfig.json","pollingInterval":250}
/src/projects/project/src/filea.ts:
  {"fileName":"/src/projects/project/src/fileA.ts","pollingInterval":250}
/src/projects/project/src/fileb.mts:
  {"fileName":"/src/projects/project/src/fileB.mts","pollingInterval":250}
/src/projects/project/src/randomfile.ts:
  {"fileName":"/src/projects/project/src/randomFile.ts","pollingInterval":250}
/src/projects/project/src/a/randomfile.ts:
  {"fileName":"/src/projects/project/src/a/randomFile.ts","pollingInterval":250}
/src/projects/project/src/b/ba/randomfile.ts:
  {"fileName":"/src/projects/project/src/b/ba/randomFile.ts","pollingInterval":250}
/src/projects/project/src/b/randomfile.ts:
  {"fileName":"/src/projects/project/src/b/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/ca/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/ca/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/ca/caa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/ca/caa/caaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/cb/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/cb/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/daa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/eaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts","pollingInterval":250}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/f/fa/faa/faaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/package.json:
  {"fileName":"/src/projects/project/src/package.json","pollingInterval":250}
/src/projects/project/package.json:
  {"fileName":"/src/projects/project/package.json","pollingInterval":250}
/src/projects/project/src/a/package.json:
  {"fileName":"/src/projects/project/src/a/package.json","pollingInterval":250}
/src/projects/project/src/b/ba/package.json:
  {"fileName":"/src/projects/project/src/b/ba/package.json","pollingInterval":250}
/src/projects/project/src/b/package.json:
  {"fileName":"/src/projects/project/src/b/package.json","pollingInterval":250}
/src/projects/project/src/c/ca/package.json:
  {"fileName":"/src/projects/project/src/c/ca/package.json","pollingInterval":250}
/src/projects/project/src/c/package.json:
  {"fileName":"/src/projects/project/src/c/package.json","pollingInterval":250}
/src/projects/project/src/c/ca/caa/package.json:
  {"fileName":"/src/projects/project/src/c/ca/caa/package.json","pollingInterval":250}
/src/projects/project/src/c/ca/caa/caaa/package.json:
  {"fileName":"/src/projects/project/src/c/ca/caa/caaa/package.json","pollingInterval":250}
/src/projects/project/src/c/cb/package.json:
  {"fileName":"/src/projects/project/src/c/cb/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/y/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/y/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/package.json","pollingInterval":250}
/src/projects/project/src/d/da/package.json:
  {"fileName":"/src/projects/project/src/d/da/package.json","pollingInterval":250}
/src/projects/project/src/d/package.json:
  {"fileName":"/src/projects/project/src/d/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/package.json:
  {"fileName":"/src/projects/project/src/e/ea/package.json","pollingInterval":250}
/src/projects/project/src/e/package.json:
  {"fileName":"/src/projects/project/src/e/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/y/z/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/y/z/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/y/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/y/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/package.json:
  {"fileName":"/src/projects/project/src/f/fa/package.json","pollingInterval":250}
/src/projects/project/src/f/package.json:
  {"fileName":"/src/projects/project/src/f/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/faaa/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/faaa/package.json","pollingInterval":250}
/a/lib/package.json:
  {"fileName":"/a/lib/package.json","pollingInterval":250}
/a/package.json:
  {"fileName":"/a/package.json","pollingInterval":250}
/package.json:
  {"fileName":"/package.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined


Change:: Add package json file with type module

Input::
//// [/src/projects/project/package.json]
{"name":"app","version":"1.0.0","type":"module"}


Output::
FileWatcher:: Triggered with /src/projects/project/package.json 0:: WatchInfo: /src/projects/project/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
Elapsed:: *ms FileWatcher:: Triggered with /src/projects/project/package.json 0:: WatchInfo: /src/projects/project/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
[[90m12:05:23 AM[0m] File change detected. Starting incremental compilation...

File '/src/projects/project/src/package.json' does not exist.
Found 'package.json' at '/src/projects/project/package.json'.
'package.json' does not have a 'typesVersions' field.
======== Resolving module './fileB.mjs' from '/src/projects/project/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Loading module as file / folder, candidate module location '/src/projects/project/src/fileB.mjs', target file type 'TypeScript'.
File name '/src/projects/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/src/projects/project/src/fileB.mts' exist - use it as a name resolution result.
======== Module name './fileB.mjs' was successfully resolved to '/src/projects/project/src/fileB.mts'. ========
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/a/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/b/ba/package.json' does not exist.
File '/src/projects/project/src/b/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/c/ca/package.json' does not exist.
File '/src/projects/project/src/c/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/c/ca/caa/package.json' does not exist.
File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/c/ca/caa/caaa/package.json' does not exist.
File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/c/cb/package.json' does not exist.
File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/x/y/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/x/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/package.json' does not exist.
File '/src/projects/project/src/d/da/package.json' does not exist.
File '/src/projects/project/src/d/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/e/ea/package.json' does not exist.
File '/src/projects/project/src/e/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/package.json' does not exist.
File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/f/fa/faa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/x/y/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/x/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/package.json' does not exist.
File '/src/projects/project/src/f/fa/package.json' does not exist.
File '/src/projects/project/src/f/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/src/projects/project/src/f/fa/faa/faaa/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
../../../a/lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/fileA.ts'
  Part of 'files' list in tsconfig.json
src/fileA.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/a/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/b/ba/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/b/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/c/ca/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/c/ca/caa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/c/ca/caa/caaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/c/cb/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/d/da/daa/daaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/d/da/daa/daaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/d/da/daa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/d/da/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/e/ea/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/e/ea/eaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/e/ea/eaa/eaaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/f/fa/faa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/f/fa/faa/faaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
[[90m12:06:31 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/src/projects/project/src/fileA.ts","/src/projects/project/src/fileB.mts","/src/projects/project/src/randomFile.ts","/src/projects/project/src/a/randomFile.ts","/src/projects/project/src/b/ba/randomFile.ts","/src/projects/project/src/b/randomFile.ts","/src/projects/project/src/c/ca/randomFile.ts","/src/projects/project/src/c/ca/caa/randomFile.ts","/src/projects/project/src/c/ca/caa/caaa/randomFile.ts","/src/projects/project/src/c/cb/randomFile.ts","/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts","/src/projects/project/src/d/da/daa/daaa/randomFile.ts","/src/projects/project/src/d/da/daa/randomFile.ts","/src/projects/project/src/d/da/randomFile.ts","/src/projects/project/src/e/ea/randomFile.ts","/src/projects/project/src/e/ea/eaa/randomFile.ts","/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts","/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts","/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts","/src/projects/project/src/f/fa/faa/faaa/randomFile.ts"]
Program options: {"target":3,"composite":true,"module":100,"outDir":"/src/projects/project/out","cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/projects/project/src/tsconfig.json"}
Program structureReused: SafeModuleCache
Program files::
/a/lib/lib.es2016.full.d.ts
/src/projects/project/src/fileB.mts
/src/projects/project/src/fileA.ts
/src/projects/project/src/randomFile.ts
/src/projects/project/src/a/randomFile.ts
/src/projects/project/src/b/ba/randomFile.ts
/src/projects/project/src/b/randomFile.ts
/src/projects/project/src/c/ca/randomFile.ts
/src/projects/project/src/c/ca/caa/randomFile.ts
/src/projects/project/src/c/ca/caa/caaa/randomFile.ts
/src/projects/project/src/c/cb/randomFile.ts
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
/src/projects/project/src/d/da/daa/daaa/randomFile.ts
/src/projects/project/src/d/da/daa/randomFile.ts
/src/projects/project/src/d/da/randomFile.ts
/src/projects/project/src/e/ea/randomFile.ts
/src/projects/project/src/e/ea/eaa/randomFile.ts
/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
/src/projects/project/src/f/fa/faa/faaa/randomFile.ts

Semantic diagnostics in builder refreshed for::
/src/projects/project/src/fileA.ts
/src/projects/project/src/randomFile.ts
/src/projects/project/src/a/randomFile.ts
/src/projects/project/src/b/ba/randomFile.ts
/src/projects/project/src/b/randomFile.ts
/src/projects/project/src/c/ca/randomFile.ts
/src/projects/project/src/c/ca/caa/randomFile.ts
/src/projects/project/src/c/ca/caa/caaa/randomFile.ts
/src/projects/project/src/c/cb/randomFile.ts
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
/src/projects/project/src/d/da/daa/daaa/randomFile.ts
/src/projects/project/src/d/da/daa/randomFile.ts
/src/projects/project/src/d/da/randomFile.ts
/src/projects/project/src/e/ea/randomFile.ts
/src/projects/project/src/e/ea/eaa/randomFile.ts
/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
/src/projects/project/src/f/fa/faa/faaa/randomFile.ts

Shape signatures in builder refreshed for::
/src/projects/project/src/filea.ts (computed .d.ts)
/src/projects/project/src/randomfile.ts (computed .d.ts)
/src/projects/project/src/a/randomfile.ts (computed .d.ts)
/src/projects/project/src/b/ba/randomfile.ts (computed .d.ts)
/src/projects/project/src/b/randomfile.ts (computed .d.ts)
/src/projects/project/src/c/ca/randomfile.ts (computed .d.ts)
/src/projects/project/src/c/ca/caa/randomfile.ts (computed .d.ts)
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts (computed .d.ts)
/src/projects/project/src/c/cb/randomfile.ts (computed .d.ts)
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts (computed .d.ts)
/src/projects/project/src/d/da/daa/daaa/randomfile.ts (computed .d.ts)
/src/projects/project/src/d/da/daa/randomfile.ts (computed .d.ts)
/src/projects/project/src/d/da/randomfile.ts (computed .d.ts)
/src/projects/project/src/e/ea/randomfile.ts (computed .d.ts)
/src/projects/project/src/e/ea/eaa/randomfile.ts (computed .d.ts)
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts (computed .d.ts)
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts (computed .d.ts)
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts (computed .d.ts)
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts (computed .d.ts)

WatchedFiles::
/src/projects/project/src/tsconfig.json:
  {"fileName":"/src/projects/project/src/tsconfig.json","pollingInterval":250}
/src/projects/project/src/filea.ts:
  {"fileName":"/src/projects/project/src/fileA.ts","pollingInterval":250}
/src/projects/project/src/fileb.mts:
  {"fileName":"/src/projects/project/src/fileB.mts","pollingInterval":250}
/src/projects/project/src/randomfile.ts:
  {"fileName":"/src/projects/project/src/randomFile.ts","pollingInterval":250}
/src/projects/project/src/a/randomfile.ts:
  {"fileName":"/src/projects/project/src/a/randomFile.ts","pollingInterval":250}
/src/projects/project/src/b/ba/randomfile.ts:
  {"fileName":"/src/projects/project/src/b/ba/randomFile.ts","pollingInterval":250}
/src/projects/project/src/b/randomfile.ts:
  {"fileName":"/src/projects/project/src/b/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/ca/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/ca/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/ca/caa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/ca/caa/caaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/cb/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/cb/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/daa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/eaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts","pollingInterval":250}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/f/fa/faa/faaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/package.json:
  {"fileName":"/src/projects/project/src/package.json","pollingInterval":250}
/src/projects/project/package.json:
  {"fileName":"/src/projects/project/package.json","pollingInterval":250}
/src/projects/project/src/a/package.json:
  {"fileName":"/src/projects/project/src/a/package.json","pollingInterval":250}
/src/projects/project/src/b/ba/package.json:
  {"fileName":"/src/projects/project/src/b/ba/package.json","pollingInterval":250}
/src/projects/project/src/b/package.json:
  {"fileName":"/src/projects/project/src/b/package.json","pollingInterval":250}
/src/projects/project/src/c/ca/package.json:
  {"fileName":"/src/projects/project/src/c/ca/package.json","pollingInterval":250}
/src/projects/project/src/c/package.json:
  {"fileName":"/src/projects/project/src/c/package.json","pollingInterval":250}
/src/projects/project/src/c/ca/caa/package.json:
  {"fileName":"/src/projects/project/src/c/ca/caa/package.json","pollingInterval":250}
/src/projects/project/src/c/ca/caa/caaa/package.json:
  {"fileName":"/src/projects/project/src/c/ca/caa/caaa/package.json","pollingInterval":250}
/src/projects/project/src/c/cb/package.json:
  {"fileName":"/src/projects/project/src/c/cb/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/y/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/y/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/package.json","pollingInterval":250}
/src/projects/project/src/d/da/package.json:
  {"fileName":"/src/projects/project/src/d/da/package.json","pollingInterval":250}
/src/projects/project/src/d/package.json:
  {"fileName":"/src/projects/project/src/d/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/package.json:
  {"fileName":"/src/projects/project/src/e/ea/package.json","pollingInterval":250}
/src/projects/project/src/e/package.json:
  {"fileName":"/src/projects/project/src/e/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/y/z/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/y/z/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/y/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/y/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/package.json:
  {"fileName":"/src/projects/project/src/f/fa/package.json","pollingInterval":250}
/src/projects/project/src/f/package.json:
  {"fileName":"/src/projects/project/src/f/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/faaa/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/faaa/package.json","pollingInterval":250}
/a/lib/package.json:
  {"fileName":"/a/lib/package.json","pollingInterval":250}
/a/package.json:
  {"fileName":"/a/package.json","pollingInterval":250}
/package.json:
  {"fileName":"/package.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/src/projects/project/out/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.es2016.full.d.ts","../src/fileb.mts","../src/filea.ts","../src/randomfile.ts","../src/a/randomfile.ts","../src/b/ba/randomfile.ts","../src/b/randomfile.ts","../src/c/ca/randomfile.ts","../src/c/ca/caa/randomfile.ts","../src/c/ca/caa/caaa/randomfile.ts","../src/c/cb/randomfile.ts","../src/d/da/daa/daaa/x/y/z/randomfile.ts","../src/d/da/daa/daaa/randomfile.ts","../src/d/da/daa/randomfile.ts","../src/d/da/randomfile.ts","../src/e/ea/randomfile.ts","../src/e/ea/eaa/randomfile.ts","../src/e/ea/eaa/eaaa/randomfile.ts","../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts","../src/f/fa/faa/x/y/z/randomfile.ts","../src/f/fa/faa/faaa/randomfile.ts","../src","../src/fileB.mts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"3524703962-export function foo() {}","signature":"-5677608893-export declare function foo(): void;\n","impliedFormat":99},{"version":"-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n","signature":"-3531856636-export {};\n","impliedFormat":99},{"version":"-8895866314-export const x = 10;export const y = 10;export const z = 10;","signature":"-26065391196-export declare const x = 10;\nexport declare const y = 10;\nexport declare const z = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99}],"options":{"cacheResolutions":true,"composite":true,"module":100,"outDir":"./","target":3},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,5,6,7,10,9,8,11,13,12,14,15,18,19,17,16,21,20,3,2,4],"latestChangedDtsFile":"./randomFile.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":23}}],"names":["./fileB.mjs"],"resolutionEntries":[[1,1,99]],"modules":[[22,[1]]]}},"version":"FakeTSVersion"}

//// [/src/projects/project/out/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.es2016.full.d.ts",
      "../src/fileb.mts",
      "../src/filea.ts",
      "../src/randomfile.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src",
      "../src/fileB.mts"
    ],
    "fileNamesList": [
      [
        "../src/fileb.mts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.es2016.full.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../src/fileb.mts": {
        "version": "3524703962-export function foo() {}",
        "signature": "-5677608893-export declare function foo(): void;\n",
        "impliedFormat": "esnext"
      },
      "../src/filea.ts": {
        "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "signature": "-3531856636-export {};\n",
        "impliedFormat": "esnext"
      },
      "../src/randomfile.ts": {
        "version": "-8895866314-export const x = 10;export const y = 10;export const z = 10;",
        "signature": "-26065391196-export declare const x = 10;\nexport declare const y = 10;\nexport declare const z = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/a/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/b/ba/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/b/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/c/ca/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/c/ca/caa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/c/ca/caa/caaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/c/cb/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/d/da/daa/daaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/d/da/daa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/d/da/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/e/ea/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/e/ea/eaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/e/ea/eaa/eaaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/f/fa/faa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      },
      "../src/f/fa/faa/faaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "esnext"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 100,
      "outDir": "./",
      "target": 3
    },
    "referencedMap": {
      "../src/filea.ts": [
        "../src/fileb.mts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.es2016.full.d.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      "../src/filea.ts",
      "../src/fileb.mts",
      "../src/randomfile.ts"
    ],
    "latestChangedDtsFile": "./randomFile.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "../src/fileB.mts"
          }
        }
      ],
      "names": [
        "./fileB.mjs"
      ],
      "resolutionEntries": [
        [
          "./fileB.mjs",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "../src/fileB.mts"
            }
          },
          "esnext"
        ]
      ],
      "modules": [
        [
          "../src",
          [
            [
              "./fileB.mjs",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "../src/fileB.mts"
                }
              },
              "esnext"
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 4211
}

//// [/src/projects/project/out/fileA.js] file written with same contents
//// [/src/projects/project/out/randomFile.js]
export const x = 10;
export const y = 10;
export const z = 10;


//// [/src/projects/project/out/randomFile.d.ts]
export declare const x = 10;
export declare const y = 10;
export declare const z = 10;


//// [/src/projects/project/out/a/randomFile.js] file written with same contents
//// [/src/projects/project/out/b/ba/randomFile.js] file written with same contents
//// [/src/projects/project/out/b/randomFile.js] file written with same contents
//// [/src/projects/project/out/c/ca/randomFile.js] file written with same contents
//// [/src/projects/project/out/c/ca/caa/randomFile.js] file written with same contents
//// [/src/projects/project/out/c/ca/caa/caaa/randomFile.js] file written with same contents
//// [/src/projects/project/out/c/cb/randomFile.js] file written with same contents
//// [/src/projects/project/out/d/da/daa/daaa/x/y/z/randomFile.js] file written with same contents
//// [/src/projects/project/out/d/da/daa/daaa/randomFile.js] file written with same contents
//// [/src/projects/project/out/d/da/daa/randomFile.js] file written with same contents
//// [/src/projects/project/out/d/da/randomFile.js] file written with same contents
//// [/src/projects/project/out/e/ea/randomFile.js] file written with same contents
//// [/src/projects/project/out/e/ea/eaa/randomFile.js] file written with same contents
//// [/src/projects/project/out/e/ea/eaa/eaaa/randomFile.js] file written with same contents
//// [/src/projects/project/out/e/ea/eaa/eaaa/x/y/z/randomFile.js] file written with same contents
//// [/src/projects/project/out/f/fa/faa/x/y/z/randomFile.js] file written with same contents
//// [/src/projects/project/out/f/fa/faa/faaa/randomFile.js] file written with same contents

Change:: Delete package.json and random edit and random edit

Input::
//// [/src/projects/project/src/randomFile.ts]
export const x = 10;export const y = 10;export const z = 10;export const k = 10;

//// [/src/projects/project/package.json] deleted

Output::
FileWatcher:: Triggered with /src/projects/project/package.json 2:: WatchInfo: /src/projects/project/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
Elapsed:: *ms FileWatcher:: Triggered with /src/projects/project/package.json 2:: WatchInfo: /src/projects/project/package.json 2000 undefined package.json file /src/projects/project/src/tsconfig.json
FileWatcher:: Triggered with /src/projects/project/src/randomFile.ts 1:: WatchInfo: /src/projects/project/src/randomFile.ts 250 undefined Source file /src/projects/project/src/tsconfig.json
Elapsed:: *ms FileWatcher:: Triggered with /src/projects/project/src/randomFile.ts 1:: WatchInfo: /src/projects/project/src/randomFile.ts 250 undefined Source file /src/projects/project/src/tsconfig.json
[[90m12:06:35 AM[0m] File change detected. Starting incremental compilation...

File '/src/projects/project/src/package.json' does not exist.
File '/src/projects/project/package.json' does not exist.
File '/src/projects/package.json' does not exist.
File '/src/package.json' does not exist.
File '/package.json' does not exist.
======== Resolving module './fileB.mjs' from '/src/projects/project/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Loading module as file / folder, candidate module location '/src/projects/project/src/fileB.mjs', target file type 'TypeScript'.
File '/src/projects/project/src/fileB.mjs.ts' does not exist.
File '/src/projects/project/src/fileB.mjs.tsx' does not exist.
File '/src/projects/project/src/fileB.mjs.d.ts' does not exist.
File name '/src/projects/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/src/projects/project/src/fileB.mts' exist - use it as a name resolution result.
======== Module name './fileB.mjs' was successfully resolved to '/src/projects/project/src/fileB.mts'. ========
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/a/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/b/ba/package.json' does not exist.
File '/src/projects/project/src/b/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/b/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/ca/package.json' does not exist.
File '/src/projects/project/src/c/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/ca/caa/package.json' does not exist.
File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/ca/caa/caaa/package.json' does not exist.
File '/src/projects/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/c/cb/package.json' does not exist.
File '/src/projects/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/x/y/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/x/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist.
File '/src/projects/project/src/d/da/daa/package.json' does not exist.
File '/src/projects/project/src/d/da/package.json' does not exist.
File '/src/projects/project/src/d/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/package.json' does not exist.
File '/src/projects/project/src/e/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/package.json' does not exist.
File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/x/package.json' does not exist.
File '/src/projects/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/f/fa/faa/x/y/z/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/x/y/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/x/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/package.json' does not exist.
File '/src/projects/project/src/f/fa/package.json' does not exist.
File '/src/projects/project/src/f/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/f/fa/faa/faaa/package.json' does not exist.
File '/src/projects/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/f/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist according to earlier cached lookups.
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1471: [0mModule './fileB.mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../../../a/lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/fileA.ts'
  Part of 'files' list in tsconfig.json
src/fileA.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/a/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/b/ba/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/b/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/c/ca/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/c/ca/caa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/c/ca/caa/caaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/c/cb/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/d/da/daa/daaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/d/da/daa/daaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/d/da/daa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/d/da/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/e/ea/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/e/ea/eaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/e/ea/eaa/eaaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/f/fa/faa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/f/fa/faa/faaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
[[90m12:06:43 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/src/projects/project/src/fileA.ts","/src/projects/project/src/fileB.mts","/src/projects/project/src/randomFile.ts","/src/projects/project/src/a/randomFile.ts","/src/projects/project/src/b/ba/randomFile.ts","/src/projects/project/src/b/randomFile.ts","/src/projects/project/src/c/ca/randomFile.ts","/src/projects/project/src/c/ca/caa/randomFile.ts","/src/projects/project/src/c/ca/caa/caaa/randomFile.ts","/src/projects/project/src/c/cb/randomFile.ts","/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts","/src/projects/project/src/d/da/daa/daaa/randomFile.ts","/src/projects/project/src/d/da/daa/randomFile.ts","/src/projects/project/src/d/da/randomFile.ts","/src/projects/project/src/e/ea/randomFile.ts","/src/projects/project/src/e/ea/eaa/randomFile.ts","/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts","/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts","/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts","/src/projects/project/src/f/fa/faa/faaa/randomFile.ts"]
Program options: {"target":3,"composite":true,"module":100,"outDir":"/src/projects/project/out","cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/projects/project/src/tsconfig.json"}
Program structureReused: SafeModuleCache
Program files::
/a/lib/lib.es2016.full.d.ts
/src/projects/project/src/fileB.mts
/src/projects/project/src/fileA.ts
/src/projects/project/src/randomFile.ts
/src/projects/project/src/a/randomFile.ts
/src/projects/project/src/b/ba/randomFile.ts
/src/projects/project/src/b/randomFile.ts
/src/projects/project/src/c/ca/randomFile.ts
/src/projects/project/src/c/ca/caa/randomFile.ts
/src/projects/project/src/c/ca/caa/caaa/randomFile.ts
/src/projects/project/src/c/cb/randomFile.ts
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
/src/projects/project/src/d/da/daa/daaa/randomFile.ts
/src/projects/project/src/d/da/daa/randomFile.ts
/src/projects/project/src/d/da/randomFile.ts
/src/projects/project/src/e/ea/randomFile.ts
/src/projects/project/src/e/ea/eaa/randomFile.ts
/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
/src/projects/project/src/f/fa/faa/faaa/randomFile.ts

Semantic diagnostics in builder refreshed for::
/src/projects/project/src/fileA.ts
/src/projects/project/src/randomFile.ts
/src/projects/project/src/a/randomFile.ts
/src/projects/project/src/b/ba/randomFile.ts
/src/projects/project/src/b/randomFile.ts
/src/projects/project/src/c/ca/randomFile.ts
/src/projects/project/src/c/ca/caa/randomFile.ts
/src/projects/project/src/c/ca/caa/caaa/randomFile.ts
/src/projects/project/src/c/cb/randomFile.ts
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
/src/projects/project/src/d/da/daa/daaa/randomFile.ts
/src/projects/project/src/d/da/daa/randomFile.ts
/src/projects/project/src/d/da/randomFile.ts
/src/projects/project/src/e/ea/randomFile.ts
/src/projects/project/src/e/ea/eaa/randomFile.ts
/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts
/src/projects/project/src/f/fa/faa/faaa/randomFile.ts

Shape signatures in builder refreshed for::
/src/projects/project/src/filea.ts (computed .d.ts)
/src/projects/project/src/randomfile.ts (computed .d.ts)
/src/projects/project/src/a/randomfile.ts (computed .d.ts)
/src/projects/project/src/b/ba/randomfile.ts (computed .d.ts)
/src/projects/project/src/b/randomfile.ts (computed .d.ts)
/src/projects/project/src/c/ca/randomfile.ts (computed .d.ts)
/src/projects/project/src/c/ca/caa/randomfile.ts (computed .d.ts)
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts (computed .d.ts)
/src/projects/project/src/c/cb/randomfile.ts (computed .d.ts)
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts (computed .d.ts)
/src/projects/project/src/d/da/daa/daaa/randomfile.ts (computed .d.ts)
/src/projects/project/src/d/da/daa/randomfile.ts (computed .d.ts)
/src/projects/project/src/d/da/randomfile.ts (computed .d.ts)
/src/projects/project/src/e/ea/randomfile.ts (computed .d.ts)
/src/projects/project/src/e/ea/eaa/randomfile.ts (computed .d.ts)
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts (computed .d.ts)
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts (computed .d.ts)
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts (computed .d.ts)
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts (computed .d.ts)

WatchedFiles::
/src/projects/project/src/tsconfig.json:
  {"fileName":"/src/projects/project/src/tsconfig.json","pollingInterval":250}
/src/projects/project/src/filea.ts:
  {"fileName":"/src/projects/project/src/fileA.ts","pollingInterval":250}
/src/projects/project/src/fileb.mts:
  {"fileName":"/src/projects/project/src/fileB.mts","pollingInterval":250}
/src/projects/project/src/randomfile.ts:
  {"fileName":"/src/projects/project/src/randomFile.ts","pollingInterval":250}
/src/projects/project/src/a/randomfile.ts:
  {"fileName":"/src/projects/project/src/a/randomFile.ts","pollingInterval":250}
/src/projects/project/src/b/ba/randomfile.ts:
  {"fileName":"/src/projects/project/src/b/ba/randomFile.ts","pollingInterval":250}
/src/projects/project/src/b/randomfile.ts:
  {"fileName":"/src/projects/project/src/b/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/ca/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/ca/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/ca/caa/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/ca/caa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/ca/caa/caaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/ca/caa/caaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/c/cb/randomfile.ts:
  {"fileName":"/src/projects/project/src/c/cb/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/y/z/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/y/z/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/daa/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/daa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/d/da/randomfile.ts:
  {"fileName":"/src/projects/project/src/d/da/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/eaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomfile.ts:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/y/z/randomfile.ts:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/y/z/randomFile.ts","pollingInterval":250}
/src/projects/project/src/f/fa/faa/faaa/randomfile.ts:
  {"fileName":"/src/projects/project/src/f/fa/faa/faaa/randomFile.ts","pollingInterval":250}
/src/projects/project/src/package.json:
  {"fileName":"/src/projects/project/src/package.json","pollingInterval":250}
/src/projects/project/package.json:
  {"fileName":"/src/projects/project/package.json","pollingInterval":250}
/src/projects/project/src/a/package.json:
  {"fileName":"/src/projects/project/src/a/package.json","pollingInterval":250}
/src/projects/project/src/b/ba/package.json:
  {"fileName":"/src/projects/project/src/b/ba/package.json","pollingInterval":250}
/src/projects/project/src/b/package.json:
  {"fileName":"/src/projects/project/src/b/package.json","pollingInterval":250}
/src/projects/project/src/c/ca/package.json:
  {"fileName":"/src/projects/project/src/c/ca/package.json","pollingInterval":250}
/src/projects/project/src/c/package.json:
  {"fileName":"/src/projects/project/src/c/package.json","pollingInterval":250}
/src/projects/project/src/c/ca/caa/package.json:
  {"fileName":"/src/projects/project/src/c/ca/caa/package.json","pollingInterval":250}
/src/projects/project/src/c/ca/caa/caaa/package.json:
  {"fileName":"/src/projects/project/src/c/ca/caa/caaa/package.json","pollingInterval":250}
/src/projects/project/src/c/cb/package.json:
  {"fileName":"/src/projects/project/src/c/cb/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/y/z/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/y/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/y/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/x/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/x/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/daaa/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/daaa/package.json","pollingInterval":250}
/src/projects/project/src/d/da/daa/package.json:
  {"fileName":"/src/projects/project/src/d/da/daa/package.json","pollingInterval":250}
/src/projects/project/src/d/da/package.json:
  {"fileName":"/src/projects/project/src/d/da/package.json","pollingInterval":250}
/src/projects/project/src/d/package.json:
  {"fileName":"/src/projects/project/src/d/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/package.json:
  {"fileName":"/src/projects/project/src/e/ea/package.json","pollingInterval":250}
/src/projects/project/src/e/package.json:
  {"fileName":"/src/projects/project/src/e/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/y/z/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/y/package.json","pollingInterval":250}
/src/projects/project/src/e/ea/eaa/eaaa/x/package.json:
  {"fileName":"/src/projects/project/src/e/ea/eaa/eaaa/x/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/y/z/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/y/z/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/y/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/y/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/x/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/x/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/package.json:
  {"fileName":"/src/projects/project/src/f/fa/package.json","pollingInterval":250}
/src/projects/project/src/f/package.json:
  {"fileName":"/src/projects/project/src/f/package.json","pollingInterval":250}
/src/projects/project/src/f/fa/faa/faaa/package.json:
  {"fileName":"/src/projects/project/src/f/fa/faa/faaa/package.json","pollingInterval":250}
/a/lib/package.json:
  {"fileName":"/a/lib/package.json","pollingInterval":250}
/a/package.json:
  {"fileName":"/a/package.json","pollingInterval":250}
/package.json:
  {"fileName":"/package.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/src/projects/project/out/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.es2016.full.d.ts","../src/fileb.mts","../src/filea.ts","../src/randomfile.ts","../src/a/randomfile.ts","../src/b/ba/randomfile.ts","../src/b/randomfile.ts","../src/c/ca/randomfile.ts","../src/c/ca/caa/randomfile.ts","../src/c/ca/caa/caaa/randomfile.ts","../src/c/cb/randomfile.ts","../src/d/da/daa/daaa/x/y/z/randomfile.ts","../src/d/da/daa/daaa/randomfile.ts","../src/d/da/daa/randomfile.ts","../src/d/da/randomfile.ts","../src/e/ea/randomfile.ts","../src/e/ea/eaa/randomfile.ts","../src/e/ea/eaa/eaaa/randomfile.ts","../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts","../src/f/fa/faa/x/y/z/randomfile.ts","../src/f/fa/faa/faaa/randomfile.ts","../src","../src/fileB.mts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"3524703962-export function foo() {}","signature":"-5677608893-export declare function foo(): void;\n","impliedFormat":99},{"version":"-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n","signature":"-3531856636-export {};\n","impliedFormat":1},{"version":"-7156111517-export const x = 10;export const y = 10;export const z = 10;export const k = 10;","signature":"-22914839157-export declare const x = 10;\nexport declare const y = 10;\nexport declare const z = 10;\nexport declare const k = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1}],"options":{"cacheResolutions":true,"composite":true,"module":100,"outDir":"./","target":3},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,5,6,7,10,9,8,11,13,12,14,15,18,19,17,16,21,20,[3,[{"file":"../src/filea.ts","start":20,"length":13,"messageText":"Module './fileB.mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.","category":1,"code":1471}]],2,4],"affectedFilesPendingEmit":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[21,1],[20,1],[3,1],[4,1]],"emitSignatures":[[4,"-26065391196-export declare const x = 10;\nexport declare const y = 10;\nexport declare const z = 10;\n"]],"latestChangedDtsFile":"./randomFile.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":23}}],"names":["./fileB.mjs"],"resolutionEntries":[[1,1,1]],"modules":[[22,[1]]]}},"version":"FakeTSVersion"}

//// [/src/projects/project/out/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.es2016.full.d.ts",
      "../src/fileb.mts",
      "../src/filea.ts",
      "../src/randomfile.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src",
      "../src/fileB.mts"
    ],
    "fileNamesList": [
      [
        "../src/fileb.mts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.es2016.full.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../src/fileb.mts": {
        "version": "3524703962-export function foo() {}",
        "signature": "-5677608893-export declare function foo(): void;\n",
        "impliedFormat": "esnext"
      },
      "../src/filea.ts": {
        "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "signature": "-3531856636-export {};\n",
        "impliedFormat": "commonjs"
      },
      "../src/randomfile.ts": {
        "version": "-7156111517-export const x = 10;export const y = 10;export const z = 10;export const k = 10;",
        "signature": "-22914839157-export declare const x = 10;\nexport declare const y = 10;\nexport declare const z = 10;\nexport declare const k = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/a/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/b/ba/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/b/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/c/ca/caa/caaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/c/cb/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/daaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/daa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/d/da/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/x/y/z/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      },
      "../src/f/fa/faa/faaa/randomfile.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": "commonjs"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 100,
      "outDir": "./",
      "target": 3
    },
    "referencedMap": {
      "../src/filea.ts": [
        "../src/fileb.mts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.es2016.full.d.ts",
      "../src/a/randomfile.ts",
      "../src/b/ba/randomfile.ts",
      "../src/b/randomfile.ts",
      "../src/c/ca/caa/caaa/randomfile.ts",
      "../src/c/ca/caa/randomfile.ts",
      "../src/c/ca/randomfile.ts",
      "../src/c/cb/randomfile.ts",
      "../src/d/da/daa/daaa/randomfile.ts",
      "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
      "../src/d/da/daa/randomfile.ts",
      "../src/d/da/randomfile.ts",
      "../src/e/ea/eaa/eaaa/randomfile.ts",
      "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
      "../src/e/ea/eaa/randomfile.ts",
      "../src/e/ea/randomfile.ts",
      "../src/f/fa/faa/faaa/randomfile.ts",
      "../src/f/fa/faa/x/y/z/randomfile.ts",
      [
        "../src/filea.ts",
        [
          {
            "file": "../src/filea.ts",
            "start": 20,
            "length": 13,
            "messageText": "Module './fileB.mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.",
            "category": 1,
            "code": 1471
          }
        ]
      ],
      "../src/fileb.mts",
      "../src/randomfile.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "../src/a/randomfile.ts",
        "Full"
      ],
      [
        "../src/b/ba/randomfile.ts",
        "Full"
      ],
      [
        "../src/b/randomfile.ts",
        "Full"
      ],
      [
        "../src/c/ca/caa/caaa/randomfile.ts",
        "Full"
      ],
      [
        "../src/c/ca/caa/randomfile.ts",
        "Full"
      ],
      [
        "../src/c/ca/randomfile.ts",
        "Full"
      ],
      [
        "../src/c/cb/randomfile.ts",
        "Full"
      ],
      [
        "../src/d/da/daa/daaa/randomfile.ts",
        "Full"
      ],
      [
        "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
        "Full"
      ],
      [
        "../src/d/da/daa/randomfile.ts",
        "Full"
      ],
      [
        "../src/d/da/randomfile.ts",
        "Full"
      ],
      [
        "../src/e/ea/eaa/eaaa/randomfile.ts",
        "Full"
      ],
      [
        "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
        "Full"
      ],
      [
        "../src/e/ea/eaa/randomfile.ts",
        "Full"
      ],
      [
        "../src/e/ea/randomfile.ts",
        "Full"
      ],
      [
        "../src/f/fa/faa/faaa/randomfile.ts",
        "Full"
      ],
      [
        "../src/f/fa/faa/x/y/z/randomfile.ts",
        "Full"
      ],
      [
        "../src/filea.ts",
        "Full"
      ],
      [
        "../src/randomfile.ts",
        "Full"
      ]
    ],
    "emitSignatures": [
      [
        "../src/randomfile.ts",
        "-26065391196-export declare const x = 10;\nexport declare const y = 10;\nexport declare const z = 10;\n"
      ]
    ],
    "latestChangedDtsFile": "./randomFile.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "../src/fileB.mts"
          }
        }
      ],
      "names": [
        "./fileB.mjs"
      ],
      "resolutionEntries": [
        [
          "./fileB.mjs",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "../src/fileB.mts"
            }
          },
          "commonjs"
        ]
      ],
      "modules": [
        [
          "../src",
          [
            [
              "./fileB.mjs",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "../src/fileB.mts"
                }
              },
              "commonjs"
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 4795
}

