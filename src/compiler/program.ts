/// <reference path="sys.ts" />
/// <reference path="emitter.ts" />

module ts {
    /* @internal */ export let programTime = 0;
    /* @internal */ export let emitTime = 0;
    /* @internal */ export let ioReadTime = 0;
    /* @internal */ export let ioWriteTime = 0;

    /** The version of the TypeScript compiler release */
    export const version = "1.5.0";

    export function findConfigFile(searchPath: string): string {
        var fileName = "tsconfig.json";
        while (true) {
            if (sys.fileExists(fileName)) {
                return fileName;
            }
            var parentPath = getDirectoryPath(searchPath);
            if (parentPath === searchPath) {
                break;
            }
            searchPath = parentPath;
            fileName = "../" + fileName;
        }
        return undefined;
    }

    export function createCompilerHost(options: CompilerOptions, setParentNodes?: boolean): CompilerHost {
        let currentDirectory: string;
        let existingDirectories: Map<boolean> = {};

        function getCanonicalFileName(fileName: string): string {
            // if underlying system can distinguish between two files whose names differs only in cases then file name already in canonical form.
            // otherwise use toLowerCase as a canonical form.
            return sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
        }
        
        // returned by CScript sys environment
        let unsupportedFileEncodingErrorCode = -2147024809;

        function getSourceFile(fileName: string, languageVersion: ScriptTarget, onError?: (message: string) => void): SourceFile {
            let text: string;
            try {
                let start = new Date().getTime();
                text = sys.readFile(fileName, options.charset);
                ioReadTime += new Date().getTime() - start;
            }
            catch (e) {
                if (onError) {
                    onError(e.number === unsupportedFileEncodingErrorCode
                        ? createCompilerDiagnostic(Diagnostics.Unsupported_file_encoding).messageText
                        : e.message);
                }
                text = "";
            }

            return text !== undefined ? createSourceFile(fileName, text, languageVersion, setParentNodes) : undefined;
        }

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
                let parentDirectory = getDirectoryPath(directoryPath);
                ensureDirectoriesExist(parentDirectory);
                sys.createDirectory(directoryPath);
            }
        }

        function writeFile(fileName: string, data: string, writeByteOrderMark: boolean, onError?: (message: string) => void) {
            try {
                var start = new Date().getTime();
                ensureDirectoriesExist(getDirectoryPath(normalizePath(fileName)));
                sys.writeFile(fileName, data, writeByteOrderMark);
                ioWriteTime += new Date().getTime() - start;
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

    export function getPreEmitDiagnostics(program: Program): Diagnostic[] {
        let diagnostics = program.getSyntacticDiagnostics().concat(program.getGlobalDiagnostics()).concat(program.getSemanticDiagnostics());

        if (program.getCompilerOptions().declaration) {
            diagnostics.concat(program.getDeclarationDiagnostics());
        }

        return sortAndDeduplicateDiagnostics(diagnostics);
    }

    export function flattenDiagnosticMessageText(messageText: string | DiagnosticMessageChain, newLine: string): string {
        if (typeof messageText === "string") {
            return messageText;
        }
        else {
            let diagnosticChain = messageText;
            let result = "";

            let indent = 0;
            while (diagnosticChain) {
                if (indent) {
                    result += newLine;

                    for (let i = 0; i < indent; i++) {
                        result += "  ";
                    }
                }
                result += diagnosticChain.messageText;
                indent++;
                diagnosticChain = diagnosticChain.next;
            }

            return result;
        }
    }

    export function createProgram(rootNames: string[], options: CompilerOptions, host?: CompilerHost): Program {
        let program: Program;
        let files: SourceFile[] = [];
        let filesByName: Map<SourceFile> = {};
        let diagnostics = createDiagnosticCollection();
        let seenNoDefaultLib = options.noLib;
        let commonSourceDirectory: string;
        let diagnosticsProducingTypeChecker: TypeChecker;
        let noDiagnosticsTypeChecker: TypeChecker;

        let start = new Date().getTime();

        host = host || createCompilerHost(options);
        forEach(rootNames, name => processRootFile(name, false));
        if (!seenNoDefaultLib) {
            processRootFile(host.getDefaultLibFileName(options), true);
        }
        verifyCompilerOptions();

        programTime += new Date().getTime() - start;

        program = {
            getSourceFile: getSourceFile,
            getSourceFiles: () => files,
            getCompilerOptions: () => options,
            getSyntacticDiagnostics,
            getGlobalDiagnostics,
            getSemanticDiagnostics,
            getDeclarationDiagnostics,
            getTypeChecker,
            getDiagnosticsProducingTypeChecker,
            getCommonSourceDirectory: () => commonSourceDirectory,
            emit,
            getCurrentDirectory: () => host.getCurrentDirectory(),
            getNodeCount: () => getDiagnosticsProducingTypeChecker().getNodeCount(),
            getIdentifierCount: () => getDiagnosticsProducingTypeChecker().getIdentifierCount(),
            getSymbolCount: () => getDiagnosticsProducingTypeChecker().getSymbolCount(),
            getTypeCount: () => getDiagnosticsProducingTypeChecker().getTypeCount(),
        };
        return program;

        function getEmitHost(writeFileCallback?: WriteFileCallback): EmitHost {
            return {
                getCanonicalFileName: fileName => host.getCanonicalFileName(fileName),
                getCommonSourceDirectory: program.getCommonSourceDirectory,
                getCompilerOptions: program.getCompilerOptions,
                getCurrentDirectory: () => host.getCurrentDirectory(),
                getNewLine: () => host.getNewLine(),
                getSourceFile: program.getSourceFile,
                getSourceFiles: program.getSourceFiles,
                writeFile: writeFileCallback || (
                    (fileName, data, writeByteOrderMark, onError) => host.writeFile(fileName, data, writeByteOrderMark, onError)),
            };
        }

        function getDiagnosticsProducingTypeChecker() {
            return diagnosticsProducingTypeChecker || (diagnosticsProducingTypeChecker = createTypeChecker(program, /*produceDiagnostics:*/ true));
        }

        function getTypeChecker() {
            return noDiagnosticsTypeChecker || (noDiagnosticsTypeChecker = createTypeChecker(program, /*produceDiagnostics:*/ false));
        }

        function emit(sourceFile?: SourceFile, writeFileCallback?: WriteFileCallback): EmitResult {
            // If the noEmitOnError flag is set, then check if we have any errors so far.  If so,
            // immediately bail out.
            if (options.noEmitOnError && getPreEmitDiagnostics(this).length > 0) {
                return { diagnostics: [], sourceMaps: undefined, emitSkipped: true };
            }

            // Create the emit resolver outside of the "emitTime" tracking code below.  That way
            // any cost associated with it (like type checking) are appropriate associated with
            // the type-checking counter.
            let emitResolver = getDiagnosticsProducingTypeChecker().getEmitResolver(sourceFile);

            let start = new Date().getTime();

            let emitResult = emitFiles(
                emitResolver,
                getEmitHost(writeFileCallback),
                sourceFile);

            emitTime += new Date().getTime() - start;
            return emitResult;
        }

        function getSourceFile(fileName: string) {
            fileName = host.getCanonicalFileName(fileName);
            return hasProperty(filesByName, fileName) ? filesByName[fileName] : undefined;
        }

        function getDiagnosticsHelper(sourceFile: SourceFile, getDiagnostics: (sourceFile: SourceFile) => Diagnostic[]): Diagnostic[] {
            if (sourceFile) {
                return getDiagnostics(sourceFile);
            }

            let allDiagnostics: Diagnostic[] = [];
            forEach(program.getSourceFiles(), sourceFile => {
                addRange(allDiagnostics, getDiagnostics(sourceFile));
            });

            return sortAndDeduplicateDiagnostics(allDiagnostics);
        }

        function getSyntacticDiagnostics(sourceFile?: SourceFile): Diagnostic[] {
            return getDiagnosticsHelper(sourceFile, getSyntacticDiagnosticsForFile);
        }

        function getSemanticDiagnostics(sourceFile?: SourceFile): Diagnostic[] {
            return getDiagnosticsHelper(sourceFile, getSemanticDiagnosticsForFile);
        }

        function getDeclarationDiagnostics(sourceFile?: SourceFile): Diagnostic[] {
            return getDiagnosticsHelper(sourceFile, getDeclarationDiagnosticsForFile);
        }

        function getSyntacticDiagnosticsForFile(sourceFile: SourceFile): Diagnostic[] {
            return sourceFile.parseDiagnostics;
        }

        function getSemanticDiagnosticsForFile(sourceFile: SourceFile): Diagnostic[] {
            let typeChecker = getDiagnosticsProducingTypeChecker();

            Debug.assert(!!sourceFile.bindDiagnostics);
            let bindDiagnostics = sourceFile.bindDiagnostics;
            let checkDiagnostics = typeChecker.getDiagnostics(sourceFile);
            let programDiagnostics = diagnostics.getDiagnostics(sourceFile.fileName);

            return bindDiagnostics.concat(checkDiagnostics).concat(programDiagnostics);
        }

        function getDeclarationDiagnosticsForFile(sourceFile: SourceFile): Diagnostic[] {
            if (!isDeclarationFile(sourceFile)) {
                let resolver = getDiagnosticsProducingTypeChecker().getEmitResolver(sourceFile);
                // Don't actually write any files since we're just getting diagnostics.
                var writeFile: WriteFileCallback = () => { };
                return ts.getDeclarationDiagnostics(getEmitHost(writeFile), resolver, sourceFile);
            }
        }

        function getGlobalDiagnostics(): Diagnostic[] {
            let typeChecker = getDiagnosticsProducingTypeChecker();

            let allDiagnostics: Diagnostic[] = [];
            addRange(allDiagnostics, typeChecker.getGlobalDiagnostics());
            addRange(allDiagnostics, diagnostics.getGlobalDiagnostics());

            return sortAndDeduplicateDiagnostics(allDiagnostics);
        }

        function hasExtension(fileName: string): boolean {
            return getBaseFileName(fileName).indexOf(".") >= 0;
        }

        function processRootFile(fileName: string, isDefaultLib: boolean) {
            processSourceFile(normalizePath(fileName), isDefaultLib);
        }

        function processSourceFile(fileName: string, isDefaultLib: boolean, refFile?: SourceFile, refPos?: number, refEnd?: number) {
            let start: number;
            let length: number;
            if (refEnd !== undefined && refPos !== undefined) {
                start = refPos;
                length = refEnd - refPos;
            }
            let diagnostic: DiagnosticMessage;
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
                    diagnostics.add(createFileDiagnostic(refFile, start, length, diagnostic, fileName));
                }
                else {
                    diagnostics.add(createCompilerDiagnostic(diagnostic, fileName));
                }
            }
        }

        // Get source file from normalized fileName
        function findSourceFile(fileName: string, isDefaultLib: boolean, refFile?: SourceFile, refStart?: number, refLength?: number): SourceFile {
            let canonicalName = host.getCanonicalFileName(fileName);
            if (hasProperty(filesByName, canonicalName)) {
                // We've already looked for this file, use cached result
                return getSourceFileFromCache(fileName, canonicalName, /*useAbsolutePath*/ false);
            }
            else {
                let normalizedAbsolutePath = getNormalizedAbsolutePath(fileName, host.getCurrentDirectory());
                let canonicalAbsolutePath = host.getCanonicalFileName(normalizedAbsolutePath);
                if (hasProperty(filesByName, canonicalAbsolutePath)) {
                    return getSourceFileFromCache(normalizedAbsolutePath, canonicalAbsolutePath, /*useAbsolutePath*/ true);
                }

                // We haven't looked for this file, do so now and cache result
                let file = filesByName[canonicalName] = host.getSourceFile(fileName, options.target, hostErrorMessage => {
                    if (refFile) {
                        diagnostics.add(createFileDiagnostic(refFile, refStart, refLength,
                            Diagnostics.Cannot_read_file_0_Colon_1, fileName, hostErrorMessage));
                    }
                    else {
                        diagnostics.add(createCompilerDiagnostic(Diagnostics.Cannot_read_file_0_Colon_1, fileName, hostErrorMessage));
                    }
                });
                if (file) {
                    seenNoDefaultLib = seenNoDefaultLib || file.hasNoDefaultLib;

                    // Set the source file for normalized absolute path
                    filesByName[canonicalAbsolutePath] = file;

                    if (!options.noResolve) {
                        let basePath = getDirectoryPath(fileName);
                        processReferencedFiles(file, basePath);
                        processImportedModules(file, basePath);
                    }
                    if (isDefaultLib) {
                        files.unshift(file);
                    }
                    else {
                        files.push(file);
                    }
                }

                return file;
            }

            function getSourceFileFromCache(fileName: string, canonicalName: string, useAbsolutePath: boolean): SourceFile {
                let file = filesByName[canonicalName];
                if (file && host.useCaseSensitiveFileNames()) {
                    let sourceFileName = useAbsolutePath ? getNormalizedAbsolutePath(file.fileName, host.getCurrentDirectory()) : file.fileName;
                    if (canonicalName !== sourceFileName) {
                        diagnostics.add(createFileDiagnostic(refFile, refStart, refLength,
                            Diagnostics.File_name_0_differs_from_already_included_file_name_1_only_in_casing, fileName, sourceFileName));
                    }
                }
                return file;
            }
        }

        function processReferencedFiles(file: SourceFile, basePath: string) {
            forEach(file.referencedFiles, ref => {
                let referencedFileName = isRootedDiskPath(ref.fileName) ? ref.fileName : combinePaths(basePath, ref.fileName);
                processSourceFile(normalizePath(referencedFileName), /* isDefaultLib */ false, file, ref.pos, ref.end);
            });
        }

        function processImportedModules(file: SourceFile, basePath: string) {
            forEach(file.statements, node => {
                if (node.kind === SyntaxKind.ImportDeclaration || node.kind === SyntaxKind.ImportEqualsDeclaration || node.kind === SyntaxKind.ExportDeclaration) {
                    let moduleNameExpr = getExternalModuleName(node);
                    if (moduleNameExpr && moduleNameExpr.kind === SyntaxKind.StringLiteral) {
                        let moduleNameText = (<LiteralExpression>moduleNameExpr).text;
                        if (moduleNameText) {
                            let searchPath = basePath;
                            while (true) {
                                let searchName = normalizePath(combinePaths(searchPath, moduleNameText));
                                if (findModuleSourceFile(searchName + ".ts", moduleNameExpr) || findModuleSourceFile(searchName + ".d.ts", moduleNameExpr)) {
                                    break;
                                }
                                let parentPath = getDirectoryPath(searchPath);
                                if (parentPath === searchPath) {
                                    break;
                                }
                                searchPath = parentPath;
                            }
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

                            let nameLiteral = <LiteralExpression>getExternalModuleImportEqualsDeclarationExpression(node);
                            let moduleName = nameLiteral.text;
                            if (moduleName) {
                                // TypeScript 1.0 spec (April 2014): 12.1.6
                                // An ExternalImportDeclaration in anAmbientExternalModuleDeclaration may reference other external modules 
                                // only through top - level external module names. Relative external module names are not permitted.
                                let searchName = normalizePath(combinePaths(basePath, moduleName));
                                let tsFile = findModuleSourceFile(searchName + ".ts", nameLiteral);
                                if (!tsFile) {
                                    findModuleSourceFile(searchName + ".d.ts", nameLiteral);
                                }
                            }
                        }
                    });
                }
            });

            function findModuleSourceFile(fileName: string, nameLiteral: Expression) {
                return findSourceFile(fileName, /* isDefaultLib */ false, file, nameLiteral.pos, nameLiteral.end - nameLiteral.pos);
            }
        }

        function verifyCompilerOptions() {
            if (options.separateCompilation) {
                if (options.sourceMap) {
                    diagnostics.add(createCompilerDiagnostic(Diagnostics.Option_sourceMap_cannot_be_specified_with_option_separateCompilation));
                }

                if (options.declaration) {
                    diagnostics.add(createCompilerDiagnostic(Diagnostics.Option_declaration_cannot_be_specified_with_option_separateCompilation));
                }

                if (options.noEmitOnError) {
                    diagnostics.add(createCompilerDiagnostic(Diagnostics.Option_noEmitOnError_cannot_be_specified_with_option_separateCompilation));
                }

                if (options.out) {
                    diagnostics.add(createCompilerDiagnostic(Diagnostics.Option_out_cannot_be_specified_with_option_separateCompilation));
                }
            }

            if (!options.sourceMap && (options.mapRoot || options.sourceRoot)) {
                // Error to specify --mapRoot or --sourceRoot without mapSourceFiles
                if (options.mapRoot) {
                    diagnostics.add(createCompilerDiagnostic(Diagnostics.Option_mapRoot_cannot_be_specified_without_specifying_sourcemap_option));
                }
                if (options.sourceRoot) {
                    diagnostics.add(createCompilerDiagnostic(Diagnostics.Option_sourceRoot_cannot_be_specified_without_specifying_sourcemap_option));
                }
                return;
            }

            let languageVersion = options.target || ScriptTarget.ES3;

            let firstExternalModuleSourceFile = forEach(files, f => isExternalModule(f) ? f : undefined);
            if (options.separateCompilation) {
                if (!options.module && languageVersion < ScriptTarget.ES6) {
                    diagnostics.add(createCompilerDiagnostic(Diagnostics.Option_separateCompilation_can_only_be_used_when_either_option_module_is_provided_or_option_target_is_ES6_or_higher));
                }

                let firstNonExternalModuleSourceFile = forEach(files, f => !isExternalModule(f) && !isDeclarationFile(f) ? f : undefined);
                if (firstNonExternalModuleSourceFile) {
                    let span = getErrorSpanForNode(firstNonExternalModuleSourceFile, firstNonExternalModuleSourceFile);
                    diagnostics.add(createFileDiagnostic(firstNonExternalModuleSourceFile, span.start, span.length, Diagnostics.Cannot_compile_non_external_modules_when_the_separateCompilation_flag_is_provided));
                }
            }
            else if (firstExternalModuleSourceFile && languageVersion < ScriptTarget.ES6 && !options.module) {
                // We cannot use createDiagnosticFromNode because nodes do not have parents yet 
                let span = getErrorSpanForNode(firstExternalModuleSourceFile, firstExternalModuleSourceFile.externalModuleIndicator);
                diagnostics.add(createFileDiagnostic(firstExternalModuleSourceFile, span.start, span.length, Diagnostics.Cannot_compile_external_modules_unless_the_module_flag_is_provided));
            }

            // Cannot specify module gen target when in es6 or above
            if (options.module && languageVersion >= ScriptTarget.ES6) {
                diagnostics.add(createCompilerDiagnostic(Diagnostics.Cannot_compile_external_modules_into_amd_or_commonjs_when_targeting_es6_or_higher));
            }

            // there has to be common source directory if user specified --outdir || --sourceRoot
            // if user specified --mapRoot, there needs to be common source directory if there would be multiple files being emitted
            if (options.outDir || // there is --outDir specified
                options.sourceRoot || // there is --sourceRoot specified
                (options.mapRoot &&  // there is --mapRoot specified and there would be multiple js files generated
                    (!options.out || firstExternalModuleSourceFile !== undefined))) {

                let commonPathComponents: string[];
                forEach(files, sourceFile => {
                    // Each file contributes into common source file path
                    if (!(sourceFile.flags & NodeFlags.DeclarationFile)
                        && !fileExtensionIs(sourceFile.fileName, ".js")) {
                        let sourcePathComponents = getNormalizedPathComponents(sourceFile.fileName, host.getCurrentDirectory());
                        sourcePathComponents.pop(); // FileName is not part of directory
                        if (commonPathComponents) {
                            for (let i = 0; i < Math.min(commonPathComponents.length, sourcePathComponents.length); i++) {
                                if (commonPathComponents[i] !== sourcePathComponents[i]) {
                                    if (i === 0) {
                                        diagnostics.add(createCompilerDiagnostic(Diagnostics.Cannot_find_the_common_subdirectory_path_for_the_input_files));
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
                    diagnostics.add(createCompilerDiagnostic(Diagnostics.Option_noEmit_cannot_be_specified_with_option_out_or_outDir));
                }

                if (options.declaration) {
                    diagnostics.add(createCompilerDiagnostic(Diagnostics.Option_noEmit_cannot_be_specified_with_option_declaration));
                }
            }
        }
    }
}