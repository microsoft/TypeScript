// DEPRECATION: Overloads to createTypeParameter/updateTypeParameter that does not accept `modifiers`
// DEPRECATION PLAN:
//     - soft: 4.7
//     - warn: 4.8
//     - error: 5.0
namespace ts {
export interface NodeFactory {
    /** @deprecated Use the overload that accepts 'modifiers' */
    createTypeParameterDeclaration(name: string | ts.Identifier, constraint?: ts.TypeNode, defaultType?: ts.TypeNode): ts.TypeParameterDeclaration;

    /** @deprecated Use the overload that accepts 'modifiers' */
    updateTypeParameterDeclaration(node: ts.TypeParameterDeclaration, name: ts.Identifier, constraint: ts.TypeNode | undefined, defaultType: ts.TypeNode | undefined): ts.TypeParameterDeclaration;
}

function patchNodeFactory(factory: ts.NodeFactory) {
    const {
        createTypeParameterDeclaration,
        updateTypeParameterDeclaration,
    } = factory;

    factory.createTypeParameterDeclaration = ts.buildOverload("createTypeParameterDeclaration")
        .overload({
            0(modifiers: readonly ts.Modifier[] | undefined, name: string | ts.Identifier, constraint?: ts.TypeNode, defaultType?: ts.TypeNode): ts.TypeParameterDeclaration {
                return createTypeParameterDeclaration(modifiers, name, constraint, defaultType);
            },

            1(name: string | ts.Identifier, constraint?: ts.TypeNode, defaultType?: ts.TypeNode): ts.TypeParameterDeclaration {
                return createTypeParameterDeclaration(/*modifiers*/ undefined, name, constraint, defaultType);
            },
        })
        .bind({
            0: ([modifiers]) =>
                (modifiers === undefined || ts.isArray(modifiers)),

            1: ([name]) =>
                (name !== undefined && !ts.isArray(name)),
        })
        .deprecate({
            1: { since: "4.7", warnAfter: "4.8", message: "Use the overload that accepts 'modifiers'" }
        })
        .finish();

    factory.updateTypeParameterDeclaration = ts.buildOverload("updateTypeParameterDeclaration")
        .overload({
            0(node: ts.TypeParameterDeclaration, modifiers: readonly ts.Modifier[] | undefined, name: ts.Identifier, constraint: ts.TypeNode | undefined, defaultType: ts.TypeNode | undefined): ts.TypeParameterDeclaration {
                return updateTypeParameterDeclaration(node, modifiers, name, constraint, defaultType);
            },

            1(node: ts.TypeParameterDeclaration, name: ts.Identifier, constraint: ts.TypeNode | undefined, defaultType: ts.TypeNode | undefined): ts.TypeParameterDeclaration {
                return updateTypeParameterDeclaration(node, node.modifiers, name, constraint, defaultType);
            },
        })
        .bind({
            0: ([, modifiers]) =>
                (modifiers === undefined || ts.isArray(modifiers)),

            1: ([, name]) =>
                (name !== undefined && !ts.isArray(name)),
        })
        .deprecate({
            1: { since: "4.7", warnAfter: "4.8", message: "Use the overload that accepts 'modifiers'" }
        })
        .finish();
}

// Patch `createNodeFactory` because it creates the factories that are provided to transformers
// in the public API.
ts.addNodeFactoryPatcher(patchNodeFactory);

// Patch `ts.factory` because its public
patchNodeFactory(ts.factory);
}
