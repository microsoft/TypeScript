currentDirectory:: / useCaseSensitiveFileNames: false
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

//// [/src/no-preserve/index.d.ts]
export declare const enum F { A = 1 }

//// [/src/no-preserve/index.ts]
export const enum E { A = 1 }

//// [/src/no-preserve/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "preserveConstEnums": false
  }
}

//// [/src/preserve/index.d.ts]
export declare const enum E { A = 1 }

//// [/src/preserve/index.ts]
export const enum E { A = 1 }

//// [/src/preserve/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "preserveConstEnums": true
  }
}

//// [/src/project/index.ts]
import { E } from "../preserve";
import { F } from "../no-preserve";
E.A; F.A;

//// [/src/project/tsconfig.json]
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



Output::
/lib/tsc --p src/project --pretty false
src/project/index.ts(2,10): error TS2748: Cannot access ambient const enums when 'verbatimModuleSyntax' is enabled.
exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/project/index.js]
import { E } from "../preserve";
import { F } from "../no-preserve";
E.A;
F.A;


