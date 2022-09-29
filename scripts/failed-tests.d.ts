import * as Mocha from "mocha";

export = FailedTestsReporter;

declare class FailedTestsReporter extends Mocha.reporters.Base {
    passes: Mocha.Test[];
    failures: Mocha.Test[];
    reporterOptions: FailedTestsReporter.ReporterOptions;
    reporter?: Mocha.reporters.Base;
    constructor(runner: Mocha.Runner, options?: { reporterOptions?: FailedTestsReporter.ReporterOptions });
    static writeFailures(file: string, passes: readonly Mocha.Test[], failures: readonly Mocha.Test[], keepFailed: boolean, done: (err?: NodeJS.ErrnoException) => void): void;
    done(failures: number, fn?: (failures: number) => void): void;
}

declare namespace FailedTestsReporter {
    interface ReporterOptions {
        file?: string;
        keepFailed?: boolean;
        reporter?: string | Mocha.ReporterConstructor;
        reporterOptions?: any;
    }
}
