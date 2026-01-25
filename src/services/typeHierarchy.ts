import * as FindAllReferences from "./_namespaces/ts.FindAllReferences.js";
import {
    CallExpression,
    CancellationToken,
    ClassDeclaration,
    ClassExpression,
    createTextSpanFromBounds,
    ExpressionWithTypeArguments,
    find,
    findAncestor,
    getCombinedNodeFlags,
    getEffectiveBaseTypeNode,
    getNameOfDeclaration,
    getNodeKind,
    getNodeModifiers,
    Identifier,
    InterfaceDeclaration,
    isCallExpression,
    isClassDeclaration,
    isClassExpression,
    isDeclarationName,
    isIdentifier,
    isInterfaceDeclaration,
    isNamedDeclaration,
    isTypeAliasDeclaration,
    isTypeReferenceNode,
    isVariableDeclaration,
    Node,
    NodeFlags,
    ObjectFlags,
    ObjectType,
    Program,
    ScriptElementKind,
    SignatureKind,
    skipAlias,
    skipTrivia,
    Symbol,
    SymbolFlags,
    SyntaxKind,
    TypeAliasDeclaration,
    TypeChecker,
    TypeFlags,
    TypeHierarchyItem,
    TypeReference,
    TypeReferenceNode,
    UserPreferences,
    VariableDeclaration,
} from "./_namespaces/ts.js";

/** Default maximum results per level in type hierarchy */
const DEFAULT_TYPE_HIERARCHY_MAX_RESULTS = 1000;

/** @internal */
export type TypeHierarchyDeclaration =
    | ClassDeclaration
    | (ClassExpression & { name: Identifier; })
    | AssignedClassExpression
    | MixinVariableDeclaration
    | InterfaceDeclaration
    | TypeAliasDeclaration;

/**
 * A class expression assigned to a const variable, where the class doesn't have its own name.
 * Example: `const Foo = class { }` or `const Foo = class extends Base { }`
 */
type AssignedClassExpression = ClassExpression & { name: undefined; parent: VariableDeclaration & { name: Identifier; }; };

/**
 * A variable declaration that holds a mixin result (a function call that returns a class constructor).
 * Example: `const Mixed = Mixin(Base)` where Mixin returns a class constructor.
 */
type MixinVariableDeclaration = VariableDeclaration & {
    name: Identifier;
    initializer: CallExpression;
    __mixinMarker?: never; // Marker to distinguish from regular VariableDeclaration
};

/** Check if a node is a class expression assigned to a const variable without its own name. */
function isAssignedClassExpression(node: Node): node is AssignedClassExpression {
    return isClassExpression(node)
        && !node.name // The class expression doesn't have its own name
        && isVariableDeclaration(node.parent)
        && node === node.parent.initializer
        && isIdentifier(node.parent.name)
        && !!(getCombinedNodeFlags(node.parent) & NodeFlags.Const);
}

/**
 * Check if a variable declaration holds a mixin result (a call expression that returns a class constructor).
 * This identifies patterns like: `const Mixed = Mixin(Base)` or `const Full = A(B(C(Base)))`
 */
function isMixinVariableDeclaration(node: Node, typeChecker: TypeChecker): node is MixinVariableDeclaration {
    if (!isVariableDeclaration(node) || !isIdentifier(node.name) || !node.initializer) {
        return false;
    }
    // Must be a const
    if (!(getCombinedNodeFlags(node) & NodeFlags.Const)) {
        return false;
    }
    // Initializer must be a call expression
    if (!isCallExpression(node.initializer)) {
        return false;
    }
    // The type should be a constructor (has construct signatures)
    const type = typeChecker.getTypeAtLocation(node);
    const constructSignatures = typeChecker.getSignaturesOfType(type, SignatureKind.Construct);
    return constructSignatures.length > 0;
}

/**
 * Check if a node is a valid type hierarchy declaration.
 */
function isValidTypeHierarchyDeclaration(node: Node, typeChecker?: TypeChecker): node is TypeHierarchyDeclaration {
    return isClassDeclaration(node) ||
        (isClassExpression(node) && isNamedDeclaration(node)) ||
        isAssignedClassExpression(node) ||
        (typeChecker !== undefined && isMixinVariableDeclaration(node, typeChecker)) ||
        isInterfaceDeclaration(node) ||
        isTypeAliasDeclaration(node);
}

/**
 * Resolve the type hierarchy declaration at a given position.
 *
 * @internal
 */
