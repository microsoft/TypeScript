Input::
//// [/user/username/projects/myproject/packages/pkg1/package.json]
{"name":"pkg1","version":"1.0.0","main":"build/index.js","type":"module"}

//// [/user/username/projects/myproject/packages/pkg1/index.ts]
import type { TheNum } from 'pkg2'
export const theNum: TheNum = 42;

//// [/user/username/projects/myproject/packages/pkg1/tsconfig.json]
{"compilerOptions":{"outDir":"build","module":"node12"},"references":[{"path":"../pkg2"}]}

//// [/user/username/projects/myproject/packages/pkg2/const.cts]
export type TheNum = 42;

//// [/user/username/projects/myproject/packages/pkg2/index.ts]
export type { TheNum } from './const.cjs';

//// [/user/username/projects/myproject/packages/pkg2/tsconfig.json]
{"compilerOptions":{"composite":true,"outDir":"build","module":"node12"}}

//// [/user/username/projects/myproject/packages/pkg2/package.json]
{"name":"pkg2","version":"1.0.0","main":"build/index.js","type":"module"}

//// [/user/username/projects/myproject/node_modules/pkg2] symlink(/user/username/projects/myproject/packages/pkg2)
//// [/a/lib/lib.es2020.full.d.ts]
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


/a/lib/tsc.js -b packages/pkg1 -w --verbose --traceResolution
Output::
>> Screen clear
[[90m12:00:41 AM[0m] Starting compilation in watch mode...

[[90m12:00:42 AM[0m] Projects in this build: 
    * packages/pkg2/tsconfig.json
    * packages/pkg1/tsconfig.json

[[90m12:00:43 AM[0m] Project 'packages/pkg2/tsconfig.json' is out of date because output file 'packages/pkg2/build/const.cjs' does not exist

[[90m12:00:44 AM[0m] Building project '/user/username/projects/myproject/packages/pkg2/tsconfig.json'...

Found 'package.json' at '/user/username/projects/myproject/packages/pkg2/package.json'.
'package.json' does not have a 'typesVersions' field.
======== Resolving module './const.cjs' from '/user/username/projects/myproject/packages/pkg2/index.ts'. ========
Module resolution kind is not specified, using 'Node12'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/const.cjs', target file type 'TypeScript'.
File name '/user/username/projects/myproject/packages/pkg2/const.cjs' has a '.cjs' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/const.cts' exist - use it as a name resolution result.
======== Module name './const.cjs' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/const.cts'. ========
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
[96mpackages/pkg2/tsconfig.json[0m:[93m1[0m:[93m64[0m - [91merror[0m[90m TS4124: [0mCompiler option 'module' of value 'node12' is unstable. Use nightly TypeScript to silence this error. Try updating with 'npm install -D typescript@next'.

[7m1[0m {"compilerOptions":{"composite":true,"outDir":"build","module":"node12"}}
[7m [0m [91m                                                               ~~~~~~~~[0m

[[90m12:00:45 AM[0m] Project 'packages/pkg1/tsconfig.json' can't be built because its dependency 'packages/pkg2' has errors

[[90m12:00:46 AM[0m] Skipping build of project '/user/username/projects/myproject/packages/pkg1/tsconfig.json' because its dependency '/user/username/projects/myproject/packages/pkg2' has errors

[[90m12:00:47 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/myproject/packages/pkg2/const.cts","/user/username/projects/myproject/packages/pkg2/index.ts"]
Program options: {"composite":true,"outDir":"/user/username/projects/myproject/packages/pkg2/build","module":100,"watch":true,"traceResolution":true,"configFilePath":"/user/username/projects/myproject/packages/pkg2/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.es2020.full.d.ts
/user/username/projects/myproject/packages/pkg2/const.cts
/user/username/projects/myproject/packages/pkg2/index.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

WatchedFiles::
/user/username/projects/myproject/packages/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/const.cts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/const.cts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/package.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/package.json","pollingInterval":250}
/a/lib/package.json:
  {"fileName":"/a/lib/package.json","pollingInterval":250}
/a/package.json:
  {"fileName":"/a/package.json","pollingInterval":250}
/package.json:
  {"fileName":"/package.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/index.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/packages/pkg2:
  {"directoryName":"/user/username/projects/myproject/packages/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/pkg1:
  {"directoryName":"/user/username/projects/myproject/packages/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: reports import errors after change to package file

Input::
//// [/user/username/projects/myproject/packages/pkg1/package.json]
{"name":"pkg1","version":"1.0.0","main":"build/index.js","type":"commonjs"}


Output::

WatchedFiles::
/user/username/projects/myproject/packages/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/const.cts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/const.cts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/package.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/package.json","pollingInterval":250}
/a/lib/package.json:
  {"fileName":"/a/lib/package.json","pollingInterval":250}
/a/package.json:
  {"fileName":"/a/package.json","pollingInterval":250}
/package.json:
  {"fileName":"/package.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/index.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/packages/pkg2:
  {"directoryName":"/user/username/projects/myproject/packages/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/pkg1:
  {"directoryName":"/user/username/projects/myproject/packages/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: removes those errors when a package file is changed back

Input::
//// [/user/username/projects/myproject/packages/pkg1/package.json]
{"name":"pkg1","version":"1.0.0","main":"build/index.js","type":"module"}


Output::

WatchedFiles::
/user/username/projects/myproject/packages/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/const.cts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/const.cts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/package.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/package.json","pollingInterval":250}
/a/lib/package.json:
  {"fileName":"/a/lib/package.json","pollingInterval":250}
/a/package.json:
  {"fileName":"/a/package.json","pollingInterval":250}
/package.json:
  {"fileName":"/package.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/index.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/packages/pkg2:
  {"directoryName":"/user/username/projects/myproject/packages/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/pkg1:
  {"directoryName":"/user/username/projects/myproject/packages/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: reports import errors after change to package file

Input::
//// [/user/username/projects/myproject/packages/pkg1/package.json]
{"name":"pkg1","version":"1.0.0","main":"build/index.js","type":"commonjs"}


Output::

WatchedFiles::
/user/username/projects/myproject/packages/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/const.cts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/const.cts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/package.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/package.json","pollingInterval":250}
/a/lib/package.json:
  {"fileName":"/a/lib/package.json","pollingInterval":250}
/a/package.json:
  {"fileName":"/a/package.json","pollingInterval":250}
/package.json:
  {"fileName":"/package.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/index.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/packages/pkg2:
  {"directoryName":"/user/username/projects/myproject/packages/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/pkg1:
  {"directoryName":"/user/username/projects/myproject/packages/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: removes those errors when a package file is changed to cjs extensions

Input::
//// [/user/username/projects/myproject/packages/pkg2/package.json]
{"name":"pkg2","version":"1.0.0","main":"build/index.cjs","type":"module"}

//// [/user/username/projects/myproject/packages/pkg2/index.cts]
export type { TheNum } from './const.cjs';

//// [/user/username/projects/myproject/packages/pkg2/index.ts] deleted

Output::
>> Screen clear
[[90m12:01:03 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:04 AM[0m] Project 'packages/pkg2/tsconfig.json' is out of date because output file 'packages/pkg2/build/const.cjs' does not exist

[[90m12:01:05 AM[0m] Building project '/user/username/projects/myproject/packages/pkg2/tsconfig.json'...

======== Resolving module './const.cjs' from '/user/username/projects/myproject/packages/pkg2/index.cts'. ========
Module resolution kind is not specified, using 'Node12'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/const.cjs', target file type 'TypeScript'.
File '/user/username/projects/myproject/packages/pkg2/const.cjs.ts' does not exist.
File '/user/username/projects/myproject/packages/pkg2/const.cjs.tsx' does not exist.
File '/user/username/projects/myproject/packages/pkg2/const.cjs.d.ts' does not exist.
File name '/user/username/projects/myproject/packages/pkg2/const.cjs' has a '.cjs' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/const.cts' exist - use it as a name resolution result.
======== Module name './const.cjs' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/const.cts'. ========
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
[96mpackages/pkg2/tsconfig.json[0m:[93m1[0m:[93m64[0m - [91merror[0m[90m TS4124: [0mCompiler option 'module' of value 'node12' is unstable. Use nightly TypeScript to silence this error. Try updating with 'npm install -D typescript@next'.

[7m1[0m {"compilerOptions":{"composite":true,"outDir":"build","module":"node12"}}
[7m [0m [91m                                                               ~~~~~~~~[0m

[[90m12:01:06 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/myproject/packages/pkg2/const.cts","/user/username/projects/myproject/packages/pkg2/index.cts"]
Program options: {"composite":true,"outDir":"/user/username/projects/myproject/packages/pkg2/build","module":100,"watch":true,"traceResolution":true,"configFilePath":"/user/username/projects/myproject/packages/pkg2/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.es2020.full.d.ts
/user/username/projects/myproject/packages/pkg2/const.cts
/user/username/projects/myproject/packages/pkg2/index.cts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

WatchedFiles::
/user/username/projects/myproject/packages/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/const.cts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/const.cts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/package.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/package.json","pollingInterval":250}
/a/lib/package.json:
  {"fileName":"/a/lib/package.json","pollingInterval":250}
/a/package.json:
  {"fileName":"/a/package.json","pollingInterval":250}
/package.json:
  {"fileName":"/package.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/index.cts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/index.cts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/packages/pkg2:
  {"directoryName":"/user/username/projects/myproject/packages/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/pkg1:
  {"directoryName":"/user/username/projects/myproject/packages/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

