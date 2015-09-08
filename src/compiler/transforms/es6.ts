/// <reference path="../transform.generated.ts" />
/*@internal*/
namespace ts.transform {
    let resolver: EmitResolver;
    let compilerOptions: CompilerOptions;
    let languageVersion: ScriptTarget;
    
    export function toES6(statements: NodeArray<Statement>) {
        resolver = getEmitResolver();
        compilerOptions = getCompilerOptions();
        languageVersion = compilerOptions.target || ScriptTarget.ES3;
        return visitNodes(statements, transformNode, /*newLexicalEnvironment*/ true);
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
    function transformNode<T extends Node>(node: T, write: (node: T) => void): void {
        if (!node) {
            return;
        }

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
        if (!node) {
            return;
        }
        
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
    function transformNodeWorker(node: Node, write?: (node: Node) => void): void {
        // TypeScript ambient declarations are elided.
        if (node.flags & NodeFlags.Ambient) {
            return;
        }
        
        switch (node.kind) {
            // case SyntaxKind.Block:
            // case SyntaxKind.ModuleBlock:
            // case SyntaxKind.CaseClause:
            // case SyntaxKind.DefaultClause:
            //     // These nodes contain statement lists which may need to be expanded to include multiple statements...
            //     // See NodeArraywrite in transform.ts for approach
                
            // case SyntaxKind.DoStatement:
            // case SyntaxKind.WhileStatement:
            // case SyntaxKind.ForStatement:
            // case SyntaxKind.ForInStatement:
            // case SyntaxKind.ForOfStatement:
            // case SyntaxKind.IfStatement:
            // case SyntaxKind.LabeledStatement:
            // case SyntaxKind.WithStatement:
            //     // These nodes contain single statement nodes that may need to be switched to a block if a child node needs multiple statements...
            //     // See Statementwrite in transform.ts for approach
            
            case SyntaxKind.PublicKeyword:
            case SyntaxKind.PrivateKeyword:
            case SyntaxKind.ProtectedKeyword:
            case SyntaxKind.AbstractKeyword:
            case SyntaxKind.AsyncKeyword:
            case SyntaxKind.ConstKeyword:
            case SyntaxKind.DeclareKeyword:
                // TypeScript accessibility modifiers are elided.
                
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
                
            case SyntaxKind.IndexSignature:
                // TypeScript index signatures are elided.
                
            case SyntaxKind.Decorator:
                // TypeScript decorators are elided. They will be emitted as part of transformClassDeclaration.
                
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
                // TypeScript type-only declarations are elided

            case SyntaxKind.PropertyDeclaration:
                // TypeScript property declarations are elided.
                
            case SyntaxKind.IndexSignature:
                // TypeScript index signatures are elided.
                
            case SyntaxKind.Constructor:
                // TypeScript constructors are elided. The constructor of a class will be
                // reordered to the start of the member list in `transformClassDeclaration`.
                
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
                // TypeScript interfaces and type aliases are elided.

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
                return transformHeritageClause(<HeritageClause>node, write);
                
            case SyntaxKind.ExpressionWithTypeArguments:
                // TypeScript supports type arguments on an expression in an `extends` heritage clause.
                return transformExpressionWithTypeArguments(<ExpressionWithTypeArguments>node, write);
            
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
                
            // case SyntaxKind.VariableStatement:
            //     // TypeScript namespace exports for variable statements must be transformed.
            //     return transformVariableStatement(<VariableStatement>node, write);
                
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
        let thisNodeIsNamespaceExport = isNamespaceLevelExport(node);
        let name = getDeclarationName(node);
        let heritageClauses = visitNodes(node.heritageClauses, transformNode);
        let extendsClause = heritageClauses && firstOrUndefined(heritageClauses);
        let baseTypeNode = extendsClause && firstOrUndefined(extendsClause.types);
        let constructor = transformConstructor(node, baseTypeNode);
        let members = visitNodes(node.members, transformNode);
        let classMembers: ClassElement[] = constructor ? [constructor, ...members] : members;

        if (nodeIsDecorated(node)) {
            let classExpr = factory.createClassExpression2(/*name*/ undefined, extendsClause, classMembers);
            let varDecl = factory.createVariableDeclaration2(name, classExpr);
            let varDeclList = factory.createVariableDeclarationList([varDecl], /*location*/ undefined, NodeFlags.Let);
            let exportFlags = isTopLevelNonDefaultExport(node) ? NodeFlags.Export : undefined; 
            let varStmt = factory.createVariableStatement2(varDeclList, /*location*/ node, exportFlags);
            varStmt.original = node;
            write(varStmt);
        }
        else {
            let exportFlags = thisNodeIsNamespaceExport
                ? undefined
                : node.flags & (NodeFlags.Export | NodeFlags.Default);
            let classDecl = factory.createClassDeclaration2(name, extendsClause, classMembers, /*location*/ node, exportFlags);
            classDecl.original = node;
            write(classDecl);
        }
        
        transformPropertyDeclarationsToStatements(node, getInitializedProperties(node, /*isStatic*/ true), write);
        transformDecoratorsOfMembers(node, /*isStatic*/ false, write);
        transformDecoratorsOfMembers(node, /*isStatic*/ true, write);
        transformDecoratorsOfConstructor(node, write);
        
        if (thisNodeIsNamespaceExport) {
            let namespaceExportExpr = factory.createAssignmentExpression(getModuleMemberName(node), name);
            let exprStmt = factory.createExpressionStatement(namespaceExportExpr);
            write(exprStmt);
        }
        else if (isTopLevelDefaultExport(node) && nodeIsDecorated(node)) {
            let exportDefaultStmt = factory.createExportAssignment(/*decorators*/ undefined, /*modifiers*/ undefined, name);
            write(exportDefaultStmt);
        }
    }
    
    function transformClassExpression(node: ClassExpression, write: (node: LeftHandSideExpression) => void) {
        let name = getDeclarationName(node);
        let heritageClauses = visitNodes(node.heritageClauses, transformNode);
        let extendsClause = heritageClauses ? firstOrUndefined(heritageClauses) : undefined;
        let baseTypeNode = extendsClause ? firstOrUndefined(extendsClause.types) : undefined;
        let constructor = transformConstructor(node, baseTypeNode);
        let members = visitNodes(node.members, transformNodeWorker);
        let classMembers = constructor ? [constructor, ...members] : members;

        let newNode = factory.createClassExpression2(
            name,
            extendsClause,
            classMembers
        );
        
        let staticPropertyAssignments = getInitializedProperties(node, /*isStatic*/ true);
        if (staticPropertyAssignments) {
            let expressions: Expression[] = [];
            let tempVar = declareLocal();
            let cacheExpr = factory.createAssignmentExpression(tempVar, newNode);
            expressions.push(cacheExpr);
            transformPropertyDeclarationsToExpressions(node, staticPropertyAssignments, expressions);
            expressions.push(tempVar);
            write(factory.createParenthesizedExpression(factory.inlineExpressions(expressions)));
        }
        else {
            write(newNode);
        }
    }

    function isTopLevelExport(node: Node) {
        return !!(node.flags & NodeFlags.Export) &&
            getParentNode().kind === SyntaxKind.SourceFile;
    }
    
    function isTopLevelDefaultExport(node: Node) {
        return isTopLevelExport(node) && !!(node.flags & NodeFlags.Default);
    }

    function isTopLevelNonDefaultExport(node: Node) {
        return isTopLevelExport(node) && !(node.flags & NodeFlags.Default);
    }
    
    function isNamespaceLevelExport(node: Node) {
        return !!(node.flags & NodeFlags.Export) &&
            getParentNode().kind !== SyntaxKind.SourceFile;
    }
    
    function getContainingModule(): ModuleDeclaration {
        return findAncestorNode(isModuleDeclaration);
    }
    
    function getContainingModuleName(): Identifier {
        let container = findAncestorNode(isModuleDeclaration);
        return container ? getGeneratedNameForNode(container) : factory.createIdentifier("exports");
    }
    
    function getModuleMemberName(node: Declaration): Expression {
        let name = <Identifier>getDeclarationName(node);
        Debug.assert(isIdentifier(name));

        if (getCombinedNodeFlags(node) & NodeFlags.Export) {
            let container = getContainingModuleName();
            let propExpr = factory.createPropertyAccessExpression2(container, name);
            return propExpr;
        }
        return name;
    }
    
    function transformConstructor(node: ClassLikeDeclaration, baseTypeNode: ExpressionWithTypeArguments) {
        // Check if we have a property assignment inside class declaration.
        // If there is a property assignment, we need to emit constructor whether users define it or not
        // If there is no property assignment, we can omit constructor if users do not define it
        let constructor = getFirstConstructorWithBody(node);
        let parameterPropertyAssignments = constructor ? getParametersWithPropertyAssignments(constructor) : undefined;
        let instancePropertyAssignments = getInitializedProperties(node, /*isStatic*/ false);
        // let leadingCommentRanges: CommentRange[];
        // let trailingCommentRanges: CommentRange[];
        // for (let member of node.members) {
        //     if (isConstructor(member) && !member.body) {
        //         let leadingCommentRangesOfMember = context.getLeadingCommentRanges(member, /*onlyPinnedOrTripleSlashComments*/ true);
        //         leadingCommentRanges = concatenate(leadingCommentRanges, leadingCommentRangesOfMember);
        //     }
        // }
        
        // For target ES6 and above, if there is no property assignment
        // do not emit constructor in class declaration.
        if (!parameterPropertyAssignments && !instancePropertyAssignments) {
            // if (leadingCommentRanges) {
            //     leadingCommentRanges = concatenate(leadingCommentRanges, context.getLeadingCommentRanges(ctor));
            //     ctor = factory.cloneNode(ctor);
            //     factory.attachCommentRanges(ctor, leadingCommentRanges, trailingCommentRanges);
            // }

            return constructor;
        }
        
        
        let parameters =
            constructor ? visitNodes(constructor.parameters, transformNode) :
            baseTypeNode ? [factory.createRestParameter(factory.createIdentifier("args"), /*location*/ undefined, NodeFlags.GeneratedRest)] :
            [];
            
        // let parameters =
        //     constructor ? transformSignatureParameters(constructor.parameters) :
        //     hasBaseType ? [factory.createRestParameter(tag_id`args`, /*location*/ undefined, NodeFlags.GeneratedRest)] :
        //     [];

        let statements: Statement[] = [];
        let superCall: ExpressionStatement;
        if (constructor) {
            // leadingCommentRanges = concatenate(
            //     leadingCommentRanges,
            //     context.getLeadingCommentRanges(ctor)
            // );
            // trailingCommentRanges = context.getTrailingCommentRanges(ctor);
            
            if (baseTypeNode) {
                superCall = findInitialSuperCall(constructor);
                if (superCall) {
                    statements.push(superCall);
                }
            }
            if (parameterPropertyAssignments) {
                for (let parameter of parameterPropertyAssignments) {
                    let name = <Identifier>factory.cloneNode(parameter.name);
                    let thisExpr = factory.createThisKeyword();
                    let propExpr = factory.createPropertyAccessExpression2(thisExpr, name);
                    let assignExpr = factory.createAssignmentExpression(propExpr, name);
                    let assignStmt = factory.createExpressionStatement(assignExpr);
                    factory.startOnNewLine(assignStmt);
                    statements.push(assignStmt);
                }
            }
        }
        else if (baseTypeNode) {
            let superExpr = factory.createSuperKeyword();
            let argsName = factory.createIdentifier("args");
            let spreadExpr = factory.createSpreadElementExpression(argsName);
            let callExpr = factory.createCallExpression2(superExpr, [spreadExpr]);
            let callStmt = factory.createExpressionStatement(callExpr, /*location*/ undefined, NodeFlags.GeneratedSuper);
            factory.startOnNewLine(callStmt);
            statements.push(callStmt);
        }
        
        transformPropertyDeclarationsToStatements(node, instancePropertyAssignments, n => { statements.push(n); });
        
        if (constructor) {
            let bodyStatements = superCall
                ? constructor.body.statements.slice(1)
                : constructor.body.statements;
            statements.push(...visitNodes(bodyStatements, transformNode));
        }
        
        let body = constructor 
            ? factory.updateBlock(constructor.body, statements) 
            : factory.createBlock(statements);
        
        let newConstructor = factory.createConstructor2(parameters, body, /*location*/ constructor);
        // factory.attachCommentRanges(newConstructor, leadingCommentRanges, trailingCommentRanges);
        return newConstructor;
    }
    
    function transformHeritageClause(node: HeritageClause, write: (node: HeritageClause) => void) {
        if (node.token === SyntaxKind.ExtendsKeyword) {
            write(factory.updateHeritageClause(
                node,
                visitNodes(node.types, transformNode)
            ));
        }
    }

    function transformExpressionWithTypeArguments(node: ExpressionWithTypeArguments, write: (node: ExpressionWithTypeArguments) => void) {
        write(factory.updateExpressionWithTypeArguments(
            node,
            visitNode(node.expression, transformNode),
            /*typeArguments*/ undefined
        ));
    }
    
    function transformPropertyDeclarationsToStatements(node: ClassLikeDeclaration, properties: PropertyDeclaration[], write: (node: Statement) => void) {
        if (!properties) {
            return;
        }
        
        for (let property of properties) {
            let propertyAssignment = transformPropertyDeclaration(node, property);
            let propertyStatement = factory.createExpressionStatement(propertyAssignment, /*location*/ property);
            write(propertyStatement);
        }
    }
    
    function transformPropertyDeclarationsToExpressions(node: ClassLikeDeclaration, properties: PropertyDeclaration[], expressions: Expression[]) {
        if (!properties) {
            return;
        }

        for (let property of properties) {
            let propertyAssignment = transformPropertyDeclaration(node, property, /*location*/ property);
            expressions.push(propertyAssignment);
        }
    }
    
    function transformPropertyDeclaration(node: ClassLikeDeclaration, property: PropertyDeclaration, location?: TextRange): Expression {
        let isStatic = (property.flags & NodeFlags.Static) !== 0;
        let target = isStatic
            ? getDeclarationName(node)
            : factory.createThisKeyword();
        
        let name = transformPropertyName(property);
        let left = factory.createMemberAccessForPropertyName(target, name, /*location*/ property.name);
        let initializer = visitNode(property.initializer, transformNode);
        let assignExpr = factory.createAssignmentExpression(left, initializer);
        factory.setTextRange(assignExpr, location);
        return assignExpr;
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
            let statement = (<Block>ctor.body).statements[0];
            if (statement && statement.kind === SyntaxKind.ExpressionStatement) {
                let expr = (<ExpressionStatement>statement).expression;
                if (expr && expr.kind === SyntaxKind.CallExpression) {
                    let func = (<CallExpression>expr).expression;
                    if (func && func.kind === SyntaxKind.SuperKeyword) {
                        return <ExpressionStatement>statement;
                    }
                }
            }
        }
    }
    
    function transformMethodDeclaration(node: MethodDeclaration, write: (node: ClassElement) => void) {
        if (!node.body) {
            return;
        }
        
        let name = transformPropertyName(node);
        let parameters = visitNodes(node.parameters, transformNode);

        let body: Block;
        if (isAsyncFunctionLike(node)) {
            body = <Block>transformAsyncFunctionBody(node);
        }
        else {
            body = visitNode(node.body, transformNode);
        }
        
        write(factory.createMethodDeclaration2(
            name,
            parameters,
            body,
            /*location*/ node,
            /*flags*/ node.flags & NodeFlags.Static
        ));
    }
    
    function transformGetAccessor(node: GetAccessorDeclaration, write: (node: ClassElement) => void) {
        let name = transformPropertyName(node);
        let parameters = visitNodes(node.parameters, transformNode);
        let body = visitNode(node.body, transformNode);
        write(factory.createGetAccessor2(
            name,
            parameters,
            body,
            /*location*/ node,
            /*flags*/ node.flags & NodeFlags.Static
        ));
    }
    
    function transformSetAccessor(node: SetAccessorDeclaration, write: (node: ClassElement) => void) {
        let name = transformPropertyName(node);
        let parameters = visitNodes(node.parameters, transformNode);
        let body = visitNode(node.body, transformNode);
        write(factory.createSetAccessor2(
            name,
            parameters,
            body,
            /*location*/ node,
            /*flags*/ node.flags & NodeFlags.Static
        ));
    }
        
    function transformFunctionDeclaration(node: FunctionDeclaration, write: (node: Statement) => void) {
        if (!node.body) {
            // Function overloads are elided
            return;
        }
        
        let thisNodeIsNamespaceExport = isNamespaceLevelExport(node);
        let flags = thisNodeIsNamespaceExport
            ? undefined  
            : node.flags & (NodeFlags.Default | NodeFlags.Export);

        let funcDecl = factory.createFunctionDeclaration3(
            node.asteriskToken,
            node.name, 
            visitNodes(node.parameters, transformNode), 
            <Block>transformFunctionBody(node),
            /*location*/ node,
            flags);
            
        write(funcDecl);
        
        if (thisNodeIsNamespaceExport) {
            let namespaceExportExpr = factory.createAssignmentExpression(getModuleMemberName(node), factory.cloneNode(node.name));
            let exprStmt = factory.createExpressionStatement(namespaceExportExpr);
            write(exprStmt);
        }
    }

    function transformFunctionExpression(node: FunctionExpression, write: (node: FunctionExpression) => void) {
       write(factory.createFunctionExpression3(
            node.asteriskToken,
            node.name, 
            visitNodes(node.parameters, transformNode), 
            <Block>transformFunctionBody(node),
            /*location*/ node));
    }

    function transformArrowFunction(node: ArrowFunction, write: (node: ArrowFunction) => void) {
        write(factory.createArrowFunction(
            /*decorators*/ undefined, 
            /*modifiers*/ undefined, 
            /*typeParameters*/ undefined, 
            visitNodes(node.parameters, transformNode), 
            /*type*/ undefined, 
            node.equalsGreaterThanToken,
            transformFunctionBody(node),
            /*location*/ node));
    }
    
    function transformFunctionBody(node: FunctionLikeDeclaration): Block | Expression {
        if (isAsyncFunctionLike(node)) {
            return transformAsyncFunctionBody(node);
        }
        else {
            return visitNode(node.body, transformNode);
        }
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
            let returnStmt = factory.createReturnStatement(bodyExpr);
            generatorBody = factory.createBlock([returnStmt]);
        }
        else {
            generatorBody = visitNode(body, transformNode);
        }
        
        let callExpr = factory.createAwaiterHelperCall(hasLexicalArguments, promiseConstructor, generatorBody);
        if (isArrowFunction(node)) {
            return callExpr;
        }
        else {
            let returnStmt = factory.createReturnStatement(callExpr);
            let newBody = factory.createBlock([returnStmt], /*location*/ body);
            return newBody;
        }
    }
    
    function transformParameter(node: ParameterDeclaration, write: (node: ParameterDeclaration) => void) {
        write(factory.createParameter2(
            visitNode(node.name, transformNode),
            visitNode(node.initializer, transformNode),
            /*location*/ node,
            /*flags*/ node.flags & ~NodeFlags.AccessibilityModifier
        ));
    }
    
    function transformVariableStatement(node: VariableStatement, write: (node: Statement) => void) {
        // TODO(rbuckton): transform namespace exports for a variable declaration list
        Debug.assert(isNamespaceLevelExport(node), "Should only reach here for exported variables.");
        pipeNode(node.declarationList, write, transformVariableDeclarationList);
    }
    
    function transformVariableDeclarationList(node: VariableDeclarationList, write: (node: Statement) => void) {
        let expressions = visitNodes<VariableDeclaration, Expression>(node.declarations, transformVariableDeclaration, /*newLexicalEnvironment*/ false, /*returnUndefinedIfEmpty*/ true);
        if (expressions) {
            let exprStmt = factory.createExpressionStatement(factory.inlineExpressions(expressions));
            write(exprStmt);
        }
    }
    
    function transformVariableDeclaration(node: VariableDeclaration, write: (node: Expression) => void) {
        if (isBindingPattern(node.name)) {
            Debug.fail("Transform not yet supported.");
        }
        else {
            let name = getModuleMemberName(node);
            let initializer = visitNode(node.initializer, transformNode);
            let assignExpr = factory.createAssignmentExpression(name, initializer);
            write(assignExpr);
        }
    }

    function transformModuleDeclaration(node: ModuleDeclaration, write: (node: Statement) => void) {
        if (!shouldEmitModuleDeclaration(node)) {
            return;
        }
        
        let location = node;
        if (!isModuleMergedWithClass(node)) {
            let exportFlags = isTopLevelExport(node) ? NodeFlags.Export : undefined;
            let varDecl = factory.createVariableDeclaration2(<Identifier>node.name);
            let varDecls = factory.createVariableDeclarationList([varDecl]);
            let varStmt = factory.createVariableStatement2(varDecls, location, exportFlags);
            write(varStmt);
            location = undefined;
        }
        
        let localName = getGeneratedNameForNode(node);
        let localParam = factory.createParameter2(localName);
        
        let body = node.body;
        let moduleBody: Block;
        if (isModuleBlock(body)) {
            moduleBody = factory.createBlock(visitNodes(body.statements, transformModuleElement));
        }
        else {
            let inner = visitStatement(body, transformNode);
            moduleBody = isBlock(inner) ? inner : factory.createBlock([inner]);
        }
        
        let funcExpr = factory.createFunctionExpression2(/*name*/ undefined, [localParam], moduleBody);
        let parenExpr = factory.createParenthesizedExpression(funcExpr);
        let moduleMemberName = getModuleMemberName(node);
        let moduleStorageObjExpr = factory.createObjectLiteralExpression2();
        let moduleStorageInitExpr = factory.createAssignmentExpression(moduleMemberName, moduleStorageObjExpr);
        let moduleStorageExpr = factory.createLogicalOrExpression(moduleMemberName, moduleStorageInitExpr);
        let moduleParam: Expression = moduleStorageExpr;
        if (isNamespaceLevelExport(node)) {
            moduleParam = factory.createAssignmentExpression(factory.cloneNode(node.name), moduleStorageExpr);
        }
        
        let callExpr = factory.createCallExpression2(parenExpr, [moduleParam]);
        let callStmt = factory.createExpressionStatement(callExpr, location, NodeFlags.GeneratedNamespace);
        callStmt.original = node;
        write(callStmt);
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
            return factory.createStringLiteral(name.text);
        }
        else if (isComputedPropertyName(name)) {
            return getGeneratedNameForNode(name);
        }
        else {
            return factory.cloneNode(name);
        }
    }
    
