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

//// [/src/a.ts]
export function foo() { }

//// [/src/b.ts]
export function bar() { }

//// [/src/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
    },
    "files": [
        "a.ts"
        "b.ts"
    ]
}



Output::
/lib/tsc --b /src/tsconfig.json
● [96msrc/tsconfig.json[0m:[93m7[0m:[93m9[0m TS1005
|         "b.ts"
  [91m        ▔▔▔▔▔▔[0m
',' expected.


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


