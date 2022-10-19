/*@internal*/
namespace ts {
export function transformECMAScriptModule(context: ts.TransformationContext) {
    const {
        factory,
        getEmitHelperFactory: emitHelpers,
    } = context;
    const host = context.getEmitHost();
    const resolver = context.getEmitResolver();
    const compilerOptions = context.getCompilerOptions();
    const languageVersion = ts.getEmitScriptTarget(compilerOptions);
    const previousOnEmitNode = context.onEmitNode;
    const previousOnSubstituteNode = context.onSubstituteNode;
    context.onEmitNode = onEmitNode;
    context.onSubstituteNode = onSubstituteNode;
    context.enableEmitNotification(ts.SyntaxKind.SourceFile);
    context.enableSubstitution(ts.SyntaxKind.Identifier);

    let helperNameSubstitutions: ts.ESMap<string, ts.Identifier> | undefined;
    let currentSourceFile: ts.SourceFile | undefined;
    let importRequireStatements: [ts.ImportDeclaration, ts.VariableStatement] | undefined;
    return ts.chainBundle(context, transformSourceFile);

    function transformSourceFile(node: ts.SourceFile) {
        if (node.isDeclarationFile) {
            return node;
        }

        if (ts.isExternalModule(node) || compilerOptions.isolatedModules) {
            currentSourceFile = node;
            importRequireStatements = undefined;
            let result = updateExternalModule(node);
            currentSourceFile = undefined;
            if (importRequireStatements) {
                result = factory.updateSourceFile(
                    result,
                    ts.setTextRange(factory.createNodeArray(ts.insertStatementsAfterCustomPrologue(result.statements.slice(), importRequireStatements)), result.statements),
                );
            }
            if (!ts.isExternalModule(node) || ts.some(result.statements, ts.isExternalModuleIndicator)) {
                return result;
            }
            return factory.updateSourceFile(
                result,
                ts.setTextRange(factory.createNodeArray([...result.statements, ts.createEmptyExports(factory)]), result.statements),
            );
        }

        return node;
    }

    function updateExternalModule(node: ts.SourceFile) {
        const externalHelpersImportDeclaration = ts.createExternalHelpersImportDeclarationIfNeeded(factory, emitHelpers(), node, compilerOptions);
        if (externalHelpersImportDeclaration) {
            const statements: ts.Statement[] = [];
            const statementOffset = factory.copyPrologue(node.statements, statements);
            ts.append(statements, externalHelpersImportDeclaration);

            ts.addRange(statements, ts.visitNodes(node.statements, visitor, ts.isStatement, statementOffset));
            return factory.updateSourceFile(
                node,
                ts.setTextRange(factory.createNodeArray(statements), node.statements));
        }
        else {
            return ts.visitEachChild(node, visitor, context);
        }
    }

    function visitor(node: ts.Node): ts.VisitResult<ts.Node> {
        switch (node.kind) {
            case ts.SyntaxKind.ImportEqualsDeclaration:
                // Though an error in es2020 modules, in node-flavor es2020 modules, we can helpfully transform this to a synthetic `require` call
                // To give easy access to a synchronous `require` in node-flavor esm. We do the transform even in scenarios where we error, but `import.meta.url`
                // is available, just because the output is reasonable for a node-like runtime.
                return ts.getEmitModuleKind(compilerOptions) >= ts.ModuleKind.Node16 ? visitImportEqualsDeclaration(node as ts.ImportEqualsDeclaration) : undefined;
            case ts.SyntaxKind.ExportAssignment:
                return visitExportAssignment(node as ts.ExportAssignment);
            case ts.SyntaxKind.ExportDeclaration:
                const exportDecl = (node as ts.ExportDeclaration);
                return visitExportDeclaration(exportDecl);
        }

        return node;
    }

    /**
     * Creates a `require()` call to import an external module.
     *
     * @param importNode The declaration to import.
     */
     function createRequireCall(importNode: ts.ImportDeclaration | ts.ImportEqualsDeclaration | ts.ExportDeclaration) {
        const moduleName = ts.getExternalModuleNameLiteral(factory, importNode, ts.Debug.checkDefined(currentSourceFile), host, resolver, compilerOptions);
        const args: ts.Expression[] = [];
        if (moduleName) {
            args.push(moduleName);
        }

        if (!importRequireStatements) {
            const createRequireName = factory.createUniqueName("_createRequire", ts.GeneratedIdentifierFlags.Optimistic | ts.GeneratedIdentifierFlags.FileLevel);
            const importStatement = factory.createImportDeclaration(
                /*modifiers*/ undefined,
                factory.createImportClause(
                    /*isTypeOnly*/ false,
                    /*name*/ undefined,
                    factory.createNamedImports([
                        factory.createImportSpecifier(/*isTypeOnly*/ false, factory.createIdentifier("createRequire"), createRequireName)
                    ])
                ),
                factory.createStringLiteral("module")
            );
            const requireHelperName = factory.createUniqueName("__require", ts.GeneratedIdentifierFlags.Optimistic | ts.GeneratedIdentifierFlags.FileLevel);
            const requireStatement = factory.createVariableStatement(
                /*modifiers*/ undefined,
                factory.createVariableDeclarationList(
                    [
                        factory.createVariableDeclaration(
                            requireHelperName,
                            /*exclamationToken*/ undefined,
                            /*type*/ undefined,
                            factory.createCallExpression(factory.cloneNode(createRequireName), /*typeArguments*/ undefined, [
                                factory.createPropertyAccessExpression(factory.createMetaProperty(ts.SyntaxKind.ImportKeyword, factory.createIdentifier("meta")), factory.createIdentifier("url"))
                            ])
                        )
                    ],
                    /*flags*/ languageVersion >= ts.ScriptTarget.ES2015 ? ts.NodeFlags.Const : ts.NodeFlags.None
                )
            );
            importRequireStatements = [importStatement, requireStatement];

        }

        const name = importRequireStatements[1].declarationList.declarations[0].name;
        ts.Debug.assertNode(name, ts.isIdentifier);
        return factory.createCallExpression(factory.cloneNode(name), /*typeArguments*/ undefined, args);
    }

    /**
     * Visits an ImportEqualsDeclaration node.
     *
     * @param node The node to visit.
     */
    function visitImportEqualsDeclaration(node: ts.ImportEqualsDeclaration): ts.VisitResult<ts.Statement> {
        ts.Debug.assert(ts.isExternalModuleImportEqualsDeclaration(node), "import= for internal module references should be handled in an earlier transformer.");

        let statements: ts.Statement[] | undefined;
        statements = ts.append(statements,
            ts.setOriginalNode(
                ts.setTextRange(
                    factory.createVariableStatement(
                        /*modifiers*/ undefined,
                        factory.createVariableDeclarationList(
                            [
                                factory.createVariableDeclaration(
                                    factory.cloneNode(node.name),
                                    /*exclamationToken*/ undefined,
                                    /*type*/ undefined,
                                    createRequireCall(node)
                                )
                            ],
                            /*flags*/ languageVersion >= ts.ScriptTarget.ES2015 ? ts.NodeFlags.Const : ts.NodeFlags.None
                        )
                    ),
                    node),
                node
            )
        );

        statements = appendExportsOfImportEqualsDeclaration(statements, node);

        return ts.singleOrMany(statements);
    }

    function appendExportsOfImportEqualsDeclaration(statements: ts.Statement[] | undefined, node: ts.ImportEqualsDeclaration) {
        if (ts.hasSyntacticModifier(node, ts.ModifierFlags.Export)) {
            statements = ts.append(statements, factory.createExportDeclaration(
                /*modifiers*/ undefined,
                node.isTypeOnly,
                factory.createNamedExports([factory.createExportSpecifier(/*isTypeOnly*/ false, /*propertyName*/ undefined, ts.idText(node.name))])
            ));
        }
        return statements;
    }

    function visitExportAssignment(node: ts.ExportAssignment): ts.VisitResult<ts.ExportAssignment> {
        // Elide `export=` as it is not legal with --module ES6
        return node.isExportEquals ? undefined : node;
    }

    function visitExportDeclaration(node: ts.ExportDeclaration) {
        // `export * as ns` only needs to be transformed in ES2015
        if (compilerOptions.module !== undefined && compilerOptions.module > ts.ModuleKind.ES2015) {
            return node;
        }

        // Either ill-formed or don't need to be tranformed.
        if (!node.exportClause || !ts.isNamespaceExport(node.exportClause) || !node.moduleSpecifier) {
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
                    synthName
                )
            ),
            node.moduleSpecifier,
            node.assertClause
        );
        ts.setOriginalNode(importDecl, node.exportClause);

