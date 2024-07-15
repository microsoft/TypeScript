currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/lib/lib.d.ts]
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

//// [/src/a.ts]
export const a = "hello

//// [/src/b.ts]
export const b = 10;

//// [/src/tsconfig.json]
{
  "compilerOptions": {
    "declaration": true
  }
}



Output::
/lib/tsc -p /src/tsconfig.json --noCheck
[96msrc/a.ts[0m:[93m1[0m:[93m24[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m export const a = "hello
[7m [0m [91m                       [0m


Found 1 error in src/a.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts


//// [/src/a.d.ts]
export declare const a = "hello";


//// [/src/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello;


//// [/src/b.d.ts]
export declare const b = 10;


//// [/src/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;




Change:: no-change-run
Input::


Output::
/lib/tsc -p /src/tsconfig.json --noCheck
[96msrc/a.ts[0m:[93m1[0m:[93m24[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m export const a = "hello
[7m [0m [91m                       [0m


Found 1 error in src/a.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts


//// [/src/a.d.ts] file written with same contents
//// [/src/a.js] file written with same contents
//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents


Change:: Fix `a` error with noCheck
Input::
//// [/src/a.ts]
export const a = "hello";



Output::
/lib/tsc -p /src/tsconfig.json --noCheck
exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts


//// [/src/a.d.ts] file written with same contents
//// [/src/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello";


//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents


Change:: no-change-run
Input::


Output::
/lib/tsc -p /src/tsconfig.json --noCheck
exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts


//// [/src/a.d.ts] file written with same contents
//// [/src/a.js] file written with same contents
//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents


Change:: No Change run with checking
Input::


Output::
/lib/tsc -p /src/tsconfig.json
exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "project": "/src/tsconfig.json",
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts


//// [/src/a.d.ts] file written with same contents
//// [/src/a.js] file written with same contents
//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents


Change:: No Change run with checking
Input::


Output::
/lib/tsc -p /src/tsconfig.json
exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "project": "/src/tsconfig.json",
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts


//// [/src/a.d.ts] file written with same contents
//// [/src/a.js] file written with same contents
//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents


Change:: no-change-run
Input::


Output::
/lib/tsc -p /src/tsconfig.json --noCheck
exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts


//// [/src/a.d.ts] file written with same contents
//// [/src/a.js] file written with same contents
//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents


Change:: Introduce error with noCheck
Input::
//// [/src/a.ts]
export const a = "hello



Output::
/lib/tsc -p /src/tsconfig.json --noCheck
[96msrc/a.ts[0m:[93m1[0m:[93m24[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m export const a = "hello
[7m [0m [91m                       [0m


Found 1 error in src/a.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts


//// [/src/a.d.ts] file written with same contents
//// [/src/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello;


//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents


Change:: no-change-run
Input::


Output::
/lib/tsc -p /src/tsconfig.json --noCheck
[96msrc/a.ts[0m:[93m1[0m:[93m24[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m export const a = "hello
[7m [0m [91m                       [0m


Found 1 error in src/a.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts


//// [/src/a.d.ts] file written with same contents
//// [/src/a.js] file written with same contents
//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents


Change:: No Change run with checking
Input::


Output::
/lib/tsc -p /src/tsconfig.json
[96msrc/a.ts[0m:[93m1[0m:[93m24[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m export const a = "hello
[7m [0m [91m                       [0m


Found 1 error in src/a.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "project": "/src/tsconfig.json",
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts


//// [/src/a.d.ts] file written with same contents
//// [/src/a.js] file written with same contents
//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents


Change:: Fix `a` error with noCheck
Input::
//// [/src/a.ts]
export const a = "hello";



Output::
/lib/tsc -p /src/tsconfig.json --noCheck
exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts


//// [/src/a.d.ts] file written with same contents
//// [/src/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello";


//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents


Change:: No Change run with checking
Input::


Output::
/lib/tsc -p /src/tsconfig.json
exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "project": "/src/tsconfig.json",
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts


//// [/src/a.d.ts] file written with same contents
//// [/src/a.js] file written with same contents
//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents


Change:: Add file with error
Input::
//// [/src/c.ts]
export const c: number = "hello";



Output::
/lib/tsc -p /src/tsconfig.json
[96msrc/c.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error in src/c.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "project": "/src/tsconfig.json",
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts


//// [/src/a.d.ts] file written with same contents
//// [/src/a.js] file written with same contents
//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents
//// [/src/c.d.ts]
export declare const c: number;


//// [/src/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
exports.c = "hello";




Change:: Introduce error with noCheck
Input::
//// [/src/a.ts]
export const a = "hello



Output::
/lib/tsc -p /src/tsconfig.json --noCheck
[96msrc/a.ts[0m:[93m1[0m:[93m24[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m export const a = "hello
[7m [0m [91m                       [0m


Found 1 error in src/a.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts


//// [/src/a.d.ts] file written with same contents
//// [/src/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello;


//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents
//// [/src/c.d.ts] file written with same contents
//// [/src/c.js] file written with same contents


Change:: Fix `a` error with noCheck
Input::
//// [/src/a.ts]
export const a = "hello";



Output::
/lib/tsc -p /src/tsconfig.json --noCheck
exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts


//// [/src/a.d.ts] file written with same contents
//// [/src/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello";


//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents
//// [/src/c.d.ts] file written with same contents
//// [/src/c.js] file written with same contents


Change:: No Change run with checking
Input::


Output::
/lib/tsc -p /src/tsconfig.json
[96msrc/c.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error in src/c.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "project": "/src/tsconfig.json",
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts


//// [/src/a.d.ts] file written with same contents
//// [/src/a.js] file written with same contents
//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents
//// [/src/c.d.ts] file written with same contents
//// [/src/c.js] file written with same contents


Change:: no-change-run
Input::


Output::
/lib/tsc -p /src/tsconfig.json --noCheck
exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "project": "/src/tsconfig.json",
  "noCheck": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts


//// [/src/a.d.ts] file written with same contents
//// [/src/a.js] file written with same contents
//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents
//// [/src/c.d.ts] file written with same contents
//// [/src/c.js] file written with same contents


Change:: No Change run with checking
Input::


Output::
/lib/tsc -p /src/tsconfig.json
[96msrc/c.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error in src/c.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/src/a.ts",
  "/src/b.ts",
  "/src/c.ts"
]
Program options: {
  "declaration": true,
  "project": "/src/tsconfig.json",
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts
/src/b.ts
/src/c.ts


//// [/src/a.d.ts] file written with same contents
//// [/src/a.js] file written with same contents
//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents
//// [/src/c.d.ts] file written with same contents
//// [/src/c.js] file written with same contents
