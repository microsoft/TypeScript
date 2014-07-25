/// <reference path="core.ts"/>
/// <reference path="sys.ts"/>
/// <reference path="types.ts"/>
/// <reference path="scanner.ts"/>
/// <reference path="parser.ts"/>
/// <reference path="binder.ts"/>
/// <reference path="checker.ts"/>
/// <reference path="emitter.ts"/>
/// <reference path="commandLineParser.ts"/>

module ts {
    /// Checks to see if the locale is in the appropriate format,
    /// and if it is, attempt to set the appropriate language.
    function validateLocaleAndSetLanguage(locale: string, errors: Diagnostic[]): boolean {
        var matchResult = /^([a-z]+)([_\-]([a-z]+))?$/.exec(locale.toLowerCase());

        if (!matchResult) {
            errors.push(createCompilerDiagnostic(Diagnostics.Locale_must_be_of_the_form_language_or_language_territory_For_example_0_or_1, 'en', 'ja-jp'));
            return false;
        }

        var language = matchResult[1];
        var territory = matchResult[3];

        // First try the entire locale, then fall back to just language if that's all we have.
        if (!trySetLanguageAndTerritory(language, territory, errors) &&
            !trySetLanguageAndTerritory(language, undefined, errors)) {

            errors.push(createCompilerDiagnostic(Diagnostics.Unsupported_locale_0, locale));
            return false;
        }

        return true;
    }

    function trySetLanguageAndTerritory(language: string, territory: string, errors: Diagnostic[]): boolean {
        var compilerFilePath = sys.getExecutingFilePath();
        var containingDirectoryPath = getDirectoryPath(compilerFilePath);

        var filePath = combinePaths(containingDirectoryPath, language);

        if (territory) {
            filePath = filePath + "-" + territory;
        }

        filePath = sys.resolvePath(combinePaths(filePath, "diagnosticMessages.generated.json"));

        if (!sys.fileExists(filePath)) {
            return false;
        }

        // TODO: Add codePage support for readFile?
        try {
            var fileContents = sys.readFile(filePath);
        }
        catch (e) {
            errors.push(createCompilerDiagnostic(Diagnostics.Unable_to_open_file_0, filePath));
            return false;
        }
        try {
            localizedDiagnosticMessages = JSON.parse(fileContents);
        }
        catch (e) {
            errors.push(createCompilerDiagnostic(Diagnostics.Corrupted_locale_file_0, filePath));
            return false;
        }

        return true;
    }

    function countLines(program: Program): number {
        var count = 0;
        forEach(program.getSourceFiles(), file => {
            count += file.getLineAndCharacterFromPosition(file.end).line;
        });
        return count;
    }

    function reportErrors(errors: Diagnostic[]) {
        for (var i = 0; i < errors.length; i++) {
            var error = errors[i];
            if (error.file) {
                var loc = error.file.getLineAndCharacterFromPosition(error.start);
                sys.writeErr(error.file.filename + "(" + loc.line + "," + loc.character + "): " + error.messageText + sys.newLine);
            }
            else {
                sys.writeErr(error.messageText + sys.newLine);
            }
        }
    }

    function padLeft(s: string, length: number) {
        while (s.length < length) s = " " + s;
        return s;
    }

    function padRight(s: string, length: number) {
        while (s.length < length) s = s + " ";
        return s;
    }

    function reportDiagnostic(name: string, value: string) {
        sys.writeErr(padRight(name + ":", 12) + padLeft(value.toString(), 10) + sys.newLine);
    }

    function reportDiagnosticCount(name: string, count: number) {
        reportDiagnostic(name, "" + count);
    }

    function reportDiagnosticTime(name: string, time: number) {
        reportDiagnostic(name, (time / 1000).toFixed(2) + "s");
    }

