/// <reference path="../transform.generated.ts" />
/*@internal*/
namespace ts.transform {
    export function toES6(context: VisitorContext, statements: NodeArray<Statement>) {
        return transform.visitNodes(context, statements, transformNode);
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
    function transformNode<T extends Node>(context: VisitorContext, node: T, write: (node: T) => void): void {
        if (needsTransform(node, TransformFlags.ThisNodeNeedsTransformToES6)) {
            transformNodeWorker(context, node, write);
        }
        else if (needsTransform(node, TransformFlags.SubtreeNeedsTransformToES6)) {
            accept(context, node, transformNode, write);
        }
        else {
            write(node);
        }
    }
    
    function transformModuleElement(context: VisitorContext, node: Node, write: (node: Node) => void): void {
        if (node.flags & NodeFlags.Export) {
            transformNodeWorker(context, node, write);
        }
        else {
            transformNode(context, node, write);
        }
    }
    
    /**
      * Transforms a node from TypeScript to ES6.
      * @param context Context information for the transform.
      * @param node The node to transform.
      */
    function transformNodeWorker(context: VisitorContext, node: Node, write?: (node: Node) => void): void {
        // TypeScript ambient declarations are elided.
        if (node.flags & NodeFlags.Ambient) {
            return undefined;
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
                return transformClassDeclaration(context, <ClassDeclaration>node, write);

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
                return transformClassExpression(context, <ClassExpression>node, write);
            
            case SyntaxKind.HeritageClause:
                // This is a heritage clause with TypeScript syntax extensions.
                //
                // TypeScript heritage clause extensions include:
                // - `implements` clause
                return transformHeritageClause(context, <HeritageClause>node, write);
                
            case SyntaxKind.ExpressionWithTypeArguments:
                // TypeScript supports type arguments on an expression in an `extends` heritage clause.
                return transformExpressionWithTypeArguments(context, <ExpressionWithTypeArguments>node, write);
            
            case SyntaxKind.MethodDeclaration:
                // TypeScript method declarations may be 'async', and may have decorators, modifiers
                // or type annotations.
                return transformMethodDeclaration(context, <MethodDeclaration>node, write);
                
            case SyntaxKind.GetAccessor:
                // Get Accessors can have TypeScript modifiers, decorators, and type annotations.
                return transformGetAccessor(context, <GetAccessorDeclaration>node, write);
                
            case SyntaxKind.SetAccessor:
                // Set Accessors can have TypeScript modifiers, decorators, and type annotations.
                return transformSetAccessor(context, <SetAccessorDeclaration>node, write);
                
            case SyntaxKind.FunctionDeclaration:
                // TypeScript function declarations may be 'async'
                return transformFunctionDeclaration(context, <FunctionDeclaration>node, write);
                
            case SyntaxKind.FunctionExpression:
                // TypeScript function expressions may be 'async'
                return transformFunctionExpression(context, <FunctionExpression>node, write);
                
            case SyntaxKind.ArrowFunction:
                // TypeScript arrow functions may be 'async'
                return transformArrowFunction(context, <ArrowFunction>node, write);
                
            case SyntaxKind.Parameter:
                // This is a parameter declaration with TypeScript syntax extensions.
                //
                // TypeScript parameter declaration syntax extensions include:
                // - decorators
                // - accessibility modifiers
                // - the question mark (?) token for optional parameters
                // - type annotations
                return transformParameter(context, <ParameterDeclaration>node, write);
                
            case SyntaxKind.TypeAssertionExpression:
                // TypeScript type assertions are removed, but their subtrees are preserved.
                return write((<TypeAssertion>node).expression);
                
            case SyntaxKind.AsExpression:
                // TypeScript `as` expressions are removed, but their subtrees are preserved.
                return write((<AsExpression>node).expression);
                
            case SyntaxKind.EnumDeclaration:
                // TypeScript enum declarations do not exist in ES6 and must be rewritten.
                return transformEnumDeclaration(context, <EnumDeclaration>node, write);
                
            case SyntaxKind.AwaitExpression:
                // TypeScript 'await' expressions must be transformed.
                return transformAwaitExpression(context, <AwaitExpression>node, write);
                
            // case SyntaxKind.VariableStatement:
            //     // TypeScript namespace exports for variable statements must be transformed.
            //     return transformVariableStatement(context, <VariableStatement>node, write);
                
            case SyntaxKind.ModuleDeclaration:
                // TypeScript namespace declarations must be transformed.
                return transformModuleDeclaration(context, <ModuleDeclaration>node, write);
                
            case SyntaxKind.ImportEqualsDeclaration:
            case SyntaxKind.ExportAssignment:
                // TODO(rbuckton): TypeScript extensions we're not yet transforming.
                
            default:
                // Fall back to the default visit behavior as some part of this node's 
                // subtree requires a transformation.
                return accept(context, node, transformNode, write);
        }
    }
        
    /**
      * Transforms a TypeScript class declaration with syntax extensions into compatible ES6.
      * @param context Context information for the transform.
      * @param node The node to transform.
      */
    function transformClassDeclaration(context: VisitorContext, node: ClassDeclaration, write: (node: Statement) => void) {
        let thisNodeIsNamespaceExport = isNamespaceLevelExport(context, node);
        let name = <Identifier>context.getDeclarationName(node);
        let heritageClauses = visitNodes(context, node.heritageClauses, transformNode);
        let extendsClause = heritageClauses && firstOrUndefined(heritageClauses);
        let baseTypeNode = extendsClause && firstOrUndefined(extendsClause.types);
        let constructor = transformConstructor(context, node, baseTypeNode);
        let members = visitNodes(context, node.members, transformNode);
        let classMembers: ClassElement[] = constructor ? [constructor, ...members] : members;

        if (nodeIsDecorated(node)) {
            let classExpr = factory.createClassExpression2(/*name*/ undefined, extendsClause, classMembers);
            let varDecl = factory.createVariableDeclaration2(name, classExpr);
            let varDeclList = factory.createVariableDeclarationList([varDecl], /*location*/ undefined, NodeFlags.Let);
            let exportFlags = isTopLevelNonDefaultExport(context, node) ? NodeFlags.Export : undefined; 
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
        
        transformPropertyDeclarationsToStatements(context, node, getInitializedProperties(node, /*isStatic*/ true), write);
        transformDecoratorsOfMembers(context, node, /*isStatic*/ false, write);
        transformDecoratorsOfMembers(context, node, /*isStatic*/ true, write);
        transformDecoratorsOfConstructor(context, node, write);
        
        if (thisNodeIsNamespaceExport) {
            let namespaceExportExpr = factory.createAssignmentExpression(getModuleMemberName(context, node), name);
            let exprStmt = factory.createExpressionStatement(namespaceExportExpr);
            write(exprStmt);
        }
        else if (isTopLevelDefaultExport(context, node) && nodeIsDecorated(node)) {
            let exportDefaultStmt = factory.createExportAssignment(/*decorators*/ undefined, /*modifiers*/ undefined, name);
            write(exportDefaultStmt);
        }
        
        // let exportPart = thisNodeIsTopLevelExport && (!thisNodeIsDecorated || !thisNodeIsDefaultExport) && tag_part`export`;
        // let defaultPart = thisNodeIsTopLevelExport && thisNodeIsDefaultExport && tag_part`default`; 
        // let extendsPart = baseTypeNode && tag_part`extends ${baseTypeNode}`;
        // let namespaceExportPart = !thisNodeIsTopLevelExport && (node.flags & NodeFlags.Export) && tag_part`${getModuleMemberName(context, node)} = ${name}`;
        // let exportDefaultPart = thisNodeIsTopLevelExport && (node.flags & NodeFlags.Default) && thisNodeIsDecorated && tag_part`export default ${name}`;
        // let statements = tag_statements`
        //     ${thisNodeIsDecorated 
        //         ? tag_part`${exportPart} let ${name} = class` 
        //         : tag_part`${exportPart} ${defaultPart} class ${name}`
        //     } ${extendsPart} {
        //         ${constructor}
        //         ${members}
        //     }
        //     ${transformPropertyDeclarationsToStatements(context, node, getInitializedProperties(node, /*isStatic*/ true)}
        //     ${transformDecoratorsOfMembers(context, node, /*isStatic*/ false)}
        //     ${transformDecoratorsOfMembers(context, node, /*isStatic*/ true)}
        //     ${transformDecoratorsOfConstructor(context, node)}
        //     ${namespaceExportPart}
        //     ${exportDefaultPart}
        // `;
        // statements[0].original = node;
    }
    
    function transformClassExpression(context: VisitorContext, node: ClassExpression, write: (node: LeftHandSideExpression) => void) {
        let name = context.getDeclarationName(node);
        let heritageClauses = visitNodes(context, node.heritageClauses, transformNode);
        let extendsClause = heritageClauses ? firstOrUndefined(heritageClauses) : undefined;
        let baseTypeNode = extendsClause ? firstOrUndefined(extendsClause.types) : undefined;
        let constructor = transformConstructor(context, node, baseTypeNode);
        let members = visitNodes(context, node.members, transformNodeWorker);
        let classMembers = constructor ? [constructor, ...members] : members;

        let newNode = factory.createClassExpression2(
            name,
            extendsClause,
            classMembers
        );
        
        let staticPropertyAssignments = getInitializedProperties(node, /*isStatic*/ true);
        if (staticPropertyAssignments) {
            let expressions: Expression[] = [];
            let tempVar = context.declareLocal();
            let cacheExpr = factory.createAssignmentExpression(tempVar, newNode);
            expressions.push(cacheExpr);
            transformPropertyDeclarationsToExpressions(context, node, staticPropertyAssignments, expressions);
            expressions.push(tempVar);
            write(factory.createParenthesizedExpression(factory.inlineExpressions(expressions)));
            // return tag_lhs_expression`
            //     ${tempVariable} = ${newNode},
            //     ${factory.inlineExpressions(expressions)},
            //     ${tempVariable}
            // `;
        }
        else {
            write(newNode);
        }
    }

    function isTopLevelExport(context: VisitorContext, node: Node) {
        return !!(node.flags & NodeFlags.Export) &&
            context.parentNode.kind === SyntaxKind.SourceFile;
    }
    
    function isTopLevelDefaultExport(context: VisitorContext, node: Node) {
        return isTopLevelExport(context, node) && !!(node.flags & NodeFlags.Default);
    }

    function isTopLevelNonDefaultExport(context: VisitorContext, node: Node) {
        return isTopLevelExport(context, node) && !(node.flags & NodeFlags.Default);
    }
    
    function isNamespaceLevelExport(context: VisitorContext, node: Node) {
        return !!(node.flags & NodeFlags.Export) &&
            context.parentNode.kind !== SyntaxKind.SourceFile;
    }
    
    function getContainingModule(context: VisitorContext): ModuleDeclaration {
        return context.findAncestorNode(isModuleDeclaration);
    }
    
    function getContainingModuleName(context: VisitorContext): Identifier {
        let container = context.findAncestorNode(isModuleDeclaration);
        return container ? context.getGeneratedNameForNode(container) : factory.createIdentifier("exports");
        // return container ? context.getGeneratedNameForNode(container) : tag_id`exports`;
    }
    
    function getModuleMemberName(context: VisitorContext, node: Declaration): Expression {
        let name = <Identifier>context.getDeclarationName(node);
        Debug.assert(isIdentifier(name));

        if (context.getCombinedNodeFlags() & NodeFlags.Export) {
            let container = getContainingModuleName(context);
            let propExpr = factory.createPropertyAccessExpression2(container, name);
            return propExpr;
            // return tag_expression`
            //     ${container}.${name}
            // `;
        }
        return name;
    }
    
    function transformConstructor(context: VisitorContext, node: ClassLikeDeclaration, baseTypeNode: ExpressionWithTypeArguments) {
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
            constructor ? visitNodes(context, constructor.parameters, transformNode) :
            baseTypeNode ? [factory.createRestParameter(factory.createIdentifier("args"), /*location*/ undefined, NodeFlags.GeneratedRest)] :
            [];
            
        // let parameters =
        //     constructor ? transformSignatureParameters(context, constructor.parameters) :
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
                    // statements.push(tag_statement`
                    //     this.${name} = ${name};
                    // `);
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
            // let statement = tag_statement`
            //     super(...args);
            // `;
            // statement.flags |= NodeFlags.GeneratedSuper;
            statements.push(callStmt);
        }
        
        transformPropertyDeclarationsToStatements(context, node, instancePropertyAssignments, n => { statements.push(n); });
        
        if (constructor) {
            let bodyStatements = superCall
                ? constructor.body.statements.slice(1)
                : constructor.body.statements;
            statements.push(...visitNodes(context, bodyStatements, transformNode));
        }
        
        let body = constructor 
            ? factory.updateBlock(constructor.body, statements) 
            : factory.createBlock(statements);
        
        let newConstructor = factory.createConstructor2(parameters, body, /*location*/ constructor);
        // factory.attachCommentRanges(newConstructor, leadingCommentRanges, trailingCommentRanges);
        return newConstructor;
    }
    
    function transformHeritageClause(context: VisitorContext, node: HeritageClause, write: (node: HeritageClause) => void) {
        if (node.token === SyntaxKind.ExtendsKeyword) {
            write(factory.updateHeritageClause(
                node,
                visitNodes(context, node.types, transformNode)
            ));
        }
    }

    function transformExpressionWithTypeArguments(context: VisitorContext, node: ExpressionWithTypeArguments, write: (node: ExpressionWithTypeArguments) => void) {
        write(factory.updateExpressionWithTypeArguments(
            node,
            visitNode(context, node.expression, transformNode),
            /*typeArguments*/ undefined
        ));
    }
    
    function transformPropertyDeclarationsToStatements(context: VisitorContext, node: ClassLikeDeclaration, properties: PropertyDeclaration[], write: (node: Statement) => void) {
        if (!properties) {
            return;
        }
        
        for (let property of properties) {
            let propertyAssignment = transformPropertyDeclaration(context, node, property);
            let propertyStatement = factory.createExpressionStatement(propertyAssignment, /*location*/ property);
            write(propertyStatement);
        }
    }
    
    function transformPropertyDeclarationsToExpressions(context: VisitorContext, node: ClassLikeDeclaration, properties: PropertyDeclaration[], expressions: Expression[]) {
        if (!properties) {
            return;
        }

        for (let property of properties) {
            let propertyAssignment = transformPropertyDeclaration(context, node, property, /*location*/ property);
            expressions.push(propertyAssignment);
        }
    }
    
    function transformPropertyDeclaration(context: VisitorContext, node: ClassLikeDeclaration, property: PropertyDeclaration, location?: TextRange): Expression {
        let isStatic = (property.flags & NodeFlags.Static) !== 0;
        let target = isStatic
            ? <Identifier>context.getDeclarationName(node)
            : factory.createThisKeyword();
        
        let name = transformPropertyName(context, property);
        let left = factory.createMemberAccessForPropertyName(target, name, /*location*/ property.name);
        let initializer = visitNode(context, property.initializer, transformNode);
        let assignExpr = factory.createAssignmentExpression(left, initializer);
        factory.setTextRange(assignExpr, location);
        return assignExpr;
        // return tag_expression`
        //     ${left} = ${initializer}
        // `;
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
    
    function transformMethodDeclaration(context: VisitorContext, node: MethodDeclaration, write: (node: ClassElement) => void) {
        if (!node.body) {
            // let missing = factory.createNode<MethodDeclaration>(SyntaxKind.MissingDeclaration, /*location*/ node);
            // missing.original = node;
            // return missing;
            return;
        }
        
        let name = transformPropertyName(context, node);
        let parameters = visitNodes(context, node.parameters, transformNode);

        let body: Block;
        if (isAsyncFunctionLike(node)) {
            body = <Block>transformAsyncFunctionBody(context, node);
        }
        else {
            body = visitNode(context, node.body, transformNode);
        }
        
        write(factory.createMethodDeclaration2(
            name,
            parameters,
            body,
            /*location*/ node,
            /*flags*/ node.flags & NodeFlags.Static
        ));
    }
    
    function transformGetAccessor(context: VisitorContext, node: GetAccessorDeclaration, write: (node: ClassElement) => void) {
        let name = transformPropertyName(context, node);
        let parameters = visitNodes(context, node.parameters, transformNode);
        let body = visitNode(context, node.body, transformNode);
        write(factory.createGetAccessor2(
            name,
            parameters,
            body,
            /*location*/ node,
            /*flags*/ node.flags & NodeFlags.Static
        ));
    }
    
    function transformSetAccessor(context: VisitorContext, node: SetAccessorDeclaration, write: (node: ClassElement) => void) {
        let name = transformPropertyName(context, node);
        let parameters = visitNodes(context, node.parameters, transformNode);
        let body = visitNode(context, node.body, transformNode);
        write(factory.createSetAccessor2(
            name,
            parameters,
            body,
            /*location*/ node,
            /*flags*/ node.flags & NodeFlags.Static
        ));
    }
        
    function transformFunctionDeclaration(context: VisitorContext, node: FunctionDeclaration, write: (node: Statement) => void) {
        if (!node.body) {
            // Function overloads are elided
            return;
        }
        
        let thisNodeIsNamespaceExport = isNamespaceLevelExport(context, node);
        let flags = thisNodeIsNamespaceExport
            ? undefined  
            : node.flags & (NodeFlags.Default | NodeFlags.Export);

        let funcDecl = factory.createFunctionDeclaration3(
            node.asteriskToken,
            node.name, 
            visitNodes(context, node.parameters, transformNode), 
            <Block>transformFunctionBody(context, node),
            /*location*/ node,
            flags);
            
        write(funcDecl);
        
        if (thisNodeIsNamespaceExport) {
            let namespaceExportExpr = factory.createAssignmentExpression(getModuleMemberName(context, node), factory.cloneNode(node.name));
            let exprStmt = factory.createExpressionStatement(namespaceExportExpr);
            write(exprStmt);
        }
    }

    function transformFunctionExpression(context: VisitorContext, node: FunctionExpression, write: (node: FunctionExpression) => void) {
       write(factory.createFunctionExpression3(
            node.asteriskToken,
            node.name, 
            visitNodes(context, node.parameters, transformNode), 
            <Block>transformFunctionBody(context, node),
            /*location*/ node));
    }

    function transformArrowFunction(context: VisitorContext, node: ArrowFunction, write: (node: ArrowFunction) => void) {
        write(factory.createArrowFunction(
            /*decorators*/ undefined, 
            /*modifiers*/ undefined, 
            /*typeParameters*/ undefined, 
            visitNodes(context, node.parameters, transformNode), 
            /*type*/ undefined, 
            node.equalsGreaterThanToken,
            transformFunctionBody(context, node),
            /*location*/ node));
    }
    
    function transformFunctionBody(context: VisitorContext, node: FunctionLikeDeclaration): Block | Expression {
        if (isAsyncFunctionLike(node)) {
            return transformAsyncFunctionBody(context, node);
        }
        else {
            return visitNode(context, node.body, transformNode);
        }
    }
    
    function transformAsyncFunctionBody(context: VisitorContext, node: FunctionLikeDeclaration): Block | Expression {
        let promiseConstructor = getEntityNameFromTypeNode(node.type);
        let hasLexicalArguments = (context.resolver.getNodeCheckFlags(node) & NodeCheckFlags.CaptureArguments) !== 0;
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

        // If this is not an async arrow, emit the opening brace of the function body
        // and the start of the return statement.
        // if (!isArrowFunction) {
        //     write(" {");
        //     increaseIndent();
        //     writeLine();
        //     write("return");
        // }
        
        let body = node.body;
        let generatorBody: Block;
        if (!isBlock(body)) {
            let bodyExpr = visitNode(context, body, transformNode);
            let returnStmt = factory.createReturnStatement(bodyExpr);
            generatorBody = factory.createBlock([returnStmt]);
        }
        else {
            generatorBody = visitNode(context, body, transformNode);
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
    
    function transformParameter(context: VisitorContext, node: ParameterDeclaration, write: (node: ParameterDeclaration) => void) {
        write(factory.createParameter2(
            visitNode(context, node.name, transformNode),
            visitNode(context, node.initializer, transformNode),
            /*location*/ node,
            /*flags*/ node.flags & ~NodeFlags.AccessibilityModifier
        ));
    }
    
    function transformVariableStatement(context: VisitorContext, node: VariableStatement, write: (node: Statement) => void) {
        // TODO(rbuckton): transform namespace exports for a variable declaration list
        Debug.assert(isNamespaceLevelExport(context, node), "Should only reach here for exported variables.");
        
        let declList = node.declarationList;
        context.pushNode(declList);
        
        let expressions: Expression[];
        for (let varDecl of declList.declarations) {
            if (!varDecl.initializer) {
                continue;
            }
            
            context.pushNode(varDecl);
            
            if (isBindingPattern(varDecl.name)) {
                Debug.fail("Transform not yet supported.");
            }
            else {
                if (!expressions) {
                    expressions = [];
                }

                let name = getModuleMemberName(context, varDecl);
                let initializer = visitNode(context, varDecl.initializer, transformNode);
                let assignExpr = factory.createAssignmentExpression(name, initializer);
                expressions.push(assignExpr);
            }
            
            context.popNode();
        }
        
        context.popNode();
        if (expressions) {
            let exprStmt = factory.createExpressionStatement(factory.inlineExpressions(expressions));
            write(exprStmt);
        }
        
    }

    function transformModuleDeclaration(context: VisitorContext, node: ModuleDeclaration, write: (node: Statement) => void) {
        if (!shouldEmitModuleDeclaration(context, node)) {
            return;
        }
        
        let location = node;
        if (!isModuleMergedWithClass(context, node)) {
            let exportFlags = isTopLevelExport(context, node) ? NodeFlags.Export : undefined;
            let varDecl = factory.createVariableDeclaration2(<Identifier>node.name);
            let varDecls = factory.createVariableDeclarationList([varDecl]);
            let varStmt = factory.createVariableStatement2(varDecls, location, exportFlags);
            write(varStmt);
            location = undefined;
        }
        
        let localName = context.getGeneratedNameForNode(node);
        let localParam = factory.createParameter2(localName);
        
        let body = node.body;
        let moduleBody: Block;
        if (isModuleBlock(body)) {
            moduleBody = factory.createBlock(visitNodes(context, body.statements, transformModuleElement));
        }
        else {
            let inner = visitStatement(context, body, transformNode);
            moduleBody = isBlock(inner) ? inner : factory.createBlock([inner]);
        }
        
        let funcExpr = factory.createFunctionExpression2(/*name*/ undefined, [localParam], moduleBody);
        let parenExpr = factory.createParenthesizedExpression(funcExpr);
        let moduleMemberName = getModuleMemberName(context, node);
        let moduleStorageObjExpr = factory.createObjectLiteralExpression2();
        let moduleStorageInitExpr = factory.createAssignmentExpression(moduleMemberName, moduleStorageObjExpr);
        let moduleStorageExpr = factory.createLogicalOrExpression(moduleMemberName, moduleStorageInitExpr);
        let moduleParam: Expression = moduleStorageExpr;
        if (isNamespaceLevelExport(context, node)) {
            moduleParam = factory.createAssignmentExpression(factory.cloneNode(node.name), moduleStorageExpr);
        }
        
        let callExpr = factory.createCallExpression2(parenExpr, [moduleParam]);
        let callStmt = factory.createExpressionStatement(callExpr, location, NodeFlags.GeneratedNamespace);
        callStmt.original = node;
        write(callStmt);
    }

    function shouldEmitModuleDeclaration(context: VisitorContext, node: ModuleDeclaration) {
        return isInstantiatedModule(node, context.compilerOptions.preserveConstEnums || context.compilerOptions.isolatedModules);
    }

    function isModuleMergedWithClass(context: VisitorContext, node: ModuleDeclaration) {
        return !!(context.resolver.getNodeCheckFlags(node) & NodeCheckFlags.LexicalModuleMergesWithClass);
    }
    
    function getExpressionForPropertyName(context: VisitorContext, container: Declaration): Expression {
        let name = <PropertyName>container.name;
        if (isIdentifier(name)) {
            return factory.createStringLiteral(name.text);
        }
        else if (isComputedPropertyName(name)) {
            return context.getGeneratedNameForNode(name);
        }
        else {
            return factory.cloneNode(name);
        }
    }
    
    function transformPropertyName(context: VisitorContext, container: Declaration): PropertyName {
        let name = <PropertyName>container.name;
        if (isComputedPropertyName(name)) {
            let expression = visitNode(context, name.expression, transformNode);
            if (nodeCanBeDecorated(container) && nodeIsDecorated(container)) {
                let generatedName = context.getGeneratedNameForNode(name);
                context.hoistVariableDeclaration(generatedName);
                expression = factory.createAssignmentExpression(generatedName, expression);
                // expression = tag_expression`${generatedName} = ${expression}`;
            }
            
            return factory.updateComputedPropertyName(name, expression);
        }
        else if (isPropertyName(name)) {
            return factory.cloneNode(name);
        }
        
        Debug.fail("Binding patterns cannot be used as property names.");
    }
    
    function transformEnumDeclaration(context: VisitorContext, node: EnumDeclaration, write: (node: Statement) => void) {
        // Const enum declarations may be elided
        if (!shouldEmitEnumDeclaration(context, node)) {
            return;
        }
        
        let location: TextRange = node;
        if (!isNamespaceLevelExport(context, node)) {
            let exportFlags = isTopLevelExport(context, node) ? NodeFlags.Export : undefined;
            let varDecl = factory.createVariableDeclaration2(node.name, /*initializer*/ undefined, /*location*/ undefined, exportFlags);
            let varDecls = factory.createVariableDeclarationList([varDecl]);
            let varStmt = factory.createVariableStatement2(varDecls, location);
            write(varStmt);
            location = undefined;
        }
        
        let localName = context.getGeneratedNameForNode(node);
        let enumBody = factory.createBlock([]);
        transformEnumMembers(context, node, localName, enumBody.statements);
        
        let localNameParam = factory.createParameter2(localName);
        let enumDecl = factory.createFunctionExpression2(/*name*/ undefined, [localNameParam], enumBody);
        let parenExpr = factory.createParenthesizedExpression(enumDecl);
        let moduleMemberName = getModuleMemberName(context, node);
        let enumStorageObjectExpr = factory.createObjectLiteralExpression2();
        let enumStorageInitExpr = factory.createAssignmentExpression(moduleMemberName, enumStorageObjectExpr);
        let enumStorageExpr = factory.createLogicalOrExpression(moduleMemberName, enumStorageInitExpr);
        let callExpr = factory.createCallExpression2(parenExpr, [enumStorageExpr]);
        let callStmt = factory.createExpressionStatement(callExpr, location);
        write(callStmt);
        
        if (isNamespaceLevelExport(context, node)) {
            let varDecl = factory.createVariableDeclaration2(node.name, moduleMemberName);
            let varDecls = factory.createVariableDeclarationList([varDecl]);
            let varStmt = factory.createVariableStatement2(varDecls);
            write(varStmt);
        }
    }
    
    function transformEnumMembers(context: VisitorContext, node: EnumDeclaration, localName: Identifier, statements: Statement[]) {
        for (let member of node.members) {
            transformEnumMember(context, member, localName, statements);
        }
    }
    
    function transformEnumMember(context: VisitorContext, node: EnumMember, localName: Identifier, statements: Statement[]) {
        let enumNameExpr = getExpressionForPropertyName(context, node);
        let enumValueExpr = getEnumMemberDeclarationValue(context, node);
        let enumNameElemExpr = factory.createElementAccessExpression2(localName, enumNameExpr);
        let enumValueAssignExpr = factory.createAssignmentExpression(enumNameElemExpr, enumValueExpr);
        let enumValueElemExpr = factory.createElementAccessExpression2(localName, enumValueAssignExpr);
        let enumNameAssignExpr = factory.createAssignmentExpression(enumValueElemExpr, enumNameExpr);
        let enumMemberStmt = factory.createExpressionStatement(enumNameAssignExpr, /*location*/ node);
        statements.push(enumMemberStmt);
    }
    
    function getEnumMemberDeclarationValue(context: VisitorContext, member: EnumMember): Expression {
        let value = context.resolver.getConstantValue(member);
        if (value !== undefined) {
            return factory.createNumericLiteral2(value);
        }
        else if (member.initializer) {
            return visitNode(context, member.initializer, transformNode);
        }
        else {
            // NOTE(rbuckton): Should this be `void 0`?
            return factory.createIdentifier("undefined");
        }
    }
    
    function shouldEmitEnumDeclaration(context: VisitorContext, node: EnumDeclaration) {
        let isConstEnum = isConst(node);
        return !isConstEnum || context.compilerOptions.preserveConstEnums || context.compilerOptions.isolatedModules;
    }
    
    function transformAwaitExpression(context: VisitorContext, node: AwaitExpression, write: (node: Expression) => void) {
        let expression = visitNode(context, node.expression, transformNode);
        let yieldExpr = factory.createYieldExpression(/*asteriskToken*/ undefined, expression, /*location*/ node);
        if (needsParenthesisForAwaitExpressionAsYield(context, node)) {
            let parenExpr = factory.createParenthesizedExpression(yieldExpr);
            write(parenExpr);
        }
        else {
            write(yieldExpr);
        }
    }

    function needsParenthesisForAwaitExpressionAsYield(context: VisitorContext, node: AwaitExpression) {
        let parentNode = context.parentNode;
        if (isBinaryExpression(parentNode) && !isAssignmentOperator(parentNode.operatorToken.kind)) {
            return true;
        }
        else if (isConditionalExpression(parentNode) && parentNode.condition === node) {
            return true;
        }

        return false;
    }
    
    function transformDecoratorsOfMembers(context: VisitorContext, node: ClassLikeDeclaration, isStatic: boolean, statements: (node: Statement) => void) {
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
            
            transformDecoratorsOfMember(context, node, member, statements);
        }
    }
    
    function transformDecoratorsOfConstructor(context: VisitorContext, node: ClassLikeDeclaration, write: (node: Statement) => void) {
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
                decoratorExpressions.push(visitNode(context, decorator.expression, transformNode))
            }
        }
        
        if (constructor) {
            appendDecoratorsOfParameters(context, constructor.parameters, decoratorExpressions);
        }
        
        if (context.compilerOptions.emitDecoratorMetadata) {
            appendSerializedTypeMetadata(context, node, decoratorExpressions);
        }
        
        let name = context.getDeclarationName(node);
        let callExpr = factory.createDecorateHelperCall(decoratorExpressions, name);
        let statement = factory.createExpressionStatement(callExpr);
        write(statement);
        
        // statements.push(tag_statement`
        //     ${name} = __decorate([${decoratorExpressions}], ${name});
        // `);
    }
    
    function transformDecoratorsOfMember(context: VisitorContext, node: ClassLikeDeclaration, member: ClassElement, write: (node: Statement) => void) {
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
                decoratorExpressions.push(visitNode(context, decorator.expression, transformNode))
            }
        }
        
