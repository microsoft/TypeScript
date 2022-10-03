// @module: commonjs
// @Filename: aliasUsageInFunctionExpression_backbone.ts
export class Model {
    public someData: string;
}

// @Filename: aliasUsageInFunctionExpression_moduleA.ts
import Backbone = require("./aliasUsageInFunctionExpression_backbone");
export class VisualizationModel extends Backbone.Model {
    // interesting stuff here
}

// @Filename: aliasUsageInFunctionExpression_main.ts
import Backbone = require("./aliasUsageInFunctionExpression_backbone");
import moduleA = require("./aliasUsageInFunctionExpression_moduleA");
interface IHasVisualizationModel {
    VisualizationModel: typeof Backbone.Model;
}
var f = (x: IHasVisualizationModel) => x;
f = (x) => moduleA;