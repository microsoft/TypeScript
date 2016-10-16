// @lib: es5,es2015.promise
// @importHelpers: true
// @target: es5
// @module: commonjs
// @moduleResolution: classic
// @filename: external.ts
export async function foo() {
}

// @filename: script.ts
async function foo() {
}

// @filename: tslib.d.ts
export declare function __extends(d: Function, b: Function): void;
export declare function __assign(t: any, ...sources: any[]): any;
export declare function __decorate(decorators: Function[], target: any, key?: string | symbol, desc?: any): any;
export declare function __param(paramIndex: number, decorator: Function): Function;
export declare function __metadata(metadataKey: any, metadataValue: any): Function;
export declare function __awaiter(thisArg: any, _arguments: any, P: Function, generator: Function): any;
export declare function __generator(body: Function): any;