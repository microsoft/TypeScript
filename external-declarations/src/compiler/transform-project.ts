import * as path from "path";
import * as ts from "typescript";

import { changeAnyExtension,normalizePath } from "./path-utils";
import { tracer } from "./perf-tracer";
import { transformFile } from "./transform-file";



export function transformProject(
    projectPath: string,
    files: string[] | undefined,
    options: ts.CompilerOptions,
    host: ts.CompilerHost
) {
    tracer.current?.start("readFiles");
    const rootDir = options.rootDir ? normalizePath(path.resolve(path.join(projectPath, options.rootDir))) : normalizePath(projectPath);
    files ??= host.readDirectory!(rootDir, [".ts", ".tsx"], ["**/*.d.ts"], []);
    tracer.current?.end("readFiles");
    transformProjectFiles(rootDir, files, host, options);
    return rootDir;
}


function ensureDirRecursive(dirPath: string, host: ts.CompilerHost) {
    if(!host.directoryExists!(dirPath)) {
        const parent = path.dirname(dirPath);
        ensureDirRecursive(parent, host);
        (host as any).createDirectory(dirPath);
    }
}
function joinToRootIfNeeded(rootDir: string, existingPath: string) {
    return normalizePath(path.isAbsolute(existingPath) ? existingPath : path.resolve(path.join(rootDir, existingPath)));
}

export function projectFilesTransformer(rootDir: string, options: ts.CompilerOptions) {
    const declarationDir =
        options.declarationDir? joinToRootIfNeeded(rootDir, options.declarationDir) :
        options.outDir? joinToRootIfNeeded(rootDir,options.outDir) :
        undefined;
    rootDir = normalizePath(rootDir);
    return (file: string, host: ts.CompilerHost) => {
        file = normalizePath(file);
        tracer.current?.start("parse");
        const source = host.getSourceFile(file, options.target ?? ts.ScriptTarget.ES2015);
        tracer.current?.end("parse");

        if(!source) return;

        const actualDeclaration = transformFile(source, [], [], options, ts.ModuleKind.ESNext);
        const output =
            declarationDir? changeAnyExtension(file.replace(rootDir, declarationDir), ".d.ts"):
            changeAnyExtension(file, ".d.ts");
        const dirPath = path.dirname(output);
        ensureDirRecursive(dirPath, host);
        tracer.current?.start("write");
        host.writeFile(output, actualDeclaration.code, /*writeByteOrderMark*/ false);
        tracer.current?.end("write");
        return output;
    };
}

export function transformProjectFiles(rootDir: string, files: string[], host: ts.CompilerHost, options: ts.CompilerOptions) {
    const transformer = projectFilesTransformer(rootDir, options);
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
