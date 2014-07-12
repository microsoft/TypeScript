//// [undeclaredModuleError.js]
define(["require", "exports", 'fs'], function(require, exports, fs) {
    function readdir(path, accept, callback) {
    }

    function join() {
        var paths = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            paths[_i] = arguments[_i + 0];
        }
    }

    function instrumentFile(covFileDir, covFileName, originalFilePath) {
        fs.readFile(originalFilePath, function () {
            readdir(covFileDir, function () {
            }, function (error, files) {
                files.forEach(function (file) {
                    var fullPath = join(IDoNotExist);
                });
            });
        });
    }
});
