// @module: commonjs
// @Filename: aliasUsageInObjectLiteral_backbone.ts
export class Model {
    public someData: string;
}

// @Filename: aliasUsageInObjectLiteral_moduleA.ts
import Backbone = require("./aliasUsageInObjectLiteral_backbone");
export class VisualizationModel extends Backbone.Model {
    // interesting stuff here
}

// @Filename: aliasUsageInObjectLiteral_main.ts
import Backbone = require("./aliasUsageInObjectLiteral_backbone");
import moduleA = require("./aliasUsageInObjectLiteral_moduleA");
interface IHasVisualizationModel {
    VisualizationModel: typeof Backbone.Model;
}
var a: { x: typeof moduleA } = { x: moduleA };
var b: { x: IHasVisualizationModel } = { x: moduleA };
var c: { y: { z: IHasVisualizationModel } } = { y: { z: moduleA } };