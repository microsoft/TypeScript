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
        const createConstructorTypeNodeDeprecation = Debug.createDeprecation("createConstructorTypeNode", { since: "4.2", warnAfter: "4.3", message: "Use the overload that accepts 'modifiers'" });
        const prevCreateConstructorTypeNode = factory.createConstructorTypeNode;
        factory.createConstructorTypeNode = createConstructorTypeNode;

        const updateConstructorTypeNodeDeprecation = Debug.createDeprecation("updateConstructorTypeNode", { since: "4.2", warnAfter: "4.3", message: "Use the overload that accepts 'modifiers'" });
        const prevUpdateConstructorTypeNode = factory.updateConstructorTypeNode;
        factory.updateConstructorTypeNode = updateConstructorTypeNode;

        // @api
        function createConstructorTypeNode(...args: Parameters<typeof createConstructorTypeNode1> | Parameters<typeof createConstructorTypeNode2>) {
            return isCreateConstructorTypeNode1Args(args) ?
                createConstructorTypeNode1(...args) :
                createConstructorTypeNode2(...args);
        }

        function isCreateConstructorTypeNode1Args(args: Parameters<typeof createConstructorTypeNode1> | Parameters<typeof createConstructorTypeNode2>): args is Parameters<typeof createConstructorTypeNode1> {
            return args.length === 4;
        }

        function createConstructorTypeNode1(
            modifiers: readonly Modifier[] | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode
        ): ConstructorTypeNode {
            return prevCreateConstructorTypeNode(modifiers, typeParameters, parameters, type);
        }

        /** @deprecated */
        function createConstructorTypeNode2(
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode
        ): ConstructorTypeNode {
            createConstructorTypeNodeDeprecation();
            return createConstructorTypeNode1(/*modifiers*/ undefined, typeParameters, parameters, type);
        }

        function updateConstructorTypeNode(...args: Parameters<typeof updateConstructorTypeNode1> | Parameters<typeof updateConstructorTypeNode2>) {
            return isUpdateConstructorTypeNode1Args(args) ?
                updateConstructorTypeNode1(...args) :
                updateConstructorTypeNode2(...args);
        }

        function isUpdateConstructorTypeNode1Args(args: Parameters<typeof updateConstructorTypeNode1> | Parameters<typeof updateConstructorTypeNode2>): args is Parameters<typeof updateConstructorTypeNode1> {
            return args.length === 5;
        }

        function updateConstructorTypeNode1(
            node: ConstructorTypeNode,
            modifiers: readonly Modifier[] | undefined,
            typeParameters: NodeArray<TypeParameterDeclaration> | undefined,
            parameters: NodeArray<ParameterDeclaration>,
            type: TypeNode
        ) {
            return prevUpdateConstructorTypeNode(node, modifiers, typeParameters, parameters, type);
        }

        /** @deprecated */
        function updateConstructorTypeNode2(
            node: ConstructorTypeNode,
            typeParameters: NodeArray<TypeParameterDeclaration> | undefined,
            parameters: NodeArray<ParameterDeclaration>,
            type: TypeNode
        ) {
            updateConstructorTypeNodeDeprecation();
            return updateConstructorTypeNode1(node, node.modifiers, typeParameters, parameters, type);
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