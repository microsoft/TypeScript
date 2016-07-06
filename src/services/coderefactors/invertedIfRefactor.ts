/* @internal */
namespace ts.codeRefactor {
    registerCodeRefactor({
        name: "Invert If and Else Condition",
        nodeLabel: ts.SyntaxKind.IfStatement,
        getTextChanges: (token: Node, context: CodeFixContext):TextChange[] => {
            if(token.kind == SyntaxKind.IfStatement) {
                let ifStatement = <IfStatement>token;
                if(ifStatement.elseStatement) {
                    let newText:string = "";

                    // Step 1: Add if and '('
                    newText += "if ("
                    // Step 2: Alter the expression and insert
                    if (ifStatement.expression) {
                        newText += "!(" + ifStatement.expression.getText() +")";
                    }
                    // Step 3: Add ')'
                    newText += ")"
                    // Step 4: Add Else Statement block
                    const elseStatmentText: string = ifStatement.elseStatement.getText().trim();
                    if (elseStatmentText.charAt(0) !== "{") {
                        newText += "{" + context.newLineCharacter;
                    }
                    newText += elseStatmentText;
                    if (elseStatmentText.charAt(0) !== "{") {
                        newText += context.newLineCharacter +  "}" + context.newLineCharacter;
                    }
                    // Step 5: Add else
                    newText += " else "
                    // Step 5: Add Then Statement block
                    const thenStatementText: string = ifStatement.thenStatement.getText();
                    if (thenStatementText.charAt(0) !== "{") {
                        newText += "{" + context.newLineCharacter;
                    }
                    newText += ifStatement.thenStatement.getText();
                    if (thenStatementText.charAt(0) !== "{") {
                        newText += context.newLineCharacter + "}" + context.newLineCharacter;
                    }

                    return [{ newText: newText, span: { start: context.span.start, length: context.span.length } }];
                }
            }
            Debug.fail("No refactor found.");
        }
    });
}
