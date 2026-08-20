currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
                    "files": ["./src/doesNotExist.ts"]
                    }

tsgo -p ./tsconfig.json
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[91merror[0m[90m TS6053: [0mFile '/home/src/workspaces/project/src/doesNotExist.ts' not found.
  The file is in the program because:
    Part of 'files' list in tsconfig.json
  [96mtsconfig.json[0m:[93m2[0m:[93m31[0m - File is matched by 'files' list specified here.
    [7m2[0m                     "files": ["./src/doesNotExist.ts"]
    [7m [0m [96m                              ~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error.

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

