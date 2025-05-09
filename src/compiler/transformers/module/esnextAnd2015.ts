import {
    addEmitHelpers,
    addRange,
    append,
    Bundle,
    CallExpression,
    chainBundle,
    createEmptyExports,
    createExternalHelpersImportDeclarationIfNeeded,
    Debug,
    EmitFlags,
    EmitHint,
    ExportAssignment,
    ExportDeclaration,
    Expression,
    ExpressionStatement,
    forEachDynamicImportOrRequireCall,
    GeneratedIdentifierFlags,
    getEmitFlags,
    getEmitModuleKind,
    getEmitScriptTarget,
    getExternalHelpersModuleName,
    getExternalModuleNameLiteral,
    getIsolatedModules,
    getNodeId,
    hasSyntacticModifier,
    Identifier,
    idText,
    ImportDeclaration,
    ImportEqualsDeclaration,
    insertStatementsAfterCustomPrologue,
    isExportNamespaceAsDefaultDeclaration,
    isExternalModule,
    isExternalModuleImportEqualsDeclaration,
    isExternalModuleIndicator,
    isIdentifier,
    isInJSFile,
    isNamespaceExport,
    isSourceFile,
    isStatement,
    isStringLiteralLike,
    ModifierFlags,
    ModuleKind,
    Node,
    NodeFlags,
    NodeId,
    rangeContainsRange,
    rewriteModuleSpecifier,
    ScriptTarget,
    setOriginalNode,
    setTextRange,
    shouldRewriteModuleSpecifier,
    singleOrMany,
    some,
    SourceFile,
    Statement,
    SyntaxKind,
    TransformationContext,
    VariableStatement,
    visitArray,
    visitEachChild,
    visitNodes,
    VisitResult,
} from "../../_namespaces/ts.js";

