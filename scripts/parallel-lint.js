var tslint = require("tslint");
var fs = require("fs");
var path = require("path");

function getLinterOptions() {
    return {
        formatter: "prose",
        formattersDirectory: undefined,
        rulesDirectory: "built/local/tslint"
    };
}
function getLinterConfiguration() {
    return tslint.Configuration.loadConfigurationFromPath(path.join(__dirname, "../tslint.json"));
}

function lintFileContents(options, configuration, path, contents) {
    var ll = new tslint.Linter(options);
    ll.lint(path, contents, configuration);
    return ll.getResult();
}

function lintFileAsync(options, configuration, path, cb) {
    fs.readFile(path, "utf8", function (err, contents) {
        if (err) {
            return cb(err);
        }
        var result = lintFileContents(options, configuration, path, contents);
        cb(undefined, result);
    });
}

process.on("message", function (data) {
    switch (data.kind) {
        case "file":
            var target = data.name;
            var lintOptions = getLinterOptions();
            var lintConfiguration = getLinterConfiguration();
            lintFileAsync(lintOptions, lintConfiguration, target, function (err, result) {
                if (err) {
                    process.send({ kind: "error", error: err.toString() });
                    return;
                }
                process.send({ kind: "result", failures: result.failureCount, output: result.output });
            });
            break;
        case "close":
            process.exit(0);
            break;
    }
});