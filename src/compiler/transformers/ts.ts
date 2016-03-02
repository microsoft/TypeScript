/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />
/// <reference path="./destructuring.ts" />

/*@internal*/
namespace ts {
    type SuperContainer = ClassDeclaration | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | ConstructorDeclaration;

    const enum TypeScriptSubstitutionFlags {
        /** Enables substitutions for decorated classes. */
        DecoratedClasses = 1 << 0,
        /** Enables substitutions for namespace exports. */
        NamespaceExports = 1 << 1,
        /** Enables substitutions for async methods with `super` calls. */
        AsyncMethodsWithSuper = 1 << 2,
    }

    export function transformTypeScript(context: TransformationContext) {
        const {
            setNodeEmitFlags,
            startLexicalEnvironment,
            endLexicalEnvironment,
            hoistVariableDeclaration,
        } = context;

        const resolver = context.getEmitResolver();
        const compilerOptions = context.getCompilerOptions();
        const languageVersion = getEmitScriptTarget(compilerOptions);

        // Save the previous transformation hooks.
        const previousOnBeforeEmitNode = context.onBeforeEmitNode;
        const previousOnAfterEmitNode = context.onAfterEmitNode;
        const previousExpressionSubstitution = context.expressionSubstitution;

        // Set new transformation hooks.
        context.onBeforeEmitNode = onBeforeEmitNode;
        context.onAfterEmitNode = onAfterEmitNode;
        context.expressionSubstitution = substituteExpression;

        // These variables contain state that changes as we descend into the tree.
        let currentSourceFile: SourceFile;
        let currentNamespace: ModuleDeclaration;
        let currentNamespaceLocalName: Identifier;
        let currentScope: SourceFile | Block | ModuleBlock | CaseBlock;
        let currentParent: Node;
        let currentNode: Node;

        /**
         * Keeps track of whether expression substitution has been enabled for specific edge cases.
         * They are persisted between each SourceFile transformation and should not be reset.
         */
        let enabledSubstitutions: TypeScriptSubstitutionFlags;

        /**
         * A map that keeps track of aliases created for classes with decorators to avoid issues
         * with the double-binding behavior of classes.
         */
        let decoratedClassAliases: Map<Identifier>;

        /**
         * A map that keeps track of currently active aliases defined in `decoratedClassAliases`
         * when just-in-time substitution occurs while printing an expression identifier.
         */
        let currentDecoratedClassAliases: Map<Identifier>;

        /**
         * Keeps track of how deeply nested we are within any containing namespaces
         * when performing just-in-time substitution while printing an expression identifier.
         * If the nest level is greater than zero, then we are performing a substitution
         * inside of a namespace and we should perform the more costly checks to determine
         * whether the identifier points to an exported declaration.
         */
        let namespaceNestLevel: number;

        /**
         * This array keeps track of containers where `super` is valid, for use with
         * just-in-time substitution for `super` expressions inside of async methods.
         */
        let superContainerStack: SuperContainer[];

        return transformSourceFile;

        /**
         * Transform TypeScript-specific syntax in a SourceFile.
         *
         * @param node A SourceFile node.
         */
        function transformSourceFile(node: SourceFile) {
            currentSourceFile = node;
            node = visitEachChild(node, visitor, context);
            setNodeEmitFlags(node, NodeEmitFlags.EmitEmitHelpers);
            return node;
        }

        /**
         * Visits a node, saving and restoring state variables on the stack.
         *
         * @param node The node to visit.
         */
        function visitWithStack(node: Node, visitor: (node: Node) => Node): Node {
            // Save state
            const savedCurrentNamespace = currentNamespace;
            const savedCurrentScope = currentScope;
            const savedCurrentParent = currentParent;
            const savedCurrentNode = currentNode;

            // Handle state changes before visiting a node.
            onBeforeVisitNode(node);

            node = visitor(node);

            // Restore state
            currentNamespace = savedCurrentNamespace;
            currentScope = savedCurrentScope;
            currentParent = savedCurrentParent;
            currentNode = savedCurrentNode;

            return node;
        }

        /**
         * General-purpose node visitor.
         *
         * @param node The node to visit.
         */
        function visitor(node: Node): Node {
            return visitWithStack(node, visitorWorker);
        }

        /**
         * Visits and possibly transforms any node.
         *
         * @param node The node to visit.
         */
        function visitorWorker(node: Node): Node {
            if (node.transformFlags & TransformFlags.TypeScript) {
                // This node is explicitly marked as TypeScript, so we should transform the node.
                node = visitTypeScript(node);
            }
            else if (node.transformFlags & TransformFlags.ContainsTypeScript) {
                // This node contains TypeScript, so we should visit its children.
                node = visitEachChild(node, visitor, context);
            }

            return node;
        }

        /**
         * Specialized visitor that visits the immediate children of a namespace.
         *
         * @param node The node to visit.
         */
        function namespaceElementVisitor(node: Node): Node {
            return visitWithStack(node, namespaceElementVisitorWorker);
        }

        /**
         * Specialized visitor that visits the immediate children of a namespace.
         *
         * @param node The node to visit.
         */
        function namespaceElementVisitorWorker(node: Node): Node {
            if (node.transformFlags & TransformFlags.TypeScript || isExported(node)) {
                // This node is explicitly marked as TypeScript, or is exported at the namespace
                // level, so we should transform the node.
                node = visitTypeScript(node);
            }
            else if (node.transformFlags & TransformFlags.ContainsTypeScript) {
                // This node contains TypeScript, so we should visit its children.
                node = visitEachChild(node, visitor, context);
            }

            return node;
        }

        /**
         * Specialized visitor that visits the immediate children of a class with TypeScript syntax.
         *
         * @param node The node to visit.
         */
        function classElementVisitor(node: Node) {
            return visitWithStack(node, classElementVisitorWorker);
        }

        /**
         * Specialized visitor that visits the immediate children of a class with TypeScript syntax.
         *
         * @param node The node to visit.
         */
        function classElementVisitorWorker(node: Node) {
            switch (node.kind) {
                case SyntaxKind.Constructor:
                    // TypeScript constructors are transformed in `transformClassDeclaration`.
                    // We elide them here as `visitorWorker` checks transform flags, which could
                    // erronously include an ES6 constructor without TypeScript syntax.
                    return undefined;

                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.IndexSignature:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.MethodDeclaration:
                    // Fallback to the default visit behavior.
                    return visitorWorker(node);

                default:
                    Debug.fail("Unexpected node.");
                    break;
            }
        }

        /**
         * Branching visitor, visits a TypeScript syntax node.
         *
         * @param node The node to visit.
         */
        function visitTypeScript(node: Node): Node {
            if (node.flags & NodeFlags.Ambient) {
                // TypeScript ambient declarations are elided.
                return undefined;
            }

            switch (node.kind) {
                case SyntaxKind.ExportKeyword:
                case SyntaxKind.DefaultKeyword:
                    // ES6 export and default modifiers are elided when inside a namespace.
                    return currentNamespace ? undefined : node;

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
                case SyntaxKind.StringLiteralType:
                case SyntaxKind.ThisType:
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

                case SyntaxKind.Constructor:
                    // TypeScript constructors are transformed in `transformClassDeclaration`.
                    return undefined;

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
                    return visitClassDeclaration(<ClassDeclaration>node);

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
                    return visitClassExpression(<ClassExpression>node);

                case SyntaxKind.HeritageClause:
                    // This is a heritage clause with TypeScript syntax extensions.
                    //
                    // TypeScript heritage clause extensions include:
                    // - `implements` clause
                    return visitHeritageClause(<HeritageClause>node);

                case SyntaxKind.ExpressionWithTypeArguments:
                    // TypeScript supports type arguments on an expression in an `extends` heritage clause.
                    return visitExpressionWithTypeArguments(<ExpressionWithTypeArguments>node);

                case SyntaxKind.MethodDeclaration:
                    // TypeScript method declarations may be 'async', and may have decorators, modifiers
                    // or type annotations.
                    return visitMethodDeclaration(<MethodDeclaration>node);

                case SyntaxKind.GetAccessor:
                    // Get Accessors can have TypeScript modifiers, decorators, and type annotations.
                    return visitGetAccessor(<GetAccessorDeclaration>node);

                case SyntaxKind.SetAccessor:
                    // Set Accessors can have TypeScript modifiers, decorators, and type annotations.
                    return visitSetAccessor(<SetAccessorDeclaration>node);

                case SyntaxKind.FunctionDeclaration:
                    // TypeScript function declarations may be 'async'
                    return visitFunctionDeclaration(<FunctionDeclaration>node);

                case SyntaxKind.FunctionExpression:
                    // TypeScript function expressions may be 'async'
                    return visitFunctionExpression(<FunctionExpression>node);

                case SyntaxKind.ArrowFunction:
                    // TypeScript arrow functions may be 'async'
                    return visitArrowFunction(<ArrowFunction>node);

                case SyntaxKind.Parameter:
                    // This is a parameter declaration with TypeScript syntax extensions.
                    //
                    // TypeScript parameter declaration syntax extensions include:
                    // - decorators
                    // - accessibility modifiers
                    // - the question mark (?) token for optional parameters
                    // - type annotations
                    return visitParameter(<ParameterDeclaration>node);

                case SyntaxKind.ParenthesizedExpression:
                    // ParenthesizedExpressions are TypeScript if their expression is a
                    // TypeAssertion or AsExpression
                    return visitParenthesizedExpression(<ParenthesizedExpression>node);

                case SyntaxKind.TypeAssertionExpression:
                case SyntaxKind.AsExpression:
                    // TypeScript type assertions are removed, but their subtrees are preserved.
                    return visitAssertionExpression(<AssertionExpression>node);

                case SyntaxKind.EnumDeclaration:
                    // TypeScript enum declarations do not exist in ES6 and must be rewritten.
                    return visitEnumDeclaration(<EnumDeclaration>node);

                case SyntaxKind.AwaitExpression:
                    // TypeScript 'await' expressions must be transformed.
                    return visitAwaitExpression(<AwaitExpression>node);

                case SyntaxKind.VariableStatement:
                    // TypeScript namespace exports for variable statements must be transformed.
                    return visitVariableStatement(<VariableStatement>node);

                case SyntaxKind.ModuleDeclaration:
                    // TypeScript namespace declarations must be transformed.
                    return visitModuleDeclaration(<ModuleDeclaration>node);

                case SyntaxKind.ImportEqualsDeclaration:
                    // TypeScript namespace or external module import.
                    return visitImportEqualsDeclaration(<ImportEqualsDeclaration>node);

                default:
                    Debug.fail(`Unexpected node kind: ${formatSyntaxKind(node.kind)}.`);
                    break;
            }
        }

        /**
         * Performs actions that should always occur immediately before visiting a node.
         *
         * @param node The node to visit.
         */
        function onBeforeVisitNode(node: Node) {
            currentParent = currentNode;
            currentNode = node;

            switch (node.kind) {
                case SyntaxKind.SourceFile:
                case SyntaxKind.CaseBlock:
                case SyntaxKind.ModuleBlock:
                case SyntaxKind.Block:
                    currentScope = <SourceFile | CaseBlock | ModuleBlock | Block>node;
                    break;
            }
        }

        /**
         * Transforms a class declaration with TypeScript syntax into compatible ES6.
         *
         * This function will only be called when one of the following conditions are met:
         * - The class has decorators.
         * - The class has property declarations with initializers.
         * - The class contains a constructor that contains parameters with accessibility modifiers.
         * - The class is an export in a TypeScript namespace.
         *
         * @param node The node to transform.
         */
        function visitClassDeclaration(node: ClassDeclaration): NodeArrayNode<Statement> {
            const staticProperties = getInitializedProperties(node, /*isStatic*/ true);
            const hasExtendsClause = getClassExtendsHeritageClauseElement(node) !== undefined;

            // emit name if
            // - node has a name
            // - node has static initializers
            //
            let name = node.name;
            if (!name && staticProperties.length > 0) {
                name = getGeneratedNameForNode(node);
            }

            let decoratedClassAlias: Identifier;
            const statements: Statement[] = [];
            if (!node.decorators) {
                //  ${modifiers} class ${name} ${heritageClauses} {
                //      ${members}
                //  }
                addNode(statements,
                    setOriginalNode(
                        createClassDeclaration(
                            visitNodes(node.modifiers, visitor, isModifier),
                            name,
                            visitNodes(node.heritageClauses, visitor, isHeritageClause),
                            transformClassMembers(node, hasExtendsClause),
                            /*location*/ node
                        ),
                        node
                    )
                );
            }
            else {
                decoratedClassAlias = addClassDeclarationHeadWithDecorators(statements, node, name, hasExtendsClause);
            }

            // Emit static property assignment. Because classDeclaration is lexically evaluated,
            // it is safe to emit static property assignment after classDeclaration
            // From ES6 specification:
            //      HasLexicalDeclaration (N) : Determines if the argument identifier has a binding in this environment record that was created using
            //                                  a lexical declaration such as a LexicalDeclaration or a ClassDeclaration.
            addNodes(statements, generateInitializedPropertyStatements(node, staticProperties, name));

            // Write any decorators of the node.
            addNodes(statements, generateClassElementDecorationStatements(node, /*isStatic*/ false));
            addNodes(statements, generateClassElementDecorationStatements(node, /*isStatic*/ true));
            addNode(statements, generateConstructorDecorationStatement(node, decoratedClassAlias));

            // If the class is exported as part of a TypeScript namespace, emit the namespace export.
            // Otherwise, if the class was exported at the top level and was decorated, emit an export
            // declaration or export default for the class.
            if (isNamespaceExport(node)) {
                addNode(statements, createNamespaceExport(name, name));
            }
            else if (node.decorators) {
                if (isDefaultExternalModuleExport(node)) {
                    addNode(statements, createExportDefault(name));
                }
                else if (isNamedExternalModuleExport(node)) {
                    addNode(statements, createExternalModuleExport(name));
                }
            }

            return createNodeArrayNode(statements);
        }

        /**
         * Transforms a decorated class declaration and appends the resulting statements. If
         * the class requires an alias to avoid issues with double-binding, the alias is returned.
         *
         * @param node A ClassDeclaration node.
         * @param name The name of the class.
         * @param hasExtendsClause A value indicating whether
         */
        function addClassDeclarationHeadWithDecorators(statements: Statement[], node: ClassDeclaration, name: Identifier, hasExtendsClause: boolean) {
            // When we emit an ES6 class that has a class decorator, we must tailor the
            // emit to certain specific cases.
            //
            // In the simplest case, we emit the class declaration as a let declaration, and
            // evaluate decorators after the close of the class body:
            //
            //  [Example 1]
            //  ---------------------------------------------------------------------
            //  TypeScript                      | Javascript
            //  ---------------------------------------------------------------------
            //  @dec                            | let C = class C {
            //  class C {                       | }
            //  }                               | C = __decorate([dec], C);
            //  ---------------------------------------------------------------------
            //  @dec                            | let C = class C {
            //  export class C {                | }
            //  }                               | C = __decorate([dec], C);
            //                                  | export { C };
            //  ---------------------------------------------------------------------
            //
            // If a class declaration contains a reference to itself *inside* of the class body,
            // this introduces two bindings to the class: One outside of the class body, and one
            // inside of the class body. If we apply decorators as in [Example 1] above, there
            // is the possibility that the decorator `dec` will return a new value for the
            // constructor, which would result in the binding inside of the class no longer
            // pointing to the same reference as the binding outside of the class.
            //
            // As a result, we must instead rewrite all references to the class *inside* of the
            // class body to instead point to a local temporary alias for the class:
            //
            //  [Example 2]
            //  ---------------------------------------------------------------------
            //  TypeScript                      | Javascript
            //  ---------------------------------------------------------------------
            //  @dec                            | let C_1;
            //  class C {                       | let C = C_1 = class C {
            //    static x() { return C.y; }    |   static x() { return C_1.y; }
            //    static y = 1;                 | }
            //  }                               | C.y = 1;
            //                                  | C = C_1 = __decorate([dec], C);
            //  ---------------------------------------------------------------------
            //  @dec                            | let C_1;
            //  export class C {                | let C = C_1 = class C {
            //    static x() { return C.y; }    |   static x() { return C_1.y; }
            //    static y = 1;                 | }
            //  }                               | C.y = 1;
            //                                  | C = C_1 = __decorate([dec], C);
            //                                  | export { C };
            //  ---------------------------------------------------------------------
            //
            // If a class declaration is the default export of a module, we instead emit
            // the export after the decorated declaration:
            //
            //  [Example 3]
            //  ---------------------------------------------------------------------
            //  TypeScript                      | Javascript
            //  ---------------------------------------------------------------------
            //  @dec                            | let default_1 = class {
            //  export default class {          | }
            //  }                               | default_1 = __decorate([dec], default_1);
            //                                  | export default default_1;
            //  ---------------------------------------------------------------------
            //  @dec                            | let C = class C {
            //  export default class C {        | }
            //  }                               | C = __decorate([dec], C);
            //                                  | export default C;
            //  ---------------------------------------------------------------------
            //
            // If the class declaration is the default export and a reference to itself
            // inside of the class body, we must emit both an alias for the class *and*
            // move the export after the declaration:
            //
            //  [Example 4]
            //  ---------------------------------------------------------------------
            //  TypeScript                      | Javascript
            //  ---------------------------------------------------------------------
            //  @dec                            | let C_1;
            //  export default class C {        | let C = C_1 = class C {
            //    static x() { return C.y; }    |   static x() { return C_1.y; }
            //    static y = 1;                 | }
            //  }                               | C.y = 1;
            //                                  | C = C_1 = __decorate([dec], C);
            //                                  | export default C;
            //  ---------------------------------------------------------------------
            //

            //  ... = class ${name} ${heritageClauses} {
            //      ${members}
            //  }
            let classExpression: Expression = setOriginalNode(
                createClassExpression(
                    name,
                    visitNodes(node.heritageClauses, visitor, isHeritageClause),
                    transformClassMembers(node, hasExtendsClause),
                    /*location*/ node
                ),
                node
            );

            // Record an alias to avoid class double-binding.
            let decoratedClassAlias: Identifier;
            if (resolver.getNodeCheckFlags(getOriginalNode(node)) & NodeCheckFlags.DecoratedClassWithSelfReference) {
                enableExpressionSubstitutionForDecoratedClasses();
                decoratedClassAlias = createUniqueName(node.name && !isGeneratedIdentifier(node.name) ? node.name.text : "default");
                decoratedClassAliases[getOriginalNodeId(node)] = decoratedClassAlias;

                // We emit the class alias as a `let` declaration here so that it has the same
                // TDZ as the class.

                //  let ${decoratedClassAlias};
                addNode(statements,
                    createVariableStatement(
                        /*modifiers*/ undefined,
                        createVariableDeclarationList([
                            createVariableDeclaration(decoratedClassAlias)
                        ],
                        /*location*/ undefined,
                        NodeFlags.Let)
                    )
                );

                //  ${decoratedClassAlias} = ${classExpression}
                classExpression = createAssignment(
                    decoratedClassAlias,
                    classExpression,
                    /*location*/ node);
            }

            //  let ${name} = ${classExpression};
            addNode(statements,
                createVariableStatement(
                    /*modifiers*/ undefined,
                    createVariableDeclarationList([
                        createVariableDeclaration(
                            name,
                            classExpression
                        )
                    ],
                    /*location*/ undefined,
                    NodeFlags.Let)
                )
            );

            return decoratedClassAlias;
        }

        /**
         * Transforms a class expression with TypeScript syntax into compatible ES6.
         *
         * This function will only be called when one of the following conditions are met:
         * - The class has property declarations with initializers.
         * - The class contains a constructor that contains parameters with accessibility modifiers.
         *
         * @param node The node to transform.
         */
        function visitClassExpression(node: ClassExpression): Expression {
            const staticProperties = getInitializedProperties(node, /*isStatic*/ true);
            const heritageClauses = visitNodes(node.heritageClauses, visitor, isHeritageClause);
            const members = transformClassMembers(node, heritageClauses !== undefined);

            // emit name if
            // - node has a name
            // - node has static initializers
            //
            let name = node.name;
            if (!name && staticProperties.length > 0) {
                name = getGeneratedNameForNode(node);
            }

            const classExpression = setOriginalNode(
                createClassExpression(
                    name,
                    heritageClauses,
                    members,
                    /*location*/ node
                ),
                node
            );

            if (staticProperties.length > 0) {
                const expressions: Expression[] = [];
                const temp = createTempVariable();
                hoistVariableDeclaration(temp);
                addNode(expressions, createAssignment(temp, classExpression));
                addNodes(expressions, generateInitializedPropertyExpressions(node, staticProperties, temp));
                addNode(expressions, temp);
                return inlineExpressions(expressions);
            }

            return classExpression;
        }

        /**
         * Transforms the members of a class.
         *
         * @param node The current class.
         * @param hasExtendsClause A value indicating whether the class has an extends clause.
         */
        function transformClassMembers(node: ClassDeclaration | ClassExpression, hasExtendsClause: boolean) {
            const members: ClassElement[] = [];
            addNode(members, transformConstructor(node, hasExtendsClause));
            addNodes(members, visitNodes(node.members, classElementVisitor, isClassElement));
            return createNodeArray(members, /*location*/ node.members);
        }

        /**
         * Transforms (or creates) a constructor for a class.
         *
         * @param node The current class.
         * @param hasExtendsClause A value indicating whether the class has an extends clause.
         */
        function transformConstructor(node: ClassDeclaration | ClassExpression, hasExtendsClause: boolean) {
            // Check if we have property assignment inside class declaration.
            // If there is a property assignment, we need to emit constructor whether users define it or not
            // If there is no property assignment, we can omit constructor if users do not define it
            const hasInstancePropertyWithInitializer = forEach(node.members, isInstanceInitializedProperty);
            const hasParameterPropertyAssignments = node.transformFlags & TransformFlags.ContainsParameterPropertyAssignments;
            const constructor = getFirstConstructorWithBody(node);

            // If the class does not contain nodes that require a synthesized constructor,
            // accept the current constructor if it exists.
            if (!hasInstancePropertyWithInitializer && !hasParameterPropertyAssignments) {
                return visitEachChild(constructor, visitor, context);
            }

            const parameters = transformConstructorParameters(constructor, hasExtendsClause);
            const body = transformConstructorBody(node, constructor, hasExtendsClause, parameters);

            //  constructor(${parameters}) {
            //      ${body}
            //  }
            return startOnNewLine(
                setOriginalNode(
                    createConstructor(
                        parameters,
                        body,
                        /*location*/ constructor
                    ),
                    constructor
                )
            );
        }

        /**
         * Transforms (or creates) the parameters for the constructor of a class with
         * parameter property assignments or instance property initializers.
         *
         * @param constructor The constructor declaration.
         * @param hasExtendsClause A value indicating whether the class has an extends clause.
         */
        function transformConstructorParameters(constructor: ConstructorDeclaration, hasExtendsClause: boolean) {
            return constructor
                ? visitNodes(constructor.parameters, visitor, isParameter)
                : hasExtendsClause ? [createRestParameter(createUniqueName("args"))] : [];
        }

        /**
         * Transforms (or creates) a constructor body for a class with parameter property
         * assignments or instance property initializers.
         *
         * @param node The current class.
         * @param constructor The current class constructor.
         * @param hasExtendsClause A value indicating whether the class has an extends clause.
         * @param parameters The transformed parameters for the constructor.
         */
        function transformConstructorBody(node: ClassExpression | ClassDeclaration, constructor: ConstructorDeclaration, hasExtendsClause: boolean, parameters: ParameterDeclaration[]) {
            let hasSuperCall = false;
            const statements: Statement[] = [];

            // The body of a constructor is a new lexical environment
            startLexicalEnvironment();

            if (constructor) {
                const superCall = visitNode(findInitialSuperCall(constructor), visitor, isStatement);
                if (superCall) {
                    // Adds the existing super call as the first line of the constructor.
                    addNode(statements, superCall);
                    hasSuperCall = true;
                }

                // Add parameters with property assignments. Transforms this:
                //
                //  constructor (public x, public y) {
                //  }
                //
                // Into this:
                //
                //  constructor (x, y) {
                //      this.x = x;
                //      this.y = y;
                //  }
                //
                const propertyAssignments = getParametersWithPropertyAssignments(constructor);
                addNodes(statements, map(propertyAssignments, transformParameterWithPropertyAssignment));
            }
            else if (hasExtendsClause) {
                Debug.assert(parameters.length === 1 && isIdentifier(parameters[0].name));

                // Add a synthetic `super` call:
                //
                //  super(...args);
                //
                addNode(statements,
                    createStatement(
                        createCall(
                            createSuper(),
                            [createSpread(<Identifier>parameters[0].name)]
                        )
                    )
                );
            }

            // Add the property initializers. Transforms this:
            //
            //  public x = 1;
            //
            // Into this:
            //
            //  constructor() {
            //      this.x = 1;
            //  }
            //
            const properties = getInitializedProperties(node, /*isStatic*/ false);
            addNodes(statements, generateInitializedPropertyStatements(node, properties, createThis()));

            if (constructor) {
                // The class already had a constructor, so we should add the existing statements, skipping the initial super call.
                addNodes(statements, visitNodes(constructor.body.statements, visitor, isStatement, hasSuperCall ? 1 : 0));
            }

            // End the lexical environment.
            addNodes(statements, endLexicalEnvironment());
            return setMultiLine(
                createBlock(statements, constructor ? constructor.body : undefined),
                true
            );
        }

        /**
         * Finds the initial super-call for a constructor.
         *
         * @param ctor The constructor node.
         */
        function findInitialSuperCall(ctor: ConstructorDeclaration): ExpressionStatement {
            if (ctor.body) {
                const statements = ctor.body.statements;
                const statement = firstOrUndefined(statements);
                if (statement && statement.kind === SyntaxKind.ExpressionStatement) {
                    const expression = (<ExpressionStatement>statement).expression;
                    if (expression.kind === SyntaxKind.CallExpression) {
                        if ((<CallExpression>expression).expression.kind === SyntaxKind.SuperKeyword) {
                            return <ExpressionStatement>statement;
                        }
                    }
                }
            }

            return undefined;
        }

        /**
         * Gets all parameters of a constructor that should be transformed into property assignments.
         *
         * @param node The constructor node.
         */
        function getParametersWithPropertyAssignments(node: ConstructorDeclaration): ParameterDeclaration[] {
            return filter(node.parameters, isParameterWithPropertyAssignment);
        }

        /**
         * Determines whether a parameter should be transformed into a property assignment.
         *
         * @param parameter The parameter node.
         */
        function isParameterWithPropertyAssignment(parameter: ParameterDeclaration) {
            return parameter.flags & NodeFlags.AccessibilityModifier
                && isIdentifier(parameter.name);
        }

        /**
         * Transforms a parameter into a property assignment statement.
         *
         * @param node The parameter declaration.
         */
        function transformParameterWithPropertyAssignment(node: ParameterDeclaration) {
            Debug.assert(isIdentifier(node.name));

            const name = cloneNode(<Identifier>node.name);
            return startOnNewLine(
                createStatement(
                    createAssignment(
                        createPropertyAccess(createThis(), name),
                        name
                    )
                )
            );
        }

        /**
         * Gets all property declarations with initializers on either the static or instance side of a class.
         *
         * @param node The class node.
         * @param isStatic A value indicating whether to get properties from the static or instance side of the class.
         */
        function getInitializedProperties(node: ClassExpression | ClassDeclaration, isStatic: boolean): PropertyDeclaration[] {
            return filter(node.members, isStatic ? isStaticInitializedProperty : isInstanceInitializedProperty);
        }

        /**
         * Gets a value indicating whether a class element is a static property declaration with an initializer.
         *
         * @param member The class element node.
         */
        function isStaticInitializedProperty(member: ClassElement): member is PropertyDeclaration {
            return isInitializedProperty(member, /*isStatic*/ true);
        }

        /**
         * Gets a value indicating whether a class element is an instance property declaration with an initializer.
         *
         * @param member The class element node.
         */
        function isInstanceInitializedProperty(member: ClassElement): member is PropertyDeclaration {
            return isInitializedProperty(member, /*isStatic*/ false);
        }

        /**
         * Gets a value indicating whether a class element is either a static or an instance property declaration with an initializer.
         *
         * @param member The class element node.
         * @param isStatic A value indicating whether the member should be a static or instance member.
         */
        function isInitializedProperty(member: ClassElement, isStatic: boolean) {
            return member.kind === SyntaxKind.PropertyDeclaration
                && isStatic === ((member.flags & NodeFlags.Static) !== 0)
                && (<PropertyDeclaration>member).initializer !== undefined;
        }

        /**
         * Generates assignment statements for property initializers.
         *
         * @param node The class node.
         * @param properties An array of property declarations to transform.
         * @param receiver The receiver on which each property should be assigned.
         */
        function generateInitializedPropertyStatements(node: ClassExpression | ClassDeclaration, properties: PropertyDeclaration[], receiver: LeftHandSideExpression) {
            const statements: Statement[] = [];
            for (const property of properties) {
                statements.push(
                    createStatement(
                        transformInitializedProperty(node, property, receiver),
                        /*location*/ property
                    )
                );
            }

            return statements;
        }

        /**
         * Generates assignment expressions for property initializers.
         *
         * @param node The class node.
         * @param properties An array of property declarations to transform.
         * @param receiver The receiver on which each property should be assigned.
         */
        function generateInitializedPropertyExpressions(node: ClassExpression | ClassDeclaration, properties: PropertyDeclaration[], receiver: LeftHandSideExpression) {
            const expressions: Expression[] = [];
            for (const property of properties) {
                expressions.push(transformInitializedProperty(node, property, receiver, /*location*/ property));
            }

            return expressions;
        }

        /**
         * Transforms a property initializer into an assignment statement.
         *
         * @param node The class containing the property.
         * @param property The property declaration.
         * @param receiver The object receiving the property assignment.
         */
        function transformInitializedProperty(node: ClassExpression | ClassDeclaration, property: PropertyDeclaration, receiver: LeftHandSideExpression, location?: TextRange) {
            const propertyName = visitPropertyNameOfClassElement(property);
            const initializer = visitNode(property.initializer, visitor, isExpression);
            return createAssignment(
                createMemberAccessForPropertyName(receiver, propertyName),
                initializer,
                location
            );
        }

        /**
         * Gets either the static or instance members of a class that are decorated, or have
         * parameters that are decorated.
         *
         * @param node The class containing the member.
         * @param isStatic A value indicating whether to retrieve static or instance members of
         *                 the class.
         */
        function getDecoratedClassElements(node: ClassExpression | ClassDeclaration, isStatic: boolean): ClassElement[] {
            return filter(node.members, isStatic ? isStaticDecoratedClassElement : isInstanceDecoratedClassElement);
        }

        /**
         * Determines whether a class member is a static member of a class that is decorated, or
         * has parameters that are decorated.
         *
         * @param member The class member.
         */
        function isStaticDecoratedClassElement(member: ClassElement) {
            return isDecoratedClassElement(member, /*isStatic*/ true);
        }

        /**
         * Determines whether a class member is an instance member of a class that is decorated,
         * or has parameters that are decorated.
         *
         * @param member The class member.
         */
        function isInstanceDecoratedClassElement(member: ClassElement) {
            return isDecoratedClassElement(member, /*isStatic*/ false);
        }

        /**
         * Determines whether a class member is either a static or an instance member of a class
         * that is decorated, or has parameters that are decorated.
         *
         * @param member The class member.
         */
        function isDecoratedClassElement(member: ClassElement, isStatic: boolean) {
            return nodeOrChildIsDecorated(member)
                && isStatic === ((member.flags & NodeFlags.Static) !== 0);
        }

        /**
         * A structure describing the decorators for a class element.
         */
        interface AllDecorators {
            decorators: Decorator[];
            parameters?: Decorator[][];
        }

        /**
         * Gets an array of arrays of decorators for the parameters of a function-like node.
         * The offset into the result array should correspond to the offset of the parameter.
         *
         * @param node The function-like node.
         */
        function getDecoratorsOfParameters(node: FunctionLikeDeclaration) {
            let decorators: Decorator[][];
            if (node) {
                const parameters = node.parameters;
                for (let i = 0; i < parameters.length; i++) {
                    const parameter = parameters[i];
                    if (decorators || parameter.decorators) {
                        if (!decorators) {
                            decorators = new Array(parameters.length);
                        }

                        decorators[i] = parameter.decorators;
                    }
                }
            }

            return decorators;
        }

        /**
         * Gets an AllDecorators object containing the decorators for the class and the decorators for the
         * parameters of the constructor of the class.
         *
         * @param node The class node.
         */
        function getAllDecoratorsOfConstructor(node: ClassExpression | ClassDeclaration): AllDecorators {
            const decorators = node.decorators;
            const parameters = getDecoratorsOfParameters(getFirstConstructorWithBody(node));
            if (!decorators && !parameters) {
                return undefined;
            }

            return {
                decorators,
                parameters
            };
        }

        /**
         * Gets an AllDecorators object containing the decorators for the member and its parameters.
         *
         * @param node The class node that contains the member.
         * @param member The class member.
         */
        function getAllDecoratorsOfClassElement(node: ClassExpression | ClassDeclaration, member: ClassElement): AllDecorators {
            switch (member.kind) {
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    return getAllDecoratorsOfAccessors(node, <AccessorDeclaration>member);

                case SyntaxKind.MethodDeclaration:
                    return getAllDecoratorsOfMethod(<MethodDeclaration>member);

                case SyntaxKind.PropertyDeclaration:
                    return getAllDecoratorsOfProperty(<PropertyDeclaration>member);

                default:
                    return undefined;
            }
        }

        /**
         * Gets an AllDecorators object containing the decorators for the accessor and its parameters.
         *
         * @param node The class node that contains the accessor.
         * @param accessor The class accessor member.
         */
        function getAllDecoratorsOfAccessors(node: ClassExpression | ClassDeclaration, accessor: AccessorDeclaration): AllDecorators {
            if (!accessor.body) {
                return undefined;
            }

            const { firstAccessor, secondAccessor, setAccessor } = getAllAccessorDeclarations(node.members, accessor);
            if (accessor !== firstAccessor) {
                return undefined;
            }

            const decorators = firstAccessor.decorators || (secondAccessor && secondAccessor.decorators);
            const parameters = getDecoratorsOfParameters(setAccessor);
            if (!decorators && !parameters) {
                return undefined;
            }

            return { decorators, parameters };
        }

        /**
         * Gets an AllDecorators object containing the decorators for the method and its parameters.
         *
         * @param method The class method member.
         */
        function getAllDecoratorsOfMethod(method: MethodDeclaration): AllDecorators {
            if (!method.body) {
                return undefined;
            }

            const decorators = method.decorators;
            const parameters = getDecoratorsOfParameters(method);
            if (!decorators && !parameters) {
                return undefined;
            }

            return { decorators, parameters };
        }

        /**
         * Gets an AllDecorators object containing the decorators for the property.
         *
         * @param property The class property member.
         */
        function getAllDecoratorsOfProperty(property: PropertyDeclaration): AllDecorators {
            const decorators = property.decorators;
            if (!decorators) {
                return undefined;

            }

            return { decorators };
        }

        /**
         * Transforms all of the decorators for a declaration into an array of expressions.
         *
         * @param node The declaration node.
         * @param allDecorators An object containing all of the decorators for the declaration.
         */
        function transformAllDecoratorsOfDeclaration(node: Declaration, allDecorators: AllDecorators) {
            if (!allDecorators) {
                return undefined;
            }

            const decoratorExpressions: Expression[] = [];
            addNodes(decoratorExpressions, map(allDecorators.decorators, transformDecorator));
            addNodes(decoratorExpressions, flatMap(allDecorators.parameters, transformDecoratorsOfParameter));
            addTypeMetadata(node, decoratorExpressions);
            return decoratorExpressions;
        }

        /**
         * Generates statements used to apply decorators to either the static or instance members
         * of a class.
         *
         * @param node The class node.
         * @param isStatic A value indicating whether to generate statements for static or
         *                 instance members.
         */
        function generateClassElementDecorationStatements(node: ClassDeclaration, isStatic: boolean) {
            return map(generateClassElementDecorationExpressions(node, isStatic), expressionToStatement);
        }

        /**
         * Generates expressions used to apply decorators to either the static or instance members
         * of a class.
         *
         * @param node The class node.
         * @param isStatic A value indicating whether to generate expressions for static or
         *                 instance members.
         */
        function generateClassElementDecorationExpressions(node: ClassExpression | ClassDeclaration, isStatic: boolean) {
            const members = getDecoratedClassElements(node, isStatic);
            let expressions: Expression[];
            for (const member of members) {
                const expression = generateClassElementDecorationExpression(node, member);
                if (expression) {
                    if (!expressions) {
                        expressions = [expression];
                    }
                    else {
                        expressions.push(expression);
                    }
                }
            }
            return expressions;
        }

        /**
         * Generates an expression used to evaluate class element decorators at runtime.
         *
         * @param node The class node that contains the member.
         * @param member The class member.
         */
        function generateClassElementDecorationExpression(node: ClassExpression | ClassDeclaration, member: ClassElement) {
            const allDecorators = getAllDecoratorsOfClassElement(node, member);
            const decoratorExpressions = transformAllDecoratorsOfDeclaration(member, allDecorators);
            if (!decoratorExpressions) {
                return undefined;
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
            //   __decorate([
            //       dec,
            //       __param(0, dec2),
            //       __metadata("design:type", Function),
            //       __metadata("design:paramtypes", [Object]),
            //       __metadata("design:returntype", void 0)
            //   ], C.prototype, "method", undefined);
            //
            // The emit for an accessor is:
            //
            //   __decorate([
            //       dec
            //   ], C.prototype, "accessor", undefined);
            //
            // The emit for a property is:
            //
            //   __decorate([
            //       dec
            //   ], C.prototype, "prop");
            //

            const prefix = getClassMemberPrefix(node, member);
            const memberName = getExpressionForPropertyName(member);
            const descriptor = languageVersion > ScriptTarget.ES3
                ? member.kind === SyntaxKind.PropertyDeclaration
                    // We emit `void 0` here to indicate to `__decorate` that it can invoke `Object.defineProperty` directly, but that it
                    // should not invoke `Object.getOwnPropertyDescriptor`.
                    ? createVoidZero()

                    // We emit `null` here to indicate to `__decorate` that it can invoke `Object.getOwnPropertyDescriptor` directly.
                    // We have this extra argument here so that we can inject an explicit property descriptor at a later date.
                    : createNull()
                : undefined;

            return createDecorateHelper(
                decoratorExpressions,
                prefix,
                memberName,
                descriptor
            );
        }

        /**
         * Generates a __decorate helper call for a class constructor.
         *
         * @param node The class node.
         */
        function generateConstructorDecorationStatement(node: ClassDeclaration, decoratedClassAlias: Identifier) {
            const expression = generateConstructorDecorationExpression(node, decoratedClassAlias);
            return expression ? createStatement(expression) : undefined;
        }

        /**
         * Generates a __decorate helper call for a class constructor.
         *
         * @param node The class node.
         */
        function generateConstructorDecorationExpression(node: ClassExpression | ClassDeclaration, decoratedClassAlias: Identifier) {
            const allDecorators = getAllDecoratorsOfConstructor(node);
            const decoratorExpressions = transformAllDecoratorsOfDeclaration(node, allDecorators);
            if (!decoratorExpressions) {
                return undefined;
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

            const expression = createAssignment(
                getDeclarationName(node),
                createDecorateHelper(
                    decoratorExpressions,
                    getDeclarationName(node)
                )
            );

            return decoratedClassAlias
                ? createAssignment(decoratedClassAlias, expression)
                : expression;
        }

        /**
         * Transforms a decorator into an expression.
         *
         * @param decorator The decorator node.
         */
        function transformDecorator(decorator: Decorator) {
            return visitNode(decorator.expression, visitor, isExpression);
        }

        /**
         * Transforms the decorators of a parameter.
         *
         * @param decorators The decorators for the parameter at the provided offset.
         * @param parameterOffset The offset of the parameter.
         */
        function transformDecoratorsOfParameter(decorators: Decorator[], parameterOffset: number) {
            let expressions: Expression[];
            if (decorators) {
                expressions = [];
                for (const decorator of decorators) {
                    expressions.push(createParamHelper(transformDecorator(decorator), parameterOffset));
                }
            }

            return expressions;
        }

        /**
         * Adds optional type metadata for a declaration.
         *
         * @param node The declaration node.
         * @param decoratorExpressions The destination array to which to add new decorator expressions.
         */
        function addTypeMetadata(node: Declaration, decoratorExpressions: Expression[]) {
            if (compilerOptions.emitDecoratorMetadata) {
                if (shouldAddTypeMetadata(node)) {
                    decoratorExpressions.push(createMetadataHelper("design:type", serializeTypeOfNode(node), /*defer*/ true));
                }
                if (shouldAddParamTypesMetadata(node)) {
                    decoratorExpressions.push(createMetadataHelper("design:paramtypes", serializeParameterTypesOfNode(node), /*defer*/ true));
                }
                if (shouldAddReturnTypeMetadata(node)) {
                    decoratorExpressions.push(createMetadataHelper("design:returntype", serializeReturnTypeOfNode(node), /*defer*/ true));
                }
            }
        }

        /**
         * Determines whether to emit the "design:type" metadata based on the node's kind.
         * The caller should have already tested whether the node has decorators and whether the
         * emitDecoratorMetadata compiler option is set.
         *
         * @param node The node to test.
         */
        function shouldAddTypeMetadata(node: Declaration): boolean {
            const kind = node.kind;
            return kind === SyntaxKind.MethodDeclaration
                || kind === SyntaxKind.GetAccessor
                || kind === SyntaxKind.SetAccessor
                || kind === SyntaxKind.PropertyDeclaration;
        }

        /**
         * Determines whether to emit the "design:returntype" metadata based on the node's kind.
         * The caller should have already tested whether the node has decorators and whether the
         * emitDecoratorMetadata compiler option is set.
         *
         * @param node The node to test.
         */
        function shouldAddReturnTypeMetadata(node: Declaration): boolean {
            return node.kind === SyntaxKind.MethodDeclaration;
        }

        /**
         * Determines whether to emit the "design:paramtypes" metadata based on the node's kind.
         * The caller should have already tested whether the node has decorators and whether the
         * emitDecoratorMetadata compiler option is set.
         *
         * @param node The node to test.
         */
        function shouldAddParamTypesMetadata(node: Declaration): boolean {
            const kind = node.kind;
            return kind === SyntaxKind.ClassDeclaration
                || kind === SyntaxKind.ClassExpression
                || kind === SyntaxKind.MethodDeclaration
                || kind === SyntaxKind.GetAccessor
                || kind === SyntaxKind.SetAccessor;
        }

        /**
         * Serializes the type of a node for use with decorator type metadata.
         *
         * @param node The node that should have its type serialized.
         */
        function serializeTypeOfNode(node: Node): Expression {
            switch (node.kind) {
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.Parameter:
                case SyntaxKind.GetAccessor:
                    return serializeTypeNode((<PropertyDeclaration | ParameterDeclaration | GetAccessorDeclaration>node).type);
                case SyntaxKind.SetAccessor:
                    return serializeTypeNode(getSetAccessorTypeAnnotationNode(<SetAccessorDeclaration>node));
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.ClassExpression:
                case SyntaxKind.MethodDeclaration:
                    return createIdentifier("Function");
                default:
                    return createVoidZero();
            }
        }

        /**
         * Gets the most likely element type for a TypeNode. This is not an exhaustive test
         * as it assumes a rest argument can only be an array type (either T[], or Array<T>).
         *
         * @param node The type node.
         */
        function getRestParameterElementType(node: TypeNode) {
            if (node.kind === SyntaxKind.ArrayType) {
                return (<ArrayTypeNode>node).elementType;
            }
            else if (node.kind === SyntaxKind.TypeReference) {
                return singleOrUndefined((<TypeReferenceNode>node).typeArguments);
            }
            else {
                return undefined;
            }
        }

        /**
         * Serializes the types of the parameters of a node for use with decorator type metadata.
         *
         * @param node The node that should have its parameter types serialized.
         */
        function serializeParameterTypesOfNode(node: Node): Expression {
            const valueDeclaration =
                isClassLike(node)
                    ? getFirstConstructorWithBody(node)
                    : isFunctionLike(node) && nodeIsPresent(node.body)
                        ? node
                        : undefined;

            const expressions: Expression[] = [];
            if (valueDeclaration) {
                for (const parameter of valueDeclaration.parameters) {
                    if (parameter.dotDotDotToken) {
                        expressions.push(serializeTypeNode(getRestParameterElementType(parameter.type)));
                    }
                    else {
                        expressions.push(serializeTypeOfNode(parameter));
                    }
                }
            }

            return createArrayLiteral(expressions);
        }

        /**
         * Serializes the return type of a node for use with decorator type metadata.
         *
         * @param node The node that should have its return type serialized.
         */
        function serializeReturnTypeOfNode(node: Node): Expression {
            if (isFunctionLike(node)) {
                return serializeTypeNode(node.type);
            }

            return undefined;
        }

        /**
         * Serializes a type node for use with decorator type metadata.
         *
         * Types are serialized in the following fashion:
         * - Void types point to "undefined" (e.g. "void 0")
         * - Function and Constructor types point to the global "Function" constructor.
         * - Interface types with a call or construct signature types point to the global
         *   "Function" constructor.
         * - Array and Tuple types point to the global "Array" constructor.
         * - Type predicates and booleans point to the global "Boolean" constructor.
         * - String literal types and strings point to the global "String" constructor.
         * - Enum and number types point to the global "Number" constructor.
         * - Symbol types point to the global "Symbol" constructor.
         * - Type references to classes (or class-like variables) point to the constructor for the class.
         * - Anything else points to the global "Object" constructor.
         *
         * @param node The type node to serialize.
         */
        function serializeTypeNode(node: TypeNode): Expression {
            if (node === undefined) {
                return createIdentifier("Object");
            }

            switch (node.kind) {
                case SyntaxKind.VoidKeyword:
                    return createVoidZero();

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
                    return createIdentifier("Boolean");

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
                    Debug.fail(`Unexpected node kind: ${formatSyntaxKind(node.kind)}.`);
                    break;
            }

            return createIdentifier("Object");
        }

        /**
         * Serializes a TypeReferenceNode to an appropriate JS constructor value for use with
         * decorator type metadata.
         *
         * @param node The type reference node.
         */
        function serializeTypeReferenceNode(node: TypeReferenceNode) {
            // Clone the type name and parent it to a location outside of the current declaration.
            const typeName = cloneEntityName(node.typeName, currentScope);
            switch (resolver.getTypeReferenceSerializationKind(typeName)) {
                case TypeReferenceSerializationKind.Unknown:
                    const serialized = serializeEntityNameAsExpression(typeName, /*useFallback*/ true);
                    const temp = createTempVariable();
                    hoistVariableDeclaration(temp);
                    return createLogicalOr(
                        createLogicalAnd(
                            createStrictEquality(
                                createTypeOf(
                                    createAssignment(temp, serialized)
                                ),
                                createLiteral("function")
                            ),
                            temp
                        ),
                        createIdentifier("Object")
                    );

                case TypeReferenceSerializationKind.TypeWithConstructSignatureAndValue:
                    return serializeEntityNameAsExpression(typeName, /*useFallback*/ false);

                case TypeReferenceSerializationKind.VoidType:
                    return createVoidZero();

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
                    return createIdentifier("Object");
            }
        }

        /**
         * Serializes an entity name as an expression for decorator type metadata.
         *
         * @param node The entity name to serialize.
         * @param useFallback A value indicating whether to use logical operators to test for the
         *                    entity name at runtime.
         */
        function serializeEntityNameAsExpression(node: EntityName, useFallback: boolean): Expression {
            switch (node.kind) {
                case SyntaxKind.Identifier:
                    if (useFallback) {
                        return createLogicalAnd(
                            createStrictInequality(
                                createTypeOf(<Identifier>node),
                                createLiteral("undefined")
                            ),
                            <Identifier>node
                        );
                    }

                    return <Identifier>node;

                case SyntaxKind.QualifiedName:
                    return serializeQualifiedNameAsExpression(<QualifiedName>node, useFallback);
            }
        }

        /**
         * Serializes an qualified name as an expression for decorator type metadata.
         *
         * @param node The qualified name to serialize.
         * @param useFallback A value indicating whether to use logical operators to test for the
         *                    qualified name at runtime.
         */
        function serializeQualifiedNameAsExpression(node: QualifiedName, useFallback: boolean): Expression {
            let left: Expression;
            if (node.left.kind === SyntaxKind.Identifier) {
                left = serializeEntityNameAsExpression(node.left, useFallback);
            }
            else if (useFallback) {
                const temp = createTempVariable();
                hoistVariableDeclaration(temp);
                left = createLogicalAnd(
                    createAssignment(
                        temp,
                        serializeEntityNameAsExpression(node.left, /*useFallback*/ true)
                    ),
                    temp
                );
            }
            else {
                left = serializeEntityNameAsExpression(node.left, /*useFallback*/ false);
            }

            return createPropertyAccess(left, node.right);
        }

        /**
         * Gets an expression that points to the global "Symbol" constructor at runtime if it is
         * available.
         */
        function getGlobalSymbolNameWithFallback(): Expression {
            return createConditional(
                createStrictEquality(
                    createTypeOf(createIdentifier("Symbol")),
                    createLiteral("function")
                ),
                createIdentifier("Symbol"),
                createIdentifier("Object")
            );
        }

        /**
         * Gets an expression that represents a property name. For a computed property, a
         * name is generated for the node.
         *
         * @param member The member whose name should be converted into an expression.
         */
        function getExpressionForPropertyName(member: ClassElement | EnumMember): Expression {
            const name = member.name;
            if (isComputedPropertyName(name)) {
                return getGeneratedNameForNode(name);
            }
            else if (isIdentifier(name)) {
                return createLiteral(name.text);
            }
            else {
                return getSynthesizedClone(name);
            }
        }

        /**
         * Visits the property name of a class element, for use when emitting property
         * initializers. For a computed property on a node with decorators, a temporary
         * value is stored for later use.
         *
         * @param member The member whose name should be visited.
         */
        function visitPropertyNameOfClassElement(member: ClassElement): PropertyName {
            const name = member.name;
            if (isComputedPropertyName(name)) {
                let expression = visitNode(name.expression, visitor, isExpression);
                if (member.decorators) {
                    const generatedName = getGeneratedNameForNode(name);
                    hoistVariableDeclaration(generatedName);
                    expression = createAssignment(generatedName, expression);
                }

                return setOriginalNode(
                    createComputedPropertyName(expression, /*location*/ name),
                    name
                );
            }
            else {
                return setOriginalNode(
                    cloneNode(name),
                    name
                );
            }
        }

        /**
         * Transforms a HeritageClause with TypeScript syntax.
         *
         * This function will only be called when one of the following conditions are met:
         * - The node is a non-`extends` heritage clause that should be elided.
         * - The node is an `extends` heritage clause that should be visited, but only allow a single type.
         *
         * @param node The HeritageClause to transform.
         */
        function visitHeritageClause(node: HeritageClause): HeritageClause {
            if (node.token === SyntaxKind.ExtendsKeyword) {
                const types = visitNodes(node.types, visitor, isExpressionWithTypeArguments, 0, 1);
                return createHeritageClause(
                    SyntaxKind.ExtendsKeyword,
                    types,
                    node
                );
            }

            return undefined;
        }

        /**
         * Transforms an ExpressionWithTypeArguments with TypeScript syntax.
         *
         * This function will only be called when one of the following conditions are met:
         * - The node contains type arguments that should be elided.
         *
         * @param node The ExpressionWithTypeArguments to transform.
         */
        function visitExpressionWithTypeArguments(node: ExpressionWithTypeArguments): ExpressionWithTypeArguments {
            const expression = visitNode(node.expression, visitor, isLeftHandSideExpression);
            return createExpressionWithTypeArguments(
                expression,
                node
            );
        }

        /**
         * Visits a method declaration of a class.
         *
         * This function will be called when one of the following conditions are met:
         * - The node is an overload
         * - The node is marked as abstract
         * - The node is marked as async
         * - The node has both a decorator and a computed property name
         *
         * @param node The method node.
         */
        function visitMethodDeclaration(node: MethodDeclaration) {
            if (shouldElideFunctionLikeDeclaration(node)) {
                return undefined;
            }

            return createMethod(
                visitNodes(node.modifiers, visitor, isModifier),
                visitPropertyNameOfClassElement(node),
                visitNodes(node.parameters, visitor, isParameter),
                transformFunctionBody(node),
                node
            );
        }

        /**
         * Visits a get accessor declaration of a class.
         *
         * This function will be called when one of the following conditions are met:
         * - The node is marked as abstract
         * - The node has both a decorator and a computed property name
         *
         * @param node The get accessor node.
         */
        function visitGetAccessor(node: GetAccessorDeclaration) {
            if (shouldElideFunctionLikeDeclaration(node)) {
                return undefined;
            }

            return createGetAccessor(
                visitNodes(node.modifiers, visitor, isModifier),
                visitPropertyNameOfClassElement(node),
                visitEachChild(node.body, visitor, context),
                node
            );
        }

        /**
         * Visits a set accessor declaration of a class.
         *
         * This function will be called when one of the following conditions are met:
         * - The node is marked as abstract
         * - The node has both a decorator and a computed property name
         *
         * @param node The set accessor node.
         */
        function visitSetAccessor(node: SetAccessorDeclaration) {
            if (shouldElideFunctionLikeDeclaration(node)) {
                return undefined;
            }

            return createSetAccessor(
                visitNodes(node.modifiers, visitor, isModifier),
                visitPropertyNameOfClassElement(node),
                visitNode(firstOrUndefined(node.parameters), visitor, isParameter),
                visitEachChild(node.body, visitor, context),
                node
            );
        }

        /**
         * Visits a function declaration.
         *
         * This function will be called when one of the following conditions are met:
         * - The node is an overload
         * - The node is marked async
         * - The node is exported from a TypeScript namespace
         *
         * @param node The function node.
         */
        function visitFunctionDeclaration(node: FunctionDeclaration): OneOrMany<Statement> {
            if (shouldElideFunctionLikeDeclaration(node)) {
                return undefined;
            }

            const func = createFunctionDeclaration(
                visitNodes(node.modifiers, visitor, isModifier),
                node.asteriskToken,
                node.name,
                visitNodes(node.parameters, visitor, isParameter),
                transformFunctionBody(node),
                node
            );

            if (isNamespaceExport(node)) {
                return createNodeArrayNode([
                    func,
                    createNamespaceExport(getSynthesizedClone(node.name), getSynthesizedClone(node.name))
                ]);
            }

            return func;
        }

        /**
         * Visits a function expression node.
         *
         * This function will be called when one of the following conditions are met:
         * - The node is marked async
         *
         * @param node The function expression node.
         */
        function visitFunctionExpression(node: FunctionExpression) {
            return createFunctionExpression(
                node.asteriskToken,
                node.name,
                visitNodes(node.parameters, visitor, isParameter),
                transformFunctionBody(node),
                node
            );
        }

        /**
         * Determines whether a function-like declaration should be elided. A declaration should
         * be elided if it is an overload, is abstract, or is an ambient declaration.
         *
         * @param node The declaration node.
         */
        function shouldElideFunctionLikeDeclaration(node: FunctionLikeDeclaration) {
            return node.body === undefined
                || node.flags & (NodeFlags.Abstract | NodeFlags.Ambient);
        }

        /**
         * @remarks
         * This function will be called when one of the following conditions are met:
         * - The node is marked async
         */
        function visitArrowFunction(node: ArrowFunction) {
            return createArrowFunction(
                visitNodes(node.parameters, visitor, isParameter),
                transformConciseBody(node),
                node
            );
        }

        function transformFunctionBody(node: MethodDeclaration | AccessorDeclaration | FunctionDeclaration | FunctionExpression): FunctionBody {
            if (isAsyncFunctionLike(node)) {
                return <FunctionBody>transformAsyncFunctionBody(node);
            }

            return transformFunctionBodyWorker(node.body);
        }

        function transformFunctionBodyWorker(body: Block) {
            const savedCurrentScope = currentScope;
            currentScope = body;
            startLexicalEnvironment();
            const visited = visitEachChild(body, visitor, context);
            const declarations = endLexicalEnvironment();
            currentScope = savedCurrentScope;
            return mergeFunctionBodyLexicalEnvironment(visited, declarations);
        }

        function transformConciseBody(node: ArrowFunction): ConciseBody {
            if (isAsyncFunctionLike(node)) {
                return transformAsyncFunctionBody(node);
            }

            return transformConciseBodyWorker(node.body, /*forceBlockFunctionBody*/ false);
        }

        function transformConciseBodyWorker(body: Block | Expression, forceBlockFunctionBody: boolean) {
            if (isBlock(body)) {
                return transformFunctionBodyWorker(body);
            }
            else {
                startLexicalEnvironment();
                const visited: Expression | Block = visitNode(body, visitor, isConciseBody);
                const declarations = endLexicalEnvironment();
                const merged = mergeConciseBodyLexicalEnvironment(visited, declarations);
                if (forceBlockFunctionBody && !isBlock(merged)) {
                    return createBlock([
                        createReturn(<Expression>merged)
                    ]);
                }
                else {
                    return merged;
                }
            }
        }

        function transformAsyncFunctionBody(node: FunctionLikeDeclaration): ConciseBody | FunctionBody {
            const promiseConstructor = getEntityNameFromTypeNode(node.type);
            const isArrowFunction = node.kind === SyntaxKind.ArrowFunction;
            const hasLexicalArguments = (resolver.getNodeCheckFlags(node) & NodeCheckFlags.CaptureArguments) !== 0;

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

            if (!isArrowFunction) {
                const statements: Statement[] = [];

                addNode(statements,
                    createReturn(
                        createAwaiterHelper(
                            hasLexicalArguments,
                            promiseConstructor,
                            transformFunctionBodyWorker(<Block>node.body)
                        )
                    )
                );

                const block = createBlock(statements, /*location*/ node.body);

                // Minor optimization, emit `_super` helper to capture `super` access in an arrow.
                // This step isn't needed if we eventually transform this to ES5.
                if (languageVersion >= ScriptTarget.ES6) {
                    if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.AsyncMethodWithSuperBinding) {
                        enableExpressionSubstitutionForAsyncMethodsWithSuper();
                        setNodeEmitFlags(block, NodeEmitFlags.EmitAdvancedSuperHelper);
                    }
                    else if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.AsyncMethodWithSuper) {
                        enableExpressionSubstitutionForAsyncMethodsWithSuper();
                        setNodeEmitFlags(block, NodeEmitFlags.EmitSuperHelper);
                    }
                }

                return block;
            }
            else {
                return createAwaiterHelper(
                    hasLexicalArguments,
                    promiseConstructor,
                    <Block>transformConciseBodyWorker(node.body, /*forceBlockFunctionBody*/ true)
                );
            }
        }

        /**
         * Visits a parameter declaration node.
         *
         * This function will be called when one of the following conditions are met:
         * - The node has an accessibility modifier.
         *
         * @param node The parameter declaration node.
         */
        function visitParameter(node: ParameterDeclaration) {
            Debug.assert(!node.dotDotDotToken);
            return createParameter(
                visitNode(node.name, visitor, isBindingName),
                visitNode(node.initializer, visitor, isExpression)
            );
        }

        /**
         * Visits a variable statement in a namespace.
         *
         * This function will be called when one of the following conditions are met:
         * - The node is exported from a TypeScript namespace.
         */
        function visitVariableStatement(node: VariableStatement) {
            Debug.assert(isNamespaceExport(node));

            const variables = getInitializedVariables(node.declarationList);
            if (variables.length === 0) {
                // elide statement if there are no initialized variables.
                return undefined;
            }

            return createStatement(
                inlineExpressions(
                    map(variables, transformInitializedVariable)
                ),
                /*location*/ node
            );
        }

        function getInitializedVariables(node: VariableDeclarationList) {
            return filter(node.declarations, isInitializedVariable);
        }

        function isInitializedVariable(node: VariableDeclaration) {
            return node.initializer !== undefined;
        }

        function transformInitializedVariable(node: VariableDeclaration): Expression {
            const name = node.name;
            if (isBindingPattern(name)) {
                return flattenVariableDestructuringToExpression(
                    node,
                    hoistVariableDeclaration,
                    getNamespaceMemberName,
                    visitor
                );
            }
            else {
                return createAssignment(
                    getNamespaceMemberName(name),
                    visitNode(node.initializer, visitor, isExpression)
                );
            }
        }

        /**
         * Visits an enum declaration.
         *
         * This function will be called any time a TypeScript enum is encountered.
         *
         * @param node The enum declaration node.
         */
        function visitEnumDeclaration(node: EnumDeclaration) {
            if (shouldElideEnumDeclaration(node)) {
                return undefined;
            }

            const savedCurrentNamespaceLocalName = currentNamespaceLocalName;
            const statements: Statement[] = [];

            let location: TextRange = node;
            if (!isExported(node) || (isExternalModuleExport(node) && isFirstDeclarationOfKind(node, SyntaxKind.EnumDeclaration))) {
                // Emit a VariableStatement if the enum is not exported, or is the first enum
                // with the same name exported from an external module.
                addNode(statements,
                    createVariableStatement(
                        visitNodes(node.modifiers, visitor, isModifier),
                        createVariableDeclarationList([
                            createVariableDeclaration(node.name)
                        ]),
                        location
                    )
                );
                location = undefined;
            }

            const name = isNamespaceExport(node)
                ? getNamespaceMemberName(node.name)
                : getSynthesizedClone(node.name);

            currentNamespaceLocalName = getGeneratedNameForNode(node);
            addNode(statements,
                 createStatement(
                     createCall(
                        createParen(
                            createFunctionExpression(
                                /*asteriskToken*/ undefined,
                                /*name*/ undefined,
                                [createParameter(currentNamespaceLocalName)],
                                transformEnumBody(node)
                            )
                        ),
                        [createLogicalOr(
                            name,
                            createAssignment(
                                name,
                                createObjectLiteral()
                            )
                        )]
                     ),
                    location
                )
            );

            if (isNamespaceExport(node)) {
                addNode(statements,
                    createVariableStatement(
                        /*modifiers*/ undefined,
                        createVariableDeclarationList([
                            createVariableDeclaration(node.name, name)
                        ]),
                        location
                    )
                );
            }

            currentNamespaceLocalName = savedCurrentNamespaceLocalName;
            return createNodeArrayNode(statements);
        }

        /**
         * Transforms the body of an enum declaration.
         *
         * @param node The enum declaration node.
         */
        function transformEnumBody(node: EnumDeclaration): Block {
            const statements: Statement[] = [];
            startLexicalEnvironment();
            addNodes(statements, map(node.members, transformEnumMember));
            addNodes(statements, endLexicalEnvironment());
            return createBlock(statements);
        }

        /**
         * Transforms an enum member into a statement.
         *
         * @param member The enum member node.
         */
        function transformEnumMember(member: EnumMember): Statement {
            const name = getExpressionForPropertyName(member);
            return createStatement(
                createAssignment(
                    createElementAccess(
                        currentNamespaceLocalName,
                        createAssignment(
                            createElementAccess(
                                currentNamespaceLocalName,
                                name
                            ),
                            transformEnumMemberDeclarationValue(member)
                        )
                    ),
                    name
                ),
                member
            );
        }

        /**
         * Transforms the value of an enum member.
         *
         * @param member The enum member node.
         */
        function transformEnumMemberDeclarationValue(member: EnumMember): Expression {
            const value = resolver.getConstantValue(member);
            if (value !== undefined) {
                return createLiteral(value);
            }
            else if (member.initializer) {
                return visitNode(member.initializer, visitor, isExpression);
            }
            else {
                return createVoidZero();
            }
        }

        /**
         * Determines whether to elide an enum declaration.
         *
         * @param node The enum declaration node.
         */
        function shouldElideEnumDeclaration(node: EnumDeclaration) {
            return isConst(node)
                && !compilerOptions.preserveConstEnums
                && !compilerOptions.isolatedModules;
        }

        /**
         * Visits an await expression.
         *
         * This function will be called any time a TypeScript await expression is encountered.
         *
         * @param node The await expression node.
         */
        function visitAwaitExpression(node: AwaitExpression): Expression {
            return setOriginalNode(
                createYield(
                    visitNode(node.expression, visitor, isExpression),
                    /*location*/ node
                ),
                node
            );
        }

        /**
         * Visits a parenthesized expression that contains either a type assertion or an `as`
         * expression.
         *
         * @param node The parenthesized expression node.
         */
        function visitParenthesizedExpression(node: ParenthesizedExpression): Expression {
            // Make sure we consider all nested cast expressions, e.g.:
            // (<any><number><any>-A).x;
            const expression = visitNode(node.expression, visitor, isExpression);
            if (currentParent.kind !== SyntaxKind.ArrowFunction) {
                // We have an expression of the form: (<Type>SubExpr)
                // Emitting this as (SubExpr) is really not desirable. We would like to emit the subexpr as is.
                // Omitting the parentheses, however, could cause change in the semantics of the generated
                // code if the casted expression has a lower precedence than the rest of the expression, e.g.:
                //      (<any>new A).foo should be emitted as (new A).foo and not new A.foo
                //      (<any>typeof A).toString() should be emitted as (typeof A).toString() and not typeof A.toString()
                //      new (<any>A()) should be emitted as new (A()) and not new A()
                //      (<any>function foo() { })() should be emitted as an IIF (function foo(){})() and not declaration function foo(){} ()
                if (expression.kind !== SyntaxKind.PrefixUnaryExpression &&
                    expression.kind !== SyntaxKind.VoidExpression &&
                    expression.kind !== SyntaxKind.TypeOfExpression &&
                    expression.kind !== SyntaxKind.DeleteExpression &&
                    expression.kind !== SyntaxKind.PostfixUnaryExpression &&
                    expression.kind !== SyntaxKind.NewExpression &&
                    !(expression.kind === SyntaxKind.CallExpression && currentParent.kind === SyntaxKind.NewExpression) &&
                    !(expression.kind === SyntaxKind.FunctionExpression && currentParent.kind === SyntaxKind.CallExpression) &&
                    !(expression.kind === SyntaxKind.NumericLiteral && currentParent.kind === SyntaxKind.PropertyAccessExpression)) {
                    return trackChildOfNotEmittedNode(node, expression, node.expression);
                }
            }

            return setOriginalNode(
                createParen(expression, node),
                node
            );
        }

        function visitAssertionExpression(node: AssertionExpression): Expression {
            const expression = visitNode((<TypeAssertion | AsExpression>node).expression, visitor, isExpression);
            return trackChildOfNotEmittedNode(node, expression, node.expression);
        }

        function trackChildOfNotEmittedNode<T extends Node>(parent: Node, child: T, original: T) {
            if (!child.parent && !child.original) {
                child = cloneNode(child, child, child.flags, child.parent, original);
            }

            setNodeEmitFlags(parent, NodeEmitFlags.IsNotEmittedNode);
            setNodeEmitFlags(child, NodeEmitFlags.EmitCommentsOfNotEmittedParent);
            return child;
        }

        /**
         * Visits a module declaration node.
         *
         * This function will be called any time a TypeScript namespace (ModuleDeclaration) is encountered.
         *
         * @param node The module declaration node.
         */
        function visitModuleDeclaration(node: ModuleDeclaration) {
            if (shouldElideModuleDeclaration(node)) {
                return undefined;
            }

            Debug.assert(isIdentifier(node.name));

            enableExpressionSubstitutionForNamespaceExports();

            const savedCurrentNamespaceLocalName = currentNamespaceLocalName;
            const modifiers = visitNodes(node.modifiers, visitor, isModifier);
            const statements: Statement[] = [];

            let location = node;
            if (!isModuleMergedWithClass(node)) {
                // var x;
                statements.push(
                    createVariableStatement(
                        modifiers,
                        createVariableDeclarationList([
                            createVariableDeclaration(<Identifier>node.name)
                        ]),
                        location
                    )
                );
                location = undefined;
            }

            const name = isNamespaceExport(node)
                ? getNamespaceMemberName(node.name)
                : getSynthesizedClone(node.name);

            let moduleParam: Expression = createLogicalOr(
                name,
                createAssignment(
                    name,
                    createObjectLiteral([])
                )
            );

            if (isNamespaceExport(node)) {
                moduleParam = createAssignment(cloneNode(node.name), moduleParam);
            }

            currentNamespaceLocalName = getGeneratedNameForNode(node);
            currentNamespace = node;

            //  (function (x_1) {
            //      x_1.y = ...;
            //  })(x || (x = {}));
            statements.push(
                setOriginalNode(
                    createStatement(
                        createCall(
                            createParen(
                                createFunctionExpression(
                                    /*asteriskToken*/ undefined,
                                    /*name*/ undefined,
                                    [createParameter(currentNamespaceLocalName)],
                                    transformModuleBody(node)
                                )
                            ),
                            [moduleParam]
                        )
                    ),
                    node
                )
            );

            currentNamespaceLocalName = savedCurrentNamespaceLocalName;
            return createNodeArrayNode(statements);
        }

        /**
         * Transforms the body of a module declaration.
         *
         * @param node The module declaration node.
         */
        function transformModuleBody(node: ModuleDeclaration): Block {
            const statements: Statement[] = [];
            startLexicalEnvironment();
            const body = node.body;
            if (body.kind === SyntaxKind.ModuleBlock) {
                addNodes(statements, visitNodes((<ModuleBlock>body).statements, namespaceElementVisitor, isStatement));
            }
            else {
                addNode(statements, visitModuleDeclaration(<ModuleDeclaration>body));
            }

            addNodes(statements, endLexicalEnvironment());
            return createBlock(statements);
        }

        /**
         * Determines whether to elide a module declaration.
         *
         * @param node The module declaration node.
         */
        function shouldElideModuleDeclaration(node: ModuleDeclaration) {
            return !isInstantiatedModule(node, compilerOptions.preserveConstEnums || compilerOptions.isolatedModules);
        }

        /**
         * Determines whether a module declaration has a name that merges with a class declaration.
         *
         * @param node The module declaration node.
         */
        function isModuleMergedWithClass(node: ModuleDeclaration) {
            return !!(resolver.getNodeCheckFlags(getOriginalNode(node)) & NodeCheckFlags.LexicalModuleMergesWithClass);
        }

        /**
         * Visits an import equals declaration.
         *
         * @param node The import equals declaration node.
         */
        function visitImportEqualsDeclaration(node: ImportEqualsDeclaration): OneOrMany<Statement> {
            Debug.assert(!isExternalModuleImportEqualsDeclaration(node));
            if (shouldElideImportEqualsDeclaration(node)) {
                return undefined;
            }

            const moduleReference = createExpressionFromEntityName(<EntityName>node.moduleReference);
            if (isNamedExternalModuleExport(node) || !isNamespaceExport(node)) {
                //  export var ${name} = ${moduleReference};
                //  var ${name} = ${moduleReference};
                return setOriginalNode(
                    createVariableStatement(
                        visitNodes(node.modifiers, visitor, isModifier),
                        createVariableDeclarationList([
                            createVariableDeclaration(node.name, moduleReference)
                        ]),
                        node
                    ),
                    node
                );
            }
            else {
                // exports.${name} = ${moduleReference};
                return setOriginalNode(
                    createNamespaceExport(
                        getSynthesizedClone(node.name),
                        moduleReference,
                        node
                    ),
                    node
                );
            }
        }

        /**
         * Determines whether to elide an import equals declaration.
         *
         * @param node The import equals declaration node.
         */
        function shouldElideImportEqualsDeclaration(node: ImportEqualsDeclaration) {
            // preserve old compiler's behavior: emit 'var' for import declaration (even if we do not consider them referenced) when
            // - current file is not external module
            // - import declaration is top level and target is value imported by entity name
            return !resolver.isReferencedAliasDeclaration(node)
                && (isExternalModule(currentSourceFile) || !resolver.isTopLevelValueImportEqualsWithEntityName(node));
        }

        /**
         * Gets a value indicating whether the node is exported.
         *
         * @param node The node to test.
         */
        function isExported(node: Node) {
            return (node.flags & NodeFlags.Export) !== 0;
        }

        /**
         * Gets a value indicating whether the node is exported from a namespace.
         *
         * @param node The node to test.
         */
        function isNamespaceExport(node: Node) {
            return currentNamespace !== undefined && isExported(node);
        }

        /**
         * Gets a value indicating whether the node is exported from an external module.
         *
         * @param node The node to test.
         */
        function isExternalModuleExport(node: Node) {
            return currentNamespace === undefined && isExported(node);
        }

        /**
         * Gets a value indicating whether the node is a named export from an external module.
         *
         * @param node The node to test.
         */
        function isNamedExternalModuleExport(node: Node) {
            return isExternalModuleExport(node)
                && (node.flags & NodeFlags.Default) === 0;
        }

        /**
         * Gets a value indicating whether the node is the default export of an external module.
         *
         * @param node The node to test.
         */
        function isDefaultExternalModuleExport(node: Node) {
            return isExternalModuleExport(node)
                && (node.flags & NodeFlags.Default) !== 0;
        }

        /**
         * Gets a value indicating whether a node is the first declaration of its kind.
         *
         * @param node A Declaration node.
         * @param kind The SyntaxKind to find among related declarations.
         */
        function isFirstDeclarationOfKind(node: Declaration, kind: SyntaxKind) {
            const original = getOriginalNode(node);
            return original.symbol && getDeclarationOfKind(original.symbol, kind) === original;
        }

        /**
         * Creates a statement for the provided expression. This is used in calls to `map`.
         */
        function expressionToStatement(expression: Expression) {
            return createStatement(expression, /*location*/ undefined);
        }

        function createNamespaceExport(exportName: Identifier, exportValue: Expression, location?: TextRange) {
            return createStatement(
                createAssignment(
                    getNamespaceMemberName(exportName),
                    exportValue
                ),
                location
            );
        }

        function createExternalModuleExport(exportName: Identifier) {
            return createExportDeclaration(
                createNamedExports([
                    createExportSpecifier(exportName)
                ])
            );
        }

        function getNamespaceMemberName(name: Identifier): Expression {
            return createPropertyAccess(currentNamespaceLocalName, getSynthesizedClone(name));
        }

        function getDeclarationName(node: ClassExpression | ClassDeclaration | FunctionDeclaration | EnumDeclaration) {
            return node.name ? getSynthesizedClone(node.name) : getGeneratedNameForNode(node);
        }

        function getClassPrototype(node: ClassExpression | ClassDeclaration) {
            return createPropertyAccess(getDeclarationName(node), "prototype");
        }

        function getClassMemberPrefix(node: ClassExpression | ClassDeclaration, member: ClassElement) {
            return member.flags & NodeFlags.Static
                ? getDeclarationName(node)
                : getClassPrototype(node);
        }

        function onBeforeEmitNode(node: Node): void {
            previousOnBeforeEmitNode(node);

            const kind = node.kind;
            if (enabledSubstitutions & TypeScriptSubstitutionFlags.DecoratedClasses
                && kind === SyntaxKind.ClassDeclaration
                && node.decorators) {
                currentDecoratedClassAliases[getOriginalNodeId(node)] = decoratedClassAliases[getOriginalNodeId(node)];
            }

            if (enabledSubstitutions & TypeScriptSubstitutionFlags.NamespaceExports
                && (kind === SyntaxKind.ClassDeclaration
                    || kind === SyntaxKind.Constructor
                    || kind === SyntaxKind.MethodDeclaration
                    || kind === SyntaxKind.GetAccessor
                    || kind === SyntaxKind.SetAccessor)) {

                if (!superContainerStack) {
                    superContainerStack = [];
                }

                superContainerStack.push(<SuperContainer>node);
            }

            if (enabledSubstitutions & TypeScriptSubstitutionFlags.NamespaceExports
                && kind === SyntaxKind.ModuleDeclaration) {
                namespaceNestLevel++;
            }
        }

        function onAfterEmitNode(node: Node): void {
            previousOnAfterEmitNode(node);

            const kind = node.kind;
            if (enabledSubstitutions & TypeScriptSubstitutionFlags.DecoratedClasses
                && kind === SyntaxKind.ClassDeclaration
                && node.decorators) {
                currentDecoratedClassAliases[getOriginalNodeId(node)] = undefined;
            }

            if (enabledSubstitutions & TypeScriptSubstitutionFlags.NamespaceExports
                && (kind === SyntaxKind.ClassDeclaration
                    || kind === SyntaxKind.Constructor
                    || kind === SyntaxKind.MethodDeclaration
                    || kind === SyntaxKind.GetAccessor
                    || kind === SyntaxKind.SetAccessor)) {

                if (superContainerStack) {
                    superContainerStack.pop();
                }
            }

            if (enabledSubstitutions & TypeScriptSubstitutionFlags.NamespaceExports
                && kind === SyntaxKind.ModuleDeclaration) {
                namespaceNestLevel--;
            }
        }

        function substituteExpression(node: Expression): Expression {
            node = previousExpressionSubstitution(node);

            switch (node.kind) {
                case SyntaxKind.Identifier:
                    return substituteExpressionIdentifier(<Identifier>node);
            }

            if (enabledSubstitutions & TypeScriptSubstitutionFlags.NamespaceExports) {
                switch (node.kind) {
                    case SyntaxKind.CallExpression:
                        return substituteCallExpression(<CallExpression>node);
                    case SyntaxKind.PropertyAccessExpression:
                        return substitutePropertyAccessExpression(<PropertyAccessExpression>node);
                    case SyntaxKind.ElementAccessExpression:
                        return substituteElementAccessExpression(<ElementAccessExpression>node);
                }
            }

            return node;
        }

        function substituteExpressionIdentifier(node: Identifier): Expression {
            if (enabledSubstitutions & TypeScriptSubstitutionFlags.DecoratedClasses) {
                const original = getOriginalNode(node);
                if (isIdentifier(original)) {
                    if (resolver.getNodeCheckFlags(original) & NodeCheckFlags.SelfReferenceInDecoratedClass) {
                        // Due to the emit for class decorators, any reference to the class from inside of the class body
                        // must instead be rewritten to point to a temporary variable to avoid issues with the double-bind
                        // behavior of class names in ES6.
                        const declaration = resolver.getReferencedValueDeclaration(original);
                        if (declaration) {
                            const classAlias = currentDecoratedClassAliases[getNodeId(declaration)];
                            if (classAlias) {
                                return cloneNode(classAlias);
                            }
                        }
                    }
                }
            }

            if (enabledSubstitutions & TypeScriptSubstitutionFlags.NamespaceExports
                && namespaceNestLevel > 0) {
                // If we are nested within a namespace declaration, we may need to qualifiy
                // an identifier that is exported from a merged namespace.
                const original = getOriginalNode(node);
                if (isIdentifier(original) && original.parent) {
                    const container = resolver.getReferencedExportContainer(original);
                    if (container && container.kind === SyntaxKind.ModuleDeclaration) {
                        return createPropertyAccess(getGeneratedNameForNode(container), node, /*location*/ node);
                    }
                }
            }

            return node;
        }

        function substituteCallExpression(node: CallExpression): Expression {
            const expression = node.expression;
            if (isSuperProperty(expression)) {
                const flags = getSuperContainerAsyncMethodFlags();
                if (flags) {
                    const argumentExpression = isPropertyAccessExpression(expression)
                        ? substitutePropertyAccessExpression(expression)
                        : substituteElementAccessExpression(expression);
                    return createCall(
                        createPropertyAccess(argumentExpression, "call"),
                        [
                            createThis(),
                            ...node.arguments
                        ]
                    );
                }
            }
            return node;
        }

        function substitutePropertyAccessExpression(node: PropertyAccessExpression) {
            if (node.expression.kind === SyntaxKind.SuperKeyword) {
                const flags = getSuperContainerAsyncMethodFlags();
                if (flags) {
                    return createSuperAccessInAsyncMethod(
                        createLiteral(node.name.text),
                        flags,
                        node
                    );
                }
            }

            return node;
        }

        function substituteElementAccessExpression(node: ElementAccessExpression) {
            if (node.expression.kind === SyntaxKind.SuperKeyword) {
                const flags = getSuperContainerAsyncMethodFlags();
                if (flags) {
                    return createSuperAccessInAsyncMethod(
                        node.argumentExpression,
                        flags,
                        node
                    );
                }
            }

            return node;
        }

        function enableExpressionSubstitutionForAsyncMethodsWithSuper() {
            if ((enabledSubstitutions & TypeScriptSubstitutionFlags.NamespaceExports) === 0) {
                enabledSubstitutions |= TypeScriptSubstitutionFlags.NamespaceExports;

                // We need to enable substitutions for call, property access, and element access
                // if we need to rewrite super calls.
                context.enableExpressionSubstitution(SyntaxKind.CallExpression);
                context.enableExpressionSubstitution(SyntaxKind.PropertyAccessExpression);
                context.enableExpressionSubstitution(SyntaxKind.ElementAccessExpression);

                // We need to be notified when entering and exiting declarations that bind super.
                context.enableEmitNotification(SyntaxKind.ClassDeclaration);
                context.enableEmitNotification(SyntaxKind.MethodDeclaration);
                context.enableEmitNotification(SyntaxKind.GetAccessor);
                context.enableEmitNotification(SyntaxKind.SetAccessor);
                context.enableEmitNotification(SyntaxKind.Constructor);
            }
        }

        function enableExpressionSubstitutionForDecoratedClasses() {
            if ((enabledSubstitutions & TypeScriptSubstitutionFlags.DecoratedClasses) === 0) {
                enabledSubstitutions |= TypeScriptSubstitutionFlags.DecoratedClasses;

                // We need to enable substitutions for identifiers. This allows us to
                // substitute class names inside of a class declaration.
                context.enableExpressionSubstitution(SyntaxKind.Identifier);

                // Keep track of class aliases.
                decoratedClassAliases = {};
                currentDecoratedClassAliases = {};
            }
        }

        function enableExpressionSubstitutionForNamespaceExports() {
            if ((enabledSubstitutions & TypeScriptSubstitutionFlags.NamespaceExports) === 0) {
                enabledSubstitutions |= TypeScriptSubstitutionFlags.NamespaceExports;

                // We need to enable substitutions for identifiers. This allows us to
                // substitute the names of exported members of a namespace.
                context.enableExpressionSubstitution(SyntaxKind.Identifier);

                // We need to be notified when entering and exiting namespaces.
                context.enableEmitNotification(SyntaxKind.ModuleDeclaration);

                // Keep track of namespace nesting depth
                namespaceNestLevel = 0;
            }
        }

        function createSuperAccessInAsyncMethod(argumentExpression: Expression, flags: NodeCheckFlags, location: TextRange): LeftHandSideExpression {
            if (flags & NodeCheckFlags.AsyncMethodWithSuperBinding) {
                return createPropertyAccess(
                    createCall(
                        createIdentifier("_super"),
                        [argumentExpression]
                    ),
                    "value",
                    location
                );
            }
            else {
                return createCall(
                    createIdentifier("_super"),
                    [argumentExpression],
                    location
                );
            }
        }

        function getSuperContainerAsyncMethodFlags() {
            const container = lastOrUndefined(superContainerStack);
            return container !== undefined
                && resolver.getNodeCheckFlags(getOriginalNode(container)) & (NodeCheckFlags.AsyncMethodWithSuper | NodeCheckFlags.AsyncMethodWithSuperBinding);
        }
    }
}