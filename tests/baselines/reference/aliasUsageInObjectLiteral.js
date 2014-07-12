//// [aliasUsageInObjectLiteral_main.ts]
import Backbone = require("aliasUsageInObjectLiteral_backbone");
import moduleA = require("aliasUsageInObjectLiteral_moduleA");
interface IHasVisualizationModel {
    VisualizationModel: typeof Backbone.Model;
}
var a: { x: typeof moduleA } = { x: moduleA };
var b: { x: IHasVisualizationModel } = { x: moduleA };
var c: { y: { z: IHasVisualizationModel } } = { y: { z: moduleA } };

//// [aliasUsageInObjectLiteral_backbone.js]
var Model = (function () {
    function Model() {
    }
    return Model;
})();
exports.Model = Model;
//// [aliasUsageInObjectLiteral_moduleA.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Backbone = require("aliasUsageInObjectLiteral_backbone");
var VisualizationModel = (function (_super) {
    __extends(VisualizationModel, _super);
    function VisualizationModel() {
        _super.apply(this, arguments);
    }
    return VisualizationModel;
})(Backbone.Model);
exports.VisualizationModel = VisualizationModel;
//// [aliasUsageInObjectLiteral_main.js]
var moduleA = require("aliasUsageInObjectLiteral_moduleA");

var a = { x: moduleA };
var b = { x: moduleA };
var c = { y: { z: moduleA } };
