currentDirectory:: /user/username/projects/noEmitOnError useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/noEmitOnError/tsconfig.json]
{
  "compilerOptions": {
    "outFile": "../dev-build.js",
    "module": "amd",
    "declaration": true,
    "noEmitOnError": true
  }
}

//// [/user/username/projects/noEmitOnError/shared/types/db.ts]
export interface A {
    name: string;
}


//// [/user/username/projects/noEmitOnError/src/main.ts]
import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
;


//// [/user/username/projects/noEmitOnError/src/other.ts]
console.log("hi");
export { }


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


/home/src/tslibs/TS/Lib/tsc.js -b -verbose --w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file '../dev-build.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/noEmitOnError/tsconfig.json'...

[96msrc/main.ts[0m:[93m4[0m:[93m1[0m - [91merror[0m[90m TS1005: [0m',' expected.

[7m4[0m ;
[7m [0m [91m~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/dev-build.tsbuildinfo]
{"root":["./noemitonerror/shared/types/db.ts","./noemitonerror/src/main.ts","./noemitonerror/src/other.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/user/username/projects/dev-build.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./noemitonerror/shared/types/db.ts",
    "./noemitonerror/src/main.ts",
    "./noemitonerror/src/other.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 148
}


FsWatches::
/user/username/projects/noEmitOnError/shared/types/db.ts: *new*
  {}
/user/username/projects/noEmitOnError/src/main.ts: *new*
  {}
/user/username/projects/noEmitOnError/src/other.ts: *new*
  {}
/user/username/projects/noEmitOnError/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/noEmitOnError: *new*
  {}

Program root files: [
  "/user/username/projects/noEmitOnError/shared/types/db.ts",
  "/user/username/projects/noEmitOnError/src/main.ts",
  "/user/username/projects/noEmitOnError/src/other.ts"
]
Program options: {
  "outFile": "/user/username/projects/dev-build.js",
  "module": 2,
  "declaration": true,
  "noEmitOnError": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/noEmitOnError/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: No change

Input::
//// [/user/username/projects/noEmitOnError/src/main.ts] file written with same contents

Timeout callback:: count: 1
1: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
1: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../dev-build.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/noEmitOnError/tsconfig.json'...

[96msrc/main.ts[0m:[93m4[0m:[93m1[0m - [91merror[0m[90m TS1005: [0m',' expected.

[7m4[0m ;
[7m [0m [91m~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.





Program root files: [
  "/user/username/projects/noEmitOnError/shared/types/db.ts",
  "/user/username/projects/noEmitOnError/src/main.ts",
  "/user/username/projects/noEmitOnError/src/other.ts"
]
Program options: {
  "outFile": "/user/username/projects/dev-build.js",
  "module": 2,
  "declaration": true,
  "noEmitOnError": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/noEmitOnError/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Fix syntax errors

Input::
//// [/user/username/projects/noEmitOnError/src/main.ts]
import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
};


Timeout callback:: count: 1
2: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
2: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../dev-build.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/noEmitOnError/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/dev-build.tsbuildinfo]
{"root":["./noemitonerror/shared/types/db.ts","./noemitonerror/src/main.ts","./noemitonerror/src/other.ts"],"version":"FakeTSVersion"}

//// [/user/username/projects/dev-build.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./noemitonerror/shared/types/db.ts",
    "./noemitonerror/src/main.ts",
    "./noemitonerror/src/other.ts"
  ],
  "version": "FakeTSVersion",
  "size": 134
}

//// [/user/username/projects/dev-build.js]
define("shared/types/db", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("src/main", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var a = {
        lastName: 'sdsd'
    };
});
define("src/other", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    console.log("hi");
});


//// [/user/username/projects/dev-build.d.ts]
declare module "shared/types/db" {
    export interface A {
        name: string;
    }
}
declare module "src/main" { }
declare module "src/other" {
    export {};
}




Program root files: [
  "/user/username/projects/noEmitOnError/shared/types/db.ts",
  "/user/username/projects/noEmitOnError/src/main.ts",
  "/user/username/projects/noEmitOnError/src/other.ts"
]
Program options: {
  "outFile": "/user/username/projects/dev-build.js",
  "module": 2,
  "declaration": true,
  "noEmitOnError": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/noEmitOnError/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: No change

Input::
//// [/user/username/projects/noEmitOnError/src/main.ts] file written with same contents

Timeout callback:: count: 1
3: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
3: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output '../dev-build.tsbuildinfo' is older than input 'src/main.ts'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/noEmitOnError/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/noEmitOnError/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/dev-build.tsbuildinfo] file changed its modified time
//// [/user/username/projects/dev-build.js] file changed its modified time
//// [/user/username/projects/dev-build.d.ts] file changed its modified time


Program root files: [
  "/user/username/projects/noEmitOnError/shared/types/db.ts",
  "/user/username/projects/noEmitOnError/src/main.ts",
  "/user/username/projects/noEmitOnError/src/other.ts"
]
Program options: {
  "outFile": "/user/username/projects/dev-build.js",
  "module": 2,
  "declaration": true,
  "noEmitOnError": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/noEmitOnError/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: semantic errors

Input::
//// [/user/username/projects/noEmitOnError/src/main.ts]
import { A } from "../shared/types/db";
const a: string = 10;


Timeout callback:: count: 1
4: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
4: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output '../dev-build.tsbuildinfo' is older than input 'src/main.ts'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/noEmitOnError/tsconfig.json'...

[96msrc/main.ts[0m:[93m2[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m2[0m const a: string = 10;
[7m [0m [91m      ~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/dev-build.tsbuildinfo]
{"root":["./noemitonerror/shared/types/db.ts","./noemitonerror/src/main.ts","./noemitonerror/src/other.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/user/username/projects/dev-build.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./noemitonerror/shared/types/db.ts",
    "./noemitonerror/src/main.ts",
    "./noemitonerror/src/other.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 148
}



Program root files: [
  "/user/username/projects/noEmitOnError/shared/types/db.ts",
  "/user/username/projects/noEmitOnError/src/main.ts",
  "/user/username/projects/noEmitOnError/src/other.ts"
]
Program options: {
  "outFile": "/user/username/projects/dev-build.js",
  "module": 2,
  "declaration": true,
  "noEmitOnError": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/noEmitOnError/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: No change

Input::
//// [/user/username/projects/noEmitOnError/src/main.ts] file written with same contents

Timeout callback:: count: 1
5: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
5: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../dev-build.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/noEmitOnError/tsconfig.json'...

[96msrc/main.ts[0m:[93m2[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m2[0m const a: string = 10;
[7m [0m [91m      ~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.





Program root files: [
  "/user/username/projects/noEmitOnError/shared/types/db.ts",
  "/user/username/projects/noEmitOnError/src/main.ts",
  "/user/username/projects/noEmitOnError/src/other.ts"
]
Program options: {
  "outFile": "/user/username/projects/dev-build.js",
  "module": 2,
  "declaration": true,
  "noEmitOnError": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/noEmitOnError/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Fix semantic errors

Input::
//// [/user/username/projects/noEmitOnError/src/main.ts]
import { A } from "../shared/types/db";
const a: string = "hello";


Timeout callback:: count: 1
6: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
6: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../dev-build.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/noEmitOnError/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/dev-build.tsbuildinfo]
{"root":["./noemitonerror/shared/types/db.ts","./noemitonerror/src/main.ts","./noemitonerror/src/other.ts"],"version":"FakeTSVersion"}

//// [/user/username/projects/dev-build.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./noemitonerror/shared/types/db.ts",
    "./noemitonerror/src/main.ts",
    "./noemitonerror/src/other.ts"
  ],
  "version": "FakeTSVersion",
  "size": 134
}

//// [/user/username/projects/dev-build.js]
define("shared/types/db", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("src/main", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var a = "hello";
});
define("src/other", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    console.log("hi");
});


//// [/user/username/projects/dev-build.d.ts] file written with same contents


Program root files: [
  "/user/username/projects/noEmitOnError/shared/types/db.ts",
  "/user/username/projects/noEmitOnError/src/main.ts",
  "/user/username/projects/noEmitOnError/src/other.ts"
]
Program options: {
  "outFile": "/user/username/projects/dev-build.js",
  "module": 2,
  "declaration": true,
  "noEmitOnError": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/noEmitOnError/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: No change

Input::
//// [/user/username/projects/noEmitOnError/src/main.ts] file written with same contents

Timeout callback:: count: 1
7: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
7: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output '../dev-build.tsbuildinfo' is older than input 'src/main.ts'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/noEmitOnError/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/noEmitOnError/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/dev-build.tsbuildinfo] file changed its modified time
//// [/user/username/projects/dev-build.js] file changed its modified time
//// [/user/username/projects/dev-build.d.ts] file changed its modified time


Program root files: [
  "/user/username/projects/noEmitOnError/shared/types/db.ts",
  "/user/username/projects/noEmitOnError/src/main.ts",
  "/user/username/projects/noEmitOnError/src/other.ts"
]
Program options: {
  "outFile": "/user/username/projects/dev-build.js",
  "module": 2,
  "declaration": true,
  "noEmitOnError": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/noEmitOnError/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: dts errors

Input::
//// [/user/username/projects/noEmitOnError/src/main.ts]
import { A } from "../shared/types/db";
export const a = class { private p = 10; };



Timeout callback:: count: 1
8: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
8: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output '../dev-build.tsbuildinfo' is older than input 'src/main.ts'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/noEmitOnError/tsconfig.json'...

[96msrc/main.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m2[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96msrc/main.ts[0m:[93m2[0m:[93m14[0m
    [7m2[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable a.

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/dev-build.tsbuildinfo]
{"root":["./noemitonerror/shared/types/db.ts","./noemitonerror/src/main.ts","./noemitonerror/src/other.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/user/username/projects/dev-build.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./noemitonerror/shared/types/db.ts",
    "./noemitonerror/src/main.ts",
    "./noemitonerror/src/other.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 148
}



Program root files: [
  "/user/username/projects/noEmitOnError/shared/types/db.ts",
  "/user/username/projects/noEmitOnError/src/main.ts",
  "/user/username/projects/noEmitOnError/src/other.ts"
]
Program options: {
  "outFile": "/user/username/projects/dev-build.js",
  "module": 2,
  "declaration": true,
  "noEmitOnError": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/noEmitOnError/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: No change

Input::
//// [/user/username/projects/noEmitOnError/src/main.ts] file written with same contents

Timeout callback:: count: 1
9: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
9: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../dev-build.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/noEmitOnError/tsconfig.json'...

[96msrc/main.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m2[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96msrc/main.ts[0m:[93m2[0m:[93m14[0m
    [7m2[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable a.

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.





Program root files: [
  "/user/username/projects/noEmitOnError/shared/types/db.ts",
  "/user/username/projects/noEmitOnError/src/main.ts",
  "/user/username/projects/noEmitOnError/src/other.ts"
]
Program options: {
  "outFile": "/user/username/projects/dev-build.js",
  "module": 2,
  "declaration": true,
  "noEmitOnError": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/noEmitOnError/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Fix dts errors

Input::
//// [/user/username/projects/noEmitOnError/src/main.ts]
import { A } from "../shared/types/db";
export const a = class { p = 10; };



Timeout callback:: count: 1
10: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
10: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../dev-build.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/noEmitOnError/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/dev-build.tsbuildinfo]
{"root":["./noemitonerror/shared/types/db.ts","./noemitonerror/src/main.ts","./noemitonerror/src/other.ts"],"version":"FakeTSVersion"}

//// [/user/username/projects/dev-build.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./noemitonerror/shared/types/db.ts",
    "./noemitonerror/src/main.ts",
    "./noemitonerror/src/other.ts"
  ],
  "version": "FakeTSVersion",
  "size": 134
}

//// [/user/username/projects/dev-build.js]
define("shared/types/db", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("src/main", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    exports.a = /** @class */ (function () {
        function class_1() {
            this.p = 10;
        }
        return class_1;
    }());
});
define("src/other", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    console.log("hi");
});


//// [/user/username/projects/dev-build.d.ts]
declare module "shared/types/db" {
    export interface A {
        name: string;
    }
}
declare module "src/main" {
    export const a: {
        new (): {
            p: number;
        };
    };
}
declare module "src/other" {
    export {};
}




Program root files: [
  "/user/username/projects/noEmitOnError/shared/types/db.ts",
  "/user/username/projects/noEmitOnError/src/main.ts",
  "/user/username/projects/noEmitOnError/src/other.ts"
]
Program options: {
  "outFile": "/user/username/projects/dev-build.js",
  "module": 2,
  "declaration": true,
  "noEmitOnError": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/noEmitOnError/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: No change

Input::
//// [/user/username/projects/noEmitOnError/src/main.ts] file written with same contents

Timeout callback:: count: 1
11: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
11: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output '../dev-build.tsbuildinfo' is older than input 'src/main.ts'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/noEmitOnError/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/noEmitOnError/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/dev-build.tsbuildinfo] file changed its modified time
//// [/user/username/projects/dev-build.js] file changed its modified time
//// [/user/username/projects/dev-build.d.ts] file changed its modified time


Program root files: [
  "/user/username/projects/noEmitOnError/shared/types/db.ts",
  "/user/username/projects/noEmitOnError/src/main.ts",
  "/user/username/projects/noEmitOnError/src/other.ts"
]
Program options: {
  "outFile": "/user/username/projects/dev-build.js",
  "module": 2,
  "declaration": true,
  "noEmitOnError": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/noEmitOnError/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
