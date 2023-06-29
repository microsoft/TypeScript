import * as path from "path";
import * as ts from "typescript";
import { normalizePath, changeAnyExtension } from "./path-utils";
import { transformFile } from "./transform-file";
import { tracer } from "./perf-tracer";



export type CancellationToken = { isCancelled: boolean };
export function transformProject(
    projectPath: string,
    files: string[] | undefined,
    options: ts.CompilerOptions,
    host: ts.CompilerHost,
    cancellationToken: CancellationToken
) {
    tracer.current?.start("readFiles")
    const rootDir = options.rootDir ? normalizePath(path.resolve(path.join(projectPath, options.rootDir))) : normalizePath(projectPath);
    files ??= host.readDirectory!(rootDir, [".ts", ".tsx"], ["**/*.d.ts"], []);
    tracer.current?.end("readFiles")
    transformProjectFiles(rootDir, files, host, options, cancellationToken);
    return rootDir
}


function ensureDirRecursive(dirPath: string, host: ts.CompilerHost) {
    if(!host.directoryExists!(dirPath)) {
        let parent = path.dirname(dirPath);
        ensureDirRecursive(parent, host);
        (host as any).createDirectory(dirPath)
    }
}
function joinToRootIfNeeded(rootDir: string, existingPath: string) {
    return normalizePath(path.isAbsolute(existingPath) ? existingPath : path.resolve(path.join(rootDir, existingPath)));
}
export function transformProjectFiles(rootDir: string, files: string[], host: ts.CompilerHost, options: ts.CompilerOptions, cancellationToken: CancellationToken) {
    
    const declarationDir = 
        options.declarationDir? joinToRootIfNeeded(rootDir, options.declarationDir) :
        options.outDir? joinToRootIfNeeded(rootDir,options.outDir) :
        undefined;
    for (let file of files.map(normalizePath)) {
        try {
            tracer.current?.start("parse")
            const source = host.getSourceFile(file, options.target ?? ts.ScriptTarget.ES2015);
            tracer.current?.end("parse")
            if(cancellationToken.isCancelled) return;
            if(!source) continue;

            const actualDeclaration = transformFile(source, [], [], options, ts.ModuleKind.ESNext);
            const output = 
                declarationDir? changeAnyExtension(file.replace(rootDir, declarationDir), ".d.ts"):
                changeAnyExtension(file, ".d.ts");
            const dirPath = path.dirname(output);
            ensureDirRecursive(dirPath, host)
            tracer.current?.start("write")
            host.writeFile(output, actualDeclaration.code, false);
            tracer.current?.end("write")
        } catch (e) {
            console.error(`Failed to transform: ${file}`, e)
        }
    }
    return { rootDir };
}