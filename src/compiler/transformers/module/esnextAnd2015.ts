import {
    addRange,
    append,
    Bundle,
    chainBundle,
    createEmptyExports,
    createExternalHelpersImportDeclarationIfNeeded,
    Debug,
    EmitFlags,
    EmitHint,
    ExportAssignment,
    ExportDeclaration,
    Expression,
    GeneratedIdentifierFlags,
    getEmitFlags,
    getEmitModuleKind,
    getEmitScriptTarget,
    getExternalModuleNameLiteral,
    getIsolatedModules,
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
    isNamespaceExport,
    isSourceFile,
    isStatement,
    ModifierFlags,
    ModuleKind,
    Node,
    NodeFlags,
    ScriptTarget,
    setOriginalNode,
    setTextRange,
    singleOrMany,
    some,
    SourceFile,
    Statement,
    SyntaxKind,
    TransformationContext,
    VariableStatement,
    visitEachChild,
    visitNodes,
    VisitResult,
} from "../../_namespaces/ts";

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
            let result = updateExternalModule(node);
            currentSourceFile = undefined;
            if (importRequireStatements) {
                result = factory.updateSourceFile(
                    result,
                    setTextRange(factory.createNodeArray(insertStatementsAfterCustomPrologue(result.statements.slice(), importRequireStatements)), result.statements),
                );
            }
            if (!isExternalModule(node) || some(result.statements, isExternalModuleIndicator)) {
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
            append(statements, externalHelpersImportDeclaration);

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
        }

        return node;
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
            args.push(moduleName);
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

    function visitExportAssignment(node: ExportAssignment): VisitResult<ExportAssignment | undefined> {
        // Elide `export=` as it is not legal with --module ES6
        return node.isExportEquals ? undefined : node;
    }

    function visitExportDeclaration(node: ExportDeclaration) {
        // `export * as ns` only needs to be transformed in ES2015
        if (compilerOptions.module !== undefined && compilerOptions.module > ModuleKind.ES2015) {
            return node;
        }

        // Either ill-formed or don't need to be tranformed.
        if (!node.exportClause || !isNamespaceExport(node.exportClause) || !node.moduleSpecifier) {
            return node;
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
            node.moduleSpecifier,
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
            previousOnEmitNode(hint, node, emitCallback);
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
        if (helperNameSubstitutions && isIdentifier(node) && getEmitFlags(node) & EmitFlags.HelperName) {
            return substituteHelperName(node);
        }

        return node;
    }

    function substituteHelperName(node: Identifier): Expression {
        const name = idText(node);
        let substitution = helperNameSubstitutions!.get(name);
        if (!substitution) {
            helperNameSubstitutions!.set(name, substitution = factory.createUniqueName(name, GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel));
        }
        return substitution;
    }
}
