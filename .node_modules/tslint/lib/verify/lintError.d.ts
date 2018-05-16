export interface PositionInFile {
    line: number;
    col: number;
}
export interface LintError {
    startPos: PositionInFile;
    endPos: PositionInFile;
    message: string;
}
export declare function errorComparator(err1: LintError, err2: LintError): number;
export declare function lintSyntaxError(message: string): Error;
