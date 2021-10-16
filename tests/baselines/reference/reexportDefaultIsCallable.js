//// [tests/cases/compiler/reexportDefaultIsCallable.ts] ////

//// [schema.d.ts]
export default class Schema {}
//// [reexporter.d.ts]
export { default } from "./schema";
//// [usage.ts]
import Base from "./reexporter";
export default class Mine extends Base {}


//// [usage.js]
"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var reexporter_1 = __importDefault(require("./reexporter"));
var Mine = /** @class */ (function (_super) {
    __extends(Mine, _super);
    function Mine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Mine;
}(reexporter_1["default"]));
exports["default"] = Mine;
