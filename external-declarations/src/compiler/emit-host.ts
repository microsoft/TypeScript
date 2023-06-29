
import * as ts from "typescript";

import { changeExtension } from "../test-runner/tsc-infrastructure/vpath";
import { getDeclarationExtension, getDirectoryPath, getRelativePathFromDirectory, hasExtension, isDeclarationFile, isJavaScriptFile, resolvePath } from "./path-utils";
import { IsolatedEmitHost } from "./types";
import { getNodeId } from "./utils";

export function createEmitHost(allProjectFiles: string[], tsLibFiles: string[],  options: ts.CompilerOptions) {
    const getCompilerOptions = () => options;
    const getCurrentDirectory = () => ".";
    const getCommonSourceDirectory = () => ".";
    const getCanonicalFileName = (f: string) => `./${f}`;
    const projectFileMap = new Map(allProjectFiles
        .map((f) => ({ kind: ts.SyntaxKind.SourceFile, fileName: f  } as ts.SourceFile))
        .map(f => [f.fileName, getNodeId(f)])
    );
    const tsLibFileSet = new Set(tsLibFiles);

    return {
        getSourceFiles() {
            throw new Error("Not needed");
        },
        getCompilerOptions,
        getCurrentDirectory,
        getCommonSourceDirectory,
        getCanonicalFileName,
        getLibFileFromReference(ref) {
            if(options.noLib) {
                return undefined;
            }
            if(!tsLibFileSet.has(ref.fileName)) {
                return;
            }
            return {
                fileName: ref.fileName,
            };
        },
        getSourceFileFromReference(referencingFile, ref) {
            if(ref.fileName.startsWith("node_modules/") || ref.fileName.indexOf("/node_modules/") !== -1) {
                return undefined;
            }
            if(isJavaScriptFile(ref.fileName) && !options.allowJs) {
                return;
            }
            let resolvedFile: string | undefined = resolvePath(getDirectoryPath(referencingFile.fileName), ref.fileName);
            let resolvedFileId = projectFileMap.get(resolvedFile);
            if(!hasExtension(resolvedFile) && resolvedFileId == undefined) {
                [resolvedFile, resolvedFileId] = Object.values(ts.Extension)
                    .map(e => resolvedFile + e)
                    .map(f => [f, projectFileMap.get(f)] as const)
                    .find(([_, id]) => id != undefined) ?? [];

                if(!resolvedFile) return undefined;
            }
            if(!projectFileMap.has(resolvedFile)) {
                return undefined;
            }
            const resolvedDeclarationFile =
                isDeclarationFile(resolvedFile) ? resolvedFile :
                changeExtension(resolvedFile, getDeclarationExtension(resolvedFile));
            return {
                fileName: getRelativePathFromDirectory(getDirectoryPath(referencingFile.fileName), resolvedDeclarationFile, false),
                id: resolvedFileId,
            };
        },
    } as Partial<IsolatedEmitHost> as IsolatedEmitHost;
}