/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />

/*@internal*/
namespace ts {
    /**
     * Transforms ES5 syntax into ES3 syntax.
     *
     * @param context Context and state information for the transformation.
     */
    export function transformES5(context: TransformationContext) {
        const previousOnSubstituteNode = context.onSubstituteNode;
        context.onSubstituteNode = onSubstituteNode;
        context.enableSubstitution(SyntaxKind.PropertyAccessExpression);
        context.enableSubstitution(SyntaxKind.PropertyAssignment);
        return transformSourceFile;

        /**
         * Transforms an ES5 source file to ES3.
         *
         * @param node A SourceFile
         */
        function transformSourceFile(node: SourceFile) {
            return node;
        }

        /**
         * Hooks node substitutions.
         *
         * @param emitContext The context for the emitter.
         * @param node The node to substitute.
         */
        function onSubstituteNode(emitContext: EmitContext, node: Node) {
            node = previousOnSubstituteNode(emitContext, node);
            if (isPropertyAccessExpression(node)) {
                return substitutePropertyAccessExpression(node);
            }
            else if (isPropertyAssignment(node)) {
                return substitutePropertyAssignment(node);
            }
            return node;
        }

        /**
         * Substitutes a PropertyAccessExpression whose name is a reserved word.
         *
         * @param node A PropertyAccessExpression
         */
        function substitutePropertyAccessExpression(node: PropertyAccessExpression): Expression {
            const literalName = trySubstituteReservedName(node.name);
            if (literalName) {
                return createElementAccess(node.expression, literalName, /*location*/ node);
            }
            return node;
        }

        /**
         * Substitutes a PropertyAssignment whose name is a reserved word.
         *
         * @param node A PropertyAssignment
         */
        function substitutePropertyAssignment(node: PropertyAssignment): PropertyAssignment {
            const literalName = isIdentifier(node.name) && trySubstituteReservedName(node.name);
            if (literalName) {
                return updatePropertyAssignment(node, literalName, node.initializer);
            }
            return node;
        }

        /**
         * If an identifier name is a reserved word, returns a string literal for the name.
         *
         * @param name An Identifier
         */
        function trySubstituteReservedName(name: Identifier) {
            const token = name.originalKeywordKind || (nodeIsSynthesized(name) ? stringToToken(name.text) : undefined);
            if (token >= SyntaxKind.FirstReservedWord && token <= SyntaxKind.LastReservedWord) {
                return createLiteral(name, /*location*/ name);
            }
            return undefined;
        }
    }
}