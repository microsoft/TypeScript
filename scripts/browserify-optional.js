// simple script to optionally elide source-map-support (or other optional modules) when running browserify.

var stream = require("stream"),
    Transform = stream.Transform,
    resolve = require("browser-resolve");

var requirePattern = /require\s*\(\s*['"](source-map-support)['"]\s*\)/;
module.exports = function (file) {
    return new Transform({
        transform: function (data, encoding, cb) {
            var text = encoding === "buffer" ? data.toString("utf8") : data;
            this.push(new Buffer(text.replace(requirePattern, function (originalText, moduleName) {
                try {
                    resolve.sync(moduleName, { filename: file });
                    return originalText;
                }
                catch (e) {
                    return "(function () { throw new Error(\"module '" + moduleName + "' not found.\"); })()";
                }
            }), "utf8"));
            cb();
        }
    });
};