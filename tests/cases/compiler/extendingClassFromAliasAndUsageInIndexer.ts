// @module: commonjs
// @Filename: extendingClassFromAliasAndUsageInIndexer_backbone.ts
export class Model {
    public someData: string;
}

// @Filename: extendingClassFromAliasAndUsageInIndexer_moduleA.ts
import Backbone = require("./extendingClassFromAliasAndUsageInIndexer_backbone");
export class VisualizationModel extends Backbone.Model {
    // interesting stuff here
}

// @Filename: extendingClassFromAliasAndUsageInIndexer_moduleB.ts
import Backbone = require("./extendingClassFromAliasAndUsageInIndexer_backbone");
export class VisualizationModel extends Backbone.Model {
    // different interesting stuff here
}

// @Filename: extendingClassFromAliasAndUsageInIndexer_main.ts
import Backbone = require("./extendingClassFromAliasAndUsageInIndexer_backbone");
import moduleA = require("./extendingClassFromAliasAndUsageInIndexer_moduleA");
import moduleB = require("./extendingClassFromAliasAndUsageInIndexer_moduleB");
interface IHasVisualizationModel {
    VisualizationModel: typeof Backbone.Model;
}
var moduleATyped: IHasVisualizationModel = moduleA;
var moduleMap: { [key: string]: IHasVisualizationModel } = {
    "moduleA": moduleA,
    "moduleB": moduleB
};
var moduleName: string;
var visModel = new moduleMap[moduleName].VisualizationModel();