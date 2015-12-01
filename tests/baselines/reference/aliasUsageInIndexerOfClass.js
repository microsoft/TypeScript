//// [tests/cases/compiler/aliasUsageInIndexerOfClass.ts] ////

//// [aliasUsageInIndexerOfClass_backbone.ts]
export class Model {
    public someData: string;
}

//// [aliasUsageInIndexerOfClass_moduleA.ts]
import Backbone = require("./aliasUsageInIndexerOfClass_backbone");
export class VisualizationModel extends Backbone.Model {
    // interesting stuff here
}

//// [aliasUsageInIndexerOfClass_main.ts]
import Backbone = require("./aliasUsageInIndexerOfClass_backbone");
import moduleA = require("./aliasUsageInIndexerOfClass_moduleA");
interface IHasVisualizationModel {
    VisualizationModel: typeof Backbone.Model;
}
class N {
    [idx: string]: IHasVisualizationModel
    x = moduleA;
}
class N2 {
    [idx: string]: typeof moduleA
    x: IHasVisualizationModel;
}

//// [aliasUsageInIndexerOfClass_backbone.js]
"use strict";
var Model = (function () {
    function Model() {
    }
    return Model;
})();
exports.Model = Model;
//// [aliasUsageInIndexerOfClass_moduleA.js]
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Backbone = require("./aliasUsageInIndexerOfClass_backbone");
var VisualizationModel = (function (_super) {
    __extends(VisualizationModel, _super);
    function VisualizationModel() {
        _super.apply(this, arguments);
    }
    return VisualizationModel;
})(Backbone.Model);
exports.VisualizationModel = VisualizationModel;
//// [aliasUsageInIndexerOfClass_main.js]
"use strict";
var moduleA = require("./aliasUsageInIndexerOfClass_moduleA");
var N = (function () {
    function N() {
        this.x = moduleA;
    }
    return N;
})();
var N2 = (function () {
    function N2() {
    }
    return N2;
})();
