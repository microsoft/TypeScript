/// <reference path="sys.ts" />
/// <reference path="emitter.ts" />

module ts {
    export function createCompilerHost(options: CompilerOptions): CompilerHost {
        var currentDirectory: string;
        var existingDirectories: Map<boolean> = {};

        function getCanonicalFileName(fileName: string): string {
            // if underlying system can distinguish between two files whose names differs only in cases then file name already in canonical form.
            // otherwise use toLowerCase as a canonical form.
            return sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
        }
        
        // returned by CScript sys environment
        var unsupportedFileEncodingErrorCode = -2147024809;

        function getSourceFile(filename: string, languageVersion: ScriptTarget, onError?: (message: string) => void): SourceFile {
            try {
                var text = sys.readFile(filename, options.charset);
            }
            catch (e) {
                if (onError) {
                    onError(e.number === unsupportedFileEncodingErrorCode ?
                        createCompilerDiagnostic(Diagnostics.Unsupported_file_encoding).messageText :
                        e.message);
                }
                text = "";
            }

            return text !== undefined ? createSourceFile(filename, text, languageVersion) : undefined;
        }

        function writeFile(fileName: string, data: string, writeByteOrderMark: boolean, onError?: (message: string) => void) {
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
                sys.writeFile(fileName, data, writeByteOrderMark);
            }
            catch (e) {
                if (onError) {
                    onError(e.message);
                }
            }
        }

