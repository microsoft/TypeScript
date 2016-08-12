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
    fs.readFile(path, "utf8", function(err, contents) {
        if (err) {
            return cb(err);
        }
        process.send({kind: "start", name: path});
        var result = lintFileContents(options, path, contents);
        cb(undefined, result);
    });
}

process.on("message", function(data) {
    switch (data.kind) {
        case "config":
        var files = data.data;
        var done = 0;
        var lintOptions = getLinterOptions();
        files.forEach(function(target) {
            lintFileAsync(lintOptions, target, function(err, result) {
                if (err) {
                    process.send({kind: "error", error: err.toString()});
                    done++;
                    return;
                }
                process.send({kind: "result", failures: result.failureCount, output: result.output});
                done++;
                if (done === files.length) {
                    process.send({kind: "complete"});
                }
            });
        });
    }
});