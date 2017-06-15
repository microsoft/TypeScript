import { isTypeScriptFile, isJavaScriptFile, isDeclarationFile, isSourceMapFile, isJsonFile, computeLineStarts } from "./utils";

export class TextDocument {
    public readonly meta: Map<string, string>;
    public readonly file: string;
    public readonly text: string;

    private _lineStarts: number[] | undefined;

    constructor(file: string, content: string, meta?: Map<string, string>) {
        this.file = file;
        this.text = content;
        this.meta = meta || new Map<string, string>();
    }

    public get lineStarts(): number[] {
        return this._lineStarts || (this._lineStarts = computeLineStarts(this.text));
    }
}

export function isTypeScriptDocument(document: TextDocument) {
    return isTypeScriptFile(document.file);
}

export function isJavaScriptDocument(document: TextDocument) {
    return isJavaScriptFile(document.file);
}

export function isDeclarationDocument(document: TextDocument) {
    return isDeclarationFile(document.file);
}

export function isSourceMapDocument(document: TextDocument) {
    return isSourceMapFile(document.file);
}

export function isJsonDocument(document: TextDocument) {
    return isJsonFile(document.file);
}