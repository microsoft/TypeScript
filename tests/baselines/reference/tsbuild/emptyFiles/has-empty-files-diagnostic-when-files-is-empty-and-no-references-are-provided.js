currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/src/no-references/tsconfig.json]
{
  "references": [],
  "files": [],
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "forceConsistentCasingInFileNames": true,
    "skipDefaultLibCheck": true
  }
}

//// [/home/src/tslibs/ts/lib/lib.d.ts]
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


/home/src/tslibs/ts/lib/tsc.js --b /src/no-references
Output::
[96msrc/no-references/tsconfig.json[0m:[93m3[0m:[93m12[0m - [91merror[0m[90m TS18002: [0mThe 'files' list in config file '/src/no-references/tsconfig.json' is empty.

[7m3[0m   "files": [],
[7m [0m [91m           ~~[0m


Found 1 error.




exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
