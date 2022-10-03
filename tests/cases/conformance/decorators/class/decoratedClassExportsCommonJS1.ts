// @target: es6
// @experimentaldecorators: true
// @emitDecoratorMetadata: true
// @module: commonjs
// @filename: a.ts

declare function forwardRef(x: any): any;
declare var Something: any;
@Something({ v: () => Testing123 })
export class Testing123 {
    static prop0: string;
    static prop1 = Testing123.prop0;
}