/// <reference path="../transform.generated.ts" />
namespace ts.transform {
    export function toES5(context: VisitorContext, statements: NodeArray<Statement>) {
        return statements;
    }

    // export class ES6ToES5Transformer extends Transformer {
    //     private builder: StatementBuilder;
    //     private restIndex: number;
    //     private containingFunction: FunctionLikeDeclaration;
        
    //     // emitter.ts:4354
    //     private transformClassExpression(node: ClassExpression) {
    //         return this.transformClassLikeDeclaration(node);
    //     }
        
    //     // emitter.ts:4358
    //     private transformClassDeclaration(node: ClassDeclaration) {
    //         // TODO(rbuckton): SystemJS hoisting
    //         // source file level classes in system modules are hoisted so 'var's for them are already defined
    //         // if (!shouldHoistDeclarationInSystemJsModule(node)) {
    //         // }
            
    //         // var <className> = (function (){ ... })();
    //         return factory.createVariableStatement2(
    //             <Identifier>this.getDeclarationName(node),
    //             this.transformClassLikeDeclaration(node)
    //         );
    //     }
        
    //     // emitter.ts:4548
    //     private transformClassLikeDeclaration(node: ClassLikeDeclaration) {
    //         let saveBuilder = this.builder;
    //         this.builder = new StatementBuilder(this.resolver);
            
    //         let baseTypeNode = getClassExtendsHeritageClauseElement(node);
    //         if (baseTypeNode) {
    //             this.builder.emitStatement(
    //                 factory.createExpressionStatement(
    //                     factory.createCallExpression2(
    //                         factory.createIdentifier("__extends"),
    //                         [
    //                             <Identifier>this.getDeclarationName(node),
    //                             factory.createIdentifier("_super")
    //                         ]
    //                     )
    //                 )
    //             );
    //         }

    //         this.emitConstructor(node, baseTypeNode);
    //         this.emitMemberFunctions(node);
    //         this.emitPropertyDeclarations(node, this.getInitializedProperties(node, /*isStatic*/ true));
    //         this.builder.emitReturn(<Identifier>this.getDeclarationName(node));
            
    //         let parameters = baseTypeNode 
    //             ? [factory.createParameter2(factory.createIdentifier("_super"))]
    //             : [];
            
    //         let _arguments = baseTypeNode 
    //             ? [baseTypeNode.expression]
    //             : [];
                 
    //         let transformed = factory.createInlineFunctionExpressionEvaluation(
    //             parameters,
    //             this.builder.readStatements(),
    //             _arguments
    //         );
            
    //         this.builder = saveBuilder;
    //         return transformed;
    //     }

    //     // emitter.ts:4244 (emitConstructorWorker)
    //     private emitConstructor(node: ClassLikeDeclaration, baseTypeElement: ExpressionWithTypeArguments): void {
    //         let saveBuilder = this.builder;
    //         this.builder = new StatementBuilder(this.resolver);

    //         // Check if we have property assignment inside class declaration.
    //         // If there is property assignment, we need to emit constructor whether users define it or not
    //         // If there is no property assignment, we can omit constructor if users do not define it
    //         let hasInstancePropertyWithInitializer = false;
            
    //         for (let member of node.members) {
    //             // TODO: Emit the constructor overload pinned comments:
    //             // if (member.kind === SyntaxKind.Constructor && !(<ConstructorDeclaration>member).body) {
    //             //     emitOnlyPinnedOrTripleSlashComments(member);
    //             // }
    //             if (isPropertyDeclaration(member) && member.initializer) {
    //                 hasInstancePropertyWithInitializer = true;
    //             }
    //         }
            
    //         let ctor = getFirstConstructorWithBody(node);
            
    //         // TODO(rbuckton): Emit comments, source map
    //         // if (ctor) {
    //         //     emitLeadingComments(ctor);
    //         // }
    //         // emitStart(ctor || node);
    //         // scopeEmitStart(node, "constructor");
    //         // if (ctor) {
    //         //     emitDetachedComments(ctor.body.statements);
    //         // }
            
    //         this.emitCaptureThisForNodeIfNecessary(node);
            
