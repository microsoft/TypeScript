// @target: es2015, es2020
// @experimentalDecorators: true
// @emitDecoratorMetadata: true

declare function dec(...args: any[]): any;

class C {
    @dec prop!: bigint;
}
