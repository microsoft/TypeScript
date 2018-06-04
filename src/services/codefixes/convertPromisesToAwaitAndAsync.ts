namespace ts.codefix {
    const fixId = "convertPromisesToAwaitAndAsync";
    const errorCodes = [Diagnostics.This_may_be_converted_to_use_async_and_await.code];
    registerCodeFix({
        errorCodes,
        getCodeActions(context: CodeFixContext) {
            const changes = textChanges.ChangeTracker.with(context, (t) => convertToAsyncAwait(t, context.sourceFile, context.span.start, context.program.getTypeChecker()));
            return [createCodeFixAction(fixId, changes, Diagnostics.Convert_to_use_async_and_await, fixId, Diagnostics.Convert_all_to_use_async_and_await)];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, err) => convertToAsyncAwait(changes, err.file!, err.start, context.program.getTypeChecker())),
    });
    function convertToAsyncAwait(changes: textChanges.ChangeTracker, sourceFile: SourceFile, position: number, checker: TypeChecker): void {
        const oldNode = checker.getSymbolAtLocation(getTokenAtPosition(sourceFile, position, false)).valueDeclaration;
        const newModifier:Modifier = createModifier(SyntaxKind.AsyncKeyword);
        let newNode = <FunctionDeclaration>oldNode;
        newNode.modifiers ? newNode.modifiers.concat([newModifier]) : newNode.modifiers = createNodeArray([newModifier]);
        changes.insertModifierBefore(sourceFile, SyntaxKind.AsyncKeyword, oldNode)
        refactorDotThen(sourceFile, changes, newNode);
    }
   
    function refactorDotThen(sourceFile: SourceFile, changes: textChanges.ChangeTracker, node: Node){
        switch(node.kind){
            case SyntaxKind.PropertyAccessExpression:
                if((<PropertyAccessExpression>node).name.text === "then"){
                    let newParNode = createAwait(<PropertyAccessExpression>node.parent);
                    //getChildren().concat(node.parent.getChildren())
                    changes.replaceNode(sourceFile, node.parent, newParNode)
                    return;
                }
                break;
        }

        for( let child of node.getChildren() ){
            refactorDotThen(sourceFile, changes, child);
        }
    }

}