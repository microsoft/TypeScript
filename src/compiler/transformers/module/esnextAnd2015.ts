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
    ExportSpecifier,
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
    ImportSpecifier,
    insertStatementsAfterCustomPrologue,
    isExportNamespaceAsDefaultDeclaration,
    isExternalModule,
    isExternalModuleImportEqualsDeclaration,
    isExternalModuleIndicator,
    isIdentifier,
    isIdentifierText,
    isNamespaceExport,
    isSourceFile,
    isStatement,
    ModifierFlags,
    ModuleExportName,
    ModuleKind,
    NamedImports,
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
                setTextRange(factory.createNodeArray(statements), node.statements));
        }
        else {
            return visitEachChild(node, visitor, context);
        }
    }

    function visitor(node: Node): VisitResult<Node | undefined> {
        switch (node.kind) {
            case SyntaxKind.ImportDeclaration:
                return visitImportDeclaration(node as ImportDeclaration);
            case SyntaxKind.ImportEqualsDeclaration:
                // Though an error in es2020 modules, in node-flavor es2020 modules, we can helpfully transform this to a synthetic `require` call
                // To give easy access to a synchronous `require` in node-flavor esm. We do the transform even in scenarios where we error, but `import.meta.url`
                // is available, just because the output is reasonable for a node-like runtime.
                return getEmitModuleKind(compilerOptions) >= ModuleKind.Node16 ? visitImportEqualsDeclaration(node as ImportEqualsDeclaration) : undefined;
            case SyntaxKind.ExportAssignment:
                return visitExportAssignment(node as ExportAssignment);
            case SyntaxKind.ExportDeclaration:
                const exportDecl = (node as ExportDeclaration);
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
                        factory.createImportSpecifier(/*isTypeOnly*/ false, factory.createIdentifier("createRequire"), createRequireName)
                    ])
                ),
                factory.createStringLiteral("module")
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
                                factory.createPropertyAccessExpression(factory.createMetaProperty(SyntaxKind.ImportKeyword, factory.createIdentifier("meta")), factory.createIdentifier("url"))
                            ])
                        )
                    ],
                    /*flags*/ languageVersion >= ScriptTarget.ES2015 ? NodeFlags.Const : NodeFlags.None
                )
            );
            importRequireStatements = [importStatement, requireStatement];

        }

        const name = importRequireStatements[1].declarationList.declarations[0].name;
        Debug.assertNode(name, isIdentifier);
        return factory.createCallExpression(factory.cloneNode(name), /*typeArguments*/ undefined, args);
    }

    /**
     * Visits an ImportDeclaration node.
     *
     * @param node The node to visit.
     */
    function visitImportDeclaration(node: ImportDeclaration): VisitResult<Statement> {
        if (compilerOptions.module !== ModuleKind.ES2015 && compilerOptions.module !== ModuleKind.ES2020) return node;
        if (node.importClause?.namedBindings?.kind !== SyntaxKind.NamedImports) return node;

        const clause = node.importClause;
        const substitutions: ImportSpecifier[] = [];
        let needUpdate = false;
        const bindings = clause.namedBindings as NamedImports;
        const nextImports: ImportSpecifier[] = [];
        for (const element of bindings.elements) {
            if (element.propertyName?.kind === SyntaxKind.StringLiteral) {
                const id = tryConvertModuleExportNameToIdentifier(element.propertyName);
                if (id) {
                    needUpdate = true;
                    nextImports.push(factory.updateImportSpecifier(element, element.isTypeOnly, id, element.name));
                }
                else {
                    substitutions.push(element);
                }
            }
            else nextImports.push(element);
        }
        if (!needUpdate && !substitutions.length) return node;
        node = factory.updateImportDeclaration(
            node,
            node.modifiers,
            factory.updateImportClause(clause, clause.isTypeOnly, clause.name, factory.updateNamedImports(bindings, nextImports)),
            node.moduleSpecifier,
            node.assertClause
        );
        if (!substitutions.length) return node;
        const nsImportName = factory.getGeneratedNameForNode(node);
        for (const element of substitutions) {
            // TODO: this does not support ESM live binding. Not worth to introduce so much node substitute code for this?
            context.addInitializationStatement(
                factory.createVariableStatement(
                    /*modifiers*/ undefined,
                    factory.createVariableDeclarationList(
                        [factory.createVariableDeclaration(
                            element.name,
                        /*exclamationToken*/ undefined,
                        /*type*/ undefined,
                            factory.createElementAccessExpression(
                                nsImportName,
                                element.propertyName!
                            )
                        )],
                        NodeFlags.Const
                    )
                )
            );
        }
        const nsImport = factory.createImportDeclaration(
            node.modifiers,
            factory.createImportClause(/*isTypeOnly*/ false, /*name*/ undefined, factory.createNamespaceImport(nsImportName)),
            node.moduleSpecifier,
            node.assertClause
        );
        if (!clause.name && nextImports.length === 0) return nsImport;
        return [node, nsImport];
    }

    /**
     * Visits an ImportEqualsDeclaration node.
     *
     * @param node The node to visit.
     */
    function visitImportEqualsDeclaration(node: ImportEqualsDeclaration): VisitResult<Statement | undefined> {
        Debug.assert(isExternalModuleImportEqualsDeclaration(node), "import= for internal module references should be handled in an earlier transformer.");

        let statements: Statement[] | undefined;
        statements = append(statements,
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
                                    createRequireCall(node)
                                )
                            ],
                            /*flags*/ languageVersion >= ScriptTarget.ES2015 ? NodeFlags.Const : NodeFlags.None
                        )
                    ),
                    node),
                node
            )
        );

        statements = appendExportsOfImportEqualsDeclaration(statements, node);

        return singleOrMany(statements);
    }

    function appendExportsOfImportEqualsDeclaration(statements: Statement[] | undefined, node: ImportEqualsDeclaration) {
        if (hasSyntacticModifier(node, ModifierFlags.Export)) {
            statements = append(statements, factory.createExportDeclaration(
                /*modifiers*/ undefined,
                node.isTypeOnly,
                factory.createNamedExports([factory.createExportSpecifier(/*isTypeOnly*/ false, /*propertyName*/ undefined, node.name)])
            ));
        }
        return statements;
    }

    function visitExportAssignment(node: ExportAssignment): VisitResult<ExportAssignment | undefined> {
        // Elide `export=` as it is not legal with --module ES6
        return node.isExportEquals ? undefined : node;
    }

    function tryConvertModuleExportNameToIdentifier(node: ModuleExportName): Identifier | undefined {
        if (node.kind === SyntaxKind.Identifier) return node;
        if (!isIdentifierText(node.text, languageVersion)) return undefined;
        const id = factory.createIdentifier(node.text);
        setOriginalNode(id, node);
        return id;
    }

    function visitExportDeclaration(node: ExportDeclaration) {
        // transform StringLiteral to Identifier when it's possible.
        if (compilerOptions.module === ModuleKind.ES2015 || compilerOptions.module === ModuleKind.ES2020) {
            const clause = node.exportClause;
            if (clause?.kind === SyntaxKind.NamespaceExport && clause.name.kind === SyntaxKind.StringLiteral) {
                const id = tryConvertModuleExportNameToIdentifier(clause.name);
                if (id) {
                    node = factory.updateExportDeclaration(
                        node,
                        node.modifiers,
                        node.isTypeOnly,
                        factory.updateNamespaceExport(clause, id),
                        node.moduleSpecifier,
                        node.assertClause
                    );
                }
                else return undefined;
            }
            if (clause?.kind === SyntaxKind.NamedExports) {
                const nextExports: ExportSpecifier[] = [];
                let needUpdate = false;
                for (const element of clause.elements) {
                    const exported = element.propertyName || element.name;
                    // ill-formed
                    if (exported.kind === SyntaxKind.StringLiteral && !node.moduleSpecifier) return node;
                    const prop = element.propertyName && tryConvertModuleExportNameToIdentifier(element.propertyName);
                    const name = tryConvertModuleExportNameToIdentifier(element.name);
                    if (element.name !== name || prop !== element.propertyName) {
                        needUpdate = true;
                        if ((element.propertyName && !prop) || !name) continue;
                        nextExports.push(factory.updateExportSpecifier(element, element.isTypeOnly, prop, name || element.name));
                    }
                    else nextExports.push(element);
                }
                if (needUpdate) {
                    node = factory.updateExportDeclaration(
                        node,
                        node.modifiers,
                        node.isTypeOnly,
                        factory.updateNamedExports(clause, nextExports),
                        node.moduleSpecifier,
                        node.assertClause
                    );
                }
            }
        }

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
                    synthName
                )
            ),
            node.moduleSpecifier,
            node.assertClause
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
