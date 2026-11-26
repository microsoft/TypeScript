//// [tests/cases/compiler/classMemberInitializerWithLamdaScoping5.ts] ////

//// [classMemberInitializerWithLamdaScoping5.ts]
declare var console: {
    log(message?: any, ...optionalParams: any[]): void;
};
class Greeter {
    constructor(message: string) {
    }

    messageHandler = (message: string) => {
        console.log(message); // This shouldnt be error
    }
}

//// [classMemberInitializerWithLamdaScoping5.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
class Greeter {
    constructor(message) {
        this.messageHandler = __setFunctionName((message) => {
            console.log(message); // This shouldnt be error
        }, "messageHandler");
    }
}
