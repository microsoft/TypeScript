import {
    changeExtension,
    CompilerOptions,
    Extension,
    fileExtensionIsOneOf,
    getDeclarationEmitExtensionForPath,
    getDirectoryPath,
    getNodeId,
    getRelativePathFromDirectory,
    hasExtension,
    resolvePath,
    SourceFile,
    SyntaxKind,
    System,
} from "../../_namespaces/ts";
import {
    IsolatedEmitHost,
} from "./types";

export function createEmitDeclarationHost(allProjectFiles: string[], tsLibFiles: string[], options: CompilerOptions, sys: System): IsolatedEmitHost {
    const getCompilerOptions = () => options;
    const getCurrentDirectory = () => ".";
    const getCommonSourceDirectory = () => ".";
    const getCanonicalFileName = (f: string) => `./${f}`;
    const projectFileMap = new Map(
        allProjectFiles
            .map(f => ({ kind: SyntaxKind.SourceFile, fileName: f } as SourceFile))
            .map(f => [f.fileName, getNodeId(f)]),
    );
    const tsLibFileSet = new Set(tsLibFiles);

    return {
        redirectTargetsMap: new Map(),
        fileExists: sys.fileExists,
        readFile: sys.readFile,
        directoryExists: sys.directoryExists,
        getDirectories: sys.getDirectories,
        realpath: sys.realpath,
        useCaseSensitiveFileNames: () => options.forceConsistentCasingInFileNames || sys.useCaseSensitiveFileNames,
        // redirectTargetsMap: new Map(),
        getSourceFiles() {
            throw new Error("Not needed");
        },
        getCompilerOptions,
        getCurrentDirectory,
        getCommonSourceDirectory,
        getCanonicalFileName,
        getLibFileFromReference(ref) {
            if (options.noLib) {
                return undefined;
            }
            if (!tsLibFileSet.has(ref.fileName)) {
                return;
            }
            return {
                fileName: ref.fileName,
            } as SourceFile;
        },
        getSourceFileFromReference(referencingFile, ref) {
            if (ref.fileName.startsWith("node_modules/") || ref.fileName.indexOf("/node_modules/") !== -1) {
                return undefined;
            }
            if (fileExtensionIsOneOf(ref.fileName, [Extension.Cjs, Extension.Mjs, Extension.Js]) && !options.allowJs) {
                return undefined;
            }
            let resolvedFile: string | undefined = resolvePath(getDirectoryPath(referencingFile.fileName), ref.fileName);
            let resolvedFileId = projectFileMap.get(resolvedFile);
            if (!hasExtension(resolvedFile) && resolvedFileId === undefined) {
                [resolvedFile, resolvedFileId] = [Extension.Dts, Extension.Dmts, Extension.Dcts, Extension.Ts, Extension.Mts, Extension.Cts]
                    .map(e => resolvedFile + e)
                    .map(f => [f, projectFileMap.get(f)] as const)
                    .find(([_, id]) => id !== undefined) ?? [];

                if (!resolvedFile) return undefined;
            }
            if (!projectFileMap.has(resolvedFile)) {
                return undefined;
            }
            const resolvedDeclarationFile = fileExtensionIsOneOf(resolvedFile, [Extension.Dts, Extension.Dmts, Extension.Dcts]) ? resolvedFile :
                changeExtension(resolvedFile, getDeclarationEmitExtensionForPath(resolvedFile));
            return {
                fileName: getRelativePathFromDirectory(
                    getDirectoryPath(referencingFile.fileName),
                    resolvedDeclarationFile,
                    /*ignoreCase*/ false,
                ),
                id: resolvedFileId,
            } as any as SourceFile;
        },
        isSourceOfProjectReferenceRedirect() {
            return false;
        },
    };
}
