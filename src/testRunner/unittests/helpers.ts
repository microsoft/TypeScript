import * as ts from "../_namespaces/ts";

const enum ChangedPart {
    none = 0,
    references = 1 << 0,
    importsAndExports = 1 << 1,
    program = 1 << 2
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
}

export class SourceText implements ts.IScriptSnapshot {
    private fullText: string | undefined;

    constructor(private references: string,
        private importsAndExports: string,
        private program: string,
        private changedPart = ChangedPart.none,
        private version = 0) {
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

export function checkResolvedTypeDirective(actual: ts.ResolvedTypeReferenceDirective, expected: ts.ResolvedTypeReferenceDirective) {
    assert.equal(actual.resolvedFileName, expected.resolvedFileName, `'resolvedFileName': expected '${actual.resolvedFileName}' to be equal to '${expected.resolvedFileName}'`);
    assert.equal(actual.primary, expected.primary, `'primary': expected '${actual.primary}' to be equal to '${expected.primary}'`);
    return true;
}

function checkCache<T>(caption: string, program: ts.Program, fileName: string, expectedContent: Map<string, T> | undefined, getCache: (f: ts.SourceFile) => ts.ModeAwareCache<T> | undefined, entryChecker: (expected: T, original: T) => boolean): void {
    const file = program.getSourceFile(fileName);
    assert.isTrue(file !== undefined, `cannot find file ${fileName}`);
    const cache = getCache(file!);
    if (expectedContent === undefined) {
        assert.isTrue(cache === undefined, `expected ${caption} to be undefined`);
    }
    else {
        assert.isTrue(cache !== undefined, `expected ${caption} to be set`);
        assert.isTrue(mapEqualToCache(expectedContent, cache!, entryChecker), `contents of ${caption} did not match the expected contents.`);
    }
}

/** True if the maps have the same keys and values. */
function mapEqualToCache<T>(left: Map<string, T>, right: ts.ModeAwareCache<T>, valuesAreEqual?: (left: T, right: T) => boolean): boolean {
    if (left as any === right) return true; // given the type mismatch (the tests never pass a cache), this'll never be true
    if (!left || !right) return false;
    const someInLeftHasNoMatch = ts.forEachEntry(left, (leftValue, leftKey) => {
        if (!right.has(leftKey, /*mode*/ undefined)) return true;
        const rightValue = right.get(leftKey, /*mode*/ undefined)!;
        return !(valuesAreEqual ? valuesAreEqual(leftValue, rightValue) : leftValue === rightValue);
    });
    if (someInLeftHasNoMatch) return false;
    let someInRightHasNoMatch = false;
    right.forEach((_, rightKey) => someInRightHasNoMatch = someInRightHasNoMatch || !left.has(rightKey));
    return !someInRightHasNoMatch;
}

export function checkResolvedModulesCache(program: ts.Program, fileName: string, expectedContent: Map<string, ts.ResolvedModule | undefined> | undefined): void {
    checkCache("resolved modules", program, fileName, expectedContent, f => f.resolvedModules, checkResolvedModule);
}

export function checkResolvedTypeDirectivesCache(program: ts.Program, fileName: string, expectedContent: Map<string, ts.ResolvedTypeReferenceDirective> | undefined): void {
    checkCache("resolved type directives", program, fileName, expectedContent, f => f.resolvedTypeReferenceDirectiveNames, checkResolvedTypeDirective);
}

export function createResolvedModule(resolvedFileName: string, isExternalLibraryImport = false): ts.ResolvedModuleFull {
    return { resolvedFileName, extension: ts.extensionFromPath(resolvedFileName), isExternalLibraryImport };
}

export function checkResolvedModule(actual: ts.ResolvedModuleFull | undefined, expected: ts.ResolvedModuleFull | undefined): boolean {
    if (!expected) {
        if (actual) {
            assert.fail(actual, expected, "expected resolved module to be undefined");
            return false;
        }
        return true;
    }
    else if (!actual) {
        assert.fail(actual, expected, "expected resolved module to be defined");
        return false;
    }

    assert.isTrue(actual.resolvedFileName === expected.resolvedFileName, `'resolvedFileName': expected '${actual.resolvedFileName}' to be equal to '${expected.resolvedFileName}'`);
    assert.isTrue(actual.extension === expected.extension, `'ext': expected '${actual.extension}' to be equal to '${expected.extension}'`);
    assert.isTrue(actual.isExternalLibraryImport === expected.isExternalLibraryImport, `'isExternalLibraryImport': expected '${actual.isExternalLibraryImport}' to be equal to '${expected.isExternalLibraryImport}'`);
    return true;
}

export function checkResolvedModuleWithFailedLookupLocations(actual: ts.ResolvedModuleWithFailedLookupLocations, expectedResolvedModule: ts.ResolvedModuleFull, expectedFailedLookupLocations: string[]): void {
    assert.isTrue(actual.resolvedModule !== undefined, "module should be resolved");
    checkResolvedModule(actual.resolvedModule, expectedResolvedModule);
    assert.deepEqual(actual.failedLookupLocations, expectedFailedLookupLocations, `Failed lookup locations should match - expected has ${expectedFailedLookupLocations.length}, actual has ${actual.failedLookupLocations.length}`);
}
