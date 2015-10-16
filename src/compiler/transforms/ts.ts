/// <reference path="../checker.ts" />
/*@internal*/
namespace ts {
    export function createTypeScriptTransformation(transformer: Transformer): Transformation {
        // create local aliases for transformer methods
        let {
            startLexicalEnvironment,
            endLexicalEnvironment,
            getParentNode,
            pushNode,
            popNode,
            findAncestorNode,
            declareLocal,
            getGeneratedNameForNode,
            hoistVariableDeclaration,
            getDeclarationName,
            getClassMemberPrefix,
            pipeNode,
            pipeNodes,
            mapNode,
            mapNodes,
            visitNode,
            visitNodes,
            visitStatement,
            visitConciseBody,
            visitFunctionBody,
            visitModuleBody,
            visitSourceFile,
            accept,
        } = transformer;

        let resolver = transformer.getEmitResolver();
        let compilerOptions = transformer.getCompilerOptions();
        let languageVersion = compilerOptions.target || ScriptTarget.ES3;
        let moduleKind = compilerOptions.module || ModuleKind.None;
        let currentSourceFile: SourceFile;
        let externalImports: (ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration)[];
        let exportSpecifiers: Map<ExportSpecifier[]>;
        let exportEquals: ExportAssignment;
        let exportFunctionForFile: string;
        let savedSubstituteExpressionIdentifier = transformer.getExpressionIdentifierSubstitution();
        transformer.setExpressionIdentifierSubstitution(substituteExpressionIdentifier);

        return transformTypeScript;

        function transformTypeScript(node: SourceFile): SourceFile {
            if (node.transformFlags & TransformFlags.ContainsTypeScript) {
                return transformTypeScriptWorker(node);
            }

            return node;
        }

        function transformTypeScriptWorker(node: SourceFile): SourceFile {
            externalImports = undefined;
            exportSpecifiers = undefined;
            exportEquals = undefined;
            exportFunctionForFile = undefined;
            currentSourceFile = node;

            node = visitSourceFile(node, visitor);

            externalImports = undefined;
            exportSpecifiers = undefined;
            exportEquals = undefined;
            exportFunctionForFile = undefined;
            currentSourceFile = undefined;

            return node;
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
        function visitor(node: Node, write: (node: Node) => void): void {
            if (node.transformFlags & TransformFlags.TypeScript) {
                visitorWorker(node, write);
            }
            else if (node.transformFlags & TransformFlags.ContainsTypeScript) {
                write(accept(node, visitor));
            }
            else {
                write(node);
            }
        }

        /**
        * Transforms a node from TypeScript to ES6.
        * @param context Context information for the transform.
        * @param node The node to transform.
        */
        function visitorWorker(node: Node, write: (node: Node) => void): void {
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
                    break;

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
                    break;

                case SyntaxKind.IndexSignature:
                    // TypeScript index signatures are elided.
                    break;

                case SyntaxKind.Decorator:
                    // TypeScript decorators are elided. They will be emitted as part of transformClassDeclaration.
                    break;

                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.TypeAliasDeclaration:
                    // TypeScript type-only declarations are elided
                    break;

                case SyntaxKind.PropertyDeclaration:
                    // TypeScript property declarations are elided.
                    break;

                case SyntaxKind.Constructor:
                    // TypeScript constructors are elided. The constructor of a class will be
                    // reordered to the start of the member list in `transformClassDeclaration`.
                    break;

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
                    visitClassDeclaration(<ClassDeclaration>node, write);
                    break;

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
                    visitClassExpression(<ClassExpression>node, write);
                    break;

                case SyntaxKind.HeritageClause:
                    // This is a heritage clause with TypeScript syntax extensions.
                    //
                    // TypeScript heritage clause extensions include:
                    // - `implements` clause
                    visitHeritageClause(<HeritageClause>node, write);
                    break;

                case SyntaxKind.ExpressionWithTypeArguments:
                    // TypeScript supports type arguments on an expression in an `extends` heritage clause.
                    visitExpressionWithTypeArguments(<ExpressionWithTypeArguments>node, write);
                    break;

                case SyntaxKind.MethodDeclaration:
                    // TypeScript method declarations may be 'async', and may have decorators, modifiers
                    // or type annotations.
                    visitMethodDeclaration(<MethodDeclaration>node, write);
                    break;

                case SyntaxKind.GetAccessor:
                    // Get Accessors can have TypeScript modifiers, decorators, and type annotations.
                    visitGetAccessor(<GetAccessorDeclaration>node, write);
                    break;

                case SyntaxKind.SetAccessor:
                    // Set Accessors can have TypeScript modifiers, decorators, and type annotations.
                    visitSetAccessor(<SetAccessorDeclaration>node, write);
                    break;

                case SyntaxKind.FunctionDeclaration:
                    // TypeScript function declarations may be 'async'
                    visitFunctionDeclaration(<FunctionDeclaration>node, write);
                    break;

                case SyntaxKind.FunctionExpression:
                    // TypeScript function expressions may be 'async'
                    visitFunctionExpression(<FunctionExpression>node, write);
                    break;

                case SyntaxKind.ArrowFunction:
                    // TypeScript arrow functions may be 'async'
                    visitArrowFunction(<ArrowFunction>node, write);
                    break;

                case SyntaxKind.Parameter:
                    // This is a parameter declaration with TypeScript syntax extensions.
                    //
                    // TypeScript parameter declaration syntax extensions include:
                    // - decorators
                    // - accessibility modifiers
                    // - the question mark (?) token for optional parameters
                    // - type annotations
                    visitParameter(<ParameterDeclaration>node, write);
                    break;

                case SyntaxKind.TypeAssertionExpression:
                    // TypeScript type assertions are removed, but their subtrees are preserved.
                    write((<TypeAssertion>node).expression);
                    break;

                case SyntaxKind.AsExpression:
                    // TypeScript `as` expressions are removed, but their subtrees are preserved.
                    write((<AsExpression>node).expression);
                    break;

                case SyntaxKind.EnumDeclaration:
                    // TypeScript enum declarations do not exist in ES6 and must be rewritten.
                    visitEnumDeclaration(<EnumDeclaration>node, write);
                    break;

                case SyntaxKind.AwaitExpression:
                    // TypeScript 'await' expressions must be transformed.
                    visitAwaitExpression(<AwaitExpression>node, write);
                    break;

                case SyntaxKind.VariableStatement:
                    // TypeScript namespace exports for variable statements must be transformed.
                    visitVariableStatement(<VariableStatement>node, write);
                    break;

                case SyntaxKind.ModuleDeclaration:
                    // TypeScript namespace declarations must be transformed.
                    visitModuleDeclaration(<ModuleDeclaration>node, write);
                    break;

                case SyntaxKind.ImportEqualsDeclaration:
                    // TypeScript namespace or external module import.
                    visitImportEqualsDeclaration(<ImportEqualsDeclaration>node, write);
                    break;

                default:
                    Debug.fail("Encountered unhandled node kind when transforming TypeScript syntax.");
                    write(accept(node, visitor));
                    break;
            }
        }

        /**
         * Transforms a class declaration with TypeScript syntax into compatible ES6.
         * @param node The node to transform.
         * @param write The callback to execute to write out the result.
         * @remarks
         * This function will only be called when one of the following conditions are met:
         * - The class has decorators.
         * - The class has property declarations with initializers.
         * - The class contains a constructor that contains parameters with accessibility modifiers.
         * - The class is an export in a TypeScript namespace.
         */
        function visitClassDeclaration(node: ClassDeclaration, write: (node: Statement) => void): void {
            // Get the name of the class
            let name = getDeclarationName(node);

            // Visit the base type node for the class.
            let baseTypeNode = mapNode(getClassExtendsHeritageClauseElement(node), visitExpressionWithTypeArguments);

            // Create a synthetic constructor for the class (if necessary), and visit the members of the class.
            let classMembers: ClassElement[] = [];
            pipeNode(node, (node, write) => emitConstructor(node, write, baseTypeNode), classMembers);
            pipeNodes(node.members, visitor, classMembers);

            // Create the declaration for the class. Classes with decorators are transformed into a class
            // expression inside of a let declaration.
            let classStatement: Statement;
            if (nodeIsDecorated(node)) {
                // ES6 classes doubly-bind the class name. This would break class decorators as any local
                // references would instead point to the *undecorated* class. To avoid this, and preserve the
                // expected runtime semantics for ES.next class decorators, we instead encode the class
                // as an expression as part of a `let` declaration. This makes it so that the binding is singular.
                //
                // We may, in the future, need to enclose such a class in an IIFE to preserve the double-binding semantics.
                //
                // If the class is also default export, we must defer the export until after we have written the decorators.
                let classFlags = isTopLevelNonDefaultExport(node) ? NodeFlags.Let | NodeFlags.Export : NodeFlags.Let;
                let classExpression = createClassExpression3(baseTypeNode, classMembers);
                classStatement = createVariableStatement3(name, classExpression, /*location*/ node, classFlags);
            }
            else {
                let classFlags = node.flags & ~NodeFlags.AccessibilityModifier;
                classStatement = createClassDeclaration2(name, baseTypeNode, classMembers, /*location*/ node, classFlags);
            }

            // Set a pointer to the original node for the class statement and write the statement.
            classStatement.original = node;
            write(classStatement);

            // Emit static property assignment. Because classDeclaration is lexically evaluated,
            // it is safe to emit static property assignment after classDeclaration
            // From ES6 specification:
            //      HasLexicalDeclaration (N) : Determines if the argument identifier has a binding in this environment record that was created using
            //                                  a lexical declaration such as a LexicalDeclaration or a ClassDeclaration.
            let staticProperties = getInitializedProperties(node, /*isStatic*/ true);
            pipeNodes(staticProperties, (member, write) => emitPropertyDeclarationStatement(member, write, node), write);

            // Write any decorators of the node.
            pipeNodes(getDecoratedClassElements(node, /*isStatic*/ false), emitDecoratorsOfMember, write);
            pipeNodes(getDecoratedClassElements(node, /*isStatic*/ true), emitDecoratorsOfMember, write);
            pipeNode(node, emitDecoratorsOfConstructor, write);

            // If the class is exported as part of a TypeScript namespace, emit the namespace export.
            // Otherwise, emit the default export for a decorated class that was the default export.
            if (isNamespaceLevelExport(node)) {
                emitNamespaceExport(name, name, write);
            }
            else if (isTopLevelDefaultExport(node) && nodeIsDecorated(node)) {
                emitDefaultExport(name, write);
            }
        }

        /**
         * Transforms a class expression with TypeScript syntax into compatible ES6.
         * @param node The node to transform.
         * @param write The callback to execute to write out the result.
         * @remarks
         * This function will only be called when one of the following conditions are met:
         * - The class has property declarations with initializers.
         * - The class contains a constructor that contains parameters with accessibility modifiers.
         */
        function visitClassExpression(node: ClassExpression, write: (node: LeftHandSideExpression) => void): void {
            // Get the name of the class
            let name = getDeclarationName(node);

            // Visit the base type node for the class.
            let baseTypeNode = mapNode(getClassExtendsHeritageClauseElement(node), visitExpressionWithTypeArguments);

            // Create a synthetic constructor for the class (if necessary), and visit the members of the class.
            let classMembers: ClassElement[] = [];
            pipeNode(node, (node, write) => emitConstructor(node, write, baseTypeNode), classMembers);
            pipeNodes(node.members, visitor, classMembers);

            // Create the new class expression.
            let classExpression: LeftHandSideExpression = createClassExpression2(name, baseTypeNode, classMembers);

            // If the class has static properties, and it's a class expression, then we'll need
            // to specialize the emit a bit.  for a class expression of the form:
            //
            //      class C { static a = 1; static b = 2; ... }
            //
            // We'll emit:
            //
            //      (_temp = class C { ... }, _temp.a = 1, _temp.b = 2, _temp)
            //
            // This keeps the expression as an expression, while ensuring that the static parts
            // of it have been initialized by the time it is used.
            let staticProperties = getInitializedProperties(node, /*isStatic*/ true);
            if (staticProperties) {
                let expressions: Expression[] = [];
                let temporaryStorage = declareLocal();
                expressions.push(createAssignmentExpression(temporaryStorage, classExpression));
                pipeNodes(staticProperties, (member, write) => emitPropertyDeclarationExpression(member, write, node, temporaryStorage), expressions);
                expressions.push(temporaryStorage);
                classExpression = createParenthesizedExpression(inlineExpressions(expressions));
            }

            write(classExpression);
        }

        /**
         * Transforms a HeritageClause with TypeScript syntax.
         * @param node The HeritageClause to transform.
         * @param write The callback to execute to write the result.
         * @remarks
         * This function will only be called when one of the following conditions are met:
         * - The node is a non-`extends` heritage clause that should be elided.
         * - The node is an `extends` heritage clause with more than one expression in `types`.
         */
        function visitHeritageClause(node: HeritageClause, write: (node: HeritageClause) => void): void {
            if (node.token === SyntaxKind.ExtendsKeyword) {
                let types = mapNodes(node.types, visitExpressionWithTypeArguments, 0, 1);
                write(updateHeritageClause(node, types));
            }
        }

        /**
         * Transforms an ExpressionWithTypeArguments with TypeScript syntax.
         * @param node The ExpressionWithTypeArguments to transform.
         * @param write The callback to execute to write the result.
         * @remarks
         * This function will only be called when one of the following conditions are met:
         * - The node contains type arguments that should be elided.
         */
        function visitExpressionWithTypeArguments(node: ExpressionWithTypeArguments, write: (node: ExpressionWithTypeArguments) => void): void {
            let expression = visitNode(node.expression, visitor, isLeftHandSideExpression);
            write(updateExpressionWithTypeArguments(node, expression, /*typeArguments*/ undefined));
        }

        /**
         * Emits a synthesized constructor
         * @param node The class for the synthesized constructor.
         * @param write The callback to execute to write the synthesized constructor.
         * @param baseTypeNode The node for the class extends clause, if present.
         * @remarks This function is intended to support `transformClassLikeDeclaration` and should not be called otherwise.
         */
        function emitConstructor(node: ClassLikeDeclaration, write: (node: ClassElement) => void, baseTypeNode: ExpressionWithTypeArguments): void {
            // Check if we have property assignment inside class declaration.
            // If there is a property assignment, we need to emit constructor whether users define it or not
            // If there is no property assignment, we can omit constructor if users do not define it
            let hasInstancePropertyWithInitializer = forEach(node.members, isInstancePropertyWithInitializer);

            let constructor = getFirstConstructorWithBody(node);

            // If the class does not contain nodes that require a synthesized constructor,
            // accept the current constructor if it exists.
            if (!hasInstancePropertyWithInitializer) {
                if (constructor) {
                    write(accept(constructor, visitor));
                }

                return;
            }

            // transform the parameters of the constructor
            let parameters: ParameterDeclaration[];
            if (constructor) {
                parameters = visitNodes(constructor.parameters, visitor, isParameter);
            }
            else if (baseTypeNode) {
                parameters = [createRestParameter(createIdentifier("args"), /*location*/ undefined, NodeFlags.GeneratedRest)];
            }

            // transform the body of the constructor
            let statements: Statement[] = [];
            pipeNode(node, (_, write) => emitConstructorBody(node, write, constructor, baseTypeNode), statements);

            // write out the new constructor
            write(startOnNewLine(createConstructor2(parameters, createBlock(statements), /*location*/ constructor)));
        }

        /**
         * Emits the body of the synthesized constructor.
         * @param node The class for the synthesized constructor.
         * @param write The callback to execute to write out statements of the body.
         * @param constructor The existing constructor for the class, if present.
         * @param baseTypeNode The node for the class extends clause, if present.
         * @remarks This function is intended to be called from `emitConstructor` and should not be called otherwise.
         */
        function emitConstructorBody(node: ClassLikeDeclaration, write: (node: Statement) => void, constructor: ConstructorDeclaration, baseTypeNode: ExpressionWithTypeArguments) {
            startLexicalEnvironment();

            // Emit the super call if it exists
            let superCall = findInitialSuperCall(constructor);
            if (constructor) {
                let parameterPropertyAssignments = getParametersWithPropertyAssignments(constructor);
                pushNode(constructor);
                pipeNode(superCall, visitor, write);
                pipeNodes(parameterPropertyAssignments, emitParameterPropertyAssignment, write);
                popNode();
            }
            else if (baseTypeNode) {
                write(createSynthesizedSuperCall());
            }

            // pipe each property through a transformation
            let properties = getInitializedProperties(node, /*isStatic*/ false);
            pipeNodes(properties, (member, write) => emitPropertyDeclarationStatement(member, write, node), write);

            if (constructor) {
                let statements = skip(constructor.body.statements, superCall ? 1 : 0);
                pushNode(constructor);
                pushNode(constructor.body);
                pipeNodes(statements, visitor, write);
                popNode();
                popNode();
            }

            endLexicalEnvironment(write);
        }

        /**
         * Emits a synthesized property assignment for a parameter declaration.
         * @param node The parameter declaration.
         * @param write The callback to execute to write the resulting assignment.
         */
        function emitParameterPropertyAssignment(node: ParameterDeclaration, write: (node: Statement) => void): void {
            let name = <Identifier>cloneNode(node.name);
            let propExpr = createPropertyAccessExpression2(createThisKeyword(), name);
            let assignExpr = createAssignmentExpression(propExpr, name);
            write(startOnNewLine(createExpressionStatement(assignExpr)));
        }

        /**
         * Emits a synthetic assignment statement for a property declaration with an initializer.
         * @param property The property declaration to emit.
         * @param write The callback to execute to write the result.
         * @param node The containing class for the property.
         */
        function emitPropertyDeclarationStatement(property: PropertyDeclaration, write: (node: Statement) => void, node: ClassLikeDeclaration): void {
            emitPropertyDeclarationWorker(node, property, /*receiver*/ undefined, /*isExpression*/ false, write);
        }

        /**
         * Emits a synthetic assignment expression for a property declaration with an initializer.
         * @param property The property declaration to emit.
         * @param write The callback to execute to write the result.
         * @param node The containing class for the property.
         */
        function emitPropertyDeclarationExpression(property: PropertyDeclaration, write: (node: Expression) => void, node: ClassLikeDeclaration, receiver: Identifier): void {
            emitPropertyDeclarationWorker(node, property, receiver, /*isExpression*/ true, write);
        }

        /**
         * Emits a synthetic assignment for a property declaration with an initializer.
         * @param node The containing class for the property.
         * @param property The property declaration to emit.
         * @param writeExpression The callback to execute to write the result as an expression.
         * @param writeStatement The callback to execute to write the result as a statement.
         */
        function emitPropertyDeclarationWorker(node: ClassLikeDeclaration, property: PropertyDeclaration, receiver: LeftHandSideExpression, isExpression: boolean, write: (node: Expression | Statement) => void): void {
            let initializer = visitNode(property.initializer, visitor, isExpressionNode);

            if (!receiver) {
                if (property.flags & NodeFlags.Static) {
                    receiver = getDeclarationName(node);
                }
                else {
                    receiver = createThisKeyword();
                }
            }

            let left = createMemberAccessForPropertyName(receiver, getPropertyName(property), /*location*/ property.name);
            let assignExpr = createAssignmentExpression(left, initializer);
            if (isExpression) {
                write(setTextRange(assignExpr, property));
            }
            else {
                write(setTextRange(createExpressionStatement(assignExpr), property));
            }
        }

        function getDecoratedClassElements(node: ClassLikeDeclaration, isStatic: boolean): ClassElement[] {
            let members: ClassElement[];
            for (let member of node.members) {
                if (nodeCanBeDecorated(member) && nodeOrChildIsDecorated(member) && isStatic === ((member.flags & NodeFlags.Static) !== 0)) {
                    if (!members) {
                        members = [];
                    }

                    members.push(member);
                }
            }

            return members;
        }

        // emitter.ts:4074
        function isInstancePropertyWithInitializer(member: ClassElement) {
            return isPropertyDeclaration(member) && !(member.flags & NodeFlags.Static) && !!member.initializer;
        }

        function getInitializedProperties(node: ClassLikeDeclaration, isStatic: boolean): PropertyDeclaration[] {
            let properties: PropertyDeclaration[];
            for (let member of node.members) {
                if (isPropertyDeclaration(member) && isStatic === ((member.flags & NodeFlags.Static) !== 0) && member.initializer) {
                    if (!properties) {
                        properties = [];
                    }

                    properties.push(member);
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
            if (ctor && ctor.body) {
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

        /**
         * @remarks
         * This function will be called when one of the following conditions are met:
         * - The node is an overload
         * - The node is marked as abstract
         * - The node is marked as async
         * - The node has both a decorator and a computed property name
         */
        function visitMethodDeclaration(node: MethodDeclaration, write: (node: ClassElement) => void) {
            if (!shouldEmitFunctionLikeDeclaration(node)) {
                return;
            }

            let name = getPropertyName(node);
            let parameters = visitNodes(node.parameters, visitor, isParameter);
            let body = transformFunctionBody(node);
            write(createMethodDeclaration2(name, parameters, body, /*location*/ node, node.flags & NodeFlags.Static));
        }

        /**
         * @remarks
         * This function will be called when one of the following conditions are met:
         * - The node is marked as abstract
         * - The node has both a decorator and a computed property name
         */
        function visitGetAccessor(node: GetAccessorDeclaration, write: (node: ClassElement) => void) {
            if (!shouldEmitFunctionLikeDeclaration(node)) {
                return;
            }

            let name = getPropertyName(node);
            let parameters = visitNodes(node.parameters, visitor, isParameter);
            let body = visitFunctionBody(node.body, visitor);
            write(createGetAccessor2(name, parameters, body, /*location*/ node, node.flags & NodeFlags.Static));
        }

        /**
         * @remarks
         * This function will be called when one of the following conditions are met:
         * - The node is marked as abstract
         * - The node has both a decorator and a computed property name
         */
        function visitSetAccessor(node: SetAccessorDeclaration, write: (node: ClassElement) => void) {
            if (!shouldEmitFunctionLikeDeclaration(node)) {
                return;
            }

            let name = getPropertyName(node);
            let parameters = visitNodes(node.parameters, visitor, isParameter);
            let body = visitFunctionBody(node.body, visitor);
            write(createSetAccessor2(name, parameters, body, /*location*/ node, node.flags & NodeFlags.Static));
        }

        /**
         * @remarks
         * This function will be called when one of the following conditions are met:
         * - The node is an overload
         * - The node is marked async
         * - The node is exported from a TypeScript namespace
         */
        function visitFunctionDeclaration(node: FunctionDeclaration, write: (node: Statement) => void) {
            if (!shouldEmitFunctionLikeDeclaration(node)) {
                return;
            }

            let thisNodeIsNamespaceExport = isNamespaceLevelExport(node);
            let parameters = visitNodes(node.parameters, visitor, isParameter);
            let body = transformFunctionBody(node);
            let flags = !thisNodeIsNamespaceExport ? node.flags & (NodeFlags.Default | NodeFlags.Export) : undefined;
            write(createFunctionDeclaration3(node.asteriskToken, node.name, parameters, body, /*location*/ node, flags));

            if (thisNodeIsNamespaceExport) {
                let name = getDeclarationName(node);
                emitNamespaceExport(name, name, write);
            }
        }

        /**
         * @remarks
         * This function will be called when one of the following conditions are met:
         * - The node is marked async
         */
        function visitFunctionExpression(node: FunctionExpression, write: (node: FunctionExpression) => void) {
            if (!shouldEmitFunctionLikeDeclaration(node)) {
                return;
            }

            let parameters = visitNodes(node.parameters, visitor, isParameter);
            let body = transformFunctionBody(node);
            write(createFunctionExpression4(node.asteriskToken, node.name, parameters, body, /*location*/ node));
        }

        /**
         * @remarks
         * This function will be called when one of the following conditions are met:
         * - The node is marked async
         */
        function visitArrowFunction(node: ArrowFunction, write: (node: ArrowFunction) => void) {
            let parameters = visitNodes(node.parameters, visitor, isParameter);
            let body = transformConciseBody(node);
            write(createArrowFunction2(parameters, body, /*location*/ node));
        }

        function transformConciseBody(node: ArrowFunction): ConciseBody {
            if (isAsyncFunctionLike(node)) {
                return transformAsyncFunctionBody(node);
            }

            return visitConciseBody(node.body, visitor);
        }

        function transformFunctionBody(node: MethodDeclaration | AccessorDeclaration | FunctionDeclaration | FunctionExpression): FunctionBody {
            if (isAsyncFunctionLike(node)) {
                return <FunctionBody>transformAsyncFunctionBody(node);
            }

            return visitFunctionBody(node.body, visitor);
        }

        function transformAsyncFunctionBody(node: FunctionLikeDeclaration): ConciseBody | FunctionBody {
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

            let body = makeFunctionBody(visitConciseBody(node.body, visitor));
            let callExpr = createAwaiterHelperCall(hasLexicalArguments, promiseConstructor, body);
            return isArrowFunction(node) ? callExpr : makeFunctionBody(callExpr);
        }

        /**
         * @remarks
         * This function will be called when one of the following conditions are met:
         * - The node has an accessibility modifier.
         */
        function visitParameter(node: ParameterDeclaration, write: (node: ParameterDeclaration) => void) {
            let name = visitNode(node.name, visitor, isBindingPatternOrIdentifier);
            let initializer = visitNode(node.initializer, visitor, isExpressionNode);
            let flags = node.flags & ~NodeFlags.AccessibilityModifier;
            write(createParameter2(name, initializer, /*location*/ node, flags));
        }

        /**
         * @remarks
         * This function will be called when one of the following conditions are met:
         * - The node is exported from a TypeScript namespace.
         */
        function visitVariableStatement(node: VariableStatement, write: (node: Statement) => void) {
            Debug.assert(isNamespaceLevelExport(node), "This function should only be called for namespace level exports.");
            pipeNode(node.declarationList, transformVariableDeclarationListToExpressionStatement, write);
        }

        /**
         * @remarks
         * This function is intended to be called from `transformVariableStatement` and should not be called otherwise.
         */
        function transformVariableDeclarationListToExpressionStatement(node: VariableDeclarationList, write: (node: Statement) => void) {
            let expressions = mapNodes(node.declarations, transformVariableDeclarationToExpression);
            if (expressions.length) {
                write(createExpressionStatement(inlineExpressions(expressions)));
            }
        }

        /**
         * @remarks
         * This function is intended to be called from `transformVariableDeclarationListToExpressionStatement` and should not be called otherwise.
         */
        function transformVariableDeclarationToExpression(node: VariableDeclaration, write: (node: Expression) => void) {
            if (!node.initializer) {
                return;
            }

            transformBindingElementToExpressionWithParenthesisIfNeeded(node, write, /*parenthesizeObjectLiteralAssignment*/ true);
        }

        /**
         * @remarks
         * This function is intended to be called from `transformVariableDeclarationToExpression` and should not be called otherwise.
         */
        function transformBindingPatternToExpression(node: BindingPattern, write: (node: Expression) => void) {
            switch (node.kind) {
                case SyntaxKind.ObjectBindingPattern:
                    return transformObjectBindingPatternToExpression(<ObjectBindingPattern>node, write);

                case SyntaxKind.ArrayBindingPattern:
                    return transformArrayBindingPatternToExpression(<ObjectBindingPattern>node, write);
            }
        }

        /**
         * @remarks
         * This function is intended to be called from `transformBindingPatternToExpression` and should not be called otherwise.
         */
        function transformObjectBindingPatternToExpression(node: ObjectBindingPattern, write: (node: Expression) => void) {
            let properties = mapNodes(node.elements, transformBindingElementToObjectLiteralElement);
            write(createObjectLiteralExpression(properties));
        }

        /**
         * @remarks
         * This function is intended to be called from `transformBindingPatternToExpression` and should not be called otherwise.
         */
        function transformArrayBindingPatternToExpression(node: ArrayBindingPattern, write: (node: Expression) => void) {
            let elements = mapNodes(node.elements, transformBindingElementToExpression);
            write(createArrayLiteralExpression(elements));
        }

        /**
         * @remarks
         * This function is intended to be called from `transformObjectBindingPatternToExpression` and should not be called otherwise.
         */
        function transformBindingElementToObjectLiteralElement(node: BindingElement, write: (node: ObjectLiteralElement) => void) {
            let propertyName = node.propertyName || <Identifier>node.name;
            let expr = mapNode(node, transformBindingElementToExpression);
            write(createPropertyAssignment(propertyName, expr));
        }

        /**
         * @remarks
         * This function is intended to be called from `transformArrayBindingPatternToExpression` or
         * `transformBindingElementToObjectLiteralElement` and should not be called otherwise.
         */
        function transformBindingElementToExpression(node: BindingElement, write: (node: Expression) => void) {
            transformBindingElementToExpressionWithParenthesisIfNeeded(node, write, /*parenthesizeObjectLiteralAssignment*/ false);
        }

        /**
         * @remarks
         * This function is intended to be called from either `transformVariableDeclarationToExpression` or
         * `transformBindingElementToExpression` and should not be called otherwise.
         */
        function transformBindingElementToExpressionWithParenthesisIfNeeded(node: BindingElement, write: (node: Expression) => void, parenthesizeObjectLiteralAssignment?: boolean) {
            let name = node.name;
            let expr = isBindingPattern(name)
                ? mapNode(name, transformBindingPatternToExpression)
                : getModuleMemberName(name);

            let initializer = visitNode(node.initializer, visitor, isExpressionNode);
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

        /**
         * @remarks
         * This function will be called any time a TypeScript namespace (ModuleDeclaration) is encountered.
         */
        function visitModuleDeclaration(node: ModuleDeclaration, write: (node: Statement) => void) {
            if (!shouldEmitModuleDeclaration(node)) {
                return;
            }

            let location = node;
            if (!isModuleMergedWithClass(node)) {
                write(createVariableStatement3(<Identifier>node.name, undefined, location, isTopLevelExport(node) ? NodeFlags.Export : undefined));
                location = undefined;
            }

            let statements: Statement[] = [];
            pipeNode(node.body, emitModuleBody, statements);

            let funcExpr = createFunctionExpression3([createParameter2(getGeneratedNameForNode(node))], createBlock(statements));
            let parenExpr = createParenthesizedExpression(funcExpr);
            let moduleMemberName = getModuleMemberName(node.name);
            let moduleStorageInitExpr = createAssignmentExpression(moduleMemberName, createObjectLiteralExpression([]));
            let moduleStorageExpr = createLogicalOrExpression(moduleMemberName, moduleStorageInitExpr);
            let moduleParam: Expression = moduleStorageExpr;
            if (isNamespaceLevelExport(node)) {
                moduleParam = createAssignmentExpression(cloneNode(node.name), moduleStorageExpr);
            }

            let callExpr = createCallExpression2(parenExpr, [moduleParam]);
            let callStmt = createExpressionStatement(callExpr, location, NodeFlags.GeneratedNamespace);
            callStmt.original = node;
            write(callStmt);
        }

        function emitModuleBody(node: ModuleBody, write: (node: Statement) => void): void {
            startLexicalEnvironment();
            if (isModuleBlock(node)) {
                pipeNodes(node.statements, emitModuleElement, write);
            }
            else {
                visitModuleDeclaration(node, write);
            }

            endLexicalEnvironment(write);
        }

        function emitModuleElement(node: Node, write: (node: Node) => void): void {
            if (node.flags & NodeFlags.Export) {
                visitorWorker(node, write);
            }
            else {
                visitor(node, write);
            }
        }

        function shouldEmitModuleDeclaration(node: ModuleDeclaration) {
            return isInstantiatedModule(node, compilerOptions.preserveConstEnums || compilerOptions.isolatedModules);
        }

        function isModuleMergedWithClass(node: ModuleDeclaration) {
            return !!(resolver.getNodeCheckFlags(node) & NodeCheckFlags.LexicalModuleMergesWithClass);
        }

        function substituteExpressionIdentifier(node: Identifier): LeftHandSideExpression {
            let container = resolver.getReferencedExportContainer(node);
            if (isModuleDeclaration(container)) {
                return createPropertyAccessExpression2(getGeneratedNameForNode(container), node, node);
            }

            return savedSubstituteExpressionIdentifier ? savedSubstituteExpressionIdentifier(node) : node;
        }

        function visitImportEqualsDeclaration(node: ImportEqualsDeclaration, write: (node: Statement) => void): void {
            Debug.assert(!isExternalModuleImportEqualsDeclaration(node));

            if (!shouldEmitImportEqualsDeclaration(node)) {
                return;
            }

            let name = getDeclarationName(node);
            let moduleReference = convertEntityNameToExpression(visitNode(<EntityName>node.moduleReference, visitor, isEntityName));
            if (isNamespaceLevelExport(node)) {
                emitNamespaceExport(node.name, moduleReference, write);
            }
            else {
                let exportFlags = isTopLevelExport(node) ? NodeFlags.Export : undefined;
                write(createVariableStatement3(name, moduleReference));
            }
        }

        function shouldEmitImportEqualsDeclaration(node: ImportEqualsDeclaration) {
            // preserve old compiler's behavior: emit 'var' for import declaration (even if we do not consider them referenced) when
            // - current file is not external module
            // - import declaration is top level and target is value imported by entity name
            return resolver.isReferencedAliasDeclaration(node)
                || (!isExternalModule(currentSourceFile) && resolver.isTopLevelValueImportEqualsWithEntityName(node));
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

        function getPropertyName(container: ClassElement): PropertyName {
            let name = container.name;
            if (isComputedPropertyName(name)) {
                let expression = visitNode(name.expression, visitor, isExpressionNode);
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

        /**
         * @remarks
         * This function will be called any time a TypeScript enum is encountered.
         */
        function visitEnumDeclaration(node: EnumDeclaration, write: (node: Statement) => void) {
            if (!shouldEmitEnumDeclaration(node)) {
                // Const enum declarations may be elided.
                return;
            }

            let localName = getGeneratedNameForNode(node);

            let location: TextRange = node;
            if (!isNamespaceLevelExport(node)) {
                write(createVariableStatement3(node.name, /*initializer*/ undefined, location, isTopLevelExport(node) ? NodeFlags.Export : undefined));
                location = undefined;
            }

            let enumStatements: Statement[] = [];
            pipeNodes(node.members, emitEnumMember, enumStatements);

            let enumBody = createBlock(enumStatements);
            let localNameParam = createParameter2(localName);
            let enumDecl = createFunctionExpression2(/*name*/ undefined, [localNameParam], enumBody);
            let parenExpr = createParenthesizedExpression(enumDecl);
            let moduleMemberName = getModuleMemberName(node.name);
            let enumStorageObjectExpr = createObjectLiteralExpression([]);
            let enumStorageInitExpr = createAssignmentExpression(moduleMemberName, enumStorageObjectExpr);
            let enumStorageExpr = createLogicalOrExpression(moduleMemberName, enumStorageInitExpr);
            let callExpr = createCallExpression2(parenExpr, [enumStorageExpr]);
            write(createExpressionStatement(callExpr, location));

            if (isNamespaceLevelExport(node)) {
                write(createVariableStatement3(node.name, moduleMemberName));
            }
        }

        function emitEnumMember(node: EnumMember, write: (node: Statement) => void) {
            let container = <EnumDeclaration>getParentNode();
            let localName = getGeneratedNameForNode(container);
            let enumNameExpr = getExpressionForPropertyName(node);
            let enumValueExpr = getEnumMemberDeclarationValue(node);
            let enumNameElemExpr = createElementAccessExpression2(localName, enumNameExpr);
            let enumValueAssignExpr = createAssignmentExpression(enumNameElemExpr, enumValueExpr);
            let enumValueElemExpr = createElementAccessExpression2(localName, enumValueAssignExpr);
            let enumNameAssignExpr = createAssignmentExpression(enumValueElemExpr, enumNameExpr);
            write(createExpressionStatement(enumNameAssignExpr, /*location*/ node));
        }

        function getEnumMemberDeclarationValue(member: EnumMember): Expression {
            let value = resolver.getConstantValue(member);
            if (value !== undefined) {
                return createNumericLiteral2(value);
            }
            else if (member.initializer) {
                return visitNode(member.initializer, visitor, isExpressionNode);
            }
            else {
                return createVoidZeroExpression();
            }
        }

        function shouldEmitEnumDeclaration(node: EnumDeclaration) {
            return isConst(node) || compilerOptions.preserveConstEnums || compilerOptions.isolatedModules;
        }

        /**
         * @remarks
         * This function will be called any time a TypeScript await expression is encountered.
         */
        function visitAwaitExpression(node: AwaitExpression, write: (node: Expression) => void) {
            let expression = visitNode(node.expression, visitor, isExpressionNode);
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

        function emitNamespaceExport(exportName: Identifier, exportValue: Expression, write: (node: Statement) => void): void {
            let qualifiedName = getModuleMemberName(exportName);
            write(createExpressionStatement(createAssignmentExpression(qualifiedName, exportValue)));
        }

        function emitDefaultExport(exportValue: Expression, write: (node: Statement) => void): void {
            let exportDefault = createExportDefaultStatement(exportValue);
            write(exportDefault);
        }

        function emitDecoratorsOfConstructor(node: ClassLikeDeclaration, write: (node: Statement) => void) {
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
            pipeNodes(decorators, emitDecoratorExpression, decoratorExpressions);
            pipeNode(constructor, emitDecoratorsOfParameters, decoratorExpressions);
            pipeNode(node, emitDecoratorTypeMetadata, decoratorExpressions);

            let name = getDeclarationName(node);
            let decorateCall = createDecorateHelperCall(decoratorExpressions, name);
            write(createExpressionStatement(decorateCall));
        }

        function emitDecoratorsOfMember(member: ClassElement, write: (node: Statement) => void) {
            let container = <ClassLikeDeclaration>getParentNode();
            let decorators: Decorator[];
            let method: FunctionLikeDeclaration;

            // skip an accessor declaration if it is not the first accessor
            if (isAccessor(member) && member.body) {
                let accessors = getAllAccessorDeclarations(container.members, member);
                if (member !== accessors.firstAccessor) {
                    return;
                }

                // get the decorators from the first accessor with decorators
                decorators = accessors.firstAccessor.decorators;
                if (!decorators && accessors.secondAccessor) {
                    decorators = accessors.secondAccessor.decorators;
                }

                // we only decorate parameters of the set accessor
                method = accessors.setAccessor;
            }
            else {
                decorators = member.decorators;

                // we only decorate the parameters here if this is a method
                if (isMethodDeclaration(member)) {
                    method = member;
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
            pipeNodes(decorators, emitDecoratorExpression, decoratorExpressions);
            pipeNode(method, emitDecoratorsOfParameters, decoratorExpressions);
            pipeNode(member, emitDecoratorTypeMetadata, decoratorExpressions);

            let prefix = getClassMemberPrefix(container, member);
            let memberName = getExpressionForPropertyName(member);
            if (isPropertyDeclaration(member)) {
                let decorateCall = createDecorateHelperCall(decoratorExpressions, prefix, memberName);
                write(createExpressionStatement(decorateCall));
            }
            else {
                let getOwnPropertyDescriptorCall = createGetOwnPropertyDescriptorCall(prefix, memberName);
                let decorateCall = createDecorateHelperCall(decoratorExpressions, prefix, memberName, getOwnPropertyDescriptorCall);
                let definePropertyCall = createDefinePropertyCall(prefix, memberName, decorateCall);
                write(createExpressionStatement(definePropertyCall));
            }
        }

        function emitDecoratorsOfParameters(node: FunctionLikeDeclaration, write: (node: Expression) => void) {
            for (var i = 0; i < node.parameters.length; i++) {
                pipeNode(node.parameters[i], (parameter, write) => emitDecoratorsOfParameter(parameter, write, i), write);
            }
        }

        function emitDecoratorsOfParameter(node: ParameterDeclaration, write: (node: Expression) => void, parameterOffset: number) {
            pipeNodes(node.decorators, (decorator, write) => emitDecoratorOfParameter(decorator, write, parameterOffset), write);
        }

        function emitDecoratorOfParameter(node: Decorator, write: (node: Expression) => void, parameterOffset: number) {
            let expression = visitNode(node.expression, visitor, isExpressionNode);
            let paramCall = createParamHelperCall(parameterOffset, expression);
            write(paramCall);
        }

        function emitDecoratorExpression(node: Decorator, write: (node: Expression) => void) {
            pipeNode(node.expression, visitor, write);
        }

        function emitDecoratorTypeMetadata(node: Declaration, write: (node: Expression) => void) {
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
            if (compilerOptions.emitDecoratorMetadata) {
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
            }
            return false;
        }

        function shouldAppendReturnTypeMetadata(node: Declaration): boolean {
            if (compilerOptions.emitDecoratorMetadata) {
                // This method determines whether to emit the "design:returntype" metadata based on the node's kind.
                // The caller should have already tested whether the node has decorators and whether the emitDecoratorMetadata
                // compiler option is set.
                switch (node.kind) {
                    case SyntaxKind.MethodDeclaration:
                        return true;
                }
            }
            return false;
        }

        function shouldAppendParamTypesMetadata(node: Declaration): boolean {
            if (compilerOptions.emitDecoratorMetadata) {
                // This method determines whether to emit the "design:paramtypes" metadata based on the node's kind.
                // The caller should have already tested whether the node has decorators and whether the emitDecoratorMetadata
                // compiler option is set.
                switch (node.kind) {
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.SetAccessor:
                        return true;
                }
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

        function getModuleMemberName(name: Identifier): Expression {
            name = makeSynthesized(name);
            if (getCombinedNodeFlags(transformer) & NodeFlags.Export) {
                let container = getContainingModuleName();
                let moduleName = createPropertyAccessExpression2(container, name);
                return moduleName;
            }
            return name;
        }

        function shouldEmitFunctionLikeDeclaration(node: FunctionLikeDeclaration) {
            return !(!node.body || node.flags & (NodeFlags.Abstract | NodeFlags.Ambient));
        }

        function createSynthesizedSuperCall() {
            let callExpr = createCallExpression2(createSuperKeyword(), [createSpreadElementExpression(createIdentifier("args"))]);
            return startOnNewLine(createExpressionStatement(callExpr, /*location*/ undefined, NodeFlags.GeneratedSuper));
        }
    }
}