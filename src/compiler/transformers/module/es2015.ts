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

        let helperNameSubstitutions: Map<Identifier> | undefined;
        return chainBundle(transformSourceFile);

        function transformSourceFile(node: SourceFile) {
            if (node.isDeclarationFile) {
                return node;
            }

            if (isExternalModule(node) || compilerOptions.isolatedModules) {
                const externalHelpersImportDeclaration = createExternalHelpersImportDeclarationIfNeeded(node, compilerOptions);
                if (externalHelpersImportDeclaration) {
                    const statements: Statement[] = [];
                    const statementOffset = addPrologue(statements, node.statements);
                    append(statements, externalHelpersImportDeclaration);

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
         * @param emit A callback used to emit the node in the printer.
         */
        function onEmitNode(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void): void {
            if (isSourceFile(node)) {
                helperNameSubstitutions = createMap<Identifier>();
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
                helperNameSubstitutions!.set(name, substitution = createFileLevelUniqueName(name));
            }
            return substitution;
        }
    }
}
