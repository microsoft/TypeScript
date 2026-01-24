import {
    CancellationToken,
    ClassDeclaration,
    ClassExpression,
    createTextSpanFromBounds,
    find,
    findAncestor,
    getEffectiveBaseTypeNode,
    getNameOfDeclaration,
    getNodeKind,
    getNodeModifiers,
    Identifier,
    InterfaceDeclaration,
    isClassDeclaration,
    isClassExpression,
    isIdentifier,
    isInterfaceDeclaration,
    isNamedDeclaration,
    Node,
    Program,
    skipTrivia,
    Symbol,
    SyntaxKind,
    TypeChecker,
    TypeHierarchyItem,
} from "./_namespaces/ts.js";

/** @internal */
export type TypeHierarchyDeclaration =
    | ClassDeclaration
    | (ClassExpression & { name: Identifier; })
    | InterfaceDeclaration;

/**
 * Check if a node is a valid type hierarchy declaration.
 */
function isValidTypeHierarchyDeclaration(node: Node): node is TypeHierarchyDeclaration {
    return isClassDeclaration(node) ||
        (isClassExpression(node) && isNamedDeclaration(node)) ||
        isInterfaceDeclaration(node);
}

/**
 * Resolve the type hierarchy declaration at a given position.
 *
 * @internal
 */
export function resolveTypeHierarchyDeclaration(program: Program, location: Node): TypeHierarchyDeclaration | undefined {
    const typeChecker = program.getTypeChecker();

    // If directly on a valid declaration
    if (isValidTypeHierarchyDeclaration(location)) {
        return location;
    }

    // If on the name of a declaration
    if (isIdentifier(location) && location.parent && isValidTypeHierarchyDeclaration(location.parent)) {
        return location.parent;
    }

    // Try to find declaration through the symbol
    const symbol = typeChecker.getSymbolAtLocation(location);
    if (symbol) {
        const declarations = symbol.getDeclarations();
        if (declarations) {
            for (const decl of declarations) {
                if (isValidTypeHierarchyDeclaration(decl)) {
                    return decl;
                }
            }
        }
    }

    // Try to find an ancestor that's a valid declaration
    const ancestor = findAncestor(location, isValidTypeHierarchyDeclaration);
    if (ancestor) {
        return ancestor;
    }

    return undefined;
}

/**
 * Get the name and selection span for a type hierarchy declaration.
 */
function getTypeHierarchyItemName(node: TypeHierarchyDeclaration): { text: string; pos: number; end: number; } {
    const name = getNameOfDeclaration(node);
    if (name && isIdentifier(name)) {
        return { text: name.text, pos: name.getStart(), end: name.getEnd() };
    }
    if (isClassExpression(node)) {
        // Anonymous class expression
        const keyword = find(node.getChildren(), child => child.kind === SyntaxKind.ClassKeyword);
        if (keyword) {
            return { text: "<class>", pos: keyword.getStart(), end: keyword.getEnd() };
        }
    }
    // Fallback
    return { text: "<anonymous>", pos: node.getStart(), end: node.getStart() + 1 };
}

/**
 * Get the container name for a type hierarchy item.
 */
function getTypeHierarchyItemContainerName(node: TypeHierarchyDeclaration): string | undefined {
    const container = findAncestor(node.parent, n => isClassDeclaration(n) || isInterfaceDeclaration(n) || n.kind === SyntaxKind.ModuleDeclaration || n.kind === SyntaxKind.SourceFile);
    if (container && container.kind !== SyntaxKind.SourceFile) {
        const containerName = getNameOfDeclaration(container as any);
        if (containerName && isIdentifier(containerName)) {
            return containerName.text;
        }
    }
    return undefined;
}

/**
 * Create a TypeHierarchyItem from a declaration.
 *
 * @internal
 */
export function createTypeHierarchyItem(program: Program, node: TypeHierarchyDeclaration): TypeHierarchyItem {
    const sourceFile = node.getSourceFile();
    const name = getTypeHierarchyItemName(node);
    const containerName = getTypeHierarchyItemContainerName(node);
    const kind = getNodeKind(node);
    const kindModifiers = getNodeModifiers(node);
    const span = createTextSpanFromBounds(
        skipTrivia(sourceFile.text, node.getFullStart(), /*stopAfterLineBreak*/ false, /*stopAtComments*/ true),
        node.getEnd(),
    );
    const selectionSpan = createTextSpanFromBounds(name.pos, name.end);

    return {
        file: sourceFile.fileName,
        kind,
        kindModifiers,
        name: name.text,
        containerName,
        span,
        selectionSpan,
    };
}

/**
 * Get the supertypes (base class and implemented interfaces) of a type hierarchy declaration.
 *
 * @internal
 */
