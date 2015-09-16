// @module: commonjs
// @Filename: aliasUsageInOrExpression_backbone.ts
export class Model {
    public someData: string;
}

// @Filename: aliasUsageInOrExpression_moduleA.ts
import Backbone = require("./aliasUsageInOrExpression_backbone");
export class VisualizationModel extends Backbone.Model {
    // interesting stuff here
}

// @Filename: aliasUsageInOrExpression_main.ts
import Backbone = require("./aliasUsageInOrExpression_backbone");
import moduleA = require("./aliasUsageInOrExpression_moduleA");
interface IHasVisualizationModel {
    VisualizationModel: typeof Backbone.Model;
}
var i: IHasVisualizationModel;
var d1 = i || moduleA;
var d2: IHasVisualizationModel = i || moduleA;
var d2: IHasVisualizationModel = moduleA || i;
var e: { x: IHasVisualizationModel } = <{ x: IHasVisualizationModel }>null || { x: moduleA };
var f: { x: IHasVisualizationModel } = <{ x: IHasVisualizationModel }>null ? { x: moduleA } : null;