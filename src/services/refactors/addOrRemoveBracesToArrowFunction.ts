/* @internal */
namespace ts.refactor.addOrRemoveBracesToArrowFunction {
    const refactorName = "Add or remove braces in an arrow function";
    const refactorDescription = Diagnostics.Add_or_remove_braces_in_an_arrow_function.message;
    const addBracesActionName = "Add braces to arrow function";
    const removeBracesActionName = "Remove braces from arrow function";
    const addBracesActionDescription = Diagnostics.Add_braces_to_arrow_function.message;
    const removeBracesActionDescription = Diagnostics.Remove_braces_from_arrow_function.message;
    registerRefactor(refactorName, { getEditsForAction, getAvailableActions });

    interface Info {
        func: ArrowFunction;
        expression: Expression | undefined;
        returnStatement?: ReturnStatement;
        addBraces: boolean;
    }

    function getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
        const { file, startPosition } = context;
        const info = getConvertibleArrowFunctionAtPosition(file, startPosition);
        if (!info) return emptyArray;

        return [{
            name: refactorName,
            description: refactorDescription,
            actions: [
                info.addBraces ?
                    {
                        name: addBracesActionName,
                        description: addBracesActionDescription
                    } : {
                        name: removeBracesActionName,
                        description: removeBracesActionDescription
                    }
            ]
        }];
    }


    // Taken from emitter.ts L4798
    function formatSynthesizedComment(comment: SynthesizedComment) {
        return comment.kind === SyntaxKind.MultiLineCommentTrivia
            ? `/*${comment.text}*/`
            : `//${comment.text}`;
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        const { file, startPosition } = context;
        const info = getConvertibleArrowFunctionAtPosition(file, startPosition);
        if (!info) return undefined;

        const { expression, returnStatement, func } = info;

        let body: ConciseBody;

        // These two variables are used if there is a trailing comment after the returnStatement
        let newEdit: TextChange;
        const trailingCommentsHolder = createStringLiteral("");

        if (actionName === addBracesActionName) {
            const returnStatement = createReturn(expression);
            body = createBlock([returnStatement], /* multiLine */ true);
            suppressLeadingAndTrailingTrivia(body);
            copyLeadingComments(expression!, returnStatement, file, SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ true);
        }
        else if (actionName === removeBracesActionName && returnStatement) {
            const actualExpression = expression || createVoidZero();
            body = needsParentheses(actualExpression) ? createParen(actualExpression) : actualExpression;
            suppressLeadingAndTrailingTrivia(body);
            copyLeadingComments(returnStatement, body, file, SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ false);
            copyTrailingAsLeadingComments(returnStatement, body, file, SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ false);
            // Copy the trailing comments after the return statement
            // Add them to our trailingCommentsHolder to use later
            copyTrailingComments(returnStatement, trailingCommentsHolder, file, SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ false);


            // If there are trailing comments
            if (trailingCommentsHolder && trailingCommentsHolder.emitNode && trailingCommentsHolder.emitNode.trailingComments) {

                // First we format our comment
                // ex. " trailing comment " -> "/* trailing comment */"
                const formattedComment = formatSynthesizedComment(trailingCommentsHolder.emitNode.trailingComments[0]);

                // Add one space of padding to the comment
                const paddedComment = ` ${formattedComment}`;

                // TODO - add some type of check to know if plus 1 is needed
                // Could be a function that is like getSemiColonPositionModifier, if true, return 1, else return 0
                // creates a text change from end of function body, with length of comment, for the comment.
                // create a new range from end of function body to end of return statement
                // + 1 accounts for the semi-colon
                // Add function to check if
                // function hasSemiColon(/* check next token. If semi colon return true, else false */) {
                //     return true
                // }

                newEdit = createTextChangeFromStartLength(func.body.end + 1, paddedComment.length, paddedComment);
            }
        }
        else {
            Debug.fail("invalid action");
        }

        const edits = textChanges.ChangeTracker.with(context, t => {
            t.replaceNode(file, func.body, body);
            // Push the raw change into our array of textChanges
            t.pushRaw(file, { fileName: file.fileName, textChanges: [newEdit] });
        });

        return { renameFilename: undefined, renameLocation: undefined, edits };
    }

    function needsParentheses(expression: Expression) {
        return isBinaryExpression(expression) && expression.operatorToken.kind === SyntaxKind.CommaToken || isObjectLiteralExpression(expression);
    }

    function getConvertibleArrowFunctionAtPosition(file: SourceFile, startPosition: number): Info | undefined {
        const node = getTokenAtPosition(file, startPosition);
        const func = getContainingFunction(node);
        if (!func || !isArrowFunction(func) || (!rangeContainsRange(func, node) || rangeContainsRange(func.body, node))) return undefined;

        if (isExpression(func.body)) {
            return {
                func,
                addBraces: true,
                expression: func.body
            };
        }
        else if (func.body.statements.length === 1) {
            const firstStatement = first(func.body.statements);
            if (isReturnStatement(firstStatement)) {
                return {
                    func,
                    addBraces: false,
                    expression: firstStatement.expression,
                    returnStatement: firstStatement
                };
            }
        }
        return undefined;
    }
}
