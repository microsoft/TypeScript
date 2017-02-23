//// [declFileClassExtendsNull.ts]
class ExtendsNull extends null {
}

//// [declFileClassExtendsNull.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ExtendsNull = (function (_super) {
    __extends(ExtendsNull, _super);
    function ExtendsNull() {
    }
    return ExtendsNull;
}(null));


//// [declFileClassExtendsNull.d.ts]
declare class ExtendsNull extends null {
}
