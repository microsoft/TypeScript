/// <reference path="../transform.generated.ts" />
namespace ts.transform {
    export function toES6(context: VisitorContext, statements: NodeArray<Statement>) {
        return transform.visitNodeArrayOfStatement(context, statements, transformNode);
    }
    
    function transformNode(context: VisitorContext, node: Node): Node {
        if (!node) {
            return node;
        }
        
        if (needsTransform(node, TransformFlags.ThisNodeNeedsTransformToES6)) {
            return transformNodeWorker(context, node);
        }
        else if (needsTransform(node, TransformFlags.SubtreeNeedsTransformToES6)) {
            return accept(context, node, transformNode);
        }
        
        return node;
    }
    
    function transformNodeWorker(context: VisitorContext, node: Node): Node {
        // Elide ambient nodes
        if (node.flags & NodeFlags.Ambient) {
            return undefined;
        }
        
        switch (node.kind) {
            case SyntaxKind.PublicKeyword:
            case SyntaxKind.PrivateKeyword:
            case SyntaxKind.ProtectedKeyword:
            case SyntaxKind.AbstractKeyword:
            case SyntaxKind.AsyncKeyword:
            case SyntaxKind.ConstKeyword:
            case SyntaxKind.DeclareKeyword:
                // TypeScript accessibility modifiers are elided
                return undefined;
                
            case SyntaxKind.Decorator:
                // TypeScript decorators are elided. They will be emitted as part of transformClassDeclaration
                return undefined;
                
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
                // TypeScript type-only declarations are elided
                return undefined;
                
            case SyntaxKind.ClassDeclaration:
                // This is a class declaration with TypeScript syntax extensions.
                // TypeScript class syntax extensions include: Decorators, Parameter Property Assignments, Property Declarations
                return transformClassDeclaration(context, <ClassDeclaration>node);

            case SyntaxKind.ClassExpression:
                // This is a class expression with TypeScript syntax extensions.
                return transformClassExpression(context, <ClassExpression>node);
            
            case SyntaxKind.HeritageClause:
                return transformHeritageClause(context, <HeritageClause>node);
                
            case SyntaxKind.ExpressionWithTypeArguments:
                return transformExpressionWithTypeArguments(context, <ExpressionWithTypeArguments>node);
            
            case SyntaxKind.Constructor:
                // TypeScript repositions the constructor of a class to the first element
                return undefined;
                
            case SyntaxKind.PropertyDeclaration:
                // TypeScript property declarations are elided
                return undefined;
                
            case SyntaxKind.IndexSignature:
                // TypeScript index signatures are elided
                return undefined;
                
            case SyntaxKind.Constructor:
                // TypeScript constructors are elided. The constructor of a class will be
                // reordered to the start of the member list in transformClassDeclaration.
                return undefined;
                
            case SyntaxKind.MethodDeclaration:
                // TypeScript method declarations may be 'async', and may have decorators.
                return transformMethodDeclaration(context, <MethodDeclaration>node);
            
            default:
                return transform.accept(context, node, transformNode);
        }
    }
    
    function transformClassDeclaration(context: VisitorContext, node: ClassDeclaration): ClassDeclaration {
        // TODO(rbuckton): Handle decorators, for now we don't change the class and let the old emitter handle this
        if (node.decorators) {
            return node;
        }
        
        let baseTypeNode = getClassExtendsHeritageClauseElement(node);
        let modifiers = visitNodeArrayOfModifier(context, node.modifiers, transformNodeWorker);
        let heritageClauses = visitNodeArrayOfHeritageClause(context, node.heritageClauses, transformNodeWorker);
        let ctor = transformConstructor(context, node, baseTypeNode !== undefined);
        let members = visitNodeArrayOfClassElement(context, node.members, transformNodeWorker);
        if (ctor) {
            members = factory.createNodeArray([ctor, ...members]);
        }
        
        let newNode = factory.updateClassDeclaration(
            node,
            /*decorators*/ undefined,
            /*modifiers*/ modifiers,
            node.name,
            /*typeParameters*/ undefined,
            /*heritageClauses*/ heritageClauses,
            /*members*/ members
        );
        
        let staticPropertyAssignments = getInitializedProperties(node, /*isStatic*/ true);
        if (staticPropertyAssignments) {
            context.emitStatement(newNode);
            emitPropertyDeclarations(context, node, staticPropertyAssignments);
            return undefined;
        }
        
        return newNode;
    }