export function resolveTypeHierarchyDeclaration(program: Program, location: Node): TypeHierarchyDeclaration | undefined {
    const typeChecker = program.getTypeChecker();

    // If directly on a valid declaration
    if (isValidTypeHierarchyDeclaration(location, typeChecker)) {
        return location;
    }

    // If on the name of a declaration
    if (isIdentifier(location) && location.parent && isValidTypeHierarchyDeclaration(location.parent, typeChecker)) {
        return location.parent;
    }

    // If on the name of a variable declaration with a class expression initializer
    if (isDeclarationName(location) && isVariableDeclaration(location.parent) && location.parent.initializer) {
        const init = location.parent.initializer;
        // Handle both named and anonymous class expressions
        if (isClassExpression(init) && isValidTypeHierarchyDeclaration(init, typeChecker)) {
            return init;
        }
        // Handle mixin pattern - variable declaration with call expression initializer returning a constructor
        if (isMixinVariableDeclaration(location.parent, typeChecker)) {
            return location.parent;
        }
    }

    // Try to find declaration through the symbol
    const symbol = typeChecker.getSymbolAtLocation(location);
    if (symbol) {
        const declarations = symbol.getDeclarations();
        if (declarations) {
            for (const decl of declarations) {
                if (isValidTypeHierarchyDeclaration(decl, typeChecker)) {
                    return decl;
                }
                // If the declaration is a variable with a class expression initializer
                if (isVariableDeclaration(decl) && decl.initializer && isClassExpression(decl.initializer) && isValidTypeHierarchyDeclaration(decl.initializer, typeChecker)) {
                    return decl.initializer;
                }
                // Handle mixin pattern
                if (isMixinVariableDeclaration(decl, typeChecker)) {
                    return decl;
                }
            }
        }
    }

    // Try to find an ancestor that's a valid declaration
    const ancestor = findAncestor(location, (n): n is TypeHierarchyDeclaration => isValidTypeHierarchyDeclaration(n, typeChecker));
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
        // Check if this is an assigned class expression (const Foo = class { })
        if (isAssignedClassExpression(node)) {
            // Use the variable name
            const varName = node.parent.name;
            return { text: varName.text, pos: varName.getStart(), end: varName.getEnd() };
        }
        // Anonymous class expression without assignment
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
    const container = findAncestor(node.parent, n => isClassDeclaration(n) || isInterfaceDeclaration(n) || isTypeAliasDeclaration(n) || n.kind === SyntaxKind.ModuleDeclaration || n.kind === SyntaxKind.SourceFile);
    if (container && container.kind !== SyntaxKind.SourceFile) {
        const containerName = getNameOfDeclaration(container as any);
        if (containerName && isIdentifier(containerName)) {
            return containerName.text;
        }
    }
    return undefined;
}

/**
 * Get display name from a type node, including type arguments if present.
 * For example, "Repository<T>" instead of just "Repository".
 */
function getDisplayNameFromTypeNode(typeNode: ExpressionWithTypeArguments | TypeReferenceNode): string {
    return typeNode.getText();
}

/**
 * Get additional kind modifiers for a type hierarchy declaration.
 * These help distinguish different kinds of type relationships in the UI.
 */
function getTypeHierarchyKindModifiers(node: TypeHierarchyDeclaration): string {
    const baseModifiers = getNodeModifiers(node);
    const additionalModifiers: string[] = [];

    if (isVariableDeclaration(node)) {
        // Mixin variable (const Foo = Mixin(Base))
        additionalModifiers.push("mixin");
    }
    // Note: Abstract classes already have "abstract" in baseModifiers from getNodeModifiers
    else if (isTypeAliasDeclaration(node)) {
        const typeNode = node.type;

        // Check what kind of type alias this is
        if (typeNode.kind === SyntaxKind.ConditionalType) {
            // Conditional type - distinguish between extends-only and infer patterns
            const conditionalNode = typeNode as import("./_namespaces/ts.js").ConditionalTypeNode;
            if (containsInferType(conditionalNode.extendsType)) {
                // Infer conditional (type ReturnType<T> = T extends (...args: any) => infer R ? R : never)
                additionalModifiers.push("conditional");
                additionalModifiers.push("infer");
            }
            else {
                // Simple extends conditional (type IsString<T> = T extends string ? true : false)
                additionalModifiers.push("conditional");
                additionalModifiers.push("extends");
            }
        }
        else if (typeNode.kind === SyntaxKind.IntersectionType) {
            // Intersection type (type Foo = A & B)
            additionalModifiers.push("intersection");
        }
        else if (typeNode.kind === SyntaxKind.UnionType) {
            // Union type (type Foo = A | B)
            additionalModifiers.push("union");
        }
        else if (typeNode.kind === SyntaxKind.MappedType) {
            // Mapped type (type Foo<T> = { [K in keyof T]: ... })
            additionalModifiers.push("mapped");
        }
        else if (typeNode.kind === SyntaxKind.TupleType) {
            // Tuple type (type Pair<A, B> = [A, B])
            additionalModifiers.push("tuple");
        }
        else if (typeNode.kind === SyntaxKind.TemplateLiteralType) {
            // Template literal type (type Greeting = `Hello ${string}`)
            additionalModifiers.push("template");
        }
        else if (typeNode.kind === SyntaxKind.IndexedAccessType) {
            // Indexed access type (type PropType = T["key"])
            additionalModifiers.push("indexed");
        }
        else if (typeNode.kind === SyntaxKind.TypeOperator) {
            // Type operator (keyof T, readonly T[], unique symbol)
            const operatorNode = typeNode as import("./_namespaces/ts.js").TypeOperatorNode;
            if (operatorNode.operator === SyntaxKind.KeyOfKeyword) {
                additionalModifiers.push("keyof");
            }
            else if (operatorNode.operator === SyntaxKind.ReadonlyKeyword) {
                additionalModifiers.push("readonly");
            }
            else {
                additionalModifiers.push("alias");
            }
        }
        else if (isTypeReferenceNode(typeNode)) {
            // Simple type alias (type Foo = Bar)
            additionalModifiers.push("alias");
        }
        else {
            // Other type alias (function types, array types, etc.)
            additionalModifiers.push("alias");
        }
    }

    // Combine base modifiers with additional ones
    if (additionalModifiers.length > 0) {
        return baseModifiers ? `${baseModifiers},${additionalModifiers.join(",")}` : additionalModifiers.join(",");
    }
    return baseModifiers;
}

