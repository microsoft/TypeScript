//// [cloduleGenericOnSelfMember.ts]
class ServiceBase<T> {
    field: T;
}
class Service extends ServiceBase<typeof Service.Base> {
}
namespace Service {
    export const Base = {
        name: "1",
        value: 5
    };
}

//// [cloduleGenericOnSelfMember.js]
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
var ServiceBase = /** @class */ (function () {
    function ServiceBase() {
    }
    return ServiceBase;
}());
var Service = /** @class */ (function (_super) {
    __extends(Service, _super);
    function Service() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Service;
}(ServiceBase));
(function (Service) {
    Service.Base = {
        name: "1",
        value: 5
    };
})(Service || (Service = {}));
