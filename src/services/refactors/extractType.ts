/* @internal */
namespace ts.refactor {
    const refactorName = "Extract type";
    registerRefactor(refactorName, {
        getAvailableActions(context): ReadonlyArray<ApplicableRefactorInfo> {
            if (!getRangeToExtract(context)) return emptyArray;
            const description = getLocaleSpecificMessage(Diagnostics.Extract_type);
            return [{ name: refactorName, description, actions: [{ name: refactorName, description }] }];
        },
        getEditsForAction(context, actionName): RefactorEditInfo {
            Debug.assert(actionName === refactorName);
            const { file } = context;
            const { selection, firstStatement } = Debug.assertDefined(getRangeToExtract(context));

            const name = getUniqueName("NewType", file);
            const newTypeNode = generateTypeAlias(name, selection);
            const edits = textChanges.ChangeTracker.with(context, changes => {
                changes.insertNodeBefore(file, firstStatement, newTypeNode, /* blankLineBetween */ true);
                changes.replaceNode(file, selection, createTypeReferenceNode(name, /* typeArguments */ undefined));
            });

            const renameFilename = file.fileName;
            const renameLocation = getRenameLocation(edits, renameFilename, name, /*preferLastLocation*/ false);
            return { edits, renameFilename, renameLocation };
        }
    });

    interface Info { selection: TypeNode; firstStatement: Statement; }
    function getRangeToExtract(context: RefactorContext): Info | undefined {
        const { file, startPosition } = context;
        const current = getTokenAtPosition(file, startPosition);
        const range = createTextRangeFromSpan(getRefactorContextSpan(context));
        const selection = findAncestor(current, (node => node.parent && rangeContainsSkipTrivia(range, node, file) && !rangeContainsSkipTrivia(range, node.parent, file)));
        if (!selection || isInJSFile(selection) || !isTypeNode(selection)) return undefined;
        const firstStatement = Debug.assertDefined((findAncestor(selection, n => isStatement(n) && !isBlock(n)))) as Statement;
        return { selection, firstStatement };
    }

    function rangeContainsSkipTrivia(r1: TextRange, node: Node, file: SourceFile): boolean {
        return rangeContainsStartEnd(r1, skipTrivia(file.text, node.pos), node.end);
    }

    function generateTypeAlias(name: string, typeNode: TypeNode) {
        return createTypeAliasDeclaration(
            /* decorators */ undefined,
            /* monifiers */ undefined,
            name,
            /* typeArguments */ undefined,
            typeNode
        );
    }
}