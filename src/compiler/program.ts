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

        function getSourceFile(fileName: string, languageVersion: ScriptTarget, onError?: (message: string) => void): SourceFile {
            try {
                var text = sys.readFile(fileName, options.charset);
            }
            catch (e) {
                if (onError) {
                    onError(e.number === unsupportedFileEncodingErrorCode ?
                        createCompilerDiagnostic(Diagnostics.Unsupported_file_encoding).messageText :
                        e.message);
                }
                text = "";
            }

            return text !== undefined ? createSourceFile(fileName, text, languageVersion) : undefined;
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
            getDefaultLibFileName: options => combinePaths(getDirectoryPath(normalizePath(sys.getExecutingFilePath())), getDefaultLibFileName(options)),
            writeFile,
            getCurrentDirectory: () => currentDirectory || (currentDirectory = sys.getCurrentDirectory()),
            useCaseSensitiveFileNames: () => sys.useCaseSensitiveFileNames,
            getCanonicalFileName,
            getNewLine: () => sys.newLine
        };
    }

    export function createProgram(rootNames: string[], options: CompilerOptions, host?: CompilerHost): Program {
        var program: Program;
        var files: SourceFile[] = [];
        var filesByName: Map<SourceFile> = {};
        var errors: Diagnostic[] = [];
        var seenNoDefaultLib = options.noLib;
        var commonSourceDirectory: string;
        host = host || createCompilerHost(options);

        forEach(rootNames, name => processRootFile(name, false));
        if (!seenNoDefaultLib) {
            processRootFile(host.getDefaultLibFileName(options), true);
        }
        verifyCompilerOptions();
        errors.sort(compareDiagnostics);

        var diagnosticsProducingTypeChecker: TypeChecker;
        var noDiagnosticsTypeChecker: TypeChecker;

        program = {
            getSourceFile: getSourceFile,
            getSourceFiles: () => files,
            getCompilerOptions: () => options,
            getCompilerHost: () => host,
            getDiagnostics,
            getGlobalDiagnostics,
            getTypeCheckerDiagnostics,
            getTypeCheckerGlobalDiagnostics,
            getDeclarationDiagnostics,
            getTypeChecker,
            getDiagnosticsProducingTypeChecker,
            getCommonSourceDirectory: () => commonSourceDirectory,
            emit,
            isEmitBlocked,
            getCurrentDirectory: host.getCurrentDirectory,
            getEmitResolver: () => getDiagnosticsProducingTypeChecker().getEmitResolver(),
            getNodeCount: () => getDiagnosticsProducingTypeChecker().getNodeCount(),
            getIdentifierCount: () => getDiagnosticsProducingTypeChecker().getIdentifierCount(),
            getSymbolCount: () => getDiagnosticsProducingTypeChecker().getSymbolCount(),
            getTypeCount: () => getDiagnosticsProducingTypeChecker().getTypeCount(),
        };
        return program;

        function getEmitHost(writeFileCallback?: WriteFileCallback) {
            var compilerHost = program.getCompilerHost();
            return {
                getCanonicalFileName: compilerHost.getCanonicalFileName,
                getCommonSourceDirectory: program.getCommonSourceDirectory,
                getCompilerOptions: program.getCompilerOptions,
                getCurrentDirectory: compilerHost.getCurrentDirectory,
                getNewLine: compilerHost.getNewLine,
                getSourceFile: program.getSourceFile,
                getSourceFiles: program.getSourceFiles,
                isEmitBlocked,
                writeFile: writeFileCallback || compilerHost.writeFile,
            };
        }


        function isEmitBlocked(sourceFile?: SourceFile): boolean {
            if (options.noEmitOnError) {
                return getDiagnostics(sourceFile).length !== 0 || getTypeCheckerDiagnostics(sourceFile).length !== 0;
            }

            return false;
        }

        function getDiagnosticsProducingTypeChecker() {
            return diagnosticsProducingTypeChecker || (diagnosticsProducingTypeChecker = createTypeChecker(program, /*produceDiagnostics:*/ true));
        }

        function getTypeChecker() {
            return noDiagnosticsTypeChecker || (noDiagnosticsTypeChecker = createTypeChecker(program, /*produceDiagnostics:*/ false));
        }

        function getDeclarationDiagnostics(targetSourceFile: SourceFile): Diagnostic[]{
            var typeChecker = getDiagnosticsProducingTypeChecker();
            typeChecker.getDiagnostics(targetSourceFile);
            var resolver = typeChecker.getEmitResolver();
            return ts.getDeclarationDiagnostics(getEmitHost(), resolver, targetSourceFile);
        }

        function emit(targetSourceFile?: SourceFile, writeFileCallback?: WriteFileCallback) {
            var resolver = getDiagnosticsProducingTypeChecker().getEmitResolver();
            var host = getEmitHost(writeFileCallback);
            return emitFiles(resolver, host, targetSourceFile);
        }
        
        function getSourceFile(fileName: string) {
            fileName = host.getCanonicalFileName(fileName);
            return hasProperty(filesByName, fileName) ? filesByName[fileName] : undefined;
        }

        function getTypeCheckerDiagnostics(sourceFile?: SourceFile): Diagnostic[] {
            return getDiagnosticsProducingTypeChecker().getDiagnostics(sourceFile);
        }

        function getTypeCheckerGlobalDiagnostics(): Diagnostic[] {
            return getDiagnosticsProducingTypeChecker().getGlobalDiagnostics();
        }

        function getDiagnostics(sourceFile?: SourceFile): Diagnostic[] {
            return sourceFile ? filter(errors, e => e.file === sourceFile) : errors;
        }

        function getGlobalDiagnostics(): Diagnostic[] {
            return filter(errors, e => !e.file);
        }

        function hasExtension(fileName: string): boolean {
            return getBaseFileName(fileName).indexOf(".") >= 0;
        }

        function processRootFile(fileName: string, isDefaultLib: boolean) {
            processSourceFile(normalizePath(fileName), isDefaultLib);
        }

        function processSourceFile(fileName: string, isDefaultLib: boolean, refFile?: SourceFile, refPos?: number, refEnd?: number) {
            if (refEnd !== undefined && refPos !== undefined) {
                var start = refPos;
                var length = refEnd - refPos;
            }
            var diagnostic: DiagnosticMessage;
            if (hasExtension(fileName)) {
                if (!options.allowNonTsExtensions && !fileExtensionIs(host.getCanonicalFileName(fileName), ".ts")) {
                    diagnostic = Diagnostics.File_0_must_have_extension_ts_or_d_ts;
                }
                else if (!findSourceFile(fileName, isDefaultLib, refFile, refPos, refEnd)) {
                    diagnostic = Diagnostics.File_0_not_found;
                }
                else if (refFile && host.getCanonicalFileName(fileName) === host.getCanonicalFileName(refFile.fileName)) {
                    diagnostic = Diagnostics.A_file_cannot_have_a_reference_to_itself;
                }
            }
            else {
                if (options.allowNonTsExtensions && !findSourceFile(fileName, isDefaultLib, refFile, refPos, refEnd)) {
                    diagnostic = Diagnostics.File_0_not_found;
                }
                else if (!findSourceFile(fileName + ".ts", isDefaultLib, refFile, refPos, refEnd) && !findSourceFile(fileName + ".d.ts", isDefaultLib, refFile, refPos, refEnd)) {
                    diagnostic = Diagnostics.File_0_not_found;
                    fileName += ".ts";
                }
            }

            if (diagnostic) {
                if (refFile) {
                    errors.push(createFileDiagnostic(refFile, start, length, diagnostic, fileName));
                }
                else {
                    errors.push(createCompilerDiagnostic(diagnostic, fileName));
                }
            }
        }

        // Get source file from normalized fileName
        function findSourceFile(fileName: string, isDefaultLib: boolean, refFile?: SourceFile, refStart?: number, refLength?: number): SourceFile {
            var canonicalName = host.getCanonicalFileName(fileName);
            if (hasProperty(filesByName, canonicalName)) {
                // We've already looked for this file, use cached result
                return getSourceFileFromCache(fileName, canonicalName, /*useAbsolutePath*/ false);
            }
            else {
                var normalizedAbsolutePath = getNormalizedAbsolutePath(fileName, host.getCurrentDirectory());
                var canonicalAbsolutePath = host.getCanonicalFileName(normalizedAbsolutePath);
                if (hasProperty(filesByName, canonicalAbsolutePath)) {
                    return getSourceFileFromCache(normalizedAbsolutePath, canonicalAbsolutePath, /*useAbsolutePath*/ true);
                }

                // We haven't looked for this file, do so now and cache result
                var file = filesByName[canonicalName] = host.getSourceFile(fileName, options.target, hostErrorMessage => {
                    if (refFile) {
                        errors.push(createFileDiagnostic(refFile, refStart, refLength,
                            Diagnostics.Cannot_read_file_0_Colon_1, fileName, hostErrorMessage));
                    }
                    else {
                        errors.push(createCompilerDiagnostic(Diagnostics.Cannot_read_file_0_Colon_1, fileName, hostErrorMessage));
                    }
                });
                if (file) {
                    seenNoDefaultLib = seenNoDefaultLib || file.hasNoDefaultLib;

                    // Set the source file for normalized absolute path
                    filesByName[canonicalAbsolutePath] = file;

                    if (!options.noResolve) {
                        var basePath = getDirectoryPath(fileName);
                        processReferencedFiles(file, basePath);
                        processImportedModules(file, basePath);
                    }
                    if (isDefaultLib) {
                        files.unshift(file);
                    }
                    else {
                        files.push(file);
                    }
                    forEach(getSyntacticDiagnostics(file), e => {
                        errors.push(e);
                    });
                }
            }
            return file;

            function getSourceFileFromCache(fileName: string, canonicalName: string, useAbsolutePath: boolean): SourceFile {
                var file = filesByName[canonicalName];
                if (file && host.useCaseSensitiveFileNames()) {
                    var sourceFileName = useAbsolutePath ? getNormalizedAbsolutePath(file.fileName, host.getCurrentDirectory()) : file.fileName;
                    if (canonicalName !== sourceFileName) {
                        errors.push(createFileDiagnostic(refFile, refStart, refLength,
                            Diagnostics.File_name_0_differs_from_already_included_file_name_1_only_in_casing, fileName, sourceFileName));
                    }
                }
                return file;
            }
        }

        function processReferencedFiles(file: SourceFile, basePath: string) {
            forEach(file.referencedFiles, ref => {
                var referencedFileName = isRootedDiskPath(ref.fileName) ? ref.fileName : combinePaths(basePath, ref.fileName);
                processSourceFile(normalizePath(referencedFileName), /* isDefaultLib */ false, file, ref.pos, ref.end);
            });
        }

        function processImportedModules(file: SourceFile, basePath: string) {
            forEach(file.statements, node => {
                if (isExternalModuleImportDeclaration(node) &&
                    getExternalModuleImportDeclarationExpression(node).kind === SyntaxKind.StringLiteral) {

                    var nameLiteral = <LiteralExpression>getExternalModuleImportDeclarationExpression(node);
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
                        if (isExternalModuleImportDeclaration(node) &&
                            getExternalModuleImportDeclarationExpression(node).kind === SyntaxKind.StringLiteral) {

                            var nameLiteral = <LiteralExpression>getExternalModuleImportDeclarationExpression(node);
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

            function findModuleSourceFile(fileName: string, nameLiteral: LiteralExpression) {
                return findSourceFile(fileName, /* isDefaultLib */ false, file, nameLiteral.pos, nameLiteral.end - nameLiteral.pos);
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
                        && !fileExtensionIs(sourceFile.fileName, ".js")) {
                        var sourcePathComponents = getNormalizedPathComponents(sourceFile.fileName, host.getCurrentDirectory());
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