    //         let superCall: ExpressionStatement;
    //         let parameters: ParameterDeclaration[];
    //         if (ctor) {
    //             parameters = this.transformSignatureParameters(ctor);
    //             if (baseTypeElement) {
    //                 superCall = this.findInitialSuperCall(ctor);
    //                 if (superCall) {
    //                     this.builder.emitStatement(superCall);
    //                 }
    //             }
    //             this.emitParameterPropertyAssignments(ctor);
    //         }
    //         else if (baseTypeElement) {
    //             // _super.apply(this, arguments);
    //             this.builder.emitStatement(
    //                 factory.createExpressionStatement(
    //                     factory.createCallExpression2(
    //                         factory.createPropertyAccessExpression2(
    //                             factory.createIdentifier("_super"),
    //                             factory.createIdentifier("apply")
    //                         ),
    //                         [
    //                             factory.createThisKeyword(),
    //                             factory.createIdentifier("arguments")
    //                         ]
    //                     )
    //                 ),
    //                 /*location*/ baseTypeElement
    //             );
    //         }
            
    //         this.emitPropertyDeclarations(node, this.getInitializedProperties(node, /*static*/ false));
            
    //         if (ctor) {
    //             this.builder.emitStatements(
    //                 visitNodes(ctor.body.statements, this, /*cache*/ undefined, /*removeMissingNodes*/ true)
    //             );
    //         }
            
    //         this.builder.emitStatement(
    //             factory.createFunctionDeclaration3(
    //                 <Identifier>this.getDeclarationName(node),
    //                 parameters,
    //                 this.builder.readStatements()
    //             )
    //         );
            
    //         this.builder = saveBuilder;
    //     }
        
    //     // emitter.ts:4026
    //     private findInitialSuperCall(ctor: ConstructorDeclaration): ExpressionStatement {
    //         if (ctor.body) {
    //             let statement = (<Block>ctor.body).statements[0];
    //             if (statement && statement.kind === SyntaxKind.ExpressionStatement) {
    //                 let expr = (<ExpressionStatement>statement).expression;
    //                 if (expr && expr.kind === SyntaxKind.CallExpression) {
    //                     let func = (<CallExpression>expr).expression;
    //                     if (func && func.kind === SyntaxKind.SuperKeyword) {
    //                         return <ExpressionStatement>statement;
    //                     }
    //                 }
    //             }
    //         }
    //     }
        
    //     // emitter.ts:4041
    //     private emitParameterPropertyAssignments(node: ConstructorDeclaration) {
    //         for (let parameter of node.parameters) {
    //             if (parameter.flags & NodeFlags.AccessibilityModifier) {
    //                 // this.<paramName> = <paramName>;
    //                 this.builder.emitAssignment(
    //                     /*left*/ factory.setTextRange(
    //                         factory.createPropertyAccessExpression2(
    //                             factory.createThisKeyword(),
    //                             factory.cloneNode(<Identifier>parameter.name)
    //                         ),
    //                         parameter.name
    //                     ),
    //                     /*right*/ <Identifier>parameter.name,
    //                     /*location*/ parameter
    //                 );
    //             }
    //         }
    //     }
        
    //     // emitter.ts:3709
    //     private emitCaptureThisForNodeIfNecessary(node: Node) {
    //         // var _this = this;
    //         if (needsTransform(node, TransformFlags.SubtreeCapturesLexicalThis)) {
    //             this.builder.emitStatement(
    //                 factory.createVariableStatement2(
    //                     factory.createIdentifier("_this"),
    //                     factory.createThisKeyword()));
    //         }
    //     }
        
    //     // emitter.ts:4085
    //     private emitPropertyDeclarations(node: ClassLikeDeclaration, properties: PropertyDeclaration[]) {
    //         for (let property of properties) {
    //             this.emitPropertyDeclaration(node, property);
    //         }
    //     }
        
    //     // emitter.ts:4091
    //     private emitPropertyDeclaration(node: ClassLikeDeclaration, property: PropertyDeclaration, receiver?: Identifier, isExpression?: boolean) {
    //         let target = property.flags & NodeFlags.Static
    //             ? <Identifier>this.getDeclarationName(node)
    //             : factory.createThisKeyword();
    //         this.builder.emitAssignment(
    //             /*left*/ factory.setTextRange(
    //                 factory.createMemberAccessForPropertyName(target, property.name), 
    //                 property.name
    //             ),
    //             /*right*/ visit(property.initializer, this),
    //             /*location*/ property
    //         );
    //     }
        