    function createCompilerHost(options: CompilerOptions): CompilerHost {
        var currentDirectory: string;
        var existingDirectories: Map<boolean> = {};

        function getSourceFile(filename: string, languageVersion: ScriptTarget, onError?: (message: string) => void): SourceFile {
            try {
                var text = sys.readFile(filename, options.charset);
            }
            catch (e) {
                if (onError) onError(e.message);
                text = "";
            }
            return text !== undefined ? createSourceFile(filename, text, languageVersion) : undefined;
        }

        function writeFile(fileName: string, data: string, onError?: (message: string) => void) {

            function directoryExists(directoryPath: string): boolean {
                if (hasProperty(existingDirectories, directoryPath)) {
                    return true;
                }
                if (sys.directoryExists(directoryPath)) {
                    existingDirectories[directoryPath] = true;
                    return true;
                }
                return false;
            }

            function ensureDirectoriesExist(directoryPath: string) {
                if (directoryPath.length > getRootLength(directoryPath) && !directoryExists(directoryPath)) {
                    var parentDirectory = getDirectoryPath(directoryPath);
                    ensureDirectoriesExist(parentDirectory);
                    sys.createDirectory(directoryPath);
                }
            }

            try {
                ensureDirectoriesExist(getDirectoryPath(normalizePath(fileName)));
                sys.writeFile(fileName, data);
            }
            catch (e) {
                if (onError) onError(e.message);
            }
        }

        return {
            getSourceFile: getSourceFile,
            getDefaultLibFilename: () => combinePaths(getDirectoryPath(normalizePath(sys.getExecutingFilePath())), "lib.d.ts"),
            writeFile: writeFile,
            getCurrentDirectory: () => currentDirectory || (currentDirectory = sys.getCurrentDirectory()),
            useCaseSensitiveFileNames: () => sys.useCaseSensitiveFileNames,
            getCanonicalFileName: getCanonicalFileName
        };
    }

    export function executeCommandLine(args: string[]): number {
        var cmds = parseCommandLine(args);
        if (cmds.filenames.length === 0 && !(cmds.options.help || cmds.options.version)) {
            cmds.errors.push(createCompilerDiagnostic(Diagnostics.No_input_files_specified));
        }

        if (cmds.options.version) {
        }

        if (cmds.filenames.length === 0 || cmds.options.help) {
            // TODO (drosen): Usage.
        }

        // If a locale has been set but fails to load, act as if it was never specified,
        // but collect the errors to report along the way.
        if (cmds.options.locale) {
            validateLocaleAndSetLanguage(cmds.options.locale, cmds.errors);
        }

        if (cmds.errors.length) {
            reportErrors(cmds.errors);
            return 1;
        }

        var parseStart = new Date().getTime();
        var program = createProgram(cmds.filenames, cmds.options, createCompilerHost(cmds.options));
        var bindStart = new Date().getTime();
        var errors = program.getDiagnostics();
        if (errors.length) {
            var checkStart = bindStart;
            var emitStart = bindStart;
            var reportStart = bindStart;
        }
        else {
            var checker = program.getTypeChecker();
            var checkStart = new Date().getTime();
            var semanticErrors = checker.getDiagnostics();
            var emitStart = new Date().getTime();
            var emitErrors = checker.emitFiles().errors;
            var reportStart = new Date().getTime();
            errors = concatenate(semanticErrors, emitErrors);
        }

        reportErrors(errors);
        if (cmds.options.diagnostics) {
            reportDiagnosticCount("Files", program.getSourceFiles().length);
            reportDiagnosticCount("Lines", countLines(program));
            reportDiagnosticCount("Nodes", checker ? checker.getNodeCount() : 0);
            reportDiagnosticCount("Identifiers", checker ? checker.getIdentifierCount() : 0);
            reportDiagnosticCount("Symbols", checker ? checker.getSymbolCount() : 0);
            reportDiagnosticCount("Types", checker ? checker.getTypeCount() : 0);
            reportDiagnosticTime("Parse time", bindStart - parseStart);
            reportDiagnosticTime("Bind time", checkStart - bindStart);
            reportDiagnosticTime("Check time", emitStart - checkStart);
            reportDiagnosticTime("Emit time", reportStart - emitStart);
            reportDiagnosticTime("Total time", reportStart - parseStart);
        }
        return errors.length ? 1 : 0;
    }
}

process.exit(ts.executeCommandLine(sys.args));
