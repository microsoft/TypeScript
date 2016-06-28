//@module: commonjs
// @Filename: aliasUsageInArray_backbone.ts
export class Model {
    public someData: string;
}

// @Filename: aliasUsageInArray_moduleA.ts
import Backbone = require("./aliasUsageInArray_backbone");
export class VisualizationModel extends Backbone.Model {
    // interesting stuff here
}

// @Filename: aliasUsageInArray_main.ts
import Backbone = require("./aliasUsageInArray_backbone");
import moduleA = require("./aliasUsageInArray_moduleA");
interface IHasVisualizationModel {
    VisualizationModel: typeof Backbone.Model;
}

var xs: IHasVisualizationModel[] = [moduleA];
var xs2: typeof moduleA[] = [moduleA];