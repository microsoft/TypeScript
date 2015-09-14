/// <reference path="../transform.generated.ts" />
/*@internal*/
namespace ts.transform {
    let resolver: EmitResolver;
    let compilerOptions: CompilerOptions;
    let languageVersion: ScriptTarget;
    let currentModuleDeclaration: ModuleDeclaration;
    let currentClassLikeDeclaration: ClassLikeDeclaration;
    let currentBaseTypeNode: ExpressionWithTypeArguments;
    let currentConstructor: ConstructorDeclaration;
    let currentParametersWithPropertyAssignments: ParameterDeclaration[];
    let currentInstancePropertyAssignments: PropertyDeclaration[];
    let currentEnumLocalName: Identifier;
    let currentParameterIndex: number;
    
    export function toES6(statements: NodeArray<Statement>) {
        resolver = getEmitResolver();
        compilerOptions = getCompilerOptions();
        languageVersion = compilerOptions.target || ScriptTarget.ES3;
        return visitNodes(statements, transformNode, PipelineFlags.LexicalEnvironment);
    }
    
    /**
      * Transforms a node from TypeScript to ES6 if it requires any transformations.
      * @param context Context information for the transform.
      * @param node The node to transform.
      * @remarks
      * This function is intentionally kept small to keep its overhead low.
      * 
      * If the node needs direct transformation, it will be passed on to the
      * `transformNodeWorker` function. 
      * 
      * If any part of its subtree needs transformation, the node will be 
      * passed to the fallback `accept` function which will ensure any changes 
      * to the subtree will generate new nodes.
      * 
      * If no part of this node or its subtree requires transformation, the node 
      * is returned, unchanged.
      */
    function transformNode(node: Node, write: (node: Node) => void): void {
        // Debug.assert(
        //     !needsTransform(node, TransformFlags.ThisNodeNeedsTransformToES7), 
        //     "Cannot transform node with post-ES7 syntax.");
        
        if (node.transformFlags & TransformFlags.ThisNodeNeedsTransformToES6) {
            transformNodeWorker(node, write);
        }
        else if (node.transformFlags & TransformFlags.SubtreeNeedsTransformToES6) {
            accept(node, transformNode, write);
        }
        else {
            write(node);
        }
    }
    
    function transformModuleElement(node: Node, write: (node: Node) => void): void {
        if (node.flags & NodeFlags.Export) {
            transformNodeWorker(node, write);
        }
        else {
            transformNode(node, write);
        }
    }
    
    /**
      * Transforms a node from TypeScript to ES6.
      * @param context Context information for the transform.
      * @param node The node to transform.
      */
    function transformNodeWorker(node: Node, write: (node: Node) => void): void {
        // TypeScript ambient declarations are elided.
        if (node.flags & NodeFlags.Ambient) {
            return;
        }
        
        switch (node.kind) {
            case SyntaxKind.PublicKeyword:
            case SyntaxKind.PrivateKeyword:
            case SyntaxKind.ProtectedKeyword:
            case SyntaxKind.AbstractKeyword:
            case SyntaxKind.AsyncKeyword:
            case SyntaxKind.ConstKeyword:
            case SyntaxKind.DeclareKeyword:
                // TypeScript accessibility modifiers are elided.
                return;
                
            case SyntaxKind.ArrayType:
            case SyntaxKind.TupleType:
            case SyntaxKind.TypeLiteral:
            case SyntaxKind.TypePredicate:
            case SyntaxKind.TypeParameter:
            case SyntaxKind.AnyKeyword:
            case SyntaxKind.BooleanKeyword:
            case SyntaxKind.StringKeyword:
            case SyntaxKind.NumberKeyword:
            case SyntaxKind.VoidKeyword:
            case SyntaxKind.ConstructorType:
            case SyntaxKind.FunctionType:
            case SyntaxKind.TypeQuery:
            case SyntaxKind.TypeReference:
            case SyntaxKind.UnionType:
            case SyntaxKind.IntersectionType:
                // TypeScript type nodes are elided.
                return;
                
            case SyntaxKind.IndexSignature:
                // TypeScript index signatures are elided.
                return;
                
            case SyntaxKind.Decorator:
                // TypeScript decorators are elided. They will be emitted as part of transformClassDeclaration.
                return;
                
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
                // TypeScript type-only declarations are elided
                return;

            case SyntaxKind.PropertyDeclaration:
                // TypeScript property declarations are elided.
                return;
                
            case SyntaxKind.Constructor:
                // TypeScript constructors are elided. The constructor of a class will be
                // reordered to the start of the member list in `transformClassDeclaration`.
                return;
                
            case SyntaxKind.ClassDeclaration:
                // This is a class declaration with TypeScript syntax extensions.
                //
                // TypeScript class syntax extensions include: 
                // - decorators 
                // - optional `implements` heritage clause
                // - parameter property assignments in the constructor
                // - property declarations
                // - index signatures
                // - method overload signatures
                // - async methods
                return transformClassDeclaration(<ClassDeclaration>node, write);

            case SyntaxKind.ClassExpression:
                // This is a class expression with TypeScript syntax extensions.
                //
                // TypeScript class syntax extensions include: 
                // - decorators 
                // - optional `implements` heritage clause
                // - parameter property assignments in the constructor
                // - property declarations
                // - index signatures
                // - method overload signatures
                // - async methods
                return transformClassExpression(<ClassExpression>node, write);
            
            case SyntaxKind.HeritageClause:
                // This is a heritage clause with TypeScript syntax extensions.
                //
                // TypeScript heritage clause extensions include:
                // - `implements` clause
                return visitHeritageClause(<HeritageClause>node, write);
                
            case SyntaxKind.ExpressionWithTypeArguments:
                // TypeScript supports type arguments on an expression in an `extends` heritage clause.
                return visitExpressionWithTypeArguments(<ExpressionWithTypeArguments>node, write);
            
            case SyntaxKind.MethodDeclaration:
                // TypeScript method declarations may be 'async', and may have decorators, modifiers
                // or type annotations.
                return transformMethodDeclaration(<MethodDeclaration>node, write);
                
            case SyntaxKind.GetAccessor:
                // Get Accessors can have TypeScript modifiers, decorators, and type annotations.
                return transformGetAccessor(<GetAccessorDeclaration>node, write);
                
            case SyntaxKind.SetAccessor:
                // Set Accessors can have TypeScript modifiers, decorators, and type annotations.
                return transformSetAccessor(<SetAccessorDeclaration>node, write);
                
            case SyntaxKind.FunctionDeclaration:
                // TypeScript function declarations may be 'async'
                return transformFunctionDeclaration(<FunctionDeclaration>node, write);
                
            case SyntaxKind.FunctionExpression:
                // TypeScript function expressions may be 'async'
                return transformFunctionExpression(<FunctionExpression>node, write);
                
            case SyntaxKind.ArrowFunction:
                // TypeScript arrow functions may be 'async'
                return transformArrowFunction(<ArrowFunction>node, write);
                
            case SyntaxKind.Parameter:
                // This is a parameter declaration with TypeScript syntax extensions.
                //
                // TypeScript parameter declaration syntax extensions include:
                // - decorators
                // - accessibility modifiers
                // - the question mark (?) token for optional parameters
                // - type annotations
                return transformParameter(<ParameterDeclaration>node, write);
                
            case SyntaxKind.TypeAssertionExpression:
                // TypeScript type assertions are removed, but their subtrees are preserved.
                return write((<TypeAssertion>node).expression);
                
            case SyntaxKind.AsExpression:
                // TypeScript `as` expressions are removed, but their subtrees are preserved.
                return write((<AsExpression>node).expression);
                
            case SyntaxKind.EnumDeclaration:
                // TypeScript enum declarations do not exist in ES6 and must be rewritten.
                return transformEnumDeclaration(<EnumDeclaration>node, write);
                
            case SyntaxKind.AwaitExpression:
                // TypeScript 'await' expressions must be transformed.
                return transformAwaitExpression(<AwaitExpression>node, write);
                
            case SyntaxKind.VariableStatement:
                // TypeScript namespace exports for variable statements must be transformed.
                return transformVariableStatement(<VariableStatement>node, write);
                
            case SyntaxKind.ModuleDeclaration:
                // TypeScript namespace declarations must be transformed.
                return transformModuleDeclaration(<ModuleDeclaration>node, write);
                
            case SyntaxKind.ImportEqualsDeclaration:
            case SyntaxKind.ExportAssignment:
                // TODO(rbuckton): TypeScript extensions we're not yet transforming.
                
            default:
                // Fall back to the default visit behavior as some part of this node's 
                // subtree requires a transformation.
                return accept(node, transformNode, write);
        }
    }
    
