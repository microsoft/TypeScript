var Linter = require("tslint");
var fs = require("fs");

function getLinterOptions() {
    return {
        configuration: require("../tslint.json"),
        formatter: "prose",
        formattersDirectory: undefined,
        rulesDirectory: "built/local/tslint"
    };
}

function lintFileContents(options, path, contents) {
    var ll = new Linter(path, contents, options);
    return ll.lint();
}

function lintFileAsync(options, path, cb) {
    fs.readFile(path, "utf8", function (err, contents) {
        if (err) {
            return cb(err);
        }
        var result = lintFileContents(options, path, contents);
        cb(undefined, result);
    });
}

process.on("message", function (data) {
    switch (data.kind) {
        case "file":
            var target = data.name;
            var lintOptions = getLinterOptions();
            lintFileAsync(lintOptions, target, function (err, result) {
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