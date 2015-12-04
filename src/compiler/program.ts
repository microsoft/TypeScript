/// <reference path="sys.ts" />
/// <reference path="emitter.ts" />
/// <reference path="core.ts" />

namespace ts {
    /* @internal */ export let programTime = 0;
    /* @internal */ export let emitTime = 0;
    /* @internal */ export let ioReadTime = 0;
    /* @internal */ export let ioWriteTime = 0;

    /** The version of the TypeScript compiler release */

    let emptyArray: any[] = [];

    export const version = "1.7.5";

    export function findConfigFile(searchPath: string): string {
        let fileName = "tsconfig.json";
        while (true) {
            if (sys.fileExists(fileName)) {
                return fileName;
            }
            let parentPath = getDirectoryPath(searchPath);
            if (parentPath === searchPath) {
                break;
            }
            searchPath = parentPath;
            fileName = "../" + fileName;
        }
        return undefined;
    }

    export function resolveTripleslashReference(moduleName: string, containingFile: string): string {
        let basePath = getDirectoryPath(containingFile);
        let referencedFileName = isRootedDiskPath(moduleName) ? moduleName : combinePaths(basePath, moduleName);
        return normalizePath(referencedFileName);
    }

    export function resolveModuleName(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost): ResolvedModuleWithFailedLookupLocations {
        let moduleResolution = compilerOptions.moduleResolution !== undefined
            ? compilerOptions.moduleResolution
            : compilerOptions.module === ModuleKind.CommonJS ? ModuleResolutionKind.NodeJs : ModuleResolutionKind.Classic;

        switch (moduleResolution) {
            case ModuleResolutionKind.NodeJs: return nodeModuleNameResolver(moduleName, containingFile, host);
            case ModuleResolutionKind.Classic: return classicNameResolver(moduleName, containingFile, compilerOptions, host);
        }
    }

    export function nodeModuleNameResolver(moduleName: string, containingFile: string, host: ModuleResolutionHost): ResolvedModuleWithFailedLookupLocations {
        let containingDirectory = getDirectoryPath(containingFile);

        if (getRootLength(moduleName) !== 0 || nameStartsWithDotSlashOrDotDotSlash(moduleName)) {
            let failedLookupLocations: string[] = [];
            let candidate = normalizePath(combinePaths(containingDirectory, moduleName));
            let resolvedFileName = loadNodeModuleFromFile(candidate, failedLookupLocations, host);

            if (resolvedFileName) {
                return { resolvedModule: { resolvedFileName }, failedLookupLocations };
            }

            resolvedFileName = loadNodeModuleFromDirectory(candidate, failedLookupLocations, host);
            return resolvedFileName
                ? { resolvedModule: { resolvedFileName }, failedLookupLocations }
                : { resolvedModule: undefined, failedLookupLocations };
        }
        else {
            return loadModuleFromNodeModules(moduleName, containingDirectory, host);
        }
    }

    function loadNodeModuleFromFile(candidate: string, failedLookupLocation: string[], host: ModuleResolutionHost): string {
        return forEach(moduleFileExtensions, tryLoad);

        function tryLoad(ext: string): string {
            let fileName = fileExtensionIs(candidate, ext) ? candidate : candidate + ext;
            if (host.fileExists(fileName)) {
                return fileName;
            }
            else {
                failedLookupLocation.push(fileName);
                return undefined;
            }
        }
    }

    function loadNodeModuleFromDirectory(candidate: string, failedLookupLocation: string[], host: ModuleResolutionHost): string {
        let packageJsonPath = combinePaths(candidate, "package.json");
        if (host.fileExists(packageJsonPath)) {

            let jsonContent: { typings?: string };

            try {
                let jsonText = host.readFile(packageJsonPath);
                jsonContent = jsonText ? <{ typings?: string }>JSON.parse(jsonText) : { typings: undefined };
            }
            catch (e) {
                // gracefully handle if readFile fails or returns not JSON 
                jsonContent = { typings: undefined };
            }

            if (jsonContent.typings) {
                let result = loadNodeModuleFromFile(normalizePath(combinePaths(candidate, jsonContent.typings)), failedLookupLocation, host);
                if (result) {
                    return result;
                }
            }
        }
        else {
            // record package json as one of failed lookup locations - in the future if this file will appear it will invalidate resolution results
            failedLookupLocation.push(packageJsonPath);
        }

        return loadNodeModuleFromFile(combinePaths(candidate, "index"), failedLookupLocation, host);
    }

