//// [tests/cases/compiler/aliasUsageInTypeArgumentOfExtendsClause.ts] ////

//// [aliasUsageInTypeArgumentOfExtendsClause_backbone.ts]
export class Model {
    public someData: string;
}

//// [aliasUsageInTypeArgumentOfExtendsClause_moduleA.ts]
import Backbone = require("./aliasUsageInTypeArgumentOfExtendsClause_backbone");
export class VisualizationModel extends Backbone.Model {
    // interesting stuff here
}

//// [aliasUsageInTypeArgumentOfExtendsClause_main.ts]
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

//// [aliasUsageInTypeArgumentOfExtendsClause_backbone.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
class Model {
}
exports.Model = Model;
//// [aliasUsageInTypeArgumentOfExtendsClause_moduleA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisualizationModel = void 0;
var Backbone = require("./aliasUsageInTypeArgumentOfExtendsClause_backbone");
class VisualizationModel extends Backbone.Model {
}
exports.VisualizationModel = VisualizationModel;
//// [aliasUsageInTypeArgumentOfExtendsClause_main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moduleA = require("./aliasUsageInTypeArgumentOfExtendsClause_moduleA");
class C {
}
class D extends C {
    constructor() {
        super(...arguments);
        this.x = moduleA;
    }
}
