currentDirectory:: /user/username/workspace/solution/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/user/username/workspace/solution/projects/project/c/app.ts]

                import {f} from "./module"
                console.log(f)
                

//// [/user/username/workspace/solution/projects/project/c/module.d.ts]
export let x: number

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


/home/src/tslibs/TS/Lib/tsc.js -w /user/username/workspace/solution/projects/project/c/app.ts
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mc/app.ts[0m:[93m2[0m:[93m25[0m - [91merror[0m[90m TS2305: [0mModule '"./module"' has no exported member 'f'.

[7m2[0m                 import {f} from "./module"
[7m [0m [91m                        ~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*

//// [/user/username/workspace/solution/projects/project/c/app.js]
import { f } from "./module";
console.log(f);



FsWatches::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts: *new*
  {}
/user/username/workspace/solution/projects/project/c/app.ts: *new*
  {}
/user/username/workspace/solution/projects/project/c/module.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/workspace/solution/projects/project/c: *new*
  {}

Program root files: [
  "/user/username/workspace/solution/projects/project/c/app.ts"
]
Program options: {
  "watch": true
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/workspace/solution/projects/project/c/module.d.ts
/user/username/workspace/solution/projects/project/c/app.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/workspace/solution/projects/project/c/module.d.ts
/user/username/workspace/solution/projects/project/c/app.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2025.full.d.ts (used version)
/user/username/workspace/solution/projects/project/c/module.d.ts (used version)
/user/username/workspace/solution/projects/project/c/app.ts (used version)

exitCode:: ExitStatus.undefined
