import { __String, CompilerOptions, Extension, JsxEmit, ModuleKind, NewLineKind, Node, NodeFlags, PrinterOptions, ScriptTarget, sys, TsConfigSourceFile } from "typescript";

import { clone, flatten, some } from "./lang-utils";
import { fileExtensionIs, fileExtensionIsOneOf } from "./path-utils";

/** @internal */
export function isInJSFile(node: Node | undefined): boolean {
    return !!node && !!(node.flags & NodeFlags.JavaScriptFile);
}

/** @internal */
export function getDeclarationEmitExtensionForPath(path: string) {
    return fileExtensionIsOneOf(path, [Extension.Mjs, Extension.Mts]) ? Extension.Dmts :
        fileExtensionIsOneOf(path, [Extension.Cjs, Extension.Cts]) ? Extension.Dcts :
        fileExtensionIsOneOf(path, [Extension.Json]) ? `.json.d.ts` : // Drive-by redefinition of json declaration file output name so if it's ever enabled, it behaves well
        Extension.Dts;
}


/** @internal */
export function getOutputExtension(fileName: string, options: CompilerOptions): Extension {
    return fileExtensionIs(fileName, Extension.Json) ? Extension.Json :
    options.jsx === JsxEmit.Preserve && fileExtensionIsOneOf(fileName, [Extension.Jsx, Extension.Tsx]) ? Extension.Jsx :
    fileExtensionIsOneOf(fileName, [Extension.Mts, Extension.Mjs]) ? Extension.Mjs :
    fileExtensionIsOneOf(fileName, [Extension.Cts, Extension.Cjs]) ? Extension.Cjs :
    Extension.Js;
}


/** @internal */
export function getEmitScriptTarget(compilerOptions: {module?: CompilerOptions["module"], target?: CompilerOptions["target"]}) {
    return compilerOptions.target ||
        (compilerOptions.module === ModuleKind.Node16 && ScriptTarget.ES2022) ||
        (compilerOptions.module === ModuleKind.NodeNext && ScriptTarget.ESNext) ||
        ScriptTarget.ES3;
}

/** @internal */
const supportedJSExtensions: readonly Extension[][] = [[Extension.Js, Extension.Jsx], [Extension.Mjs], [Extension.Cjs]];
/** @internal */
const supportedJSExtensionsFlat: readonly Extension[] = flatten(supportedJSExtensions);
/**
 *  Groups of supported extensions in order of file resolution precedence. (eg, TS > TSX > DTS and seperately, CTS > DCTS)
 *
 * @internal
 */
const supportedTSExtensions: readonly Extension[][] = [[Extension.Ts, Extension.Tsx, Extension.Dts], [Extension.Cts, Extension.Dcts], [Extension.Mts, Extension.Dmts]];
 /** @internal */
const supportedTSExtensionsFlat: readonly Extension[] = flatten(supportedTSExtensions);

/** @internal */
export function hasJSFileExtension(fileName: string): boolean {
    return some(supportedJSExtensionsFlat, extension => fileExtensionIs(fileName, extension));
}

/** @internal */
export function hasTSFileExtension(fileName: string): boolean {
    return some(supportedTSExtensionsFlat, extension => fileExtensionIs(fileName, extension));
}

const supportedDeclarationExtensions: readonly Extension[] = [Extension.Dts, Extension.Dcts, Extension.Dmts];
/** @internal */
export function isDeclarationFileName(fileName: string): boolean {
    return fileExtensionIsOneOf(fileName, supportedDeclarationExtensions);
}



/** @internal */
export function cloneCompilerOptions(options: CompilerOptions): CompilerOptions {
    const result = clone(options);
    setConfigFileInOptions(result, options && options.configFile as any);
    return result;
}
/** @internal */
function setConfigFileInOptions(options: CompilerOptions, configFile: TsConfigSourceFile | undefined) {
    if (configFile) {
        Object.defineProperty(options, "configFile", { enumerable: false, writable: false, value: configFile });
    }
}

const carriageReturnLineFeed = "\r\n";
const lineFeed = "\n";
/** @internal */
export function getNewLineCharacter(options: CompilerOptions | PrinterOptions, getNewLine?: () => string): string {
    switch (options.newLine) {
        case NewLineKind.CarriageReturnLineFeed:
            return carriageReturnLineFeed;
        case NewLineKind.LineFeed:
            return lineFeed;
    }
    return getNewLine ? getNewLine() : sys ? sys.newLine : carriageReturnLineFeed;
}



