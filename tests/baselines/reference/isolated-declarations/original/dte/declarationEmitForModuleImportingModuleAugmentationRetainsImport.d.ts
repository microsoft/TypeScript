//// [tests/cases/compiler/declarationEmitForModuleImportingModuleAugmentationRetainsImport.ts] ////

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

/// [Declarations] ////



//// [child1.d.ts]
import { ParentThing } from './parent';
declare module './parent' {
    interface ParentThing {
        add: (a: number, b: number) => number;
    }
}
export declare function child1(prototype: ParentThing): invalid;

//// [parent.d.ts]
export declare class ParentThing implements ParentThing {
}

/// [Errors] ////

child1.ts(9,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== child1.ts (1 errors) ====
    import { ParentThing } from './parent';
    
    declare module './parent' {
        interface ParentThing {
            add: (a: number, b: number) => number;
        }
    }
    
    export function child1(prototype: ParentThing) {
                    ~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        prototype.add = (a: number, b: number) => a + b;
    }
    
==== parent.ts (0 errors) ====
    import { child1 } from './child1'; // this import should still exist in some form in the output, since it augments this module
    
    export class ParentThing implements ParentThing {}
    
    child1(ParentThing.prototype);