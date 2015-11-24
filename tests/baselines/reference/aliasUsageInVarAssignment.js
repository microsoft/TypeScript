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
"use strict";
var Model = (function () {
    function Model() {
    }
    return Model;
})();
exports.Model = Model;
//// [aliasUsageInVarAssignment_moduleA.js]
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
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
"use strict";
var i;
var m = i;
