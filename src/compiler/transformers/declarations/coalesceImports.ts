/*@internal*/
namespace ts {
    export function transformCoalesceImports(context: TransformationContext) {
        const {
            factory,
            getEmitResolver
        } = context;
        return chainBundle(context, transformSourceFile);

        type CoalesceKey = string & { __coalesceKey: void };

        function getCoalesceKeyForAssertions(node: AssertClause | undefined): string | false {
            if (node) {
                if (some(node.elements, e => !isStringLiteralLike(e.value))) return false; // non-string assertion value, don't mess with it
                return (map(node.elements, e => `${isIdentifier(e.name) ? idText(e.name) : e.name.text}:${(e.value as StringLiteralLike).text}`) || []).join(",");
            }
            return "";
        }

        function getCoalesceKeyForImport(node: ImportTypeNode | ImportDeclaration): CoalesceKey | false {
            if (isImportTypeNode(node) && isLiteralTypeNode(node.argument) && isStringLiteralLike(node.argument.literal)) {
                const assertionKey = getCoalesceKeyForAssertions(node.assertions?.assertClause);
                if (assertionKey === false) {
                    return false;
                }
                return `${node.argument.literal.text}|${assertionKey}` as CoalesceKey;
            }
            if (isImportDeclaration(node) && isStringLiteralLike(node.moduleSpecifier)) {
                const assertionKey = getCoalesceKeyForAssertions(node.assertClause);
                if (assertionKey === false) {
                    return false;
                }
                return `${node.moduleSpecifier.text}|${assertionKey}` as CoalesceKey;
            }
            return false;
        }

        function transformSourceFile(rootFile: SourceFile) {
            if (!isExternalModule(rootFile)) {
                return rootFile;
            }
            const memberwiseImportTypeNodesBySpecifier = createMultiMap<CoalesceKey, LiteralImportTypeNode>();
            const memberwiseImportDeclarationsBySpecifier = createMultiMap<CoalesceKey, ImportDeclaration>();
            const namespaceImportTypeNodesBySpecifier = createMultiMap<CoalesceKey, LiteralImportTypeNode>();
            const namespaceImportDeclarationsBySpecifier = createMultiMap<CoalesceKey, ImportDeclaration>();
            const resolver = getEmitResolver();
            visitEachChild(rootFile, collectRootImports, context);
            return visitEachChild(rootFile, combineImportTypes, context);
        
            function collectRootImports(node: Node): VisitResult<Node> {
                switch (node.kind) {
                    case SyntaxKind.ImportDeclaration:
                        Debug.assertNode(node, isImportDeclaration);
                        if (isStringLiteralLike(node.moduleSpecifier)) {
                            const set = node.importClause?.namedBindings && isNamespaceImport(node.importClause.namedBindings) ? namespaceImportDeclarationsBySpecifier : memberwiseImportDeclarationsBySpecifier;
                            const key = getCoalesceKeyForImport(node);
                            if (key !== false) {
                                set.add(key, node);
                            }
                        }
                        return visitEachChild(node, collectImports, context);
                    default:
                        return visitNode(node, collectImports);
                }
            }

            function collectImports(node: Node): VisitResult<Node> {
                switch (node.kind) {
                    case SyntaxKind.ImportType:
                        Debug.assertNode(node, isImportTypeNode);
                        if (isLiteralTypeNode(node.argument) && isStringLiteralLike(node.argument.literal)) {
                            const set = node.qualifier ? memberwiseImportTypeNodesBySpecifier : namespaceImportTypeNodesBySpecifier;
                            const key = getCoalesceKeyForImport(node);
                            if (key !== false) {
                                set.add(key, node as LiteralImportTypeNode);
                            }
                        }
                        return visitEachChild(node, collectImports, context);
                    default:
                        return visitEachChild(node, collectImports, context);
                }
            }

            function updateEntityNameRoot(node: EntityName, root: EntityName): EntityName {
                if (isIdentifier(node)) {
                    return root;
                }
                return factory.updateQualifiedName(node, updateEntityNameRoot(node.left, root), node.right);
            }

            function getEntityNameForImportType(node: ImportTypeNode, decls: ImportDeclaration[]): EntityName {
                const firstId = getFirstIdentifier(node.qualifier!);
                return forEach(decls, d => {
                    if (idText(firstId) === "default" && d.importClause?.name) {
                        return updateEntityNameRoot(node.qualifier!, factory.createIdentifier(idText(d.importClause.name)));
                    }
                    const match = find((d.importClause?.namedBindings as NamedImports).elements, e => idText(e.propertyName || e.name) === idText(firstId));
                    if (match) {
                        return updateEntityNameRoot(node.qualifier!, factory.createIdentifier(idText(match.name)));
                    }
                }) || factory.cloneNode(node.qualifier!);
            }

            function createOrUpdateImportClause(clause: ImportClause | undefined, name: Identifier | undefined, namedBindings: NamedImportBindings | undefined) {
                if (!clause) {
                    return factory.createImportClause(/*isTypeOnly*/ true, name, namedBindings);
                }
                return factory.updateImportClause(clause, clause.isTypeOnly, name, namedBindings);
            }

            function createOrUpdateNamedBindings(bindings: NamedImportBindings | undefined, specs: Identifier[], useLocations: Node[]) {
                const specifiers = bindings && isNamedImports(bindings) ? [...bindings.elements] : [];
                forEach(specs, s => {
                    if (find(specifiers, existing => idText(existing.propertyName || existing.name) === idText(s))) return; // skip duplicates (use a map to improve perf in degenerately large edge cases, maybe?)
                    const renamed = some(useLocations, n => resolver.isEntityNameVisible(s, n, SymbolFlags.All).accessibility === SymbolAccessibility.Accessible) ? factory.createUniqueName(idText(s)) : undefined;
                    specifiers.push(factory.createImportSpecifier(/*isTypeOnly*/ true, renamed ? s : undefined, renamed || s));
                });
                if (!bindings) {
                    return factory.createNamedImports(specifiers);
                }
                return factory.updateNamedImports(bindings as NamedImports, specifiers);
            }

            function combineImportTypes(node: Node): VisitResult<Node> {
                if (isSourceFile(node)) {
                    const newImports: ImportDeclaration[] = [];

                    const newNamespaceImportsToMake = filter(arrayFrom(namespaceImportTypeNodesBySpecifier.entries()), entry => !namespaceImportDeclarationsBySpecifier.has(entry[0]) && length(entry[1]) > 1);
                    newNamespaceImportsToMake.forEach(([key, nodes]) => {
                        const newImport = factory.createImportDeclaration(
                            /*modifiers*/ undefined,
                            factory.createImportClause(
                                /*isTypeOnly*/ true,
                                /*name*/ undefined,
                                factory.createNamespaceImport(factory.createUniqueName("_ns"))
                            ),
                            nodes[0].argument.literal,
                            nodes[0].assertions?.assertClause
                        );
                        newImports.push(newImport);
                        namespaceImportDeclarationsBySpecifier.set(key, [newImport]);
                    });

                    const newMemberwiseImportsToMake = filter(arrayFrom(memberwiseImportTypeNodesBySpecifier.entries()), entry => !memberwiseImportDeclarationsBySpecifier.has(entry[0]) && length(entry[1]) > 1);
                    newMemberwiseImportsToMake.forEach(([key, nodes]) => {
                        const importSpecifiers: ImportSpecifier[] = [];
                        forEach(nodes, n => {
                            const member = getFirstIdentifier(n.qualifier!);
                            // TODO: Use a map? _Usually_ this shouldn't be big enough to matter, but declaration files get big sometimes.
                            if (some(importSpecifiers, spec => idText(spec.propertyName || spec.name) === idText(member))) return; // already added
                            const renamed = some(nodes, n => resolver.isEntityNameVisible(member, n, SymbolFlags.All).accessibility === SymbolAccessibility.Accessible) ? factory.createUniqueName(idText(member)) : undefined;
                            const importSpec = factory.createImportSpecifier(
                                /*isTypeOnly*/ true,
                                renamed ? member : undefined,
                                renamed || member
                            );
                            importSpecifiers.push(importSpec);
                        });
                        const newImport = factory.createImportDeclaration(
                            /*modifiers*/ undefined,
                            factory.createImportClause(
                                /*isTypeOnly*/ false,
                                /*name*/ undefined,
                                factory.createNamedImports(importSpecifiers)
                            ),
                            nodes[0].argument.literal,
                            nodes[0].assertions?.assertClause
                        );
                        newImports.push(newImport);
                        memberwiseImportDeclarationsBySpecifier.set(key, [newImport]);
                    });

                    return factory.updateSourceFile(node, setTextRange(factory.createNodeArray([...newImports, ...visitNodes(node.statements, combineImportTypes)], node.statements.hasTrailingComma), node.statements));
                }
                if (isImportDeclaration(node)) {
                    const key = getCoalesceKeyForImport(node);
                    if (key !== false && memberwiseImportDeclarationsBySpecifier.has(key) && memberwiseImportDeclarationsBySpecifier.get(key)!.indexOf(node) >= 0 && memberwiseImportTypeNodesBySpecifier.has(key)) {
                        const requiredSpecifiers = map(memberwiseImportTypeNodesBySpecifier.get(key)!, n => getFirstIdentifier(n.qualifier!));
                        const remainingSpecifiers = filter(requiredSpecifiers, s => !some(memberwiseImportDeclarationsBySpecifier.get(key)!, decl => !!(idText(s) === "default" && decl.importClause?.name) || !!(decl.importClause && decl.importClause.namedBindings && isNamedImports(decl.importClause.namedBindings) && some(decl.importClause.namedBindings.elements, elem => idText(elem.name) === idText(s)))));
                        if (length(remainingSpecifiers)) {
                            const nonDefaultSpecifiers = filter(remainingSpecifiers, spec => idText(spec) !== "default");
                            return factory.updateImportDeclaration(
                                node,
                                node.modifiers,
                                createOrUpdateImportClause(
                                    node.importClause,
                                    node.importClause?.name || (length(nonDefaultSpecifiers) !== length(remainingSpecifiers) ? factory.createUniqueName("_default") : undefined),
                                    length(nonDefaultSpecifiers) ? createOrUpdateNamedBindings(node.importClause?.namedBindings, nonDefaultSpecifiers, memberwiseImportTypeNodesBySpecifier.get(key)!) : node.importClause?.namedBindings),
                                node.moduleSpecifier,
                                node.assertClause
                            );
                        }
                    }
                }
                if (isImportTypeNode(node)) {
                    const key = getCoalesceKeyForImport(node)
                    if (key !== false) {
                        const siblingTypeNodes = node.qualifier ? memberwiseImportTypeNodesBySpecifier : namespaceImportTypeNodesBySpecifier;
                        if (siblingTypeNodes.get(key)!.length > 1) { // only coalesce to an import statement when there are multiple statements to merge
                            const cache = node.qualifier ? memberwiseImportDeclarationsBySpecifier : namespaceImportDeclarationsBySpecifier;
                            const importDecls = cache.get(key)!;
                            const entityName: EntityName = !node.qualifier ? (importDecls[0].importClause!.namedBindings as NamespaceImport).name : getEntityNameForImportType(node, importDecls);
                            return setOriginalNode(node.isTypeOf ? factory.createTypeQueryNode(entityName) : factory.createTypeReferenceNode(entityName, visitNodes(node.typeArguments, combineImportTypes)), node);
                        }
                    }
                }
                return visitEachChild(node, combineImportTypes, context);
            }
        }
    }
}
