/// <reference path="..\compiler\transformer.ts"/>
/// <reference path="transpile.ts"/>
namespace ts {
    /**
     * Transform one or more nodes using the supplied transformers.
     * @param source A single `Node` or an array of `Node` objects.
     * @param transformers An array of `TransformerFactory` callbacks used to process the transformation.
     * @param compilerOptions Optional compiler options.
     */
    export function transform<T extends Node>(source: T | T[], transformers: TransformerFactory<T>[], compilerOptions?: CompilerOptions) {
        const diagnostics: Diagnostic[] = [];
        compilerOptions = fixupCompilerOptions(compilerOptions, diagnostics);
        const nodes = isArray(source) ? source : [source];
        const result = transformNodes(/*resolver*/ undefined, /*emitHost*/ undefined, compilerOptions, nodes, transformers, /*allowDtsFiles*/ true);
        result.diagnostics = concatenate(result.diagnostics, diagnostics);
        return result;
    }
}