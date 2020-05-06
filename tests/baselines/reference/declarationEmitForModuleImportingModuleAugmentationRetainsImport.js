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

//// [parent.js]
"use strict";
exports.__esModule = true;
exports.ParentThing = void 0;
var child1_1 = require("./child1"); // this import should still exist in some form in the output, since it augments this module
var ParentThing = /** @class */ (function () {
    function ParentThing() {
    }
    return ParentThing;
}());
exports.ParentThing = ParentThing;
child1_1.child1(ParentThing.prototype);
//// [child1.js]
"use strict";
exports.__esModule = true;
exports.child1 = void 0;
function child1(prototype) {
    prototype.add = function (a, b) { return a + b; };
}
exports.child1 = child1;


//// [parent.d.ts]
import './child1';
export declare class ParentThing implements ParentThing {
}
//// [child1.d.ts]
import { ParentThing } from './parent';
declare module './parent' {
    interface ParentThing {
        add: (a: number, b: number) => number;
    }
}
export declare function child1(prototype: ParentThing): void;
