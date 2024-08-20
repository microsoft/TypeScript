import * as ts from "../../_namespaces/ts.js";

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
