import { isLineBreak } from "typescript";
import { CharacterCodes } from "../../compiler/types";
import { TestFile } from "./compiler-run";



/** @internal */
export function computeLineStarts(text: string): number[] {
    const result: number[] = [];
    let pos = 0;
    let lineStart = 0;
    while (pos < text.length) {
        const ch = text.charCodeAt(pos);
        pos++;
        switch (ch) {
            case CharacterCodes.carriageReturn:
                if (text.charCodeAt(pos) === CharacterCodes.lineFeed) {
                    pos++;
                }
            // falls through
            case CharacterCodes.lineFeed:
                result.push(lineStart);
                lineStart = pos;
                break;
            default:
                if (ch > CharacterCodes.maxAsciiCharacter && isLineBreak(ch)) {
                    result.push(lineStart);
                    lineStart = pos;
                }
                break;
        }
    }
    result.push(lineStart);
    return result;
}

export class TextDocument {
    public readonly meta: Map<string, string>;
    public readonly file: string;
    public readonly text: string;

    private _lineStarts: readonly number[] | undefined;
    private _testFile: TestFile | undefined;

    constructor(file: string, text: string, meta?: Map<string, string>) {
        this.file = file;
        this.text = text;
        this.meta = meta || new Map<string, string>();
    }

    public get lineStarts(): readonly number[] {
        return this._lineStarts || (this._lineStarts = computeLineStarts(this.text));
    }

    public static fromTestFile(file: TestFile) {
        return new TextDocument(
            file.unitName,
            file.content,
            file.fileOptions && Object.keys(file.fileOptions)
                .reduce((meta, key) => meta.set(key, file.fileOptions[key]), new Map<string, string>()));
    }

    public asTestFile() {
        return this._testFile || (this._testFile = {
            unitName: this.file,
            content: this.text,
            fileOptions: Array.from(this.meta)
                .reduce((obj, [key, value]) => (obj[key] = value, obj), {} as Record<string, string>)
        });
    }
}