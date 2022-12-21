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
var Model = /** @class */ (function () {
    function Model() {
    }
    return Model;
}());
exports.Model = Model;
//// [aliasUsageInOrExpression_moduleA.js]
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisualizationModel = void 0;
var Backbone = require("./aliasUsageInOrExpression_backbone");
var VisualizationModel = /** @class */ (function (_super) {
    __extends(VisualizationModel, _super);
    function VisualizationModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VisualizationModel;
}(Backbone.Model));
exports.VisualizationModel = VisualizationModel;
//// [aliasUsageInOrExpression_main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moduleA = require("./aliasUsageInOrExpression_moduleA");
var i;
var d1 = i || moduleA;
var d2 = i || moduleA;
var d2 = moduleA || i;
var e = null || { x: moduleA };
var f = null ? { x: moduleA } : null;