/**
 * Check if a type node contains any `infer` type nodes.
 * Used to distinguish `T extends U ? X : Y` from `T extends (infer R)[] ? R : never`
 */
function containsInferType(node: Node): boolean {
    if (node.kind === SyntaxKind.InferType) {
        return true;
    }
    let found = false;
    node.forEachChild(child => {
        if (!found && containsInferType(child)) {
            found = true;
        }
    });
    return found;
}

/**
 * Create a TypeHierarchyItem from a declaration.
 *
 * @internal
 */
export function createTypeHierarchyItem(program: Program, node: TypeHierarchyDeclaration, displayName?: string): TypeHierarchyItem {
    const sourceFile = node.getSourceFile();
    const name = getTypeHierarchyItemName(node);
    const containerName = getTypeHierarchyItemContainerName(node);
    // For mixin variables (const Foo = Mixin(Base)), report as "class" since they hold constructor types
    const kind = isVariableDeclaration(node) ? ScriptElementKind.classElement : getNodeKind(node);
    const kindModifiers = getTypeHierarchyKindModifiers(node);
    const span = createTextSpanFromBounds(
        skipTrivia(sourceFile.text, node.getFullStart(), /*stopAfterLineBreak*/ false, /*stopAtComments*/ true),
        node.getEnd(),
    );
    const selectionSpan = createTextSpanFromBounds(name.pos, name.end);

    return {
        file: sourceFile.fileName,
        kind,
        kindModifiers,
        name: displayName ?? name.text,
        containerName,
        span,
        selectionSpan,
    };
}

/**
 * Get the symbol from a heritage clause type node (ExpressionWithTypeArguments).
 * This handles the case where the type may be imported or have generic parameters.
 */
function getSymbolFromHeritageClauseType(typeNode: ExpressionWithTypeArguments, typeChecker: TypeChecker): Symbol | undefined {
    // First, try getting the type at location and extracting its symbol
    // This works well for same-file types and non-generic imports
    const type = typeChecker.getTypeAtLocation(typeNode);
    if (!(type.flags & TypeFlags.Any)) {
        const symbol = type.getSymbol();
        if (symbol) {
            return symbol;
        }

        // For instantiated generic types (TypeReference), the symbol is on the target
        if (type.flags & TypeFlags.Object) {
            const objectType = type as ObjectType;
            if (objectType.objectFlags & ObjectFlags.Reference) {
                const typeRef = type as TypeReference;
                if (typeRef.target?.symbol) {
                    return typeRef.target.symbol;
                }
            }
        }
    }

    // For imported types or when getTypeAtLocation returns 'any',
    // get the symbol from the expression directly and resolve aliases
    // The expression could be an identifier (BaseClass) or property access (Ns.Type)
    const expression = typeNode.expression;
    const symbol = typeChecker.getSymbolAtLocation(expression);
    if (symbol) {
        // If it's an alias (import), resolve through skipAlias which handles chained re-exports
        if (symbol.flags & SymbolFlags.Alias) {
            // skipAlias resolves the full chain of aliases to the original symbol
            const resolved = skipAlias(symbol, typeChecker);
            if (resolved && resolved !== symbol && !(resolved.flags & SymbolFlags.TypeLiteral)) {
                return resolved;
            }
            // Fallback to getAliasedSymbol if skipAlias doesn't work
            const aliased = typeChecker.getAliasedSymbol(symbol);
            if (aliased && !(aliased.flags & SymbolFlags.TypeLiteral)) {
                return aliased;
            }
        }
        return symbol;
    }

    return undefined;
}

