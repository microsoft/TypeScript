currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames: false
Input::
//// [/user/username/projects/myproject/plugin-two/index.d.ts]
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

//// [/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/package.json]
{
  "name": "typescript-fsa",
  "version": "3.0.0-beta-2"
}

//// [/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/index.d.ts]
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

//// [/user/username/projects/myproject/plugin-one/tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "declaration": true,
    "traceResolution": true
  }
}

//// [/user/username/projects/myproject/plugin-one/index.ts]
import pluginTwo from "plugin-two"; // include this to add reference to symlink

//// [/user/username/projects/myproject/plugin-one/action.ts]
import { actionCreatorFactory } from "typescript-fsa"; // Include version of shared lib
const action = actionCreatorFactory("somekey");
const featureOne = action<{ route: string }>("feature-one");
export const actions = { featureOne };

//// [/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/package.json]
{
  "name": "typescript-fsa",
  "version": "3.0.0-beta-2"
}

//// [/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/index.d.ts]
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

//// [/user/username/projects/myproject/plugin-one/node_modules/plugin-two] symlink(/user/username/projects/myproject/plugin-two)
//// [/a/lib/lib.d.ts]
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


/a/lib/tsc.js -p plugin-one --explainFiles
Output::
======== Resolving module 'typescript-fsa' from '/user/username/projects/myproject/plugin-one/action.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'typescript-fsa' from 'node_modules' folder, target file types: TypeScript, Declaration.
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
Resolving real path for '/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/index.d.ts', result '/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/index.d.ts'.
======== Module name 'typescript-fsa' was successfully resolved to '/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/index.d.ts' with Package ID 'typescript-fsa/index.d.ts@3.0.0-beta-2'. ========
======== Resolving module 'plugin-two' from '/user/username/projects/myproject/plugin-one/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'plugin-two' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/user/username/projects/myproject/plugin-one/node_modules/plugin-two/package.json' does not exist.
File '/user/username/projects/myproject/plugin-one/node_modules/plugin-two.ts' does not exist.
File '/user/username/projects/myproject/plugin-one/node_modules/plugin-two.tsx' does not exist.
File '/user/username/projects/myproject/plugin-one/node_modules/plugin-two.d.ts' does not exist.
File '/user/username/projects/myproject/plugin-one/node_modules/plugin-two/index.ts' does not exist.
File '/user/username/projects/myproject/plugin-one/node_modules/plugin-two/index.tsx' does not exist.
File '/user/username/projects/myproject/plugin-one/node_modules/plugin-two/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/plugin-one/node_modules/plugin-two/index.d.ts', result '/user/username/projects/myproject/plugin-two/index.d.ts'.
======== Module name 'plugin-two' was successfully resolved to '/user/username/projects/myproject/plugin-two/index.d.ts'. ========
======== Resolving module 'typescript-fsa' from '/user/username/projects/myproject/plugin-two/index.d.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'typescript-fsa' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
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
Resolving real path for '/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/index.d.ts', result '/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/index.d.ts'.
======== Module name 'typescript-fsa' was successfully resolved to '/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/index.d.ts' with Package ID 'typescript-fsa/index.d.ts@3.0.0-beta-2'. ========
../../../../a/lib/lib.d.ts
  Default library for target 'es5'
plugin-one/node_modules/typescript-fsa/index.d.ts
  Imported via "typescript-fsa" from file 'plugin-one/action.ts' with packageId 'typescript-fsa/index.d.ts@3.0.0-beta-2'
plugin-one/action.ts
  Matched by default include pattern '**/*'
plugin-two/node_modules/typescript-fsa/index.d.ts
  Imported via "typescript-fsa" from file 'plugin-two/index.d.ts' with packageId 'typescript-fsa/index.d.ts@3.0.0-beta-2'
  File redirects to file 'plugin-one/node_modules/typescript-fsa/index.d.ts'
plugin-two/index.d.ts
  Imported via "plugin-two" from file 'plugin-one/index.ts'
plugin-one/index.ts
  Matched by default include pattern '**/*'


//// [/user/username/projects/myproject/plugin-one/action.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
var typescript_fsa_1 = require("typescript-fsa"); // Include version of shared lib
var action = (0, typescript_fsa_1.actionCreatorFactory)("somekey");
var featureOne = action("feature-one");
exports.actions = { featureOne: featureOne };


//// [/user/username/projects/myproject/plugin-one/action.d.ts]
export declare const actions: {
    featureOne: import("typescript-fsa").ActionCreator<{
        route: string;
    }>;
};


//// [/user/username/projects/myproject/plugin-one/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/myproject/plugin-one/index.d.ts]
export {};



Program root files: [
  "/user/username/projects/myproject/plugin-one/action.ts",
  "/user/username/projects/myproject/plugin-one/index.ts"
]
Program options: {
  "target": 1,
  "declaration": true,
  "traceResolution": true,
  "project": "/user/username/projects/myproject/plugin-one",
  "explainFiles": true,
  "configFilePath": "/user/username/projects/myproject/plugin-one/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/index.d.ts
/user/username/projects/myproject/plugin-one/action.ts
/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/index.d.ts
/user/username/projects/myproject/plugin-two/index.d.ts
/user/username/projects/myproject/plugin-one/index.ts

exitCode:: ExitStatus.Success