    /**
      * Transforms a TypeScript class declaration with syntax extensions into compatible ES6.
      * @param context Context information for the transform.
      * @param node The node to transform.
      */
    function transformClassDeclaration(node: ClassDeclaration, write: (node: Statement) => void) {
        let savedCurrentBaseTypeNode = currentBaseTypeNode;
        let savedCurrentClassLikeDeclaration = currentClassLikeDeclaration;
        currentClassLikeDeclaration = node;
        currentBaseTypeNode = getAndVisitClassExtendsHeritageClauseElement(node);
        
        let classMembers: ClassElement[] = [];
        emitNode(node, emitConstructor, classMembers);
        emitNodes(node.members, transformNode, classMembers);
        
        if (nodeIsDecorated(node)) {
            // If the class has been decorated, we need to emit the class as part of a `let` declaration
            // to avoid the pitfalls of the doubly-bound class name. 
            let classExpr = createClassExpression3(currentBaseTypeNode, classMembers);
            let varStmt = createLetStatement(getDeclarationName(node), classExpr, /*location*/ node, isTopLevelNonDefaultExport(node));
            write(setOriginalNode(varStmt, node));
        }
        else {
            let exportFlags = isTopLevelExport(node) ? node.flags & (NodeFlags.Export | NodeFlags.Default) : undefined;
            let classDecl = createClassDeclaration2(getDeclarationName(node), currentBaseTypeNode, classMembers, /*location*/ node, exportFlags);
            write(setOriginalNode(classDecl, node));
        }
        
        pipeNodes(getInitializedProperties(node, /*isStatic*/ true), transformPropertyDeclarationToStatement, write);
        
        transformDecoratorsOfMembers(node, /*isStatic*/ false, write);
        transformDecoratorsOfMembers(node, /*isStatic*/ true, write);
        transformDecoratorsOfConstructor(node, write);
        
        if (isNamespaceLevelExport(node)) {
            write(createExpressionStatement(createAssignmentExpression(getModuleMemberName(node), getDeclarationName(node))));
        }
        else if (isTopLevelDefaultExport(node) && nodeIsDecorated(node)) {
            write(createExportDefaultStatement(getDeclarationName(node)));
        }
        
        currentClassLikeDeclaration = savedCurrentClassLikeDeclaration;
        currentBaseTypeNode = savedCurrentBaseTypeNode;
    }
    
    function transformClassExpression(node: ClassExpression, write: (node: LeftHandSideExpression) => void) {
        let savedCurrentClassLikeDeclaration = currentClassLikeDeclaration;
        let savedCurrentBaseTypeNode = currentBaseTypeNode;
        currentClassLikeDeclaration = node;
        currentBaseTypeNode = getAndVisitClassExtendsHeritageClauseElement(node);
        
        let classMembers: ClassElement[] = [];
        emitNode(node, emitConstructor, classMembers);
        emitNodes(node.members, transformNode, classMembers);

        let classExpr = createClassExpression2(getDeclarationName(node), currentBaseTypeNode, classMembers);
        let staticPropertyAssignments = getInitializedProperties(node, /*isStatic*/ true);
        if (staticPropertyAssignments) {
            let expressions: Expression[] = [];
            let tempVar = declareLocal();
            expressions.push(createAssignmentExpression(tempVar, classExpr));
            emitNodes(staticPropertyAssignments, transformPropertyDeclarationToExpression, expressions);
            expressions.push(tempVar);
            write(createParenthesizedExpression(inlineExpressions(expressions)));
        }
        else {
            write(classExpr);
        }
        
        currentClassLikeDeclaration = savedCurrentClassLikeDeclaration;
        currentBaseTypeNode = savedCurrentBaseTypeNode;
    }

    function getAndVisitClassExtendsHeritageClauseElement(node: ClassLikeDeclaration) {
        let heritageClauses = visitNodes(node.heritageClauses, visitHeritageClause);
        let extendsClause = heritageClauses && firstOrUndefined(heritageClauses);
        let baseTypeNode = extendsClause && firstOrUndefined(extendsClause.types);
        return baseTypeNode;
    }

