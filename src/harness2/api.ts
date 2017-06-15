// This file contains the minimal definitions for TypeScript needed to host the
// compiler for the purpose of running tests.

// Re-export the built compiler using a CommonJS-style export. This is necessary as we
// want 'api' to masquerade as a minimal surface for the built compiler without
// taking a compile-time dependency to avoid long compilation times.
module.exports = require("../../built/local/typescript.js");

export interface MapLike<T> {
    [index: string]: T | undefined;
}

export interface DiagnosticMessageChain {
    messageText: string;
    category: number;
    code: number;
    next?: DiagnosticMessageChain;
}

export interface Diagnostic {
    file: SourceFile | undefined;
    start: number | undefined;
    length: number | undefined;
    messageText: string | DiagnosticMessageChain;
    category: number;
    code: number;
    source?: string;
}

export interface PluginImport {
    name: string;
}

export interface CommandLineOptionBase {
    name: string;
    type: "string" | "number" | "boolean" | "object" | "list" | Map<string, number | string>;
}

export interface CommandLineOptionOfPrimitiveType extends CommandLineOptionBase {
    type: "string" | "number" | "boolean";
}

export interface CommandLineOptionOfCustomType extends CommandLineOptionBase {
    type: Map<string, number | string>;  // an object literal mapping named values to actual values
}

export interface CommandLineOptionOfListType extends CommandLineOptionBase {
    type: "list";
    element: CommandLineOptionOfCustomType | CommandLineOptionOfPrimitiveType;
}

export type CommandLineOption = CommandLineOptionOfCustomType | CommandLineOptionOfPrimitiveType | CommandLineOptionOfListType;

export type CompilerOptionsValue = string | number | boolean | (string | number)[] | string[] | MapLike<string[]> | PluginImport[];

export interface CompilerOptions {
    declaration?: boolean;
    declarationDir?: string;
    inlineSourceMap?: boolean;
    mapRoot?: string;
    newLine?: NewLineKind;
    noEmitOnError?: boolean;
    noEmit?: boolean;
    noErrorTruncation?: boolean;
    out?: string;
    outDir?: string;
    outFile?: string;
    skipDefaultLibCheck?: boolean;
    sourceMap?: boolean;
    target?: ScriptTarget;
    traceResoluton?: boolean;
    [option: string]: CompilerOptionsValue | undefined;
}

export interface ParsedCommandLine {
    options: CompilerOptions;
    fileNames: string[];
    errors: Diagnostic[];
}

export interface SourceMapSpan {
    emittedLine: number;
    emittedColumn: number;
    sourceLine: number;
    sourceColumn: number;
    sourceIndex: number;
    nameIndex?: number;
}

export interface SourceMapData {
    jsSourceMappingURL: string;
    inputSourceFileNames: string[];
    sourceMapFilePath: string;
    sourceMapFile: string;
    sourceMapSourceRoot: string;
    sourceMapSources: string[];
    sourceMapSourcesContent?: string[];
    sourceMapNames?: string[];
    sourceMapMappings: string;
    sourceMapDecodedMappings: SourceMapSpan[];
}

export interface EmitResult {
    emitSkipped: boolean;
    diagnostics: Diagnostic[];
    emittedFiles: string[];
    sourceMaps: SourceMapData[];
}

export interface ModuleResolutionHost {
    fileExists(fileName: string): boolean;
    readFile(fileName: string): string | undefined;
    trace?(s: string): void;
    directoryExists?(directoryName: string): boolean;
    realpath?(path: string): string;
    getCurrentDirectory?(): string;
    getDirectories?(path: string): string[];
}

export interface ScriptReferenceHost {
    getCompilerOptions(): CompilerOptions;
    getSourceFile(fileName: string): SourceFile | undefined;
    getSourceFileByPath(path: string): SourceFile | undefined;
    getCurrentDirectory(): string;
}

export interface ParseConfigHost {
    useCaseSensitiveFileNames: boolean;
    readDirectory(rootDir: string, extensions: string[], excludes: string[], includes: string[]): string[];
    fileExists(path: string): boolean;
    readFile(path: string): string | undefined;
}