        const exportDecl = ts.isExportNamespaceAsDefaultDeclaration(node) ? factory.createExportDefault(synthName) : factory.createExportDeclaration(
            /*modifiers*/ undefined,
            /*isTypeOnly*/ false,
            factory.createNamedExports([factory.createExportSpecifier(/*isTypeOnly*/ false, synthName, oldIdentifier)]),
        );
        ts.setOriginalNode(exportDecl, node);

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
    function onEmitNode(hint: ts.EmitHint, node: ts.Node, emitCallback: (hint: ts.EmitHint, node: ts.Node) => void): void {
        if (ts.isSourceFile(node)) {
            if ((ts.isExternalModule(node) || compilerOptions.isolatedModules) && compilerOptions.importHelpers) {
                helperNameSubstitutions = new ts.Map<string, ts.Identifier>();
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
    function onSubstituteNode(hint: ts.EmitHint, node: ts.Node) {
        node = previousOnSubstituteNode(hint, node);
        if (helperNameSubstitutions && ts.isIdentifier(node) && ts.getEmitFlags(node) & ts.EmitFlags.HelperName) {
            return substituteHelperName(node);
        }

        return node;
    }

    function substituteHelperName(node: ts.Identifier): ts.Expression {
        const name = ts.idText(node);
        let substitution = helperNameSubstitutions!.get(name);
        if (!substitution) {
            helperNameSubstitutions!.set(name, substitution = factory.createUniqueName(name, ts.GeneratedIdentifierFlags.Optimistic | ts.GeneratedIdentifierFlags.FileLevel));
        }
        return substitution;
    }
}
}
