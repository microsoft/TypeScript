currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/app/src/index.ts]

                    import local from "./local"; // Error
                    import esm from "esm-package"; // Error
                    import referencedSource from "../../lib/src/a"; // Error
                    import referencedDeclaration from "../../lib/dist/a"; // Error
                    import ambiguous from "ambiguous-package"; // Ok

//// [/app/src/local.ts]
export const local = 0;

//// [/app/tsconfig.json]
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler",
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": [
    "src"
  ],
  "references": [
    {
      "path": "../lib"
    }
  ]
}

//// [/lib/dist/a.d.ts]
export declare const a = 0;

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

//// [/lib/src/a.ts]
export const a = 0;

//// [/lib/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "rootDir": "src",
    "outDir": "dist",
    "module": "esnext",
    "moduleResolution": "bundler"
  },
  "include": [
    "src"
  ]
}

//// [/node_modules/ambiguous-package/index.d.ts]
export declare const ambiguous: number;

//// [/node_modules/ambiguous-package/package.json]
{ "name": "ambiguous-package" }

//// [/node_modules/esm-package/index.d.ts]
export declare const esm: number;

//// [/node_modules/esm-package/package.json]
{ "name": "esm-package", "type": "module" }



Output::
/lib/tsc --p app --pretty false
app/src/index.ts(2,28): error TS2613: Module '"/app/src/local"' has no default export. Did you mean to use 'import { local } from "/app/src/local"' instead?
app/src/index.ts(3,28): error TS2613: Module '"/node_modules/esm-package/index"' has no default export. Did you mean to use 'import { esm } from "/node_modules/esm-package/index"' instead?
exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/app/dist/index.js]
export {};


//// [/app/dist/local.js]
export var local = 0;


