// @noImplicitReferences: true
// @filename: node_modules/troublesome-lib/package.json
{
"name": "troublesome-lib",
"typings": "lib/index.d.ts",
"version": "0.0.1"
}
// @filename: node_modules/troublesome-lib/lib/index.d.ts
import { Position } from './utilities/positioning';
export interface ISpinButton {}
// @filename: node_modules/troublesome-lib/lib/utilities/positioning.d.ts
export * from './positioning/index';
// @filename: node_modules/troublesome-lib/lib/utilities/positioning/index.d.ts
export declare enum Position {
    top,
}
// @filename: index.ts
import { ISpinButton } from "troublesome-lib";