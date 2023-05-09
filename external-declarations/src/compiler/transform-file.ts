
import * as ts from 'typescript'
import { transformDeclarations } from './declaration-emit';
import { createEmitHost } from './emit-host';
import { createEmitResolver } from './emit-resolver';
import { TransformationContext } from './types';



export function transformFile(fileName: string, source: string, allProjectFiles: string[], tsLibFiles: string[], options: ts.CompilerOptions, moduleType: ts.ResolutionMode) {
    
    let sourceFile = ts.createSourceFile(fileName, source, options.target ?? ts.ScriptTarget.ES3, true, 
        fileName.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
    const getCompilerOptions = () => options;
    const emitResolver = createEmitResolver(sourceFile, options, moduleType);
    const emitHost =  createEmitHost(allProjectFiles, tsLibFiles, options);
    const diagnostics: ts.Diagnostic[] = []
    const x =  transformDeclarations({
        getEmitHost() {
            return emitHost;
        }, 
        getEmitResolver() {
            return emitResolver;
        }, 
        getCompilerOptions,
        factory: ts.factory,
        addDiagnostic(diag) {
            diagnostics.push(diag)
        },
    } as Partial<TransformationContext> as TransformationContext)

    let result = x(sourceFile);

    const printer = ts.createPrinter({
        onlyPrintJsDocStyle: true,
        newLine: options.newLine ?? ts.NewLineKind.CarriageReturnLineFeed,
        target: options.target,
    } as ts.PrinterOptions)

    return {
        code: printer.printFile(result),
        diagnostics,
    };
}
