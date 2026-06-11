currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/index.ts] *new* 
import tsconfig from "./tsconfig.json" with { type: "json" };
declare global {
    interface ImportAttributes {
        type: "json";
    }
}
console.log(tsconfig);
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "module": "preserve",
        "moduleResolution": "bundler",
        "noEmit": true,
        "resolveJsonModule": true,
        "strict": true,
        "target": "esnext"
    },
    "include": ["index.ts", "tsconfig.json"]
}

tsgo --build
ExitStatus:: Success
Output::
//// [/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts] *Lib*
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
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":["./index.ts","./tsconfig.json"]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": "./index.ts"
    },
    {
      "files": [
        "./tsconfig.json"
      ],
      "original": "./tsconfig.json"
    }
  ],
  "size": 67
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
*refresh*    /home/src/workspaces/project/tsconfig.json
*refresh*    /home/src/workspaces/project/index.ts
Signatures::