    function emitConstructor(node: ClassLikeDeclaration, write: (node: ClassElement) => void): void {
        // Check if we have a property assignment inside class declaration.
        // If there is a property assignment, we need to emit constructor whether users define it or not
        // If there is no property assignment, we can omit constructor if users do not define it
        let constructor = getFirstConstructorWithBody(node);
        let parameterPropertyAssignments = constructor ? getParametersWithPropertyAssignments(constructor) : undefined;
        let instancePropertyAssignments = getInitializedProperties(node, /*isStatic*/ false);
        
        // For target ES6 and above, if there is no property assignment
        // do not emit constructor in class declaration.
        if (!parameterPropertyAssignments && !instancePropertyAssignments) {
            write(constructor);
            return;
        }
        
        let parameters: ParameterDeclaration[] = [];
        if (constructor) {
            emitNodes(constructor.parameters, transformNode, parameters);
        }
        else if (currentBaseTypeNode) {
            parameters.push(createRestParameter(createIdentifier("args"), /*location*/ undefined, NodeFlags.GeneratedRest));
        }
        
        let savedCurrentConstructor = currentConstructor;
        let savedCurrentParametersWithPropertyAssignments = currentParametersWithPropertyAssignments;
        let savedCurrentInstancePropertyAssignments = currentInstancePropertyAssignments;
        
        let statements = flatMapNode(node, emitConstructorBody, PipelineFlags.LexicalEnvironment)
        write(createConstructor2(parameters, createBlock(statements), /*location*/ constructor));
        
        currentConstructor = savedCurrentConstructor;
        currentParametersWithPropertyAssignments = savedCurrentParametersWithPropertyAssignments;
        currentInstancePropertyAssignments = savedCurrentInstancePropertyAssignments;
    }
    
    function emitConstructorBody(node: ClassLikeDeclaration, write: (node: Statement) => void) {
        let superCall: ExpressionStatement;
        if (currentConstructor) {
            if (currentBaseTypeNode) {
                superCall = findInitialSuperCall(currentConstructor);
                if (superCall) {
                    write(superCall);
                }
            }
            
            pipeNodes(currentParametersWithPropertyAssignments, emitParameterPropertyAssignment, write);
        }
        else if (currentBaseTypeNode) {
            let callExpr = createCallExpression2(createSuperKeyword(), [createSpreadElementExpression(createIdentifier("args"))]);
            write(startOnNewLine(createExpressionStatement(callExpr, /*location*/ undefined, NodeFlags.GeneratedSuper)));
        }
        
        pipeNodes(currentInstancePropertyAssignments, transformPropertyDeclarationToStatement, write);
        
        if (currentConstructor) {
            pipeNodes(skip(currentConstructor.body.statements, superCall ? 1 : 0), transformNode, write);
        }
    }
    
    function emitParameterPropertyAssignment(node: ParameterDeclaration, write: (node: Statement) => void) {
        let name = <Identifier>cloneNode(node.name);
        let propExpr = createPropertyAccessExpression2(createThisKeyword(), name);
        let assignExpr = createAssignmentExpression(propExpr, name);
        write(startOnNewLine(createExpressionStatement(assignExpr)));
    }
    
    function visitHeritageClause(node: HeritageClause, write: (node: HeritageClause) => void) {
        if (node.token === SyntaxKind.ExtendsKeyword) {
            write(updateHeritageClause(node, take(visitNodes(node.types, visitExpressionWithTypeArguments), 1)));
        }
    }

    function visitExpressionWithTypeArguments(node: ExpressionWithTypeArguments, write: (node: ExpressionWithTypeArguments) => void) {
        write(updateExpressionWithTypeArguments(node, visitNode(node.expression, transformNode), /*typeArguments*/ undefined));
    }
    
    function transformPropertyDeclarationToStatement(node: PropertyDeclaration, write: (node: Statement) => void): void {
        transformPropertyDeclarationToExpressionOrStatement(node, undefined, write);
    }

    function transformPropertyDeclarationToExpression(node: PropertyDeclaration, write: (node: Expression) => void): void {
        transformPropertyDeclarationToExpressionOrStatement(node, write, undefined);
    }
    
    function transformPropertyDeclarationToExpressionOrStatement(node: PropertyDeclaration, writeExpression: (node: Expression) => void, writeStatement: (node: Statement) => void): void {
        let isStatic = (node.flags & NodeFlags.Static) !== 0;
        let target = isStatic ? getDeclarationName(currentClassLikeDeclaration) : createThisKeyword();
        let left = createMemberAccessForPropertyName(target, transformPropertyName(node), /*location*/ node.name);
        let initializer = visitNode(node.initializer, transformNode);
        let assignExpr = createAssignmentExpression(left, initializer);
        setTextRange(assignExpr, node);
        if (writeExpression) {
            writeExpression(assignExpr);
        }
        else {
            writeStatement(createExpressionStatement(assignExpr));
        }
    }

    // emitter.ts:4074
    function getInitializedProperties(node: ClassLikeDeclaration, isStatic: boolean): PropertyDeclaration[] {
        let properties: PropertyDeclaration[];
        for (let member of node.members) {
            if (member.kind === SyntaxKind.PropertyDeclaration && isStatic === ((member.flags & NodeFlags.Static) !== 0) && (<PropertyDeclaration>member).initializer) {
                if (!properties) {
                    properties = [];
                }
                
                properties.push(<PropertyDeclaration>member);
            }
        }
        
        return properties;
    }
    
    function getParametersWithPropertyAssignments(node: ConstructorDeclaration): ParameterDeclaration[] {
        let parameters: ParameterDeclaration[];
        for (let parameter of node.parameters) {
            if (isIdentifier(parameter.name) && parameter.flags & NodeFlags.AccessibilityModifier) {
                if (!parameters) {
                    parameters = [];
                }
                
                parameters.push(parameter);
            }
        }
        
        return parameters;
    }
    
    function findInitialSuperCall(ctor: ConstructorDeclaration): ExpressionStatement {
        if (ctor.body) {
            let statement = firstOrUndefined(ctor.body.statements);
            if (isExpressionStatement(statement)) {
                let expr = statement.expression;
                if (isCallExpression(expr)) {
                    let func = expr.expression;
                    if (isSuperKeyword(func)) {
                        return statement;
                    }
                }
            }
        }
        
        return undefined;
    }
    
    function transformMethodDeclaration(node: MethodDeclaration, write: (node: ClassElement) => void) {
        if (!node.body || node.flags & NodeFlags.Abstract) {
            // Abstract methods and method overloads are elided.
            return;
        }
        
        let name = transformPropertyName(node);
        let parameters = visitNodes(node.parameters, transformNode);
        let body = <Block>transformFunctionBody(node);
        let staticFlag = node.flags & NodeFlags.Static;        
        write(createMethodDeclaration2(name, parameters, body, /*location*/ node, staticFlag));
    }
    
    function transformGetAccessor(node: GetAccessorDeclaration, write: (node: ClassElement) => void) {
        if (node.flags & NodeFlags.Abstract) {
            // Abstract accessors are elided.
            return;
        }

        let name = transformPropertyName(node);
        let parameters = visitNodes(node.parameters, transformNode);
        let body = visitNode(node.body, transformNode);
        let staticFlag = node.flags & NodeFlags.Static;
        write(createGetAccessor2(name, parameters, body, /*location*/ node, staticFlag));
    }
    
