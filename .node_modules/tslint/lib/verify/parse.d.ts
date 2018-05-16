import { LintError } from "./lintError";
export declare function getTypescriptVersionRequirement(text: string): string | undefined;
export declare function getNormalizedTypescriptVersion(): string;
export declare function preprocessDirectives(text: string): string;
/**
 * Takes the full text of a .lint file and returns the contents of the file
 * with all error markup removed
 */
export declare function removeErrorMarkup(text: string): string;
/**
 * Takes the full text of a .lint file and returns an array of LintErrors
 * corresponding to the error markup in the file.
 */
export declare function parseErrorsFromMarkup(text: string): LintError[];
export declare function createMarkupFromErrors(code: string, lintErrors: LintError[]): string;