    function loadModuleFromNodeModules(moduleName: string, directory: string, host: ModuleResolutionHost): ResolvedModuleWithFailedLookupLocations {
        let failedLookupLocations: string[] = [];
        directory = normalizeSlashes(directory);
        while (true) {
            let baseName = getBaseFileName(directory);
            if (baseName !== "node_modules") {
                let nodeModulesFolder = combinePaths(directory, "node_modules");
                let candidate = normalizePath(combinePaths(nodeModulesFolder, moduleName));
                let result = loadNodeModuleFromFile(candidate, failedLookupLocations, host);
                if (result) {
                    return { resolvedModule: { resolvedFileName: result, isExternalLibraryImport: true }, failedLookupLocations };
                }

                result = loadNodeModuleFromDirectory(candidate, failedLookupLocations, host);
                if (result) {
                    return { resolvedModule: { resolvedFileName: result, isExternalLibraryImport: true }, failedLookupLocations };
                }
            }

            let parentPath = getDirectoryPath(directory);
            if (parentPath === directory) {
                break;
            }

            directory = parentPath;
        }

        return { resolvedModule: undefined, failedLookupLocations };
    }

    function nameStartsWithDotSlashOrDotDotSlash(name: string) {
        let i = name.lastIndexOf("./", 1);
        return i === 0 || (i === 1 && name.charCodeAt(0) === CharacterCodes.dot);
    }

