// DEPRECATION: Overloads to createImportTypeNode/updateImportTypeNode that do not accept `assertions`
// DEPRECATION PLAN:
//     - soft: 4.6
//     - warn: 4.7
//     - error: 5.0
namespace ts {
    export interface NodeFactory {
        // NOTE: The following overload is not deprecated, but exists to ensure we don't mark `createImportTypeNode(argument)` as deprecated due to optional parameters.
        createImportTypeNode(argument: TypeNode, assertions?: ImportTypeAssertionContainer, qualifier?: EntityName, typeArguments?: readonly TypeNode[], isTypeOf?: boolean): ImportTypeNode;

        /** @deprecated Use the overload that accepts 'assertions' */
        createImportTypeNode(argument: TypeNode, qualifier?: EntityName, typeArguments?: readonly TypeNode[], isTypeOf?: boolean): ImportTypeNode;

        /** @deprecated Use the overload that accepts 'assertions' */
        updateImportTypeNode(node: ImportTypeNode, argument: TypeNode, qualifier: EntityName | undefined, typeArguments: readonly TypeNode[] | undefined, isTypeOf?: boolean): ImportTypeNode;
    }

    function patchNodeFactory(factory: NodeFactory) {
        const createImportTypeNodeDeprecation = Debug.createDeprecation("createImportTypeNode", { since: "4.6", warnAfter: "4.7", message: "Use the overload that accepts 'assertions'" });
        const prevCreateImportTypeNode = factory.createImportTypeNode;
        factory.createImportTypeNode = createImportTypeNode;

        const updateImportTypeNodeDeprecation = Debug.createDeprecation("updateImportTypeNode", { since: "4.6", warnAfter: "4.7", message: "Use the overload that accepts 'assertions'" });
        const prevUpdateImportTypeNode = factory.updateImportTypeNode;
        factory.updateImportTypeNode = updateImportTypeNode;

        function createImportTypeNode(...args: Parameters<typeof createImportTypeNode1> | Parameters<typeof createImportTypeNode2>) {
            if (isCreateImportTypeNode1Args(args)) {
                return createImportTypeNode1(...args);
            }
            else {
                return createImportTypeNode2(...args);
            }
        }

        function isCreateImportTypeNode1Args(args: Parameters<typeof createImportTypeNode1> | Parameters<typeof createImportTypeNode2>): args is Parameters<typeof createImportTypeNode1> {
            const [, assertions, qualifier, typeArguments] = args;
            if (assertions !== undefined) return isImportTypeAssertionContainer(assertions);
            if (qualifier !== undefined) return !isArray(qualifier);
            if (typeArguments !== undefined) return isArray(typeArguments);
            return true;
        }

        function createImportTypeNode1(argument: TypeNode, assertions?: ImportTypeAssertionContainer, qualifier?: EntityName, typeArguments?: readonly TypeNode[], isTypeOf?: boolean): ImportTypeNode {
            return prevCreateImportTypeNode(argument, assertions, qualifier, typeArguments, isTypeOf);
        }

        /** @deprecated */
        function createImportTypeNode2(argument: TypeNode, qualifier?: EntityName, typeArguments?: readonly TypeNode[], isTypeOf?: boolean): ImportTypeNode {
            createImportTypeNodeDeprecation();
            return prevCreateImportTypeNode(argument, /*assertions*/ undefined, qualifier, typeArguments, isTypeOf);
        }

        function updateImportTypeNode(...args: Parameters<typeof updateImportTypeNode1> | Parameters<typeof updateImportTypeNode2>) {
            if (isUpdateImportTypeNode1Args(args)) {
                return updateImportTypeNode1(...args);
            }
            else {
                return updateImportTypeNode2(...args);
            }
        }

        function isUpdateImportTypeNode1Args(args: Parameters<typeof updateImportTypeNode1> | Parameters<typeof updateImportTypeNode2>): args is Parameters<typeof updateImportTypeNode1> {
            const [, , assertions, qualifier, typeArguments] = args;
            if (assertions !== undefined) return isImportTypeAssertionContainer(assertions);
            if (qualifier !== undefined) return !isArray(qualifier);
            if (typeArguments !== undefined) return isArray(typeArguments);
            return true;
        }

        function updateImportTypeNode1(node: ImportTypeNode, argument: TypeNode, assertions: ImportTypeAssertionContainer | undefined, qualifier: EntityName | undefined, typeArguments: readonly TypeNode[] | undefined, isTypeOf?: boolean): ImportTypeNode {
            return prevUpdateImportTypeNode(node, argument, assertions, qualifier, typeArguments, isTypeOf);
        }

        /** @deprecated */
        function updateImportTypeNode2(node: ImportTypeNode, argument: TypeNode, qualifier: EntityName | undefined, typeArguments: readonly TypeNode[] | undefined, isTypeOf?: boolean): ImportTypeNode {
            updateImportTypeNodeDeprecation();
            return prevUpdateImportTypeNode(node, argument, node.assertions, qualifier, typeArguments, isTypeOf);
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