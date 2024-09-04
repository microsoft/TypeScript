currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/a.ts]
export const a: number = "hello";

//// [/home/src/workspaces/project/b.ts]
export const b = 10;

//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "declaration": true
  }
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


/home/src/tslibs/TS/Lib/tsc.js --noCheck
Output::


//// [/home/src/workspaces/project/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello";


//// [/home/src/workspaces/project/a.d.ts]
export declare const a: number;


//// [/home/src/workspaces/project/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;


//// [/home/src/workspaces/project/b.d.ts]
export declare const b = 10;



Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "noCheck": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --noCheck
Output::


//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts] file written with same contents
//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents

Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "noCheck": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

exitCode:: ExitStatus.Success

Change:: Fix `a` error with noCheck

Input::
//// [/home/src/workspaces/project/a.ts]
export const a = "hello";


/home/src/tslibs/TS/Lib/tsc.js --noCheck
Output::


//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts]
export declare const a = "hello";


//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents

Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "noCheck": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --noCheck
Output::


//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts] file written with same contents
//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents

Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "noCheck": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/TS/Lib/tsc.js 
Output::


//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts] file written with same contents
//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents

Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/TS/Lib/tsc.js 
Output::


//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts] file written with same contents
//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents

Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --noCheck
Output::


//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts] file written with same contents
//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents

Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "noCheck": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

exitCode:: ExitStatus.Success

Change:: Introduce error with noCheck

Input::
//// [/home/src/workspaces/project/a.ts]
export const a: number = "hello";


/home/src/tslibs/TS/Lib/tsc.js --noCheck
Output::


//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts]
export declare const a: number;


//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents

Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "noCheck": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --noCheck
Output::


//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts] file written with same contents
//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents

Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "noCheck": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/TS/Lib/tsc.js 
Output::
[96ma.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const a: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error in a.ts[90m:1[0m



//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts] file written with same contents
//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents

Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Fix `a` error with noCheck

Input::
//// [/home/src/workspaces/project/a.ts]
export const a = "hello";


/home/src/tslibs/TS/Lib/tsc.js --noCheck
Output::


//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts]
export declare const a = "hello";


//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents

Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "noCheck": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/TS/Lib/tsc.js 
Output::


//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts] file written with same contents
//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents

Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

exitCode:: ExitStatus.Success

Change:: Add file with error

Input::
//// [/home/src/workspaces/project/c.ts]
export const c: number = "hello";


/home/src/tslibs/TS/Lib/tsc.js 
Output::
[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error in c.ts[90m:1[0m



//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts] file written with same contents
//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents
//// [/home/src/workspaces/project/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
exports.c = "hello";


//// [/home/src/workspaces/project/c.d.ts]
export declare const c: number;



Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts"
]
Program options: {
  "declaration": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Introduce error with noCheck

Input::
//// [/home/src/workspaces/project/a.ts]
export const a: number = "hello";


/home/src/tslibs/TS/Lib/tsc.js --noCheck
Output::


//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts]
export declare const a: number;


//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents
//// [/home/src/workspaces/project/c.js] file written with same contents
//// [/home/src/workspaces/project/c.d.ts] file written with same contents

Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts"
]
Program options: {
  "declaration": true,
  "noCheck": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts

exitCode:: ExitStatus.Success

Change:: Fix `a` error with noCheck

Input::
//// [/home/src/workspaces/project/a.ts]
export const a = "hello";


/home/src/tslibs/TS/Lib/tsc.js --noCheck
Output::


//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts]
export declare const a = "hello";


//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents
//// [/home/src/workspaces/project/c.js] file written with same contents
//// [/home/src/workspaces/project/c.d.ts] file written with same contents

Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts"
]
Program options: {
  "declaration": true,
  "noCheck": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts

exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/TS/Lib/tsc.js 
Output::
[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error in c.ts[90m:1[0m



//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts] file written with same contents
//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents
//// [/home/src/workspaces/project/c.js] file written with same contents
//// [/home/src/workspaces/project/c.d.ts] file written with same contents

Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts"
]
Program options: {
  "declaration": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --noCheck
Output::


//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts] file written with same contents
//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents
//// [/home/src/workspaces/project/c.js] file written with same contents
//// [/home/src/workspaces/project/c.d.ts] file written with same contents

Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts"
]
Program options: {
  "declaration": true,
  "noCheck": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts

exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/TS/Lib/tsc.js 
Output::
[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error in c.ts[90m:1[0m



//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts] file written with same contents
//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents
//// [/home/src/workspaces/project/c.js] file written with same contents
//// [/home/src/workspaces/project/c.d.ts] file written with same contents

Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts"
]
Program options: {
  "declaration": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
