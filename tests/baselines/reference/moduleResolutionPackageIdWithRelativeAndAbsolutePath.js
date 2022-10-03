//// [tests/cases/compiler/moduleResolutionPackageIdWithRelativeAndAbsolutePath.ts] ////

//// [package.json]
{
    "name": "troublesome-lib",
    "version": "1.17.1"
}
//// [Compactable.d.ts]
import { Option } from './Option';
export class Compactable {
    option: Option;
}
//// [Option.d.ts]
export class Option {
    someProperty: string;
}
//// [app.d.ts]
import { Option } from "troublesome-lib/lib/Option";
export class SharedOption extends Option { }
export const makeSharedOption: () => SharedOption;
//// [index.d.ts]
import { Compactable } from "troublesome-lib/lib/Compactable"; // Including this will resolve Option as relative through the imports of compactable
//// [package.json]
{
    "name": "troublesome-lib",
    "version": "1.17.1"
}
//// [Compactable.d.ts]
import { Option } from './Option';
export class Compactable {
    option: Option;
}
//// [Option.d.ts]
export class Option {
    someProperty: string;
}
//// [app.ts]
import * as t from "anotherLib"; // Include the lib that recursively includes option as relative module resolution in this directory
import { makeSharedOption } from "@shared/lib/app"; // Includes option as module in shared folder but as module in node_modules folder


//// [/project/src/app.js]
"use strict";
exports.__esModule = true;
