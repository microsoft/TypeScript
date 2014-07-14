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

    // TODO (drosen): Make localize-friendly
    var hasReportedErrors = false;
    function reportErrors(errors: Diagnostic[]) {
        for (var i = 0; i < errors.length; i++) {
            var error = errors[i];
            // TODO(jfreeman): Remove assert
            Debug.assert(error.messageText.indexOf("{NL}") < 0);
            if (error.file) {
                var loc = error.file.getLineAndCharacterFromPosition(error.start);
                sys.writeErr(error.file.filename + "(" + loc.line + "," + loc.character + "): " + error.messageText + sys.newLine);
            }
            else {
                sys.writeErr(error.messageText + sys.newLine);
            }
            hasReportedErrors = true;
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

    function getSourceFile(filename: string, languageVersion: ScriptTarget): SourceFile {
        var text = sys.readFile(filename);
        return text ? createSourceFile(filename, text, languageVersion) : undefined;
    }

    function writeFile(fileName: string, data: string) {
        // TODO: Review this code for performance

        //function ensureDirectoryStructure(directoryName: string) {
        //    if (directoryName) {
        //        if (!sys.directoryExists(directoryName)) {
        //            var parentDirectory = getDirectoryPath(directoryName);
        //            // If we arent at the root path ensure that the folder exists
        //            if (parentDirectory !== directoryName) {
        //                if (ensureDirectoryStructure(parentDirectory)) {
        //                    // If parent directory was present, create the current directory
        //                    try {
        //                        sys.createDirectory(directoryName);
        //                    }
        //                    catch (e) {
        //                        reportErrors([createCompilerDiagnostic(Diagnostics.Could_not_create_directory_0, [directoryName])]);
        //                        return false;
        //                    }
        //                }
        //            }
        //        }
        //    }
        //    return true;
        //}
        //// If parent directory structure is present create the file
        //if (ensureDirectoryStructure(getDirectoryPath(normalizePath(fileName)))) {
        //    try {
        //        sys.writeFile(fileName, data);
        //    }
        //    catch (e) {
        //        reportErrors([createCompilerDiagnostic(Diagnostics.Could_not_write_file_0, [fileName])]);
        //    }
        //}
        if (!sys.writeFile(fileName, data)) {
            reportErrors([createCompilerDiagnostic(Diagnostics.Could_not_write_file_0, [fileName])]);
        }
    }

    var currentDirectory: string;
    function getCurrentDictory() {
        currentDirectory = currentDirectory || sys.getCurrentDirectory();
        return currentDirectory;
    }

    function createCompilerHost(): CompilerHost {
        return {
            getSourceFile: getSourceFile,
            getDefaultLibFilename: () => combinePaths(getDirectoryPath(normalizePath(sys.getExecutingFilePath())), "lib.d.ts"),
            writeFile: writeFile,
            getCurrentDirectory: getCurrentDictory,
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
        var program = createProgram(cmds.filenames, cmds.options, createCompilerHost());
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
            errors = checker.getDiagnostics();
            var emitStart = new Date().getTime();
            checker.emitFiles();
            var reportStart = new Date().getTime();
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
        return hasReportedErrors ? 1 : 0;
    }
}

ts.executeCommandLine(sys.args);
