export = FailedTestsReporter;
/** @typedef {{
    file?: string;
    keepFailed?: boolean;
    reporter?: Mocha.ReporterConstructor | keyof Mocha.reporters;
    reporterOptions?: any;
}} ReporterOptions */
/**
 * .failed-tests reporter
 *
 * @property {string} [file]
 * @property {boolean} [keepFailed]
 * @property {string|Mocha.ReporterConstructor} [reporter]
 * @property {*} [reporterOptions]
 */
declare class FailedTestsReporter extends Mocha.reporters.Base {
    /**
     * @param {string} file
     * @param {ReadonlyArray<Mocha.Test>} passes
     * @param {ReadonlyArray<Mocha.Test | Mocha.Hook>} failures
     * @param {boolean} keepFailed
     * @param {(err?: NodeJS.ErrnoException | null) => void} done
     */
    static writeFailures(file: string, passes: ReadonlyArray<Mocha.Test>, failures: ReadonlyArray<Mocha.Test | Mocha.Hook>, keepFailed: boolean, done: (err?: NodeJS.ErrnoException | null) => void): void;
    /**
     * @param {Mocha.Runner} runner
     * @param {{ reporterOptions?: ReporterOptions }} [options]
     */
    constructor(runner: Mocha.Runner, options?: {
        reporterOptions?: ReporterOptions | undefined;
    } | undefined);
    reporterOptions: ReporterOptions | undefined;
    reporter: Mocha.reporters.Base | undefined;
    /** @type {Mocha.Test[]} */
    passes: Mocha.Test[];
    /**
     * @param {number} failures
     * @param {(failures: number) => void} [fn]
     * @override
     */
    override done(failures: number, fn?: ((failures: number) => void) | undefined): void;
}
declare namespace FailedTestsReporter {
    export { ReporterOptions };
}
import Mocha = require("mocha");
type ReporterOptions = {
    file?: string;
    keepFailed?: boolean;
    reporter?: Mocha.ReporterConstructor | keyof typeof Mocha.reporters;
    reporterOptions?: any;
};
