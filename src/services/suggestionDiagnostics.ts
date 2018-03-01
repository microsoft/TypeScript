/* @internal */
namespace ts {
    export function computeSuggestionDiagnostics(sourceFile: SourceFile, program: Program): Diagnostic[] {
        const diags: Diagnostic[] = [];

        if (sourceFile.commonJsModuleIndicator) {
            diags.push(createDiagnosticForNode(sourceFile.commonJsModuleIndicator, Diagnostics.File_is_a_CommonJS_module_it_may_be_converted_to_an_ES6_module));
        }

        if (willAllowImplicitAnyJsModule(program.getCompilerOptions())) {
            for (const importNode of sourceFile.imports) {
                const resolved = getResolvedModule(sourceFile, importNode.text);
                if (resolved && resolved.isExternalLibraryImport && !extensionIsTypeScript(resolved.extension)) {
                    diags.push(createDiagnosticForModuleMissingTypes(importNode, resolved, importNode.text, Diagnostics.Did_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type));
                }
            }
        }

        return diags;
    }
}
