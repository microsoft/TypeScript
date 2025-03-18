//// [tests/cases/compiler/aliasUsageInArray.ts] ////

//// [aliasUsageInArray_backbone.ts]
export class Model {
    public someData: string;
}

//// [aliasUsageInArray_moduleA.ts]
import Backbone = require("./aliasUsageInArray_backbone");
export class VisualizationModel extends Backbone.Model {
    // interesting stuff here
}

//// [aliasUsageInArray_main.ts]
import Backbone = require("./aliasUsageInArray_backbone");
import moduleA = require("./aliasUsageInArray_moduleA");
interface IHasVisualizationModel {
    VisualizationModel: typeof Backbone.Model;
}

var xs: IHasVisualizationModel[] = [moduleA];
var xs2: typeof moduleA[] = [moduleA];

//// [aliasUsageInArray_backbone.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
class Model {
    someData;
}
exports.Model = Model;
//// [aliasUsageInArray_moduleA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisualizationModel = void 0;
const Backbone = require("./aliasUsageInArray_backbone");
class VisualizationModel extends Backbone.Model {
}
exports.VisualizationModel = VisualizationModel;
//// [aliasUsageInArray_main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moduleA = require("./aliasUsageInArray_moduleA");
var xs = [moduleA];
var xs2 = [moduleA];
