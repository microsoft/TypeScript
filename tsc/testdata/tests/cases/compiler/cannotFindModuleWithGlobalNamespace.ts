// @strict: true
// @noImplicitReferences: true

// @Filename: /node_modules/messageformat/package.json
{
    "name": "messageformat",
    "version": "1.0.0",
    "main": "lib/messageformat.js"
}

// @Filename: /node_modules/messageformat/lib/messageformat.js
module.exports = function messageformat() {};

// @Filename: globals.d.ts
declare module messageformat {
    export type Msg = (params: {}) => string;
}
declare module otherlib {
    export type Other = string;
}

// @Filename: main.ts
/// <reference path="globals.d.ts" />
import MessageFormat from "messageformat";
import Other from "otherlib";
import { something } from "not-declared-globally";
