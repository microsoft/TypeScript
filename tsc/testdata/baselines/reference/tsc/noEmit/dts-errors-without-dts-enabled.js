currentDirectory::/home/src/projects/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/projects/project/a.ts] *new* 
const a = class { private p = 10; };
//// [/home/src/projects/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "incremental": false,
        "declaration": false
    }
}

tsgo --noEmit
ExitStatus:: Success
Output::
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
ExitStatus:: Success
Output::



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
const a = class { private p = 10; };

tsgo --noEmit
ExitStatus:: Success
Output::



Edit [6]:: Emit when error

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/projects/project/a.js] *modified* 
const a = class {
    p = 10;
};




Edit [7]:: no change

tsgo --noEmit
ExitStatus:: Success
Output::

