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
        const funcToConvert = checker.getSymbolAtLocation(getTokenAtPosition(sourceFile, position, false)).valueDeclaration;
        changes.insertModifierBefore(sourceFile, SyntaxKind.AsyncKeyword, funcToConvert)

        //maybe find the statement line with the promise call so we can put that in the .then
        let tryBlock:FunctionBody = refactorDotThen(sourceFile, changes, funcToConvert)
        if(tryBlock && (<FunctionDeclaration>funcToConvert).body.statements.length > 0){
            changes.insertNodeBefore(sourceFile, (<FunctionDeclaration>funcToConvert).body.statements[0],  createTry(tryBlock, undefined, undefined));
        }
        
    }
   
    function refactorDotThen(sourceFile: SourceFile, changes: textChanges.ChangeTracker, node: Node): FunctionBody{
        switch(node.kind){
            case SyntaxKind.PropertyAccessExpression:
                if((<PropertyAccessExpression>node).name.text === "then" /*and the return type of the function called is a promise!!*/){
                    let newParNode = createAwait(<PropertyAccessExpression>node.parent);
                    changes.replaceNode(sourceFile, node.parent, newParNode)
                    //node.parent.arguments[0].body is the try block
                    let parNode = node.parent as CallExpression; 
                    return parNode.arguments.length > 0 && isFunctionLikeDeclaration(parNode.arguments[0]) ? (<FunctionBody>(<FunctionLikeDeclaration>parNode.arguments[0]).body) : null;
                }
                break;
        }

        for( let child of node.getChildren() ){
            let ret = refactorDotThen(sourceFile, changes, child);
            if(ret){
                return ret;
            }
        }
    }

}