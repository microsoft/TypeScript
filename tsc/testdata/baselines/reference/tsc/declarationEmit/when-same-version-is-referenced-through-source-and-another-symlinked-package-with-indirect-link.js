currentDirectory::/user/username/projects/myproject
useCaseSensitiveFileNames::true
Input::
//// [/temp/yarn/data/link/plugin-two] -> /user/username/projects/myproject/plugin-two *new*
//// [/user/username/projects/myproject/plugin-one/index.ts] *new* 
import pluginTwo from "plugin-two"; // include this to add reference to symlink
import { actionCreatorFactory } from "typescript-fsa"; // Include version of shared lib
const action = actionCreatorFactory("somekey");
const featureOne = action<{ route: string }>("feature-one");
export const actions = { featureOne };
//// [/user/username/projects/myproject/plugin-one/node_modules/plugin-two] -> /temp/yarn/data/link/plugin-two *new*
//// [/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/index.d.ts] *new* 
export interface Action<Payload> {
    type: string;
    payload: Payload;
}
export declare type ActionCreator<Payload> = {
    type: string;
    (payload: Payload): Action<Payload>;
}
export interface ActionCreatorFactory {
    <Payload = void>(type: string): ActionCreator<Payload>;
}
export declare function actionCreatorFactory(prefix?: string | null): ActionCreatorFactory;
export default actionCreatorFactory;
//// [/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/package.json] *new* 
{
    "name": "typescript-fsa",
    "version": "3.0.0-beta-2"
}
//// [/user/username/projects/myproject/plugin-one/tsconfig.json] *new* 
{
    "compilerOptions": {
        "target": "es5",
        "declaration": true,
        "traceResolution": true,
    },
}
//// [/user/username/projects/myproject/plugin-two/dist/commonjs/index.d.ts] *new* 
declare const _default: {
    features: {
        featureOne: {
            actions: {
                featureOne: {
                    (payload: {
                        name: string;
                        order: number;
                    }, meta?: {
                        [key: string]: any;
                    }): import("typescript-fsa").Action<{
                        name: string;
                        order: number;
                    }>;
                };
            };
            path: string;
        };
    };
};
export default _default;
//// [/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/index.d.ts] *new* 
export interface Action<Payload> {
    type: string;
    payload: Payload;
}
export declare type ActionCreator<Payload> = {
    type: string;
    (payload: Payload): Action<Payload>;
}
export interface ActionCreatorFactory {
    <Payload = void>(type: string): ActionCreator<Payload>;
}
export declare function actionCreatorFactory(prefix?: string | null): ActionCreatorFactory;
export default actionCreatorFactory;
//// [/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/package.json] *new* 
{
    "name": "typescript-fsa",
    "version": "3.0.0-beta-2"
}
//// [/user/username/projects/myproject/plugin-two/package.json] *new* 
{
    "name": "plugin-two",
    "version": "0.1.3",
    "main": "dist/commonjs/index.js"
}

