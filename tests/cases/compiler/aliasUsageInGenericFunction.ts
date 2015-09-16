// @module: commonjs
// @Filename: aliasUsageInGenericFunction_backbone.ts
export class Model {
    public someData: string;
}

// @Filename: aliasUsageInGenericFunction_moduleA.ts
import Backbone = require("./aliasUsageInGenericFunction_backbone");
export class VisualizationModel extends Backbone.Model {
    // interesting stuff here
}

// @Filename: aliasUsageInGenericFunction_main.ts
import Backbone = require("./aliasUsageInGenericFunction_backbone");
import moduleA = require("./aliasUsageInGenericFunction_moduleA");
interface IHasVisualizationModel {
    VisualizationModel: typeof Backbone.Model;
}
function foo<T extends { a: IHasVisualizationModel }>(x: T) {
    return x;
}
var r = foo({ a: moduleA });
var r2 = foo({ a: <IHasVisualizationModel>null });
