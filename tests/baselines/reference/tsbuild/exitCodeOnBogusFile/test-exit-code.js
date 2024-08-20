currentDirectory:: / useCaseSensitiveFileNames: false
Input::
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



/home/src/tslibs/ts/lib/tsc.js -b bogus.json
Output::
[91merror[0m[90m TS5083: [0mCannot read file '/bogus.json'.


Found 1 error.




exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
