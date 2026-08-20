currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/src/index.ts] *new* 
export const x = 10;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "outDir": "dist",
    },
}

tsgo -b -v
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'dist/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96mtsconfig.json[0m:[93m3[0m:[93m9[0m - [91merror[0m[90m TS5011: [0mThe common source directory of 'tsconfig.json' is './src'. The 'rootDir' setting must be explicitly set to this or another path to adjust your output's file layout.
  Visit https://aka.ms/ts6 for migration information.

[7m3[0m         "outDir": "dist",
[7m [0m [91m        ~~~~~~~~[0m


Found 1 error in tsconfig.json[90m:3[0m

//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*
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
interface SymbolConstructor {
    (desc?: string | number): symbol;
    for(name: string): symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
declare const console: { log(msg: any): void; };
//// [/home/src/workspaces/project/dist/src/index.js] *new* 
export const x = 10;

//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","errors":true,"root":["../src/index.ts"]}
//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "root": [
    {
      "files": [
        "../src/index.ts"
      ],
      "original": "../src/index.ts"
    }
  ],
  "size": 68
}

tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*not cached* /home/src/workspaces/project/src/index.ts
Signatures::


Edit [0]:: no change

tsgo -b -v
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'dist/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96mtsconfig.json[0m:[93m3[0m:[93m9[0m - [91merror[0m[90m TS5011: [0mThe common source directory of 'tsconfig.json' is './src'. The 'rootDir' setting must be explicitly set to this or another path to adjust your output's file layout.
  Visit https://aka.ms/ts6 for migration information.

[7m3[0m         "outDir": "dist",
[7m [0m [91m        ~~~~~~~~[0m


Found 1 error in tsconfig.json[90m:3[0m

//// [/home/src/workspaces/project/dist/src/index.js] *rewrite with same content*
//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*not cached* /home/src/workspaces/project/src/index.ts
Signatures::


Edit [1]:: Normal build without change, that does not block emit on error to show files that get emitted

tsgo -p /home/src/workspaces/project/tsconfig.json
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mtsconfig.json[0m:[93m3[0m:[93m9[0m - [91merror[0m[90m TS5011: [0mThe common source directory of 'tsconfig.json' is './src'. The 'rootDir' setting must be explicitly set to this or another path to adjust your output's file layout.
  Visit https://aka.ms/ts6 for migration information.

[7m3[0m         "outDir": "dist",
[7m [0m [91m        ~~~~~~~~[0m


Found 1 error in tsconfig.json[90m:3[0m

//// [/home/src/workspaces/project/dist/src/index.js] *rewrite with same content*

