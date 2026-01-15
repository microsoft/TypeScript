// @experimentalDecorators: true
// @emitDecoratorMetadata: true
// @target: es5
// @module: commonjs
// @strict: true, false

// @filename: auxiliary.ts
export class SomeClass {
    field: string;
}

//@filename: testA.ts
import { SomeClass } from './auxiliary';
function annotation(): PropertyDecorator {
    return (target: any): void => { };
}
export class ClassA {
    @annotation() aaa: SomeClass;
}

//@filename: testB.ts
import { SomeClass } from './auxiliary';
function annotation(): PropertyDecorator {
    return (target: any): void => { };
}
export class ClassB {
    @annotation() bbb: SomeClass | null;
}