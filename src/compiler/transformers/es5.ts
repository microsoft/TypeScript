/*@internal*/
namespace ts {
/**
 * Transforms ES5 syntax into ES3 syntax.
 *
 * @param context Context and state information for the transformation.
 */
export function transformES5(context: ts.TransformationContext) {
    const { factory } = context;
    const compilerOptions = context.getCompilerOptions();

    // enable emit notification only if using --jsx preserve or react-native
    let previousOnEmitNode: (hint: ts.EmitHint, node: ts.Node, emitCallback: (hint: ts.EmitHint, node: ts.Node) => void) => void;
    let noSubstitution: boolean[];
    if (compilerOptions.jsx === ts.JsxEmit.Preserve || compilerOptions.jsx === ts.JsxEmit.ReactNative) {
        previousOnEmitNode = context.onEmitNode;
        context.onEmitNode = onEmitNode;
        context.enableEmitNotification(ts.SyntaxKind.JsxOpeningElement);
        context.enableEmitNotification(ts.SyntaxKind.JsxClosingElement);
        context.enableEmitNotification(ts.SyntaxKind.JsxSelfClosingElement);
        noSubstitution = [];
    }

    const previousOnSubstituteNode = context.onSubstituteNode;
    context.onSubstituteNode = onSubstituteNode;
    context.enableSubstitution(ts.SyntaxKind.PropertyAccessExpression);
    context.enableSubstitution(ts.SyntaxKind.PropertyAssignment);
    return ts.chainBundle(context, transformSourceFile);

    /**
     * Transforms an ES5 source file to ES3.
     *
     * @param node A SourceFile
     */
    function transformSourceFile(node: ts.SourceFile) {
        return node;
    }

    /**
     * Called by the printer just before a node is printed.
     *
     * @param hint A hint as to the intended usage of the node.
     * @param node The node to emit.
     * @param emitCallback A callback used to emit the node.
     */
    function onEmitNode(hint: ts.EmitHint, node: ts.Node, emitCallback: (emitContext: ts.EmitHint, node: ts.Node) => void) {
        switch (node.kind) {
            case ts.SyntaxKind.JsxOpeningElement:
            case ts.SyntaxKind.JsxClosingElement:
            case ts.SyntaxKind.JsxSelfClosingElement:
                const tagName = (node as ts.JsxOpeningElement | ts.JsxClosingElement | ts.JsxSelfClosingElement).tagName;
                noSubstitution[ts.getOriginalNodeId(tagName)] = true;
                break;
        }

        previousOnEmitNode(hint, node, emitCallback);
    }

    /**
     * Hooks node substitutions.
     *
     * @param hint A hint as to the intended usage of the node.
     * @param node The node to substitute.
     */
    function onSubstituteNode(hint: ts.EmitHint, node: ts.Node) {
        if (node.id && noSubstitution && noSubstitution[node.id]) {
            return previousOnSubstituteNode(hint, node);
        }

        node = previousOnSubstituteNode(hint, node);
        if (ts.isPropertyAccessExpression(node)) {
            return substitutePropertyAccessExpression(node);
        }
        else if (ts.isPropertyAssignment(node)) {
            return substitutePropertyAssignment(node);
        }
        return node;
    }

    /**
     * Substitutes a PropertyAccessExpression whose name is a reserved word.
     *
     * @param node A PropertyAccessExpression
     */
    function substitutePropertyAccessExpression(node: ts.PropertyAccessExpression): ts.Expression {
        if (ts.isPrivateIdentifier(node.name)) {
            return node;
        }
        const literalName = trySubstituteReservedName(node.name);
        if (literalName) {
            return ts.setTextRange(factory.createElementAccessExpression(node.expression, literalName), node);
        }
        return node;
    }

    /**
     * Substitutes a PropertyAssignment whose name is a reserved word.
     *
     * @param node A PropertyAssignment
     */
    function substitutePropertyAssignment(node: ts.PropertyAssignment): ts.PropertyAssignment {
        const literalName = ts.isIdentifier(node.name) && trySubstituteReservedName(node.name);
        if (literalName) {
            return factory.updatePropertyAssignment(node, literalName, node.initializer);
        }
        return node;
    }

    /**
     * If an identifier name is a reserved word, returns a string literal for the name.
     *
     * @param name An Identifier
     */
    function trySubstituteReservedName(name: ts.Identifier) {
        const token = name.originalKeywordKind || (ts.nodeIsSynthesized(name) ? ts.stringToToken(ts.idText(name)) : undefined);
        if (token !== undefined && token >= ts.SyntaxKind.FirstReservedWord && token <= ts.SyntaxKind.LastReservedWord) {
            return ts.setTextRange(factory.createStringLiteralFromNode(name), name);
        }
        return undefined;
    }
}
}
