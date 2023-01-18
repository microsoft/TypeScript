import {
    find,
    firstDefined,
    flatten,
    mapDefined,
    or,
    some,
} from "./core";
import {
    fileExtensionIs,
    pathIsRelative,
} from "./path";
import {
    CompilerOptions,
    Extension,
    FileExtensionInfo,
    ScriptKind,
    SourceFile,
} from "./types";
import {
    getAllowJSCompilerOption,
    getResolveJsonModule,
    isJSLike,
} from "./utilities";

/**
 *  Groups of supported extensions in order of file resolution precedence. (eg, TS > TSX > DTS and seperately, CTS > DCTS)
 *
 * @internal
 */
export const supportedTSExtensions: readonly Extension[][] = [[Extension.Ts, Extension.Tsx, Extension.Dts], [Extension.Cts, Extension.Dcts], [Extension.Mts, Extension.Dmts]];

/** @internal */
export const supportedTSExtensionsFlat: readonly Extension[] = flatten(supportedTSExtensions);

/** @internal */
export const supportedTSExtensionsWithJson: readonly Extension[][] = [...supportedTSExtensions, [Extension.Json]];

/**
 * Must have ".d.ts" first because if ".ts" goes first, that will be detected as the extension instead of ".d.ts".
 * @internal
 */
export const supportedTSExtensionsForExtractExtension: readonly Extension[] = [Extension.Dts, Extension.Dcts, Extension.Dmts, Extension.Cts, Extension.Mts, Extension.Ts, Extension.Tsx, Extension.Cts, Extension.Mts];

/** @internal */
export const supportedJSExtensions: readonly Extension[][] = [[Extension.Js, Extension.Jsx], [Extension.Mjs], [Extension.Cjs]];

/** @internal */
export const supportedJSExtensionsFlat: readonly Extension[] = flatten(supportedJSExtensions);

/** @internal */
export const allSupportedExtensions: readonly Extension[][] = [[Extension.Ts, Extension.Tsx, Extension.Dts, Extension.Js, Extension.Jsx], [Extension.Cts, Extension.Dcts, Extension.Cjs], [Extension.Mts, Extension.Dmts, Extension.Mjs]];

/** @internal */
export const allSupportedExtensionsWithJson: readonly Extension[][] = [...allSupportedExtensions, [Extension.Json]];

/** @internal */
export const supportedDeclarationExtensions: readonly Extension[] = [Extension.Dts, Extension.Dcts, Extension.Dmts];

/** @internal */
export const supportedTSImplementationExtensions: readonly Extension[] = [Extension.Ts, Extension.Cts, Extension.Mts, Extension.Tsx];

/**
 * Return ".ts", ".d.ts", or ".tsx", if that is the extension.
 *
 * @internal
 */
export function tryExtractTSExtension(fileName: string): string | undefined {
    return find(supportedTSExtensionsForExtractExtension, extension => fileExtensionIs(fileName, extension));
}

/** @internal */
export function getSupportedExtensions(options?: CompilerOptions): readonly Extension[][];
/** @internal */
export function getSupportedExtensions(options?: CompilerOptions, extraFileExtensions?: readonly FileExtensionInfo[]): readonly string[][];
/** @internal */
export function getSupportedExtensions(options?: CompilerOptions, extraFileExtensions?: readonly FileExtensionInfo[]): readonly string[][] {
    const needJsExtensions = options && getAllowJSCompilerOption(options);

    if (!extraFileExtensions || extraFileExtensions.length === 0) {
        return needJsExtensions ? allSupportedExtensions : supportedTSExtensions;
    }

    const builtins = needJsExtensions ? allSupportedExtensions : supportedTSExtensions;
    const flatBuiltins = flatten(builtins);
    const extensions = [
        ...builtins,
        ...mapDefined(extraFileExtensions, x => x.scriptKind === ScriptKind.Deferred || needJsExtensions && isJSLike(x.scriptKind) && flatBuiltins.indexOf(x.extension as Extension) === -1 ? [x.extension] : undefined)
    ];

    return extensions;
}

/** @internal */
export function getSupportedExtensionsWithJsonIfResolveJsonModule(options: CompilerOptions | undefined, supportedExtensions: readonly Extension[][]): readonly Extension[][];
/** @internal */
export function getSupportedExtensionsWithJsonIfResolveJsonModule(options: CompilerOptions | undefined, supportedExtensions: readonly string[][]): readonly string[][];
/** @internal */
export function getSupportedExtensionsWithJsonIfResolveJsonModule(options: CompilerOptions | undefined, supportedExtensions: readonly string[][]): readonly string[][] {
    if (!options || !getResolveJsonModule(options)) return supportedExtensions;
    if (supportedExtensions === allSupportedExtensions) return allSupportedExtensionsWithJson;
    if (supportedExtensions === supportedTSExtensions) return supportedTSExtensionsWithJson;
    return [...supportedExtensions, [Extension.Json]];
}

/** @internal */
export function hasJSFileExtension(fileName: string): boolean {
    return some(supportedJSExtensionsFlat, extension => fileExtensionIs(fileName, extension));
}

/** @internal */
export function hasTSFileExtension(fileName: string): boolean {
    return some(supportedTSExtensionsFlat, extension => fileExtensionIs(fileName, extension));
}

/** @internal */
export function usesExtensionsOnImports({ imports }: SourceFile, hasExtension: (text: string) => boolean = or(hasJSFileExtension, hasTSFileExtension)): boolean {
    return firstDefined(imports, ({ text }) => pathIsRelative(text) ? hasExtension(text) : undefined) || false;
}

/** @internal */
export function isSupportedSourceFileName(fileName: string, compilerOptions?: CompilerOptions, extraFileExtensions?: readonly FileExtensionInfo[]) {
    if (!fileName) return false;

    const supportedExtensions = getSupportedExtensions(compilerOptions, extraFileExtensions);
    for (const extension of flatten(getSupportedExtensionsWithJsonIfResolveJsonModule(compilerOptions, supportedExtensions))) {
        if (fileExtensionIs(fileName, extension)) {
            return true;
        }
    }
    return false;
}
