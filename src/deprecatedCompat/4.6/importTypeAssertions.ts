import {
    addNodeFactoryPatcher, buildOverload, EntityName, factory, ImportTypeAssertionContainer, ImportTypeNode, isArray,
    isEntityName, isImportTypeAssertionContainer, NodeFactory, TypeNode,
} from "../_namespaces/ts";

// DEPRECATION: Overloads to createImportTypeNode/updateImportTypeNode that do not accept `assertions`
// DEPRECATION PLAN:
//     - soft: 4.6
//     - warn: 4.7
//     - error: 5.0
declare module "../../compiler/types" {
    // Module transform: converted from interface augmentation
    export interface NodeFactory {
        // NOTE: The following overload is not deprecated, but exists to ensure we don't mark `createImportTypeNode(argument)` as deprecated due to optional parameters.
        createImportTypeNode(argument: TypeNode, assertions?: ImportTypeAssertionContainer, qualifier?: EntityName, typeArguments?: readonly TypeNode[], isTypeOf?: boolean): ImportTypeNode;

        /** @deprecated Use the overload that accepts 'assertions' */
        createImportTypeNode(argument: TypeNode, qualifier?: EntityName, typeArguments?: readonly TypeNode[], isTypeOf?: boolean): ImportTypeNode;

        /** @deprecated Use the overload that accepts 'assertions' */
        updateImportTypeNode(node: ImportTypeNode, argument: TypeNode, qualifier: EntityName | undefined, typeArguments: readonly TypeNode[] | undefined, isTypeOf?: boolean): ImportTypeNode;
    }
}

function patchNodeFactory(factory: NodeFactory) {
    const {
        createImportTypeNode,
        updateImportTypeNode,
    } = factory;

    factory.createImportTypeNode = buildOverload("createImportTypeNode")
        .overload({
            0(argument: TypeNode, assertions?: ImportTypeAssertionContainer, qualifier?: EntityName, typeArguments?: readonly TypeNode[], isTypeOf?: boolean): ImportTypeNode {
                return createImportTypeNode(argument, assertions, qualifier, typeArguments, isTypeOf);
            },

            1(argument: TypeNode, qualifier?: EntityName, typeArguments?: readonly TypeNode[], isTypeOf?: boolean): ImportTypeNode {
                return createImportTypeNode(argument, /*assertions*/ undefined, qualifier, typeArguments, isTypeOf);
            },
        })
        .bind({
            0: ([, assertions, qualifier, typeArguments, isTypeOf]) =>
                (assertions === undefined || isImportTypeAssertionContainer(assertions)) &&
                (qualifier === undefined || !isArray(qualifier)) &&
                (typeArguments === undefined || isArray(typeArguments)) &&
                (isTypeOf === undefined || typeof isTypeOf === "boolean"),

            1: ([, qualifier, typeArguments, isTypeOf, other]) =>
                (other === undefined) &&
                (qualifier === undefined || isEntityName(qualifier)) &&
                (typeArguments === undefined || isArray(typeArguments)) &&
                (isTypeOf === undefined || typeof isTypeOf === "boolean"),
        })
        .deprecate({
            1: { since: "4.6", warnAfter: "4.7", message: "Use the overload that accepts 'assertions'" }
        })
        .finish();

    factory.updateImportTypeNode = buildOverload("updateImportTypeNode")
        .overload({
            0(node: ImportTypeNode, argument: TypeNode, assertions: ImportTypeAssertionContainer | undefined, qualifier: EntityName | undefined, typeArguments: readonly TypeNode[] | undefined, isTypeOf?: boolean): ImportTypeNode {
                return updateImportTypeNode(node, argument, assertions, qualifier, typeArguments, isTypeOf);
            },

            1(node: ImportTypeNode, argument: TypeNode, qualifier: EntityName | undefined, typeArguments: readonly TypeNode[] | undefined, isTypeOf?: boolean): ImportTypeNode {
                return updateImportTypeNode(node, argument, node.assertions, qualifier, typeArguments, isTypeOf);
            },
        })
        .bind({
            0: ([, , assertions, qualifier, typeArguments, isTypeOf]) =>
                (assertions === undefined || isImportTypeAssertionContainer(assertions)) &&
                (qualifier === undefined || !isArray(qualifier)) &&
                (typeArguments === undefined || isArray(typeArguments)) &&
                (isTypeOf === undefined || typeof isTypeOf === "boolean"),

            1: ([, , qualifier, typeArguments, isTypeOf, other]) =>
                (other === undefined) &&
                (qualifier === undefined || isEntityName(qualifier)) &&
                (typeArguments === undefined || isArray(typeArguments)) &&
                (isTypeOf === undefined || typeof isTypeOf === "boolean"),
        }).
        deprecate({
            1: { since: "4.6", warnAfter: "4.7", message: "Use the overload that accepts 'assertions'" }
        })
        .finish();
}

// Patch `createNodeFactory` because it creates the factories that are provided to transformers
// in the public API.
addNodeFactoryPatcher(patchNodeFactory);

// Patch `ts.factory` because its public
patchNodeFactory(factory);
