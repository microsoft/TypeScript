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

//// [/src/test.ts]
export const x = 1;



Output::
/lib/tsc /src/test.ts --watch --listFilesOnly
error TS6370: Options 'watch' and 'listFilesOnly' cannot be combined.
exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


