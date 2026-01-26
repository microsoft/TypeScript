// @target: es2020
// @experimentalDecorators: true
// @emitDecoratorMetadata: true

declare function paramDec(target: any, propertyKey: string | symbol | undefined, parameterIndex: number): void;

class C {
    constructor(@paramDec _value: string) {}
}
