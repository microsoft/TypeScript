currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/sub/a.d.ts] *new* 
declare const x: number;
//// [/home/src/workspaces/project/sub/tsconfig.json] *new* 
{ "compilerOptions": { "outDir": "../out" } }

tsc -p sub
ExitStatus:: Success
Output::
//// [/home/src/tslibs/TS/Lib/lib.es2026.full.d.ts] *Lib*
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



Edit [0]:: build with -b

tsc -b sub
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/out/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":["../sub/a.d.ts"]}
//// [/home/src/workspaces/project/out/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../sub/a.d.ts"
      ],
      "original": "../sub/a.d.ts"
    }
  ],
  "size": 52
}

sub/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/sub/a.d.ts
Signatures::
