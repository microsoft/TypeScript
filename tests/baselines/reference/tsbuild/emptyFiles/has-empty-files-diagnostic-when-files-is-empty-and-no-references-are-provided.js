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

//// [/src/core/index.ts]
export function multiply(a: number, b: number) { return a * b; }


//// [/src/core/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "declarationMap": true,
        "skipDefaultLibCheck": true
    }
}


//// [/src/no-references/tsconfig.json]
{
    "references": [],
    "files": [],
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "forceConsistentCasingInFileNames": true,
        "skipDefaultLibCheck": true
    }
}


//// [/src/with-references/tsconfig.json]
{
    "references": [
        { "path": "../core" },
    ],
    "files": [],
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "forceConsistentCasingInFileNames": true,
        "skipDefaultLibCheck": true
    }
}




Output::
/lib/tsc --b /src/no-references
[96msrc/no-references/tsconfig.json[0m:[93m3[0m:[93m14[0m - [91merror[0m[90m TS18002: [0mThe 'files' list in config file '/src/no-references/tsconfig.json' is empty.

[7m3[0m     "files": [],
[7m [0m [91m             ~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