/**
 * Get the supertypes (base class and implemented interfaces) of a type hierarchy declaration.
 *
 * @internal
 */
export function getSupertypes(program: Program, declaration: TypeHierarchyDeclaration, _cancellationToken: CancellationToken, _preferences?: UserPreferences): TypeHierarchyItem[] {
    const typeChecker = program.getTypeChecker();
    const result: TypeHierarchyItem[] = [];
    // Note: maxResults is not used for supertypes as they are naturally limited
    // (a class has one base class plus some interfaces). The preference is accepted
    // for API consistency with getSubtypes.

    if (isClassDeclaration(declaration) || isClassExpression(declaration)) {
        // Get base class
        const baseTypeNode = getEffectiveBaseTypeNode(declaration);
        if (baseTypeNode) {
            // Use our helper to properly resolve the symbol, especially for imports
            const baseSymbol = getSymbolFromHeritageClauseType(baseTypeNode, typeChecker);
            if (baseSymbol) {
                const baseDecl = getTypeDeclarationFromSymbol(baseSymbol, typeChecker);
                if (baseDecl) {
                    const displayName = getDisplayNameFromTypeNode(baseTypeNode);
                    result.push(createTypeHierarchyItem(program, baseDecl, displayName));
                }
                else {
                    // No direct declaration found - check if it's a mixin variable
                    const mixinDecl = getMixinDeclarationFromSymbol(baseSymbol, typeChecker);
                    if (mixinDecl) {
                        const displayName = getDisplayNameFromTypeNode(baseTypeNode);
                        result.push(createTypeHierarchyItem(program, mixinDecl, displayName));
                    }
                }
            }
        }

        // Get implemented interfaces
        const heritageClauses = declaration.heritageClauses;
        if (heritageClauses) {
            for (const clause of heritageClauses) {
                if (clause.token === SyntaxKind.ImplementsKeyword) {
                    for (const typeNode of clause.types) {
                        const symbol = getSymbolFromHeritageClauseType(typeNode, typeChecker);
                        if (symbol) {
                            const decl = getTypeDeclarationFromSymbol(symbol, typeChecker);
                            if (decl) {
                                const displayName = getDisplayNameFromTypeNode(typeNode);
                                result.push(createTypeHierarchyItem(program, decl, displayName));
                            }
                        }
                    }
                }
            }
        }

        // Get type parameter constraints for generic classes
        collectTypeParameterConstraints(declaration.typeParameters, typeChecker, program, result);
    }
    else if (isInterfaceDeclaration(declaration)) {
        // Get extended interfaces
        const heritageClauses = declaration.heritageClauses;
        if (heritageClauses) {
            for (const clause of heritageClauses) {
                if (clause.token === SyntaxKind.ExtendsKeyword) {
                    for (const typeNode of clause.types) {
                        const symbol = getSymbolFromHeritageClauseType(typeNode, typeChecker);
                        if (symbol) {
                            const decl = getTypeDeclarationFromSymbol(symbol, typeChecker);
                            if (decl) {
                                const displayName = getDisplayNameFromTypeNode(typeNode);
                                result.push(createTypeHierarchyItem(program, decl, displayName));
                            }
                        }
                    }
                }
            }
        }

        // Get type parameter constraints for generic interfaces
        collectTypeParameterConstraints(declaration.typeParameters, typeChecker, program, result);
    }
    else if (isTypeAliasDeclaration(declaration)) {
        // Get referenced types in the type alias
        collectTypeReferencesFromTypeAlias(declaration, typeChecker, program, result);

        // Get type parameter constraints for generic type aliases
        collectTypeParameterConstraints(declaration.typeParameters, typeChecker, program, result);
    }
    else if (isVariableDeclaration(declaration)) {
        // For mixin variables (const Mixed = Mixin(Base)), try to extract base types
        // from the constructor's instance type
        collectBaseTypesFromMixinVariable(declaration, typeChecker, program, result);
    }

    return result;
}

/**
 * Collect type parameter constraints as supertypes.
 * For generic types like `class Foo<T extends Base>`, Base is shown as a supertype.
 */
