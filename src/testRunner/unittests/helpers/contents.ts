import * as ts from "../../_namespaces/ts.js";

const tscTypeScriptTestFolder = "/home/src/tslibs/ts/lib";
/** Default typescript and lib installs location for tests */
export const tscTypeScriptTestLocation = getPathForTypeScriptTestLocation("tsc.js");
export function getPathForTypeScriptTestLocation(fileName: string) {
    return ts.combinePaths(tscTypeScriptTestFolder, fileName);
}

export function getTypeScriptLibTestLocation(libName: string) {
    return getPathForTypeScriptTestLocation(ts.libMap.get(libName) ?? `lib.${libName}.d.ts`);
}

/** TypeScript TI global cache location for the tests */
export const typeScriptTypingInstallerCacheTest = "/home/src/typinginstaller/globalcache/data";
export function getPathForTypeScriptTypingInstallerCacheTest(fileName: string) {
    return `${typeScriptTypingInstallerCacheTest}/${fileName}`;
}

/**
 * This is set to vscode so that in tsserver tests its what is expected
 * and is unrelated and is error to not specify for tsc tests
 */
export const tscTestDefaultCurrentDirectory = "/home/src/vscode/projects/bin";

export function compilerOptionsToConfigJson(options: ts.CompilerOptions) {
    return ts.optionMapToObject(ts.serializeCompilerOptions(options));
}

export const symbolLibContent = `
interface SymbolConstructor {
    readonly species: symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
`;

export function getProjectConfigWithNodeNext(withNodeNext: boolean | undefined) {
    return withNodeNext ? { module: "nodenext", target: "es5" } : undefined;
}
