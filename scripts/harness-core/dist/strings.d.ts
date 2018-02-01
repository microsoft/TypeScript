export declare function padLeft(text: string, size: number, ch?: string): string;
export declare function padRight(text: string, size: number, ch?: string): string;
export declare function getByteOrderMark(text: string): string;
export declare function getByteOrderMarkLength(text: string): number;
export declare function removeByteOrderMark(text: string): string;
export declare function addUTF8ByteOrderMark(text: string): string;
export declare type LineStarts = ReadonlyArray<number>;
export interface LinesAndLineStarts {
    readonly lines: ReadonlyArray<string>;
    readonly lineStarts: LineStarts;
}
export declare function getLinesAndLineStarts(text: string): LinesAndLineStarts;
export declare function splitLines(text: string, removeEmptyElements?: boolean): string[];
export declare function computeLineStarts(text: string): LineStarts;
