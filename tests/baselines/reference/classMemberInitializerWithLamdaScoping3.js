//// [tests/cases/compiler/classMemberInitializerWithLamdaScoping3.ts] ////

//// [classMemberInitializerWithLamdaScoping3_0.ts]
var field1: string;

//// [classMemberInitializerWithLamdaScoping3_1.ts]
declare var console: {
    log(msg?: any): void;
};
export class Test1 {
    constructor(private field1: string) {
    }
    messageHandler = () => {
        console.log(field1); // But this should be error as the field1 will resolve to var field1 
                             // but since this code would be generated inside constructor, in generated js
                             // it would resolve to private field1 and thats not what user intended here. 
    };
}

//// [classMemberInitializerWithLamdaScoping3_0.js]
var field1;
//// [classMemberInitializerWithLamdaScoping3_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test1 = void 0;
var Test1 = /** @class */ (function () {
    function Test1(field1) {
        this.field1 = field1;
        this.messageHandler = function () {
            console.log(field1); // But this should be error as the field1 will resolve to var field1 
            // but since this code would be generated inside constructor, in generated js
            // it would resolve to private field1 and thats not what user intended here. 
        };
    }
    return Test1;
}());
exports.Test1 = Test1;
