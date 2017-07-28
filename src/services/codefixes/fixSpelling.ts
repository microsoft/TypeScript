/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_2.code,
                     Diagnostics.Cannot_find_name_0_Did_you_mean_1.code],
        getCodeActions: getActionsForCorrectSpelling
    });

    function getActionsForCorrectSpelling(context: CodeFixContext): CodeAction[] | undefined {
        const sourceFile = context.sourceFile;

        // This is the identifier of the misspelled word. eg:
        // this.speling = 1;
        //      ^^^^^^^
        const node = getTokenAtPosition(sourceFile, context.span.start, /*includeJsDocComment*/ false); // TODO: GH#15852
        const checker = context.program.getTypeChecker();
        let suggestion: string;
        if (isPropertyAccessExpression(node.parent) && node.parent.name === node) {
            Debug.assert(node.kind === SyntaxKind.Identifier);
            const containingType = checker.getTypeAtLocation(node.parent.expression);
            suggestion = checker.getSuggestionForNonexistentProperty(node as Identifier, containingType);
        }
        else {
            const meaning = getMeaningFromLocation(node);
            suggestion = checker.getSuggestionForNonexistentSymbol(node, getTextOfNode(node), convertSemanticMeaningToSymbolFlags(meaning));
        }
        if (suggestion) {
            return [{
                description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Change_spelling_to_0), [suggestion]),
                changes: [{
                    fileName: sourceFile.fileName,
                    textChanges: [{
                        span: { start: node.getStart(), length: node.getWidth() },
                        newText: suggestion
                    }],
                }],
            }];
        }
    }

    function convertSemanticMeaningToSymbolFlags(meaning: SemanticMeaning): SymbolFlags {
        let flags = 0;
        if (meaning & SemanticMeaning.Namespace) {
            flags |= SymbolFlags.Namespace;
        }
        if (meaning & SemanticMeaning.Type) {
            flags |= SymbolFlags.Type;
        }
        if (meaning & SemanticMeaning.Value) {
            flags |= SymbolFlags.Value;
        }
        return flags;
    }
}
