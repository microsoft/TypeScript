import {
    BaseType,
    clear,
    EntityNameOrEntityNameExpression,
    forEach,
    getOwnValues,
    getSymbolId,
    Identifier,
    IndexedAccessType,
    IndexType,
    InterfaceType,
    MappedType,
    ObjectFlags,
    ObjectType,
    ResolvedType,
    Signature,
    Symbol,
    SymbolWalker,
    SyntaxKind,
    Type,
    TypeFlags,
    TypeParameter,
    TypePredicate,
    TypeQueryNode,
    TypeReference,
    UnionOrIntersectionType,
} from "./_namespaces/ts.js";

/** @internal */
export function createGetSymbolWalker(
    getRestTypeOfSignature: (sig: Signature) => Type,
    getTypePredicateOfSignature: (sig: Signature) => TypePredicate | undefined,
    getReturnTypeOfSignature: (sig: Signature) => Type,
    getBaseTypes: (type: InterfaceType) => BaseType[],
    resolveStructuredTypeMembers: (type: ObjectType) => ResolvedType,
    getTypeOfSymbol: (sym: Symbol) => Type,
    getResolvedSymbol: (node: Identifier) => Symbol,
    getConstraintOfTypeParameter: (typeParameter: TypeParameter) => Type | undefined,
    getFirstIdentifier: (node: EntityNameOrEntityNameExpression) => Identifier,
    getTypeArguments: (type: TypeReference) => readonly Type[],
): (accept?: (symbol: Symbol) => boolean) => SymbolWalker {
    return getSymbolWalker;

    function getSymbolWalker(accept: (symbol: Symbol) => boolean = () => true): SymbolWalker {
        const visitedTypes: Type[] = []; // Sparse array from id to type
        const visitedSymbols: Symbol[] = []; // Sparse array from id to symbol

        return {
            walkType: type => {
                try {
                    visitType(type);
                    return { visitedTypes: getOwnValues(visitedTypes), visitedSymbols: getOwnValues(visitedSymbols) };
                }
                finally {
                    clear(visitedTypes);
                    clear(visitedSymbols);
                }
            },
            walkSymbol: symbol => {
                try {
                    visitSymbol(symbol);
                    return { visitedTypes: getOwnValues(visitedTypes), visitedSymbols: getOwnValues(visitedSymbols) };
                }
                finally {
                    clear(visitedTypes);
                    clear(visitedSymbols);
                }
            },
        };

        function visitType(type: Type | undefined): void {
            if (!type) {
                return;
            }

            if (visitedTypes[type.id]) {
                return;
            }
            visitedTypes[type.id] = type;

            // Reuse visitSymbol to visit the type's symbol,
            //  but be sure to bail on recuring into the type if accept declines the symbol.
            const shouldBail = visitSymbol(type.symbol);
            if (shouldBail) return;

            // Visit the type's related types, if any
            if (type.flags & TypeFlags.Object) {
                const objectType = type as ObjectType;
                const objectFlags = objectType.objectFlags;
                if (objectFlags & ObjectFlags.Reference) {
                    visitTypeReference(type as TypeReference);
                }
                if (objectFlags & ObjectFlags.Mapped) {
                    visitMappedType(type as MappedType);
                }
                if (objectFlags & (ObjectFlags.Class | ObjectFlags.Interface)) {
                    visitInterfaceType(type as InterfaceType);
                }
                if (objectFlags & (ObjectFlags.Tuple | ObjectFlags.Anonymous)) {
                    visitObjectType(objectType);
                }
            }
            if (type.flags & TypeFlags.TypeParameter) {
                visitTypeParameter(type as TypeParameter);
            }
            if (type.flags & TypeFlags.UnionOrIntersection) {
                visitUnionOrIntersectionType(type as UnionOrIntersectionType);
            }
            if (type.flags & TypeFlags.Index) {
                visitIndexType(type as IndexType);
            }
            if (type.flags & TypeFlags.IndexedAccess) {
                visitIndexedAccessType(type as IndexedAccessType);
            }
        }

        function visitTypeReference(type: TypeReference): void {
            visitType(type.target);
            forEach(getTypeArguments(type), visitType);
        }

        function visitTypeParameter(type: TypeParameter): void {
            visitType(getConstraintOfTypeParameter(type));
        }

        function visitUnionOrIntersectionType(type: UnionOrIntersectionType): void {
            forEach(type.types, visitType);
        }

        function visitIndexType(type: IndexType): void {
            visitType(type.type);
        }

        function visitIndexedAccessType(type: IndexedAccessType): void {
            visitType(type.objectType);
            visitType(type.indexType);
            visitType(type.constraint);
        }

        function visitMappedType(type: MappedType): void {
            visitType(type.typeParameter);
            visitType(type.constraintType);
            visitType(type.templateType);
            visitType(type.modifiersType);
        }

        function visitSignature(signature: Signature): void {
            const typePredicate = getTypePredicateOfSignature(signature);
            if (typePredicate) {
                visitType(typePredicate.type);
            }
            forEach(signature.typeParameters, visitType);

            for (const parameter of signature.parameters) {
                visitSymbol(parameter);
            }
            visitType(getRestTypeOfSignature(signature));
            visitType(getReturnTypeOfSignature(signature));
        }

        function visitInterfaceType(interfaceT: InterfaceType): void {
            visitObjectType(interfaceT);
            forEach(interfaceT.typeParameters, visitType);
            forEach(getBaseTypes(interfaceT), visitType);
            visitType(interfaceT.thisType);
        }

        function visitObjectType(type: ObjectType): void {
            const resolved = resolveStructuredTypeMembers(type);
            for (const info of resolved.indexInfos) {
                visitType(info.keyType);
                visitType(info.type);
            }
            for (const signature of resolved.callSignatures) {
                visitSignature(signature);
            }
            for (const signature of resolved.constructSignatures) {
                visitSignature(signature);
            }
            for (const p of resolved.properties) {
                visitSymbol(p);
            }
        }

        function visitSymbol(symbol: Symbol | undefined): boolean {
            if (!symbol) {
                return false;
            }
            const symbolId = getSymbolId(symbol);
            if (visitedSymbols[symbolId]) {
                return false;
            }
            visitedSymbols[symbolId] = symbol;
            if (!accept(symbol)) {
                return true;
            }
            const t = getTypeOfSymbol(symbol);
            visitType(t); // Should handle members on classes and such
            if (symbol.exports) {
                symbol.exports.forEach(visitSymbol);
            }
            forEach(symbol.declarations, d => {
                // Type queries are too far resolved when we just visit the symbol's type
                //  (their type resolved directly to the member deeply referenced)
                // So to get the intervening symbols, we need to check if there's a type
                // query node on any of the symbol's declarations and get symbols there
                if ((d as any).type && (d as any).type.kind === SyntaxKind.TypeQuery) {
                    const query = (d as any).type as TypeQueryNode;
                    const entity = getResolvedSymbol(getFirstIdentifier(query.exprName));
                    visitSymbol(entity);
                }
            });
            return false;
        }
    }
}
