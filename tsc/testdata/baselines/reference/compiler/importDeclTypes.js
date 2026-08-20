//// [tests/cases/compiler/importDeclTypes.ts] ////

//// [index.d.ts]
export interface Foo {
    bar: string;
}

// This should error
//// [a.ts]
import { Foo } from "@types/foo-bar";


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
