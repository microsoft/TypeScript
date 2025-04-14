import {
    CompilerOptions,
    concatenate,
    DiagnosticWithLocation,
    factory,
    fixupCompilerOptions,
    isArray,
    Node,
    TransformationResult,
    TransformerFactory,
    transformNodes,
} from "./_namespaces/ts.js";

/**
 * Transform one or more nodes using the supplied transformers.
 * @param source A single `Node` or an array of `Node` objects.
 * @param transformers An array of `TransformerFactory` callbacks used to process the transformation.
 * @param compilerOptions Optional compiler options.
 */
export function transform<T extends Node>(source: T | T[], transformers: TransformerFactory<T>[], compilerOptions?: CompilerOptions): TransformationResult<T> {
    const diagnostics: DiagnosticWithLocation[] = [];
    compilerOptions = fixupCompilerOptions(compilerOptions!, diagnostics); // TODO: GH#18217
    const nodes = isArray(source) ? source : [source];
    const result = transformNodes(/*resolver*/ undefined, /*host*/ undefined, factory, compilerOptions, nodes, transformers, /*allowDtsFiles*/ true);
    result.diagnostics = concatenate(result.diagnostics, diagnostics);
    return result;
}
