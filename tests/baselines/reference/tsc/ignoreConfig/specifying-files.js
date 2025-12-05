currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/src/a.ts]
export const a = 10;

//// [/home/src/workspaces/project/src/b.ts]
export const b = 10;

//// [/home/src/workspaces/project/c.ts]
export const c = 10;

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

//// [/home/src/workspaces/project/tsconfig.json]
{
  "include": [
    "src"
  ]
}


/home/src/tslibs/TS/Lib/tsc.js src/a.ts
Output::
error TS5112: tsconfig.json is present but will not be loaded if files are specified on commandline. Use '--ignoreConfig' to skip this error.



exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
