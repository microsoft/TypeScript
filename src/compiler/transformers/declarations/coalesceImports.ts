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

            let parent: Node = rootFile;
            visitEachChild(rootFile, collectRootImports, context);

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
                    const renamed = some(nodes, n => !!resolver.resolveName(idText(member), n.nextContainer || n, SymbolFlags.All, /*skipGlobals*/ false)) ? factory.createUniqueName(idText(member)) : undefined;
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

            return factory.updateSourceFile(rootFile, setTextRange(factory.createNodeArray([...newImports, ...visitNodes(rootFile.statements, combineImportTypes)], rootFile.statements.hasTrailingComma), rootFile.statements));

            function collectRootImports(node: Node): VisitResult<Node> {
                if (!node.parent) (node as Mutable<Node>).parent = parent;
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
                        parent = node;
                        return visitEachChild(node, collectImports, context);
                    default:
                        return visitNode(node, collectImports);
                }
            }

            function collectImports(node: Node): VisitResult<Node> {
                if (!node.parent) (node as Mutable<Node>).parent = parent;
                parent = node;
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
                    const match = find((d.importClause?.namedBindings as NamedImports).elements, e => idText(e.propertyName || e.name) === idText(firstId) && (!!e.name.autoGenerateFlags || !resolver.resolveName(idText(e.name), node.nextContainer || node, SymbolFlags.All, /*excludeGlobals*/ false)));
                    if (match) {
                        return updateEntityNameRoot(node.qualifier!, !!match.name.autoGenerateFlags ? match.name : factory.createIdentifier(idText(match.name)));
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
                const specMap = new Map<string, ImportSpecifier>();
                for (const spec of specifiers) {
                    specMap.set(idText(spec.propertyName || spec.name), spec);
                }
                forEach(specs, s => {
                    const renamed = some(useLocations, n => !!resolver.resolveName(idText(s), n.nextContainer || n, SymbolFlags.All, /*skipGlobals*/ false)) ? factory.createUniqueName(idText(s)) : undefined;
                    if (!renamed ? specMap.has(idText(s)) : !!specMap.get(idText(s))?.name.autoGenerateFlags) return; // skip dupes (renamed ones can share a generated name)
                    const spec = factory.createImportSpecifier(/*isTypeOnly*/ true, renamed ? s : undefined, renamed || s);
                    specifiers.push(spec);
                    specMap.set(idText(s), spec);
                });
                if (!bindings) {
                    return factory.createNamedImports(specifiers);
                }
                return factory.updateNamedImports(bindings as NamedImports, specifiers);
            }

            function combineImportTypes(node: Node): VisitResult<Node> {
                if (isImportDeclaration(node)) {
                    // TODO: Since imports are hoisted (albeit with TDZ), we technically need to modify every import declaration _before_ recuring
                    // on import type nodes to modify those, since technically the import an import type node relies on can occur _after_ it in
                    // a file. This is somewhat unfortunate since it makes this require 3 tree walks - one to gather the imports and import type nodes we care about,
                    // one (albeit likely shallow one) to modify the existing import declarations, and one to update all the import type nodes themselves.
                    const key = getCoalesceKeyForImport(node);
                    if (key !== false && memberwiseImportDeclarationsBySpecifier.has(key) && memberwiseImportDeclarationsBySpecifier.get(key)!.indexOf(node) >= 0 && memberwiseImportTypeNodesBySpecifier.has(key)) {
                        const remainingSpecifiers = filter(memberwiseImportTypeNodesBySpecifier.get(key)!,
                            s => !some(memberwiseImportDeclarationsBySpecifier.get(key),
                                decl => !!(idText(getFirstIdentifier(s.qualifier!)) === "default" && decl.importClause?.name) || !!(decl.importClause && decl.importClause.namedBindings && isNamedImports(decl.importClause.namedBindings) && some(decl.importClause.namedBindings.elements,
                                    elem => idText(elem.name) === idText(getFirstIdentifier(s.qualifier!)) && !resolver.resolveName(idText(elem.name), s.nextContainer || s, SymbolFlags.All, /*excludeGlobals*/ false)
                        ))));
                        if (length(remainingSpecifiers)) {
                            const nonDefaultSpecifiers = filter(remainingSpecifiers, spec => idText(getFirstIdentifier(spec.qualifier!)) !== "default");
                            const updated = factory.updateImportDeclaration(
                                node,
                                node.modifiers,
                                createOrUpdateImportClause(
                                    node.importClause,
                                    node.importClause?.name || (length(nonDefaultSpecifiers) !== length(remainingSpecifiers) ? factory.createUniqueName("_default") : undefined),
                                    length(nonDefaultSpecifiers) ? createOrUpdateNamedBindings(node.importClause?.namedBindings, map(nonDefaultSpecifiers, n => getFirstIdentifier(n.qualifier!)), memberwiseImportTypeNodesBySpecifier.get(key)!) : node.importClause?.namedBindings),
                                node.moduleSpecifier,
                                node.assertClause
                            );
                            memberwiseImportDeclarationsBySpecifier.remove(key, node);
                            memberwiseImportDeclarationsBySpecifier.add(key, updated);
                            return updated;
                        }
                    }
                }
                if (isImportTypeNode(node)) {
                    const key = getCoalesceKeyForImport(node);
                    if (key !== false) {
                        const cache = node.qualifier ? memberwiseImportDeclarationsBySpecifier : namespaceImportDeclarationsBySpecifier;
                        const importDecls = cache.get(key);
                        if (importDecls && importDecls[0]) {
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
