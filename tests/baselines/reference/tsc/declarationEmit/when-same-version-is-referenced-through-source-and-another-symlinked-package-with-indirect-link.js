Input::
//// [/user/username/projects/myproject/plugin-two/package.json]
{"name":"plugin-two","version":"0.1.3","main":"dist/commonjs/index.js"}

//// [/user/username/projects/myproject/plugin-two/dist/commonjs/index.d.ts]
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
{"name":"typescript-fsa","version":"3.0.0-beta-2"}

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
{"compilerOptions":{"target":"es5","declaration":true,"traceResolution":true}}

//// [/user/username/projects/myproject/plugin-one/index.ts]
import pluginTwo from "plugin-two"; // include this to add reference to symlink
import { actionCreatorFactory } from "typescript-fsa"; // Include version of shared lib
const action = actionCreatorFactory("somekey");
const featureOne = action<{ route: string }>("feature-one");
export const actions = { featureOne };

//// [/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/package.json]
{"name":"typescript-fsa","version":"3.0.0-beta-2"}

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

//// [/temp/yarn/data/link/plugin-two] symlink(/user/username/projects/myproject/plugin-two)
//// [/user/username/projects/myproject/plugin-one/node_modules/plugin-two] symlink(/temp/yarn/data/link/plugin-two)
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


/a/lib/tsc.js -p plugin-one --listFiles
Output::
======== Resolving module 'plugin-two' from '/user/username/projects/myproject/plugin-one/index.ts'. ========

Module resolution kind is not specified, using 'NodeJs'.

Loading module 'plugin-two' from 'node_modules' folder, target file type 'TypeScript'.

Found 'package.json' at '/user/username/projects/myproject/plugin-one/node_modules/plugin-two/package.json'.

'package.json' does not have a 'typesVersions' field.

File '/user/username/projects/myproject/plugin-one/node_modules/plugin-two.ts' does not exist.

File '/user/username/projects/myproject/plugin-one/node_modules/plugin-two.tsx' does not exist.

File '/user/username/projects/myproject/plugin-one/node_modules/plugin-two.d.ts' does not exist.

'package.json' does not have a 'typings' field.

'package.json' does not have a 'types' field.

'package.json' has 'main' field 'dist/commonjs/index.js' that references '/user/username/projects/myproject/plugin-one/node_modules/plugin-two/dist/commonjs/index.js'.

File '/user/username/projects/myproject/plugin-one/node_modules/plugin-two/dist/commonjs/index.js' does not exist.

Loading module as file / folder, candidate module location '/user/username/projects/myproject/plugin-one/node_modules/plugin-two/dist/commonjs/index.js', target file type 'TypeScript'.

File '/user/username/projects/myproject/plugin-one/node_modules/plugin-two/dist/commonjs/index.js.ts' does not exist.

File '/user/username/projects/myproject/plugin-one/node_modules/plugin-two/dist/commonjs/index.js.tsx' does not exist.

File '/user/username/projects/myproject/plugin-one/node_modules/plugin-two/dist/commonjs/index.js.d.ts' does not exist.

File name '/user/username/projects/myproject/plugin-one/node_modules/plugin-two/dist/commonjs/index.js' has a '.js' extension - stripping it.

File '/user/username/projects/myproject/plugin-one/node_modules/plugin-two/dist/commonjs/index.ts' does not exist.

File '/user/username/projects/myproject/plugin-one/node_modules/plugin-two/dist/commonjs/index.tsx' does not exist.

File '/user/username/projects/myproject/plugin-one/node_modules/plugin-two/dist/commonjs/index.d.ts' exist - use it as a name resolution result.

Resolving real path for '/user/username/projects/myproject/plugin-one/node_modules/plugin-two/dist/commonjs/index.d.ts', result '/user/username/projects/myproject/plugin-two/dist/commonjs/index.d.ts'.

======== Module name 'plugin-two' was successfully resolved to '/user/username/projects/myproject/plugin-two/dist/commonjs/index.d.ts' with Package ID 'plugin-two/dist/commonjs/index.d.ts@0.1.3'. ========

======== Resolving module 'typescript-fsa' from '/user/username/projects/myproject/plugin-one/index.ts'. ========

Module resolution kind is not specified, using 'NodeJs'.

Loading module 'typescript-fsa' from 'node_modules' folder, target file type 'TypeScript'.

Found 'package.json' at '/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/package.json'.

'package.json' does not have a 'typesVersions' field.

File '/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa.ts' does not exist.

File '/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa.tsx' does not exist.

File '/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa.d.ts' does not exist.

'package.json' does not have a 'typings' field.

'package.json' does not have a 'types' field.

'package.json' does not have a 'main' field.

File '/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/index.ts' does not exist.

File '/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/index.tsx' does not exist.

File '/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/index.d.ts' exist - use it as a name resolution result.

Resolving real path for '/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/index.d.ts', result '/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/index.d.ts'.

======== Module name 'typescript-fsa' was successfully resolved to '/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/index.d.ts' with Package ID 'typescript-fsa/index.d.ts@3.0.0-beta-2'. ========

======== Resolving module 'typescript-fsa' from '/user/username/projects/myproject/plugin-two/dist/commonjs/index.d.ts'. ========

Module resolution kind is not specified, using 'NodeJs'.

Loading module 'typescript-fsa' from 'node_modules' folder, target file type 'TypeScript'.

Directory '/user/username/projects/myproject/plugin-two/dist/commonjs/node_modules' does not exist, skipping all lookups in it.

Directory '/user/username/projects/myproject/plugin-two/dist/node_modules' does not exist, skipping all lookups in it.

Found 'package.json' at '/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/package.json'.

'package.json' does not have a 'typesVersions' field.

File '/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa.ts' does not exist.

File '/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa.tsx' does not exist.

File '/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa.d.ts' does not exist.

'package.json' does not have a 'typings' field.

'package.json' does not have a 'types' field.

'package.json' does not have a 'main' field.

File '/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/index.ts' does not exist.

File '/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/index.tsx' does not exist.

File '/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/index.d.ts' exist - use it as a name resolution result.

Resolving real path for '/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/index.d.ts', result '/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/index.d.ts'.

======== Module name 'typescript-fsa' was successfully resolved to '/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/index.d.ts' with Package ID 'typescript-fsa/index.d.ts@3.0.0-beta-2'. ========

/a/lib/lib.d.ts

/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/index.d.ts

/user/username/projects/myproject/plugin-two/dist/commonjs/index.d.ts

/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/index.d.ts

/user/username/projects/myproject/plugin-one/index.ts



Program root files: ["/user/username/projects/myproject/plugin-one/index.ts"]
Program options: {"target":1,"declaration":true,"traceResolution":true,"project":"/user/username/projects/myproject/plugin-one","listFiles":true,"configFilePath":"/user/username/projects/myproject/plugin-one/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/index.d.ts
/user/username/projects/myproject/plugin-two/dist/commonjs/index.d.ts
/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/index.d.ts
/user/username/projects/myproject/plugin-one/index.ts

WatchedFiles::

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.Success

//// [/user/username/projects/myproject/plugin-one/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
var typescript_fsa_1 = require("typescript-fsa"); // Include version of shared lib
var action = typescript_fsa_1.actionCreatorFactory("somekey");
var featureOne = action("feature-one");
exports.actions = { featureOne: featureOne };


//// [/user/username/projects/myproject/plugin-one/index.d.ts]
export declare const actions: {
    featureOne: import("typescript-fsa").ActionCreator<{
        route: string;
    }>;
};