    function transformClassExpression(context: VisitorContext, node: ClassExpression): LeftHandSideExpression {
        // TODO(rbuckton): Handle decorators, for now we don't change the class and let the old emitter handle this
        if (node.decorators) {
            return node;
        }

        let baseTypeNode = getClassExtendsHeritageClauseElement(node);
        let modifiers = visitNodeArrayOfModifier(context, node.modifiers, transformNodeWorker);
        let heritageClauses = visitNodeArrayOfHeritageClause(context, node.heritageClauses, transformNodeWorker);
        let ctor = transformConstructor(context, node, baseTypeNode !== undefined);
        let members = visitNodeArrayOfClassElement(context, node.members, transformNodeWorker);
        if (ctor) {
            members = factory.createNodeArray([ctor, ...members]);
        }
        
        let newNode = factory.updateClassExpression(
            node,
            /*decorators*/ undefined,
            /*modifiers*/ modifiers,
            node.name,
            /*typeParameters*/ undefined,
            /*heritageClauses*/ heritageClauses,
            /*members*/ members
        );
        
        let staticPropertyAssignments = getInitializedProperties(node, /*isStatic*/ true);
        if (staticPropertyAssignments) {
            let tempVariable = context.declareLocal();
            return factory.createParenthesizedExpression(
                factory.inlineExpressions([
                    factory.createAssignmentExpression(tempVariable, newNode),
                    ...transformPropertyDeclarations(context, node, staticPropertyAssignments),
                    tempVariable
                ])
            );
        }
        
        return newNode;
    }
    
    function transformConstructor(context: VisitorContext, node: ClassLikeDeclaration, hasBaseType: boolean) {
        // Check if we have a property assignment inside class declaration.
        // If there is a property assignment, we need to emit constructor whether users define it or not
        // If there is no property assignment, we can omit constructor if users do not define it
        let ctor = getFirstConstructorWithBody(node);
        let parameterPropertyAssignments = ctor ? getParametersWithPropertyAssignments(ctor) : undefined;
        let instancePropertyAssignments = getInitializedProperties(node, /*isStatic*/ false);
        let leadingCommentRanges: CommentRange[];
        let trailingCommentRanges: CommentRange[];
        for (let member of node.members) {
            if (isConstructor(member) && !member.body) {
                let leadingCommentRangesOfMember = context.getLeadingCommentRanges(member, /*onlyPinnedOrTripleSlashComments*/ true);
                leadingCommentRanges = concatenate(leadingCommentRanges, leadingCommentRangesOfMember);
            }
        }
        
        // For target ES6 and above, if there is no property assignment
        // do not emit constructor in class declaration.
        if (!parameterPropertyAssignments && !instancePropertyAssignments) {
            if (leadingCommentRanges) {
                leadingCommentRanges = concatenate(leadingCommentRanges, context.getLeadingCommentRanges(ctor));
                ctor = factory.cloneNode(ctor);
                factory.attachCommentRanges(ctor, leadingCommentRanges, trailingCommentRanges);
            }

            return ctor;
        }
        
        context.pushStatements();
        
        let parameters =
            ctor ? visitNodeArrayOfParameter(context, ctor.parameters, transformNode) :
            hasBaseType ? [factory.createRestParameter(factory.createIdentifier("args"))] :
            [];
            
        let superCall: ExpressionStatement;
        if (ctor) {
            leadingCommentRanges = concatenate(
                leadingCommentRanges,
                context.getLeadingCommentRanges(ctor)
            );
            trailingCommentRanges = context.getTrailingCommentRanges(ctor);
            
            if (hasBaseType) {
                superCall = findInitialSuperCall(ctor);
                if (superCall) {
                    context.emitStatement(superCall);
                }
            }
            if (parameterPropertyAssignments) {
                for (let parameter of parameterPropertyAssignments) {
                    context.emitAssignmentStatement(
                        factory.createPropertyAccessExpression2(
                            factory.createThisKeyword(),
                            <Identifier>factory.cloneNode(parameter.name)
                        ),
                        <Identifier>factory.cloneNode(parameter.name)
                    );
                }
            }
        }
        else if (hasBaseType) {
            context.emitExpressionStatement(
                factory.createCallExpression2(
                    factory.createNode<LeftHandSideExpression>(SyntaxKind.SuperKeyword),
                    [
                        factory.createSpreadElementExpression(
                            factory.createIdentifier("args")
                        )
                    ]
                )
            );
        }
        
        if (instancePropertyAssignments) {
            emitPropertyDeclarations(context, node, instancePropertyAssignments);
        }
        
        if (ctor) {
            let bodyStatements = superCall
                ? ctor.body.statements
                : ctor.body.statements.slice(1);
            context.emitStatements(visitNodes(context, bodyStatements, transformNode, visitStatement));
        }
        
        let statements = factory.createNodeArray(
            context.getStatements(), 
            /*location*/ ctor ? ctor.body.statements : undefined);

        let body = ctor 
            ? factory.updateBlock(ctor.body, statements) 
            : factory.createBlock(statements);
        
        context.popStatements();
        
        if (ctor) {
            ctor = factory.updateConstructor(
                ctor,
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                parameters,
                /*type*/ undefined,
                body
            ); 
        }
        else {
            ctor = factory.createConstructor(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                parameters,
                /*type*/ undefined,
                body
            );
        }
        
        factory.attachCommentRanges(ctor, leadingCommentRanges, trailingCommentRanges);
        return ctor;
    }
    
