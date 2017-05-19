// @module: commonjs
// @Filename: aliasUsageInVarAssignment_backbone.ts
export class Model {
    public someData: string;
}

// @Filename: aliasUsageInVarAssignment_moduleA.ts
import Backbone = require("./aliasUsageInVarAssignment_backbone");
export class VisualizationModel extends Backbone.Model {
    // interesting stuff here
}

// @Filename: aliasUsageInVarAssignment_main.ts
import Backbone = require("./aliasUsageInVarAssignment_backbone");
import moduleA = require("./aliasUsageInVarAssignment_moduleA");
interface IHasVisualizationModel {
    VisualizationModel: typeof Backbone.Model;
}
var i: IHasVisualizationModel;
var m: typeof moduleA = i;