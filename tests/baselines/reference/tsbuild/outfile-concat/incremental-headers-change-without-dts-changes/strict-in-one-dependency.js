Input::
//// [/src/first/first_PART1.ts]
"myPrologue"
interface TheFirst {
    none: any;
}

const s = "Hello, world";

interface NoJsForHereEither {
    none: any;
}

console.log(s);




Output::
/lib/tsc --b /src/third --verbose
[[90m12:08:00 AM[0m] Projects in this build: 
    * src/first/tsconfig.json
    * src/second/tsconfig.json
    * src/third/tsconfig.json

[[90m12:08:00 AM[0m] Project 'src/first/tsconfig.json' is out of date because output file 'src/first/bin/first-output.js' does not exist

[[90m12:08:00 AM[0m] Building project '/src/first/tsconfig.json'...

[96msrc/first/tsconfig.json[0m:[93m9[0m:[93m5[0m - [91merror[0m[90m TS1390: [0mThe `bundledPackageName` option must be provided when using outFile and node module resolution with declaration emit.

[7m9[0m     "outFile": "./bin/first-output.js",
[7m [0m [91m    ~~~~~~~~~[0m

[[90m12:08:00 AM[0m] Project 'src/second/tsconfig.json' is out of date because output file 'src/2/second-output.js' does not exist

[[90m12:08:00 AM[0m] Building project '/src/second/tsconfig.json'...

[96msrc/second/tsconfig.json[0m:[93m10[0m:[93m5[0m - [91merror[0m[90m TS1390: [0mThe `bundledPackageName` option must be provided when using outFile and node module resolution with declaration emit.

[7m10[0m     "outFile": "../2/second-output.js",
[7m  [0m [91m    ~~~~~~~~~[0m

[[90m12:08:00 AM[0m] Project 'src/third/tsconfig.json' can't be built because its dependency 'src/first' has errors

[[90m12:08:00 AM[0m] Skipping build of project '/src/third/tsconfig.json' because its dependency '/src/first' has errors


Found 2 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


