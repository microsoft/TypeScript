// @ts-check
const Mocha = require("mocha");
const path = require("path");
const fs = require("fs");
const os = require("os");

/**
 * .failed-tests reporter
 * 
 * @typedef {Object} ReporterOptions
 * @property {string} [file]
 * @property {boolean} [keepFailed]
 * @property {string|Mocha.ReporterConstructor} [reporter]
 * @property {*} [reporterOptions]
 */
class FailedTestsReporter extends Mocha.reporters.Base {
    /**
     * @param {Mocha.Runner} runner 
     * @param {{ reporterOptions?: ReporterOptions }} [options]
     */
    constructor(runner, options) {
        super(runner, options);
        if (!runner) return;

        const reporterOptions = this.reporterOptions = options.reporterOptions || {};
        if (reporterOptions.file === undefined) reporterOptions.file = ".failed-tests";
        if (reporterOptions.keepFailed === undefined) reporterOptions.keepFailed = false;
        if (reporterOptions.reporter) {
            /** @type {Mocha.ReporterConstructor} */
            let reporter;
            if (typeof reporterOptions.reporter === "function") {
                reporter = reporterOptions.reporter;
            }
            else if (Mocha.reporters[reporterOptions.reporter]) {
                reporter = Mocha.reporters[reporterOptions.reporter];
            }
            else {
                try {
                    reporter = require(reporterOptions.reporter);
                }
                catch (_) {
                    reporter = require(path.resolve(process.cwd(), reporterOptions.reporter));
                }
            }

            const newOptions = Object.assign({}, options, { reporterOptions: reporterOptions.reporterOptions || {} });
            this.reporter = new reporter(runner, newOptions);
        }

        /** @type {Mocha.Test[]} */
        this.passes = [];
        
        /** @type {Mocha.Test[]} */
        this.failures = [];
        
        runner.on("pass", test => this.passes.push(test));
        runner.on("fail", test => this.failures.push(test));
    }

    /**
     * @param {string} file 
     * @param {ReadonlyArray<Mocha.Test>} passes 
     * @param {ReadonlyArray<Mocha.Test>} failures 
     * @param {boolean} keepFailed 
     * @param {(err?: NodeJS.ErrnoException) => void} done 
     */
    static writeFailures(file, passes, failures, keepFailed, done) {
        const failingTests = new Set(fs.existsSync(file) ? readTests() : undefined);
        if (failingTests.size > 0) {
            for (const test of passes) {
                const title = test.fullTitle().trim();
                if (title) failingTests.delete(title);
            }
        }
        for (const test of failures) {
            const title = test.fullTitle().trim();
            if (title) failingTests.add(title);
        }
        if (failingTests.size > 0) {
            const failed = Array.from(failingTests).join(os.EOL);
            fs.writeFile(file, failed, "utf8", done);
        }
        else if (!keepFailed) {
            fs.unlink(file, done);
        }
        else {
            done();
        }

        function readTests() {
            return fs.readFileSync(file, "utf8")
                .split(/\r?\n/g)
                .map(line => line.trim())
                .filter(line => line.length > 0);
        }
    }

    /**
     * @param {number} failures 
     * @param {(failures: number) => void} [fn]
     */
    done(failures, fn) {
        FailedTestsReporter.writeFailures(this.reporterOptions.file, this.passes, this.failures, this.reporterOptions.keepFailed || this.stats.tests === 0, (err) => {
            const reporter = this.reporter;
            if (reporter && reporter.done) {
                reporter.done(failures, fn);
            }
            else if (fn) {
                fn(failures);
            }

            if (err) console.error(err);
        });
    }
}

module.exports = FailedTestsReporter;