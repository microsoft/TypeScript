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
var Model = (function () {
    function Model() {
    }
    return Model;
})();
exports.Model = Model;
//// [aliasUsageInObjectLiteral_moduleA.js]
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Backbone = require("./aliasUsageInObjectLiteral_backbone");
var VisualizationModel = (function (_super) {
    __extends(VisualizationModel, _super);
    function VisualizationModel() {
        _super.apply(this, arguments);
    }
    return VisualizationModel;
})(Backbone.Model);
exports.VisualizationModel = VisualizationModel;
//// [aliasUsageInObjectLiteral_main.js]
"use strict";
var moduleA = require("./aliasUsageInObjectLiteral_moduleA");
var a = { x: moduleA };
var b = { x: moduleA };
var c = { y: { z: moduleA } };
