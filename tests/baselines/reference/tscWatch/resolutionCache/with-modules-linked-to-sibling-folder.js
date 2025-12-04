currentDirectory:: /user/username/projects/myproject/main useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/main/index.ts]
import { Foo } from '@scoped/linked-package'

//// [/user/username/projects/myproject/main/tsconfig.json]
{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "baseUrl": ".",
    "rootDir": "."
  },
  "files": [
    "index.ts"
  ]
}

//// [/user/username/projects/myproject/main/node_modules/@scoped/linked-package] symlink(/user/username/projects/myproject/linked-package)

//// [/user/username/projects/myproject/linked-package/package.json]
{
  "name": "@scoped/linked-package",
  "version": "0.0.1",
  "types": "dist/index.d.ts",
  "main": "dist/index.js"
}

//// [/user/username/projects/myproject/linked-package/dist/index.d.ts]
export * from './other';

//// [/user/username/projects/myproject/linked-package/dist/other.d.ts]
export declare const Foo = "BAR";

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

[96mtsconfig.json[0m:[93m4[0m:[93m25[0m - [91merror[0m[90m TS5107: [0mOption 'moduleResolution=node10' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.
  Visit https://aka.ms/ts6 for migration information.

[7m4[0m     "moduleResolution": "node",
[7m [0m [91m                        ~~~~~~[0m

[96mtsconfig.json[0m:[93m5[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'baseUrl' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.
  Visit https://aka.ms/ts6 for migration information.

[7m5[0m     "baseUrl": ".",
[7m [0m [91m    ~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 2 errors. Watching for file changes.



//// [/user/username/projects/myproject/main/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



PolledWatches::
/user/username/projects/myproject/main/@scoped: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/main/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/linked-package/dist/index.d.ts: *new*
  {}
/user/username/projects/myproject/linked-package/dist/other.d.ts: *new*
  {}
/user/username/projects/myproject/linked-package/package.json: *new*
  {}
/user/username/projects/myproject/main/index.ts: *new*
  {}
/user/username/projects/myproject/main/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/linked-package: *new*
  {}
/user/username/projects/myproject/main/node_modules: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/main/index.ts"
]
Program options: {
  "module": 1,
  "moduleResolution": 2,
  "baseUrl": "/user/username/projects/myproject/main",
  "rootDir": "/user/username/projects/myproject/main",
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/main/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/linked-package/dist/other.d.ts
/user/username/projects/myproject/linked-package/dist/index.d.ts
/user/username/projects/myproject/main/index.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/linked-package/dist/other.d.ts (used version)
/user/username/projects/myproject/linked-package/dist/index.d.ts (used version)
/user/username/projects/myproject/main/index.ts (used version)

exitCode:: ExitStatus.undefined
