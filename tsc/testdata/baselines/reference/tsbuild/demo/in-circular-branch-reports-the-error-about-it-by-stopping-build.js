currentDirectory::/user/username/projects/demo
useCaseSensitiveFileNames::true
Input::
//// [/user/username/projects/demo/animals/animal.ts] *new* 
export type Size = "small" | "medium" | "large";
export default interface Animal {
    size: Size;
}
//// [/user/username/projects/demo/animals/dog.ts] *new* 
import Animal from '.';
import { makeRandomName } from '../core/utilities';

export interface Dog extends Animal {
    woof(): void;
    name: string;
}

export function createDog(): Dog {
    return ({
        size: "medium",
        woof: function(this: Dog) {
            console.log(`${ this.name } says "Woof"!`);
        },
        name: makeRandomName()
    });
}
//// [/user/username/projects/demo/animals/index.ts] *new* 
import Animal from './animal';

export default Animal;
import { createDog, Dog } from './dog';
export { createDog, Dog };
//// [/user/username/projects/demo/animals/tsconfig.json] *new* 
{
    "extends": "../tsconfig-base.json",
    "compilerOptions": {
        "outDir": "../lib/animals",
        "rootDir": "."
    },
    "references": [
        { "path": "../core" }
    ]
}
//// [/user/username/projects/demo/core/tsconfig.json] *new* 
{
    "extends": "../tsconfig-base.json",
    "compilerOptions": {
        "outDir": "../lib/core",
        "rootDir": "."
    },
    "references": [
        {
            "path": "../zoo",
        }
    ]
}
//// [/user/username/projects/demo/core/utilities.ts] *new* 
export function makeRandomName() {
    return "Bob!?! ";
}

export function lastElementOf<T>(arr: T[]): T | undefined {
    if (arr.length === 0) return undefined;
    return arr[arr.length - 1];
}
//// [/user/username/projects/demo/tsconfig-base.json] *new* 
{
    "compilerOptions": {
        "declaration": true,
        "target": "es5",
        "module": "commonjs",
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noImplicitReturns": true,
        "noFallthroughCasesInSwitch": true,
        "composite": true,
    },
}
//// [/user/username/projects/demo/tsconfig.json] *new* 
{
    "files": [],
    "references": [
        {
            "path": "./core"
        },
        {
            "path": "./animals",
        },
        {
            "path": "./zoo",
        },
    ],
}
//// [/user/username/projects/demo/zoo/tsconfig.json] *new* 
{
    "extends": "../tsconfig-base.json",
    "compilerOptions": {
        "outDir": "../lib/zoo",
        "rootDir": "."
    },
    "references": [
        {
            "path": "../animals"
        }
    ]
}
//// [/user/username/projects/demo/zoo/zoo.ts] *new* 
import { Dog, createDog } from '../animals/index';

export function createZoo(): Array<Dog> {
    return [
        createDog()
    ];
}

tsgo --b --verbose
ExitStatus:: ProjectReferenceCycle_OutputsSkipped
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * animals/tsconfig.json
    * zoo/tsconfig.json
    * core/tsconfig.json
    * tsconfig.json

[91merror[0m[90m TS6202: [0mProject references may not form a circular graph. Cycle detected: /user/username/projects/demo/tsconfig.json
/user/username/projects/demo/core/tsconfig.json
/user/username/projects/demo/zoo/tsconfig.json
/user/username/projects/demo/animals/tsconfig.json

Found 1 error.


