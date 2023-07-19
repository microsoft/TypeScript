import {
    BinaryExpression,
    BinaryOperator,
    Debug,
    Diagnostics,
    emptyArray,
    factory,
    getLocaleSpecificMessage,
    getTouchingToken,
    isBinaryExpression,
    SourceFile,
    SyntaxKind,
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
        const info = getInfo(file, startPosition);
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
        const { left, right } = token;

        const edits = textChanges.ChangeTracker.with(context, tracker => {
            Debug.assertIsDefined(flippedOperator, "Flipped operator not found");
            tracker.replaceNode(file, token, factory.updateBinaryExpression(token, right, factory.createToken(flippedOperator), left));
        });
        return { edits };
    },
});
function getInfo(
    file: SourceFile,
    startPosition: number,
): { token: BinaryExpression; flippedOperator: BinaryOperator; } | undefined {
    const token = getTouchingToken(file, startPosition, () => true);

    if (!isBinaryExpression(token.parent) || token.parent.operatorToken !== token) return undefined;

    const flippableOperators: Partial<Record<BinaryOperator, BinaryOperator>> = {
        [SyntaxKind.LessThanToken]: SyntaxKind.GreaterThanToken,
        [SyntaxKind.LessThanEqualsToken]: SyntaxKind.GreaterThanEqualsToken,
        [SyntaxKind.LessThanLessThanToken]: SyntaxKind.GreaterThanGreaterThanToken,
        [SyntaxKind.GreaterThanToken]: SyntaxKind.LessThanToken,
        [SyntaxKind.GreaterThanEqualsToken]: SyntaxKind.LessThanEqualsToken,
        [SyntaxKind.GreaterThanGreaterThanToken]: SyntaxKind.LessThanLessThanToken,
    };
    const unflippableOperators = new Set<BinaryOperator>([
        SyntaxKind.EqualsEqualsToken,
        SyntaxKind.EqualsEqualsEqualsToken,
        SyntaxKind.ExclamationEqualsToken,
        SyntaxKind.ExclamationEqualsEqualsToken,
        SyntaxKind.AmpersandToken,
        SyntaxKind.AmpersandAmpersandToken,
        SyntaxKind.BarToken,
        SyntaxKind.BarBarToken,
        SyntaxKind.CaretToken,
        SyntaxKind.PlusToken,
        SyntaxKind.MinusToken,
        SyntaxKind.AsteriskToken,
        SyntaxKind.AsteriskAsteriskToken,
        SyntaxKind.SlashToken,
        SyntaxKind.PercentToken,
    ]);
    const operatorKind = token.parent.operatorToken.kind;
    const flippedOperator = flippableOperators[operatorKind]
        || [...unflippableOperators.values()].find((operator) => operator === operatorKind);

    if (!flippedOperator) return undefined;

    return { token: token.parent, flippedOperator };
}
