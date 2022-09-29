export type ReporterOptions = {
    file?: string;
    keepFailed?: boolean;
    reporter?: Mocha.ReporterConstructor | keyof typeof Mocha.reporters;
    reporterOptions?: any;
};
import Mocha = require("mocha");
