//// [tests/cases/compiler/aliasUsageInObjectLiteral.ts] ////

//// [aliasUsageInObjectLiteral_backbone.ts]
export class Model {
    public someData: string;
}

//// [aliasUsageInObjectLiteral_moduleA.ts]
import Backbone = require("./aliasUsageInObjectLiteral_backbone");
export class VisualizationModel extends Backbone.Model {
    // interesting stuff here
}

//// [aliasUsageInObjectLiteral_main.ts]
import Backbone = require("./aliasUsageInObjectLiteral_backbone");
import moduleA = require("./aliasUsageInObjectLiteral_moduleA");
interface IHasVisualizationModel {
    VisualizationModel: typeof Backbone.Model;
}
var a: { x: typeof moduleA } = { x: moduleA };
var b: { x: IHasVisualizationModel } = { x: moduleA };
var c: { y: { z: IHasVisualizationModel } } = { y: { z: moduleA } };

//// [aliasUsageInObjectLiteral_backbone.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
var Model = /** @class */ (function () {
    function Model() {
    }
    return Model;
}());
exports.Model = Model;
//// [aliasUsageInObjectLiteral_moduleA.js]
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisualizationModel = void 0;
var Backbone = require("./aliasUsageInObjectLiteral_backbone");
var VisualizationModel = /** @class */ (function (_super) {
    __extends(VisualizationModel, _super);
    function VisualizationModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VisualizationModel;
}(Backbone.Model));
exports.VisualizationModel = VisualizationModel;
//// [aliasUsageInObjectLiteral_main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moduleA = require("./aliasUsageInObjectLiteral_moduleA");
var a = { x: moduleA };
var b = { x: moduleA };
var c = { y: { z: moduleA } };
