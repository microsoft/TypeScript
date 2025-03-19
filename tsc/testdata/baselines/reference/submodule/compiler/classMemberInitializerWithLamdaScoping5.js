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
class Greeter {
    constructor(message) {
    }
    messageHandler = (message) => {
        console.log(message); // This shouldnt be error
    };
}
