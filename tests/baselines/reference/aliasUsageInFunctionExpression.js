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
var Model = (function () {
    function Model() {
    }
    return Model;
})();
exports.Model = Model;
//// [aliasUsageInFunctionExpression_moduleA.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Backbone = require("./aliasUsageInFunctionExpression_backbone");
var VisualizationModel = (function (_super) {
    __extends(VisualizationModel, _super);
    function VisualizationModel() {
        _super.apply(this, arguments);
    }
    return VisualizationModel;
})(Backbone.Model);
exports.VisualizationModel = VisualizationModel;
//// [aliasUsageInFunctionExpression_main.js]
var moduleA = require("./aliasUsageInFunctionExpression_moduleA");
var f = function (x) { return x; };
f = function (x) { return moduleA; };
