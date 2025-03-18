//// [tests/cases/compiler/aliasUsageInObjectLiteral.ts] ////

//// [aliasUsageInObjectLiteral_backbone.ts]
export class Model {
    public someData: string;
}

//// [aliasUsageInObjectLiteral_moduleA.ts]
import Backbone = require("./aliasUsageInObjectLiteral_backbone");
export class VisualizationModel extends Backbone.Model {
    // interesting stuff here
}

//// [aliasUsageInObjectLiteral_main.ts]
import Backbone = require("./aliasUsageInObjectLiteral_backbone");
import moduleA = require("./aliasUsageInObjectLiteral_moduleA");
interface IHasVisualizationModel {
    VisualizationModel: typeof Backbone.Model;
}
var a: { x: typeof moduleA } = { x: moduleA };
var b: { x: IHasVisualizationModel } = { x: moduleA };
var c: { y: { z: IHasVisualizationModel } } = { y: { z: moduleA } };

//// [aliasUsageInObjectLiteral_backbone.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
class Model {
    someData;
}
exports.Model = Model;
//// [aliasUsageInObjectLiteral_moduleA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisualizationModel = void 0;
const Backbone = require("./aliasUsageInObjectLiteral_backbone");
class VisualizationModel extends Backbone.Model {
}
exports.VisualizationModel = VisualizationModel;
//// [aliasUsageInObjectLiteral_main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moduleA = require("./aliasUsageInObjectLiteral_moduleA");
var a = { x: moduleA };
var b = { x: moduleA };
var c = { y: { z: moduleA } };
