Input::
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

//// [/user/username/projects/myproject/pkg0/index.ts]
export const pkg0 = 0;

//// [/user/username/projects/myproject/pkg0/tsconfig.json]
{"compilerOptions":{"composite":true}}

//// [/user/username/projects/myproject/pkg1/index.ts]
export const pkg1 = 1;

//// [/user/username/projects/myproject/pkg1/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg2/index.ts]
export const pkg2 = 2;

//// [/user/username/projects/myproject/pkg2/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg3/index.ts]
export const pkg3 = 3;

//// [/user/username/projects/myproject/pkg3/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg4/index.ts]
export const pkg4 = 4;

//// [/user/username/projects/myproject/pkg4/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg5/index.ts]
export const pkg5 = 5;

//// [/user/username/projects/myproject/pkg5/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg6/index.ts]
export const pkg6 = 6;

//// [/user/username/projects/myproject/pkg6/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg7/index.ts]
export const pkg7 = 7;

//// [/user/username/projects/myproject/pkg7/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg8/index.ts]
export const pkg8 = 8;

//// [/user/username/projects/myproject/pkg8/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg9/index.ts]
export const pkg9 = 9;

//// [/user/username/projects/myproject/pkg9/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg10/index.ts]
export const pkg10 = 10;

//// [/user/username/projects/myproject/pkg10/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg11/index.ts]
export const pkg11 = 11;

//// [/user/username/projects/myproject/pkg11/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg12/index.ts]
export const pkg12 = 12;

//// [/user/username/projects/myproject/pkg12/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg13/index.ts]
export const pkg13 = 13;

//// [/user/username/projects/myproject/pkg13/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg14/index.ts]
export const pkg14 = 14;

//// [/user/username/projects/myproject/pkg14/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg15/index.ts]
export const pkg15 = 15;

//// [/user/username/projects/myproject/pkg15/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg16/index.ts]
export const pkg16 = 16;

//// [/user/username/projects/myproject/pkg16/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg17/index.ts]
export const pkg17 = 17;

//// [/user/username/projects/myproject/pkg17/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg18/index.ts]
export const pkg18 = 18;

//// [/user/username/projects/myproject/pkg18/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg19/index.ts]
export const pkg19 = 19;

//// [/user/username/projects/myproject/pkg19/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg20/index.ts]
export const pkg20 = 20;

//// [/user/username/projects/myproject/pkg20/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg21/index.ts]
export const pkg21 = 21;

//// [/user/username/projects/myproject/pkg21/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg22/index.ts]
export const pkg22 = 22;

//// [/user/username/projects/myproject/pkg22/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/tsconfig.json]
{"references":[{"path":"./pkg0"},{"path":"./pkg1"},{"path":"./pkg2"},{"path":"./pkg3"},{"path":"./pkg4"},{"path":"./pkg5"},{"path":"./pkg6"},{"path":"./pkg7"},{"path":"./pkg8"},{"path":"./pkg9"},{"path":"./pkg10"},{"path":"./pkg11"},{"path":"./pkg12"},{"path":"./pkg13"},{"path":"./pkg14"},{"path":"./pkg15"},{"path":"./pkg16"},{"path":"./pkg17"},{"path":"./pkg18"},{"path":"./pkg19"},{"path":"./pkg20"},{"path":"./pkg21"},{"path":"./pkg22"}],"files":[]}


