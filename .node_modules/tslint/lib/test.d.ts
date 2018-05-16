import { Logger } from "./runner";
import { LintError } from "./verify/lintError";
export interface TestOutput {
    skipped: false;
    errorsFromLinter: LintError[];
    errorsFromMarkup: LintError[];
    fixesFromLinter: string;
    fixesFromMarkup: string;
    markupFromLinter: string;
    markupFromMarkup: string;
}
export interface SkippedTest {
    skipped: true;
    requirement: string;
}
export interface TestResult {
    directory: string;
    results: {
        [fileName: string]: TestOutput | SkippedTest;
    };
}
export declare function runTests(patterns: string[], rulesDirectory?: string | string[]): TestResult[];
export declare function runTest(testDirectory: string, rulesDirectory?: string | string[]): TestResult;
export declare function consoleTestResultsHandler(testResults: TestResult[], logger: Logger): boolean;
export declare function consoleTestResultHandler(testResult: TestResult, logger: Logger): boolean;
