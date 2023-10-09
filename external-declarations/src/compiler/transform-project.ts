import * as path from "path";
import * as ts from "typescript";

import { Utils } from "../test-runner/tsc-infrastructure/compiler-run";
import {
    changeAnyExtension,
    normalizePath,
} from "./path-utils";

export function transformProject(
    projectPath: string,
    files: string[] | undefined,
    options: ts.CompilerOptions,
    host: ts.CompilerHost,
) {
    const rootDir = options.rootDir ? normalizePath(path.resolve(path.join(projectPath, options.rootDir))) : normalizePath(projectPath);
    files ??= host.readDirectory!(rootDir, [".ts", ".tsx"], ["**/*.d.ts"], []);
    emitDeclarationsForAllFiles(rootDir, files, host, options);
    return rootDir;
}

function ensureDirRecursive(dirPath: string, host: ts.CompilerHost) {
    if (!host.directoryExists!(dirPath)) {
        const parent = path.dirname(dirPath);
        ensureDirRecursive(parent, host);
        (host as any).createDirectory(dirPath);
    }
}
function joinToRootIfNeeded(rootDir: string, existingPath: string) {
    return normalizePath(path.isAbsolute(existingPath) ? existingPath : path.resolve(path.join(rootDir, existingPath)));
}

export function createIsolatedDeclarationsEmitter(rootDir: string, options: ts.CompilerOptions) {
    const declarationDir = options.declarationDir ? joinToRootIfNeeded(rootDir, options.declarationDir) :
        options.outDir ? joinToRootIfNeeded(rootDir, options.outDir) :
        undefined;
    rootDir = normalizePath(rootDir);
    return (file: string, host: ts.CompilerHost) => {
        file = normalizePath(file);
        const source = host.getSourceFile(file, options.target ?? ts.ScriptTarget.ES2015);

        if (!source) return;

        const actualDeclaration = emitDeclarationsForFile(source, [], [], options);
        const output = declarationDir ? changeAnyExtension(file.replace(rootDir, declarationDir), ".d.ts") :
            changeAnyExtension(file, ".d.ts");
        const dirPath = path.dirname(output);
        ensureDirRecursive(dirPath, host);
        host.writeFile(output, actualDeclaration.code, /*writeByteOrderMark*/ false);
        return output;
    };
}

export function emitDeclarationsForAllFiles(rootDir: string, files: string[], host: ts.CompilerHost, options: ts.CompilerOptions) {
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

const transformDeclarations: (context: ts.TransformationContext) => (node: ts.SourceFile) => ts.SourceFile = (ts as any).transformDeclarations;

export function emitDeclarationsForFile(sourceFile: ts.SourceFile, allProjectFiles: string[], tsLibFiles: string[], options: ts.CompilerOptions) {
    const getCompilerOptions = () => options;
    const emitHost = ts.createEmitDeclarationHost(allProjectFiles, tsLibFiles, options, ts.sys);
    const emitResolver = ts.createEmitDeclarationResolver(sourceFile, emitHost);
    const diagnostics: ts.Diagnostic[] = [];
    const transformer = transformDeclarations({
        getEmitHost() {
            return emitHost;
        },
        getEmitResolver() {
            return emitResolver;
        },
        getCompilerOptions,
        factory: ts.factory,
        addDiagnostic(diag: any) {
            diagnostics.push(diag);
        },
    } as Partial<ts.TransformationContext> as ts.TransformationContext);
    const result = transformer(sourceFile);

    const printer = ts.createPrinter({
        onlyPrintJsDocStyle: true,
        newLine: options.newLine ?? ts.NewLineKind.CarriageReturnLineFeed,
        target: options.target,
    } as ts.PrinterOptions);
    
    const code = printer.printFile(result);
    return {
        code: options.emitBOM ? Utils.addUTF8ByteOrderMark(code) : code,
        diagnostics,
    };
}
