namespace ts {
    export function createGetSymbolWalker(
        getRestTypeOfSignature: (sig: Signature) => Type,
        getReturnTypeOfSignature: (sig: Signature) => Type,
        getBaseTypes: (type: Type) => Type[],
        resolveStructuredTypeMembers: (type: ObjectType) => ResolvedType,
        getTypeOfSymbol: (sym: Symbol) => Type,
        getResolvedSymbol: (node: Node) => Symbol,
        getIndexTypeOfStructuredType: (type: Type, kind: IndexKind) => Type) {

        return getSymbolWalker;

        function getSymbolWalker(accept: (symbol: Symbol) => boolean = () => true): SymbolWalker {
            let visited: Type[] = [];
            let visitedSymbols: Symbol[] = [];

            return {
                visitType,
                visitSymbol,
                reset: (newCallback: (symbol: Symbol) => boolean = () => true) => {
                    accept = newCallback;
                    visited = [];
                    visitedSymbols = [];
                }
            };

            function visitType(type: Type): void {
                if (!type) {
                    return;
                }
                if (contains(visited, type)) {
                    return;
                }
                visited.push(type);

                // Reuse visitSymbol to visit the type's symbol,
                //  but be sure to bail on recuring into the type if accept declines the symbol.
                const shouldBail = visitSymbol(type.symbol);
                if (shouldBail) return;

                // Visit the type's related types, if any
                if (type.flags & TypeFlags.Reference) {
                    visitTypeReference(type as TypeReference);
                }
                if (type.flags & TypeFlags.TypeParameter) {
                    visitTypeParameter(type as TypeParameter);
                }
                if (type.flags & TypeFlags.Tuple) {
                    visitTupleType(type as TupleType);
                }
                if (type.flags & TypeFlags.UnionOrIntersection) {
                    visitUnionOrIntersectionType(type as UnionOrIntersectionType);
                }
                if (type.flags & (TypeFlags.Class | TypeFlags.Interface)) {
                    visitInterfaceType(type as InterfaceType);
                }
                if (type.flags & TypeFlags.Anonymous) {
                    visitObjectType(type as ObjectType);
                }
            }

            function visitTypeList(types: Type[]): void {
                if (!types) {
                    return;
                }
                for (let i = 0; i < types.length; i++) {
                    visitType(types[i]);
                }
            }

            function visitTypeReference(type: TypeReference): void {
                visitType(type.target);
                visitTypeList(type.typeArguments);
            }

            function visitTypeParameter(type: TypeParameter): void {
                visitType(type.constraint);
            }

            function visitTupleType(type: TupleType): void {
                visitTypeList(type.elementTypes);
            }

            function visitUnionOrIntersectionType(type: UnionOrIntersectionType): void {
                visitTypeList(type.types);
            }

            function visitSignature(signature: Signature): void {
                if (signature.typePredicate) {
                    visitType(signature.typePredicate.type);
                }
                visitTypeList(signature.typeParameters);

                for (const parameter of signature.parameters){
                    visitSymbol(parameter);
                }
                visitType(getRestTypeOfSignature(signature));
                visitType(getReturnTypeOfSignature(signature));
            }

            function visitInterfaceType(interfaceT: InterfaceType): void {
                visitObjectType(interfaceT);
                visitTypeList(interfaceT.typeParameters);
                visitTypeList(getBaseTypes(interfaceT));
                visitType(interfaceT.thisType);
            }

            function visitObjectType(type: ObjectType): void {
                const stringIndexType = getIndexTypeOfStructuredType(type, IndexKind.String);
                visitType(stringIndexType);
                const numberIndexType = getIndexTypeOfStructuredType(type, IndexKind.String);
                visitType(numberIndexType);

                // The two checks above *should* have already resolved the type (if needed), so this should be cached
                const resolved = resolveStructuredTypeMembers(type);
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

            function visitSymbol(symbol: Symbol): boolean {
                if (!symbol) {
                    return;
                }
                if (contains(visitedSymbols, symbol)) {
                    return;
                }
                visitedSymbols.push(symbol);
                if (!accept(symbol)) {
                    return true;
                }
                const t = getTypeOfSymbol(symbol);
                visitType(t); // Should handle members on classes and such
                if (symbol.flags & SymbolFlags.HasExports) {
                    forEachValue(symbol.exports, visitSymbol);
                }
                forEach(symbol.declarations, d => {
                    // Type queries are too far resolved when we just visit the symbol's type
                    //  (their type resolved directly to the member deeply referenced)
                    // So to get the intervening symbols, we need to check if there's a type
                    // query node on any of the symbol's declarations and get symbols there
                    if ((d as any).type && (d as any).type.kind === SyntaxKind.TypeQuery) {
                        const query = (d as any).type as TypeQueryNode;
                        const entity = leftmostSymbol(query.exprName);
                        visitSymbol(entity);
                    }
                });
            }
        }

        function leftmostSymbol(expr: QualifiedName | Identifier): Symbol {
            if (expr.kind === SyntaxKind.Identifier) {
                return getResolvedSymbol(expr as Identifier);
            }
            else {
                return leftmostSymbol((expr as QualifiedName).left);
            }
        }
    }
}