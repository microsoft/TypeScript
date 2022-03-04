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
exports.__esModule = true;
exports.Model = void 0;
var Model = /** @class */ (function () {
    function Model() {
    }
    return Model;
}());
exports.Model = Model;
//// [aliasUsageInIndexerOfClass_moduleA.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.VisualizationModel = void 0;
var Backbone = require("./aliasUsageInIndexerOfClass_backbone");
var VisualizationModel = /** @class */ (function (_super) {
    __extends(VisualizationModel, _super);
    function VisualizationModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VisualizationModel;
}(Backbone.Model));
exports.VisualizationModel = VisualizationModel;
//// [aliasUsageInIndexerOfClass_main.js]
"use strict";
exports.__esModule = true;
var moduleA = require("./aliasUsageInIndexerOfClass_moduleA");
var N = /** @class */ (function () {
    function N() {
        this.x = moduleA;
    }
    return N;
}());
var N2 = /** @class */ (function () {
    function N2() {
    }
    return N2;
}());
