//// [aliasUsage1_main.ts]
import Backbone = require("aliasUsage1_backbone");
import moduleA = require("aliasUsage1_moduleA");
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
var Model = (function () {
    function Model() {
    }
    return Model;
})();
exports.Model = Model;
//// [aliasUsage1_moduleA.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Backbone = require("aliasUsage1_backbone");
var VisualizationModel = (function (_super) {
    __extends(VisualizationModel, _super);
    function VisualizationModel() {
        _super.apply(this, arguments);
    }
    return VisualizationModel;
})(Backbone.Model);
exports.VisualizationModel = VisualizationModel;
//// [aliasUsage1_main.js]
var moduleA = require("aliasUsage1_moduleA");

var C2 = (function () {
    function C2() {
    }
    Object.defineProperty(C2.prototype, "A", {
        get: function () {
            return this.x;
        },
        set: function (x) {
            x = moduleA;
        },
        enumerable: true,
        configurable: true
    });
    return C2;
})();
