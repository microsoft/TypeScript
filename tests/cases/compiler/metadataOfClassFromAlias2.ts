// @experimentalDecorators: true
// @emitDecoratorMetadata: true
// @target: es5, es2015
// @module: commonjs

// @filename: auxiliry.ts
export class SomeClass {
    field: string;
}

//@filename: test.ts
import { SomeClass } from './auxiliry';
function annotation(): PropertyDecorator {
    return (target: any): void => { };
}
export class ClassA {
    @annotation() array: SomeClass | null | string;
}