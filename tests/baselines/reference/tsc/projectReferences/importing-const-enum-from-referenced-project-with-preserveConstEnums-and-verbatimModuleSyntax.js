currentDirectory:: /home/src/workspaces/solution useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/solution/preserve/index.ts]
export const enum E { A = 1 }

//// [/home/src/workspaces/solution/preserve/index.d.ts]
export declare const enum E { A = 1 }

//// [/home/src/workspaces/solution/preserve/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "preserveConstEnums": true
  }
}

//// [/home/src/workspaces/solution/no-preserve/index.ts]
export const enum E { A = 1 }

//// [/home/src/workspaces/solution/no-preserve/index.d.ts]
export declare const enum F { A = 1 }

//// [/home/src/workspaces/solution/no-preserve/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "preserveConstEnums": false
  }
}

//// [/home/src/workspaces/solution/project/index.ts]
import { E } from "../preserve";
import { F } from "../no-preserve";
E.A; F.A;

//// [/home/src/workspaces/solution/project/tsconfig.json]
{
  "compilerOptions": {
    "module": "preserve",
    "verbatimModuleSyntax": true
  },
  "references": [
    {
      "path": "../preserve"
    },
    {
      "path": "../no-preserve"
    }
  ]
}

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


/home/src/tslibs/TS/Lib/tsc.js --p project --pretty false
Output::
project/index.ts(2,10): error TS2748: Cannot access ambient const enums when 'verbatimModuleSyntax' is enabled.


//// [/home/src/workspaces/solution/project/index.js]
import { E } from "../preserve";
import { F } from "../no-preserve";
E.A;
F.A;



exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
