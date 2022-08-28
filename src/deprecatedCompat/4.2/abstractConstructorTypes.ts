// DEPRECATION: Overloads for createConstructorTypeNode/updateConstructorTypeNode that do not accept 'modifiers'
// DEPRECATION PLAN:
//     - soft: 4.2
//     - warn: 4.3
//     - error: 5.0
namespace ts {
    export interface NodeFactory {
        /** @deprecated Use the overload that accepts 'modifiers' */
        createConstructorTypeNode(typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): ConstructorTypeNode;

        /** @deprecated Use the overload that accepts 'modifiers' */
        updateConstructorTypeNode(node: ConstructorTypeNode, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode): ConstructorTypeNode;
    }

    function patchNodeFactory(factory: NodeFactory) {
        const {
            createConstructorTypeNode,
            updateConstructorTypeNode,
        } = factory;

        factory.createConstructorTypeNode = buildOverload("createConstructorTypeNode")
            .overload({
                0(modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): ConstructorTypeNode {
                    return createConstructorTypeNode(modifiers, typeParameters, parameters, type);
                },

                1(typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): ConstructorTypeNode {
                    return createConstructorTypeNode(/*modifiers*/ undefined, typeParameters, parameters, type);
                },
            })
            .bind({
                0: args => args.length === 4,
                1: args => args.length === 3,
            })
            .deprecate({
                1: { since: "4.2", warnAfter: "4.3", message: "Use the overload that accepts 'modifiers'" }
            })
            .finish();

        factory.updateConstructorTypeNode = buildOverload("updateConstructorTypeNode")
            .overload({
                0(node: ConstructorTypeNode, modifiers: readonly Modifier[] | undefined, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode) {
                    return updateConstructorTypeNode(node, modifiers, typeParameters, parameters, type);
                },

                1(node: ConstructorTypeNode, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode) {
                    return updateConstructorTypeNode(node, node.modifiers, typeParameters, parameters, type);
                }
            })
            .bind({
                0: args => args.length === 5,
                1: args => args.length === 4,
            })
            .deprecate({
                1: { since: "4.2", warnAfter: "4.3", message: "Use the overload that accepts 'modifiers'" }
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