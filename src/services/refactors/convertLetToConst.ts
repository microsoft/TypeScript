/* @internal */
namespace ts.refactor.generateGetAccessorAndSetAccessor {
    const actionName = "Convert 'let' to 'const'";
    registerRefactor(actionName, {
        getEditsForAction(context) {
            const info = getInfo(context);
            if (!info) return undefined;

            const edits = textChanges.ChangeTracker.with(context, changeTracker => doChange(changeTracker, context.file, info));
            if (!length(edits)) return undefined;

            return { renameFilename: undefined, renameLocation: undefined, edits };
        },
        getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {

            if (!context.cancellationToken) return emptyArray;
            const info = getInfo(context);
            if (!info) return emptyArray;

            return [{
                name: actionName,
                description: actionName,
                actions: [
                    {
                        name: actionName,
                        description: actionName
                    }
                ]
            }];
        }
    });

    interface Info {
        variableDeclaration: VariableDeclaration | undefined;
        variableStatement: VariableStatement | undefined;
        containerVariableStatement: VariableStatement;
    }

    export function rangeContainsSkipTrivia(r1: TextRange, node: Node, file: SourceFile): boolean {
        return rangeContainsStartEnd(r1, skipTrivia(file.text, node.pos), node.end);
    }

    function getInfo(context: RefactorContext): Info | undefined {
        if (!context.cancellationToken) return undefined;

        const { file, startPosition, program, cancellationToken } = context;

        const current = getTokenAtPosition(file, startPosition);
        const range = createTextRangeFromSpan(getRefactorContextSpan(context));
        
        let variableDeclaration: VariableDeclaration | undefined;
        let bindingName: BindingName | undefined;
        const variableStatement = findAncestor(current, node => {
            if (!rangeContainsSkipTrivia(range, node, file)) {
                return "quit";
            }

            if (isBindingName(node)) {
                bindingName = node;
                return false;
            }

            if (isVariableDeclaration(node)) {
                variableDeclaration = node;
                return false;
            }

            return isVariableStatement(node);
        });

        if (!variableDeclaration && bindingName) {
            variableDeclaration = tryCast(findAncestor(bindingName, isVariableLike), isVariableDeclaration);
        }

        if ((!variableStatement && !variableDeclaration)) {
           return undefined;
        }
        Debug.assert(!variableStatement || isVariableStatement(variableStatement));

        const containerVariableStatement = variableStatement || findAncestor(variableDeclaration, isVariableStatement);
        if (!containerVariableStatement || getEffectiveModifierFlags(containerVariableStatement) & (ModifierFlags.Export | ModifierFlags.ExportDefault) || !(containerVariableStatement.declarationList.flags & NodeFlags.Let)) {
            return undefined;
        }

        const needToTrack: Node[] = [];
        const declarations = variableStatement?.declarationList.declarations || singleElementArray(variableDeclaration);
        forEach(declarations, decl => addTrackNode(decl.name));

        let allReferenceIsRead = true;
        forEach(needToTrack, node => {
            const references = FindAllReferences.getReferenceEntriesForNode(-1, node, program, [file], cancellationToken);
            forEach(references, reference => {
                if (reference.kind !== FindAllReferences.EntryKind.Node || reference.node === node) {
                    return undefined;
                }
                if (isAssignmentTarget(reference.node)) {
                    allReferenceIsRead = false;
                }
            });
        });

        if (!allReferenceIsRead) {
            return undefined;
        }

        return {
            variableDeclaration,
            variableStatement,
            containerVariableStatement
        };

        function addTrackNode(name: BindingName) {
            if (isIdentifier(name)) {
                needToTrack.push(name);
            }
            else {
                name.elements.forEach(element => addTrackNode(element.name));
            }
        }
    }

    function doChange(changeTracker: textChanges.ChangeTracker, file: SourceFile, info: Info) {
        const { variableDeclaration, variableStatement, containerVariableStatement } = info;
        if (!variableStatement) {
            Debug.assertIsDefined(variableDeclaration);

            if (containerVariableStatement.declarationList.declarations.length === 1) {
                doChangeForTotalStatement(changeTracker, file, containerVariableStatement);
            }
            else {
                doChangeForPartOfStatement(changeTracker, file, variableDeclaration, containerVariableStatement);
            }
        }
        else {
            doChangeForTotalStatement(changeTracker, file, variableStatement);
        }
    }

    function doChangeForTotalStatement(changeTracker: textChanges.ChangeTracker, file: SourceFile, variableStatement: VariableStatement) {
        changeTracker.replaceNode(file, variableStatement.declarationList, factory.createVariableDeclarationList(
            variableStatement.declarationList.declarations,
            variableStatement.declarationList.flags & ~NodeFlags.Let | NodeFlags.Const
        ));
    }

    function doChangeForPartOfStatement(changeTracker: textChanges.ChangeTracker, file: SourceFile, variableDeclaration: VariableDeclaration, containerVariableStatement: VariableStatement) {
        changeTracker.delete(file, variableDeclaration);

        changeTracker.insertNodeAfter(file, containerVariableStatement, factory.createVariableStatement(
            /*modifiers*/ undefined,
            factory.createVariableDeclarationList(
                [variableDeclaration],
                NodeFlags.Const
            )
        ));
    }
}
