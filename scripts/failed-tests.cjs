const assert = require("assert");
const Mocha = require("mocha");
const path = require("path");
const fs = require("fs");
const os = require("os");

/** @typedef {{
    file?: string;
    keepFailed?: boolean;
    reporter?: Mocha.ReporterConstructor | keyof Mocha.reporters;
    reporterOptions?: any;
}} ReporterOptions */
void 0;

/**
 * .failed-tests reporter
 *
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

        const reporterOptions = this.reporterOptions = options?.reporterOptions || {};
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
                catch {
                    reporter = require(path.resolve(process.cwd(), reporterOptions.reporter));
                }
            }

            const newOptions = { ...options, reporterOptions: reporterOptions.reporterOptions || {} };
            if (reporterOptions.reporter === "xunit") {
                newOptions.reporterOptions.output = "TEST-results.xml";
            }
            this.reporter = new reporter(runner, newOptions);
        }

        /** @type {Mocha.Test[]} */
        this.passes = [];

        /** @type {(Mocha.Test)[]} */
        this.failures = [];

        runner.on("pass", test => this.passes.push(test));
        runner.on("fail", test => this.failures.push(test));
    }

    /**
     * @param {string} file
     * @param {ReadonlyArray<Mocha.Test>} passes
     * @param {ReadonlyArray<Mocha.Test | Mocha.Hook>} failures
     * @param {boolean} keepFailed
     * @param {(err?: NodeJS.ErrnoException | null) => void} done
     */
    static writeFailures(file, passes, failures, keepFailed, done) {
        const failingTests = new Set(fs.existsSync(file) ? readTests() : undefined);
        const possiblyPassingSuites = /**@type {Set<string>}*/ (new Set());

        // Remove tests that are now passing and track suites that are now
        // possibly passing.
        if (failingTests.size > 0 && !keepFailed) {
            for (const test of passes) {
                failingTests.delete(test.fullTitle().trim());
                assert(test.parent);
                possiblyPassingSuites.add(test.parent.fullTitle().trim());
            }
        }

        // Add tests that are now failing. If a hook failed, track its
        // containing suite as failing. If the suite for a test or hook was
        // possibly passing then it is now definitely failing.
        for (const test of failures) {
            assert(test.parent);
            const suiteTitle = test.parent.fullTitle().trim();
            if (test.type === "test") {
                failingTests.add(test.fullTitle().trim());
            }
            else {
                failingTests.add(suiteTitle);
            }
            possiblyPassingSuites.delete(suiteTitle);
        }

        // Remove all definitely passing suites.
        for (const suite of possiblyPassingSuites) {
            failingTests.delete(suite);
        }

        if (failingTests.size > 0) {
            const failed = Array
                .from(failingTests)
                .sort()
                .join(os.EOL);
            fs.writeFile(file, failed, "utf8", done);
        }
        else if (!keepFailed && fs.existsSync(file)) {
            fs.unlink(file, done);
        }
        else {
            done();
        }

        function readTests() {
            return fs.readFileSync(file, "utf8")
                .split(/\r?\n/)
                .map(line => line.trim())
                .filter(line => line.length > 0);
        }
    }

    /**
     * @param {number} failures
     * @param {(failures: number) => void} [fn]
     * @override
     */
    done(failures, fn) {
        assert(this.reporterOptions);
        assert(this.reporterOptions.file);
        FailedTestsReporter.writeFailures(this.reporterOptions.file, this.passes, this.failures, this.reporterOptions.keepFailed || this.stats.tests === 0, err => {
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