    function transformSetAccessor(node: SetAccessorDeclaration, write: (node: ClassElement) => void) {
        if (node.flags & NodeFlags.Abstract) {
            // Abstract accessors are elided.
            return;
        }

        let name = transformPropertyName(node);
        let parameters = visitNodes(node.parameters, transformNode);
        let body = visitNode(node.body, transformNode);
        let staticFlag = node.flags & NodeFlags.Static;
        write(createSetAccessor2(name, parameters, body, /*location*/ node, staticFlag));
    }
        
    function transformFunctionDeclaration(node: FunctionDeclaration, write: (node: Statement) => void) {
        if (!node.body) {
            // Function overloads are elided.
            return;
        }
        
        let thisNodeIsNamespaceExport = isNamespaceLevelExport(node);
        let parameters = visitNodes(node.parameters, transformNode);
        let body = <Block>transformFunctionBody(node);  
        let flags = !thisNodeIsNamespaceExport ? node.flags & (NodeFlags.Default | NodeFlags.Export) : undefined;
        write(createFunctionDeclaration3(node.asteriskToken, node.name, parameters, body, /*location*/ node, flags));
        
        if (thisNodeIsNamespaceExport) {
            write(createExpressionStatement(createAssignmentExpression(getModuleMemberName(node), cloneNode(node.name))));
        }
    }

    function transformFunctionExpression(node: FunctionExpression, write: (node: FunctionExpression) => void) {
        let parameters = visitNodes(node.parameters, transformNode);
        let body = <Block>transformFunctionBody(node);  
        write(createFunctionExpression3(node.asteriskToken, node.name, parameters, body, /*location*/ node));
    }

    function transformArrowFunction(node: ArrowFunction, write: (node: ArrowFunction) => void) {
        let parameters = visitNodes(node.parameters, transformNode);
        let body = transformFunctionBody(node);  
        write(createArrowFunction2(parameters, body, /*location*/ node));
    }
    
    function transformFunctionBody(node: FunctionLikeDeclaration): Block | Expression {
        return isAsyncFunctionLike(node)
            ? transformAsyncFunctionBody(node)
            : <Block | Expression>visitNewLexicalEnvironment(node.body, transformNode);
    }
    
    function transformAsyncFunctionBody(node: FunctionLikeDeclaration): Block | Expression {
        let promiseConstructor = getEntityNameFromTypeNode(node.type);
        let hasLexicalArguments = (resolver.getNodeCheckFlags(node) & NodeCheckFlags.CaptureArguments) !== 0;
        let args: string;

        // An async function is emit as an outer function that calls an inner
        // generator function. To preserve lexical bindings, we pass the current
        // `this` and `arguments` objects to `__awaiter`. The generator function
        // passed to `__awaiter` is executed inside of the callback to the
        // promise constructor.
        //
        // The emit for an async arrow without a lexical `arguments` binding might be:
        //
        //  // input
        //  let a = async (b) => { await b; }
        //
        //  // output
        //  let a = (b) => __awaiter(this, void 0, void 0, function* () {
        //      yield b;
        //  });
        //
        // The emit for an async arrow with a lexical `arguments` binding might be:
        //
        //  // input
        //  let a = async (b) => { await arguments[0]; }
        //
        //  // output
        //  let a = (b) => __awaiter(this, arguments, void 0, function* (arguments) {
        //      yield arguments[0];
        //  });
        //
        // The emit for an async function expression without a lexical `arguments` binding
        // might be:
        //
        //  // input
        //  let a = async function (b) {
        //      await b;
        //  }
        //
        //  // output
        //  let a = function (b) {
        //      return __awaiter(this, void 0, void 0, function* () {
        //          yield b;
        //      });
        //  }
        //
        // The emit for an async function expression with a lexical `arguments` binding
        // might be:
        //
        //  // input
        //  let a = async function (b) {
        //      await arguments[0];
        //  }
        //
        //  // output
        //  let a = function (b) {
        //      return __awaiter(this, arguments, void 0, function* (_arguments) {
        //          yield _arguments[0];
        //      });
        //  }
        //
        // The emit for an async function expression with a lexical `arguments` binding
        // and a return type annotation might be:
        //
        //  // input
        //  let a = async function (b): MyPromise<any> {
        //      await arguments[0];
        //  }
        //
        //  // output
        //  let a = function (b) {
        //      return __awaiter(this, arguments, MyPromise, function* (_arguments) {
        //          yield _arguments[0];
        //      });
        //  }
        //

        let body = node.body;
        let generatorBody: Block;
        if (!isBlock(body)) {
            let bodyExpr = visitNode(body, transformNode);
            let returnStmt = createReturnStatement(bodyExpr);
            generatorBody = createBlock([returnStmt]);
        }
        else {
            generatorBody = visitNode(body, transformNode);
        }
        
        let callExpr = createAwaiterHelperCall(hasLexicalArguments, promiseConstructor, generatorBody);
        if (isArrowFunction(node)) {
            return callExpr;
        }
        else {
            return createBlock([createReturnStatement(callExpr)], /*location*/ body);
        }
    }
    
    function transformParameter(node: ParameterDeclaration, write: (node: ParameterDeclaration) => void) {
        let name = visitNode(node.name, transformNode);
        let initializer = visitNode(node.initializer, transformNode);
        let flags = node.flags & ~NodeFlags.AccessibilityModifier;
        write(createParameter2(name, initializer, /*location*/ node, flags));
    }
    
    function transformVariableStatement(node: VariableStatement, write: (node: Statement) => void) {
        pipeNode(node.declarationList, transformVariableDeclarationListToExpressionStatement, write);
    }
    
    function transformVariableDeclarationListToExpressionStatement(node: VariableDeclarationList, write: (node: Statement) => void) {
        let expressions = visitNodes<VariableDeclaration, Expression>(node.declarations, transformVariableDeclarationToExpression);
        if (expressions.length) {
            write(createExpressionStatement(inlineExpressions(expressions)));
        }
    }
    
    function transformVariableDeclarationToExpression(node: VariableDeclaration, write: (node: Expression) => void) {
        if (!node.initializer) {
            return;
        }
        
        transformBindingElementToExpressionWithParenthesisIfNeeded(node, write, /*parenthesizeObjectLiteralAssignment*/ true);
        
        let name = node.name;
        if (isBindingPattern(name)) {
            let expr = visitNode<BindingPattern, Expression>(name, transformBindingPatternToExpression);
            let initializer = visitNode(node.initializer, transformNode);
            let assignExpr = createAssignmentExpression(expr, initializer);
            let parenExpr = createParenthesizedExpression(assignExpr);
            write(parenExpr);
        }
        else {
            let name = getModuleMemberName(node);
            let initializer = visitNode(node.initializer, transformNode);
            let assignExpr = createAssignmentExpression(name, initializer);
            write(assignExpr);
        }
    }
    
