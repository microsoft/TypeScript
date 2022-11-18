import { cast } from "../../compiler/core";
import { Diagnostics } from "../../compiler/diagnosticInformationMap.generated";
import { factory } from "../../compiler/factory/nodeFactory";
import { isPropertyAccessExpression } from "../../compiler/factory/nodeTests";
import {
    PropertyAccessExpression,
    SourceFile,
    UserPreferences,
} from "../../compiler/types";
import { isPropertyAccessChain } from "../../compiler/utilitiesPublic";
import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../codeFixProvider";
import { ChangeTracker } from "../textChanges";
import {
    getQuotePreference,
    getTokenAtPosition,
    QuotePreference,
} from "../utilities";

const fixId = "fixNoPropertyAccessFromIndexSignature";
const errorCodes = [
    Diagnostics.Property_0_comes_from_an_index_signature_so_it_must_be_accessed_with_0.code
];

registerCodeFix({
    errorCodes,
    fixIds: [fixId],
    getCodeActions(context) {
        const { sourceFile, span, preferences } = context;
        const property = getPropertyAccessExpression(sourceFile, span.start);
        const changes = ChangeTracker.with(context, t => doChange(t, context.sourceFile, property, preferences));
        return [createCodeFixAction(fixId, changes, [Diagnostics.Use_element_access_for_0, property.name.text], fixId, Diagnostics.Use_element_access_for_all_undeclared_properties)];
    },
    getAllCodeActions: context =>
        codeFixAll(context, errorCodes, (changes, diag) => doChange(changes, diag.file, getPropertyAccessExpression(diag.file, diag.start), context.preferences))
});

function doChange(changes: ChangeTracker, sourceFile: SourceFile, node: PropertyAccessExpression, preferences: UserPreferences): void {
    const quotePreference = getQuotePreference(sourceFile, preferences);
    const argumentsExpression = factory.createStringLiteral(node.name.text, quotePreference === QuotePreference.Single);
    changes.replaceNode(
        sourceFile,
        node,
        isPropertyAccessChain(node) ?
            factory.createElementAccessChain(node.expression, node.questionDotToken, argumentsExpression) :
            factory.createElementAccessExpression(node.expression, argumentsExpression)
    );
}

function getPropertyAccessExpression(sourceFile: SourceFile, pos: number): PropertyAccessExpression {
    return cast(getTokenAtPosition(sourceFile, pos).parent, isPropertyAccessExpression);
}
