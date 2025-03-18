//// [tests/cases/compiler/aliasUsageInFunctionExpression.ts] ////

//// [aliasUsageInFunctionExpression_backbone.ts]
export class Model {
    public someData: string;
}

//// [aliasUsageInFunctionExpression_moduleA.ts]
import Backbone = require("./aliasUsageInFunctionExpression_backbone");
export class VisualizationModel extends Backbone.Model {
    // interesting stuff here
}

//// [aliasUsageInFunctionExpression_main.ts]
import Backbone = require("./aliasUsageInFunctionExpression_backbone");
import moduleA = require("./aliasUsageInFunctionExpression_moduleA");
interface IHasVisualizationModel {
    VisualizationModel: typeof Backbone.Model;
}
var f = (x: IHasVisualizationModel) => x;
f = (x) => moduleA;

//// [aliasUsageInFunctionExpression_backbone.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
class Model {
    someData;
}
exports.Model = Model;
//// [aliasUsageInFunctionExpression_moduleA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisualizationModel = void 0;
const Backbone = require("./aliasUsageInFunctionExpression_backbone");
class VisualizationModel extends Backbone.Model {
}
exports.VisualizationModel = VisualizationModel;
//// [aliasUsageInFunctionExpression_main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moduleA = require("./aliasUsageInFunctionExpression_moduleA");
var f = (x) => x;
f = (x) => moduleA;