export interface CompilerHost extends ModuleResolutionHost {
    getSourceFile(fileName: string, languageVersion: number, onError?: (message: string) => void): SourceFile | undefined;
    getDefaultLibFileName(options: CompilerOptions): string;
    getDefaultLibLocation(): string;
    writeFile(fileName: string, data: string, writeByteOrderMark: boolean, onError?: (message: string) => void, sourceFiles?: SourceFile[]): void;
    getCurrentDirectory(): string;
    getDirectories(path: string): string[];
    getCanonicalFileName(fileName: string): string;
    useCaseSensitiveFileNames(): boolean;
    getNewLine(): string;
}

export interface Program extends ScriptReferenceHost {
    getRootFileNames(): string[];
    getSourceFiles(): SourceFile[];
    emit(): EmitResult;
    getOptionsDiagnostics(): Diagnostic[];
    getGlobalDiagnostics(): Diagnostic[];
    getSyntacticDiagnostics(): Diagnostic[];
    getSemanticDiagnostics(): Diagnostic[];
    getDeclarationDiagnostics(): Diagnostic[];
    // getTypeChecker(): TypeChecker;

    getCommonSourceDirectory(): string;
}

export interface SourceFile {
    fileName: string;
    text: string;
}

export interface TypesAndSymbols {
    line: number;
    text: string;
    type: string | undefined;
    symbol: string | undefined;
    declarations: { fileName: string, line: number, character: number }[] | undefined;
}

export interface FormatDiagnosticsHost {
    getCurrentDirectory(): string;
    getCanonicalFileName(fileName: string): string;
    getNewLine(): string;
}

export declare enum DiagnosticCategory {
}

export declare enum ScriptTarget {
    ES3,
    ES5,
    ES2015,
    ES2016,
    ES2017,
    ESNext
}

export declare enum NewLineKind {
    CarriageReturnLineFeed
}

export declare namespace Debug {
    const isDebugging: boolean;
    function enableDebugInfo(): void;
}

export declare const optionDeclarations: CommandLineOption[];
export declare function compareDiagnostics(d1: Diagnostic, d2: Diagnostic): number;
export declare function fixupCompilerOptions(options: CompilerOptions, diagnostics: Diagnostic[]): CompilerOptions;
export declare function flattenDiagnosticMessageText(messageText: string | DiagnosticMessageChain, newLine: string): string;
export declare function formatDiagnostics(diagnostics: Diagnostic[], host: FormatDiagnosticsHost): string;
export declare function getDefaultLibFileName(options: CompilerOptions): string;
export declare function parseConfigFileTextToJson(fileName: string, jsonText: string, stripComments?: boolean): { config?: any; error?: Diagnostic };
export declare function parseJsonConfigFileContent(json: any, host: ParseConfigHost, basePath: string, existingOptions?: CompilerOptions, configFileName?: string): ParsedCommandLine;
export declare function parseListTypeOption(opt: CommandLineOptionOfListType, value: string | undefined, errors: Diagnostic[]): (string | number)[] | undefined;
export declare function parseCustomTypeOption(opt: CommandLineOptionOfCustomType, value: string, errors: Diagnostic[]): string | number | undefined;
export declare function createProgram(rootNames: string[], options: CompilerOptions, host?: CompilerHost, oldProgram?: Program): Program;
export declare function getPreEmitDiagnostics(program: Program): Diagnostic[];
export declare function createSourceFile(fileName: string, sourceText: string, languageVersion: number, setParentNodes?: boolean): SourceFile;
export declare function matchFiles(path: string, extensions: string[], excludes: string[], includes: string[], useCaseSensitiveFileNames: boolean, currentDirectory: string, getFileSystemEntries: (path: string) => { files: string[], directories: string[] }): string[];
export declare function getTypesAndSymbols(program: Program, fileName: string, checked: boolean, exclude: "types" | "symbols" | undefined): TypesAndSymbols[];
export declare function getOutputExtension(sourceFile: SourceFile, options: CompilerOptions): string;