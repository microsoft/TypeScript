// @target: es2015
// @lib: es5
declare var console: {
    log(msg?: any): void;
};
class Test {
    constructor(private field: string) {
    }
    messageHandler = () => {
        var field = this.field;
        console.log(field); // Using field here shouldn't be error
    };
    static field: number;
    static staticMessageHandler = () => {
        var field = Test.field;
        console.log(field); // Using field here shouldn't be error
    };
}

var field1: string;
class Test1 {
    constructor(private field1: string) {
    }
    messageHandler = () => {
        console.log(field1); // But this should be error as the field1 will resolve to var field1 
                             // but since this code would be generated inside constructor, in generated js
                             // it would resolve to private field1 and that's not what user intended here. 
    };
    static staticMessageHandler = () => {
        console.log(field1); // This shouldn't be error as its a static property
    };
}