    function transformBindingPatternToExpression(node: BindingPattern, write: (node: Expression) => void) {
        switch (node.kind) {
            case SyntaxKind.ObjectBindingPattern:
                return transformObjectBindingPatternToExpression(<ObjectBindingPattern>node, write);
            
            case SyntaxKind.ArrayBindingPattern:
                return transformArrayBindingPatternToExpression(<ObjectBindingPattern>node, write);
        }
    }
    
    function transformObjectBindingPatternToExpression(node: ObjectBindingPattern, write: (node: Expression) => void) {
        let properties = visitNodes<BindingElement, ObjectLiteralElement>(node.elements, transformBindingElementToObjectLiteralElement);
        write(createObjectLiteralExpression2(properties));
    }
    
    function transformArrayBindingPatternToExpression(node: ArrayBindingPattern, write: (node: Expression) => void) {
        let elements = visitNodes<BindingElement, Expression>(node.elements, transformBindingElementToExpression);
        write(createArrayLiteralExpression(elements));
    }
    
    function transformBindingElementToObjectLiteralElement(node: BindingElement, write: (node: ObjectLiteralElement) => void) {
        let propertyName = node.propertyName || <Identifier>node.name;
        let expr = visitNode<BindingElement, Expression>(node, transformBindingElementToExpression);
        write(createPropertyAssignment(propertyName, expr));
    }
    
    function transformBindingElementToExpression(node: BindingElement, write: (node: Expression) => void) {
        transformBindingElementToExpressionWithParenthesisIfNeeded(node, write, /*parenthesizeObjectLiteralAssignment*/ false);
    }

    function transformBindingElementToExpressionWithParenthesisIfNeeded(node: BindingElement, write: (node: Expression) => void, parenthesizeObjectLiteralAssignment?: boolean) {
        let name = node.name;
        let expr = isBindingPattern(name)
            ? visitNode<BindingPattern, Expression>(name, transformBindingPatternToExpression)
            : getModuleMemberName(node);

        let initializer = visitNode(node.initializer, transformNode);
        if (initializer) {
            expr = createAssignmentExpression(expr, initializer);
        }
        
        if (parenthesizeObjectLiteralAssignment && isObjectBindingPattern(name)) {
            expr = createParenthesizedExpression(expr);
        }
        else if (node.dotDotDotToken) {
            expr = createSpreadElementExpression(expr);
        }
        
        write(expr);
    }
    
    function transformModuleDeclaration(node: ModuleDeclaration, write: (node: Statement) => void) {
        if (!shouldEmitModuleDeclaration(node)) {
            return;
        }
        
        let savedCurrentModuleDeclaration = currentModuleDeclaration;
        currentModuleDeclaration = node;
        
        let location = node;
        if (!isModuleMergedWithClass(node)) {
            let exportFlags = isTopLevelExport(node) ? NodeFlags.Export : undefined;
            let varDecl = createVariableDeclaration2(<Identifier>node.name);
            let varDecls = createVariableDeclarationList([varDecl]);
            let varStmt = createVariableStatement2(varDecls, location, exportFlags);
            write(varStmt);
            location = undefined;
        }
        
        let localName = getGeneratedNameForNode(node);
        let localParam = createParameter2(localName);
        
        let body = node.body;
        let moduleBody: Block;
        if (isModuleBlock(body)) {
            moduleBody = createBlock(visitNodes(body.statements, transformModuleElement, PipelineFlags.LexicalEnvironment));
        }
        else {
            let inner = visitStatement(body, transformNode);
            moduleBody = isBlock(inner) ? inner : createBlock([inner]);
        }
        
        let funcExpr = createFunctionExpression2(/*name*/ undefined, [localParam], moduleBody);
        let parenExpr = createParenthesizedExpression(funcExpr);
        let moduleMemberName = getModuleMemberName(node);
        let moduleStorageObjExpr = createObjectLiteralExpression2();
        let moduleStorageInitExpr = createAssignmentExpression(moduleMemberName, moduleStorageObjExpr);
        let moduleStorageExpr = createLogicalOrExpression(moduleMemberName, moduleStorageInitExpr);
        let moduleParam: Expression = moduleStorageExpr;
        if (isNamespaceLevelExport(node)) {
            moduleParam = createAssignmentExpression(cloneNode(node.name), moduleStorageExpr);
        }
        
        let callExpr = createCallExpression2(parenExpr, [moduleParam]);
        let callStmt = createExpressionStatement(callExpr, location, NodeFlags.GeneratedNamespace);
        write(setOriginalNode(callStmt, node));
        
        currentModuleDeclaration = savedCurrentModuleDeclaration;
    }

    function shouldEmitModuleDeclaration(node: ModuleDeclaration) {
        return isInstantiatedModule(node, compilerOptions.preserveConstEnums || compilerOptions.isolatedModules);
    }

    function isModuleMergedWithClass(node: ModuleDeclaration) {
        return !!(resolver.getNodeCheckFlags(node) & NodeCheckFlags.LexicalModuleMergesWithClass);
    }
    
    function getExpressionForPropertyName(container: Declaration): Expression {
        let name = <PropertyName>container.name;
        if (isIdentifier(name)) {
            return createStringLiteral(name.text);
        }
        else if (isComputedPropertyName(name)) {
            return getGeneratedNameForNode(name);
        }
        else {
            return cloneNode(name);
        }
    }
    
    function transformPropertyName(container: ClassElement): PropertyName {
        let name = container.name;
        if (isComputedPropertyName(name)) {
            let expression = visitNode(name.expression, transformNode);
            if (nodeCanBeDecorated(container) && nodeIsDecorated(container)) {
                let generatedName = getGeneratedNameForNode(name);
                hoistVariableDeclaration(generatedName);
                expression = createAssignmentExpression(generatedName, expression);
            }
            
            return updateComputedPropertyName(name, expression);
        }
        else {
            return cloneNode(name);
        }
    }
    
