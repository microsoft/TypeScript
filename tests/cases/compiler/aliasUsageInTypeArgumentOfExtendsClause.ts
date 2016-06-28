// @module: commonjs
// @Filename: aliasUsageInTypeArgumentOfExtendsClause_backbone.ts
export class Model {
    public someData: string;
}

// @Filename: aliasUsageInTypeArgumentOfExtendsClause_moduleA.ts
import Backbone = require("./aliasUsageInTypeArgumentOfExtendsClause_backbone");
export class VisualizationModel extends Backbone.Model {
    // interesting stuff here
}

// @Filename: aliasUsageInTypeArgumentOfExtendsClause_main.ts
import Backbone = require("./aliasUsageInTypeArgumentOfExtendsClause_backbone");
import moduleA = require("./aliasUsageInTypeArgumentOfExtendsClause_moduleA");
interface IHasVisualizationModel {
    VisualizationModel: typeof Backbone.Model;
}
class C<T extends IHasVisualizationModel> {
    x: T;
}
class D extends C<IHasVisualizationModel> {
    x = moduleA;
}