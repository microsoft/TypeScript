//// [tests/cases/compiler/aliasUsageInVarAssignment.ts] ////

//// [aliasUsageInVarAssignment_backbone.ts]
export class Model {
    public someData: string;
}

//// [aliasUsageInVarAssignment_moduleA.ts]
import Backbone = require("./aliasUsageInVarAssignment_backbone");
export class VisualizationModel extends Backbone.Model {
    // interesting stuff here
}

//// [aliasUsageInVarAssignment_main.ts]
import Backbone = require("./aliasUsageInVarAssignment_backbone");
import moduleA = require("./aliasUsageInVarAssignment_moduleA");
interface IHasVisualizationModel {
    VisualizationModel: typeof Backbone.Model;
}
var i: IHasVisualizationModel;
var m: typeof moduleA = i;

//// [aliasUsageInVarAssignment_backbone.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
class Model {
    someData;
}
exports.Model = Model;
//// [aliasUsageInVarAssignment_moduleA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisualizationModel = void 0;
const Backbone = require("./aliasUsageInVarAssignment_backbone");
class VisualizationModel extends Backbone.Model {
}
exports.VisualizationModel = VisualizationModel;
//// [aliasUsageInVarAssignment_main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var i;
var m = i;
