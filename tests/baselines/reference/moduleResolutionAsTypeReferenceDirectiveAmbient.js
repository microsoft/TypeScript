//// [tests/cases/compiler/moduleResolutionAsTypeReferenceDirectiveAmbient.ts] ////

//// [phaser.d.ts]
declare module "phaser" {
    export const a2: number;
}

//// [package.json]
{ "name": "phaser", "version": "1.2.3", "types": "types/phaser.d.ts" }


//// [a.ts]
import { a2 } from "phaser";

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