function collectTypeParameterConstraints(
    typeParameters: import("./_namespaces/ts.js").NodeArray<import("./_namespaces/ts.js").TypeParameterDeclaration> | undefined,
    typeChecker: TypeChecker,
    program: Program,
    result: TypeHierarchyItem[],
): void {
    if (!typeParameters) return;

    const seen = new Set<TypeHierarchyDeclaration>();
    for (const param of typeParameters) {
        if (param.constraint && isTypeReferenceNode(param.constraint)) {
            const type = typeChecker.getTypeAtLocation(param.constraint);
            const symbol = type.getSymbol();
            if (symbol) {
                const decl = getTypeDeclarationFromSymbol(symbol, typeChecker);
                if (decl && !seen.has(decl)) {
                    seen.add(decl);
                    // Display as "T extends Constraint" to make it clear it's a constraint
                    const displayName = `${param.name.text} extends ${param.constraint.getText()}`;
                    result.push(createTypeHierarchyItem(program, decl, displayName));
                }
            }
        }
    }
}

/**
 * Collect type references from a type alias declaration.
 * Uses a seen set to avoid adding the same declaration multiple times.
 */
function collectTypeReferencesFromTypeAlias(
    declaration: TypeAliasDeclaration,
    typeChecker: TypeChecker,
    program: Program,
    result: TypeHierarchyItem[],
): void {
    const typeNode = declaration.type;
    const seen = new Set<TypeHierarchyDeclaration>();

    // If the type alias references another type directly (type Foo = Bar)
    if (isTypeReferenceNode(typeNode)) {
        addTypeReferenceToResult(typeNode, typeChecker, program, result, seen);
    }
    // If it's a type literal, look for inherited members via intersection
    else if (typeNode.kind === SyntaxKind.IntersectionType) {
        const intersectionNode = typeNode as import("./_namespaces/ts.js").IntersectionTypeNode;
        for (const member of intersectionNode.types) {
            if (isTypeReferenceNode(member)) {
                addTypeReferenceToResult(member, typeChecker, program, result, seen);
            }
        }
    }
    // For mapped types like Pick<T, K>, look at the type parameter constraint
    else if (typeNode.kind === SyntaxKind.MappedType) {
        const mappedNode = typeNode as import("./_namespaces/ts.js").MappedTypeNode;
        if (mappedNode.type && isTypeReferenceNode(mappedNode.type)) {
            addTypeReferenceToResult(mappedNode.type, typeChecker, program, result, seen);
        }
    }
    // For union types (type Foo = A | B), show union members as supertypes
    else if (typeNode.kind === SyntaxKind.UnionType) {
        const unionNode = typeNode as import("./_namespaces/ts.js").UnionTypeNode;
        for (const member of unionNode.types) {
            if (isTypeReferenceNode(member)) {
                addTypeReferenceToResult(member, typeChecker, program, result, seen);
            }
        }
    }
    // For conditional types (type Foo = T extends Bar ? A : B), show the extends clause type
    else if (typeNode.kind === SyntaxKind.ConditionalType) {
        const conditionalNode = typeNode as import("./_namespaces/ts.js").ConditionalTypeNode;
        // The extendsType is the type being checked against (Bar in T extends Bar)
        if (isTypeReferenceNode(conditionalNode.extendsType)) {
            addTypeReferenceToResult(conditionalNode.extendsType, typeChecker, program, result, seen);
        }
    }
}

/**
 * Collect base types from a mixin variable declaration.
 * For patterns like `const Mixed = Mixin(Base)`, this extracts the base types
 * from the constructor's instance type hierarchy.
 */
function collectBaseTypesFromMixinVariable(
    declaration: VariableDeclaration,
    typeChecker: TypeChecker,
    program: Program,
    result: TypeHierarchyItem[],
): void {
    // For mixin patterns, we need to look at the call expression arguments
    // to find what base class(es) are being mixed in
    const initializer = declaration.initializer;
    if (!initializer || !isCallExpression(initializer)) return;

    // The mixin call arguments contain the base classes
    // e.g., Mixin(Base) -> Base is the argument
    // e.g., Serializable(Activatable(Timestamped(MixinBase))) -> nested calls
    const seen = new Set<TypeHierarchyDeclaration>();
    collectMixinBaseTypesFromCallExpression(initializer, typeChecker, program, result, seen);
}

/**
 * Recursively collect base types from a mixin call expression.
 * Handles nested patterns like Serializable(Activatable(Timestamped(MixinBase)))
 */
function collectMixinBaseTypesFromCallExpression(
    callExpr: CallExpression,
    typeChecker: TypeChecker,
    program: Program,
    result: TypeHierarchyItem[],
    seen: Set<TypeHierarchyDeclaration>,
): void {
    // Check each argument of the call expression
    for (const arg of callExpr.arguments) {
        if (isCallExpression(arg)) {
            // Nested mixin call - recurse
            collectMixinBaseTypesFromCallExpression(arg, typeChecker, program, result, seen);
        }
        else {
            // Non-call argument - this should be a base class reference
            const argType = typeChecker.getTypeAtLocation(arg);

            // For class references, the type has a symbol
            const symbol = argType.getSymbol();
            if (symbol) {
                // First try regular declaration
                const decl = getTypeDeclarationFromSymbol(symbol, typeChecker);
                if (decl && !seen.has(decl)) {
                    seen.add(decl);
                    result.push(createTypeHierarchyItem(program, decl, symbol.getName()));
                }
                else if (!decl) {
                    // Try mixin variable
                    const mixinDecl = getMixinDeclarationFromSymbol(symbol, typeChecker);
                    if (mixinDecl && !seen.has(mixinDecl)) {
                        seen.add(mixinDecl);
                        result.push(createTypeHierarchyItem(program, mixinDecl, symbol.getName()));
                    }
                }
            }
        }
    }
}