/** @internal */
export function transformECMAScriptModule(context: TransformationContext): (x: SourceFile | Bundle) => SourceFile | Bundle {
    const {
        factory,
        getEmitHelperFactory: emitHelpers,
    } = context;
    const host = context.getEmitHost();
    const resolver = context.getEmitResolver();
    const compilerOptions = context.getCompilerOptions();
    const languageVersion = getEmitScriptTarget(compilerOptions);
    const previousOnEmitNode = context.onEmitNode;
    const previousOnSubstituteNode = context.onSubstituteNode;
    context.onEmitNode = onEmitNode;
    context.onSubstituteNode = onSubstituteNode;
    context.enableEmitNotification(SyntaxKind.SourceFile);
    context.enableSubstitution(SyntaxKind.Identifier);

    const noSubstitution = new Set<NodeId>();
    let importsAndRequiresToRewriteOrShim: CallExpression[] | undefined;
    let helperNameSubstitutions: Map<string, Identifier> | undefined;
    let currentSourceFile: SourceFile | undefined;
    let importRequireStatements: [ImportDeclaration, VariableStatement] | undefined;
    return chainBundle(context, transformSourceFile);

    function transformSourceFile(node: SourceFile) {
        if (node.isDeclarationFile) {
            return node;
        }

        if (isExternalModule(node) || getIsolatedModules(compilerOptions)) {
            currentSourceFile = node;
            importRequireStatements = undefined;
            if (compilerOptions.rewriteRelativeImportExtensions && (currentSourceFile.flags & NodeFlags.PossiblyContainsDynamicImport || isInJSFile(node))) {
                forEachDynamicImportOrRequireCall(node, /*includeTypeSpaceImports*/ false, /*requireStringLiteralLikeArgument*/ false, node => {
                    if (!isStringLiteralLike(node.arguments[0]) || shouldRewriteModuleSpecifier(node.arguments[0].text, compilerOptions)) {
                        importsAndRequiresToRewriteOrShim = append(importsAndRequiresToRewriteOrShim, node);
                    }
                });
            }
            let result = updateExternalModule(node);
            addEmitHelpers(result, context.readEmitHelpers());
            currentSourceFile = undefined;
            if (importRequireStatements) {
                result = factory.updateSourceFile(
                    result,
                    setTextRange(factory.createNodeArray(insertStatementsAfterCustomPrologue(result.statements.slice(), importRequireStatements)), result.statements),
                );
            }
            if (!isExternalModule(node) || getEmitModuleKind(compilerOptions) === ModuleKind.Preserve || some(result.statements, isExternalModuleIndicator)) {
                return result;
            }
            return factory.updateSourceFile(
                result,
                setTextRange(factory.createNodeArray([...result.statements, createEmptyExports(factory)]), result.statements),
            );
        }

        return node;
    }

    function updateExternalModule(node: SourceFile) {
        const externalHelpersImportDeclaration = createExternalHelpersImportDeclarationIfNeeded(factory, emitHelpers(), node, compilerOptions);
        if (externalHelpersImportDeclaration) {
            const statements: Statement[] = [];
            const statementOffset = factory.copyPrologue(node.statements, statements);
            addRange(statements, visitArray([externalHelpersImportDeclaration], visitor, isStatement));
            addRange(statements, visitNodes(node.statements, visitor, isStatement, statementOffset));
            return factory.updateSourceFile(
                node,
                setTextRange(factory.createNodeArray(statements), node.statements),
            );
        }
        else {
            return visitEachChild(node, visitor, context);
        }
    }

    function visitor(node: Node): VisitResult<Node | undefined> {
        switch (node.kind) {
            case SyntaxKind.ImportEqualsDeclaration:
                // Though an error in es2020 modules, in node-flavor es2020 modules, we can helpfully transform this to a synthetic `require` call
                // To give easy access to a synchronous `require` in node-flavor esm. We do the transform even in scenarios where we error, but `import.meta.url`
                // is available, just because the output is reasonable for a node-like runtime.
                return getEmitModuleKind(compilerOptions) >= ModuleKind.Node16 ? visitImportEqualsDeclaration(node as ImportEqualsDeclaration) : undefined;
            case SyntaxKind.ExportAssignment:
                return visitExportAssignment(node as ExportAssignment);
            case SyntaxKind.ExportDeclaration:
                const exportDecl = node as ExportDeclaration;
                return visitExportDeclaration(exportDecl);
            case SyntaxKind.ImportDeclaration:
                return visitImportDeclaration(node as ImportDeclaration);
            case SyntaxKind.CallExpression:
                if (node === importsAndRequiresToRewriteOrShim?.[0]) {
                    return visitImportOrRequireCall(importsAndRequiresToRewriteOrShim.shift()!);
                }
                // fallthrough
            default:
                if (importsAndRequiresToRewriteOrShim?.length && rangeContainsRange(node, importsAndRequiresToRewriteOrShim[0])) {
                    return visitEachChild(node, visitor, context);
                }
        }

        return node;
    }

    function visitImportDeclaration(node: ImportDeclaration): VisitResult<ImportDeclaration> {
        if (!compilerOptions.rewriteRelativeImportExtensions) {
            return node;
        }
        const updatedModuleSpecifier = rewriteModuleSpecifier(node.moduleSpecifier, compilerOptions);
        if (updatedModuleSpecifier === node.moduleSpecifier) {
            return node;
        }
        return factory.updateImportDeclaration(
            node,
            node.modifiers,
            node.importClause,
            updatedModuleSpecifier,
            node.attributes,
        );
    }

    function visitImportOrRequireCall(node: CallExpression): VisitResult<Expression> {
        return factory.updateCallExpression(
            node,
            node.expression,
            node.typeArguments,
            [
                isStringLiteralLike(node.arguments[0])
                    ? rewriteModuleSpecifier(node.arguments[0], compilerOptions)
                    : emitHelpers().createRewriteRelativeImportExtensionsHelper(node.arguments[0]),
                ...node.arguments.slice(1),
            ],
        );
    }

    /**
     * Creates a `require()` call to import an external module.
     *
     * @param importNode The declaration to import.
     */
    function createRequireCall(importNode: ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration) {
        const moduleName = getExternalModuleNameLiteral(factory, importNode, Debug.checkDefined(currentSourceFile), host, resolver, compilerOptions);
        const args: Expression[] = [];
        if (moduleName) {
            args.push(rewriteModuleSpecifier(moduleName, compilerOptions));
        }
        if (getEmitModuleKind(compilerOptions) === ModuleKind.Preserve) {
            return factory.createCallExpression(factory.createIdentifier("require"), /*typeArguments*/ undefined, args);
        }

        if (!importRequireStatements) {
            const createRequireName = factory.createUniqueName("_createRequire", GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel);
            const importStatement = factory.createImportDeclaration(
                /*modifiers*/ undefined,
                factory.createImportClause(
                    /*isTypeOnly*/ false,
                    /*name*/ undefined,
                    factory.createNamedImports([
                        factory.createImportSpecifier(/*isTypeOnly*/ false, factory.createIdentifier("createRequire"), createRequireName),
                    ]),
                ),
                factory.createStringLiteral("module"),
                /*attributes*/ undefined,
            );
            const requireHelperName = factory.createUniqueName("__require", GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel);
            const requireStatement = factory.createVariableStatement(
                /*modifiers*/ undefined,
                factory.createVariableDeclarationList(
                    [
                        factory.createVariableDeclaration(
                            requireHelperName,
                            /*exclamationToken*/ undefined,
                            /*type*/ undefined,
                            factory.createCallExpression(factory.cloneNode(createRequireName), /*typeArguments*/ undefined, [
                                factory.createPropertyAccessExpression(factory.createMetaProperty(SyntaxKind.ImportKeyword, factory.createIdentifier("meta")), factory.createIdentifier("url")),
                            ]),
                        ),
                    ],
                    /*flags*/ languageVersion >= ScriptTarget.ES2015 ? NodeFlags.Const : NodeFlags.None,
                ),
            );
            importRequireStatements = [importStatement, requireStatement];
        }

        const name = importRequireStatements[1].declarationList.declarations[0].name;
        Debug.assertNode(name, isIdentifier);
        return factory.createCallExpression(factory.cloneNode(name), /*typeArguments*/ undefined, args);
    }

    /**
     * Visits an ImportEqualsDeclaration node.
     *
     * @param node The node to visit.
     */
    function visitImportEqualsDeclaration(node: ImportEqualsDeclaration): VisitResult<Statement | undefined> {
        Debug.assert(isExternalModuleImportEqualsDeclaration(node), "import= for internal module references should be handled in an earlier transformer.");

        let statements: Statement[] | undefined;
        statements = append(
            statements,
            setOriginalNode(
                setTextRange(
                    factory.createVariableStatement(
                        /*modifiers*/ undefined,
                        factory.createVariableDeclarationList(
                            [
                                factory.createVariableDeclaration(
                                    factory.cloneNode(node.name),
                                    /*exclamationToken*/ undefined,
                                    /*type*/ undefined,
                                    createRequireCall(node),
                                ),
                            ],
                            /*flags*/ languageVersion >= ScriptTarget.ES2015 ? NodeFlags.Const : NodeFlags.None,
                        ),
                    ),
                    node,
                ),
                node,
            ),
        );

        statements = appendExportsOfImportEqualsDeclaration(statements, node);

        return singleOrMany(statements);
    }

    function appendExportsOfImportEqualsDeclaration(statements: Statement[] | undefined, node: ImportEqualsDeclaration) {
        if (hasSyntacticModifier(node, ModifierFlags.Export)) {
            statements = append(
                statements,
                factory.createExportDeclaration(
                    /*modifiers*/ undefined,
                    node.isTypeOnly,
                    factory.createNamedExports([factory.createExportSpecifier(/*isTypeOnly*/ false, /*propertyName*/ undefined, idText(node.name))]),
                ),
            );
        }
        return statements;
    }

    function visitExportAssignment(node: ExportAssignment): VisitResult<ExportAssignment | ExpressionStatement | undefined> {
        if (node.isExportEquals) {
            if (getEmitModuleKind(compilerOptions) === ModuleKind.Preserve) {
                const statement = setOriginalNode(
                    factory.createExpressionStatement(
                        factory.createAssignment(
                            factory.createPropertyAccessExpression(
                                factory.createIdentifier("module"),
                                "exports",
                            ),
                            node.expression,
                        ),
                    ),
                    node,
                );
                return statement;
            }
            // Elide `export=` as it is not legal with --module ES6
            return undefined;
        }
        return node;
    }

    function visitExportDeclaration(node: ExportDeclaration) {
        const updatedModuleSpecifier = rewriteModuleSpecifier(node.moduleSpecifier, compilerOptions);
        if (
            (compilerOptions.module !== undefined && compilerOptions.module > ModuleKind.ES2015)
            || !node.exportClause || !isNamespaceExport(node.exportClause) || !node.moduleSpecifier
        ) {
            // Either ill-formed or don't need to be tranformed.
            return (!node.moduleSpecifier || updatedModuleSpecifier === node.moduleSpecifier) ? node :
                factory.updateExportDeclaration(
                    node,
                    node.modifiers,
                    node.isTypeOnly,
                    node.exportClause,
                    updatedModuleSpecifier,
                    node.attributes,
                );
        }

        const oldIdentifier = node.exportClause.name;
        const synthName = factory.getGeneratedNameForNode(oldIdentifier);
        const importDecl = factory.createImportDeclaration(
            /*modifiers*/ undefined,
            factory.createImportClause(
                /*isTypeOnly*/ false,
                /*name*/ undefined,
                factory.createNamespaceImport(
                    synthName,
                ),
            ),
            updatedModuleSpecifier!,
            node.attributes,
        );
        setOriginalNode(importDecl, node.exportClause);

        const exportDecl = isExportNamespaceAsDefaultDeclaration(node) ? factory.createExportDefault(synthName) : factory.createExportDeclaration(
            /*modifiers*/ undefined,
            /*isTypeOnly*/ false,
            factory.createNamedExports([factory.createExportSpecifier(/*isTypeOnly*/ false, synthName, oldIdentifier)]),
        );
        setOriginalNode(exportDecl, node);

        return [importDecl, exportDecl];
    }

    //
    // Emit Notification
    //

    /**
     * Hook for node emit.
     *
     * @param hint A hint as to the intended usage of the node.
     * @param node The node to emit.
     * @param emit A callback used to emit the node in the printer.
     */
    function onEmitNode(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void): void {
        if (isSourceFile(node)) {
            if ((isExternalModule(node) || getIsolatedModules(compilerOptions)) && compilerOptions.importHelpers) {
                helperNameSubstitutions = new Map<string, Identifier>();
            }
            currentSourceFile = node;
            previousOnEmitNode(hint, node, emitCallback);
            currentSourceFile = undefined;
            helperNameSubstitutions = undefined;
        }
        else {
            previousOnEmitNode(hint, node, emitCallback);
        }
    }

    //
    // Substitutions
    //

    /**
     * Hooks node substitutions.
     *
     * @param hint A hint as to the intended usage of the node.
     * @param node The node to substitute.
     */
    function onSubstituteNode(hint: EmitHint, node: Node) {
        node = previousOnSubstituteNode(hint, node);
        if (node.id && noSubstitution.has(node.id)) {
            return node;
        }
        if (isIdentifier(node) && getEmitFlags(node) & EmitFlags.HelperName) {
            return substituteHelperName(node);
        }

        return node;
    }

    function substituteHelperName(node: Identifier): Expression {
        const externalHelpersModuleName = currentSourceFile && getExternalHelpersModuleName(currentSourceFile);
        if (externalHelpersModuleName) {
            noSubstitution.add(getNodeId(node));
            return factory.createPropertyAccessExpression(externalHelpersModuleName, node);
        }
        if (helperNameSubstitutions) {
            const name = idText(node);
            let substitution = helperNameSubstitutions.get(name);
            if (!substitution) {
                helperNameSubstitutions.set(name, substitution = factory.createUniqueName(name, GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel));
            }
            return substitution;
        }
        return node;
    }
}
