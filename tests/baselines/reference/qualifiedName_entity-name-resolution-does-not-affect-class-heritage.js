//// [qualifiedName_entity-name-resolution-does-not-affect-class-heritage.ts]
module Alpha {
    export var x = 100;
}

class Beta extends Alpha.x {
}

//// [qualifiedName_entity-name-resolution-does-not-affect-class-heritage.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Alpha;
(function (Alpha) {
    Alpha.x = 100;
})(Alpha || (Alpha = {}));
var Beta = (function (_super) {
    __extends(Beta, _super);
    function Beta() {
        _super.apply(this, arguments);
    }
    return Beta;
}(Alpha.x));
