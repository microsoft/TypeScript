import { FileSystem } from "./vfs";
import { removeByteOrderMark, addUTF8ByteOrderMark, assertInvariants } from "./Utils";
import { dirname, combine, resolve } from "./vpath";
import { matchFiles, FileSystemEntries, notImplemented, generateDjb2Hash, SourceFile, getDefaultCompilerOptions, getNewLineCharacter, CompilerOptions, getDefaultLibFileName, createSourceFile, DiagnosticMessage, Diagnostic, getLocaleSpecificMessage, formatStringFromArgs, isArray, DiagnosticMessageChain, DiagnosticRelatedInformation, ProgramBuildInfoDiagnostic, compareStringsCaseSensitive, isString, BuildInfo, MapLike, getOwnKeys, isBuildInfoFile, getBuildInfo, Debug, getBuildInfoText, BuilderProgram, CreateProgram, createEmitAndSemanticDiagnosticsBuilderProgram, createDiagnosticReporter, sys } from "./ts";
import { TextDocument } from "./documents";
import { SortedMap } from "./collections";
import { lightMode } from "./Harness";
import * as ts from "./ts";
/**
 * Fake implementations of various compiler dependencies.
 */
const processExitSentinel = new Error("System exit");
export interface SystemOptions {
    executingFilePath?: string;
    newLine?: "\r\n" | "\n";
    env?: Record<string, string>;
}
/**
 * A fake `ts.System` that leverages a virtual file system.
 */
export class System implements ts.System {
    public readonly vfs: FileSystem;
    public readonly args: string[] = [];
    public readonly output: string[] = [];
    public readonly newLine: string;
    public readonly useCaseSensitiveFileNames: boolean;
    public exitCode: number | undefined;
    private readonly _executingFilePath: string | undefined;
    private readonly _env: Record<string, string> | undefined;
    constructor(vfs: FileSystem, { executingFilePath, newLine = "\r\n", env }: SystemOptions = {}) {
        this.vfs = vfs.isReadonly ? vfs.shadow() : vfs;
        this.useCaseSensitiveFileNames = !this.vfs.ignoreCase;
        this.newLine = newLine;
        this._executingFilePath = executingFilePath;
        this._env = env;
    }
    public write(message: string) {
        this.output.push(message);
    }
    public readFile(path: string) {
        try {
            const content = this.vfs.readFileSync(path, "utf8");
            return content === undefined ? undefined : removeByteOrderMark(content);
        }
        catch {
            return undefined;
        }
    }
    public writeFile(path: string, data: string, writeByteOrderMark?: boolean): void {
        this.vfs.mkdirpSync(dirname(path));
        this.vfs.writeFileSync(path, writeByteOrderMark ? addUTF8ByteOrderMark(data) : data);
    }
    public deleteFile(path: string) {
        this.vfs.unlinkSync(path);
    }
    public fileExists(path: string) {
        const stats = this._getStats(path);
        return stats ? stats.isFile() : false;
    }
    public directoryExists(path: string) {
        const stats = this._getStats(path);
        return stats ? stats.isDirectory() : false;
    }
    public createDirectory(path: string): void {
        this.vfs.mkdirpSync(path);
    }
    public getCurrentDirectory() {
        return this.vfs.cwd();
    }
    public getDirectories(path: string) {
        const result: string[] = [];
        try {
            for (const file of this.vfs.readdirSync(path)) {
                if (this.vfs.statSync(combine(path, file)).isDirectory()) {
                    result.push(file);
                }
            }
        }
        catch { /*ignore*/ }
        return result;
    }
    public readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[] {
        return matchFiles(path, extensions, exclude, include, this.useCaseSensitiveFileNames, this.getCurrentDirectory(), depth, path => this.getAccessibleFileSystemEntries(path), path => this.realpath(path));
    }
    public getAccessibleFileSystemEntries(path: string): FileSystemEntries {
        const files: string[] = [];
        const directories: string[] = [];
        try {
            for (const file of this.vfs.readdirSync(path)) {
                try {
                    const stats = this.vfs.statSync(combine(path, file));
                    if (stats.isFile()) {
                        files.push(file);
                    }
                    else if (stats.isDirectory()) {
                        directories.push(file);
                    }
                }
                catch { /*ignored*/ }
            }
        }
        catch { /*ignored*/ }
        return { files, directories };
    }
    public exit(exitCode?: number) {
        this.exitCode = exitCode;
        throw processExitSentinel;
    }
    public getFileSize(path: string) {
        const stats = this._getStats(path);
        return stats && stats.isFile() ? stats.size : 0;
    }
    public resolvePath(path: string) {
        return resolve(this.vfs.cwd(), path);
    }
    public getExecutingFilePath() {
        if (this._executingFilePath === undefined)
            return notImplemented();
        return this._executingFilePath;
    }
    public getModifiedTime(path: string) {
        const stats = this._getStats(path);
        return stats ? stats.mtime : undefined!; // TODO: GH#18217
    }
    public setModifiedTime(path: string, time: Date) {
        this.vfs.utimesSync(path, time, time);
    }
    public createHash(data: string): string {
        return `${generateDjb2Hash(data)}-${data}`;
    }
    public realpath(path: string) {
        try {
            return this.vfs.realpathSync(path);
        }
        catch {
            return path;
        }
    }
    public getEnvironmentVariable(name: string): string {
        return (this._env && this._env[name])!; // TODO: GH#18217
    }
    private _getStats(path: string) {
        try {
            return this.vfs.existsSync(path) ? this.vfs.statSync(path) : undefined;
        }
        catch {
            return undefined;
        }
    }
    now() {
        return new Date(this.vfs.time());
    }
}
/**
 * A fake `ts.ParseConfigHost` that leverages a virtual file system.
 */
