import * as ts from "../_namespaces/ts";

/**
 * Indicates whether to emit type metadata in the new format.
 */
const USE_NEW_TYPE_METADATA_FORMAT = false;

const enum TypeScriptSubstitutionFlags {
    /** Enables substitutions for namespace exports. */
    NamespaceExports = 1 << 1,
    /* Enables substitutions for unqualified enum members */
    NonQualifiedEnumMembers = 1 << 3
}

const enum ClassFacts {
    None = 0,
    HasStaticInitializedProperties = 1 << 0,
    HasConstructorDecorators = 1 << 1,
    HasMemberDecorators = 1 << 2,
    IsExportOfNamespace = 1 << 3,
    IsNamedExternalExport = 1 << 4,
    IsDefaultExternalExport = 1 << 5,
    IsDerivedClass = 1 << 6,
    UseImmediatelyInvokedFunctionExpression = 1 << 7,

    HasAnyDecorators = HasConstructorDecorators | HasMemberDecorators,
    NeedsName = HasStaticInitializedProperties | HasMemberDecorators,
    MayNeedImmediatelyInvokedFunctionExpression = HasAnyDecorators | HasStaticInitializedProperties,
    IsExported = IsExportOfNamespace | IsDefaultExternalExport | IsNamedExternalExport,
}

