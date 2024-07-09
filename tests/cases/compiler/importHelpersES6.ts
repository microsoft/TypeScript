// @importHelpers: true
// @target: es6
// @experimentalDecorators: true
// @filename: a.ts
declare var dec: any;
@dec export class A {
    #x: number = 1;
    async f() { this.#x = await this.#x; }
    g(u) { return #x in u; }
}

const o = { a: 1 };
const y = { ...o };

// @filename: tslib.d.ts
export declare function __extends(d: Function, b: Function): void;
export declare function __decorate(decorators: Function[], target: any, key?: string | symbol, desc?: any): any;
export declare function __param(paramIndex: number, decorator: Function): Function;
export declare function __metadata(metadataKey: any, metadataValue: any): Function;
export declare function __awaiter(thisArg: any, _arguments: any, P: Function, generator: Function): any;
export declare function __classPrivateFieldGet(a: any, b: any, c: any, d: any): any;
export declare function __classPrivateFieldSet(a: any, b: any, c: any, d: any, e: any): any;
export declare function __classPrivateFieldIn(a: any, b: any): boolean;
