define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.RM = void 0;
    var RM = /** @class */ (function () {
        function RM() {
        }
        RM.prototype.getName = function () {
            return 'rm';
        };
        RM.prototype.getDescription = function () {
            return "\t\t\tDelete file";
        };
        RM.prototype.run = function (configuration) {
            var absoluteWorkspacePath = configuration.workspace.toAbsolutePath(configuration.server);
        };
        return RM;
    }());
    exports.RM = RM;
});