/** @internal */
export function transformTypeScript(context: ts.TransformationContext) {
    const {
        factory,
        getEmitHelperFactory: emitHelpers,
        startLexicalEnvironment,
        resumeLexicalEnvironment,
        endLexicalEnvironment,
        hoistVariableDeclaration,
    } = context;

    const resolver = context.getEmitResolver();
    const compilerOptions = context.getCompilerOptions();
    const languageVersion = ts.getEmitScriptTarget(compilerOptions);
    const moduleKind = ts.getEmitModuleKind(compilerOptions);
    const typeSerializer = compilerOptions.emitDecoratorMetadata ? ts.createRuntimeTypeSerializer(context) : undefined;

    // Save the previous transformation hooks.
    const previousOnEmitNode = context.onEmitNode;
    const previousOnSubstituteNode = context.onSubstituteNode;

    // Set new transformation hooks.
    context.onEmitNode = onEmitNode;
    context.onSubstituteNode = onSubstituteNode;

    // Enable substitution for property/element access to emit const enum values.
    context.enableSubstitution(ts.SyntaxKind.PropertyAccessExpression);
    context.enableSubstitution(ts.SyntaxKind.ElementAccessExpression);

    // These variables contain state that changes as we descend into the tree.
    let currentSourceFile: ts.SourceFile;
    let currentNamespace: ts.ModuleDeclaration;
    let currentNamespaceContainerName: ts.Identifier;
    let currentLexicalScope: ts.SourceFile | ts.Block | ts.ModuleBlock | ts.CaseBlock;
    let currentScopeFirstDeclarationsOfName: ts.UnderscoreEscapedMap<ts.Node> | undefined;
    let currentClassHasParameterProperties: boolean | undefined;

    /**
     * Keeps track of whether expression substitution has been enabled for specific edge cases.
     * They are persisted between each SourceFile transformation and should not be reset.
     */
    let enabledSubstitutions: TypeScriptSubstitutionFlags;

    /**
     * Keeps track of whether we are within any containing namespaces when performing
     * just-in-time substitution while printing an expression identifier.
     */
    let applicableSubstitutions: TypeScriptSubstitutionFlags;

    return transformSourceFileOrBundle;

    function transformSourceFileOrBundle(node: ts.SourceFile | ts.Bundle) {
        if (node.kind === ts.SyntaxKind.Bundle) {
            return transformBundle(node);
        }
        return transformSourceFile(node);
    }

    function transformBundle(node: ts.Bundle) {
        return factory.createBundle(node.sourceFiles.map(transformSourceFile), ts.mapDefined(node.prepends, prepend => {
            if (prepend.kind === ts.SyntaxKind.InputFiles) {
                return ts.createUnparsedSourceFile(prepend, "js");
            }
            return prepend;
        }));
    }

    /**
     * Transform TypeScript-specific syntax in a SourceFile.
     *
     * @param node A SourceFile node.
     */
    function transformSourceFile(node: ts.SourceFile) {
        if (node.isDeclarationFile) {
            return node;
        }

        currentSourceFile = node;

        const visited = saveStateAndInvoke(node, visitSourceFile);
        ts.addEmitHelpers(visited, context.readEmitHelpers());

        currentSourceFile = undefined!;
        return visited;
    }

    /**
     * Visits a node, saving and restoring state variables on the stack.
     *
     * @param node The node to visit.
     */
    function saveStateAndInvoke<T>(node: ts.Node, f: (node: ts.Node) => T): T {
        // Save state
        const savedCurrentScope = currentLexicalScope;
        const savedCurrentScopeFirstDeclarationsOfName = currentScopeFirstDeclarationsOfName;
        const savedCurrentClassHasParameterProperties = currentClassHasParameterProperties;

        // Handle state changes before visiting a node.
        onBeforeVisitNode(node);

        const visited = f(node);

        // Restore state
        if (currentLexicalScope !== savedCurrentScope) {
            currentScopeFirstDeclarationsOfName = savedCurrentScopeFirstDeclarationsOfName;
        }

        currentLexicalScope = savedCurrentScope;
        currentClassHasParameterProperties = savedCurrentClassHasParameterProperties;
        return visited;
    }

    /**
     * Performs actions that should always occur immediately before visiting a node.
     *
     * @param node The node to visit.
     */
    function onBeforeVisitNode(node: ts.Node) {
        switch (node.kind) {
            case ts.SyntaxKind.SourceFile:
            case ts.SyntaxKind.CaseBlock:
            case ts.SyntaxKind.ModuleBlock:
            case ts.SyntaxKind.Block:
                currentLexicalScope = node as ts.SourceFile | ts.CaseBlock | ts.ModuleBlock | ts.Block;
                currentScopeFirstDeclarationsOfName = undefined;
                break;

            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.FunctionDeclaration:
                if (ts.hasSyntacticModifier(node, ts.ModifierFlags.Ambient)) {
                    break;
                }

                // Record these declarations provided that they have a name.
                if ((node as ts.ClassDeclaration | ts.FunctionDeclaration).name) {
                    recordEmittedDeclarationInScope(node as ts.ClassDeclaration | ts.FunctionDeclaration);
                }
                else {
                    // These nodes should always have names unless they are default-exports;
                    // however, class declaration parsing allows for undefined names, so syntactically invalid
                    // programs may also have an undefined name.
                    ts.Debug.assert(node.kind === ts.SyntaxKind.ClassDeclaration || ts.hasSyntacticModifier(node, ts.ModifierFlags.Default));
                }

                break;
        }
    }

    /**
     * General-purpose node visitor.
     *
     * @param node The node to visit.
     */
    function visitor(node: ts.Node): ts.VisitResult<ts.Node> {
        return saveStateAndInvoke(node, visitorWorker);
    }

    /**
     * Visits and possibly transforms any node.
     *
     * @param node The node to visit.
     */
    function visitorWorker(node: ts.Node): ts.VisitResult<ts.Node> {
        if (node.transformFlags & ts.TransformFlags.ContainsTypeScript) {
            return visitTypeScript(node);
        }
        return node;
    }

    /**
     * Specialized visitor that visits the immediate children of a SourceFile.
     *
     * @param node The node to visit.
     */
    function sourceElementVisitor(node: ts.Node): ts.VisitResult<ts.Node> {
        return saveStateAndInvoke(node, sourceElementVisitorWorker);
    }

    /**
     * Specialized visitor that visits the immediate children of a SourceFile.
     *
     * @param node The node to visit.
     */
    function sourceElementVisitorWorker(node: ts.Node): ts.VisitResult<ts.Node> {
        switch (node.kind) {
            case ts.SyntaxKind.ImportDeclaration:
            case ts.SyntaxKind.ImportEqualsDeclaration:
            case ts.SyntaxKind.ExportAssignment:
            case ts.SyntaxKind.ExportDeclaration:
                return visitElidableStatement(node as ts.ImportDeclaration | ts.ImportEqualsDeclaration | ts.ExportAssignment | ts.ExportDeclaration);
            default:
                return visitorWorker(node);
        }
    }

    function visitElidableStatement(node: ts.ImportDeclaration | ts.ImportEqualsDeclaration | ts.ExportAssignment | ts.ExportDeclaration): ts.VisitResult<ts.Node> {
        const parsed = ts.getParseTreeNode(node);
        if (parsed !== node) {
            // If the node has been transformed by a `before` transformer, perform no ellision on it
            // As the type information we would attempt to lookup to perform ellision is potentially unavailable for the synthesized nodes
            // We do not reuse `visitorWorker`, as the ellidable statement syntax kinds are technically unrecognized by the switch-case in `visitTypeScript`,
            // and will trigger debug failures when debug verbosity is turned up
            if (node.transformFlags & ts.TransformFlags.ContainsTypeScript) {
                // This node contains TypeScript, so we should visit its children.
                return ts.visitEachChild(node, visitor, context);
            }
            // Otherwise, we can just return the node
            return node;
        }
        switch (node.kind) {
            case ts.SyntaxKind.ImportDeclaration:
                return visitImportDeclaration(node);
            case ts.SyntaxKind.ImportEqualsDeclaration:
                return visitImportEqualsDeclaration(node);
            case ts.SyntaxKind.ExportAssignment:
                return visitExportAssignment(node);
            case ts.SyntaxKind.ExportDeclaration:
                return visitExportDeclaration(node);
            default:
                ts.Debug.fail("Unhandled ellided statement");
        }
    }

    /**
     * Specialized visitor that visits the immediate children of a namespace.
     *
     * @param node The node to visit.
     */
    function namespaceElementVisitor(node: ts.Node): ts.VisitResult<ts.Node> {
        return saveStateAndInvoke(node, namespaceElementVisitorWorker);
    }

    /**
     * Specialized visitor that visits the immediate children of a namespace.
     *
     * @param node The node to visit.
     */
    function namespaceElementVisitorWorker(node: ts.Node): ts.VisitResult<ts.Node> {
        if (node.kind === ts.SyntaxKind.ExportDeclaration ||
            node.kind === ts.SyntaxKind.ImportDeclaration ||
            node.kind === ts.SyntaxKind.ImportClause ||
            (node.kind === ts.SyntaxKind.ImportEqualsDeclaration &&
             (node as ts.ImportEqualsDeclaration).moduleReference.kind === ts.SyntaxKind.ExternalModuleReference)) {
            // do not emit ES6 imports and exports since they are illegal inside a namespace
            return undefined;
        }
        else if (node.transformFlags & ts.TransformFlags.ContainsTypeScript || ts.hasSyntacticModifier(node, ts.ModifierFlags.Export)) {
            return visitTypeScript(node);
        }

        return node;
    }

    /**
     * Gets a specialized visitor that visits the immediate children of a class with TypeScript syntax.
     *
     * @param parent The class containing the elements to visit.
     */
    function getClassElementVisitor(parent: ts.ClassLikeDeclaration): (node: ts.Node) => ts.VisitResult<ts.Node> {
        return node => saveStateAndInvoke(node, n => classElementVisitorWorker(n, parent));
    }

    /**
     * Specialized visitor that visits the immediate children of a class with TypeScript syntax.
     *
     * @param node The node to visit.
     */
    function classElementVisitorWorker(node: ts.Node, parent: ts.ClassLikeDeclaration): ts.VisitResult<ts.Node> {
        switch (node.kind) {
            case ts.SyntaxKind.Constructor:
                return visitConstructor(node as ts.ConstructorDeclaration);

            case ts.SyntaxKind.PropertyDeclaration:
                // Property declarations are not TypeScript syntax, but they must be visited
                // for the decorator transformation.
                return visitPropertyDeclaration(node as ts.PropertyDeclaration, parent);

            case ts.SyntaxKind.GetAccessor:
                // Get Accessors can have TypeScript modifiers, decorators, and type annotations.
                return visitGetAccessor(node as ts.GetAccessorDeclaration, parent);

            case ts.SyntaxKind.SetAccessor:
                // Set Accessors can have TypeScript modifiers and type annotations.
                return visitSetAccessor(node as ts.SetAccessorDeclaration, parent);

            case ts.SyntaxKind.MethodDeclaration:
                // TypeScript method declarations may have decorators, modifiers
                // or type annotations.
                return visitMethodDeclaration(node as ts.MethodDeclaration, parent);

            case ts.SyntaxKind.ClassStaticBlockDeclaration:
                return ts.visitEachChild(node, visitor, context);

            case ts.SyntaxKind.SemicolonClassElement:
                return node;

            case ts.SyntaxKind.IndexSignature:
                // Index signatures are elided
                return;

            default:
                return ts.Debug.failBadSyntaxKind(node);
        }
    }

    function getObjectLiteralElementVisitor(parent: ts.ObjectLiteralExpression): (node: ts.Node) => ts.VisitResult<ts.Node> {
        return node => saveStateAndInvoke(node, n => objectLiteralElementVisitorWorker(n, parent));
    }

    function objectLiteralElementVisitorWorker(node: ts.Node, parent: ts.ObjectLiteralExpression): ts.VisitResult<ts.Node> {
        switch (node.kind) {
            case ts.SyntaxKind.PropertyAssignment:
            case ts.SyntaxKind.ShorthandPropertyAssignment:
            case ts.SyntaxKind.SpreadAssignment:
                return visitor(node);

            case ts.SyntaxKind.GetAccessor:
                // Get Accessors can have TypeScript modifiers, decorators, and type annotations.
                return visitGetAccessor(node as ts.GetAccessorDeclaration, parent);

            case ts.SyntaxKind.SetAccessor:
                // Set Accessors can have TypeScript modifiers and type annotations.
                return visitSetAccessor(node as ts.SetAccessorDeclaration, parent);

            case ts.SyntaxKind.MethodDeclaration:
                // TypeScript method declarations may have decorators, modifiers
                // or type annotations.
                return visitMethodDeclaration(node as ts.MethodDeclaration, parent);

            default:
                return ts.Debug.failBadSyntaxKind(node);
        }
    }

    function modifierVisitor(node: ts.Node): ts.VisitResult<ts.Node> {
        if (ts.isDecorator(node)) return undefined;
        if (ts.modifierToFlag(node.kind) & ts.ModifierFlags.TypeScriptModifier) {
            return undefined;
        }
        else if (currentNamespace && node.kind === ts.SyntaxKind.ExportKeyword) {
            return undefined;
        }

        return node;
    }

    /**
     * Branching visitor, visits a TypeScript syntax node.
     *
     * @param node The node to visit.
     */
    function visitTypeScript(node: ts.Node): ts.VisitResult<ts.Node> {
        if (ts.isStatement(node) && ts.hasSyntacticModifier(node, ts.ModifierFlags.Ambient)) {
            // TypeScript ambient declarations are elided, but some comments may be preserved.
            // See the implementation of `getLeadingComments` in comments.ts for more details.
            return factory.createNotEmittedStatement(node);
        }

        switch (node.kind) {
            case ts.SyntaxKind.ExportKeyword:
            case ts.SyntaxKind.DefaultKeyword:
                // ES6 export and default modifiers are elided when inside a namespace.
                return currentNamespace ? undefined : node;

            case ts.SyntaxKind.PublicKeyword:
            case ts.SyntaxKind.PrivateKeyword:
            case ts.SyntaxKind.ProtectedKeyword:
            case ts.SyntaxKind.AbstractKeyword:
            case ts.SyntaxKind.OverrideKeyword:
            case ts.SyntaxKind.ConstKeyword:
            case ts.SyntaxKind.DeclareKeyword:
            case ts.SyntaxKind.ReadonlyKeyword:
            case ts.SyntaxKind.InKeyword:
            case ts.SyntaxKind.OutKeyword:
            // TypeScript accessibility and readonly modifiers are elided
            // falls through
            case ts.SyntaxKind.ArrayType:
            case ts.SyntaxKind.TupleType:
            case ts.SyntaxKind.OptionalType:
            case ts.SyntaxKind.RestType:
            case ts.SyntaxKind.TypeLiteral:
            case ts.SyntaxKind.TypePredicate:
            case ts.SyntaxKind.TypeParameter:
            case ts.SyntaxKind.AnyKeyword:
            case ts.SyntaxKind.UnknownKeyword:
            case ts.SyntaxKind.BooleanKeyword:
            case ts.SyntaxKind.StringKeyword:
            case ts.SyntaxKind.NumberKeyword:
            case ts.SyntaxKind.NeverKeyword:
            case ts.SyntaxKind.VoidKeyword:
            case ts.SyntaxKind.SymbolKeyword:
            case ts.SyntaxKind.ConstructorType:
            case ts.SyntaxKind.FunctionType:
            case ts.SyntaxKind.TypeQuery:
            case ts.SyntaxKind.TypeReference:
            case ts.SyntaxKind.UnionType:
            case ts.SyntaxKind.IntersectionType:
            case ts.SyntaxKind.ConditionalType:
            case ts.SyntaxKind.ParenthesizedType:
            case ts.SyntaxKind.ThisType:
            case ts.SyntaxKind.TypeOperator:
            case ts.SyntaxKind.IndexedAccessType:
            case ts.SyntaxKind.MappedType:
            case ts.SyntaxKind.LiteralType:
                // TypeScript type nodes are elided.
                // falls through

            case ts.SyntaxKind.IndexSignature:
                // TypeScript index signatures are elided.
                return undefined;

            case ts.SyntaxKind.TypeAliasDeclaration:
                // TypeScript type-only declarations are elided.
                return factory.createNotEmittedStatement(node);

            case ts.SyntaxKind.NamespaceExportDeclaration:
                // TypeScript namespace export declarations are elided.
                return undefined;

            case ts.SyntaxKind.InterfaceDeclaration:
                // TypeScript interfaces are elided, but some comments may be preserved.
                // See the implementation of `getLeadingComments` in comments.ts for more details.
                return factory.createNotEmittedStatement(node);

            case ts.SyntaxKind.ClassDeclaration:
                // This may be a class declaration with TypeScript syntax extensions.
                //
                // TypeScript class syntax extensions include:
                // - decorators
                // - optional `implements` heritage clause
                // - parameter property assignments in the constructor
                // - index signatures
                // - method overload signatures
                return visitClassDeclaration(node as ts.ClassDeclaration);

            case ts.SyntaxKind.ClassExpression:
                // This may be a class expression with TypeScript syntax extensions.
                //
                // TypeScript class syntax extensions include:
                // - decorators
                // - optional `implements` heritage clause
                // - parameter property assignments in the constructor
                // - index signatures
                // - method overload signatures
                return visitClassExpression(node as ts.ClassExpression);

            case ts.SyntaxKind.HeritageClause:
                // This may be a heritage clause with TypeScript syntax extensions.
                //
                // TypeScript heritage clause extensions include:
                // - `implements` clause
                return visitHeritageClause(node as ts.HeritageClause);

            case ts.SyntaxKind.ExpressionWithTypeArguments:
                // TypeScript supports type arguments on an expression in an `extends` heritage clause.
                return visitExpressionWithTypeArguments(node as ts.ExpressionWithTypeArguments);

            case ts.SyntaxKind.ObjectLiteralExpression:
                return visitObjectLiteralExpression(node as ts.ObjectLiteralExpression);

            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
            case ts.SyntaxKind.ClassStaticBlockDeclaration:
                return ts.Debug.fail("Class and object literal elements must be visited with their respective visitors");

            case ts.SyntaxKind.FunctionDeclaration:
                // Typescript function declarations can have modifiers, decorators, and type annotations.
                return visitFunctionDeclaration(node as ts.FunctionDeclaration);

            case ts.SyntaxKind.FunctionExpression:
                // TypeScript function expressions can have modifiers and type annotations.
                return visitFunctionExpression(node as ts.FunctionExpression);

            case ts.SyntaxKind.ArrowFunction:
                // TypeScript arrow functions can have modifiers and type annotations.
                return visitArrowFunction(node as ts.ArrowFunction);

            case ts.SyntaxKind.Parameter:
                // This may be a parameter declaration with TypeScript syntax extensions.
                //
                // TypeScript parameter declaration syntax extensions include:
                // - decorators
                // - accessibility modifiers
                // - the question mark (?) token for optional parameters
                // - type annotations
                // - this parameters
                return visitParameter(node as ts.ParameterDeclaration);

            case ts.SyntaxKind.ParenthesizedExpression:
                // ParenthesizedExpressions are TypeScript if their expression is a
                // TypeAssertion or AsExpression
                return visitParenthesizedExpression(node as ts.ParenthesizedExpression);

            case ts.SyntaxKind.TypeAssertionExpression:
            case ts.SyntaxKind.AsExpression:
                // TypeScript type assertions are removed, but their subtrees are preserved.
                return visitAssertionExpression(node as ts.AssertionExpression);

            case ts.SyntaxKind.SatisfiesExpression:
                return visitSatisfiesExpression(node as ts.SatisfiesExpression);

            case ts.SyntaxKind.CallExpression:
                return visitCallExpression(node as ts.CallExpression);

            case ts.SyntaxKind.NewExpression:
                return visitNewExpression(node as ts.NewExpression);

            case ts.SyntaxKind.TaggedTemplateExpression:
                return visitTaggedTemplateExpression(node as ts.TaggedTemplateExpression);

            case ts.SyntaxKind.NonNullExpression:
                // TypeScript non-null expressions are removed, but their subtrees are preserved.
                return visitNonNullExpression(node as ts.NonNullExpression);

            case ts.SyntaxKind.EnumDeclaration:
                // TypeScript enum declarations do not exist in ES6 and must be rewritten.
                return visitEnumDeclaration(node as ts.EnumDeclaration);

            case ts.SyntaxKind.VariableStatement:
                // TypeScript namespace exports for variable statements must be transformed.
                return visitVariableStatement(node as ts.VariableStatement);

            case ts.SyntaxKind.VariableDeclaration:
                return visitVariableDeclaration(node as ts.VariableDeclaration);

            case ts.SyntaxKind.ModuleDeclaration:
                // TypeScript namespace declarations must be transformed.
                return visitModuleDeclaration(node as ts.ModuleDeclaration);

            case ts.SyntaxKind.ImportEqualsDeclaration:
                // TypeScript namespace or external module import.
                return visitImportEqualsDeclaration(node as ts.ImportEqualsDeclaration);

            case ts.SyntaxKind.JsxSelfClosingElement:
                return visitJsxSelfClosingElement(node as ts.JsxSelfClosingElement);

            case ts.SyntaxKind.JsxOpeningElement:
                return visitJsxJsxOpeningElement(node as ts.JsxOpeningElement);

            default:
                // node contains some other TypeScript syntax
                return ts.visitEachChild(node, visitor, context);
        }
    }

    function visitSourceFile(node: ts.SourceFile) {
        const alwaysStrict = ts.getStrictOptionValue(compilerOptions, "alwaysStrict") &&
            !(ts.isExternalModule(node) && moduleKind >= ts.ModuleKind.ES2015) &&
            !ts.isJsonSourceFile(node);

        return factory.updateSourceFile(
            node,
            ts.visitLexicalEnvironment(node.statements, sourceElementVisitor, context, /*start*/ 0, alwaysStrict));
    }

    function visitObjectLiteralExpression(node: ts.ObjectLiteralExpression) {
        return factory.updateObjectLiteralExpression(
            node,
            ts.visitNodes(node.properties, getObjectLiteralElementVisitor(node), ts.isObjectLiteralElement)
        );
    }

    function getClassFacts(node: ts.ClassDeclaration, staticProperties: readonly ts.PropertyDeclaration[]) {
        let facts = ClassFacts.None;
        if (ts.some(staticProperties)) facts |= ClassFacts.HasStaticInitializedProperties;
        const extendsClauseElement = ts.getEffectiveBaseTypeNode(node);
        if (extendsClauseElement && ts.skipOuterExpressions(extendsClauseElement.expression).kind !== ts.SyntaxKind.NullKeyword) facts |= ClassFacts.IsDerivedClass;
        if (ts.classOrConstructorParameterIsDecorated(node)) facts |= ClassFacts.HasConstructorDecorators;
        if (ts.childIsDecorated(node)) facts |= ClassFacts.HasMemberDecorators;
        if (isExportOfNamespace(node)) facts |= ClassFacts.IsExportOfNamespace;
        else if (isDefaultExternalModuleExport(node)) facts |= ClassFacts.IsDefaultExternalExport;
        else if (isNamedExternalModuleExport(node)) facts |= ClassFacts.IsNamedExternalExport;
        if (languageVersion <= ts.ScriptTarget.ES5 && (facts & ClassFacts.MayNeedImmediatelyInvokedFunctionExpression)) facts |= ClassFacts.UseImmediatelyInvokedFunctionExpression;
        return facts;
    }

    function hasTypeScriptClassSyntax(node: ts.Node) {
        return !!(node.transformFlags & ts.TransformFlags.ContainsTypeScriptClassSyntax);
    }

    function isClassLikeDeclarationWithTypeScriptSyntax(node: ts.ClassLikeDeclaration) {
        return ts.hasDecorators(node)
            || ts.some(node.typeParameters)
            || ts.some(node.heritageClauses, hasTypeScriptClassSyntax)
            || ts.some(node.members, hasTypeScriptClassSyntax);
    }

    function visitClassDeclaration(node: ts.ClassDeclaration): ts.VisitResult<ts.Statement> {
        if (!isClassLikeDeclarationWithTypeScriptSyntax(node) && !(currentNamespace && ts.hasSyntacticModifier(node, ts.ModifierFlags.Export))) {
            return factory.updateClassDeclaration(
                node,
                ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifier),
                node.name,
                /*typeParameters*/ undefined,
                ts.visitNodes(node.heritageClauses, visitor, ts.isHeritageClause),
                ts.visitNodes(node.members, getClassElementVisitor(node), ts.isClassElement)
            );
        }

        const staticProperties = ts.getProperties(node, /*requireInitializer*/ true, /*isStatic*/ true);
        const facts = getClassFacts(node, staticProperties);

        if (facts & ClassFacts.UseImmediatelyInvokedFunctionExpression) {
            context.startLexicalEnvironment();
        }

        const name = node.name || (facts & ClassFacts.NeedsName ? factory.getGeneratedNameForNode(node) : undefined);
        const allDecorators = ts.getAllDecoratorsOfClass(node);
        const decorators = transformAllDecoratorsOfDeclaration(node, node, allDecorators);

        // we do not emit modifiers on the declaration if we are emitting an IIFE
        const modifiers = !(facts & ClassFacts.UseImmediatelyInvokedFunctionExpression)
            ? ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifier)
            : ts.elideNodes(factory, node.modifiers); // preserve positions, if available

        //  ${modifiers} class ${name} ${heritageClauses} {
        //      ${members}
        //  }
        const classStatement = factory.updateClassDeclaration(
            node,
            ts.concatenate<ts.ModifierLike>(decorators, modifiers),
            name,
            /*typeParameters*/ undefined,
            ts.visitNodes(node.heritageClauses, visitor, ts.isHeritageClause),
            transformClassMembers(node)
        );

        // To better align with the old emitter, we should not emit a trailing source map
        // entry if the class has static properties.
        let emitFlags = ts.getEmitFlags(node);
        if (facts & ClassFacts.HasStaticInitializedProperties) {
            emitFlags |= ts.EmitFlags.NoTrailingSourceMap;
        }

        ts.setEmitFlags(classStatement, emitFlags);

        let statements: ts.Statement[] = [classStatement];

        if (facts & ClassFacts.UseImmediatelyInvokedFunctionExpression) {
            // When we emit a TypeScript class down to ES5, we must wrap it in an IIFE so that the
            // 'es2015' transformer can properly nest static initializers and decorators. The result
            // looks something like:
            //
            //  var C = function () {
            //      class C {
            //      }
            //      C.static_prop = 1;
            //      return C;
            //  }();
            //
            const closingBraceLocation = ts.createTokenRange(ts.skipTrivia(currentSourceFile.text, node.members.end), ts.SyntaxKind.CloseBraceToken);
            const localName = factory.getInternalName(node);

            // The following partially-emitted expression exists purely to align our sourcemap
            // emit with the original emitter.
            const outer = factory.createPartiallyEmittedExpression(localName);
            ts.setTextRangeEnd(outer, closingBraceLocation.end);
            ts.setEmitFlags(outer, ts.EmitFlags.NoComments);

            const statement = factory.createReturnStatement(outer);
            ts.setTextRangePos(statement, closingBraceLocation.pos);
            ts.setEmitFlags(statement, ts.EmitFlags.NoComments | ts.EmitFlags.NoTokenSourceMaps);
            statements.push(statement);

            ts.insertStatementsAfterStandardPrologue(statements, context.endLexicalEnvironment());

            const iife = factory.createImmediatelyInvokedArrowFunction(statements);
            ts.setEmitFlags(iife, ts.EmitFlags.TypeScriptClassWrapper);

            const varStatement = factory.createVariableStatement(
                /*modifiers*/ undefined,
                factory.createVariableDeclarationList([
                    factory.createVariableDeclaration(
                        factory.getLocalName(node, /*allowComments*/ false, /*allowSourceMaps*/ false),
                        /*exclamationToken*/ undefined,
                        /*type*/ undefined,
                        iife
                    )
                ])
            );

            ts.setOriginalNode(varStatement, node);
            ts.setCommentRange(varStatement, node);
            ts.setSourceMapRange(varStatement, ts.moveRangePastDecorators(node));
            ts.startOnNewLine(varStatement);
            statements = [varStatement];
        }

        // If the class is exported as part of a TypeScript namespace, emit the namespace export.
        // Otherwise, if the class was exported at the top level and was decorated, emit an export
        // declaration or export default for the class.
        if (facts & ClassFacts.IsExportOfNamespace) {
            addExportMemberAssignment(statements, node);
        }
        else if (facts & ClassFacts.UseImmediatelyInvokedFunctionExpression || facts & ClassFacts.HasConstructorDecorators) {
            if (facts & ClassFacts.IsDefaultExternalExport) {
                statements.push(factory.createExportDefault(factory.getLocalName(node, /*allowComments*/ false, /*allowSourceMaps*/ true)));
            }
            else if (facts & ClassFacts.IsNamedExternalExport) {
                statements.push(factory.createExternalModuleExport(factory.getLocalName(node, /*allowComments*/ false, /*allowSourceMaps*/ true)));
            }
        }

        if (statements.length > 1) {
            // Add a DeclarationMarker as a marker for the end of the declaration
            statements.push(factory.createEndOfDeclarationMarker(node));
            ts.setEmitFlags(classStatement, ts.getEmitFlags(classStatement) | ts.EmitFlags.HasEndOfDeclarationMarker);
        }

        return ts.singleOrMany(statements);
    }

    function visitClassExpression(node: ts.ClassExpression): ts.Expression {
        const allDecorators = ts.getAllDecoratorsOfClass(node);
        const decorators = transformAllDecoratorsOfDeclaration(node, node, allDecorators);
        return factory.updateClassExpression(
            node,
            decorators,
            node.name,
            /*typeParameters*/ undefined,
            ts.visitNodes(node.heritageClauses, visitor, ts.isHeritageClause),
            isClassLikeDeclarationWithTypeScriptSyntax(node) ?
                transformClassMembers(node) :
                ts.visitNodes(node.members, getClassElementVisitor(node), ts.isClassElement)
        );
    }

    /**
     * Transforms the members of a class.
     *
     * @param node The current class.
     */
    function transformClassMembers(node: ts.ClassDeclaration | ts.ClassExpression) {
        const members: ts.ClassElement[] = [];
        const constructor = ts.getFirstConstructorWithBody(node);
        const parametersWithPropertyAssignments = constructor &&
            ts.filter(constructor.parameters, p => ts.isParameterPropertyDeclaration(p, constructor));

        if (parametersWithPropertyAssignments) {
            for (const parameter of parametersWithPropertyAssignments) {
                if (ts.isIdentifier(parameter.name)) {
                    members.push(ts.setOriginalNode(factory.createPropertyDeclaration(
                        /*modifiers*/ undefined,
                        parameter.name,
                        /*questionOrExclamationToken*/ undefined,
                        /*type*/ undefined,
                        /*initializer*/ undefined), parameter));
                }
            }
        }

        ts.addRange(members, ts.visitNodes(node.members, getClassElementVisitor(node), ts.isClassElement));
        return ts.setTextRange(factory.createNodeArray(members), /*location*/ node.members);
    }

    /**
     * Transforms all of the decorators for a declaration into an array of expressions.
     *
     * @param node The declaration node.
     * @param allDecorators An object containing all of the decorators for the declaration.
     */
    function transformAllDecoratorsOfDeclaration(node: ts.Declaration, container: ts.ClassLikeDeclaration, allDecorators: ts.AllDecorators | undefined) {
        if (!allDecorators) {
            return undefined;
        }

        const decorators = ts.visitArray(allDecorators.decorators, visitor, ts.isDecorator);
        const parameterDecorators = ts.flatMap(allDecorators.parameters, transformDecoratorsOfParameter);
        const metadataDecorators = ts.some(decorators) || ts.some(parameterDecorators) ? getTypeMetadata(node, container) : undefined;
        const result = factory.createNodeArray(ts.concatenate(ts.concatenate(decorators, parameterDecorators), metadataDecorators));
        const pos = ts.firstOrUndefined(allDecorators.decorators)?.pos ?? -1;
        const end = ts.lastOrUndefined(allDecorators.decorators)?.end ?? -1;
        ts.setTextRangePosEnd(result, pos, end);
        return result;
    }

    /**
     * Transforms the decorators of a parameter into decorators of the class/method.
     *
     * @param parameterDecorators The decorators for the parameter at the provided offset.
     * @param parameterOffset The offset of the parameter.
     */
    function transformDecoratorsOfParameter(parameterDecorators: ts.Decorator[], parameterOffset: number) {
        if (parameterDecorators) {
            const decorators: ts.Decorator[] = [];
            for (const parameterDecorator of parameterDecorators) {
                const expression = ts.visitNode(parameterDecorator.expression, visitor, ts.isExpression);
                const helper = emitHelpers().createParamHelper(expression, parameterOffset);
                ts.setTextRange(helper, parameterDecorator.expression);
                ts.setEmitFlags(helper, ts.EmitFlags.NoComments);

                const decorator = factory.createDecorator(helper);
                ts.setSourceMapRange(decorator, parameterDecorator.expression);
                ts.setCommentRange(decorator, parameterDecorator.expression);
                ts.setEmitFlags(decorator, ts.EmitFlags.NoComments);
                decorators.push(decorator);
            }
            return decorators;
        }
    }

    /**
     * Gets optional type metadata for a declaration.
     *
     * @param node The declaration node.
     */
    function getTypeMetadata(node: ts.Declaration, container: ts.ClassLikeDeclaration) {
        return USE_NEW_TYPE_METADATA_FORMAT ?
            getNewTypeMetadata(node, container) :
            getOldTypeMetadata(node, container);
    }

    function getOldTypeMetadata(node: ts.Declaration, container: ts.ClassLikeDeclaration) {
        if (typeSerializer) {
            let decorators: ts.Decorator[] | undefined;
            if (shouldAddTypeMetadata(node)) {
                const typeMetadata = emitHelpers().createMetadataHelper("design:type", typeSerializer.serializeTypeOfNode({ currentLexicalScope, currentNameScope: container }, node));
                decorators = ts.append(decorators, factory.createDecorator(typeMetadata));
            }
            if (shouldAddParamTypesMetadata(node)) {
                const paramTypesMetadata = emitHelpers().createMetadataHelper("design:paramtypes", typeSerializer.serializeParameterTypesOfNode({ currentLexicalScope, currentNameScope: container }, node, container));
                decorators = ts.append(decorators, factory.createDecorator(paramTypesMetadata));
            }
            if (shouldAddReturnTypeMetadata(node)) {
                const returnTypeMetadata = emitHelpers().createMetadataHelper("design:returntype", typeSerializer.serializeReturnTypeOfNode({ currentLexicalScope, currentNameScope: container }, node));
                decorators = ts.append(decorators, factory.createDecorator(returnTypeMetadata));
            }
            return decorators;
        }
    }

    function getNewTypeMetadata(node: ts.Declaration, container: ts.ClassLikeDeclaration) {
        if (typeSerializer) {
            let properties: ts.ObjectLiteralElementLike[] | undefined;
            if (shouldAddTypeMetadata(node)) {
                const typeProperty = factory.createPropertyAssignment("type", factory.createArrowFunction(/*modifiers*/ undefined, /*typeParameters*/ undefined, [], /*type*/ undefined, factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken), typeSerializer.serializeTypeOfNode({ currentLexicalScope, currentNameScope: container }, node)));
                properties = ts.append(properties, typeProperty);
            }
            if (shouldAddParamTypesMetadata(node)) {
                const paramTypeProperty = factory.createPropertyAssignment("paramTypes", factory.createArrowFunction(/*modifiers*/ undefined, /*typeParameters*/ undefined, [], /*type*/ undefined, factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken), typeSerializer.serializeParameterTypesOfNode({ currentLexicalScope, currentNameScope: container }, node, container)));
                properties = ts.append(properties, paramTypeProperty);
            }
            if (shouldAddReturnTypeMetadata(node)) {
                const returnTypeProperty = factory.createPropertyAssignment("returnType", factory.createArrowFunction(/*modifiers*/ undefined, /*typeParameters*/ undefined, [], /*type*/ undefined, factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken), typeSerializer.serializeReturnTypeOfNode({ currentLexicalScope, currentNameScope: container }, node)));
                properties = ts.append(properties, returnTypeProperty);
            }
            if (properties) {
                const typeInfoMetadata = emitHelpers().createMetadataHelper("design:typeinfo", factory.createObjectLiteralExpression(properties, /*multiLine*/ true));
                return [factory.createDecorator(typeInfoMetadata)];
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
    function shouldAddTypeMetadata(node: ts.Declaration): node is ts.MethodDeclaration | ts.AccessorDeclaration | ts.PropertyDeclaration {
        const kind = node.kind;
        return kind === ts.SyntaxKind.MethodDeclaration
            || kind === ts.SyntaxKind.GetAccessor
            || kind === ts.SyntaxKind.SetAccessor
            || kind === ts.SyntaxKind.PropertyDeclaration;
    }

    /**
     * Determines whether to emit the "design:returntype" metadata based on the node's kind.
     * The caller should have already tested whether the node has decorators and whether the
     * emitDecoratorMetadata compiler option is set.
     *
     * @param node The node to test.
     */
    function shouldAddReturnTypeMetadata(node: ts.Declaration): node is ts.MethodDeclaration {
        return node.kind === ts.SyntaxKind.MethodDeclaration;
    }

    /**
     * Determines whether to emit the "design:paramtypes" metadata based on the node's kind.
     * The caller should have already tested whether the node has decorators and whether the
     * emitDecoratorMetadata compiler option is set.
     *
     * @param node The node to test.
     */
    function shouldAddParamTypesMetadata(node: ts.Declaration): node is ts.ClassLikeDeclaration & { _hasConstructorBrand: never } | ts.MethodDeclaration | ts.AccessorDeclaration {
        switch (node.kind) {
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.ClassExpression:
                return ts.getFirstConstructorWithBody(node as ts.ClassLikeDeclaration) !== undefined;
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
                return true;
        }
        return false;
    }

    /**
     * Gets an expression that represents a property name (for decorated properties or enums).
     * For a computed property, a name is generated for the node.
     *
     * @param member The member whose name should be converted into an expression.
     */
    function getExpressionForPropertyName(member: ts.ClassElement | ts.EnumMember, generateNameForComputedPropertyName: boolean): ts.Expression {
        const name = member.name!;
        if (ts.isPrivateIdentifier(name)) {
            return factory.createIdentifier("");
        }
        else if (ts.isComputedPropertyName(name)) {
            return generateNameForComputedPropertyName && !ts.isSimpleInlineableExpression(name.expression)
                ? factory.getGeneratedNameForNode(name)
                : name.expression;
        }
        else if (ts.isIdentifier(name)) {
            return factory.createStringLiteral(ts.idText(name));
        }
        else {
            return factory.cloneNode(name);
        }
    }

    /**
     * Visits the property name of a class element, for use when emitting property
     * initializers. For a computed property on a node with decorators, a temporary
     * value is stored for later use.
     *
     * @param member The member whose name should be visited.
     */
    function visitPropertyNameOfClassElement(member: ts.ClassElement): ts.PropertyName {
        const name = member.name!;
        // Computed property names need to be transformed into a hoisted variable when they are used more than once.
        // The names are used more than once when:
        //   - the property is non-static and its initializer is moved to the constructor (when there are parameter property assignments).
        //   - the property has a decorator.
        if (ts.isComputedPropertyName(name) && ((!ts.hasStaticModifier(member) && currentClassHasParameterProperties) || ts.hasDecorators(member))) {
            const expression = ts.visitNode(name.expression, visitor, ts.isExpression);
            const innerExpression = ts.skipPartiallyEmittedExpressions(expression);
            if (!ts.isSimpleInlineableExpression(innerExpression)) {
                const generatedName = factory.getGeneratedNameForNode(name);
                hoistVariableDeclaration(generatedName);
                return factory.updateComputedPropertyName(name, factory.createAssignment(generatedName, expression));
            }
        }
        return ts.visitNode(name, visitor, ts.isPropertyName);
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
    function visitHeritageClause(node: ts.HeritageClause): ts.HeritageClause | undefined {
        if (node.token === ts.SyntaxKind.ImplementsKeyword) {
            // implements clauses are elided
            return undefined;
        }
        return ts.visitEachChild(node, visitor, context);
    }

    /**
     * Transforms an ExpressionWithTypeArguments with TypeScript syntax.
     *
     * This function will only be called when one of the following conditions are met:
     * - The node contains type arguments that should be elided.
     *
     * @param node The ExpressionWithTypeArguments to transform.
     */
    function visitExpressionWithTypeArguments(node: ts.ExpressionWithTypeArguments): ts.ExpressionWithTypeArguments {
        return factory.updateExpressionWithTypeArguments(
            node,
            ts.visitNode(node.expression, visitor, ts.isLeftHandSideExpression),
            /*typeArguments*/ undefined
        );
    }

    /**
     * Determines whether to emit a function-like declaration. We should not emit the
     * declaration if it does not have a body.
     *
     * @param node The declaration node.
     */
    function shouldEmitFunctionLikeDeclaration<T extends ts.FunctionLikeDeclaration>(node: T): node is T & { body: NonNullable<T["body"]> } {
        return !ts.nodeIsMissing(node.body);
    }

    function visitPropertyDeclaration(node: ts.PropertyDeclaration, parent: ts.ClassLikeDeclaration) {
        const isAmbient = node.flags & ts.NodeFlags.Ambient || ts.hasSyntacticModifier(node, ts.ModifierFlags.Abstract);
        if (isAmbient && !ts.hasDecorators(node)) {
            return undefined;
        }

        const allDecorators = ts.getAllDecoratorsOfClassElement(node, parent);
        const decorators = transformAllDecoratorsOfDeclaration(node, parent, allDecorators);

        // Preserve a `declare x` property with decorators to be handled by the decorators transform
        if (isAmbient) {
            return factory.updatePropertyDeclaration(
                node,
                ts.concatenate<ts.ModifierLike>(decorators, factory.createModifiersFromModifierFlags(ts.ModifierFlags.Ambient)),
                ts.visitNode(node.name, visitor, ts.isPropertyName),
                /*questionOrExclamationToken*/ undefined,
                /*type*/ undefined,
                /*initializer*/ undefined
            );
        }

        return factory.updatePropertyDeclaration(
            node,
            ts.concatenate(decorators, ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifierLike)),
            visitPropertyNameOfClassElement(node),
            /*questionOrExclamationToken*/ undefined,
            /*type*/ undefined,
            ts.visitNode(node.initializer, visitor)
        );
    }

    function visitConstructor(node: ts.ConstructorDeclaration) {
        if (!shouldEmitFunctionLikeDeclaration(node)) {
            return undefined;
        }

        return factory.updateConstructorDeclaration(
            node,
            /*modifiers*/ undefined,
            ts.visitParameterList(node.parameters, visitor, context),
            transformConstructorBody(node.body, node)
        );
    }

    function transformConstructorBody(body: ts.Block, constructor: ts.ConstructorDeclaration) {
        const parametersWithPropertyAssignments = constructor &&
            ts.filter(constructor.parameters, p => ts.isParameterPropertyDeclaration(p, constructor));
        if (!ts.some(parametersWithPropertyAssignments)) {
            return ts.visitFunctionBody(body, visitor, context);
        }

        let statements: ts.Statement[] = [];

        resumeLexicalEnvironment();

        const prologueStatementCount = factory.copyPrologue(body.statements, statements, /*ensureUseStrict*/ false, visitor);
        const superStatementIndex = ts.findSuperStatementIndex(body.statements, prologueStatementCount);

        // If there was a super call, visit existing statements up to and including it
        if (superStatementIndex >= 0) {
            ts.addRange(
                statements,
                ts.visitNodes(body.statements, visitor, ts.isStatement, prologueStatementCount, superStatementIndex + 1 - prologueStatementCount),
            );
        }

        // Transform parameters into property assignments. Transforms this:
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
        const parameterPropertyAssignments = ts.mapDefined(parametersWithPropertyAssignments, transformParameterWithPropertyAssignment);

        // If there is a super() call, the parameter properties go immediately after it
        if (superStatementIndex >= 0) {
            ts.addRange(statements, parameterPropertyAssignments);
        }
        // Since there was no super() call, parameter properties are the first statements in the constructor after any prologue statements
        else {
            statements = [
                ...statements.slice(0, prologueStatementCount),
                ...parameterPropertyAssignments,
                ...statements.slice(prologueStatementCount),
            ];
        }

        // Add remaining statements from the body, skipping the super() call if it was found and any (already added) prologue statements
        const start = superStatementIndex >= 0 ? superStatementIndex + 1 : prologueStatementCount;
        ts.addRange(statements, ts.visitNodes(body.statements, visitor, ts.isStatement, start));

        // End the lexical environment.
        statements = factory.mergeLexicalEnvironment(statements, endLexicalEnvironment());
        const block = factory.createBlock(ts.setTextRange(factory.createNodeArray(statements), body.statements), /*multiLine*/ true);
        ts.setTextRange(block, /*location*/ body);
        ts.setOriginalNode(block, body);
        return block;
    }

    /**
     * Transforms a parameter into a property assignment statement.
     *
     * @param node The parameter declaration.
     */
    function transformParameterWithPropertyAssignment(node: ts.ParameterPropertyDeclaration) {
        const name = node.name;
        if (!ts.isIdentifier(name)) {
            return undefined;
        }

        // TODO(rbuckton): Does this need to be parented?
        const propertyName = ts.setParent(ts.setTextRange(factory.cloneNode(name), name), name.parent);
        ts.setEmitFlags(propertyName, ts.EmitFlags.NoComments | ts.EmitFlags.NoSourceMap);

        // TODO(rbuckton): Does this need to be parented?
        const localName = ts.setParent(ts.setTextRange(factory.cloneNode(name), name), name.parent);
        ts.setEmitFlags(localName, ts.EmitFlags.NoComments);

        return ts.startOnNewLine(
            ts.removeAllComments(
                ts.setTextRange(
                    ts.setOriginalNode(
                        factory.createExpressionStatement(
                            factory.createAssignment(
                                ts.setTextRange(
                                    factory.createPropertyAccessExpression(
                                        factory.createThis(),
                                        propertyName
                                    ),
                                    node.name
                                ),
                                localName
                            )
                        ),
                        node
                    ),
                    ts.moveRangePos(node, -1)
                )
            )
        );
    }

    function visitMethodDeclaration(node: ts.MethodDeclaration, parent: ts.ClassLikeDeclaration | ts.ObjectLiteralExpression) {
        if (!(node.transformFlags & ts.TransformFlags.ContainsTypeScript)) {
            return node;
        }

        if (!shouldEmitFunctionLikeDeclaration(node)) {
            return undefined;
        }

        const allDecorators = ts.isClassLike(parent) ? ts.getAllDecoratorsOfClassElement(node, parent) : undefined;
        const decorators = ts.isClassLike(parent) ? transformAllDecoratorsOfDeclaration(node, parent, allDecorators) : undefined;
        return factory.updateMethodDeclaration(
            node,
            ts.concatenate(decorators, ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifierLike)),
            node.asteriskToken,
            visitPropertyNameOfClassElement(node),
            /*questionToken*/ undefined,
            /*typeParameters*/ undefined,
            ts.visitParameterList(node.parameters, visitor, context),
            /*type*/ undefined,
            ts.visitFunctionBody(node.body, visitor, context)
        );
    }

    /**
     * Determines whether to emit an accessor declaration. We should not emit the
     * declaration if it does not have a body and is abstract.
     *
     * @param node The declaration node.
     */
    function shouldEmitAccessorDeclaration(node: ts.AccessorDeclaration) {
        return !(ts.nodeIsMissing(node.body) && ts.hasSyntacticModifier(node, ts.ModifierFlags.Abstract));
    }

    function visitGetAccessor(node: ts.GetAccessorDeclaration, parent: ts.ClassLikeDeclaration | ts.ObjectLiteralExpression) {
        if (!(node.transformFlags & ts.TransformFlags.ContainsTypeScript)) {
            return node;
        }

        if (!shouldEmitAccessorDeclaration(node)) {
            return undefined;
        }

        const decorators = ts.isClassLike(parent) ?
            transformAllDecoratorsOfDeclaration(node, parent, ts.getAllDecoratorsOfClassElement(node, parent)) :
            undefined;

        return factory.updateGetAccessorDeclaration(
            node,
            ts.concatenate(decorators, ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifierLike)),
            visitPropertyNameOfClassElement(node),
            ts.visitParameterList(node.parameters, visitor, context),
            /*type*/ undefined,
            ts.visitFunctionBody(node.body, visitor, context) || factory.createBlock([])
        );
    }

    function visitSetAccessor(node: ts.SetAccessorDeclaration, parent: ts.ClassLikeDeclaration | ts.ObjectLiteralExpression) {
        if (!(node.transformFlags & ts.TransformFlags.ContainsTypeScript)) {
            return node;
        }

        if (!shouldEmitAccessorDeclaration(node)) {
            return undefined;
        }

        const decorators = ts.isClassLike(parent) ?
            transformAllDecoratorsOfDeclaration(node, parent, ts.getAllDecoratorsOfClassElement(node, parent)) :
            undefined;

        return factory.updateSetAccessorDeclaration(
            node,
            ts.concatenate(decorators, ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifierLike)),
            visitPropertyNameOfClassElement(node),
            ts.visitParameterList(node.parameters, visitor, context),
            ts.visitFunctionBody(node.body, visitor, context) || factory.createBlock([])
        );
    }

    function visitFunctionDeclaration(node: ts.FunctionDeclaration): ts.VisitResult<ts.Statement> {
        if (!shouldEmitFunctionLikeDeclaration(node)) {
            return factory.createNotEmittedStatement(node);
        }
        const updated = factory.updateFunctionDeclaration(
            node,
            ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifier),
            node.asteriskToken,
            node.name,
            /*typeParameters*/ undefined,
            ts.visitParameterList(node.parameters, visitor, context),
            /*type*/ undefined,
            ts.visitFunctionBody(node.body, visitor, context) || factory.createBlock([])
        );
        if (isExportOfNamespace(node)) {
            const statements: ts.Statement[] = [updated];
            addExportMemberAssignment(statements, node);
            return statements;
        }
        return updated;
    }

    function visitFunctionExpression(node: ts.FunctionExpression): ts.Expression {
        if (!shouldEmitFunctionLikeDeclaration(node)) {
            return factory.createOmittedExpression();
        }
        const updated = factory.updateFunctionExpression(
            node,
            ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifier),
            node.asteriskToken,
            node.name,
            /*typeParameters*/ undefined,
            ts.visitParameterList(node.parameters, visitor, context),
            /*type*/ undefined,
            ts.visitFunctionBody(node.body, visitor, context) || factory.createBlock([])
        );
        return updated;
    }

    function visitArrowFunction(node: ts.ArrowFunction) {
        const updated = factory.updateArrowFunction(
            node,
            ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifier),
            /*typeParameters*/ undefined,
            ts.visitParameterList(node.parameters, visitor, context),
            /*type*/ undefined,
            node.equalsGreaterThanToken,
            ts.visitFunctionBody(node.body, visitor, context),
        );
        return updated;
    }

    function visitParameter(node: ts.ParameterDeclaration) {
        if (ts.parameterIsThisKeyword(node)) {
            return undefined;
        }

        const updated = factory.updateParameterDeclaration(
            node,
            ts.elideNodes(factory, node.modifiers), // preserve positions, if available
            node.dotDotDotToken,
            ts.visitNode(node.name, visitor, ts.isBindingName),
            /*questionToken*/ undefined,
            /*type*/ undefined,
            ts.visitNode(node.initializer, visitor, ts.isExpression)
        );
        if (updated !== node) {
            // While we emit the source map for the node after skipping decorators and modifiers,
            // we need to emit the comments for the original range.
            ts.setCommentRange(updated, node);
            ts.setTextRange(updated, ts.moveRangePastModifiers(node));
            ts.setSourceMapRange(updated, ts.moveRangePastModifiers(node));
            ts.setEmitFlags(updated.name, ts.EmitFlags.NoTrailingSourceMap);
        }
        return updated;
    }

    function visitVariableStatement(node: ts.VariableStatement): ts.Statement | undefined {
        if (isExportOfNamespace(node)) {
            const variables = ts.getInitializedVariables(node.declarationList);
            if (variables.length === 0) {
                // elide statement if there are no initialized variables.
                return undefined;
            }

            return ts.setTextRange(
                factory.createExpressionStatement(
                    factory.inlineExpressions(
                        ts.map(variables, transformInitializedVariable)
                    )
                ),
                node
            );
        }
        else {
            return ts.visitEachChild(node, visitor, context);
        }
    }

    function transformInitializedVariable(node: ts.InitializedVariableDeclaration): ts.Expression {
        const name = node.name;
        if (ts.isBindingPattern(name)) {
            return ts.flattenDestructuringAssignment(
                node,
                visitor,
                context,
                ts.FlattenLevel.All,
                /*needsValue*/ false,
                createNamespaceExportExpression
            );
        }
        else {
            return ts.setTextRange(
                factory.createAssignment(
                    getNamespaceMemberNameWithSourceMapsAndWithoutComments(name),
                    ts.visitNode(node.initializer, visitor, ts.isExpression)
                ),
                /*location*/ node
            );
        }
    }

    function visitVariableDeclaration(node: ts.VariableDeclaration) {
        const updated = factory.updateVariableDeclaration(
            node,
            ts.visitNode(node.name, visitor, ts.isBindingName),
            /*exclamationToken*/ undefined,
            /*type*/ undefined,
            ts.visitNode(node.initializer, visitor, ts.isExpression));
        if (node.type) {
            ts.setTypeNode(updated.name, node.type);
        }
        return updated;
    }

    function visitParenthesizedExpression(node: ts.ParenthesizedExpression): ts.Expression {
        const innerExpression = ts.skipOuterExpressions(node.expression, ~ts.OuterExpressionKinds.Assertions);
        if (ts.isAssertionExpression(innerExpression)) {
            // Make sure we consider all nested cast expressions, e.g.:
            // (<any><number><any>-A).x;
            const expression = ts.visitNode(node.expression, visitor, ts.isExpression);

            // We have an expression of the form: (<Type>SubExpr). Emitting this as (SubExpr)
            // is really not desirable. We would like to emit the subexpression as-is. Omitting
            // the parentheses, however, could cause change in the semantics of the generated
            // code if the casted expression has a lower precedence than the rest of the
            // expression.
            //
            // To preserve comments, we return a "PartiallyEmittedExpression" here which will
            // preserve the position information of the original expression.
            //
            // Due to the auto-parenthesization rules used by the visitor and factory functions
            // we can safely elide the parentheses here, as a new synthetic
            // ParenthesizedExpression will be inserted if we remove parentheses too
            // aggressively.
            //
            // If there are leading comments on the expression itself, the emitter will handle ASI
            // for return, throw, and yield by re-introducing parenthesis during emit on an as-need
            // basis.
            return factory.createPartiallyEmittedExpression(expression, node);
        }

        return ts.visitEachChild(node, visitor, context);
    }

    function visitAssertionExpression(node: ts.AssertionExpression): ts.Expression {
        const expression = ts.visitNode(node.expression, visitor, ts.isExpression);
        return factory.createPartiallyEmittedExpression(expression, node);
    }

    function visitNonNullExpression(node: ts.NonNullExpression): ts.Expression {
        const expression = ts.visitNode(node.expression, visitor, ts.isLeftHandSideExpression);
        return factory.createPartiallyEmittedExpression(expression, node);
    }

    function visitSatisfiesExpression(node: ts.SatisfiesExpression): ts.Expression {
        const expression = ts.visitNode(node.expression, visitor, ts.isExpression);
        return factory.createPartiallyEmittedExpression(expression, node);
    }

    function visitCallExpression(node: ts.CallExpression) {
        return factory.updateCallExpression(
            node,
            ts.visitNode(node.expression, visitor, ts.isExpression),
            /*typeArguments*/ undefined,
            ts.visitNodes(node.arguments, visitor, ts.isExpression));
    }

    function visitNewExpression(node: ts.NewExpression) {
        return factory.updateNewExpression(
            node,
            ts.visitNode(node.expression, visitor, ts.isExpression),
            /*typeArguments*/ undefined,
            ts.visitNodes(node.arguments, visitor, ts.isExpression));
    }

    function visitTaggedTemplateExpression(node: ts.TaggedTemplateExpression) {
        return factory.updateTaggedTemplateExpression(
            node,
            ts.visitNode(node.tag, visitor, ts.isExpression),
            /*typeArguments*/ undefined,
            ts.visitNode(node.template, visitor, ts.isExpression));
    }

    function visitJsxSelfClosingElement(node: ts.JsxSelfClosingElement) {
        return factory.updateJsxSelfClosingElement(
            node,
            ts.visitNode(node.tagName, visitor, ts.isJsxTagNameExpression),
            /*typeArguments*/ undefined,
            ts.visitNode(node.attributes, visitor, ts.isJsxAttributes));
    }

    function visitJsxJsxOpeningElement(node: ts.JsxOpeningElement) {
        return factory.updateJsxOpeningElement(
            node,
            ts.visitNode(node.tagName, visitor, ts.isJsxTagNameExpression),
            /*typeArguments*/ undefined,
            ts.visitNode(node.attributes, visitor, ts.isJsxAttributes));
    }

    /**
     * Determines whether to emit an enum declaration.
     *
     * @param node The enum declaration node.
     */
    function shouldEmitEnumDeclaration(node: ts.EnumDeclaration) {
        return !ts.isEnumConst(node)
            || ts.shouldPreserveConstEnums(compilerOptions);
    }

    /**
     * Visits an enum declaration.
     *
     * This function will be called any time a TypeScript enum is encountered.
     *
     * @param node The enum declaration node.
     */
    function visitEnumDeclaration(node: ts.EnumDeclaration): ts.VisitResult<ts.Statement> {
        if (!shouldEmitEnumDeclaration(node)) {
            return factory.createNotEmittedStatement(node);
        }

        const statements: ts.Statement[] = [];

        // We request to be advised when the printer is about to print this node. This allows
        // us to set up the correct state for later substitutions.
        let emitFlags = ts.EmitFlags.AdviseOnEmitNode;

        // If needed, we should emit a variable declaration for the enum. If we emit
        // a leading variable declaration, we should not emit leading comments for the
        // enum body.
        const varAdded = addVarForEnumOrModuleDeclaration(statements, node);
        if (varAdded) {
            // We should still emit the comments if we are emitting a system module.
            if (moduleKind !== ts.ModuleKind.System || currentLexicalScope !== currentSourceFile) {
                emitFlags |= ts.EmitFlags.NoLeadingComments;
            }
        }

        // `parameterName` is the declaration name used inside of the enum.
        const parameterName = getNamespaceParameterName(node);

        // `containerName` is the expression used inside of the enum for assignments.
        const containerName = getNamespaceContainerName(node);

        // `exportName` is the expression used within this node's container for any exported references.
        const exportName = ts.hasSyntacticModifier(node, ts.ModifierFlags.Export)
            ? factory.getExternalModuleOrNamespaceExportName(currentNamespaceContainerName, node, /*allowComments*/ false, /*allowSourceMaps*/ true)
            : factory.getLocalName(node, /*allowComments*/ false, /*allowSourceMaps*/ true);

        //  x || (x = {})
        //  exports.x || (exports.x = {})
        let moduleArg =
            factory.createLogicalOr(
                exportName,
                factory.createAssignment(
                    exportName,
                    factory.createObjectLiteralExpression()
                )
            );

        if (hasNamespaceQualifiedExportName(node)) {
            // `localName` is the expression used within this node's containing scope for any local references.
            const localName = factory.getLocalName(node, /*allowComments*/ false, /*allowSourceMaps*/ true);

            //  x = (exports.x || (exports.x = {}))
            moduleArg = factory.createAssignment(localName, moduleArg);
        }

        //  (function (x) {
        //      x[x["y"] = 0] = "y";
        //      ...
        //  })(x || (x = {}));
        const enumStatement = factory.createExpressionStatement(
            factory.createCallExpression(
                factory.createFunctionExpression(
                    /*modifiers*/ undefined,
                    /*asteriskToken*/ undefined,
                    /*name*/ undefined,
                    /*typeParameters*/ undefined,
                    [factory.createParameterDeclaration(/*modifiers*/ undefined, /*dotDotDotToken*/ undefined, parameterName)],
                    /*type*/ undefined,
                    transformEnumBody(node, containerName)
                ),
                /*typeArguments*/ undefined,
                [moduleArg]
            )
        );

        ts.setOriginalNode(enumStatement, node);
        if (varAdded) {
            // If a variable was added, synthetic comments are emitted on it, not on the moduleStatement.
            ts.setSyntheticLeadingComments(enumStatement, undefined);
            ts.setSyntheticTrailingComments(enumStatement, undefined);
        }
        ts.setTextRange(enumStatement, node);
        ts.addEmitFlags(enumStatement, emitFlags);
        statements.push(enumStatement);

        // Add a DeclarationMarker for the enum to preserve trailing comments and mark
        // the end of the declaration.
        statements.push(factory.createEndOfDeclarationMarker(node));
        return statements;
    }

    /**
     * Transforms the body of an enum declaration.
     *
     * @param node The enum declaration node.
     */
    function transformEnumBody(node: ts.EnumDeclaration, localName: ts.Identifier): ts.Block {
        const savedCurrentNamespaceLocalName = currentNamespaceContainerName;
        currentNamespaceContainerName = localName;

        const statements: ts.Statement[] = [];
        startLexicalEnvironment();
        const members = ts.map(node.members, transformEnumMember);
        ts.insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());
        ts.addRange(statements, members);

        currentNamespaceContainerName = savedCurrentNamespaceLocalName;
        return factory.createBlock(
            ts.setTextRange(factory.createNodeArray(statements), /*location*/ node.members),
            /*multiLine*/ true
        );
    }

    /**
     * Transforms an enum member into a statement.
     *
     * @param member The enum member node.
     */
    function transformEnumMember(member: ts.EnumMember): ts.Statement {
        // enums don't support computed properties
        // we pass false as 'generateNameForComputedPropertyName' for a backward compatibility purposes
        // old emitter always generate 'expression' part of the name as-is.
        const name = getExpressionForPropertyName(member, /*generateNameForComputedPropertyName*/ false);
        const valueExpression = transformEnumMemberDeclarationValue(member);
        const innerAssignment = factory.createAssignment(
            factory.createElementAccessExpression(
                currentNamespaceContainerName,
                name
            ),
            valueExpression
        );
        const outerAssignment = valueExpression.kind === ts.SyntaxKind.StringLiteral ?
            innerAssignment :
            factory.createAssignment(
                factory.createElementAccessExpression(
                    currentNamespaceContainerName,
                    innerAssignment
                ),
                name
            );
        return ts.setTextRange(
            factory.createExpressionStatement(
                ts.setTextRange(
                    outerAssignment,
                    member
                )
            ),
            member
        );
    }

    /**
     * Transforms the value of an enum member.
     *
     * @param member The enum member node.
     */
    function transformEnumMemberDeclarationValue(member: ts.EnumMember): ts.Expression {
        const value = resolver.getConstantValue(member);
        if (value !== undefined) {
            return typeof value === "string" ? factory.createStringLiteral(value) : factory.createNumericLiteral(value);
        }
        else {
            enableSubstitutionForNonQualifiedEnumMembers();
            if (member.initializer) {
                return ts.visitNode(member.initializer, visitor, ts.isExpression);
            }
            else {
                return factory.createVoidZero();
            }
        }
    }

    /**
     * Determines whether to elide a module declaration.
     *
     * @param node The module declaration node.
     */
    function shouldEmitModuleDeclaration(nodeIn: ts.ModuleDeclaration) {
        const node = ts.getParseTreeNode(nodeIn, ts.isModuleDeclaration);
        if (!node) {
            // If we can't find a parse tree node, assume the node is instantiated.
            return true;
        }
        return ts.isInstantiatedModule(node, ts.shouldPreserveConstEnums(compilerOptions));
    }

    /**
     * Determines whether an exported declaration will have a qualified export name (e.g. `f.x`
     * or `exports.x`).
     */
    function hasNamespaceQualifiedExportName(node: ts.Node) {
        return isExportOfNamespace(node)
            || (isExternalModuleExport(node)
                && moduleKind !== ts.ModuleKind.ES2015
                && moduleKind !== ts.ModuleKind.ES2020
                && moduleKind !== ts.ModuleKind.ES2022
                && moduleKind !== ts.ModuleKind.ESNext
                && moduleKind !== ts.ModuleKind.System);
    }

    /**
     * Records that a declaration was emitted in the current scope, if it was the first
     * declaration for the provided symbol.
     */
    function recordEmittedDeclarationInScope(node: ts.FunctionDeclaration | ts.ClassDeclaration | ts.ModuleDeclaration | ts.EnumDeclaration) {
        if (!currentScopeFirstDeclarationsOfName) {
            currentScopeFirstDeclarationsOfName = new ts.Map();
        }

        const name = declaredNameInScope(node);
        if (!currentScopeFirstDeclarationsOfName.has(name)) {
            currentScopeFirstDeclarationsOfName.set(name, node);
        }
    }

    /**
     * Determines whether a declaration is the first declaration with
     * the same name emitted in the current scope.
     */
    function isFirstEmittedDeclarationInScope(node: ts.ModuleDeclaration | ts.EnumDeclaration) {
        if (currentScopeFirstDeclarationsOfName) {
            const name = declaredNameInScope(node);
            return currentScopeFirstDeclarationsOfName.get(name) === node;
        }
        return true;
    }

    function declaredNameInScope(node: ts.FunctionDeclaration | ts.ClassDeclaration | ts.ModuleDeclaration | ts.EnumDeclaration): ts.__String {
        ts.Debug.assertNode(node.name, ts.isIdentifier);
        return node.name.escapedText;
    }

    /**
     * Adds a leading VariableStatement for a enum or module declaration.
     */
    function addVarForEnumOrModuleDeclaration(statements: ts.Statement[], node: ts.ModuleDeclaration | ts.EnumDeclaration) {
        // Emit a variable statement for the module. We emit top-level enums as a `var`
        // declaration to avoid static errors in global scripts scripts due to redeclaration.
        // enums in any other scope are emitted as a `let` declaration.
        const statement = factory.createVariableStatement(
            ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifier),
            factory.createVariableDeclarationList([
                factory.createVariableDeclaration(
                    factory.getLocalName(node, /*allowComments*/ false, /*allowSourceMaps*/ true)
                )
            ], currentLexicalScope.kind === ts.SyntaxKind.SourceFile ? ts.NodeFlags.None : ts.NodeFlags.Let)
        );

        ts.setOriginalNode(statement, node);

        recordEmittedDeclarationInScope(node);
        if (isFirstEmittedDeclarationInScope(node)) {
            // Adjust the source map emit to match the old emitter.
            if (node.kind === ts.SyntaxKind.EnumDeclaration) {
                ts.setSourceMapRange(statement.declarationList, node);
            }
            else {
                ts.setSourceMapRange(statement, node);
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
            ts.setCommentRange(statement, node);
            ts.addEmitFlags(statement, ts.EmitFlags.NoTrailingComments | ts.EmitFlags.HasEndOfDeclarationMarker);
            statements.push(statement);
            return true;
        }
        else {
            // For an EnumDeclaration or ModuleDeclaration that merges with a preceeding
            // declaration we do not emit a leading variable declaration. To preserve the
            // begin/end semantics of the declararation and to properly handle exports
            // we wrap the leading variable declaration in a `MergeDeclarationMarker`.
            const mergeMarker = factory.createMergeDeclarationMarker(statement);
            ts.setEmitFlags(mergeMarker, ts.EmitFlags.NoComments | ts.EmitFlags.HasEndOfDeclarationMarker);
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
    function visitModuleDeclaration(node: ts.ModuleDeclaration): ts.VisitResult<ts.Statement> {
        if (!shouldEmitModuleDeclaration(node)) {
            return factory.createNotEmittedStatement(node);
        }

        ts.Debug.assertNode(node.name, ts.isIdentifier, "A TypeScript namespace should have an Identifier name.");
        enableSubstitutionForNamespaceExports();

        const statements: ts.Statement[] = [];

        // We request to be advised when the printer is about to print this node. This allows
        // us to set up the correct state for later substitutions.
        let emitFlags = ts.EmitFlags.AdviseOnEmitNode;

        // If needed, we should emit a variable declaration for the module. If we emit
        // a leading variable declaration, we should not emit leading comments for the
        // module body.
        const varAdded = addVarForEnumOrModuleDeclaration(statements, node);
        if (varAdded) {
            // We should still emit the comments if we are emitting a system module.
            if (moduleKind !== ts.ModuleKind.System || currentLexicalScope !== currentSourceFile) {
                emitFlags |= ts.EmitFlags.NoLeadingComments;
            }
        }

        // `parameterName` is the declaration name used inside of the namespace.
        const parameterName = getNamespaceParameterName(node);

        // `containerName` is the expression used inside of the namespace for exports.
        const containerName = getNamespaceContainerName(node);

        // `exportName` is the expression used within this node's container for any exported references.
        const exportName = ts.hasSyntacticModifier(node, ts.ModifierFlags.Export)
            ? factory.getExternalModuleOrNamespaceExportName(currentNamespaceContainerName, node, /*allowComments*/ false, /*allowSourceMaps*/ true)
            : factory.getLocalName(node, /*allowComments*/ false, /*allowSourceMaps*/ true);

        //  x || (x = {})
        //  exports.x || (exports.x = {})
        let moduleArg =
            factory.createLogicalOr(
                exportName,
                factory.createAssignment(
                    exportName,
                    factory.createObjectLiteralExpression()
                )
            );

        if (hasNamespaceQualifiedExportName(node)) {
            // `localName` is the expression used within this node's containing scope for any local references.
            const localName = factory.getLocalName(node, /*allowComments*/ false, /*allowSourceMaps*/ true);

            //  x = (exports.x || (exports.x = {}))
            moduleArg = factory.createAssignment(localName, moduleArg);
        }

        //  (function (x_1) {
        //      x_1.y = ...;
        //  })(x || (x = {}));
        const moduleStatement = factory.createExpressionStatement(
            factory.createCallExpression(
                factory.createFunctionExpression(
                    /*modifiers*/ undefined,
                    /*asteriskToken*/ undefined,
                    /*name*/ undefined,
                    /*typeParameters*/ undefined,
                    [factory.createParameterDeclaration(/*modifiers*/ undefined, /*dotDotDotToken*/ undefined, parameterName)],
                    /*type*/ undefined,
                    transformModuleBody(node, containerName)
                ),
                /*typeArguments*/ undefined,
                [moduleArg]
            )
        );

        ts.setOriginalNode(moduleStatement, node);
        if (varAdded) {
            // If a variable was added, synthetic comments are emitted on it, not on the moduleStatement.
            ts.setSyntheticLeadingComments(moduleStatement, undefined);
            ts.setSyntheticTrailingComments(moduleStatement, undefined);
        }
        ts.setTextRange(moduleStatement, node);
        ts.addEmitFlags(moduleStatement, emitFlags);
        statements.push(moduleStatement);

        // Add a DeclarationMarker for the namespace to preserve trailing comments and mark
        // the end of the declaration.
        statements.push(factory.createEndOfDeclarationMarker(node));
        return statements;
    }

    /**
     * Transforms the body of a module declaration.
     *
     * @param node The module declaration node.
     */
    function transformModuleBody(node: ts.ModuleDeclaration, namespaceLocalName: ts.Identifier): ts.Block {
        const savedCurrentNamespaceContainerName = currentNamespaceContainerName;
        const savedCurrentNamespace = currentNamespace;
        const savedCurrentScopeFirstDeclarationsOfName = currentScopeFirstDeclarationsOfName;
        currentNamespaceContainerName = namespaceLocalName;
        currentNamespace = node;
        currentScopeFirstDeclarationsOfName = undefined;

        const statements: ts.Statement[] = [];
        startLexicalEnvironment();

        let statementsLocation: ts.TextRange | undefined;
        let blockLocation: ts.TextRange | undefined;
        if (node.body) {
            if (node.body.kind === ts.SyntaxKind.ModuleBlock) {
                saveStateAndInvoke(node.body, body => ts.addRange(statements, ts.visitNodes((body as ts.ModuleBlock).statements, namespaceElementVisitor, ts.isStatement)));
                statementsLocation = node.body.statements;
                blockLocation = node.body;
            }
            else {
                const result = visitModuleDeclaration(node.body as ts.ModuleDeclaration);
                if (result) {
                    if (ts.isArray(result)) {
                        ts.addRange(statements, result);
                    }
                    else {
                        statements.push(result);
                    }
                }

                const moduleBlock = getInnerMostModuleDeclarationFromDottedModule(node)!.body as ts.ModuleBlock;
                statementsLocation = ts.moveRangePos(moduleBlock.statements, -1);
            }
        }

        ts.insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());
        currentNamespaceContainerName = savedCurrentNamespaceContainerName;
        currentNamespace = savedCurrentNamespace;
        currentScopeFirstDeclarationsOfName = savedCurrentScopeFirstDeclarationsOfName;

        const block = factory.createBlock(
            ts.setTextRange(
                factory.createNodeArray(statements),
                /*location*/ statementsLocation
            ),
            /*multiLine*/ true
        );
        ts.setTextRange(block, blockLocation);

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
        if (!node.body || node.body.kind !== ts.SyntaxKind.ModuleBlock) {
            ts.setEmitFlags(block, ts.getEmitFlags(block) | ts.EmitFlags.NoComments);
        }
        return block;
    }

    function getInnerMostModuleDeclarationFromDottedModule(moduleDeclaration: ts.ModuleDeclaration): ts.ModuleDeclaration | undefined {
        if (moduleDeclaration.body!.kind === ts.SyntaxKind.ModuleDeclaration) {
            const recursiveInnerModule = getInnerMostModuleDeclarationFromDottedModule(moduleDeclaration.body as ts.ModuleDeclaration);
            return recursiveInnerModule || moduleDeclaration.body as ts.ModuleDeclaration;
        }
    }

    /**
     * Visits an import declaration, eliding it if it is type-only or if it has an import clause that may be elided.
     *
     * @param node The import declaration node.
     */
    function visitImportDeclaration(node: ts.ImportDeclaration): ts.VisitResult<ts.Statement> {
        if (!node.importClause) {
            // Do not elide a side-effect only import declaration.
            //  import "foo";
            return node;
        }
        if (node.importClause.isTypeOnly) {
            // Always elide type-only imports
            return undefined;
        }

        // Elide the declaration if the import clause was elided.
        const importClause = ts.visitNode(node.importClause, visitImportClause, ts.isImportClause);
        return importClause ||
            compilerOptions.importsNotUsedAsValues === ts.ImportsNotUsedAsValues.Preserve ||
            compilerOptions.importsNotUsedAsValues === ts.ImportsNotUsedAsValues.Error
            ? factory.updateImportDeclaration(
                node,
                /*modifiers*/ undefined,
                importClause,
                node.moduleSpecifier,
                node.assertClause)
            : undefined;
    }

    /**
     * Visits an import clause, eliding it if its `name` and `namedBindings` may both be elided.
     *
     * @param node The import clause node.
     */
    function visitImportClause(node: ts.ImportClause): ts.VisitResult<ts.ImportClause> {
        ts.Debug.assert(!node.isTypeOnly);
        // Elide the import clause if we elide both its name and its named bindings.
        const name = shouldEmitAliasDeclaration(node) ? node.name : undefined;
        const namedBindings = ts.visitNode(node.namedBindings, visitNamedImportBindings, ts.isNamedImportBindings);
        return (name || namedBindings) ? factory.updateImportClause(node, /*isTypeOnly*/ false, name, namedBindings) : undefined;
    }

    /**
     * Visits named import bindings, eliding them if their targets, their references, and the compilation settings allow.
     *
     * @param node The named import bindings node.
     */
    function visitNamedImportBindings(node: ts.NamedImportBindings): ts.VisitResult<ts.NamedImportBindings> {
        if (node.kind === ts.SyntaxKind.NamespaceImport) {
            // Elide a namespace import if it is not referenced.
            return shouldEmitAliasDeclaration(node) ? node : undefined;
        }
        else {
            // Elide named imports if all of its import specifiers are elided and settings allow.
            const allowEmpty = compilerOptions.preserveValueImports && (
                compilerOptions.importsNotUsedAsValues === ts.ImportsNotUsedAsValues.Preserve ||
                compilerOptions.importsNotUsedAsValues === ts.ImportsNotUsedAsValues.Error);
            const elements = ts.visitNodes(node.elements, visitImportSpecifier, ts.isImportSpecifier);
            return allowEmpty || ts.some(elements) ? factory.updateNamedImports(node, elements) : undefined;
        }
    }

    /**
     * Visits an import specifier, eliding it if its target, its references, and the compilation settings allow.
     *
     * @param node The import specifier node.
     */
    function visitImportSpecifier(node: ts.ImportSpecifier): ts.VisitResult<ts.ImportSpecifier> {
        return !node.isTypeOnly && shouldEmitAliasDeclaration(node) ? node : undefined;
    }

    /**
     * Visits an export assignment, eliding it if it does not contain a clause that resolves
     * to a value.
     *
     * @param node The export assignment node.
     */
    function visitExportAssignment(node: ts.ExportAssignment): ts.VisitResult<ts.Statement> {
        // Elide the export assignment if it does not reference a value.
        return resolver.isValueAliasDeclaration(node)
            ? ts.visitEachChild(node, visitor, context)
            : undefined;
    }

    /**
     * Visits an export declaration, eliding it if it does not contain a clause that resolves to a value.
     *
     * @param node The export declaration node.
     */
    function visitExportDeclaration(node: ts.ExportDeclaration): ts.VisitResult<ts.Statement> {
        if (node.isTypeOnly) {
            return undefined;
        }

        if (!node.exportClause || ts.isNamespaceExport(node.exportClause)) {
            // never elide `export <whatever> from <whereever>` declarations -
            // they should be kept for sideffects/untyped exports, even when the
            // type checker doesn't know about any exports
            return node;
        }

        // Elide the export declaration if all of its named exports are elided.
        const allowEmpty = !!node.moduleSpecifier && (
            compilerOptions.importsNotUsedAsValues === ts.ImportsNotUsedAsValues.Preserve ||
            compilerOptions.importsNotUsedAsValues === ts.ImportsNotUsedAsValues.Error);
        const exportClause = ts.visitNode(
            node.exportClause,
            (bindings: ts.NamedExportBindings) => visitNamedExportBindings(bindings, allowEmpty),
            ts.isNamedExportBindings);

        return exportClause
            ? factory.updateExportDeclaration(
                node,
                /*modifiers*/ undefined,
                node.isTypeOnly,
                exportClause,
                node.moduleSpecifier,
                node.assertClause)
            : undefined;
    }

    /**
     * Visits named exports, eliding it if it does not contain an export specifier that
     * resolves to a value.
     *
     * @param node The named exports node.
     */
    function visitNamedExports(node: ts.NamedExports, allowEmpty: boolean): ts.VisitResult<ts.NamedExports> {
        // Elide the named exports if all of its export specifiers were elided.
        const elements = ts.visitNodes(node.elements, visitExportSpecifier, ts.isExportSpecifier);
        return allowEmpty || ts.some(elements) ? factory.updateNamedExports(node, elements) : undefined;
    }

    function visitNamespaceExports(node: ts.NamespaceExport): ts.VisitResult<ts.NamespaceExport> {
        return factory.updateNamespaceExport(node, ts.visitNode(node.name, visitor, ts.isIdentifier));
    }

    function visitNamedExportBindings(node: ts.NamedExportBindings, allowEmpty: boolean): ts.VisitResult<ts.NamedExportBindings> {
        return ts.isNamespaceExport(node) ? visitNamespaceExports(node) : visitNamedExports(node, allowEmpty);
    }

    /**
     * Visits an export specifier, eliding it if it does not resolve to a value.
     *
     * @param node The export specifier node.
     */
    function visitExportSpecifier(node: ts.ExportSpecifier): ts.VisitResult<ts.ExportSpecifier> {
        // Elide an export specifier if it does not reference a value.
        return !node.isTypeOnly && resolver.isValueAliasDeclaration(node) ? node : undefined;
    }

    /**
     * Determines whether to emit an import equals declaration.
     *
     * @param node The import equals declaration node.
     */
    function shouldEmitImportEqualsDeclaration(node: ts.ImportEqualsDeclaration) {
        // preserve old compiler's behavior: emit 'var' for import declaration (even if we do not consider them referenced) when
        // - current file is not external module
        // - import declaration is top level and target is value imported by entity name
        return shouldEmitAliasDeclaration(node)
            || (!ts.isExternalModule(currentSourceFile)
                && resolver.isTopLevelValueImportEqualsWithEntityName(node));
    }

    /**
     * Visits an import equals declaration.
     *
     * @param node The import equals declaration node.
     */
    function visitImportEqualsDeclaration(node: ts.ImportEqualsDeclaration): ts.VisitResult<ts.Statement> {
        // Always elide type-only imports
        if (node.isTypeOnly) {
            return undefined;
        }

        if (ts.isExternalModuleImportEqualsDeclaration(node)) {
            const isReferenced = shouldEmitAliasDeclaration(node);
            // If the alias is unreferenced but we want to keep the import, replace with 'import "mod"'.
            if (!isReferenced && compilerOptions.importsNotUsedAsValues === ts.ImportsNotUsedAsValues.Preserve) {
                return ts.setOriginalNode(
                    ts.setTextRange(
                        factory.createImportDeclaration(
                            /*modifiers*/ undefined,
                            /*importClause*/ undefined,
                            node.moduleReference.expression,
                            /*assertClause*/ undefined
                        ),
                        node,
                    ),
                    node,
                );
            }

            return isReferenced ? ts.visitEachChild(node, visitor, context) : undefined;
        }

        if (!shouldEmitImportEqualsDeclaration(node)) {
            return undefined;
        }

        const moduleReference = ts.createExpressionFromEntityName(factory, node.moduleReference as ts.EntityName);
        ts.setEmitFlags(moduleReference, ts.EmitFlags.NoComments | ts.EmitFlags.NoNestedComments);

        if (isNamedExternalModuleExport(node) || !isExportOfNamespace(node)) {
            //  export var ${name} = ${moduleReference};
            //  var ${name} = ${moduleReference};
            return ts.setOriginalNode(
                ts.setTextRange(
                    factory.createVariableStatement(
                        ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifier),
                        factory.createVariableDeclarationList([
                            ts.setOriginalNode(
                                factory.createVariableDeclaration(
                                    node.name,
                                    /*exclamationToken*/ undefined,
                                    /*type*/ undefined,
                                    moduleReference
                                ),
                                node
                            )
                        ])
                    ),
                    node
                ),
                node
            );
        }
        else {
            // exports.${name} = ${moduleReference};
            return ts.setOriginalNode(
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
    function isExportOfNamespace(node: ts.Node) {
        return currentNamespace !== undefined && ts.hasSyntacticModifier(node, ts.ModifierFlags.Export);
    }

    /**
     * Gets a value indicating whether the node is exported from an external module.
     *
     * @param node The node to test.
     */
    function isExternalModuleExport(node: ts.Node) {
        return currentNamespace === undefined && ts.hasSyntacticModifier(node, ts.ModifierFlags.Export);
    }

    /**
     * Gets a value indicating whether the node is a named export from an external module.
     *
     * @param node The node to test.
     */
    function isNamedExternalModuleExport(node: ts.Node) {
        return isExternalModuleExport(node)
            && !ts.hasSyntacticModifier(node, ts.ModifierFlags.Default);
    }

    /**
     * Gets a value indicating whether the node is the default export of an external module.
     *
     * @param node The node to test.
     */
    function isDefaultExternalModuleExport(node: ts.Node) {
        return isExternalModuleExport(node)
            && ts.hasSyntacticModifier(node, ts.ModifierFlags.Default);
    }

    function addExportMemberAssignment(statements: ts.Statement[], node: ts.ClassDeclaration | ts.FunctionDeclaration) {
        const expression = factory.createAssignment(
            factory.getExternalModuleOrNamespaceExportName(currentNamespaceContainerName, node, /*allowComments*/ false, /*allowSourceMaps*/ true),
            factory.getLocalName(node)
        );
        ts.setSourceMapRange(expression, ts.createRange(node.name ? node.name.pos : node.pos, node.end));

        const statement = factory.createExpressionStatement(expression);
        ts.setSourceMapRange(statement, ts.createRange(-1, node.end));
        statements.push(statement);
    }

    function createNamespaceExport(exportName: ts.Identifier, exportValue: ts.Expression, location?: ts.TextRange) {
        return ts.setTextRange(
            factory.createExpressionStatement(
                factory.createAssignment(
                    factory.getNamespaceMemberName(currentNamespaceContainerName, exportName, /*allowComments*/ false, /*allowSourceMaps*/ true),
                    exportValue
                )
            ),
            location
        );
    }

    function createNamespaceExportExpression(exportName: ts.Identifier, exportValue: ts.Expression, location?: ts.TextRange) {
        return ts.setTextRange(factory.createAssignment(getNamespaceMemberNameWithSourceMapsAndWithoutComments(exportName), exportValue), location);
    }

    function getNamespaceMemberNameWithSourceMapsAndWithoutComments(name: ts.Identifier) {
        return factory.getNamespaceMemberName(currentNamespaceContainerName, name, /*allowComments*/ false, /*allowSourceMaps*/ true);
    }

    /**
     * Gets the declaration name used inside of a namespace or enum.
     */
    function getNamespaceParameterName(node: ts.ModuleDeclaration | ts.EnumDeclaration) {
        const name = factory.getGeneratedNameForNode(node);
        ts.setSourceMapRange(name, node.name);
        return name;
    }

    /**
     * Gets the expression used to refer to a namespace or enum within the body
     * of its declaration.
     */
    function getNamespaceContainerName(node: ts.ModuleDeclaration | ts.EnumDeclaration) {
        return factory.getGeneratedNameForNode(node);
    }

    function enableSubstitutionForNonQualifiedEnumMembers() {
        if ((enabledSubstitutions & TypeScriptSubstitutionFlags.NonQualifiedEnumMembers) === 0) {
            enabledSubstitutions |= TypeScriptSubstitutionFlags.NonQualifiedEnumMembers;
            context.enableSubstitution(ts.SyntaxKind.Identifier);
        }
    }

    function enableSubstitutionForNamespaceExports() {
        if ((enabledSubstitutions & TypeScriptSubstitutionFlags.NamespaceExports) === 0) {
            enabledSubstitutions |= TypeScriptSubstitutionFlags.NamespaceExports;

            // We need to enable substitutions for identifiers and shorthand property assignments. This allows us to
            // substitute the names of exported members of a namespace.
            context.enableSubstitution(ts.SyntaxKind.Identifier);
            context.enableSubstitution(ts.SyntaxKind.ShorthandPropertyAssignment);

            // We need to be notified when entering and exiting namespaces.
            context.enableEmitNotification(ts.SyntaxKind.ModuleDeclaration);
        }
    }

    function isTransformedModuleDeclaration(node: ts.Node): boolean {
        return ts.getOriginalNode(node).kind === ts.SyntaxKind.ModuleDeclaration;
    }

    function isTransformedEnumDeclaration(node: ts.Node): boolean {
        return ts.getOriginalNode(node).kind === ts.SyntaxKind.EnumDeclaration;
    }

    /**
     * Hook for node emit.
     *
     * @param hint A hint as to the intended usage of the node.
     * @param node The node to emit.
     * @param emit A callback used to emit the node in the printer.
     */
    function onEmitNode(hint: ts.EmitHint, node: ts.Node, emitCallback: (hint: ts.EmitHint, node: ts.Node) => void): void {
        const savedApplicableSubstitutions = applicableSubstitutions;
        const savedCurrentSourceFile = currentSourceFile;

        if (ts.isSourceFile(node)) {
            currentSourceFile = node;
        }

        if (enabledSubstitutions & TypeScriptSubstitutionFlags.NamespaceExports && isTransformedModuleDeclaration(node)) {
            applicableSubstitutions |= TypeScriptSubstitutionFlags.NamespaceExports;
        }

        if (enabledSubstitutions & TypeScriptSubstitutionFlags.NonQualifiedEnumMembers && isTransformedEnumDeclaration(node)) {
            applicableSubstitutions |= TypeScriptSubstitutionFlags.NonQualifiedEnumMembers;
        }

        previousOnEmitNode(hint, node, emitCallback);

        applicableSubstitutions = savedApplicableSubstitutions;
        currentSourceFile = savedCurrentSourceFile;
    }

    /**
     * Hooks node substitutions.
     *
     * @param hint A hint as to the intended usage of the node.
     * @param node The node to substitute.
     */
    function onSubstituteNode(hint: ts.EmitHint, node: ts.Node) {
        node = previousOnSubstituteNode(hint, node);
        if (hint === ts.EmitHint.Expression) {
            return substituteExpression(node as ts.Expression);
        }
        else if (ts.isShorthandPropertyAssignment(node)) {
            return substituteShorthandPropertyAssignment(node);
        }

        return node;
    }

    function substituteShorthandPropertyAssignment(node: ts.ShorthandPropertyAssignment): ts.ObjectLiteralElementLike {
        if (enabledSubstitutions & TypeScriptSubstitutionFlags.NamespaceExports) {
            const name = node.name;
            const exportedName = trySubstituteNamespaceExportedName(name);
            if (exportedName) {
                // A shorthand property with an assignment initializer is probably part of a
                // destructuring assignment
                if (node.objectAssignmentInitializer) {
                    const initializer = factory.createAssignment(exportedName, node.objectAssignmentInitializer);
                    return ts.setTextRange(factory.createPropertyAssignment(name, initializer), node);
                }
                return ts.setTextRange(factory.createPropertyAssignment(name, exportedName), node);
            }
        }
        return node;
    }

    function substituteExpression(node: ts.Expression) {
        switch (node.kind) {
            case ts.SyntaxKind.Identifier:
                return substituteExpressionIdentifier(node as ts.Identifier);
            case ts.SyntaxKind.PropertyAccessExpression:
                return substitutePropertyAccessExpression(node as ts.PropertyAccessExpression);
            case ts.SyntaxKind.ElementAccessExpression:
                return substituteElementAccessExpression(node as ts.ElementAccessExpression);
        }

        return node;
    }

    function substituteExpressionIdentifier(node: ts.Identifier): ts.Expression {
        return trySubstituteNamespaceExportedName(node)
            || node;
    }

    function trySubstituteNamespaceExportedName(node: ts.Identifier): ts.Expression | undefined {
        // If this is explicitly a local name, do not substitute.
        if (enabledSubstitutions & applicableSubstitutions && !ts.isGeneratedIdentifier(node) && !ts.isLocalName(node)) {
            // If we are nested within a namespace declaration, we may need to qualifiy
            // an identifier that is exported from a merged namespace.
            const container = resolver.getReferencedExportContainer(node, /*prefixLocals*/ false);
            if (container && container.kind !== ts.SyntaxKind.SourceFile) {
                const substitute =
                    (applicableSubstitutions & TypeScriptSubstitutionFlags.NamespaceExports && container.kind === ts.SyntaxKind.ModuleDeclaration) ||
                    (applicableSubstitutions & TypeScriptSubstitutionFlags.NonQualifiedEnumMembers && container.kind === ts.SyntaxKind.EnumDeclaration);
                if (substitute) {
                    return ts.setTextRange(
                        factory.createPropertyAccessExpression(factory.getGeneratedNameForNode(container), node),
                        /*location*/ node
                    );
                }
            }
        }

        return undefined;
    }

    function substitutePropertyAccessExpression(node: ts.PropertyAccessExpression) {
        return substituteConstantValue(node);
    }

    function substituteElementAccessExpression(node: ts.ElementAccessExpression) {
        return substituteConstantValue(node);
    }

    function safeMultiLineComment(value: string): string {
        return value.replace(/\*\//g, "*_/");
    }

    function substituteConstantValue(node: ts.PropertyAccessExpression | ts.ElementAccessExpression): ts.LeftHandSideExpression {
        const constantValue = tryGetConstEnumValue(node);
        if (constantValue !== undefined) {
            // track the constant value on the node for the printer in needsDotDotForPropertyAccess
            ts.setConstantValue(node, constantValue);

            const substitute = typeof constantValue === "string" ? factory.createStringLiteral(constantValue) : factory.createNumericLiteral(constantValue);
            if (!compilerOptions.removeComments) {
                const originalNode = ts.getOriginalNode(node, ts.isAccessExpression);

                ts.addSyntheticTrailingComment(substitute, ts.SyntaxKind.MultiLineCommentTrivia, ` ${safeMultiLineComment(ts.getTextOfNode(originalNode))} `);
            }
            return substitute;
        }

        return node;
    }

    function tryGetConstEnumValue(node: ts.Node): string | number | undefined {
        if (compilerOptions.isolatedModules) {
            return undefined;
        }

        return ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node) ? resolver.getConstantValue(node) : undefined;
    }

    function shouldEmitAliasDeclaration(node: ts.Node): boolean {
        return ts.isInJSFile(node) ||
            (compilerOptions.preserveValueImports
                ? resolver.isValueAliasDeclaration(node)
                : resolver.isReferencedAliasDeclaration(node));
    }
}
