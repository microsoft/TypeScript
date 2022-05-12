// DEPRECATION: Overloads to createTypeParameter/updateTypeParameter that does not accept `modifiers`
// DEPRECATION PLAN:
//     - soft: 4.7
//     - warn: 4.8
//     - error: 5.0
namespace ts {
    export interface NodeFactory {
        /** @deprecated Use the overload that accepts 'modifiers' */
        createTypeParameterDeclaration(name: string | Identifier, constraint?: TypeNode, defaultType?: TypeNode): TypeParameterDeclaration;

        /** @deprecated Use the overload that accepts 'modifiers' */
        updateTypeParameterDeclaration(node: TypeParameterDeclaration, name: Identifier, constraint: TypeNode | undefined, defaultType: TypeNode | undefined): TypeParameterDeclaration;
    }

    function patchNodeFactory(factory: NodeFactory) {
        const createTypeParameterDeclarationDeprecation = Debug.createDeprecation("createTypeParameterDeclaration", { since: "4.7", warnAfter: "4.8", message: "Use the overload that accepts 'modifiers'" });
        const prevCreateTypeParameterDeclaration = factory.createTypeParameterDeclaration;
        factory.createTypeParameterDeclaration = createTypeParameterDeclaration;

        const updateTypeParameterDeclarationDeprecation = Debug.createDeprecation("updateTypeParameterDeclaration", { since: "4.7", warnAfter: "4.8", message: "Use the overload that accepts 'modifiers'" });
        const prevUpdateTypeParameterDeclaration = factory.updateTypeParameterDeclaration;
        factory.updateTypeParameterDeclaration = updateTypeParameterDeclaration;

        function createTypeParameterDeclaration(...args: Parameters<typeof createTypeParameterDeclaration1> | Parameters<typeof createTypeParameterDeclaration2>) {
            if (isCreateTypeParameterDeclaration1Args(args)) {
                return createTypeParameterDeclaration1(...args);
            }
            else {
                return createTypeParameterDeclaration2(...args);
            }
        }

        function isCreateTypeParameterDeclaration1Args(args: Parameters<typeof createTypeParameterDeclaration1> | Parameters<typeof createTypeParameterDeclaration2>): args is Parameters<typeof createTypeParameterDeclaration1> {
            return args[0] === undefined || isArray(args[0]);
        }

        function createTypeParameterDeclaration1(modifiers: readonly Modifier[] | undefined, name: string | Identifier, constraint?: TypeNode, defaultType?: TypeNode): TypeParameterDeclaration {
            return prevCreateTypeParameterDeclaration(modifiers, name, constraint, defaultType);
        }

        /** @deprecated */
        function createTypeParameterDeclaration2(name: string | Identifier, constraint?: TypeNode, defaultType?: TypeNode): TypeParameterDeclaration {
            createTypeParameterDeclarationDeprecation();
            return prevCreateTypeParameterDeclaration(/*modifiers*/ undefined, name, constraint, defaultType);
        }

        function updateTypeParameterDeclaration(...args: Parameters<typeof updateTypeParameterDeclaration1> | Parameters<typeof updateTypeParameterDeclaration2>) {
            if (isUpdateTypeParameterDeclaration1Args(args)) {
                return updateTypeParameterDeclaration1(...args);
            }
            else {
                return updateTypeParameterDeclaration2(...args);
            }
        }

        function isUpdateTypeParameterDeclaration1Args(args: Parameters<typeof updateTypeParameterDeclaration1> | Parameters<typeof updateTypeParameterDeclaration2>): args is Parameters<typeof updateTypeParameterDeclaration1> {
            return args[1] === undefined || isArray(args[1]);
        }

        function updateTypeParameterDeclaration1(node: TypeParameterDeclaration, modifiers: readonly Modifier[] | undefined, name: Identifier, constraint: TypeNode | undefined, defaultType: TypeNode | undefined): TypeParameterDeclaration {
            return prevUpdateTypeParameterDeclaration(node, modifiers, name, constraint, defaultType);
        }

        /** @deprecated */
        function updateTypeParameterDeclaration2(node: TypeParameterDeclaration, name: Identifier, constraint: TypeNode | undefined, defaultType: TypeNode | undefined): TypeParameterDeclaration {
            updateTypeParameterDeclarationDeprecation();
            return prevUpdateTypeParameterDeclaration(node, node.modifiers, name, constraint, defaultType);
        }
    }

    // Patch `createNodeFactory` because it creates the factories that are provided to transformers
    // in the public API.

    const prevCreateNodeFactory = createNodeFactory;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-qualifier
    ts.createNodeFactory = (flags, baseFactory) => {
        const factory = prevCreateNodeFactory(flags, baseFactory);
        patchNodeFactory(factory);
        return factory;
    };

    // Patch `ts.factory` because its public
    patchNodeFactory(factory);
}