
import * as ts from "typescript";
import { SourceFile } from "typescript";

import { Utils } from "../test-runner/tsc-infrastructure/compiler-run";
import { createEmitHost } from "./emit-host";
import { createEmitResolver } from "./emit-resolver";
import { tracer } from "./perf-tracer";
import { TransformationContext } from "./types";

const transformDeclarations: (context: TransformationContext) => (node: SourceFile) => SourceFile = (ts as any).transformDeclarations;

export function transformFile(sourceFile: ts.SourceFile, allProjectFiles: string[], tsLibFiles: string[], options: ts.CompilerOptions, moduleType: ts.ResolutionMode) {

    const getCompilerOptions = () => options;
    tracer.current?.start("bind");
    const emitResolver = createEmitResolver(sourceFile, options, moduleType);
    const emitHost = createEmitHost(allProjectFiles, tsLibFiles, options);
    tracer.current?.end("bind");
    const diagnostics: ts.Diagnostic[] = [];
    const x = transformDeclarations({
        getEmitHost() {
            return emitHost;
        },
        getEmitResolver() {
            return emitResolver;
        },
        getCompilerOptions,
        factory: ts.factory,
        addDiagnostic(diag) {
            diagnostics.push(diag);
        },
    } as Partial<TransformationContext> as TransformationContext);
    tracer.current?.start("transform");
    const result = x(sourceFile);
    tracer.current?.end("transform");

    tracer.current?.start("print");
    const printer = ts.createPrinter({
        onlyPrintJsDocStyle: true,
        newLine: options.newLine ?? ts.NewLineKind.CarriageReturnLineFeed,
        target: options.target,
    } as ts.PrinterOptions);

    try {
        const code = printer.printFile(result);
        return {
            code: options.emitBOM ? Utils.addUTF8ByteOrderMark(code): code,
            diagnostics,
        };
    }
    finally {
        tracer.current?.end("print");
    }
}
