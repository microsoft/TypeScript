import {
    BinaryExpression,
    BinaryOperator,
    Debug,
    Diagnostics,
    SourceFile,
    SyntaxKind,
    emptyArray,
    factory,
    getLocaleSpecificMessage,
    getTouchingToken,
    isBinaryExpression,
    textChanges,
} from "../_namespaces/ts";
import { registerRefactor } from "../_namespaces/ts.refactor";

const refactorName = "Flip operator";
const refactorDescription = getLocaleSpecificMessage(
    Diagnostics.Flip_operator
);

const inlineVariableAction = {
    name: refactorName,
    description: refactorDescription,
    kind: "refactor.move.flipOperator",
};

registerRefactor(refactorName, {
    kinds: ["refactor.move.flipOperator"],
    getAvailableActions(context) {
        const { file, startPosition } = context;
        const info = getInfo(file, startPosition)
        if (!info) return emptyArray;

        return [
            {
                name: inlineVariableAction.name,
                description: inlineVariableAction.description,
                actions: [inlineVariableAction],
            },
        ];

    },
    getEditsForAction(context) {
        const { file, startPosition } = context;
        const info = getInfo(file, startPosition);
        if (!info) return undefined;

        const { token, flippedOperator } = info;
        const { left, right } = token

        const edits = textChanges.ChangeTracker.with(context, tracker => {
            Debug.assertIsDefined(flippedOperator, "Flipped operator not found")
            tracker.replaceNode(file, token, factory.updateBinaryExpression(token, right, factory.createToken(flippedOperator), left))
        });
        return { edits };
    },
});
function getInfo(
    file: SourceFile,
    startPosition: number,
): { token: BinaryExpression; flippedOperator: BinaryOperator; } | undefined {
    const token = getTouchingToken(file, startPosition, () => true);

    if (!isBinaryExpression(token.parent) || token.parent.operatorToken !== token) return undefined

    const flippedOperators: Partial<Record<BinaryOperator, BinaryOperator>> = {
        [SyntaxKind.LessThanToken]: SyntaxKind.GreaterThanToken,
        [SyntaxKind.LessThanEqualsToken]: SyntaxKind.GreaterThanEqualsToken,
        [SyntaxKind.GreaterThanToken]: SyntaxKind.LessThanToken,
        [SyntaxKind.GreaterThanEqualsToken]: SyntaxKind.LessThanEqualsToken,
        [SyntaxKind.EqualsEqualsToken]: SyntaxKind.EqualsEqualsToken,
        [SyntaxKind.EqualsEqualsEqualsToken]: SyntaxKind.EqualsEqualsEqualsToken,
        [SyntaxKind.ExclamationEqualsToken]: SyntaxKind.ExclamationEqualsToken,
        [SyntaxKind.ExclamationEqualsEqualsToken]: SyntaxKind.ExclamationEqualsEqualsToken,
        [SyntaxKind.AmpersandAmpersandToken]: SyntaxKind.AmpersandAmpersandToken,
        [SyntaxKind.BarBarToken]: SyntaxKind.BarBarToken,
        [SyntaxKind.AmpersandToken]: SyntaxKind.AmpersandToken,
        [SyntaxKind.BarToken]: SyntaxKind.BarToken,
        [SyntaxKind.CaretToken]: SyntaxKind.CaretToken,
        [SyntaxKind.LessThanLessThanToken]: SyntaxKind.GreaterThanGreaterThanToken,
        [SyntaxKind.GreaterThanGreaterThanToken]: SyntaxKind.LessThanLessThanToken,
        [SyntaxKind.PlusToken]: SyntaxKind.PlusToken,
        [SyntaxKind.MinusToken]: SyntaxKind.MinusToken,
        [SyntaxKind.AsteriskToken]: SyntaxKind.AsteriskToken,
        [SyntaxKind.SlashToken]: SyntaxKind.SlashToken,
        [SyntaxKind.PercentToken]: SyntaxKind.PercentToken,
    };
    const flippedOperator = flippedOperators[token.parent.operatorToken.kind];
    if (!flippedOperator) return undefined

    return { token: token.parent, flippedOperator }
}
