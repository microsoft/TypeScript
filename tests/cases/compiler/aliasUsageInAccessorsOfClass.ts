// @module: commonjs
// @target: ES5
// @Filename: aliasUsage1_backbone.ts
export class Model {
    public someData: string;
}

// @Filename: aliasUsage1_moduleA.ts
import Backbone = require("./aliasUsage1_backbone");
export class VisualizationModel extends Backbone.Model {
    // interesting stuff here
}

// @Filename: aliasUsage1_main.ts
import Backbone = require("./aliasUsage1_backbone");
import moduleA = require("./aliasUsage1_moduleA");
interface IHasVisualizationModel {
    VisualizationModel: typeof Backbone.Model;
}
class C2 {
    x: IHasVisualizationModel;
    get A() {
        return this.x;
    }
    set A(x) {
        x = moduleA;
    }
}