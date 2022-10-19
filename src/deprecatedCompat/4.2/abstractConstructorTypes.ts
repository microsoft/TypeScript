// DEPRECATION: Overloads for createConstructorTypeNode/updateConstructorTypeNode that do not accept 'modifiers'
// DEPRECATION PLAN:
//     - soft: 4.2
//     - warn: 4.3
//     - error: 5.0
namespace ts {
export interface NodeFactory {
    /** @deprecated Use the overload that accepts 'modifiers' */
    createConstructorTypeNode(typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode): ts.ConstructorTypeNode;

    /** @deprecated Use the overload that accepts 'modifiers' */
    updateConstructorTypeNode(node: ts.ConstructorTypeNode, typeParameters: ts.NodeArray<ts.TypeParameterDeclaration> | undefined, parameters: ts.NodeArray<ts.ParameterDeclaration>, type: ts.TypeNode): ts.ConstructorTypeNode;
}

function patchNodeFactory(factory: ts.NodeFactory) {
    const {
        createConstructorTypeNode,
        updateConstructorTypeNode,
    } = factory;

    factory.createConstructorTypeNode = ts.buildOverload("createConstructorTypeNode")
        .overload({
            0(modifiers: readonly ts.Modifier[] | undefined, typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode): ts.ConstructorTypeNode {
                return createConstructorTypeNode(modifiers, typeParameters, parameters, type);
            },

            1(typeParameters: readonly ts.TypeParameterDeclaration[] | undefined, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode): ts.ConstructorTypeNode {
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

    factory.updateConstructorTypeNode = ts.buildOverload("updateConstructorTypeNode")
        .overload({
            0(node: ts.ConstructorTypeNode, modifiers: readonly ts.Modifier[] | undefined, typeParameters: ts.NodeArray<ts.TypeParameterDeclaration> | undefined, parameters: ts.NodeArray<ts.ParameterDeclaration>, type: ts.TypeNode) {
                return updateConstructorTypeNode(node, modifiers, typeParameters, parameters, type);
            },

            1(node: ts.ConstructorTypeNode, typeParameters: ts.NodeArray<ts.TypeParameterDeclaration> | undefined, parameters: ts.NodeArray<ts.ParameterDeclaration>, type: ts.TypeNode) {
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
ts.addNodeFactoryPatcher(patchNodeFactory);

// Patch `ts.factory` because its public
patchNodeFactory(ts.factory);
}
