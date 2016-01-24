//// [declFileClassExtendsNull.ts]

class ExtendsNull extends null {
}

//// [declFileClassExtendsNull.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ExtendsNull = (function (_super) {
    __extends(ExtendsNull, _super);
    function ExtendsNull() {
        _super.apply(this, arguments);
    }
    return ExtendsNull;
}(null));


//// [declFileClassExtendsNull.d.ts]
declare class ExtendsNull extends null {
}