export function getSupertypes(program: Program, declaration: TypeHierarchyDeclaration, _cancellationToken: CancellationToken): TypeHierarchyItem[] {
    const typeChecker = program.getTypeChecker();
    const result: TypeHierarchyItem[] = [];

    if (isClassDeclaration(declaration) || isClassExpression(declaration)) {
        // Get base class
        const baseTypeNode = getEffectiveBaseTypeNode(declaration);
        if (baseTypeNode) {
            const baseType = typeChecker.getTypeAtLocation(baseTypeNode);
            const baseSymbol = baseType.getSymbol();
            if (baseSymbol) {
                const baseDecl = getTypeDeclarationFromSymbol(baseSymbol);
                if (baseDecl) {
                    result.push(createTypeHierarchyItem(program, baseDecl));
                }
            }
        }

        // Get implemented interfaces
        const heritageClauses = declaration.heritageClauses;
        if (heritageClauses) {
            for (const clause of heritageClauses) {
                if (clause.token === SyntaxKind.ImplementsKeyword) {
                    for (const typeNode of clause.types) {
                        const type = typeChecker.getTypeAtLocation(typeNode);
                        const symbol = type.getSymbol();
                        if (symbol) {
                            const decl = getTypeDeclarationFromSymbol(symbol);
                            if (decl) {
                                result.push(createTypeHierarchyItem(program, decl));
                            }
                        }
                    }
                }
            }
        }
    }
    else if (isInterfaceDeclaration(declaration)) {
        // Get extended interfaces
        const heritageClauses = declaration.heritageClauses;
        if (heritageClauses) {
            for (const clause of heritageClauses) {
                if (clause.token === SyntaxKind.ExtendsKeyword) {
                    for (const typeNode of clause.types) {
                        const type = typeChecker.getTypeAtLocation(typeNode);
                        const symbol = type.getSymbol();
                        if (symbol) {
                            const decl = getTypeDeclarationFromSymbol(symbol);
                            if (decl) {
                                result.push(createTypeHierarchyItem(program, decl));
                            }
                        }
                    }
                }
            }
        }
    }

    return result;
}

/**
 * Get the subtypes (derived classes and implementing classes) of a type hierarchy declaration.
 *
 * @internal
 */
export function getSubtypes(program: Program, declaration: TypeHierarchyDeclaration, cancellationToken: CancellationToken): TypeHierarchyItem[] {
    const typeChecker = program.getTypeChecker();
    const result: TypeHierarchyItem[] = [];
    const nameNode = getNameOfDeclaration(declaration);
    if (!nameNode) {
        return result;
    }
    const targetSymbol = typeChecker.getSymbolAtLocation(nameNode);

    if (!targetSymbol) {
        return result;
    }

    // Search all source files for classes/interfaces that extend/implement this type
    for (const sourceFile of program.getSourceFiles()) {
        if (cancellationToken.isCancellationRequested()) {
            break;
        }

        findSubtypesInSourceFile(sourceFile, targetSymbol, typeChecker, program, result);
    }

    return result;
}

/**
 * Recursively find subtypes in a source file.
 */
function findSubtypesInSourceFile(
    node: Node,
    targetSymbol: Symbol,
    typeChecker: TypeChecker,
    program: Program,
    result: TypeHierarchyItem[],
): void {
    if (isClassDeclaration(node) || isClassExpression(node)) {
        // Check if this class extends the target
        const baseTypeNode = getEffectiveBaseTypeNode(node);
        if (baseTypeNode) {
            const baseType = typeChecker.getTypeAtLocation(baseTypeNode);
            const baseSymbol = baseType.getSymbol();
            if (baseSymbol === targetSymbol) {
                if (isValidTypeHierarchyDeclaration(node)) {
                    result.push(createTypeHierarchyItem(program, node));
                }
            }
        }

        // Check if this class implements the target
        const heritageClauses = node.heritageClauses;
        if (heritageClauses) {
            for (const clause of heritageClauses) {
                if (clause.token === SyntaxKind.ImplementsKeyword) {
                    for (const typeNode of clause.types) {
                        const type = typeChecker.getTypeAtLocation(typeNode);
                        const symbol = type.getSymbol();
                        if (symbol === targetSymbol) {
                            if (isValidTypeHierarchyDeclaration(node)) {
                                result.push(createTypeHierarchyItem(program, node));
                            }
                        }
                    }
                }
            }
        }
    }
    else if (isInterfaceDeclaration(node)) {
        // Check if this interface extends the target
        const heritageClauses = node.heritageClauses;
        if (heritageClauses) {
            for (const clause of heritageClauses) {
                if (clause.token === SyntaxKind.ExtendsKeyword) {
                    for (const typeNode of clause.types) {
                        const type = typeChecker.getTypeAtLocation(typeNode);
                        const symbol = type.getSymbol();
                        if (symbol === targetSymbol) {
                            result.push(createTypeHierarchyItem(program, node));
                        }
                    }
                }
            }
        }
    }

    // Recurse into children
    node.forEachChild(child => findSubtypesInSourceFile(child, targetSymbol, typeChecker, program, result));
}

/**
 * Get a type hierarchy declaration from a symbol.
 */
function getTypeDeclarationFromSymbol(symbol: Symbol): TypeHierarchyDeclaration | undefined {
    const declarations = symbol.getDeclarations();
    if (declarations) {
        for (const decl of declarations) {
            if (isValidTypeHierarchyDeclaration(decl)) {
                return decl;
            }
        }
    }
    return undefined;
}
