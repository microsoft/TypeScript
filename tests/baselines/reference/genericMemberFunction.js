//// [genericMemberFunction.js]
define(["require", "exports"], function(require, exports) {
    var BuildError = (function () {
        function BuildError() {
        }
        BuildError.prototype.parent = function () {
            return undefined;
        };
        return BuildError;
    })();
    exports.BuildError = BuildError;
    var FileWithErrors = (function () {
        function FileWithErrors() {
        }
        FileWithErrors.prototype.errors = function () {
            return undefined;
        };
        FileWithErrors.prototype.parent = function () {
            return undefined;
        };
        return FileWithErrors;
    })();
    exports.FileWithErrors = FileWithErrors;
    var BuildResult = (function () {
        function BuildResult() {
        }
        BuildResult.prototype.merge = function (other) {
            var _this = this;
            a.b.c.d.e.f.g = 0;
            removedFiles.forEach(function (each) {
                _this.removeFile(each);
            });
        };
        return BuildResult;
    })();
    exports.BuildResult = BuildResult;
});
