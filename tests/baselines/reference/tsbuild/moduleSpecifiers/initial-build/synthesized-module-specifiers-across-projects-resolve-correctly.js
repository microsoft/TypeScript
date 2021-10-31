Input::
//// [/lib/lib.d.ts]


//// [/lib/lib.es2020.full.d.ts]
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

//// [/src/src-dogs/dog.ts]


//// [/src/src-dogs/dogconfig.ts]


//// [/src/src-dogs/index.ts]


//// [/src/src-dogs/lassie/lassieconfig.ts]


//// [/src/src-dogs/lassie/lassiedog.ts]


//// [/src/src-dogs/node_modules] symlink(/src)
//// [/src/src-dogs/package.json]


//// [/src/src-dogs/tsconfig.json]
{
    "extends": "../tsconfig-base.json",
    "compilerOptions": {
        "composite": true
    },
    "references": [
        { "path": "../src-types" }
    ],
    "include": [
        "**/*"
    ]
}

//// [/src/src-types/dogconfig.ts]
export interface DogConfig {
    name: string;
}

//// [/src/src-types/index.ts]
export * from './dogconfig.js';

//// [/src/src-types/node_modules] symlink(/src)
//// [/src/src-types/package.json]
{
    "type": "module",
    "exports": "./index.js"
}

//// [/src/src-types/tsconfig.json]
{
    "extends": "../tsconfig-base.json",
    "compilerOptions": {
        "composite": true
    },
    "include": [
        "**/*"
    ]
}

//// [/src/tsconfig-base.json]
{
    "compilerOptions": {
        "declaration": true,
        "module": "node12"
    }
}



Output::
/lib/tsc -b src/src-types src/src-dogs --verbose
[[90m12:00:00 AM[0m] Projects in this build: 
    * src/src-types/tsconfig.json
    * src/src-dogs/tsconfig.json

[[90m12:00:00 AM[0m] Project 'src/src-types/tsconfig.json' is out of date because output file 'src/src-types/dogconfig.js' does not exist

[[90m12:00:00 AM[0m] Building project '/src/src-types/tsconfig.json'...

[91merror[0m[90m TS4124: [0mCompiler option 'module' of value 'node12' is unstable. Use nightly TypeScript to silence this error. Try updating with 'npm install -D typescript@next'.

[[90m12:00:00 AM[0m] Project 'src/src-dogs/tsconfig.json' can't be built because its dependency 'src/src-types' has errors

[[90m12:00:00 AM[0m] Skipping build of project '/src/src-dogs/tsconfig.json' because its dependency '/src/src-types' has errors


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