    function transformPropertyName(container: Declaration): PropertyName {
        let name = <PropertyName>container.name;
        if (isComputedPropertyName(name)) {
            let expression = visitNode(name.expression, transformNode);
            if (nodeCanBeDecorated(container) && nodeIsDecorated(container)) {
                let generatedName = getGeneratedNameForNode(name);
                hoistVariableDeclaration(generatedName);
                expression = factory.createAssignmentExpression(generatedName, expression);
            }
            
            return factory.updateComputedPropertyName(name, expression);
        }
        else if (isPropertyName(name)) {
            return factory.cloneNode(name);
        }
        
        Debug.fail("Binding patterns cannot be used as property names.");
    }
    
    function transformEnumDeclaration(node: EnumDeclaration, write: (node: Statement) => void) {
        // Const enum declarations may be elided
        if (!shouldEmitEnumDeclaration(node)) {
            return;
        }
        
        let location: TextRange = node;
        if (!isNamespaceLevelExport(node)) {
            let exportFlags = isTopLevelExport(node) ? NodeFlags.Export : undefined;
            let varDecl = factory.createVariableDeclaration2(node.name, /*initializer*/ undefined, /*location*/ undefined, exportFlags);
            let varDecls = factory.createVariableDeclarationList([varDecl]);
            let varStmt = factory.createVariableStatement2(varDecls, location);
            write(varStmt);
            location = undefined;
        }
        
        let localName = getGeneratedNameForNode(node);
        let enumBody = factory.createBlock([]);
        transformEnumMembers(node, localName, enumBody.statements);
        
        let localNameParam = factory.createParameter2(localName);
        let enumDecl = factory.createFunctionExpression2(/*name*/ undefined, [localNameParam], enumBody);
        let parenExpr = factory.createParenthesizedExpression(enumDecl);
        let moduleMemberName = getModuleMemberName(node);
        let enumStorageObjectExpr = factory.createObjectLiteralExpression2();
        let enumStorageInitExpr = factory.createAssignmentExpression(moduleMemberName, enumStorageObjectExpr);
        let enumStorageExpr = factory.createLogicalOrExpression(moduleMemberName, enumStorageInitExpr);
        let callExpr = factory.createCallExpression2(parenExpr, [enumStorageExpr]);
        let callStmt = factory.createExpressionStatement(callExpr, location);
        write(callStmt);
        
        if (isNamespaceLevelExport(node)) {
            let varDecl = factory.createVariableDeclaration2(node.name, moduleMemberName);
            let varDecls = factory.createVariableDeclarationList([varDecl]);
            let varStmt = factory.createVariableStatement2(varDecls);
            write(varStmt);
        }
    }
    
