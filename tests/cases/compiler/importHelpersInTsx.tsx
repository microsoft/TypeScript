// @importHelpers: true
// @target: es5
// @module: commonjs
// @moduleResolution: classic
// @jsx: react
// @experimentalDecorators: true
// @emitDecoratorMetadata: true
// @filename: external.tsx
declare var React: any;
declare var o: any;
export const x = <span {...o} />

// @filename: script.tsx
declare var React: any;
declare var o: any;
const x = <span {...o} />

// @filename: tslib.d.ts
export declare function __extends(d: Function, b: Function): void;
export declare function __assign(t: any, ...sources: any[]): any;
export declare function __decorate(decorators: Function[], target: any, key?: string | symbol, desc?: any): any;
export declare function __param(paramIndex: number, decorator: Function): Function;
export declare function __metadata(metadataKey: any, metadataValue: any): Function;
export declare function __awaiter(thisArg: any, _arguments: any, P: Function, generator: Function): any;
