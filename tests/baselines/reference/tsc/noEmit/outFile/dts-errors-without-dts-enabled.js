currentDirectory:: /home/src/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/projects/project/a.ts]
const a = class { private p = 10; };

//// [/home/src/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "outFile": "../outFile.js"
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


/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit
Output::
[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "outFile": "../outFile.js"
[7m [0m [91m    ~~~~~~~~~[0m


Found 1 error in tsconfig.json[90m:3[0m




Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit
Output::
[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "outFile": "../outFile.js"
[7m [0m [91m    ~~~~~~~~~[0m


Found 1 error in tsconfig.json[90m:3[0m




Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Fix error

Input::
//// [/home/src/projects/project/a.ts]
const a = "hello";


/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit
Output::
[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "outFile": "../outFile.js"
[7m [0m [91m    ~~~~~~~~~[0m


Found 1 error in tsconfig.json[90m:3[0m




Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit
Output::
[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "outFile": "../outFile.js"
[7m [0m [91m    ~~~~~~~~~[0m


Found 1 error in tsconfig.json[90m:3[0m




Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Emit after fixing error

Input::

/home/src/tslibs/TS/Lib/tsc.js -p .
Output::
[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "outFile": "../outFile.js"
[7m [0m [91m    ~~~~~~~~~[0m


Found 1 error in tsconfig.json[90m:3[0m



//// [/home/src/projects/outFile.js]
var a = "hello";



Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "project": "/home/src/projects/project",
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit
Output::
[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "outFile": "../outFile.js"
[7m [0m [91m    ~~~~~~~~~[0m


Found 1 error in tsconfig.json[90m:3[0m




Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Introduce error

Input::
//// [/home/src/projects/project/a.ts]
const a = class { private p = 10; };


/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit
Output::
[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "outFile": "../outFile.js"
[7m [0m [91m    ~~~~~~~~~[0m


Found 1 error in tsconfig.json[90m:3[0m




Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Emit when error

Input::

/home/src/tslibs/TS/Lib/tsc.js -p .
Output::
[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "outFile": "../outFile.js"
[7m [0m [91m    ~~~~~~~~~[0m


Found 1 error in tsconfig.json[90m:3[0m



//// [/home/src/projects/outFile.js]
var a = /** @class */ (function () {
    function class_1() {
        this.p = 10;
    }
    return class_1;
}());



Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "project": "/home/src/projects/project",
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit
Output::
[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "outFile": "../outFile.js"
[7m [0m [91m    ~~~~~~~~~[0m


Found 1 error in tsconfig.json[90m:3[0m




Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
