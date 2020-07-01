import { RunnerBase } from "./runnerbase";
import { FileSystemEntries, removeFileExtension, compareDiagnostics, getAreDeclarationMapsEnabled, convertToBase64 } from "../compiler/utilities";
import { sys } from "../compiler/sys";
import { compareStringsCaseSensitive, compareStringsCaseInsensitive, createMapFromTemplate, createMap, map, forEach, sort, createGetCanonicalFileName, identity, countWhere, endsWith, flatMap, contains, startsWith, findIndex, arrayFrom, orderedRemoveItemAt, equateStringsCaseInsensitive, hasProperty, find } from "../compiler/core";
import { combinePaths, getNormalizedAbsolutePath, fileExtensionIs, comparePaths, getBaseFileName, normalizeSlashes, toPath, normalizePath, getDirectoryPath } from "../compiler/path";
import { ScriptTarget, SourceFile, CompilerOptions, CommandLineOption, Diagnostic, CommandLineOptionOfCustomType, NewLineKind, Extension, diagnosticCategoryName, DiagnosticWithLocation, TextSpan, Program, CharacterCodes, ScriptKind, ParsedCommandLine, ParseConfigHost } from "../compiler/types";
import { createSourceFile, parseJsonText } from "../compiler/parser";
import { parseListTypeOption, parseCustomTypeOption, textSpanEnd, optionDeclarations, parseJsonSourceFileConfigFileContent } from "../../built/local/compiler";
import { cloneCompilerOptions } from "../services/utilities";
import { assert } from "console";
import { formatDiagnosticsWithColorAndContext, formatDiagnostics, flattenDiagnosticMessageText, formatLocation, ForegroundColorEscapeSequences } from "../compiler/program";
import { getErrorSummaryText, getErrorCountForSummary } from "../compiler/watch";
import { Comparison } from "../compiler/corePublic";
import { computeLineStarts } from "../compiler/scanner";
import { TypeWriterWalker, TypeWriterResult } from "./typeWriter";
import { length } from "mocha";

    export interface IO {
        newLine(): string;
        getCurrentDirectory(): string;
        useCaseSensitiveFileNames(): boolean;
        resolvePath(path: string): string | undefined;
        getFileSize(path: string): number;
        readFile(path: string): string | undefined;
        writeFile(path: string, contents: string): void;
        directoryName(path: string): string | undefined;
        getDirectories(path: string): string[];
        createDirectory(path: string): void;
        fileExists(fileName: string): boolean;
        directoryExists(path: string): boolean;
        deleteFile(fileName: string): void;
        enumerateTestFiles(runner: RunnerBase): (string | FileBasedTest)[];
        listFiles(path: string, filter?: RegExp, options?: { recursive?: boolean }): string[];
        log(text: string): void;
        args(): string[];
        getExecutingFilePath(): string;
        getWorkspaceRoot(): string;
        exit(exitCode?: number): void;
        readDirectory(path: string, extension?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): readonly string[];
        getAccessibleFileSystemEntries(dirname: string): FileSystemEntries;
        tryEnableSourceMapsForHost?(): void;
        getEnvironmentVariable?(name: string): string;
        getMemoryUsage?(): number | undefined;
    }

    export let IO: IO;
    export function setHarnessIO(io: IO) {
        IO = io;
    }

    // harness always uses one kind of new line
    // But note that `parseTestData` in `fourslash.ts` uses "\n"
    export const harnessNewLine = "\r\n";

    // Root for file paths that are stored in a virtual file system
    export const virtualFileSystemRoot = "/";

    function createNodeIO(): IO {
        let fs: any, pathModule: any;
        if (require) {
            fs = require("fs");
            pathModule = require("path");
        }
        else {
            fs = pathModule = {};
        }

        function deleteFile(path: string) {
            try {
                fs.unlinkSync(path);
            }
            catch { /*ignore*/ }
        }

        function directoryName(path: string) {
            const dirPath = pathModule.dirname(path);
            // Node will just continue to repeat the root path, rather than return null
            return dirPath === path ? undefined : dirPath;
        }

        function enumerateTestFiles(runner: RunnerBase) {
            return runner.getTestFiles();
        }

        function listFiles(path: string, spec: RegExp, options: { recursive?: boolean } = {}) {
            function filesInFolder(folder: string): string[] {
                let paths: string[] = [];

                for (const file of fs.readdirSync(folder)) {
                    const pathToFile = pathModule.join(folder, file);
                    const stat = fs.statSync(pathToFile);
                    if (options.recursive && stat.isDirectory()) {
                        paths = paths.concat(filesInFolder(pathToFile));
                    }
                    else if (stat.isFile() && (!spec || file.match(spec))) {
                        paths.push(pathToFile);
                    }
                }

                return paths;
            }

            return filesInFolder(path);
        }

        function getAccessibleFileSystemEntries(dirname: string): FileSystemEntries {
            try {
                const entries: string[] = fs.readdirSync(dirname || ".").sort(sys.useCaseSensitiveFileNames ? compareStringsCaseSensitive : compareStringsCaseInsensitive);
                const files: string[] = [];
                const directories: string[] = [];
                for (const entry of entries) {
                    if (entry === "." || entry === "..") continue;
                    const name = vpath.combine(dirname, entry);
                    try {
                        const stat = fs.statSync(name);
                        if (!stat) continue;
                        if (stat.isFile()) {
                            files.push(entry);
                        }
                        else if (stat.isDirectory()) {
                            directories.push(entry);
                        }
                    }
                    catch { /*ignore*/ }
                }
                return { files, directories };
            }
            catch (e) {
                return { files: [], directories: [] };
            }
        }

        function createDirectory(path: string) {
            try {
                fs.mkdirSync(path);
            }
            catch (e) {
                if (e.code === "ENOENT") {
                    createDirectory(vpath.dirname(path));
                    createDirectory(path);
                }
                else if (!sys.directoryExists(path)) {
                    throw e;
                }
            }
        }

        return {
            newLine: () => harnessNewLine,
            getCurrentDirectory: () => sys.getCurrentDirectory(),
            useCaseSensitiveFileNames: () => sys.useCaseSensitiveFileNames,
            resolvePath: (path: string) => sys.resolvePath(path),
            getFileSize: (path: string) => sys.getFileSize!(path),
            readFile: path => sys.readFile(path),
            writeFile: (path, content) => sys.writeFile(path, content),
            directoryName,
            getDirectories: path => sys.getDirectories(path),
            createDirectory,
            fileExists: path => sys.fileExists(path),
            directoryExists: path => sys.directoryExists(path),
            deleteFile,
            listFiles,
            enumerateTestFiles,
            log: s => console.log(s),
            args: () => sys.args,
            getExecutingFilePath: () => sys.getExecutingFilePath(),
            getWorkspaceRoot: () => vpath.resolve(__dirname, "../.."),
            exit: exitCode => sys.exit(exitCode),
            readDirectory: (path, extension, exclude, include, depth) => sys.readDirectory(path, extension, exclude, include, depth),
            getAccessibleFileSystemEntries,
            tryEnableSourceMapsForHost: () => sys.tryEnableSourceMapsForHost && sys.tryEnableSourceMapsForHost(),
            getMemoryUsage: () => sys.getMemoryUsage && sys.getMemoryUsage(),
            getEnvironmentVariable: name => sys.getEnvironmentVariable(name),
        };
    }

    export function mockHash(s: string): string {
        return `hash-${s}`;
    }

    IO = createNodeIO();

    if (IO.tryEnableSourceMapsForHost && /^development$/i.test(IO.getEnvironmentVariable!("NODE_ENV"))) {
        IO.tryEnableSourceMapsForHost();
    }

    export const libFolder = "built/local/";
    const tcServicesFileName = combinePaths(libFolder, "typescriptServices.js");
    export const tcServicesFile = IO.readFile(tcServicesFileName) + IO.newLine() + `//# sourceURL=${IO.resolvePath(tcServicesFileName)}`;

    export type SourceMapEmitterCallback = (
        emittedFile: string,
        emittedLine: number,
        emittedColumn: number,
        sourceFile: string,
        sourceLine: number,
        sourceColumn: number,
        sourceName: string,
    ) => void;

    // Settings
    /* eslint-disable prefer-const */
    export let userSpecifiedRoot = "";
    export let lightMode = false;
    /* eslint-enable prefer-const */
    export function setLightMode(flag: boolean) {
        lightMode = flag;
    }

    /** Functionality for compiling TypeScript code */
    export namespace Compiler {
        /** Aggregate various writes into a single array of lines. Useful for passing to the
         *  TypeScript compiler to fill with source code or errors.
         */
        export class WriterAggregator {
            public lines: string[] = [];
            public currentLine: string = undefined!;

            public Write(str: string) {
                // out of memory usage concerns avoid using + or += if we're going to do any manipulation of this string later
                this.currentLine = [(this.currentLine || ""), str].join("");
            }

            public WriteLine(str: string) {
                // out of memory usage concerns avoid using + or += if we're going to do any manipulation of this string later
                this.lines.push([(this.currentLine || ""), str].join(""));
                this.currentLine = undefined!;
            }

            public Close() {
                if (this.currentLine !== undefined) { this.lines.push(this.currentLine); }
                this.currentLine = undefined!;
            }

            public reset() {
                this.lines = [];
                this.currentLine = undefined!;
            }
        }

        export function createSourceFileAndAssertInvariants(
            fileName: string,
            sourceText: string,
            languageVersion: ScriptTarget) {
            // We'll only assert invariants outside of light mode.
            const shouldAssertInvariants = !lightMode;

            // Only set the parent nodes if we're asserting invariants.  We don't need them otherwise.
            const result = createSourceFile(fileName, sourceText, languageVersion, /*setParentNodes:*/ shouldAssertInvariants);

            if (shouldAssertInvariants) {
                Utils.assertInvariants(result, /*parent:*/ undefined);
            }

            return result;
        }

        export const defaultLibFileName = "lib.d.ts";
        export const es2015DefaultLibFileName = "lib.es2015.d.ts";

        // Cache of lib files from "built/local"
        let libFileNameSourceFileMap: Map<string, SourceFile> | undefined;

        export function getDefaultLibrarySourceFile(fileName = defaultLibFileName): SourceFile | undefined {
            if (!isDefaultLibraryFile(fileName)) {
                return undefined;
            }

            if (!libFileNameSourceFileMap) {
                libFileNameSourceFileMap = createMapFromTemplate({
                    [defaultLibFileName]: createSourceFileAndAssertInvariants(defaultLibFileName, IO.readFile(libFolder + "lib.es5.d.ts")!, /*languageVersion*/ ScriptTarget.Latest)
                });
            }

            let sourceFile = libFileNameSourceFileMap.get(fileName);
            if (!sourceFile) {
                libFileNameSourceFileMap.set(fileName, sourceFile = createSourceFileAndAssertInvariants(fileName, IO.readFile(libFolder + fileName)!, ScriptTarget.Latest));
            }
            return sourceFile;
        }

        export function getDefaultLibFileName(options: CompilerOptions): string {
            switch (options.target) {
                case ScriptTarget.ESNext:
                case ScriptTarget.ES2017:
                    return "lib.es2017.d.ts";
                case ScriptTarget.ES2016:
                    return "lib.es2016.d.ts";
                case ScriptTarget.ES2015:
                    return es2015DefaultLibFileName;

                default:
                    return defaultLibFileName;
            }
        }

        // Cache these between executions so we don't have to re-parse them for every test
        export const fourslashFileName = "fourslash.ts";
        export let fourslashSourceFile: SourceFile;

        export function getCanonicalFileName(fileName: string): string {
            return fileName;
        }

        interface HarnessOptions {
            useCaseSensitiveFileNames?: boolean;
            includeBuiltFile?: string;
            baselineFile?: string;
            libFiles?: string;
            noTypesAndSymbols?: boolean;
        }

        // Additional options not already in optionDeclarations
        const harnessOptionDeclarations: CommandLineOption[] = [
            { name: "allowNonTsExtensions", type: "boolean" },
            { name: "useCaseSensitiveFileNames", type: "boolean" },
            { name: "baselineFile", type: "string" },
            { name: "includeBuiltFile", type: "string" },
            { name: "fileName", type: "string" },
            { name: "libFiles", type: "string" },
            { name: "noErrorTruncation", type: "boolean" },
            { name: "suppressOutputPathCheck", type: "boolean" },
            { name: "noImplicitReferences", type: "boolean" },
            { name: "currentDirectory", type: "string" },
            { name: "symlink", type: "string" },
            { name: "link", type: "string" },
            { name: "noTypesAndSymbols", type: "boolean" },
            // Emitted js baseline will print full paths for every output file
            { name: "fullEmitPaths", type: "boolean" }
        ];

        let optionsIndex: Map<string, CommandLineOption>;
        function getCommandLineOption(name: string): CommandLineOption | undefined {
            if (!optionsIndex) {
                optionsIndex = createMap<CommandLineOption>();
                const optionDeclarations = harnessOptionDeclarations.concat(optionDeclarations);
                for (const option of optionDeclarations) {
                    optionsIndex.set(option.name.toLowerCase(), option);
                }
            }
            return optionsIndex.get(name.toLowerCase());
        }

        export function setCompilerOptionsFromHarnessSetting(settings: TestCaseParser.CompilerSettings, options: CompilerOptions & HarnessOptions): void {
            for (const name in settings) {
                if (settings.hasOwnProperty(name)) {
                    const value = settings[name];
                    if (value === undefined) {
                        throw new Error(`Cannot have undefined value for compiler option '${name}'.`);
                    }
                    const option = getCommandLineOption(name);
                    if (option) {
                        const errors: Diagnostic[] = [];
                        options[option.name] = optionValue(option, value, errors);
                        if (errors.length > 0) {
                            throw new Error(`Unknown value '${value}' for compiler option '${name}'.`);
                        }
                    }
                    else {
                        throw new Error(`Unknown compiler option '${name}'.`);
                    }
                }
            }
        }

        function optionValue(option: CommandLineOption, value: string, errors: Diagnostic[]): any {
            switch (option.type) {
                case "boolean":
                    return value.toLowerCase() === "true";
                case "string":
                    return value;
                case "number": {
                    const numverValue = parseInt(value, 10);
                    if (isNaN(numverValue)) {
                        throw new Error(`Value must be a number, got: ${JSON.stringify(value)}`);
                    }
                    return numverValue;
                }
                // If not a primitive, the possible types are specified in what is effectively a map of options.
                case "list":
                    return parseListTypeOption(option, value, errors);
                default:
                    return parseCustomTypeOption(<CommandLineOptionOfCustomType>option, value, errors);
            }
        }

        export interface TestFile {
            unitName: string;
            content: string;
            fileOptions?: any;
        }

        export function compileFiles(
            inputFiles: TestFile[],
            otherFiles: TestFile[],
            harnessSettings: TestCaseParser.CompilerSettings | undefined,
            compilerOptions: CompilerOptions | undefined,
            // Current directory is needed for rwcRunner to be able to use currentDirectory defined in json file
            currentDirectory: string | undefined,
            symlinks?: vfs.FileSet
        ): compiler.CompilationResult {
            const options: CompilerOptions & HarnessOptions = compilerOptions ? cloneCompilerOptions(compilerOptions) : { noResolve: false };
            options.target = options.target || ScriptTarget.ES3;
            options.newLine = options.newLine || NewLineKind.CarriageReturnLineFeed;
            options.noErrorTruncation = true;
            options.skipDefaultLibCheck = typeof options.skipDefaultLibCheck === "undefined" ? true : options.skipDefaultLibCheck;

            if (typeof currentDirectory === "undefined") {
                currentDirectory = vfs.srcFolder;
            }

            // Parse settings
            if (harnessSettings) {
                setCompilerOptionsFromHarnessSetting(harnessSettings, options);
            }
            if (options.rootDirs) {
                options.rootDirs = map(options.rootDirs, d => getNormalizedAbsolutePath(d, currentDirectory));
            }

            const useCaseSensitiveFileNames = options.useCaseSensitiveFileNames !== undefined ? options.useCaseSensitiveFileNames : true;
            const programFileNames = inputFiles.map(file => file.unitName).filter(fileName => !fileExtensionIs(fileName, Extension.Json));

            // Files from built\local that are requested by test "@includeBuiltFiles" to be in the context.
            // Treat them as library files, so include them in build, but not in baselines.
            if (options.includeBuiltFile) {
                programFileNames.push(vpath.combine(vfs.builtFolder, options.includeBuiltFile));
            }

            // Files from tests\lib that are requested by "@libFiles"
            if (options.libFiles) {
                for (const fileName of options.libFiles.split(",")) {
                    programFileNames.push(vpath.combine(vfs.testLibFolder, fileName));
                }
            }

            const docs = inputFiles.concat(otherFiles).map(documents.TextDocument.fromTestFile);
            const fs = vfs.createFromFileSystem(IO, !useCaseSensitiveFileNames, { documents: docs, cwd: currentDirectory });
            if (symlinks) {
                fs.apply(symlinks);
            }
            const host = new fakes.CompilerHost(fs, options);
            const result = compiler.compileFiles(host, programFileNames, options);
            result.symlinks = symlinks;
            return result;
        }

        export interface DeclarationCompilationContext {
            declInputFiles: TestFile[];
            declOtherFiles: TestFile[];
            harnessSettings: TestCaseParser.CompilerSettings & HarnessOptions | undefined;
            options: CompilerOptions;
            currentDirectory: string;
        }

        export function prepareDeclarationCompilationContext(inputFiles: readonly TestFile[],
            otherFiles: readonly TestFile[],
            result: compiler.CompilationResult,
            harnessSettings: TestCaseParser.CompilerSettings & HarnessOptions,
            options: CompilerOptions,
            // Current directory is needed for rwcRunner to be able to use currentDirectory defined in json file
            currentDirectory: string | undefined): DeclarationCompilationContext | undefined {

            if (options.declaration && result.diagnostics.length === 0) {
                if (options.emitDeclarationOnly) {
                    if (result.js.size > 0 || result.dts.size === 0) {
                        throw new Error("Only declaration files should be generated when emitDeclarationOnly:true");
                    }
                }
                else if (result.dts.size !== result.getNumberOfJsFiles(/*includeJson*/ false)) {
                    throw new Error("There were no errors and declFiles generated did not match number of js files generated");
                }
            }

            const declInputFiles: TestFile[] = [];
            const declOtherFiles: TestFile[] = [];

            // if the .d.ts is non-empty, confirm it compiles correctly as well
            if (options.declaration && result.diagnostics.length === 0 && result.dts.size > 0) {
                forEach(inputFiles, file => addDtsFile(file, declInputFiles));
                forEach(otherFiles, file => addDtsFile(file, declOtherFiles));
                return { declInputFiles, declOtherFiles, harnessSettings, options, currentDirectory: currentDirectory || harnessSettings.currentDirectory };
            }

            function addDtsFile(file: TestFile, dtsFiles: TestFile[]) {
                if (vpath.isDeclaration(file.unitName) || vpath.isJson(file.unitName)) {
                    dtsFiles.push(file);
                }
                else if (vpath.isTypeScript(file.unitName) || (vpath.isJavaScript(file.unitName) && options.allowJs)) {
                    const declFile = findResultCodeFile(file.unitName);
                    if (declFile && !findUnit(declFile.file, declInputFiles) && !findUnit(declFile.file, declOtherFiles)) {
                        dtsFiles.push({ unitName: declFile.file, content: Utils.removeByteOrderMark(declFile.text) });
                    }
                }
            }

            function findResultCodeFile(fileName: string) {
                const sourceFile = result.program!.getSourceFile(fileName)!;
                assert(sourceFile, "Program has no source file with name '" + fileName + "'");
                // Is this file going to be emitted separately
                let sourceFileName: string;
                const outFile = options.outFile || options.out;
                if (!outFile) {
                    if (options.outDir) {
                        let sourceFilePath = getNormalizedAbsolutePath(sourceFile.fileName, result.vfs.cwd());
                        sourceFilePath = sourceFilePath.replace(result.program!.getCommonSourceDirectory(), "");
                        sourceFileName = combinePaths(options.outDir, sourceFilePath);
                    }
                    else {
                        sourceFileName = sourceFile.fileName;
                    }
                }
                else {
                    // Goes to single --out file
                    sourceFileName = outFile;
                }

                const dTsFileName = removeFileExtension(sourceFileName) + Extension.Dts;
                return result.dts.get(dTsFileName);
            }

            function findUnit(fileName: string, units: TestFile[]) {
                return forEach(units, unit => unit.unitName === fileName ? unit : undefined);
            }
        }

        export function compileDeclarationFiles(context: DeclarationCompilationContext | undefined, symlinks: vfs.FileSet | undefined) {
            if (!context) {
                return;
            }
            const { declInputFiles, declOtherFiles, harnessSettings, options, currentDirectory } = context;
            const output = compileFiles(declInputFiles, declOtherFiles, harnessSettings, options, currentDirectory, symlinks);
            return { declInputFiles, declOtherFiles, declResult: output };
        }

        export function minimalDiagnosticsToString(diagnostics: readonly Diagnostic[], pretty?: boolean) {
            const host = { getCanonicalFileName, getCurrentDirectory: () => "", getNewLine: () => IO.newLine() };
            return (pretty ? formatDiagnosticsWithColorAndContext : formatDiagnostics)(diagnostics, host);
        }

        export function getErrorBaseline(inputFiles: readonly TestFile[], diagnostics: readonly Diagnostic[], pretty?: boolean) {
            let outputLines = "";
            const gen = iterateErrorBaseline(inputFiles, diagnostics, { pretty });
            for (let {done, value} = gen.next(); !done; { done, value } = gen.next()) {
                const [, content] = value;
                outputLines += content;
            }
            if (pretty) {
                outputLines += getErrorSummaryText(getErrorCountForSummary(diagnostics), IO.newLine());
            }
            return outputLines;
        }

        export const diagnosticSummaryMarker = "__diagnosticSummary";
        export const globalErrorsMarker = "__globalErrors";
        export function *iterateErrorBaseline(inputFiles: readonly TestFile[], diagnostics: readonly Diagnostic[], options?: { pretty?: boolean, caseSensitive?: boolean, currentDirectory?: string }): IterableIterator<[string, string, number]> {
            diagnostics = sort(diagnostics, compareDiagnostics);
            let outputLines = "";
            // Count up all errors that were found in files other than lib.d.ts so we don't miss any
            let totalErrorsReportedInNonLibraryFiles = 0;

            let errorsReported = 0;

            let firstLine = true;
            function newLine() {
                if (firstLine) {
                    firstLine = false;
                    return "";
                }
                return "\r\n";
            }

            const formatDiagnsoticHost = {
                getCurrentDirectory: () => options && options.currentDirectory ? options.currentDirectory : "",
                getNewLine: () => IO.newLine(),
                getCanonicalFileName: createGetCanonicalFileName(options && options.caseSensitive !== undefined ? options.caseSensitive : true),
            };

            function outputErrorText(error: Diagnostic) {
                const message = flattenDiagnosticMessageText(error.messageText, IO.newLine());

                const errLines = Utils.removeTestPathPrefixes(message)
                    .split("\n")
                    .map(s => s.length > 0 && s.charAt(s.length - 1) === "\r" ? s.substr(0, s.length - 1) : s)
                    .filter(s => s.length > 0)
                    .map(s => "!!! " + diagnosticCategoryName(error) + " TS" + error.code + ": " + s);
                if (error.relatedInformation) {
                    for (const info of error.relatedInformation) {
                        errLines.push(`!!! related TS${info.code}${info.file ? " " + formatLocation(info.file, info.start!, formatDiagnsoticHost, identity) : ""}: ${flattenDiagnosticMessageText(info.messageText, IO.newLine())}`);
                    }
                }
                errLines.forEach(e => outputLines += (newLine() + e));
                errorsReported++;

                // do not count errors from lib.d.ts here, they are computed separately as numLibraryDiagnostics
                // if lib.d.ts is explicitly included in input files and there are some errors in it (i.e. because of duplicate identifiers)
                // then they will be added twice thus triggering 'total errors' assertion with condition
                // 'totalErrorsReportedInNonLibraryFiles + numLibraryDiagnostics + numTest262HarnessDiagnostics, diagnostics.length

                if (!error.file || !isDefaultLibraryFile(error.file.fileName)) {
                    totalErrorsReportedInNonLibraryFiles++;
                }
            }

            yield [diagnosticSummaryMarker, Utils.removeTestPathPrefixes(minimalDiagnosticsToString(diagnostics, options && options.pretty)) + IO.newLine() + IO.newLine(), diagnostics.length];

            // Report global errors
            const globalErrors = diagnostics.filter(err => !err.file);
            globalErrors.forEach(outputErrorText);
            yield [globalErrorsMarker, outputLines, errorsReported];
            outputLines = "";
            errorsReported = 0;

            // 'merge' the lines of each input file with any errors associated with it
            const dupeCase = createMap<number>();
            for (const inputFile of inputFiles.filter(f => f.content !== undefined)) {
                // Filter down to the errors in the file
                const fileErrors = diagnostics.filter((e): e is DiagnosticWithLocation => {
                    const errFn = e.file;
                    return !!errFn && comparePaths(Utils.removeTestPathPrefixes(errFn.fileName), Utils.removeTestPathPrefixes(inputFile.unitName), options && options.currentDirectory || "", !(options && options.caseSensitive)) === Comparison.EqualTo;
                });


                // Header
                outputLines += (newLine() + "==== " + inputFile.unitName + " (" + fileErrors.length + " errors) ====");

                // Make sure we emit something for every error
                let markedErrorCount = 0;
                // For each line, emit the line followed by any error squiggles matching this line
                // Note: IE JS engine incorrectly handles consecutive delimiters here when using RegExp split, so
                // we have to string-based splitting instead and try to figure out the delimiting chars

                const lineStarts = computeLineStarts(inputFile.content);
                let lines = inputFile.content.split("\n");
                if (lines.length === 1) {
                    lines = lines[0].split("\r");
                }

                lines.forEach((line, lineIndex) => {
                    if (line.length > 0 && line.charAt(line.length - 1) === "\r") {
                        line = line.substr(0, line.length - 1);
                    }

                    const thisLineStart = lineStarts[lineIndex];
                    let nextLineStart: number;
                    // On the last line of the file, fake the next line start number so that we handle errors on the last character of the file correctly
                    if (lineIndex === lines.length - 1) {
                        nextLineStart = inputFile.content.length;
                    }
                    else {
                        nextLineStart = lineStarts[lineIndex + 1];
                    }
                    // Emit this line from the original file
                    outputLines += (newLine() + "    " + line);
                    fileErrors.forEach(errDiagnostic => {
                        const err = errDiagnostic as TextSpan; // TODO: GH#18217
                        // Does any error start or continue on to this line? Emit squiggles
                        const end = textSpanEnd(err);
                        if ((end >= thisLineStart) && ((err.start < nextLineStart) || (lineIndex === lines.length - 1))) {
                            // How many characters from the start of this line the error starts at (could be positive or negative)
                            const relativeOffset = err.start - thisLineStart;
                            // How many characters of the error are on this line (might be longer than this line in reality)
                            const length = (end - err.start) - Math.max(0, thisLineStart - err.start);
                            // Calculate the start of the squiggle
                            const squiggleStart = Math.max(0, relativeOffset);
                            // TODO/REVIEW: this doesn't work quite right in the browser if a multi file test has files whose names are just the right length relative to one another
                            outputLines += (newLine() + "    " + line.substr(0, squiggleStart).replace(/[^\s]/g, " ") + new Array(Math.min(length, line.length - squiggleStart) + 1).join("~"));

                            // If the error ended here, or we're at the end of the file, emit its message
                            if ((lineIndex === lines.length - 1) || nextLineStart > end) {
                                // Just like above, we need to do a split on a string instead of on a regex
                                // because the JS engine does regexes wrong

                                outputErrorText(errDiagnostic);
                                markedErrorCount++;
                            }
                        }
                    });
                });

                // Verify we didn't miss any errors in this file
                assert.equal(markedErrorCount, fileErrors.length, "count of errors in " + inputFile.unitName);
                const isDupe = dupeCase.has(sanitizeTestFilePath(inputFile.unitName));
                yield [checkDuplicatedFileName(inputFile.unitName, dupeCase), outputLines, errorsReported];
                if (isDupe && !(options && options.caseSensitive)) {
                    // Case-duplicated files on a case-insensitive build will have errors reported in both the dupe and the original
                    // thanks to the canse-insensitive path comparison on the error file path - We only want to count those errors once
                    // for the assert below, so we subtract them here.
                    totalErrorsReportedInNonLibraryFiles -= errorsReported;
                }
                outputLines = "";
                errorsReported = 0;
            }

            const numLibraryDiagnostics = countWhere(diagnostics, diagnostic => {
                return !!diagnostic.file && (isDefaultLibraryFile(diagnostic.file.fileName) || isBuiltFile(diagnostic.file.fileName));
            });

            const numTest262HarnessDiagnostics = countWhere(diagnostics, diagnostic => {
                // Count an error generated from tests262-harness folder.This should only apply for test262
                return !!diagnostic.file && diagnostic.file.fileName.indexOf("test262-harness") >= 0;
            });

            // Verify we didn't miss any errors in total
            assert.equal(totalErrorsReportedInNonLibraryFiles + numLibraryDiagnostics + numTest262HarnessDiagnostics, diagnostics.length, "total number of errors");
        }

        export function doErrorBaseline(baselinePath: string, inputFiles: readonly TestFile[], errors: readonly Diagnostic[], pretty?: boolean) {
            Baseline.runBaseline(baselinePath.replace(/\.tsx?$/, ".errors.txt"),
                !errors || (errors.length === 0) ? null : getErrorBaseline(inputFiles, errors, pretty)); // eslint-disable-line no-null/no-null
        }

        export function doTypeAndSymbolBaseline(baselinePath: string, program: Program, allFiles: {unitName: string, content: string}[], opts?: Baseline.BaselineOptions, multifile?: boolean, skipTypeBaselines?: boolean, skipSymbolBaselines?: boolean, hasErrorBaseline?: boolean) {
            // The full walker simulates the types that you would get from doing a full
            // compile.  The pull walker simulates the types you get when you just do
            // a type query for a random node (like how the LS would do it).  Most of the
            // time, these will be the same.  However, occasionally, they can be different.
            // Specifically, when the compiler internally depends on symbol IDs to order
            // things, then we may see different results because symbols can be created in a
            // different order with 'pull' operations, and thus can produce slightly differing
            // output.
            //
            // For example, with a full type check, we may see a type displayed as: number | string
            // But with a pull type check, we may see it as:                        string | number
            //
            // These types are equivalent, but depend on what order the compiler observed
            // certain parts of the program.

            const fullWalker = new TypeWriterWalker(program, /*fullTypeCheck*/ true, !!hasErrorBaseline);

            // Produce baselines.  The first gives the types for all expressions.
            // The second gives symbols for all identifiers.
            let typesError: Error | undefined, symbolsError: Error | undefined;
            try {
                checkBaseLines(/*isSymbolBaseLine*/ false);
            }
            catch (e) {
                typesError = e;
            }

            try {
                checkBaseLines(/*isSymbolBaseLine*/ true);
            }
            catch (e) {
                symbolsError = e;
            }

            if (typesError && symbolsError) {
                throw new Error(typesError.stack + IO.newLine() + symbolsError.stack);
            }

            if (typesError) {
                throw typesError;
            }

            if (symbolsError) {
                throw symbolsError;
            }

            return;

            function checkBaseLines(isSymbolBaseLine: boolean) {
                const fullExtension = isSymbolBaseLine ? ".symbols" : ".types";
                // When calling this function from rwc-runner, the baselinePath will have no extension.
                // As rwc test- file is stored in json which ".json" will get stripped off.
                // When calling this function from compiler-runner, the baselinePath will then has either ".ts" or ".tsx" extension
                const outputFileName = endsWith(baselinePath, Extension.Ts) || endsWith(baselinePath, Extension.Tsx) ?
                    baselinePath.replace(/\.tsx?/, "") : baselinePath;

                if (!multifile) {
                    const fullBaseLine = generateBaseLine(isSymbolBaseLine, isSymbolBaseLine ? skipSymbolBaselines : skipTypeBaselines);
                    Baseline.runBaseline(outputFileName + fullExtension, fullBaseLine, opts);
                }
                else {
                    Baseline.runMultifileBaseline(outputFileName, fullExtension, () => {
                        return iterateBaseLine(isSymbolBaseLine, isSymbolBaseLine ? skipSymbolBaselines : skipTypeBaselines);
                    }, opts);
                }
            }

            function generateBaseLine(isSymbolBaseline: boolean, skipBaseline?: boolean): string | null {
                let result = "";
                const gen = iterateBaseLine(isSymbolBaseline, skipBaseline);
                for (let {done, value} = gen.next(); !done; { done, value } = gen.next()) {
                    const [, content] = value;
                    result += content;
                }
                return result || null; // eslint-disable-line no-null/no-null
            }

            function *iterateBaseLine(isSymbolBaseline: boolean, skipBaseline?: boolean): IterableIterator<[string, string]> {
                if (skipBaseline) {
                    return;
                }
                const dupeCase = createMap<number>();

                for (const file of allFiles) {
                    const { unitName } = file;
                    let typeLines = "=== " + unitName + " ===\r\n";
                    const codeLines = flatMap(file.content.split(/\r?\n/g), e => e.split(/[\r\u2028\u2029]/g));
                    const gen: IterableIterator<TypeWriterResult> = isSymbolBaseline ? fullWalker.getSymbols(unitName) : fullWalker.getTypes(unitName);
                    let lastIndexWritten: number | undefined;
                    for (let {done, value: result} = gen.next(); !done; { done, value: result } = gen.next()) {
                        if (isSymbolBaseline && !result.symbol) {
                            return;
                        }
                        if (lastIndexWritten === undefined) {
                            typeLines += codeLines.slice(0, result.line + 1).join("\r\n") + "\r\n";
                        }
                        else if (result.line !== lastIndexWritten) {
                            if (!((lastIndexWritten + 1 < codeLines.length) && (codeLines[lastIndexWritten + 1].match(/^\s*[{|}]\s*$/) || codeLines[lastIndexWritten + 1].trim() === ""))) {
                                typeLines += "\r\n";
                            }
                            typeLines += codeLines.slice(lastIndexWritten + 1, result.line + 1).join("\r\n") + "\r\n";
                        }
                        lastIndexWritten = result.line;
                        const typeOrSymbolString = isSymbolBaseline ? result.symbol : result.type;
                        const formattedLine = result.sourceText.replace(/\r?\n/g, "") + " : " + typeOrSymbolString;
                        typeLines += ">" + formattedLine + "\r\n";
                    }

                    // Preserve legacy behavior
                    if (lastIndexWritten === undefined) {
                        for (const codeLine of codeLines) {
                            typeLines += codeLine + "\r\nNo type information for this code.";
                        }
                    }
                    else {
                        if (lastIndexWritten + 1 < codeLines.length) {
                            if (!((lastIndexWritten + 1 < codeLines.length) && (codeLines[lastIndexWritten + 1].match(/^\s*[{|}]\s*$/) || codeLines[lastIndexWritten + 1].trim() === ""))) {
                                typeLines += "\r\n";
                            }
                            typeLines += codeLines.slice(lastIndexWritten + 1).join("\r\n");
                        }
                        typeLines += "\r\n";
                    }
                    yield [checkDuplicatedFileName(unitName, dupeCase), Utils.removeTestPathPrefixes(typeLines)];
                }
            }
        }

        export function doSourcemapBaseline(baselinePath: string, options: CompilerOptions, result: compiler.CompilationResult, harnessSettings: TestCaseParser.CompilerSettings) {
            const declMaps = getAreDeclarationMapsEnabled(options);
            if (options.inlineSourceMap) {
                if (result.maps.size > 0 && !declMaps) {
                    throw new Error("No sourcemap files should be generated if inlineSourceMaps was set.");
                }
                return;
            }
            else if (options.sourceMap || declMaps) {
                if (result.maps.size !== ((options.sourceMap ? result.getNumberOfJsFiles(/*includeJson*/ false) : 0) + (declMaps ? result.getNumberOfJsFiles(/*includeJson*/ true) : 0))) {
                    throw new Error("Number of sourcemap files should be same as js files.");
                }

                let sourceMapCode: string | null;
                if ((options.noEmitOnError && result.diagnostics.length !== 0) || result.maps.size === 0) {
                    // We need to return null here or the runBaseLine will actually create a empty file.
                    // Baselining isn't required here because there is no output.
                    sourceMapCode = null; // eslint-disable-line no-null/no-null
                }
                else {
                    sourceMapCode = "";
                    result.maps.forEach(sourceMap => {
                        if (sourceMapCode) sourceMapCode += "\r\n";
                        sourceMapCode += fileOutput(sourceMap, harnessSettings);
                        if (!options.inlineSourceMap) {
                            sourceMapCode += createSourceMapPreviewLink(sourceMap.text, result);
                        }
                    });
                }
                Baseline.runBaseline(baselinePath.replace(/\.tsx?/, ".js.map"), sourceMapCode);
            }
        }

        function createSourceMapPreviewLink(sourcemap: string, result: compiler.CompilationResult) {
            const sourcemapJSON = JSON.parse(sourcemap);
            const outputJSFile = result.outputs.find(td => td.file.endsWith(sourcemapJSON.file));
            if (!outputJSFile) return "";

            const sourceTDs = map(sourcemapJSON.sources, (s: string) => result.inputs.find(td => td.file.endsWith(s)));
            const anyUnfoundSources = contains(sourceTDs, /*value*/ undefined);
            if (anyUnfoundSources) return "";

            const hash = "#base64," + map([outputJSFile.text, sourcemap].concat(sourceTDs.map(td => td!.text)), (s) => convertToBase64(decodeURIComponent(encodeURIComponent(s)))).join(",");
            return "\n//// https://sokra.github.io/source-map-visualization" + hash + "\n";
        }

        export function doJsEmitBaseline(baselinePath: string, header: string, options: CompilerOptions, result: compiler.CompilationResult, tsConfigFiles: readonly TestFile[], toBeCompiled: readonly TestFile[], otherFiles: readonly TestFile[], harnessSettings: TestCaseParser.CompilerSettings) {
            if (!options.noEmit && !options.emitDeclarationOnly && result.js.size === 0 && result.diagnostics.length === 0) {
                throw new Error("Expected at least one js file to be emitted or at least one error to be created.");
            }

            // check js output
            let tsCode = "";
            const tsSources = otherFiles.concat(toBeCompiled);
            if (tsSources.length > 1) {
                tsCode += "//// [" + header + "] ////\r\n\r\n";
            }
            for (let i = 0; i < tsSources.length; i++) {
                tsCode += "//// [" + getBaseFileName(tsSources[i].unitName) + "]\r\n";
                tsCode += tsSources[i].content + (i < (tsSources.length - 1) ? "\r\n" : "");
            }

            let jsCode = "";
            result.js.forEach(file => {
                if (jsCode.length && jsCode.charCodeAt(jsCode.length - 1) !== CharacterCodes.lineFeed) {
                    jsCode += "\r\n";
                }
                if (!result.diagnostics.length && !endsWith(file.file, Extension.Json)) {
                    const fileParseResult = createSourceFile(file.file, file.text, options.target || ScriptTarget.ES3, /*parentNodes*/ false, endsWith(file.file, "x") ? ScriptKind.JSX : ScriptKind.JS);
                    if (length(fileParseResult.parseDiagnostics)) {
                        jsCode += getErrorBaseline([file.asTestFile()], fileParseResult.parseDiagnostics);
                        return;
                    }
                }
                jsCode += fileOutput(file, harnessSettings);
            });

            if (result.dts.size > 0) {
                jsCode += "\r\n\r\n";
                result.dts.forEach(declFile => {
                    jsCode += fileOutput(declFile, harnessSettings);
                });
            }

            const declFileContext = prepareDeclarationCompilationContext(
                toBeCompiled, otherFiles, result, harnessSettings, options, /*currentDirectory*/ undefined
            );
            const declFileCompilationResult = compileDeclarationFiles(declFileContext, result.symlinks);

            if (declFileCompilationResult && declFileCompilationResult.declResult.diagnostics.length) {
                jsCode += "\r\n\r\n//// [DtsFileErrors]\r\n";
                jsCode += "\r\n\r\n";
                jsCode += getErrorBaseline(tsConfigFiles.concat(declFileCompilationResult.declInputFiles, declFileCompilationResult.declOtherFiles), declFileCompilationResult.declResult.diagnostics);
            }

            // eslint-disable-next-line no-null/no-null
            Baseline.runBaseline(baselinePath.replace(/\.tsx?/, Extension.Js), jsCode.length > 0 ? tsCode + "\r\n\r\n" + jsCode : null);
        }

        function fileOutput(file: documents.TextDocument, harnessSettings: TestCaseParser.CompilerSettings): string {
            const fileName = harnessSettings.fullEmitPaths ? Utils.removeTestPathPrefixes(file.file) : getBaseFileName(file.file);
            return "//// [" + fileName + "]\r\n" + Utils.removeTestPathPrefixes(file.text);
        }

        export function collateOutputs(outputFiles: readonly documents.TextDocument[]): string {
            const gen = iterateOutputs(outputFiles);
            // Emit them
            let result = "";
            for (let {done, value} = gen.next(); !done; { done, value } = gen.next()) {
                // Some extra spacing if this isn't the first file
                if (result.length) {
                    result += "\r\n\r\n";
                }
                // FileName header + content
                const [, content] = value;
                result += content;
            }
            return result;
        }

        export function* iterateOutputs(outputFiles: Iterable<documents.TextDocument>): IterableIterator<[string, string]> {
            // Collect, test, and sort the fileNames
            const files = Array.from(outputFiles);
            files.slice().sort((a, b) => compareStringsCaseSensitive(cleanName(a.file), cleanName(b.file)));
            const dupeCase = createMap<number>();
            // Yield them
            for (const outputFile of files) {
                yield [checkDuplicatedFileName(outputFile.file, dupeCase), "/*====== " + outputFile.file + " ======*/\r\n" + Utils.removeByteOrderMark(outputFile.text)];
            }

            function cleanName(fn: string) {
                const lastSlash = normalizeSlashes(fn).lastIndexOf("/");
                return fn.substr(lastSlash + 1).toLowerCase();
            }
        }

        function checkDuplicatedFileName(resultName: string, dupeCase: Map<string, number>): string {
            resultName = sanitizeTestFilePath(resultName);
            if (dupeCase.has(resultName)) {
                // A different baseline filename should be manufactured if the names differ only in case, for windows compat
                const count = 1 + dupeCase.get(resultName)!;
                dupeCase.set(resultName, count);
                resultName = `${resultName}.dupe${count}`;
            }
            else {
                dupeCase.set(resultName, 0);
            }
            return resultName;
        }

        export function sanitizeTestFilePath(name: string) {
            const path = toPath(normalizeSlashes(name.replace(/[\^<>:"|?*%]/g, "_")).replace(/\.\.\//g, "__dotdot/"), "", Utils.canonicalizeForHarness);
            if (startsWith(path, "/")) {
                return path.substring(1);
            }
            return path;
        }
    }

    export interface FileBasedTest {
        file: string;
        configurations?: FileBasedTestConfiguration[];
    }

    export interface FileBasedTestConfiguration {
        [key: string]: string;
    }

    function splitVaryBySettingValue(text: string, varyBy: string): string[] | undefined {
        if (!text) return undefined;

        let star = false;
        const includes: string[] = [];
        const excludes: string[] = [];
        for (let s of text.split(/,/g)) {
            s = s.trim().toLowerCase();
            if (s.length === 0) continue;
            if (s === "*") {
                star = true;
            }
            else if (startsWith(s, "-") || startsWith(s, "!")) {
                excludes.push(s.slice(1));
            }
            else {
                includes.push(s);
            }
        }

        // do nothing if the setting has no variations
        if (includes.length <= 1 && !star && excludes.length === 0) {
            return undefined;
        }

        const variations: { key: string, value?: string | number }[] = [];
        const values = getVaryByStarSettingValues(varyBy);

        // add (and deduplicate) all included entries
        for (const include of includes) {
            const value = values?.get(include);
            if (findIndex(variations, v => v.key === include || value !== undefined && v.value === value) === -1) {
                variations.push({ key: include, value });
            }
        }

        if (star && values) {
            // add all entries
            for (const [key, value] of arrayFrom(values.entries())) {
                if (findIndex(variations, v => v.key === key || v.value === value) === -1) {
                    variations.push({ key, value });
                }
            }
        }

        // remove all excluded entries
        for (const exclude of excludes) {
            const value = values?.get(exclude);
            let index: number;
            while ((index = findIndex(variations, v => v.key === exclude || value !== undefined && v.value === value)) >= 0) {
                orderedRemoveItemAt(variations, index);
            }
        }

        if (variations.length === 0) {
            throw new Error(`Variations in test option '@${varyBy}' resulted in an empty set.`);
        }

        return map(variations, v => v.key);
    }

    function computeFileBasedTestConfigurationVariations(configurations: FileBasedTestConfiguration[], variationState: FileBasedTestConfiguration, varyByEntries: [string, string[]][], offset: number) {
        if (offset >= varyByEntries.length) {
            // make a copy of the current variation state
            configurations.push({ ...variationState });
            return;
        }

        const [varyBy, entries] = varyByEntries[offset];
        for (const entry of entries) {
            // set or overwrite the variation, then compute the next variation
            variationState[varyBy] = entry;
            computeFileBasedTestConfigurationVariations(configurations, variationState, varyByEntries, offset + 1);
        }
    }

    let booleanVaryByStarSettingValues: Map<string, string | number> | undefined;

    function getVaryByStarSettingValues(varyBy: string): ReadonlyMap<string, string | number> | undefined {
        const option = forEach(optionDeclarations, decl => equateStringsCaseInsensitive(decl.name, varyBy) ? decl : undefined);
        if (option) {
            if (typeof option.type === "object") {
                return option.type;
            }
            if (option.type === "boolean") {
                return booleanVaryByStarSettingValues || (booleanVaryByStarSettingValues = createMapFromTemplate({
                    true: 1,
                    false: 0
                }));
            }
        }
    }

    /**
     * Compute FileBasedTestConfiguration variations based on a supplied list of variable settings.
     */
    export function getFileBasedTestConfigurations(settings: TestCaseParser.CompilerSettings, varyBy: readonly string[]): FileBasedTestConfiguration[] | undefined {
        let varyByEntries: [string, string[]][] | undefined;
        let variationCount = 1;
        for (const varyByKey of varyBy) {
            if (hasProperty(settings, varyByKey)) {
                // we only consider variations when there are 2 or more variable entries.
                const entries = splitVaryBySettingValue(settings[varyByKey], varyByKey);
                if (entries) {
                    if (!varyByEntries) varyByEntries = [];
                    variationCount *= entries.length;
                    if (variationCount > 25) throw new Error(`Provided test options exceeded the maximum number of variations: ${varyBy.map(v => `'@${v}'`).join(", ")}`);
                    varyByEntries.push([varyByKey, entries]);
                }
            }
        }

        if (!varyByEntries) return undefined;

        const configurations: FileBasedTestConfiguration[] = [];
        computeFileBasedTestConfigurationVariations(configurations, /*variationState*/ {}, varyByEntries, /*offset*/ 0);
        return configurations;
    }

    /**
     * Compute a description for this configuration based on its entries
     */
    export function getFileBasedTestConfigurationDescription(configuration: FileBasedTestConfiguration) {
        let name = "";
        if (configuration) {
            const keys = Object.keys(configuration).sort();
            for (const key of keys) {
                if (name) name += ", ";
                name += `@${key}: ${configuration[key]}`;
            }
        }
        return name;
    }

    export namespace TestCaseParser {
        /** all the necessary information to set the right compiler settings */
        export interface CompilerSettings {
            [name: string]: string;
        }

        /** All the necessary information to turn a multi file test into useful units for later compilation */
        export interface TestUnitData {
            content: string;
            name: string;
            fileOptions: any;
            originalFilePath: string;
            references: string[];
        }

        // Regex for parsing options in the format "@Alpha: Value of any sort"
        const optionRegex = /^[\/]{2}\s*@(\w+)\s*:\s*([^\r\n]*)/gm;  // multiple matches on multiple lines
        const linkRegex = /^[\/]{2}\s*@link\s*:\s*([^\r\n]*)\s*->\s*([^\r\n]*)/gm;  // multiple matches on multiple lines

        export function parseSymlinkFromTest(line: string, symlinks: vfs.FileSet | undefined) {
            const linkMetaData = linkRegex.exec(line);
            linkRegex.lastIndex = 0;
            if (!linkMetaData) return undefined;

            if (!symlinks) symlinks = {};
            symlinks[linkMetaData[2].trim()] = new vfs.Symlink(linkMetaData[1].trim());
            return symlinks;
        }

        export function extractCompilerSettings(content: string): CompilerSettings {
            const opts: CompilerSettings = {};

            let match: RegExpExecArray | null;
            while ((match = optionRegex.exec(content)) !== null) { // eslint-disable-line no-null/no-null
                opts[match[1]] = match[2].trim();
            }

            return opts;
        }

        export interface TestCaseContent {
            settings: CompilerSettings;
            testUnitData: TestUnitData[];
            tsConfig: ParsedCommandLine | undefined;
            tsConfigFileUnitData: TestUnitData | undefined;
            symlinks?: vfs.FileSet;
        }

        /** Given a test file containing // @FileName directives, return an array of named units of code to be added to an existing compiler instance */
        export function makeUnitsFromTest(code: string, fileName: string, rootDir?: string, settings = extractCompilerSettings(code)): TestCaseContent {
            // List of all the subfiles we've parsed out
            const testUnitData: TestUnitData[] = [];

            const lines = Utils.splitContentByNewlines(code);

            // Stuff related to the subfile we're parsing
            let currentFileContent: string | undefined;
            let currentFileOptions: any = {};
            let currentFileName: any;
            let refs: string[] = [];
            let symlinks: vfs.FileSet | undefined;

            for (const line of lines) {
                let testMetaData: RegExpExecArray | null;
                const possiblySymlinks = parseSymlinkFromTest(line, symlinks);
                if (possiblySymlinks) {
                    symlinks = possiblySymlinks;
                }
                else if (testMetaData = optionRegex.exec(line)) {
                    // Comment line, check for global/file @options and record them
                    optionRegex.lastIndex = 0;
                    const metaDataName = testMetaData[1].toLowerCase();
                    currentFileOptions[testMetaData[1]] = testMetaData[2].trim();
                    if (metaDataName !== "filename") {
                        continue;
                    }

                    // New metadata statement after having collected some code to go with the previous metadata
                    if (currentFileName) {
                        // Store result file
                        const newTestFile = {
                            content: currentFileContent!, // TODO: GH#18217
                            name: currentFileName,
                            fileOptions: currentFileOptions,
                            originalFilePath: fileName,
                            references: refs
                        };
                        testUnitData.push(newTestFile);

                        // Reset local data
                        currentFileContent = undefined;
                        currentFileOptions = {};
                        currentFileName = testMetaData[2].trim();
                        refs = [];
                    }
                    else {
                        // First metadata marker in the file
                        currentFileName = testMetaData[2].trim();
                    }
                }
                else {
                    // Subfile content line
                    // Append to the current subfile content, inserting a newline needed
                    if (currentFileContent === undefined) {
                        currentFileContent = "";
                    }
                    else if (currentFileContent !== "") {
                        // End-of-line
                        currentFileContent = currentFileContent + "\n";
                    }
                    currentFileContent = currentFileContent + line;
                }
            }

            // normalize the fileName for the single file case
            currentFileName = testUnitData.length > 0 || currentFileName ? currentFileName : getBaseFileName(fileName);

            // EOF, push whatever remains
            const newTestFile2 = {
                content: currentFileContent || "",
                name: currentFileName,
                fileOptions: currentFileOptions,
                originalFilePath: fileName,
                references: refs
            };
            testUnitData.push(newTestFile2);

            // unit tests always list files explicitly
            const parseConfigHost: ParseConfigHost = {
                useCaseSensitiveFileNames: false,
                readDirectory: () => [],
                fileExists: () => true,
                readFile: (name) => forEach(testUnitData, data => data.name.toLowerCase() === name.toLowerCase() ? data.content : undefined)
            };

            // check if project has tsconfig.json in the list of files
            let tsConfig: ParsedCommandLine | undefined;
            let tsConfigFileUnitData: TestUnitData | undefined;
            for (let i = 0; i < testUnitData.length; i++) {
                const data = testUnitData[i];
                if (getConfigNameFromFileName(data.name)) {
                    const configJson = parseJsonText(data.name, data.content);
                    assert.isTrue(configJson.endOfFileToken !== undefined);
                    let baseDir = normalizePath(getDirectoryPath(data.name));
                    if (rootDir) {
                        baseDir = getNormalizedAbsolutePath(baseDir, rootDir);
                    }
                    tsConfig = parseJsonSourceFileConfigFileContent(configJson, parseConfigHost, baseDir);
                    tsConfig.options.configFilePath = data.name;
                    tsConfigFileUnitData = data;

                    // delete entry from the list
                    orderedRemoveItemAt(testUnitData, i);

                    break;
                }
            }
            return { settings, testUnitData, tsConfig, tsConfigFileUnitData, symlinks };
        }
    }

    /** Support class for baseline files */
    export namespace Baseline {
        const noContent = "<no content>";

        export interface BaselineOptions {
            Subfolder?: string;
            Baselinefolder?: string;
            PrintDiff?: true;
        }

        export function localPath(fileName: string, baselineFolder?: string, subfolder?: string) {
            if (baselineFolder === undefined) {
                return baselinePath(fileName, "local", "tests/baselines", subfolder);
            }
            else {
                return baselinePath(fileName, "local", baselineFolder, subfolder);
            }
        }

        function referencePath(fileName: string, baselineFolder?: string, subfolder?: string) {
            if (baselineFolder === undefined) {
                return baselinePath(fileName, "reference", "tests/baselines", subfolder);
            }
            else {
                return baselinePath(fileName, "reference", baselineFolder, subfolder);
            }
        }

        function baselinePath(fileName: string, type: string, baselineFolder: string, subfolder?: string) {
            if (subfolder !== undefined) {
                return userSpecifiedRoot + baselineFolder + "/" + subfolder + "/" + type + "/" + fileName;
            }
            else {
                return userSpecifiedRoot + baselineFolder + "/" + type + "/" + fileName;
            }
        }

        const fileCache: { [idx: string]: boolean } = {};

        function compareToBaseline(actual: string | null, relativeFileName: string, opts: BaselineOptions | undefined) {
            // actual is now either undefined (the generator had an error), null (no file requested),
            // or some real output of the function
            if (actual === undefined) {
                // Nothing to do
                return undefined!; // TODO: GH#18217
            }

            const refFileName = referencePath(relativeFileName, opts && opts.Baselinefolder, opts && opts.Subfolder);

            // eslint-disable-next-line no-null/no-null
            if (actual === null) {
                actual = noContent;
            }

            let expected = "<no content>";
            if (IO.fileExists(refFileName)) {
                expected = IO.readFile(refFileName)!; // TODO: GH#18217
            }

            return { expected, actual };
        }

        function writeComparison(expected: string, actual: string, relativeFileName: string, actualFileName: string, opts?: BaselineOptions) {
            // For now this is written using TypeScript, because sys is not available when running old test cases.
            // But we need to move to sys once we have
            // Creates the directory including its parent if not already present
            function createDirectoryStructure(dirName: string) {
                if (fileCache[dirName] || IO.directoryExists(dirName)) {
                    fileCache[dirName] = true;
                    return;
                }

                const parentDirectory = IO.directoryName(dirName)!; // TODO: GH#18217
                if (parentDirectory !== "" && parentDirectory !== dirName) {
                    createDirectoryStructure(parentDirectory);
                }
                IO.createDirectory(dirName);
                fileCache[dirName] = true;
            }

            // Create folders if needed
            createDirectoryStructure(IO.directoryName(actualFileName)!); // TODO: GH#18217

            // Delete the actual file in case it fails
            if (IO.fileExists(actualFileName)) {
                IO.deleteFile(actualFileName);
            }

            const encodedActual = Utils.encodeString(actual);
            if (expected !== encodedActual) {
                if (actual === noContent) {
                    IO.writeFile(actualFileName + ".delete", "");
                }
                else {
                    IO.writeFile(actualFileName, encodedActual);
                }
                if (require && opts && opts.PrintDiff) {
                    const Diff = require("diff");
                    const patch = Diff.createTwoFilesPatch("Expected", "Actual", expected, actual, "The current baseline", "The new version");
                    throw new Error(`The baseline file ${relativeFileName} has changed.${ForegroundColorEscapeSequences.Grey}\n\n${patch}`);
                }
                else {
                    throw new Error(`The baseline file ${relativeFileName} has changed.`);
                }
            }
        }

        export function runBaseline(relativeFileName: string, actual: string | null, opts?: BaselineOptions): void {
            const actualFileName = localPath(relativeFileName, opts && opts.Baselinefolder, opts && opts.Subfolder);
            if (actual === undefined) {
                throw new Error("The generated content was \"undefined\". Return \"null\" if no baselining is required.\"");
            }
            const comparison = compareToBaseline(actual, relativeFileName, opts);
            writeComparison(comparison.expected, comparison.actual, relativeFileName, actualFileName, opts);
        }

        export function runMultifileBaseline(relativeFileBase: string, extension: string, generateContent: () => IterableIterator<[string, string, number]> | IterableIterator<[string, string]> | null, opts?: BaselineOptions, referencedExtensions?: string[]): void {
            const gen = generateContent();
            const writtenFiles = createMap<true>();
            const errors: Error[] = [];

            // eslint-disable-next-line no-null/no-null
            if (gen !== null) {
                for (let {done, value} = gen.next(); !done; { done, value } = gen.next()) {
                    const [name, content, count] = value as [string, string, number | undefined];
                    if (count === 0) continue; // Allow error reporter to skip writing files without errors
                    const relativeFileName = relativeFileBase + "/" + name + extension;
                    const actualFileName = localPath(relativeFileName, opts && opts.Baselinefolder, opts && opts.Subfolder);
                    const comparison = compareToBaseline(content, relativeFileName, opts);
                    try {
                        writeComparison(comparison.expected, comparison.actual, relativeFileName, actualFileName);
                    }
                    catch (e) {
                        errors.push(e);
                    }
                    writtenFiles.set(relativeFileName, true);
                }
            }

            const referenceDir = referencePath(relativeFileBase, opts && opts.Baselinefolder, opts && opts.Subfolder);
            let existing = IO.readDirectory(referenceDir, referencedExtensions || [extension]);
            if (extension === ".ts" || referencedExtensions && referencedExtensions.indexOf(".ts") > -1 && referencedExtensions.indexOf(".d.ts") === -1) {
                // special-case and filter .d.ts out of .ts results
                existing = existing.filter(f => !endsWith(f, ".d.ts"));
            }
            const missing: string[] = [];
            for (const name of existing) {
                const localCopy = name.substring(referenceDir.length - relativeFileBase.length);
                if (!writtenFiles.has(localCopy)) {
                    missing.push(localCopy);
                }
            }
            if (missing.length) {
                for (const file of missing) {
                    IO.writeFile(localPath(file + ".delete", opts && opts.Baselinefolder, opts && opts.Subfolder), "");
                }
            }

            if (errors.length || missing.length) {
                let errorMsg = "";
                if (errors.length) {
                    errorMsg += `The baseline for ${relativeFileBase} in ${errors.length} files has changed:${"\n    " + errors.slice(0, 5).map(e => e.message).join("\n    ") + (errors.length > 5 ? "\n" + `    and ${errors.length - 5} more` : "")}`;
                }
                if (errors.length && missing.length) {
                    errorMsg += "\n";
                }
                if (missing.length) {
                    const writtenFilesArray = arrayFrom(writtenFiles.keys());
                    errorMsg += `Baseline missing ${missing.length} files:${"\n    " + missing.slice(0, 5).join("\n    ") + (missing.length > 5 ? "\n" + `    and ${missing.length - 5} more` : "") + "\n"}Written ${writtenFiles.size} files:${"\n    " + writtenFilesArray.slice(0, 5).join("\n    ") + (writtenFilesArray.length > 5 ? "\n" + `    and ${writtenFilesArray.length - 5} more` : "")}`;
                }
                throw new Error(errorMsg);
            }
        }
    }

    export function isDefaultLibraryFile(filePath: string): boolean {
        // We need to make sure that the filePath is prefixed with "lib." not just containing "lib." and end with ".d.ts"
        const fileName = getBaseFileName(normalizeSlashes(filePath));
        return startsWith(fileName, "lib.") && endsWith(fileName, Extension.Dts);
    }

    export function isBuiltFile(filePath: string): boolean {
        return filePath.indexOf(libFolder) === 0 ||
            filePath.indexOf(vpath.addTrailingSeparator(vfs.builtFolder)) === 0;
    }

    export function getDefaultLibraryFile(filePath: string, io: IO): Compiler.TestFile {
        const libFile = userSpecifiedRoot + libFolder + getBaseFileName(normalizeSlashes(filePath));
        return { unitName: libFile, content: io.readFile(libFile)! };
    }

    export function getConfigNameFromFileName(filename: string): "tsconfig.json" | "jsconfig.json" | undefined {
        const flc = getBaseFileName(filename).toLowerCase();
        return find(["tsconfig.json" as "tsconfig.json", "jsconfig.json" as "jsconfig.json"], x => x === flc);
    }

    if (Error) (<any>Error).stackTraceLimit = 100;

