// @importHelpers: true
// @target: es2015
// @module: es2015
// @experimentalDecorators: true
// @noTypesAndSymbols: true

// @filename: index.ts
declare const dec: ClassDecorator;
declare const value: string;

const template = `${value}`;
declare const __decorate: unknown;

@dec
export class C {}

// @filename: node_modules/tslib/index.d.ts
export declare function __decorate(decorators: Function[], target: Function): void;
