// @noImplicitReferences: true
// @typeRoots: /typings
// @types: phaser
// @traceResolution: true
// @currentDirectory: /

// @Filename: /typings/phaser/types/phaser.d.ts
declare module "phaser" {
    export const a2: number;
}

// @Filename: /typings/phaser/package.json
{ "name": "phaser", "version": "1.2.3", "types": "types/phaser.d.ts" }


// @Filename: /a.ts
import { a2 } from "phaser";