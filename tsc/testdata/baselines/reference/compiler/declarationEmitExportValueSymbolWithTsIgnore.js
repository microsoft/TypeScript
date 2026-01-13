//// [tests/cases/compiler/declarationEmitExportValueSymbolWithTsIgnore.ts] ////

//// [index.d.ts]
export declare const MySymbol: unique symbol;
export declare function createService<T>(): {
    new (): {
        [MySymbol](): T | undefined;
    };
};

//// [client.ts]
// @ts-ignore Import needed for type visibility but appears unused
import { MySymbol } from "lib";
import { createService } from "lib";

// The extends clause references the factory result which uses MySymbol
// This should trigger symbol accessibility check for MySymbol
export class Client extends createService<string>() {
    doSomething(): string {
        return "hello";
    }
}


//// [client.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const lib_1 = require("lib");
// The extends clause references the factory result which uses MySymbol
// This should trigger symbol accessibility check for MySymbol
class Client extends (0, lib_1.createService)() {
    doSomething() {
        return "hello";
    }
}
exports.Client = Client;


//// [client.d.ts]
import { MySymbol } from "lib";
declare const Client_base: new () => {
    [MySymbol](): string | undefined;
};
export declare class Client extends Client_base {
    doSomething(): string;
}
export {};
