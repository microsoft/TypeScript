import * as Harness from "./_namespaces/Harness.js";
import * as ts from "./_namespaces/ts.js";

// NOTE: The contents of this file are all exported from the namespace 'documents'. This is to
//       support the eventual conversion of harness into a modular system.

export class TextDocument {
    public readonly meta: Map<string, string>;
    public readonly file: string;
    public readonly text: string;

    private _lineStarts: readonly number[] | undefined;
    private _testFile: Harness.Compiler.TestFile | undefined;

    constructor(file: string, text: string, meta?: Map<string, string>) {
        this.file = file;
        this.text = text;
        this.meta = meta || new Map<string, string>();
    }

    public get lineStarts(): readonly number[] {
        return this._lineStarts || (this._lineStarts = ts.computeLineStarts(this.text));
    }

    public static fromTestFile(file: Harness.Compiler.TestFile): TextDocument {
        return new TextDocument(
            file.unitName,
            file.content,
            file.fileOptions && Object.keys(file.fileOptions)
                .reduce((meta, key) => meta.set(key, file.fileOptions[key]), new Map<string, string>()),
        );
    }

    public asTestFile(): Harness.Compiler.TestFile {
        return this._testFile || (this._testFile = {
            unitName: this.file,
            content: this.text,
            fileOptions: ts.arrayFrom(this.meta)
                .reduce((obj, [key, value]) => (obj[key] = value, obj), {} as Record<string, string>),
        });
    }
}

export interface RawSourceMap {
    version: number;
    file: string;
    sourceRoot?: string;
    sources: string[];
    sourcesContent?: string[];
    names: string[];
    mappings: string;
}

export interface Mapping {
    mappingIndex: number;
    emittedLine: number;
    emittedColumn: number;
    sourceIndex: number;
    sourceLine: number;
    sourceColumn: number;
    nameIndex?: number;
}

export class SourceMap {
    public readonly raw: RawSourceMap;
    public readonly mapFile: string | undefined;
    public readonly version: number;
    public readonly file: string;
    public readonly sourceRoot: string | undefined;
    public readonly sources: readonly string[] = [];
    public readonly sourcesContent: readonly string[] | undefined;
    public readonly mappings: readonly Mapping[] = [];
    public readonly names: readonly string[] | undefined;

    private static readonly _mappingRegExp = /([A-Z0-9+/]+),?|(;)|./gi;
    private static readonly _sourceMappingURLRegExp = /^\/\/[#@]\s*sourceMappingURL\s*=\s*(.*?)\s*$/gim;
    private static readonly _dataURLRegExp = /^data:application\/json;base64,([a-z0-9+/=]+)$/i;
    private static readonly _base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    private _emittedLineMappings: Mapping[][] = [];
    private _sourceLineMappings: Mapping[][][] = [];

    constructor(mapFile: string | undefined, data: string | RawSourceMap) {
        this.raw = typeof data === "string" ? JSON.parse(data) as RawSourceMap : data;
        this.mapFile = mapFile;
        this.version = this.raw.version;
        this.file = this.raw.file;
        this.sourceRoot = this.raw.sourceRoot;
        this.sources = this.raw.sources;
        this.sourcesContent = this.raw.sourcesContent;
        this.names = this.raw.names;

        // populate mappings
        const mappings: Mapping[] = [];
        let emittedLine = 0;
        let emittedColumn = 0;
        let sourceIndex = 0;
        let sourceLine = 0;
        let sourceColumn = 0;
        let nameIndex = 0;
        let match: RegExpExecArray | null; // eslint-disable-line no-restricted-syntax
        while (match = SourceMap._mappingRegExp.exec(this.raw.mappings)) {
            if (match[1]) {
                const segment = SourceMap._decodeVLQ(match[1]);
                if (segment.length !== 1 && segment.length !== 4 && segment.length !== 5) {
                    throw new Error("Invalid VLQ");
                }

                emittedColumn += segment[0];
                if (segment.length >= 4) {
                    sourceIndex += segment[1];
                    sourceLine += segment[2];
                    sourceColumn += segment[3];
                }

                const mapping: Mapping = { mappingIndex: mappings.length, emittedLine, emittedColumn, sourceIndex, sourceLine, sourceColumn };
                if (segment.length === 5) {
                    nameIndex += segment[4];
                    mapping.nameIndex = nameIndex;
                }

                mappings.push(mapping);

                const mappingsForEmittedLine = this._emittedLineMappings[mapping.emittedLine] || (this._emittedLineMappings[mapping.emittedLine] = []);
                mappingsForEmittedLine.push(mapping);

                const mappingsForSource = this._sourceLineMappings[mapping.sourceIndex] || (this._sourceLineMappings[mapping.sourceIndex] = []);
                const mappingsForSourceLine = mappingsForSource[mapping.sourceLine] || (mappingsForSource[mapping.sourceLine] = []);
                mappingsForSourceLine.push(mapping);
            }
            else if (match[2]) {
                emittedLine++;
                emittedColumn = 0;
            }
            else {
                throw new Error(`Unrecognized character '${match[0]}'.`);
            }
        }

        this.mappings = mappings;
    }

    public static getUrl(text: string): string | undefined {
        let match: RegExpExecArray | null; // eslint-disable-line no-restricted-syntax
        let lastMatch: RegExpExecArray | undefined;
        while (match = SourceMap._sourceMappingURLRegExp.exec(text)) {
            lastMatch = match;
        }
        return lastMatch ? lastMatch[1] : undefined;
    }

    public static fromUrl(url: string): SourceMap | undefined {
        const match = SourceMap._dataURLRegExp.exec(url);
        return match ? new SourceMap(/*mapFile*/ undefined, ts.sys.base64decode!(match[1])) : undefined;
    }

    public static fromSource(text: string): SourceMap | undefined {
        const url = this.getUrl(text);
        return url === undefined ? undefined : this.fromUrl(url);
    }

    public getMappingsForEmittedLine(emittedLine: number): readonly Mapping[] | undefined {
        return this._emittedLineMappings[emittedLine];
    }

    public getMappingsForSourceLine(sourceIndex: number, sourceLine: number): readonly Mapping[] | undefined {
        const mappingsForSource = this._sourceLineMappings[sourceIndex];
        return mappingsForSource && mappingsForSource[sourceLine];
    }

    private static _decodeVLQ(text: string): number[] {
        const vlq: number[] = [];
        let shift = 0;
        let value = 0;
        for (let i = 0; i < text.length; i++) {
            const currentByte = SourceMap._base64Chars.indexOf(text.charAt(i));
            value += (currentByte & 31) << shift;
            if ((currentByte & 32) === 0) {
                vlq.push(value & 1 ? -(value >>> 1) : value >>> 1);
                shift = 0;
                value = 0;
            }
            else {
                shift += 5;
            }
        }
        return vlq;
    }
}
