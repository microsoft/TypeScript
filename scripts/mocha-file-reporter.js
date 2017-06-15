var Mocha = require('mocha');
var path = require('path');
var fs = require('fs');

exports = module.exports = FileReporter;

function FileReporter(runner, options) {
    if (!runner) return;
    options = options || {};

    var reporterOptions = this.reporterOptions = options.reporterOptions || {};
    reporterOptions.file = reporterOptions.file || ".failed-tests";
    reporterOptions.keepFailed = reporterOptions.keepFailed || false;
    if (reporterOptions.reporter) {
        var _reporter;
        if (typeof reporterOptions.reporter === "function") {
            _reporter = reporterOptions.reporter;
        }
        else if (Mocha.reporters[reporterOptions.reporter]) {
            _reporter = Mocha.reporters[reporterOptions.reporter];
        }
        else {
            try {
                _reporter = require(reporterOptions.reporter);
            }
            catch (err) {
                _reporter = require(path.resolve(process.cwd(), reporterOptions.reporter));
            }
        }

        var newOptions = {};
        for (var p in options) newOptions[p] = options[p];
        newOptions.reporterOptions = reporterOptions.reporterOptions || {};
        this.reporter = new _reporter(runner, newOptions);
    }

    var failures = this.failures = [];
    var tests = this.tests = [];
    runner.on('test end', function (test) {
        tests.push(test);
    })
    runner.on('fail', function (test, err) {
        failures.push(test);
    });
}

FileReporter.prototype.done = function (numFailures, fn) {
    FileReporter.writeFailures(this.reporterOptions.file, this.failures, this.reporterOptions.keepFailed || this.tests.length === 0, done);

    function done(err) {
        var reporter = this.reporter;
        if (reporter && reporter.done) {
            reporter.done(numFailures, fn);
        }
        else {
            if (fn) fn(numFailures);
        }

        if (err) console.error(err);
    }
}

FileReporter.writeFailures = function (fileName, failures, keepFailed, fn) {
    if (keepFailed) {
        fn();
        return;
    }
    if (failures.length) {
        var failed = failures.map(function (test) { return escapeRegExp(test.fullTitle()); }).join("|");
        fs.writeFile(fileName, "--grep " + failed, "utf8", fn);
    }
    else {
        fs.unlink(fileName, function () { fn(); });
    }
};

var reservedCharacterRegExp = /[^\w]/g;
function escapeRegExp(pattern) {
    return pattern.replace(reservedCharacterRegExp, function (match) { return "\\" + match; });
}