/*@internal*/
namespace ts {
    export function transformECMAScriptModule(context: TransformationContext) {
        const {
            factory,
            getEmitHelperFactory: emitHelpers,
        } = context;
        const compilerOptions = context.getCompilerOptions();
        const previousOnEmitNode = context.onEmitNode;
        const previousOnSubstituteNode = context.onSubstituteNode;
        context.onEmitNode = onEmitNode;
        context.onSubstituteNode = onSubstituteNode;
        context.enableEmitNotification(SyntaxKind.SourceFile);
        context.enableSubstitution(SyntaxKind.Identifier);

        let helperNameSubstitutions: Map<string, Identifier> | undefined;
        return chainBundle(context, transformSourceFile);

        function transformSourceFile(node: SourceFile) {
            if (node.isDeclarationFile) {
                return node;
            }

            if (isExternalModule(node) || compilerOptions.isolatedModules) {
                const result = updateExternalModule(node);
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

        function visitor(node: Node): VisitResult<Node> {
            switch (node.kind) {
                case SyntaxKind.ImportEqualsDeclaration:
                    // Elide `import=` as it is not legal with --module ES6
                    return undefined;
                case SyntaxKind.ExportAssignment:
                    return visitExportAssignment(<ExportAssignment>node);
                case SyntaxKind.ExportDeclaration:
                    const exportDecl = (node as ExportDeclaration);
                    return visitExportDeclaration(exportDecl);
            }

            return node;
        }

        function visitExportAssignment(node: ExportAssignment): VisitResult<ExportAssignment> {
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
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                factory.createImportClause(
                    /*isTypeOnly*/ false,
                    /*name*/ undefined,
                    factory.createNamespaceImport(
                        synthName
                    )
                ),
                node.moduleSpecifier,
            );
            setOriginalNode(importDecl, node.exportClause);

            const exportDecl = factory.createExportDeclaration(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*isTypeOnly*/ false,
                factory.createNamedExports([factory.createExportSpecifier(synthName, oldIdentifier)]),
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
                if ((isExternalModule(node) || compilerOptions.isolatedModules) && compilerOptions.importHelpers) {
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
}
