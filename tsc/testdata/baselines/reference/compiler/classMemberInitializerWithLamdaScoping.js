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
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
class Test {
    constructor(field) {
        this.field = field;
        this.messageHandler = __setFunctionName(() => {
            var field = this.field;
            console.log(field); // Using field here shouldnt be error
        }, "messageHandler");
    }
}
Test.staticMessageHandler = __setFunctionName(() => {
    var field = Test.field;
    console.log(field); // Using field here shouldnt be error
}, "staticMessageHandler");
var field1;
class Test1 {
    constructor(field1) {
        this.field1 = field1;
        this.messageHandler = __setFunctionName(() => {
            console.log(field1); // But this should be error as the field1 will resolve to var field1 
            // but since this code would be generated inside constructor, in generated js
            // it would resolve to private field1 and thats not what user intended here. 
        }, "messageHandler");
    }
}
Test1.staticMessageHandler = __setFunctionName(() => {
    console.log(field1); // This shouldnt be error as its a static property
}, "staticMessageHandler");
