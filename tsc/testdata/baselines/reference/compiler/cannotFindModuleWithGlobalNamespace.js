//// [tests/cases/compiler/cannotFindModuleWithGlobalNamespace.ts] ////

//// [package.json]
{
    "name": "messageformat",
    "version": "1.0.0",
    "main": "lib/messageformat.js"
}

//// [messageformat.js]
module.exports = function messageformat() {};

//// [globals.d.ts]
declare module messageformat {
    export type Msg = (params: {}) => string;
}
declare module otherlib {
    export type Other = string;
}

//// [main.ts]
/// <reference path="globals.d.ts" />
import MessageFormat from "messageformat";
import Other from "otherlib";
import { something } from "not-declared-globally";


//// [main.js]
export {};