    function transformHeritageClause(context: VisitorContext, node: HeritageClause): Node {
        if (node.token === SyntaxKind.ExtendsKeyword) {
            return factory.updateHeritageClause(
                node,
                visitNodeArrayOfExpressionWithTypeArguments(context, node.types, transformNode)
            );
        }
        
        return undefined;
    }

    function transformExpressionWithTypeArguments(context: VisitorContext, node: ExpressionWithTypeArguments) {
        return factory.updateExpressionWithTypeArguments(
            node,
            node.expression,
            /*typeArguments*/ undefined
        );
    }
    
    // emitter.ts:4091
    function emitPropertyDeclarations(context: VisitorContext, node: ClassLikeDeclaration, properties: PropertyDeclaration[]): void {
        for (let property of properties) {
            let propertyAssignment = transformPropertyDeclaration(context, node, property);
            let propertyStatement = factory.createExpressionStatement(propertyAssignment);
            propertyStatement.original = property;
            context.emitStatement(propertyStatement);
        }
    }
    
    function transformPropertyDeclarations(context: VisitorContext, node: ClassLikeDeclaration, properties: PropertyDeclaration[]): Expression[] {
        let expressions: Expression[] = [];
        for (let property of properties) {
            let propertyAssignment = transformPropertyDeclaration(context, node, property);
            propertyAssignment.original = property;
            expressions.push(propertyAssignment);
        }
        return expressions;
    }
    
    function transformPropertyDeclaration(context: VisitorContext, node: ClassLikeDeclaration, property: PropertyDeclaration): Expression {
        let target = property.flags & NodeFlags.Static
            ? <Identifier>context.getDeclarationName(node)
            : factory.createThisKeyword();
        
        return factory.createAssignmentExpression(
            factory.createMemberAccessForPropertyName(target, property.name, /*location*/ property.name),
            visitExpression(context, property.initializer, transformNode)
        );
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
    
    function transformMethodDeclaration(context: VisitorContext, node: MethodDeclaration) {
        if (!node.body) {
            let missing = factory.createNode<MethodDeclaration>(SyntaxKind.MissingDeclaration, /*location*/ node);
            missing.original = node;
            return missing;
        }
        
        return node;
    }
}