// @importHelpers: true
// @target: es2015
// @module: commonjs
// @moduleResolution: bundler
// @experimentalDecorators: true
// @emitDecoratorMetadata: true
// @filename: main.ts
declare function dec(...args: any[]): any;

@dec
export class C {
    constructor(x: number) {}

    @dec
    method(y: string) {}
}

// @filename: node_modules/tslib/index.d.ts
export declare function __decorate(...args: any[]): any;

// @filename: node_modules/tslib/package.json
{ "name": "tslib", "types": "index.d.ts" }