    function transformEnumMembers(node: EnumDeclaration, localName: Identifier, statements: Statement[]) {
        for (let member of node.members) {
            transformEnumMember(member, localName, statements);
        }
    }
    
    function transformEnumMember(node: EnumMember, localName: Identifier, statements: Statement[]) {
        let enumNameExpr = getExpressionForPropertyName(node);
        let enumValueExpr = getEnumMemberDeclarationValue(node);
        let enumNameElemExpr = factory.createElementAccessExpression2(localName, enumNameExpr);
        let enumValueAssignExpr = factory.createAssignmentExpression(enumNameElemExpr, enumValueExpr);
        let enumValueElemExpr = factory.createElementAccessExpression2(localName, enumValueAssignExpr);
        let enumNameAssignExpr = factory.createAssignmentExpression(enumValueElemExpr, enumNameExpr);
        let enumMemberStmt = factory.createExpressionStatement(enumNameAssignExpr, /*location*/ node);
        statements.push(enumMemberStmt);
    }
    
    function getEnumMemberDeclarationValue(member: EnumMember): Expression {
        let value = resolver.getConstantValue(member);
        if (value !== undefined) {
            return factory.createNumericLiteral2(value);
        }
        else if (member.initializer) {
            return visitNode(member.initializer, transformNode);
        }
        else {
            // NOTE(rbuckton): Should this be `void 0`?
            return factory.createIdentifier("undefined");
        }
    }
    