/**
 * Add a type reference to the result if it resolves to a valid type hierarchy declaration.
 * Uses a seen set to avoid adding the same declaration multiple times.
 */
function addTypeReferenceToResult(
    typeRef: TypeReferenceNode,
    typeChecker: TypeChecker,
    program: Program,
    result: TypeHierarchyItem[],
    seen: Set<TypeHierarchyDeclaration>,
): void {
    const type = typeChecker.getTypeAtLocation(typeRef);
    const symbol = type.getSymbol();
    if (symbol) {
        const decl = getTypeDeclarationFromSymbol(symbol, typeChecker);
        if (decl && !seen.has(decl)) {
            seen.add(decl);
            const displayName = getDisplayNameFromTypeNode(typeRef);
            result.push(createTypeHierarchyItem(program, decl, displayName));
        }
    }
}

/**
 * Get the subtypes (derived classes and implementing classes) of a type hierarchy declaration.
 *
 * Uses a hybrid approach for performance:
 * 1. FindAllReferences with { implementations: true } for classes/interfaces in heritage clauses (fast, uses name index)
 * 2. Manual traversal for type alias subtypes (intersection types only - can't be found via FindAllReferences)
 *
 * @internal
 */
export function getSubtypes(program: Program, declaration: TypeHierarchyDeclaration, cancellationToken: CancellationToken, preferences?: UserPreferences): TypeHierarchyItem[] {
    const typeChecker = program.getTypeChecker();
    const result: TypeHierarchyItem[] = [];
    const seen = new Set<TypeHierarchyDeclaration>();
    const maxResults = preferences?.typeHierarchyMaxResults ?? DEFAULT_TYPE_HIERARCHY_MAX_RESULTS;

    // Get the name node - for assigned class expressions and mixin variables, use the variable name
    let locationNode: Node | undefined;
    if (isAssignedClassExpression(declaration)) {
        locationNode = declaration.parent.name;
    }
    else if (isVariableDeclaration(declaration)) {
        // For mixin variable declarations, use the variable name
        locationNode = declaration.name;
    }
    else {
        locationNode = getNameOfDeclaration(declaration);
    }

    if (!locationNode) {
        return result;
    }

    const targetSymbol = typeChecker.getSymbolAtLocation(locationNode);
    if (!targetSymbol) {
        return result;
    }

    // PART 1: Use FindAllReferences with { implementations: true } for heritage clauses
    // This efficiently finds classes/interfaces that extend/implement the target using the name index
    const entries = FindAllReferences.getReferenceEntriesForNode(
        locationNode.pos,
        locationNode,
        program,
        program.getSourceFiles(),
        cancellationToken,
        { implementations: true, use: FindAllReferences.FindReferencesUse.References },
    );

    if (entries) {
        for (const entry of entries) {
            if (entry.kind !== FindAllReferences.EntryKind.Node) continue;
            if (cancellationToken.isCancellationRequested() || result.length >= maxResults) break;

            // FindAllReferences with implementations:true returns the containing class/interface
            // when the reference is in a heritage clause (extends/implements)
            const node = entry.node;
            const containingDeclaration = findAncestor(node, (n): n is TypeHierarchyDeclaration => isValidTypeHierarchyDeclaration(n, typeChecker));

            if (containingDeclaration && containingDeclaration !== declaration && !seen.has(containingDeclaration)) {
                // Verify this is actually in a heritage clause (extends/implements)
                if (isInHeritageClause(node, containingDeclaration, targetSymbol, typeChecker)) {
                    seen.add(containingDeclaration);
                    result.push(createTypeHierarchyItem(program, containingDeclaration));
                }
            }
        }
    }

    // PART 2: Manual traversal for type alias subtypes (intersection types)
    // FindAllReferences doesn't find type aliases because they're not in heritage clauses
    if (result.length < maxResults) {
        for (const sourceFile of program.getSourceFiles()) {
            if (cancellationToken.isCancellationRequested() || result.length >= maxResults) break;
            findTypeAliasSubtypes(sourceFile, targetSymbol, typeChecker, program, result, seen, maxResults);
        }
    }

    // PART 3: Reverse mixin lookup - find mixin variables that use this type in their composition
    // When querying a base class like MixinBase, find const Full = Mixin(Base) patterns that use it
    if (result.length < maxResults) {
        for (const sourceFile of program.getSourceFiles()) {
            if (cancellationToken.isCancellationRequested() || result.length >= maxResults) break;
            findMixinVariablesUsingSymbol(sourceFile, targetSymbol, typeChecker, program, result, seen, maxResults);
        }
    }

    return result;
}

