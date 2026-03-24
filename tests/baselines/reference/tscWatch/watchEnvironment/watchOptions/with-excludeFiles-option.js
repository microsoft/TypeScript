currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/src/main.ts]
import { foo } from "bar"; foo();

//// [/user/username/projects/myproject/node_modules/bar/index.d.ts]
export { foo } from "./foo";

//// [/user/username/projects/myproject/node_modules/bar/foo.d.ts]
export function foo(): string;

//// [/user/username/projects/myproject/node_modules/bar/fooBar.d.ts]
export function fooBar(): string;

//// [/user/username/projects/myproject/node_modules/bar/temp/index.d.ts]
export function temp(): string;

//// [/user/username/projects/myproject/tsconfig.json]
{
  "exclude": [
    "node_modules"
  ],
  "watchOptions": {
    "excludeFiles": [
      "node_modules/*"
    ]
  }
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

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*

//// [/user/username/projects/myproject/src/main.js]
import { foo } from "bar";
foo();



PolledWatches::
/user/username/projects/myproject/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts: *new*
  {}
/user/username/projects: *new*
  {}
/user/username/projects/myproject: *new*
  {}
/user/username/projects/myproject/src/main.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}
/user/username/projects/myproject/node_modules: *new*
  {}
/user/username/projects/myproject/src: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/src/main.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/projects/myproject/node_modules/bar/foo.d.ts
/user/username/projects/myproject/node_modules/bar/index.d.ts
/user/username/projects/myproject/src/main.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/projects/myproject/node_modules/bar/foo.d.ts
/user/username/projects/myproject/node_modules/bar/index.d.ts
/user/username/projects/myproject/src/main.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2025.full.d.ts (used version)
/user/username/projects/myproject/node_modules/bar/foo.d.ts (used version)
/user/username/projects/myproject/node_modules/bar/index.d.ts (used version)
/user/username/projects/myproject/src/main.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Change foo

Input::
//// [/user/username/projects/myproject/node_modules/bar/foo.d.ts]
export function fooBar(): string;



exitCode:: ExitStatus.undefined
