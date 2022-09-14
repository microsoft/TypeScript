// DEPRECATION: Overloads to createImportTypeNode/updateImportTypeNode that do not accept `assertions`
// DEPRECATION PLAN:
//     - soft: 4.6
//     - warn: 4.7
//     - error: 5.0
namespace ts {
export interface NodeFactory {
    // NOTE: The following overload is not deprecated, but exists to ensure we don't mark `createImportTypeNode(argument)` as deprecated due to optional parameters.
    createImportTypeNode(argument: ts.TypeNode, assertions?: ts.ImportTypeAssertionContainer, qualifier?: ts.EntityName, typeArguments?: readonly ts.TypeNode[], isTypeOf?: boolean): ts.ImportTypeNode;

    /** @deprecated Use the overload that accepts 'assertions' */
    createImportTypeNode(argument: ts.TypeNode, qualifier?: ts.EntityName, typeArguments?: readonly ts.TypeNode[], isTypeOf?: boolean): ts.ImportTypeNode;

    /** @deprecated Use the overload that accepts 'assertions' */
    updateImportTypeNode(node: ts.ImportTypeNode, argument: ts.TypeNode, qualifier: ts.EntityName | undefined, typeArguments: readonly ts.TypeNode[] | undefined, isTypeOf?: boolean): ts.ImportTypeNode;
}

function patchNodeFactory(factory: ts.NodeFactory) {
    const {
        createImportTypeNode,
        updateImportTypeNode,
    } = factory;

    factory.createImportTypeNode = ts.buildOverload("createImportTypeNode")
        .overload({
            0(argument: ts.TypeNode, assertions?: ts.ImportTypeAssertionContainer, qualifier?: ts.EntityName, typeArguments?: readonly ts.TypeNode[], isTypeOf?: boolean): ts.ImportTypeNode {
                return createImportTypeNode(argument, assertions, qualifier, typeArguments, isTypeOf);
            },

            1(argument: ts.TypeNode, qualifier?: ts.EntityName, typeArguments?: readonly ts.TypeNode[], isTypeOf?: boolean): ts.ImportTypeNode {
                return createImportTypeNode(argument, /*assertions*/ undefined, qualifier, typeArguments, isTypeOf);
            },
        })
        .bind({
            0: ([, assertions, qualifier, typeArguments, isTypeOf]) =>
                (assertions === undefined || ts.isImportTypeAssertionContainer(assertions)) &&
                (qualifier === undefined || !ts.isArray(qualifier)) &&
                (typeArguments === undefined || ts.isArray(typeArguments)) &&
                (isTypeOf === undefined || typeof isTypeOf === "boolean"),

            1: ([, qualifier, typeArguments, isTypeOf, other]) =>
                (other === undefined) &&
                (qualifier === undefined || ts.isEntityName(qualifier)) &&
                (typeArguments === undefined || ts.isArray(typeArguments)) &&
                (isTypeOf === undefined || typeof isTypeOf === "boolean"),
        })
        .deprecate({
            1: { since: "4.6", warnAfter: "4.7", message: "Use the overload that accepts 'assertions'" }
        })
        .finish();

    factory.updateImportTypeNode = ts.buildOverload("updateImportTypeNode")
        .overload({
            0(node: ts.ImportTypeNode, argument: ts.TypeNode, assertions: ts.ImportTypeAssertionContainer | undefined, qualifier: ts.EntityName | undefined, typeArguments: readonly ts.TypeNode[] | undefined, isTypeOf?: boolean): ts.ImportTypeNode {
                return updateImportTypeNode(node, argument, assertions, qualifier, typeArguments, isTypeOf);
            },

            1(node: ts.ImportTypeNode, argument: ts.TypeNode, qualifier: ts.EntityName | undefined, typeArguments: readonly ts.TypeNode[] | undefined, isTypeOf?: boolean): ts.ImportTypeNode {
                return updateImportTypeNode(node, argument, node.assertions, qualifier, typeArguments, isTypeOf);
            },
        })
        .bind({
            0: ([, , assertions, qualifier, typeArguments, isTypeOf]) =>
                (assertions === undefined || ts.isImportTypeAssertionContainer(assertions)) &&
                (qualifier === undefined || !ts.isArray(qualifier)) &&
                (typeArguments === undefined || ts.isArray(typeArguments)) &&
                (isTypeOf === undefined || typeof isTypeOf === "boolean"),

            1: ([, , qualifier, typeArguments, isTypeOf, other]) =>
                (other === undefined) &&
                (qualifier === undefined || ts.isEntityName(qualifier)) &&
                (typeArguments === undefined || ts.isArray(typeArguments)) &&
                (isTypeOf === undefined || typeof isTypeOf === "boolean"),
        }).
        deprecate({
            1: { since: "4.6", warnAfter: "4.7", message: "Use the overload that accepts 'assertions'" }
        })
        .finish();
}

// Patch `createNodeFactory` because it creates the factories that are provided to transformers
// in the public API.
ts.addNodeFactoryPatcher(patchNodeFactory);

// Patch `ts.factory` because its public
patchNodeFactory(ts.factory);
}
