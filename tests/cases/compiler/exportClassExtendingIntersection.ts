// @declaration: true
// @Filename:BaseClass.ts
export type Constructor<T> = new (...args: any[]) => T;

export class MyBaseClass<T> {
    baseProperty: string;
    constructor(value: T) {}
}
// @Filename:MixinClass.ts
import { Constructor, MyBaseClass } from './BaseClass';

export interface MyMixin {
    mixinProperty: string;
}

export function MyMixin<T extends Constructor<MyBaseClass<any>>>(base: T): T & Constructor<MyMixin> {
    return class extends base {
        mixinProperty: string;
    }
}
// @Filename:FinalClass.ts
import { MyBaseClass } from './BaseClass';
import { MyMixin } from './MixinClass';

export class MyExtendedClass extends MyMixin(MyBaseClass)<string> {
    extendedClassProperty: number;
}
// @Filename:Main.ts
import { MyExtendedClass } from './FinalClass';
import { MyMixin } from './MixinClass';

const myExtendedClass = new MyExtendedClass('string');

const AnotherMixedClass = MyMixin(MyExtendedClass);