    function transformEnumDeclaration(node: EnumDeclaration, write: (node: Statement) => void) {
        if (!shouldEmitEnumDeclaration(node)) {
            // Const enum declarations may be elided.
            return;
        }

        let savedCurrentEnumLocalName = currentEnumLocalName;
        currentEnumLocalName = getGeneratedNameForNode(node);
        
        let location: TextRange = node;
        if (!isNamespaceLevelExport(node)) {
            write(createVariableStatement3(node.name, /*initializer*/ undefined, location, isTopLevelExport(node) ? NodeFlags.Export : undefined));
            location = undefined;
        }
        
        let enumStatements: Statement[] = [];
        emitNodes(node.members, emitEnumMember, enumStatements, undefined, isStatementNode);

        let enumBody = createBlock(enumStatements);
        let localNameParam = createParameter2(currentEnumLocalName);
        let enumDecl = createFunctionExpression2(/*name*/ undefined, [localNameParam], enumBody);
        let parenExpr = createParenthesizedExpression(enumDecl);
        let moduleMemberName = getModuleMemberName(node);
        let enumStorageObjectExpr = createObjectLiteralExpression2();
        let enumStorageInitExpr = createAssignmentExpression(moduleMemberName, enumStorageObjectExpr);
        let enumStorageExpr = createLogicalOrExpression(moduleMemberName, enumStorageInitExpr);
        let callExpr = createCallExpression2(parenExpr, [enumStorageExpr]);
        write(createExpressionStatement(callExpr, location));
        
        if (isNamespaceLevelExport(node)) {
            write(createVariableStatement3(node.name, moduleMemberName));
        }

        currentEnumLocalName = savedCurrentEnumLocalName;
    }
    
    function emitEnumMember(node: EnumMember, write: (node: Statement) => void) {
        let enumNameExpr = getExpressionForPropertyName(node);
        let enumValueExpr = getEnumMemberDeclarationValue(node);
        let enumNameElemExpr = createElementAccessExpression2(currentEnumLocalName, enumNameExpr);
        let enumValueAssignExpr = createAssignmentExpression(enumNameElemExpr, enumValueExpr);
        let enumValueElemExpr = createElementAccessExpression2(currentEnumLocalName, enumValueAssignExpr);
        let enumNameAssignExpr = createAssignmentExpression(enumValueElemExpr, enumNameExpr);
        write(createExpressionStatement(enumNameAssignExpr, /*location*/ node));
    }
    
    function getEnumMemberDeclarationValue(member: EnumMember): Expression {
        let value = resolver.getConstantValue(member);
        if (value !== undefined) {
            return createNumericLiteral2(value);
        }
        else if (member.initializer) {
            return visitNode(member.initializer, transformNode);
        }
        else {
            return createVoidZeroExpression();
        }
    }
    
    function shouldEmitEnumDeclaration(node: EnumDeclaration) {
        return isConst(node) || compilerOptions.preserveConstEnums || compilerOptions.isolatedModules;
    }
    
    function transformAwaitExpression(node: AwaitExpression, write: (node: Expression) => void) {
        let expression = visitNode(node.expression, transformNode);
        let yieldExpr = createYieldExpression(/*asteriskToken*/ undefined, expression, /*location*/ node);
        if (needsParenthesisForAwaitExpressionAsYield(node)) {
            write(createParenthesizedExpression(yieldExpr));
        }
        else {
            write(yieldExpr);
        }
    }

    function needsParenthesisForAwaitExpressionAsYield(node: AwaitExpression) {
        let parentNode = getParentNode();
        if (isBinaryExpression(parentNode) && !isAssignmentOperator(parentNode.operatorToken.kind)) {
            return true;
        }
        else if (isConditionalExpression(parentNode) && parentNode.condition === node) {
            return true;
        }

        return false;
    }
    
    function transformDecoratorsOfMembers(node: ClassLikeDeclaration, isStatic: boolean, statements: (node: Statement) => void) {
        for (let member of node.members) {
            // only emit members in the correct group
            if (isStatic !== ((member.flags & NodeFlags.Static) !== 0)) {
                continue;
            }
            
            // skip members that cannot be decorated (such as the constructor)
            // skip a member if it or any of its parameters are not decorated
            if (!nodeCanBeDecorated(member) || !nodeOrChildIsDecorated(member)) {
                continue;
            }
            
            transformDecoratorsOfMember(node, member, statements);
        }
    }
    
    function transformDecoratorsOfConstructor(node: ClassLikeDeclaration, write: (node: Statement) => void) {
        let decorators = node.decorators;
        let constructor = getFirstConstructorWithBody(node);
        let hasDecoratedParameters = constructor && forEach(constructor.parameters, nodeIsDecorated);

        // skip decoration of the constructor if neither it nor its parameters are decorated
        if (!decorators && !hasDecoratedParameters) {
            return;
        }

        // Emit the call to __decorate. Given the class:
        //
        //   @dec
        //   class C {
        //   }
        //
        // The emit for the class is:
        //
        //   C = __decorate([dec], C);
        //
        
        let decoratorExpressions: Expression[] = [];
        emitNodes(decorators, transformDecoratorToExpression, decoratorExpressions);
        emitNode(constructor, emitDecoratorsOfParameters, decoratorExpressions);
        
        if (compilerOptions.emitDecoratorMetadata) {
            emitNode(node, emitSerializedTypeMetadata, decoratorExpressions);
        }
        
        let name = getDeclarationName(node);
        let callExpr = createDecorateHelperCall(decoratorExpressions, name);
        let statement = createExpressionStatement(callExpr);
        write(statement);
    }
    
    function transformDecoratorToExpression(node: Decorator, write: (node: Expression) => void) {
        return visitNode(node.expression, transformNode);
    }
    
    function transformDecoratorsOfMember(node: ClassLikeDeclaration, member: ClassElement, write: (node: Statement) => void) {
        let decorators: Decorator[];
        let parameters: ParameterDeclaration[];

        // skip an accessor declaration if it is not the first accessor
        if (isAccessor(member) && member.body) {
            let accessors = getAllAccessorDeclarations(node.members, member);
            if (member !== accessors.firstAccessor) {
                return;
            }
            
            // get the decorators from the first accessor with decorators
            decorators = accessors.firstAccessor.decorators;
            if (!decorators && accessors.secondAccessor) {
                decorators = accessors.secondAccessor.decorators;
            }

            // we only decorate parameters of the set accessor
            parameters = accessors.setAccessor 
                ? accessors.setAccessor.parameters
                : undefined;
        }
        else {
            decorators = member.decorators;

            // we only decorate the parameters here if this is a method
            if (isMethodDeclaration(member) && member.body) {
                parameters = member.parameters;
            }
        }
        
        // Emit the call to __decorate. Given the following:
        //
        //   class C {
        //     @dec method(@dec2 x) {}
        //     @dec get accessor() {}
        //     @dec prop;
        //   }
        //
        // The emit for a method is:
        //
        //   Object.defineProperty(C.prototype, "method",
        //       __decorate([
        //           dec,
        //           __param(0, dec2),
        //           __metadata("design:type", Function),
        //           __metadata("design:paramtypes", [Object]),
        //           __metadata("design:returntype", void 0)
        //       ], C.prototype, "method", Object.getOwnPropertyDescriptor(C.prototype, "method")));
        //
        // The emit for an accessor is:
        //
        //   Object.defineProperty(C.prototype, "accessor",
        //       __decorate([
        //           dec
        //       ], C.prototype, "accessor", Object.getOwnPropertyDescriptor(C.prototype, "accessor")));
        //
        // The emit for a property is:
        //
        //   __decorate([
        //       dec
        //   ], C.prototype, "prop");
        //

        let decoratorExpressions: Expression[] = [];
        emitNodes(decorators, transformDecoratorToExpression, decoratorExpressions);
        emitNodes(parameters, emitDecoratorsOfParameter, decoratorExpressions);
        if (compilerOptions.emitDecoratorMetadata) {
            emitNode(node, emitSerializedTypeMetadata, decoratorExpressions);
        }
        
        let prefix = getClassMemberPrefix(node, member);
        let memberName = getExpressionForPropertyName(member);
        if (isPropertyDeclaration(member)) {
            let decorateExpr = createDecorateHelperCall(decoratorExpressions, prefix, memberName);
            let statement = createExpressionStatement(decorateExpr);
            write(statement);
        }
        else {
            let descriptorExpr = createGetOwnPropertyDescriptorCall(prefix, memberName);
            let decorateExpr = createDecorateHelperCall(decoratorExpressions, prefix, memberName, descriptorExpr);
            let definePropertyExpr = createDefinePropertyCall(prefix, memberName, decorateExpr);
            let statement = createExpressionStatement(definePropertyExpr);
            write(statement);
        }
    }
    
