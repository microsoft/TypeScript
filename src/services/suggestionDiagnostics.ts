/* @internal */
namespace ts {
    export function computeSuggestionDiagnostics(sourceFile: SourceFile, program: Program): Diagnostic[] {
        program.getSemanticDiagnostics(sourceFile);
        const checker = program.getDiagnosticsProducingTypeChecker();
        const diags: Diagnostic[] = [];

        if (sourceFile.commonJsModuleIndicator) {
            diags.push(createDiagnosticForNode(sourceFile.commonJsModuleIndicator, Diagnostics.File_is_a_CommonJS_module_it_may_be_converted_to_an_ES6_module));
        }

        return diags.concat(checker.getSuggestionDiagnostics(sourceFile));
    }
}
