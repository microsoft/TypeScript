import {
    harnessSessionLibLocation,
    harnessTypingInstallerCacheLocation,
} from "../../../harness/harnessLanguageService.js";
import * as ts from "../../_namespaces/ts.js";

/** Default typescript and lib installs location for tests */
export const tscTypeScriptTestLocation: string = getPathForTypeScriptTestLocation("tsc.js");
export function getPathForTypeScriptTestLocation(fileName: string): string {
    return ts.combinePaths(harnessSessionLibLocation, fileName);
}

export function getTypeScriptLibTestLocation(libName: string): string {
    return getPathForTypeScriptTestLocation(ts.libMap.get(libName) ?? `lib.${libName}.d.ts`);
}

export function getPathForTypeScriptTypingInstallerCacheTest(fileName: string) {
    return `${harnessTypingInstallerCacheLocation}/${fileName}`;
}

export function compilerOptionsToConfigJson(options: ts.CompilerOptions): object {
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

export function getProjectConfigWithNodeNext(withNodeNext: boolean | undefined): object | undefined {
    return withNodeNext ? { module: "nodenext", target: "es5" } : undefined;
}
