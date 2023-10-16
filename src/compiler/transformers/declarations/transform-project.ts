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
    getDirectoryPath,
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

function ensureDirRecursive(dirPath: string, host: CompilerHost) {
    if (!host.directoryExists!(dirPath)) {
        const parent = getDirectoryPath(dirPath);
        ensureDirRecursive(parent, host);
        (host as any).createDirectory(dirPath);
    }
}
function joinToRootIfNeeded(rootDir: string, existingPath: string) {
    return normalizePath(pathIsAbsolute(existingPath) ? existingPath : sys.resolvePath(combinePaths(rootDir, existingPath)));
}

export function createIsolatedDeclarationsEmitter(rootDir: string, options: CompilerOptions) {
    const declarationDir = options.declarationDir ? joinToRootIfNeeded(rootDir, options.declarationDir) :
        options.outDir ? joinToRootIfNeeded(rootDir, options.outDir) :
        undefined;
    rootDir = normalizePath(rootDir);
    return (file: string, host: CompilerHost) => {
        file = normalizePath(file);
        const source = host.getSourceFile(file, options.target ?? ScriptTarget.ES2015);

        if (!source) return;

        const {code, diagnostics} = emitDeclarationsForFile(source, [], [], options);
        if (diagnostics.length > 0) {
            throw new Error(`Cannot transform file '${source.fileName}' due to ${diagnostics.length} diagnostics`);
        }
        const output = declarationDir ? changeAnyExtension(file.replace(rootDir, declarationDir), ".d.ts") :
            changeAnyExtension(file, ".d.ts");
        const dirPath = getDirectoryPath(output);
        ensureDirRecursive(dirPath, host);
        host.writeFile(output, code, !!options.emitBOM);
        return output;
    };
}

export function emitDeclarationsForAllFiles(rootDir: string, files: string[], host: CompilerHost, options: CompilerOptions) {
    const transformer = createIsolatedDeclarationsEmitter(rootDir, options);
    for (const file of files) {
        try {
            transformer(file, host);
        }
        catch (e) {
            console.error(`Failed to transform: ${file}`, e);
        }
    }
    return { rootDir };
}

export function emitDeclarationsForFile(sourceFile: SourceFile, allProjectFiles: string[], tsLibFiles: string[], options: CompilerOptions) {
    const getCompilerOptions = () => options;
    const emitHost = createEmitDeclarationHost(allProjectFiles, tsLibFiles, options, sys);
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
    } as PrinterOptions);

    const code = printer.printFile(result);
    return {
        code,
        diagnostics,
    };
}
