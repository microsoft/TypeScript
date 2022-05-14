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
        const {
            createTypeParameterDeclaration,
            updateTypeParameterDeclaration,
        } = factory;

        factory.createTypeParameterDeclaration = buildOverload("createTypeParameterDeclaration")
            .overload({
                0(modifiers: readonly Modifier[] | undefined, name: string | Identifier, constraint?: TypeNode, defaultType?: TypeNode): TypeParameterDeclaration {
                    return createTypeParameterDeclaration(modifiers, name, constraint, defaultType);
                },

                1(name: string | Identifier, constraint?: TypeNode, defaultType?: TypeNode): TypeParameterDeclaration {
                    return createTypeParameterDeclaration(/*modifiers*/ undefined, name, constraint, defaultType);
                },
            })
            .bind({
                0: ([modifiers]) =>
                    (modifiers === undefined || isArray(modifiers)),

                1: ([name]) =>
                    (name !== undefined && !isArray(name)),
            })
            .deprecate({
                1: { since: "4.7", warnAfter: "4.8", message: "Use the overload that accepts 'modifiers'" }
            })
            .finish();

        factory.updateTypeParameterDeclaration = buildOverload("updateTypeParameterDeclaration")
            .overload({
                0(node: TypeParameterDeclaration, modifiers: readonly Modifier[] | undefined, name: Identifier, constraint: TypeNode | undefined, defaultType: TypeNode | undefined): TypeParameterDeclaration {
                    return updateTypeParameterDeclaration(node, modifiers, name, constraint, defaultType);
                },

                1(node: TypeParameterDeclaration, name: Identifier, constraint: TypeNode | undefined, defaultType: TypeNode | undefined): TypeParameterDeclaration {
                    return updateTypeParameterDeclaration(node, node.modifiers, name, constraint, defaultType);
                },
            })
            .bind({
                0: ([, modifiers]) =>
                    (modifiers === undefined || isArray(modifiers)),

                1: ([, name]) =>
                    (name !== undefined && !isArray(name)),
            })
            .deprecate({
                1: { since: "4.7", warnAfter: "4.8", message: "Use the overload that accepts 'modifiers'" }
            })
            .finish();
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