    function shouldEmitEnumDeclaration(node: EnumDeclaration) {
        let isConstEnum = isConst(node);
        return !isConstEnum || compilerOptions.preserveConstEnums || compilerOptions.isolatedModules;
    }
    
    function transformAwaitExpression(node: AwaitExpression, write: (node: Expression) => void) {
        let expression = visitNode(node.expression, transformNode);
        let yieldExpr = factory.createYieldExpression(/*asteriskToken*/ undefined, expression, /*location*/ node);
        if (needsParenthesisForAwaitExpressionAsYield(node)) {
            let parenExpr = factory.createParenthesizedExpression(yieldExpr);
            write(parenExpr);
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
        if (decorators) {
            for (let decorator of decorators) {
                decoratorExpressions.push(visitNode(decorator.expression, transformNode))
            }
        }
        
        if (constructor) {
            appendDecoratorsOfParameters(constructor.parameters, decoratorExpressions);
        }
        
        if (compilerOptions.emitDecoratorMetadata) {
            appendSerializedTypeMetadata(node, decoratorExpressions);
        }
        
        let name = getDeclarationName(node);
        let callExpr = factory.createDecorateHelperCall(decoratorExpressions, name);
        let statement = factory.createExpressionStatement(callExpr);
        write(statement);
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
        if (decorators) {
            for (let decorator of decorators) {
                decoratorExpressions.push(visitNode(decorator.expression, transformNode))
            }
        }
        
        if (parameters) {
            appendDecoratorsOfParameters(parameters, decoratorExpressions);
        }
        
        if (compilerOptions.emitDecoratorMetadata) {
            appendSerializedTypeMetadata(node, decoratorExpressions);
        }
        
        let prefix = getClassMemberPrefix(node, member);
        let memberName = getExpressionForPropertyName(member);
        if (isPropertyDeclaration(member)) {
            let decorateExpr = factory.createDecorateHelperCall(decoratorExpressions, prefix, memberName);
            let statement = factory.createExpressionStatement(decorateExpr);
            write(statement);
        }
        else {
            let descriptorExpr = factory.createGetOwnPropertyDescriptorCall(prefix, memberName);
            let decorateExpr = factory.createDecorateHelperCall(decoratorExpressions, prefix, memberName, descriptorExpr);
            let definePropertyExpr = factory.createDefinePropertyCall(prefix, memberName, decorateExpr);
            let statement = factory.createExpressionStatement(definePropertyExpr);
            write(statement);
        }
    }
    
    function appendDecoratorsOfParameters(parameters: ParameterDeclaration[], expressions: Expression[]) {
        for (let parameterIndex = 0; parameterIndex < parameters.length; parameterIndex++) {
            let parameter = parameters[parameterIndex];
            if (nodeIsDecorated(parameter)) {
                for (let decorator of parameter.decorators) {
                    let decoratorExpr = visitNode(decorator.expression, transformNode);
                    let paramExpr = factory.createParamHelperCall(parameterIndex, decoratorExpr);
                    expressions.push(paramExpr);
                }
            }
        }
    }
    
    function appendSerializedTypeMetadata(node: Declaration, expressions: Expression[]) {
        if (shouldAppendTypeMetadata(node)) {
            let typeExpr = serializeTypeOfNode(node);
            let metadataExpr = factory.createMetadataHelperCall("design:type", typeExpr);
            expressions.push(metadataExpr);
        }
        if (shouldAppendParamTypesMetadata(node)) {
            let paramTypesExpr = serializeParameterTypesOfNode(node);
            let metadataExpr = factory.createMetadataHelperCall("design:paramtypes", paramTypesExpr);
            expressions.push(metadataExpr);
        }
        if (shouldAppendReturnTypeMetadata(node)) {
            let returnTypeExpr = serializeReturnTypeOfNode(node);
            let metadataExpr = factory.createMetadataHelperCall("design:returntype", returnTypeExpr);
            expressions.push(metadataExpr);
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
            return factory.createIdentifier("Function");
        }
        else {
            return factory.createVoidZeroExpression();
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
        
        return factory.createArrayLiteralExpression(parameterTypeExpressions);
    }
    
    function serializeReturnTypeOfNode(node: Node): Expression {
        if (isFunctionLike(node)) {
            return serializeTypeNode(node.type);
        }
        
        return undefined;
    }
    
    function serializeTypeNode(node: TypeNode): Expression {
        if (node === undefined) {
            return factory.createIdentifier("Object");
        }
        
        switch (node.kind) {
            case SyntaxKind.VoidKeyword:
                return factory.createVoidZeroExpression(); 

            case SyntaxKind.ParenthesizedType:
                return serializeTypeNode((<ParenthesizedTypeNode>node).type);
                
            case SyntaxKind.FunctionType:
            case SyntaxKind.ConstructorType:
                return factory.createIdentifier("Function");
                
            case SyntaxKind.ArrayType:
            case SyntaxKind.TupleType:
                return factory.createIdentifier("Array");
                
            case SyntaxKind.TypePredicate:
            case SyntaxKind.BooleanKeyword:
                return factory.createIdentifier("Boolean")

            case SyntaxKind.StringKeyword:
            case SyntaxKind.StringLiteral:
                return factory.createIdentifier("String"); 
                
            case SyntaxKind.NumberKeyword:
                return factory.createIdentifier("Number");
                
            case SyntaxKind.SymbolKeyword:
                return languageVersion < ScriptTarget.ES6
                    ? getGlobalSymbolNameWithFallback()
                    : factory.createIdentifier("Symbol");

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
        
        return factory.createIdentifier("Object");
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
                let globalObjectName = factory.createIdentifier("Object");
                let typeExpr = serializeEntityNameAsExpression(typeName, /*useFallback*/ true);
                let cacheExpr = factory.createAssignmentExpression(tempVar, typeExpr);
                let typeOfExpr = factory.createTypeOfExpression(factory.createParenthesizedExpression(cacheExpr));
                let functionLiteral = factory.createStringLiteral("function");
                let equalityExpr = factory.createStrictEqualityExpression(typeOfExpr, functionLiteral);
                let logicalAndExpr = factory.createLogicalAndExpression(equalityExpr, tempVar);
                let logicalOrExpr = factory.createLogicalOrExpression(logicalAndExpr, globalObjectName);
                return logicalOrExpr;

            case TypeReferenceSerializationKind.TypeWithConstructSignatureAndValue:
                return serializeEntityNameAsExpression(typeName, /*useFallback*/ false);
                
            case TypeReferenceSerializationKind.VoidType:
                return factory.createVoidZeroExpression();
                
            case TypeReferenceSerializationKind.BooleanType:
                return factory.createIdentifier("Boolean");
                
            case TypeReferenceSerializationKind.NumberLikeType:
                return factory.createIdentifier("Number");
                
            case TypeReferenceSerializationKind.StringLikeType:
                return factory.createIdentifier("String");
                
            case TypeReferenceSerializationKind.ArrayLikeType:
                return factory.createIdentifier("Array");
                
            case TypeReferenceSerializationKind.ESSymbolType:
                return languageVersion < ScriptTarget.ES6
                    ? getGlobalSymbolNameWithFallback()
                    : factory.createIdentifier("Symbol");
                
            case TypeReferenceSerializationKind.TypeWithCallSignature:
                return factory.createIdentifier("Function");
                
            case TypeReferenceSerializationKind.ObjectType:
            default:
                break;
        }
        
        return factory.createIdentifier("Object");
    }

    function serializeEntityNameAsExpression(node: EntityName, useFallback: boolean): Expression {
        switch (node.kind) {
            case SyntaxKind.Identifier:
                let name = factory.cloneNode(<Identifier>node);
                if (useFallback) {
                    let undefinedLiteral = factory.createStringLiteral("undefined");
                    let typeOfExpr = factory.createTypeOfExpression(name);
                    let equalityExpr = factory.createStrictInequalityExpression(typeOfExpr, undefinedLiteral);
                    let logicalAndExpr = factory.createLogicalAndExpression(equalityExpr, name);
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
            let cacheExpr = factory.createAssignmentExpression(tempVar, pathExpr);
            left = factory.createLogicalAndExpression(cacheExpr, tempVar);
        }
        else {
            left = serializeEntityNameAsExpression(node.left, /*useFallback*/ false);
        }
        
        // we clone the node here to create a copy of the node with no position information 
        let right = factory.cloneNode(node.right);
        let propExpr = factory.createPropertyAccessExpression2(left, right);
        return propExpr;
    }
    
    function getGlobalSymbolNameWithFallback(): Expression {
        let globalSymbolName = factory.createIdentifier("Symbol");
        let globalObjectName = factory.createIdentifier("Object");
        let typeOfExpr = factory.createTypeOfExpression(globalSymbolName);
        let functionLiteral = factory.createStringLiteral("function");
        let equalityExpr = factory.createStrictEqualityExpression(typeOfExpr, functionLiteral);
        let conditionalExpr = factory.createConditionalExpression2(equalityExpr, globalSymbolName, globalObjectName);
        return conditionalExpr;
    }
}