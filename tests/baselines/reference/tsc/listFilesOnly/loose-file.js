currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/src/test.ts]
export const x = 1;

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


/home/src/tslibs/ts/lib/tsc.js /src/test.ts --listFilesOnly
Output::
/home/src/tslibs/ts/lib/lib.d.ts
/src/test.ts



exitCode:: ExitStatus.Success
