//// [tests/cases/compiler/classMemberInitializerWithLamdaScoping5.ts] ////

//// [classMemberInitializerWithLamdaScoping5.ts]
declare var console: {
    log(message?: any, ...optionalParams: any[]): void;
};
class Greeter {
    constructor(message: string) {
    }

    messageHandler = (message: string) => {
        console.log(message); // This shouldn't be error
    }
}

//// [classMemberInitializerWithLamdaScoping5.js]
"use strict";
class Greeter {
    constructor(message) {
        this.messageHandler = (message) => {
            console.log(message); // This shouldn't be error
        };
    }
}
