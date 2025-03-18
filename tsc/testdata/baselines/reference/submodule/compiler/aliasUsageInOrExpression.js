//// [tests/cases/compiler/aliasUsageInOrExpression.ts] ////

//// [aliasUsageInOrExpression_backbone.ts]
export class Model {
    public someData: string;
}

//// [aliasUsageInOrExpression_moduleA.ts]
import Backbone = require("./aliasUsageInOrExpression_backbone");
export class VisualizationModel extends Backbone.Model {
    // interesting stuff here
}

//// [aliasUsageInOrExpression_main.ts]
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

//// [aliasUsageInOrExpression_backbone.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
class Model {
    someData;
}
exports.Model = Model;
//// [aliasUsageInOrExpression_moduleA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisualizationModel = void 0;
const Backbone = require("./aliasUsageInOrExpression_backbone");
class VisualizationModel extends Backbone.Model {
}
exports.VisualizationModel = VisualizationModel;
//// [aliasUsageInOrExpression_main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moduleA = require("./aliasUsageInOrExpression_moduleA");
var i;
var d1 = i || moduleA;
var d2 = i || moduleA;
var d2 = moduleA || i;
var e = null || { x: moduleA };
var f = null ? { x: moduleA } : null;
