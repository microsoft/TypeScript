//// [tests/cases/compiler/aliasUsageInAccessorsOfClass.ts] ////

//// [aliasUsage1_backbone.ts]
export class Model {
    public someData: string;
}

//// [aliasUsage1_moduleA.ts]
import Backbone = require("./aliasUsage1_backbone");
export class VisualizationModel extends Backbone.Model {
    // interesting stuff here
}

//// [aliasUsage1_main.ts]
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

//// [aliasUsage1_backbone.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
class Model {
    someData;
}
exports.Model = Model;
//// [aliasUsage1_moduleA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisualizationModel = void 0;
const Backbone = require("./aliasUsage1_backbone");
class VisualizationModel extends Backbone.Model {
}
exports.VisualizationModel = VisualizationModel;
//// [aliasUsage1_main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moduleA = require("./aliasUsage1_moduleA");
class C2 {
    x;
    get A() {
        return this.x;
    }
    set A(x) {
        x = moduleA;
    }
}
