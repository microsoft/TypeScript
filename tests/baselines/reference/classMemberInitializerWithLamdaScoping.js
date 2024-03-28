//// [tests/cases/compiler/classMemberInitializerWithLamdaScoping.ts] ////

//// [classMemberInitializerWithLamdaScoping.ts]
declare var console: {
    log(msg?: any): void;
};
class Test {
    constructor(private field: string) {
    }
    messageHandler = () => {
        var field = this.field;
        console.log(field); // Using field here shouldnt be error
    };
    static field: number;
    static staticMessageHandler = () => {
        var field = Test.field;
        console.log(field); // Using field here shouldnt be error
    };
}

var field1: string;
class Test1 {
    constructor(private field1: string) {
    }
    messageHandler = () => {
        console.log(field1); // But this should be error as the field1 will resolve to var field1 
                             // but since this code would be generated inside constructor, in generated js
                             // it would resolve to private field1 and thats not what user intended here. 
    };
    static staticMessageHandler = () => {
        console.log(field1); // This shouldnt be error as its a static property
    };
}

//// [classMemberInitializerWithLamdaScoping.js]
var Test = /** @class */ (function () {
    function Test(field) {
        var _this = this;
        this.field = field;
        this.messageHandler = function () {
            var field = _this.field;
            console.log(field); // Using field here shouldnt be error
        };
    }
    Test.staticMessageHandler = function () {
        var field = Test.field;
        console.log(field); // Using field here shouldnt be error
    };
    return Test;
}());
var field1;
var Test1 = /** @class */ (function () {
    function Test1(field1) {
        this.field1 = field1;
        this.messageHandler = function () {
            console.log(field1); // But this should be error as the field1 will resolve to var field1 
            // but since this code would be generated inside constructor, in generated js
            // it would resolve to private field1 and thats not what user intended here. 
        };
    }
    Test1.staticMessageHandler = function () {
        console.log(field1); // This shouldnt be error as its a static property
    };
    return Test1;
}());
