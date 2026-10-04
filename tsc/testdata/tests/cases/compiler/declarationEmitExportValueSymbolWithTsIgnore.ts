// @declaration: true
// @strict: true
// @lib: es2015

// @filename: node_modules/lib/index.d.ts
export declare const MySymbol: unique symbol;
export declare function createService<T>(): {
    new (): {
        [MySymbol](): T | undefined;
    };
};

// @filename: client.ts
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
