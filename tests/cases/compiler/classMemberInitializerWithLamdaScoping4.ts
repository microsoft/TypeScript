// @Filename: classMemberInitializerWithLamdaScoping3_0.ts
export var field1: string;

// @Filename: classMemberInitializerWithLamdaScoping3_1.ts
declare var console: {
    log(msg?: any): void;
};
export class Test1 {
    constructor(private field1: string) {
    }
    messageHandler = () => {
        console.log(field1); // Should be error that couldnt find symbol field1
    };
}