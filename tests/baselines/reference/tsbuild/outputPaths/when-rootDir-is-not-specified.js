currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/src/index.ts]
export const x = 10;

//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "dist"
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


/home/src/tslibs/TS/Lib/tsc.js --b -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'dist/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5011: [0mThe common source directory of 'tsconfig.json' is './src'. The 'rootDir' setting must be explicitly set to this or another path to adjust your output's file layout.
  Visit https://aka.ms/ts6 for migration information.

[7m3[0m     "outDir": "dist"
[7m [0m [91m    ~~~~~~~~[0m


Found 1 error.



//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*

//// [/home/src/workspaces/project/dist/src/index.js]
export const x = 10;


//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo]
{"root":["../src/index.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "../src/index.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 68
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --b -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'dist/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5011: [0mThe common source directory of 'tsconfig.json' is './src'. The 'rootDir' setting must be explicitly set to this or another path to adjust your output's file layout.
  Visit https://aka.ms/ts6 for migration information.

[7m3[0m     "outDir": "dist"
[7m [0m [91m    ~~~~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/project/dist/src/index.js] file written with same contents
//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: Normal build without change, that does not block emit on error to show files that get emitted

Input::

/home/src/tslibs/TS/Lib/tsc.js -p /home/src/workspaces/project/tsconfig.json
Output::
[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5011: [0mThe common source directory of 'tsconfig.json' is './src'. The 'rootDir' setting must be explicitly set to this or another path to adjust your output's file layout.
  Visit https://aka.ms/ts6 for migration information.

[7m3[0m     "outDir": "dist"
[7m [0m [91m    ~~~~~~~~[0m


Found 1 error in tsconfig.json[90m:3[0m



//// [/home/src/workspaces/project/dist/src/index.js] file written with same contents

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