export class ParseConfigHost implements ts.ParseConfigHost {
    public readonly sys: System;
    constructor(sys: System | FileSystem) {
        if (sys instanceof FileSystem)
            sys = new System(sys);
        this.sys = sys;
    }
    public get vfs() {
        return this.sys.vfs;
    }
    public get useCaseSensitiveFileNames() {
        return this.sys.useCaseSensitiveFileNames;
    }
    public fileExists(fileName: string): boolean {
        return this.sys.fileExists(fileName);
    }
    public directoryExists(directoryName: string): boolean {
        return this.sys.directoryExists(directoryName);
    }
    public readFile(path: string): string | undefined {
        return this.sys.readFile(path);
    }
    public readDirectory(path: string, extensions: string[], excludes: string[], includes: string[], depth: number): string[] {
        return this.sys.readDirectory(path, extensions, excludes, includes, depth);
    }
}
/**
 * A fake `ts.CompilerHost` that leverages a virtual file system.
 */
export class CompilerHost implements ts.CompilerHost {
    public readonly sys: System;
    public readonly defaultLibLocation: string;
    public readonly outputs: TextDocument[] = [];
    private readonly _outputsMap: SortedMap<string, number>;
    public readonly traces: string[] = [];
    public readonly shouldAssertInvariants = !lightMode;
    private _setParentNodes: boolean;
    private _sourceFiles: SortedMap<string, SourceFile>;
    private _parseConfigHost: ParseConfigHost | undefined;
    private _newLine: string;
    constructor(sys: System | FileSystem, options = getDefaultCompilerOptions(), setParentNodes = false) {
        if (sys instanceof FileSystem)
            sys = new System(sys);
        this.sys = sys;
        this.defaultLibLocation = sys.vfs.meta.get("defaultLibLocation") || "";
        this._newLine = getNewLineCharacter(options, () => this.sys.newLine);
        this._sourceFiles = new SortedMap<string, SourceFile>({ comparer: sys.vfs.stringComparer, sort: "insertion" });
        this._setParentNodes = setParentNodes;
        this._outputsMap = new SortedMap(this.vfs.stringComparer);
    }
    public get vfs() {
        return this.sys.vfs;
    }
    public get parseConfigHost() {
        return this._parseConfigHost || (this._parseConfigHost = new ParseConfigHost(this.sys));
    }
    public getCurrentDirectory(): string {
        return this.sys.getCurrentDirectory();
    }
    public useCaseSensitiveFileNames(): boolean {
        return this.sys.useCaseSensitiveFileNames;
    }
    public getNewLine(): string {
        return this._newLine;
    }
    public getCanonicalFileName(fileName: string): string {
        return this.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
    }
    public deleteFile(fileName: string) {
        this.sys.deleteFile(fileName);
    }
    public fileExists(fileName: string): boolean {
        return this.sys.fileExists(fileName);
    }
    public directoryExists(directoryName: string): boolean {
        return this.sys.directoryExists(directoryName);
    }
    public getModifiedTime(fileName: string) {
        return this.sys.getModifiedTime(fileName);
    }
    public setModifiedTime(fileName: string, time: Date) {
        return this.sys.setModifiedTime(fileName, time);
    }
    public getDirectories(path: string): string[] {
        return this.sys.getDirectories(path);
    }
    public readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[] {
        return this.sys.readDirectory(path, extensions, exclude, include, depth);
    }
    public readFile(path: string): string | undefined {
        return this.sys.readFile(path);
    }
    public writeFile(fileName: string, content: string, writeByteOrderMark: boolean) {
        if (writeByteOrderMark)
            content = addUTF8ByteOrderMark(content);
        this.sys.writeFile(fileName, content);
        const document = new TextDocument(fileName, content);
        document.meta.set("fileName", fileName);
        this.vfs.filemeta(fileName).set("document", document);
        if (!this._outputsMap.has(document.file)) {
            this._outputsMap.set(document.file, this.outputs.length);
            this.outputs.push(document);
        }
        this.outputs[this._outputsMap.get(document.file)!] = document;
    }
    public trace(s: string): void {
        this.traces.push(s);
    }
    public realpath(path: string): string {
        return this.sys.realpath(path);
    }
    public getDefaultLibLocation(): string {
        return resolve(this.getCurrentDirectory(), this.defaultLibLocation);
    }
    public getDefaultLibFileName(options: CompilerOptions): string {
        return resolve(this.getDefaultLibLocation(), getDefaultLibFileName(options));
    }
    public getSourceFile(fileName: string, languageVersion: number): SourceFile | undefined {
        const canonicalFileName = this.getCanonicalFileName(resolve(this.getCurrentDirectory(), fileName));
        const existing = this._sourceFiles.get(canonicalFileName);
        if (existing)
            return existing;
        const content = this.readFile(canonicalFileName);
        if (content === undefined)
            return undefined;
        // A virtual file system may shadow another existing virtual file system. This
        // allows us to reuse a common virtual file system structure across multiple
        // tests. If a virtual file is a shadow, it is likely that the file will be
        // reused across multiple tests. In that case, we cache the SourceFile we parse
        // so that it can be reused across multiple tests to avoid the cost of
        // repeatedly parsing the same file over and over (such as lib.d.ts).
        const cacheKey = this.vfs.shadowRoot && `SourceFile[languageVersion=${languageVersion},setParentNodes=${this._setParentNodes}]`;
        if (cacheKey) {
            const meta = this.vfs.filemeta(canonicalFileName);
            const sourceFileFromMetadata = (meta.get(cacheKey) as SourceFile | undefined);
            if (sourceFileFromMetadata && sourceFileFromMetadata.getFullText() === content) {
                this._sourceFiles.set(canonicalFileName, sourceFileFromMetadata);
                return sourceFileFromMetadata;
            }
        }
        const parsed = createSourceFile(fileName, content, languageVersion, this._setParentNodes || this.shouldAssertInvariants);
        if (this.shouldAssertInvariants) {
            assertInvariants(parsed, /*parent*/ undefined);
        }
        this._sourceFiles.set(canonicalFileName, parsed);
        if (cacheKey) {
            // store the cached source file on the unshadowed file with the same version.
            const stats = this.vfs.statSync(canonicalFileName);
            let fs = this.vfs;
            while (fs.shadowRoot) {
                try {
                    const shadowRootStats = fs.shadowRoot.existsSync(canonicalFileName) ? fs.shadowRoot.statSync(canonicalFileName) : undefined!; // TODO: GH#18217
                    if (shadowRootStats.dev !== stats.dev ||
                        shadowRootStats.ino !== stats.ino ||
                        shadowRootStats.mtimeMs !== stats.mtimeMs) {
                        break;
                    }
                    fs = fs.shadowRoot;
                }
                catch {
                    break;
                }
            }
            if (fs !== this.vfs) {
                fs.filemeta(canonicalFileName).set(cacheKey, parsed);
            }
        }
        return parsed;
    }
}
export type ExpectedDiagnosticMessage = [DiagnosticMessage, ...(string | number)[]];
export interface ExpectedDiagnosticMessageChain {
    message: ExpectedDiagnosticMessage;
    next?: ExpectedDiagnosticMessageChain[];
}
export interface ExpectedDiagnosticLocation {
    file: string;
    start: number;
    length: number;
}
export interface ExpectedDiagnosticRelatedInformation extends ExpectedDiagnosticMessageChain {
    location?: ExpectedDiagnosticLocation;
}
export enum DiagnosticKind {
    Error = "Error",
    Status = "Status"
}
export interface ExpectedErrorDiagnostic extends ExpectedDiagnosticRelatedInformation {
    relatedInformation?: ExpectedDiagnosticRelatedInformation[];
}
export type ExpectedDiagnostic = ExpectedDiagnosticMessage | ExpectedErrorDiagnostic;
interface SolutionBuilderDiagnostic {
    kind: DiagnosticKind;
    diagnostic: Diagnostic;
}
function indentedText(indent: number, text: string) {
    if (!indent)
        return text;
    let indentText = "";
    for (let i = 0; i < indent; i++) {
        indentText += "  ";
    }
    return `
${indentText}${text}`;
}
function expectedDiagnosticMessageToText([message, ...args]: ExpectedDiagnosticMessage) {
    let text = getLocaleSpecificMessage(message);
    if (args.length) {
        text = formatStringFromArgs(text, args);
    }
    return text;
}
function expectedDiagnosticMessageChainToText({ message, next }: ExpectedDiagnosticMessageChain, indent = 0) {
    let text = indentedText(indent, expectedDiagnosticMessageToText(message));
    if (next) {
        indent++;
        next.forEach(kid => text += expectedDiagnosticMessageChainToText(kid, indent));
    }
    return text;
}
function expectedDiagnosticRelatedInformationToText({ location, ...diagnosticMessage }: ExpectedDiagnosticRelatedInformation) {
    const text = expectedDiagnosticMessageChainToText(diagnosticMessage);
    if (location) {
        const { file, start, length } = location;
        return `${file}(${start}:${length}):: ${text}`;
    }
    return text;
}
function expectedErrorDiagnosticToText({ relatedInformation, ...diagnosticRelatedInformation }: ExpectedErrorDiagnostic) {
    let text = `${DiagnosticKind.Error}!: ${expectedDiagnosticRelatedInformationToText(diagnosticRelatedInformation)}`;
    if (relatedInformation) {
        for (const kid of relatedInformation) {
            text += `
  related:: ${expectedDiagnosticRelatedInformationToText(kid)}`;
        }
    }
    return text;
}
function expectedDiagnosticToText(errorOrStatus: ExpectedDiagnostic) {
    return isArray(errorOrStatus) ?
        `${DiagnosticKind.Status}!: ${expectedDiagnosticMessageToText(errorOrStatus)}` :
        expectedErrorDiagnosticToText(errorOrStatus);
}
function diagnosticMessageChainToText({ messageText, next }: DiagnosticMessageChain, indent = 0) {
    let text = indentedText(indent, messageText);
    if (next) {
        indent++;
        next.forEach(kid => text += diagnosticMessageChainToText(kid, indent));
    }
    return text;
}
function diagnosticRelatedInformationToText({ file, start, length, messageText }: DiagnosticRelatedInformation) {
    const text = typeof messageText === "string" ?
        messageText :
        diagnosticMessageChainToText(messageText);
    return file ?
        `${file.fileName}(${start}:${length}):: ${text}` :
        text;
}
function diagnosticToText({ kind, diagnostic: { relatedInformation, ...diagnosticRelatedInformation } }: SolutionBuilderDiagnostic) {
    let text = `${kind}!: ${diagnosticRelatedInformationToText(diagnosticRelatedInformation)}`;
    if (relatedInformation) {
        for (const kid of relatedInformation) {
            text += `
  related:: ${diagnosticRelatedInformationToText(kid)}`;
        }
    }
    return text;
}
function compareProgramBuildInfoDiagnostic(a: ProgramBuildInfoDiagnostic, b: ProgramBuildInfoDiagnostic) {
    return compareStringsCaseSensitive(isString(a) ? a : a[0], isString(b) ? b : b[0]);
}
export function sanitizeBuildInfoProgram(buildInfo: BuildInfo) {
    if (buildInfo.program) {
        // reference Map
        if (buildInfo.program.referencedMap) {
            const referencedMap: MapLike<string[]> = {};
            for (const path of getOwnKeys(buildInfo.program.referencedMap).sort()) {
                referencedMap[path] = buildInfo.program.referencedMap[path].sort();
            }
            buildInfo.program.referencedMap = referencedMap;
        }
        // exportedModulesMap
        if (buildInfo.program.exportedModulesMap) {
            const exportedModulesMap: MapLike<string[]> = {};
            for (const path of getOwnKeys(buildInfo.program.exportedModulesMap).sort()) {
                exportedModulesMap[path] = buildInfo.program.exportedModulesMap[path].sort();
            }
            buildInfo.program.exportedModulesMap = exportedModulesMap;
        }
        // semanticDiagnosticsPerFile
        if (buildInfo.program.semanticDiagnosticsPerFile) {
            buildInfo.program.semanticDiagnosticsPerFile.sort(compareProgramBuildInfoDiagnostic);
        }
    }
}
export const version = "FakeTSVersion";
export function patchHostForBuildInfoReadWrite<T extends ts.System>(sys: T) {
    const originalReadFile = sys.readFile;
    sys.readFile = (path, encoding) => {
        const value = originalReadFile.call(sys, path, encoding);
        if (!value || !isBuildInfoFile(path))
            return value;
        const buildInfo = getBuildInfo(value);
        Debug.assert(buildInfo.version === version);
        buildInfo.version = ts.version;
        return getBuildInfoText(buildInfo);
    };
    const originalWrite = sys.write;
    sys.write = msg => originalWrite.call(sys, msg.replace(ts.version, version));
    if (sys.writeFile) {
        const originalWriteFile = sys.writeFile;
        sys.writeFile = (fileName: string, content: string, writeByteOrderMark: boolean) => {
            if (!isBuildInfoFile(fileName))
                return originalWriteFile.call(sys, fileName, content, writeByteOrderMark);
            const buildInfo = getBuildInfo(content);
            sanitizeBuildInfoProgram(buildInfo);
            buildInfo.version = version;
            originalWriteFile.call(sys, fileName, getBuildInfoText(buildInfo), writeByteOrderMark);
        };
    }
    return sys;
}
export class SolutionBuilderHost extends CompilerHost implements ts.SolutionBuilderHost<BuilderProgram> {
    createProgram: CreateProgram<BuilderProgram>;
    private constructor(sys: System | FileSystem, options?: CompilerOptions, setParentNodes?: boolean, createProgram?: CreateProgram<BuilderProgram>) {
        super(sys, options, setParentNodes);
        this.createProgram = createProgram || createEmitAndSemanticDiagnosticsBuilderProgram;
    }
    static create(sys: System | FileSystem, options?: CompilerOptions, setParentNodes?: boolean, createProgram?: CreateProgram<BuilderProgram>) {
        const host = new SolutionBuilderHost(sys, options, setParentNodes, createProgram);
        patchHostForBuildInfoReadWrite(host.sys);
        return host;
    }
    createHash(data: string) {
        return `${generateDjb2Hash(data)}-${data}`;
    }
    diagnostics: SolutionBuilderDiagnostic[] = [];
    reportDiagnostic(diagnostic: Diagnostic) {
        this.diagnostics.push({ kind: DiagnosticKind.Error, diagnostic });
    }
    reportSolutionBuilderStatus(diagnostic: Diagnostic) {
        this.diagnostics.push({ kind: DiagnosticKind.Status, diagnostic });
    }
    clearDiagnostics() {
        this.diagnostics.length = 0;
    }
    assertDiagnosticMessages(...expectedDiagnostics: ExpectedDiagnostic[]) {
        const actual = this.diagnostics.slice().map(diagnosticToText);
        const expected = expectedDiagnostics.map(expectedDiagnosticToText);
        assert.deepEqual(actual, expected, `Diagnostic arrays did not match:
Actual: ${JSON.stringify(actual, /*replacer*/ undefined, " ")}
Expected: ${JSON.stringify(expected, /*replacer*/ undefined, " ")}`);
    }
    assertErrors(...expectedDiagnostics: ExpectedErrorDiagnostic[]) {
        const actual = this.diagnostics.filter(d => d.kind === DiagnosticKind.Error).map(diagnosticToText);
        const expected = expectedDiagnostics.map(expectedDiagnosticToText);
        assert.deepEqual(actual, expected, `Diagnostics arrays did not match:
Actual: ${JSON.stringify(actual, /*replacer*/ undefined, " ")}
Expected: ${JSON.stringify(expected, /*replacer*/ undefined, " ")}
Actual All:: ${JSON.stringify(this.diagnostics.slice().map(diagnosticToText), /*replacer*/ undefined, " ")}`);
    }
    printDiagnostics(header = "== Diagnostics ==") {
        const out = createDiagnosticReporter(sys);
        sys.write(header + "\r\n");
        for (const { diagnostic } of this.diagnostics) {
            out(diagnostic);
        }
    }
    now() {
        return this.sys.now();
    }
}
