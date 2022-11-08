currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames: false
Input::
//// [/user/username/projects/myproject/a.ts]
export class a { prop = "hello"; foo() { return this.prop; } }

//// [/user/username/projects/myproject/b.ts]
export class b { prop = "hello"; foo() { return this.prop; } }

//// [/user/username/projects/myproject/tsconfig.json]
{"watchOptions":{"watchFactory":"myplugin/../malicious"}}

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


/a/lib/tsc.js -b -w --extendedDiagnostics
Output::
[[90m12:00:23 AM[0m] Starting compilation in watch mode...

[96mtsconfig.json[0m:[93m1[0m:[93m33[0m - [91merror[0m[90m TS5109: [0m'watchFactory' name can only be a package name.

[7m1[0m {"watchOptions":{"watchFactory":"myplugin/../malicious"}}
[7m [0m [91m                                ~~~~~~~~~~~~~~~~~~~~~~~[0m

[[90m12:00:24 AM[0m] Found 1 error. Watching for file changes.

FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 {} Config file /user/username/projects/myproject/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 {} Wild card directory /user/username/projects/myproject/tsconfig.json
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 {} Wild card directory /user/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a.ts 250 {} Source file /user/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b.ts 250 {} Source file /user/username/projects/myproject/tsconfig.json


Program root files: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.ts"]
Program options: {"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

FsWatches::
/user/username/projects/myproject/tsconfig.json: *new*
  {}
/user/username/projects/myproject/a.ts: *new*
  {}
/user/username/projects/myproject/b.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

exitCode:: ExitStatus.undefined


Change:: Change file

Input::
//// [/user/username/projects/myproject/b.ts]
export class b { prop = "hello"; foo() { return this.prop; } }export function foo() { }


Before running Timeout callback:: count: 1
1: timerToBuildInvalidatedProject
After running Timeout callback:: count: 0
Output::
FileWatcher:: Triggered with /user/username/projects/myproject/b.ts 1:: WatchInfo: /user/username/projects/myproject/b.ts 250 {} Source file /user/username/projects/myproject/tsconfig.json
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/b.ts 1:: WatchInfo: /user/username/projects/myproject/b.ts 250 {} Source file /user/username/projects/myproject/tsconfig.json
[[90m12:00:27 AM[0m] File change detected. Starting incremental compilation...

[96mtsconfig.json[0m:[93m1[0m:[93m33[0m - [91merror[0m[90m TS5109: [0m'watchFactory' name can only be a package name.

[7m1[0m {"watchOptions":{"watchFactory":"myplugin/../malicious"}}
[7m [0m [91m                                ~~~~~~~~~~~~~~~~~~~~~~~[0m

[[90m12:00:28 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.ts"]
Program options: {"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

