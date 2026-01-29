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
export class MyBaseClass {
    constructor(value) { }
}
//// [MixinClass.js]
export function MyMixin(base) {
    return class extends base {
    };
}
//// [FinalClass.js]
import { MyBaseClass } from './BaseClass';
import { MyMixin } from './MixinClass';
export class MyExtendedClass extends MyMixin(MyBaseClass) {
}
//// [Main.js]
import { MyExtendedClass } from './FinalClass';
import { MyMixin } from './MixinClass';
const myExtendedClass = new MyExtendedClass('string');
const AnotherMixedClass = MyMixin(MyExtendedClass);


//// [BaseClass.d.ts]
export type Constructor<T> = new (...args: any[]) => T;
export declare class MyBaseClass<T> {
    baseProperty: string;
    constructor(value: T);
}
//// [MixinClass.d.ts]
import { Constructor, MyBaseClass } from './BaseClass';
export interface MyMixin {
    mixinProperty: string;
}
export declare function MyMixin<T extends Constructor<MyBaseClass<any>>>(base: T): T & Constructor<MyMixin>;
//// [FinalClass.d.ts]
import { MyBaseClass } from './BaseClass';
import { MyMixin } from './MixinClass';
declare const MyExtendedClass_base: typeof MyBaseClass & import("./BaseClass").Constructor<MyMixin>;
export declare class MyExtendedClass extends MyExtendedClass_base<string> {
    extendedClassProperty: number;
}
export {};
//// [Main.d.ts]
export {};