    function emitDecoratorsOfParameters(node: FunctionLikeDeclaration, write: (node: Expression) => void) {
        pipeNodes(node.parameters, emitDecoratorsOfParameter, write);
    }
    
    function emitDecoratorsOfParameter(node: ParameterDeclaration, write: (node: Expression) => void, offset?: number) {
        let savedCurrentParameterIndex = currentParameterIndex;
        currentParameterIndex = offset;
        pipeNodes(node.decorators, emitDecoratorOfParameter, write);
        currentParameterIndex = savedCurrentParameterIndex;
    }
    
    function emitDecoratorOfParameter(node: Decorator, write: (node: Expression) => void) {
        let decoratorExpr = visitNode(node.expression, transformNode);
        write(createParamHelperCall(currentParameterIndex, decoratorExpr));
    }
    
    function emitSerializedTypeMetadata(node: Declaration, write: (node: Expression) => void) {
        if (shouldAppendTypeMetadata(node)) {
            let typeExpr = serializeTypeOfNode(node);
            let metadataExpr = createMetadataHelperCall("design:type", createArrowFunction2([], typeExpr));
            write(metadataExpr);
        }
        if (shouldAppendParamTypesMetadata(node)) {
            let paramTypesExpr = serializeParameterTypesOfNode(node);
            let metadataExpr = createMetadataHelperCall("design:paramtypes", createArrowFunction2([], paramTypesExpr));
            write(metadataExpr);
        }
        if (shouldAppendReturnTypeMetadata(node)) {
            let returnTypeExpr = serializeReturnTypeOfNode(node);
            let metadataExpr = createMetadataHelperCall("design:returntype", createArrowFunction2([], returnTypeExpr));
            write(metadataExpr);
        }
    }
    
    function shouldAppendTypeMetadata(node: Declaration): boolean {
        // This method determines whether to emit the "design:type" metadata based on the node's kind.
        // The caller should have already tested whether the node has decorators and whether the emitDecoratorMetadata
        // compiler option is set.
        switch (node.kind) {
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.PropertyDeclaration:
                return true;
        }

        return false;
    }

    function shouldAppendReturnTypeMetadata(node: Declaration): boolean {
        // This method determines whether to emit the "design:returntype" metadata based on the node's kind.
        // The caller should have already tested whether the node has decorators and whether the emitDecoratorMetadata
        // compiler option is set.
        switch (node.kind) {
            case SyntaxKind.MethodDeclaration:
                return true;
        }
        return false;
    }

    function shouldAppendParamTypesMetadata(node: Declaration): boolean {
        // This method determines whether to emit the "design:paramtypes" metadata based on the node's kind.
        // The caller should have already tested whether the node has decorators and whether the emitDecoratorMetadata
        // compiler option is set.
        switch (node.kind) {
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.SetAccessor:
                return true;
        }
        return false;
    }
    
    function serializeTypeOfNode(node: Node): Expression {
        if (isPropertyDeclaration(node) || isParameter(node) || isGetAccessor(node)) {
            return serializeTypeNode(node.type);
        }
        else if (isSetAccessor(node)) {
            return serializeTypeNode(getSetAccessorTypeAnnotationNode(node));
        }
        else if (isClassLike(node) || isFunctionLike(node)) {
            return createIdentifier("Function");
        }
        else {
            return createVoidZeroExpression();
        }
    }
    
    function serializeParameterTypesOfNode(node: Node): Expression {
        let valueDeclaration =
            isClassLike(node) ? getFirstConstructorWithBody(node) :
            isFunctionLike(node) && nodeIsPresent(node.body) ? node :
            undefined;
        
        let parameterTypeExpressions: Expression[] = [];
        if (valueDeclaration) {
            for (let parameter of valueDeclaration.parameters) {
                if (parameter.dotDotDotToken) {
                    let parameterType = parameter.type;
                    let elementType =
                        isArrayType(parameterType) ? parameterType.elementType :
                        isTypeReference(parameterType) && parameterType.typeArguments && singleOrUndefined(parameterType.typeArguments);
                    parameterTypeExpressions.push(serializeTypeNode(elementType));
                }
                else {
                    parameterTypeExpressions.push(serializeTypeOfNode(parameter));
                }
            }
        }
        
        return createArrayLiteralExpression(parameterTypeExpressions);
    }
    
    function serializeReturnTypeOfNode(node: Node): Expression {
        if (isFunctionLike(node)) {
            return serializeTypeNode(node.type);
        }
        
        return undefined;
    }
    
