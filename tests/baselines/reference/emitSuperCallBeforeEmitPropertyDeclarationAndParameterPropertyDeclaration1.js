//// [emitSuperCallBeforeEmitPropertyDeclarationAndParameterPropertyDeclaration1.ts]
class A {
    blub = 6;
}


class B extends A {
    blah = 2;
    constructor(public x: number) {
        "use strict";
        'someStringForEgngInject';
        super()
    }
}

//// [emitSuperCallBeforeEmitPropertyDeclarationAndParameterPropertyDeclaration1.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function () {
    function A() {
        this.blub = 6;
    }
    return A;
}());
var B = (function (_super) {
    __extends(B, _super);
    function B(x) {
        "use strict";
        'someStringForEgngInject';
        _super.call(this);
        this.x = x;
        this.blah = 2;
    }
    return B;
}(A));
