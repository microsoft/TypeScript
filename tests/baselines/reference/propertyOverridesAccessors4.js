//// [propertyOverridesAccessors4.ts]
declare class Animal {
    get sound(): string
    set sound(val: string)
}
class Lion extends Animal {
    sound = 'RAWR!' // error here
}


//// [propertyOverridesAccessors4.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Lion = /** @class */ (function (_super) {
    __extends(Lion, _super);
    function Lion() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        Object.defineProperty(_this, "sound", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'RAWR!'
        }); // error here
        return _this;
    }
    return Lion;
}(Animal));
