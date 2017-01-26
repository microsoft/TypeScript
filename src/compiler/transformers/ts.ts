/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />
/// <reference path="./destructuring.ts" />

/*@internal*/
namespace ts {
    /**
     * Indicates whether to emit type metadata in the new format.
     */
    const USE_NEW_TYPE_METADATA_FORMAT = false;

    const enum TypeScriptSubstitutionFlags {
        /** Enables substitutions for decorated classes. */
        ClassAliases = 1 << 0,
        /** Enables substitutions for namespace exports. */
        NamespaceExports = 1 << 1,
        /* Enables substitutions for unqualified enum members */
        NonQualifiedEnumMembers = 1 << 3
    }

    export function transformTypeScript(context: TransformationContext) {
        const {
            startLexicalEnvironment,
            resumeLexicalEnvironment,
            endLexicalEnvironment,
            hoistVariableDeclaration,
        } = context;

        const resolver = context.getEmitResolver();
        const compilerOptions = context.getCompilerOptions();
        const languageVersion = getEmitScriptTarget(compilerOptions);
        const moduleKind = getEmitModuleKind(compilerOptions);

        // Save the previous transformation hooks.
        const previousOnEmitNode = context.onEmitNode;
        const previousOnSubstituteNode = context.onSubstituteNode;

        // Set new transformation hooks.
        context.onEmitNode = onEmitNode;
        context.onSubstituteNode = onSubstituteNode;

        // Enable substitution for property/element access to emit const enum values.
        context.enableSubstitution(SyntaxKind.PropertyAccessExpression);
        context.enableSubstitution(SyntaxKind.ElementAccessExpression);

        // These variables contain state that changes as we descend into the tree.
        let currentSourceFile: SourceFile;
        let currentNamespace: ModuleDeclaration;
        let currentNamespaceContainerName: Identifier;
        let currentScope: SourceFile | Block | ModuleBlock | CaseBlock;
        let currentScopeFirstDeclarationsOfName: Map<Node>;

        /**
         * Keeps track of whether expression substitution has been enabled for specific edge cases.
         * They are persisted between each SourceFile transformation and should not be reset.
         */
        let enabledSubstitutions: TypeScriptSubstitutionFlags;

        /**
         * A map that keeps track of aliases created for classes with decorators to avoid issues
         * with the double-binding behavior of classes.
         */
        let classAliases: Identifier[];

        /**
         * Keeps track of whether  we are within any containing namespaces when performing
         * just-in-time substitution while printing an expression identifier.
         */
        let applicableSubstitutions: TypeScriptSubstitutionFlags;

        return transformSourceFile;

        /**
         * Transform TypeScript-specific syntax in a SourceFile.
         *
         * @param node A SourceFile node.
         */
        function transformSourceFile(node: SourceFile) {
            if (isDeclarationFile(node)) {
                return node;
            }

            currentSourceFile = node;

            const visited = saveStateAndInvoke(node, visitSourceFile);
            addEmitHelpers(visited, context.readEmitHelpers());

            currentSourceFile = undefined;
            return visited;
        }

        /**
         * Visits a node, saving and restoring state variables on the stack.
         *
         * @param node The node to visit.
         */
        function saveStateAndInvoke<T>(node: Node, f: (node: Node) => T): T {
            // Save state
            const savedCurrentScope = currentScope;
            const savedCurrentScopeFirstDeclarationsOfName = currentScopeFirstDeclarationsOfName;

            // Handle state changes before visiting a node.
            onBeforeVisitNode(node);

            const visited = f(node);

            // Restore state
            if (currentScope !== savedCurrentScope) {
                currentScopeFirstDeclarationsOfName = savedCurrentScopeFirstDeclarationsOfName;
            }

            currentScope = savedCurrentScope;
            return visited;
        }

        /**
         * Performs actions that should always occur immediately before visiting a node.
         *
         * @param node The node to visit.
         */
        function onBeforeVisitNode(node: Node) {
            switch (node.kind) {
                case SyntaxKind.SourceFile:
                case SyntaxKind.CaseBlock:
                case SyntaxKind.ModuleBlock:
                case SyntaxKind.Block:
                    currentScope = <SourceFile | CaseBlock | ModuleBlock | Block>node;
                    currentScopeFirstDeclarationsOfName = undefined;
                    break;

                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.FunctionDeclaration:
                    if (hasModifier(node, ModifierFlags.Ambient)) {
                        break;
                    }

                    recordEmittedDeclarationInScope(node);
                    break;
            }
        }

        /**
         * General-purpose node visitor.
         *
         * @param node The node to visit.
         */
        function visitor(node: Node): VisitResult<Node> {
            return saveStateAndInvoke(node, visitorWorker);
        }

        /**
         * Visits and possibly transforms any node.
         *
         * @param node The node to visit.
         */
        function visitorWorker(node: Node): VisitResult<Node> {
            if (node.transformFlags & TransformFlags.TypeScript) {
                // This node is explicitly marked as TypeScript, so we should transform the node.
                return visitTypeScript(node);
            }
            else if (node.transformFlags & TransformFlags.ContainsTypeScript) {
                // This node contains TypeScript, so we should visit its children.
                return visitEachChild(node, visitor, context);
            }

            return node;
        }

        /**
         * Specialized visitor that visits the immediate children of a SourceFile.
         *
         * @param node The node to visit.
         */
        function sourceElementVisitor(node: Node): VisitResult<Node> {
            return saveStateAndInvoke(node, sourceElementVisitorWorker);
        }

        /**
         * Specialized visitor that visits the immediate children of a SourceFile.
         *
         * @param node The node to visit.
         */
        function sourceElementVisitorWorker(node: Node): VisitResult<Node> {
            switch (node.kind) {
                case SyntaxKind.ImportDeclaration:
                    return visitImportDeclaration(<ImportDeclaration>node);
                case SyntaxKind.ImportEqualsDeclaration:
                    return visitImportEqualsDeclaration(<ImportEqualsDeclaration>node);
                case SyntaxKind.ExportAssignment:
                    return visitExportAssignment(<ExportAssignment>node);
                case SyntaxKind.ExportDeclaration:
                    return visitExportDeclaration(<ExportDeclaration>node);
                default:
                    return visitorWorker(node);
            }
        }

        /**
         * Specialized visitor that visits the immediate children of a namespace.
         *
         * @param node The node to visit.
         */
        function namespaceElementVisitor(node: Node): VisitResult<Node> {
            return saveStateAndInvoke(node, namespaceElementVisitorWorker);
        }

        /**
         * Specialized visitor that visits the immediate children of a namespace.
         *
         * @param node The node to visit.
         */
        function namespaceElementVisitorWorker(node: Node): VisitResult<Node> {
            if (node.kind === SyntaxKind.ExportDeclaration ||
                node.kind === SyntaxKind.ImportDeclaration ||
                node.kind === SyntaxKind.ImportClause ||
                (node.kind === SyntaxKind.ImportEqualsDeclaration &&
                 (<ImportEqualsDeclaration>node).moduleReference.kind === SyntaxKind.ExternalModuleReference)) {
                // do not emit ES6 imports and exports since they are illegal inside a namespace
                return undefined;
           }
           else if (node.transformFlags & TransformFlags.TypeScript || hasModifier(node, ModifierFlags.Export)) {
                // This node is explicitly marked as TypeScript, or is exported at the namespace
                // level, so we should transform the node.
                return visitTypeScript(node);
            }
            else if (node.transformFlags & TransformFlags.ContainsTypeScript) {
                // This node contains TypeScript, so we should visit its children.
                return visitEachChild(node, visitor, context);
            }

            return node;
        }

        /**
         * Specialized visitor that visits the immediate children of a class with TypeScript syntax.
         *
         * @param node The node to visit.
         */
        function classElementVisitor(node: Node): VisitResult<Node> {
            return saveStateAndInvoke(node, classElementVisitorWorker);
        }

        /**
         * Specialized visitor that visits the immediate children of a class with TypeScript syntax.
         *
         * @param node The node to visit.
         */
        function classElementVisitorWorker(node: Node): VisitResult<Node> {
            switch (node.kind) {
                case SyntaxKind.Constructor:
                    // TypeScript constructors are transformed in `visitClassDeclaration`.
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

                case SyntaxKind.SemicolonClassElement:
                    return node;

                default:
                    Debug.failBadSyntaxKind(node);
                    return undefined;
            }
        }

        function modifierVisitor(node: Node): VisitResult<Node> {
            if (modifierToFlag(node.kind) & ModifierFlags.TypeScriptModifier) {
                return undefined;
            }
            else if (currentNamespace && node.kind === SyntaxKind.ExportKeyword) {
                return undefined;
            }

            return node;
        }

        /**
         * Branching visitor, visits a TypeScript syntax node.
         *
         * @param node The node to visit.
         */
        function visitTypeScript(node: Node): VisitResult<Node> {
            if (hasModifier(node, ModifierFlags.Ambient) && isStatement(node)) {
                // TypeScript ambient declarations are elided, but some comments may be preserved.
                // See the implementation of `getLeadingComments` in comments.ts for more details.
                return createNotEmittedStatement(node);
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
                case SyntaxKind.ConstKeyword:
                case SyntaxKind.DeclareKeyword:
                case SyntaxKind.ReadonlyKeyword:
                    // TypeScript accessibility and readonly modifiers are elided.

                case SyntaxKind.ArrayType:
                case SyntaxKind.TupleType:
                case SyntaxKind.TypeLiteral:
                case SyntaxKind.TypePredicate:
                case SyntaxKind.TypeParameter:
                case SyntaxKind.AnyKeyword:
                case SyntaxKind.BooleanKeyword:
                case SyntaxKind.StringKeyword:
                case SyntaxKind.NumberKeyword:
                case SyntaxKind.NeverKeyword:
                case SyntaxKind.VoidKeyword:
                case SyntaxKind.SymbolKeyword:
                case SyntaxKind.ConstructorType:
                case SyntaxKind.FunctionType:
                case SyntaxKind.TypeQuery:
                case SyntaxKind.TypeReference:
                case SyntaxKind.UnionType:
                case SyntaxKind.IntersectionType:
                case SyntaxKind.ParenthesizedType:
                case SyntaxKind.ThisType:
                case SyntaxKind.TypeOperator:
                case SyntaxKind.IndexedAccessType:
                case SyntaxKind.MappedType:
                case SyntaxKind.LiteralType:
                    // TypeScript type nodes are elided.

                case SyntaxKind.IndexSignature:
                    // TypeScript index signatures are elided.

                case SyntaxKind.Decorator:
                    // TypeScript decorators are elided. They will be emitted as part of visitClassDeclaration.

                case SyntaxKind.TypeAliasDeclaration:
                    // TypeScript type-only declarations are elided.

                case SyntaxKind.PropertyDeclaration:
                    // TypeScript property declarations are elided.
                    return undefined;

                case SyntaxKind.Constructor:
                    return visitConstructor(<ConstructorDeclaration>node);

                case SyntaxKind.InterfaceDeclaration:
                    // TypeScript interfaces are elided, but some comments may be preserved.
                    // See the implementation of `getLeadingComments` in comments.ts for more details.
                    return createNotEmittedStatement(node);

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
                    // TypeScript method declarations may have decorators, modifiers
                    // or type annotations.
                    return visitMethodDeclaration(<MethodDeclaration>node);

                case SyntaxKind.GetAccessor:
                    // Get Accessors can have TypeScript modifiers, decorators, and type annotations.
                    return visitGetAccessor(<GetAccessorDeclaration>node);

                case SyntaxKind.SetAccessor:
                    // Set Accessors can have TypeScript modifiers and type annotations.
                    return visitSetAccessor(<SetAccessorDeclaration>node);

                case SyntaxKind.FunctionDeclaration:
                    // Typescript function declarations can have modifiers, decorators, and type annotations.
                    return visitFunctionDeclaration(<FunctionDeclaration>node);

                case SyntaxKind.FunctionExpression:
                    // TypeScript function expressions can have modifiers and type annotations.
                    return visitFunctionExpression(<FunctionExpression>node);

                case SyntaxKind.ArrowFunction:
                    // TypeScript arrow functions can have modifiers and type annotations.
                    return visitArrowFunction(<ArrowFunction>node);

                case SyntaxKind.Parameter:
                    // This is a parameter declaration with TypeScript syntax extensions.
                    //
                    // TypeScript parameter declaration syntax extensions include:
                    // - decorators
                    // - accessibility modifiers
                    // - the question mark (?) token for optional parameters
                    // - type annotations
                    // - this parameters
                    return visitParameter(<ParameterDeclaration>node);

                case SyntaxKind.ParenthesizedExpression:
                    // ParenthesizedExpressions are TypeScript if their expression is a
                    // TypeAssertion or AsExpression
                    return visitParenthesizedExpression(<ParenthesizedExpression>node);

                case SyntaxKind.TypeAssertionExpression:
                case SyntaxKind.AsExpression:
                    // TypeScript type assertions are removed, but their subtrees are preserved.
                    return visitAssertionExpression(<AssertionExpression>node);

                case SyntaxKind.CallExpression:
                    return visitCallExpression(<CallExpression>node);

                case SyntaxKind.NewExpression:
                    return visitNewExpression(<NewExpression>node);

                case SyntaxKind.NonNullExpression:
                    // TypeScript non-null expressions are removed, but their subtrees are preserved.
                    return visitNonNullExpression(<NonNullExpression>node);

                case SyntaxKind.EnumDeclaration:
                    // TypeScript enum declarations do not exist in ES6 and must be rewritten.
                    return visitEnumDeclaration(<EnumDeclaration>node);

                case SyntaxKind.VariableStatement:
                    // TypeScript namespace exports for variable statements must be transformed.
                    return visitVariableStatement(<VariableStatement>node);

                case SyntaxKind.VariableDeclaration:
                    return visitVariableDeclaration(<VariableDeclaration>node);

                case SyntaxKind.ModuleDeclaration:
                    // TypeScript namespace declarations must be transformed.
                    return visitModuleDeclaration(<ModuleDeclaration>node);

                case SyntaxKind.ImportEqualsDeclaration:
                    // TypeScript namespace or external module import.
                    return visitImportEqualsDeclaration(<ImportEqualsDeclaration>node);

                default:
                    Debug.failBadSyntaxKind(node);
                    return visitEachChild(node, visitor, context);
            }
        }

        function visitSourceFile(node: SourceFile) {
            const alwaysStrict = compilerOptions.alwaysStrict && !(isExternalModule(node) && moduleKind === ModuleKind.ES2015);
            return updateSourceFileNode(
                node,
                visitLexicalEnvironment(node.statements, sourceElementVisitor, context, /*start*/ 0, alwaysStrict));
        }

        /**
         * Tests whether we should emit a __decorate call for a class declaration.
         */
        function shouldEmitDecorateCallForClass(node: ClassDeclaration) {
            if (node.decorators && node.decorators.length > 0) {
                return true;
            }

            const constructor = getFirstConstructorWithBody(node);
            if (constructor) {
                return forEach(constructor.parameters, shouldEmitDecorateCallForParameter);
            }

            return false;
        }

        /**
         * Tests whether we should emit a __decorate call for a parameter declaration.
         */
        function shouldEmitDecorateCallForParameter(parameter: ParameterDeclaration) {
            return parameter.decorators !== undefined && parameter.decorators.length > 0;
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
        function visitClassDeclaration(node: ClassDeclaration): VisitResult<Statement> {
            const staticProperties = getInitializedProperties(node, /*isStatic*/ true);
            const hasExtendsClause = getClassExtendsHeritageClauseElement(node) !== undefined;
            const isDecoratedClass = shouldEmitDecorateCallForClass(node);

            // emit name if
            // - node has a name
            // - node has static initializers
            //
            let name = node.name;
            if (!name && staticProperties.length > 0) {
                name = getGeneratedNameForNode(node);
            }

            const classStatement = isDecoratedClass
                ? createClassDeclarationHeadWithDecorators(node, name, hasExtendsClause)
                : createClassDeclarationHeadWithoutDecorators(node, name, hasExtendsClause, staticProperties.length > 0);

            const statements: Statement[] = [classStatement];

            // Emit static property assignment. Because classDeclaration is lexically evaluated,
            // it is safe to emit static property assignment after classDeclaration
            // From ES6 specification:
            //      HasLexicalDeclaration (N) : Determines if the argument identifier has a binding in this environment record that was created using
            //                                  a lexical declaration such as a LexicalDeclaration or a ClassDeclaration.
            if (staticProperties.length) {
                addInitializedPropertyStatements(statements, staticProperties, getLocalName(node));
            }

            // Write any decorators of the node.
            addClassElementDecorationStatements(statements, node, /*isStatic*/ false);
            addClassElementDecorationStatements(statements, node, /*isStatic*/ true);
            addConstructorDecorationStatement(statements, node);

            // If the class is exported as part of a TypeScript namespace, emit the namespace export.
            // Otherwise, if the class was exported at the top level and was decorated, emit an export
            // declaration or export default for the class.
            if (isNamespaceExport(node)) {
                addExportMemberAssignment(statements, node);
            }
            else if (isDecoratedClass) {
                if (isDefaultExternalModuleExport(node)) {
                    statements.push(createExportDefault(getLocalName(node, /*allowComments*/ false, /*allowSourceMaps*/ true)));
                }
                else if (isNamedExternalModuleExport(node)) {
                    statements.push(createExternalModuleExport(getLocalName(node, /*allowComments*/ false, /*allowSourceMaps*/ true)));
                }
            }

            if (statements.length > 1) {
                // Add a DeclarationMarker as a marker for the end of the declaration
                statements.push(createEndOfDeclarationMarker(node));
                setEmitFlags(classStatement, getEmitFlags(classStatement) | EmitFlags.HasEndOfDeclarationMarker);
            }

            return singleOrMany(statements);
        }

        /**
         * Transforms a non-decorated class declaration and appends the resulting statements.
         *
         * @param node A ClassDeclaration node.
         * @param name The name of the class.
         * @param hasExtendsClause A value indicating whether the class has an extends clause.
         * @param hasStaticProperties A value indicating whether the class has static properties.
         */
        function createClassDeclarationHeadWithoutDecorators(node: ClassDeclaration, name: Identifier, hasExtendsClause: boolean, hasStaticProperties: boolean) {
            //  ${modifiers} class ${name} ${heritageClauses} {
            //      ${members}
            //  }
            const classDeclaration = createClassDeclaration(
                /*decorators*/ undefined,
                visitNodes(node.modifiers, modifierVisitor, isModifier),
                name,
                /*typeParameters*/ undefined,
                visitNodes(node.heritageClauses, visitor, isHeritageClause),
                transformClassMembers(node, hasExtendsClause),
                node);

            let emitFlags = getEmitFlags(node);

            // To better align with the old emitter, we should not emit a trailing source map
            // entry if the class has static properties.
            if (hasStaticProperties) {
                emitFlags |= EmitFlags.NoTrailingSourceMap;
            }

            setOriginalNode(classDeclaration, node);
            setEmitFlags(classDeclaration, emitFlags);
            return classDeclaration;
        }

        /**
         * Transforms a decorated class declaration and appends the resulting statements. If
         * the class requires an alias to avoid issues with double-binding, the alias is returned.
         *
         * @param statements A statement list to which to add the declaration.
         * @param node A ClassDeclaration node.
         * @param name The name of the class.
         * @param hasExtendsClause A value indicating whether the class has an extends clause.
         */
        function createClassDeclarationHeadWithDecorators(node: ClassDeclaration, name: Identifier, hasExtendsClause: boolean) {
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
            //  @dec                            | let C = C_1 = class C {
            //  class C {                       |   static x() { return C_1.y; }
            //    static x() { return C.y; }    | }
            //    static y = 1;                 | C.y = 1;
            //  }                               | C = C_1 = __decorate([dec], C);
            //                                  | var C_1;
            //  ---------------------------------------------------------------------
            //  @dec                            | let C = class C {
            //  export class C {                |   static x() { return C_1.y; }
            //    static x() { return C.y; }    | }
            //    static y = 1;                 | C.y = 1;
            //  }                               | C = C_1 = __decorate([dec], C);
            //                                  | export { C };
            //                                  | var C_1;
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
            //  @dec                            | let C = class C {
            //  export default class C {        |   static x() { return C_1.y; }
            //    static x() { return C.y; }    | }
            //    static y = 1;                 | C.y = 1;
            //  }                               | C = C_1 = __decorate([dec], C);
            //                                  | export default C;
            //                                  | var C_1;
            //  ---------------------------------------------------------------------
            //

            const location = moveRangePastDecorators(node);
            const classAlias = getClassAliasIfNeeded(node);
            const declName = getLocalName(node, /*allowComments*/ false, /*allowSourceMaps*/ true);

            //  ... = class ${name} ${heritageClauses} {
            //      ${members}
            //  }
            const heritageClauses = visitNodes(node.heritageClauses, visitor, isHeritageClause);
            const members = transformClassMembers(node, hasExtendsClause);
            const classExpression = createClassExpression(/*modifiers*/ undefined, name, /*typeParameters*/ undefined, heritageClauses, members, location);
            setOriginalNode(classExpression, node);

            //  let ${name} = ${classExpression} where name is either declaredName if the class doesn't contain self-reference
            //                                         or decoratedClassAlias if the class contain self-reference.
            const statement = createLetStatement(declName, classAlias ? createAssignment(classAlias, classExpression) : classExpression, location);
            setOriginalNode(statement, node);
            setCommentRange(statement, node);
            return statement;
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
            const members = transformClassMembers(node, some(heritageClauses, c => c.token === SyntaxKind.ExtendsKeyword));

            const classExpression = setOriginalNode(
                createClassExpression(
                    /*modifiers*/ undefined,
                    node.name,
                    /*typeParameters*/ undefined,
                    heritageClauses,
                    members,
                    /*location*/ node
                ),
                node
            );

            if (staticProperties.length > 0) {
                const expressions: Expression[] = [];
                const temp = createTempVariable(hoistVariableDeclaration);
                if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.ClassWithConstructorReference) {
                    // record an alias as the class name is not in scope for statics.
                    enableSubstitutionForClassAliases();
                    classAliases[getOriginalNodeId(node)] = getSynthesizedClone(temp);
                }

                // To preserve the behavior of the old emitter, we explicitly indent
                // the body of a class with static initializers.
                setEmitFlags(classExpression, EmitFlags.Indented | getEmitFlags(classExpression));
                expressions.push(startOnNewLine(createAssignment(temp, classExpression)));
                addRange(expressions, generateInitializedPropertyExpressions(staticProperties, temp));
                expressions.push(startOnNewLine(temp));
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
            const constructor = transformConstructor(node, hasExtendsClause);
            if (constructor) {
                members.push(constructor);
            }

            addRange(members, visitNodes(node.members, classElementVisitor, isClassElement));
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

            const parameters = transformConstructorParameters(constructor);
            const body = transformConstructorBody(node, constructor, hasExtendsClause);

            //  constructor(${parameters}) {
            //      ${body}
            //  }
            return startOnNewLine(
                setOriginalNode(
                    createConstructor(
                        /*decorators*/ undefined,
                        /*modifiers*/ undefined,
                        parameters,
                        body,
                        /*location*/ constructor || node
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
        function transformConstructorParameters(constructor: ConstructorDeclaration) {
            // The ES2015 spec specifies in 14.5.14. Runtime Semantics: ClassDefinitionEvaluation:
            // If constructor is empty, then
            //     If ClassHeritag_eopt is present and protoParent is not null, then
            //          Let constructor be the result of parsing the source text
            //              constructor(...args) { super (...args);}
            //          using the syntactic grammar with the goal symbol MethodDefinition[~Yield].
            //      Else,
            //           Let constructor be the result of parsing the source text
            //               constructor( ){ }
            //           using the syntactic grammar with the goal symbol MethodDefinition[~Yield].
            //
            // While we could emit the '...args' rest parameter, certain later tools in the pipeline might
            // downlevel the '...args' portion less efficiently by naively copying the contents of 'arguments' to an array.
            // Instead, we'll avoid using a rest parameter and spread into the super call as
            // 'super(...arguments)' instead of 'super(...args)', as you can see in "transformConstructorBody".
            return visitParameterList(constructor && constructor.parameters, visitor, context)
                || <ParameterDeclaration[]>[];
        }

        /**
         * Transforms (or creates) a constructor body for a class with parameter property
         * assignments or instance property initializers.
         *
         * @param node The current class.
         * @param constructor The current class constructor.
         * @param hasExtendsClause A value indicating whether the class has an extends clause.
         */
        function transformConstructorBody(node: ClassExpression | ClassDeclaration, constructor: ConstructorDeclaration, hasExtendsClause: boolean) {
            const statements: Statement[] = [];
            let indexOfFirstStatement = 0;

            resumeLexicalEnvironment();

            if (constructor) {
                indexOfFirstStatement = addPrologueDirectivesAndInitialSuperCall(constructor, statements);

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
                addRange(statements, map(propertyAssignments, transformParameterWithPropertyAssignment));
            }
            else if (hasExtendsClause) {
                // Add a synthetic `super` call:
                //
                //  super(...arguments);
                //
                statements.push(
                    createStatement(
                        createCall(
                            createSuper(),
                            /*typeArguments*/ undefined,
                            [createSpread(createIdentifier("arguments"))]
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
            addInitializedPropertyStatements(statements, properties, createThis());

            if (constructor) {
                // The class already had a constructor, so we should add the existing statements, skipping the initial super call.
                addRange(statements, visitNodes(constructor.body.statements, visitor, isStatement, indexOfFirstStatement));
            }

            // End the lexical environment.
            addRange(statements, endLexicalEnvironment());
            return createBlock(
                createNodeArray(
                    statements,
                    /*location*/ constructor ? constructor.body.statements : node.members
                ),
                /*location*/ constructor ? constructor.body : /*location*/ undefined,
                /*multiLine*/ true
            );
        }

        /**
         * Adds super call and preceding prologue directives into the list of statements.
         *
         * @param ctor The constructor node.
         * @returns index of the statement that follows super call
         */
        function addPrologueDirectivesAndInitialSuperCall(ctor: ConstructorDeclaration, result: Statement[]): number {
            if (ctor.body) {
                const statements = ctor.body.statements;
                // add prologue directives to the list (if any)
                const index = addPrologueDirectives(result, statements, /*ensureUseStrict*/ false, visitor);
                if (index === statements.length) {
                    // list contains nothing but prologue directives (or empty) - exit
                    return index;
                }

                const statement = statements[index];
                if (statement.kind === SyntaxKind.ExpressionStatement && isSuperCall((<ExpressionStatement>statement).expression)) {
                    result.push(visitNode(statement, visitor, isStatement));
                    return index + 1;
                }

                return index;
            }

            return 0;
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
            return hasModifier(parameter, ModifierFlags.ParameterPropertyModifier)
                && isIdentifier(parameter.name);
        }

        /**
         * Transforms a parameter into a property assignment statement.
         *
         * @param node The parameter declaration.
         */
        function transformParameterWithPropertyAssignment(node: ParameterDeclaration) {
            Debug.assert(isIdentifier(node.name));
            const name = node.name as Identifier;
            const propertyName = getMutableClone(name);
            setEmitFlags(propertyName, EmitFlags.NoComments | EmitFlags.NoSourceMap);

            const localName = getMutableClone(name);
            setEmitFlags(localName, EmitFlags.NoComments);

            return startOnNewLine(
                createStatement(
                    createAssignment(
                        createPropertyAccess(
                            createThis(),
                            propertyName,
                            /*location*/ node.name
                        ),
                        localName
                    ),
                    /*location*/ moveRangePos(node, -1)
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
                && isStatic === hasModifier(member, ModifierFlags.Static)
                && (<PropertyDeclaration>member).initializer !== undefined;
        }

        /**
         * Generates assignment statements for property initializers.
         *
         * @param properties An array of property declarations to transform.
         * @param receiver The receiver on which each property should be assigned.
         */
        function addInitializedPropertyStatements(statements: Statement[], properties: PropertyDeclaration[], receiver: LeftHandSideExpression) {
            for (const property of properties) {
                const statement = createStatement(transformInitializedProperty(property, receiver));
                setSourceMapRange(statement, moveRangePastModifiers(property));
                setCommentRange(statement, property);
                statements.push(statement);
            }
        }

        /**
         * Generates assignment expressions for property initializers.
         *
         * @param properties An array of property declarations to transform.
         * @param receiver The receiver on which each property should be assigned.
         */
        function generateInitializedPropertyExpressions(properties: PropertyDeclaration[], receiver: LeftHandSideExpression) {
            const expressions: Expression[] = [];
            for (const property of properties) {
                const expression = transformInitializedProperty(property, receiver);
                expression.startsOnNewLine = true;
                setSourceMapRange(expression, moveRangePastModifiers(property));
                setCommentRange(expression, property);
                expressions.push(expression);
            }

            return expressions;
        }

        /**
         * Transforms a property initializer into an assignment statement.
         *
         * @param property The property declaration.
         * @param receiver The object receiving the property assignment.
         */
        function transformInitializedProperty(property: PropertyDeclaration, receiver: LeftHandSideExpression) {
            const propertyName = visitPropertyNameOfClassElement(property);
            const initializer = visitNode(property.initializer, visitor, isExpression);
            const memberAccess = createMemberAccessForPropertyName(receiver, propertyName, /*location*/ propertyName);

            return createAssignment(memberAccess, initializer);
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
                && isStatic === hasModifier(member, ModifierFlags.Static);
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
            const firstAccessorWithDecorators = firstAccessor.decorators ? firstAccessor : secondAccessor && secondAccessor.decorators ? secondAccessor : undefined;
            if (!firstAccessorWithDecorators || accessor !== firstAccessorWithDecorators) {
                return undefined;
            }

            const decorators = firstAccessorWithDecorators.decorators;
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
        function transformAllDecoratorsOfDeclaration(node: Declaration, container: ClassLikeDeclaration, allDecorators: AllDecorators) {
            if (!allDecorators) {
                return undefined;
            }

            const decoratorExpressions: Expression[] = [];
            addRange(decoratorExpressions, map(allDecorators.decorators, transformDecorator));
            addRange(decoratorExpressions, flatMap(allDecorators.parameters, transformDecoratorsOfParameter));
            addTypeMetadata(node, container, decoratorExpressions);
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
        function addClassElementDecorationStatements(statements: Statement[], node: ClassDeclaration, isStatic: boolean) {
            addRange(statements, map(generateClassElementDecorationExpressions(node, isStatic), expressionToStatement));
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
            const decoratorExpressions = transformAllDecoratorsOfDeclaration(member, node, allDecorators);
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
            //   ], C.prototype, "method", null);
            //
            // The emit for an accessor is:
            //
            //   __decorate([
            //       dec
            //   ], C.prototype, "accessor", null);
            //
            // The emit for a property is:
            //
            //   __decorate([
            //       dec
            //   ], C.prototype, "prop");
            //

            const prefix = getClassMemberPrefix(node, member);
            const memberName = getExpressionForPropertyName(member, /*generateNameForComputedPropertyName*/ true);
            const descriptor = languageVersion > ScriptTarget.ES3
                ? member.kind === SyntaxKind.PropertyDeclaration
                    // We emit `void 0` here to indicate to `__decorate` that it can invoke `Object.defineProperty` directly, but that it
                    // should not invoke `Object.getOwnPropertyDescriptor`.
                    ? createVoidZero()

                    // We emit `null` here to indicate to `__decorate` that it can invoke `Object.getOwnPropertyDescriptor` directly.
                    // We have this extra argument here so that we can inject an explicit property descriptor at a later date.
                    : createNull()
                : undefined;

            const helper = createDecorateHelper(
                context,
                decoratorExpressions,
                prefix,
                memberName,
                descriptor,
                moveRangePastDecorators(member)
            );

            setEmitFlags(helper, EmitFlags.NoComments);
            return helper;
        }

        /**
         * Generates a __decorate helper call for a class constructor.
         *
         * @param node The class node.
         */
        function addConstructorDecorationStatement(statements: Statement[], node: ClassDeclaration) {
            const expression = generateConstructorDecorationExpression(node);
            if (expression) {
                statements.push(setOriginalNode(createStatement(expression), node));
            }
        }

        /**
         * Generates a __decorate helper call for a class constructor.
         *
         * @param node The class node.
         */
        function generateConstructorDecorationExpression(node: ClassExpression | ClassDeclaration) {
            const allDecorators = getAllDecoratorsOfConstructor(node);
            const decoratorExpressions = transformAllDecoratorsOfDeclaration(node, node, allDecorators);
            if (!decoratorExpressions) {
                return undefined;
            }

            const classAlias = classAliases && classAliases[getOriginalNodeId(node)];
            const localName = getLocalName(node, /*allowComments*/ false, /*allowSourceMaps*/ true);
            const decorate = createDecorateHelper(context, decoratorExpressions, localName);
            const expression = createAssignment(localName, classAlias ? createAssignment(classAlias, decorate) : decorate);
            setEmitFlags(expression, EmitFlags.NoComments);
            setSourceMapRange(expression, moveRangePastDecorators(node));
            return expression;
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
                    const helper = createParamHelper(
                        context,
                        transformDecorator(decorator),
                        parameterOffset,
                        /*location*/ decorator.expression);
                    setEmitFlags(helper, EmitFlags.NoComments);
                    expressions.push(helper);
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
        function addTypeMetadata(node: Declaration, container: ClassLikeDeclaration, decoratorExpressions: Expression[]) {
            if (USE_NEW_TYPE_METADATA_FORMAT) {
                addNewTypeMetadata(node, container, decoratorExpressions);
            }
            else {
                addOldTypeMetadata(node, container, decoratorExpressions);
            }
        }

        function addOldTypeMetadata(node: Declaration, container: ClassLikeDeclaration, decoratorExpressions: Expression[]) {
            if (compilerOptions.emitDecoratorMetadata) {
                if (shouldAddTypeMetadata(node)) {
                    decoratorExpressions.push(createMetadataHelper(context, "design:type", serializeTypeOfNode(node)));
                }
                if (shouldAddParamTypesMetadata(node)) {
                    decoratorExpressions.push(createMetadataHelper(context, "design:paramtypes", serializeParameterTypesOfNode(node, container)));
                }
                if (shouldAddReturnTypeMetadata(node)) {
                    decoratorExpressions.push(createMetadataHelper(context, "design:returntype", serializeReturnTypeOfNode(node)));
                }
            }
        }

        function addNewTypeMetadata(node: Declaration, container: ClassLikeDeclaration, decoratorExpressions: Expression[]) {
            if (compilerOptions.emitDecoratorMetadata) {
                let properties: ObjectLiteralElementLike[];
                if (shouldAddTypeMetadata(node)) {
                    (properties || (properties = [])).push(createPropertyAssignment("type", createArrowFunction(/*modifiers*/ undefined, /*typeParameters*/ undefined, [], /*type*/ undefined, createToken(SyntaxKind.EqualsGreaterThanToken), serializeTypeOfNode(node))));
                }
                if (shouldAddParamTypesMetadata(node)) {
                    (properties || (properties = [])).push(createPropertyAssignment("paramTypes", createArrowFunction(/*modifiers*/ undefined, /*typeParameters*/ undefined, [], /*type*/ undefined, createToken(SyntaxKind.EqualsGreaterThanToken), serializeParameterTypesOfNode(node, container))));
                }
                if (shouldAddReturnTypeMetadata(node)) {
                    (properties || (properties = [])).push(createPropertyAssignment("returnType", createArrowFunction(/*modifiers*/ undefined, /*typeParameters*/ undefined, [], /*type*/ undefined, createToken(SyntaxKind.EqualsGreaterThanToken), serializeReturnTypeOfNode(node))));
                }
                if (properties) {
                    decoratorExpressions.push(createMetadataHelper(context, "design:typeinfo", createObjectLiteral(properties, /*location*/ undefined, /*multiLine*/ true)));
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
            switch (node.kind) {
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.ClassExpression:
                    return getFirstConstructorWithBody(<ClassLikeDeclaration>node) !== undefined;
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    return true;
            }
            return false;
        }

        type SerializedEntityNameAsExpression = Identifier | BinaryExpression | PropertyAccessExpression;
        type SerializedTypeNode = SerializedEntityNameAsExpression | VoidExpression | ConditionalExpression;

        /**
         * Serializes the type of a node for use with decorator type metadata.
         *
         * @param node The node that should have its type serialized.
         */
        function serializeTypeOfNode(node: Node): SerializedTypeNode {
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
         * Serializes the types of the parameters of a node for use with decorator type metadata.
         *
         * @param node The node that should have its parameter types serialized.
         */
        function serializeParameterTypesOfNode(node: Node, container: ClassLikeDeclaration): ArrayLiteralExpression {
            const valueDeclaration =
                isClassLike(node)
                    ? getFirstConstructorWithBody(node)
                    : isFunctionLike(node) && nodeIsPresent(node.body)
                        ? node
                        : undefined;

            const expressions: SerializedTypeNode[] = [];
            if (valueDeclaration) {
                const parameters = getParametersOfDecoratedDeclaration(valueDeclaration, container);
                const numParameters = parameters.length;
                for (let i = 0; i < numParameters; i++) {
                    const parameter = parameters[i];
                    if (i === 0 && isIdentifier(parameter.name) && parameter.name.text === "this") {
                        continue;
                    }
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

        function getParametersOfDecoratedDeclaration(node: FunctionLikeDeclaration, container: ClassLikeDeclaration) {
            if (container && node.kind === SyntaxKind.GetAccessor) {
                const { setAccessor } = getAllAccessorDeclarations(container.members, <AccessorDeclaration>node);
                if (setAccessor) {
                    return setAccessor.parameters;
                }
            }
            return node.parameters;
        }

        /**
         * Serializes the return type of a node for use with decorator type metadata.
         *
         * @param node The node that should have its return type serialized.
         */
        function serializeReturnTypeOfNode(node: Node): SerializedTypeNode {
            if (isFunctionLike(node) && node.type) {
                return serializeTypeNode(node.type);
            }
            else if (isAsyncFunctionLike(node)) {
                return createIdentifier("Promise");
            }

            return createVoidZero();
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
        function serializeTypeNode(node: TypeNode): SerializedTypeNode {
            if (node === undefined) {
                return createIdentifier("Object");
            }

            switch (node.kind) {
                case SyntaxKind.VoidKeyword:
                case SyntaxKind.UndefinedKeyword:
                case SyntaxKind.NullKeyword:
                case SyntaxKind.NeverKeyword:
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
                    return createIdentifier("String");

                case SyntaxKind.LiteralType:
                    switch ((<LiteralTypeNode>node).literal.kind) {
                        case SyntaxKind.StringLiteral:
                            return createIdentifier("String");

                        case SyntaxKind.NumericLiteral:
                            return createIdentifier("Number");

                        case SyntaxKind.TrueKeyword:
                        case SyntaxKind.FalseKeyword:
                            return createIdentifier("Boolean");

                        default:
                            Debug.failBadSyntaxKind((<LiteralTypeNode>node).literal);
                            break;
                    }
                    break;

                case SyntaxKind.NumberKeyword:
                    return createIdentifier("Number");

                case SyntaxKind.SymbolKeyword:
                    return languageVersion < ScriptTarget.ES2015
                        ? getGlobalSymbolNameWithFallback()
                        : createIdentifier("Symbol");

                case SyntaxKind.TypeReference:
                    return serializeTypeReferenceNode(<TypeReferenceNode>node);

                case SyntaxKind.IntersectionType:
                case SyntaxKind.UnionType:
                    return serializeUnionOrIntersectionType(<UnionOrIntersectionTypeNode>node);

                case SyntaxKind.TypeQuery:
                case SyntaxKind.TypeOperator:
                case SyntaxKind.IndexedAccessType:
                case SyntaxKind.MappedType:
                case SyntaxKind.TypeLiteral:
                case SyntaxKind.AnyKeyword:
                case SyntaxKind.ThisType:
                    break;

                default:
                    Debug.failBadSyntaxKind(node);
                    break;
            }

            return createIdentifier("Object");
        }

        function serializeUnionOrIntersectionType(node: UnionOrIntersectionTypeNode): SerializedTypeNode {
            let serializedUnion: SerializedTypeNode;
            for (const typeNode of node.types) {
                const serializedIndividual = serializeTypeNode(typeNode);

                if (isVoidExpression(serializedIndividual)) {
                    // If we dont have any other type already set, set the initial type
                    if (!serializedUnion) {
                        serializedUnion = serializedIndividual;
                    }
                }
                else if (isIdentifier(serializedIndividual) && serializedIndividual.text === "Object") {
                    // One of the individual is global object, return immediately
                    return serializedIndividual;
                }
                // If there exists union that is not void 0 expression, check if the the common type is identifier.
                // anything more complex and we will just default to Object
                else if (serializedUnion && !isVoidExpression(serializedUnion)) {
                    // Different types
                    if (!isIdentifier(serializedUnion) ||
                        !isIdentifier(serializedIndividual) ||
                        serializedUnion.text !== serializedIndividual.text) {
                        return createIdentifier("Object");
                    }
                }
                else {
                    // Initialize the union type
                    serializedUnion = serializedIndividual;
                }
            }

            // If we were able to find common type, use it
            return serializedUnion;
        }

        /**
         * Serializes a TypeReferenceNode to an appropriate JS constructor value for use with
         * decorator type metadata.
         *
         * @param node The type reference node.
         */
        function serializeTypeReferenceNode(node: TypeReferenceNode): SerializedTypeNode {
            switch (resolver.getTypeReferenceSerializationKind(node.typeName, currentScope)) {
                case TypeReferenceSerializationKind.Unknown:
                    const serialized = serializeEntityNameAsExpression(node.typeName, /*useFallback*/ true);
                    const temp = createTempVariable(hoistVariableDeclaration);
                    return createLogicalOr(
                        createLogicalAnd(
                            createTypeCheck(createAssignment(temp, serialized), "function"),
                            temp
                        ),
                        createIdentifier("Object")
                    );

                case TypeReferenceSerializationKind.TypeWithConstructSignatureAndValue:
                    return serializeEntityNameAsExpression(node.typeName, /*useFallback*/ false);

                case TypeReferenceSerializationKind.VoidNullableOrNeverType:
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
                    return languageVersion < ScriptTarget.ES2015
                        ? getGlobalSymbolNameWithFallback()
                        : createIdentifier("Symbol");

                case TypeReferenceSerializationKind.TypeWithCallSignature:
                    return createIdentifier("Function");

                case TypeReferenceSerializationKind.Promise:
                    return createIdentifier("Promise");

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
        function serializeEntityNameAsExpression(node: EntityName, useFallback: boolean): SerializedEntityNameAsExpression {
            switch (node.kind) {
                case SyntaxKind.Identifier:
                    // Create a clone of the name with a new parent, and treat it as if it were
                    // a source tree node for the purposes of the checker.
                    const name = getMutableClone(<Identifier>node);
                    name.flags &= ~NodeFlags.Synthesized;
                    name.original = undefined;
                    name.parent = currentScope;
                    if (useFallback) {
                        return createLogicalAnd(
                            createStrictInequality(
                                createTypeOf(name),
                                createLiteral("undefined")
                            ),
                            name
                        );
                    }

                    return name;

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
        function serializeQualifiedNameAsExpression(node: QualifiedName, useFallback: boolean): PropertyAccessExpression {
            let left: SerializedEntityNameAsExpression;
            if (node.left.kind === SyntaxKind.Identifier) {
                left = serializeEntityNameAsExpression(node.left, useFallback);
            }
            else if (useFallback) {
                const temp = createTempVariable(hoistVariableDeclaration);
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
        function getGlobalSymbolNameWithFallback(): ConditionalExpression {
            return createConditional(
                createTypeCheck(createIdentifier("Symbol"), "function"),
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
        function getExpressionForPropertyName(member: ClassElement | EnumMember, generateNameForComputedPropertyName: boolean): Expression {
            const name = member.name;
            if (isComputedPropertyName(name)) {
                return generateNameForComputedPropertyName
                    ? getGeneratedNameForNode(name)
                    : (<ComputedPropertyName>name).expression;
            }
            else if (isIdentifier(name)) {
                return createLiteral(unescapeIdentifier(name.text));
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
                return name;
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
                /*typeArguments*/ undefined,
                expression,
                node
            );
        }

        /**
         * Determines whether to emit a function-like declaration. We should not emit the
         * declaration if it does not have a body.
         *
         * @param node The declaration node.
         */
        function shouldEmitFunctionLikeDeclaration(node: FunctionLikeDeclaration) {
            return !nodeIsMissing(node.body);
        }

        function visitConstructor(node: ConstructorDeclaration) {
            if (!shouldEmitFunctionLikeDeclaration(node)) {
                return undefined;
            }

            return visitEachChild(node, visitor, context);
        }

        /**
         * Visits a method declaration of a class.
         *
         * This function will be called when one of the following conditions are met:
         * - The node is an overload
         * - The node is marked as abstract, public, private, protected, or readonly
         * - The node has both a decorator and a computed property name
         *
         * @param node The method node.
         */
        function visitMethodDeclaration(node: MethodDeclaration) {
            if (!shouldEmitFunctionLikeDeclaration(node)) {
                return undefined;
            }
            const updated = updateMethod(
                node,
                /*decorators*/ undefined,
                visitNodes(node.modifiers, modifierVisitor, isModifier),
                visitPropertyNameOfClassElement(node),
                /*typeParameters*/ undefined,
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                visitFunctionBody(node.body, visitor, context)
            );
            if (updated !== node) {
                // While we emit the source map for the node after skipping decorators and modifiers,
                // we need to emit the comments for the original range.
                setCommentRange(updated, node);
                setSourceMapRange(updated, moveRangePastDecorators(node));
            }
            return updated;
        }

        /**
         * Determines whether to emit an accessor declaration. We should not emit the
         * declaration if it does not have a body and is abstract.
         *
         * @param node The declaration node.
         */
        function shouldEmitAccessorDeclaration(node: AccessorDeclaration) {
            return !(nodeIsMissing(node.body) && hasModifier(node, ModifierFlags.Abstract));
        }

        /**
         * Visits a get accessor declaration of a class.
         *
         * This function will be called when one of the following conditions are met:
         * - The node is marked as abstract, public, private, or protected
         * - The node has both a decorator and a computed property name
         *
         * @param node The get accessor node.
         */
        function visitGetAccessor(node: GetAccessorDeclaration) {
            if (!shouldEmitAccessorDeclaration(node)) {
                return undefined;
            }
            const updated = updateGetAccessor(
                node,
                /*decorators*/ undefined,
                visitNodes(node.modifiers, modifierVisitor, isModifier),
                visitPropertyNameOfClassElement(node),
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                visitFunctionBody(node.body, visitor, context) || createBlock([])
            );
            if (updated !== node) {
                // While we emit the source map for the node after skipping decorators and modifiers,
                // we need to emit the comments for the original range.
                setCommentRange(updated, node);
                setSourceMapRange(updated, moveRangePastDecorators(node));
            }
            return updated;
        }

        /**
         * Visits a set accessor declaration of a class.
         *
         * This function will be called when one of the following conditions are met:
         * - The node is marked as abstract, public, private, or protected
         * - The node has both a decorator and a computed property name
         *
         * @param node The set accessor node.
         */
        function visitSetAccessor(node: SetAccessorDeclaration) {
            if (!shouldEmitAccessorDeclaration(node)) {
                return undefined;
            }
            const updated = updateSetAccessor(
                node,
                /*decorators*/ undefined,
                visitNodes(node.modifiers, modifierVisitor, isModifier),
                visitPropertyNameOfClassElement(node),
                visitParameterList(node.parameters, visitor, context),
                visitFunctionBody(node.body, visitor, context) || createBlock([])
            );
            if (updated !== node) {
                // While we emit the source map for the node after skipping decorators and modifiers,
                // we need to emit the comments for the original range.
                setCommentRange(updated, node);
                setSourceMapRange(updated, moveRangePastDecorators(node));
            }
            return updated;
        }

        /**
         * Visits a function declaration.
         *
         * This function will be called when one of the following conditions are met:
         * - The node is an overload
         * - The node is exported from a TypeScript namespace
         * - The node has decorators
         *
         * @param node The function node.
         */
        function visitFunctionDeclaration(node: FunctionDeclaration): VisitResult<Statement> {
            if (!shouldEmitFunctionLikeDeclaration(node)) {
                return createNotEmittedStatement(node);
            }
            const updated = updateFunctionDeclaration(
                node,
                /*decorators*/ undefined,
                visitNodes(node.modifiers, modifierVisitor, isModifier),
                node.name,
                /*typeParameters*/ undefined,
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                visitFunctionBody(node.body, visitor, context) || createBlock([])
            );
            if (isNamespaceExport(node)) {
                const statements: Statement[] = [updated];
                addExportMemberAssignment(statements, node);
                return statements;
            }
            return updated;
        }

        /**
         * Visits a function expression node.
         *
         * This function will be called when one of the following conditions are met:
         * - The node has type annotations
         *
         * @param node The function expression node.
         */
        function visitFunctionExpression(node: FunctionExpression): Expression {
            if (nodeIsMissing(node.body)) {
                return createOmittedExpression();
            }
            const updated = updateFunctionExpression(
                node,
                visitNodes(node.modifiers, modifierVisitor, isModifier),
                node.name,
                /*typeParameters*/ undefined,
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                visitFunctionBody(node.body, visitor, context)
            );
            return updated;
        }

        /**
         * @remarks
         * This function will be called when one of the following conditions are met:
         * - The node has type annotations
         */
        function visitArrowFunction(node: ArrowFunction) {
            const updated = updateArrowFunction(
                node,
                visitNodes(node.modifiers, modifierVisitor, isModifier),
                /*typeParameters*/ undefined,
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                visitFunctionBody(node.body, visitor, context)
            );
            return updated;
        }

        /**
         * Visits a parameter declaration node.
         *
         * This function will be called when one of the following conditions are met:
         * - The node has an accessibility modifier.
         * - The node has a questionToken.
         * - The node's kind is ThisKeyword.
         *
         * @param node The parameter declaration node.
         */
        function visitParameter(node: ParameterDeclaration) {
            if (parameterIsThisKeyword(node)) {
                return undefined;
            }

            const parameter = createParameter(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                node.dotDotDotToken,
                visitNode(node.name, visitor, isBindingName),
                /*questionToken*/ undefined,
                /*type*/ undefined,
                visitNode(node.initializer, visitor, isExpression),
                /*location*/ moveRangePastModifiers(node)
            );

            // While we emit the source map for the node after skipping decorators and modifiers,
            // we need to emit the comments for the original range.
            setOriginalNode(parameter, node);
            setCommentRange(parameter, node);
            setSourceMapRange(parameter, moveRangePastModifiers(node));
            setEmitFlags(parameter.name, EmitFlags.NoTrailingSourceMap);

            return parameter;
        }

        /**
         * Visits a variable statement in a namespace.
         *
         * This function will be called when one of the following conditions are met:
         * - The node is exported from a TypeScript namespace.
         */
        function visitVariableStatement(node: VariableStatement): Statement {
            if (isNamespaceExport(node)) {
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
            else {
                return visitEachChild(node, visitor, context);
            }
        }

        function transformInitializedVariable(node: VariableDeclaration): Expression {
            const name = node.name;
            if (isBindingPattern(name)) {
                return flattenDestructuringAssignment(
                    node,
                    visitor,
                    context,
                    FlattenLevel.All,
                    /*needsValue*/ false,
                    createNamespaceExportExpression
                );
            }
            else {
                return createAssignment(
                    getNamespaceMemberNameWithSourceMapsAndWithoutComments(name),
                    visitNode(node.initializer, visitor, isExpression),
                    /*location*/ node
                );
            }
        }

        function visitVariableDeclaration(node: VariableDeclaration) {
            return updateVariableDeclaration(
                node,
                visitNode(node.name, visitor, isBindingName),
                /*type*/ undefined,
                visitNode(node.initializer, visitor, isExpression));
        }

        /**
         * Visits a parenthesized expression that contains either a type assertion or an `as`
         * expression.
         *
         * @param node The parenthesized expression node.
         */
        function visitParenthesizedExpression(node: ParenthesizedExpression): Expression {
            const innerExpression = skipOuterExpressions(node.expression, ~OuterExpressionKinds.Assertions);
            if (isAssertionExpression(innerExpression)) {
                // Make sure we consider all nested cast expressions, e.g.:
                // (<any><number><any>-A).x;
                const expression = visitNode(node.expression, visitor, isExpression);

                // We have an expression of the form: (<Type>SubExpr). Emitting this as (SubExpr)
                // is really not desirable. We would like to emit the subexpression as-is. Omitting
                // the parentheses, however, could cause change in the semantics of the generated
                // code if the casted expression has a lower precedence than the rest of the
                // expression.
                //
                // Due to the auto-parenthesization rules used by the visitor and factory functions
                // we can safely elide the parentheses here, as a new synthetic
                // ParenthesizedExpression will be inserted if we remove parentheses too
                // aggressively.
                //
                // To preserve comments, we return a "PartiallyEmittedExpression" here which will
                // preserve the position information of the original expression.
                return createPartiallyEmittedExpression(expression, node);
            }

            return visitEachChild(node, visitor, context);
        }

        function visitAssertionExpression(node: AssertionExpression): Expression {
            const expression = visitNode(node.expression, visitor, isExpression);
            return createPartiallyEmittedExpression(expression, node);
        }

        function visitNonNullExpression(node: NonNullExpression): Expression {
            const expression = visitNode(node.expression, visitor, isLeftHandSideExpression);
            return createPartiallyEmittedExpression(expression, node);
        }

        function visitCallExpression(node: CallExpression) {
            return updateCall(
                node,
                visitNode(node.expression, visitor, isExpression),
                /*typeArguments*/ undefined,
                visitNodes(node.arguments, visitor, isExpression));
        }

        function visitNewExpression(node: NewExpression) {
            return updateNew(
                node,
                visitNode(node.expression, visitor, isExpression),
                /*typeArguments*/ undefined,
                visitNodes(node.arguments, visitor, isExpression));
        }

        /**
         * Determines whether to emit an enum declaration.
         *
         * @param node The enum declaration node.
         */
        function shouldEmitEnumDeclaration(node: EnumDeclaration) {
            return !isConst(node)
                || compilerOptions.preserveConstEnums
                || compilerOptions.isolatedModules;
        }

        /**
         * Visits an enum declaration.
         *
         * This function will be called any time a TypeScript enum is encountered.
         *
         * @param node The enum declaration node.
         */
        function visitEnumDeclaration(node: EnumDeclaration): VisitResult<Statement> {
            if (!shouldEmitEnumDeclaration(node)) {
                return undefined;
            }

            const statements: Statement[] = [];

            // We request to be advised when the printer is about to print this node. This allows
            // us to set up the correct state for later substitutions.
            let emitFlags = EmitFlags.AdviseOnEmitNode;

            // If needed, we should emit a variable declaration for the enum. If we emit
            // a leading variable declaration, we should not emit leading comments for the
            // enum body.
            if (addVarForEnumOrModuleDeclaration(statements, node)) {
                // We should still emit the comments if we are emitting a system module.
                if (moduleKind !== ModuleKind.System || currentScope !== currentSourceFile) {
                    emitFlags |= EmitFlags.NoLeadingComments;
                }
            }

            // `parameterName` is the declaration name used inside of the enum.
            const parameterName = getNamespaceParameterName(node);

            // `containerName` is the expression used inside of the enum for assignments.
            const containerName = getNamespaceContainerName(node);

            // `exportName` is the expression used within this node's container for any exported references.
            const exportName = hasModifier(node, ModifierFlags.Export)
                ? getExternalModuleOrNamespaceExportName(currentNamespaceContainerName, node, /*allowComments*/ false, /*allowSourceMaps*/ true)
                : getLocalName(node, /*allowComments*/ false, /*allowSourceMaps*/ true);

            //  x || (x = {})
            //  exports.x || (exports.x = {})
            let moduleArg =
                createLogicalOr(
                    exportName,
                    createAssignment(
                        exportName,
                        createObjectLiteral()
                    )
                );

            if (hasNamespaceQualifiedExportName(node)) {
                // `localName` is the expression used within this node's containing scope for any local references.
                const localName = getLocalName(node, /*allowComments*/ false, /*allowSourceMaps*/ true);

                //  x = (exports.x || (exports.x = {}))
                moduleArg = createAssignment(localName, moduleArg);
            }

            //  (function (x) {
            //      x[x["y"] = 0] = "y";
            //      ...
            //  })(x || (x = {}));
            const enumStatement = createStatement(
                createCall(
                    createFunctionExpression(
                        /*modifiers*/ undefined,
                        /*asteriskToken*/ undefined,
                        /*name*/ undefined,
                        /*typeParameters*/ undefined,
                        [createParameter(/*decorators*/ undefined, /*modifiers*/ undefined, /*dotDotDotToken*/ undefined, parameterName)],
                        /*type*/ undefined,
                        transformEnumBody(node, containerName)
                    ),
                    /*typeArguments*/ undefined,
                    [moduleArg]
                ),
                /*location*/ node
            );

            setOriginalNode(enumStatement, node);
            setEmitFlags(enumStatement, emitFlags);
            statements.push(enumStatement);

            // Add a DeclarationMarker for the enum to preserve trailing comments and mark
            // the end of the declaration.
            statements.push(createEndOfDeclarationMarker(node));
            return statements;
        }

        /**
         * Transforms the body of an enum declaration.
         *
         * @param node The enum declaration node.
         */
        function transformEnumBody(node: EnumDeclaration, localName: Identifier): Block {
            const savedCurrentNamespaceLocalName = currentNamespaceContainerName;
            currentNamespaceContainerName = localName;

            const statements: Statement[] = [];
            startLexicalEnvironment();
            addRange(statements, map(node.members, transformEnumMember));
            addRange(statements, endLexicalEnvironment());

            currentNamespaceContainerName = savedCurrentNamespaceLocalName;
            return createBlock(
                createNodeArray(statements, /*location*/ node.members),
                /*location*/ undefined,
                /*multiLine*/ true
            );
        }

        /**
         * Transforms an enum member into a statement.
         *
         * @param member The enum member node.
         */
        function transformEnumMember(member: EnumMember): Statement {
            // enums don't support computed properties
            // we pass false as 'generateNameForComputedPropertyName' for a backward compatibility purposes
            // old emitter always generate 'expression' part of the name as-is.
            const name = getExpressionForPropertyName(member, /*generateNameForComputedPropertyName*/ false);
            return createStatement(
                createAssignment(
                    createElementAccess(
                        currentNamespaceContainerName,
                        createAssignment(
                            createElementAccess(
                                currentNamespaceContainerName,
                                name
                            ),
                            transformEnumMemberDeclarationValue(member)
                        )
                    ),
                    name,
                    /*location*/ member
                ),
                /*location*/ member
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
            else {
                enableSubstitutionForNonQualifiedEnumMembers();
                if (member.initializer) {
                    return visitNode(member.initializer, visitor, isExpression);
                }
                else {
                    return createVoidZero();
                }
            }
        }

        /**
         * Determines whether to elide a module declaration.
         *
         * @param node The module declaration node.
         */
        function shouldEmitModuleDeclaration(node: ModuleDeclaration) {
            return isInstantiatedModule(node, compilerOptions.preserveConstEnums || compilerOptions.isolatedModules);
        }

        /**
         * Determines whether an exported declaration will have a qualified export name (e.g. `f.x`
         * or `exports.x`).
         */
        function hasNamespaceQualifiedExportName(node: Node) {
            return isNamespaceExport(node)
                || (isExternalModuleExport(node)
                    && moduleKind !== ModuleKind.ES2015
                    && moduleKind !== ModuleKind.System);
        }

        /**
         * Records that a declaration was emitted in the current scope, if it was the first
         * declaration for the provided symbol.
         *
         * NOTE: if there is ever a transformation above this one, we may not be able to rely
         *       on symbol names.
         */
        function recordEmittedDeclarationInScope(node: Node) {
            const name = node.symbol && node.symbol.name;
            if (name) {
                if (!currentScopeFirstDeclarationsOfName) {
                    currentScopeFirstDeclarationsOfName = createMap<Node>();
                }

                if (!currentScopeFirstDeclarationsOfName.has(name)) {
                    currentScopeFirstDeclarationsOfName.set(name, node);
                }
            }
        }

        /**
         * Determines whether a declaration is the first declaration with the same name emitted
         * in the current scope.
         */
        function isFirstEmittedDeclarationInScope(node: Node) {
            if (currentScopeFirstDeclarationsOfName) {
                const name = node.symbol && node.symbol.name;
                if (name) {
                    return currentScopeFirstDeclarationsOfName.get(name) === node;
                }
            }

            return false;
        }

        /**
         * Adds a leading VariableStatement for a enum or module declaration.
         */
        function addVarForEnumOrModuleDeclaration(statements: Statement[], node: ModuleDeclaration | EnumDeclaration) {
            // Emit a variable statement for the module.
            const statement = createVariableStatement(
                visitNodes(node.modifiers, modifierVisitor, isModifier),
                [
                    createVariableDeclaration(
                        getLocalName(node, /*allowComments*/ false, /*allowSourceMaps*/ true)
                    )
                ]
            );

            setOriginalNode(statement, node);

            recordEmittedDeclarationInScope(node);
            if (isFirstEmittedDeclarationInScope(node)) {
                // Adjust the source map emit to match the old emitter.
                if (node.kind === SyntaxKind.EnumDeclaration) {
                    setSourceMapRange(statement.declarationList, node);
                }
                else {
                    setSourceMapRange(statement, node);
                }

                // Trailing comments for module declaration should be emitted after the function closure
                // instead of the variable statement:
                //
                //     /** Module comment*/
                //     module m1 {
                //         function foo4Export() {
                //         }
                //     } // trailing comment module
                //
                // Should emit:
                //
                //     /** Module comment*/
                //     var m1;
                //     (function (m1) {
                //         function foo4Export() {
                //         }
                //     })(m1 || (m1 = {})); // trailing comment module
                //
                setCommentRange(statement, node);
                setEmitFlags(statement, EmitFlags.NoTrailingComments | EmitFlags.HasEndOfDeclarationMarker);
                statements.push(statement);
                return true;
            }
            else {
                // For an EnumDeclaration or ModuleDeclaration that merges with a preceeding
                // declaration we do not emit a leading variable declaration. To preserve the
                // begin/end semantics of the declararation and to properly handle exports
                // we wrap the leading variable declaration in a `MergeDeclarationMarker`.
                const mergeMarker = createMergeDeclarationMarker(statement);
                setEmitFlags(mergeMarker, EmitFlags.NoComments | EmitFlags.HasEndOfDeclarationMarker);
                statements.push(mergeMarker);
                return false;
            }
        }

        /**
         * Visits a module declaration node.
         *
         * This function will be called any time a TypeScript namespace (ModuleDeclaration) is encountered.
         *
         * @param node The module declaration node.
         */
        function visitModuleDeclaration(node: ModuleDeclaration): VisitResult<Statement> {
            if (!shouldEmitModuleDeclaration(node)) {
                return createNotEmittedStatement(node);
            }

            Debug.assert(isIdentifier(node.name), "TypeScript module should have an Identifier name.");
            enableSubstitutionForNamespaceExports();

            const statements: Statement[] = [];

            // We request to be advised when the printer is about to print this node. This allows
            // us to set up the correct state for later substitutions.
            let emitFlags = EmitFlags.AdviseOnEmitNode;

            // If needed, we should emit a variable declaration for the module. If we emit
            // a leading variable declaration, we should not emit leading comments for the
            // module body.
            if (addVarForEnumOrModuleDeclaration(statements, node)) {
                // We should still emit the comments if we are emitting a system module.
                if (moduleKind !== ModuleKind.System || currentScope !== currentSourceFile) {
                    emitFlags |= EmitFlags.NoLeadingComments;
                }
            }

            // `parameterName` is the declaration name used inside of the namespace.
            const parameterName = getNamespaceParameterName(node);

            // `containerName` is the expression used inside of the namespace for exports.
            const containerName = getNamespaceContainerName(node);

            // `exportName` is the expression used within this node's container for any exported references.
            const exportName = hasModifier(node, ModifierFlags.Export)
                ? getExternalModuleOrNamespaceExportName(currentNamespaceContainerName, node, /*allowComments*/ false, /*allowSourceMaps*/ true)
                : getLocalName(node, /*allowComments*/ false, /*allowSourceMaps*/ true);

            //  x || (x = {})
            //  exports.x || (exports.x = {})
            let moduleArg =
                createLogicalOr(
                    exportName,
                    createAssignment(
                        exportName,
                        createObjectLiteral()
                    )
                );

            if (hasNamespaceQualifiedExportName(node)) {
                // `localName` is the expression used within this node's containing scope for any local references.
                const localName = getLocalName(node, /*allowComments*/ false, /*allowSourceMaps*/ true);

                //  x = (exports.x || (exports.x = {}))
                moduleArg = createAssignment(localName, moduleArg);
            }

            //  (function (x_1) {
            //      x_1.y = ...;
            //  })(x || (x = {}));
            const moduleStatement = createStatement(
                createCall(
                    createFunctionExpression(
                        /*modifiers*/ undefined,
                        /*asteriskToken*/ undefined,
                        /*name*/ undefined,
                        /*typeParameters*/ undefined,
                        [createParameter(/*decorators*/ undefined, /*modifiers*/ undefined, /*dotDotDotToken*/ undefined, parameterName)],
                        /*type*/ undefined,
                        transformModuleBody(node, containerName)
                    ),
                    /*typeArguments*/ undefined,
                    [moduleArg]
                ),
                /*location*/ node
            );

            setOriginalNode(moduleStatement, node);
            setEmitFlags(moduleStatement, emitFlags);
            statements.push(moduleStatement);

            // Add a DeclarationMarker for the namespace to preserve trailing comments and mark
            // the end of the declaration.
            statements.push(createEndOfDeclarationMarker(node));
            return statements;
        }

        /**
         * Transforms the body of a module declaration.
         *
         * @param node The module declaration node.
         */
        function transformModuleBody(node: ModuleDeclaration, namespaceLocalName: Identifier): Block {
            const savedCurrentNamespaceContainerName = currentNamespaceContainerName;
            const savedCurrentNamespace = currentNamespace;
            const savedCurrentScopeFirstDeclarationsOfName = currentScopeFirstDeclarationsOfName;
            currentNamespaceContainerName = namespaceLocalName;
            currentNamespace = node;
            currentScopeFirstDeclarationsOfName = undefined;

            const statements: Statement[] = [];
            startLexicalEnvironment();

            let statementsLocation: TextRange;
            let blockLocation: TextRange;
            const body = node.body;
            if (body.kind === SyntaxKind.ModuleBlock) {
                saveStateAndInvoke(body, body => addRange(statements, visitNodes((<ModuleBlock>body).statements, namespaceElementVisitor, isStatement)));
                statementsLocation = (<ModuleBlock>body).statements;
                blockLocation = body;
            }
            else {
                const result = visitModuleDeclaration(<ModuleDeclaration>body);
                if (result) {
                    if (isArray(result)) {
                        addRange(statements, result);
                    }
                    else {
                        statements.push(result);
                    }
                }

                const moduleBlock = <ModuleBlock>getInnerMostModuleDeclarationFromDottedModule(node).body;
                statementsLocation = moveRangePos(moduleBlock.statements, -1);
            }

            addRange(statements, endLexicalEnvironment());
            currentNamespaceContainerName = savedCurrentNamespaceContainerName;
            currentNamespace = savedCurrentNamespace;
            currentScopeFirstDeclarationsOfName = savedCurrentScopeFirstDeclarationsOfName;

            const block = createBlock(
                createNodeArray(
                    statements,
                    /*location*/ statementsLocation
                ),
                /*location*/ blockLocation,
                /*multiLine*/ true
            );

            // namespace hello.hi.world {
            //      function foo() {}
            //
            //      // TODO, blah
            // }
            //
            // should be emitted as
            //
            // var hello;
            // (function (hello) {
            //     var hi;
            //     (function (hi) {
            //         var world;
            //         (function (world) {
            //             function foo() { }
            //             // TODO, blah
            //         })(world = hi.world || (hi.world = {}));
            //     })(hi = hello.hi || (hello.hi = {}));
            // })(hello || (hello = {}));
            // We only want to emit comment on the namespace which contains block body itself, not the containing namespaces.
            if (body.kind !== SyntaxKind.ModuleBlock) {
                setEmitFlags(block, getEmitFlags(block) | EmitFlags.NoComments);
            }
            return block;
        }

        function getInnerMostModuleDeclarationFromDottedModule(moduleDeclaration: ModuleDeclaration): ModuleDeclaration {
            if (moduleDeclaration.body.kind === SyntaxKind.ModuleDeclaration) {
                const recursiveInnerModule = getInnerMostModuleDeclarationFromDottedModule(<ModuleDeclaration>moduleDeclaration.body);
                return recursiveInnerModule || <ModuleDeclaration>moduleDeclaration.body;
            }
        }

        /**
         * Visits an import declaration, eliding it if it is not referenced.
         *
         * @param node The import declaration node.
         */
        function visitImportDeclaration(node: ImportDeclaration): VisitResult<Statement> {
            if (!node.importClause) {
                // Do not elide a side-effect only import declaration.
                //  import "foo";
                return node;
            }

            // Elide the declaration if the import clause was elided.
            const importClause = visitNode(node.importClause, visitImportClause, isImportClause, /*optional*/ true);
            return importClause
                ? updateImportDeclaration(
                    node,
                    /*decorators*/ undefined,
                    /*modifiers*/ undefined,
                    importClause,
                    node.moduleSpecifier)
                : undefined;
        }

        /**
         * Visits an import clause, eliding it if it is not referenced.
         *
         * @param node The import clause node.
         */
        function visitImportClause(node: ImportClause): VisitResult<ImportClause> {
            // Elide the import clause if we elide both its name and its named bindings.
            const name = resolver.isReferencedAliasDeclaration(node) ? node.name : undefined;
            const namedBindings = visitNode(node.namedBindings, visitNamedImportBindings, isNamedImportBindings, /*optional*/ true);
            return (name || namedBindings) ? updateImportClause(node, name, namedBindings) : undefined;
        }

        /**
         * Visits named import bindings, eliding it if it is not referenced.
         *
         * @param node The named import bindings node.
         */
        function visitNamedImportBindings(node: NamedImportBindings): VisitResult<NamedImportBindings> {
            if (node.kind === SyntaxKind.NamespaceImport) {
                // Elide a namespace import if it is not referenced.
                return resolver.isReferencedAliasDeclaration(node) ? node : undefined;
            }
            else {
                // Elide named imports if all of its import specifiers are elided.
                const elements = visitNodes(node.elements, visitImportSpecifier, isImportSpecifier);
                return some(elements) ? updateNamedImports(node, elements) : undefined;
            }
        }

        /**
         * Visits an import specifier, eliding it if it is not referenced.
         *
         * @param node The import specifier node.
         */
        function visitImportSpecifier(node: ImportSpecifier): VisitResult<ImportSpecifier> {
            // Elide an import specifier if it is not referenced.
            return resolver.isReferencedAliasDeclaration(node) ? node : undefined;
        }

        /**
         * Visits an export assignment, eliding it if it does not contain a clause that resolves
         * to a value.
         *
         * @param node The export assignment node.
         */
        function visitExportAssignment(node: ExportAssignment): VisitResult<Statement> {
            // Elide the export assignment if it does not reference a value.
            return resolver.isValueAliasDeclaration(node)
                ? visitEachChild(node, visitor, context)
                : undefined;
        }

        /**
         * Visits an export declaration, eliding it if it does not contain a clause that resolves
         * to a value.
         *
         * @param node The export declaration node.
         */
        function visitExportDeclaration(node: ExportDeclaration): VisitResult<Statement> {
            if (!node.exportClause) {
                // Elide a star export if the module it references does not export a value.
                return resolver.moduleExportsSomeValue(node.moduleSpecifier) ? node : undefined;
            }

            if (!resolver.isValueAliasDeclaration(node)) {
                // Elide the export declaration if it does not export a value.
                return undefined;
            }

            // Elide the export declaration if all of its named exports are elided.
            const exportClause = visitNode(node.exportClause, visitNamedExports, isNamedExports, /*optional*/ true);
            return exportClause
                ? updateExportDeclaration(
                    node,
                    /*decorators*/ undefined,
                    /*modifiers*/ undefined,
                    exportClause,
                    node.moduleSpecifier)
                : undefined;
        }

        /**
         * Visits named exports, eliding it if it does not contain an export specifier that
         * resolves to a value.
         *
         * @param node The named exports node.
         */
        function visitNamedExports(node: NamedExports): VisitResult<NamedExports> {
            // Elide the named exports if all of its export specifiers were elided.
            const elements = visitNodes(node.elements, visitExportSpecifier, isExportSpecifier);
            return some(elements) ? updateNamedExports(node, elements) : undefined;
        }

        /**
         * Visits an export specifier, eliding it if it does not resolve to a value.
         *
         * @param node The export specifier node.
         */
        function visitExportSpecifier(node: ExportSpecifier): VisitResult<ExportSpecifier> {
            // Elide an export specifier if it does not reference a value.
            return resolver.isValueAliasDeclaration(node) ? node : undefined;
        }

        /**
         * Determines whether to emit an import equals declaration.
         *
         * @param node The import equals declaration node.
         */
        function shouldEmitImportEqualsDeclaration(node: ImportEqualsDeclaration) {
            // preserve old compiler's behavior: emit 'var' for import declaration (even if we do not consider them referenced) when
            // - current file is not external module
            // - import declaration is top level and target is value imported by entity name
            return resolver.isReferencedAliasDeclaration(node)
                || (!isExternalModule(currentSourceFile)
                    && resolver.isTopLevelValueImportEqualsWithEntityName(node));
        }

        /**
         * Visits an import equals declaration.
         *
         * @param node The import equals declaration node.
         */
        function visitImportEqualsDeclaration(node: ImportEqualsDeclaration): VisitResult<Statement> {
            if (isExternalModuleImportEqualsDeclaration(node)) {
                // Elide external module `import=` if it is not referenced.
                return resolver.isReferencedAliasDeclaration(node)
                    ? visitEachChild(node, visitor, context)
                    : undefined;
            }

            if (!shouldEmitImportEqualsDeclaration(node)) {
                return undefined;
            }

            const moduleReference = createExpressionFromEntityName(<EntityName>node.moduleReference);
            setEmitFlags(moduleReference, EmitFlags.NoComments | EmitFlags.NoNestedComments);

            if (isNamedExternalModuleExport(node) || !isNamespaceExport(node)) {
                //  export var ${name} = ${moduleReference};
                //  var ${name} = ${moduleReference};
                return setOriginalNode(
                    createVariableStatement(
                        visitNodes(node.modifiers, modifierVisitor, isModifier),
                        createVariableDeclarationList([
                            setOriginalNode(
                                createVariableDeclaration(
                                    node.name,
                                    /*type*/ undefined,
                                    moduleReference
                                ),
                                node
                            )
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
                        node.name,
                        moduleReference,
                        node
                    ),
                    node
                );
            }
        }

        /**
         * Gets a value indicating whether the node is exported from a namespace.
         *
         * @param node The node to test.
         */
        function isNamespaceExport(node: Node) {
            return currentNamespace !== undefined && hasModifier(node, ModifierFlags.Export);
        }

        /**
         * Gets a value indicating whether the node is exported from an external module.
         *
         * @param node The node to test.
         */
        function isExternalModuleExport(node: Node) {
            return currentNamespace === undefined && hasModifier(node, ModifierFlags.Export);
        }

        /**
         * Gets a value indicating whether the node is a named export from an external module.
         *
         * @param node The node to test.
         */
        function isNamedExternalModuleExport(node: Node) {
            return isExternalModuleExport(node)
                && !hasModifier(node, ModifierFlags.Default);
        }

        /**
         * Gets a value indicating whether the node is the default export of an external module.
         *
         * @param node The node to test.
         */
        function isDefaultExternalModuleExport(node: Node) {
            return isExternalModuleExport(node)
                && hasModifier(node, ModifierFlags.Default);
        }

        /**
         * Creates a statement for the provided expression. This is used in calls to `map`.
         */
        function expressionToStatement(expression: Expression) {
            return createStatement(expression, /*location*/ undefined);
        }

        function addExportMemberAssignment(statements: Statement[], node: ClassDeclaration | FunctionDeclaration) {
            const expression = createAssignment(
                getExternalModuleOrNamespaceExportName(currentNamespaceContainerName, node, /*allowComments*/ false, /*allowSourceMaps*/ true),
                getLocalName(node)
            );
            setSourceMapRange(expression, createRange(node.name.pos, node.end));

            const statement = createStatement(expression);
            setSourceMapRange(statement, createRange(-1, node.end));
            statements.push(statement);
        }

        function createNamespaceExport(exportName: Identifier, exportValue: Expression, location?: TextRange) {
            return createStatement(
                createAssignment(
                    getNamespaceMemberName(currentNamespaceContainerName, exportName, /*allowComments*/ false, /*allowSourceMaps*/ true),
                    exportValue
                ),
                location
            );
        }

        function createNamespaceExportExpression(exportName: Identifier, exportValue: Expression, location?: TextRange) {
            return createAssignment(getNamespaceMemberNameWithSourceMapsAndWithoutComments(exportName), exportValue, location);
        }

        function getNamespaceMemberNameWithSourceMapsAndWithoutComments(name: Identifier) {
            return getNamespaceMemberName(currentNamespaceContainerName, name, /*allowComments*/ false, /*allowSourceMaps*/ true);
        }

        /**
         * Gets the declaration name used inside of a namespace or enum.
         */
        function getNamespaceParameterName(node: ModuleDeclaration | EnumDeclaration) {
            const name = getGeneratedNameForNode(node);
            setSourceMapRange(name, node.name);
            return name;
        }

        /**
         * Gets the expression used to refer to a namespace or enum within the body
         * of its declaration.
         */
        function getNamespaceContainerName(node: ModuleDeclaration | EnumDeclaration) {
            return getGeneratedNameForNode(node);
        }

        /**
         * Gets a local alias for a class declaration if it is a decorated class with an internal
         * reference to the static side of the class. This is necessary to avoid issues with
         * double-binding semantics for the class name.
         */
        function getClassAliasIfNeeded(node: ClassDeclaration) {
            if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.ClassWithConstructorReference) {
                enableSubstitutionForClassAliases();
                const classAlias = createUniqueName(node.name && !isGeneratedIdentifier(node.name) ? node.name.text : "default");
                classAliases[getOriginalNodeId(node)] = classAlias;
                hoistVariableDeclaration(classAlias);
                return classAlias;
            }
        }

        function getClassPrototype(node: ClassExpression | ClassDeclaration) {
            return createPropertyAccess(getDeclarationName(node), "prototype");
        }

        function getClassMemberPrefix(node: ClassExpression | ClassDeclaration, member: ClassElement) {
            return hasModifier(member, ModifierFlags.Static)
                ? getDeclarationName(node)
                : getClassPrototype(node);
        }

        function enableSubstitutionForNonQualifiedEnumMembers() {
            if ((enabledSubstitutions & TypeScriptSubstitutionFlags.NonQualifiedEnumMembers) === 0) {
                enabledSubstitutions |= TypeScriptSubstitutionFlags.NonQualifiedEnumMembers;
                context.enableSubstitution(SyntaxKind.Identifier);
            }
        }

        function enableSubstitutionForClassAliases() {
            if ((enabledSubstitutions & TypeScriptSubstitutionFlags.ClassAliases) === 0) {
                enabledSubstitutions |= TypeScriptSubstitutionFlags.ClassAliases;

                // We need to enable substitutions for identifiers. This allows us to
                // substitute class names inside of a class declaration.
                context.enableSubstitution(SyntaxKind.Identifier);

                // Keep track of class aliases.
                classAliases = [];
            }
        }

        function enableSubstitutionForNamespaceExports() {
            if ((enabledSubstitutions & TypeScriptSubstitutionFlags.NamespaceExports) === 0) {
                enabledSubstitutions |= TypeScriptSubstitutionFlags.NamespaceExports;

                // We need to enable substitutions for identifiers and shorthand property assignments. This allows us to
                // substitute the names of exported members of a namespace.
                context.enableSubstitution(SyntaxKind.Identifier);
                context.enableSubstitution(SyntaxKind.ShorthandPropertyAssignment);

                // We need to be notified when entering and exiting namespaces.
                context.enableEmitNotification(SyntaxKind.ModuleDeclaration);
            }
        }

        function isTransformedModuleDeclaration(node: Node): boolean {
            return getOriginalNode(node).kind === SyntaxKind.ModuleDeclaration;
        }

        function isTransformedEnumDeclaration(node: Node): boolean {
            return getOriginalNode(node).kind === SyntaxKind.EnumDeclaration;
        }

        /**
         * Hook for node emit.
         *
         * @param hint A hint as to the intended usage of the node.
         * @param node The node to emit.
         * @param emit A callback used to emit the node in the printer.
         */
        function onEmitNode(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void): void {
            const savedApplicableSubstitutions = applicableSubstitutions;

            if (enabledSubstitutions & TypeScriptSubstitutionFlags.NamespaceExports && isTransformedModuleDeclaration(node)) {
                applicableSubstitutions |= TypeScriptSubstitutionFlags.NamespaceExports;
            }

            if (enabledSubstitutions & TypeScriptSubstitutionFlags.NonQualifiedEnumMembers && isTransformedEnumDeclaration(node)) {
                applicableSubstitutions |= TypeScriptSubstitutionFlags.NonQualifiedEnumMembers;
            }

            previousOnEmitNode(hint, node, emitCallback);

            applicableSubstitutions = savedApplicableSubstitutions;
        }

        /**
         * Hooks node substitutions.
         *
         * @param hint A hint as to the intended usage of the node.
         * @param node The node to substitute.
         */
        function onSubstituteNode(hint: EmitHint, node: Node) {
            node = previousOnSubstituteNode(hint, node);
            if (hint === EmitHint.Expression) {
                return substituteExpression(<Expression>node);
            }
            else if (isShorthandPropertyAssignment(node)) {
                return substituteShorthandPropertyAssignment(node);
            }

            return node;
        }

        function substituteShorthandPropertyAssignment(node: ShorthandPropertyAssignment): ObjectLiteralElementLike {
            if (enabledSubstitutions & TypeScriptSubstitutionFlags.NamespaceExports) {
                const name = node.name;
                const exportedName = trySubstituteNamespaceExportedName(name);
                if (exportedName) {
                    // A shorthand property with an assignment initializer is probably part of a
                    // destructuring assignment
                    if (node.objectAssignmentInitializer) {
                        const initializer = createAssignment(exportedName, node.objectAssignmentInitializer);
                        return createPropertyAssignment(name, initializer, /*location*/ node);
                    }
                    return createPropertyAssignment(name, exportedName, /*location*/ node);
                }
            }
            return node;
        }

        function substituteExpression(node: Expression) {
            switch (node.kind) {
                case SyntaxKind.Identifier:
                    return substituteExpressionIdentifier(<Identifier>node);
                case SyntaxKind.PropertyAccessExpression:
                    return substitutePropertyAccessExpression(<PropertyAccessExpression>node);
                case SyntaxKind.ElementAccessExpression:
                    return substituteElementAccessExpression(<ElementAccessExpression>node);
            }

            return node;
        }

        function substituteExpressionIdentifier(node: Identifier): Expression {
            return trySubstituteClassAlias(node)
                || trySubstituteNamespaceExportedName(node)
                || node;
        }

        function trySubstituteClassAlias(node: Identifier): Expression {
            if (enabledSubstitutions & TypeScriptSubstitutionFlags.ClassAliases) {
                if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.ConstructorReferenceInClass) {
                    // Due to the emit for class decorators, any reference to the class from inside of the class body
                    // must instead be rewritten to point to a temporary variable to avoid issues with the double-bind
                    // behavior of class names in ES6.
                    // Also, when emitting statics for class expressions, we must substitute a class alias for
                    // constructor references in static property initializers.
                    const declaration = resolver.getReferencedValueDeclaration(node);
                    if (declaration) {
                        const classAlias = classAliases[declaration.id];
                        if (classAlias) {
                            const clone = getSynthesizedClone(classAlias);
                            setSourceMapRange(clone, node);
                            setCommentRange(clone, node);
                            return clone;
                        }
                    }
                }
            }

            return undefined;
        }

        function trySubstituteNamespaceExportedName(node: Identifier): Expression {
            // If this is explicitly a local name, do not substitute.
            if (enabledSubstitutions & applicableSubstitutions && !isGeneratedIdentifier(node) && !isLocalName(node)) {
                // If we are nested within a namespace declaration, we may need to qualifiy
                // an identifier that is exported from a merged namespace.
                const container = resolver.getReferencedExportContainer(node, /*prefixLocals*/ false);
                if (container && container.kind !== SyntaxKind.SourceFile) {
                    const substitute =
                        (applicableSubstitutions & TypeScriptSubstitutionFlags.NamespaceExports && container.kind === SyntaxKind.ModuleDeclaration) ||
                        (applicableSubstitutions & TypeScriptSubstitutionFlags.NonQualifiedEnumMembers && container.kind === SyntaxKind.EnumDeclaration);
                    if (substitute) {
                        return createPropertyAccess(getGeneratedNameForNode(container), node, /*location*/ node);
                    }
                }
            }

            return undefined;
        }

        function substitutePropertyAccessExpression(node: PropertyAccessExpression) {
            return substituteConstantValue(node);
        }

        function substituteElementAccessExpression(node: ElementAccessExpression) {
            return substituteConstantValue(node);
        }

        function substituteConstantValue(node: PropertyAccessExpression | ElementAccessExpression): LeftHandSideExpression {
            const constantValue = tryGetConstEnumValue(node);
            if (constantValue !== undefined) {
                const substitute = createLiteral(constantValue);
                setSourceMapRange(substitute, node);
                setCommentRange(substitute, node);
                if (!compilerOptions.removeComments) {
                    const propertyName = isPropertyAccessExpression(node)
                        ? declarationNameToString(node.name)
                        : getTextOfNode(node.argumentExpression);
                    substitute.trailingComment = ` ${propertyName} `;
                }

                setConstantValue(node, constantValue);
                return substitute;
            }

            return node;
        }

        function tryGetConstEnumValue(node: Node): number {
            if (compilerOptions.isolatedModules) {
                return undefined;
            }

            return isPropertyAccessExpression(node) || isElementAccessExpression(node)
                ? resolver.getConstantValue(<PropertyAccessExpression | ElementAccessExpression>node)
                : undefined;
        }
    }

    const paramHelper: EmitHelper = {
        name: "typescript:param",
        scoped: false,
        priority: 4,
        text: `
            var __param = (this && this.__param) || function (paramIndex, decorator) {
                return function (target, key) { decorator(target, key, paramIndex); }
            };`
    };

    function createParamHelper(context: TransformationContext, expression: Expression, parameterOffset: number, location?: TextRange) {
        context.requestEmitHelper(paramHelper);
        return createCall(
            getHelperName("__param"),
            /*typeArguments*/ undefined,
            [
                createLiteral(parameterOffset),
                expression
            ],
            location
        );
    }

    const metadataHelper: EmitHelper = {
        name: "typescript:metadata",
        scoped: false,
        priority: 3,
        text: `
            var __metadata = (this && this.__metadata) || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };`
    };

    function createMetadataHelper(context: TransformationContext, metadataKey: string, metadataValue: Expression) {
        context.requestEmitHelper(metadataHelper);
        return createCall(
            getHelperName("__metadata"),
            /*typeArguments*/ undefined,
            [
                createLiteral(metadataKey),
                metadataValue
            ]
        );
    }

    const decorateHelper: EmitHelper = {
        name: "typescript:decorate",
        scoped: false,
        priority: 2,
        text: `
            var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            };`
    };

    function createDecorateHelper(context: TransformationContext, decoratorExpressions: Expression[], target: Expression, memberName?: Expression, descriptor?: Expression, location?: TextRange) {
        context.requestEmitHelper(decorateHelper);
        const argumentsArray: Expression[] = [];
        argumentsArray.push(createArrayLiteral(decoratorExpressions, /*location*/ undefined, /*multiLine*/ true));
        argumentsArray.push(target);
        if (memberName) {
            argumentsArray.push(memberName);
            if (descriptor) {
                argumentsArray.push(descriptor);
            }
        }

        return createCall(getHelperName("__decorate"), /*typeArguments*/ undefined, argumentsArray, location);
    }
}