    //     // emitter.ts:3718
    //     private transformSignatureParameters(node: FunctionLikeDeclaration) {
    //         let saveRestIndex = this.restIndex;
    //         let saveContainingFunction = this.containingFunction;
    //         this.restIndex = hasRestParameter(node) ? node.parameters.length - 1 : undefined;
    //         this.containingFunction = node;
            
    //         let parameters = visitNodes(node.parameters, this, /*cache*/ undefined, /*removeMissingNodes*/ true);
            
    //         this.restIndex = saveRestIndex;
    //         this.containingFunction = saveContainingFunction;
    //         return parameters;
    //     }

    //     // emitter.ts:3542 (emitDefaultValueAssignments)
    //     // emitter.ts:3594 (emitRestParameter)
    //     private transformParameterDeclaration(parameter: ParameterDeclaration) {
    //         let { name: paramName, initializer, dotDotDotToken } = parameter;
    //         if (isBindingPattern(paramName)) {
    //             let tempParamName = this.builder.createUniqueIdentifier();
    //             let tempParameter = factory.createParameter2(tempParamName);
                
    //             // A rest parameter cannot have a binding pattern or an initializer,
    //             // so let's just ignore it.
    //             if (dotDotDotToken) {
    //                 return tempParameter;
    //             }
                
    //             // In cases where a binding pattern is simply '[]' or '{}',
    //             // we usually don't want to emit a var declaration; however, in the presence
    //             // of an initializer, we must emit that expression to preserve side effects.
    //             let hasBindingElements = paramName.elements.length > 0;
    //             if (hasBindingElements) {
    //                 // TODO(rbuckton): binding patterns
    //             }
    //             else {
    //                 this.builder.emitStatement(
    //                     factory.createVariableStatement2(
    //                         tempParamName,
    //                         visit(initializer, this)
    //                     )
    //                 );
    //             }
                
    //             return tempParameter;
    //         }
    //         else {
    //             if (initializer) {
    //                 // A rest parameter cannot have a binding pattern or an initializer,
    //                 // so let's just ignore it.
    //                 if (dotDotDotToken) {
    //                     return undefined;
    //                 }
                    
    //                 // if (<paramName> === void 0) { <paramName> = <initializer>; }
    //                 this.builder.emitStatement(
    //                     factory.createIfStatement(
    //                         /*condition*/ factory.createBinaryExpression2(
    //                             factory.cloneNode(paramName),
    //                             SyntaxKind.EqualsEqualsEqualsToken,
    //                             factory.createVoidZeroExpression()
    //                         ),
    //                         /*thenStatement*/ factory.createBlock([
    //                             factory.createExpressionStatement(
    //                                 factory.createBinaryExpression2(
    //                                     factory.cloneNode(paramName),
    //                                     SyntaxKind.EqualsToken,
    //                                     factory.cloneNode(visit(initializer, this))
    //                                 )
    //                             )
    //                         ])
    //                     )
    //                 );
    //             }
    //             else if (dotDotDotToken) {
    //                 let tempName = factory.createIdentifier(this.resolver.makeTempVariableName(/*loopVariable*/ true));
                    
    //                 // var <paramName> = [];
    //                 this.builder.emitStatement(
    //                     factory.createVariableStatement2(
    //                         <Identifier>this.getDeclarationName(parameter),
    //                         factory.createArrayLiteralExpression([])
    //                     )
    //                 );
                    
