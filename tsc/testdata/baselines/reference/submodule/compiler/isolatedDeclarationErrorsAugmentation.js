//// [tests/cases/compiler/isolatedDeclarationErrorsAugmentation.ts] ////

//// [child1.ts]
import { ParentThing } from './parent';

declare module './parent' {
    interface ParentThing {
        add: (a: number, b: number) => number;
    }
}

export function child1(prototype: ParentThing) {
    prototype.add = (a: number, b: number) => a + b;
}

//// [parent.ts]
import { child1 } from './child1'; // this import should still exist in some form in the output, since it augments this module

export class ParentThing implements ParentThing {}

child1(ParentThing.prototype);

//// [parent.js]
import { child1 } from './child1'; // this import should still exist in some form in the output, since it augments this module
export class ParentThing {
}
child1(ParentThing.prototype);
//// [child1.js]
export function child1(prototype) {
    prototype.add = (a, b) => a + b;
}
