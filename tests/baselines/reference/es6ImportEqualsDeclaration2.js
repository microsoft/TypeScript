//// [tests/cases/compiler/es6ImportEqualsDeclaration2.ts] ////

//// [server.d.ts]
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

//// [client.ts]
import {a} from "server";


//// [client.js]
export {};