/a/lib/tsc.js -b -w -v
Output::
>> Screen clear
[[90m12:02:37 AM[0m] Starting compilation in watch mode...

[[90m12:02:38 AM[0m] Projects in this build: 
    * pkg0/tsconfig.json
    * pkg1/tsconfig.json
    * pkg2/tsconfig.json
    * pkg3/tsconfig.json
    * pkg4/tsconfig.json
    * pkg5/tsconfig.json
    * pkg6/tsconfig.json
    * pkg7/tsconfig.json
    * pkg8/tsconfig.json
    * pkg9/tsconfig.json
    * pkg10/tsconfig.json
    * pkg11/tsconfig.json
    * pkg12/tsconfig.json
    * pkg13/tsconfig.json
    * pkg14/tsconfig.json
    * pkg15/tsconfig.json
    * pkg16/tsconfig.json
    * pkg17/tsconfig.json
    * pkg18/tsconfig.json
    * pkg19/tsconfig.json
    * pkg20/tsconfig.json
    * pkg21/tsconfig.json
    * pkg22/tsconfig.json
    * tsconfig.json

[[90m12:02:39 AM[0m] Project 'pkg0/tsconfig.json' is out of date because output file 'pkg0/index.js' does not exist

[[90m12:02:40 AM[0m] Building project '/user/username/projects/myproject/pkg0/tsconfig.json'...

[[90m12:02:49 AM[0m] Project 'pkg1/tsconfig.json' is out of date because output file 'pkg1/index.js' does not exist

[[90m12:02:50 AM[0m] Building project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90m12:02:59 AM[0m] Project 'pkg2/tsconfig.json' is out of date because output file 'pkg2/index.js' does not exist

[[90m12:03:00 AM[0m] Building project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90m12:03:09 AM[0m] Project 'pkg3/tsconfig.json' is out of date because output file 'pkg3/index.js' does not exist

[[90m12:03:10 AM[0m] Building project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90m12:03:19 AM[0m] Project 'pkg4/tsconfig.json' is out of date because output file 'pkg4/index.js' does not exist

[[90m12:03:20 AM[0m] Building project '/user/username/projects/myproject/pkg4/tsconfig.json'...

[[90m12:03:29 AM[0m] Project 'pkg5/tsconfig.json' is out of date because output file 'pkg5/index.js' does not exist

[[90m12:03:30 AM[0m] Building project '/user/username/projects/myproject/pkg5/tsconfig.json'...

[[90m12:03:39 AM[0m] Project 'pkg6/tsconfig.json' is out of date because output file 'pkg6/index.js' does not exist

[[90m12:03:40 AM[0m] Building project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90m12:03:49 AM[0m] Project 'pkg7/tsconfig.json' is out of date because output file 'pkg7/index.js' does not exist

[[90m12:03:50 AM[0m] Building project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90m12:03:59 AM[0m] Project 'pkg8/tsconfig.json' is out of date because output file 'pkg8/index.js' does not exist

[[90m12:04:00 AM[0m] Building project '/user/username/projects/myproject/pkg8/tsconfig.json'...

[[90m12:04:09 AM[0m] Project 'pkg9/tsconfig.json' is out of date because output file 'pkg9/index.js' does not exist

[[90m12:04:10 AM[0m] Building project '/user/username/projects/myproject/pkg9/tsconfig.json'...

[[90m12:04:19 AM[0m] Project 'pkg10/tsconfig.json' is out of date because output file 'pkg10/index.js' does not exist

[[90m12:04:20 AM[0m] Building project '/user/username/projects/myproject/pkg10/tsconfig.json'...

[[90m12:04:29 AM[0m] Project 'pkg11/tsconfig.json' is out of date because output file 'pkg11/index.js' does not exist

[[90m12:04:30 AM[0m] Building project '/user/username/projects/myproject/pkg11/tsconfig.json'...

[[90m12:04:39 AM[0m] Project 'pkg12/tsconfig.json' is out of date because output file 'pkg12/index.js' does not exist

[[90m12:04:40 AM[0m] Building project '/user/username/projects/myproject/pkg12/tsconfig.json'...

[[90m12:04:49 AM[0m] Project 'pkg13/tsconfig.json' is out of date because output file 'pkg13/index.js' does not exist

[[90m12:04:50 AM[0m] Building project '/user/username/projects/myproject/pkg13/tsconfig.json'...

[[90m12:04:59 AM[0m] Project 'pkg14/tsconfig.json' is out of date because output file 'pkg14/index.js' does not exist

[[90m12:05:00 AM[0m] Building project '/user/username/projects/myproject/pkg14/tsconfig.json'...

[[90m12:05:09 AM[0m] Project 'pkg15/tsconfig.json' is out of date because output file 'pkg15/index.js' does not exist

[[90m12:05:10 AM[0m] Building project '/user/username/projects/myproject/pkg15/tsconfig.json'...

[[90m12:05:19 AM[0m] Project 'pkg16/tsconfig.json' is out of date because output file 'pkg16/index.js' does not exist

[[90m12:05:20 AM[0m] Building project '/user/username/projects/myproject/pkg16/tsconfig.json'...

[[90m12:05:29 AM[0m] Project 'pkg17/tsconfig.json' is out of date because output file 'pkg17/index.js' does not exist

[[90m12:05:30 AM[0m] Building project '/user/username/projects/myproject/pkg17/tsconfig.json'...

[[90m12:05:39 AM[0m] Project 'pkg18/tsconfig.json' is out of date because output file 'pkg18/index.js' does not exist

[[90m12:05:40 AM[0m] Building project '/user/username/projects/myproject/pkg18/tsconfig.json'...

[[90m12:05:49 AM[0m] Project 'pkg19/tsconfig.json' is out of date because output file 'pkg19/index.js' does not exist

[[90m12:05:50 AM[0m] Building project '/user/username/projects/myproject/pkg19/tsconfig.json'...

[[90m12:05:59 AM[0m] Project 'pkg20/tsconfig.json' is out of date because output file 'pkg20/index.js' does not exist

[[90m12:06:00 AM[0m] Building project '/user/username/projects/myproject/pkg20/tsconfig.json'...

[[90m12:06:09 AM[0m] Project 'pkg21/tsconfig.json' is out of date because output file 'pkg21/index.js' does not exist

[[90m12:06:10 AM[0m] Building project '/user/username/projects/myproject/pkg21/tsconfig.json'...

[[90m12:06:19 AM[0m] Project 'pkg22/tsconfig.json' is out of date because output file 'pkg22/index.js' does not exist

[[90m12:06:20 AM[0m] Building project '/user/username/projects/myproject/pkg22/tsconfig.json'...

[[90m12:06:29 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/pkg0/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg0/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg0/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg1/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg1/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg1/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg2/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg2/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg2/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg3/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg3/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg3/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg3/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg3/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg4/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg4/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg4/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg4/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg4/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg5/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg5/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg5/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg5/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg5/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg6/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg6/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg6/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg6/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg6/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg7/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg7/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg7/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg7/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg7/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg8/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg8/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg8/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg8/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg8/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg9/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg9/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg9/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg9/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg9/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg10/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg10/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg10/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg10/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg10/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg11/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg11/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg11/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg11/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg11/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg12/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg12/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg12/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg12/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg12/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg13/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg13/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg13/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg13/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg13/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg14/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg14/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg14/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg14/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg14/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg15/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg15/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg15/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg15/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg15/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg16/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg16/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg16/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg16/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg16/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg17/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg17/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg17/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg17/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg17/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg18/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg18/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg18/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg18/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg18/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg19/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg19/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg19/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg19/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg19/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg20/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg20/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg20/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg20/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg20/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg21/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg21/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg21/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg21/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg21/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg22/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg22/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg22/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg22/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg22/index.ts (computed .d.ts during emit)

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg8/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg8/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg8/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg8/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg9/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg9/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg9/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg9/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg10/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg10/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg10/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg10/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg11/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg11/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg11/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg11/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg12/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg12/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg12/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg12/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg13/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg13/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg13/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg13/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg14/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg14/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg14/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg14/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg15/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg15/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg15/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg15/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg16/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg16/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg16/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg16/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg17/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg17/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg17/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg17/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg18/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg18/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg18/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg18/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg19/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg19/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg19/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg19/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg20/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg20/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg20/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg20/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg21/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg21/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg21/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg21/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg22/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg22/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg22/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg22/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg8:
  {"directoryName":"/user/username/projects/myproject/pkg8","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg9:
  {"directoryName":"/user/username/projects/myproject/pkg9","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg10:
  {"directoryName":"/user/username/projects/myproject/pkg10","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg11:
  {"directoryName":"/user/username/projects/myproject/pkg11","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg12:
  {"directoryName":"/user/username/projects/myproject/pkg12","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg13:
  {"directoryName":"/user/username/projects/myproject/pkg13","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg14:
  {"directoryName":"/user/username/projects/myproject/pkg14","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg15:
  {"directoryName":"/user/username/projects/myproject/pkg15","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg16:
  {"directoryName":"/user/username/projects/myproject/pkg16","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg17:
  {"directoryName":"/user/username/projects/myproject/pkg17","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg18:
  {"directoryName":"/user/username/projects/myproject/pkg18","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg19:
  {"directoryName":"/user/username/projects/myproject/pkg19","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg20:
  {"directoryName":"/user/username/projects/myproject/pkg20","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg21:
  {"directoryName":"/user/username/projects/myproject/pkg21","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg22:
  {"directoryName":"/user/username/projects/myproject/pkg22","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg0/index.js]
"use strict";
exports.__esModule = true;
exports.pkg0 = void 0;
exports.pkg0 = 0;


//// [/user/username/projects/myproject/pkg0/index.d.ts]
export declare const pkg0 = 0;


//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-10197922616-export const pkg0 = 0;","signature":"-4821832606-export declare const pkg0 = 0;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-10197922616-export const pkg0 = 0;",
        "signature": "-4821832606-export declare const pkg0 = 0;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 727
}

//// [/user/username/projects/myproject/pkg1/index.js]
"use strict";
exports.__esModule = true;
exports.pkg1 = void 0;
exports.pkg1 = 1;


//// [/user/username/projects/myproject/pkg1/index.d.ts]
export declare const pkg1 = 1;


//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-10158787190-export const pkg1 = 1;","signature":"-3530363548-export declare const pkg1 = 1;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-10158787190-export const pkg1 = 1;",
        "signature": "-3530363548-export declare const pkg1 = 1;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 727
}

//// [/user/username/projects/myproject/pkg2/index.js]
"use strict";
exports.__esModule = true;
exports.pkg2 = void 0;
exports.pkg2 = 2;


//// [/user/username/projects/myproject/pkg2/index.d.ts]
export declare const pkg2 = 2;


//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-14414619060-export const pkg2 = 2;","signature":"-6533861786-export declare const pkg2 = 2;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-14414619060-export const pkg2 = 2;",
        "signature": "-6533861786-export declare const pkg2 = 2;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 727
}

//// [/user/username/projects/myproject/pkg3/index.js]
"use strict";
exports.__esModule = true;
exports.pkg3 = void 0;
exports.pkg3 = 3;


//// [/user/username/projects/myproject/pkg3/index.d.ts]
export declare const pkg3 = 3;


//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-14375483634-export const pkg3 = 3;","signature":"-5242392728-export declare const pkg3 = 3;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-14375483634-export const pkg3 = 3;",
        "signature": "-5242392728-export declare const pkg3 = 3;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 727
}

//// [/user/username/projects/myproject/pkg4/index.js]
"use strict";
exports.__esModule = true;
exports.pkg4 = void 0;
exports.pkg4 = 4;


//// [/user/username/projects/myproject/pkg4/index.d.ts]
export declare const pkg4 = 4;


//// [/user/username/projects/myproject/pkg4/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-14336348208-export const pkg4 = 4;","signature":"-3950923670-export declare const pkg4 = 4;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg4/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-14336348208-export const pkg4 = 4;",
        "signature": "-3950923670-export declare const pkg4 = 4;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 727
}

//// [/user/username/projects/myproject/pkg5/index.js]
"use strict";
exports.__esModule = true;
exports.pkg5 = void 0;
exports.pkg5 = 5;


//// [/user/username/projects/myproject/pkg5/index.d.ts]
export declare const pkg5 = 5;


//// [/user/username/projects/myproject/pkg5/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-14297212782-export const pkg5 = 5;","signature":"-2659454612-export declare const pkg5 = 5;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg5/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-14297212782-export const pkg5 = 5;",
        "signature": "-2659454612-export declare const pkg5 = 5;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 727
}

//// [/user/username/projects/myproject/pkg6/index.js]
"use strict";
exports.__esModule = true;
exports.pkg6 = void 0;
exports.pkg6 = 6;


//// [/user/username/projects/myproject/pkg6/index.d.ts]
export declare const pkg6 = 6;


//// [/user/username/projects/myproject/pkg6/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-14258077356-export const pkg6 = 6;","signature":"-5662952850-export declare const pkg6 = 6;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg6/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-14258077356-export const pkg6 = 6;",
        "signature": "-5662952850-export declare const pkg6 = 6;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 727
}

//// [/user/username/projects/myproject/pkg7/index.js]
"use strict";
exports.__esModule = true;
exports.pkg7 = void 0;
exports.pkg7 = 7;


//// [/user/username/projects/myproject/pkg7/index.d.ts]
export declare const pkg7 = 7;


//// [/user/username/projects/myproject/pkg7/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-14218941930-export const pkg7 = 7;","signature":"-4371483792-export declare const pkg7 = 7;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg7/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-14218941930-export const pkg7 = 7;",
        "signature": "-4371483792-export declare const pkg7 = 7;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 727
}

//// [/user/username/projects/myproject/pkg8/index.js]
"use strict";
exports.__esModule = true;
exports.pkg8 = void 0;
exports.pkg8 = 8;


//// [/user/username/projects/myproject/pkg8/index.d.ts]
export declare const pkg8 = 8;


//// [/user/username/projects/myproject/pkg8/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-14179806504-export const pkg8 = 8;","signature":"-3080014734-export declare const pkg8 = 8;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg8/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-14179806504-export const pkg8 = 8;",
        "signature": "-3080014734-export declare const pkg8 = 8;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 727
}

//// [/user/username/projects/myproject/pkg9/index.js]
"use strict";
exports.__esModule = true;
exports.pkg9 = void 0;
exports.pkg9 = 9;


//// [/user/username/projects/myproject/pkg9/index.d.ts]
export declare const pkg9 = 9;


//// [/user/username/projects/myproject/pkg9/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-14140671078-export const pkg9 = 9;","signature":"-6083512972-export declare const pkg9 = 9;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg9/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-14140671078-export const pkg9 = 9;",
        "signature": "-6083512972-export declare const pkg9 = 9;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 727
}

//// [/user/username/projects/myproject/pkg10/index.js]
"use strict";
exports.__esModule = true;
exports.pkg10 = void 0;
exports.pkg10 = 10;


//// [/user/username/projects/myproject/pkg10/index.d.ts]
export declare const pkg10 = 10;


//// [/user/username/projects/myproject/pkg10/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-9585933846-export const pkg10 = 10;","signature":"-3553269308-export declare const pkg10 = 10;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg10/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-9585933846-export const pkg10 = 10;",
        "signature": "-3553269308-export declare const pkg10 = 10;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 730
}

//// [/user/username/projects/myproject/pkg11/index.js]
"use strict";
exports.__esModule = true;
exports.pkg11 = void 0;
exports.pkg11 = 11;


//// [/user/username/projects/myproject/pkg11/index.d.ts]
export declare const pkg11 = 11;


//// [/user/username/projects/myproject/pkg11/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-8294465844-export const pkg11 = 11;","signature":"410469094-export declare const pkg11 = 11;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg11/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-8294465844-export const pkg11 = 11;",
        "signature": "410469094-export declare const pkg11 = 11;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 728
}

//// [/user/username/projects/myproject/pkg12/index.js]
"use strict";
exports.__esModule = true;
exports.pkg12 = void 0;
exports.pkg12 = 12;


//// [/user/username/projects/myproject/pkg12/index.d.ts]
export declare const pkg12 = 12;


//// [/user/username/projects/myproject/pkg12/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-7002997842-export const pkg12 = 12;","signature":"-4215727096-export declare const pkg12 = 12;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg12/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-7002997842-export const pkg12 = 12;",
        "signature": "-4215727096-export declare const pkg12 = 12;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 730
}

//// [/user/username/projects/myproject/pkg13/index.js]
"use strict";
exports.__esModule = true;
exports.pkg13 = void 0;
exports.pkg13 = 13;


//// [/user/username/projects/myproject/pkg13/index.d.ts]
export declare const pkg13 = 13;


//// [/user/username/projects/myproject/pkg13/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-10006497136-export const pkg13 = 13;","signature":"-4546955990-export declare const pkg13 = 13;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg13/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-10006497136-export const pkg13 = 13;",
        "signature": "-4546955990-export declare const pkg13 = 13;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 731
}

//// [/user/username/projects/myproject/pkg14/index.js]
"use strict";
exports.__esModule = true;
exports.pkg14 = void 0;
exports.pkg14 = 14;


//// [/user/username/projects/myproject/pkg14/index.d.ts]
export declare const pkg14 = 14;


//// [/user/username/projects/myproject/pkg14/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-8715029134-export const pkg14 = 14;","signature":"-583217588-export declare const pkg14 = 14;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg14/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-8715029134-export const pkg14 = 14;",
        "signature": "-583217588-export declare const pkg14 = 14;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 729
}

//// [/user/username/projects/myproject/pkg15/index.js]
"use strict";
exports.__esModule = true;
exports.pkg15 = void 0;
exports.pkg15 = 15;


//// [/user/username/projects/myproject/pkg15/index.d.ts]
export declare const pkg15 = 15;


//// [/user/username/projects/myproject/pkg15/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-7423561132-export const pkg15 = 15;","signature":"-5209413778-export declare const pkg15 = 15;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg15/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-7423561132-export const pkg15 = 15;",
        "signature": "-5209413778-export declare const pkg15 = 15;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 730
}

//// [/user/username/projects/myproject/pkg16/index.js]
"use strict";
exports.__esModule = true;
exports.pkg16 = void 0;
exports.pkg16 = 16;


//// [/user/username/projects/myproject/pkg16/index.d.ts]
export declare const pkg16 = 16;


//// [/user/username/projects/myproject/pkg16/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-6132093130-export const pkg16 = 16;","signature":"-1245675376-export declare const pkg16 = 16;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg16/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-6132093130-export const pkg16 = 16;",
        "signature": "-1245675376-export declare const pkg16 = 16;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 730
}

//// [/user/username/projects/myproject/pkg17/index.js]
"use strict";
exports.__esModule = true;
exports.pkg17 = void 0;
exports.pkg17 = 17;


//// [/user/username/projects/myproject/pkg17/index.d.ts]
export declare const pkg17 = 17;


//// [/user/username/projects/myproject/pkg17/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-17725527016-export const pkg17 = 17;","signature":"-1576904270-export declare const pkg17 = 17;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg17/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-17725527016-export const pkg17 = 17;",
        "signature": "-1576904270-export declare const pkg17 = 17;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 731
}

//// [/user/username/projects/myproject/pkg18/index.js]
"use strict";
exports.__esModule = true;
exports.pkg18 = void 0;
exports.pkg18 = 18;


//// [/user/username/projects/myproject/pkg18/index.d.ts]
export declare const pkg18 = 18;


//// [/user/username/projects/myproject/pkg18/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-16434059014-export const pkg18 = 18;","signature":"-1908133164-export declare const pkg18 = 18;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg18/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-16434059014-export const pkg18 = 18;",
        "signature": "-1908133164-export declare const pkg18 = 18;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 731
}

//// [/user/username/projects/myproject/pkg19/index.js]
"use strict";
exports.__esModule = true;
exports.pkg19 = void 0;
exports.pkg19 = 19;


//// [/user/username/projects/myproject/pkg19/index.d.ts]
export declare const pkg19 = 19;


//// [/user/username/projects/myproject/pkg19/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-15142591012-export const pkg19 = 19;","signature":"-2239362058-export declare const pkg19 = 19;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg19/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-15142591012-export const pkg19 = 19;",
        "signature": "-2239362058-export declare const pkg19 = 19;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 731
}

//// [/user/username/projects/myproject/pkg20/index.js]
"use strict";
exports.__esModule = true;
exports.pkg20 = void 0;
exports.pkg20 = 20;


//// [/user/username/projects/myproject/pkg20/index.d.ts]
export declare const pkg20 = 20;


//// [/user/username/projects/myproject/pkg20/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-14212130036-export const pkg20 = 20;","signature":"-5893888218-export declare const pkg20 = 20;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg20/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-14212130036-export const pkg20 = 20;",
        "signature": "-5893888218-export declare const pkg20 = 20;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 731
}

//// [/user/username/projects/myproject/pkg21/index.js]
"use strict";
exports.__esModule = true;
exports.pkg21 = void 0;
exports.pkg21 = 21;


//// [/user/username/projects/myproject/pkg21/index.d.ts]
export declare const pkg21 = 21;


//// [/user/username/projects/myproject/pkg21/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-17215629330-export const pkg21 = 21;","signature":"-6225117112-export declare const pkg21 = 21;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg21/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-17215629330-export const pkg21 = 21;",
        "signature": "-6225117112-export declare const pkg21 = 21;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 731
}

//// [/user/username/projects/myproject/pkg22/index.js]
"use strict";
exports.__esModule = true;
exports.pkg22 = void 0;
exports.pkg22 = 22;


//// [/user/username/projects/myproject/pkg22/index.d.ts]
export declare const pkg22 = 22;


//// [/user/username/projects/myproject/pkg22/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-15924161328-export const pkg22 = 22;","signature":"-6556346006-export declare const pkg22 = 22;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg22/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-15924161328-export const pkg22 = 22;",
        "signature": "-6556346006-export declare const pkg22 = 22;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 731
}


Change:: dts doesn't change

Input::
//// [/user/username/projects/myproject/pkg0/index.ts]
export const pkg0 = 0;const someConst2 = 10;


Output::
>> Screen clear
[[90m12:06:32 AM[0m] File change detected. Starting incremental compilation...

[[90m12:06:33 AM[0m] Project 'pkg0/tsconfig.json' is out of date because oldest output 'pkg0/index.js' is older than newest input 'pkg0/index.ts'

[[90m12:06:34 AM[0m] Building project '/user/username/projects/myproject/pkg0/tsconfig.json'...

[[90m12:06:47 AM[0m] Project 'pkg1/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:06:49 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90m12:06:50 AM[0m] Project 'pkg2/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:06:52 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90m12:06:53 AM[0m] Project 'pkg3/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:06:55 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90m12:06:56 AM[0m] Project 'pkg4/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:06:58 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg4/tsconfig.json'...

[[90m12:06:59 AM[0m] Project 'pkg5/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:07:01 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg5/tsconfig.json'...

[[90m12:07:02 AM[0m] Project 'pkg6/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:07:04 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90m12:07:05 AM[0m] Project 'pkg7/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:07:07 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90m12:07:08 AM[0m] Project 'pkg8/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:07:10 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg8/tsconfig.json'...

[[90m12:07:11 AM[0m] Project 'pkg9/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:07:13 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg9/tsconfig.json'...

[[90m12:07:14 AM[0m] Project 'pkg10/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:07:16 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg10/tsconfig.json'...

[[90m12:07:17 AM[0m] Project 'pkg11/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:07:19 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg11/tsconfig.json'...

[[90m12:07:20 AM[0m] Project 'pkg12/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:07:22 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg12/tsconfig.json'...

[[90m12:07:23 AM[0m] Project 'pkg13/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:07:25 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg13/tsconfig.json'...

[[90m12:07:26 AM[0m] Project 'pkg14/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:07:28 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg14/tsconfig.json'...

[[90m12:07:29 AM[0m] Project 'pkg15/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:07:31 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg15/tsconfig.json'...

[[90m12:07:32 AM[0m] Project 'pkg16/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:07:34 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg16/tsconfig.json'...

[[90m12:07:35 AM[0m] Project 'pkg17/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:07:37 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg17/tsconfig.json'...

[[90m12:07:38 AM[0m] Project 'pkg18/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:07:40 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg18/tsconfig.json'...

[[90m12:07:41 AM[0m] Project 'pkg19/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:07:43 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg19/tsconfig.json'...

[[90m12:07:44 AM[0m] Project 'pkg20/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:07:46 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg20/tsconfig.json'...

[[90m12:07:47 AM[0m] Project 'pkg21/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:07:49 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg21/tsconfig.json'...

[[90m12:07:50 AM[0m] Project 'pkg22/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:07:52 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg22/tsconfig.json'...

[[90m12:07:53 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/pkg0/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg0/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts (computed .d.ts)

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg8/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg8/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg8/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg8/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg9/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg9/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg9/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg9/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg10/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg10/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg10/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg10/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg11/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg11/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg11/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg11/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg12/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg12/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg12/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg12/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg13/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg13/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg13/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg13/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg14/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg14/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg14/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg14/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg15/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg15/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg15/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg15/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg16/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg16/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg16/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg16/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg17/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg17/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg17/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg17/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg18/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg18/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg18/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg18/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg19/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg19/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg19/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg19/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg20/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg20/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg20/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg20/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg21/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg21/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg21/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg21/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg22/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg22/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg22/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg22/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg8:
  {"directoryName":"/user/username/projects/myproject/pkg8","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg9:
  {"directoryName":"/user/username/projects/myproject/pkg9","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg10:
  {"directoryName":"/user/username/projects/myproject/pkg10","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg11:
  {"directoryName":"/user/username/projects/myproject/pkg11","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg12:
  {"directoryName":"/user/username/projects/myproject/pkg12","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg13:
  {"directoryName":"/user/username/projects/myproject/pkg13","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg14:
  {"directoryName":"/user/username/projects/myproject/pkg14","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg15:
  {"directoryName":"/user/username/projects/myproject/pkg15","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg16:
  {"directoryName":"/user/username/projects/myproject/pkg16","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg17:
  {"directoryName":"/user/username/projects/myproject/pkg17","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg18:
  {"directoryName":"/user/username/projects/myproject/pkg18","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg19:
  {"directoryName":"/user/username/projects/myproject/pkg19","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg20:
  {"directoryName":"/user/username/projects/myproject/pkg20","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg21:
  {"directoryName":"/user/username/projects/myproject/pkg21","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg22:
  {"directoryName":"/user/username/projects/myproject/pkg22","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg0/index.js]
"use strict";
exports.__esModule = true;
exports.pkg0 = void 0;
exports.pkg0 = 0;
var someConst2 = 10;


//// [/user/username/projects/myproject/pkg0/index.d.ts] file written with same contents
//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-7839887915-export const pkg0 = 0;const someConst2 = 10;","signature":"-4821832606-export declare const pkg0 = 0;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-7839887915-export const pkg0 = 0;const someConst2 = 10;",
        "signature": "-4821832606-export declare const pkg0 = 0;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 748
}

//// [/user/username/projects/myproject/pkg1/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg1/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg2/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg2/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg3/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg3/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg4/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg4/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg4/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg5/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg5/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg5/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg6/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg6/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg6/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg7/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg7/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg7/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg8/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg8/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg8/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg9/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg9/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg9/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg10/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg10/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg10/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg11/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg11/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg11/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg12/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg12/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg12/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg13/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg13/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg13/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg14/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg14/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg14/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg15/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg15/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg15/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg16/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg16/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg16/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg17/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg17/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg17/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg18/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg18/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg18/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg19/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg19/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg19/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg20/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg20/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg20/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg21/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg21/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg21/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg22/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg22/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg22/tsconfig.tsbuildinfo] file changed its modified time

Change:: No change

Input::

Output::

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg8/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg8/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg8/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg8/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg9/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg9/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg9/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg9/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg10/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg10/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg10/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg10/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg11/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg11/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg11/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg11/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg12/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg12/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg12/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg12/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg13/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg13/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg13/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg13/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg14/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg14/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg14/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg14/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg15/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg15/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg15/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg15/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg16/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg16/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg16/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg16/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg17/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg17/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg17/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg17/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg18/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg18/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg18/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg18/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg19/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg19/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg19/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg19/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg20/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg20/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg20/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg20/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg21/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg21/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg21/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg21/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg22/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg22/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg22/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg22/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg8:
  {"directoryName":"/user/username/projects/myproject/pkg8","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg9:
  {"directoryName":"/user/username/projects/myproject/pkg9","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg10:
  {"directoryName":"/user/username/projects/myproject/pkg10","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg11:
  {"directoryName":"/user/username/projects/myproject/pkg11","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg12:
  {"directoryName":"/user/username/projects/myproject/pkg12","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg13:
  {"directoryName":"/user/username/projects/myproject/pkg13","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg14:
  {"directoryName":"/user/username/projects/myproject/pkg14","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg15:
  {"directoryName":"/user/username/projects/myproject/pkg15","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg16:
  {"directoryName":"/user/username/projects/myproject/pkg16","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg17:
  {"directoryName":"/user/username/projects/myproject/pkg17","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg18:
  {"directoryName":"/user/username/projects/myproject/pkg18","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg19:
  {"directoryName":"/user/username/projects/myproject/pkg19","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg20:
  {"directoryName":"/user/username/projects/myproject/pkg20","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg21:
  {"directoryName":"/user/username/projects/myproject/pkg21","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg22:
  {"directoryName":"/user/username/projects/myproject/pkg22","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: dts change

Input::
//// [/user/username/projects/myproject/pkg0/index.ts]
export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;


Output::
>> Screen clear
[[90m12:07:56 AM[0m] File change detected. Starting incremental compilation...

[[90m12:07:57 AM[0m] Project 'pkg0/tsconfig.json' is out of date because oldest output 'pkg0/index.js' is older than newest input 'pkg0/index.ts'

[[90m12:07:58 AM[0m] Building project '/user/username/projects/myproject/pkg0/tsconfig.json'...



Program root files: ["/user/username/projects/myproject/pkg0/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg0/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts (computed .d.ts)

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg8/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg8/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg8/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg8/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg9/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg9/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg9/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg9/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg10/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg10/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg10/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg10/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg11/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg11/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg11/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg11/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg12/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg12/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg12/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg12/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg13/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg13/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg13/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg13/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg14/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg14/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg14/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg14/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg15/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg15/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg15/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg15/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg16/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg16/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg16/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg16/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg17/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg17/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg17/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg17/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg18/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg18/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg18/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg18/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg19/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg19/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg19/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg19/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg20/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg20/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg20/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg20/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg21/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg21/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg21/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg21/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg22/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg22/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg22/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg22/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg8:
  {"directoryName":"/user/username/projects/myproject/pkg8","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg9:
  {"directoryName":"/user/username/projects/myproject/pkg9","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg10:
  {"directoryName":"/user/username/projects/myproject/pkg10","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg11:
  {"directoryName":"/user/username/projects/myproject/pkg11","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg12:
  {"directoryName":"/user/username/projects/myproject/pkg12","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg13:
  {"directoryName":"/user/username/projects/myproject/pkg13","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg14:
  {"directoryName":"/user/username/projects/myproject/pkg14","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg15:
  {"directoryName":"/user/username/projects/myproject/pkg15","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg16:
  {"directoryName":"/user/username/projects/myproject/pkg16","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg17:
  {"directoryName":"/user/username/projects/myproject/pkg17","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg18:
  {"directoryName":"/user/username/projects/myproject/pkg18","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg19:
  {"directoryName":"/user/username/projects/myproject/pkg19","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg20:
  {"directoryName":"/user/username/projects/myproject/pkg20","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg21:
  {"directoryName":"/user/username/projects/myproject/pkg21","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg22:
  {"directoryName":"/user/username/projects/myproject/pkg22","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg0/index.js]
"use strict";
exports.__esModule = true;
exports.someConst = exports.pkg0 = void 0;
exports.pkg0 = 0;
var someConst2 = 10;
exports.someConst = 10;


//// [/user/username/projects/myproject/pkg0/index.d.ts]
export declare const pkg0 = 0;
export declare const someConst = 10;


//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"1748855762-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;","signature":"-6216230055-export declare const pkg0 = 0;\nexport declare const someConst = 10;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "1748855762-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;",
        "signature": "-6216230055-export declare const pkg0 = 0;\nexport declare const someConst = 10;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 813
}


Change:: build pkg1,pkg2,pkg3,pkg4,pkg5

Input::

Output::
[[90m12:08:11 AM[0m] Project 'pkg1/tsconfig.json' is out of date because oldest output 'pkg1/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:08:12 AM[0m] Building project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90m12:08:14 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90m12:08:15 AM[0m] Project 'pkg2/tsconfig.json' is out of date because oldest output 'pkg2/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:08:16 AM[0m] Building project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90m12:08:18 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90m12:08:19 AM[0m] Project 'pkg3/tsconfig.json' is out of date because oldest output 'pkg3/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:08:20 AM[0m] Building project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90m12:08:22 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90m12:08:23 AM[0m] Project 'pkg4/tsconfig.json' is out of date because oldest output 'pkg4/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:08:24 AM[0m] Building project '/user/username/projects/myproject/pkg4/tsconfig.json'...

[[90m12:08:26 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg4/tsconfig.json'...

[[90m12:08:27 AM[0m] Project 'pkg5/tsconfig.json' is out of date because oldest output 'pkg5/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:08:28 AM[0m] Building project '/user/username/projects/myproject/pkg5/tsconfig.json'...

[[90m12:08:30 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg5/tsconfig.json'...



Program root files: ["/user/username/projects/myproject/pkg1/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg1/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg2/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg2/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg3/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg3/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg3/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg4/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg4/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg4/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg5/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg5/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg5/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg8/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg8/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg8/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg8/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg9/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg9/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg9/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg9/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg10/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg10/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg10/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg10/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg11/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg11/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg11/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg11/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg12/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg12/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg12/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg12/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg13/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg13/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg13/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg13/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg14/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg14/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg14/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg14/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg15/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg15/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg15/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg15/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg16/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg16/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg16/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg16/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg17/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg17/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg17/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg17/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg18/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg18/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg18/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg18/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg19/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg19/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg19/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg19/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg20/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg20/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg20/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg20/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg21/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg21/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg21/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg21/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg22/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg22/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg22/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg22/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg8:
  {"directoryName":"/user/username/projects/myproject/pkg8","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg9:
  {"directoryName":"/user/username/projects/myproject/pkg9","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg10:
  {"directoryName":"/user/username/projects/myproject/pkg10","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg11:
  {"directoryName":"/user/username/projects/myproject/pkg11","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg12:
  {"directoryName":"/user/username/projects/myproject/pkg12","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg13:
  {"directoryName":"/user/username/projects/myproject/pkg13","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg14:
  {"directoryName":"/user/username/projects/myproject/pkg14","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg15:
  {"directoryName":"/user/username/projects/myproject/pkg15","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg16:
  {"directoryName":"/user/username/projects/myproject/pkg16","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg17:
  {"directoryName":"/user/username/projects/myproject/pkg17","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg18:
  {"directoryName":"/user/username/projects/myproject/pkg18","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg19:
  {"directoryName":"/user/username/projects/myproject/pkg19","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg20:
  {"directoryName":"/user/username/projects/myproject/pkg20","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg21:
  {"directoryName":"/user/username/projects/myproject/pkg21","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg22:
  {"directoryName":"/user/username/projects/myproject/pkg22","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg1/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg1/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg2/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg2/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg3/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg3/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg4/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg4/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg4/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg5/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg5/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg5/tsconfig.tsbuildinfo] file changed its modified time

Change:: build pkg6,pkg7,pkg8,pkg9,pkg10

Input::

Output::
[[90m12:08:31 AM[0m] Project 'pkg6/tsconfig.json' is out of date because oldest output 'pkg6/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:08:32 AM[0m] Building project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90m12:08:34 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90m12:08:35 AM[0m] Project 'pkg7/tsconfig.json' is out of date because oldest output 'pkg7/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:08:36 AM[0m] Building project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90m12:08:38 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90m12:08:39 AM[0m] Project 'pkg8/tsconfig.json' is out of date because oldest output 'pkg8/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:08:40 AM[0m] Building project '/user/username/projects/myproject/pkg8/tsconfig.json'...

[[90m12:08:42 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg8/tsconfig.json'...

[[90m12:08:43 AM[0m] Project 'pkg9/tsconfig.json' is out of date because oldest output 'pkg9/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:08:44 AM[0m] Building project '/user/username/projects/myproject/pkg9/tsconfig.json'...

[[90m12:08:46 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg9/tsconfig.json'...

[[90m12:08:47 AM[0m] Project 'pkg10/tsconfig.json' is out of date because oldest output 'pkg10/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:08:48 AM[0m] Building project '/user/username/projects/myproject/pkg10/tsconfig.json'...

[[90m12:08:50 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg10/tsconfig.json'...



Program root files: ["/user/username/projects/myproject/pkg6/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg6/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg6/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg7/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg7/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg7/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg8/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg8/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg8/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg9/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg9/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg9/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg10/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg10/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg10/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg8/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg8/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg8/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg8/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg9/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg9/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg9/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg9/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg10/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg10/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg10/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg10/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg11/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg11/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg11/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg11/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg12/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg12/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg12/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg12/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg13/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg13/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg13/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg13/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg14/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg14/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg14/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg14/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg15/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg15/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg15/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg15/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg16/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg16/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg16/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg16/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg17/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg17/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg17/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg17/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg18/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg18/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg18/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg18/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg19/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg19/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg19/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg19/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg20/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg20/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg20/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg20/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg21/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg21/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg21/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg21/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg22/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg22/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg22/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg22/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg8:
  {"directoryName":"/user/username/projects/myproject/pkg8","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg9:
  {"directoryName":"/user/username/projects/myproject/pkg9","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg10:
  {"directoryName":"/user/username/projects/myproject/pkg10","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg11:
  {"directoryName":"/user/username/projects/myproject/pkg11","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg12:
  {"directoryName":"/user/username/projects/myproject/pkg12","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg13:
  {"directoryName":"/user/username/projects/myproject/pkg13","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg14:
  {"directoryName":"/user/username/projects/myproject/pkg14","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg15:
  {"directoryName":"/user/username/projects/myproject/pkg15","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg16:
  {"directoryName":"/user/username/projects/myproject/pkg16","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg17:
  {"directoryName":"/user/username/projects/myproject/pkg17","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg18:
  {"directoryName":"/user/username/projects/myproject/pkg18","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg19:
  {"directoryName":"/user/username/projects/myproject/pkg19","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg20:
  {"directoryName":"/user/username/projects/myproject/pkg20","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg21:
  {"directoryName":"/user/username/projects/myproject/pkg21","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg22:
  {"directoryName":"/user/username/projects/myproject/pkg22","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg6/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg6/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg6/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg7/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg7/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg7/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg8/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg8/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg8/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg9/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg9/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg9/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg10/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg10/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg10/tsconfig.tsbuildinfo] file changed its modified time

Change:: build pkg11,pkg12,pkg13,pkg14,pkg15

Input::

Output::
[[90m12:08:51 AM[0m] Project 'pkg11/tsconfig.json' is out of date because oldest output 'pkg11/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:08:52 AM[0m] Building project '/user/username/projects/myproject/pkg11/tsconfig.json'...

[[90m12:08:54 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg11/tsconfig.json'...

[[90m12:08:55 AM[0m] Project 'pkg12/tsconfig.json' is out of date because oldest output 'pkg12/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:08:56 AM[0m] Building project '/user/username/projects/myproject/pkg12/tsconfig.json'...

[[90m12:08:58 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg12/tsconfig.json'...

[[90m12:08:59 AM[0m] Project 'pkg13/tsconfig.json' is out of date because oldest output 'pkg13/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:09:00 AM[0m] Building project '/user/username/projects/myproject/pkg13/tsconfig.json'...

[[90m12:09:02 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg13/tsconfig.json'...

[[90m12:09:03 AM[0m] Project 'pkg14/tsconfig.json' is out of date because oldest output 'pkg14/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:09:04 AM[0m] Building project '/user/username/projects/myproject/pkg14/tsconfig.json'...

[[90m12:09:06 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg14/tsconfig.json'...

[[90m12:09:07 AM[0m] Project 'pkg15/tsconfig.json' is out of date because oldest output 'pkg15/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:09:08 AM[0m] Building project '/user/username/projects/myproject/pkg15/tsconfig.json'...

[[90m12:09:10 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg15/tsconfig.json'...



Program root files: ["/user/username/projects/myproject/pkg11/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg11/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg11/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg12/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg12/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg12/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg13/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg13/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg13/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg14/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg14/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg14/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg15/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg15/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg15/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg8/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg8/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg8/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg8/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg9/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg9/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg9/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg9/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg10/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg10/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg10/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg10/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg11/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg11/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg11/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg11/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg12/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg12/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg12/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg12/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg13/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg13/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg13/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg13/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg14/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg14/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg14/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg14/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg15/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg15/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg15/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg15/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg16/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg16/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg16/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg16/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg17/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg17/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg17/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg17/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg18/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg18/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg18/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg18/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg19/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg19/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg19/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg19/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg20/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg20/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg20/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg20/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg21/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg21/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg21/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg21/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg22/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg22/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg22/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg22/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg8:
  {"directoryName":"/user/username/projects/myproject/pkg8","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg9:
  {"directoryName":"/user/username/projects/myproject/pkg9","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg10:
  {"directoryName":"/user/username/projects/myproject/pkg10","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg11:
  {"directoryName":"/user/username/projects/myproject/pkg11","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg12:
  {"directoryName":"/user/username/projects/myproject/pkg12","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg13:
  {"directoryName":"/user/username/projects/myproject/pkg13","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg14:
  {"directoryName":"/user/username/projects/myproject/pkg14","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg15:
  {"directoryName":"/user/username/projects/myproject/pkg15","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg16:
  {"directoryName":"/user/username/projects/myproject/pkg16","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg17:
  {"directoryName":"/user/username/projects/myproject/pkg17","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg18:
  {"directoryName":"/user/username/projects/myproject/pkg18","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg19:
  {"directoryName":"/user/username/projects/myproject/pkg19","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg20:
  {"directoryName":"/user/username/projects/myproject/pkg20","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg21:
  {"directoryName":"/user/username/projects/myproject/pkg21","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg22:
  {"directoryName":"/user/username/projects/myproject/pkg22","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg11/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg11/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg11/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg12/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg12/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg12/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg13/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg13/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg13/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg14/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg14/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg14/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg15/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg15/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg15/tsconfig.tsbuildinfo] file changed its modified time

Change:: build pkg16,pkg17,pkg18,pkg19,pkg20

Input::

Output::
[[90m12:09:11 AM[0m] Project 'pkg16/tsconfig.json' is out of date because oldest output 'pkg16/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:09:12 AM[0m] Building project '/user/username/projects/myproject/pkg16/tsconfig.json'...

[[90m12:09:14 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg16/tsconfig.json'...

[[90m12:09:15 AM[0m] Project 'pkg17/tsconfig.json' is out of date because oldest output 'pkg17/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:09:16 AM[0m] Building project '/user/username/projects/myproject/pkg17/tsconfig.json'...

[[90m12:09:18 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg17/tsconfig.json'...

[[90m12:09:19 AM[0m] Project 'pkg18/tsconfig.json' is out of date because oldest output 'pkg18/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:09:20 AM[0m] Building project '/user/username/projects/myproject/pkg18/tsconfig.json'...

[[90m12:09:22 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg18/tsconfig.json'...

[[90m12:09:23 AM[0m] Project 'pkg19/tsconfig.json' is out of date because oldest output 'pkg19/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:09:24 AM[0m] Building project '/user/username/projects/myproject/pkg19/tsconfig.json'...

[[90m12:09:26 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg19/tsconfig.json'...

[[90m12:09:27 AM[0m] Project 'pkg20/tsconfig.json' is out of date because oldest output 'pkg20/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:09:28 AM[0m] Building project '/user/username/projects/myproject/pkg20/tsconfig.json'...

[[90m12:09:30 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg20/tsconfig.json'...



Program root files: ["/user/username/projects/myproject/pkg16/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg16/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg16/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg17/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg17/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg17/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg18/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg18/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg18/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg19/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg19/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg19/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg20/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg20/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg20/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg8/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg8/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg8/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg8/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg9/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg9/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg9/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg9/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg10/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg10/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg10/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg10/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg11/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg11/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg11/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg11/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg12/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg12/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg12/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg12/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg13/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg13/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg13/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg13/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg14/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg14/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg14/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg14/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg15/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg15/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg15/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg15/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg16/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg16/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg16/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg16/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg17/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg17/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg17/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg17/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg18/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg18/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg18/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg18/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg19/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg19/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg19/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg19/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg20/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg20/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg20/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg20/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg21/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg21/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg21/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg21/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg22/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg22/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg22/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg22/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg8:
  {"directoryName":"/user/username/projects/myproject/pkg8","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg9:
  {"directoryName":"/user/username/projects/myproject/pkg9","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg10:
  {"directoryName":"/user/username/projects/myproject/pkg10","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg11:
  {"directoryName":"/user/username/projects/myproject/pkg11","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg12:
  {"directoryName":"/user/username/projects/myproject/pkg12","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg13:
  {"directoryName":"/user/username/projects/myproject/pkg13","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg14:
  {"directoryName":"/user/username/projects/myproject/pkg14","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg15:
  {"directoryName":"/user/username/projects/myproject/pkg15","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg16:
  {"directoryName":"/user/username/projects/myproject/pkg16","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg17:
  {"directoryName":"/user/username/projects/myproject/pkg17","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg18:
  {"directoryName":"/user/username/projects/myproject/pkg18","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg19:
  {"directoryName":"/user/username/projects/myproject/pkg19","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg20:
  {"directoryName":"/user/username/projects/myproject/pkg20","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg21:
  {"directoryName":"/user/username/projects/myproject/pkg21","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg22:
  {"directoryName":"/user/username/projects/myproject/pkg22","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg16/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg16/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg16/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg17/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg17/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg17/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg18/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg18/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg18/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg19/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg19/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg19/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg20/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg20/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg20/tsconfig.tsbuildinfo] file changed its modified time

Change:: build pkg21,pkg22,pkg23

Input::

Output::
[[90m12:09:32 AM[0m] Project 'pkg21/tsconfig.json' is out of date because oldest output 'pkg21/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:09:33 AM[0m] Building project '/user/username/projects/myproject/pkg21/tsconfig.json'...

[[90m12:09:35 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg21/tsconfig.json'...

[[90m12:09:36 AM[0m] Project 'pkg22/tsconfig.json' is out of date because oldest output 'pkg22/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:09:37 AM[0m] Building project '/user/username/projects/myproject/pkg22/tsconfig.json'...

[[90m12:09:39 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg22/tsconfig.json'...

[[90m12:09:40 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/pkg21/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg21/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg21/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg22/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg22/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg22/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg8/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg8/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg8/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg8/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg9/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg9/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg9/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg9/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg10/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg10/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg10/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg10/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg11/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg11/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg11/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg11/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg12/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg12/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg12/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg12/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg13/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg13/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg13/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg13/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg14/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg14/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg14/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg14/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg15/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg15/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg15/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg15/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg16/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg16/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg16/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg16/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg17/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg17/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg17/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg17/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg18/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg18/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg18/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg18/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg19/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg19/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg19/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg19/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg20/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg20/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg20/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg20/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg21/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg21/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg21/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg21/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg22/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg22/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg22/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg22/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg8:
  {"directoryName":"/user/username/projects/myproject/pkg8","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg9:
  {"directoryName":"/user/username/projects/myproject/pkg9","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg10:
  {"directoryName":"/user/username/projects/myproject/pkg10","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg11:
  {"directoryName":"/user/username/projects/myproject/pkg11","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg12:
  {"directoryName":"/user/username/projects/myproject/pkg12","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg13:
  {"directoryName":"/user/username/projects/myproject/pkg13","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg14:
  {"directoryName":"/user/username/projects/myproject/pkg14","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg15:
  {"directoryName":"/user/username/projects/myproject/pkg15","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg16:
  {"directoryName":"/user/username/projects/myproject/pkg16","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg17:
  {"directoryName":"/user/username/projects/myproject/pkg17","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg18:
  {"directoryName":"/user/username/projects/myproject/pkg18","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg19:
  {"directoryName":"/user/username/projects/myproject/pkg19","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg20:
  {"directoryName":"/user/username/projects/myproject/pkg20","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg21:
  {"directoryName":"/user/username/projects/myproject/pkg21","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg22:
  {"directoryName":"/user/username/projects/myproject/pkg22","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg21/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg21/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg21/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg22/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg22/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg22/tsconfig.tsbuildinfo] file changed its modified time

Change:: No change

Input::

Output::

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg8/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg8/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg8/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg8/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg9/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg9/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg9/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg9/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg10/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg10/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg10/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg10/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg11/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg11/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg11/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg11/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg12/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg12/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg12/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg12/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg13/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg13/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg13/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg13/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg14/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg14/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg14/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg14/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg15/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg15/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg15/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg15/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg16/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg16/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg16/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg16/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg17/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg17/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg17/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg17/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg18/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg18/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg18/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg18/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg19/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg19/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg19/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg19/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg20/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg20/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg20/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg20/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg21/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg21/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg21/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg21/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg22/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg22/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg22/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg22/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg8:
  {"directoryName":"/user/username/projects/myproject/pkg8","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg9:
  {"directoryName":"/user/username/projects/myproject/pkg9","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg10:
  {"directoryName":"/user/username/projects/myproject/pkg10","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg11:
  {"directoryName":"/user/username/projects/myproject/pkg11","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg12:
  {"directoryName":"/user/username/projects/myproject/pkg12","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg13:
  {"directoryName":"/user/username/projects/myproject/pkg13","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg14:
  {"directoryName":"/user/username/projects/myproject/pkg14","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg15:
  {"directoryName":"/user/username/projects/myproject/pkg15","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg16:
  {"directoryName":"/user/username/projects/myproject/pkg16","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg17:
  {"directoryName":"/user/username/projects/myproject/pkg17","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg18:
  {"directoryName":"/user/username/projects/myproject/pkg18","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg19:
  {"directoryName":"/user/username/projects/myproject/pkg19","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg20:
  {"directoryName":"/user/username/projects/myproject/pkg20","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg21:
  {"directoryName":"/user/username/projects/myproject/pkg21","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg22:
  {"directoryName":"/user/username/projects/myproject/pkg22","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: dts change2

Input::
//// [/user/username/projects/myproject/pkg0/index.ts]
export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;


Output::
>> Screen clear
[[90m12:09:43 AM[0m] File change detected. Starting incremental compilation...

[[90m12:09:44 AM[0m] Project 'pkg0/tsconfig.json' is out of date because oldest output 'pkg0/index.js' is older than newest input 'pkg0/index.ts'

[[90m12:09:45 AM[0m] Building project '/user/username/projects/myproject/pkg0/tsconfig.json'...



Program root files: ["/user/username/projects/myproject/pkg0/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg0/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts (computed .d.ts)

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg8/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg8/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg8/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg8/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg9/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg9/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg9/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg9/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg10/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg10/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg10/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg10/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg11/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg11/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg11/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg11/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg12/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg12/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg12/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg12/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg13/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg13/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg13/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg13/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg14/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg14/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg14/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg14/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg15/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg15/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg15/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg15/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg16/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg16/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg16/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg16/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg17/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg17/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg17/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg17/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg18/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg18/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg18/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg18/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg19/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg19/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg19/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg19/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg20/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg20/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg20/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg20/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg21/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg21/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg21/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg21/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg22/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg22/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg22/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg22/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg8:
  {"directoryName":"/user/username/projects/myproject/pkg8","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg9:
  {"directoryName":"/user/username/projects/myproject/pkg9","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg10:
  {"directoryName":"/user/username/projects/myproject/pkg10","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg11:
  {"directoryName":"/user/username/projects/myproject/pkg11","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg12:
  {"directoryName":"/user/username/projects/myproject/pkg12","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg13:
  {"directoryName":"/user/username/projects/myproject/pkg13","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg14:
  {"directoryName":"/user/username/projects/myproject/pkg14","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg15:
  {"directoryName":"/user/username/projects/myproject/pkg15","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg16:
  {"directoryName":"/user/username/projects/myproject/pkg16","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg17:
  {"directoryName":"/user/username/projects/myproject/pkg17","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg18:
  {"directoryName":"/user/username/projects/myproject/pkg18","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg19:
  {"directoryName":"/user/username/projects/myproject/pkg19","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg20:
  {"directoryName":"/user/username/projects/myproject/pkg20","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg21:
  {"directoryName":"/user/username/projects/myproject/pkg21","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg22:
  {"directoryName":"/user/username/projects/myproject/pkg22","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg0/index.js]
"use strict";
exports.__esModule = true;
exports.someConst3 = exports.someConst = exports.pkg0 = void 0;
exports.pkg0 = 0;
var someConst2 = 10;
exports.someConst = 10;
exports.someConst3 = 10;


//// [/user/username/projects/myproject/pkg0/index.d.ts]
export declare const pkg0 = 0;
export declare const someConst = 10;
export declare const someConst3 = 10;


//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"10857255042-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;","signature":"-13679921373-export declare const pkg0 = 0;\nexport declare const someConst = 10;\nexport declare const someConst3 = 10;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "10857255042-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;",
        "signature": "-13679921373-export declare const pkg0 = 0;\nexport declare const someConst = 10;\nexport declare const someConst3 = 10;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 883
}


Change:: build pkg1,pkg2,pkg3,pkg4,pkg5

Input::

Output::
[[90m12:09:58 AM[0m] Project 'pkg1/tsconfig.json' is out of date because oldest output 'pkg1/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:09:59 AM[0m] Building project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90m12:10:01 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90m12:10:02 AM[0m] Project 'pkg2/tsconfig.json' is out of date because oldest output 'pkg2/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:10:03 AM[0m] Building project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90m12:10:05 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90m12:10:06 AM[0m] Project 'pkg3/tsconfig.json' is out of date because oldest output 'pkg3/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:10:07 AM[0m] Building project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90m12:10:09 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90m12:10:10 AM[0m] Project 'pkg4/tsconfig.json' is out of date because oldest output 'pkg4/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:10:11 AM[0m] Building project '/user/username/projects/myproject/pkg4/tsconfig.json'...

[[90m12:10:13 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg4/tsconfig.json'...

[[90m12:10:14 AM[0m] Project 'pkg5/tsconfig.json' is out of date because oldest output 'pkg5/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:10:15 AM[0m] Building project '/user/username/projects/myproject/pkg5/tsconfig.json'...

[[90m12:10:17 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg5/tsconfig.json'...



Program root files: ["/user/username/projects/myproject/pkg1/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg1/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg2/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg2/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg3/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg3/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg3/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg4/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg4/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg4/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg5/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg5/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg5/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg8/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg8/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg8/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg8/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg9/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg9/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg9/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg9/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg10/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg10/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg10/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg10/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg11/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg11/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg11/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg11/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg12/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg12/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg12/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg12/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg13/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg13/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg13/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg13/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg14/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg14/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg14/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg14/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg15/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg15/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg15/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg15/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg16/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg16/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg16/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg16/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg17/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg17/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg17/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg17/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg18/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg18/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg18/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg18/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg19/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg19/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg19/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg19/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg20/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg20/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg20/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg20/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg21/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg21/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg21/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg21/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg22/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg22/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg22/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg22/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg8:
  {"directoryName":"/user/username/projects/myproject/pkg8","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg9:
  {"directoryName":"/user/username/projects/myproject/pkg9","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg10:
  {"directoryName":"/user/username/projects/myproject/pkg10","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg11:
  {"directoryName":"/user/username/projects/myproject/pkg11","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg12:
  {"directoryName":"/user/username/projects/myproject/pkg12","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg13:
  {"directoryName":"/user/username/projects/myproject/pkg13","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg14:
  {"directoryName":"/user/username/projects/myproject/pkg14","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg15:
  {"directoryName":"/user/username/projects/myproject/pkg15","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg16:
  {"directoryName":"/user/username/projects/myproject/pkg16","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg17:
  {"directoryName":"/user/username/projects/myproject/pkg17","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg18:
  {"directoryName":"/user/username/projects/myproject/pkg18","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg19:
  {"directoryName":"/user/username/projects/myproject/pkg19","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg20:
  {"directoryName":"/user/username/projects/myproject/pkg20","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg21:
  {"directoryName":"/user/username/projects/myproject/pkg21","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg22:
  {"directoryName":"/user/username/projects/myproject/pkg22","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg1/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg1/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg2/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg2/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg3/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg3/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg4/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg4/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg4/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg5/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg5/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg5/tsconfig.tsbuildinfo] file changed its modified time

Change:: build pkg6,pkg7,pkg8,pkg9,pkg10

Input::

Output::
[[90m12:10:18 AM[0m] Project 'pkg6/tsconfig.json' is out of date because oldest output 'pkg6/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:10:19 AM[0m] Building project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90m12:10:21 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90m12:10:22 AM[0m] Project 'pkg7/tsconfig.json' is out of date because oldest output 'pkg7/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:10:23 AM[0m] Building project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90m12:10:25 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90m12:10:26 AM[0m] Project 'pkg8/tsconfig.json' is out of date because oldest output 'pkg8/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:10:27 AM[0m] Building project '/user/username/projects/myproject/pkg8/tsconfig.json'...

[[90m12:10:29 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg8/tsconfig.json'...

[[90m12:10:30 AM[0m] Project 'pkg9/tsconfig.json' is out of date because oldest output 'pkg9/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:10:31 AM[0m] Building project '/user/username/projects/myproject/pkg9/tsconfig.json'...

[[90m12:10:33 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg9/tsconfig.json'...

[[90m12:10:34 AM[0m] Project 'pkg10/tsconfig.json' is out of date because oldest output 'pkg10/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:10:35 AM[0m] Building project '/user/username/projects/myproject/pkg10/tsconfig.json'...

[[90m12:10:37 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg10/tsconfig.json'...



Program root files: ["/user/username/projects/myproject/pkg6/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg6/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg6/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg7/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg7/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg7/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg8/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg8/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg8/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg9/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg9/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg9/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg10/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg10/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg10/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg8/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg8/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg8/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg8/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg9/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg9/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg9/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg9/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg10/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg10/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg10/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg10/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg11/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg11/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg11/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg11/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg12/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg12/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg12/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg12/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg13/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg13/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg13/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg13/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg14/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg14/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg14/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg14/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg15/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg15/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg15/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg15/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg16/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg16/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg16/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg16/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg17/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg17/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg17/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg17/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg18/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg18/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg18/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg18/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg19/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg19/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg19/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg19/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg20/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg20/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg20/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg20/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg21/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg21/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg21/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg21/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg22/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg22/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg22/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg22/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg8:
  {"directoryName":"/user/username/projects/myproject/pkg8","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg9:
  {"directoryName":"/user/username/projects/myproject/pkg9","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg10:
  {"directoryName":"/user/username/projects/myproject/pkg10","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg11:
  {"directoryName":"/user/username/projects/myproject/pkg11","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg12:
  {"directoryName":"/user/username/projects/myproject/pkg12","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg13:
  {"directoryName":"/user/username/projects/myproject/pkg13","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg14:
  {"directoryName":"/user/username/projects/myproject/pkg14","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg15:
  {"directoryName":"/user/username/projects/myproject/pkg15","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg16:
  {"directoryName":"/user/username/projects/myproject/pkg16","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg17:
  {"directoryName":"/user/username/projects/myproject/pkg17","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg18:
  {"directoryName":"/user/username/projects/myproject/pkg18","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg19:
  {"directoryName":"/user/username/projects/myproject/pkg19","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg20:
  {"directoryName":"/user/username/projects/myproject/pkg20","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg21:
  {"directoryName":"/user/username/projects/myproject/pkg21","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg22:
  {"directoryName":"/user/username/projects/myproject/pkg22","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg6/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg6/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg6/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg7/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg7/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg7/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg8/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg8/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg8/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg9/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg9/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg9/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg10/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg10/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg10/tsconfig.tsbuildinfo] file changed its modified time

Change:: change while building

Input::
//// [/user/username/projects/myproject/pkg0/index.ts]
export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;const someConst4 = 10;


Output::
>> Screen clear
[[90m12:10:40 AM[0m] File change detected. Starting incremental compilation...

[[90m12:10:41 AM[0m] Project 'pkg0/tsconfig.json' is out of date because oldest output 'pkg0/index.js' is older than newest input 'pkg0/index.ts'

[[90m12:10:42 AM[0m] Building project '/user/username/projects/myproject/pkg0/tsconfig.json'...

[[90m12:10:55 AM[0m] Project 'pkg1/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:10:57 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90m12:10:58 AM[0m] Project 'pkg2/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:11:00 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90m12:11:01 AM[0m] Project 'pkg3/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:11:03 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90m12:11:04 AM[0m] Project 'pkg4/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:11:06 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg4/tsconfig.json'...

[[90m12:11:07 AM[0m] Project 'pkg5/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:11:09 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg5/tsconfig.json'...

[[90m12:11:10 AM[0m] Project 'pkg6/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:11:12 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90m12:11:13 AM[0m] Project 'pkg7/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:11:15 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90m12:11:16 AM[0m] Project 'pkg8/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:11:18 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg8/tsconfig.json'...

[[90m12:11:19 AM[0m] Project 'pkg9/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:11:21 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg9/tsconfig.json'...

[[90m12:11:22 AM[0m] Project 'pkg10/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:11:24 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg10/tsconfig.json'...



Program root files: ["/user/username/projects/myproject/pkg0/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg0/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts (computed .d.ts)

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg8/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg8/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg8/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg8/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg9/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg9/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg9/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg9/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg10/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg10/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg10/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg10/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg11/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg11/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg11/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg11/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg12/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg12/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg12/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg12/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg13/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg13/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg13/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg13/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg14/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg14/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg14/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg14/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg15/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg15/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg15/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg15/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg16/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg16/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg16/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg16/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg17/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg17/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg17/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg17/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg18/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg18/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg18/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg18/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg19/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg19/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg19/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg19/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg20/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg20/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg20/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg20/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg21/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg21/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg21/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg21/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg22/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg22/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg22/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg22/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg8:
  {"directoryName":"/user/username/projects/myproject/pkg8","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg9:
  {"directoryName":"/user/username/projects/myproject/pkg9","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg10:
  {"directoryName":"/user/username/projects/myproject/pkg10","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg11:
  {"directoryName":"/user/username/projects/myproject/pkg11","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg12:
  {"directoryName":"/user/username/projects/myproject/pkg12","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg13:
  {"directoryName":"/user/username/projects/myproject/pkg13","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg14:
  {"directoryName":"/user/username/projects/myproject/pkg14","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg15:
  {"directoryName":"/user/username/projects/myproject/pkg15","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg16:
  {"directoryName":"/user/username/projects/myproject/pkg16","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg17:
  {"directoryName":"/user/username/projects/myproject/pkg17","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg18:
  {"directoryName":"/user/username/projects/myproject/pkg18","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg19:
  {"directoryName":"/user/username/projects/myproject/pkg19","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg20:
  {"directoryName":"/user/username/projects/myproject/pkg20","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg21:
  {"directoryName":"/user/username/projects/myproject/pkg21","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg22:
  {"directoryName":"/user/username/projects/myproject/pkg22","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg0/index.js]
"use strict";
exports.__esModule = true;
exports.someConst3 = exports.someConst = exports.pkg0 = void 0;
exports.pkg0 = 0;
var someConst2 = 10;
exports.someConst = 10;
exports.someConst3 = 10;
var someConst4 = 10;


//// [/user/username/projects/myproject/pkg0/index.d.ts] file written with same contents
//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"27277091473-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;const someConst4 = 10;","signature":"-13679921373-export declare const pkg0 = 0;\nexport declare const someConst = 10;\nexport declare const someConst3 = 10;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "27277091473-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;const someConst4 = 10;",
        "signature": "-13679921373-export declare const pkg0 = 0;\nexport declare const someConst = 10;\nexport declare const someConst3 = 10;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 905
}

//// [/user/username/projects/myproject/pkg1/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg1/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg2/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg2/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg3/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg3/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg4/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg4/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg4/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg5/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg5/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg5/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg6/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg6/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg6/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg7/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg7/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg7/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg8/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg8/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg8/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg9/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg9/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg9/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg10/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg10/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg10/tsconfig.tsbuildinfo] file changed its modified time

Change:: build pkg11,pkg12,pkg13,pkg14,pkg15

Input::

Output::
[[90m12:11:25 AM[0m] Project 'pkg11/tsconfig.json' is out of date because oldest output 'pkg11/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:11:26 AM[0m] Building project '/user/username/projects/myproject/pkg11/tsconfig.json'...

[[90m12:11:28 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg11/tsconfig.json'...

[[90m12:11:29 AM[0m] Project 'pkg12/tsconfig.json' is out of date because oldest output 'pkg12/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:11:30 AM[0m] Building project '/user/username/projects/myproject/pkg12/tsconfig.json'...

[[90m12:11:32 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg12/tsconfig.json'...

[[90m12:11:33 AM[0m] Project 'pkg13/tsconfig.json' is out of date because oldest output 'pkg13/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:11:34 AM[0m] Building project '/user/username/projects/myproject/pkg13/tsconfig.json'...

[[90m12:11:36 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg13/tsconfig.json'...

[[90m12:11:37 AM[0m] Project 'pkg14/tsconfig.json' is out of date because oldest output 'pkg14/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:11:38 AM[0m] Building project '/user/username/projects/myproject/pkg14/tsconfig.json'...

[[90m12:11:40 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg14/tsconfig.json'...

[[90m12:11:41 AM[0m] Project 'pkg15/tsconfig.json' is out of date because oldest output 'pkg15/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:11:42 AM[0m] Building project '/user/username/projects/myproject/pkg15/tsconfig.json'...

[[90m12:11:44 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg15/tsconfig.json'...



Program root files: ["/user/username/projects/myproject/pkg11/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg11/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg11/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg12/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg12/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg12/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg13/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg13/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg13/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg14/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg14/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg14/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg15/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg15/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg15/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg8/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg8/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg8/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg8/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg9/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg9/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg9/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg9/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg10/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg10/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg10/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg10/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg11/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg11/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg11/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg11/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg12/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg12/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg12/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg12/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg13/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg13/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg13/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg13/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg14/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg14/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg14/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg14/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg15/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg15/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg15/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg15/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg16/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg16/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg16/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg16/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg17/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg17/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg17/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg17/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg18/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg18/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg18/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg18/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg19/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg19/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg19/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg19/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg20/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg20/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg20/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg20/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg21/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg21/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg21/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg21/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg22/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg22/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg22/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg22/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg8:
  {"directoryName":"/user/username/projects/myproject/pkg8","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg9:
  {"directoryName":"/user/username/projects/myproject/pkg9","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg10:
  {"directoryName":"/user/username/projects/myproject/pkg10","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg11:
  {"directoryName":"/user/username/projects/myproject/pkg11","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg12:
  {"directoryName":"/user/username/projects/myproject/pkg12","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg13:
  {"directoryName":"/user/username/projects/myproject/pkg13","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg14:
  {"directoryName":"/user/username/projects/myproject/pkg14","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg15:
  {"directoryName":"/user/username/projects/myproject/pkg15","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg16:
  {"directoryName":"/user/username/projects/myproject/pkg16","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg17:
  {"directoryName":"/user/username/projects/myproject/pkg17","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg18:
  {"directoryName":"/user/username/projects/myproject/pkg18","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg19:
  {"directoryName":"/user/username/projects/myproject/pkg19","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg20:
  {"directoryName":"/user/username/projects/myproject/pkg20","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg21:
  {"directoryName":"/user/username/projects/myproject/pkg21","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg22:
  {"directoryName":"/user/username/projects/myproject/pkg22","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg11/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg11/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg11/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg12/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg12/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg12/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg13/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg13/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg13/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg14/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg14/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg14/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg15/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg15/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg15/tsconfig.tsbuildinfo] file changed its modified time

Change:: change while building: dts changes

Input::
//// [/user/username/projects/myproject/pkg0/index.ts]
export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;const someConst4 = 10;export const someConst5 = 10;


Output::
>> Screen clear
[[90m12:11:48 AM[0m] File change detected. Starting incremental compilation...

[[90m12:11:49 AM[0m] Project 'pkg0/tsconfig.json' is out of date because oldest output 'pkg0/index.js' is older than newest input 'pkg0/index.ts'

[[90m12:11:50 AM[0m] Building project '/user/username/projects/myproject/pkg0/tsconfig.json'...



Program root files: ["/user/username/projects/myproject/pkg0/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg0/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts (computed .d.ts)

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg8/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg8/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg8/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg8/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg9/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg9/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg9/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg9/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg10/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg10/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg10/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg10/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg11/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg11/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg11/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg11/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg12/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg12/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg12/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg12/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg13/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg13/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg13/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg13/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg14/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg14/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg14/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg14/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg15/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg15/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg15/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg15/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg16/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg16/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg16/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg16/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg17/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg17/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg17/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg17/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg18/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg18/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg18/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg18/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg19/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg19/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg19/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg19/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg20/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg20/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg20/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg20/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg21/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg21/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg21/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg21/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg22/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg22/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg22/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg22/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg8:
  {"directoryName":"/user/username/projects/myproject/pkg8","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg9:
  {"directoryName":"/user/username/projects/myproject/pkg9","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg10:
  {"directoryName":"/user/username/projects/myproject/pkg10","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg11:
  {"directoryName":"/user/username/projects/myproject/pkg11","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg12:
  {"directoryName":"/user/username/projects/myproject/pkg12","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg13:
  {"directoryName":"/user/username/projects/myproject/pkg13","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg14:
  {"directoryName":"/user/username/projects/myproject/pkg14","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg15:
  {"directoryName":"/user/username/projects/myproject/pkg15","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg16:
  {"directoryName":"/user/username/projects/myproject/pkg16","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg17:
  {"directoryName":"/user/username/projects/myproject/pkg17","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg18:
  {"directoryName":"/user/username/projects/myproject/pkg18","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg19:
  {"directoryName":"/user/username/projects/myproject/pkg19","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg20:
  {"directoryName":"/user/username/projects/myproject/pkg20","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg21:
  {"directoryName":"/user/username/projects/myproject/pkg21","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg22:
  {"directoryName":"/user/username/projects/myproject/pkg22","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg0/index.js]
"use strict";
exports.__esModule = true;
exports.someConst5 = exports.someConst3 = exports.someConst = exports.pkg0 = void 0;
exports.pkg0 = 0;
var someConst2 = 10;
exports.someConst = 10;
exports.someConst3 = 10;
var someConst4 = 10;
exports.someConst5 = 10;


//// [/user/username/projects/myproject/pkg0/index.d.ts]
export declare const pkg0 = 0;
export declare const someConst = 10;
export declare const someConst3 = 10;
export declare const someConst5 = 10;


//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"14710086947-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;const someConst4 = 10;export const someConst5 = 10;","signature":"4956132399-export declare const pkg0 = 0;\nexport declare const someConst = 10;\nexport declare const someConst3 = 10;\nexport declare const someConst5 = 10;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "14710086947-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;const someConst4 = 10;export const someConst5 = 10;",
        "signature": "4956132399-export declare const pkg0 = 0;\nexport declare const someConst = 10;\nexport declare const someConst3 = 10;\nexport declare const someConst5 = 10;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 971
}


Change:: build pkg1,pkg2,pkg3,pkg4,pkg5

Input::

Output::
[[90m12:12:03 AM[0m] Project 'pkg1/tsconfig.json' is out of date because oldest output 'pkg1/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:12:04 AM[0m] Building project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90m12:12:06 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90m12:12:07 AM[0m] Project 'pkg2/tsconfig.json' is out of date because oldest output 'pkg2/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:12:08 AM[0m] Building project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90m12:12:10 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90m12:12:11 AM[0m] Project 'pkg3/tsconfig.json' is out of date because oldest output 'pkg3/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:12:12 AM[0m] Building project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90m12:12:14 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90m12:12:15 AM[0m] Project 'pkg4/tsconfig.json' is out of date because oldest output 'pkg4/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:12:16 AM[0m] Building project '/user/username/projects/myproject/pkg4/tsconfig.json'...

[[90m12:12:18 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg4/tsconfig.json'...

[[90m12:12:19 AM[0m] Project 'pkg5/tsconfig.json' is out of date because oldest output 'pkg5/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:12:20 AM[0m] Building project '/user/username/projects/myproject/pkg5/tsconfig.json'...

[[90m12:12:22 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg5/tsconfig.json'...



Program root files: ["/user/username/projects/myproject/pkg1/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg1/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg2/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg2/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg3/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg3/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg3/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg4/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg4/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg4/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg5/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg5/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg5/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg8/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg8/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg8/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg8/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg9/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg9/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg9/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg9/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg10/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg10/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg10/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg10/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg11/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg11/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg11/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg11/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg12/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg12/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg12/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg12/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg13/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg13/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg13/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg13/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg14/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg14/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg14/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg14/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg15/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg15/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg15/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg15/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg16/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg16/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg16/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg16/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg17/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg17/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg17/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg17/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg18/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg18/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg18/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg18/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg19/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg19/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg19/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg19/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg20/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg20/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg20/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg20/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg21/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg21/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg21/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg21/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg22/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg22/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg22/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg22/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg8:
  {"directoryName":"/user/username/projects/myproject/pkg8","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg9:
  {"directoryName":"/user/username/projects/myproject/pkg9","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg10:
  {"directoryName":"/user/username/projects/myproject/pkg10","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg11:
  {"directoryName":"/user/username/projects/myproject/pkg11","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg12:
  {"directoryName":"/user/username/projects/myproject/pkg12","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg13:
  {"directoryName":"/user/username/projects/myproject/pkg13","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg14:
  {"directoryName":"/user/username/projects/myproject/pkg14","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg15:
  {"directoryName":"/user/username/projects/myproject/pkg15","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg16:
  {"directoryName":"/user/username/projects/myproject/pkg16","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg17:
  {"directoryName":"/user/username/projects/myproject/pkg17","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg18:
  {"directoryName":"/user/username/projects/myproject/pkg18","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg19:
  {"directoryName":"/user/username/projects/myproject/pkg19","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg20:
  {"directoryName":"/user/username/projects/myproject/pkg20","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg21:
  {"directoryName":"/user/username/projects/myproject/pkg21","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg22:
  {"directoryName":"/user/username/projects/myproject/pkg22","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg1/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg1/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg2/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg2/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg3/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg3/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg4/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg4/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg4/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg5/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg5/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg5/tsconfig.tsbuildinfo] file changed its modified time

Change:: build pkg6,pkg7,pkg8,pkg9,pkg10

Input::

Output::
[[90m12:12:23 AM[0m] Project 'pkg6/tsconfig.json' is out of date because oldest output 'pkg6/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:12:24 AM[0m] Building project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90m12:12:26 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90m12:12:27 AM[0m] Project 'pkg7/tsconfig.json' is out of date because oldest output 'pkg7/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:12:28 AM[0m] Building project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90m12:12:30 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90m12:12:31 AM[0m] Project 'pkg8/tsconfig.json' is out of date because oldest output 'pkg8/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:12:32 AM[0m] Building project '/user/username/projects/myproject/pkg8/tsconfig.json'...

[[90m12:12:34 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg8/tsconfig.json'...

[[90m12:12:35 AM[0m] Project 'pkg9/tsconfig.json' is out of date because oldest output 'pkg9/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:12:36 AM[0m] Building project '/user/username/projects/myproject/pkg9/tsconfig.json'...

[[90m12:12:38 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg9/tsconfig.json'...

[[90m12:12:39 AM[0m] Project 'pkg10/tsconfig.json' is out of date because oldest output 'pkg10/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:12:40 AM[0m] Building project '/user/username/projects/myproject/pkg10/tsconfig.json'...

[[90m12:12:42 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg10/tsconfig.json'...



Program root files: ["/user/username/projects/myproject/pkg6/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg6/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg6/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg7/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg7/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg7/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg8/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg8/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg8/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg9/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg9/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg9/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg10/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg10/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg10/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg8/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg8/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg8/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg8/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg9/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg9/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg9/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg9/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg10/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg10/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg10/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg10/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg11/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg11/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg11/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg11/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg12/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg12/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg12/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg12/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg13/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg13/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg13/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg13/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg14/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg14/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg14/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg14/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg15/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg15/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg15/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg15/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg16/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg16/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg16/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg16/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg17/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg17/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg17/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg17/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg18/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg18/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg18/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg18/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg19/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg19/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg19/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg19/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg20/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg20/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg20/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg20/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg21/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg21/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg21/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg21/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg22/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg22/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg22/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg22/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg8:
  {"directoryName":"/user/username/projects/myproject/pkg8","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg9:
  {"directoryName":"/user/username/projects/myproject/pkg9","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg10:
  {"directoryName":"/user/username/projects/myproject/pkg10","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg11:
  {"directoryName":"/user/username/projects/myproject/pkg11","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg12:
  {"directoryName":"/user/username/projects/myproject/pkg12","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg13:
  {"directoryName":"/user/username/projects/myproject/pkg13","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg14:
  {"directoryName":"/user/username/projects/myproject/pkg14","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg15:
  {"directoryName":"/user/username/projects/myproject/pkg15","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg16:
  {"directoryName":"/user/username/projects/myproject/pkg16","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg17:
  {"directoryName":"/user/username/projects/myproject/pkg17","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg18:
  {"directoryName":"/user/username/projects/myproject/pkg18","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg19:
  {"directoryName":"/user/username/projects/myproject/pkg19","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg20:
  {"directoryName":"/user/username/projects/myproject/pkg20","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg21:
  {"directoryName":"/user/username/projects/myproject/pkg21","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg22:
  {"directoryName":"/user/username/projects/myproject/pkg22","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg6/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg6/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg6/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg7/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg7/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg7/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg8/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg8/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg8/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg9/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg9/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg9/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg10/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg10/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg10/tsconfig.tsbuildinfo] file changed its modified time

Change:: build pkg11,pkg12,pkg13,pkg14,pkg15

Input::

Output::
[[90m12:12:43 AM[0m] Project 'pkg11/tsconfig.json' is out of date because oldest output 'pkg11/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:12:44 AM[0m] Building project '/user/username/projects/myproject/pkg11/tsconfig.json'...

[[90m12:12:46 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg11/tsconfig.json'...

[[90m12:12:47 AM[0m] Project 'pkg12/tsconfig.json' is out of date because oldest output 'pkg12/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:12:48 AM[0m] Building project '/user/username/projects/myproject/pkg12/tsconfig.json'...

[[90m12:12:50 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg12/tsconfig.json'...

[[90m12:12:51 AM[0m] Project 'pkg13/tsconfig.json' is out of date because oldest output 'pkg13/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:12:52 AM[0m] Building project '/user/username/projects/myproject/pkg13/tsconfig.json'...

[[90m12:12:54 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg13/tsconfig.json'...

[[90m12:12:55 AM[0m] Project 'pkg14/tsconfig.json' is out of date because oldest output 'pkg14/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:12:56 AM[0m] Building project '/user/username/projects/myproject/pkg14/tsconfig.json'...

[[90m12:12:58 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg14/tsconfig.json'...

[[90m12:12:59 AM[0m] Project 'pkg15/tsconfig.json' is out of date because oldest output 'pkg15/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:13:00 AM[0m] Building project '/user/username/projects/myproject/pkg15/tsconfig.json'...

[[90m12:13:02 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg15/tsconfig.json'...



Program root files: ["/user/username/projects/myproject/pkg11/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg11/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg11/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg12/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg12/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg12/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg13/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg13/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg13/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg14/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg14/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg14/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg15/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg15/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg15/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg8/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg8/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg8/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg8/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg9/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg9/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg9/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg9/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg10/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg10/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg10/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg10/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg11/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg11/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg11/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg11/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg12/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg12/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg12/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg12/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg13/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg13/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg13/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg13/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg14/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg14/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg14/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg14/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg15/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg15/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg15/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg15/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg16/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg16/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg16/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg16/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg17/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg17/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg17/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg17/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg18/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg18/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg18/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg18/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg19/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg19/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg19/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg19/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg20/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg20/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg20/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg20/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg21/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg21/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg21/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg21/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg22/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg22/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg22/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg22/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg8:
  {"directoryName":"/user/username/projects/myproject/pkg8","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg9:
  {"directoryName":"/user/username/projects/myproject/pkg9","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg10:
  {"directoryName":"/user/username/projects/myproject/pkg10","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg11:
  {"directoryName":"/user/username/projects/myproject/pkg11","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg12:
  {"directoryName":"/user/username/projects/myproject/pkg12","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg13:
  {"directoryName":"/user/username/projects/myproject/pkg13","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg14:
  {"directoryName":"/user/username/projects/myproject/pkg14","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg15:
  {"directoryName":"/user/username/projects/myproject/pkg15","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg16:
  {"directoryName":"/user/username/projects/myproject/pkg16","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg17:
  {"directoryName":"/user/username/projects/myproject/pkg17","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg18:
  {"directoryName":"/user/username/projects/myproject/pkg18","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg19:
  {"directoryName":"/user/username/projects/myproject/pkg19","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg20:
  {"directoryName":"/user/username/projects/myproject/pkg20","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg21:
  {"directoryName":"/user/username/projects/myproject/pkg21","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg22:
  {"directoryName":"/user/username/projects/myproject/pkg22","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg11/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg11/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg11/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg12/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg12/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg12/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg13/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg13/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg13/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg14/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg14/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg14/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg15/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg15/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg15/tsconfig.tsbuildinfo] file changed its modified time

Change:: build pkg16,pkg17,pkg18,pkg19,pkg20

Input::

Output::
[[90m12:13:03 AM[0m] Project 'pkg16/tsconfig.json' is out of date because oldest output 'pkg16/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:13:04 AM[0m] Building project '/user/username/projects/myproject/pkg16/tsconfig.json'...

[[90m12:13:06 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg16/tsconfig.json'...

[[90m12:13:07 AM[0m] Project 'pkg17/tsconfig.json' is out of date because oldest output 'pkg17/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:13:08 AM[0m] Building project '/user/username/projects/myproject/pkg17/tsconfig.json'...

[[90m12:13:10 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg17/tsconfig.json'...

[[90m12:13:11 AM[0m] Project 'pkg18/tsconfig.json' is out of date because oldest output 'pkg18/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:13:12 AM[0m] Building project '/user/username/projects/myproject/pkg18/tsconfig.json'...

[[90m12:13:14 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg18/tsconfig.json'...

[[90m12:13:15 AM[0m] Project 'pkg19/tsconfig.json' is out of date because oldest output 'pkg19/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:13:16 AM[0m] Building project '/user/username/projects/myproject/pkg19/tsconfig.json'...

[[90m12:13:18 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg19/tsconfig.json'...

[[90m12:13:19 AM[0m] Project 'pkg20/tsconfig.json' is out of date because oldest output 'pkg20/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:13:20 AM[0m] Building project '/user/username/projects/myproject/pkg20/tsconfig.json'...

[[90m12:13:22 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg20/tsconfig.json'...



Program root files: ["/user/username/projects/myproject/pkg16/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg16/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg16/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg17/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg17/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg17/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg18/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg18/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg18/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg19/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg19/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg19/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg20/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg20/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg20/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg8/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg8/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg8/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg8/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg9/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg9/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg9/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg9/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg10/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg10/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg10/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg10/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg11/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg11/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg11/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg11/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg12/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg12/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg12/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg12/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg13/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg13/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg13/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg13/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg14/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg14/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg14/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg14/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg15/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg15/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg15/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg15/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg16/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg16/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg16/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg16/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg17/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg17/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg17/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg17/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg18/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg18/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg18/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg18/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg19/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg19/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg19/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg19/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg20/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg20/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg20/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg20/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg21/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg21/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg21/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg21/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg22/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg22/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg22/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg22/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg8:
  {"directoryName":"/user/username/projects/myproject/pkg8","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg9:
  {"directoryName":"/user/username/projects/myproject/pkg9","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg10:
  {"directoryName":"/user/username/projects/myproject/pkg10","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg11:
  {"directoryName":"/user/username/projects/myproject/pkg11","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg12:
  {"directoryName":"/user/username/projects/myproject/pkg12","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg13:
  {"directoryName":"/user/username/projects/myproject/pkg13","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg14:
  {"directoryName":"/user/username/projects/myproject/pkg14","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg15:
  {"directoryName":"/user/username/projects/myproject/pkg15","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg16:
  {"directoryName":"/user/username/projects/myproject/pkg16","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg17:
  {"directoryName":"/user/username/projects/myproject/pkg17","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg18:
  {"directoryName":"/user/username/projects/myproject/pkg18","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg19:
  {"directoryName":"/user/username/projects/myproject/pkg19","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg20:
  {"directoryName":"/user/username/projects/myproject/pkg20","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg21:
  {"directoryName":"/user/username/projects/myproject/pkg21","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg22:
  {"directoryName":"/user/username/projects/myproject/pkg22","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg16/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg16/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg16/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg17/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg17/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg17/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg18/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg18/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg18/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg19/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg19/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg19/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg20/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg20/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg20/tsconfig.tsbuildinfo] file changed its modified time

Change:: build pkg21,pkg22,pkg23

Input::

Output::
[[90m12:13:23 AM[0m] Project 'pkg21/tsconfig.json' is out of date because oldest output 'pkg21/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:13:24 AM[0m] Building project '/user/username/projects/myproject/pkg21/tsconfig.json'...

[[90m12:13:26 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg21/tsconfig.json'...

[[90m12:13:27 AM[0m] Project 'pkg22/tsconfig.json' is out of date because oldest output 'pkg22/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:13:28 AM[0m] Building project '/user/username/projects/myproject/pkg22/tsconfig.json'...

[[90m12:13:30 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg22/tsconfig.json'...

[[90m12:13:31 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/pkg21/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg21/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg21/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg22/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg22/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg22/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg8/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg8/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg8/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg8/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg9/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg9/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg9/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg9/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg10/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg10/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg10/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg10/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg11/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg11/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg11/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg11/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg12/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg12/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg12/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg12/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg13/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg13/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg13/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg13/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg14/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg14/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg14/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg14/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg15/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg15/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg15/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg15/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg16/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg16/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg16/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg16/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg17/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg17/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg17/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg17/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg18/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg18/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg18/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg18/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg19/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg19/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg19/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg19/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg20/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg20/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg20/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg20/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg21/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg21/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg21/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg21/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg22/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg22/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg22/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg22/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg8:
  {"directoryName":"/user/username/projects/myproject/pkg8","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg9:
  {"directoryName":"/user/username/projects/myproject/pkg9","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg10:
  {"directoryName":"/user/username/projects/myproject/pkg10","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg11:
  {"directoryName":"/user/username/projects/myproject/pkg11","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg12:
  {"directoryName":"/user/username/projects/myproject/pkg12","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg13:
  {"directoryName":"/user/username/projects/myproject/pkg13","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg14:
  {"directoryName":"/user/username/projects/myproject/pkg14","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg15:
  {"directoryName":"/user/username/projects/myproject/pkg15","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg16:
  {"directoryName":"/user/username/projects/myproject/pkg16","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg17:
  {"directoryName":"/user/username/projects/myproject/pkg17","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg18:
  {"directoryName":"/user/username/projects/myproject/pkg18","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg19:
  {"directoryName":"/user/username/projects/myproject/pkg19","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg20:
  {"directoryName":"/user/username/projects/myproject/pkg20","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg21:
  {"directoryName":"/user/username/projects/myproject/pkg21","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg22:
  {"directoryName":"/user/username/projects/myproject/pkg22","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg21/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg21/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg21/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg22/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg22/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg22/tsconfig.tsbuildinfo] file changed its modified time

Change:: No change

Input::

Output::

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg8/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg8/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg8/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg8/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg9/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg9/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg9/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg9/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg10/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg10/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg10/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg10/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg11/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg11/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg11/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg11/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg12/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg12/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg12/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg12/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg13/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg13/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg13/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg13/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg14/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg14/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg14/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg14/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg15/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg15/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg15/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg15/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg16/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg16/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg16/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg16/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg17/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg17/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg17/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg17/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg18/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg18/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg18/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg18/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg19/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg19/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg19/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg19/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg20/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg20/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg20/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg20/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg21/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg21/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg21/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg21/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg22/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg22/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg22/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg22/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg8:
  {"directoryName":"/user/username/projects/myproject/pkg8","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg9:
  {"directoryName":"/user/username/projects/myproject/pkg9","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg10:
  {"directoryName":"/user/username/projects/myproject/pkg10","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg11:
  {"directoryName":"/user/username/projects/myproject/pkg11","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg12:
  {"directoryName":"/user/username/projects/myproject/pkg12","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg13:
  {"directoryName":"/user/username/projects/myproject/pkg13","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg14:
  {"directoryName":"/user/username/projects/myproject/pkg14","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg15:
  {"directoryName":"/user/username/projects/myproject/pkg15","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg16:
  {"directoryName":"/user/username/projects/myproject/pkg16","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg17:
  {"directoryName":"/user/username/projects/myproject/pkg17","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg18:
  {"directoryName":"/user/username/projects/myproject/pkg18","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg19:
  {"directoryName":"/user/username/projects/myproject/pkg19","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg20:
  {"directoryName":"/user/username/projects/myproject/pkg20","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg21:
  {"directoryName":"/user/username/projects/myproject/pkg21","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg22:
  {"directoryName":"/user/username/projects/myproject/pkg22","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

