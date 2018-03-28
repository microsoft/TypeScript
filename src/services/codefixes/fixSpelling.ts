/* @internal */
namespace ts.codefix {
    const fixId = "fixSpelling";
    const errorCodes = [
        Diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_2.code,
        Diagnostics.Cannot_find_name_0_Did_you_mean_1.code,
    ];
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { sourceFile } = context;
            const info = getInfo(sourceFile, context.span.start, context.program.getTypeChecker());
            if (!info) return undefined;
            const { node, suggestion } = info;
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, node, suggestion));
            return [createCodeFixAction(changes, [Diagnostics.Change_spelling_to_0, suggestion], fixId, Diagnostics.Fix_all_detected_spelling_errors)];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            const info = getInfo(diag.file!, diag.start!, context.program.getTypeChecker());
            if (info) doChange(changes, context.sourceFile, info.node, info.suggestion);
        }),
    });

    function getInfo(sourceFile: SourceFile, pos: number, checker: TypeChecker): { node: Node, suggestion: string } | undefined {
        // This is the identifier of the misspelled word. eg:
        // this.speling = 1;
        //      ^^^^^^^
        const node = getTokenAtPosition(sourceFile, pos, /*includeJsDocComment*/ false); // TODO: GH#15852

        let suggestion: string;
        if (isPropertyAccessExpression(node.parent) && node.parent.name === node) {
            Debug.assert(node.kind === SyntaxKind.Identifier);
            const containingType = checker.getTypeAtLocation(node.parent.expression);
            suggestion = checker.getSuggestionForNonexistentProperty(node as Identifier, containingType);
        }
        else {
            const meaning = getMeaningFromLocation(node);
            const name = getTextOfNode(node);
            Debug.assert(name !== undefined, "name should be defined");
            suggestion = checker.getSuggestionForNonexistentSymbol(node, name, convertSemanticMeaningToSymbolFlags(meaning));
        }

        return suggestion === undefined ? undefined : { node, suggestion };
    }

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, node: Node, suggestion: string) {
        changes.replaceNode(sourceFile, node, createIdentifier(suggestion));
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