/**
 * Check if a node is within a heritage clause (extends/implements) that references the target symbol.
 */
function isInHeritageClause(node: Node, containingDeclaration: TypeHierarchyDeclaration, targetSymbol: Symbol, typeChecker: TypeChecker): boolean {
    if (isClassDeclaration(containingDeclaration) || isClassExpression(containingDeclaration)) {
        // Check extends clause
        const baseTypeNode = getEffectiveBaseTypeNode(containingDeclaration);
        if (baseTypeNode) {
            const baseType = typeChecker.getTypeAtLocation(baseTypeNode);
            if (baseType.getSymbol() === targetSymbol) return true;

            // For mixin variables, also check if the expression symbol matches
            // e.g., class X extends FullMixin - FullMixin's symbol is the variable
            const exprSymbol = typeChecker.getSymbolAtLocation(baseTypeNode.expression);
            if (exprSymbol === targetSymbol) return true;
            // Also check aliased symbol for imports
            if (exprSymbol && exprSymbol.flags & SymbolFlags.Alias) {
                const aliased = typeChecker.getAliasedSymbol(exprSymbol);
                if (aliased === targetSymbol) return true;
            }
        }
        // Check implements clauses
        const heritageClauses = containingDeclaration.heritageClauses;
        if (heritageClauses) {
            for (const clause of heritageClauses) {
                if (clause.token === SyntaxKind.ImplementsKeyword) {
                    for (const typeNode of clause.types) {
                        const type = typeChecker.getTypeAtLocation(typeNode);
                        if (type.getSymbol() === targetSymbol) return true;
                    }
                }
            }
        }
    }
    else if (isInterfaceDeclaration(containingDeclaration)) {
        // Check extends clause
        const heritageClauses = containingDeclaration.heritageClauses;
        if (heritageClauses) {
            for (const clause of heritageClauses) {
                if (clause.token === SyntaxKind.ExtendsKeyword) {
                    for (const typeNode of clause.types) {
                        const type = typeChecker.getTypeAtLocation(typeNode);
                        if (type.getSymbol() === targetSymbol) return true;
                    }
                }
            }
        }
    }
    return false;
}

/**
 * Find type alias subtypes in a source file (for intersection types).
 * Only intersection types are subtypes of their members.
 */
function findTypeAliasSubtypes(
    node: Node,
    targetSymbol: Symbol,
    typeChecker: TypeChecker,
    program: Program,
    result: TypeHierarchyItem[],
    seen: Set<TypeHierarchyDeclaration>,
    maxResults: number,
): void {
    // Early exit if we've hit the limit
    if (result.length >= maxResults) return;

    if (isTypeAliasDeclaration(node)) {
        // Check if this type alias makes the target type a supertype
        // This is true for intersection types: type A = B & C means A is a subtype of B and C
        // This is NOT true for union types: type A = B | C means A is a SUPERtype of B and C
        if (typeAliasIsSubtypeOfSymbol(node, targetSymbol, typeChecker)) {
            if (!seen.has(node)) {
                seen.add(node);
                result.push(createTypeHierarchyItem(program, node));
            }
        }
    }

    // Recurse into children if we haven't hit the limit
    if (result.length < maxResults) {
        node.forEachChild(child => findTypeAliasSubtypes(child, targetSymbol, typeChecker, program, result, seen, maxResults));
    }
}

/**
 * Find mixin variable declarations that use the target symbol in their composition chain.
 * This enables reverse mixin lookup: querying MixinBase should find FullMixin = Serializable(Activatable(MixinBase))
 */
function findMixinVariablesUsingSymbol(
    node: Node,
    targetSymbol: Symbol,
    typeChecker: TypeChecker,
    program: Program,
    result: TypeHierarchyItem[],
    seen: Set<TypeHierarchyDeclaration>,
    maxResults: number,
): void {
    // Early exit if we've hit the limit
    if (result.length >= maxResults) return;

    if (isMixinVariableDeclaration(node, typeChecker)) {
        // Check if this mixin variable uses the target symbol in its composition chain
        if (mixinUsesSymbolInChain(node.initializer, targetSymbol, typeChecker)) {
            if (!seen.has(node)) {
                seen.add(node);
                result.push(createTypeHierarchyItem(program, node));
            }
        }
    }

    // Recurse into children if we haven't hit the limit
    if (result.length < maxResults) {
        node.forEachChild(child => findMixinVariablesUsingSymbol(child, targetSymbol, typeChecker, program, result, seen, maxResults));
    }
}

