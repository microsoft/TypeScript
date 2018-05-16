export declare class Line {
}
export declare class CodeLine extends Line {
    contents: string;
    constructor(contents: string);
}
export declare class MessageSubstitutionLine extends Line {
    key: string;
    message: string;
    constructor(key: string, message: string);
}
export declare class ErrorLine extends Line {
    startCol: number;
    constructor(startCol: number);
}
export declare class MultilineErrorLine extends ErrorLine {
    constructor(startCol: number);
}
export declare class EndErrorLine extends ErrorLine {
    endCol: number;
    message: string;
    constructor(startCol: number, endCol: number, message: string);
}
export declare const ZERO_LENGTH_ERROR = "~nil";
/**
 * Maps a line of text from a .lint file to an appropriate Line object
 */
export declare function parseLine(text: string): Line;
/**
 * Maps a Line object to a matching line of text that could be in a .lint file.
 * This is almost the inverse of parseLine.
 * If you ran `printLine(parseLine(someText), code)`, the whitespace in the result may be different than in someText
 * @param line - A Line object to convert to text
 * @param code - If line represents error markup, this is the line of code preceding the markup.
 *               Otherwise, this parameter is not required.
 */
export declare function printLine(line: Line, code?: string): string | undefined;
