// @target: es6
// @experimentaldecorators: true
// @emitDecoratorMetadata: true
// @module: system
// @filename: a.ts

declare function forwardRef(x: any): any;
declare var Something: any;
@Something({ v: () => Testing123 })
export class Testing123 { }