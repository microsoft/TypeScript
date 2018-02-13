/// <reference path="../../factory.ts" />
/// <reference path="../../visitor.ts" />

/*@internal*/
namespace ts {
    export function transformES2015Module(context: TransformationContext) {
        const compilerOptions = context.getCompilerOptions();
        const previousOnBeforeEmitNode = context.onBeforeEmitNode;
        const previousOnAfterEmitNode = context.onAfterEmitNode;
        const previousOnSubstituteNode = context.onSubstituteNode;
        context.onBeforeEmitNode = onBeforeEmitNode;
        context.onAfterEmitNode = onAfterEmitNode;
        context.onSubstituteNode = onSubstituteNode;
        context.enableEmitNotification(SyntaxKind.SourceFile);
        context.enableSubstitution(SyntaxKind.Identifier);

        let currentSourceFile: SourceFile;
        return transformSourceFile;

        function transformSourceFile(node: SourceFile) {
            if (node.isDeclarationFile) {
                return node;
            }

            if (isExternalModule(node) || compilerOptions.isolatedModules) {
                const externalHelpersModuleName = getOrCreateExternalHelpersModuleNameIfNeeded(node, compilerOptions);
                if (externalHelpersModuleName) {
                    const statements: Statement[] = [];
                    const statementOffset = addPrologue(statements, node.statements);
                    const tslibImport = createImportDeclaration(
                        /*decorators*/ undefined,
                        /*modifiers*/ undefined,
                        createImportClause(/*name*/ undefined, createNamespaceImport(externalHelpersModuleName)),
                        createLiteral(externalHelpersModuleNameText)
                    );
                    addEmitFlags(tslibImport, EmitFlags.NeverApplyImportHelper);
                    append(statements, tslibImport);

                    addRange(statements, visitNodes(node.statements, visitor, isStatement, statementOffset));
                    return updateSourceFileNode(
                        node,
                        setTextRange(createNodeArray(statements), node.statements));
                }
                else {
                    return visitEachChild(node, visitor, context);
                }
            }

            return node;
        }

        function visitor(node: Node): VisitResult<Node> {
            switch (node.kind) {
                case SyntaxKind.ImportEqualsDeclaration:
                    // Elide `import=` as it is not legal with --module ES6
                    return undefined;
                case SyntaxKind.ExportAssignment:
                    return visitExportAssignment(<ExportAssignment>node);
            }

            return node;
        }

        function visitExportAssignment(node: ExportAssignment): VisitResult<ExportAssignment> {
            // Elide `export=` as it is not legal with --module ES6
            return node.isExportEquals ? undefined : node;
        }

        //
        // Emit Notification
        //

        /**
         * Hook for node emit.
         *
         * @param hint A hint as to the intended usage of the node.
         * @param node The node to emit.
         */
        function onBeforeEmitNode(hint: EmitHint, node: Node): void {
            if (isSourceFile(node)) {
                currentSourceFile = node;
            }
            previousOnBeforeEmitNode(hint, node);
        }

        function onAfterEmitNode(hint: EmitHint, node: Node): void {
            previousOnAfterEmitNode(hint, node);
            if (isSourceFile(node)) {
                currentSourceFile = undefined;
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
            if (isIdentifier(node) && hint === EmitHint.Expression) {
                return substituteExpressionIdentifier(node);
            }

            return node;
        }

        function substituteExpressionIdentifier(node: Identifier): Expression {
            if (getEmitFlags(node) & EmitFlags.HelperName) {
                const externalHelpersModuleName = getExternalHelpersModuleName(currentSourceFile);
                if (externalHelpersModuleName) {
                    return createPropertyAccess(externalHelpersModuleName, node);
                }
            }
            return node;
        }
    }
}
