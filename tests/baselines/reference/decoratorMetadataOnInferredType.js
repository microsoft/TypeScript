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
var A = (function () {
    function A() {
        console.log('new A');
    }
    return A;
}());
function decorator(target, propertyKey) {
}
var B = (function () {
    function B() {
        this.x = new A();
    }
    return B;
}());
__decorate([
    decorator,
    __metadata("design:type", Object)
], B.prototype, "x", void 0);
exports.B = B;