    export function classicNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost): ResolvedModuleWithFailedLookupLocations {

        // module names that contain '!' are used to reference resources and are not resolved to actual files on disk
        if (moduleName.indexOf("!") != -1) {
            return { resolvedModule: undefined, failedLookupLocations: [] };
        }

        let searchPath = getDirectoryPath(containingFile);
        let searchName: string;

        let failedLookupLocations: string[] = [];

        let referencedSourceFile: string;
        while (true) {
            searchName = normalizePath(combinePaths(searchPath, moduleName));
            referencedSourceFile = forEach(supportedExtensions, extension => {
                if (extension === ".tsx" && !compilerOptions.jsx) {
                    // resolve .tsx files only if jsx support is enabled 
                    // 'logical not' handles both undefined and None cases
                    return undefined;
                }

                let candidate = searchName + extension;
                if (host.fileExists(candidate)) {
                    return candidate;
                }
                else {
                    failedLookupLocations.push(candidate);
                }
            });

            if (referencedSourceFile) {
                break;
            }

            let parentPath = getDirectoryPath(searchPath);
            if (parentPath === searchPath) {
                break;
            }
            searchPath = parentPath;
        }

        return referencedSourceFile
            ? { resolvedModule: { resolvedFileName: referencedSourceFile  }, failedLookupLocations }
            : { resolvedModule: undefined, failedLookupLocations };
    }

    /* @internal */
    export const defaultInitCompilerOptions: CompilerOptions = {
        module: ModuleKind.CommonJS,
        target: ScriptTarget.ES3,
        noImplicitAny: false,
        outDir: "built",
        rootDir: ".",
        sourceMap: false,
    };

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
                let start = new Date().getTime();
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

        const newLine = getNewLineCharacter(options);

        return {
            getSourceFile,
            getDefaultLibFileName: options => combinePaths(getDirectoryPath(normalizePath(sys.getExecutingFilePath())), getDefaultLibFileName(options)),
            writeFile,
            getCurrentDirectory: () => currentDirectory || (currentDirectory = sys.getCurrentDirectory()),
            useCaseSensitiveFileNames: () => sys.useCaseSensitiveFileNames,
            getCanonicalFileName,
            getNewLine: () => newLine,
            fileExists: fileName => sys.fileExists(fileName),
            readFile: fileName => sys.readFile(fileName)
        };
    }

    export function getPreEmitDiagnostics(program: Program, sourceFile?: SourceFile, cancellationToken?: CancellationToken): Diagnostic[] {
        let diagnostics = program.getOptionsDiagnostics(cancellationToken).concat(
                          program.getSyntacticDiagnostics(sourceFile, cancellationToken),
                          program.getGlobalDiagnostics(cancellationToken),
                          program.getSemanticDiagnostics(sourceFile, cancellationToken));

        if (program.getCompilerOptions().declaration) {
            diagnostics.concat(program.getDeclarationDiagnostics(sourceFile, cancellationToken));
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

    export function createProgram(rootNames: string[], options: CompilerOptions, host?: CompilerHost, oldProgram?: Program): Program {
        let program: Program;
        let files: SourceFile[] = [];
        let fileProcessingDiagnostics = createDiagnosticCollection();
        let programDiagnostics = createDiagnosticCollection();

        let commonSourceDirectory: string;
        let diagnosticsProducingTypeChecker: TypeChecker;
        let noDiagnosticsTypeChecker: TypeChecker;
        let classifiableNames: Map<string>;

        let skipDefaultLib = options.noLib;

        let start = new Date().getTime();

        host = host || createCompilerHost(options);

        const resolveModuleNamesWorker = host.resolveModuleNames
            ? ((moduleNames: string[], containingFile: string) => host.resolveModuleNames(moduleNames, containingFile))
            : ((moduleNames: string[], containingFile: string) => map(moduleNames, moduleName => resolveModuleName(moduleName, containingFile, options, host).resolvedModule));

        let filesByName = createFileMap<SourceFile>(fileName => host.getCanonicalFileName(fileName));

        if (oldProgram) {
            // check properties that can affect structure of the program or module resolution strategy
            // if any of these properties has changed - structure cannot be reused
            let oldOptions = oldProgram.getCompilerOptions();
            if ((oldOptions.module !== options.module) ||
                (oldOptions.noResolve !== options.noResolve) ||
                (oldOptions.target !== options.target) ||
                (oldOptions.noLib !== options.noLib) ||
                (oldOptions.jsx !== options.jsx)) {
                oldProgram = undefined;
            }
        }

        if (!tryReuseStructureFromOldProgram()) {
            forEach(rootNames, name => processRootFile(name, false));
            // Do not process the default library if:
            //  - The '--noLib' flag is used.
            //  - A 'no-default-lib' reference comment is encountered in
            //      processing the root files.
            if (!skipDefaultLib) {
                processRootFile(host.getDefaultLibFileName(options), true);
            }
        }

        verifyCompilerOptions();

        // unconditionally set oldProgram to undefined to prevent it from being captured in closure
        oldProgram = undefined;

        programTime += new Date().getTime() - start;

        program = {
            getRootFileNames: () => rootNames,
            getSourceFile: getSourceFile,
            getSourceFiles: () => files,
            getCompilerOptions: () => options,
            getSyntacticDiagnostics,
            getOptionsDiagnostics,
            getGlobalDiagnostics,
            getSemanticDiagnostics,
            getDeclarationDiagnostics,
            getTypeChecker,
            getClassifiableNames,
            getDiagnosticsProducingTypeChecker,
            getCommonSourceDirectory: () => commonSourceDirectory,
            emit,
            getCurrentDirectory: () => host.getCurrentDirectory(),
            getNodeCount: () => getDiagnosticsProducingTypeChecker().getNodeCount(),
            getIdentifierCount: () => getDiagnosticsProducingTypeChecker().getIdentifierCount(),
            getSymbolCount: () => getDiagnosticsProducingTypeChecker().getSymbolCount(),
            getTypeCount: () => getDiagnosticsProducingTypeChecker().getTypeCount(),
            getFileProcessingDiagnostics: () => fileProcessingDiagnostics
        };
        return program;

        function getClassifiableNames() {
            if (!classifiableNames) {
                // Initialize a checker so that all our files are bound.
                getTypeChecker();
                classifiableNames = {};

                for (let sourceFile of files) {
                    copyMap(sourceFile.classifiableNames, classifiableNames);
                }
            }

            return classifiableNames;
        }

        function tryReuseStructureFromOldProgram(): boolean {
            if (!oldProgram) {
                return false;
            }

            Debug.assert(!oldProgram.structureIsReused);

            // there is an old program, check if we can reuse its structure
            let oldRootNames = oldProgram.getRootFileNames();
            if (!arrayIsEqualTo(oldRootNames, rootNames)) {
                return false;
            }

            // check if program source files has changed in the way that can affect structure of the program
            let newSourceFiles: SourceFile[] = [];
            let modifiedSourceFiles: SourceFile[] = [];
            for (let oldSourceFile of oldProgram.getSourceFiles()) {
                let newSourceFile = host.getSourceFile(oldSourceFile.fileName, options.target);
                if (!newSourceFile) {
                    return false;
                }

                if (oldSourceFile !== newSourceFile) {
                    if (oldSourceFile.hasNoDefaultLib !== newSourceFile.hasNoDefaultLib) {
                        // value of no-default-lib has changed
                        // this will affect if default library is injected into the list of files
                        return false;
                    }

                    // check tripleslash references
                    if (!arrayIsEqualTo(oldSourceFile.referencedFiles, newSourceFile.referencedFiles, fileReferenceIsEqualTo)) {
                        // tripleslash references has changed
                        return false;
                    }

                    // check imports
                    collectExternalModuleReferences(newSourceFile);
                    if (!arrayIsEqualTo(oldSourceFile.imports, newSourceFile.imports, moduleNameIsEqualTo)) {
                        // imports has changed
                        return false;
                    }

                    if (resolveModuleNamesWorker) {
                        let moduleNames = map(newSourceFile.imports, name => name.text);
                        let resolutions = resolveModuleNamesWorker(moduleNames, newSourceFile.fileName);
                        // ensure that module resolution results are still correct
                        for (let i = 0; i < moduleNames.length; ++i) {
                            let newResolution = resolutions[i];
                            let oldResolution = getResolvedModule(oldSourceFile, moduleNames[i]);
                            let resolutionChanged = oldResolution
                                ? !newResolution ||
                                  oldResolution.resolvedFileName !== newResolution.resolvedFileName ||
                                  !!oldResolution.isExternalLibraryImport !== !!newResolution.isExternalLibraryImport
                                : newResolution;

                            if (resolutionChanged) {
                                return false;
                            }
                        }
                    }
                    // pass the cache of module resolutions from the old source file
                    newSourceFile.resolvedModules = oldSourceFile.resolvedModules;
                    modifiedSourceFiles.push(newSourceFile);
                }
                else {
                    // file has no changes - use it as is
                    newSourceFile = oldSourceFile;
                }

                // if file has passed all checks it should be safe to reuse it
                newSourceFiles.push(newSourceFile);
            }

            // update fileName -> file mapping
            for (let file of newSourceFiles) {
                filesByName.set(file.fileName, file);
            }

            files = newSourceFiles;
            fileProcessingDiagnostics = oldProgram.getFileProcessingDiagnostics();

            for (let modifiedFile of modifiedSourceFiles) {
                fileProcessingDiagnostics.reattachFileDiagnostics(modifiedFile);
            }
            oldProgram.structureIsReused = true;

            return true;
        }

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

        function emit(sourceFile?: SourceFile, writeFileCallback?: WriteFileCallback, cancellationToken?: CancellationToken): EmitResult {
            return runWithCancellationToken(() => emitWorker(this, sourceFile, writeFileCallback, cancellationToken));
        }

        function emitWorker(program: Program, sourceFile: SourceFile, writeFileCallback: WriteFileCallback, cancellationToken: CancellationToken): EmitResult {
            // If the noEmitOnError flag is set, then check if we have any errors so far.  If so,
            // immediately bail out.  Note that we pass 'undefined' for 'sourceFile' so that we
            // get any preEmit diagnostics, not just the ones
            if (options.noEmitOnError && getPreEmitDiagnostics(program, /*sourceFile:*/ undefined, cancellationToken).length > 0) {
                return { diagnostics: [], sourceMaps: undefined, emitSkipped: true };
            }

            // Create the emit resolver outside of the "emitTime" tracking code below.  That way
            // any cost associated with it (like type checking) are appropriate associated with
            // the type-checking counter.
            //
            // If the -out option is specified, we should not pass the source file to getEmitResolver.
            // This is because in the -out scenario all files need to be emitted, and therefore all
            // files need to be type checked. And the way to specify that all files need to be type
            // checked is to not pass the file to getEmitResolver.
            let emitResolver = getDiagnosticsProducingTypeChecker().getEmitResolver((options.outFile || options.out) ? undefined : sourceFile);

            let start = new Date().getTime();

            let emitResult = emitFiles(
                emitResolver,
                getEmitHost(writeFileCallback),
                sourceFile);

            emitTime += new Date().getTime() - start;
            return emitResult;
        }

        function getSourceFile(fileName: string) {
            // first try to use file name as is to find file
            // then try to convert relative file name to absolute and use it to retrieve source file
            return filesByName.get(fileName) || filesByName.get(getNormalizedAbsolutePath(fileName, host.getCurrentDirectory()));
        }

        function getDiagnosticsHelper(
                sourceFile: SourceFile,
                getDiagnostics: (sourceFile: SourceFile, cancellationToken: CancellationToken) => Diagnostic[],
                cancellationToken: CancellationToken): Diagnostic[] {
            if (sourceFile) {
                return getDiagnostics(sourceFile, cancellationToken);
            }

            let allDiagnostics: Diagnostic[] = [];
            forEach(program.getSourceFiles(), sourceFile => {
                if (cancellationToken) {
                    cancellationToken.throwIfCancellationRequested();
                }
                addRange(allDiagnostics, getDiagnostics(sourceFile, cancellationToken));
            });

            return sortAndDeduplicateDiagnostics(allDiagnostics);
        }

        function getSyntacticDiagnostics(sourceFile: SourceFile, cancellationToken: CancellationToken): Diagnostic[] {
            return getDiagnosticsHelper(sourceFile, getSyntacticDiagnosticsForFile, cancellationToken);
        }

        function getSemanticDiagnostics(sourceFile: SourceFile, cancellationToken: CancellationToken): Diagnostic[] {
            return getDiagnosticsHelper(sourceFile, getSemanticDiagnosticsForFile, cancellationToken);
        }

        function getDeclarationDiagnostics(sourceFile: SourceFile, cancellationToken: CancellationToken): Diagnostic[] {
            return getDiagnosticsHelper(sourceFile, getDeclarationDiagnosticsForFile, cancellationToken);
        }

        function getSyntacticDiagnosticsForFile(sourceFile: SourceFile, cancellationToken: CancellationToken): Diagnostic[] {
            return sourceFile.parseDiagnostics;
        }

        function runWithCancellationToken<T>(func: () => T): T {
            try {
                return func();
            }
            catch (e) {
                if (e instanceof OperationCanceledException) {
                    // We were canceled while performing the operation.  Because our type checker
                    // might be a bad state, we need to throw it away.
                    //
                    // Note: we are overly agressive here.  We do not actually *have* to throw away
                    // the "noDiagnosticsTypeChecker".  However, for simplicity, i'd like to keep
                    // the lifetimes of these two TypeCheckers the same.  Also, we generally only
                    // cancel when the user has made a change anyways.  And, in that case, we (the
                    // program instance) will get thrown away anyways.  So trying to keep one of
                    // these type checkers alive doesn't serve much purpose.
                    noDiagnosticsTypeChecker = undefined;
                    diagnosticsProducingTypeChecker = undefined;
                }

                throw e;
            }
        }

        function getSemanticDiagnosticsForFile(sourceFile: SourceFile, cancellationToken: CancellationToken): Diagnostic[] {
            return runWithCancellationToken(() => {
                let typeChecker = getDiagnosticsProducingTypeChecker();

                Debug.assert(!!sourceFile.bindDiagnostics);
                let bindDiagnostics = sourceFile.bindDiagnostics;
                let checkDiagnostics = typeChecker.getDiagnostics(sourceFile, cancellationToken);
                let fileProcessingDiagnosticsInFile = fileProcessingDiagnostics.getDiagnostics(sourceFile.fileName);
                let programDiagnosticsInFile = programDiagnostics.getDiagnostics(sourceFile.fileName);

                return bindDiagnostics.concat(checkDiagnostics).concat(fileProcessingDiagnosticsInFile).concat(programDiagnosticsInFile);
            });
        }

        function getDeclarationDiagnosticsForFile(sourceFile: SourceFile, cancellationToken: CancellationToken): Diagnostic[] {
            return runWithCancellationToken(() => {
                if (!isDeclarationFile(sourceFile)) {
                    let resolver = getDiagnosticsProducingTypeChecker().getEmitResolver(sourceFile, cancellationToken);
                    // Don't actually write any files since we're just getting diagnostics.
                    let writeFile: WriteFileCallback = () => { };
                    return ts.getDeclarationDiagnostics(getEmitHost(writeFile), resolver, sourceFile);
                }
            });
        }

        function getOptionsDiagnostics(): Diagnostic[] {
            let allDiagnostics: Diagnostic[] = [];
            addRange(allDiagnostics, fileProcessingDiagnostics.getGlobalDiagnostics());
            addRange(allDiagnostics, programDiagnostics.getGlobalDiagnostics());
            return sortAndDeduplicateDiagnostics(allDiagnostics);
        }

        function getGlobalDiagnostics(): Diagnostic[] {
            let allDiagnostics: Diagnostic[] = [];
            addRange(allDiagnostics, getDiagnosticsProducingTypeChecker().getGlobalDiagnostics());
            return sortAndDeduplicateDiagnostics(allDiagnostics);
        }

        function hasExtension(fileName: string): boolean {
            return getBaseFileName(fileName).indexOf(".") >= 0;
        }

        function processRootFile(fileName: string, isDefaultLib: boolean) {
            processSourceFile(normalizePath(fileName), isDefaultLib);
        }

        function fileReferenceIsEqualTo(a: FileReference, b: FileReference): boolean {
            return a.fileName === b.fileName;
        }

        function moduleNameIsEqualTo(a: LiteralExpression, b: LiteralExpression): boolean {
            return a.text === b.text;
        }

        function collectExternalModuleReferences(file: SourceFile): void {
            if (file.imports) {
                return;
            }

            let imports: LiteralExpression[];
            for (let node of file.statements) {
                collect(node, /* allowRelativeModuleNames */ true);
            }

            file.imports = imports || emptyArray;

            function collect(node: Node, allowRelativeModuleNames: boolean): void {
                switch (node.kind) {
                    case SyntaxKind.ImportDeclaration:
                    case SyntaxKind.ImportEqualsDeclaration:
                    case SyntaxKind.ExportDeclaration:
                        let moduleNameExpr = getExternalModuleName(node);
                        if (!moduleNameExpr || moduleNameExpr.kind !== SyntaxKind.StringLiteral) {
                            break;
                        }
                        if (!(<LiteralExpression>moduleNameExpr).text) {
                            break;
                        }

                        if (allowRelativeModuleNames || !isExternalModuleNameRelative((<LiteralExpression>moduleNameExpr).text)) {
                            (imports || (imports = [])).push(<LiteralExpression>moduleNameExpr);
                        }
                        break;
                    case SyntaxKind.ModuleDeclaration:
                        if ((<ModuleDeclaration>node).name.kind === SyntaxKind.StringLiteral && (node.flags & NodeFlags.Ambient || isDeclarationFile(file))) {
                            // TypeScript 1.0 spec (April 2014): 12.1.6
                            // An AmbientExternalModuleDeclaration declares an external module. 
                            // This type of declaration is permitted only in the global module.
                            // The StringLiteral must specify a top - level external module name.
                            // Relative external module names are not permitted
                            forEachChild((<ModuleDeclaration>node).body, node => {
                                // TypeScript 1.0 spec (April 2014): 12.1.6
                                // An ExternalImportDeclaration in anAmbientExternalModuleDeclaration may reference other external modules 
                                // only through top - level external module names. Relative external module names are not permitted.
                                collect(node, /* allowRelativeModuleNames */ false);
                            });
                        }
                        break;
                }
            }
        }

        function processSourceFile(fileName: string, isDefaultLib: boolean, refFile?: SourceFile, refPos?: number, refEnd?: number) {
            let diagnosticArgument: string[];
            let diagnostic: DiagnosticMessage;
            if (hasExtension(fileName)) {
                if (!options.allowNonTsExtensions && !forEach(supportedExtensions, extension => fileExtensionIs(host.getCanonicalFileName(fileName), extension))) {
                    diagnostic = Diagnostics.File_0_has_unsupported_extension_The_only_supported_extensions_are_1;
                    diagnosticArgument = [fileName, "'" + supportedExtensions.join("', '") + "'"];
                }
                else if (!findSourceFile(fileName, isDefaultLib, refFile, refPos, refEnd)) {
                    diagnostic = Diagnostics.File_0_not_found;
                    diagnosticArgument = [fileName];
                }
                else if (refFile && host.getCanonicalFileName(fileName) === host.getCanonicalFileName(refFile.fileName)) {
                    diagnostic = Diagnostics.A_file_cannot_have_a_reference_to_itself;
                    diagnosticArgument = [fileName];
                }
            }
            else {
                let nonTsFile: SourceFile = options.allowNonTsExtensions && findSourceFile(fileName, isDefaultLib, refFile, refPos, refEnd);
                if (!nonTsFile) {
                    if (options.allowNonTsExtensions) {
                        diagnostic = Diagnostics.File_0_not_found;
                        diagnosticArgument = [fileName];
                    }
                    else if (!forEach(supportedExtensions, extension => findSourceFile(fileName + extension, isDefaultLib, refFile, refPos, refEnd))) {
                        diagnostic = Diagnostics.File_0_not_found;
                        fileName += ".ts";
                        diagnosticArgument = [fileName];
                    }
                }
            }

            if (diagnostic) {
                if (refFile !== undefined && refEnd !== undefined && refPos !== undefined) {
                    fileProcessingDiagnostics.add(createFileDiagnostic(refFile, refPos, refEnd - refPos, diagnostic, ...diagnosticArgument));
                }
                else {
                    fileProcessingDiagnostics.add(createCompilerDiagnostic(diagnostic, ...diagnosticArgument));
                }
            }
        }

        // Get source file from normalized fileName
        function findSourceFile(fileName: string, isDefaultLib: boolean, refFile?: SourceFile, refPos?: number, refEnd?: number): SourceFile {
            if (filesByName.contains(fileName)) {
                // We've already looked for this file, use cached result
                return getSourceFileFromCache(fileName, /*useAbsolutePath*/ false);
            }

            let normalizedAbsolutePath = getNormalizedAbsolutePath(fileName, host.getCurrentDirectory());
            if (filesByName.contains(normalizedAbsolutePath)) {
                const file = getSourceFileFromCache(normalizedAbsolutePath, /*useAbsolutePath*/ true);
                // we don't have resolution for this relative file name but the match was found by absolute file name
                // store resolution for relative name as well 
                filesByName.set(fileName, file);
                return file;
            }

            // We haven't looked for this file, do so now and cache result
            let file = host.getSourceFile(fileName, options.target, hostErrorMessage => {
                if (refFile !== undefined && refPos !== undefined && refEnd !== undefined) {
                    fileProcessingDiagnostics.add(createFileDiagnostic(refFile, refPos, refEnd - refPos,
                        Diagnostics.Cannot_read_file_0_Colon_1, fileName, hostErrorMessage));
                }
                else {
                    fileProcessingDiagnostics.add(createCompilerDiagnostic(Diagnostics.Cannot_read_file_0_Colon_1, fileName, hostErrorMessage));
                }
            });

            filesByName.set(fileName, file);
            if (file) {
                skipDefaultLib = skipDefaultLib || file.hasNoDefaultLib;

                // Set the source file for normalized absolute path
                filesByName.set(normalizedAbsolutePath, file);

                let basePath = getDirectoryPath(fileName);
                if (!options.noResolve) {
                    processReferencedFiles(file, basePath);
                }

                // always process imported modules to record module name resolutions
                processImportedModules(file, basePath);

                if (isDefaultLib) {
                    file.isDefaultLib = true;
                    files.unshift(file);
                }
                else {
                    files.push(file);
                }
            }

            return file;

            function getSourceFileFromCache(fileName: string, useAbsolutePath: boolean): SourceFile {
                let file = filesByName.get(fileName);
                if (file && host.useCaseSensitiveFileNames()) {
                    let sourceFileName = useAbsolutePath ? getNormalizedAbsolutePath(file.fileName, host.getCurrentDirectory()) : file.fileName;
                    if (normalizeSlashes(fileName) !== normalizeSlashes(sourceFileName)) {
                        if (refFile !== undefined && refPos !== undefined && refEnd !== undefined) {
                            fileProcessingDiagnostics.add(createFileDiagnostic(refFile, refPos, refEnd - refPos,
                                Diagnostics.File_name_0_differs_from_already_included_file_name_1_only_in_casing, fileName, sourceFileName));
                        }
                        else {
                            fileProcessingDiagnostics.add(createCompilerDiagnostic(Diagnostics.File_name_0_differs_from_already_included_file_name_1_only_in_casing, fileName, sourceFileName));
                        }
                    }
                }
                return file;
            }
        }

        function processReferencedFiles(file: SourceFile, basePath: string) {
            forEach(file.referencedFiles, ref => {
                let referencedFileName = resolveTripleslashReference(ref.fileName, file.fileName);
                processSourceFile(referencedFileName, /* isDefaultLib */ false, file, ref.pos, ref.end);
            });
        }

        function processImportedModules(file: SourceFile, basePath: string) {
            collectExternalModuleReferences(file);
            if (file.imports.length) {
                file.resolvedModules = {};
                let moduleNames = map(file.imports, name => name.text);
                let resolutions = resolveModuleNamesWorker(moduleNames, file.fileName);
                for (let i = 0; i < file.imports.length; ++i) {
                    let resolution = resolutions[i];
                    setResolvedModule(file, moduleNames[i], resolution);
                    if (resolution && !options.noResolve) {
                        const importedFile = findModuleSourceFile(resolution.resolvedFileName, file.imports[i]);
                        if (importedFile && resolution.isExternalLibraryImport) {
                            if (!isExternalModule(importedFile)) {
                                let start = getTokenPosOfNode(file.imports[i], file);
                                fileProcessingDiagnostics.add(createFileDiagnostic(file, start, file.imports[i].end - start, Diagnostics.Exported_external_package_typings_file_0_is_not_a_module_Please_contact_the_package_author_to_update_the_package_definition, importedFile.fileName));
                            }
                            else if (importedFile.referencedFiles.length) {
                                let firstRef = importedFile.referencedFiles[0];
                                fileProcessingDiagnostics.add(createFileDiagnostic(importedFile, firstRef.pos, firstRef.end - firstRef.pos, Diagnostics.Exported_external_package_typings_file_cannot_contain_tripleslash_references_Please_contact_the_package_author_to_update_the_package_definition));
                            }
                        }
                    }
                }
            }
            else {
                // no imports - drop cached module resolutions
                file.resolvedModules = undefined;
            }
            return;

            function findModuleSourceFile(fileName: string, nameLiteral: Expression) {
                return findSourceFile(fileName, /* isDefaultLib */ false, file, skipTrivia(file.text, nameLiteral.pos), nameLiteral.end);
            }
        }

        function computeCommonSourceDirectory(sourceFiles: SourceFile[]): string {
            let commonPathComponents: string[];
            let currentDirectory = host.getCurrentDirectory();
            forEach(files, sourceFile => {
                // Each file contributes into common source file path
                if (isDeclarationFile(sourceFile)) {
                    return;
                }

                let sourcePathComponents = getNormalizedPathComponents(sourceFile.fileName, currentDirectory);
                sourcePathComponents.pop(); // The base file name is not part of the common directory path

                if (!commonPathComponents) {
                    // first file
                    commonPathComponents = sourcePathComponents;
                    return;
                }

                for (let i = 0, n = Math.min(commonPathComponents.length, sourcePathComponents.length); i < n; i++) {
                    if (commonPathComponents[i] !== sourcePathComponents[i]) {
                        if (i === 0) {
                            programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Cannot_find_the_common_subdirectory_path_for_the_input_files));
                            return;
                        }

                        // New common path found that is 0 -> i-1
                        commonPathComponents.length = i;
                        break;
                    }
                }

                // If the sourcePathComponents was shorter than the commonPathComponents, truncate to the sourcePathComponents
                if (sourcePathComponents.length < commonPathComponents.length) {
                    commonPathComponents.length = sourcePathComponents.length;
                }
            });

            return getNormalizedPathFromPathComponents(commonPathComponents);
        }

        function checkSourceFilesBelongToPath(sourceFiles: SourceFile[], rootDirectory: string): boolean {
            let allFilesBelongToPath = true;
            if (sourceFiles) {
                let currentDirectory = host.getCurrentDirectory();
                let absoluteRootDirectoryPath = host.getCanonicalFileName(getNormalizedAbsolutePath(rootDirectory, currentDirectory));

                for (var sourceFile of sourceFiles) {
                    if (!isDeclarationFile(sourceFile)) {
                        let absoluteSourceFilePath = host.getCanonicalFileName(getNormalizedAbsolutePath(sourceFile.fileName, currentDirectory));
                        if (absoluteSourceFilePath.indexOf(absoluteRootDirectoryPath) !== 0) {
                            programDiagnostics.add(createCompilerDiagnostic(Diagnostics.File_0_is_not_under_rootDir_1_rootDir_is_expected_to_contain_all_source_files, sourceFile.fileName, options.rootDir));
                            allFilesBelongToPath = false;
                        }
                    }
                }
            }

            return allFilesBelongToPath;
        }

        function verifyCompilerOptions() {
            if (options.isolatedModules) {
                if (options.declaration) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "declaration", "isolatedModules"));
                }

                if (options.noEmitOnError) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "noEmitOnError", "isolatedModules"));
                }

                if (options.out) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "out", "isolatedModules"));
                }

                if (options.outFile) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "outFile", "isolatedModules"));
                }
            }

            if (options.inlineSourceMap) {
                if (options.sourceMap) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "sourceMap", "inlineSourceMap"));
                }
                if (options.mapRoot) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "mapRoot", "inlineSourceMap"));
                }
                if (options.sourceRoot) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "sourceRoot", "inlineSourceMap"));
                }
            }


            if (options.inlineSources) {
                if (!options.sourceMap && !options.inlineSourceMap) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_inlineSources_can_only_be_used_when_either_option_inlineSourceMap_or_option_sourceMap_is_provided));
                }
            }

            if (options.out && options.outFile) {
                programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "out", "outFile"));
            }

            if (!options.sourceMap && (options.mapRoot || options.sourceRoot)) {
                // Error to specify --mapRoot or --sourceRoot without mapSourceFiles
                if (options.mapRoot) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "mapRoot", "sourceMap"));
                }
                if (options.sourceRoot) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "sourceRoot", "sourceMap"));
                }
                return;
            }

            let languageVersion = options.target || ScriptTarget.ES3;
            let outFile = options.outFile || options.out;

            let firstExternalModuleSourceFile = forEach(files, f => isExternalModule(f) ? f : undefined);
            if (options.isolatedModules) {
                if (!options.module && languageVersion < ScriptTarget.ES6) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_isolatedModules_can_only_be_used_when_either_option_module_is_provided_or_option_target_is_ES6_or_higher));
                }

                let firstNonExternalModuleSourceFile = forEach(files, f => !isExternalModule(f) && !isDeclarationFile(f) ? f : undefined);
                if (firstNonExternalModuleSourceFile) {
                    let span = getErrorSpanForNode(firstNonExternalModuleSourceFile, firstNonExternalModuleSourceFile);
                    programDiagnostics.add(createFileDiagnostic(firstNonExternalModuleSourceFile, span.start, span.length, Diagnostics.Cannot_compile_namespaces_when_the_isolatedModules_flag_is_provided));
                }
            }
            else if (firstExternalModuleSourceFile && languageVersion < ScriptTarget.ES6 && !options.module) {
                // We cannot use createDiagnosticFromNode because nodes do not have parents yet
                let span = getErrorSpanForNode(firstExternalModuleSourceFile, firstExternalModuleSourceFile.externalModuleIndicator);
                programDiagnostics.add(createFileDiagnostic(firstExternalModuleSourceFile, span.start, span.length, Diagnostics.Cannot_compile_modules_unless_the_module_flag_is_provided));
            }

            // Cannot specify module gen target of es6 when below es6
            if (options.module === ModuleKind.ES6 && languageVersion < ScriptTarget.ES6) {
                programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Cannot_compile_modules_into_es6_when_targeting_ES5_or_lower));
            }

            // there has to be common source directory if user specified --outdir || --sourceRoot
            // if user specified --mapRoot, there needs to be common source directory if there would be multiple files being emitted
            if (options.outDir || // there is --outDir specified
                options.sourceRoot || // there is --sourceRoot specified
                (options.mapRoot &&  // there is --mapRoot specified and there would be multiple js files generated
                    (!outFile || firstExternalModuleSourceFile !== undefined))) {

                if (options.rootDir && checkSourceFilesBelongToPath(files, options.rootDir)) {
                    // If a rootDir is specified and is valid use it as the commonSourceDirectory
                    commonSourceDirectory = getNormalizedAbsolutePath(options.rootDir, host.getCurrentDirectory());
                }
                else {
                    // Compute the commonSourceDirectory from the input files
                    commonSourceDirectory = computeCommonSourceDirectory(files);
                }

                if (commonSourceDirectory && commonSourceDirectory[commonSourceDirectory.length - 1] !== directorySeparator) {
                    // Make sure directory path ends with directory separator so this string can directly
                    // used to replace with "" to get the relative path of the source file and the relative path doesn't
                    // start with / making it rooted path
                    commonSourceDirectory += directorySeparator;
                }
            }

            if (options.noEmit) {
                if (options.out) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "noEmit", "out"));
                }

                if (options.outFile) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "noEmit", "outFile"));
                }

                if (options.outDir) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "noEmit", "outDir"));
                }

                if (options.declaration) {
                    programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_with_option_1, "noEmit", "declaration"));
                }
            }

            if (options.emitDecoratorMetadata &&
                !options.experimentalDecorators) {
                programDiagnostics.add(createCompilerDiagnostic(Diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "emitDecoratorMetadata", "experimentalDecorators"));
            }
        }
    }
}
