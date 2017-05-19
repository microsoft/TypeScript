//// [tests/cases/compiler/classMemberInitializerWithLamdaScoping4.ts] ////

//// [classMemberInitializerWithLamdaScoping3_0.ts]
export var field1: string;

//// [classMemberInitializerWithLamdaScoping3_1.ts]
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

//// [classMemberInitializerWithLamdaScoping3_0.js]
"use strict";
exports.__esModule = true;
//// [classMemberInitializerWithLamdaScoping3_1.js]
"use strict";
exports.__esModule = true;
var Test1 = (function () {
    function Test1(field1) {
        this.field1 = field1;
        this.messageHandler = function () {
            console.log(field1); // Should be error that couldnt find symbol field1
        };
    }
    return Test1;
}());
exports.Test1 = Test1;