/**
 * Check if a mixin call expression uses the target symbol anywhere in its composition chain.
 * Handles nested patterns like Serializable(Activatable(Timestamped(MixinBase)))
 */
function mixinUsesSymbolInChain(callExpr: CallExpression, targetSymbol: Symbol, typeChecker: TypeChecker): boolean {
    for (const arg of callExpr.arguments) {
        if (isCallExpression(arg)) {
            // Recursive mixin: check if inner call uses the target
            if (mixinUsesSymbolInChain(arg, targetSymbol, typeChecker)) {
                return true;
            }
        }
        else if (isIdentifier(arg)) {
            // Base class or mixin variable reference
            const argSymbol = typeChecker.getSymbolAtLocation(arg);
            if (argSymbol) {
                // Direct match
                if (argSymbol === targetSymbol) {
                    return true;
                }
                // Check aliased symbol for imports
                if (argSymbol.flags & SymbolFlags.Alias) {
                    const aliased = typeChecker.getAliasedSymbol(argSymbol);
                    if (aliased === targetSymbol) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

/**
 * Check if a type alias creates a subtype of the target symbol.
 * This is true for:
 * - Direct references: type Foo = Bar (Foo is an alias for Bar, considered a subtype)
 * - Intersection types: type A = B & C (A is a subtype of B and C)
 * - Mapped types that produce subtypes: Required<T> is a subtype of T
 *
 * This is NOT true for:
 * - Union types: type A = B | C (A is a SUPERtype of B and C, not a subtype)
 * - Mapped types that produce supertypes: Partial<T> is a SUPERtype of T
 */
function typeAliasIsSubtypeOfSymbol(alias: TypeAliasDeclaration, targetSymbol: Symbol, typeChecker: TypeChecker): boolean {
    const typeNode = alias.type;

    // Direct type reference: type Foo = Bar - Foo is essentially Bar
    if (isTypeReferenceNode(typeNode)) {
        const type = typeChecker.getTypeAtLocation(typeNode);
        return type.getSymbol() === targetSymbol;
    }

    // Intersection type: type A = B & C - A is a subtype of both B and C
    if (typeNode.kind === SyntaxKind.IntersectionType) {
        const intersectionNode = typeNode as import("./_namespaces/ts.js").IntersectionTypeNode;
        for (const member of intersectionNode.types) {
            if (isTypeReferenceNode(member)) {
                const type = typeChecker.getTypeAtLocation(member);
                if (type.getSymbol() === targetSymbol) {
                    return true;
                }
            }
        }
    }

    // Union types are NOT subtypes of their members - the relationship is reversed
    // type Pet = Dog | Cat means Pet is a SUPERTYPE of Dog (every Dog is a Pet)
    // So we don't include union type aliases as subtypes
    //
    // Note: Mapped types like Required<T>, Pick<T, K> are not included as subtypes
    // because the structural subtype check is expensive and can produce noisy results.
    // These utility types create new types that may or may not be assignable to the original
    // depending on the specific mapped type semantics.

    return false;
}

/**
 * Get a type hierarchy declaration from a symbol.
 * Handles:
 * - Re-exports/aliases: follows the alias to the original declaration
 * - Declaration merging: uses getMergedSymbol to get all declarations
 * - Import bindings: when a symbol represents an imported binding, follows to original
 */
function getTypeDeclarationFromSymbol(symbol: Symbol, typeChecker?: TypeChecker): TypeHierarchyDeclaration | undefined {
    if (!symbol) return undefined;

    let resolvedSymbol = symbol;

    // If we have a type checker, handle declaration merging
    if (typeChecker) {
        // Handle declaration merging by getting the merged symbol
        // This ensures we see all declarations of a merged interface/class
        resolvedSymbol = typeChecker.getMergedSymbol(resolvedSymbol);
    }

    const declarations = resolvedSymbol.getDeclarations();
    if (declarations) {
        for (const decl of declarations) {
            if (isValidTypeHierarchyDeclaration(decl, typeChecker)) {
                return decl;
            }
        }
    }
    return undefined;
}

/**
 * Get a mixin variable declaration from a symbol.
 * This is specifically for symbols that point to variables holding mixin results.
 */
function getMixinDeclarationFromSymbol(symbol: Symbol, typeChecker: TypeChecker): MixinVariableDeclaration | undefined {
    if (!symbol) return undefined;

    const declarations = symbol.getDeclarations();
    if (declarations) {
        for (const decl of declarations) {
            if (isMixinVariableDeclaration(decl, typeChecker)) {
                return decl;
            }
        }
    }
    return undefined;
}
