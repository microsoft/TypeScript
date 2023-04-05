import {
    concatenate,
    isArray,
} from "../compiler/core";
import { factory } from "../compiler/factory/nodeFactory";
import { transformNodes } from "../compiler/transformer";
import {
    CompilerOptions,
    DiagnosticWithLocation,
    Node,
    TransformationResult,
    TransformerFactory,
} from "../compiler/types";
import { fixupCompilerOptions } from "./transpile";

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
