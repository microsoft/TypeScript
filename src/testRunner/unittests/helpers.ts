import * as ts from "../_namespaces/ts";

const enum ChangedPart {
    none = 0,
    references = 1 << 0,
    importsAndExports = 1 << 1,
    program = 1 << 2,
}

export const newLine = "\r\n";

export interface SourceFileWithText extends ts.SourceFile {
    sourceText?: SourceText;
}

export interface NamedSourceText {
    name: string;
    text: SourceText;
}

export interface ProgramWithSourceTexts extends ts.Program {
    sourceTexts?: readonly NamedSourceText[];
    host: TestCompilerHost;
}

export interface TestCompilerHost extends ts.CompilerHost {
    getTrace(): string[];
    clearTrace(): void;
}

export class SourceText implements ts.IScriptSnapshot {
    private fullText: string | undefined;

    constructor(private references: string, private importsAndExports: string, private program: string, private changedPart = ChangedPart.none, private version = 0) {
    }

    static New(references: string, importsAndExports: string, program: string): SourceText {
        ts.Debug.assert(references !== undefined);
        ts.Debug.assert(importsAndExports !== undefined);
        ts.Debug.assert(program !== undefined);
        return new SourceText(references + newLine, importsAndExports + newLine, program || "");
    }

    public getVersion(): number {
        return this.version;
    }

    public updateReferences(newReferences: string): SourceText {
        ts.Debug.assert(newReferences !== undefined);
        return new SourceText(newReferences + newLine, this.importsAndExports, this.program, this.changedPart | ChangedPart.references, this.version + 1);
    }
    public updateImportsAndExports(newImportsAndExports: string): SourceText {
        ts.Debug.assert(newImportsAndExports !== undefined);
        return new SourceText(this.references, newImportsAndExports + newLine, this.program, this.changedPart | ChangedPart.importsAndExports, this.version + 1);
    }
    public updateProgram(newProgram: string): SourceText {
        ts.Debug.assert(newProgram !== undefined);
        return new SourceText(this.references, this.importsAndExports, newProgram, this.changedPart | ChangedPart.program, this.version + 1);
    }

    public getFullText() {
        return this.fullText || (this.fullText = this.references + this.importsAndExports + this.program);
    }

    public getText(start: number, end: number): string {
        return this.getFullText().substring(start, end);
    }

    getLength(): number {
        return this.getFullText().length;
    }

    getChangeRange(oldSnapshot: ts.IScriptSnapshot): ts.TextChangeRange {
        const oldText = oldSnapshot as SourceText;
        let oldSpan: ts.TextSpan;
        let newLength: number;
        switch (oldText.changedPart ^ this.changedPart) {
            case ChangedPart.references:
                oldSpan = ts.createTextSpan(0, oldText.references.length);
                newLength = this.references.length;
                break;
            case ChangedPart.importsAndExports:
                oldSpan = ts.createTextSpan(oldText.references.length, oldText.importsAndExports.length);
                newLength = this.importsAndExports.length;
                break;
            case ChangedPart.program:
                oldSpan = ts.createTextSpan(oldText.references.length + oldText.importsAndExports.length, oldText.program.length);
                newLength = this.program.length;
                break;
            default:
                return ts.Debug.fail("Unexpected change");
        }

        return ts.createTextChangeRange(oldSpan, newLength);
    }
}

function createSourceFileWithText(fileName: string, sourceText: SourceText, target: ts.ScriptTarget) {
    const file = ts.createSourceFile(fileName, sourceText.getFullText(), target) as SourceFileWithText;
    file.sourceText = sourceText;
    file.version = "" + sourceText.getVersion();
    return file;
}

export function createTestCompilerHost(texts: readonly NamedSourceText[], target: ts.ScriptTarget, oldProgram?: ProgramWithSourceTexts, useGetSourceFileByPath?: boolean) {
    const files = ts.arrayToMap(texts, t => t.name, t => {
        if (oldProgram) {
            let oldFile = oldProgram.getSourceFile(t.name) as SourceFileWithText;
            if (oldFile && oldFile.redirectInfo) {
                oldFile = oldFile.redirectInfo.unredirected;
            }
            if (oldFile && oldFile.sourceText!.getVersion() === t.text.getVersion()) {
                return oldFile;
            }
        }
        return createSourceFileWithText(t.name, t.text, target);
    });
    const useCaseSensitiveFileNames = ts.sys && ts.sys.useCaseSensitiveFileNames;
    const getCanonicalFileName = ts.createGetCanonicalFileName(useCaseSensitiveFileNames);
    const trace: string[] = [];
    const result: TestCompilerHost = {
        trace: s => trace.push(s),
        getTrace: () => trace,
        clearTrace: () => trace.length = 0,
        getSourceFile: fileName => files.get(fileName),
        getDefaultLibFileName: () => "lib.d.ts",
        writeFile: ts.notImplemented,
        getCurrentDirectory: () => "",
        getDirectories: () => [],
        getCanonicalFileName,
        useCaseSensitiveFileNames: () => useCaseSensitiveFileNames,
        getNewLine: () => ts.sys ? ts.sys.newLine : newLine,
        fileExists: fileName => files.has(fileName),
        readFile: fileName => {
            const file = files.get(fileName);
            return file && file.text;
        },
    };
    if (useGetSourceFileByPath) {
        const filesByPath = ts.mapEntries(files, (fileName, file) => [ts.toPath(fileName, "", getCanonicalFileName), file]);
        result.getSourceFileByPath = (_fileName, path) => filesByPath.get(path);
    }
    return result;
}

export function newProgram(texts: NamedSourceText[], rootNames: string[], options: ts.CompilerOptions, useGetSourceFileByPath?: boolean): ProgramWithSourceTexts {
    const host = createTestCompilerHost(texts, options.target!, /*oldProgram*/ undefined, useGetSourceFileByPath);
    const program = ts.createProgram(rootNames, options, host) as ProgramWithSourceTexts;
    program.sourceTexts = texts;
    program.host = host;
    return program;
}

export function updateProgram(oldProgram: ProgramWithSourceTexts, rootNames: readonly string[], options: ts.CompilerOptions, updater: (files: NamedSourceText[]) => void, newTexts?: NamedSourceText[], useGetSourceFileByPath?: boolean) {
    if (!newTexts) {
        newTexts = oldProgram.sourceTexts!.slice(0);
    }
    updater(newTexts);
    const host = createTestCompilerHost(newTexts, options.target!, oldProgram, useGetSourceFileByPath);
    const program = ts.createProgram(rootNames, options, host, oldProgram) as ProgramWithSourceTexts;
    program.sourceTexts = newTexts;
    program.host = host;
    return program;
}

export function updateProgramText(files: readonly NamedSourceText[], fileName: string, newProgramText: string) {
    const file = ts.find(files, f => f.name === fileName)!;
    file.text = file.text.updateProgram(newProgramText);
}

export function jsonToReadableText(json: any) {
    return JSON.stringify(json, undefined, 2);
}
