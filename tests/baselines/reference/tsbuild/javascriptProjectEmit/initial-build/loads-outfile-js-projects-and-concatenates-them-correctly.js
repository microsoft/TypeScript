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
interface SymbolConstructor {
    readonly species: symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}


//// [/src/common/nominal.js]
/**
 * @template T, Name
 * @typedef {T & {[Symbol.species]: Name}} Nominal
 */


//// [/src/common/tsconfig.json]
{
    "extends": "../tsconfig.base.json",
    "compilerOptions": {
        "composite": true,
        "outFile": "common.js"
    },
    "include": ["nominal.js"]
}

//// [/src/sub-project/index.js]


//// [/src/sub-project/tsconfig.json]
{
    "extends": "../tsconfig.base.json",
    "compilerOptions": {
        "composite": true,
        "outFile": "sub-project.js"
    },
    "references": [
        { "path": "../common", "prepend": true }
    ],
    "include": ["./index.js"]
}

//// [/src/sub-project-2/index.js]


//// [/src/sub-project-2/tsconfig.json]
{
    "extends": "../tsconfig.base.json",
    "compilerOptions": {
        "composite": true,
        "outFile": "sub-project-2.js"
    },
    "references": [
        { "path": "../sub-project", "prepend": true }
    ],
    "include": ["./index.js"]
}

//// [/src/tsconfig.base.json]
{
    "compilerOptions": {
        "skipLibCheck": true,
        "rootDir": "./",
        "allowJs": true,
        "checkJs": true,
        "declaration": true
    }
}

//// [/src/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
        "outFile": "src.js"
    },
    "references": [
        { "path": "./sub-project", "prepend": true },
        { "path": "./sub-project-2", "prepend": true }
    ],
    "include": []
}



Output::
/lib/tsc -b /src
[96msrc/common/tsconfig.json[0m:[93m5[0m:[93m9[0m - [91merror[0m[90m TS1390: [0mThe `bundledPackageName` option must be provided when using outFile and node module resolution with declaration emit.

[7m5[0m         "outFile": "common.js"
[7m [0m [91m        ~~~~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


