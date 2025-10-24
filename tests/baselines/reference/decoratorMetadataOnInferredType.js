//// [tests/cases/compiler/decoratorMetadataOnInferredType.ts] ////

//// [decoratorMetadataOnInferredType.ts]
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
    x = new A();
}


//// [decoratorMetadataOnInferredType.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = void 0;
class A {
    constructor() { console.log('new A'); }
}
function decorator(target, propertyKey) {
}
class B {
    constructor() {
        this.x = new A();
    }
}
exports.B = B;
__decorate([
    decorator,
    __metadata("design:type", Object)
], B.prototype, "x", void 0);
