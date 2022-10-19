import * as ts from "./_namespaces/ts";

/**
 * Transform one or more nodes using the supplied transformers.
 * @param source A single `Node` or an array of `Node` objects.
 * @param transformers An array of `TransformerFactory` callbacks used to process the transformation.
 * @param compilerOptions Optional compiler options.
 */
export function transform<T extends ts.Node>(source: T | T[], transformers: ts.TransformerFactory<T>[], compilerOptions?: ts.CompilerOptions) {
    const diagnostics: ts.DiagnosticWithLocation[] = [];
    compilerOptions = ts.fixupCompilerOptions(compilerOptions!, diagnostics); // TODO: GH#18217
    const nodes = ts.isArray(source) ? source : [source];
    const result = ts.transformNodes(/*resolver*/ undefined, /*emitHost*/ undefined, ts.factory, compilerOptions, nodes, transformers, /*allowDtsFiles*/ true);
    result.diagnostics = ts.concatenate(result.diagnostics, diagnostics);
    return result;
}