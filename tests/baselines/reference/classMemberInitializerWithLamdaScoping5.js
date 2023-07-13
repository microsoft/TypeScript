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
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.messageHandler = function (message) {
            console.log(message); // This shouldnt be error
        };
    }
    return Greeter;
}());
