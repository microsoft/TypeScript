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
        //get the function declaration - returns a promise
        const funcToConvert = checker.getSymbolAtLocation(getTokenAtPosition(sourceFile, position, false)).valueDeclaration;
        //add the async keyword
        changes.insertModifierBefore(sourceFile, SyntaxKind.AsyncKeyword, funcToConvert)

        //containers to hold the resolve handlers, rejection handlers, and catch handlers
        let resCallbacks:callbackFunction[] = [];
        let rejCallbacks:callbackFunction[] = [];
        let catchCallbacks:callbackFunction[] = [];

        //find the function call that returns a promise
        let callToAwait:Expression = getSynthesizedDeepClone(findCallToAwait(funcToConvert, checker));
    
        findDotThen(funcToConvert, checker, true, PromiseMemberFunc.Then, resCallbacks); //get the resolve handlers
        findDotThen(funcToConvert, checker, false, PromiseMemberFunc.Then, rejCallbacks); //get the rejection handlers
        findDotThen(funcToConvert, checker, true, PromiseMemberFunc.Catch, catchCallbacks); //get the catch handlers

        //note - I will eventually fix this to handle all callbacks
        let resCallback = resCallbacks.length > 0 ? resCallbacks[0] : undefined;
        let rejCallback = rejCallbacks.length > 0 ? rejCallbacks[0] : undefined;
        let catchCallback = rejCallbacks.length > 0 ? rejCallbacks[0] : undefined;

        //if there is no call to a function that returns a promise, just add async keyword and return
        if(!callToAwait){
            //TODO: ADD THE ASYNC KEYWORD
            return;
        }

        let awaitNode = createAwait(callToAwait);
        
        //get the cascading catch block
        let catchParam = catchCallbacks.length > 0 ? catchCallbacks[catchCallbacks.length-1].argName : "e";
        let cascadingCatchBlock = createCatchClause(catchParam, createBlock(createCascadingCatches(catchCallbacks)));

        //get the onRes handler body
        let onResTryStmts:NodeArray<Statement> = undefined;
        //if(onResTuple && onResBody && onResBody.length > 0){
        if(resCallback){
            onResTryStmts = resCallback.body;
        }

        //create the top level try block
        let topLevelTryStmts:NodeArray<Statement>;
        if(onResTryStmts){
            let awaitDecl = createVariableDeclarationList(createNodeArray([createVariableDeclaration(resCallback.argName, undefined, awaitNode)]));
            let awaitDeclStmt = createVariableStatement(undefined, awaitDecl);
            let onResTryBlock = createBlock(onResTryStmts);
            topLevelTryStmts = createNodeArray([<Statement>awaitDeclStmt, createTry(onResTryBlock, getSynthesizedDeepClone(cascadingCatchBlock), undefined)]);

        }else{
            topLevelTryStmts = createNodeArray([createStatement(awaitNode)]);
        }

        let topLevelTryBlock:Block = createBlock(topLevelTryStmts); //add the onRes try block
        let topLevelCatchClause:CatchClause = undefined; //add the onRej try block

        
       // if(onRejTuple && onRejBody && onRejBody.length > 0){
        if(rejCallback){
            let onRejTryBlock = createTry(createBlock(rejCallback.body), getSynthesizedDeepClone(cascadingCatchBlock), undefined)
            topLevelCatchClause = createCatchClause(rejCallback.argName, createBlock(createNodeArray([onRejTryBlock])));
        }


        let range:TextRange = undefined;
        if(resCallback.range && catchCallback && catchCallback.range){
            range = createTextRange(resCallback.range.pos, catchCallback.range.end);
        }else if(resCallback.range){
            range = resCallback.range;
        }else if(catchCallback && catchCallback.range){
            range = catchCallback.range;
        }

        if(range){
            changes.replaceRange(sourceFile, range, createTry(topLevelTryBlock, topLevelCatchClause, undefined));
        }
    }

    function createCascadingCatches(catchArray:callbackFunction[]): NodeArray<Statement>{

        if(catchArray.length == 0){
            return undefined;
        }

        if(catchArray.length == 1){
            return getSynthesizedDeepClones(catchArray.pop().body);
            //just add the function call
        }

        let catchItem = catchArray.pop();
        let cascadingCatches = createCascadingCatches(catchArray);
        let catchBlock = createBlock(cascadingCatches);

        return createNodeArray([createTry(createBlock(getSynthesizedDeepClones(catchItem.body)), createCatchClause(catchItem.argName, catchBlock), undefined)]);
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

    enum PromiseMemberFunc{
        Then = "then",
        Catch = "catch",
    }

    class callbackFunction{
        body: NodeArray<Statement>;
        argName: string;
        range: TextRange;

        constructor(_body:NodeArray<Statement>, _argName:string, _range:TextRange){
            this.body = _body;
            this.argName = _argName;
            this.range = _range;
        }
    }

    function findDotThen(node:Node, checker:TypeChecker, onRes:boolean, memberFunc:PromiseMemberFunc, retArray:callbackFunction[]): void{ //[[NodeArray<Statement>, string, TextRange]]{

        const index:number = onRes ? 0 : 1;

        switch(node.kind){
            case SyntaxKind.PropertyAccessExpression:
                if((<PropertyAccessExpression>node).name.text === memberFunc && isPromiseType(checker.getTypeAtLocation(node.parent))){
                    let parNode = getSynthesizedDeepClone(node.parent) as CallExpression; 
                    if(parNode.arguments.length > index && isFunctionLikeDeclaration(parNode.arguments[index])){
                        //inlined function definitiion
                        let funcDecl:FunctionLikeDeclaration = parNode.arguments[index] as FunctionLikeDeclaration;
                        let funcBody:FunctionBody = funcDecl.body as FunctionBody;
                        let name:string = funcDecl.parameters[0].symbol ? funcDecl.parameters[0].symbol.name : (<Identifier>funcDecl.parameters[0].name).text;
                        retArray.push(new callbackFunction(createNodeArray(funcBody.statements), name, createTextRange(node.parent.getStart(), node.parent.end)));
                    }else if(parNode.arguments.length > index &&  isIdentifier(parNode.arguments[index])){
                        //reference to an elsewhere declared function
                        let argName = (<Identifier>(<FunctionLikeDeclaration>checker.getTypeAtLocation(parNode.arguments[index]).symbol.valueDeclaration).parameters[0].name);
                        let callExpr = createCall(parNode.arguments[index], undefined, [argName]);
                        retArray.push(new callbackFunction(createNodeArray([<Statement>createStatement(callExpr)]), argName.text, createTextRange(node.parent.getStart(), node.parent.end)));
                    }
                }
                break;
        }

        //recurse
        for( let child of node.getChildren() ){
            findDotThen(child, checker, onRes, memberFunc, retArray);
        }
    }

    function isPromiseType(T:Type):boolean{
        return T.flags === TypeFlags.Object && T.symbol.name === "Promise";
    }

}