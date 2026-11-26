//// [tests/cases/compiler/classMemberInitializerWithLamdaScoping2.ts] ////

//// [classMemberInitializerWithLamdaScoping2_0.ts]
var field1: string;

//// [classMemberInitializerWithLamdaScoping2_1.ts]
declare var console: {
    log(msg?: any): void;
};
class Test1 {
    constructor(private field1: string) {
    }
    messageHandler = () => {
        console.log(field1); // But this should be error as the field1 will resolve to var field1 
                             // but since this code would be generated inside constructor, in generated js
                             // it would resolve to private field1 and thats not what user intended here. 
    };
}

//// [classMemberInitializerWithLamdaScoping2_0.js]
"use strict";
var field1;
//// [classMemberInitializerWithLamdaScoping2_1.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
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