    function serializeTypeNode(node: TypeNode): Expression {
        if (node === undefined) {
            return createIdentifier("Object");
        }
        
        switch (node.kind) {
            case SyntaxKind.VoidKeyword:
                return createVoidZeroExpression(); 

            case SyntaxKind.ParenthesizedType:
                return serializeTypeNode((<ParenthesizedTypeNode>node).type);
                
            case SyntaxKind.FunctionType:
            case SyntaxKind.ConstructorType:
                return createIdentifier("Function");
                
            case SyntaxKind.ArrayType:
            case SyntaxKind.TupleType:
                return createIdentifier("Array");
                
            case SyntaxKind.TypePredicate:
            case SyntaxKind.BooleanKeyword:
                return createIdentifier("Boolean")

            case SyntaxKind.StringKeyword:
            case SyntaxKind.StringLiteral:
                return createIdentifier("String"); 
                
            case SyntaxKind.NumberKeyword:
                return createIdentifier("Number");
                
            case SyntaxKind.SymbolKeyword:
                return languageVersion < ScriptTarget.ES6
                    ? getGlobalSymbolNameWithFallback()
                    : createIdentifier("Symbol");

            case SyntaxKind.TypeReference:
                return serializeTypeReferenceNode(<TypeReferenceNode>node);
                
            case SyntaxKind.TypeQuery:
            case SyntaxKind.TypeLiteral:
            case SyntaxKind.UnionType:
            case SyntaxKind.IntersectionType:
            case SyntaxKind.AnyKeyword:
                break;
                
            default:
                Debug.fail("Cannot serialize unexpected type node.");
                break;
        }
        
        return createIdentifier("Object");
    }

    /** Serializes a TypeReferenceNode to an appropriate JS constructor value. Used by the __metadata decorator. */
    function serializeTypeReferenceNode(node: TypeReferenceNode) {
        Debug.fail("parent pointer");
        let location: Node = node.parent;
        while (isDeclaration(location) || isTypeNode(location)) {
            location = location.parent;
        }

        // Clone the type name and parent it to a location outside of the current declaration.
        let typeName = cloneEntityName(node.typeName);
        typeName.parent = location;

        let result = resolver.getTypeReferenceSerializationKind(typeName);
        switch (result) {
            case TypeReferenceSerializationKind.Unknown:
                let tempVar = declareLocal();
                let globalObjectName = createIdentifier("Object");
                let typeExpr = serializeEntityNameAsExpression(typeName, /*useFallback*/ true);
                let cacheExpr = createAssignmentExpression(tempVar, typeExpr);
                let typeOfExpr = createTypeOfExpression(createParenthesizedExpression(cacheExpr));
                let functionLiteral = createStringLiteral("function");
                let equalityExpr = createStrictEqualityExpression(typeOfExpr, functionLiteral);
                let logicalAndExpr = createLogicalAndExpression(equalityExpr, tempVar);
                let logicalOrExpr = createLogicalOrExpression(logicalAndExpr, globalObjectName);
                return logicalOrExpr;

            case TypeReferenceSerializationKind.TypeWithConstructSignatureAndValue:
                return serializeEntityNameAsExpression(typeName, /*useFallback*/ false);
                
            case TypeReferenceSerializationKind.VoidType:
                return createVoidZeroExpression();
                
            case TypeReferenceSerializationKind.BooleanType:
                return createIdentifier("Boolean");
                
            case TypeReferenceSerializationKind.NumberLikeType:
                return createIdentifier("Number");
                
            case TypeReferenceSerializationKind.StringLikeType:
                return createIdentifier("String");
                
            case TypeReferenceSerializationKind.ArrayLikeType:
                return createIdentifier("Array");
                
            case TypeReferenceSerializationKind.ESSymbolType:
                return languageVersion < ScriptTarget.ES6
                    ? getGlobalSymbolNameWithFallback()
                    : createIdentifier("Symbol");
                
            case TypeReferenceSerializationKind.TypeWithCallSignature:
                return createIdentifier("Function");
                
            case TypeReferenceSerializationKind.ObjectType:
            default:
                break;
        }
        
        return createIdentifier("Object");
    }

    function serializeEntityNameAsExpression(node: EntityName, useFallback: boolean): Expression {
        switch (node.kind) {
            case SyntaxKind.Identifier:
                let name = cloneNode(<Identifier>node);
                if (useFallback) {
                    let undefinedLiteral = createStringLiteral("undefined");
                    let typeOfExpr = createTypeOfExpression(name);
                    let equalityExpr = createStrictInequalityExpression(typeOfExpr, undefinedLiteral);
                    let logicalAndExpr = createLogicalAndExpression(equalityExpr, name);
                    return logicalAndExpr;
                }
                
                return name;
                
            case SyntaxKind.QualifiedName:
                return serializeQualifiedNameAsExpression(<QualifiedName>node, useFallback);
        }
    }

    function serializeQualifiedNameAsExpression(node: QualifiedName, useFallback: boolean): Expression {
        let left: Expression
        if (node.left.kind === SyntaxKind.Identifier) {
            left = serializeEntityNameAsExpression(node.left, useFallback);
        }
        else if (useFallback) {
            let tempVar = declareLocal();
            let pathExpr = serializeEntityNameAsExpression(node.left, /*useFallback*/ true);
            let cacheExpr = createAssignmentExpression(tempVar, pathExpr);
            left = createLogicalAndExpression(cacheExpr, tempVar);
        }
        else {
            left = serializeEntityNameAsExpression(node.left, /*useFallback*/ false);
        }
        
        // we clone the node here to create a copy of the node with no position information 
        let right = cloneNode(node.right);
        let propExpr = createPropertyAccessExpression2(left, right);
        return propExpr;
    }
    
    function getGlobalSymbolNameWithFallback(): Expression {
        let globalSymbolName = createIdentifier("Symbol");
        let globalObjectName = createIdentifier("Object");
        let typeOfExpr = createTypeOfExpression(globalSymbolName);
        let functionLiteral = createStringLiteral("function");
        let equalityExpr = createStrictEqualityExpression(typeOfExpr, functionLiteral);
        let conditionalExpr = createConditionalExpression2(equalityExpr, globalSymbolName, globalObjectName);
        return conditionalExpr;
    }

    function isTopLevelExport(node: Node) {
        return !!(node.flags & NodeFlags.Export) && isSourceFile(getParentNode());
    }
    
    function isTopLevelDefaultExport(node: Node) {
        return isTopLevelExport(node) && !!(node.flags & NodeFlags.Default);
    }

    function isTopLevelNonDefaultExport(node: Node) {
        return isTopLevelExport(node) && !(node.flags & NodeFlags.Default);
    }
    
    function isNamespaceLevelExport(node: Node) {
        return !!(node.flags & NodeFlags.Export) && !isSourceFile(getParentNode());
    }
    
    function getContainingModule(): ModuleDeclaration {
        return findAncestorNode(isModuleDeclaration);
    }
    
    function getContainingModuleName(): Identifier {
        let container = findAncestorNode(isModuleDeclaration);
        return container ? getGeneratedNameForNode(container) : createIdentifier("exports");
    }
    
    function getModuleMemberName(node: Declaration): Expression {
        let name = <Identifier>getDeclarationName(node);
        Debug.assert(isIdentifier(name));

        if (getCombinedNodeFlags(transform) & NodeFlags.Export) {
            let container = getContainingModuleName();
            let propExpr = createPropertyAccessExpression2(container, name);
            return propExpr;
        }
        return name;
    }
}