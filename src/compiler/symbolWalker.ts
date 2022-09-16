/** @internal */
namespace ts {
export function createGetSymbolWalker(
    getRestTypeOfSignature: (sig: ts.Signature) => ts.Type,
    getTypePredicateOfSignature: (sig: ts.Signature) => ts.TypePredicate | undefined,
    getReturnTypeOfSignature: (sig: ts.Signature) => ts.Type,
    getBaseTypes: (type: ts.Type) => ts.Type[],
    resolveStructuredTypeMembers: (type: ts.ObjectType) => ts.ResolvedType,
    getTypeOfSymbol: (sym: ts.Symbol) => ts.Type,
    getResolvedSymbol: (node: ts.Node) => ts.Symbol,
    getConstraintOfTypeParameter: (typeParameter: ts.TypeParameter) => ts.Type | undefined,
    getFirstIdentifier: (node: ts.EntityNameOrEntityNameExpression) => ts.Identifier,
    getTypeArguments: (type: ts.TypeReference) => readonly ts.Type[]) {

    return getSymbolWalker;

    function getSymbolWalker(accept: (symbol: ts.Symbol) => boolean = () => true): ts.SymbolWalker {
        const visitedTypes: ts.Type[] = []; // Sparse array from id to type
        const visitedSymbols: ts.Symbol[] = []; // Sparse array from id to symbol

        return {
            walkType: type => {
                try {
                    visitType(type);
                    return { visitedTypes: ts.getOwnValues(visitedTypes), visitedSymbols: ts.getOwnValues(visitedSymbols) };
                }
                finally {
                    ts.clear(visitedTypes);
                    ts.clear(visitedSymbols);
                }
            },
            walkSymbol: symbol => {
                try {
                    visitSymbol(symbol);
                    return { visitedTypes: ts.getOwnValues(visitedTypes), visitedSymbols: ts.getOwnValues(visitedSymbols) };
                }
                finally {
                    ts.clear(visitedTypes);
                    ts.clear(visitedSymbols);
                }
            },
        };

        function visitType(type: ts.Type | undefined): void {
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
            if (type.flags & ts.TypeFlags.Object) {
                const objectType = type as ts.ObjectType;
                const objectFlags = objectType.objectFlags;
                if (objectFlags & ts.ObjectFlags.Reference) {
                    visitTypeReference(type as ts.TypeReference);
                }
                if (objectFlags & ts.ObjectFlags.Mapped) {
                    visitMappedType(type as ts.MappedType);
                }
                if (objectFlags & (ts.ObjectFlags.Class | ts.ObjectFlags.Interface)) {
                    visitInterfaceType(type as ts.InterfaceType);
                }
                if (objectFlags & (ts.ObjectFlags.Tuple | ts.ObjectFlags.Anonymous)) {
                    visitObjectType(objectType);
                }
            }
            if (type.flags & ts.TypeFlags.TypeParameter) {
                visitTypeParameter(type as ts.TypeParameter);
            }
            if (type.flags & ts.TypeFlags.UnionOrIntersection) {
                visitUnionOrIntersectionType(type as ts.UnionOrIntersectionType);
            }
            if (type.flags & ts.TypeFlags.Index) {
                visitIndexType(type as ts.IndexType);
            }
            if (type.flags & ts.TypeFlags.IndexedAccess) {
                visitIndexedAccessType(type as ts.IndexedAccessType);
            }
        }

        function visitTypeReference(type: ts.TypeReference): void {
            visitType(type.target);
            ts.forEach(getTypeArguments(type), visitType);
        }

        function visitTypeParameter(type: ts.TypeParameter): void {
            visitType(getConstraintOfTypeParameter(type));
        }

        function visitUnionOrIntersectionType(type: ts.UnionOrIntersectionType): void {
            ts.forEach(type.types, visitType);
        }

        function visitIndexType(type: ts.IndexType): void {
            visitType(type.type);
        }

        function visitIndexedAccessType(type: ts.IndexedAccessType): void {
            visitType(type.objectType);
            visitType(type.indexType);
            visitType(type.constraint);
        }

        function visitMappedType(type: ts.MappedType): void {
            visitType(type.typeParameter);
            visitType(type.constraintType);
            visitType(type.templateType);
            visitType(type.modifiersType);
        }

        function visitSignature(signature: ts.Signature): void {
            const typePredicate = getTypePredicateOfSignature(signature);
            if (typePredicate) {
                visitType(typePredicate.type);
            }
            ts.forEach(signature.typeParameters, visitType);

            for (const parameter of signature.parameters) {
                visitSymbol(parameter);
            }
            visitType(getRestTypeOfSignature(signature));
            visitType(getReturnTypeOfSignature(signature));
        }

        function visitInterfaceType(interfaceT: ts.InterfaceType): void {
            visitObjectType(interfaceT);
            ts.forEach(interfaceT.typeParameters, visitType);
            ts.forEach(getBaseTypes(interfaceT), visitType);
            visitType(interfaceT.thisType);
        }

        function visitObjectType(type: ts.ObjectType): void {
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

        function visitSymbol(symbol: ts.Symbol | undefined): boolean {
            if (!symbol) {
                return false;
            }
            const symbolId = ts.getSymbolId(symbol);
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
            ts.forEach(symbol.declarations, d => {
                // Type queries are too far resolved when we just visit the symbol's type
                //  (their type resolved directly to the member deeply referenced)
                // So to get the intervening symbols, we need to check if there's a type
                // query node on any of the symbol's declarations and get symbols there
                if ((d as any).type && (d as any).type.kind === ts.SyntaxKind.TypeQuery) {
                    const query = (d as any).type as ts.TypeQueryNode;
                    const entity = getResolvedSymbol(getFirstIdentifier(query.exprName));
                    visitSymbol(entity);
                }
            });
            return false;
        }
    }
}
}