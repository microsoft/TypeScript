import {
    changeAnyExtension,
    combinePaths,
    CompilerHost,
    CompilerOptions,
    createEmitDeclarationHost,
    createEmitDeclarationResolver,
    createPrinter,
    Diagnostic,
    EmitHost,
    EmitResolver,
    factory,
    getDeclarationEmitExtensionForPath,
    getNormalizedAbsolutePath,
    getRelativePathFromDirectory,
    NewLineKind,
    normalizePath,
    pathIsAbsolute,
    PrinterOptions,
    ScriptTarget,
    SourceFile,
    sys,
    TransformationContext,
    transformDeclarations,
} from "../../_namespaces/ts";

export function emitDeclarationsForProject(
    projectPath: string,
    files: string[] | undefined,
    options: CompilerOptions,
    host: CompilerHost,
) {
    const rootDir = options.rootDir ? normalizePath(sys.resolvePath(combinePaths(projectPath, options.rootDir))) : normalizePath(projectPath);
    files ??= host.readDirectory!(rootDir, [".ts", ".tsx"], ["**/*.d.ts"], []);
    emitDeclarationsForAllFiles(rootDir, files, host, options);
    return rootDir;
}

function joinToRootIfNeeded(rootDir: string, existingPath: string) {
    return normalizePath(pathIsAbsolute(existingPath) ? existingPath : combinePaths(rootDir, existingPath));
}

export function createIsolatedDeclarationsEmitter(rootDir: string, options: CompilerOptions) {
    const declarationDir = options.declarationDir ? joinToRootIfNeeded(rootDir, options.declarationDir) :
        options.outDir ? joinToRootIfNeeded(rootDir, options.outDir) :
        undefined;
    rootDir = normalizePath(rootDir);
    return (file: string, host: CompilerHost) => {
        file = normalizePath(file);
        const source = host.getSourceFile(file, options.target ?? ScriptTarget.ES2015);

        if (!source) return {};

        const actualDeclaration = emitDeclarationsForFile(source, options);
        const extension = getDeclarationEmitExtensionForPath(file);
        const relativeToRoot = getRelativePathFromDirectory(rootDir, file, !host.useCaseSensitiveFileNames());
        const declarationPath = !declarationDir ? file : getNormalizedAbsolutePath(combinePaths(declarationDir, relativeToRoot), host.getCurrentDirectory());
        const output = changeAnyExtension(declarationPath, extension);
        host.writeFile(output, actualDeclaration.code, !!options.emitBOM);
        return { output, diagnostics: actualDeclaration.diagnostics };
    };
}

export function emitDeclarationsForAllFiles(rootDir: string, files: string[], host: CompilerHost, options: CompilerOptions) {
    const transformer = createIsolatedDeclarationsEmitter(rootDir, options);
    for (const file of files) {
        transformer(file, host);
    }
}

export function emitDeclarationsForFile(sourceFile: SourceFile, options: CompilerOptions) {
    const getCompilerOptions = () => options;
    const emitHost = createEmitDeclarationHost(options, sys);
    const emitResolver = createEmitDeclarationResolver(sourceFile, emitHost);
    const diagnostics: Diagnostic[] = [];
    const transformer = transformDeclarations({
        getEmitHost() {
            return emitHost as never as EmitHost;
        },
        getEmitResolver() {
            return emitResolver as EmitResolver;
        },
        getCompilerOptions,
        factory,
        addDiagnostic(diag: any) {
            diagnostics.push(diag);
        },
    } as Partial<TransformationContext> as TransformationContext);
    const result = transformer(sourceFile);

    const printer = createPrinter({
        onlyPrintJsDocStyle: true,
        newLine: options.newLine ?? NewLineKind.CarriageReturnLineFeed,
        target: options.target,
        removeComments: options.removeComments,
    } as PrinterOptions);

    const code = printer.printFile(result);
    return {
        code,
        diagnostics,
    };
}
