// @experimentalDecorators: true
// @emitDecoratorMetadata: true
// @target: es5
// @filename: Class1.ts
// @strictNullChecks: true, false
// @strictPropertyInitialization: false

export class Class1 {
}
// @filename: Class2.ts
import { Class1 } from './Class1';

function decorate(target: any, propertyKey: string) {
}

export class Class2 {
    @decorate
    get maybeProp(): Class1 | undefined {
        return undefined;
    }
    @decorate
    get prop(): Class1 {
        return undefined;
    }
}