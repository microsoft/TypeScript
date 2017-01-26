/// <reference path="../../factory.ts" />
/// <reference path="../../visitor.ts" />

/*@internal*/
namespace ts {
    export function transformES2015Module(context: TransformationContext) {
        const compilerOptions = context.getCompilerOptions();
        const previousOnEmitNode = context.onEmitNode;
        const previousOnSubstituteNode = context.onSubstituteNode;
        context.onEmitNode = onEmitNode;
        context.onSubstituteNode = onSubstituteNode;
        context.enableEmitNotification(SyntaxKind.SourceFile);
        context.enableSubstitution(SyntaxKind.Identifier);

        let currentSourceFile: SourceFile;
        return transformSourceFile;

        function transformSourceFile(node: SourceFile) {
            if (isDeclarationFile(node)) {
                return node;
            }

            if (isExternalModule(node) || compilerOptions.isolatedModules) {
                const externalHelpersModuleName = getOrCreateExternalHelpersModuleNameIfNeeded(node, compilerOptions);
                if (externalHelpersModuleName) {
                    const statements: Statement[] = [];
                    const statementOffset = addPrologueDirectives(statements, node.statements);
                    append(statements,
                        createImportDeclaration(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            createImportClause(/*name*/ undefined, createNamespaceImport(externalHelpersModuleName)),
                            createLiteral(externalHelpersModuleNameText)
                        )
                    );

                    addRange(statements, visitNodes(node.statements, visitor, isStatement, statementOffset));
                    return updateSourceFileNode(
                        node,
                        createNodeArray(statements, node.statements));
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
         * @param emit A callback used to emit the node in the printer.
         */
        function onEmitNode(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void): void {
            if (isSourceFile(node)) {
                currentSourceFile = node;
                previousOnEmitNode(hint, node, emitCallback);
                currentSourceFile = undefined;
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
