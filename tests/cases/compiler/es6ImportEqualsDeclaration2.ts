// @target: es6

// @filename: server.d.ts
declare module "other" {
    export class C { }
}

declare module "server" {
    import events = require("other"); // Ambient declaration, no error expected.

    module S {
        export var a: number;
    }

    export = S; // Ambient declaration, no error expected.
}

// @filename: client.ts
import {a} from "server";
