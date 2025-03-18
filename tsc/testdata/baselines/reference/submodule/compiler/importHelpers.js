//// [tests/cases/compiler/importHelpers.ts] ////

//// [external.ts]
export class A { }
export class B extends A { }

declare var dec: any;

@dec
class C {
    method(@dec x: number) {
    }
}

function id<T>(x: T) {
    return x;
}

export const result = id`hello world`;

//// [script.ts]
class A { }
class B extends A { }

declare var dec: any;

@dec
class C {
    method(@dec x: number) {
    }
}

function id<T>(x: T) {
    return x;
}

const result = id`hello world`;

//// [tslib.d.ts]
export declare function __extends(d: Function, b: Function): void;
export declare function __assign(t: any, ...sources: any[]): any;
export declare function __decorate(decorators: Function[], target: any, key?: string | symbol, desc?: any): any;
export declare function __param(paramIndex: number, decorator: Function): Function;
export declare function __metadata(metadataKey: any, metadataValue: any): Function;
export declare function __awaiter(thisArg: any, _arguments: any, P: Function, generator: Function): any;
export declare function __makeTemplateObject(cooked: string[], raw: string[]): TemplateStringsArray;


//// [external.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.result = exports.B = exports.A = void 0;
class A {
}
exports.A = A;
class B extends A {
}
exports.B = B;
@dec
class C {
    method(x) {
    }
}
function id(x) {
    return x;
}
exports.result = id `hello world`;
//// [script.js]
class A {
}
class B extends A {
}
@dec
class C {
    method(x) {
    }
}
function id(x) {
    return x;
}
const result = id `hello world`;
