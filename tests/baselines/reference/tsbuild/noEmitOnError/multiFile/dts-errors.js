currentDirectory:: /user/username/projects/noEmitOnError useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/noEmitOnError/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "./dev-build",
    "noEmitOnError": true
  }
}

//// [/user/username/projects/noEmitOnError/shared/types/db.ts]
export interface A {
    name: string;
}


//// [/user/username/projects/noEmitOnError/src/main.ts]
import { A } from "../shared/types/db";
export const a = class { private p = 10; };


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


/home/src/tslibs/TS/Lib/tsc.js --b --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'dev-build/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/noEmitOnError/tsconfig.json'...



//// [/user/username/projects/noEmitOnError/dev-build/shared/types/db.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/noEmitOnError/dev-build/src/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = /** @class */ (function () {
    function class_1() {
        this.p = 10;
    }
    return class_1;
}());


//// [/user/username/projects/noEmitOnError/dev-build/src/other.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("hi");


//// [/user/username/projects/noEmitOnError/dev-build/tsconfig.tsbuildinfo]
{"root":["../shared/types/db.ts","../src/main.ts","../src/other.ts"],"version":"FakeTSVersion"}

//// [/user/username/projects/noEmitOnError/dev-build/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "../shared/types/db.ts",
    "../src/main.ts",
    "../src/other.ts"
  ],
  "version": "FakeTSVersion",
  "size": 95
}


Program root files: [
  "/user/username/projects/noEmitOnError/shared/types/db.ts",
  "/user/username/projects/noEmitOnError/src/main.ts",
  "/user/username/projects/noEmitOnError/src/other.ts"
]
Program options: {
  "outDir": "/user/username/projects/noEmitOnError/dev-build",
  "noEmitOnError": true,
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

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/noemitonerror/shared/types/db.ts (used version)
/user/username/projects/noemitonerror/src/main.ts (used version)
/user/username/projects/noemitonerror/src/other.ts (used version)

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --b --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'src/other.ts' is older than output 'dev-build/shared/types/db.js'




exitCode:: ExitStatus.Success

Change:: Fix error

Input::
//// [/user/username/projects/noEmitOnError/src/main.ts]
import { A } from "../shared/types/db";
export const a = class { p = 10; };



/home/src/tslibs/TS/Lib/tsc.js --b --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'dev-build/tsconfig.tsbuildinfo' is older than input 'src/main.ts'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/noEmitOnError/tsconfig.json'...



//// [/user/username/projects/noEmitOnError/dev-build/shared/types/db.js] file written with same contents
//// [/user/username/projects/noEmitOnError/dev-build/src/main.js] file written with same contents
//// [/user/username/projects/noEmitOnError/dev-build/src/other.js] file written with same contents
//// [/user/username/projects/noEmitOnError/dev-build/tsconfig.tsbuildinfo] file written with same contents
//// [/user/username/projects/noEmitOnError/dev-build/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents

Program root files: [
  "/user/username/projects/noEmitOnError/shared/types/db.ts",
  "/user/username/projects/noEmitOnError/src/main.ts",
  "/user/username/projects/noEmitOnError/src/other.ts"
]
Program options: {
  "outDir": "/user/username/projects/noEmitOnError/dev-build",
  "noEmitOnError": true,
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

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/noemitonerror/shared/types/db.ts (used version)
/user/username/projects/noemitonerror/src/main.ts (used version)
/user/username/projects/noemitonerror/src/other.ts (used version)

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --b --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'src/main.ts' is older than output 'dev-build/shared/types/db.js'




exitCode:: ExitStatus.Success
