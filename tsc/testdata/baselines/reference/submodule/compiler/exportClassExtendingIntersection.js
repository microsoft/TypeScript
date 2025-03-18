//// [tests/cases/compiler/exportClassExtendingIntersection.ts] ////

//// [BaseClass.ts]
export type Constructor<T> = new (...args: any[]) => T;

export class MyBaseClass<T> {
    baseProperty: string;
    constructor(value: T) {}
}
//// [MixinClass.ts]
import { Constructor, MyBaseClass } from './BaseClass';

export interface MyMixin {
    mixinProperty: string;
}

export function MyMixin<T extends Constructor<MyBaseClass<any>>>(base: T): T & Constructor<MyMixin> {
    return class extends base {
        mixinProperty: string;
    }
}
//// [FinalClass.ts]
import { MyBaseClass } from './BaseClass';
import { MyMixin } from './MixinClass';

export class MyExtendedClass extends MyMixin(MyBaseClass)<string> {
    extendedClassProperty: number;
}
//// [Main.ts]
import { MyExtendedClass } from './FinalClass';
import { MyMixin } from './MixinClass';

const myExtendedClass = new MyExtendedClass('string');

const AnotherMixedClass = MyMixin(MyExtendedClass);


//// [BaseClass.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyBaseClass = void 0;
class MyBaseClass {
    baseProperty;
    constructor(value) { }
}
exports.MyBaseClass = MyBaseClass;
//// [MixinClass.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyMixin = MyMixin;
function MyMixin(base) {
    return class extends base {
        mixinProperty;
    };
}
//// [FinalClass.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyExtendedClass = void 0;
const BaseClass_1 = require("./BaseClass");
const MixinClass_1 = require("./MixinClass");
class MyExtendedClass extends (0, MixinClass_1.MyMixin)(BaseClass_1.MyBaseClass) {
    extendedClassProperty;
}
exports.MyExtendedClass = MyExtendedClass;
//// [Main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FinalClass_1 = require("./FinalClass");
const MixinClass_1 = require("./MixinClass");
const myExtendedClass = new FinalClass_1.MyExtendedClass('string');
const AnotherMixedClass = (0, MixinClass_1.MyMixin)(FinalClass_1.MyExtendedClass);
