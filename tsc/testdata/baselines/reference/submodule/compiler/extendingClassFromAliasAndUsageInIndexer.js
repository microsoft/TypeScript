//// [tests/cases/compiler/extendingClassFromAliasAndUsageInIndexer.ts] ////

//// [extendingClassFromAliasAndUsageInIndexer_backbone.ts]
export class Model {
    public someData: string;
}

//// [extendingClassFromAliasAndUsageInIndexer_moduleA.ts]
import Backbone = require("./extendingClassFromAliasAndUsageInIndexer_backbone");
export class VisualizationModel extends Backbone.Model {
    // interesting stuff here
}

//// [extendingClassFromAliasAndUsageInIndexer_moduleB.ts]
import Backbone = require("./extendingClassFromAliasAndUsageInIndexer_backbone");
export class VisualizationModel extends Backbone.Model {
    // different interesting stuff here
}

//// [extendingClassFromAliasAndUsageInIndexer_main.ts]
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

//// [extendingClassFromAliasAndUsageInIndexer_backbone.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
class Model {
    someData;
}
exports.Model = Model;
//// [extendingClassFromAliasAndUsageInIndexer_moduleA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisualizationModel = void 0;
const Backbone = require("./extendingClassFromAliasAndUsageInIndexer_backbone");
class VisualizationModel extends Backbone.Model {
}
exports.VisualizationModel = VisualizationModel;
//// [extendingClassFromAliasAndUsageInIndexer_moduleB.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisualizationModel = void 0;
const Backbone = require("./extendingClassFromAliasAndUsageInIndexer_backbone");
class VisualizationModel extends Backbone.Model {
}
exports.VisualizationModel = VisualizationModel;
//// [extendingClassFromAliasAndUsageInIndexer_main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moduleA = require("./extendingClassFromAliasAndUsageInIndexer_moduleA");
const moduleB = require("./extendingClassFromAliasAndUsageInIndexer_moduleB");
var moduleATyped = moduleA;
var moduleMap = {
    "moduleA": moduleA,
    "moduleB": moduleB
};
var moduleName;
var visModel = new moduleMap[moduleName].VisualizationModel();
