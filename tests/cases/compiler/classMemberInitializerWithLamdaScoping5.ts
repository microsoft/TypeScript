// @lib: es5
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