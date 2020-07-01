import { Node, TransformerFactory, CompilerOptions, DiagnosticWithLocation } from "../compiler/types";
import { fixupCompilerOptions } from "./transpile";
import { isArray } from "util";
import { transformNodes } from "../compiler/transformer";
import { factory } from "../../built/local/compiler";
import { concatenate } from "../compiler/core";

    /**
     * Transform one or more nodes using the supplied transformers.
     * @param source A single `Node` or an array of `Node` objects.
     * @param transformers An array of `TransformerFactory` callbacks used to process the transformation.
     * @param compilerOptions Optional compiler options.
     */
    export function transform<T extends Node>(source: T | T[], transformers: TransformerFactory<T>[], compilerOptions?: CompilerOptions) {
        const diagnostics: DiagnosticWithLocation[] = [];
        compilerOptions = fixupCompilerOptions(compilerOptions!, diagnostics); // TODO: GH#18217
        const nodes = isArray(source) ? source : [source];
        const result = transformNodes(/*resolver*/ undefined, /*emitHost*/ undefined, factory, compilerOptions, nodes, transformers, /*allowDtsFiles*/ true);
        result.diagnostics = concatenate(result.diagnostics, diagnostics);
        return result;
    }

