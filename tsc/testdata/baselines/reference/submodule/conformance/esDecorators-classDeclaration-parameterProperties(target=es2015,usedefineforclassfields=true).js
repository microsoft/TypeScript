//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-parameterProperties.ts] ////

//// [esDecorators-classDeclaration-parameterProperties.ts]
declare var bound: any;

class C {
    constructor(private message: string) {}

    @bound speak() {
    }
}


//// [esDecorators-classDeclaration-parameterProperties.js]
"use strict";
class C {
    constructor(message) {
        Object.defineProperty(this, "message", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: message
        });
    }
    speak() {
    }
}
