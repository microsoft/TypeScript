//// [missingPropertiesOfClassExpression.ts]
class George extends class { reset() { return this.y; } } {
    constructor() {
        super();
    }
}


//// [missingPropertiesOfClassExpression.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var George = (function (_super) {
    __extends(George, _super);
    function George() {
        _super.call(this);
    }
    return George;
}((function () {
    function class_1() {
    }
    class_1.prototype.reset = function () { return this.y; };
    return class_1;
}())));
