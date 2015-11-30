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
var Model = (function () {
    function Model() {
    }
    return Model;
})();
exports.Model = Model;
//// [aliasUsageInFunctionExpression_moduleA.js]
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
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
"use strict";
var moduleA = require("./aliasUsageInFunctionExpression_moduleA");
var f = function (x) { return x; };
f = function (x) { return moduleA; };
