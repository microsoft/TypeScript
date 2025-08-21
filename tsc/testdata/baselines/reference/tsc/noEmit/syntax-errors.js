currentDirectory::/home/src/projects/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/projects/project/a.ts] *new* 
const a = "hello
//// [/home/src/projects/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "incremental": false,
        "declaration": false
    }
}

tsgo --noEmit
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[96ma.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m const a = "hello
[7m [0m [91m                ~[0m


Found 1 error in a.ts[90m:1[0m

//// [/home/src/tslibs/TS/Lib/lib.d.ts] *Lib*
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



Edit [0]:: no change

tsgo --noEmit
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[96ma.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m const a = "hello
[7m [0m [91m                ~[0m


Found 1 error in a.ts[90m:1[0m




Edit [1]:: Fix error
//// [/home/src/projects/project/a.ts] *modified* 
const a = "hello";

tsgo --noEmit
ExitStatus:: Success
Output::



Edit [2]:: no change

tsgo --noEmit
ExitStatus:: Success
Output::



Edit [3]:: Emit after fixing error

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/projects/project/a.js] *new* 
const a = "hello";




Edit [4]:: no change

tsgo --noEmit
ExitStatus:: Success
Output::



Edit [5]:: Introduce error
//// [/home/src/projects/project/a.ts] *modified* 
const a = "hello

tsgo --noEmit
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[96ma.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m const a = "hello
[7m [0m [91m                ~[0m


Found 1 error in a.ts[90m:1[0m




Edit [6]:: Emit when error

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96ma.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m const a = "hello
[7m [0m [91m                ~[0m


Found 1 error in a.ts[90m:1[0m

//// [/home/src/projects/project/a.js] *modified* 
const a = "hello;




Edit [7]:: no change

tsgo --noEmit
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[96ma.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m const a = "hello
[7m [0m [91m                ~[0m


Found 1 error in a.ts[90m:1[0m


