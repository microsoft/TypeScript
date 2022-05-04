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
import { DogConfig } from 'src-types';
import { DOG_CONFIG } from './dogconfig.js';

export abstract class Dog {

    public static getCapabilities(): DogConfig {
        return DOG_CONFIG;
    }
}


//// [/src/src-dogs/dogconfig.ts]
import { DogConfig } from 'src-types';

export const DOG_CONFIG: DogConfig = {
    name: 'Default dog',
};


//// [/src/src-dogs/index.ts]
export * from 'src-types';
export * from './lassie/lassiedog.js';


//// [/src/src-dogs/lassie/lassieconfig.ts]
import { DogConfig } from 'src-types';

export const LASSIE_CONFIG: DogConfig = { name: 'Lassie' };


//// [/src/src-dogs/lassie/lassiedog.ts]
import { Dog } from '../dog.js';
import { LASSIE_CONFIG } from './lassieconfig.js';

export class LassieDog extends Dog {
    protected static getDogConfig = () => LASSIE_CONFIG;
}


//// [/src/src-dogs/node_modules] symlink(/src)
//// [/src/src-dogs/package.json]
{
    "type": "module",
    "exports": "./index.js"
}

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
        "module": "node16"
    }
}



Output::
/lib/tsc -b src/src-types src/src-dogs --verbose
[[90m12:00:24 AM[0m] Projects in this build: 
    * src/src-types/tsconfig.json
    * src/src-dogs/tsconfig.json

[[90m12:00:25 AM[0m] Project 'src/src-types/tsconfig.json' is out of date because output file 'src/src-types/dogconfig.js' does not exist

[[90m12:00:26 AM[0m] Building project '/src/src-types/tsconfig.json'...

[91merror[0m[90m TS6053: [0mFile '/lib/lib.es2022.full.d.ts' not found.
  The file is in the program because:
    Default library for target 'es2022'

[91merror[0m[90m TS2318: [0mCannot find global type 'Array'.

[91merror[0m[90m TS2318: [0mCannot find global type 'Boolean'.

[91merror[0m[90m TS2318: [0mCannot find global type 'Function'.

[91merror[0m[90m TS2318: [0mCannot find global type 'IArguments'.

[91merror[0m[90m TS2318: [0mCannot find global type 'Number'.

[91merror[0m[90m TS2318: [0mCannot find global type 'Object'.

[91merror[0m[90m TS2318: [0mCannot find global type 'RegExp'.

[91merror[0m[90m TS2318: [0mCannot find global type 'String'.

[[90m12:00:27 AM[0m] Project 'src/src-dogs/tsconfig.json' can't be built because its dependency 'src/src-types' has errors

[[90m12:00:28 AM[0m] Skipping build of project '/src/src-dogs/tsconfig.json' because its dependency '/src/src-types' has errors


Found 9 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


