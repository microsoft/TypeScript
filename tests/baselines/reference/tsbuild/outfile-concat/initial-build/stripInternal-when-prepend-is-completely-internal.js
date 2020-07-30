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

//// [/src/first/first_PART1.ts]
/* @internal */ const A = 1;

//// [/src/first/first_part2.ts]


//// [/src/first/first_part3.ts]


//// [/src/first/tsconfig.json]
{"compilerOptions":{"composite":true,"declaration":true,"declarationMap":true,"skipDefaultLibCheck":true,"sourceMap":true,"outFile":"./bin/first-output.js"},"files":["/src/first/first_PART1.ts"]}

//// [/src/second/second_part1.ts]


//// [/src/second/second_part2.ts]


//// [/src/second/tsconfig.json]


//// [/src/third/third_part1.ts]
const B = 2;

//// [/src/third/tsconfig.json]
{"compilerOptions":{"composite":true,"declaration":true,"declarationMap":false,"stripInternal":true,"sourceMap":true,"outFile":"./thirdjs/output/third-output.js"},"references":[{"path":"../first","prepend":true}],"files":["/src/third/third_part1.ts"]}



Output::
/lib/tsc --b /src/third --verbose
[[90m12:00:00 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/third/tsconfig.json

[[90m12:00:00 AM[0m] Project 'src/first/tsconfig.json' is out of date because output file 'src/first/bin/first-output.js' does not exist

[[90m12:00:00 AM[0m] Building project '/src/first/tsconfig.json'...

[96msrc/first/tsconfig.json[0m:[93m1[0m:[93m123[0m - [91merror[0m[90m TS1390: [0mThe `bundledPackageName` option must be provided when using outFile and node module resolution with declaration emit.

[7m1[0m {"compilerOptions":{"composite":true,"declaration":true,"declarationMap":true,"skipDefaultLibCheck":true,"sourceMap":true,"outFile":"./bin/first-output.js"},"files":["/src/first/first_PART1.ts"]}
[7m [0m [91m                                                                                                                          ~~~~~~~~~[0m

[[90m12:00:00 AM[0m] Project 'src/third/tsconfig.json' can't be built because its dependency 'src/first' has errors

[[90m12:00:00 AM[0m] Skipping build of project '/src/third/tsconfig.json' because its dependency '/src/first' has errors


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


