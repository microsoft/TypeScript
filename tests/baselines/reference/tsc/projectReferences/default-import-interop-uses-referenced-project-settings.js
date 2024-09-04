currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/node_modules/ambiguous-package/package.json]
{
  "name": "ambiguous-package"
}

//// [/home/src/workspaces/project/node_modules/ambiguous-package/index.d.ts]
export declare const ambiguous: number;

//// [/home/src/workspaces/project/node_modules/esm-package/package.json]
{
  "name": "esm-package",
  "type": "module"
}

//// [/home/src/workspaces/project/node_modules/esm-package/index.d.ts]
export declare const esm: number;

//// [/home/src/workspaces/project/lib/tsconfig.json]
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

//// [/home/src/workspaces/project/lib/src/a.ts]
export const a = 0;

//// [/home/src/workspaces/project/lib/dist/a.d.ts]
export declare const a = 0;

//// [/home/src/workspaces/project/app/tsconfig.json]
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

//// [/home/src/workspaces/project/app/src/local.ts]
export const local = 0;

//// [/home/src/workspaces/project/app/src/index.ts]

                    import local from "./local"; // Error
                    import esm from "esm-package"; // Error
                    import referencedSource from "../../lib/src/a"; // Error
                    import referencedDeclaration from "../../lib/dist/a"; // Error
                    import ambiguous from "ambiguous-package"; // Ok

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


/home/src/tslibs/TS/Lib/tsc.js --p app --pretty false
Output::
app/src/index.ts(2,28): error TS2613: Module '"/home/src/workspaces/project/app/src/local"' has no default export. Did you mean to use 'import { local } from "/home/src/workspaces/project/app/src/local"' instead?
app/src/index.ts(3,28): error TS2613: Module '"/home/src/workspaces/project/node_modules/esm-package/index"' has no default export. Did you mean to use 'import { esm } from "/home/src/workspaces/project/node_modules/esm-package/index"' instead?


//// [/home/src/workspaces/project/app/dist/local.js]
export var local = 0;


//// [/home/src/workspaces/project/app/dist/index.js]
export {};



exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
