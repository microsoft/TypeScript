// @experimentalDecorators: true
// @emitDecoratorMetadata: true
// @target: es5
namespace MyModule {

    export function inject(target: any, key: string): void { }

    export class Leg { }

    export class Person {
        @inject leftLeg: Leg;
    }

}