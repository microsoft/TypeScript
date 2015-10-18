//// [tests/cases/compiler/aliasUsageInArray.ts] ////

//// [aliasUsageInArray_backbone.ts]
export class Model {
    public someData: string;
}

//// [aliasUsageInArray_moduleA.ts]
import Backbone = require("./aliasUsageInArray_backbone");
export class VisualizationModel extends Backbone.Model {
    // interesting stuff here
}

//// [aliasUsageInArray_main.ts]
import Backbone = require("./aliasUsageInArray_backbone");
import moduleA = require("./aliasUsageInArray_moduleA");
interface IHasVisualizationModel {
    VisualizationModel: typeof Backbone.Model;
}

var xs: IHasVisualizationModel[] = [moduleA];
var xs2: typeof moduleA[] = [moduleA];

//// [aliasUsageInArray_backbone.js]
var Model = (function () {
    function Model() {
    }
    return Model;
})();
exports.Model = Model;
//// [aliasUsageInArray_moduleA.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Backbone = require("./aliasUsageInArray_backbone");
var VisualizationModel = (function (_super) {
    __extends(VisualizationModel, _super);
    function VisualizationModel() {
        _super.apply(this, arguments);
    }
    return VisualizationModel;
})(Backbone.Model);
exports.VisualizationModel = VisualizationModel;
//// [aliasUsageInArray_main.js]
var moduleA = require("./aliasUsageInArray_moduleA");
var xs = [moduleA];
var xs2 = [moduleA];