        return {
            getSourceFile,
            getDefaultLibFilename: options => combinePaths(getDirectoryPath(normalizePath(sys.getExecutingFilePath())), options.target === ScriptTarget.ES6 ? "lib.es6.d.ts" : "lib.d.ts"),
            writeFile,
            getCurrentDirectory: () => currentDirectory || (currentDirectory = sys.getCurrentDirectory()),
            useCaseSensitiveFileNames: () => sys.useCaseSensitiveFileNames,
            getCanonicalFileName,
            getNewLine: () => sys.newLine
        };
    }

    export function createProgram(rootNames: string[], options: CompilerOptions, host: CompilerHost): Program {
        var program: Program;
        var files: SourceFile[] = [];
        var filesByName: Map<SourceFile> = {};
        var errors: Diagnostic[] = [];
        var seenNoDefaultLib = options.noLib;
        var commonSourceDirectory: string;

        forEach(rootNames, name => processRootFile(name, false));
        if (!seenNoDefaultLib) {
            processRootFile(host.getDefaultLibFilename(options), true);
        }
        verifyCompilerOptions();
        errors.sort(compareDiagnostics);


        var diagnosticsProducingTypeChecker: TypeChecker;
        var noDiagnosticsTypeChecker: TypeChecker;
        var emitHost: EmitHost;

        program = {
            getSourceFile: getSourceFile,
            getSourceFiles: () => files,
            getCompilerOptions: () => options,
            getCompilerHost: () => host,
            getDiagnostics: getDiagnostics,
            getGlobalDiagnostics: getGlobalDiagnostics,
            getDeclarationDiagnostics: getDeclarationDiagnostics,
            getTypeChecker,
            getCommonSourceDirectory: () => commonSourceDirectory,
            emitFiles: invokeEmitter,
            isEmitBlocked,
            getCurrentDirectory: host.getCurrentDirectory,
        };
        return program;

        function getEmitHost() {
            return emitHost || (emitHost = createEmitHostFromProgram(program));
        }

        function hasEarlyErrors(sourceFile?: SourceFile): boolean {
            return forEach(getDiagnosticsProducingTypeChecker().getDiagnostics(sourceFile), d => d.isEarly);
        }

        function isEmitBlocked(sourceFile?: SourceFile): boolean {
            return getDiagnostics(sourceFile).length !== 0 ||
                hasEarlyErrors(sourceFile) ||
                (options.noEmitOnError && getDiagnosticsProducingTypeChecker().getDiagnostics(sourceFile).length !== 0);
        }

        function getDiagnosticsProducingTypeChecker() {
            return diagnosticsProducingTypeChecker || (diagnosticsProducingTypeChecker = createTypeChecker(program, /*produceDiagnostics:*/ true));
        }

        function getTypeChecker(produceDiagnostics: boolean) {
            if (produceDiagnostics) {
                return getDiagnosticsProducingTypeChecker();
            }
            else {
                return noDiagnosticsTypeChecker || (noDiagnosticsTypeChecker = createTypeChecker(program, produceDiagnostics));
            }
        }

        function getDeclarationDiagnostics(targetSourceFile: SourceFile): Diagnostic[]{
            var typeChecker = getDiagnosticsProducingTypeChecker();
            typeChecker.getDiagnostics(targetSourceFile);
            var resolver = typeChecker.getEmitResolver();
            return ts.getDeclarationDiagnostics(getEmitHost(), resolver, targetSourceFile);
        }

        function invokeEmitter(targetSourceFile?: SourceFile) {
            var resolver = getDiagnosticsProducingTypeChecker().getEmitResolver();
            return emitFiles(resolver, getEmitHost(), targetSourceFile);
        }
        
        function getSourceFile(filename: string) {
            filename = host.getCanonicalFileName(filename);
            return hasProperty(filesByName, filename) ? filesByName[filename] : undefined;
        }

        function getDiagnostics(sourceFile?: SourceFile): Diagnostic[] {
            return sourceFile ? filter(errors, e => e.file === sourceFile) : errors;
        }

        function getGlobalDiagnostics(): Diagnostic[] {
            return filter(errors, e => !e.file);
        }

        function hasExtension(filename: string): boolean {
            return getBaseFilename(filename).indexOf(".") >= 0;
        }

        function processRootFile(filename: string, isDefaultLib: boolean) {
            processSourceFile(normalizePath(filename), isDefaultLib);
        }

        function processSourceFile(filename: string, isDefaultLib: boolean, refFile?: SourceFile, refPos?: number, refEnd?: number) {
            if (refEnd !== undefined && refPos !== undefined) {
                var start = refPos;
                var length = refEnd - refPos;
            }
            var diagnostic: DiagnosticMessage;
            if (hasExtension(filename)) {
                if (!options.allowNonTsExtensions && !fileExtensionIs(filename, ".ts")) {
                    diagnostic = Diagnostics.File_0_must_have_extension_ts_or_d_ts;
                }
                else if (!findSourceFile(filename, isDefaultLib, refFile, refPos, refEnd)) {
                    diagnostic = Diagnostics.File_0_not_found;
                }
                else if (refFile && host.getCanonicalFileName(filename) === host.getCanonicalFileName(refFile.filename)) {
                    diagnostic = Diagnostics.A_file_cannot_have_a_reference_to_itself;
                }
            }
            else {
                if (options.allowNonTsExtensions && !findSourceFile(filename, isDefaultLib, refFile, refPos, refEnd)) {
                    diagnostic = Diagnostics.File_0_not_found;
                }
                else if (!findSourceFile(filename + ".ts", isDefaultLib, refFile, refPos, refEnd) && !findSourceFile(filename + ".d.ts", isDefaultLib, refFile, refPos, refEnd)) {
                    diagnostic = Diagnostics.File_0_not_found;
                    filename += ".ts";
                }
            }

            if (diagnostic) {
                if (refFile) {
                    errors.push(createFileDiagnostic(refFile, start, length, diagnostic, filename));
                }
                else {
                    errors.push(createCompilerDiagnostic(diagnostic, filename));
                }
            }
        }

        // Get source file from normalized filename
        function findSourceFile(filename: string, isDefaultLib: boolean, refFile?: SourceFile, refStart?: number, refLength?: number): SourceFile {
            var canonicalName = host.getCanonicalFileName(filename);
            if (hasProperty(filesByName, canonicalName)) {
                // We've already looked for this file, use cached result
                return getSourceFileFromCache(filename, canonicalName, /*useAbsolutePath*/ false);
            }
            else {
                var normalizedAbsolutePath = getNormalizedAbsolutePath(filename, host.getCurrentDirectory());
                var canonicalAbsolutePath = host.getCanonicalFileName(normalizedAbsolutePath);
                if (hasProperty(filesByName, canonicalAbsolutePath)) {
                    return getSourceFileFromCache(normalizedAbsolutePath, canonicalAbsolutePath, /*useAbsolutePath*/ true);
                }

                // We haven't looked for this file, do so now and cache result
                var file = filesByName[canonicalName] = host.getSourceFile(filename, options.target, hostErrorMessage => {
                    if (refFile) {
                        errors.push(createFileDiagnostic(refFile, refStart, refLength,
                            Diagnostics.Cannot_read_file_0_Colon_1, filename, hostErrorMessage));
                    }
                    else {
                        errors.push(createCompilerDiagnostic(Diagnostics.Cannot_read_file_0_Colon_1, filename, hostErrorMessage));
                    }
                });
                if (file) {
                    seenNoDefaultLib = seenNoDefaultLib || file.hasNoDefaultLib;

                    // Set the source file for normalized absolute path
                    filesByName[canonicalAbsolutePath] = file;

                    if (!options.noResolve) {
                        var basePath = getDirectoryPath(filename);
                        processReferencedFiles(file, basePath);
                        processImportedModules(file, basePath);
                    }
                    if (isDefaultLib) {
                        files.unshift(file);
                    }
                    else {
                        files.push(file);
                    }
                    forEach(file.getSyntacticDiagnostics(), e => {
                        errors.push(e);
                    });
                }
            }
            return file;

            function getSourceFileFromCache(filename: string, canonicalName: string, useAbsolutePath: boolean): SourceFile {
                var file = filesByName[canonicalName];
                if (file && host.useCaseSensitiveFileNames()) {
                    var sourceFileName = useAbsolutePath ? getNormalizedAbsolutePath(file.filename, host.getCurrentDirectory()) : file.filename;
                    if (canonicalName !== sourceFileName) {
                        errors.push(createFileDiagnostic(refFile, refStart, refLength,
                            Diagnostics.Filename_0_differs_from_already_included_filename_1_only_in_casing, filename, sourceFileName));
                    }
                }
                return file;
            }
        }

        function processReferencedFiles(file: SourceFile, basePath: string) {
            forEach(file.referencedFiles, ref => {
                var referencedFilename = isRootedDiskPath(ref.filename) ? ref.filename : combinePaths(basePath, ref.filename);
                processSourceFile(normalizePath(referencedFilename), /* isDefaultLib */ false, file, ref.pos, ref.end);
            });
        }

        function processImportedModules(file: SourceFile, basePath: string) {
            forEach(file.statements, node => {
                if (isExternalModuleImportEqualsDeclaration(node) &&
                    getExternalModuleImportEqualsDeclarationExpression(node).kind === SyntaxKind.StringLiteral) {

                    var nameLiteral = <LiteralExpression>getExternalModuleImportEqualsDeclarationExpression(node);
                    var moduleName = nameLiteral.text;
                    if (moduleName) {
                        var searchPath = basePath;
                        while (true) {
                            var searchName = normalizePath(combinePaths(searchPath, moduleName));
                            if (findModuleSourceFile(searchName + ".ts", nameLiteral) || findModuleSourceFile(searchName + ".d.ts", nameLiteral)) {
                                break;
                            }

                            var parentPath = getDirectoryPath(searchPath);
                            if (parentPath === searchPath) {
                                break;
                            }
                            searchPath = parentPath;
                        }
                    }
                }
                else if (node.kind === SyntaxKind.ModuleDeclaration && (<ModuleDeclaration>node).name.kind === SyntaxKind.StringLiteral && (node.flags & NodeFlags.Ambient || isDeclarationFile(file))) {
                    // TypeScript 1.0 spec (April 2014): 12.1.6
                    // An AmbientExternalModuleDeclaration declares an external module. 
                    // This type of declaration is permitted only in the global module.
                    // The StringLiteral must specify a top - level external module name.
                    // Relative external module names are not permitted
                    forEachChild((<ModuleDeclaration>node).body, node => {
                        if (isExternalModuleImportEqualsDeclaration(node) &&
                            getExternalModuleImportEqualsDeclarationExpression(node).kind === SyntaxKind.StringLiteral) {

                            var nameLiteral = <LiteralExpression>getExternalModuleImportEqualsDeclarationExpression(node);
                            var moduleName = nameLiteral.text;
                            if (moduleName) {
                                // TypeScript 1.0 spec (April 2014): 12.1.6
                                // An ExternalImportDeclaration in anAmbientExternalModuleDeclaration may reference other external modules 
                                // only through top - level external module names. Relative external module names are not permitted.
                                var searchName = normalizePath(combinePaths(basePath, moduleName));
                                var tsFile = findModuleSourceFile(searchName + ".ts", nameLiteral);
                                if (!tsFile) {
                                    findModuleSourceFile(searchName + ".d.ts", nameLiteral);
                                }
                            }
                        }
                    });
                }
            });

            function findModuleSourceFile(filename: string, nameLiteral: LiteralExpression) {
                return findSourceFile(filename, /* isDefaultLib */ false, file, nameLiteral.pos, nameLiteral.end - nameLiteral.pos);
            }
        }

        function verifyCompilerOptions() {
            if (!options.sourceMap && (options.mapRoot || options.sourceRoot)) {
                // Error to specify --mapRoot or --sourceRoot without mapSourceFiles
                if (options.mapRoot) {
                    errors.push(createCompilerDiagnostic(Diagnostics.Option_mapRoot_cannot_be_specified_without_specifying_sourcemap_option));
                }
                if (options.sourceRoot) {
                    errors.push(createCompilerDiagnostic(Diagnostics.Option_sourceRoot_cannot_be_specified_without_specifying_sourcemap_option));
                }
                return;
            }

            var firstExternalModule = forEach(files, f => isExternalModule(f) ? f : undefined);
            if (firstExternalModule && !options.module) {
                // We cannot use createDiagnosticFromNode because nodes do not have parents yet
                var externalModuleErrorSpan = getErrorSpanForNode(firstExternalModule.externalModuleIndicator);
                var errorStart = skipTrivia(firstExternalModule.text, externalModuleErrorSpan.pos);
                var errorLength = externalModuleErrorSpan.end - errorStart;
                errors.push(createFileDiagnostic(firstExternalModule, errorStart, errorLength, Diagnostics.Cannot_compile_external_modules_unless_the_module_flag_is_provided));
            }

            // there has to be common source directory if user specified --outdir || --sourcRoot
            // if user specified --mapRoot, there needs to be common source directory if there would be multiple files being emitted
            if (options.outDir || // there is --outDir specified
                options.sourceRoot || // there is --sourceRoot specified
                (options.mapRoot &&  // there is --mapRoot Specified and there would be multiple js files generated
                    (!options.out || firstExternalModule !== undefined))) {

                var commonPathComponents: string[];
                forEach(files, sourceFile => {
                    // Each file contributes into common source file path
                    if (!(sourceFile.flags & NodeFlags.DeclarationFile)
                        && !fileExtensionIs(sourceFile.filename, ".js")) {
                        var sourcePathComponents = getNormalizedPathComponents(sourceFile.filename, host.getCurrentDirectory());
                        sourcePathComponents.pop(); // FileName is not part of directory
                        if (commonPathComponents) {
                            for (var i = 0; i < Math.min(commonPathComponents.length, sourcePathComponents.length); i++) {
                                if (commonPathComponents[i] !== sourcePathComponents[i]) {
                                    if (i === 0) {
                                        errors.push(createCompilerDiagnostic(Diagnostics.Cannot_find_the_common_subdirectory_path_for_the_input_files));
                                        return;
                                    }

                                    // New common path found that is 0 -> i-1
                                    commonPathComponents.length = i;
                                    break;
                                }
                            }

                            // If the fileComponent path completely matched and less than already found update the length
                            if (sourcePathComponents.length < commonPathComponents.length) {
                                commonPathComponents.length = sourcePathComponents.length;
                            }
                        }
                        else {
                            // first file
                            commonPathComponents = sourcePathComponents;
                        }
                    }
                });

                commonSourceDirectory = getNormalizedPathFromPathComponents(commonPathComponents);
                if (commonSourceDirectory) {
                    // Make sure directory path ends with directory separator so this string can directly 
                    // used to replace with "" to get the relative path of the source file and the relative path doesn't
                    // start with / making it rooted path
                    commonSourceDirectory += directorySeparator;
                }
            }

            if (options.noEmit) {
                if (options.out || options.outDir) {
                    errors.push(createCompilerDiagnostic(Diagnostics.Option_noEmit_cannot_be_specified_with_option_out_or_outDir));
                }

                if (options.declaration) {
                    errors.push(createCompilerDiagnostic(Diagnostics.Option_noEmit_cannot_be_specified_with_option_declaration));
                }
            }
        }
    }
}