    //                 // for (var <tempName> = <restIndex>; <tempName> < arguments.length; <tempName>++)
    //                 this.builder.emitStatement(
    //                     factory.createForStatement(
    //                         /*initializer*/ factory.createVariableDeclarationList([
    //                             factory.createVariableDeclaration2(
    //                                 tempName,
    //                                 factory.createNumericLiteral2(this.restIndex)
    //                             )
    //                         ]),
    //                         /*condition*/ factory.createBinaryExpression2(
    //                             tempName,
    //                             SyntaxKind.LessThanToken,
    //                             factory.createPropertyAccessExpression2(
    //                                 factory.createIdentifier("arguments"),
    //                                 factory.createIdentifier("length")
    //                             )
    //                         ),
    //                         /*incrementer*/ factory.createPostfixUnaryExpression(
    //                             tempName,
    //                             SyntaxKind.PlusPlusToken
    //                         ),
    //                         /*statement*/ factory.createBlock([
    //                             // <restParam>[<tempName> - <restIndex>] = arguments[<tempName>];
    //                             factory.createExpressionStatement(
    //                                 factory.createBinaryExpression2(
    //                                     factory.createElementAccessExpression2(
    //                                         <Identifier>this.getDeclarationName(parameter),
    //                                         factory.createBinaryExpression2(
    //                                             tempName,
    //                                             SyntaxKind.MinusToken,
    //                                             factory.createNumericLiteral2(this.restIndex)
    //                                         )
    //                                     ),
    //                                     SyntaxKind.EqualsToken,
    //                                     factory.createElementAccessExpression2(
    //                                         factory.createIdentifier("arguments"),
    //                                         tempName
    //                                     )
    //                                 )
    //                             )
    //                         ])
    //                     )
    //                 );
                    
    //                 return undefined;
    //             }
    //         }
            
    //         return parameter;
    //     }

    //     // emitter.ts:4119
    //     private emitMemberFunctions(node: ClassLikeDeclaration): void {
    //         for (let member of node.members) {
    //             if (isSemicolonClassElement(member)) {
    //                 this.builder.emitStatement(factory.createEmptyStatement());
    //             }
    //             else if (isMethodDeclaration(member)) {
    //                 if (!member.body) {
    //                     // TODO(rbuckton): emit pinned or triple slash comments
    //                     continue;
    //                 }
                    
    //                 // TODO(rbuckton): emit leading comments
    //                 this.builder.emitAssignment(
    //                     /*left*/ factory.setTextRange(
    //                         factory.createMemberAccessForPropertyName(
    //                             this.createClassMemberPrefix(node, member),
    //                             member.name
    //                         ),
    //                         member.name
    //                     ),
    //                     /*right*/ this.transformMethodDeclaration(<MethodDeclaration>member),
    //                     /*location*/ member
    //                 );
    //             }
    //             else if (isGetAccessor(member) || isSetAccessor(member)) {
    //                 let accessors = getAllAccessorDeclarations(node.members, member);
    //                 if (member === accessors.firstAccessor) {
    //                     this.emitAccessors(node, accessors);
    //                 }
    //             }
    //         }
    //     }
        
    //     private transformMethodDeclaration(method: MethodDeclaration): FunctionExpression {
    //         return;
    //     }
        
    //     private emitAccessors(node: ClassLikeDeclaration, accessors: AllAccessorDeclarations) {
            
    //     }
        
    //     // emitter.ts:4074
    //     private getInitializedProperties(node: ClassLikeDeclaration, isStatic: boolean): PropertyDeclaration[] {
    //         let properties: PropertyDeclaration[] = [];
    //         for (let member of node.members) {
    //             if (member.kind === SyntaxKind.PropertyDeclaration && isStatic === ((member.flags & NodeFlags.Static) !== 0) && (<PropertyDeclaration>member).initializer) {
    //                 properties.push(<PropertyDeclaration>member);
    //             }
    //         }
            
    //         return properties;
    //     }
        
    //     // emitter.ts:4623
    //     private createClassMemberPrefix(node: ClassLikeDeclaration, member: Node) {
    //         let name = <Identifier>this.getDeclarationName(node);
    //         return member.flags & NodeFlags.Static
    //             ? name
    //             : factory.createPropertyAccessExpression2(name, factory.createIdentifier("prototype"));
    //     }

    //     // emitter.ts:3649
    //     private getDeclarationName(node: Declaration) {
    //         let name = node.name;
    //         if (name && !nodeIsSynthesized(name)) {
    //             return factory.cloneNode(name);
    //         }
    //         else {
    //             return factory.createIdentifier(
    //                 this.resolver.getGeneratedNameForNode(node)
    //             );
    //         }
    //     }
    // }
}