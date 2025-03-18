//// [tests/cases/compiler/aliasUsageInGenericFunction.ts] ////

//// [aliasUsageInGenericFunction_backbone.ts]
export class Model {
    public someData: string;
}

//// [aliasUsageInGenericFunction_moduleA.ts]
import Backbone = require("./aliasUsageInGenericFunction_backbone");
export class VisualizationModel extends Backbone.Model {
    // interesting stuff here
}

//// [aliasUsageInGenericFunction_main.ts]
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


//// [aliasUsageInGenericFunction_backbone.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
class Model {
    someData;
}
exports.Model = Model;
//// [aliasUsageInGenericFunction_moduleA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisualizationModel = void 0;
const Backbone = require("./aliasUsageInGenericFunction_backbone");
class VisualizationModel extends Backbone.Model {
}
exports.VisualizationModel = VisualizationModel;
//// [aliasUsageInGenericFunction_main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moduleA = require("./aliasUsageInGenericFunction_moduleA");
function foo(x) {
    return x;
}
var r = foo({ a: moduleA });
var r2 = foo({ a: null });
