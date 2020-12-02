define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.RM = void 0;
    var RM = /** @class */ (function () {
        function RM() {
        }
        var proto_1 = RM.prototype;
        proto_1.getName = function () {
            return 'rm';
        };
        proto_1.getDescription = function () {
            return "\t\t\tDelete file";
        };
        proto_1.run = function (configuration) {
            var absoluteWorkspacePath = configuration.workspace.toAbsolutePath(configuration.server);
        };
        return RM;
    }());
    exports.RM = RM;
});
