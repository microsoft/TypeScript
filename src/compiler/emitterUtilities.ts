import {
    filter,
    GetCanonicalFileName,
} from "./core";
import {
    getDeclarationEmitExtensionForPath,
    removeFileExtension,
} from "./extension";
import {
    combinePaths,
    getNormalizedAbsolutePath,
} from "./path";
import {
    CompilerOptions,
    EmitHost,
    ModuleKind,
    SourceFile,
} from "./types";
import {
    getEmitModuleKind,
    isExternalModule,
    outFile,
    sourceFileMayBeEmitted,
} from "./utilities";

/**
 * Gets the source files that are expected to have an emit output.
 *
 * Originally part of `forEachExpectedEmitFile`, this functionality was extracted to support
 * transformations.
 *
 * @param host An EmitHost.
 * @param targetSourceFile An optional target source file to emit.
 *
 * @internal
 */
export function getSourceFilesToEmit(host: EmitHost, targetSourceFile?: SourceFile, forceDtsEmit?: boolean): readonly SourceFile[] {
    const options = host.getCompilerOptions();
    if (outFile(options)) {
        const moduleKind = getEmitModuleKind(options);
        const moduleEmitEnabled = options.emitDeclarationOnly || moduleKind === ModuleKind.AMD || moduleKind === ModuleKind.System;
        // Can emit only sources that are not declaration file and are either non module code or module with --module or --target es6 specified
        return filter(
            host.getSourceFiles(),
            sourceFile =>
                (moduleEmitEnabled || !isExternalModule(sourceFile)) &&
                sourceFileMayBeEmitted(sourceFile, host, forceDtsEmit)
        );
    }
    else {
        const sourceFiles = targetSourceFile === undefined ? host.getSourceFiles() : [targetSourceFile];
        return filter(
            sourceFiles,
            sourceFile => sourceFileMayBeEmitted(sourceFile, host, forceDtsEmit)
        );
    }
}

/** @internal */
export function getDeclarationEmitOutputFilePath(fileName: string, host: EmitHost) {
    return getDeclarationEmitOutputFilePathWorker(fileName, host.getCompilerOptions(), host.getCurrentDirectory(), host.getCommonSourceDirectory(), f => host.getCanonicalFileName(f));
}

/** @internal */
export function getDeclarationEmitOutputFilePathWorker(fileName: string, options: CompilerOptions, currentDirectory: string, commonSourceDirectory: string, getCanonicalFileName: GetCanonicalFileName): string {
    const outputDir = options.declarationDir || options.outDir; // Prefer declaration folder if specified

    const path = outputDir
        ? getSourceFilePathInNewDirWorker(fileName, outputDir, currentDirectory, commonSourceDirectory, getCanonicalFileName)
        : fileName;
    const declarationExtension = getDeclarationEmitExtensionForPath(path);
    return removeFileExtension(path) + declarationExtension;
}

/** @internal */
export function getSourceFilePathInNewDir(fileName: string, host: EmitHost, newDirPath: string): string {
    return getSourceFilePathInNewDirWorker(fileName, newDirPath, host.getCurrentDirectory(), host.getCommonSourceDirectory(), f => host.getCanonicalFileName(f));
}

/** @internal */
export function getSourceFilePathInNewDirWorker(fileName: string, newDirPath: string, currentDirectory: string, commonSourceDirectory: string, getCanonicalFileName: GetCanonicalFileName): string {
    let sourceFilePath = getNormalizedAbsolutePath(fileName, currentDirectory);
    const isSourceFileInCommonSourceDirectory = getCanonicalFileName(sourceFilePath).indexOf(getCanonicalFileName(commonSourceDirectory)) === 0;
    sourceFilePath = isSourceFileInCommonSourceDirectory ? sourceFilePath.substring(commonSourceDirectory.length) : sourceFilePath;
    return combinePaths(newDirPath, sourceFilePath);
}

/** @internal */
export function getOwnEmitOutputFilePath(fileName: string, host: EmitHost, extension: string) {
    const compilerOptions = host.getCompilerOptions();
    let emitOutputFilePathWithoutExtension: string;
    if (compilerOptions.outDir) {
        emitOutputFilePathWithoutExtension = removeFileExtension(getSourceFilePathInNewDir(fileName, host, compilerOptions.outDir));
    }
    else {
        emitOutputFilePathWithoutExtension = removeFileExtension(fileName);
    }

    return emitOutputFilePathWithoutExtension + extension;
}
