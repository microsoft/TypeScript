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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
class Model {
}
exports.Model = Model;
//// [aliasUsageInIndexerOfClass_moduleA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisualizationModel = void 0;
var Backbone = require("./aliasUsageInIndexerOfClass_backbone");
class VisualizationModel extends Backbone.Model {
}
exports.VisualizationModel = VisualizationModel;
//// [aliasUsageInIndexerOfClass_main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moduleA = require("./aliasUsageInIndexerOfClass_moduleA");
class N {
    constructor() {
        this.x = moduleA;
    }
}
class N2 {
}
