currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/src/a.ts]
export const a = 10;

//// [/home/src/workspaces/project/src/b.ts]
export const b = 10;

//// [/home/src/workspaces/project/c.ts]
export const c = 10;

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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


/home/src/tslibs/TS/Lib/tsc.js -p . --ignoreConfig
Output::
error TS5057: Cannot find a tsconfig.json file at the specified directory: '.'.



exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
