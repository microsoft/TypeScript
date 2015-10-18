//// [tests/cases/compiler/aliasUsageInVarAssignment.ts] ////

//// [aliasUsageInVarAssignment_backbone.ts]
export class Model {
    public someData: string;
}

//// [aliasUsageInVarAssignment_moduleA.ts]
import Backbone = require("./aliasUsageInVarAssignment_backbone");
export class VisualizationModel extends Backbone.Model {
    // interesting stuff here
}

//// [aliasUsageInVarAssignment_main.ts]
import Backbone = require("./aliasUsageInVarAssignment_backbone");
import moduleA = require("./aliasUsageInVarAssignment_moduleA");
interface IHasVisualizationModel {
    VisualizationModel: typeof Backbone.Model;
}
var i: IHasVisualizationModel;
var m: typeof moduleA = i;

//// [aliasUsageInVarAssignment_backbone.js]
var Model = (function () {
    function Model() {
    }
    return Model;
})();
exports.Model = Model;
//// [aliasUsageInVarAssignment_moduleA.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Backbone = require("./aliasUsageInVarAssignment_backbone");
var VisualizationModel = (function (_super) {
    __extends(VisualizationModel, _super);
    function VisualizationModel() {
        _super.apply(this, arguments);
    }
    return VisualizationModel;
})(Backbone.Model);
exports.VisualizationModel = VisualizationModel;
//// [aliasUsageInVarAssignment_main.js]
var i;
var m = i;