tsgo -p plugin-one --explainFiles
ExitStatus:: Success
Output::
======== Resolving module 'plugin-two' from '/user/username/projects/myproject/plugin-one/index.ts'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'require', 'types'.
File '/user/username/projects/myproject/plugin-one/package.json' does not exist.
File '/user/username/projects/myproject/package.json' does not exist.
File '/user/username/projects/package.json' does not exist.
File '/user/username/package.json' does not exist.
File '/user/package.json' does not exist.
File '/package.json' does not exist.
Loading module 'plugin-two' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Found 'package.json' at '/user/username/projects/myproject/plugin-one/node_modules/plugin-two/package.json'.
File '/user/username/projects/myproject/plugin-one/node_modules/plugin-two.ts' does not exist.
File '/user/username/projects/myproject/plugin-one/node_modules/plugin-two.tsx' does not exist.
File '/user/username/projects/myproject/plugin-one/node_modules/plugin-two.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'dist/commonjs/index.js' that references '/user/username/projects/myproject/plugin-one/node_modules/plugin-two/dist/commonjs/index.js'.
File name '/user/username/projects/myproject/plugin-one/node_modules/plugin-two/dist/commonjs/index.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/plugin-one/node_modules/plugin-two/dist/commonjs/index.ts' does not exist.
File '/user/username/projects/myproject/plugin-one/node_modules/plugin-two/dist/commonjs/index.tsx' does not exist.
File '/user/username/projects/myproject/plugin-one/node_modules/plugin-two/dist/commonjs/index.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/user/username/projects/myproject/plugin-one/node_modules/plugin-two/dist/commonjs/index.d.ts', result '/user/username/projects/myproject/plugin-two/dist/commonjs/index.d.ts'.
======== Module name 'plugin-two' was successfully resolved to '/user/username/projects/myproject/plugin-two/dist/commonjs/index.d.ts' with Package ID 'plugin-two@0.1.3'. ========
======== Resolving module 'typescript-fsa' from '/user/username/projects/myproject/plugin-one/index.ts'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'require', 'types'.
File '/user/username/projects/myproject/plugin-one/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
File '/user/username/package.json' does not exist according to earlier cached lookups.
File '/user/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'typescript-fsa' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Found 'package.json' at '/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/package.json'.
File '/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa.ts' does not exist.
File '/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa.tsx' does not exist.
File '/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' does not have a 'main' field.
File '/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/index.ts' does not exist.
File '/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/index.tsx' does not exist.
File '/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/index.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/index.d.ts', result '/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/index.d.ts'.
======== Module name 'typescript-fsa' was successfully resolved to '/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/index.d.ts' with Package ID 'typescript-fsa@3.0.0-beta-2'. ========
======== Resolving module 'typescript-fsa' from '/user/username/projects/myproject/plugin-two/dist/commonjs/index.d.ts'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'require', 'types'.
File '/user/username/projects/myproject/plugin-two/dist/commonjs/package.json' does not exist.
File '/user/username/projects/myproject/plugin-two/dist/package.json' does not exist.
Found 'package.json' at '/user/username/projects/myproject/plugin-two/package.json'.
Loading module 'typescript-fsa' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/user/username/projects/myproject/plugin-two/dist/commonjs/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/plugin-two/dist/commonjs/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/plugin-two/dist/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/plugin-two/dist/node_modules/@types' does not exist, skipping all lookups in it.
Found 'package.json' at '/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/package.json'.
File '/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa.ts' does not exist.
File '/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa.tsx' does not exist.
File '/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' does not have a 'main' field.
File '/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/index.ts' does not exist.
File '/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/index.tsx' does not exist.
File '/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/index.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/index.d.ts', result '/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/index.d.ts'.
======== Module name 'typescript-fsa' was successfully resolved to '/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/index.d.ts' with Package ID 'typescript-fsa@3.0.0-beta-2'. ========
../../../../home/src/tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
plugin-two/node_modules/typescript-fsa/index.d.ts
   Imported via "typescript-fsa" from file 'plugin-two/dist/commonjs/index.d.ts' with packageId 'typescript-fsa@3.0.0-beta-2'
plugin-two/dist/commonjs/index.d.ts
   Imported via "plugin-two" from file 'plugin-one/index.ts' with packageId 'plugin-two@0.1.3'
plugin-one/node_modules/typescript-fsa/index.d.ts
   Imported via "typescript-fsa" from file 'plugin-one/index.ts' with packageId 'typescript-fsa@3.0.0-beta-2'
plugin-one/index.ts
   Matched by default include pattern '**/*'
//// [/home/src/tslibs/TS/Lib/lib.d.ts] *Lib*
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
//// [/temp/yarn/data/link/plugin-two] *deleted*
//// [/user/username/projects/myproject/plugin-one/index.d.ts] *new* 
export declare const actions: {
    featureOne: import("typescript-fsa").ActionCreator<{
        route: string;
    }>;
};

//// [/user/username/projects/myproject/plugin-one/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const typescript_fsa_1 = require("typescript-fsa"); // Include version of shared lib
const action = (0, typescript_fsa_1.actionCreatorFactory)("somekey");
const featureOne = action("feature-one");
exports.actions = { featureOne };

//// [/user/username/projects/myproject/plugin-one/node_modules/plugin-two] *deleted*

