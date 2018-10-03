/* @internal */
namespace ts {
    export function computeSuggestionDiagnostics(sourceFile: SourceFile, program: Program): Diagnostic[] {
        program.getSemanticDiagnostics(sourceFile);
        const checker = program.getDiagnosticsProducingTypeChecker();
        const diags: Diagnostic[] = [];

        if (sourceFile.commonJsModuleIndicator) {
            diags.push(createDiagnosticForNode(sourceFile.commonJsModuleIndicator, Diagnostics.File_is_a_CommonJS_module_it_may_be_converted_to_an_ES6_module));
        }

        const isJsFile = isSourceFileJavaScript(sourceFile);

        function check(node: Node) {
            switch (node.kind) {
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                    if (isJsFile) {
                        const symbol = node.symbol;
                        if (symbol.members && (symbol.members.size > 0)) {
                            diags.push(createDiagnosticForNode(isVariableDeclaration(node.parent) ? node.parent.name : node, Diagnostics.This_constructor_function_may_be_converted_to_a_class_declaration));
                        }
                    }
                    break;
            }

            if (!isJsFile && codefix.parameterShouldGetTypeFromJSDoc(node)) {
                diags.push(createDiagnosticForNode(node.name || node, Diagnostics.JSDoc_types_may_be_moved_to_TypeScript_types));
            }

            node.forEachChild(check);
        }
        check(sourceFile);

        if (getAllowSyntheticDefaultImports(program.getCompilerOptions())) {
            for (const importNode of sourceFile.imports) {
                const name = importNameForConvertToDefaultImport(importNode.parent);
                if (!name) continue;
                const module = getResolvedModule(sourceFile, importNode.text);
                const resolvedFile = module && program.getSourceFile(module.resolvedFileName);
                if (resolvedFile && resolvedFile.externalModuleIndicator && isExportAssignment(resolvedFile.externalModuleIndicator) && resolvedFile.externalModuleIndicator.isExportEquals) {
                    diags.push(createDiagnosticForNode(name, Diagnostics.Import_may_be_converted_to_a_default_import));
                }
            }
        }

        return diags.concat(checker.getSuggestionDiagnostics(sourceFile));
    }

    function importNameForConvertToDefaultImport(node: Node): Identifier | undefined {
        if (isExternalModuleReference(node)) {
            return node.parent.name;
        }
        if (isImportDeclaration(node)) {
            const { importClause, moduleSpecifier } = node;
            return importClause && !importClause.name && importClause.namedBindings.kind === SyntaxKind.NamespaceImport && isStringLiteral(moduleSpecifier)
                ? importClause.namedBindings.name
                : undefined;
        }
    }
}
