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


        //collect what to put in the try block
        let callToAwait = findCallToAwait(funcToConvert, checker);
        let dotThenTuple:[NodeArray<Statement>, string, TextRange] = findDotThen(funcToConvert, checker);
        let dotThenBody:NodeArray<Statement> = dotThenTuple[0];
        let dotThenFuncName:string = dotThenTuple[1];
        let textRange:TextRange = dotThenTuple[2];
        let tryBlock:Block = undefined;

        if(!callToAwait){
            return;
        }

        let awaitNode = createAwait(callToAwait);

        if(dotThenTuple && dotThenBody.length > 0){
            let awaitDecl = createVariableDeclarationList(createNodeArray([createVariableDeclaration(dotThenFuncName, undefined, awaitNode)]));
            let awaitDeclStmt = createVariableStatement(undefined, awaitDecl);
            //let stmts = createNodeArray([<Statement>createStatement(awaitNode)]).concat(getSynthesizedDeepClones(createNodeArray(dotThenBody.statements)));
            let stmts = undefined;
            stmts = createNodeArray([<Statement>awaitDeclStmt]).concat(getSynthesizedDeepClones(dotThenBody));
            tryBlock = createBlock(stmts.concat());
            //changes.deleteNode(sourceFile, dotThen)
        }else{
            tryBlock = createBlock(createNodeArray([createStatement(awaitNode)]));
        }

        changes.replaceRange(sourceFile, textRange, createTry(tryBlock, undefined, undefined), {prefix: "\n"})
        //changes.replaceNode(sourceFile, callToAwait, createTry(tryBlock, undefined, undefined));
        //fix this
        //changes.insertNodeBefore(sourceFile, (<FunctionDeclaration>funcToConvert).body.statements[0],  createTry(tryBlock, undefined, undefined));
        //changes.deleteNodes(sourceFile, dotThenBody);
    }



    function findCallToAwait(node: Node, checker:TypeChecker): Expression{
        switch(node.kind){
            case SyntaxKind.CallExpression:
                if(isPromiseType(checker.getTypeAtLocation(node)) && (<CallExpression>node).expression.kind !== SyntaxKind.PropertyAccessExpression){
                    return node as CallExpression;
                }
        }
       
       for( let child of node.getChildren() ){
            let ret = findCallToAwait(child, checker);
            if(ret){
                return ret;
            }
        }

    }

    function findDotThen(node:Node, checker:TypeChecker): [NodeArray<Statement>, string, TextRange]{
        switch(node.kind){
            case SyntaxKind.PropertyAccessExpression:
                if((<PropertyAccessExpression>node).name.text === "then" && isPromiseType(checker.getTypeAtLocation(node.parent))){
                    let parNode = node.parent as CallExpression; 
                    if(parNode.arguments.length > 0 && isFunctionLikeDeclaration(parNode.arguments[0])){
                        //find the body of the func in the .then() to put in the try block
                        let funcDecl:FunctionLikeDeclaration = parNode.arguments[0] as FunctionLikeDeclaration;
                        let funcBody:FunctionBody = funcDecl.body as FunctionBody;
                        return [createNodeArray(funcBody.statements), funcDecl.parameters[0].symbol.name, createTextRange(parNode.pos, parNode.end)];
                        //return parNode.arguments[0] as FunctionLikeDeclaration;
                       //return ((<FunctionLikeDeclaration>parNode.arguments[0]).body as FunctionBody);
                    }else if(parNode.arguments.length > 0 &&  isIdentifier(parNode.arguments[0])){
                        let argName= (<Identifier>(<FunctionLikeDeclaration>checker.getTypeAtLocation(parNode.arguments[0]).symbol.valueDeclaration).parameters[0].name)
                        let callExpr = createCall(parNode.arguments[0], undefined, [argName]);
                        return [createNodeArray([<Statement>createStatement(callExpr)]), argName.text, createTextRange(parNode.pos, parNode.end)]
                        //return checker.getTypeAtLocation(parNode.arguments[0]).symbol.valueDeclaration as FunctionLikeDeclaration;
                    }
                }
                break;
        }

        //recurse
        for( let child of node.getChildren() ){
            let ret = findDotThen(child, checker);
            if(ret){
                return ret;
            }
        }

    }
   
    function isPromiseType(T:Type):boolean{
        return T.flags === TypeFlags.Object && T.symbol.name === "Promise";
    }

}