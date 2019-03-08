// @noImplicitReferences: true
// @filename: node_modules/typescript-plugin-transform/package.json
{
    "name": "typescript-plugin-transform",
    "version": "1.0.0",
    "main": "index.js",
    "typescriptPlugin": {
        "activationEvents": ["preEmit"]
    }
}

// @filename: node_modules/typescript-plugin-transform/index.js
exports.preEmit = function (context, program, targetSourceFile) {
    const ts = context.ts;
    return { customTransformers: { after: [replaceUndefinedWithVoid0] } };
    function replaceUndefinedWithVoid0(context) {
        const previousOnSubstituteNode = context.onSubstituteNode;
        context.enableSubstitution(ts.SyntaxKind.Identifier);
        context.onSubstituteNode = (hint, node) => {
            node = previousOnSubstituteNode(hint, node);
            if (hint === ts.EmitHint.Expression && ts.isIdentifier(node) && node.escapedText === "undefined") {
                node = ts.createPartiallyEmittedExpression(
                    ts.addSyntheticTrailingComment(
                        ts.setTextRange(
                            ts.createVoidZero(),
                            node),
                        ts.SyntaxKind.MultiLineCommentTrivia, "undefined"));
            }
            return node;
        };
        return (file) => file;
    }
};

// @filename: tsconfig.json
{
    "compilerOptions": {},
    "plugins": [
        "transform"
    ]
}

// @filename: main.ts
const a = undefined;