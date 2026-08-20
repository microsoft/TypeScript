// @declaration: true
// @isolatedDeclarations: true
// @declarationMap: false
// @strict: true
// @target: ESNext

// @filename: child1.ts
import { ParentThing } from './parent';

declare module './parent' {
    interface ParentThing {
        add: (a: number, b: number) => number;
    }
}

export function child1(prototype: ParentThing) {
    prototype.add = (a: number, b: number) => a + b;
}

// @filename: parent.ts
import { child1 } from './child1'; // this import should still exist in some form in the output, since it augments this module

export class ParentThing implements ParentThing {}

child1(ParentThing.prototype);