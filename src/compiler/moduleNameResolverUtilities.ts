import { removeFileExtension } from "./extension";
import {
    ensurePathIsNonModuleName,
    ensureTrailingDirectorySeparator,
    getDirectoryPath,
    getNormalizedAbsolutePath,
    getRelativePathToDirectoryOrUrl,
    pathIsRelative,
    toPath,
} from "./path";
import {
    EmitResolver,
    ExportDeclaration,
    ImportDeclaration,
    ImportEqualsDeclaration,
    ImportTypeNode,
    ModuleDeclaration,
    SourceFile,
} from "./types";
import { getExternalModuleName } from "./utilities";
import { isStringLiteralLike } from "./utilitiesPublic";

/** @internal */
export interface ResolveModuleNameResolutionHost {
    getCanonicalFileName(p: string): string;
    getCommonSourceDirectory(): string;
    getCurrentDirectory(): string;
}

/** @internal */
export function getResolvedExternalModuleName(host: ResolveModuleNameResolutionHost, file: SourceFile, referenceFile?: SourceFile): string {
    return file.moduleName || getExternalModuleNameFromPath(host, file.fileName, referenceFile && referenceFile.fileName);
}

function getCanonicalAbsolutePath(host: ResolveModuleNameResolutionHost, path: string) {
    return host.getCanonicalFileName(getNormalizedAbsolutePath(path, host.getCurrentDirectory()));
}

/** @internal */
export function getExternalModuleNameFromDeclaration(host: ResolveModuleNameResolutionHost, resolver: EmitResolver, declaration: ImportEqualsDeclaration | ImportDeclaration | ExportDeclaration | ModuleDeclaration | ImportTypeNode): string | undefined {
    const file = resolver.getExternalModuleFileFromDeclaration(declaration);
    if (!file || file.isDeclarationFile) {
        return undefined;
    }
    // If the declaration already uses a non-relative name, and is outside the common source directory, continue to use it
    const specifier = getExternalModuleName(declaration);
    if (specifier && isStringLiteralLike(specifier) && !pathIsRelative(specifier.text) &&
        getCanonicalAbsolutePath(host, file.path).indexOf(getCanonicalAbsolutePath(host, ensureTrailingDirectorySeparator(host.getCommonSourceDirectory()))) === -1) {
        return undefined;
    }
    return getResolvedExternalModuleName(host, file);
}

/**
 * Resolves a local path to a path which is absolute to the base of the emit
 *
 * @internal
 */
export function getExternalModuleNameFromPath(host: ResolveModuleNameResolutionHost, fileName: string, referencePath?: string): string {
    const getCanonicalFileName = (f: string) => host.getCanonicalFileName(f);
    const dir = toPath(referencePath ? getDirectoryPath(referencePath) : host.getCommonSourceDirectory(), host.getCurrentDirectory(), getCanonicalFileName);
    const filePath = getNormalizedAbsolutePath(fileName, host.getCurrentDirectory());
    const relativePath = getRelativePathToDirectoryOrUrl(dir, filePath, dir, getCanonicalFileName, /*isAbsolutePathAnUrl*/ false);
    const extensionless = removeFileExtension(relativePath);
    return referencePath ? ensurePathIsNonModuleName(extensionless) : extensionless;
}
