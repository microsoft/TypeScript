//// [tests/cases/compiler/decoratorMetadataWithConstructorType.ts] ////

//// [decoratorMetadataWithConstructorType.ts]
declare var console: {
    log(msg: string): void;
};

class A {
    constructor() { console.log('new A'); }
}

function decorator(target: Object, propertyKey: string) {
}

export class B {
    @decorator
    x: A = new A();
}


//// [decoratorMetadataWithConstructorType.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = void 0;
class A {
    constructor() { console.log('new A'); }
}
function decorator(target, propertyKey) {
}
class B {
    @decorator
    x = new A();
}
exports.B = B;
