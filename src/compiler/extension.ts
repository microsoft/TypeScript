import {
    endsWith,
    find,
    flatten,
    mapDefined,
    some,
    startsWith,
} from "./core";
import * as Debug from "./debug";
import {
    changeAnyExtension,
    fileExtensionIs,
    fileExtensionIsOneOf,
} from "./path";
import {
    CompilerOptions,
    Extension,
    FileExtensionInfo,
    Path,
    ScriptKind,
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
export const supportedTSExtensionsForExtractExtension: readonly Extension[] = [Extension.Dts, Extension.Dcts, Extension.Dmts, Extension.Cts, Extension.Mts, Extension.Ts, Extension.Tsx];

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

/** @internal */
export const extensionsNotSupportingExtensionlessResolution: readonly Extension[] = [Extension.Mts, Extension.Dmts, Extension.Mjs, Extension.Cts, Extension.Dcts, Extension.Cjs];

const extensionsToRemove = [Extension.Dts, Extension.Dmts, Extension.Dcts, Extension.Mjs, Extension.Mts, Extension.Cjs, Extension.Cts, Extension.Ts, Extension.Js, Extension.Tsx, Extension.Jsx, Extension.Json];

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
export function getDeclarationEmitExtensionForPath(path: string) {
    return fileExtensionIsOneOf(path, [Extension.Mjs, Extension.Mts]) ? Extension.Dmts :
        fileExtensionIsOneOf(path, [Extension.Cjs, Extension.Cts]) ? Extension.Dcts :
        fileExtensionIsOneOf(path, [Extension.Json]) ? `.d.json.ts` : // Drive-by redefinition of json declaration file output name so if it's ever enabled, it behaves well
        Extension.Dts;
}

/**
 * This function is an inverse of `getDeclarationEmitExtensionForPath`.
 *
 * @internal
 */
export function getPossibleOriginalInputExtensionForExtension(path: string) {
    return fileExtensionIsOneOf(path, [Extension.Dmts, Extension.Mjs, Extension.Mts]) ? [Extension.Mts, Extension.Mjs] :
        fileExtensionIsOneOf(path, [Extension.Dcts, Extension.Cjs, Extension.Cts]) ? [Extension.Cts, Extension.Cjs]:
        fileExtensionIsOneOf(path, [`.d.json.ts`]) ? [Extension.Json] :
        [Extension.Tsx, Extension.Ts, Extension.Jsx, Extension.Js];
}

/** @internal */
export function removeFileExtension(path: string): string {
    for (const ext of extensionsToRemove) {
        const extensionless = tryRemoveExtension(path, ext);
        if (extensionless !== undefined) {
            return extensionless;
        }
    }
    return path;
}

/** @internal */
export function tryRemoveExtension(path: string, extension: string): string | undefined {
    return fileExtensionIs(path, extension) ? removeExtension(path, extension) : undefined;
}

/** @internal */
export function removeExtension(path: string, extension: string): string {
    return path.substring(0, path.length - extension.length);
}

/** @internal */
export function changeExtension<T extends string | Path>(path: T, newExtension: string): T {
    return changeAnyExtension(path, newExtension, extensionsToRemove, /*ignoreCase*/ false) as T;
}

/**
 * True if an extension is one of the supported TypeScript extensions.
 *
 * @internal
 */
export function extensionIsTS(ext: string): boolean {
    return ext === Extension.Ts || ext === Extension.Tsx || ext === Extension.Dts || ext === Extension.Cts || ext === Extension.Mts || ext === Extension.Dmts || ext === Extension.Dcts || (startsWith(ext, ".d.") && endsWith(ext, ".ts"));
}

/** @internal */
export function resolutionExtensionIsTSOrJson(ext: string) {
    return extensionIsTS(ext) || ext === Extension.Json;
}

/**
 * Gets the extension from a path.
 * Path must have a valid extension.
 *
 * @internal
 */
export function extensionFromPath(path: string): Extension {
    const ext = tryGetExtensionFromPath(path);
    return ext !== undefined ? ext : Debug.fail(`File ${path} has unknown extension.`);
}

/** @internal */
export function isAnySupportedFileExtension(path: string): boolean {
    return tryGetExtensionFromPath(path) !== undefined;
}

/** @internal */
export function tryGetExtensionFromPath(path: string): Extension | undefined {
    return find(extensionsToRemove, e => fileExtensionIs(path, e));
}
