// @module: commonjs
// @target: es5, es2015
// @experimentalDecorators: true
// @emitDecoratorMetadata: true

// @filename: aux.ts
export class SomeClass {
    field: string;
}

// @filename: aux1.ts
export class SomeClass1 {
    field: string;
}

// @filename: aux2.ts
export class SomeClass2 {
    field: string;
}
// @filename: main.ts
import { SomeClass } from './aux';
import { SomeClass1 } from './aux1';

function annotation(): ClassDecorator {
    return (target: any): void => { };
}

function annotation1(): MethodDecorator {
    return (target: any): void => { };
}

@annotation()
export class ClassA {
    array: SomeClass[];

    constructor(...init: SomeClass[]) {
        this.array = init;
    }

    @annotation1()
    foo(... args: SomeClass1[]) {
    }
}