//// [tests/cases/compiler/aliasUsageInFunctionExpression.ts] ////

//// [aliasUsageInFunctionExpression_backbone.ts]
export class Model {
    public someData: string;
}

//// [aliasUsageInFunctionExpression_moduleA.ts]
import Backbone = require("./aliasUsageInFunctionExpression_backbone");
export class VisualizationModel extends Backbone.Model {
    // interesting stuff here
}

//// [aliasUsageInFunctionExpression_main.ts]
import Backbone = require("./aliasUsageInFunctionExpression_backbone");
import moduleA = require("./aliasUsageInFunctionExpression_moduleA");
interface IHasVisualizationModel {
    VisualizationModel: typeof Backbone.Model;
}
var f = (x: IHasVisualizationModel) => x;
f = (x) => moduleA;

//// [aliasUsageInFunctionExpression_backbone.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
var Model = /** @class */ (function () {
    function Model() {
    }
    return Model;
}());
exports.Model = Model;
//// [aliasUsageInFunctionExpression_moduleA.js]
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
var Backbone = require("./aliasUsageInFunctionExpression_backbone");
var VisualizationModel = /** @class */ (function (_super) {
    __extends(VisualizationModel, _super);
    function VisualizationModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VisualizationModel;
}(Backbone.Model));
exports.VisualizationModel = VisualizationModel;
//// [aliasUsageInFunctionExpression_main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moduleA = require("./aliasUsageInFunctionExpression_moduleA");
var f = function (x) { return x; };
f = function (x) { return moduleA; };
