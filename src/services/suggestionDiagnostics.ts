/* @internal */
namespace ts {
    export function computeSuggestionDiagnostics(sourceFile: SourceFile): Diagnostic[] {
        const diags: Diagnostic[] = [];

        if (sourceFile.commonJsModuleIndicator) {
            diags.push(createDiagnosticForNode(sourceFile.commonJsModuleIndicator, Diagnostics.File_is_a_CommonJS_module_it_may_be_converted_to_an_ES6_module));
        }

        function check(node: Node) {
            switch (node.kind) {
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                    if (isInJavaScriptFile(node)) {
                        const symbol = node.symbol;
                        if (symbol.members && (symbol.members.size > 0)) {
                            diags.push(createDiagnosticForNode(isVariableDeclaration(node.parent) ? node.parent.name : node, Diagnostics.Function_may_be_converted_to_a_class));
                        }
                    }
                    break;
            }
            node.forEachChild(check);
        }
        check(sourceFile);

        return diags;
    }
}
