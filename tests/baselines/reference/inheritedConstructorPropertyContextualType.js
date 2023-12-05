//// [tests/cases/compiler/inheritedConstructorPropertyContextualType.ts] ////

//// [inheritedConstructorPropertyContextualType.ts]
interface State {
    version: 2
}
declare class Base<S> {
    state: S
}
class Assignment extends Base<State> {
    constructor() {
        super()
        this.state = { version: 2 }
    }
}

//// [inheritedConstructorPropertyContextualType.js]
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
var Assignment = /** @class */ (function (_super) {
    __extends(Assignment, _super);
    function Assignment() {
        var _this = _super.call(this) || this;
        _this.state = { version: 2 };
        return _this;
    }
    return Assignment;
}(Base));