        if (parameters) {
            appendDecoratorsOfParameters(context, parameters, decoratorExpressions);
        }
        
        if (context.compilerOptions.emitDecoratorMetadata) {
            appendSerializedTypeMetadata(context, node, decoratorExpressions);
        }
        
        let prefix = context.getClassMemberPrefix(node, member);
        let memberName = getExpressionForPropertyName(context, member);
        if (isPropertyDeclaration(member)) {
            let decorateExpr = factory.createDecorateHelperCall(decoratorExpressions, prefix, memberName);
            let statement = factory.createExpressionStatement(decorateExpr);
            write(statement);
            // statements.push(tag_statement`
            //     __decorate([${decoratorExpressions}], ${prefix}, ${memberName});
            // `);
        }
        else {
            let descriptorExpr = factory.createGetOwnPropertyDescriptorCall(prefix, memberName);
            let decorateExpr = factory.createDecorateHelperCall(decoratorExpressions, prefix, memberName, descriptorExpr);
            let definePropertyExpr = factory.createDefinePropertyCall(prefix, memberName, decorateExpr);
            let statement = factory.createExpressionStatement(definePropertyExpr);
            write(statement);
            // statements.push(tag_statement`
            //     Object.defineProperty(${prefix}, ${memberName}, 
            //         __decorate([${decoratorExpressions}], ${prefix}, ${memberName},
            //             Object.getOwnPropertyDescriptor(${prefix}, ${memberName})));
            // `);
        }
    }
    
    function appendDecoratorsOfParameters(context: VisitorContext, parameters: ParameterDeclaration[], expressions: Expression[]) {
        for (let parameterIndex = 0; parameterIndex < parameters.length; parameterIndex++) {
            let parameter = parameters[parameterIndex];
            if (nodeIsDecorated(parameter)) {
                for (let decorator of parameter.decorators) {
                    let decoratorExpr = visitNode(context, decorator.expression, transformNode);
                    let paramExpr = factory.createParamHelperCall(parameterIndex, decoratorExpr);
                    expressions.push(paramExpr);
                    // expressions.push(tag_expression`
                    //     __param(${parameterIndex}, ${decoratorExpr})
                    // `);
                }
            }
        }
    }
    
    function appendSerializedTypeMetadata(context: VisitorContext, node: Declaration, expressions: Expression[]) {
        if (shouldAppendTypeMetadata(node)) {
            let typeExpr = serializeTypeOfNode(context, node);
            let metadataExpr = factory.createMetadataHelperCall("design:type", typeExpr);
            expressions.push(metadataExpr);
            // expressions.push(tag_expression`
            //     __metadata("design:type", ${serializeTypeOfNode(context, node)})
            // `);
        }
        if (shouldAppendParamTypesMetadata(node)) {
            let paramTypesExpr = serializeParameterTypesOfNode(context, node);
            let metadataExpr = factory.createMetadataHelperCall("design:paramtypes", paramTypesExpr);
            expressions.push(metadataExpr);
            // expressions.push(tag_expression`
            //     __metadata("design:paramtypes", ${serializeParameterTypesOfNode(context, node)})
            // `);
        }
        if (shouldAppendReturnTypeMetadata(node)) {
            let returnTypeExpr = serializeReturnTypeOfNode(context, node);
            let metadataExpr = factory.createMetadataHelperCall("design:returntype", returnTypeExpr);
            expressions.push(metadataExpr);
            // expressions.push(tag_expression`
            //     __metadata("design:returntype", ${serializeReturnTypeOfNode(context, node)})
            // `);
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
    
    function serializeTypeOfNode(context: VisitorContext, node: Node): Expression {
        if (isPropertyDeclaration(node) || isParameter(node) || isGetAccessor(node)) {
            return serializeTypeNode(context, node.type);
        }
        else if (isSetAccessor(node)) {
            return serializeTypeNode(context, getSetAccessorTypeAnnotationNode(node));
        }
        else if (isClassLike(node) || isFunctionLike(node)) {
            return factory.createIdentifier("Function");
            // return tag_id`Function`;
        }
        else {
            return factory.createVoidZeroExpression();
            // return tag_expression`void 0`;
        }
    }
    
    function serializeParameterTypesOfNode(context: VisitorContext, node: Node): Expression {
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
                    parameterTypeExpressions.push(serializeTypeNode(context, elementType));
                }
                else {
                    parameterTypeExpressions.push(serializeTypeOfNode(context, parameter));
                }
            }
        }
        
        return factory.createArrayLiteralExpression(parameterTypeExpressions);
    }
    
    function serializeReturnTypeOfNode(context: VisitorContext, node: Node): Expression {
        if (isFunctionLike(node)) {
            return serializeTypeNode(context, node.type);
        }
        
        return undefined;
    }
    
    function serializeTypeNode(context: VisitorContext, node: TypeNode): Expression {
        if (node === undefined) {
            return factory.createIdentifier("Object");
            // return tag_id`Object`;
        }
        
        switch (node.kind) {
            case SyntaxKind.VoidKeyword:
                return factory.createVoidZeroExpression(); 
                // return tag_expression`void 0`;

            case SyntaxKind.ParenthesizedType:
                return serializeTypeNode(context, (<ParenthesizedTypeNode>node).type);
                
            case SyntaxKind.FunctionType:
            case SyntaxKind.ConstructorType:
                return factory.createIdentifier("Function");
                // return tag_id`Function`;
                
            case SyntaxKind.ArrayType:
            case SyntaxKind.TupleType:
                return factory.createIdentifier("Array");
                // return tag_id`Array`;
                
            case SyntaxKind.TypePredicate:
            case SyntaxKind.BooleanKeyword:
                return factory.createIdentifier("Boolean")
                // return tag_id`Boolean`;

            case SyntaxKind.StringKeyword:
            case SyntaxKind.StringLiteral:
                return factory.createIdentifier("String"); 
                // return tag_id`String`;
                
            case SyntaxKind.NumberKeyword:
                return factory.createIdentifier("Number");
                // return tag_id`Number`;
                
            case SyntaxKind.SymbolKeyword:
                return context.languageVersion < ScriptTarget.ES6
                    ? getGlobalSymbolNameWithFallback()
                    : factory.createIdentifier("Symbol");
                // return tag_id`Symbol`;

            case SyntaxKind.TypeReference:
                return serializeTypeReferenceNode(context, <TypeReferenceNode>node);
                
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
        // return tag_id`Object`;
    }

    /** Serializes a TypeReferenceNode to an appropriate JS constructor value. Used by the __metadata decorator. */
    function serializeTypeReferenceNode(context: VisitorContext, node: TypeReferenceNode) {
        let typeName = node.typeName;
        let result = context.resolver.getTypeReferenceSerializationKind(node);
        switch (result) {
            case TypeReferenceSerializationKind.Unknown:
                let tempVar = context.declareLocal();
                let globalObjectName = factory.createIdentifier("Object");
                let typeExpr = serializeEntityNameAsExpression(context, typeName, /*useFallback*/ true);
                let cacheExpr = factory.createAssignmentExpression(tempVar, typeExpr);
                let typeOfExpr = factory.createTypeOfExpression(factory.createParenthesizedExpression(cacheExpr));
                let functionLiteral = factory.createStringLiteral("function");
                let equalityExpr = factory.createStrictEqualityExpression(typeOfExpr, functionLiteral);
                let logicalAndExpr = factory.createLogicalAndExpression(equalityExpr, tempVar);
                let logicalOrExpr = factory.createLogicalOrExpression(logicalAndExpr, globalObjectName);
                return logicalOrExpr;
                // return tag_expression`
                //     typeof (${tempVar} = ${typeExpr}) === "function" && ${tempVar} || Object
                // `;

            case TypeReferenceSerializationKind.TypeWithConstructSignatureAndValue:
                return serializeEntityNameAsExpression(context, typeName, /*useFallback*/ false);
                
            case TypeReferenceSerializationKind.VoidType:
                return factory.createVoidZeroExpression();
                // return tag_expression`void 0`;
                
            case TypeReferenceSerializationKind.BooleanType:
                return factory.createIdentifier("Boolean");
                // return tag_id`Boolean`;
                
            case TypeReferenceSerializationKind.NumberLikeType:
                return factory.createIdentifier("Number");
                // return tag_id`Number`;
                
            case TypeReferenceSerializationKind.StringLikeType:
                return factory.createIdentifier("String");
                // return tag_id`String`;
                
            case TypeReferenceSerializationKind.ArrayLikeType:
                return factory.createIdentifier("Array");
                // return tag_id`Array`;
                
            case TypeReferenceSerializationKind.ESSymbolType:
                return context.languageVersion < ScriptTarget.ES6
                    ? getGlobalSymbolNameWithFallback()
                    : factory.createIdentifier("Symbol");
                
            case TypeReferenceSerializationKind.TypeWithCallSignature:
                return factory.createIdentifier("Function");
                
            case TypeReferenceSerializationKind.ObjectType:
            default:
                break;
        }
        
        return factory.createIdentifier("Object");
        // return tag_id`Object`;
    }

    function serializeEntityNameAsExpression(context: VisitorContext, node: EntityName, useFallback: boolean): Expression {
        switch (node.kind) {
            case SyntaxKind.Identifier:
                let name = factory.cloneNode(<Identifier>node);
                if (useFallback) {
                    let undefinedLiteral = factory.createStringLiteral("undefined");
                    let typeOfExpr = factory.createTypeOfExpression(name);
                    let equalityExpr = factory.createStrictInequalityExpression(typeOfExpr, undefinedLiteral);
                    let logicalAndExpr = factory.createLogicalAndExpression(equalityExpr, name);
                    return logicalAndExpr;
                    // return tag_expression`
                    //     typeof ${name} !== "undefined" && ${name}
                    // `;
                }
                
                return name;
                
            case SyntaxKind.QualifiedName:
                return serializeQualifiedNameAsExpression(context, <QualifiedName>node, useFallback);
        }
    }

    function serializeQualifiedNameAsExpression(context: VisitorContext, node: QualifiedName, useFallback: boolean): Expression {
        let left: Expression
        if (node.left.kind === SyntaxKind.Identifier) {
            left = serializeEntityNameAsExpression(context, node.left, useFallback);
        }
        else if (useFallback) {
            let tempVar = context.declareLocal();
            let pathExpr = serializeEntityNameAsExpression(context, node.left, /*useFallback*/ true);
            let cacheExpr = factory.createAssignmentExpression(tempVar, pathExpr);
            left = factory.createLogicalAndExpression(cacheExpr, tempVar);
            // left = tag_expression`
            //     (${tempVar} = ${pathExpr}) && ${tempVar}
            // `;
        }
        else {
            left = serializeEntityNameAsExpression(context, node.left, /*useFallback*/ false);
        }
        
        // we clone the node here to create a copy of the node with no position information 
        let right = factory.cloneNode(node.right);
        let propExpr = factory.createPropertyAccessExpression2(left, right);
        return propExpr;
        // return tag_expression`
        //     ${factory.parenthesizeForAccess(left)}.${factory.cloneNode(node.right)}
        // `;
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